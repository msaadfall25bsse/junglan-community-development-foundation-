import { prisma } from "@/lib/prisma";
import { NotFoundError, ConflictError } from "@/lib/api/errors";
import { assertYearPeriodActive } from "./year-period.service";
import { createAuditEntry } from "./audit.service";
import { Prisma, type ExpenseCategory } from "@prisma/client";
import type {
  CreateExpenseInput,
  ExpenseQueryInput,
} from "@/lib/validation";

// ==============================================================================
// FINANCIAL EXPENSE SERVICE
// ==============================================================================
// Section 20 & 48: Strict Decimal precision, voucher uniqueness, and transaction safety.

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

/**
 * Creates a verified financial expense voucher within a transaction
 */
export async function createExpense(
  data: CreateExpenseInput,
  actorId: string
) {
  // 1. Enforce active fiscal year guard
  await assertYearPeriodActive(data.yearPeriodId);

  // 2. Check for voucher uniqueness
  const existing = await prisma.expense.findUnique({
    where: { voucherNumber: data.voucherNumber.trim() },
  });

  if (existing) {
    throw new ConflictError(
      `An expense voucher with number '${data.voucherNumber}' already exists.`
    );
  }

  const prismaCategory = mapToPrismaExpenseCategory(data.category);

  // 3. Atomic Transaction: create expense with strict Decimal + audit entry
  return prisma.$transaction(async (tx) => {
    const expense = await tx.expense.create({
      data: {
        voucherNumber: data.voucherNumber.trim(),
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

    await createAuditEntry(tx, {
      action: "CREATE",
      module: "EXPENSES",
      recordId: expense.id,
      userId: actorId,
      metadata: {
        voucherNumber: expense.voucherNumber,
        category: expense.category,
        amountPKR: String(data.amountPKR),
      },
    });

    return expense;
  });
}

/**
 * Paginated list of expenses with filtering by category, date, and amount
 */
export async function getExpenses(query: ExpenseQueryInput) {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  const where: Prisma.ExpenseWhereInput = {
    deletedAt: null,
  };

  if (query.yearPeriodId) {
    where.yearPeriodId = query.yearPeriodId;
  }
  if (query.category) {
    where.category = mapToPrismaExpenseCategory(query.category);
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
          select: {
            id: true,
            year: true,
            label: true,
          },
        },
        loggedByUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
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
}

/**
 * Retrieves a single expense voucher by ID
 */
export async function getExpenseById(id: string) {
  const expense = await prisma.expense.findFirst({
    where: { id, deletedAt: null },
    include: {
      yearPeriod: true,
      loggedByUser: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  if (!expense) {
    throw new NotFoundError("Expense", id);
  }

  return expense;
}
