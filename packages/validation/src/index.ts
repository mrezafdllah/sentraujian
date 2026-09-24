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

export const examBootstrapSchema = z.object({ protocolVersion: z.number().int().positive(), edgeId: z.string().min(1), edgeAddress: z.string().min(1), serverTime: z.string().datetime(), sessionId: z.string().min(1) });
export const examTokenClaimSchema = z.object({ token: z.string().regex(/^SNT-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/), participantId: z.string(), attemptId: z.string(), sessionId: z.string(), expiresAt: z.string().datetime() });
export const examAutosaveSchema = z.object({ attemptId: z.string(), questionId: z.string(), answer: z.string().nullable(), revision: z.number().int().positive(), savedAt: z.string().datetime() });
export const examSubmitReceiptSchema = z.object({ receiptId: z.string(), attemptId: z.string(), status: z.literal('SUBMITTED'), score: z.number().min(0).max(100), submittedAt: z.string().datetime() });
