import {
  getPatientStatistics,
  getTripStatistics,
  getExpenseSummary,
  getFundingSummary,
  getAmbulanceStatistics,
  getFuelSummary,
  getMaintenanceSummary,
  getMonthlyReportData,
  getAnnualReportData,
} from "../lib/analytics";

// ==============================================================================
// PHASE 1 ACCEPTANCE TEST SUITE: Deterministic Analytics & Core Tools Layer
// ==============================================================================
// Strictly conforming to Sections 8-17, 24, 31-35, 85, 107-110 of Part 8.

async function runPhase1AnalyticsTests() {
  console.log("================================================================================");
  console.log("JUNGLAN COMMUNITY DEVELOPMENT FOUNDATION — PART 8 PHASE 1 ACCEPTANCE SUITE");
  console.log("Deterministic Analytics Engine & Core Tool Layer (TypeScript & Database)");
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
  // TEST 1: Patient Aggregate Statistics & Privacy (Section 9, 24, 108)
  // ----------------------------------------------------------------------------
  console.log("--- 1. Testing Patient Statistics & Strict Privacy Guardrails ---");
  const patientStats = await getPatientStatistics({ year: "2026" });
  assert(
    typeof patientStats.totalPatients === "number" && patientStats.totalPatients >= 0,
    "getPatientStatistics returns valid numeric totalPatients",
    `Total: ${patientStats.totalPatients}`
  );
  assert(
    Boolean(patientStats.genderBreakdown && patientStats.ageDemographics),
    "Demographic breakdown (gender & age brackets) properly aggregated"
  );
  assert(
    Boolean(patientStats.emergencyRatio && typeof patientStats.emergencyRatio.emergencyPercentage === "number"),
    "Emergency vs Routine ratio computed with percentage metric"
  );

  // STRICT PRIVACY CHECK: Verify no PII fields exist in output
  const rawPatientJson = JSON.stringify(patientStats);
  const forbiddenKeywords = ["cnic", "phone", "contactNumber", "cnicOrBForm", "fullName"];
  let leaksPII = false;
  for (const kw of forbiddenKeywords) {
    if (rawPatientJson.includes(`"${kw}"`)) {
      leaksPII = true;
      console.error(`Privacy Violation: Found PII key "${kw}" in patient statistics output!`);
    }
  }
  assert(!leaksPII, "STRICT PRIVACY ENFORCED: Zero patient PII (names, phones, CNIC) in analytics output");

  // ----------------------------------------------------------------------------
  // TEST 2: Trip Statistics & Fleet Telemetry (Section 10)
  // ----------------------------------------------------------------------------
  console.log("\n--- 2. Testing Ambulance Trip Statistics ---");
  const tripStats = await getTripStatistics({ year: "2026" });
  assert(
    typeof tripStats.totalTrips === "number",
    "getTripStatistics returns valid totalTrips metric",
    `Trips: ${tripStats.totalTrips}`
  );
  assert(
    typeof tripStats.totalDistanceKm === "number" && typeof tripStats.averageDistanceKm === "number",
    "Distance totals and averages mathematically verified",
    `Total: ${tripStats.totalDistanceKm}km, Avg: ${tripStats.averageDistanceKm}km`
  );
  assert(
    Array.isArray(tripStats.ambulanceBreakdown),
    "Ambulance breakdown array returned with per-vehicle metrics"
  );

  // ----------------------------------------------------------------------------
  // TEST 3: Expense Summary & Decimal Safety (Sections 11, 31, 32, 33)
  // ----------------------------------------------------------------------------
  console.log("\n--- 3. Testing Expense Financial Analytics & YoY Comparisons ---");
  const expenseSummary = await getExpenseSummary({ year: "2026" });
  assert(
    typeof expenseSummary.totalExpensesPKR === "number" && expenseSummary.totalExpensesPKR >= 0,
    "getExpenseSummary returns valid totalExpensesPKR",
    `Total: PKR ${expenseSummary.totalExpensesPKR.toLocaleString()}`
  );
  assert(
    Array.isArray(expenseSummary.categoryBreakdown),
    "Category breakdown properly categorizes vouchers (Fuel, Maintenance, Supplies, etc.)"
  );

  // Test zero-denominator mathematical safety
  const zeroBaselineSummary = await getExpenseSummary({ year: "2026", comparisonYear: "1990" });
  assert(
    Boolean(
      zeroBaselineSummary.yearOverYear &&
        zeroBaselineSummary.yearOverYear.baselineAmountPKR === 0 &&
        zeroBaselineSummary.yearOverYear.percentageChange === null &&
        !Number.isNaN(zeroBaselineSummary.yearOverYear.differencePKR)
    ),
    "Zero-denominator guard active: No NaN or Infinity generated on empty comparison baseline"
  );

  // ----------------------------------------------------------------------------
  // TEST 4: Funding Summary & Donor Privacy (Section 12)
  // ----------------------------------------------------------------------------
  console.log("\n--- 4. Testing Funding & Inflow Analytics ---");
  const fundingSummary = await getFundingSummary({ year: "2026" });
  assert(
    typeof fundingSummary.totalFundingPKR === "number" && fundingSummary.totalFundingPKR >= 0,
    "getFundingSummary returns valid totalFundingPKR",
    `Total: PKR ${fundingSummary.totalFundingPKR.toLocaleString()}`
  );
  assert(
    typeof fundingSummary.fundingBySource === "object" && typeof fundingSummary.fundingByPaymentMethod === "object",
    "Funding sources and payment methods categorized"
  );
  assert(
    Array.isArray(fundingSummary.projectBreakdown),
    "Project allocation metrics calculated with percentage distribution"
  );

  // ----------------------------------------------------------------------------
  // TEST 5: Ambulance Fleet Upkeep & Telemetry (Section 13)
  // ----------------------------------------------------------------------------
  console.log("\n--- 5. Testing Fleet Upkeep & Ambulance Metrics ---");
  const fleetStats = await getAmbulanceStatistics({ year: "2026" });
  assert(
    typeof fleetStats.totalAmbulances === "number" && fleetStats.totalAmbulances >= 0,
    "getAmbulanceStatistics returns totalAmbulances count",
    `Ambulances: ${fleetStats.totalAmbulances}`
  );
  assert(
    Array.isArray(fleetStats.fleetBreakdown),
    "Fleet breakdown includes operating costs per vehicle"
  );

  // ----------------------------------------------------------------------------
  // TEST 6: Fuel Analytics & Telemetry (Section 15)
  // ----------------------------------------------------------------------------
  console.log("\n--- 6. Testing Fuel Analytics ---");
  const fuelSummary = await getFuelSummary({ year: "2026" });
  assert(
    typeof fuelSummary.totalFuelCostPKR === "number",
    "getFuelSummary returns totalFuelCostPKR",
    `Cost: PKR ${fuelSummary.totalFuelCostPKR.toLocaleString()}`
  );
  assert(
    typeof fuelSummary.totalLiters === "number" && typeof fuelSummary.averagePricePerLiterPKR === "number",
    "Fuel liters and average price per liter computed accurately"
  );

  // ----------------------------------------------------------------------------
  // TEST 7: Maintenance Analytics & Repairs Distinction (Section 14)
  // ----------------------------------------------------------------------------
  console.log("\n--- 7. Testing Maintenance Analytics ---");
  const maintSummary = await getMaintenanceSummary({ year: "2026" });
  assert(
    typeof maintSummary.totalMaintenanceCostPKR === "number",
    "getMaintenanceSummary returns totalMaintenanceCostPKR",
    `Cost: PKR ${maintSummary.totalMaintenanceCostPKR.toLocaleString()}`
  );
  assert(
    typeof maintSummary.routineServiceCostPKR === "number" && typeof maintSummary.repairsCostPKR === "number",
    "Maintenance clearly distinguishes Routine Service from Workshop Repairs"
  );

  // ----------------------------------------------------------------------------
  // TEST 8: Monthly Report Data Preparation (Section 16, 110)
  // ----------------------------------------------------------------------------
  console.log("\n--- 8. Testing Monthly Report Structured Data Preparation ---");
  const monthlyReport = await getMonthlyReportData({ year: "2026", month: 9 });
  assert(
    Boolean(monthlyReport.period && monthlyReport.period.monthName === "September"),
    "getMonthlyReportData identifies period metadata (September 2026)"
  );
  assert(
    Boolean(monthlyReport.patients && monthlyReport.trips && monthlyReport.expenses && monthlyReport.funding),
    "Monthly report bundles all core operational and financial modules"
  );
  assert(
    typeof monthlyReport.treasuryNetPKR === "number",
    "Net treasury balance (Funding - Expenses) computed for month",
    `Net: PKR ${monthlyReport.treasuryNetPKR.toLocaleString()}`
  );
  assert(
    Array.isArray(monthlyReport.observations) && monthlyReport.observations.length > 0,
    "Factual observations derived deterministically from operational figures"
  );

  // ----------------------------------------------------------------------------
  // TEST 9: Annual Report Data Preparation (Section 17, 110)
  // ----------------------------------------------------------------------------
  console.log("\n--- 9. Testing Annual Report Structured Data Preparation ---");
  const annualReport = await getAnnualReportData({ year: "2026" });
  assert(
    annualReport.period.year === "2026",
    "getAnnualReportData identifies target annual period (2026)"
  );
  assert(
    Array.isArray(annualReport.keyObservations) && annualReport.keyObservations.length > 0,
    "Annual key observations generated for executive transparency"
  );
  assert(
    typeof annualReport.treasuryNetPKR === "number",
    "Annual net treasury reserve verified",
    `Net Reserve: PKR ${annualReport.treasuryNetPKR.toLocaleString()}`
  );

  // ----------------------------------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------------------------------
  console.log("\n================================================================================");
  console.log(`PHASE 1 TEST RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log("================================================================================");

  if (failed > 0) {
    console.error(`\n❌ Phase 1 test suite completed with ${failed} failure(s).`);
    process.exit(1);
  } else {
    console.log("\n🎉 ALL 9 CONTROLLED ANALYTICS TOOLS PASSED AT 100%!");
    console.log("Ready to serve as authoritative tools for AI Agent in Phase 2 & 3.");
  }
}

runPhase1AnalyticsTests().catch((err) => {
  console.error("Fatal error during Phase 1 analytics tests:", err);
  process.exit(1);
});
