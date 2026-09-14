/**
 * scripts/test-data-entry-isolation.ts
 *
 * Automated verification suite for Part 6 Phase 5:
 * Data Entry Desk Isolation, Role-Based Access Hardening & System Polish
 */

import { readStore, updateStore } from "../lib/db";
import { hasPermission, canAccessRoute, ROLE_PERMISSIONS } from "../lib/auth/rbac";
import {
  createPatient,
  getPatients,
  checkDuplicatePatient,
  archivePatient,
} from "../lib/services/patient.service";
import {
  createTrip,
  getTrips,
  archiveTrip,
} from "../lib/services/trip.service";
import {
  createExpense,
  getExpenses,
  archiveExpense,
} from "../lib/services/expense.service";
import type { UserRole, Permission } from "../types/auth";

async function runDataEntryIsolationSuite() {
  console.log("\n==========================================================================");
  console.log("   JUNGLAN FOUNDATION — PHASE 5 DATA ENTRY ISOLATION & RBAC TEST SUITE   ");
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

  let createdPatientId: string | null = null;
  let createdTripId: string | null = null;
  let createdExpenseId: string | null = null;

  try {
    // -------------------------------------------------------------------------
    // 1. User Profiles & Role Invariant Verification
    // -------------------------------------------------------------------------
    console.log("--- 1. Default User Accounts & Role Profiles ---");
    const store = readStore();
    const adminUser = store.users?.find((u) => u.role === "ADMIN");
    const dataEntryUser = store.users?.find((u) => u.role === "DATA_ENTRY");

    assert(!!adminUser, `Found ADMIN user profile: ${adminUser?.email}`);
    assert(!!dataEntryUser, `Found DATA_ENTRY user profile: ${dataEntryUser?.email}`);
    assert(dataEntryUser?.isActive === true, "DATA_ENTRY user is marked active");
    assert(adminUser?.isActive === true, "ADMIN user is marked active");

    // -------------------------------------------------------------------------
    // 2. Strict Permission Matrix Checks (RBAC)
    // -------------------------------------------------------------------------
    console.log("\n--- 2. RBAC Permission Matrix Verification ---");
    
    // Check DATA_ENTRY granted permissions
    assert(hasPermission("DATA_ENTRY", "PATIENTS_READ"), "DATA_ENTRY has PATIENTS_READ");
    assert(hasPermission("DATA_ENTRY", "PATIENTS_WRITE"), "DATA_ENTRY has PATIENTS_WRITE");
    assert(hasPermission("DATA_ENTRY", "TRIPS_READ"), "DATA_ENTRY has TRIPS_READ");
    assert(hasPermission("DATA_ENTRY", "TRIPS_WRITE"), "DATA_ENTRY has TRIPS_WRITE");
    assert(hasPermission("DATA_ENTRY", "EXPENSES_READ"), "DATA_ENTRY has EXPENSES_READ");
    assert(hasPermission("DATA_ENTRY", "EXPENSES_WRITE"), "DATA_ENTRY has EXPENSES_WRITE");
    assert(hasPermission("DATA_ENTRY", "REPORTS_VIEW"), "DATA_ENTRY has REPORTS_VIEW");

    // Check DATA_ENTRY strictly denied administrative permissions
    assert(!hasPermission("DATA_ENTRY", "SYSTEM_SETTINGS"), "DATA_ENTRY denied SYSTEM_SETTINGS");
    assert(!hasPermission("DATA_ENTRY", "AUDIT_LOGS_VIEW"), "DATA_ENTRY denied AUDIT_LOGS_VIEW");
    assert(!hasPermission("DATA_ENTRY", "YEAR_CREATE"), "DATA_ENTRY denied YEAR_CREATE");
    assert(!hasPermission("DATA_ENTRY", "PROJECTS_MANAGE"), "DATA_ENTRY denied PROJECTS_MANAGE");
    assert(!hasPermission("DATA_ENTRY", "NEWS_MANAGE"), "DATA_ENTRY denied NEWS_MANAGE");
    assert(!hasPermission("DATA_ENTRY", "USERS_MANAGE"), "DATA_ENTRY denied USERS_MANAGE");
    assert(!hasPermission("DATA_ENTRY", "ROLES_MANAGE"), "DATA_ENTRY denied ROLES_MANAGE");

    // Check ADMIN has full privileges
    assert(hasPermission("ADMIN", "SYSTEM_SETTINGS"), "ADMIN has SYSTEM_SETTINGS");
    assert(hasPermission("ADMIN", "AUDIT_LOGS_VIEW"), "ADMIN has AUDIT_LOGS_VIEW");
    assert(hasPermission("ADMIN", "YEAR_CREATE"), "ADMIN has YEAR_CREATE");

    // -------------------------------------------------------------------------
    // 3. Route Access Boundary Enforcement (Middleware Logic)
    // -------------------------------------------------------------------------
    console.log("\n--- 3. Route Access Boundary Enforcement ---");

    // DATA_ENTRY allowed on data entry desk
    assert(canAccessRoute("DATA_ENTRY", "/data-entry"), "DATA_ENTRY can access /data-entry");
    assert(canAccessRoute("DATA_ENTRY", "/data-entry/trips/new"), "DATA_ENTRY can access /data-entry/trips/new");

    // DATA_ENTRY strictly blocked on admin paths
    assert(!canAccessRoute("DATA_ENTRY", "/admin"), "DATA_ENTRY blocked from /admin");
    assert(!canAccessRoute("DATA_ENTRY", "/admin/settings"), "DATA_ENTRY blocked from /admin/settings");
    assert(!canAccessRoute("DATA_ENTRY", "/admin/audit-logs"), "DATA_ENTRY blocked from /admin/audit-logs");
    assert(!canAccessRoute("DATA_ENTRY", "/admin/reports"), "DATA_ENTRY blocked from /admin/reports");
    assert(!canAccessRoute("DATA_ENTRY", "/admin/patients"), "DATA_ENTRY blocked from /admin/patients");
    assert(!canAccessRoute("DATA_ENTRY", "/admin/trips"), "DATA_ENTRY blocked from /admin/trips");
    assert(!canAccessRoute("DATA_ENTRY", "/admin/expenses"), "DATA_ENTRY blocked from /admin/expenses");

    // ADMIN allowed on both workspaces
    assert(canAccessRoute("ADMIN", "/admin"), "ADMIN can access /admin");
    assert(canAccessRoute("ADMIN", "/admin/settings"), "ADMIN can access /admin/settings");
    assert(canAccessRoute("ADMIN", "/data-entry"), "ADMIN can access /data-entry");

    // -------------------------------------------------------------------------
    // 4. Operational Desk Intake by Data Entry Operator
    // -------------------------------------------------------------------------
    console.log("\n--- 4. Data Entry Workstation Operations ---");
    const operatorId = dataEntryUser?.id ?? "usr-dataentry-01";

    // A. Operator registers a patient
    const testPatient = await createPatient(
      {
        fullName: "Test Intake Patient #991",
        gender: "MALE",
        age: 38,
        contactNumber: "03459998811",
        cnicOrBForm: "13202-9988112-1",
        residenceArea: "Birote Valley Mohalla",
        village: "Junglan",
        district: "Mansehra",
        medicalConditionSummary: "Field intake test case for Phase 5 verification.",
        yearPeriodId: "2026",
      },
      operatorId
    );
    createdPatientId = testPatient.id;
    assert(!!testPatient.id, `Data entry operator created patient: ${testPatient.patientIdentifier}`);

    // B. Real-time duplicate check
    const dupCheck = await checkDuplicatePatient({
      cnicOrBForm: "13202-9988112-1",
      contactNumber: "03459998811",
    });
    assert(dupCheck.isDuplicate === true, "Live duplicate check detected newly enrolled patient");
    assert(dupCheck.matches.length > 0, `Duplicate matches count: ${dupCheck.matches.length}`);

    // C. Operator dispatches emergency trip
    const testTrip = await createTrip(
      {
        ambulanceId: "amb-1",
        patientId: testPatient.id,
        patientName: testPatient.fullName,
        pickupLocation: "Birote Valley Mohalla",
        dropoffHospital: "DHQ Hospital Mansehra",
        driverPhone: "03001234567",
        distanceKm: 0,
        status: "DISPATCHED",
        tripCostPKR: 0,
        startOdometerKm: 51200,
        dispatchTime: new Date().toISOString(),
        urgencyLevel: "URGENT",
        driverName: "M. Tariq Khan",
        yearPeriodId: "2026",
      },
      operatorId
    );
    createdTripId = testTrip.id;
    assert(!!testTrip.id, `Data entry operator created emergency dispatch: ${testTrip.tripIdentifier}`);

    // D. Operator records fuel voucher
    const testExpense = await createExpense(
      {
        voucherNumber: "EXP-2026-TEST01",
        title: "Shift Diesel Slip: 45 Liters (AMB-01)",
        category: "AMBULANCE_FUEL",
        amountPKR: 12825,
        paidTo: "PSO Station Mansehra",
        paymentMethod: "CASH",
        expenseDate: new Date().toISOString(),
        description: "Verified field pump voucher slip #8819",
        yearPeriodId: "2026",
      },
      operatorId
    );
    createdExpenseId = testExpense.id;
    assert(!!testExpense.id, `Data entry operator recorded fuel voucher: ${testExpense.voucherNumber}`);

    // -------------------------------------------------------------------------
    // 5. Deletion & Voiding Lockdown (Administrative Supervision)
    // -------------------------------------------------------------------------
    console.log("\n--- 5. Deletion Lockdown & Administrative Supervision ---");

    // Verify ADMIN user can archive/void records
    const adminId = adminUser?.id ?? "usr-admin-01";
    const archivedPatient = await archivePatient(createdPatientId!, adminId);
    assert(archivedPatient.isArchived === true, "Admin successfully soft-archived test patient");

    const archivedTrip = await archiveTrip(createdTripId!, adminId);
    assert(archivedTrip.status === "CANCELLED", "Admin successfully cancelled test trip");

    const archivedExpense = await archiveExpense(createdExpenseId!, adminId);
    assert(archivedExpense.isArchived === true, "Admin successfully voided test expense voucher");

    // -------------------------------------------------------------------------
    // 6. Zero Data Loss & Audit Preservation
    // -------------------------------------------------------------------------
    console.log("\n--- 6. Zero Data Loss Invariant ---");
    const freshStore = readStore();
    const foundPatientInStore = freshStore.patients.find((p) => p.id === createdPatientId);
    assert(!!foundPatientInStore, "Archived patient physically preserved in database (Zero Data Loss)");
    assert(foundPatientInStore?.isArchived === true, "Preserved record isArchived === true");
    assert(!!foundPatientInStore?.deletedAt, "Preserved record contains valid deletedAt timestamp");

  } catch (err: any) {
    console.error("  ❌ Unexpected Error during test execution:", err.message || err);
    failed++;
  } finally {
    // Clean up test records
    await updateStore((store) => {
      if (createdPatientId) {
        store.patients = store.patients.filter((p) => p.id !== createdPatientId);
      }
      if (createdTripId) {
        store.trips = store.trips.filter((t) => t.id !== createdTripId);
      }
      if (createdExpenseId) {
        store.expenses = store.expenses.filter((e) => e.id !== createdExpenseId);
      }
      // Revert ambulance status if affected
      const amb = store.ambulances.find((a) => a.id === "amb-1");
      if (amb) {
        amb.status = "AVAILABLE";
      }
    });
  }

  console.log("\n==========================================================================");
  console.log(`   PHASE 5 TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("==========================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runDataEntryIsolationSuite();
