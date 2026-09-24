import unittest

from src.schemas import QuestionRecord
from src.tfidf_baseline import TfidfSimilarityBaseline, tokenize


class TfidfBaselineTests(unittest.TestCase):
    def setUp(self) -> None:
        self.questions = [
            QuestionRecord("q-1", "persamaan kuadrat dan akar persamaan", "Mathematics", "Algebra", "medium"),
            QuestionRecord("q-2", "akar persamaan kuadrat dengan diskriminan", "Mathematics", "Algebra", "hard"),
            QuestionRecord("q-3", "teks bacaan dan gagasan utama", "Verbal", "Reading", "easy"),
        ]

    def test_tokenizer_is_case_insensitive(self) -> None:
        self.assertEqual(tokenize("Akar Persamaan!"), ["akar", "persamaan"])

    def test_recommendation_is_deterministic_and_reviewable(self) -> None:
        baseline = TfidfSimilarityBaseline()
        baseline.fit(self.questions)
        recommendations = baseline.recommend("q-1", dataset_version="questions-2026-01")

        self.assertEqual(recommendations[0].recommended_question_id, "q-2")
        self.assertEqual(recommendations[0].reviewer_status, "AI_DRAFT")
        self.assertEqual(recommendations[0].model_version, "tfidf-cosine-0.1")
        self.assertTrue(recommendations[0].content_hash.startswith("sha256:"))

    def test_fit_is_required(self) -> None:
        with self.assertRaises(RuntimeError):
            TfidfSimilarityBaseline().recommend("q-1")


if __name__ == "__main__":
    unittest.main()
