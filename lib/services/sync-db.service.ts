import { prisma } from "@/lib/prisma";
import { readStore, updateStore } from "@/lib/db";
import { tryPrismaOrFallback } from "./db-helper";
import type {
  SyncDirection,
  SyncJobStatus,
  SyncLogStatus,
  ConflictStatus,
  SyncRecordType,
  IntegrationStatus,
  SyncStats,
  GoogleIntegrationRecord,
  SyncJobRecord,
  SyncLogRecord,
  SyncConflictRecord,
  ExternalRecordMappingRecord,
} from "@/types/sync";

// ==============================================================================
// SYNCHRONIZATION DATABASE SERVICE — JUNGLAN FOUNDATION
// ==============================================================================
// Part 7: Controlled Two-Way Synchronization Architecture
// Authoritative Source of Truth: PostgreSQL with seamless fallback resilience.

// ------------------------------------------------------------------------------
// 1. GOOGLE INTEGRATION CONFIGURATION
// ------------------------------------------------------------------------------

export async function getGoogleIntegration(): Promise<GoogleIntegrationRecord> {
  return tryPrismaOrFallback(
    async () => {
      let integration = await prisma.googleIntegration.findFirst({
        orderBy: { createdAt: "asc" },
      });

      if (!integration) {
        integration = await prisma.googleIntegration.create({
          data: {
            provider: "GOOGLE_SHEETS",
            integrationType: "TWO_WAY_SYNC",
            status: "CONFIGURING",
            driveRootFolderName: "Junglan Community Development Foundation",
            syncHealth: "HEALTHY",
          },
        });
      }

      return {
        ...integration,
        status: integration.status as IntegrationStatus,
        authType: (integration.authType || "SERVICE_ACCOUNT") as "SERVICE_ACCOUNT" | "OAUTH2",
        syncHealth: (integration.syncHealth || "HEALTHY") as "HEALTHY" | "DEGRADED" | "ERROR",
        tokenExpiresAt: integration.tokenExpiresAt ? integration.tokenExpiresAt.toISOString() : null,
        lastSyncAt: integration.lastSyncAt ? integration.lastSyncAt.toISOString() : null,
        lastSuccessfulSyncAt: integration.lastSuccessfulSyncAt ? integration.lastSuccessfulSyncAt.toISOString() : null,
        createdAt: integration.createdAt.toISOString(),
        updatedAt: integration.updatedAt.toISOString(),
      };
    },
    async () => {
      const store = readStore();
      let record = store.googleIntegrations?.[0];
      if (!record) {
        record = {
          id: "gint-default",
          provider: "GOOGLE_SHEETS",
          integrationType: "TWO_WAY_SYNC",
          status: "CONFIGURING",
          accountEmail: null,
          authType: "SERVICE_ACCOUNT",
          encryptedAccessToken: null,
          encryptedRefreshToken: null,
          tokenExpiresAt: null,
          driveRootFolderId: null,
          driveRootFolderName: "Junglan Community Development Foundation",
          spreadsheetId: "15uC_XxXwQ9LUgKfHX9r6-p0ZC87ODhn26iX2Yfr2-GU",
          syncHealth: "HEALTHY",
          failedSyncCount: 0,
          conflictCount: 0,
          lastSyncAt: null,
          lastSuccessfulSyncAt: null,
          syncStatus: null,
          errorMetadata: null,
          settingsJson: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        updateStore((s) => {
          if (!s.googleIntegrations) s.googleIntegrations = [];
          s.googleIntegrations.push(record);
        });
      }
      return record;
    }
  );
}

export async function updateGoogleIntegration(
  data: Partial<Omit<GoogleIntegrationRecord, "id" | "createdAt" | "updatedAt">>
): Promise<GoogleIntegrationRecord> {
  const current = await getGoogleIntegration();

  return tryPrismaOrFallback(
    async () => {
      const updated = await prisma.googleIntegration.update({
        where: { id: current.id },
        data: {
          ...data,
          tokenExpiresAt: data.tokenExpiresAt ? new Date(data.tokenExpiresAt) : undefined,
          lastSyncAt: data.lastSyncAt ? new Date(data.lastSyncAt) : undefined,
          lastSuccessfulSyncAt: data.lastSuccessfulSyncAt ? new Date(data.lastSuccessfulSyncAt) : undefined,
        },
      });

      return {
        ...updated,
        status: updated.status as IntegrationStatus,
        authType: (updated.authType || "SERVICE_ACCOUNT") as "SERVICE_ACCOUNT" | "OAUTH2",
        syncHealth: (updated.syncHealth || "HEALTHY") as "HEALTHY" | "DEGRADED" | "ERROR",
        tokenExpiresAt: updated.tokenExpiresAt ? updated.tokenExpiresAt.toISOString() : null,
        lastSyncAt: updated.lastSyncAt ? updated.lastSyncAt.toISOString() : null,
        lastSuccessfulSyncAt: updated.lastSuccessfulSyncAt ? updated.lastSuccessfulSyncAt.toISOString() : null,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      };
    },
    async () => {
      let updatedRecord: any;
      updateStore((s) => {
        if (!s.googleIntegrations) s.googleIntegrations = [];
        const idx = s.googleIntegrations.findIndex((g: any) => g.id === current.id);
        const merged = {
          ...current,
          ...data,
          updatedAt: new Date().toISOString(),
        };
        if (idx >= 0) {
          s.googleIntegrations[idx] = merged;
        } else {
          s.googleIntegrations.push(merged);
        }
        updatedRecord = merged;
      });
      return updatedRecord;
    }
  );
}

// ------------------------------------------------------------------------------
// 2. SYNC JOB MANAGEMENT & CONCURRENCY LOCK (Sections 41, 42, 43)
// ------------------------------------------------------------------------------

const STALE_LOCK_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

export async function getActiveSyncJob(): Promise<SyncJobRecord | null> {
  const now = Date.now();

  return tryPrismaOrFallback(
    async () => {
      const active = await prisma.syncJob.findFirst({
        where: { isLocked: true, status: "RUNNING" },
      });
      if (!active) return null;

      // Check stale lock
      const started = active.startedAt ? active.startedAt.getTime() : 0;
      if (started && now - started > STALE_LOCK_TIMEOUT_MS) {
        console.warn(`[SyncLock] Auto-releasing stale sync lock ${active.jobIdentifier} (exceeded 5 mins)`);
        await prisma.syncJob.update({
          where: { id: active.id },
          data: { isLocked: false, status: "FAILED", errorDetails: "Stale lock timeout (exceeded 5 minutes)" },
        });
        return null;
      }

      return {
        ...active,
        direction: active.direction as SyncDirection,
        status: active.status as SyncJobStatus,
        startedAt: active.startedAt ? active.startedAt.toISOString() : null,
        completedAt: active.completedAt ? active.completedAt.toISOString() : null,
        createdAt: active.createdAt.toISOString(),
        updatedAt: active.updatedAt.toISOString(),
      };
    },
    async () => {
      const store = readStore();
      const active = store.syncJobs?.find((j: any) => j.isLocked && j.status === "RUNNING");
      if (!active) return null;

      const started = active.startedAt ? new Date(active.startedAt).getTime() : 0;
      if (started && now - started > STALE_LOCK_TIMEOUT_MS) {
        console.warn(`[SyncLock] Auto-releasing stale sync lock ${active.jobIdentifier} (exceeded 5 mins)`);
        updateStore((s) => {
          const j = s.syncJobs?.find((item: any) => item.id === active.id);
          if (j) {
            j.isLocked = false;
            j.status = "FAILED";
            j.errorDetails = "Stale lock timeout (exceeded 5 minutes)";
          }
        });
        return null;
      }

      return active;
    }
  );
}

export async function acquireSyncLock(params: {
  direction: SyncDirection;
  scope?: string;
  yearPeriodId?: string;
  triggeredByUserId?: string | null;
}): Promise<{ success: boolean; job?: SyncJobRecord; reason?: string }> {
  const activeJob = await getActiveSyncJob();
  if (activeJob) {
    return {
      success: false,
      reason: `A synchronization job (${activeJob.jobIdentifier}) is already running. Please wait for it to finish.`,
    };
  }

  const jobIdentifier = `SYNC-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return tryPrismaOrFallback(
    async () => {
      const created = await prisma.syncJob.create({
        data: {
          jobIdentifier,
          direction: params.direction,
          scope: params.scope || "ALL",
          status: "RUNNING",
          yearPeriodId: params.yearPeriodId || "2026",
          isLocked: true,
          startedAt: new Date(),
          triggeredByUserId: params.triggeredByUserId || undefined,
        },
      });

      return {
        success: true,
        job: {
          ...created,
          direction: created.direction as SyncDirection,
          status: created.status as SyncJobStatus,
          startedAt: created.startedAt ? created.startedAt.toISOString() : null,
          completedAt: null,
          createdAt: created.createdAt.toISOString(),
          updatedAt: created.updatedAt.toISOString(),
        },
      };
    },
    async () => {
      const job: SyncJobRecord = {
        id: `job-${Date.now()}`,
        jobIdentifier,
        direction: params.direction,
        scope: params.scope || "ALL",
        status: "RUNNING",
        yearPeriodId: params.yearPeriodId || "2026",
        isLocked: true,
        recordsProcessed: 0,
        recordsCreated: 0,
        recordsUpdated: 0,
        duplicatesDetected: 0,
        conflictsDetected: 0,
        failuresCount: 0,
        skippedCount: 0,
        startedAt: new Date().toISOString(),
        completedAt: null,
        triggeredByUserId: params.triggeredByUserId || null,
        errorDetails: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        if (!s.syncJobs) s.syncJobs = [];
        s.syncJobs.unshift(job);
      });

      return { success: true, job };
    }
  );
}

export async function releaseSyncLock(
  jobId: string,
  stats: Partial<SyncStats>,
  errorDetails?: string | null
): Promise<SyncJobRecord> {
  const isFailed = (stats.failuresCount || 0) > 0 && (stats.recordsCreated || 0) === 0 && (stats.recordsUpdated || 0) === 0;
  const isPartial = (stats.failuresCount || 0) > 0 && ((stats.recordsCreated || 0) > 0 || (stats.recordsUpdated || 0) > 0);
  const status: SyncJobStatus = isFailed ? "FAILED" : isPartial ? "PARTIAL" : "COMPLETED";

  return tryPrismaOrFallback(
    async () => {
      const updated = await prisma.syncJob.update({
        where: { id: jobId },
        data: {
          status,
          isLocked: false,
          completedAt: new Date(),
          recordsProcessed: stats.recordsProcessed ?? 0,
          recordsCreated: stats.recordsCreated ?? 0,
          recordsUpdated: stats.recordsUpdated ?? 0,
          duplicatesDetected: stats.duplicatesDetected ?? 0,
          conflictsDetected: stats.conflictsDetected ?? 0,
          failuresCount: stats.failuresCount ?? 0,
          skippedCount: stats.skippedCount ?? 0,
          errorDetails: errorDetails || undefined,
        },
      });

      // Update global GoogleIntegration stats
      await prisma.googleIntegration.updateMany({
        data: {
          lastSyncAt: new Date(),
          lastSuccessfulSyncAt: status === "COMPLETED" ? new Date() : undefined,
          syncHealth: status === "COMPLETED" ? "HEALTHY" : status === "PARTIAL" ? "DEGRADED" : "ERROR",
        },
      });

      return {
        ...updated,
        direction: updated.direction as SyncDirection,
        status: updated.status as SyncJobStatus,
        startedAt: updated.startedAt ? updated.startedAt.toISOString() : null,
        completedAt: updated.completedAt ? updated.completedAt.toISOString() : null,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      };
    },
    async () => {
      let result: any;
      updateStore((s) => {
        if (!s.syncJobs) s.syncJobs = [];
        const job = s.syncJobs.find((j: any) => j.id === jobId);
        if (job) {
          job.status = status;
          job.isLocked = false;
          job.completedAt = new Date().toISOString();
          job.recordsProcessed = stats.recordsProcessed ?? job.recordsProcessed;
          job.recordsCreated = stats.recordsCreated ?? job.recordsCreated;
          job.recordsUpdated = stats.recordsUpdated ?? job.recordsUpdated;
          job.duplicatesDetected = stats.duplicatesDetected ?? job.duplicatesDetected;
          job.conflictsDetected = stats.conflictsDetected ?? job.conflictsDetected;
          job.failuresCount = stats.failuresCount ?? job.failuresCount;
          job.skippedCount = stats.skippedCount ?? job.skippedCount;
          job.errorDetails = errorDetails || null;
          job.updatedAt = new Date().toISOString();
          result = job;
        }
      });
      return result;
    }
  );
}

// ------------------------------------------------------------------------------
// 3. DETAILED SYNC LOGGING (Sections 27, 58, 59)
// ------------------------------------------------------------------------------

export interface CreateSyncLogInput {
  syncJobId?: string | null;
  recordType: SyncRecordType;
  recordId: string;
  stableIdentifier?: string | null;
  externalReference?: string | null;
  direction: SyncDirection;
  status: SyncLogStatus;
  errorCode?: string | null;
  errorMessage?: string | null;
  payloadSnapshot?: Record<string, any> | null;
}

export async function createSyncLog(input: CreateSyncLogInput): Promise<SyncLogRecord> {
  let payloadSnapshot: string | null = null;
  if (input.payloadSnapshot) {
    const sanitized = { ...input.payloadSnapshot };
    delete sanitized.password;
    delete sanitized.passwordHash;
    delete sanitized.token;
    delete sanitized.secret;
    payloadSnapshot = JSON.stringify(sanitized);
  }

  return tryPrismaOrFallback(
    async () => {
      const log = await prisma.syncLog.create({
        data: {
          syncJobId: input.syncJobId || undefined,
          recordType: input.recordType,
          recordId: input.recordId,
          stableIdentifier: input.stableIdentifier || undefined,
          externalReference: input.externalReference || undefined,
          direction: input.direction,
          status: input.status,
          errorCode: input.errorCode || undefined,
          errorMessage: input.errorMessage || undefined,
          payloadSnapshot: payloadSnapshot || undefined,
        },
      });

      return {
        ...log,
        recordType: log.recordType as SyncRecordType,
        direction: log.direction as SyncDirection,
        status: log.status as SyncLogStatus,
        nextRetryAt: log.nextRetryAt ? log.nextRetryAt.toISOString() : null,
        createdAt: log.createdAt.toISOString(),
      };
    },
    async () => {
      const entry: SyncLogRecord = {
        id: `slog-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        syncJobId: input.syncJobId || null,
        recordType: input.recordType,
        recordId: input.recordId,
        stableIdentifier: input.stableIdentifier || null,
        externalReference: input.externalReference || null,
        direction: input.direction,
        status: input.status,
        errorCode: input.errorCode || null,
        errorMessage: input.errorMessage || null,
        retryCount: 0,
        maxRetries: 3,
        nextRetryAt: null,
        payloadSnapshot,
        createdAt: new Date().toISOString(),
      };

      updateStore((s) => {
        if (!s.syncLogs) s.syncLogs = [];
        s.syncLogs.unshift(entry);
      });

      return entry;
    }
  );
}

