import {
  getGoogleIntegration,
  getActiveSyncJob,
  recordConflict,
  getSyncConflicts,
  createSyncLog,
  listSyncLogs,
  acquireSyncLock,
  releaseSyncLock,
} from "../lib/services/sync-db.service";
import { testGoogleConnection } from "../lib/google/google-connection.service";
import { applyConflictResolution } from "../lib/sync/conflict-resolver.service";
import type { SyncConflictRecord } from "../types/sync";

async function runPhase4Tests() {
  console.log("================================================================================");
  console.log("PHASE 4 ACCEPTANCE TEST SUITE: Admin Control Center, Conflict UI & Audit Trail");
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
  // TEST 1: Live Status & Health Check
  // ----------------------------------------------------------------------------
  console.log("--- 1. Testing Sync Status & Health Diagnostic ---");
  const integration = await getGoogleIntegration();
  assert(
    Boolean(integration && integration.id),
    "Integration record retrieved",
    `ID: ${integration.id}`
  );

  const healthReport = await testGoogleConnection();
  assert(
    healthReport.connected && healthReport.checks.tokenValid,
    "Google connection health diagnostic passes",
    `Health: ${healthReport.health}, AuthMode: ${healthReport.authMode}`
  );
  assert(
    healthReport.availableTabs.includes("Ambulance Service Patient Reco") &&
      healthReport.availableTabs.includes("Expanses"),
    "Spreadsheet canonical tabs validated in health report",
    `Tabs: ${healthReport.availableTabs.join(", ")}`
  );

  // ----------------------------------------------------------------------------
  // TEST 2: Conflict Resolution — KEEP_DB Strategy
  // ----------------------------------------------------------------------------
  console.log("\n--- 2. Testing Conflict Resolution (KEEP_DB) ---");
  const conflict1 = await recordConflict({
    recordType: "TRIP",
    recordId: "trp-test-p4-01",
    stableIdentifier: "TRP-2026-000099",
    sheetRowReference: "Ambulance Service Patient Reco!A12:M12",
    databaseValue: {
      id: "trp-test-p4-01",
      tripIdentifier: "TRP-2026-000099",
      date: "2026-09-17T00:00:00.000Z",
      patientName: "Muhammad Qasim (DB Auth)",
      pickupLocation: "Danna",
      dropoffHospital: "Abbottabad Complex",
      distanceKm: 90,
      fuelExpensePKR: 4500,
      amountReceivedPKR: 3500,
      notes: "Database authoritative note",
    },
    sheetValue: {
      date: "17/09/2026",
      patientName: "Muhammad Qasim (Sheet Diverged)",
      pickupLocation: "Danna",
      dropoffHospital: "Mansehra DHQ",
      distanceKm: 48,
      petrol: "2500",
      received: "2000",
      notes: "Sheet diverged note",
    },
    lastDatabaseUpdate: new Date().toISOString(),
    lastSheetUpdate: new Date().toISOString(),
    conflictReason: "Simultaneous divergence on dropoff hospital and fare",
  });

  assert(conflict1.status === "OPEN", "Conflict 1 created with OPEN status");

  const keepDbResult = await applyConflictResolution({
    conflictId: conflict1.id,
    resolution: "KEEP_DB",
    resolutionNotes: "Admin chose PostgreSQL as single source of truth",
    userId: "admin-trustee-01",
  });

  assert(
    keepDbResult.success && keepDbResult.resolution === "KEEP_DB",
    "KEEP_DB resolution applied successfully",
    keepDbResult.message
  );

  const conflictsAfter1: SyncConflictRecord[] = await getSyncConflicts();
  const c1Resolved = conflictsAfter1.find((c) => c.id === conflict1.id);
  assert(
    c1Resolved?.status === "RESOLVED_KEEP_DB",
    "Conflict 1 status updated to RESOLVED_KEEP_DB"
  );

  // ----------------------------------------------------------------------------
  // TEST 3: Conflict Resolution — KEEP_SHEET Strategy
  // ----------------------------------------------------------------------------
  console.log("\n--- 3. Testing Conflict Resolution (KEEP_SHEET) ---");
  const conflict2 = await recordConflict({
    recordType: "EXPENSE",
    recordId: "exp-test-p4-02",
    stableIdentifier: "EXP-2026-000088",
    sheetRowReference: "Expanses!A15:G15",
    databaseValue: {
      id: "exp-test-p4-02",
      amountPKR: 12000,
      category: "Fuel",
      description: "Initial voucher",
      paidTo: "PSO Station",
      date: "2026-09-17T00:00:00.000Z",
    },
    sheetValue: {
      date: "17/09/2026",
      amountPKR: 13500,
      category: "Fuel & Lubricants",
      description: "Corrected receipt at pump",
      paidTo: "PSO Station Abbottabad",
      jcdfReceipt: "EXP-2026-000088",
    },
    lastDatabaseUpdate: new Date().toISOString(),
    lastSheetUpdate: new Date().toISOString(),
    conflictReason: "Field clerk corrected receipt amount in Google Sheet",
  });

  const keepSheetResult = await applyConflictResolution({
    conflictId: conflict2.id,
    resolution: "KEEP_SHEET",
    resolutionNotes: "Field receipt in Google Sheet was verified correct",
    userId: "admin-trustee-01",
  });

  assert(
    keepSheetResult.success && keepSheetResult.resolution === "KEEP_SHEET",
    "KEEP_SHEET resolution applied successfully",
    keepSheetResult.message
  );

  const conflictsAfter2: SyncConflictRecord[] = await getSyncConflicts();
  const c2Resolved = conflictsAfter2.find((c) => c.id === conflict2.id);
  assert(
    c2Resolved?.status === "RESOLVED_KEEP_SHEET",
    "Conflict 2 status updated to RESOLVED_KEEP_SHEET"
  );

  // ----------------------------------------------------------------------------
  // TEST 4: Conflict Resolution — MERGE Strategy
  // ----------------------------------------------------------------------------
  console.log("\n--- 4. Testing Conflict Resolution (MERGE) ---");
  const conflict3 = await recordConflict({
    recordType: "TRIP",
    recordId: "trp-test-p4-03",
    stableIdentifier: "TRP-2026-000077",
    databaseValue: {
      patientName: "Saeed Khan",
      distanceKm: 50,
      notes: "Oxygen provided",
    },
    sheetValue: {
      patientName: "Saeed Ahmed Khan",
      distanceKm: 55,
      remark: "Wheelchair needed",
    },
    lastDatabaseUpdate: new Date().toISOString(),
    conflictReason: "Different name spelling and remark details",
  });

  const mergeResult = await applyConflictResolution({
    conflictId: conflict3.id,
    resolution: "MERGE",
    mergedValues: {
      patientName: "Saeed Ahmed Khan",
      distanceKm: 55,
      notes: "Oxygen provided & Wheelchair needed",
    },
    resolutionNotes: "Combined patient full name and medical notes",
    userId: "admin-trustee-01",
  });

  assert(
    mergeResult.success && mergeResult.resolution === "MERGE",
    "MERGE resolution applied successfully",
    mergeResult.message
  );

  // ----------------------------------------------------------------------------
  // TEST 5: Conflict Resolution — DISMISS Strategy
  // ----------------------------------------------------------------------------
  console.log("\n--- 5. Testing Conflict Resolution (DISMISS) ---");
  const conflict4 = await recordConflict({
    recordType: "EXPENSE",
    recordId: "exp-test-p4-04",
    stableIdentifier: "EXP-2026-000066",
    databaseValue: { amountPKR: 500 },
    sheetValue: { amountPKR: 500 },
    lastDatabaseUpdate: new Date().toISOString(),
    conflictReason: "Minor whitespace discrepancy flagged",
  });

  const dismissResult = await applyConflictResolution({
    conflictId: conflict4.id,
    resolution: "DISMISS",
    resolutionNotes: "Identical amounts, false alert dismissed",
    userId: "admin-trustee-01",
  });

  assert(
    dismissResult.success && dismissResult.resolution === "DISMISS",
    "DISMISS resolution applied successfully",
    dismissResult.message
  );

  // ----------------------------------------------------------------------------
  // TEST 6: Sync Audit Logs Filtering & Pagination
  // ----------------------------------------------------------------------------
  console.log("\n--- 6. Testing Sync Audit Logs Querying & Filtering ---");
  await createSyncLog({
    recordType: "TRIP",
    recordId: "trp-audit-01",
    stableIdentifier: "TRP-2026-999001",
    direction: "OUTBOUND",
    status: "SYNCED",
  });
  await createSyncLog({
    recordType: "EXPENSE",
    recordId: "exp-audit-02",
    stableIdentifier: "EXP-2026-999002",
    direction: "INBOUND",
    status: "CONFLICT",
    errorMessage: "Simultaneous edit conflict",
  });

  const logsResult = await listSyncLogs({ limit: 10, offset: 0 });
  assert(
    logsResult.logs.length > 0 && logsResult.totalCount > 0,
    "listSyncLogs returns paginated entries",
    `Total: ${logsResult.totalCount}, Page: ${logsResult.logs.length}`
  );

  const filteredLogs = await listSyncLogs({ status: "CONFLICT" });
  assert(
    filteredLogs.logs.every((l) => l.status === "CONFLICT"),
    "listSyncLogs filters accurately by status",
    `Conflicts found: ${filteredLogs.logs.length}`
  );

  // ----------------------------------------------------------------------------
  // TEST 7: Concurrency Lock Enforcement
  // ----------------------------------------------------------------------------
  console.log("\n--- 7. Testing Concurrency Lock Protection ---");
  const lock1 = await acquireSyncLock({
    direction: "BIDIRECTIONAL",
    triggeredByUserId: "test-admin",
  });
  assert(Boolean(lock1.success && lock1.job), "Sync lock successfully acquired");

  const activeJobCheck = await getActiveSyncJob();
  assert(
    activeJobCheck !== null && activeJobCheck.id === lock1.job?.id,
    "Active lock detected by getActiveSyncJob()",
    `Job: ${activeJobCheck?.jobIdentifier}`
  );

  // Attempt concurrent lock acquisition
  const lock2 = await acquireSyncLock({
    direction: "OUTBOUND",
    triggeredByUserId: "test-admin-2",
  });
  assert(!lock2.success, "Second concurrent lock attempt blocked (409 Conflict protection)");

  // Release lock
  await releaseSyncLock(lock1.job!.id, {
    recordsProcessed: 10,
    recordsCreated: 5,
    recordsUpdated: 5,
    conflictsDetected: 0,
    failuresCount: 0,
  });

  const lockAfterRelease = await getActiveSyncJob();
  assert(lockAfterRelease === null, "Lock cleanly released after completion");

  // ----------------------------------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------------------------------
  console.log("\n================================================================================");
  console.log(`PHASE 4 TEST RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log("================================================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runPhase4Tests().catch((err) => {
  console.error("Test execution fatal error:", err);
  process.exit(1);
});
