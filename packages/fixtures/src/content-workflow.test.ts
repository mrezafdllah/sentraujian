import { describe, expect, it } from 'vitest';
import { examPackages, predictions, questions } from './index';

describe('Central content workflow fixtures', () => {
  it('keeps prediction drafts reviewable and linked to questions', () => {
    expect(predictions.every((prediction) => prediction.status === 'AI_DRAFT')).toBe(true);
    expect(predictions.every((prediction) => questions.some((question) => question.id === prediction.questionId))).toBe(true);
  });

  it('provides package metadata required before distribution', () => {
    const packageFixture = examPackages[0];
    expect(packageFixture).toBeDefined();
    expect(packageFixture).toMatchObject({ status: 'PUBLISHED', version: '1.2.0' });
    expect(packageFixture?.checksum).toMatch(/^sha256:/);
  });
});