export async function listSyncLogs(params?: {
  status?: SyncLogStatus;
  recordType?: SyncRecordType;
  direction?: SyncDirection;
  searchQuery?: string;
  limit?: number;
  offset?: number;
}): Promise<{ logs: SyncLogRecord[]; totalCount: number }> {
  const limit = params?.limit || 50;
  const offset = params?.offset || 0;

  return tryPrismaOrFallback(
    async () => {
      const where: any = {};
      if (params?.status) where.status = params.status;
      if (params?.recordType) where.recordType = params.recordType;
      if (params?.direction) where.direction = params.direction;
      if (params?.searchQuery) {
        where.OR = [
          { recordId: { contains: params.searchQuery, mode: "insensitive" } },
          { stableIdentifier: { contains: params.searchQuery, mode: "insensitive" } },
          { externalReference: { contains: params.searchQuery, mode: "insensitive" } },
        ];
      }

      const [logs, totalCount] = await Promise.all([
        prisma.syncLog.findMany({
          where,
          orderBy: { createdAt: "desc" },
          take: limit,
          skip: offset,
        }),
        prisma.syncLog.count({ where }),
      ]);

      return {
        logs: logs.map((l) => ({
          ...l,
          recordType: l.recordType as SyncRecordType,
          direction: l.direction as SyncDirection,
          status: l.status as SyncLogStatus,
          nextRetryAt: l.nextRetryAt ? l.nextRetryAt.toISOString() : null,
          createdAt: l.createdAt.toISOString(),
        })),
        totalCount,
      };
    },
    async () => {
      const store = readStore();
      let logs = store.syncLogs || [];

      if (params?.status) logs = logs.filter((l: any) => l.status === params.status);
      if (params?.recordType) logs = logs.filter((l: any) => l.recordType === params.recordType);
      if (params?.direction) logs = logs.filter((l: any) => l.direction === params.direction);
      if (params?.searchQuery) {
        const q = params.searchQuery.toLowerCase();
        logs = logs.filter(
          (l: any) =>
            l.recordId?.toLowerCase().includes(q) ||
            l.stableIdentifier?.toLowerCase().includes(q) ||
            l.externalReference?.toLowerCase().includes(q)
        );
      }

      const totalCount = logs.length;
      const paginated = logs.slice(offset, offset + limit);
      return { logs: paginated, totalCount };
    }
  );
}

