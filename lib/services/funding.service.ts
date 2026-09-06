import { prisma } from "@/lib/prisma";
import { readStore, updateStore } from "@/lib/db";
import { NotFoundError } from "@/lib/api/errors";
import { assertYearPeriodActive } from "./year-period.service";
import { createAuditEntry } from "./audit.service";
import { tryPrismaOrFallback } from "./db-helper";
import { Prisma, type PaymentMethod } from "@prisma/client";
import type {
  CreateFundingInput,
  FundingQueryInput,
} from "@/lib/validation";

// ==============================================================================
// FUNDING & DONATIONS SERVICE
// ==============================================================================

async function generateFundingReference(yearPeriodId: string): Promise<string> {
  const count = await prisma.funding.count({
    where: { yearPeriodId },
  });
  const padded = String(count + 1).padStart(6, "0");
  return `FND-${yearPeriodId}-${padded}`;
}

export async function createFunding(
  data: CreateFundingInput,
  actorId?: string | null
) {
  return tryPrismaOrFallback(
    async () => {
      await assertYearPeriodActive(data.yearPeriodId);

      if (data.projectId && data.projectId.trim() !== "") {
        const project = await prisma.project.findUnique({
          where: { id: data.projectId },
        });
        if (!project) {
          throw new NotFoundError("Project", data.projectId);
        }
      }

      const referenceNumber = await generateFundingReference(data.yearPeriodId);
      const amountDecimal = new Prisma.Decimal(data.amountPKR);

      return prisma.$transaction(async (tx) => {
        const funding = await (tx as any).funding.create({
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

        if (funding.projectId) {
          await (tx as any).project.update({
            where: { id: funding.projectId },
            data: {
              currentFundingPKR: {
                increment: amountDecimal,
              },
            },
          });
        }

        await createAuditEntry(tx, {
          action: "CREATE",
          module: "FUNDING",
          recordId: funding.id,
          userId: actorId,
          metadata: {
            referenceNumber: funding.referenceNumber,
            source: funding.source,
            amountPKR: String(data.amountPKR),
          },
        });

        return funding;
      });
    },
    async () => {
      const store = readStore();
      const count = store.funding.length;
      const referenceNumber = `FND-${data.yearPeriodId}-${String(count + 1).padStart(6, "0")}`;

      const newFunding = {
        id: `fnd-${Date.now()}`,
        referenceNumber,
        date: data.receivedDate,
        amountPKR: Number(data.amountPKR),
        source: data.fundingSource,
        donorName: data.isAnonymous ? "Anonymous Benefactor" : data.donorName,
        donorContact: data.isAnonymous ? null : data.donorContact?.trim() || null,
        projectId: data.projectId || null,
        purpose: data.purpose || "General Foundation Support",
        paymentMethod: data.paymentMethod || "BANK_TRANSFER",
        receiptDocumentRef: data.receiptNumber || null,
        yearPeriodId: data.yearPeriodId,
        isAnonymous: data.isAnonymous,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        s.funding.unshift(newFunding);
        if (data.projectId) {
          const proj = s.projects.find((p) => p.id === data.projectId || p.slug === data.projectId);
          if (proj) {
            proj.currentFundingPKR += Number(data.amountPKR);
          }
        }
        s.auditLogs.push({
          id: `aud-${Date.now()}`,
          action: "CREATE",
          module: "FUNDING",
          recordId: newFunding.id,
          userId: actorId,
          timestamp: new Date().toISOString(),
          metadataJson: JSON.stringify({ referenceNumber }),
        });
      });

      return newFunding;
    }
  );
}

export async function getFundings(query: FundingQueryInput) {
  return tryPrismaOrFallback(
    async () => {
      const page = query.page || 1;
      const limit = query.limit || 20;
      const skip = (page - 1) * limit;

      const where: Prisma.FundingWhereInput = {
        deletedAt: null,
      };

      if (query.yearPeriodId) where.yearPeriodId = query.yearPeriodId;
      if (query.projectId) where.projectId = query.projectId;
      if (query.fundingSource) where.source = query.fundingSource;
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
              select: { id: true, year: true, label: true },
            },
            project: {
              select: { id: true, title: true, slug: true },
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
    },
    async () => {
      const store = readStore();
      let items = [...store.funding];

      if (query.yearPeriodId) items = items.filter((f) => f.yearPeriodId === query.yearPeriodId);
      if (query.projectId) items = items.filter((f) => f.projectId === query.projectId);
      if (query.fundingSource) items = items.filter((f) => f.source === query.fundingSource);
      if (query.minAmount !== undefined) items = items.filter((f) => f.amountPKR >= query.minAmount!);
      if (query.maxAmount !== undefined) items = items.filter((f) => f.amountPKR <= query.maxAmount!);
      if (query.search) {
        const term = query.search.toLowerCase().trim();
        items = items.filter(
          (f) =>
            f.referenceNumber.toLowerCase().includes(term) ||
            f.donorName.toLowerCase().includes(term) ||
            f.purpose.toLowerCase().includes(term)
        );
      }

      const page = query.page || 1;
      const limit = query.limit || 20;
      const total = items.length;
      const totalPages = Math.ceil(total / limit);
      const paginated = items.slice((page - 1) * limit, page * limit);

      return {
        fundings: paginated,
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
