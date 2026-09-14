/**
 * scripts/verify-all-system-features.ts
 *
 * Full Comprehensive Verification of Admin Panel, Data Entry Desk,
 * Domain Services, Database Resilience, and Cross-Module Synchronization.
 */

import { readStore } from "../lib/db";
import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  archivePatient,
  checkDuplicatePatient,
} from "../lib/services/patient.service";

import {
  createAmbulance,
  getAmbulances,
  getAmbulanceById,
  updateAmbulance,
  archiveAmbulance,
} from "../lib/services/ambulance.service";

import {
  createTrip,
  getTrips,
  getTripById,
  completeTrip,
  archiveTrip,
} from "../lib/services/trip.service";

import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  archiveExpense,
  generateVoucherNumber,
} from "../lib/services/expense.service";

import {
  createFunding,
  getFundings,
  getFundingById,
  updateFunding,
  archiveFunding,
} from "../lib/services/funding.service";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../lib/services/project.service";

import {
  getReports,
  createReport,
  updateReport,
  deleteReport,
} from "../lib/services/report.service";

import {
  getNewsArticles,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
} from "../lib/services/news.service";

import {
  getSiteSettings,
  updateSiteSettings,
  exportSiteBackup,
} from "../lib/services/settings.service";

import { getAuditLogs } from "../lib/services/audit.service";

