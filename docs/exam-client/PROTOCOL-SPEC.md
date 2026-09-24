# SentraExam Client Protocol

The participant client uses the Edge Server as its authority during an exam. Central Platform is not required for the active exam path.

## Phase 1 Contract

- `protocol_version` is currently `1` and is exported from `packages/api-contracts`.
- The client obtains the official timer from Edge.
- Answers are autosaved locally through the Edge protocol and must be recoverable after a temporary disconnect.
- A reconnect resumes the same attempt; it must not create a duplicate attempt.
- The client never receives answer keys from Central Web or Central API.
- Final local scoring and the result receipt originate at Edge; synchronization to Central is an Edge outbox concern.

## Route Boundary

The React shell owns `/client/*` presentation states. Tauri/Rust owns platform controls, encrypted storage, and native lifecycle. Do not move participant flows into Central Web, Edge Admin Web, or Mobile.

## Later Contract Work

Before backend binding, publish OpenAPI/JSON Schema payloads for bootstrap, device registration, token claim, question delivery, autosave acknowledgement, recovery, submit receipt, and error codes. Breaking changes require a `protocol_version` compatibility update.
