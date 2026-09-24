export const API_VERSION = 'v1' as const;
export const EDGE_PROTOCOL_VERSION = 1 as const;

export type UserRole = 'SUPER_ADMIN' | 'CONTENT_ADMIN' | 'REVIEWER' | 'SCHOOL_ADMIN' | 'SCHOOL_OPERATOR' | 'PROCTOR' | 'AUDITOR';
export type QuestionStatus = 'AI_DRAFT' | 'DRAFT' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
export type EdgeStatus = 'ONLINE' | 'OFFLINE' | 'DEGRADED' | 'SYNCING';
export type AttemptStatus = 'READY' | 'ACTIVE' | 'SUBMITTED' | 'DISCONNECTED' | 'RECOVERING';
export type SyncStatus = 'PENDING' | 'SYNCED' | 'FAILED' | 'FAILED_PERMANENT';

export interface ApiError { code: string; message: string; requestId: string; }
export interface Pagination { page: number; pageSize: number; total: number; }
export interface School { id: string; code: string; name: string; edgeStatus: EdgeStatus; }
export interface Prediction { id: string; questionId: string; status: 'AI_DRAFT' | 'APPROVED' | 'REJECTED'; confidence: number; modelVersion: string; datasetVersion: string; predictionRunId: string; contentHash: string; createdAt: string; }
export interface Question { id: string; code: string; subject: string; stem: string; status: QuestionStatus; updatedAt: string; }
export interface ExamPackage { id: string; code: string; version: string; questionCount: number; status: 'DRAFT' | 'PUBLISHED'; checksum: string; }
export interface EdgeHealth { status: EdgeStatus; address: string; storageUsedPercent: number; activeParticipants: number; lastSyncAt: string | null; }
export interface MonitorParticipant { id: string; displayName: string; status: 'ACTIVE' | 'SUBMITTED' | 'DISCONNECTED'; lastSeenAt: string; }

export type ExamProtocolErrorCode = 'INVALID_PROTOCOL_VERSION' | 'TOKEN_ALREADY_USED' | 'TOKEN_EXPIRED' | 'ATTEMPT_NOT_FOUND' | 'REVISION_CONFLICT' | 'ATTEMPT_ALREADY_SUBMITTED';
export interface ExamBootstrap { protocolVersion: number; edgeId: string; edgeAddress: string; serverTime: string; sessionId: string; }
export interface ExamTokenClaim { token: string; participantId: string; attemptId: string; sessionId: string; expiresAt: string; }
export interface ExamQuestion { id: string; number: number; prompt: string; options: readonly string[]; }
export interface ExamAutosave { attemptId: string; questionId: string; answer: string | null; revision: number; savedAt: string; }
export interface ExamRecovery { attemptId: string; status: AttemptStatus; lastRevision: number; serverTime: string; }
export interface ExamSubmitReceipt { receiptId: string; attemptId: string; status: 'SUBMITTED'; score: number; submittedAt: string; }
export interface ExamProtocolError { code: ExamProtocolErrorCode; message: string; protocolVersion: number; requestId: string; }
