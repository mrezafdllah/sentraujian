import { describe, expect, it } from 'vitest';
import { EDGE_PROTOCOL_VERSION } from '@sentraujian/api-contracts';
import { demoExamToken, MockExamGateway } from './exam-gateway';

describe('MockExamGateway protocol lifecycle', () => {
  it('bootstraps only compatible protocol versions', () => {
    const gateway = new MockExamGateway();
    expect(gateway.bootstrap().protocolVersion).toBe(EDGE_PROTOCOL_VERSION);
    expect(() => gateway.bootstrap(99)).toThrow('INVALID_PROTOCOL_VERSION');
  });

  it('enforces single-use token claims', () => {
    const gateway = new MockExamGateway();
    expect(gateway.claimToken(demoExamToken).attemptId).toBe('attempt-demo-001');
    expect(() => gateway.claimToken(demoExamToken)).toThrow('TOKEN_ALREADY_USED');
  });

  it('keeps revisioned autosave and recovery on the same attempt', () => {
    const gateway = new MockExamGateway();
    gateway.claimToken();
    expect(gateway.autosave('20').revision).toBe(1);
    expect(gateway.recover()).toMatchObject({ attemptId: 'attempt-demo-001', lastRevision: 1, status: 'ACTIVE' });
    expect(() => gateway.autosave('30', 0)).toThrow('REVISION_CONFLICT');
  });

  it('returns one submit receipt and rejects duplicates', () => {
    const gateway = new MockExamGateway();
    gateway.claimToken();
    expect(gateway.submit()).toMatchObject({ attemptId: 'attempt-demo-001', status: 'SUBMITTED' });
    expect(() => gateway.submit()).toThrow('ATTEMPT_ALREADY_SUBMITTED');
  });
});
