import {
  normalizeString,
  normalizeDate,
  normalizeFinancial,
  normalizeEnum,
  computeRecordHash,
} from "../lib/sync/normalizer";
import {
  checkPatientDuplicate,
  checkTripDuplicate,
  checkExpenseDuplicate,
} from "../lib/sync/duplicate-detector";
import { detectConflict } from "../lib/sync/conflict-detector";
import { SyncEngine } from "../lib/sync/sync-engine.service";
import { readStore, updateStore } from "../lib/db";

async function runSyncEngineTests() {
  console.log("===============================================================");
  console.log("JUNGLAN FOUNDATION — PART 7 PHASE 3 SYNC ENGINE VERIFICATION");
  console.log("===============================================================\n");

  // 1. Data Normalizer Tests (Sections 33, 34, 35, 36)
  console.log("1. Testing Data Normalizer & Sanitizer...");
  const rawString = "   \u200B  Muhammad   Ali   Khan   ";
  const cleanString = normalizeString(rawString);
  console.log("   -> Normalized String:", `"${cleanString}"`);
  if (cleanString !== "Muhammad Ali Khan") throw new Error("String normalization failed");

  const rawDate = "15/9/2026";
  const dateInfo = normalizeDate(rawDate);
  console.log("   -> Normalized Date:", dateInfo.displayDate, "| Year:", dateInfo.year);
  if (dateInfo.year !== 2026 || dateInfo.displayDate !== "15/9/2026") {
    throw new Error("Date normalization failed");
  }

  const rawAmount = "PKR  5,500.00";
  const cleanAmount = normalizeFinancial(rawAmount);
  console.log("   -> Normalized Financial:", `"${cleanAmount}"`);
  if (cleanAmount !== "5500") throw new Error("Financial normalization failed");

  const normalizedEnum = normalizeEnum("active_trip", { ACTIVE_TRIP: "ACTIVE" }, "FALLBACK");
  console.log("   -> Normalized Enum:", normalizedEnum);
  if (normalizedEnum !== "ACTIVE") throw new Error("Enum normalization failed");

  console.log("   [PASS] Data Normalizer operational.\n");

  // 2. Intelligent Duplicate Detection Tests (Sections 20, 21, 86)
  console.log("2. Testing Intelligent Duplicate Detection...");
  const mockPatients = [
    {
      id: "pat-1",
      patientIdentifier: "PAT-000010",
      fullName: "Abdul Rehman",
      cnicOrBForm: "13501-1234567-1",
      contactNumber: "03001234567",
      residenceArea: "Junglan Valley",
    },
  ];

  // Test Exact CNIC duplicate
  const cnicDup = checkPatientDuplicate(
    { fullName: "A. Rehman", cnicOrBForm: "1350112345671" },
    mockPatients
  );
  console.log("   -> CNIC Duplicate Match:", cnicDup.isDuplicate, "| Confidence:", cnicDup.confidence);
  if (!cnicDup.isDuplicate || cnicDup.confidence !== "EXACT") {
    throw new Error("CNIC duplicate detection failed");
  }

  // Test Phone duplicate
  const phoneDup = checkPatientDuplicate(
    { fullName: "Rehman Khan", contactNumber: "0300-1234567" },
    mockPatients
  );
  console.log("   -> Phone Duplicate Match:", phoneDup.isDuplicate, "| Confidence:", phoneDup.confidence);
  if (!phoneDup.isDuplicate || phoneDup.confidence !== "HIGH") {
    throw new Error("Phone duplicate detection failed");
  }

  // Test Non-duplicate
  const nonDup = checkPatientDuplicate(
    { fullName: "Sultan Mehmood", contactNumber: "03459876543", cnicOrBForm: "13501-9999999-9" },
    mockPatients
  );
  console.log("   -> Non-Duplicate Result:", !nonDup.isDuplicate ? "CORRECT (Clean)" : "FALSE POSITIVE");
  if (nonDup.isDuplicate) throw new Error("False positive duplicate detected");

  console.log("   [PASS] Duplicate Detector operational.\n");

  // 3. Concurrent Conflict Detection Tests (Sections 22, 23, 87)
  console.log("3. Testing Conflict & Change Detection...");
  const baseRecord = { amountPKR: 5000, reason: "Petrol", date: "15/9/2026" };
  const baseHash = computeRecordHash(baseRecord);

  // Scenario A: Identical
  const noChange = detectConflict({
    databaseRecord: baseRecord,
    sheetRow: baseRecord,
    lastSyncedHash: baseHash,
  });
  console.log("   -> Identical records state:", noChange.state, "| Conflict:", noChange.hasConflict);
  if (noChange.hasConflict || noChange.state !== "NO_CHANGE") {
    throw new Error("Identical record check failed");
  }

  // Scenario B: Concurrent update on both sides
  const dbUpdated = { ...baseRecord, amountPKR: 6000 };
  const sheetUpdated = { ...baseRecord, amountPKR: 6500 };
  const conflictDetected = detectConflict({
    databaseRecord: dbUpdated,
    sheetRow: sheetUpdated,
    lastSyncedHash: baseHash,
  });
  console.log("   -> Both modified state:", conflictDetected.state, "| Conflict:", conflictDetected.hasConflict);
  console.log("   -> Conflict Reason:", conflictDetected.reason);
  if (!conflictDetected.hasConflict || conflictDetected.state !== "BOTH_UPDATED") {
    throw new Error("Conflict detection failed");
  }

  console.log("   [PASS] Conflict Detector operational.\n");

  // 4. Two-Way Sync Engine Execution & Idempotency Test (Sections 83 & 91)
  console.log("4. Testing Sync Engine Orchestration & Idempotency...");

  // Seed sample database records
  updateStore((s) => {
    if (!s.trips) s.trips = [];
    if (!s.expenses) s.expenses = [];

    // Add 1 test trip if not exists
    if (!s.trips.some((t: any) => t.tripIdentifier === "TRP-2026-000001")) {
      s.trips.push({
        id: "trp-test-01",
        tripIdentifier: "TRP-2026-000001",
        date: "2026-09-15T00:00:00.000Z",
        ambulanceId: "amb-01",
        patientName: "Muhammad Qasim",
        pickupLocation: "Danna",
        dropoffHospital: "Mansehra",
        tripType: "EMERGENCY_TRANSFER",
        distanceKm: 48,
        startOdometerKm: 28000,
        endOdometerKm: 28048,
        dispatchTime: "2026-09-15T08:00:00.000Z",
        status: "COMPLETED",
        urgencyLevel: "URGENT",
        driverName: "Tariq Khan",
        notes: "Oxygen provided",
        yearPeriodId: "2026",
        syncStatus: "PENDING",
      } as any);
    }
  });

  // Run 1: Outbound Sync
  console.log("   -> Executing Sync Run 1 (Outbound)...");
  const run1 = await SyncEngine.run({
    direction: "OUTBOUND",
    scope: "ALL",
    yearPeriodId: "2026",
    userId: "admin-tester",
  });
  console.log("   -> Run 1 Result:", run1.success, "| Processed:", run1.stats.recordsProcessed, "| Created:", run1.stats.recordsCreated);

  if (!run1.success) {
    throw new Error(`Sync Run 1 failed: ${run1.error}`);
  }

  // Run 2: Idempotency Check (Outbound re-run should skip unchanged records)
  console.log("   -> Executing Sync Run 2 (Idempotency verification)...");
  const run2 = await SyncEngine.run({
    direction: "OUTBOUND",
    scope: "ALL",
    yearPeriodId: "2026",
    userId: "admin-tester",
  });
  console.log("   -> Run 2 Result:", run2.success, "| Skipped count:", run2.stats.skippedCount, "| New rows:", run2.stats.recordsCreated);

  if (run2.stats.recordsCreated > 0) {
    throw new Error("Idempotency violation: duplicate rows created on consecutive sync run!");
  }
  console.log("   -> Idempotency confirmed: Zero duplicate rows created on re-run.");
  console.log("   [PASS] Sync Engine operational & idempotent.\n");

  console.log("===============================================================");
  console.log("ALL PART 7 PHASE 3 SYNC ENGINE TESTS PASSED 100%!");
  console.log("===============================================================");
}

runSyncEngineTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