// ------------------------------------------------------------------------------
// 4. CONFLICT MANAGEMENT & RESOLUTION (Sections 22, 23, 24, 25)
// ------------------------------------------------------------------------------

export interface RecordConflictInput {
  syncJobId?: string | null;
  recordType: SyncRecordType;
  recordId: string;
  stableIdentifier: string;
  sheetRowReference?: string | null;
  databaseValue: Record<string, any>;
  sheetValue: Record<string, any>;
  lastDatabaseUpdate: Date | string;
  lastSheetUpdate?: Date | string | null;
  conflictReason: string;
}

export async function recordConflict(input: RecordConflictInput): Promise<SyncConflictRecord> {
  const conflictIdentifier = `CNF-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
  const dbUpdate = typeof input.lastDatabaseUpdate === "string" ? new Date(input.lastDatabaseUpdate) : input.lastDatabaseUpdate;
  const sheetUpdate = input.lastSheetUpdate ? (typeof input.lastSheetUpdate === "string" ? new Date(input.lastSheetUpdate) : input.lastSheetUpdate) : null;

  return tryPrismaOrFallback(
    async () => {
      const conflict = await prisma.syncConflict.create({
        data: {
          conflictIdentifier,
          syncJobId: input.syncJobId || undefined,
          recordType: input.recordType,
          recordId: input.recordId,
          stableIdentifier: input.stableIdentifier,
          sheetRowReference: input.sheetRowReference || undefined,
          databaseValueJson: JSON.stringify(input.databaseValue),
          sheetValueJson: JSON.stringify(input.sheetValue),
          lastDatabaseUpdate: dbUpdate,
          lastSheetUpdate: sheetUpdate || undefined,
          conflictReason: input.conflictReason,
          status: "OPEN",
        },
      });

      // Increment conflict counter in GoogleIntegration
      await prisma.googleIntegration.updateMany({
        data: { conflictCount: { increment: 1 } },
      });

      return {
        ...conflict,
        recordType: conflict.recordType as SyncRecordType,
        status: conflict.status as ConflictStatus,
        lastDatabaseUpdate: conflict.lastDatabaseUpdate.toISOString(),
        lastSheetUpdate: conflict.lastSheetUpdate ? conflict.lastSheetUpdate.toISOString() : null,
        resolvedAt: conflict.resolvedAt ? conflict.resolvedAt.toISOString() : null,
        createdAt: conflict.createdAt.toISOString(),
        updatedAt: conflict.updatedAt.toISOString(),
      };
    },
    async () => {
      const conflict: SyncConflictRecord = {
        id: `cnf-${Date.now()}`,
        conflictIdentifier,
        syncJobId: input.syncJobId || null,
        recordType: input.recordType,
        recordId: input.recordId,
        stableIdentifier: input.stableIdentifier,
        sheetRowReference: input.sheetRowReference || null,
        databaseValueJson: JSON.stringify(input.databaseValue),
        sheetValueJson: JSON.stringify(input.sheetValue),
        lastDatabaseUpdate: dbUpdate.toISOString(),
        lastSheetUpdate: sheetUpdate ? sheetUpdate.toISOString() : null,
        conflictReason: input.conflictReason,
        status: "OPEN",
        resolvedByUserId: null,
        resolvedAt: null,
        resolutionNotes: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        if (!s.syncConflicts) s.syncConflicts = [];
        s.syncConflicts.unshift(conflict);
      });

      return conflict;
    }
  );
}

export async function resolveConflict(params: {
  conflictId: string;
  resolution: "KEEP_DB" | "KEEP_SHEET" | "MERGE" | "DISMISS";
  resolutionNotes?: string;
  resolvedByUserId?: string;
}): Promise<SyncConflictRecord> {
  const statusMap: Record<string, ConflictStatus> = {
    KEEP_DB: "RESOLVED_KEEP_DB",
    KEEP_SHEET: "RESOLVED_KEEP_SHEET",
    MERGE: "RESOLVED_MERGED",
    DISMISS: "DISMISSED",
  };
  const status = statusMap[params.resolution] || "RESOLVED_KEEP_DB";

  return tryPrismaOrFallback(
    async () => {
      const updated = await prisma.syncConflict.update({
        where: { id: params.conflictId },
        data: {
          status,
          resolutionNotes: params.resolutionNotes || undefined,
          resolvedByUserId: params.resolvedByUserId || undefined,
          resolvedAt: new Date(),
        },
      });

      return {
        ...updated,
        recordType: updated.recordType as SyncRecordType,
        status: updated.status as ConflictStatus,
        lastDatabaseUpdate: updated.lastDatabaseUpdate.toISOString(),
        lastSheetUpdate: updated.lastSheetUpdate ? updated.lastSheetUpdate.toISOString() : null,
        resolvedAt: updated.resolvedAt ? updated.resolvedAt.toISOString() : null,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      };
    },
    async () => {
      let result: any;
      updateStore((s) => {
        if (!s.syncConflicts) s.syncConflicts = [];
        const cnf = s.syncConflicts.find((c: any) => c.id === params.conflictId);
        if (cnf) {
          cnf.status = status;
          cnf.resolutionNotes = params.resolutionNotes || null;
          cnf.resolvedByUserId = params.resolvedByUserId || null;
          cnf.resolvedAt = new Date().toISOString();
          cnf.updatedAt = new Date().toISOString();
          result = cnf;
        }
      });
      return result;
    }
  );
}

export async function listConflicts(params?: {
  status?: ConflictStatus;
  recordType?: SyncRecordType;
}): Promise<SyncConflictRecord[]> {
  return tryPrismaOrFallback(
    async () => {
      const where: any = {};
      if (params?.status) where.status = params.status;
      if (params?.recordType) where.recordType = params.recordType;

      const conflicts = await prisma.syncConflict.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      return conflicts.map((c) => ({
        ...c,
        recordType: c.recordType as SyncRecordType,
        status: c.status as ConflictStatus,
        lastDatabaseUpdate: c.lastDatabaseUpdate.toISOString(),
        lastSheetUpdate: c.lastSheetUpdate ? c.lastSheetUpdate.toISOString() : null,
        resolvedAt: c.resolvedAt ? c.resolvedAt.toISOString() : null,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
      }));
    },
    async () => {
      const store = readStore();
      let conflicts = store.syncConflicts || [];
      if (params?.status) conflicts = conflicts.filter((c: any) => c.status === params.status);
      if (params?.recordType) conflicts = conflicts.filter((c: any) => c.recordType === params.recordType);
      return conflicts;
    }
  );
}

export const getSyncConflicts = listConflicts;

// ------------------------------------------------------------------------------
// 5. EXTERNAL RECORD MAPPING (Sections 13, 14, 45, 64)
// ------------------------------------------------------------------------------

export interface UpsertMappingInput {
  recordType: SyncRecordType;
  internalRecordId: string;
  stableIdentifier: string;
  yearPeriodId?: string;
  spreadsheetId: string;
  sheetTabName: string;
  sheetTabGid?: string;
  lastRowIndex?: number | null;
  lastSyncedHash?: string | null;
}

export async function upsertRecordMapping(input: UpsertMappingInput): Promise<ExternalRecordMappingRecord> {
  const yearPeriodId = input.yearPeriodId || "2026";
  const sheetTabGid = input.sheetTabGid || "0";

  return tryPrismaOrFallback(
    async () => {
      const mapping = await prisma.externalRecordMapping.upsert({
        where: {
          recordType_internalRecordId: {
            recordType: input.recordType,
            internalRecordId: input.internalRecordId,
          },
        },
        create: {
          recordType: input.recordType,
          internalRecordId: input.internalRecordId,
          stableIdentifier: input.stableIdentifier,
          yearPeriodId,
          spreadsheetId: input.spreadsheetId,
          sheetTabName: input.sheetTabName,
          sheetTabGid,
          lastRowIndex: input.lastRowIndex || undefined,
          lastSyncedHash: input.lastSyncedHash || undefined,
          lastSyncedAt: new Date(),
        },
        update: {
          stableIdentifier: input.stableIdentifier,
          yearPeriodId,
          spreadsheetId: input.spreadsheetId,
          sheetTabName: input.sheetTabName,
          sheetTabGid,
          lastRowIndex: input.lastRowIndex || undefined,
          lastSyncedHash: input.lastSyncedHash || undefined,
          lastSyncedAt: new Date(),
          version: { increment: 1 },
        },
      });

      return {
        ...mapping,
        recordType: mapping.recordType as SyncRecordType,
        lastSyncedAt: mapping.lastSyncedAt.toISOString(),
        createdAt: mapping.createdAt.toISOString(),
        updatedAt: mapping.updatedAt.toISOString(),
      };
    },
    async () => {
      let result: any;
      updateStore((s) => {
        if (!s.externalRecordMappings) s.externalRecordMappings = [];
        const existingIdx = s.externalRecordMappings.findIndex(
          (m: any) => m.recordType === input.recordType && m.internalRecordId === input.internalRecordId
        );

        if (existingIdx >= 0) {
          const m = s.externalRecordMappings[existingIdx];
          m.stableIdentifier = input.stableIdentifier;
          m.yearPeriodId = yearPeriodId;
          m.spreadsheetId = input.spreadsheetId;
          m.sheetTabName = input.sheetTabName;
          m.sheetTabGid = sheetTabGid;
          m.lastRowIndex = input.lastRowIndex ?? m.lastRowIndex;
          m.lastSyncedHash = input.lastSyncedHash ?? m.lastSyncedHash;
          m.version = (m.version || 1) + 1;
          m.lastSyncedAt = new Date().toISOString();
          m.updatedAt = new Date().toISOString();
          result = m;
        } else {
          const m: ExternalRecordMappingRecord = {
            id: `map-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            recordType: input.recordType,
            internalRecordId: input.internalRecordId,
            stableIdentifier: input.stableIdentifier,
            yearPeriodId,
            spreadsheetId: input.spreadsheetId,
            sheetTabName: input.sheetTabName,
            sheetTabGid,
            lastRowIndex: input.lastRowIndex ?? null,
            lastSyncedHash: input.lastSyncedHash ?? null,
            version: 1,
            lastSyncedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          s.externalRecordMappings.push(m);
          result = m;
        }
      });
      return result;
    }
  );
}

