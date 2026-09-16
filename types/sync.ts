// ==============================================================================
// SYNCHRONIZATION DOMAIN TYPES — JUNGLAN COMMUNITY DEVELOPMENT FOUNDATION
// ==============================================================================
// Strictly conforming to PART 7: Two-Way Google Sheets & Drive Sync Specification

export type SyncStatus =
  | "SYNCED"
  | "PENDING"
  | "PROCESSING"
  | "CONFLICT"
  | "FAILED"
  | "REVIEW_REQUIRED";

export type IntegrationStatus =
  | "ACTIVE"
  | "PAUSED"
  | "ERROR"
  | "CONFIGURING"
  | "NEEDS_REAUTH";

export type SyncDirection = "OUTBOUND" | "INBOUND" | "BIDIRECTIONAL";

export type SyncJobStatus =
  | "PENDING"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "PARTIAL"
  | "CANCELLED";

export type SyncLogStatus =
  | "SYNCED"
  | "SKIPPED"
  | "CONFLICT"
  | "FAILED"
  | "DUPLICATE_DETECTED"
  | "REVIEW_REQUIRED";

export type ConflictStatus =
  | "OPEN"
  | "RESOLVED_KEEP_DB"
  | "RESOLVED_KEEP_SHEET"
  | "RESOLVED_MERGED"
  | "DISMISSED";

export type SyncRecordType =
  | "PATIENT"
  | "TRIP"
  | "EXPENSE"
  | "FUNDING"
  | "FUEL"
  | "MAINTENANCE"
  | "AMBULANCE"
  | "DOCUMENT";

export interface GoogleIntegrationSettings {
  autoSyncEnabled?: boolean;
  syncIntervalMinutes?: number;
  batchSize?: number;
  defaultYear?: string;
  driveRootFolderId?: string;
  spreadsheetId?: string;
  notifyOnConflict?: boolean;
}

export interface GoogleIntegrationRecord {
  id: string;
  provider: string;
  integrationType: string;
  status: IntegrationStatus;
  accountEmail: string | null;
  authType: "SERVICE_ACCOUNT" | "OAUTH2";
  encryptedAccessToken?: string | null;
  encryptedRefreshToken?: string | null;
  tokenExpiresAt: string | null;
  driveRootFolderId: string | null;
  driveRootFolderName: string;
  spreadsheetId: string | null;
  syncHealth: "HEALTHY" | "DEGRADED" | "ERROR";
  failedSyncCount: number;
  conflictCount: number;
  lastSyncAt: string | null;
  lastSuccessfulSyncAt: string | null;
  syncStatus: string | null;
  errorMetadata: string | null;
  settingsJson: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SyncJobRecord {
  id: string;
  jobIdentifier: string;
  direction: SyncDirection;
  scope: string;
  status: SyncJobStatus;
  yearPeriodId: string | null;
  isLocked: boolean;
  recordsProcessed: number;
  recordsCreated: number;
  recordsUpdated: number;
  duplicatesDetected: number;
  conflictsDetected: number;
  failuresCount: number;
  skippedCount: number;
  startedAt: string | null;
  completedAt: string | null;
  triggeredByUserId: string | null;
  errorDetails: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SyncLogRecord {
  id: string;
  syncJobId: string | null;
  recordType: SyncRecordType;
  recordId: string;
  stableIdentifier: string | null;
  externalReference: string | null;
  direction: SyncDirection;
  status: SyncLogStatus;
  errorCode: string | null;
  errorMessage: string | null;
  retryCount: number;
  maxRetries: number;
  nextRetryAt: string | null;
  payloadSnapshot: string | null;
  createdAt: string;
}

export interface SyncConflictRecord {
  id: string;
  conflictIdentifier: string;
  syncJobId: string | null;
  recordType: SyncRecordType;
  recordId: string;
  stableIdentifier: string;
  sheetRowReference: string | null;
  databaseValueJson: string;
  sheetValueJson: string;
  lastDatabaseUpdate: string;
  lastSheetUpdate: string | null;
  conflictReason: string;
  status: ConflictStatus;
  resolvedByUserId: string | null;
  resolvedAt: string | null;
  resolutionNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ExternalRecordMappingRecord {
  id: string;
  recordType: SyncRecordType;
  internalRecordId: string;
  stableIdentifier: string;
  yearPeriodId: string;
  spreadsheetId: string;
  sheetTabName: string;
  sheetTabGid: string;
  lastRowIndex: number | null;
  lastSyncedHash: string | null;
  version: number;
  lastSyncedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SyncStats {
  recordsProcessed: number;
  recordsCreated: number;
  recordsUpdated: number;
  duplicatesDetected: number;
  conflictsDetected: number;
  failuresCount: number;
  skippedCount: number;
}
