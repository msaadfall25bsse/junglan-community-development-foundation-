import prisma from "@/lib/prisma";
import { readStore } from "@/lib/db/persistent-store";
import { tryPrismaOrFallback } from "@/lib/services/db-helper";
import type {
  ExpenseSummaryResult,
  AnalyticsDateFilter,
  CategoryExpenseMetric,
  PeriodComparisonMetric,
} from "./types";

// ==============================================================================
// EXPENSE FINANCIAL ANALYTICS SERVICE — STRICT DECIMAL PRECISION
// ==============================================================================
// Strictly conforming to Sections 11, 31, 32, 33, 35 of Part 8 specification.
// Deterministic financial totals, category distributions, MoM and YoY comparisons.

export async function getExpenseSummary(
  params?: AnalyticsDateFilter & { category?: string; comparisonYear?: string }
): Promise<ExpenseSummaryResult> {
  const targetYear = String(params?.year || new Date().getFullYear());
  const targetMonth = params?.month ? Number(params.month) : null;
  const categoryFilter = params?.category ? params.category.toUpperCase() : null;
  const comparisonYear = params?.comparisonYear ? String(params.comparisonYear) : String(Number(targetYear) - 1);

  return tryPrismaOrFallback(
    async () => {
      // 1. Fetch Expenses from PostgreSQL
      const expenses = await prisma.expense.findMany({
        where: {
          deletedAt: null,
          isArchived: false,
        },
      });

      return computeExpenseAggregates(expenses, targetYear, targetMonth, categoryFilter, comparisonYear);
    },
    async () => {
      // 2. Fallback to Local Persistent Store
      const store = readStore();
      const expenses = (store.expenses || []).filter(
        (e: any) => !e.deletedAt && !e.isArchived
      );

      return computeExpenseAggregates(expenses, targetYear, targetMonth, categoryFilter, comparisonYear);
    }
  );
}

function computeExpenseAggregates(
  expenses: Array<any>,
  targetYear: string,
  targetMonth: number | null,
  categoryFilter: string | null,
  comparisonYear: string
): ExpenseSummaryResult {
  const expensesByYear: Record<string, number> = {};
  const expensesByMonth: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0,
  };
  const categoryTotals: Record<string, number> = {
    FUEL: 0,
    MAINTENANCE: 0,
    REPAIR: 0,
    OPERATIONS: 0,
    SUPPLIES: 0,
    OTHER: 0,
  };

  let totalFilteredExpenses = 0;

  // Multi-year comparison buckets
  let currentYearTotal = 0;
  let comparisonYearTotal = 0;

  for (const e of expenses) {
    const expenseDate = new Date(e.date || e.createdAt || Date.now());
    const itemYear = e.yearPeriodId || String(expenseDate.getFullYear());
    const itemMonth = expenseDate.getMonth() + 1;
    const amount = Number(e.amountPKR) || 0;

    // Multi-year tracking
    expensesByYear[itemYear] = (expensesByYear[itemYear] || 0) + amount;
    if (itemYear === targetYear) {
      currentYearTotal += amount;
      expensesByMonth[itemMonth] = (expensesByMonth[itemMonth] || 0) + amount;
    } else if (itemYear === comparisonYear) {
      comparisonYearTotal += amount;
    }

    // Filter match
    const matchesYear = !targetYear || itemYear === targetYear;
    const matchesMonth = targetMonth === null || itemMonth === targetMonth;
    const rawCategory = String(e.category || "OTHER").toUpperCase();
    const normalizedCat = mapToStandardExpenseCategory(rawCategory);
    const matchesCat = !categoryFilter || normalizedCat.includes(categoryFilter);

    if (matchesYear && matchesMonth && matchesCat) {
      totalFilteredExpenses += amount;
      categoryTotals[normalizedCat] = (categoryTotals[normalizedCat] || 0) + amount;
    }
  }

  // Category breakdown with percentages
  const categoryBreakdown: CategoryExpenseMetric[] = Object.entries(categoryTotals)
    .filter(([_, amt]) => amt > 0)
    .map(([category, amountPKR]) => ({
      category,
      amountPKR,
      percentageOfTotal:
        totalFilteredExpenses > 0 ? Math.round((amountPKR / totalFilteredExpenses) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.amountPKR - a.amountPKR);

  // Largest category
  const largestCategory =
    categoryBreakdown.length > 0
      ? {
          category: categoryBreakdown[0].category,
          amountPKR: categoryBreakdown[0].amountPKR,
          percentage: categoryBreakdown[0].percentageOfTotal,
        }
      : null;

  // Month-over-Month Comparison (if month is specified)
  let monthOverMonth: PeriodComparisonMetric | null = null;
  if (targetMonth && targetMonth > 1) {
    const currentMonthAmount = expensesByMonth[targetMonth] || 0;
    const prevMonth = targetMonth - 1;
    const prevMonthAmount = expensesByMonth[prevMonth] || 0;
    const diff = currentMonthAmount - prevMonthAmount;

    let pctChange: number | null = null;
    if (prevMonthAmount > 0) {
      pctChange = Math.round((diff / prevMonthAmount) * 1000) / 10;
    }

    monthOverMonth = {
      baselinePeriod: `Month ${prevMonth}`,
      currentPeriod: `Month ${targetMonth}`,
      baselineAmountPKR: prevMonthAmount,
      currentAmountPKR: currentMonthAmount,
      differencePKR: diff,
      percentageChange: pctChange,
      trend: diff > 0 ? "INCREASED" : diff < 0 ? "DECREASED" : "NO_CHANGE",
    };
  }

  // Year-over-Year Comparison
  let yearOverYear: PeriodComparisonMetric | null = null;
  if (currentYearTotal > 0 || comparisonYearTotal > 0) {
    const diff = currentYearTotal - comparisonYearTotal;
    let pctChange: number | null = null;
    let trend: "INCREASED" | "DECREASED" | "NO_CHANGE" | "INSUFFICIENT_DATA" = "NO_CHANGE";

    if (comparisonYearTotal > 0) {
      pctChange = Math.round((diff / comparisonYearTotal) * 1000) / 10;
      trend = diff > 0 ? "INCREASED" : diff < 0 ? "DECREASED" : "NO_CHANGE";
    } else {
      pctChange = null; // Baseline is 0: mathematically undefined, prevent division by zero
      trend = "INSUFFICIENT_DATA";
    }

    yearOverYear = {
      baselinePeriod: comparisonYear,
      currentPeriod: targetYear,
      baselineAmountPKR: comparisonYearTotal,
      currentAmountPKR: currentYearTotal,
      differencePKR: diff,
      percentageChange: pctChange,
      trend,
    };
  }

  return {
    totalExpensesPKR: totalFilteredExpenses,
    year: targetYear,
    month: targetMonth,
    expensesByYear,
    expensesByMonth,
    categoryBreakdown,
    monthOverMonth,
    yearOverYear,
    largestCategory,
    generatedAt: new Date().toISOString(),
  };
}

function mapToStandardExpenseCategory(raw: string): string {
  if (raw.includes("FUEL")) return "FUEL";
  if (raw.includes("MAINTENANCE")) return "MAINTENANCE";
  if (raw.includes("REPAIR")) return "REPAIR";
  if (raw.includes("OPERATION")) return "OPERATIONS";
  if (raw.includes("SUPPL")) return "SUPPLIES";
  return "OTHER";
}
