import { describe, expect, it } from 'vitest';
import { EDGE_PROTOCOL_VERSION } from '@sentraujian/api-contracts';

describe('SentraExam Client boundary', () => {
  it('uses the versioned Edge protocol contract', () => {
    expect(EDGE_PROTOCOL_VERSION).toBe(1);
  });

  it('keeps all participant routes under the client boundary', () => {
    expect(['/client', '/client/login', '/client/exam', '/client/result', '/client/system-check', '/client/reconnect', '/client/locked'].every((path) => path.startsWith('/client'))).toBe(true);
  });
});
