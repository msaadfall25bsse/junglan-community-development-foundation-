import { prisma } from "@/lib/prisma";
import { readStore, updateStore } from "@/lib/db";
import { NotFoundError, ConflictError } from "@/lib/api/errors";
import { assertYearPeriodActive } from "./year-period.service";
import { createAuditEntry } from "./audit.service";
import { tryPrismaOrFallback } from "./db-helper";
import { Prisma, type ExpenseCategory } from "@prisma/client";
import type {
  CreateExpenseInput,
  UpdateExpenseInput,
  ExpenseQueryInput,
} from "@/lib/validation";

// ==============================================================================
// FINANCIAL EXPENSE SERVICE
// ==============================================================================

export async function generateVoucherNumber(yearPeriodId: string): Promise<string> {
  return tryPrismaOrFallback(
    async () => {
      const count = await prisma.expense.count({ where: { yearPeriodId } });
      return `EXP-${yearPeriodId}-${String(count + 1).padStart(6, "0")}`;
    },
    async () => {
      const store = readStore();
      const count = (store.expenses || []).filter((e) => e.yearPeriodId === yearPeriodId).length;
      return `EXP-${yearPeriodId}-${String(count + 1).padStart(6, "0")}`;
    }
  );
}

function mapToPrismaExpenseCategory(category: string): ExpenseCategory {
  if (category.includes("FUEL")) return "FUEL";
  if (category.includes("MAINTENANCE")) return "MAINTENANCE";
  if (category.includes("REPAIR")) return "REPAIR";
  if (category.includes("SUPPLIES")) return "SUPPLIES";
  if (["FUEL", "MAINTENANCE", "REPAIR", "OPERATIONS", "SUPPLIES", "OTHER"].includes(category)) {
    return category as ExpenseCategory;
  }
  return "OPERATIONS";
}

export async function createExpense(
  data: CreateExpenseInput,
  actorId: string
) {
  const voucherNumber = data.voucherNumber && data.voucherNumber.trim().length > 0
    ? data.voucherNumber.trim()
    : await generateVoucherNumber(data.yearPeriodId);

  return tryPrismaOrFallback(
    async () => {
      await assertYearPeriodActive(data.yearPeriodId);

      const existing = await prisma.expense.findUnique({
        where: { voucherNumber },
      });

      if (existing) {
        throw new ConflictError(
          `An expense voucher with number '${voucherNumber}' already exists.`
        );
      }

      const prismaCategory = mapToPrismaExpenseCategory(data.category);

      return prisma.$transaction(async (tx) => {
        const expense = await (tx as any).expense.create({
          data: {
            voucherNumber,
            title: data.title,
            category: prismaCategory,
            amountPKR: new Prisma.Decimal(data.amountPKR),
            paidTo: data.paidTo,
            date: new Date(data.expenseDate),
            description: data.description,
            receiptDocumentRef: data.receiptDocumentUrl || null,
            yearPeriodId: data.yearPeriodId,
            loggedByUserId: actorId,
          },
        });

        // Audit Log Entry
        await createAuditEntry(tx, {
          userId: actorId,
          action: "CREATE",
          module: "EXPENSES",
          recordId: expense.id,
          metadata: {
            voucherNumber: expense.voucherNumber,
            amountPKR: expense.amountPKR.toString(),
            category: expense.category,
          },
        });

        return expense;
      });
    },
    async () => {
      const store = readStore();
      const existing = store.expenses.find((e) => e.voucherNumber === voucherNumber);
      if (existing) {
        throw new ConflictError(
          `An expense voucher with number '${voucherNumber}' already exists.`
        );
      }

      const newExpense = {
        id: `exp-${Date.now()}`,
        voucherNumber,
        date: data.expenseDate,
        amountPKR: Number(data.amountPKR),
        category: (mapToPrismaExpenseCategory(data.category) as any) || "OPERATIONS",
        title: data.title,
        description: data.description,
        paidTo: data.paidTo,
        receiptDocumentRef: data.receiptDocumentUrl || null,
        status: "APPROVED" as const,
        yearPeriodId: data.yearPeriodId,
        loggedByUserId: actorId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        s.expenses.unshift(newExpense);
        s.auditLogs.push({
          id: `aud-${Date.now()}`,
          action: "CREATE",
          module: "EXPENSES",
          recordId: newExpense.id,
          userId: actorId,
          timestamp: new Date().toISOString(),
          metadataJson: JSON.stringify({ voucherNumber: newExpense.voucherNumber }),
        });
      });

      return newExpense;
    }
  );
}

