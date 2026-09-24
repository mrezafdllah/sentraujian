# ADR-0001: Monorepo and Contract-First Integration

## Decision

Use a pnpm workspace with Turborepo. Shared TypeScript contracts and validation schemas are published before frontend data binding. Central Web, Edge Admin Web, Mobile, and the future exam client remain separate applications.

## Rationale

The PRD requires parallel work across frontend, backend, mobile, exam client, and ML teams while preserving Central/Edge traffic boundaries. Shared contracts and official fixtures allow that parallel work without database coupling.
