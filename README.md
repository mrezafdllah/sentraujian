# SentraUjian

SentraUjian is a Central-Edge assessment platform. This repository follows the PRD phases: contract-first dummy applications, Go Central/Edge services, then resilience and production hardening.

## Workspace

- `apps/central-web`: Central administration and question-bank workflows.
- `apps/edge-admin-web`: school operator administration over the LAN Edge API.
- `apps/edge-operator-mobile`: operator monitoring companion app.
- `apps/exam-client`: reserved for the Tauri 2 participant client.
- `packages/`: shared contracts, validation, exam package logic, UI, and configuration.
- `ml-ai/`: ML dataset protocol, baseline models, and evaluation documentation.

## Current Phase

Phase 1 is scaffold and contract-first UI. The applications currently use typed local fixtures; they must not access databases directly.

Install dependencies with `pnpm install` after enabling pnpm. Available root commands are `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck`, and `pnpm test`.
