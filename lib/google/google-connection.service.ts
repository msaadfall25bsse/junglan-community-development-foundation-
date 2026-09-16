import { getGoogleAuthConfig, getValidAccessToken, clearTokenCache } from "./google-auth.service";
import { ensureRootFolder } from "./google-drive.service";
import { getSpreadsheetMetadata } from "./google-sheets.service";
import { getGoogleIntegration, updateGoogleIntegration } from "@/lib/services/sync-db.service";

// ==============================================================================
// GOOGLE CONNECTION HEALTH & ADMINISTRATION SERVICE — SERVER-ONLY
// ==============================================================================
// Strictly conforming to Sections 39, 60, 61, 62 of Part 7 specification.
// Validates token health, Drive access, Sheets access, and handles safe disconnect.

export interface ConnectionHealthReport {
  connected: boolean;
  health: "HEALTHY" | "DEGRADED" | "ERROR";
  authMode: "SERVICE_ACCOUNT" | "OAUTH2" | "SIMULATION";
  accountEmail: string | null;
  driveRootFolderId: string | null;
  spreadsheetId: string | null;
  availableTabs: string[];
  checks: {
    tokenValid: boolean;
    driveAccessible: boolean;
    sheetsAccessible: boolean;
    rootFolderVerified: boolean;
  };
  message: string;
  testedAt: string;
}

/**
 * Performs a safe, non-destructive health test of Google Cloud integration
 */
export async function testGoogleConnection(): Promise<ConnectionHealthReport> {
  const integration = await getGoogleIntegration();
  const authConfig = await getGoogleAuthConfig();

  const report: ConnectionHealthReport = {
    connected: false,
    health: "ERROR",
    authMode: "SIMULATION",
    accountEmail: authConfig.serviceAccountEmail || integration.accountEmail || null,
    driveRootFolderId: integration.driveRootFolderId || null,
    spreadsheetId: integration.spreadsheetId || "15uC_XxXwQ9LUgKfHX9r6-p0ZC87ODhn26iX2Yfr2-GU",
    availableTabs: [],
    checks: {
      tokenValid: false,
      driveAccessible: false,
      sheetsAccessible: false,
      rootFolderVerified: false,
    },
    message: "",
    testedAt: new Date().toISOString(),
  };

  try {
    // 1. Check Token Validity
    const tokenResult = await getValidAccessToken();
    report.checks.tokenValid = true;
    report.authMode = tokenResult.authMode;

    // 2. Check Drive Access & Root Folder
    try {
      const rootFolderId = await ensureRootFolder();
      report.checks.driveAccessible = true;
      report.checks.rootFolderVerified = true;
      report.driveRootFolderId = rootFolderId;
    } catch (driveErr: any) {
      console.warn("[GoogleConnectionService] Drive check warning:", driveErr.message);
      report.checks.driveAccessible = false;
    }

    // 3. Check Google Sheets Access & Metadata
    try {
      const tabs = await getSpreadsheetMetadata(report.spreadsheetId!);
      report.checks.sheetsAccessible = true;
      report.availableTabs = tabs.map((t) => t.title);
    } catch (sheetErr: any) {
      console.warn("[GoogleConnectionService] Sheets check warning:", sheetErr.message);
      report.checks.sheetsAccessible = false;
    }

    // Evaluate overall health
    const allPassed =
      report.checks.tokenValid && report.checks.driveAccessible && report.checks.sheetsAccessible;
    const partialPassed = report.checks.tokenValid && (report.checks.driveAccessible || report.checks.sheetsAccessible);

    if (allPassed) {
      report.connected = true;
      report.health = "HEALTHY";
      report.message =
        report.authMode === "SIMULATION"
          ? "Google Services verified in development mode (Simulation active)."
          : "Google Drive and Sheets APIs are connected and operating normally.";
    } else if (partialPassed) {
      report.connected = true;
      report.health = "DEGRADED";
      report.message = "Connected to Google, but some Drive or Sheet resources have limited permissions.";
    } else {
      report.connected = false;
      report.health = "ERROR";
      report.message = "Google connection failed: Unable to verify Drive or Sheets permissions.";
    }

    // Update DB health status
    await updateGoogleIntegration({
      status: report.connected ? "ACTIVE" : "ERROR",
      syncHealth: report.health,
      lastSyncAt: new Date().toISOString(),
    });

    return report;
  } catch (err: any) {
    report.connected = false;
    report.health = "ERROR";
    report.message = `Google authentication failed: ${err.message || "Unknown error"}`;

    await updateGoogleIntegration({
      status: "ERROR",
      syncHealth: "ERROR",
      errorMetadata: err.message,
    });

    return report;
  }
}

/**
 * Safely disconnects the Google integration without deleting database records or Drive files
 */
export async function disconnectGoogleIntegration(): Promise<{ success: boolean; message: string }> {
  try {
    clearTokenCache();

    await updateGoogleIntegration({
      status: "CONFIGURING",
      syncHealth: "HEALTHY",
      encryptedAccessToken: null,
      encryptedRefreshToken: null,
      tokenExpiresAt: null,
      accountEmail: null,
      errorMetadata: null,
    });

    return {
      success: true,
      message: "Google account disconnected successfully. Local database records and synchronization history remain fully preserved.",
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Failed to disconnect Google integration: ${err.message}`,
    };
  }
}
