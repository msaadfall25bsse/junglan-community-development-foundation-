// ==============================================================================
// 5. INTERNAL SERVER-SIDE AI & REPORTING DOMAIN TYPES
// ==============================================================================

export type AIToolName =
  | "getPatientStatistics"
  | "getTripStatistics"
  | "getExpenseSummary"
  | "getFundingSummary"
  | "getAmbulanceStatistics"
  | "getMaintenanceSummary"
  | "getFuelSummary"
  | "getMonthlyReportData"
  | "getAnnualReportData";

export interface AIQueryParams {
  yearPeriod: string;
  month?: number;
  projectId?: string;
}

export interface AIAnalyticsResult {
  question: string;
  answerMarkdown: string;
  dataPointsUsed: { metric: string; value: string | number }[];
  yearPeriod: string;
  generatedAt: string;
}

export interface GeneratedReportHistoryItem {
  id: string;
  reportCode: string;
  title: string;
  yearPeriod: string;
  month?: number;
  reportType: "MONTHLY_OPERATIONAL" | "ANNUAL_IMPACT" | "HEALTHCARE_SUMMARY" | "FINANCIAL_AUDIT";
  generatedByUserId: string;
  pdfFileUrl?: string;
  docxFileUrl?: string;
  status: "DRAFT" | "READY" | "ARCHIVED";
  createdAt: string;
}
