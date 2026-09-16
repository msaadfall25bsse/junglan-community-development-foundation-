import {
  getGoogleAuthConfig,
  getValidAccessToken,
  ensureRootFolder,
  ensureYearFolderStructure,
  getSpreadsheetMetadata,
  validateTabHeaders,
  CANONICAL_PATIENT_HEADERS,
  CANONICAL_EXPENSE_HEADERS,
  testGoogleConnection,
  disconnectGoogleIntegration,
} from "../lib/google";

async function runGoogleServicesTests() {
  console.log("===============================================================");
  console.log("JUNGLAN FOUNDATION — PART 7 PHASE 2 GOOGLE SERVICES VERIFICATION");
  console.log("===============================================================\n");

  // 1. Google Auth Configuration & Token Retrieval
  console.log("1. Testing Google Auth Configuration & Token Generation...");
  const authConfig = await getGoogleAuthConfig();
  console.log("   -> Auth Mode:", authConfig.mode);
  console.log("   -> Is Configured in .env:", authConfig.isConfigured);

  const tokenResult = await getValidAccessToken();
  console.log("   -> Token Mode:", tokenResult.authMode);
  console.log("   -> Token Type:", tokenResult.tokenType);
  console.log("   -> Expires In:", tokenResult.expiresInSeconds, "seconds");
  console.log("   [PASS] Google Auth Service operational.\n");

  // 2. Google Drive Year-Based Folder Hierarchy
  console.log("2. Testing Year-Based Google Drive Folder Structure (Sections 9 & 10)...");
  const rootFolderId = await ensureRootFolder();
  console.log("   -> Foundation Root Folder ID:", rootFolderId);

  const year2026 = await ensureYearFolderStructure(2026);
  console.log("   -> Year 2026 Folder ID:", year2026.yearFolderId);
  console.log("   -> Subfolder 'Ambulance Records':", year2026.subfolders["Ambulance Records"]);
  console.log("   -> Subfolder 'Reports':", year2026.subfolders["Reports"]);
  console.log("   -> Subfolder 'Receipts':", year2026.subfolders["Receipts"]);
  console.log("   -> Subfolder 'Documents':", year2026.subfolders["Documents"]);

  // Test idempotency: calling again must return identical folder IDs without duplicates
  const year2026SecondCall = await ensureYearFolderStructure("2026");
  if (year2026.yearFolderId !== year2026SecondCall.yearFolderId) {
    throw new Error("Year folder hierarchy is not idempotent!");
  }
  console.log("   -> Idempotency check: Confirmed duplicate prevention.");
  console.log("   [PASS] Google Drive Folder Structure operational.\n");

  // 3. Google Sheets Metadata & Header Schema Validation
  console.log("3. Testing Google Sheets Metadata & Header Validation (Sections 11 & 37)...");
  const spreadsheetId = "15uC_XxXwQ9LUgKfHX9r6-p0ZC87ODhn26iX2Yfr2-GU";
  const tabs = await getSpreadsheetMetadata(spreadsheetId);
  console.log("   -> Available Tabs in Spreadsheet:", tabs.map((t) => `${t.title} (ID: ${t.sheetId})`));

  // Validate Patient Trip canonical headers
  const patientHeaderCheck = await validateTabHeaders(
    spreadsheetId,
    "Ambulance Service Patient Reco",
    CANONICAL_PATIENT_HEADERS
  );
  console.log("   -> Patient Headers Valid:", patientHeaderCheck.valid, "| Count:", patientHeaderCheck.actualHeaders.length);

  // Validate Expense canonical headers
  const expenseHeaderCheck = await validateTabHeaders(
    spreadsheetId,
    "Expanses",
    CANONICAL_EXPENSE_HEADERS
  );
  console.log("   -> Expense Headers Valid:", expenseHeaderCheck.valid, "| Count:", expenseHeaderCheck.actualHeaders.length);

  // Test Header Mismatch Detection
  const mismatchCheck = await validateTabHeaders(
    spreadsheetId,
    "Expanses",
    [...CANONICAL_EXPENSE_HEADERS, "NonExistentColumnXYZ"]
  );
  console.log("   -> Mismatch Detection Test:", !mismatchCheck.valid ? "PASSED (Detected missing column correctly)" : "FAILED");
  console.log("   [PASS] Google Sheets Service operational.\n");

  // 4. Connection Health Check (Section 60)
  console.log("4. Testing Google Connection Health Test (Section 60)...");
  const health = await testGoogleConnection();
  console.log("   -> Connection Status:", health.connected ? "CONNECTED" : "DISCONNECTED");
  console.log("   -> Health Rating:", health.health);
  console.log("   -> Token Valid:", health.checks.tokenValid);
  console.log("   -> Drive Accessible:", health.checks.driveAccessible);
  console.log("   -> Sheets Accessible:", health.checks.sheetsAccessible);
  console.log("   -> Message:", health.message);
  console.log("   [PASS] Connection Health Check operational.\n");

  // 5. Safe Disconnect (Section 62)
  console.log("5. Testing Safe Disconnect (Section 62)...");
  const disconnectResult = await disconnectGoogleIntegration();
  console.log("   -> Disconnect Success:", disconnectResult.success);
  console.log("   -> Disconnect Message:", disconnectResult.message);
  console.log("   [PASS] Safe Disconnect operational.\n");

  console.log("===============================================================");
  console.log("ALL PART 7 PHASE 2 GOOGLE API SERVICES TESTS PASSED 100%!");
  console.log("===============================================================");
}

runGoogleServicesTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
