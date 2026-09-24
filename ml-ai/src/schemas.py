from dataclasses import asdict, dataclass
from typing import Literal

QuestionStatus = Literal["AI_DRAFT", "DRAFT", "IN_REVIEW", "APPROVED", "REJECTED"]


@dataclass(frozen=True)
class QuestionRecord:
    question_id: str
    content: str
    subject: str
    topic: str
    difficulty: str
    status: QuestionStatus = "DRAFT"

    def to_dict(self) -> dict[str, str]:
        return asdict(self)


@dataclass(frozen=True)
class SimilarQuestionRecommendation:
    input_question_id: str
    recommended_question_id: str
    score: float
    model_version: str
    dataset_version: str
    prediction_run_id: str
    content_hash: str
    reviewer_status: Literal["AI_DRAFT"] = "AI_DRAFT"

    def to_dict(self) -> dict[str, str | float]:
        return asdict(self)
