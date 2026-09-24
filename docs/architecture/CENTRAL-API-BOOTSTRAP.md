# Central API Bootstrap

The initial Central API service lives in `apps/central-api` and deliberately has no database or authentication dependency. It establishes the Go module, structured JSON logging, configuration boundary, and health/readiness contract before persistence work begins.

The service exposes both operational endpoints (`/health`, `/readiness`) and versioned API aliases (`/api/v1/health`, `/api/v1/readiness`). Future breaking Central API changes must use a new `/api/v2` route group rather than silently changing `/api/v1`.
