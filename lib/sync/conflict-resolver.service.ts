import {
  getSyncConflicts,
  resolveConflict,
  getRecordMapping,
  upsertRecordMapping,
  createSyncLog,
  getGoogleIntegration,
} from "@/lib/services/sync-db.service";
import { updateSheetRange, appendSheetRows } from "@/lib/google/google-sheets.service";
import { computeRecordHash, normalizeDate, normalizeFinancial } from "./normalizer";
import { tryPrismaOrFallback } from "@/lib/services/db-helper";
import prisma from "@/lib/prisma";
import { updateStore } from "@/lib/db/persistent-store";
import type { SyncConflictRecord } from "@/types/sync";

// ==============================================================================
// CONFLICT RESOLUTION APPLICATION SERVICE — STRICT AUDIT TRAIL
// ==============================================================================
// Strictly conforming to Sections 22, 23, 67, 68, 87, 88 of Part 7 specification.
// Provides deterministic human-in-the-loop resolution of DB vs Google Sheet conflicts.

export interface ApplyConflictResolutionParams {
  conflictId: string;
  resolution: "KEEP_DB" | "KEEP_SHEET" | "MERGE" | "DISMISS";
  mergedValues?: Record<string, any>;
  resolutionNotes?: string;
  userId?: string;
}

export interface ConflictResolutionResult {
  success: boolean;
  message: string;
  conflictId: string;
  resolution: string;
  appliedValues?: Record<string, any>;
  updatedSheetRange?: string | null;
  resolvedAt: string;
}

/**
 * Resolves a sync conflict and applies the changes to PostgreSQL and/or Google Sheets.
 */
