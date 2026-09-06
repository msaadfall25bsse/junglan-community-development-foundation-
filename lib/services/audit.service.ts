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
