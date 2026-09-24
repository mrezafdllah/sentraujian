import { describe, expect, it } from 'vitest';
import { routeContracts, routesFor } from './routes';

describe('PRD route contracts', () => {
  it('keeps route paths unique', () => {
    const paths = routeContracts.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('contains all application boundaries', () => {
    expect(routesFor('central').length).toBeGreaterThan(15);
    expect(routesFor('edge').length).toBe(12);
    expect(routesFor('mobile').map((route) => route.path)).toEqual(['/mobile/login', '/mobile/dashboard', '/mobile/monitor', '/mobile/notifications']);
    expect(routesFor('exam-client')).toHaveLength(7);
  });

  it('keeps health and readiness as service endpoints', () => {
    expect(routeContracts.filter((route) => route.status === 'service-endpoint').map((route) => route.path)).toEqual(['/health', '/readiness']);
  });
});
