import { prisma } from "@/lib/prisma";
import { readStore, updateStore } from "@/lib/db";
import { NotFoundError } from "@/lib/api/errors";
import { assertYearPeriodActive } from "./year-period.service";
import { createAuditEntry } from "./audit.service";
import { tryPrismaOrFallback } from "./db-helper";
import { Prisma, type PaymentMethod } from "@prisma/client";
import type {
  CreateFundingInput,
  UpdateFundingInput,
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

export async function getFundingById(idOrRef: string) {
  return tryPrismaOrFallback(
    async () => {
      const record = await prisma.funding.findFirst({
        where: {
          OR: [{ id: idOrRef }, { referenceNumber: idOrRef }],
          deletedAt: null,
        },
        include: {
          project: true,
          yearPeriod: true,
        },
      });

      if (!record) {
        throw new NotFoundError("Funding", idOrRef);
      }

      return record;
    },
    async () => {
      const store = readStore();
      const record = (store.funding || []).find(
        (f) => f.id === idOrRef || f.referenceNumber === idOrRef
      );

      if (!record) {
        throw new NotFoundError("Funding", idOrRef);
      }

      const project = record.projectId
        ? (store.projects || []).find((p) => p.id === record.projectId)
        : null;

      return {
        ...record,
        project,
      };
    }
  );
}

export async function updateFunding(
  id: string,
  data: UpdateFundingInput,
  actorId?: string | null
) {
  return tryPrismaOrFallback(
    async () => {
      const existing = await prisma.funding.findUnique({
        where: { id },
      });

      if (!existing || existing.deletedAt) {
        throw new NotFoundError("Funding", id);
      }

      const updateData: Prisma.FundingUpdateInput = {};
      if (data.donorName) updateData.donorName = data.isAnonymous ? "Anonymous Benefactor" : data.donorName;
      if (data.donorContact !== undefined) updateData.donorContact = data.isAnonymous ? null : data.donorContact || null;
      if (data.fundingSource) updateData.source = data.fundingSource;
      if (data.purpose !== undefined) updateData.purpose = data.purpose || "General Foundation Support";
      if (data.paymentMethod) updateData.paymentMethod = data.paymentMethod as PaymentMethod;
      if (data.receiptNumber !== undefined) updateData.receiptDocumentRef = data.receiptNumber || null;
      if (data.isAnonymous !== undefined) updateData.isAnonymous = data.isAnonymous;
      if (data.receivedDate) updateData.date = new Date(data.receivedDate);

      // Handle amount change and project allocation
      let amountDiff = new Prisma.Decimal(0);
      if (data.amountPKR !== undefined) {
        const newAmt = new Prisma.Decimal(data.amountPKR);
        amountDiff = newAmt.sub(existing.amountPKR);
        updateData.amountPKR = newAmt;
      }

      return prisma.$transaction(async (tx) => {
        const updated = await tx.funding.update({
          where: { id },
          data: updateData,
        });

        if (existing.projectId && !amountDiff.isZero()) {
          await tx.project.update({
            where: { id: existing.projectId },
            data: {
              currentFundingPKR: {
                increment: amountDiff,
              },
            },
          });
        }

        await createAuditEntry(tx, {
          action: "UPDATE",
          module: "FUNDING",
          recordId: updated.id,
          userId: actorId,
          metadata: {
            referenceNumber: updated.referenceNumber,
            amountPKR: String(updated.amountPKR),
          },
        });

        return updated;
      });
    },
    async () => {
      const store = readStore();
      const idx = (store.funding || []).findIndex(
        (f) => f.id === id || f.referenceNumber === id
      );

      if (idx === -1 || (store.funding[idx] as any).deletedAt) {
        throw new NotFoundError("Funding", id);
      }

      const current = store.funding[idx];
      const oldAmount = Number(current.amountPKR);
      const newAmount = data.amountPKR !== undefined ? Number(data.amountPKR) : oldAmount;
      const amountDiff = newAmount - oldAmount;

      const updated = {
        ...current,
        donorName: data.isAnonymous
          ? "Anonymous Benefactor"
          : data.donorName || current.donorName,
        donorContact: data.isAnonymous
          ? null
          : data.donorContact !== undefined
          ? data.donorContact
          : (current as any).donorContact,
        source: data.fundingSource || current.source,
        amountPKR: newAmount,
        purpose: data.purpose !== undefined ? data.purpose : current.purpose,
        paymentMethod: data.paymentMethod || current.paymentMethod,
        receiptDocumentRef:
          data.receiptNumber !== undefined ? data.receiptNumber : current.receiptDocumentRef,
        isAnonymous: data.isAnonymous !== undefined ? data.isAnonymous : current.isAnonymous,
        date: data.receivedDate || current.date,
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        s.funding[idx] = updated;

        if (current.projectId && amountDiff !== 0) {
          const proj = (s.projects || []).find((p) => p.id === current.projectId);
          if (proj) {
            proj.currentFundingPKR = Math.max(0, Number(proj.currentFundingPKR) + amountDiff);
          }
        }

        s.auditLogs.push({
          id: `aud-${Date.now()}`,
          action: "UPDATE",
          module: "FUNDING",
          recordId: updated.id,
          userId: actorId,
          timestamp: new Date().toISOString(),
          metadataJson: JSON.stringify({
            referenceNumber: updated.referenceNumber,
            action: "UPDATE_FUNDING",
          }),
        });
      });

      return updated;
    }
  );
}

export async function archiveFunding(id: string, actorId?: string | null) {
  return tryPrismaOrFallback(
    async () => {
      const existing = await prisma.funding.findUnique({
        where: { id },
      });

      if (!existing || existing.deletedAt) {
        throw new NotFoundError("Funding", id);
      }

      return prisma.$transaction(async (tx) => {
        const archived = await tx.funding.update({
          where: { id },
          data: {
            isArchived: true,
            deletedAt: new Date(),
          },
        });

        if (existing.projectId) {
          await tx.project.update({
            where: { id: existing.projectId },
            data: {
              currentFundingPKR: {
                decrement: existing.amountPKR,
              },
            },
          });
        }

        await createAuditEntry(tx, {
          action: "ARCHIVE",
          module: "FUNDING",
          recordId: archived.id,
          userId: actorId,
          metadata: {
            referenceNumber: archived.referenceNumber,
            reason: "Funding record voided and archived",
          },
        });

        return archived;
      });
    },
    async () => {
      const store = readStore();
      const idx = (store.funding || []).findIndex(
        (f) => f.id === id || f.referenceNumber === id
      );

      if (idx === -1) {
        throw new NotFoundError("Funding", id);
      }

      const funding = store.funding[idx];
      const archived = {
        ...funding,
        isArchived: true,
        deletedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        s.funding[idx] = archived as any;

        if (funding.projectId) {
          const proj = (s.projects || []).find((p) => p.id === funding.projectId);
          if (proj) {
            proj.currentFundingPKR = Math.max(0, Number(proj.currentFundingPKR) - Number(funding.amountPKR));
          }
        }

        s.auditLogs.push({
          id: `aud-${Date.now()}`,
          action: "ARCHIVE",
          module: "FUNDING",
          recordId: archived.id,
          userId: actorId,
          timestamp: new Date().toISOString(),
          metadataJson: JSON.stringify({
            referenceNumber: archived.referenceNumber,
            action: "ARCHIVE_FUNDING",
          }),
        });
      });

      return archived;
    }
  );
}

