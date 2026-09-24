import { describe, expect, it } from 'vitest';
import { mockCentralApi, mockEdgeApi } from './mock-api';

describe('contract-first mock APIs', () => {
  it('returns paginated central school data', async () => {
    const result = await mockCentralApi.listSchools();

    expect(result.page.total).toBe(result.data.length);
    expect(result.data[0]).toMatchObject({ code: 'SCH-JKT-001', edgeStatus: 'ONLINE' });
  });

  it('returns reviewable AI drafts with model metadata', async () => {
    const result = await mockCentralApi.listPredictions();

    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((prediction) => prediction.status === 'AI_DRAFT')).toBe(true);
    expect(result.data.every((prediction) => prediction.modelVersion && prediction.datasetVersion)).toBe(true);
  });

  it('returns Edge health and monitor data independently', async () => {
    const health = await mockEdgeApi.health();
    const monitor = await mockEdgeApi.monitor();

    expect(health.status).toBe('ONLINE');
    expect(health.address).toBe('192.168.1.10');
    expect(monitor.map((participant) => participant.status)).toEqual(['ACTIVE', 'SUBMITTED', 'DISCONNECTED']);
  });
});