export async function applyConflictResolution(
  params: ApplyConflictResolutionParams
): Promise<ConflictResolutionResult> {
  // 1. Fetch Conflict Record
  const conflicts: SyncConflictRecord[] = await getSyncConflicts({ status: "OPEN" });
  const conflict = conflicts.find(
    (c: SyncConflictRecord) => c.id === params.conflictId || c.conflictIdentifier === params.conflictId
  );

  if (!conflict) {
    // Check if it's already resolved
    const allConflicts: SyncConflictRecord[] = await getSyncConflicts();
    const existing = allConflicts.find(
      (c: SyncConflictRecord) => c.id === params.conflictId || c.conflictIdentifier === params.conflictId
    );
    if (existing) {
      throw new Error(`Conflict ${existing.conflictIdentifier} has already been resolved (${existing.status}).`);
    }
    throw new Error(`Conflict with ID or identifier "${params.conflictId}" not found.`);
  }

  const integration = await getGoogleIntegration();
  const spreadsheetId = integration.spreadsheetId || "15uC_XxXwQ9LUgKfHX9r6-p0ZC87ODhn26iX2Yfr2-GU";

  const dbValue = typeof conflict.databaseValueJson === "string"
    ? JSON.parse(conflict.databaseValueJson)
    : conflict.databaseValueJson || {};

  const sheetValue = typeof conflict.sheetValueJson === "string"
    ? JSON.parse(conflict.sheetValueJson)
    : conflict.sheetValueJson || {};

  let appliedValues: Record<string, any> = {};
  let updatedSheetRange: string | null = null;

  // ----------------------------------------------------------------------------
  // STRATEGY 1: DISMISS (No data changes, mark resolved)
  // ----------------------------------------------------------------------------
  if (params.resolution === "DISMISS") {
    const resolvedConflict = await resolveConflict({
      conflictId: conflict.id,
      resolution: "DISMISS",
      resolutionNotes: params.resolutionNotes || "Dismissed by administrator without changes",
      resolvedByUserId: params.userId || "admin-system",
    });

    await createSyncLog({
      syncJobId: conflict.syncJobId,
      recordType: conflict.recordType,
      recordId: conflict.recordId,
      stableIdentifier: conflict.stableIdentifier,
      direction: "BIDIRECTIONAL",
      status: "SKIPPED",
      errorMessage: `Conflict dismissed: ${params.resolutionNotes || "No changes applied"}`,
    });

    return {
      success: true,
      message: `Conflict ${conflict.conflictIdentifier} dismissed successfully.`,
      conflictId: conflict.id,
      resolution: "DISMISS",
      resolvedAt: resolvedConflict.resolvedAt || new Date().toISOString(),
    };
  }

  // ----------------------------------------------------------------------------
  // STRATEGY 2: KEEP_DB (PostgreSQL is authoritative, overwrite Google Sheet)
  // ----------------------------------------------------------------------------
  if (params.resolution === "KEEP_DB") {
    appliedValues = { ...dbValue };

    // Format row for Google Sheets
    if (conflict.recordType === "TRIP") {
      const rowData = [
        conflict.stableIdentifier || dbValue.tripIdentifier || dbValue.id,
        normalizeDate(dbValue.date).displayDate,
        dbValue.dispatchTime ? String(dbValue.dispatchTime) : "10:00",
        dbValue.patientName || "",
        dbValue.pickupLocation || "",
        dbValue.dropoffHospital || "",
        String(dbValue.startOdometerKm || 0),
        String(dbValue.endOdometerKm || 0),
        String(dbValue.distanceKm || 0),
        String(dbValue.fuelExpensePKR || 0),
        String(dbValue.amountReceivedPKR || 0),
        dbValue.notes || "",
        String(dbValue.otherExpensePKR || 0),
      ];

      const mapping = await getRecordMapping("TRIP", conflict.recordId);

      if (mapping?.lastRowIndex) {
        updatedSheetRange = `Ambulance Service Patient Reco!A${mapping.lastRowIndex}:M${mapping.lastRowIndex}`;
        await updateSheetRange(spreadsheetId, updatedSheetRange, [rowData]);
      } else {
        await appendSheetRows(spreadsheetId, "Ambulance Service Patient Reco!A:M", [rowData]);
        updatedSheetRange = "Ambulance Service Patient Reco!A:M (Appended)";
      }

      const hash = computeRecordHash({
        stableId: conflict.stableIdentifier,
        date: dbValue.date,
        patientName: dbValue.patientName,
        pickup: dbValue.pickupLocation,
        drop: dbValue.dropoffHospital,
      });

      await upsertRecordMapping({
        recordType: "TRIP",
        internalRecordId: conflict.recordId,
        stableIdentifier: conflict.stableIdentifier,
        yearPeriodId: "2026",
        spreadsheetId,
        sheetTabName: "Ambulance Service Patient Reco",
        sheetTabGid: "0",
        lastRowIndex: mapping?.lastRowIndex || 10,
        lastSyncedHash: hash,
      });
    } else if (conflict.recordType === "EXPENSE") {
      const rowData = [
        normalizeDate(dbValue.date).displayDate,
        dbValue.paidTo || dbValue.title || "",
        "0",
        normalizeFinancial(dbValue.amountPKR),
        dbValue.category || "Other",
        conflict.stableIdentifier || dbValue.voucherNumber || `EXP-${dbValue.id}`,
        dbValue.description || "",
      ];

      const mapping = await getRecordMapping("EXPENSE", conflict.recordId);

      if (mapping?.lastRowIndex) {
        updatedSheetRange = `Expanses!A${mapping.lastRowIndex}:G${mapping.lastRowIndex}`;
        await updateSheetRange(spreadsheetId, updatedSheetRange, [rowData]);
      } else {
        await appendSheetRows(spreadsheetId, "Expanses!A:G", [rowData]);
        updatedSheetRange = "Expanses!A:G (Appended)";
      }

      const hash = computeRecordHash({
        stableId: conflict.stableIdentifier,
        amount: dbValue.amountPKR,
        date: dbValue.date,
        paidTo: dbValue.paidTo,
        category: dbValue.category,
      });

      await upsertRecordMapping({
        recordType: "EXPENSE",
        internalRecordId: conflict.recordId,
        stableIdentifier: conflict.stableIdentifier,
        yearPeriodId: "2026",
        spreadsheetId,
        sheetTabName: "Expanses",
        sheetTabGid: "223912461",
        lastRowIndex: mapping?.lastRowIndex || 10,
        lastSyncedHash: hash,
      });
    }

    const resolved = await resolveConflict({
      conflictId: conflict.id,
      resolution: "KEEP_DB",
      resolutionNotes: params.resolutionNotes || "Admin kept PostgreSQL database value and updated Google Sheet",
      resolvedByUserId: params.userId || "admin-system",
    });

    await createSyncLog({
      syncJobId: conflict.syncJobId,
      recordType: conflict.recordType,
      recordId: conflict.recordId,
      stableIdentifier: conflict.stableIdentifier,
      direction: "OUTBOUND",
      status: "SYNCED",
    });

    return {
      success: true,
      message: `Conflict resolved: Kept PostgreSQL database value and updated Google Sheet.`,
      conflictId: conflict.id,
      resolution: "KEEP_DB",
      appliedValues,
      updatedSheetRange,
      resolvedAt: resolved.resolvedAt || new Date().toISOString(),
    };
  }

  // ----------------------------------------------------------------------------
  // STRATEGY 3: KEEP_SHEET (Google Sheet is authoritative, update PostgreSQL)
  // ----------------------------------------------------------------------------
  if (params.resolution === "KEEP_SHEET") {
    appliedValues = { ...sheetValue };

    await tryPrismaOrFallback(
      async () => {
        if (conflict.recordType === "TRIP") {
          await prisma.trip.update({
            where: { id: conflict.recordId },
            data: {
              date: sheetValue.date ? new Date(sheetValue.date) : undefined,
              patientName: sheetValue.patientName || undefined,
              pickupLocation: sheetValue.pickup || sheetValue.pickupLocation || undefined,
              dropoffHospital: sheetValue.drop || sheetValue.dropoffHospital || undefined,
              distanceKm: sheetValue.distanceKm ? Number(sheetValue.distanceKm) : undefined,
              notes: sheetValue.notes || sheetValue.remark || undefined,
              syncStatus: "SYNCED",
              lastSyncedAt: new Date(),
              syncVersion: { increment: 1 },
            },
          });
        } else if (conflict.recordType === "EXPENSE") {
          await prisma.expense.update({
            where: { id: conflict.recordId },
            data: {
              date: sheetValue.date ? new Date(sheetValue.date) : undefined,
              amountPKR: sheetValue.amountPKR ? Number(sheetValue.amountPKR) : undefined,
              category: sheetValue.category || undefined,
              description: sheetValue.description || undefined,
              paidTo: sheetValue.paidTo || sheetValue.name || undefined,
              syncStatus: "SYNCED",
              lastSyncedAt: new Date(),
              syncVersion: { increment: 1 },
            },
          });
        }
      },
      async () => {
        updateStore((s) => {
          if (conflict.recordType === "TRIP" && s.trips) {
            const trip = s.trips.find((t: any) => t.id === conflict.recordId);
            if (trip) {
              if (sheetValue.date) trip.date = sheetValue.date;
              if (sheetValue.patientName) trip.patientName = sheetValue.patientName;
              if (sheetValue.pickup || sheetValue.pickupLocation) trip.pickupLocation = sheetValue.pickup || sheetValue.pickupLocation;
              if (sheetValue.drop || sheetValue.dropoffHospital) trip.dropoffHospital = sheetValue.drop || sheetValue.dropoffHospital;
              if (sheetValue.distanceKm) trip.distanceKm = Number(sheetValue.distanceKm);
              if (sheetValue.notes || sheetValue.remark) trip.notes = sheetValue.notes || sheetValue.remark;
              (trip as any).syncStatus = "SYNCED";
              (trip as any).lastSyncedAt = new Date().toISOString();
              trip.updatedAt = new Date().toISOString();
            }
          } else if (conflict.recordType === "EXPENSE" && s.expenses) {
            const exp = s.expenses.find((e: any) => e.id === conflict.recordId);
            if (exp) {
              if (sheetValue.date) exp.date = sheetValue.date;
              if (sheetValue.amountPKR) exp.amountPKR = Number(sheetValue.amountPKR);
              if (sheetValue.category) exp.category = sheetValue.category;
              if (sheetValue.description) exp.description = sheetValue.description;
              if (sheetValue.paidTo || sheetValue.name) exp.paidTo = sheetValue.paidTo || sheetValue.name;
              (exp as any).syncStatus = "SYNCED";
              (exp as any).lastSyncedAt = new Date().toISOString();
              exp.updatedAt = new Date().toISOString();
            }
          }
        });
      }
    );

    const mapping = await getRecordMapping(conflict.recordType, conflict.recordId);

    const newHash = computeRecordHash(sheetValue);
    if (mapping) {
      await upsertRecordMapping({
        ...mapping,
        lastSyncedHash: newHash,
      });
    }

    const resolved = await resolveConflict({
      conflictId: conflict.id,
      resolution: "KEEP_SHEET",
      resolutionNotes: params.resolutionNotes || "Admin kept Google Sheet value and updated PostgreSQL database",
      resolvedByUserId: params.userId || "admin-system",
    });

    await createSyncLog({
      syncJobId: conflict.syncJobId,
      recordType: conflict.recordType,
      recordId: conflict.recordId,
      stableIdentifier: conflict.stableIdentifier,
      direction: "INBOUND",
      status: "SYNCED",
    });

    return {
      success: true,
      message: `Conflict resolved: Kept Google Sheet value and updated PostgreSQL database.`,
      conflictId: conflict.id,
      resolution: "KEEP_SHEET",
      appliedValues,
      resolvedAt: resolved.resolvedAt || new Date().toISOString(),
    };
  }

  // ----------------------------------------------------------------------------
  // STRATEGY 4: MERGE (Admin-provided custom merged fields applied to both sides)
  // ----------------------------------------------------------------------------
  if (params.resolution === "MERGE") {
    appliedValues = {
      ...dbValue,
      ...(params.mergedValues || {}),
    };

    // 1. Update Database
    await tryPrismaOrFallback(
      async () => {
        if (conflict.recordType === "TRIP") {
          await prisma.trip.update({
            where: { id: conflict.recordId },
            data: {
              date: appliedValues.date ? new Date(appliedValues.date) : undefined,
              patientName: appliedValues.patientName || undefined,
              pickupLocation: appliedValues.pickupLocation || appliedValues.pickup || undefined,
              dropoffHospital: appliedValues.dropoffHospital || appliedValues.drop || undefined,
              distanceKm: appliedValues.distanceKm ? Number(appliedValues.distanceKm) : undefined,
              notes: appliedValues.notes || undefined,
              syncStatus: "SYNCED",
              lastSyncedAt: new Date(),
              syncVersion: { increment: 1 },
            },
          });
        } else if (conflict.recordType === "EXPENSE") {
          await prisma.expense.update({
            where: { id: conflict.recordId },
            data: {
              date: appliedValues.date ? new Date(appliedValues.date) : undefined,
              amountPKR: appliedValues.amountPKR ? Number(appliedValues.amountPKR) : undefined,
              category: appliedValues.category || undefined,
              description: appliedValues.description || undefined,
              paidTo: appliedValues.paidTo || undefined,
              syncStatus: "SYNCED",
              lastSyncedAt: new Date(),
              syncVersion: { increment: 1 },
            },
          });
        }
      },
      async () => {
        updateStore((s) => {
          if (conflict.recordType === "TRIP" && s.trips) {
            const trip = s.trips.find((t: any) => t.id === conflict.recordId);
            if (trip) {
              Object.assign(trip, appliedValues);
              (trip as any).syncStatus = "SYNCED";
              (trip as any).lastSyncedAt = new Date().toISOString();
              trip.updatedAt = new Date().toISOString();
            }
          } else if (conflict.recordType === "EXPENSE" && s.expenses) {
            const exp = s.expenses.find((e: any) => e.id === conflict.recordId);
            if (exp) {
              Object.assign(exp, appliedValues);
              (exp as any).syncStatus = "SYNCED";
              (exp as any).lastSyncedAt = new Date().toISOString();
              exp.updatedAt = new Date().toISOString();
            }
          }
        });
      }
    );

    // 2. Update Google Sheet
    const mapping = await getRecordMapping(conflict.recordType, conflict.recordId);

    if (conflict.recordType === "TRIP") {
      const rowData = [
        conflict.stableIdentifier,
        normalizeDate(appliedValues.date).displayDate,
        appliedValues.dispatchTime || "10:00",
        appliedValues.patientName || "",
        appliedValues.pickupLocation || appliedValues.pickup || "",
        appliedValues.dropoffHospital || appliedValues.drop || "",
        String(appliedValues.startOdometerKm || 0),
        String(appliedValues.endOdometerKm || 0),
        String(appliedValues.distanceKm || 0),
        String(appliedValues.fuelExpensePKR || 0),
        String(appliedValues.amountReceivedPKR || 0),
        appliedValues.notes || "",
        String(appliedValues.otherExpensePKR || 0),
      ];

      if (mapping?.lastRowIndex) {
        updatedSheetRange = `Ambulance Service Patient Reco!A${mapping.lastRowIndex}:M${mapping.lastRowIndex}`;
        await updateSheetRange(spreadsheetId, updatedSheetRange, [rowData]);
      }
    } else if (conflict.recordType === "EXPENSE") {
      const rowData = [
        normalizeDate(appliedValues.date).displayDate,
        appliedValues.paidTo || appliedValues.title || "",
        "0",
        normalizeFinancial(appliedValues.amountPKR),
        appliedValues.category || "Other",
        conflict.stableIdentifier,
        appliedValues.description || "",
      ];

      if (mapping?.lastRowIndex) {
        updatedSheetRange = `Expanses!A${mapping.lastRowIndex}:G${mapping.lastRowIndex}`;
        await updateSheetRange(spreadsheetId, updatedSheetRange, [rowData]);
      }
    }

    const mergedHash = computeRecordHash(appliedValues);
    if (mapping) {
      await upsertRecordMapping({
        ...mapping,
        lastSyncedHash: mergedHash,
      });
    }

    const resolved = await resolveConflict({
      conflictId: conflict.id,
      resolution: "MERGE",
      resolutionNotes: params.resolutionNotes || "Admin applied custom merged fields to both database and sheet",
      resolvedByUserId: params.userId || "admin-system",
    });

    await createSyncLog({
      syncJobId: conflict.syncJobId,
      recordType: conflict.recordType,
      recordId: conflict.recordId,
      stableIdentifier: conflict.stableIdentifier,
      direction: "BIDIRECTIONAL",
      status: "SYNCED",
    });

    return {
      success: true,
      message: `Conflict resolved: Merged values applied to both PostgreSQL and Google Sheet.`,
      conflictId: conflict.id,
      resolution: "MERGE",
      appliedValues,
      updatedSheetRange,
      resolvedAt: resolved.resolvedAt || new Date().toISOString(),
    };
  }

  throw new Error(`Unsupported resolution strategy: ${params.resolution}`);
}
