/**
 * scripts/test-patient-crud.ts
 *
 * Automated verification suite for Part 6 Phase 1:
 * Patient Management, Duplicate Detection, Detail Views & Soft-Archive
 */

import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  archivePatient,
  checkDuplicatePatient,
} from "../lib/services/patient.service";

async function runPatientTestSuite() {
  console.log("\n=======================================================");
  console.log("   JUNGLAN FOUNDATION — PHASE 1 PATIENT CRUD SUITE    ");
  console.log("=======================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, title: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${title}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${title}`);
      failed++;
    }
  }

  try {
    // 1. Test Patient Creation with Stable ID
    console.log("--- 1. Patient Intake & Stable ID Generation ---");
    const testCnic = `13101-${Math.floor(1000000 + Math.random() * 9000000)}-1`;
    const testPhone = `0300-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const newPatient = await createPatient(
      {
        fullName: "Kashif Mehmood Khan",
        cnicOrBForm: testCnic,
        gender: "MALE",
        age: 38,
        contactNumber: testPhone,
        emergencyContactName: "Akram Khan (Father)",
        emergencyContactPhone: "0312-5554321",
        residenceArea: "Birote, Junglan Valley",
        district: "Mansehra",
        medicalConditionSummary: "Severe acute chest trauma following road slope slip",
        yearPeriodId: "2026",
      },
      "usr-admin-01"
    );

    assert(!!newPatient.id, "Patient created with valid system ID");
    assert(
      newPatient.patientIdentifier.startsWith("JCD-P-2026-"),
      `Patient assigned stable unique ID: ${newPatient.patientIdentifier}`
    );
    assert(newPatient.fullName === "Kashif Mehmood Khan", "Full name stored accurately");

    // 2. Test Duplicate Detection Engine
    console.log("\n--- 2. Duplicate Detection Engine ---");
    const dupCheckCnic = await checkDuplicatePatient({ cnicOrBForm: testCnic });
    assert(
      dupCheckCnic.hasDuplicate && dupCheckCnic.matches.length > 0,
      "Duplicate detected on exact CNIC match"
    );

    const dupCheckPhone = await checkDuplicatePatient({ contactNumber: testPhone });
    assert(
      dupCheckPhone.hasDuplicate && dupCheckPhone.matches.length > 0,
      "Duplicate detected on matching contact phone number"
    );

    const dupCheckNonExisting = await checkDuplicatePatient({ cnicOrBForm: "99999-9999999-9" });
    assert(!dupCheckNonExisting.hasDuplicate, "Clean pass when no duplicate exists");

    // 3. Test Detail View Query
    console.log("\n--- 3. Patient Detail Query ---");
    const fetched = await getPatientById(newPatient.id);
    assert(fetched.id === newPatient.id, "Patient detail fetched by ID");
    assert(Array.isArray(fetched.trips), "Associated emergency trips array returned");

    // 4. Test Update Workflow
    console.log("\n--- 4. Patient Update Workflow ---");
    const updated = await updatePatient(
      newPatient.id,
      {
        medicalConditionSummary: "Trauma stabilized; referred to DHQ Abbottabad",
        isUnderReview: true,
        reviewNotes: "Requires surgical follow-up after 10 days",
      },
      "usr-admin-01"
    );
    assert(
      updated.medicalConditionSummary === "Trauma stabilized; referred to DHQ Abbottabad",
      "Medical condition summary updated"
    );
    assert(updated.isFlaggedForReview === true, "Flagged for administrative review");

    // 5. Test Safe Soft-Archive Workflow (No destructive delete)
    console.log("\n--- 5. Safe Soft-Archive (Historical Preservation) ---");
    const archived = await archivePatient(newPatient.id, "usr-admin-01");
    assert(archived.isArchived === true, "Patient successfully marked as archived");

    // Verify patient still exists in database (historical preservation)
    const preserved = await getPatientById(newPatient.id);
    assert(!!preserved, "Archived patient remains permanently preserved in database");

    console.log("\n=======================================================");
    console.log(`   TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log("=======================================================\n");

    if (failed > 0) process.exit(1);
  } catch (err: any) {
    console.error("Test execution failed with error:", err);
    process.exit(1);
  }
}

runPatientTestSuite();
