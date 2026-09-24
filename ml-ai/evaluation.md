# Evaluation

Start with explainable baselines before larger models. Classification reports must include per-class metrics, confidence calibration where applicable, false positives, false negatives, dataset version, and known limitations. Equivalent-question recommendations require human review before package inclusion.

For the TF-IDF baseline, evaluate top-k recommendation precision on a versioned labeled set, record zero-overlap cases, and preserve the exact model and dataset versions used for each run.