export async function getRecordMapping(
  recordType: SyncRecordType,
  internalRecordId: string
): Promise<ExternalRecordMappingRecord | null> {
  return tryPrismaOrFallback(
    async () => {
      const mapping = await prisma.externalRecordMapping.findUnique({
        where: {
          recordType_internalRecordId: {
            recordType,
            internalRecordId,
          },
        },
      });
      if (!mapping) return null;
      return {
        ...mapping,
        recordType: mapping.recordType as SyncRecordType,
        lastSyncedAt: mapping.lastSyncedAt.toISOString(),
        createdAt: mapping.createdAt.toISOString(),
        updatedAt: mapping.updatedAt.toISOString(),
      };
    },
    async () => {
      const store = readStore();
      const found = store.externalRecordMappings?.find(
        (m: any) => m.recordType === recordType && m.internalRecordId === internalRecordId
      );
      return found || null;
    }
  );
}

export async function findMappingByStableId(
  spreadsheetId: string,
  sheetTabName: string,
  stableIdentifier: string
): Promise<ExternalRecordMappingRecord | null> {
  return tryPrismaOrFallback(
    async () => {
      const mapping = await prisma.externalRecordMapping.findUnique({
        where: {
          spreadsheetId_sheetTabName_stableIdentifier: {
            spreadsheetId,
            sheetTabName,
            stableIdentifier,
          },
        },
      });
      if (!mapping) return null;
      return {
        ...mapping,
        recordType: mapping.recordType as SyncRecordType,
        lastSyncedAt: mapping.lastSyncedAt.toISOString(),
        createdAt: mapping.createdAt.toISOString(),
        updatedAt: mapping.updatedAt.toISOString(),
      };
    },
    async () => {
      const store = readStore();
      const found = store.externalRecordMappings?.find(
        (m: any) =>
          m.spreadsheetId === spreadsheetId &&
          m.sheetTabName === sheetTabName &&
          m.stableIdentifier === stableIdentifier
      );
      return found || null;
    }
  );
}
