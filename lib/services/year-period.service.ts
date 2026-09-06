import { prisma } from "@/lib/prisma";
import { readStore } from "@/lib/db";
import { NotFoundError, ConflictError } from "@/lib/api/errors";
import { tryPrismaOrFallback } from "./db-helper";
import type { Prisma, YearPeriod } from "@prisma/client";
import type { PaginationQueryInput } from "@/lib/validation";

// ==============================================================================
// YEAR PERIOD SERVICE
// ==============================================================================

export async function getActiveYearPeriod(): Promise<YearPeriod> {
  return tryPrismaOrFallback(
    async () => {
      const activeYear = await prisma.yearPeriod.findFirst({
        where: { isCurrentActive: true, status: "ACTIVE" },
      });

      if (!activeYear) {
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
    },
    async () => {
      const store = readStore();
      const active = store.yearPeriods.find((y) => y.isCurrentActive && y.status === "ACTIVE");
      if (active) {
        return {
          id: active.id,
          year: active.year,
          label: active.label,
          status: active.status as any,
          startDate: new Date(active.startDate),
          endDate: new Date(active.endDate),
          isCurrentActive: active.isCurrentActive,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
      return {
        id: "2026",
        year: 2026,
        label: "Operational Year 2026",
        status: "ACTIVE" as any,
        startDate: new Date("2026-01-01T00:00:00.000Z"),
        endDate: new Date("2026-12-31T23:59:59.000Z"),
        isCurrentActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  );
}

export async function assertYearPeriodActive(yearPeriodId: string): Promise<YearPeriod> {
  return tryPrismaOrFallback(
    async () => {
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
    },
    async () => {
      const store = readStore();
      const period = store.yearPeriods.find((y) => y.id === yearPeriodId);
      if (!period) {
        throw new NotFoundError("YearPeriod", yearPeriodId);
      }
      if (period.status !== "ACTIVE") {
        throw new ConflictError(
          `Operational Year Period '${period.label}' (${period.id}) is ${period.status}. Historical records cannot be modified or added to inactive periods.`
        );
      }
      return {
        id: period.id,
        year: period.year,
        label: period.label,
        status: period.status as any,
        startDate: new Date(period.startDate),
        endDate: new Date(period.endDate),
        isCurrentActive: period.isCurrentActive,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  );
}

export async function getYearPeriods(query?: PaginationQueryInput) {
  return tryPrismaOrFallback(
    async () => {
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
    },
    async () => {
      const store = readStore();
      return {
        periods: store.yearPeriods,
        pagination: {
          page: 1,
          limit: 20,
          total: store.yearPeriods.length,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }
  );
}
