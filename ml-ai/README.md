# ML/AI

MVP scope is limited to question prediction/classification, equivalent-question recommendation, and optional material recommendations. AI output is always reviewable `AI_DRAFT`; it cannot silently approve or publish content.

The ML path is not a runtime dependency for local exams.

## Baseline

`src/tfidf_baseline.py` implements deterministic TF-IDF cosine similarity using only the Python standard library. It is intentionally explainable and reproducible before introducing embeddings or a larger model.

Run the tests from `ml-ai/`:

```text
py -m unittest discover -s tests -v
```

The baseline returns `SimilarQuestionRecommendation` records with model version, dataset version, prediction run ID, content hash, and mandatory `AI_DRAFT` reviewer status.
