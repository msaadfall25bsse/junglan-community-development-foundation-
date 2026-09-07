import { prisma } from "@/lib/prisma";
import { readStore, updateStore } from "@/lib/db";
import { tryPrismaOrFallback } from "./db-helper";
import type { Prisma, AuditActionType } from "@prisma/client";
import type { AuditQueryInput } from "@/lib/validation";

// ==============================================================================
// AUDIT LOG SERVICE
// ==============================================================================

export interface CreateAuditLogParams {
  action: AuditActionType;
  module: string;
  recordId: string;
  userId?: string | null;
  metadata?: Record<string, unknown> | null;
}

export async function createAuditEntry(
  txOrPrisma: Prisma.TransactionClient | typeof prisma,
  params: CreateAuditLogParams
) {
  let metadataJson: string | undefined;
  if (params.metadata) {
    const sanitized = { ...params.metadata };
    delete sanitized.password;
    delete sanitized.passwordHash;
    delete sanitized.token;
    delete sanitized.secret;
    metadataJson = JSON.stringify(sanitized);
  }

  return tryPrismaOrFallback(
    async () => {
      return (txOrPrisma as any).auditLog.create({
        data: {
          action: params.action,
          module: params.module,
          recordId: params.recordId,
          userId: params.userId || undefined,
          metadataJson,
        },
      });
    },
    async () => {
      const entry = {
        id: `aud-${Date.now()}`,
        userId: params.userId || null,
        action: params.action,
        module: params.module,
        recordId: params.recordId,
        timestamp: new Date().toISOString(),
        metadataJson: metadataJson || null,
      };
      updateStore((s) => {
        s.auditLogs.unshift(entry);
      });
      return entry as any;
    }
  );
}

export async function getAuditLogs(query: AuditQueryInput) {
  return tryPrismaOrFallback(
    async () => {
      const page = query.page || 1;
      const limit = query.limit || 20;
      const skip = (page - 1) * limit;

      const where: Prisma.AuditLogWhereInput = {};

      if (query.action) where.action = query.action as AuditActionType;
      if (query.module) where.module = query.module;
      if (query.userId) where.userId = query.userId;
      if (query.recordId) where.recordId = query.recordId;
      if (query.dateFrom || query.dateTo) {
        where.timestamp = {};
        if (query.dateFrom) where.timestamp.gte = new Date(query.dateFrom);
        if (query.dateTo) where.timestamp.lte = new Date(query.dateTo);
      }

      const [total, logs] = await Promise.all([
        prisma.auditLog.count({ where }),
        prisma.auditLog.findMany({
          where,
          skip,
          take: limit,
          orderBy: { timestamp: "desc" },
          include: {
            user: {
              select: { id: true, name: true, email: true, role: true },
            },
          },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        logs,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
    },
    async () => {
      const store = readStore();
      let items = [...store.auditLogs];

      if (query.action) items = items.filter((l) => l.action === query.action);
      if (query.module) items = items.filter((l) => l.module === query.module);

      const page = query.page || 1;
      const limit = query.limit || 20;
      const total = items.length;
      const totalPages = Math.ceil(total / limit);
      const paginated = items.slice((page - 1) * limit, page * limit);

      return {
        logs: paginated,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
    }
  );
}

// ==============================================================================
// AUTH SECURITY EVENT LOGGER — Section 108, 109, 110
// ==============================================================================
// Convenience wrapper for auth-specific audit events.
// STRICTLY: never logs passwords, hashes, tokens, or private secrets.
// ==============================================================================

export type AuthEventType =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILURE"
  | "LOGOUT"
  | "ACCOUNT_DISABLED"
  | "ROLE_CHANGED";

export interface AuthEventParams {
  eventType: AuthEventType;
  userId: string;
  email?: string;
  ip?: string;
  reason?: string;
  performedByUserId?: string;
}

/**
 * Log an auth security event to the audit log.
 * Never include passwords, tokens, or hashes in metadata.
 */
export async function logAuthEvent(params: AuthEventParams): Promise<void> {
  try {
    const actionMap: Record<AuthEventType, AuditActionType> = {
      LOGIN_SUCCESS: "LOGIN",
      LOGIN_FAILURE: "LOGIN",
      LOGOUT: "LOGOUT",
      ACCOUNT_DISABLED: "UPDATE",
      ROLE_CHANGED: "UPDATE",
    };

    await createAuditEntry(prisma, {
      action: actionMap[params.eventType],
      module: "AUTH",
      recordId: params.userId,
      userId: params.performedByUserId || params.userId,
      metadata: {
        eventType: params.eventType,
        ...(params.email && { email: params.email }),
        ...(params.ip && { ip: params.ip }),
        ...(params.reason && { reason: params.reason }),
      },
    });
  } catch (err) {
    // Never let audit log failures crash auth flows
    console.error("[audit] Failed to log auth event:", err);
  }
}
