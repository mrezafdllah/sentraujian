# SentraUjian Agent Guide

## Repository Status

- The repository currently contains the PRD and empty placeholders at `frontend/website-app/`, `frontend/mobile-app/`, and `ml-ai/`; do not assume build or test commands exist until the monorepo scaffold is created.
- The PRD requires a phased implementation: complete dummy UI and contracts first, then Go services and persistence, then hardening, load testing, deployment, and operational documentation.

## Product Boundaries

- Central Web is for central administration, question-bank workflow, package building, distribution, schedules, results, audit, and ML settings.
- Edge Admin Web is for school operators and communicates only with the Edge API over the school LAN.
- Mobile is the operator companion app for Edge status, realtime monitoring, and notifications; it is not the participant exam client.
- SentraExam Client is a separate Tauri 2 + Rust + React desktop application for participants; participants must not use Central Platform traffic during an exam.
- The Edge Server is authoritative during a local exam for timer, autosave, recovery, local scoring, and result outbox; Central is authoritative during final reconciliation.

## Architecture Rules

- Frontends must use API contracts and must never access Central or Edge databases directly.
- Central Web uses the Central API; Edge Admin Web, Mobile, and SentraExam Client use Edge API/WebSocket endpoints on the LAN.
- Use contract-first integration: publish OpenAPI 3.1, JSON Schema events, example payloads, official mocks, and shared fixtures before binding real frontend data.
- Breaking Central API changes require a new `/api/v1` version; Edge client protocol changes require an explicit `protocol_version` compatibility update.
- Treat LAN/offline operation, reconnect, retry, loading, empty, error, permission, and stale-data states as normal product states, not optional polish.
- WebSocket data is for realtime updates; refetch the Edge API after reconnect and do not treat a WebSocket cache as the source of truth.
- Preserve idempotency, checksums, signatures, audit records, and retry/outbox semantics when implementing distribution or result synchronization.

## Frontend Conventions

- The planned frontend stack is TypeScript, React, Vite, TanStack Router, TanStack Query, React Hook Form, Zod, Tailwind CSS 4, shadcn/ui, Recharts, and Sonner.
- The planned mobile stack is React Native with Expo SDK 52, Expo Router, and TanStack Query.
- Shared API types, validation schemas, role/status enums, exam-package parsing, and UI primitives belong in shared `packages/` rather than being duplicated per app.
- Keep Central and Edge layouts distinct even when they share primitives: their roles, connectivity assumptions, and operational workflows differ.
- Enforce RBAC in route and action handling; do not rely on navigation visibility alone.
- Keep participant exam behavior in SentraExam Client and its Edge protocol; do not implement participant exam flows in Central Web, Edge Admin Web, or Mobile.

## ML/AI Boundaries

- MVP ML scope is question prediction/classification, equivalent-question recommendation, and optional material recommendations; AI proctoring and participant mobile are explicitly outside the MVP.
- Predictions must remain reviewable `AI_DRAFT` records until an authorized human reviewer approves them; ML must never silently publish or approve questions.
- Record model version, dataset version, prediction run, content hash, confidence, timestamp, input reference, reviewer status, and audit information for every prediction.
- Prefer an explainable baseline and reproducible evaluation before introducing a larger model; model quality, privacy, limitations, and false positives/negatives must be documented.
- ML must not be a runtime dependency for the Edge exam path; local exam delivery, scoring, recovery, and synchronization must continue without live model inference.

## Workflow and Definition of Done

- Work in the PRD phases and do not skip dependencies: contracts and dummy UI, backend/Edge integration, then security/resilience/release hardening.
- Keep one pull request focused on one task; cross-contract changes require a proposal, updated contract/schema, compatibility note, and review from both component owner and consumer.
- Record significant architecture decisions under `docs/adr/ADR-XXXX-<title>.md` once documentation exists.
- A task is not done until code, tests, documentation, telemetry, migration or rollback details, security checks, and acceptance criteria are complete for its scope.
- Prefer a vertical slice for integration: build package, distribute to Edge, run a mock participant attempt, recover/reconnect, score locally, and synchronize idempotently.
- Do not invent repository commands. After scaffolding, use the root manifest and scripts as the source of truth for install, lint, typecheck, test, build, and focused package commands.

## Security-Sensitive Changes

- Require extra review for authentication/RBAC, one-time exam tokens, package encryption, checksums/signatures, Edge keys, signed installers, audit logs, and result reconciliation.
- Never commit secrets, private keys, replacement credentials, or environment-specific endpoints; use environment injection and secret management.
- Preserve the PRD rule that Central is not required for the participant exam path after preparation has synchronized to the Edge Server.
