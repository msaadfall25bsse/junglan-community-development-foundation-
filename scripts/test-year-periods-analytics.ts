/**
 * scripts/test-year-periods-analytics.ts
 *
 * Automated verification suite for Part 6 Phase 4:
 * Multi-Year Historical Preservation & Operational Analytics
 */

import {
  getYearPeriods,
  getActiveYearPeriod,
  getYearPeriodById,
  createYearPeriod,
  updateYearPeriod,
  setActiveYearPeriod,
  closeYearPeriod,
  assertYearPeriodActive,
  getCrossYearComparativeAnalytics,
} from "../lib/services/year-period.service";
import { updateStore } from "../lib/db";

async function runYearPeriodTestSuite() {
  console.log("\n==========================================================================");
  console.log("   JUNGLAN FOUNDATION — PHASE 4 YEAR PERIODS & ANALYTICS TEST SUITE       ");
  console.log("==========================================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, title: string, details?: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${title}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${title} ${details ? `— ${details}` : ""}`);
      failed++;
    }
  }

  try {
    // -------------------------------------------------------------------------
    // 1. Initial State & Active Year Period Discovery
    // -------------------------------------------------------------------------
    console.log("--- 1. Initial State & Active Period Discovery ---");
    const initialActive = await getActiveYearPeriod();
    assert(!!initialActive.id, "Active year period fetched successfully");
    assert(initialActive.status === "ACTIVE", "Active period has status 'ACTIVE'");
    assert(initialActive.isCurrentActive === true, "Active period has isCurrentActive === true");

    const periodsList = await getYearPeriods({ page: 1, limit: 10, sortOrder: "desc" });
    assert(periodsList.periods.length >= 1, `Found ${periodsList.periods.length} registered operational periods`);

    // -------------------------------------------------------------------------
    // 2. Register New Operational Year (e.g. 2028 Planned Expansion)
    // -------------------------------------------------------------------------
    console.log("\n--- 2. Register New Operational Year Period ---");
    const testYear = "2028";
    // Ensure clean state before test
    await updateStore((store) => {
      store.yearPeriods = store.yearPeriods.filter((y) => y.id !== testYear);
    });

    const newPeriod = await createYearPeriod(
      {
        year: testYear,
        label: "Operational Year 2028 (Kaghan Valley Expansion)",
        startDate: "2028-01-01T00:00:00.000Z",
        endDate: "2028-12-31T23:59:59.000Z",
        isActive: false,
        notes: "Planned ambulance base in Kaghan and second olive pressing center",
      },
      "usr-admin-01"
    );

    assert(newPeriod.id === testYear, `Created period with ID: ${newPeriod.id}`);
    assert(newPeriod.isCurrentActive === false, "New period initialized as non-active (planned)");

    // -------------------------------------------------------------------------
    // 3. Year Period Detail & Audit Summary Fetch
    // -------------------------------------------------------------------------
    console.log("\n--- 3. Year Period Details & Count Metrics ---");
    const fetchedPeriod = await getYearPeriodById(testYear);
    assert(fetchedPeriod.id === testYear, "Fetched period by unique ID");
    assert(fetchedPeriod._count !== undefined, "Period includes summary count object");

    // -------------------------------------------------------------------------
    // 4. Atomic Active Year Period Switching
    // -------------------------------------------------------------------------
    console.log("\n--- 4. Atomic Active Year Period Switching ---");
    const activated = await setActiveYearPeriod(testYear, "usr-admin-01");
    assert(activated.isCurrentActive === true, "Activated period isCurrentActive === true");
    assert(activated.status === "ACTIVE", "Activated period status === 'ACTIVE'");

    // Verify all other periods are now non-active
    const afterActivationList = await getYearPeriods({ page: 1, limit: 10, sortOrder: "desc" });
    const otherActivePeriods = afterActivationList.periods.filter(
      (p) => p.id !== testYear && p.isCurrentActive
    );
    assert(
      otherActivePeriods.length === 0,
      "Zero conflicting active periods: Strict single-active year invariant preserved"
    );

    // -------------------------------------------------------------------------
    // 5. Immutable Historical Locking (Close Year Period)
    // -------------------------------------------------------------------------
    console.log("\n--- 5. Immutable Historical Period Locking ---");
    const closed = await closeYearPeriod(testYear, "usr-admin-01");
    assert(closed.status === "CLOSED", "Period status transitioned to 'CLOSED'");
    assert(closed.isCurrentActive === false, "Closed period deactivated");

    // -------------------------------------------------------------------------
    // 6. Safeguard Enforcement: Write-Protection on Closed Period
    // -------------------------------------------------------------------------
    console.log("\n--- 6. Write-Protection Safeguard Verification ---");
    let writePrevented = false;
    try {
      await assertYearPeriodActive(testYear);
    } catch (err: any) {
      if (err.message.includes("is CLOSED") || err.message.includes("inactive")) {
        writePrevented = true;
      }
    }
    assert(
      writePrevented,
      `assertYearPeriodActive correctly rejected write operation on closed period '${testYear}'`
    );

    // -------------------------------------------------------------------------
    // 7. Canonical Active Period Restoration (2026)
    // -------------------------------------------------------------------------
    console.log("\n--- 7. Canonical Working Period Restoration (2026) ---");
    const restored2026 = await setActiveYearPeriod("2026", "usr-admin-01");
    assert(restored2026.isCurrentActive === true, "Operational Year 2026 restored as active working period");

    // -------------------------------------------------------------------------
    // 8. Cross-Year Comparative Analytics
    // -------------------------------------------------------------------------
    console.log("\n--- 8. Cross-Year Comparative Analytics & Trends ---");
    const analytics = await getCrossYearComparativeAnalytics();
    assert(!!analytics.summary, "Analytics summary payload generated");
    assert(analytics.summary.lifetimePatientsCount > 0, `Lifetime Patients Count: ${analytics.summary.lifetimePatientsCount}`);
    assert(analytics.summary.lifetimeDistanceKm > 0, `Lifetime Transit Distance: ${analytics.summary.lifetimeDistanceKm} km`);
    assert(analytics.summary.lifetimeFundingPKR > 0, `Lifetime Funding: PKR ${analytics.summary.lifetimeFundingPKR.toLocaleString()}`);
    assert(analytics.summary.averageFuelCostPerKm >= 0, `Fleet Fuel Efficiency: PKR ${analytics.summary.averageFuelCostPerKm} / km`);

    assert(
      analytics.yearlyBreakdown.length >= 2,
      `Yearly comparative breakdown generated across ${analytics.yearlyBreakdown.length} operational cycles`
    );

    const period2026 = analytics.yearlyBreakdown.find((y) => y.year === 2026);
    assert(!!period2026, "Operational Year 2026 included in comparative analysis");
    assert(period2026?.isCurrentActive === true, "2026 correctly flagged as isCurrentActive in analytics payload");

  } catch (err: any) {
    console.error("  ❌ Unexpected Error during test execution:", err.message || err);
    failed++;
  } finally {
    // Ensure test period 2028 is cleaned up and 2026 is active
    await updateStore((store) => {
      store.yearPeriods = store.yearPeriods.filter((y) => y.id !== "2028");
      const p2026 = store.yearPeriods.find((y) => y.id === "2026");
      if (p2026) {
        p2026.isCurrentActive = true;
        p2026.status = "ACTIVE";
      }
    });
  }

  console.log("\n==========================================================================");
  console.log(`   PHASE 4 TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("==========================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runYearPeriodTestSuite();
