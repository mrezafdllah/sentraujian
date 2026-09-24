# Architecture

The Central Platform owns master data and final reconciliation. Each Edge Server owns the local exam path: official timer, autosave, recovery, local scoring, and result outbox. Central traffic is not required while a prepared exam is running locally.

Frontend applications communicate through API contracts and never access databases directly.
