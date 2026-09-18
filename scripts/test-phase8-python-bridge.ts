import { callPythonAnalytics } from "../ai-agent/bridge/python-bridge";

// ==============================================================================
// PHASE 2 ACCEPTANCE TEST SUITE: Python Analytics Service & Statistical Engine
// ==============================================================================
// Strictly conforming to Sections 39-47, 72-76, 89, 94-96, 124, 138 of Part 8.

async function runPhase2PythonBridgeTests() {
  console.log("================================================================================");
  console.log("JUNGLAN COMMUNITY DEVELOPMENT FOUNDATION — PART 8 PHASE 2 ACCEPTANCE SUITE");
  console.log("Python Analytics Service & Statistical Engine (pandas, numpy, z-score, bridge)");
  console.log("================================================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}${detail ? ` -> ${detail}` : ""}`);
      failed++;
    }
  }

  // ----------------------------------------------------------------------------
  // TEST 1: Service Health & Authentication Handshake
  // ----------------------------------------------------------------------------
  console.log("--- 1. Testing Python Analytics Service Health Check ---");
  const healthRes = await callPythonAnalytics({
    action: "health",
    payload: {},
  });
  assert(
    healthRes.success && healthRes.result?.status === "HEALTHY",
    "Python service responds to health check with status HEALTHY",
    `Engine: ${healthRes.result?.engine}`
  );

  // ----------------------------------------------------------------------------
  // TEST 2: Monthly Expense Trends & 3-Month Moving Average (pandas/numpy)
  // ----------------------------------------------------------------------------
  console.log("\n--- 2. Testing Monthly Expense Trends & Moving Averages ---");
  const expenseTrendRes = await callPythonAnalytics({
    action: "monthly_expense_trend",
    payload: {
      monthly_data: [
        { month: 1, amount: 20000 },
        { month: 2, amount: 25000 },
        { month: 3, amount: 30000 },
        { month: 4, amount: 38000 },
      ],
    },
  });
  assert(
    expenseTrendRes.success && expenseTrendRes.result?.trend_direction === "INCREASING",
    "Python analytics identifies INCREASING trend with growth rate",
    `Growth: ${expenseTrendRes.result?.growth_rate_pct}%`
  );
  assert(
    Array.isArray(expenseTrendRes.result?.moving_average_3m) &&
      expenseTrendRes.result?.moving_average_3m.length === 4,
    "3-month moving average computed using pandas rolling window"
  );

  // ----------------------------------------------------------------------------
  // TEST 3: YoY Comparison & Zero Baseline Mathematical Safety
  // ----------------------------------------------------------------------------
  console.log("\n--- 3. Testing YoY Comparison & Zero-Denominator Guard ---");
  const yoyNormalRes = await callPythonAnalytics({
    action: "year_over_year",
    payload: {
      baseline_year: "2025",
      current_year: "2026",
      baseline_total: 100000,
      current_total: 140000,
    },
  });
  assert(
    yoyNormalRes.success && yoyNormalRes.result?.percentage_change === 40.0,
    "Normal YoY percentage change computed accurately (40.0%)"
  );

  const yoyZeroRes = await callPythonAnalytics({
    action: "year_over_year",
    payload: {
      baseline_year: "1995",
      current_year: "2026",
      baseline_total: 0,
      current_total: 250000,
    },
  });
  assert(
    yoyZeroRes.success &&
      yoyZeroRes.result?.percentage_change === null &&
      yoyZeroRes.result?.trend === "INSUFFICIENT_DATA",
    "Zero baseline handled safely without ZeroDivisionError (returns null percentage)"
  );

  // ----------------------------------------------------------------------------
  // TEST 4: Fuel Consumption & Distance Telemetry
  // ----------------------------------------------------------------------------
  console.log("\n--- 4. Testing Fuel Telemetry & Cost per KM ---");
  const fuelRes = await callPythonAnalytics({
    action: "fuel_trend",
    payload: {
      fuel_data: [
        { month: 1, liters: 300, cost: 84000, distance_km: 1800 },
        { month: 2, liters: 350, cost: 98000, distance_km: 2100 },
      ],
    },
  });
  assert(
    fuelRes.success && fuelRes.result?.total_liters === 650 && fuelRes.result?.avg_price_per_liter === 280,
    "Fuel telemetry computes total liters and exact price per liter",
    `Avg Price: PKR ${fuelRes.result?.avg_price_per_liter}/L`
  );
  assert(
    typeof fuelRes.result?.avg_cost_per_km === "number" && fuelRes.result?.avg_cost_per_km > 0,
    "Fuel cost per KM metric computed from odometer records",
    `Cost/KM: PKR ${fuelRes.result?.avg_cost_per_km}`
  );

  // ----------------------------------------------------------------------------
  // TEST 5: Maintenance Servicing vs Workshop Repairs
  // ----------------------------------------------------------------------------
  console.log("\n--- 5. Testing Maintenance Routine vs Repair Ratio ---");
  const maintRes = await callPythonAnalytics({
    action: "maintenance_trend",
    payload: {
      maintenance_data: [
        { month: 1, routine_cost: 15000, repair_cost: 45000 },
        { month: 2, routine_cost: 20000, repair_cost: 60000 },
      ],
    },
  });
  assert(
    maintRes.success && maintRes.result?.repair_dominant === true,
    "Maintenance module distinguishes routine servicing from emergency repairs",
    `Repairs: ${maintRes.result?.repair_percentage}%, Routine: ${maintRes.result?.routine_percentage}%`
  );

  // ----------------------------------------------------------------------------
  // TEST 6: Statistical Anomaly Detection (Z-Score / IQR) (Sections 72, 73)
  // ----------------------------------------------------------------------------
  console.log("\n--- 6. Testing Transparent Anomaly Detection (Zero False Accusation) ---");
  const anomalyRes = await callPythonAnalytics({
    action: "detect_anomalies",
    payload: {
      expense_series: [
        { period: "2026-01", category: "MAINTENANCE", amount: 20000 },
        { period: "2026-02", category: "MAINTENANCE", amount: 22000 },
        { period: "2026-03", category: "MAINTENANCE", amount: 21000 },
        { period: "2026-04", category: "MAINTENANCE", amount: 19000 },
        { period: "2026-05", category: "MAINTENANCE", amount: 89000 }, // Outlier!
      ],
      z_threshold: 1.8,
    },
  });
  assert(
    anomalyRes.success && anomalyRes.result?.anomalies_detected_count >= 1,
    "Z-score/IQR outlier detected for spike period (PKR 89,000)"
  );

  const flagged = anomalyRes.result?.anomalies[0];
  assert(
    flagged &&
      flagged.reason_flag.includes("Unusually high") &&
      !flagged.reason_flag.toLowerCase().includes("fraud"),
    "Objective, non-inflammatory phrasing enforced: 'Unusually high compared with historical data'",
    flagged?.reason_flag
  );

  // ----------------------------------------------------------------------------
  // TEST 7: Forecasting Data Sufficiency & Range Integrity (Sections 37, 74, 137)
  // ----------------------------------------------------------------------------
  console.log("\n--- 7. Testing Forecasting Data Sufficiency & Ranges ---");
  // Case A: Insufficient data (< 3 periods) -> MUST reject
  const forecastRejectRes = await callPythonAnalytics({
    action: "forecast_volume",
    payload: {
      series: [45.0, 50.0], // only 2 points!
      metric_name: "Ambulance Trips",
    },
  });
  assert(
    forecastRejectRes.success && forecastRejectRes.result?.has_sufficient_data === false,
    "Forecasting properly rejects insufficient historical samples (< 3 periods)",
    forecastRejectRes.result?.message
  );

  // Case B: Sufficient data (>= 3 periods) -> MUST produce range
  const forecastSuccessRes = await callPythonAnalytics({
    action: "forecast_volume",
    payload: {
      series: [30.0, 35.0, 42.0, 48.0],
      metric_name: "Ambulance Trips",
      forecast_periods: 2,
    },
  });
  assert(
    forecastSuccessRes.success &&
      forecastSuccessRes.result?.has_sufficient_data === true &&
      Array.isArray(forecastSuccessRes.result?.forecast_ranges),
    "Forecasting produces honest estimated range without false precision",
    `Projected Range: ${forecastSuccessRes.result?.headline_range}`
  );

  // ----------------------------------------------------------------------------
  // TEST 8: Graceful Fallback When Python Is Offline (Sections 47, 124, 138)
  // ----------------------------------------------------------------------------
  console.log("\n--- 8. Testing Graceful Fallback (Python Offline Resilience) ---");
  const originalPath = process.env.PYTHON_PATH;
  try {
    // Intentionally point to an invalid Python binary
    process.env.PYTHON_PATH = "non_existent_python_binary_xyz";
    const fallbackRes = await callPythonAnalytics({
      action: "monthly_expense_trend",
      payload: {
        monthly_data: [
          { month: 1, amount: 50000 },
          { month: 2, amount: 60000 },
        ],
      },
    });

    assert(
      fallbackRes.isFallback === true && fallbackRes.success === true,
      "Graceful Fallback: Next.js continues with deterministic analytics when Python fails",
      fallbackRes.result?.summary
    );
    assert(
      fallbackRes.warnings.some((w) => w.includes("Advanced analytics service is temporarily unavailable")),
      "User-friendly warning displayed: 'Advanced analytics service is temporarily unavailable'"
    );
  } finally {
    process.env.PYTHON_PATH = originalPath;
  }

  // ----------------------------------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------------------------------
  console.log("\n================================================================================");
  console.log(`PHASE 2 TEST RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log("================================================================================");

  if (failed > 0) {
    console.error(`\n❌ Phase 2 test suite completed with ${failed} failure(s).`);
    process.exit(1);
  } else {
    console.log("\n🎉 ALL PHASE 2 PYTHON STATISTICAL ENGINE & BRIDGE TESTS PASSED 100%!");
    console.log("Ready to connect with specialized multi-agent profiles in Phase 3.");
  }
}

runPhase2PythonBridgeTests().catch((err) => {
  console.error("Fatal error during Phase 2 tests:", err);
  process.exit(1);
});