export async function getExpenses(query: ExpenseQueryInput) {
  return tryPrismaOrFallback(
    async () => {
      const page = query.page || 1;
      const limit = query.limit || 20;
      const skip = (page - 1) * limit;

      const where: Prisma.ExpenseWhereInput = {
        deletedAt: null,
      };

      if (query.yearPeriodId) where.yearPeriodId = query.yearPeriodId;
      if (query.category) where.category = mapToPrismaExpenseCategory(query.category);
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
          { voucherNumber: { contains: term, mode: "insensitive" } },
          { title: { contains: term, mode: "insensitive" } },
          { paidTo: { contains: term, mode: "insensitive" } },
          { description: { contains: term, mode: "insensitive" } },
        ];
      }

      const [total, expenses] = await Promise.all([
        prisma.expense.count({ where }),
        prisma.expense.findMany({
          where,
          skip,
          take: limit,
          orderBy: { date: "desc" },
          include: {
            yearPeriod: {
              select: { id: true, year: true, label: true },
            },
          },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        expenses,
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
      let items = [...store.expenses];

      if (query.yearPeriodId) items = items.filter((e) => e.yearPeriodId === query.yearPeriodId);
      if (query.category) items = items.filter((e) => e.category.includes(query.category!));
      if (query.minAmount !== undefined) items = items.filter((e) => e.amountPKR >= query.minAmount!);
      if (query.maxAmount !== undefined) items = items.filter((e) => e.amountPKR <= query.maxAmount!);
      if (query.search) {
        const term = query.search.toLowerCase().trim();
        items = items.filter(
          (e) =>
            e.voucherNumber.toLowerCase().includes(term) ||
            e.title.toLowerCase().includes(term) ||
            e.paidTo.toLowerCase().includes(term) ||
            e.description.toLowerCase().includes(term)
        );
      }

      const page = query.page || 1;
      const limit = query.limit || 20;
      const total = items.length;
      const totalPages = Math.ceil(total / limit);
      const paginated = items.slice((page - 1) * limit, page * limit);

      return {
        expenses: paginated,
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

export async function getExpenseById(id: string) {
  return tryPrismaOrFallback(
    async () => {
      const expense = await prisma.expense.findFirst({
        where: { id, deletedAt: null },
        include: { yearPeriod: true },
      });

      if (!expense) {
        throw new NotFoundError("Expense", id);
      }

      return expense;
    },
    async () => {
      const store = readStore();
      const expense = store.expenses.find((e) => e.id === id || e.voucherNumber === id);
      if (!expense) {
        throw new NotFoundError("Expense", id);
      }
      return expense;
    }
  );
}

export async function updateExpense(
  id: string,
  data: UpdateExpenseInput,
  actorId?: string | null
) {
  return tryPrismaOrFallback(
    async () => {
      const expense = await prisma.expense.findUnique({
        where: { id },
      });

      if (!expense || expense.deletedAt) {
        throw new NotFoundError("Expense", id);
      }

      const updateData: Prisma.ExpenseUpdateInput = {};
      if (data.title) updateData.title = data.title;
      if (data.category) updateData.category = mapToPrismaExpenseCategory(data.category);
      if (data.amountPKR !== undefined) updateData.amountPKR = new Prisma.Decimal(data.amountPKR);
      if (data.paidTo) updateData.paidTo = data.paidTo;
      if (data.expenseDate) updateData.date = new Date(data.expenseDate);
      if (data.description !== undefined) updateData.description = data.description;
      if (data.receiptDocumentUrl !== undefined) updateData.receiptDocumentRef = data.receiptDocumentUrl;

      return prisma.$transaction(async (tx) => {
        const updated = await tx.expense.update({
          where: { id },
          data: updateData,
        });

        await createAuditEntry(tx, {
          action: "UPDATE",
          module: "EXPENSES",
          recordId: updated.id,
          userId: actorId,
          metadata: {
            voucherNumber: updated.voucherNumber,
            amountPKR: String(updated.amountPKR),
          },
        });

        return updated;
      });
    },
    async () => {
      const store = readStore();
      const idx = (store.expenses || []).findIndex(
        (e) => e.id === id || e.voucherNumber === id
      );

      if (idx === -1 || (store.expenses[idx] as any).deletedAt) {
        throw new NotFoundError("Expense", id);
      }

      const current = store.expenses[idx];
      const updated = {
        ...current,
        title: data.title || current.title,
        category: data.category
          ? (mapToPrismaExpenseCategory(data.category) as any)
          : current.category,
        amountPKR: data.amountPKR !== undefined ? Number(data.amountPKR) : current.amountPKR,
        paidTo: data.paidTo || current.paidTo,
        date: data.expenseDate || current.date,
        description: data.description !== undefined ? data.description : current.description,
        receiptDocumentRef:
          data.receiptDocumentUrl !== undefined
            ? data.receiptDocumentUrl
            : current.receiptDocumentRef,
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        s.expenses[idx] = updated;
        s.auditLogs.push({
          id: `aud-${Date.now()}`,
          action: "UPDATE",
          module: "EXPENSES",
          recordId: updated.id,
          userId: actorId,
          timestamp: new Date().toISOString(),
          metadataJson: JSON.stringify({
            voucherNumber: updated.voucherNumber,
            action: "UPDATE_EXPENSE",
          }),
        });
      });

      return updated;
    }
  );
}

export async function archiveExpense(id: string, actorId?: string | null) {
  return tryPrismaOrFallback(
    async () => {
      const expense = await prisma.expense.findUnique({
        where: { id },
      });

      if (!expense || expense.deletedAt) {
        throw new NotFoundError("Expense", id);
      }

      return prisma.$transaction(async (tx) => {
        const archived = await tx.expense.update({
          where: { id },
          data: {
            isArchived: true,
            deletedAt: new Date(),
            status: "REJECTED",
          },
        });

        await createAuditEntry(tx, {
          action: "ARCHIVE",
          module: "EXPENSES",
          recordId: archived.id,
          userId: actorId,
          metadata: {
            voucherNumber: archived.voucherNumber,
            reason: "Voucher voided and archived",
          },
        });

        return archived;
      });
    },
    async () => {
      const store = readStore();
      const idx = (store.expenses || []).findIndex(
        (e) => e.id === id || e.voucherNumber === id
      );

      if (idx === -1) {
        throw new NotFoundError("Expense", id);
      }

      const expense = store.expenses[idx];
      const archived = {
        ...expense,
        isArchived: true,
        deletedAt: new Date().toISOString(),
        status: "REJECTED" as const,
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        s.expenses[idx] = archived as any;
        s.auditLogs.push({
          id: `aud-${Date.now()}`,
          action: "ARCHIVE",
          module: "EXPENSES",
          recordId: archived.id,
          userId: actorId,
          timestamp: new Date().toISOString(),
          metadataJson: JSON.stringify({
            voucherNumber: archived.voucherNumber,
            action: "ARCHIVE_EXPENSE",
          }),
        });
      });

      return archived;
    }
  );
}

