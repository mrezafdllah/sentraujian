import { describe, expect, it } from 'vitest';
import { routeContracts } from '@sentraujian/shared-config/routes';

describe('Edge Admin Web route contract', () => {
  it('defines the local login and dashboard routes', () => {
    expect(routeContracts.find((route) => route.path === '/local/login')?.area).toBe('edge');
    expect(routeContracts.find((route) => route.path === '/local/dashboard')?.status).toBe('implemented');
  });

  it('includes the persistent Edge notification panel', () => {
    expect(routeContracts.find((route) => route.path === '/local/notifications')?.roles).toContain('SCHOOL_OPERATOR');
  });
});
