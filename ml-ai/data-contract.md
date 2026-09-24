# Dataset and Prediction Contract

Every prediction run must retain `model_version`, `dataset_version`, `prediction_run_id`, `content_hash`, `confidence`, `timestamp`, `input_reference`, reviewer status, and audit information. Dataset and model changes require reproducible evaluation.

Question records are the model input. Similar-question recommendations are outputs, never approvals. Every output stays `AI_DRAFT` until an authorized academic reviewer changes the status through the Central workflow.
