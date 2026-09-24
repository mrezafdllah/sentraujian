# Central API Bootstrap

The initial Central API service lives in `apps/central-api` and deliberately has no database or authentication dependency. It establishes the Go module, structured JSON logging, configuration boundary, and health/readiness contract before persistence work begins.

The service exposes both operational endpoints (`/health`, `/readiness`) and versioned API aliases (`/api/v1/health`, `/api/v1/readiness`). Future breaking Central API changes must use a new `/api/v2` route group rather than silently changing `/api/v1`.

The formal bootstrap contract is published at `docs/api/central-api-openapi.yaml`. The OpenAPI status schema must stay aligned with the Go `statusResponse` type until the service adds its generated contract workflow.
