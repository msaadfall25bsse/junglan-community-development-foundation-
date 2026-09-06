import { prisma } from "@/lib/prisma";
import type { Prisma, AuditActionType } from "@prisma/client";
import type { AuditQueryInput } from "@/lib/validation";

// ==============================================================================
// AUDIT LOG SERVICE
// ==============================================================================
// Section 16 & 23: Complete audit trail traceability without leaking sensitive values.

export interface CreateAuditLogParams {
  action: AuditActionType;
  module: string;
  recordId: string;
  userId?: string | null;
  metadata?: Record<string, unknown> | null;
}

/**
 * Creates an immutable audit log entry.
 * Can be executed within an existing Prisma transaction or against the main client.
 */
export async function createAuditEntry(
  txOrPrisma: Prisma.TransactionClient | typeof prisma,
  params: CreateAuditLogParams
) {
  // Sanitize metadata to guarantee sensitive fields are never saved
  let metadataJson: string | undefined;
  if (params.metadata) {
    const sanitized = { ...params.metadata };
    delete sanitized.password;
    delete sanitized.passwordHash;
    delete sanitized.token;
    delete sanitized.secret;
    metadataJson = JSON.stringify(sanitized);
  }

  return txOrPrisma.auditLog.create({
    data: {
      action: params.action,
      module: params.module,
      recordId: params.recordId,
      userId: params.userId || undefined,
      metadataJson,
    },
  });
}

/**
 * Paginated query for audit logs with filtering by action, module, or user
 */
export async function getAuditLogs(query: AuditQueryInput) {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  const where: Prisma.AuditLogWhereInput = {};

  if (query.action) {
    where.action = query.action as AuditActionType;
  }
  if (query.module) {
    where.module = query.module;
  }
  if (query.userId) {
    where.userId = query.userId;
  }
  if (query.recordId) {
    where.recordId = query.recordId;
  }
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
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
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
}
