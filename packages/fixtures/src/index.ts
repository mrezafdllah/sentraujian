import type { EdgeHealth, MonitorParticipant, Prediction, School } from '@sentraujian/api-contracts';

export const schools: School[] = [
  { id: 'school-1', code: 'SCH-JKT-001', name: 'SMAN 1 Nusantara', edgeStatus: 'ONLINE' },
  { id: 'school-2', code: 'SCH-SBY-002', name: 'SMKN 2 Bahari', edgeStatus: 'SYNCING' },
  { id: 'school-3', code: 'SCH-MKS-003', name: 'SMA Tunas Bangsa', edgeStatus: 'OFFLINE' },
];

export const predictions: Prediction[] = [
  { id: 'prediction-1', questionId: 'question-101', status: 'AI_DRAFT', confidence: 0.91, modelVersion: 'baseline-tfidf-0.1', datasetVersion: 'questions-2026-01', predictionRunId: 'run-2026-001', contentHash: 'sha256:demo-101', createdAt: '2026-09-22T07:42:00.000Z' },
  { id: 'prediction-2', questionId: 'question-102', status: 'AI_DRAFT', confidence: 0.84, modelVersion: 'baseline-tfidf-0.1', datasetVersion: 'questions-2026-01', predictionRunId: 'run-2026-001', contentHash: 'sha256:demo-102', createdAt: '2026-09-22T07:42:00.000Z' },
];

export const edgeHealth: EdgeHealth = { status: 'ONLINE', address: '192.168.1.10', storageUsedPercent: 64, activeParticipants: 186, lastSyncAt: '2026-09-22T07:42:00.000Z' };

export const participants: MonitorParticipant[] = [
  { id: 'participant-1', displayName: 'Peserta 001', status: 'ACTIVE', lastSeenAt: 'Just now' },
  { id: 'participant-2', displayName: 'Peserta 002', status: 'SUBMITTED', lastSeenAt: '1 min ago' },
  { id: 'participant-3', displayName: 'Peserta 003', status: 'DISCONNECTED', lastSeenAt: '2 min ago' },
];
