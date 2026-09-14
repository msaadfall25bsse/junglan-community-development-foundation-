import {
  getAmbulances,
  getAmbulanceById,
  createAmbulance,
  updateAmbulance,
  archiveAmbulance,
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  completeTrip,
  archiveTrip,
  createPatient,
} from "../lib/services";

async function runFleetTripsTests() {
  console.log("=======================================================");
  console.log("   JUNGLAN FOUNDATION — PHASE 2 FLEET & TRIPS SUITE    ");
  console.log("=======================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, message: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // --- 1. Ambulance Registration ---
    console.log("--- 1. Ambulance Registration & Fleet Management ---");
    const testPlate = `TEST-AMB-${Date.now().toString().slice(-4)}`;
    const ambulance = await createAmbulance(
      {
        vehicleNumber: testPlate,
        make: "Toyota",
        model: "Land Cruiser 4x4 Mountain Unit",
        yearOfManufacture: 2025,
        status: "AVAILABLE",
        baseLocation: "Junglan Central Depot",
        currentOdometerKm: 5000,
        equipmentList: ["Oxygen Tank", "Defibrillator", "Stretcher"],
      },
      "usr-admin-test"
    );

    assert(Boolean(ambulance.id), "Ambulance registered with system ID");
    assert(
      ambulance.ambulanceIdentifier === testPlate,
      `Fleet identifier registered: ${ambulance.ambulanceIdentifier}`
    );
    assert(
      ambulance.status === "AVAILABLE",
      "Ambulance initial status is AVAILABLE"
    );
    assert(
      Number(ambulance.currentOdometerKm) === 5000,
      "Current odometer initialized accurately"
    );

    // --- 2. Status Transition & Update ---
    console.log("\n--- 2. Ambulance Status Lifecycle & Maintenance ---");
    const updatedAmb = await updateAmbulance(
      ambulance.id,
      {
        status: "MAINTENANCE",
        assignedDriverName: "M. Tariq Khan",
        baseLocation: "Hazara Mountain Depot",
      },
      "usr-admin-test"
    );

    assert(
      updatedAmb.status === "MAINTENANCE",
      "Ambulance transitioned to MAINTENANCE status"
    );
    assert(
      updatedAmb.assignedDriverName === "M. Tariq Khan",
      "Assigned driver updated successfully"
    );

    // --- 3. Dispatch Safeguard Verification ---
    console.log("\n--- 3. Dispatch Safeguard (Maintenance Vehicle Block) ---");
    let blockedSafeguard = false;
    try {
      await createTrip(
        {
          ambulanceId: ambulance.id,
          driverName: "M. Tariq Khan",
          driverPhone: "03001234567",
          patientName: "Emergency Test Patient",
          pickupLocation: "Upper Valley",
          dropoffHospital: "DHQ Mansehra",
          startOdometerKm: 5000,
          distanceKm: 0,
          tripCostPKR: 0,
          dispatchTime: new Date().toISOString(),
          urgencyLevel: "CRITICAL",
          status: "DISPATCHED",
          yearPeriodId: "2026",
        },
        "usr-admin-test"
      );
    } catch (err: any) {
      blockedSafeguard = true;
      assert(
        err.message.includes("MAINTENANCE") || err.message.includes("cannot be dispatched"),
        `Safeguard blocked dispatch: ${err.message}`
      );
    }
    assert(blockedSafeguard, "Maintenance vehicle successfully blocked from dispatch");

    // Restore to AVAILABLE
    await updateAmbulance(
      ambulance.id,
      { status: "AVAILABLE" },
      "usr-admin-test"
    );

    // --- 4. Emergency Mission Dispatch & Patient Linking ---
    console.log("\n--- 4. Emergency Mission Dispatch & Telemetry ---");
    // Create patient for linking
    const patient = await createPatient(
      {
        fullName: "Zainab Bibi",
        gender: "FEMALE",
        age: 28,
        contactNumber: "03009988776",
        residenceArea: "Junglan Upper Valley",
        district: "Mansehra",
        medicalConditionSummary: "Emergency maternity delivery transit",
        yearPeriodId: "2026",
      },
      "usr-admin-test"
    );

    const trip = await createTrip(
      {
        ambulanceId: ambulance.id,
        patientId: patient.id,
        patientName: patient.fullName,
        patientPhone: patient.contactNumber,
        driverName: "M. Tariq Khan",
        driverPhone: "03001234567",
        paramedicName: "Qari Imran",
        pickupLocation: "Upper Junglan Valley Point A",
        dropoffHospital: "Ayub Teaching Hospital Abbottabad",
        startOdometerKm: 5000,
        distanceKm: 0,
        tripCostPKR: 0,
        dispatchTime: new Date().toISOString(),
        urgencyLevel: "CRITICAL",
        status: "DISPATCHED",
        notes: "Oxygen administered throughout mountain passage",
        yearPeriodId: "2026",
      },
      "usr-admin-test"
    );

    assert(Boolean(trip.id), "Trip created with unique system ID");
    assert(
      trip.tripIdentifier.startsWith("TRP-2026-"),
      `Assigned unique mission code: ${trip.tripIdentifier}`
    );
    assert(trip.patientName === "Zainab Bibi", "Trip correctly linked to patient");

    // Verify ambulance status transitioned to ON_TRIP
    const checkAmb = await getAmbulanceById(ambulance.id);
    assert(
      checkAmb.status === "ON_TRIP",
      "Ambulance status automatically transitioned to ON_TRIP"
    );

    // --- 5. Mission Completion & Odometer Reconciliation ---
    console.log("\n--- 5. Mission Completion & Distance Integrity ---");
    const completedTrip = await completeTrip(
      trip.id,
      {
        endOdometerKm: 5062,
        returnTime: new Date().toISOString(),
        notes: "Patient arrived safely; handed over to emergency triage.",
      },
      "usr-admin-test"
    );

    assert(
      completedTrip.status === "COMPLETED",
      "Trip marked as COMPLETED"
    );
    assert(
      Number(completedTrip.distanceKm) === 62,
      `Calculated net distance: ${completedTrip.distanceKm} km (5062 - 5000)`
    );

    // Verify vehicle restored to AVAILABLE and odometer updated
    const vehicleAfterTrip = await getAmbulanceById(ambulance.id);
    assert(
      vehicleAfterTrip.status === "AVAILABLE",
      "Vehicle status automatically restored to AVAILABLE"
    );
    assert(
      Number(vehicleAfterTrip.currentOdometerKm) === 5062,
      `Vehicle current odometer synchronized to ${vehicleAfterTrip.currentOdometerKm} km`
    );

    // --- 6. Trip Detail & Relational Dossier ---
    console.log("\n--- 6. Mission Detail Dossier Query ---");
    const tripDossier = await getTripById(trip.id);
    assert(
      tripDossier.id === trip.id,
      "Trip dossier retrieved by unique identifier"
    );
    assert(
      tripDossier.ambulance !== null,
      "Linked ambulance details populated in dossier"
    );
    assert(
      tripDossier.patient !== null,
      "Linked patient record populated in dossier"
    );

    // --- 7. Safe Archival Preservation ---
    console.log("\n--- 7. Safe Soft-Archive Preservation ---");
    const archivedTrip = await archiveTrip(trip.id, "usr-admin-test");
    assert(archivedTrip.isArchived === true, "Trip successfully soft-archived");

    const archivedAmb = await archiveAmbulance(ambulance.id, "usr-admin-test");
    assert(
      archivedAmb.isActive === false && archivedAmb.status === "OUT_OF_SERVICE",
      "Vehicle successfully marked OUT_OF_SERVICE and preserved"
    );

    console.log("\n=======================================================");
    console.log(`   TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log("=======================================================\n");

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error("Test execution failed:", error);
    process.exit(1);
  }
}

runFleetTripsTests();