async function runComprehensiveSystemCheck() {
  console.log("\n===============================================================================");
  console.log("   JUNGLAN FOUNDATION — FULL SYSTEM, ADMIN & DATA ENTRY DIAGNOSTIC AUDIT   ");
  console.log("===============================================================================\n");

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
    // 1. DATABASE ENGINE & REPOSITORY STORE HEALTH
    // -------------------------------------------------------------------------
    console.log("--- 1. Database Health & Persistence Engine ---");
    const store = readStore();
    assert(!!store, "Persistent store loaded successfully");
    assert(Array.isArray(store.patients), `Patients store operational (${store.patients.length} records)`);
    assert(Array.isArray(store.ambulances), `Ambulance fleet store operational (${store.ambulances.length} vehicles)`);
    assert(Array.isArray(store.trips), `Emergency trips store operational (${store.trips.length} missions)`);
    assert(Array.isArray(store.expenses), `Expenses store operational (${store.expenses.length} vouchers)`);
    assert(Array.isArray(store.funding), `Funding store operational (${store.funding.length} records)`);
    assert(Array.isArray(store.projects), `Projects store operational (${store.projects.length} projects)`);
    assert(Array.isArray(store.reports), `Reports store operational (${store.reports.length} publications)`);
    assert(Array.isArray(store.news), `News store operational (${store.news.length} articles)`);
    assert(Array.isArray(store.auditLogs), `Audit ledger operational (${store.auditLogs.length} audit events)`);
    assert(!!store.settings, "Site settings and CMS content store loaded");

    // -------------------------------------------------------------------------
    // 2. PATIENT MANAGEMENT & DUPLICATE SAFEGUARDS (PHASE 1)
    // -------------------------------------------------------------------------
    console.log("\n--- 2. Patient Management & Duplicate Safeguards ---");
    const testCnic = `13101-${Math.floor(1000000 + Math.random() * 9000000)}-5`;
    const patient1 = await createPatient(
      {
        fullName: "Sardar Muhammad Rafique",
        cnicOrBForm: testCnic,
        gender: "MALE",
        age: 52,
        contactNumber: "0300-1122334",
        emergencyContactName: "Tariq Rafique (Son)",
        emergencyContactPhone: "0312-9988776",
        residenceArea: "Junglan Bala",
        district: "Mansehra",
        medicalConditionSummary: "Chronic respiratory difficulty, seasonal mountain asthma",
        yearPeriodId: "2026",
      },
      "usr-admin-01"
    );

    assert(!!patient1.id, "Patient created with ID", patient1.id);
    assert(patient1.patientIdentifier.startsWith("JCD-P-2026-"), `Assigned stable ID: ${patient1.patientIdentifier}`);

    // Duplicate Check using object format
    const dupCheck = await checkDuplicatePatient({ cnicOrBForm: testCnic });
    assert(dupCheck.hasDuplicate === true, "CNIC duplicate check successfully flags existing patient");
    assert(dupCheck.patient?.id === patient1.id, "Duplicate detector matches exact patient record");

    // Update Patient
    const updatedPatient = await updatePatient(
      patient1.id,
      {
        medicalConditionSummary: "Chronic respiratory difficulty — managed with regular oxygen",
        residenceArea: "Junglan Payeen",
      },
      "usr-admin-01"
    );
    assert(updatedPatient.residenceArea === "Junglan Payeen", "Patient record updated successfully");

    // Soft Archive Patient
    const archivedPatient = await archivePatient(patient1.id, "usr-admin-01");
    assert(archivedPatient.isArchived === true, "Patient soft-archived (isArchived: true)");
    assert(!!(archivedPatient as any).deletedAt, "Patient soft-archive deletedAt assigned");

    // -------------------------------------------------------------------------
    // 3. AMBULANCE FLEET & DISPATCH TELEMETRY (PHASE 2)
    // -------------------------------------------------------------------------
    console.log("\n--- 3. Ambulance Fleet & Emergency Dispatch Telemetry ---");
    const testReg = `TEST-AMB-${Date.now().toString().slice(-4)}`;
    const newAmbulance = await createAmbulance(
      {
        vehicleNumber: testReg,
        make: "Toyota",
        model: "Hilux 4x4 Mountain Spec",
        yearOfManufacture: 2024,
        status: "AVAILABLE",
        baseLocation: "Junglan Central Emergency Depot",
        currentOdometerKm: 25400,
        equipmentList: ["Oxygen Concentrator", "Trauma Kit", "Spine Board"],
      },
      "usr-admin-01"
    );

    assert(!!newAmbulance.id, "Ambulance created with ID", newAmbulance.id);
    assert(newAmbulance.status === "AVAILABLE", "New vehicle marked AVAILABLE for emergency dispatch");

    // Create Emergency Dispatch Mission
    const newMission = await createTrip(
      {
        ambulanceId: newAmbulance.id,
        patientId: patient1.id,
        patientName: "Sardar Muhammad Rafique",
        driverName: "Alamzeb Khan",
        driverPhone: "0301-4455667",
        pickupLocation: "Junglan Bala Remote Hamlet",
        dropoffHospital: "Ayub Teaching Hospital Abbottabad",
        startOdometerKm: 25400,
        distanceKm: 0,
        dispatchTime: new Date().toISOString(),
        urgencyLevel: "CRITICAL",
        status: "DISPATCHED",
        tripCostPKR: 0,
        notes: "Oxygen support active throughout transit",
        yearPeriodId: "2026",
      },
      "usr-admin-01"
    );

    assert(!!newMission.id, "Emergency trip dispatched with mission ID");
    assert(newMission.status === "DISPATCHED", "Mission status is DISPATCHED");

    // Verify ambulance automatically transitioned to ON_TRIP
    const ambAfterDispatch = await getAmbulanceById(newAmbulance.id);
    assert(ambAfterDispatch.status === "ON_TRIP", "Vehicle auto-transitioned to ON_TRIP status");

    // Complete Mission with live mileage calculation
    const completedMission = await completeTrip(
      newMission.id,
      {
        endOdometerKm: 25485, // 85 km transit
        returnTime: new Date().toISOString(),
        notes: "Safe clinical handover completed at ATH Abbottabad Emergency Trauma Bay",
      },
      "usr-admin-01"
    );

    assert(completedMission.status === "COMPLETED", "Mission marked as COMPLETED");
    assert(Number(completedMission.distanceKm) === 85, `Distance calculated automatically (25485 - 25400 = ${completedMission.distanceKm} km)`);

    // Verify ambulance restored to AVAILABLE and odometer updated to 25485
    const ambAfterComplete = await getAmbulanceById(newAmbulance.id);
    assert(ambAfterComplete.status === "AVAILABLE", "Vehicle restored to AVAILABLE after mission completion");
    assert(Number(ambAfterComplete.currentOdometerKm) === 25485, `Vehicle odometer updated to ${ambAfterComplete.currentOdometerKm} km`);

    // Safe Decommission
    const archivedAmbulance = await archiveAmbulance(newAmbulance.id, "usr-admin-01");
    assert(archivedAmbulance.isActive === false, "Ambulance safely decommissioned without data loss");

    // -------------------------------------------------------------------------
    // 4. FINANCIAL OPERATIONAL RECORDS & PROJECT BALANCE SYNC (PHASE 3)
    // -------------------------------------------------------------------------
    console.log("\n--- 4. Financial Operational Records & Project Balancing ---");
    const voucherNo = await generateVoucherNumber("2026");
    assert(voucherNo.startsWith("EXP-2026-"), `Generated voucher number: ${voucherNo}`);

    const newExpense = await createExpense(
      {
        voucherNumber: voucherNo,
        title: "Mountain Heavy Diesel Refill — Fleet Emergency Reserve",
        category: "AMBULANCE_FUEL",
        amountPKR: 18500,
        paidTo: "Attock Petroleum Abbottabad Road",
        paymentMethod: "CASH",
        expenseDate: "2026-03-05",
        description: "65 Liters Euro-5 Diesel for high-altitude emergency transit",
        yearPeriodId: "2026",
      },
      "usr-admin-01"
    );

    assert(!!newExpense.id, "Expense voucher recorded");
    assert(Number(newExpense.amountPKR) === 18500, "Expense amount stored accurately (18,500 PKR)");

    // Soft-archive expense
    const archivedExpense = await archiveExpense(newExpense.id, "usr-admin-01");
    assert(archivedExpense.isArchived === true, "Expense voided with soft-archival");

    // Funding with automatic project increment
    const projectsRes = await getProjects();
    const testProject = projectsRes.projects[0];
    const initialProjectFunding = Number(testProject.currentFundingPKR);

    const fundingRecord = await createFunding(
      {
        donorName: "Friends of Junglan Calgary, Canada",
        donorContact: "0300-8889900",
        fundingSource: "INTERNATIONAL_AID",
        amountPKR: 120000,
        projectId: testProject.id,
        purpose: "Emergency Oxygen Subsidies",
        paymentMethod: "BANK_TRANSFER",
        receivedDate: "2026-03-10",
        isAnonymous: false,
        yearPeriodId: "2026",
      },
      "usr-admin-01"
    );

    assert(!!fundingRecord.id, "Inbound funding recorded");
    assert(fundingRecord.referenceNumber.startsWith("FND-2026-"), "Sequential funding reference generated");

    const storeAfterFunding = readStore();
    const projAfterFunding = storeAfterFunding.projects.find((p) => p.id === testProject.id);
    assert(
      Number(projAfterFunding?.currentFundingPKR) === initialProjectFunding + 120000,
      `Project currentFundingPKR incremented automatically (${initialProjectFunding} -> ${projAfterFunding?.currentFundingPKR})`
    );

    // Void funding and confirm project balance restoration
    await archiveFunding(fundingRecord.id, "usr-admin-01");
    const storeAfterVoid = readStore();
    const projAfterVoid = storeAfterVoid.projects.find((p) => p.id === testProject.id);
    assert(
      Number(projAfterVoid?.currentFundingPKR) === initialProjectFunding,
      `Project currentFundingPKR cleanly restored to ${initialProjectFunding} after funding void`
    );

    // -------------------------------------------------------------------------
    // 5. DATA ENTRY DESK SUBMISSION VERIFICATION
    // -------------------------------------------------------------------------
    console.log("\n--- 5. Data Entry Desk Workflow Verification ---");
    // Simulate Data Entry Desk quick trip submission
    const deskTrip = await createTrip(
      {
        ambulanceId: store.ambulances[0]?.id || "amb-01",
        driverName: "Muhammad Tariq Khan",
        driverPhone: "03001234567",
        patientName: "Emergency Patient Intake #8812",
        pickupLocation: "Birote Valley, Junglan",
        dropoffHospital: "DHQ Hospital Mansehra",
        startOdometerKm: 51200,
        distanceKm: 0,
        dispatchTime: new Date().toISOString(),
        urgencyLevel: "URGENT",
        status: "DISPATCHED",
        tripCostPKR: 0,
        notes: "Intake desk rapid dispatch",
        yearPeriodId: "2026",
      },
      "usr-data-01"
    );
    assert(!!deskTrip.id, "Data Entry desk emergency trip submission successful");

    // Simulate Data Entry Desk quick fuel voucher
    const deskFuelVoucher = await createExpense(
      {
        voucherNumber: `VCH-DESK-${Date.now().toString().slice(-4)}`,
        title: "Ambulance Diesel: 50 Liters (AMB-01)",
        category: "AMBULANCE_FUEL",
        amountPKR: 14250,
        paidTo: "PSO Station Mansehra",
        paymentMethod: "CASH",
        expenseDate: new Date().toISOString(),
        description: "Fuel refill 50L at PSO Station Mansehra, Odometer 51240 km. Logged at operational intake desk.",
        yearPeriodId: "2026",
      },
      "usr-data-01"
    );
    assert(!!deskFuelVoucher.id, "Data Entry desk fuel slip submission successful");

    // Clean up test trip & voucher
    await archiveTrip(deskTrip.id, "usr-admin-01");
    await archiveExpense(deskFuelVoucher.id, "usr-admin-01");

    // -------------------------------------------------------------------------
    // 6. CMS, SETTINGS & AUDIT LOGGING VERIFICATION
    // -------------------------------------------------------------------------
    console.log("\n--- 6. CMS Content, Site Settings & Audit Trail ---");
    // Test Site Settings
    const initialSettings = await getSiteSettings();
    assert(!!initialSettings.ambulanceHotline, `Ambulance Hotline configured: ${initialSettings.ambulanceHotline}`);

    const updatedSettings = await updateSiteSettings({
      ambulanceHotline: initialSettings.ambulanceHotline,
    });
    assert(!!updatedSettings, "Settings update service verified");

    // Test Backup Export
    const backupData = await exportSiteBackup();
    assert(!!backupData.settings, "1-Click JSON Backup export engine verified");

    // Test Audit Trail
    const auditLogsResult = await getAuditLogs({ page: 1, limit: 10, sortOrder: "desc" });
    assert(auditLogsResult.logs.length > 0, `Audit log ledger records active (${auditLogsResult.logs.length} recent entries)`);
    const recentAction = auditLogsResult.logs[0];
    assert(!!recentAction.action, `Most recent audited action: [${recentAction.action}] in module [${recentAction.module}]`);

  } catch (err: any) {
    console.error("  ❌ Unexpected Error during diagnostic audit:", err.message || err);
    failed++;
  }

  console.log("\n===============================================================================");
  console.log(`   DIAGNOSTIC AUDIT RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("===============================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runComprehensiveSystemCheck();
