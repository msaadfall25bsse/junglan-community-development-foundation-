// ==============================================================================
// INTERNAL SERVER-SIDE AI ENGINE (Strictly Private & Controlled)
// ==============================================================================

import { AIToolName, AIQueryParams } from "@/types/ai";

/**
 * Server-only tool dispatch table.
 * AI can ONLY call approved functions. No direct arbitrary database or SQL access.
 */
export const APPROVED_AI_DATA_TOOLS: Record<
  AIToolName,
  (params: AIQueryParams) => Promise<Record<string, unknown>>
> = {
  getPatientStatistics: async ({ yearPeriod }) => {
    return {
      yearPeriod,
      totalPatientsServed: 1850,
      emergencyCases: 1420,
      maternalTransits: 430,
    };
  },
  getTripStatistics: async ({ yearPeriod }) => {
    return {
      yearPeriod,
      totalTripsCompleted: 1850,
      averageDistanceKm: 34.5,
      averageResponseTimeMins: 14,
    };
  },
  getExpenseSummary: async ({ yearPeriod }) => {
    return {
      yearPeriod,
      totalExpensesUsd: 42500,
      fuelPercentage: 48,
      maintenancePercentage: 28,
      suppliesPercentage: 24,
    };
  },
  getFundingSummary: async ({ yearPeriod }) => {
    return {
      yearPeriod,
      totalFundingReceivedUsd: 68000,
      donorCount: 450,
      institutionalGrants: 2,
    };
  },
  getAmbulanceStatistics: async () => {
    return {
      activeFleetCount: 1,
      readinessStatus: "100% Operational",
      currentOdometerKm: 42350,
    };
  },
  getMaintenanceSummary: async ({ yearPeriod }) => {
    return {
      yearPeriod,
      servicesCount: 12,
      majorRepairs: 1,
    };
  },
  getFuelSummary: async ({ yearPeriod }) => {
    return {
      yearPeriod,
      totalLitersConsumed: 5400,
      averageKmPerLiter: 9.8,
    };
  },
  getMonthlyReportData: async ({ yearPeriod, month }) => {
    return {
      yearPeriod,
      month: month || 8,
      headline: `Monthly Operations Summary for ${month || 8}/${yearPeriod}`,
    };
  },
  getAnnualReportData: async ({ yearPeriod }) => {
    return {
      yearPeriod,
      headline: `Annual Comprehensive Impact for ${yearPeriod}`,
    };
  },
};
