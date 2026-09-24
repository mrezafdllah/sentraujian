export const API_VERSION = 'v1' as const;
export const EDGE_PROTOCOL_VERSION = 1 as const;

export type UserRole = 'SUPER_ADMIN' | 'CONTENT_ADMIN' | 'REVIEWER' | 'SCHOOL_ADMIN' | 'SCHOOL_OPERATOR' | 'PROCTOR' | 'AUDITOR';
export type QuestionStatus = 'AI_DRAFT' | 'DRAFT' | 'APPROVED' | 'REJECTED';
export type EdgeStatus = 'ONLINE' | 'OFFLINE' | 'DEGRADED' | 'SYNCING';
export type AttemptStatus = 'READY' | 'ACTIVE' | 'SUBMITTED' | 'DISCONNECTED' | 'RECOVERING';
export type SyncStatus = 'PENDING' | 'SYNCED' | 'FAILED' | 'FAILED_PERMANENT';

export interface ApiError { code: string; message: string; requestId: string; }
export interface Pagination { page: number; pageSize: number; total: number; }
export interface School { id: string; code: string; name: string; edgeStatus: EdgeStatus; }
export interface Prediction { id: string; questionId: string; status: 'AI_DRAFT' | 'APPROVED' | 'REJECTED'; confidence: number; modelVersion: string; datasetVersion: string; predictionRunId: string; contentHash: string; createdAt: string; }
export interface EdgeHealth { status: EdgeStatus; address: string; storageUsedPercent: number; activeParticipants: number; lastSyncAt: string | null; }
export interface MonitorParticipant { id: string; displayName: string; status: 'ACTIVE' | 'SUBMITTED' | 'DISCONNECTED'; lastSeenAt: string; }
