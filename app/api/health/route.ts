import { checkDatabaseHealth } from "@/lib/db";
import { getActiveYearPeriod } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";

// ==============================================================================
// HEALTH CHECK ENDPOINT (GET /api/health)
// ==============================================================================
// Section 63: System status, database connectivity, and active fiscal year.

export async function GET() {
  try {
    const healthStatus = checkDatabaseHealth();
    const isDbConfigured = healthStatus.isConfigured && healthStatus.status === "READY";

    let activeYear: string | null = null;
    if (isDbConfigured) {
      try {
        const period = await getActiveYearPeriod();
        activeYear = `${period.label} (${period.year})`;
      } catch {
        activeYear = "NO_ACTIVE_PERIOD_SET";
      }
    }

    const healthData = {
      status: isDbConfigured ? "HEALTHY" : "DEGRADED",
      database: isDbConfigured ? "CONNECTED" : "DISCONNECTED",
      driver: healthStatus.driver,
      activeYearPeriod: activeYear,
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    };

    return apiSuccess(healthData, "System operational health check", isDbConfigured ? 200 : 503);
  } catch (error) {
    return handleApiError(error);
  }
}
