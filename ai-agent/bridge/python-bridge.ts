import { spawn } from "child_process";
import path from "path";
import type { PythonAnalyticsRequest, PythonAnalyticsResponse } from "../types";

// ==============================================================================
// NEXT.JS TO PYTHON ANALYTICS BRIDGE WITH GRACEFUL FALLBACK
// ==============================================================================
// Strictly conforming to Sections 41, 46, 47, 124, 138 of Part 8 specification.
// Invokes Python statistical engine with timeout protection and deterministic fallbacks.

const PYTHON_SERVICE_SCRIPT = path.join(
  process.cwd(),
  "ai-agent",
  "python-service",
  "service.py"
);

const DEFAULT_SECRET = process.env.PYTHON_ANALYTICS_SECRET || "junglan-analytics-internal-secret-2026";
const TIMEOUT_MS = 6000;

export async function callPythonAnalytics(
  request: PythonAnalyticsRequest
): Promise<PythonAnalyticsResponse> {
  const payloadString = JSON.stringify({
    ...request.payload,
    secret: DEFAULT_SECRET,
  });

  return new Promise((resolve) => {
    let outputBuffer = "";
    let errorBuffer = "";
    let isSettled = false;

    // Detect python executable
    const pythonExecutable = process.env.PYTHON_PATH || "python";

    const pyProcess = spawn(
      pythonExecutable,
      [PYTHON_SERVICE_SCRIPT, "--action", request.action],
      {
        stdio: ["pipe", "pipe", "pipe"],
        windowsHide: true,
      }
    );

    const timer = setTimeout(() => {
      if (!isSettled) {
        isSettled = true;
        try {
          pyProcess.kill();
        } catch (_) {}
        console.warn(`[PythonBridge] Timeout after ${TIMEOUT_MS}ms for action: ${request.action}. Falling back.`);
        resolve(generateGracefulFallback(request.action, request.payload, "Service timeout"));
      }
    }, TIMEOUT_MS);

    pyProcess.stdin.write(payloadString);
    pyProcess.stdin.end();

    pyProcess.stdout.on("data", (chunk) => {
      outputBuffer += chunk.toString();
    });

    pyProcess.stderr.on("data", (chunk) => {
      errorBuffer += chunk.toString();
    });

    pyProcess.on("error", (err) => {
      if (!isSettled) {
        isSettled = true;
        clearTimeout(timer);
        console.warn(`[PythonBridge] Failed to spawn Python process: ${err.message}. Activating fallback.`);
        resolve(generateGracefulFallback(request.action, request.payload, err.message));
      }
    });

    pyProcess.on("close", (code) => {
      if (!isSettled) {
        isSettled = true;
        clearTimeout(timer);

        if (code !== 0) {
          console.warn(`[PythonBridge] Python exited with code ${code}: ${errorBuffer}. Activating fallback.`);
          resolve(generateGracefulFallback(request.action, request.payload, errorBuffer));
          return;
        }

        try {
          const parsed = JSON.parse(outputBuffer.trim());
          resolve({
            success: Boolean(parsed.success),
            action: request.action,
            result: parsed.result,
            observations: parsed.observations || [],
            warnings: parsed.warnings || [],
            error: parsed.error,
            isFallback: false,
          });
        } catch (jsonErr: any) {
          console.warn(`[PythonBridge] JSON parse failed on Python stdout: ${outputBuffer}. Activating fallback.`);
          resolve(generateGracefulFallback(request.action, request.payload, jsonErr.message));
        }
      }
    });
  });
}

/**
 * Deterministic TypeScript Fallback for high-availability continuity (Sections 47, 124, 138)
 */
function generateGracefulFallback(
  action: string,
  payload: Record<string, any>,
  reason: string
): PythonAnalyticsResponse {
  console.info(`[PythonBridge] Graceful fallback engaged for ${action} (${reason})`);

  if (action === "monthly_expense_trend") {
    const data = payload.monthly_data || [];
    const total = data.reduce((acc: number, item: any) => acc + (Number(item.amount) || 0), 0);
    const count = data.length || 1;
    const mean = Math.round(total / count);

    return {
      success: true,
      action,
      isFallback: true,
      result: {
        has_data: data.length > 0,
        total,
        mean,
        trend_direction: "STABLE",
        moving_average_3m: [],
        growth_rate_pct: null,
        summary: `Deterministic fallback: Average monthly expense is PKR ${mean.toLocaleString()}.`,
      },
      observations: ["Advanced statistical engine is temporarily offline; using deterministic database totals."],
      warnings: ["Advanced analytics service is temporarily unavailable."],
    };
  }

  if (action === "detect_anomalies") {
    return {
      success: true,
      action,
      isFallback: true,
      result: {
        anomalies_detected_count: 0,
        anomalies: [],
      },
      observations: ["Anomaly detection engine temporarily offline; no outlier flags generated."],
      warnings: ["Advanced analytics service is temporarily unavailable."],
    };
  }

  if (action === "forecast_volume") {
    return {
      success: true,
      action,
      isFallback: true,
      result: {
        has_sufficient_data: false,
        forecast_ranges: [],
        message: "Advanced forecasting service is temporarily unavailable.",
      },
      observations: ["Forecasting model is currently offline."],
      warnings: ["Advanced analytics service is temporarily unavailable."],
    };
  }

  return {
    success: false,
    action,
    isFallback: true,
    result: null,
    observations: [],
    warnings: ["Advanced analytics service is temporarily unavailable."],
    error: "Advanced analytics service is temporarily unavailable.",
  };
}
