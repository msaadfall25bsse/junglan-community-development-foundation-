import { prisma } from "@/lib/prisma";
import { NotFoundError, ConflictError } from "@/lib/api/errors";
import type { Prisma, YearPeriod } from "@prisma/client";
import type { PaginationQueryInput } from "@/lib/validation";

// ==============================================================================
// YEAR PERIOD SERVICE
// ==============================================================================
// Section 14: Single-active year rule and historical audit protection.

/**
 * Retrieves the currently active operational fiscal year
 */
export async function getActiveYearPeriod(): Promise<YearPeriod> {
  const activeYear = await prisma.yearPeriod.findFirst({
    where: {
      isCurrentActive: true,
      status: "ACTIVE",
    },
  });

  if (!activeYear) {
    // Fallback to latest ACTIVE period
    const fallback = await prisma.yearPeriod.findFirst({
      where: { status: "ACTIVE" },
      orderBy: { year: "desc" },
    });

    if (!fallback) {
      throw new NotFoundError("Active YearPeriod", "current");
    }
    return fallback;
  }

  return activeYear;
}

/**
 * Guard utility: Validates that a YearPeriod exists and is active.
 * Throws ConflictError if the year is closed or archived.
 */
export async function assertYearPeriodActive(yearPeriodId: string): Promise<YearPeriod> {
  const period = await prisma.yearPeriod.findUnique({
    where: { id: yearPeriodId },
  });

  if (!period) {
    throw new NotFoundError("YearPeriod", yearPeriodId);
  }

  if (period.status !== "ACTIVE") {
    throw new ConflictError(
      `Operational Year Period '${period.label}' (${period.id}) is ${period.status}. Historical records cannot be modified or added to inactive periods.`
    );
  }

  return period;
}

/**
 * Paginated list of all YearPeriods (active, closed, archived)
 */
export async function getYearPeriods(query?: PaginationQueryInput) {
  const page = query?.page || 1;
  const limit = query?.limit || 20;
  const skip = (page - 1) * limit;

  const where: Prisma.YearPeriodWhereInput = {};

  const [total, periods] = await Promise.all([
    prisma.yearPeriod.count({ where }),
    prisma.yearPeriod.findMany({
      where,
      skip,
      take: limit,
      orderBy: { year: "desc" },
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    periods,
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
