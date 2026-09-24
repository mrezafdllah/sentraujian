import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { EDGE_PROTOCOL_VERSION } from '@sentraujian/api-contracts';

const root = resolve(import.meta.dirname, '../../../');
const readJson = (relativePath: string) => JSON.parse(readFileSync(resolve(root, relativePath), 'utf8')) as Record<string, unknown>;

describe('published Edge exam contract files', () => {
  it('publishes all required API paths in OpenAPI text', () => {
    const openApi = readFileSync(resolve(root, 'docs/api/edge-exam-openapi.yaml'), 'utf8');

    for (const path of ['/exam/bootstrap:', '/exam/tokens/claim:', '/exam/attempts/{attemptId}/questions/{questionId}:', '/exam/attempts/{attemptId}/answers:', '/exam/attempts/{attemptId}/recovery:', '/exam/attempts/{attemptId}/submit:']) {
      expect(openApi).toContain(path);
    }
  });

  it('keeps event schema and example payloads on protocol version one', () => {
    const eventSchema = readJson('docs/api/schemas/exam-events.schema.json');
    const bootstrap = readJson('docs/api/examples/exam-bootstrap.json');

    expect(eventSchema.$schema).toContain('json-schema.org');
    expect(bootstrap.protocolVersion).toBe(EDGE_PROTOCOL_VERSION);
    expect(bootstrap.sessionId).toBeTruthy();
  });
});
