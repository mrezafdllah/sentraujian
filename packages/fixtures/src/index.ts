import type { EdgeHealth, ExamPackage, ExamSchedule, MonitorParticipant, Prediction, Question, School, SyncBatch } from '@sentraujian/api-contracts';

export const schools: School[] = [
  { id: 'school-1', code: 'SCH-JKT-001', name: 'SMAN 1 Nusantara', edgeStatus: 'ONLINE' },
  { id: 'school-2', code: 'SCH-SBY-002', name: 'SMKN 2 Bahari', edgeStatus: 'SYNCING' },
  { id: 'school-3', code: 'SCH-MKS-003', name: 'SMA Tunas Bangsa', edgeStatus: 'OFFLINE' },
];

export const predictions: Prediction[] = [
  { id: 'prediction-1', questionId: 'question-101', status: 'AI_DRAFT', confidence: 0.91, modelVersion: 'baseline-tfidf-0.1', datasetVersion: 'questions-2026-01', predictionRunId: 'run-2026-001', contentHash: 'sha256:demo-101', createdAt: '2026-09-22T07:42:00.000Z' },
  { id: 'prediction-2', questionId: 'question-102', status: 'AI_DRAFT', confidence: 0.84, modelVersion: 'baseline-tfidf-0.1', datasetVersion: 'questions-2026-01', predictionRunId: 'run-2026-001', contentHash: 'sha256:demo-102', createdAt: '2026-09-22T07:42:00.000Z' },
];
export const questions: Question[] = [
  { id: 'question-101', code: 'MAT-001', subject: 'Mathematics', stem: 'If a package contains 20 questions, how many are not marked?', status: 'AI_DRAFT', updatedAt: '2026-09-22T07:42:00.000Z' },
  { id: 'question-102', code: 'VER-014', subject: 'Verbal Reasoning', stem: 'Choose the closest meaning for the highlighted phrase.', status: 'APPROVED', updatedAt: '2026-09-21T12:10:00.000Z' },
  { id: 'question-103', code: 'ENG-008', subject: 'English', stem: 'Select the grammatically correct sentence.', status: 'IN_REVIEW', updatedAt: '2026-09-20T09:30:00.000Z' },
];
export const examPackages: ExamPackage[] = [{ id: 'package-1', code: 'utbk-2026-set-01', version: '1.2.0', questionCount: 140, status: 'PUBLISHED', checksum: 'sha256:package-demo-001' }];

export const edgeHealth: EdgeHealth = { status: 'ONLINE', address: '192.168.1.10', storageUsedPercent: 64, activeParticipants: 186, lastSyncAt: '2026-09-22T07:42:00.000Z' };
export const examSchedules: ExamSchedule[] = [{ id: 'schedule-1', name: 'UTBK Tryout Set 01', startsAt: '2026-09-24T08:00:00.000Z', durationMinutes: 195, participantCount: 186, packageId: 'package-1', status: 'READY' }];
export const syncBatches: SyncBatch[] = [{ id: 'batch-001', entity: 'attempts', itemCount: 186, status: 'PENDING', retryCount: 0, lastAttemptAt: null }, { id: 'batch-000', entity: 'audit_events', itemCount: 24, status: 'SYNCED', retryCount: 1, lastAttemptAt: '2026-09-24T07:42:00.000Z' }];

export const participants: MonitorParticipant[] = [
  { id: 'participant-1', displayName: 'Peserta 001', status: 'ACTIVE', lastSeenAt: 'Just now' },
  { id: 'participant-2', displayName: 'Peserta 002', status: 'SUBMITTED', lastSeenAt: '1 min ago' },
  { id: 'participant-3', displayName: 'Peserta 003', status: 'DISCONNECTED', lastSeenAt: '2 min ago' },
];
