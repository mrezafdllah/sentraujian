import { z } from 'zod';

export const predictionSchema = z.object({
  id: z.string(), questionId: z.string(), status: z.enum(['AI_DRAFT', 'APPROVED', 'REJECTED']),
  confidence: z.number().min(0).max(1), modelVersion: z.string(), datasetVersion: z.string(),
  predictionRunId: z.string(), contentHash: z.string(), createdAt: z.string().datetime(),
});

export const edgeHealthSchema = z.object({
  status: z.enum(['ONLINE', 'OFFLINE', 'DEGRADED', 'SYNCING']), address: z.string(),
  storageUsedPercent: z.number().min(0).max(100), activeParticipants: z.number().int().nonnegative(),
  lastSyncAt: z.string().datetime().nullable(),
});

export type PredictionInput = z.infer<typeof predictionSchema>;
export type EdgeHealthInput = z.infer<typeof edgeHealthSchema>;
