import { prisma } from "@/lib/prisma";
import { NotFoundError } from "@/lib/api/errors";
import { assertYearPeriodActive } from "./year-period.service";
import { createAuditEntry } from "./audit.service";
import { Prisma, type PaymentMethod } from "@prisma/client";
import type {
  CreateFundingInput,
  FundingQueryInput,
} from "@/lib/validation";

// ==============================================================================
// FUNDING & DONATIONS SERVICE
// ==============================================================================
// Section 21 & 48: Multi-table budget increments, strict Decimal handling, donor privacy.

async function generateFundingReference(yearPeriodId: string): Promise<string> {
  const count = await prisma.funding.count({
    where: { yearPeriodId },
  });
  const padded = String(count + 1).padStart(6, "0");
  return `FND-${yearPeriodId}-${padded}`;
}

/**
 * Records incoming donation/funding:
 * Atomically creates Funding record, updates Project currentFunding if allocated, and writes audit log.
 */
export async function createFunding(
  data: CreateFundingInput,
  actorId?: string | null
) {
  // 1. Enforce active fiscal year guard
  await assertYearPeriodActive(data.yearPeriodId);

  // 2. Validate Project existence if allocated
  if (data.projectId && data.projectId.trim() !== "") {
    const project = await prisma.project.findUnique({
      where: { id: data.projectId },
    });
    if (!project) {
      throw new NotFoundError("Project", data.projectId);
    }
  }

  // 3. Generate reference number
  const referenceNumber = await generateFundingReference(data.yearPeriodId);
  const amountDecimal = new Prisma.Decimal(data.amountPKR);

  // 4. Atomic Transaction: Funding creation + Project balance increment + Audit Trail
  return prisma.$transaction(async (tx) => {
    // A. Create Funding record
    const funding = await tx.funding.create({
      data: {
        referenceNumber,
        date: new Date(data.receivedDate),
        amountPKR: amountDecimal,
        source: data.fundingSource,
        donorName: data.isAnonymous ? "Anonymous Benefactor" : data.donorName,
        donorContact: data.isAnonymous ? null : data.donorContact?.trim() || null,
        purpose: data.purpose?.trim() || "General Foundation Support",
        paymentMethod: (data.paymentMethod as PaymentMethod) || "BANK_TRANSFER",
        receiptDocumentRef: data.receiptNumber?.trim() || null,
        projectId: data.projectId && data.projectId.trim() !== "" ? data.projectId : null,
        yearPeriodId: data.yearPeriodId,
        loggedByUserId: actorId || null,
        isAnonymous: data.isAnonymous,
      },
    });

    // B. Increment Project current funding if allocated
    if (funding.projectId) {
      await tx.project.update({
        where: { id: funding.projectId },
        data: {
          currentFundingPKR: {
            increment: amountDecimal,
          },
        },
      });
    }

    // C. Write immutable audit log
    await createAuditEntry(tx, {
      action: "CREATE",
      module: "FUNDING",
      recordId: funding.id,
      userId: actorId,
      metadata: {
        referenceNumber: funding.referenceNumber,
        source: funding.source,
        amountPKR: String(data.amountPKR),
        projectId: funding.projectId,
      },
    });

    return funding;
  });
}

/**
 * Paginated list of funding receipts
 */
export async function getFundings(query: FundingQueryInput) {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  const where: Prisma.FundingWhereInput = {
    deletedAt: null,
  };

  if (query.yearPeriodId) {
    where.yearPeriodId = query.yearPeriodId;
  }
  if (query.projectId) {
    where.projectId = query.projectId;
  }
  if (query.fundingSource) {
    where.source = query.fundingSource;
  }
  if (query.dateFrom || query.dateTo) {
    where.date = {};
    if (query.dateFrom) where.date.gte = new Date(query.dateFrom);
    if (query.dateTo) where.date.lte = new Date(query.dateTo);
  }
  if (query.minAmount !== undefined || query.maxAmount !== undefined) {
    where.amountPKR = {};
    if (query.minAmount !== undefined) where.amountPKR.gte = new Prisma.Decimal(query.minAmount);
    if (query.maxAmount !== undefined) where.amountPKR.lte = new Prisma.Decimal(query.maxAmount);
  }
  if (query.search) {
    const term = query.search.trim();
    where.OR = [
      { referenceNumber: { contains: term, mode: "insensitive" } },
      { donorName: { contains: term, mode: "insensitive" } },
      { purpose: { contains: term, mode: "insensitive" } },
    ];
  }

  const [total, fundings] = await Promise.all([
    prisma.funding.count({ where }),
    prisma.funding.findMany({
      where,
      skip,
      take: limit,
      orderBy: { date: "desc" },
      include: {
        yearPeriod: {
          select: {
            id: true,
            year: true,
            label: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    fundings,
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
