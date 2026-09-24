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

## Phase 1 Payload Lifecycle

```text
bootstrap(protocol_version)
  -> ExamBootstrap
claim_token(SNT-XXXX-XXXX-XXXX)
  -> ExamTokenClaim
get_question(attempt_id, question_id)
  -> ExamQuestion
autosave(attempt_id, question_id, answer, expected_revision)
  -> ExamAutosave
recover(attempt_id)
  -> ExamRecovery
submit(attempt_id)
  -> ExamSubmitReceipt
```

Autosave is revisioned. A stale `expected_revision` must return `REVISION_CONFLICT`, allowing the client to refetch the latest attempt state instead of overwriting a newer answer. Token claims are single-use, and submit is idempotency-protected by the attempt identity.

## Error Codes

```text
INVALID_PROTOCOL_VERSION
TOKEN_ALREADY_USED
TOKEN_EXPIRED
ATTEMPT_NOT_FOUND
REVISION_CONFLICT
ATTEMPT_ALREADY_SUBMITTED
```

The Edge response must include the error code, human-readable message, protocol version, and request ID. Error codes are part of the client compatibility contract.
