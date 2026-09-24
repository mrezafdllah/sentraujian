# Central API

Phase 2 bootstrap for the Central Platform Go service.

## Current Scope

- Standard-library HTTP server.
- JSON structured request logging.
- `/health` and `/readiness` endpoints.
- Versioned aliases at `/api/v1/health` and `/api/v1/readiness`.
- No database, authentication, or external service dependency yet.

## Local Verification

When Go 1.22+ is installed:

```text
go test ./...
go run ./cmd/central-api
```

The default listen address is `:8080`; override it with `CENTRAL_API_ADDRESS`.
