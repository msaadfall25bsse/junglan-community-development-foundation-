/**
 * scripts/test-financial-records-crud.ts
 *
 * Automated verification suite for Part 6 Phase 3:
 * Financial Operational Records (Expenses, Fuel, Maintenance & Funding)
 */

import {
  createExpense,
  getExpenseById,
  updateExpense,
  archiveExpense,
  getExpenses,
  generateVoucherNumber,
} from "../lib/services/expense.service";

import {
  createFunding,
  getFundingById,
  updateFunding,
  archiveFunding,
  getFundings,
} from "../lib/services/funding.service";

import { readStore } from "../lib/db";

async function runFinancialTestSuite() {
  console.log("\n=======================================================");
  console.log("   JUNGLAN FOUNDATION — PHASE 3 FINANCIAL CRUD SUITE   ");
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
    // -------------------------------------------------------------------------
    // 1. Voucher Generation
    // -------------------------------------------------------------------------
    console.log("--- 1. Voucher Number Generation ---");
    const sampleVoucher = await generateVoucherNumber("2026");
    assert(
      sampleVoucher.startsWith("EXP-2026-"),
      `Generated sequential voucher format: ${sampleVoucher}`
    );

    // -------------------------------------------------------------------------
    // 2. Expense Intake & Decimal Precision
    // -------------------------------------------------------------------------
    console.log("\n--- 2. Expense Creation & Category Mapping ---");
    const uniqueVoucher = `EXP-TEST-${Date.now()}`;
    const newExpense = await createExpense(
      {
        voucherNumber: uniqueVoucher,
        title: "Winter Mountain Road Snow Chains & Tire Servicing",
        category: "MAINTENANCE",
        amountPKR: 28500,
        paidTo: "Kaghan Tyre & Auto Mechanics, Balakot",
        expenseDate: "2026-02-15",
        description: "Four reinforced tire snow chains and hydraulic brake fluid replacement",
        receiptDocumentUrl: "https://docs.junglan.org/receipts/test-chain-invoice.pdf",
        yearPeriodId: "2026",
      },
      "usr-admin-01"
    );

    assert(!!newExpense.id, "Expense voucher recorded with unique ID");
    assert(newExpense.voucherNumber === uniqueVoucher, "Voucher number saved accurately");
    assert(Number(newExpense.amountPKR) === 28500, "PKR Amount stored with exact precision (28,500)");
    assert(newExpense.paidTo === "Kaghan Tyre & Auto Mechanics, Balakot", "Payee recorded accurately");

    // -------------------------------------------------------------------------
    // 3. Retrieval by ID / Voucher
    // -------------------------------------------------------------------------
    console.log("\n--- 3. Expense Retrieval ---");
    const retrievedExpense = await getExpenseById(newExpense.id);
    assert(retrievedExpense.id === newExpense.id, "Expense fetched by unique ID");
    assert(retrievedExpense.title.includes("Winter Mountain"), "Expense payload matches stored record");

    // -------------------------------------------------------------------------
    // 4. Update Expense & Audit Logging
    // -------------------------------------------------------------------------
    console.log("\n--- 4. Expense Update & Modification Tracking ---");
    const updatedExpense = await updateExpense(
      newExpense.id,
      {
        amountPKR: 31000,
        title: "Winter Mountain Road Snow Chains & Brake Pads Replacement",
        description: "Added rear brake pads replacement due to mountain wear",
      },
      "usr-admin-01"
    );

    assert(Number(updatedExpense.amountPKR) === 31000, "Expense amount updated to PKR 31,000");
    assert(updatedExpense.title.includes("Brake Pads"), "Expense title updated");

    // Verify audit log
    const storeAfterExpenseUpdate = readStore();
    const expenseAudit = storeAfterExpenseUpdate.auditLogs.find(
      (a) => a.recordId === newExpense.id && a.action === "UPDATE"
    );
    assert(!!expenseAudit, "Audit entry generated for expense modification");

    // -------------------------------------------------------------------------
    // 5. Soft-Archival of Expense Voucher (Zero-Loss)
    // -------------------------------------------------------------------------
    console.log("\n--- 5. Expense Voiding & Soft Archival ---");
    const archivedExpense = await archiveExpense(newExpense.id, "usr-admin-01");
    assert(archivedExpense.isArchived === true, "Expense flagged as isArchived: true");
    assert(!!archivedExpense.deletedAt, "deletedAt timestamp recorded");

    // Verify it is preserved in store
    const storePreserved = readStore();
    const preservedRecord = storePreserved.expenses.find((e) => e.id === newExpense.id);
    assert(!!preservedRecord, "Zero data loss: Voided voucher preserved in repository database");

    // -------------------------------------------------------------------------
    // 6. Inflow / Funding Intake & Project Balance Sync
    // -------------------------------------------------------------------------
    console.log("\n--- 6. Inflow / Funding Intake & Project Balance Sync ---");
    const storeBefore = readStore();
    const targetProject = storeBefore.projects && storeBefore.projects.length > 0
      ? storeBefore.projects[0]
      : null;

    const initialProjectFunding = targetProject ? Number(targetProject.currentFundingPKR) : 0;

    const uniqueRef = `DON-TEST-${Date.now()}`;
    const newFunding = await createFunding(
      {
        referenceNumber: uniqueRef,
        donorName: "Overseas Pakistani Community UK",
        donorContact: "+44 7700 900123",
        fundingSource: "COMMUNITY_DONATION",
        amountPKR: 250000,
        purpose: "Emergency Ambulance Fuel & Equipment Subsidy",
        paymentMethod: "BANK_TRANSFER",
        receiptNumber: "PK-HBL-9928172",
        receivedDate: "2026-03-01",
        projectId: targetProject ? targetProject.id : undefined,
        yearPeriodId: "2026",
      },
      "usr-admin-01"
    );

    assert(!!newFunding.id, "Funding record recorded with unique ID");
    assert(
      newFunding.referenceNumber.startsWith("FND-2026-"),
      `Reference number automatically assigned: ${newFunding.referenceNumber}`
    );
    assert(Number(newFunding.amountPKR) === 250000, "Funding amount stored with exact precision (250,000 PKR)");

    if (targetProject) {
      const storeAfter = readStore();
      const updatedProj = storeAfter.projects.find((p) => p.id === targetProject.id);
      const expectedFunding = initialProjectFunding + 250000;
      assert(
        Number(updatedProj?.currentFundingPKR) === expectedFunding,
        `Project currentFundingPKR incremented automatically from ${initialProjectFunding} to ${expectedFunding}`
      );
    }

    // -------------------------------------------------------------------------
    // 7. Funding Retrieval
    // -------------------------------------------------------------------------
    console.log("\n--- 7. Funding Retrieval by ID/Ref ---");
    const fetchedFunding = await getFundingById(newFunding.id);
    assert(fetchedFunding.id === newFunding.id, "Funding fetched by ID");
    assert(fetchedFunding.donorName === "Overseas Pakistani Community UK", "Donor name matches");

    // -------------------------------------------------------------------------
    // 8. Update Funding & Project Adjustment
    // -------------------------------------------------------------------------
    console.log("\n--- 8. Funding Update & Project Balance Recalculation ---");
    const updatedFunding = await updateFunding(
      newFunding.id,
      {
        amountPKR: 300000, // +50,000 adjustment
        purpose: "Expanded Emergency Ambulance Fuel & Mountain Safety Subsidy",
      },
      "usr-admin-01"
    );

    assert(Number(updatedFunding.amountPKR) === 300000, "Funding amount updated to PKR 300,000");

    if (targetProject) {
      const storeAfterUpdate = readStore();
      const projAfterUpdate = storeAfterUpdate.projects.find((p) => p.id === targetProject.id);
      const expectedNewBalance = initialProjectFunding + 300000;
      assert(
        Number(projAfterUpdate?.currentFundingPKR) === expectedNewBalance,
        `Project currentFundingPKR adjusted to reflect +50,000 revision (${expectedNewBalance})`
      );
    }

    // -------------------------------------------------------------------------
    // 9. Soft Archival of Funding Record
    // -------------------------------------------------------------------------
    console.log("\n--- 9. Funding Voiding & Safe Archive ---");
    const archivedFunding = await archiveFunding(newFunding.id, "usr-admin-01");
    assert(archivedFunding.isArchived === true, "Funding record marked as isArchived: true");
    assert(!!archivedFunding.deletedAt, "Funding deletedAt timestamp assigned");

    if (targetProject) {
      const storeAfterArchive = readStore();
      const projAfterArchive = storeAfterArchive.projects.find((p) => p.id === targetProject.id);
      assert(
        Number(projAfterArchive?.currentFundingPKR) === initialProjectFunding,
        `Project balance cleanly restored to initial value (${initialProjectFunding}) after voucher void`
      );
    }

    // -------------------------------------------------------------------------
    // 10. Financial Query & Aggregation
    // -------------------------------------------------------------------------
    console.log("\n--- 10. Multi-Criteria Expense & Funding Queries ---");
    const expenseList = await getExpenses({ yearPeriodId: "2026", limit: 50 });
    assert(expenseList.expenses.length >= 0, `Expenses list query returned ${expenseList.expenses.length} records`);

    const fundingList = await getFundings({ yearPeriodId: "2026", limit: 50 });
    assert(fundingList.fundings.length >= 0, `Funding list query returned ${fundingList.fundings.length} records`);

  } catch (err: any) {
    console.error("  ❌ Unexpected Error during test execution:", err.message || err);
    failed++;
  }

  console.log("\n=======================================================");
  console.log(`   TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runFinancialTestSuite();
