import prisma from "@/lib/prisma";
import { readStore } from "@/lib/db/persistent-store";
import { tryPrismaOrFallback } from "@/lib/services/db-helper";
import type { FundingSummaryResult, AnalyticsDateFilter, ProjectFundingMetric } from "./types";

// ==============================================================================
// FUNDING & INFLOW ANALYTICS SERVICE — JUNGLAN FOUNDATION
// ==============================================================================
// Strictly conforming to Section 12 of Part 8 specification.
// Aggregates grant funding, project allocations, and source breakdown without exposing private donor contacts.

export async function getFundingSummary(
  params?: AnalyticsDateFilter & { projectId?: string }
): Promise<FundingSummaryResult> {
  const targetYear = String(params?.year || new Date().getFullYear());
  const targetMonth = params?.month ? Number(params.month) : null;
  const projectFilter = params?.projectId || null;

  return tryPrismaOrFallback(
    async () => {
      // 1. Fetch Funding & Projects from PostgreSQL
      const [fundings, projects] = await Promise.all([
        prisma.funding.findMany({
          where: {
            deletedAt: null,
            isArchived: false,
          },
          include: {
            project: true,
          },
        }),
        prisma.project.findMany(),
      ]);

      return computeFundingAggregates(fundings, projects, targetYear, targetMonth, projectFilter);
    },
    async () => {
      // 2. Fallback to Local Persistent Store
      const store = readStore();
      const fundings = (store.funding || []).filter(
        (f: any) => !f.deletedAt && !f.isArchived
      );
      const projects = store.projects || [];

      return computeFundingAggregates(fundings, projects, targetYear, targetMonth, projectFilter);
    }
  );
}

function computeFundingAggregates(
  fundings: Array<any>,
  projects: Array<any>,
  targetYear: string,
  targetMonth: number | null,
  projectFilter: string | null
): FundingSummaryResult {
  const fundingByYear: Record<string, number> = {};
  const fundingByMonth: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0,
  };
  const fundingBySource: Record<string, number> = {};
  const fundingByPaymentMethod: Record<string, number> = {};
  const projectTotals: Record<string, { title: string; amountPKR: number }> = {};

  // Initialize projects map
  for (const p of projects) {
    projectTotals[p.id] = {
      title: p.title || "Community Project",
      amountPKR: 0,
    };
  }

  let totalFilteredFunding = 0;

  for (const f of fundings) {
    const fundingDate = new Date(f.date || f.createdAt || Date.now());
    const itemYear = f.yearPeriodId || String(fundingDate.getFullYear());
    const itemMonth = fundingDate.getMonth() + 1;
    const amount = Number(f.amountPKR) || 0;

    // Multi-year totals
    fundingByYear[itemYear] = (fundingByYear[itemYear] || 0) + amount;

    if (itemYear === targetYear) {
      fundingByMonth[itemMonth] = (fundingByMonth[itemMonth] || 0) + amount;
    }

    // Filter match
    const matchesYear = !targetYear || itemYear === targetYear;
    const matchesMonth = targetMonth === null || itemMonth === targetMonth;
    const matchesProject = !projectFilter || f.projectId === projectFilter;

    if (matchesYear && matchesMonth && matchesProject) {
      totalFilteredFunding += amount;

      // Source breakdown
      const src = (f.source || "Individual Donor").trim();
      fundingBySource[src] = (fundingBySource[src] || 0) + amount;

      // Payment method
      const method = String(f.paymentMethod || "BANK_TRANSFER").toUpperCase();
      fundingByPaymentMethod[method] = (fundingByPaymentMethod[method] || 0) + amount;

      // Project breakdown
      if (f.projectId) {
        if (!projectTotals[f.projectId]) {
          projectTotals[f.projectId] = {
            title: f.project?.title || "Community Project",
            amountPKR: 0,
          };
        }
        projectTotals[f.projectId].amountPKR += amount;
      }
    }
  }

  const projectBreakdown: ProjectFundingMetric[] = Object.entries(projectTotals)
    .filter(([_, data]) => data.amountPKR > 0)
    .map(([projectId, data]) => ({
      projectId,
      projectTitle: data.title,
      amountPKR: data.amountPKR,
      percentageOfTotal:
        totalFilteredFunding > 0 ? Math.round((data.amountPKR / totalFilteredFunding) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.amountPKR - a.amountPKR);

  return {
    totalFundingPKR: totalFilteredFunding,
    year: targetYear,
    month: targetMonth,
    fundingByYear,
    fundingByMonth,
    fundingBySource,
    fundingByPaymentMethod,
    projectBreakdown,
    generatedAt: new Date().toISOString(),
  };
}
