import { describe, expect, it } from 'vitest';
import { examSchedules, syncBatches } from './index';

describe('Edge operator workflow fixtures', () => {
  it('exposes a readiness-approved schedule before activation', () => {
    expect(examSchedules[0]).toMatchObject({ status: 'READY', packageId: 'package-1' });
    expect(examSchedules[0]?.participantCount).toBeGreaterThan(0);
  });

  it('keeps pending sync batches retryable and synced batches acknowledged', () => {
    expect(syncBatches.find((batch) => batch.status === 'PENDING')?.retryCount).toBe(0);
    expect(syncBatches.find((batch) => batch.status === 'SYNCED')?.lastAttemptAt).toBeTruthy();
  });
});
