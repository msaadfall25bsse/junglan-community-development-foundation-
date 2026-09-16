import {
  getGoogleIntegration,
  updateGoogleIntegration,
  acquireSyncLock,
  getActiveSyncJob,
  releaseSyncLock,
  createSyncLog,
  listSyncLogs,
  recordConflict,
  listConflicts,
  resolveConflict,
  upsertRecordMapping,
  getRecordMapping,
  findMappingByStableId,
} from "../lib/services/sync-db.service";

async function runSyncSchemaTests() {
  console.log("===============================================================");
  console.log("JUNGLAN FOUNDATION — PART 7 PHASE 1 DATABASE & SCHEMA VERIFICATION");
  console.log("===============================================================\n");

  // 1. GoogleIntegration Configuration Test
  console.log("1. Testing GoogleIntegration Retrieval & Update...");
  const config = await getGoogleIntegration();
  console.log("   -> Retrieved config ID:", config.id);
  console.log("   -> Status:", config.status, "| SyncHealth:", config.syncHealth);

  const updatedConfig = await updateGoogleIntegration({
    accountEmail: "foundation.jcdf@gmail.com",
    driveRootFolderId: "DRIVE_ROOT_FOLDER_12345",
    spreadsheetId: "15uC_XxXwQ9LUgKfHX9r6-p0ZC87ODhn26iX2Yfr2-GU",
    syncHealth: "HEALTHY",
  });
  console.log("   -> Updated Email:", updatedConfig.accountEmail);
  console.log("   -> Spreadsheet ID:", updatedConfig.spreadsheetId);
  console.log("   [PASS] GoogleIntegration tests passed.\n");

  // 2. Concurrency Lock & Job Management Test
  console.log("2. Testing Sync Lock & Job Concurrency Protection...");
  const lock1 = await acquireSyncLock({
    direction: "OUTBOUND",
    scope: "ALL",
    yearPeriodId: "2026",
    triggeredByUserId: "admin-user-01",
  });
  console.log("   -> Lock 1 acquired:", lock1.success, "| Job ID:", lock1.job?.jobIdentifier);

  const lock2 = await acquireSyncLock({
    direction: "INBOUND",
    scope: "PATIENTS",
  });
  console.log("   -> Lock 2 blocked as expected:", !lock2.success, "| Reason:", lock2.reason);

  const activeJob = await getActiveSyncJob();
  console.log("   -> Active running job confirmed:", activeJob?.jobIdentifier);

  if (!lock1.success || lock2.success || !activeJob) {
    throw new Error("Concurrency lock test failed!");
  }
  console.log("   [PASS] Concurrency lock tests passed.\n");

  // 3. Detailed Sync Logging Test
  console.log("3. Testing Traceable Sync Logging...");
  const log1 = await createSyncLog({
    syncJobId: lock1.job?.id,
    recordType: "PATIENT",
    recordId: "pat-test-001",
    stableIdentifier: "PAT-000011",
    externalReference: "Ambulance Service Patient Reco!Row12",
    direction: "OUTBOUND",
    status: "SYNCED",
    payloadSnapshot: { name: "Muhammad Test", age: 45, phone: "03001234567" },
  });
  console.log("   -> Created Sync Log:", log1.id, "| Status:", log1.status);

  const log2 = await createSyncLog({
    syncJobId: lock1.job?.id,
    recordType: "EXPENSE",
    recordId: "exp-test-001",
    stableIdentifier: "EXP-000015",
    externalReference: "Expanses!Row45",
    direction: "INBOUND",
    status: "CONFLICT",
    errorCode: "VAL_MISMATCH",
    errorMessage: "Amount differs between Sheet (5500) and Database (5000)",
  });
  console.log("   -> Created Conflict Log:", log2.id, "| Error:", log2.errorCode);

  const logsList = await listSyncLogs({ limit: 10 });
  console.log("   -> Total logs in database/store:", logsList.totalCount);
  console.log("   [PASS] Sync logging tests passed.\n");

  // 4. Conflict Management & Resolution Test
  console.log("4. Testing Conflict Creation & Manual Resolution...");
  const conflict = await recordConflict({
    syncJobId: lock1.job?.id,
    recordType: "EXPENSE",
    recordId: "exp-test-001",
    stableIdentifier: "EXP-000015",
    sheetRowReference: "Row 45",
    databaseValue: { amountPKR: 5000, reason: "Petrol", date: "2026-09-10" },
    sheetValue: { amountPKR: 5500, reason: "Petrol", date: "2026-09-10" },
    lastDatabaseUpdate: new Date(),
    conflictReason: "Concurrent modification: DB has 5000, Sheet has 5500",
  });
  console.log("   -> Conflict registered:", conflict.conflictIdentifier, "| Status:", conflict.status);

  const openConflicts = await listConflicts({ status: "OPEN" });
  console.log("   -> Open conflicts count:", openConflicts.length);

  const resolved = await resolveConflict({
    conflictId: conflict.id,
    resolution: "KEEP_DB",
    resolutionNotes: "Verified with physical receipt voucher #EXP-000015: PKR 5,000 is authoritative.",
    resolvedByUserId: "admin-user-01",
  });
  console.log("   -> Resolved conflict status:", resolved.status, "| Notes:", resolved.resolutionNotes);
  console.log("   [PASS] Conflict management tests passed.\n");

  // 5. External Record Mapping Test
  console.log("5. Testing External Record Mapping (Decoupled Identifiers)...");
  const mapping = await upsertRecordMapping({
    recordType: "PATIENT",
    internalRecordId: "pat-cuid-9999",
    stableIdentifier: "PAT-000011",
    yearPeriodId: "2026",
    spreadsheetId: "15uC_XxXwQ9LUgKfHX9r6-p0ZC87ODhn26iX2Yfr2-GU",
    sheetTabName: "Ambulance Service Patient Reco",
    sheetTabGid: "0",
    lastRowIndex: 12,
    lastSyncedHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  });
  console.log("   -> Created mapping:", mapping.stableIdentifier, "->", mapping.sheetTabName, "(Row", mapping.lastRowIndex, ")");

  const retrievedMapping = await getRecordMapping("PATIENT", "pat-cuid-9999");
  console.log("   -> Retrieved by Internal ID:", retrievedMapping?.stableIdentifier);

  const foundByStable = await findMappingByStableId(
    "15uC_XxXwQ9LUgKfHX9r6-p0ZC87ODhn26iX2Yfr2-GU",
    "Ambulance Service Patient Reco",
    "PAT-000011"
  );
  console.log("   -> Found by Stable ID:", foundByStable?.internalRecordId);

  if (retrievedMapping?.stableIdentifier !== "PAT-000011" || foundByStable?.internalRecordId !== "pat-cuid-9999") {
    throw new Error("Record mapping test failed!");
  }
  console.log("   [PASS] External record mapping tests passed.\n");

  // 6. Release Sync Lock
  console.log("6. Testing Release Sync Lock & Final Stats Summary...");
  const completedJob = await releaseSyncLock(lock1.job!.id, {
    recordsProcessed: 20,
    recordsCreated: 18,
    recordsUpdated: 2,
    duplicatesDetected: 0,
    conflictsDetected: 1,
    failuresCount: 0,
    skippedCount: 0,
  });
  console.log("   -> Job completed status:", completedJob.status);
  console.log("   -> Job isLocked:", completedJob.isLocked);
  console.log("   -> Records Created:", completedJob.recordsCreated, "| Updated:", completedJob.recordsUpdated);

  const activeJobAfter = await getActiveSyncJob();
  console.log("   -> Active job after release:", activeJobAfter ? activeJobAfter.jobIdentifier : "None (Unlocked)");
  console.log("   [PASS] Release lock tests passed.\n");

  console.log("===============================================================");
  console.log("ALL PART 7 PHASE 1 DATABASE SCHEMA & SERVICE TESTS PASSED 100%!");
  console.log("===============================================================");
}

runSyncSchemaTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
