# Route Contract

The canonical route list is defined in `packages/shared-config/src/routes.ts`. Applications must use this contract when adding navigation, route guards, fixtures, and acceptance tests.

## Boundaries

- `/health` and `/readiness` are service endpoints, not administrative pages.
- Central routes use the Central API and cover staff workflows only.
- `/local/*` routes use the Edge API/WebSocket over the school LAN.
- Mobile routes describe the operator companion application; participant exam flow does not belong there.
- `/client/*` routes are reserved for the separate Tauri 2 + Rust SentraExam Client and must not be implemented in Central Web or Edge Admin Web.
- `AI_DRAFT` review routes require an authorized human reviewer before approval or publication.

## Status Meaning

- `implemented`: route has a Phase 1 screen or shell.
- `placeholder`: route is part of the PRD contract but still needs its Phase 1 screen.
- `service-endpoint`: health/readiness contract owned by a service.
- `reserved`: route belongs to a later application boundary or implementation phase.
