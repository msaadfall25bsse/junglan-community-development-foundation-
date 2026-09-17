import {
  generateStandardFileName,
  computeFileHash,
  getSubfolderForModule,
  uploadAttachmentToDrive,
  listDriveAttachments,
} from "../lib/google/document-attachment.service";
import { ensureYearFolderStructure } from "../lib/google/google-drive.service";
import { getRecordMapping } from "../lib/services/sync-db.service";

async function runPhase5Tests() {
  console.log("================================================================================");
  console.log("PHASE 5 ACCEPTANCE TEST SUITE: Google Drive Document & Receipt Attachments");
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
  // TEST 1: Standardized File Naming (Section 50)
  // ----------------------------------------------------------------------------
  console.log("--- 1. Testing Standardized File Naming Format ---");
  const expFileName = generateStandardFileName({
    module: "EXPENSE",
    identifier: "EXP-2026-000015",
    year: "2026",
    originalFileName: "fuel_pump_receipt_scan.pdf",
  });
  assert(
    expFileName === "JUNGLAN_EXPENSE_EXP-2026-000015_2026.pdf",
    "Expense receipt standard naming strictly enforced",
    `Generated: ${expFileName}`
  );

  const tripFileName = generateStandardFileName({
    module: "TRIP",
    identifier: "TRP-2026-000042",
    year: "2026",
    originalFileName: "patient_referral.jpg",
  });
  assert(
    tripFileName === "JUNGLAN_TRIP_TRP-2026-000042_2026.jpg",
    "Trip attachment standard naming strictly enforced",
    `Generated: ${tripFileName}`
  );

  const reportFileName = generateStandardFileName({
    module: "REPORT",
    identifier: "REP-2026-Q2",
    year: "2026",
    originalFileName: "audit_report_signed.pdf",
  });
  assert(
    reportFileName === "JUNGLAN_REPORT_REP-2026-Q2_2026.pdf",
    "Report standard naming strictly enforced",
    `Generated: ${reportFileName}`
  );

  // ----------------------------------------------------------------------------
  // TEST 2: Year-based Subfolder Routing (Sections 9, 10, 49)
  // ----------------------------------------------------------------------------
  console.log("\n--- 2. Testing Subfolder Routing by Module ---");
  assert(
    getSubfolderForModule("EXPENSE") === "Receipts",
    "Expense module routes to 'Receipts/' subfolder"
  );
  assert(
    getSubfolderForModule("TRIP") === "Ambulance Records",
    "Trip module routes to 'Ambulance Records/' subfolder"
  );
  assert(
    getSubfolderForModule("REPORT") === "Reports",
    "Report module routes to 'Reports/' subfolder"
  );
  assert(
    getSubfolderForModule("DOCUMENT") === "Documents",
    "Document module routes to 'Documents/' subfolder"
  );

  const hierarchy = await ensureYearFolderStructure("2026");
  assert(
    Boolean(hierarchy.subfolders["Receipts"]) &&
      Boolean(hierarchy.subfolders["Ambulance Records"]) &&
      Boolean(hierarchy.subfolders["Reports"]) &&
      Boolean(hierarchy.subfolders["Documents"]),
    "Year 2026 folder hierarchy verified in Google Drive",
    `Receipts Folder ID: ${hierarchy.subfolders["Receipts"]}`
  );

  // ----------------------------------------------------------------------------
  // TEST 3: File Upload & Attachment Linkage
  // ----------------------------------------------------------------------------
  console.log("\n--- 3. Testing File Upload & Operational Record Linkage ---");
  const mockBuffer = Buffer.from("%PDF-1.4 Mock Receipt Payload for Diesel Refill - PKR 4500");
  const uploadResult1 = await uploadAttachmentToDrive({
    module: "EXPENSE",
    identifier: "EXP-2026-TEST-01",
    recordId: "exp-test-rec-01",
    year: "2026",
    originalFileName: "diesel_receipt.pdf",
    mimeType: "application/pdf",
    fileBuffer: mockBuffer,
    description: "Diesel Refill at PSO Mansehra",
  });

  assert(
    Boolean(uploadResult1.fileId && uploadResult1.webViewLink),
    "Receipt successfully uploaded to Google Drive",
    `File ID: ${uploadResult1.fileId}, Link: ${uploadResult1.webViewLink}`
  );
  assert(
    !uploadResult1.isDuplicateReused,
    "First upload marked as new file (isDuplicateReused = false)"
  );
  assert(
    uploadResult1.fileName === "JUNGLAN_EXPENSE_EXP-2026-TEST-01_2026.pdf",
    "Uploaded file named using canonical pattern",
    uploadResult1.fileName
  );

  // Check ExternalRecordMapping
  const mapping = await getRecordMapping("DOCUMENT", "exp-test-rec-01");
  assert(
    Boolean(mapping && mapping.spreadsheetId === uploadResult1.fileId),
    "ExternalRecordMapping created with fileId reference",
    `Ref: ${mapping?.spreadsheetId}`
  );

  // ----------------------------------------------------------------------------
  // TEST 4: Idempotency & Deduplication (Sections 51, 89)
  // ----------------------------------------------------------------------------
  console.log("\n--- 4. Testing Idempotent Deduplication (Zero-Quota Waste) ---");
  // Upload exact same file buffer with different voucher
  const uploadResult2 = await uploadAttachmentToDrive({
    module: "EXPENSE",
    identifier: "EXP-2026-TEST-02",
    recordId: "exp-test-rec-02",
    year: "2026",
    originalFileName: "duplicate_receipt_copy.pdf",
    mimeType: "application/pdf",
    fileBuffer: mockBuffer, // identical buffer!
    description: "Re-upload of identical diesel receipt",
  });

  assert(
    uploadResult2.isDuplicateReused === true,
    "Duplicate file buffer detected (isDuplicateReused = true)"
  );
  assert(
    uploadResult2.fileId === uploadResult1.fileId,
    "Existing Google Drive File ID reused without duplicate upload",
    `Reused File ID: ${uploadResult2.fileId}`
  );
  assert(
    uploadResult2.webViewLink === uploadResult1.webViewLink,
    "Drive preview link points to identical canonical document",
    uploadResult2.webViewLink
  );

  // ----------------------------------------------------------------------------
  // TEST 5: Listing Google Drive Attachments
  // ----------------------------------------------------------------------------
  console.log("\n--- 5. Testing Drive Attachments Querying ---");
  const driveFiles = await listDriveAttachments({
    year: "2026",
    module: "EXPENSE",
  });

  assert(
    driveFiles.length > 0,
    "listDriveAttachments returns receipts stored in 2026/Receipts",
    `Found ${driveFiles.length} file(s)`
  );
  assert(
    driveFiles.some((f) => f.id === uploadResult1.fileId),
    "Uploaded receipt found in folder file listing"
  );

  // ----------------------------------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------------------------------
  console.log("\n================================================================================");
  console.log(`PHASE 5 TEST RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log("================================================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runPhase5Tests().catch((err) => {
  console.error("Test execution fatal error:", err);
  process.exit(1);
});
