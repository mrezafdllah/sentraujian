"""Small, deterministic TF-IDF baseline with no runtime ML dependency."""

from collections import Counter
from dataclasses import dataclass
from hashlib import sha256
from math import log, sqrt
import re
from uuid import uuid4

from .schemas import QuestionRecord, SimilarQuestionRecommendation

TOKEN_PATTERN = re.compile(r"[a-z0-9]+")


def tokenize(text: str) -> list[str]:
    return TOKEN_PATTERN.findall(text.lower())


@dataclass
class TfidfIndex:
    vectors: dict[str, dict[str, float]]
    idf: dict[str, float]


class TfidfSimilarityBaseline:
    def __init__(self, model_version: str = "tfidf-cosine-0.1") -> None:
        self.model_version = model_version
        self.index: TfidfIndex | None = None

    def fit(self, questions: list[QuestionRecord]) -> None:
        document_terms = {question.question_id: set(tokenize(question.content)) for question in questions}
        document_count = len(document_terms)
        document_frequency = Counter(term for terms in document_terms.values() for term in terms)
        idf = {term: log((1 + document_count) / (1 + frequency)) + 1 for term, frequency in document_frequency.items()}
        vectors: dict[str, dict[str, float]] = {}
        for question in questions:
            counts = Counter(tokenize(question.content))
            vector = {term: (count / max(counts.values())) * idf[term] for term, count in counts.items()}
            vectors[question.question_id] = vector
        self.index = TfidfIndex(vectors=vectors, idf=idf)

    def recommend(self, question_id: str, limit: int = 3, dataset_version: str = "unknown") -> list[SimilarQuestionRecommendation]:
        if self.index is None:
            raise RuntimeError("baseline must be fitted before recommendation")
        source = self.index.vectors[question_id]
        ranked = sorted(((candidate_id, cosine(source, vector)) for candidate_id, vector in self.index.vectors.items() if candidate_id != question_id), key=lambda item: (-item[1], item[0]))
        run_id = f"run-{uuid4().hex[:12]}"
        return [SimilarQuestionRecommendation(question_id, candidate_id, round(score, 6), self.model_version, dataset_version, run_id, content_hash=f"sha256:{sha256(f'{question_id}:{candidate_id}'.encode()).hexdigest()}") for candidate_id, score in ranked[:limit] if score > 0]


def cosine(left: dict[str, float], right: dict[str, float]) -> float:
    denominator = sqrt(sum(value * value for value in left.values())) * sqrt(sum(value * value for value in right.values()))
    if denominator == 0:
        return 0.0
    return sum(left.get(term, 0.0) * value for term, value in right.items()) / denominator
