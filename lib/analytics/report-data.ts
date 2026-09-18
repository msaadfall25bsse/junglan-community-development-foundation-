import { getPatientStatistics } from "./patient-analytics";
import { getTripStatistics } from "./trip-analytics";
import { getExpenseSummary } from "./expense-analytics";
import { getFundingSummary } from "./funding-analytics";
import {
  getAmbulanceStatistics,
  getFuelSummary,
  getMaintenanceSummary,
} from "./fleet-analytics";
import type { MonthlyReportDataResult, AnnualReportDataResult } from "./types";

// ==============================================================================
// STRUCTURED REPORT DATA PREPARATION SERVICE — PART 9 INTEGRATION READY
// ==============================================================================
// Strictly conforming to Sections 16, 17, 109, 110 of Part 8 specification.
// Prepares deterministic multi-module aggregate datasets for future PDF/DOCX generators.

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export async function getMonthlyReportData(params: {
  year: string | number;
  month: number;
}): Promise<MonthlyReportDataResult> {
  const year = String(params.year || new Date().getFullYear());
  const month = Number(params.month);

  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Month must be an integer between 1 and 12.`);
  }

  // Fetch all module aggregates in parallel
  const [patients, trips, expenses, funding, fuel, maintenance, fleet] = await Promise.all([
    getPatientStatistics({ year, month }),
    getTripStatistics({ year, month }),
    getExpenseSummary({ year, month }),
    getFundingSummary({ year, month }),
    getFuelSummary({ year, month }),
    getMaintenanceSummary({ year, month }),
    getAmbulanceStatistics({ year }),
  ]);

  const treasuryNetPKR = funding.totalFundingPKR - expenses.totalExpensesPKR;
  const monthName = MONTH_NAMES[month - 1];

  // Derive factual, deterministic observations
  const observations: string[] = [];
  observations.push(
    `During ${monthName} ${year}, ${patients.totalPatients} patient cases were recorded with ${patients.emergencyRatio.emergency} emergency interventions.`
  );
  observations.push(
    `Fleet completed ${trips.totalTrips} operational trips covering ${trips.totalDistanceKm.toLocaleString()} km.`
  );
  observations.push(
    `Total operational expenditures stood at PKR ${expenses.totalExpensesPKR.toLocaleString()} against inflow of PKR ${funding.totalFundingPKR.toLocaleString()} (Net: PKR ${treasuryNetPKR.toLocaleString()}).`
  );

  if (expenses.monthOverMonth?.percentageChange !== null && expenses.monthOverMonth?.percentageChange !== undefined) {
    const trendWord = expenses.monthOverMonth.trend === "INCREASED" ? "increased" : "decreased";
    observations.push(
      `Monthly expenditure ${trendWord} by ${Math.abs(expenses.monthOverMonth.percentageChange)}% compared to the prior month.`
    );
  }

  return {
    period: {
      year,
      month,
      monthName,
    },
    patients,
    trips,
    expenses,
    funding,
    fuel,
    maintenance,
    fleet,
    treasuryNetPKR,
    observations,
    generatedAt: new Date().toISOString(),
  };
}

export async function getAnnualReportData(params: {
  year: string | number;
}): Promise<AnnualReportDataResult> {
  const year = String(params.year || new Date().getFullYear());

  // Fetch all annual module aggregates in parallel
  const [patients, trips, expenses, funding, fuel, maintenance, fleet] = await Promise.all([
    getPatientStatistics({ year }),
    getTripStatistics({ year }),
    getExpenseSummary({ year }),
    getFundingSummary({ year }),
    getFuelSummary({ year }),
    getMaintenanceSummary({ year }),
    getAmbulanceStatistics({ year }),
  ]);

  const treasuryNetPKR = funding.totalFundingPKR - expenses.totalExpensesPKR;

  // Key Observations
  const keyObservations: string[] = [];
  keyObservations.push(
    `Annual Operational Year ${year}: Handled ${patients.totalPatients} verified patient cases across ${trips.totalTrips} emergency ambulance missions.`
  );
  keyObservations.push(
    `Fleet operations covered ${trips.totalDistanceKm.toLocaleString()} total kilometers with PKR ${fuel.totalFuelCostPKR.toLocaleString()} spent on fuel telemetry.`
  );
  keyObservations.push(
    `Total financial inflow totaled PKR ${funding.totalFundingPKR.toLocaleString()} against operational expenditures of PKR ${expenses.totalExpensesPKR.toLocaleString()} (Annual Net Treasury Reserve: PKR ${treasuryNetPKR.toLocaleString()}).`
  );

  if (expenses.largestCategory) {
    keyObservations.push(
      `Largest single expenditure driver was ${expenses.largestCategory.category} accounting for ${expenses.largestCategory.percentage}% (PKR ${expenses.largestCategory.amountPKR.toLocaleString()}).`
    );
  }

  return {
    period: {
      year,
    },
    patients,
    trips,
    expenses,
    funding,
    fuel,
    maintenance,
    fleet,
    treasuryNetPKR,
    yearOverYearComparison: expenses.yearOverYear,
    keyObservations,
    generatedAt: new Date().toISOString(),
  };
}
