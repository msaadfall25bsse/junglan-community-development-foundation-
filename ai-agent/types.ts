// ==============================================================================
// AI AGENT & PYTHON ANALYTICS CONTRACT TYPES — JUNGLAN FOUNDATION
// ==============================================================================
// Strictly conforming to Sections 39-47, 86, 87 of Part 8 specification.

export type AgentRoleProfile = "DATA_ENTRY" | "ADMIN_PANEL" | "PLATFORM";

export interface PythonAnalyticsRequest {
  action:
    | "monthly_expense_trend"
    | "year_over_year"
    | "fuel_trend"
    | "maintenance_trend"
    | "detect_anomalies"
    | "forecast_volume"
    | "health";
  payload: Record<string, any>;
  secret?: string;
}

export interface AnomalyItem {
  metric: string;
  period: string;
  observed_value: number;
  baseline_mean: number;
  normal_range: string;
  z_score: number;
  reason_flag: string;
  explanation: string;
}

export interface ForecastRangeItem {
  period_step: number;
  estimated_range_low: number;
  estimated_range_high: number;
  point_estimate: number;
  formatted_display: string;
}

export interface PythonAnalyticsResponse {
  success: boolean;
  action?: string;
  result?: any;
  observations: string[];
  warnings: string[];
  error?: string;
  isFallback?: boolean;
}

export interface AgentContext {
  userId: string;
  role: "ADMIN" | "DATA_ENTRY";
  agentProfile: AgentRoleProfile;
  currentYear: string;
}

export interface AgentQueryInput {
  question: string;
  agentProfile?: AgentRoleProfile;
  year?: string | number;
  month?: number;
}

export interface AgentStructuredResponse {
  answer: string;
  data: Record<string, any> | Array<any> | null;
  analysis: string;
  recommendation: string;
  dataLimitations: string;
  toolUsed?: string;
  isRestrictedRefusal?: boolean;
  agentProfile: AgentRoleProfile;
  responseTimeMs: number;
  generatedAt: string;
}
