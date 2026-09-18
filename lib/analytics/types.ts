// ==============================================================================
// ANALYTICS DOMAIN TYPES — JUNGLAN COMMUNITY DEVELOPMENT FOUNDATION
// ==============================================================================
// Strictly conforming to PART 8: Sections 8-17, 23, 24, 31-35, 85, 107-110

export interface AnalyticsDateFilter {
  year?: string | number;
  month?: number; // 1 to 12
  startDate?: string;
  endDate?: string;
}

// 1. Patient Statistics (Sections 9, 24, 108) - STRICT AGGREGATE PRIVACY
export interface DemographicBracket {
  label: string;
  count: number;
  percentage: number;
}

export interface PatientStatisticsResult {
  totalPatients: number;
  year: string;
  month?: number | null;
  patientsByYear: Record<string, number>;
  patientsByMonth: Record<number, number>; // 1-12
  genderBreakdown: {
    male: number;
    female: number;
    other: number;
  };
  ageDemographics: {
    children: number; // 0-12
    youth: number;    // 13-25
    adults: number;   // 26-59
    seniors: number;  // 60+
    unspecified: number;
  };
  emergencyRatio: {
    emergency: number;
    routine: number;
    emergencyPercentage: number;
  };
  topResidences: Array<{
    area: string;
    count: number;
  }>;
  generatedAt: string;
}

// 2. Trip Statistics (Section 10)
export interface AmbulanceTripMetric {
  ambulanceId: string;
  registrationNumber: string;
  model: string;
  tripCount: number;
  totalDistanceKm: number;
  fuelCostPKR: number;
}

export interface TripStatisticsResult {
  totalTrips: number;
  year: string;
  month?: number | null;
  tripsByYear: Record<string, number>;
  tripsByMonth: Record<number, number>;
  tripsByStatus: {
    completed: number;
    inProgress: number;
    cancelled: number;
  };
  totalDistanceKm: number;
  averageDistanceKm: number;
  emergencyTrips: number;
  ambulanceBreakdown: AmbulanceTripMetric[];
  topDestinations: Array<{
    hospital: string;
    count: number;
  }>;
  generatedAt: string;
}

// 3. Expense Summary (Sections 11, 31, 32, 33)
export interface CategoryExpenseMetric {
  category: string;
  amountPKR: number;
  percentageOfTotal: number;
}

export interface PeriodComparisonMetric {
  baselinePeriod: string;
  currentPeriod: string;
  baselineAmountPKR: number;
  currentAmountPKR: number;
  differencePKR: number;
  percentageChange: number | null; // null if baseline is 0 (prevents division by zero)
  trend: "INCREASED" | "DECREASED" | "NO_CHANGE" | "INSUFFICIENT_DATA";
}

export interface ExpenseSummaryResult {
  totalExpensesPKR: number;
  year: string;
  month?: number | null;
  expensesByYear: Record<string, number>;
  expensesByMonth: Record<number, number>;
  categoryBreakdown: CategoryExpenseMetric[];
  monthOverMonth?: PeriodComparisonMetric | null;
  yearOverYear?: PeriodComparisonMetric | null;
  largestCategory: {
    category: string;
    amountPKR: number;
    percentage: number;
  } | null;
  generatedAt: string;
}

// 4. Funding Summary (Section 12)
export interface ProjectFundingMetric {
  projectId: string;
  projectTitle: string;
  amountPKR: number;
  percentageOfTotal: number;
}

export interface FundingSummaryResult {
  totalFundingPKR: number;
  year: string;
  month?: number | null;
  fundingByYear: Record<string, number>;
  fundingByMonth: Record<number, number>;
  fundingBySource: Record<string, number>; // e.g. "Individual Donor", "Grant", "Corporate CSR"
  fundingByPaymentMethod: Record<string, number>;
  projectBreakdown: ProjectFundingMetric[];
  generatedAt: string;
}

// 5. Ambulance Fleet & Upkeep Statistics (Section 13)
export interface AmbulanceStatisticsResult {
  totalAmbulances: number;
  activeAmbulances: number;
  year: string;
  fleetBreakdown: Array<{
    id: string;
    registrationNumber: string;
    model: string;
    status: string;
    tripCount: number;
    distanceKm: number;
    fuelCostPKR: number;
    maintenanceCostPKR: number;
    totalOperatingCostPKR: number;
  }>;
  generatedAt: string;
}

// 6. Fuel Summary (Section 15)
export interface FuelSummaryResult {
  totalFuelCostPKR: number;
  totalLiters: number;
  averagePricePerLiterPKR: number;
  year: string;
  month?: number | null;
  fuelByMonth: Record<number, number>;
  fuelByAmbulance: Array<{
    ambulanceId: string;
    registrationNumber: string;
    totalCostPKR: number;
    liters: number;
  }>;
  averageCostPerKm?: number | null;
  generatedAt: string;
}

// 7. Maintenance Summary (Section 14)
export interface MaintenanceSummaryResult {
  totalMaintenanceCostPKR: number;
  year: string;
  month?: number | null;
  maintenanceByMonth: Record<number, number>;
  routineServiceCostPKR: number;
  repairsCostPKR: number;
  maintenanceByAmbulance: Array<{
    ambulanceId: string;
    registrationNumber: string;
    totalCostPKR: number;
    serviceCount: number;
  }>;
  topWorkshops: Array<{
    workshop: string;
    totalCostPKR: number;
  }>;
  generatedAt: string;
}

// 8. Monthly Structured Report Data (Section 16, 110)
export interface MonthlyReportDataResult {
  period: {
    year: string;
    month: number;
    monthName: string;
  };
  patients: PatientStatisticsResult;
  trips: TripStatisticsResult;
  expenses: ExpenseSummaryResult;
  funding: FundingSummaryResult;
  fuel: FuelSummaryResult;
  maintenance: MaintenanceSummaryResult;
  fleet: AmbulanceStatisticsResult;
  treasuryNetPKR: number; // Funding - Expenses
  observations: string[];
  generatedAt: string;
}

// 9. Annual Structured Report Data (Section 17, 110)
export interface AnnualReportDataResult {
  period: {
    year: string;
  };
  patients: PatientStatisticsResult;
  trips: TripStatisticsResult;
  expenses: ExpenseSummaryResult;
  funding: FundingSummaryResult;
  fuel: FuelSummaryResult;
  maintenance: MaintenanceSummaryResult;
  fleet: AmbulanceStatisticsResult;
  treasuryNetPKR: number;
  yearOverYearComparison?: PeriodComparisonMetric | null;
  keyObservations: string[];
  generatedAt: string;
}
