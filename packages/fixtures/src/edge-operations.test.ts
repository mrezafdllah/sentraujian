import { describe, expect, it } from 'vitest';
import { edgeNotifications, storageHealth } from './index';

describe('Edge operations fixtures', () => {
  it('keeps unread notifications visible for operators', () => {
    expect(edgeNotifications.filter((notification) => !notification.read)).toHaveLength(2);
    expect(edgeNotifications.some((notification) => notification.kind === 'SESSION_READY')).toBe(true);
  });

  it('maps storage usage to a safe health status', () => {
    expect(storageHealth.usedPercent).toBeLessThan(storageHealth.warningPercent);
    expect(storageHealth.status).toBe('HEALTHY');
  });
});
