import { readStore, updateStore } from "@/lib/db";
import {
  acquireSyncLock,
  releaseSyncLock,
  createSyncLog,
  recordConflict,
  upsertRecordMapping,
  findMappingByStableId,
  getGoogleIntegration,
} from "@/lib/services/sync-db.service";
import {
  getSpreadsheetMetadata,
  validateTabHeaders,
  readSheetRows,
  appendSheetRows,
  updateSheetRange,
  CANONICAL_PATIENT_HEADERS,
  CANONICAL_EXPENSE_HEADERS,
} from "@/lib/google";
import {
  normalizeString,
  normalizeDate,
  normalizeFinancial,
  computeRecordHash,
} from "./normalizer";
import {
  checkPatientDuplicate,
  checkTripDuplicate,
  checkExpenseDuplicate,
} from "./duplicate-detector";
import { detectConflict } from "./conflict-detector";
import type { SyncDirection, SyncRecordType, SyncStats } from "@/types/sync";

// ==============================================================================
// TWO-WAY SYNCHRONIZATION ENGINE — JUNGLAN FOUNDATION
// ==============================================================================
// Strictly conforming to Sections 3-5, 13-33, 41-44, 46-48, 55-57, 66-68 of Part 7.
// Authoritative Source of Truth: PostgreSQL.

export interface SyncEngineOptions {
  direction?: SyncDirection;
  scope?: string; // "ALL", "PATIENT", "TRIP", "EXPENSE"
  yearPeriodId?: string; // default "2026"
  userId?: string | null;
}

export interface SyncExecutionResult {
  success: boolean;
  jobIdentifier: string;
  direction: SyncDirection;
  stats: SyncStats;
  message: string;
  error?: string;
}

export class SyncEngine {
  /**
   * Primary entry point: executes controlled synchronization with lock & idempotency
   */
  public static async run(options?: SyncEngineOptions): Promise<SyncExecutionResult> {
    const direction = options?.direction || "BIDIRECTIONAL";
    const scope = options?.scope || "ALL";
    const yearPeriodId = options?.yearPeriodId || "2026";
    const userId = options?.userId || null;

    // 1. Acquire concurrency lock (Section 42)
    const lock = await acquireSyncLock({
      direction,
      scope,
      yearPeriodId,
      triggeredByUserId: userId,
    });

    if (!lock.success || !lock.job) {
      return {
        success: false,
        jobIdentifier: "NONE",
        direction,
        stats: {
          recordsProcessed: 0,
          recordsCreated: 0,
          recordsUpdated: 0,
          duplicatesDetected: 0,
          conflictsDetected: 0,
          failuresCount: 0,
          skippedCount: 0,
        },
        message: lock.reason || "Failed to acquire synchronization lock.",
      };
    }

    const jobId = lock.job.id;
    const jobIdentifier = lock.job.jobIdentifier;
    const stats: SyncStats = {
      recordsProcessed: 0,
      recordsCreated: 0,
      recordsUpdated: 0,
      duplicatesDetected: 0,
      conflictsDetected: 0,
      failuresCount: 0,
      skippedCount: 0,
    };

    try {
      const integration = await getGoogleIntegration();
      const spreadsheetId = integration.spreadsheetId || "15uC_XxXwQ9LUgKfHX9r6-p0ZC87ODhn26iX2Yfr2-GU";

      // 2. Execute Direction A: Website -> Google Sheets (Sections 16, 31)
      if (direction === "OUTBOUND" || direction === "BIDIRECTIONAL") {
        await this.syncOutbound({ jobId, spreadsheetId, scope, yearPeriodId, stats });
      }

      // 3. Execute Direction B: Google Sheets -> Website / Database (Sections 17, 32)
      if (direction === "INBOUND" || direction === "BIDIRECTIONAL") {
        await this.syncInbound({ jobId, spreadsheetId, scope, yearPeriodId, stats });
      }

      // 4. Release lock with final success statistics
      await releaseSyncLock(jobId, stats, null);

      return {
        success: true,
        jobIdentifier,
        direction,
        stats,
        message: `Synchronization completed successfully. Processed: ${stats.recordsProcessed}, Created: ${stats.recordsCreated}, Updated: ${stats.recordsUpdated}, Conflicts: ${stats.conflictsDetected}.`,
      };
    } catch (err: any) {
      console.error("[SyncEngine] Sync failed with error:", err.message);
      stats.failuresCount++;
      await releaseSyncLock(jobId, stats, err.message);

      return {
        success: false,
        jobIdentifier,
        direction,
        stats,
        message: `Synchronization failed: ${err.message}`,
        error: err.message,
      };
    }
  }

  /**
   * Direction A: Website / Database -> Google Sheets (Safe Append & Update)
   */
  private static async syncOutbound(params: {
    jobId: string;
    spreadsheetId: string;
    scope: string;
    yearPeriodId: string;
    stats: SyncStats;
  }): Promise<void> {
    const store = readStore();

    // 1. Outbound Trips Sync (Ambulance Service Patient Reco)
    if (params.scope === "ALL" || params.scope === "TRIP") {
      const trips = store.trips || [];

      for (const trip of trips) {
        params.stats.recordsProcessed++;
        const stableId = trip.tripIdentifier || `TRP-${trip.id}`;

        // Map trip fields to the 13 canonical columns
        const rowData = [
          stableId,
          normalizeDate(trip.date).displayDate,
          trip.dispatchTime || "",
          trip.patientName || "",
          trip.pickupLocation || "",
          trip.dropoffHospital || "",
          trip.startOdometerKm ? String(trip.startOdometerKm) : "",
          trip.endOdometerKm ? String(trip.endOdometerKm) : "",
          trip.distanceKm ? String(trip.distanceKm) : "",
          "0", // Petrol
          "0", // Received fare
          trip.notes || "",
          "0", // Other expense
        ];

        const recordHash = computeRecordHash({
          stableId,
          patient: trip.patientName,
          date: trip.date,
          pickup: trip.pickupLocation,
          drop: trip.dropoffHospital,
        });

        // Check if row mapping already exists
        const existingMapping = await findMappingByStableId(
          params.spreadsheetId,
          "Ambulance Service Patient Reco",
          stableId
        );

        if (existingMapping && existingMapping.lastRowIndex) {
          // Idempotency: skip if content has not changed
          if (existingMapping.lastSyncedHash === recordHash) {
            params.stats.skippedCount++;
            continue;
          }

          // Update existing row
          await updateSheetRange(
            params.spreadsheetId,
            `Ambulance Service Patient Reco!A${existingMapping.lastRowIndex}:M${existingMapping.lastRowIndex}`,
            [rowData]
          );
          params.stats.recordsUpdated++;

          await upsertRecordMapping({
            recordType: "TRIP",
            internalRecordId: trip.id,
            stableIdentifier: stableId,
            yearPeriodId: params.yearPeriodId,
            spreadsheetId: params.spreadsheetId,
            sheetTabName: "Ambulance Service Patient Reco",
            sheetTabGid: "0",
            lastRowIndex: existingMapping.lastRowIndex,
            lastSyncedHash: recordHash,
          });
        } else {
          // Append new row
          await appendSheetRows(
            params.spreadsheetId,
            "Ambulance Service Patient Reco!A:M",
            [rowData]
          );
          params.stats.recordsCreated++;

          await upsertRecordMapping({
            recordType: "TRIP",
            internalRecordId: trip.id,
            stableIdentifier: stableId,
            yearPeriodId: params.yearPeriodId,
            spreadsheetId: params.spreadsheetId,
            sheetTabName: "Ambulance Service Patient Reco",
            sheetTabGid: "0",
            lastRowIndex: (store.trips.length || 0) + 1,
            lastSyncedHash: recordHash,
          });
        }

        await createSyncLog({
          syncJobId: params.jobId,
          recordType: "TRIP",
          recordId: trip.id,
          stableIdentifier: stableId,
          direction: "OUTBOUND",
          status: "SYNCED",
        });
      }
    }

    // 2. Outbound Expenses Sync (Expanses)
    if (params.scope === "ALL" || params.scope === "EXPENSE") {
      const expenses = store.expenses || [];

      for (const exp of expenses) {
        params.stats.recordsProcessed++;
        const stableId = exp.voucherNumber || `EXP-${exp.id}`;

        const rowData = [
          normalizeDate(exp.date).displayDate,
          exp.paidTo || exp.title || "",
          "0", // Received
          normalizeFinancial(exp.amountPKR),
          exp.category || "Other",
          stableId,
          exp.description || "",
        ];

        const recordHash = computeRecordHash({
          stableId,
          amount: exp.amountPKR,
          date: exp.date,
          paidTo: exp.paidTo,
          category: exp.category,
        });

        const existingMapping = await findMappingByStableId(
          params.spreadsheetId,
          "Expanses",
          stableId
        );

        if (existingMapping && existingMapping.lastRowIndex) {
          if (existingMapping.lastSyncedHash === recordHash) {
            params.stats.skippedCount++;
            continue;
          }

          await updateSheetRange(
            params.spreadsheetId,
            `Expanses!A${existingMapping.lastRowIndex}:G${existingMapping.lastRowIndex}`,
            [rowData]
          );
          params.stats.recordsUpdated++;

          await upsertRecordMapping({
            recordType: "EXPENSE",
            internalRecordId: exp.id,
            stableIdentifier: stableId,
            yearPeriodId: params.yearPeriodId,
            spreadsheetId: params.spreadsheetId,
            sheetTabName: "Expanses",
            sheetTabGid: "223912461",
            lastRowIndex: existingMapping.lastRowIndex,
            lastSyncedHash: recordHash,
          });
        } else {
          await appendSheetRows(params.spreadsheetId, "Expanses!A:G", [rowData]);
          params.stats.recordsCreated++;

          await upsertRecordMapping({
            recordType: "EXPENSE",
            internalRecordId: exp.id,
            stableIdentifier: stableId,
            yearPeriodId: params.yearPeriodId,
            spreadsheetId: params.spreadsheetId,
            sheetTabName: "Expanses",
            sheetTabGid: "223912461",
            lastRowIndex: (store.expenses.length || 0) + 1,
            lastSyncedHash: recordHash,
          });
        }

        await createSyncLog({
          syncJobId: params.jobId,
          recordType: "EXPENSE",
          recordId: exp.id,
          stableIdentifier: stableId,
          direction: "OUTBOUND",
          status: "SYNCED",
        });
      }
    }
  }

  /**
   * Direction B: Google Sheets -> Website / PostgreSQL (Safe Import & Conflict Detection)
   */
  private static async syncInbound(params: {
    jobId: string;
    spreadsheetId: string;
    scope: string;
    yearPeriodId: string;
    stats: SyncStats;
  }): Promise<void> {
    const store = readStore();

    // 1. Inbound Patient / Trips Sync
    if (params.scope === "ALL" || params.scope === "TRIP" || params.scope === "PATIENT") {
      const headerCheck = await validateTabHeaders(
        params.spreadsheetId,
        "Ambulance Service Patient Reco",
        CANONICAL_PATIENT_HEADERS
      );

      if (!headerCheck.valid) {
        throw new Error(headerCheck.mismatchReason || "Header validation failed for Ambulance Service Patient Reco.");
      }

      const rows = await readSheetRows(params.spreadsheetId, "Ambulance Service Patient Reco!A2:M");

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0 || !row[0]) continue;
        params.stats.recordsProcessed++;

        const stableId = normalizeString(row[0]);
        const dateInfo = normalizeDate(row[1]);
        const patientName = normalizeString(row[3]);

        // Enforce Year Validation (Section 47 & 88): Check that row year matches target yearPeriodId
        const expectedYear = parseInt(params.yearPeriodId, 10);
        if (dateInfo.year !== expectedYear && Math.abs(dateInfo.year - expectedYear) > 0) {
          console.warn(`[SyncEngine] Year mismatch: Row ${i + 2} has year ${dateInfo.year}, expected ${expectedYear}.`);
          params.stats.failuresCount++;
          await createSyncLog({
            syncJobId: params.jobId,
            recordType: "TRIP",
            recordId: `row-${i + 2}`,
            stableIdentifier: stableId,
            direction: "INBOUND",
            status: "FAILED",
            errorCode: "YEAR_MISMATCH",
            errorMessage: `Row year ${dateInfo.year} does not match active year ${expectedYear}.`,
          });
          continue;
        }

        // Check if existing trip matches
        const existingTrip = store.trips?.find((t: any) => t.tripIdentifier === stableId);

        if (existingTrip) {
          // Check for conflicts between DB and Sheet
          const conflictRes = detectConflict({
            databaseRecord: {
              patientName: existingTrip.patientName,
              pickupLocation: existingTrip.pickupLocation,
              dropoffHospital: existingTrip.dropoffHospital,
            },
            sheetRow: {
              patientName,
              pickupLocation: normalizeString(row[4]),
              dropoffHospital: normalizeString(row[5]),
            },
          });

          if (conflictRes.hasConflict) {
            params.stats.conflictsDetected++;
            await recordConflict({
              syncJobId: params.jobId,
              recordType: "TRIP",
              recordId: existingTrip.id,
              stableIdentifier: stableId,
              sheetRowReference: `Ambulance Service Patient Reco!Row${i + 2}`,
              databaseValue: { patientName: existingTrip.patientName },
              sheetValue: { patientName },
              lastDatabaseUpdate: existingTrip.updatedAt || new Date(),
              conflictReason: conflictRes.reason || "Concurrent modifications detected.",
            });
            await createSyncLog({
              syncJobId: params.jobId,
              recordType: "TRIP",
              recordId: existingTrip.id,
              stableIdentifier: stableId,
              direction: "INBOUND",
              status: "CONFLICT",
              errorMessage: conflictRes.reason,
            });
          } else {
            // Idempotent match
            params.stats.skippedCount++;
          }
        } else {
          // New Trip from Sheet (Sections 18 & 19)
          // Run duplicate detection before creation
          const dupCheck = checkTripDuplicate(
            {
              tripIdentifier: stableId,
              date: dateInfo.isoDate,
              patientName,
              pickupLocation: normalizeString(row[4]),
              dropoffHospital: normalizeString(row[5]),
            },
            store.trips || []
          );

          if (dupCheck.isDuplicate) {
            params.stats.duplicatesDetected++;
            await createSyncLog({
              syncJobId: params.jobId,
              recordType: "TRIP",
              recordId: `row-${i + 2}`,
              stableIdentifier: stableId,
              direction: "INBOUND",
              status: "DUPLICATE_DETECTED",
              errorMessage: dupCheck.reason,
            });
          } else {
            // Create in PostgreSQL/Store (Safe Import)
            const newTrip = {
              id: `trp-in-${Date.now()}-${i}`,
              tripIdentifier: stableId,
              date: dateInfo.isoDate,
              ambulanceId: "amb-01",
              patientName,
              pickupLocation: normalizeString(row[4]),
              dropoffHospital: normalizeString(row[5]),
              distanceKm: parseFloat(normalizeFinancial(row[8])) || 0,
              startOdometerKm: parseFloat(normalizeFinancial(row[6])) || 0,
              endOdometerKm: parseFloat(normalizeFinancial(row[7])) || 0,
              dispatchTime: normalizeString(row[2]) || dateInfo.isoDate,
              status: "COMPLETED",
              driverName: "Assigned Driver",
              yearPeriodId: params.yearPeriodId,
              syncStatus: "SYNCED",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            updateStore((s) => {
              if (!s.trips) s.trips = [];
              s.trips.push(newTrip as any);
            });
            params.stats.recordsCreated++;

            await upsertRecordMapping({
              recordType: "TRIP",
              internalRecordId: newTrip.id,
              stableIdentifier: stableId,
              yearPeriodId: params.yearPeriodId,
              spreadsheetId: params.spreadsheetId,
              sheetTabName: "Ambulance Service Patient Reco",
              sheetTabGid: "0",
              lastRowIndex: i + 2,
              lastSyncedHash: computeRecordHash(newTrip),
            });

            await createSyncLog({
              syncJobId: params.jobId,
              recordType: "TRIP",
              recordId: newTrip.id,
              stableIdentifier: stableId,
              direction: "INBOUND",
              status: "SYNCED",
            });
          }
        }
      }
    }

    // 2. Inbound Expenses Sync (Expanses)
    if (params.scope === "ALL" || params.scope === "EXPENSE") {
      const headerCheck = await validateTabHeaders(
        params.spreadsheetId,
        "Expanses",
        CANONICAL_EXPENSE_HEADERS
      );

      if (!headerCheck.valid) {
        throw new Error(headerCheck.mismatchReason || "Header validation failed for Expanses.");
      }

      const rows = await readSheetRows(params.spreadsheetId, "Expanses!A2:G");

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0) continue;
        params.stats.recordsProcessed++;

        const dateInfo = normalizeDate(row[0]);
        const paidTo = normalizeString(row[1]);
        const amount = normalizeFinancial(row[3]);
        const category = normalizeString(row[4]) || "Other";
        const stableId = normalizeString(row[5]) || `EXP-ROW-${i + 2}`;

        // Year check
        const expectedYear = parseInt(params.yearPeriodId, 10);
        if (dateInfo.year !== expectedYear && Math.abs(dateInfo.year - expectedYear) > 0) {
          params.stats.failuresCount++;
          await createSyncLog({
            syncJobId: params.jobId,
            recordType: "EXPENSE",
            recordId: `exp-row-${i + 2}`,
            stableIdentifier: stableId,
            direction: "INBOUND",
            status: "FAILED",
            errorCode: "YEAR_MISMATCH",
            errorMessage: `Row year ${dateInfo.year} does not match active year ${expectedYear}.`,
          });
          continue;
        }

        const existingExp = store.expenses?.find((e: any) => e.voucherNumber === stableId);

        if (existingExp) {
          const conflictRes = detectConflict({
            databaseRecord: { amountPKR: existingExp.amountPKR },
            sheetRow: { amountPKR: amount },
          });

          if (conflictRes.hasConflict) {
            params.stats.conflictsDetected++;
            await recordConflict({
              syncJobId: params.jobId,
              recordType: "EXPENSE",
              recordId: existingExp.id,
              stableIdentifier: stableId,
              sheetRowReference: `Expanses!Row${i + 2}`,
              databaseValue: { amountPKR: existingExp.amountPKR },
              sheetValue: { amountPKR: amount },
              lastDatabaseUpdate: existingExp.updatedAt || new Date(),
              conflictReason: conflictRes.reason || "Amount differs between Database and Sheet.",
            });
          } else {
            params.stats.skippedCount++;
          }
        } else {
          // Duplicate check
          const dupCheck = checkExpenseDuplicate(
            {
              voucherNumber: stableId,
              date: dateInfo.isoDate,
              amountPKR: amount,
              category,
              paidTo,
            },
            store.expenses || []
          );

          if (dupCheck.isDuplicate) {
            params.stats.duplicatesDetected++;
            await createSyncLog({
              syncJobId: params.jobId,
              recordType: "EXPENSE",
              recordId: `exp-row-${i + 2}`,
              stableIdentifier: stableId,
              direction: "INBOUND",
              status: "DUPLICATE_DETECTED",
              errorMessage: dupCheck.reason,
            });
          } else {
            const newExp = {
              id: `exp-in-${Date.now()}-${i}`,
              voucherNumber: stableId,
              date: dateInfo.isoDate,
              amountPKR: parseFloat(amount) || 0,
              category: "OPERATIONS",
              title: category,
              description: normalizeString(row[6]) || `Imported from Google Sheet row ${i + 2}`,
              paidTo: paidTo || "Payee",
              status: "APPROVED",
              yearPeriodId: params.yearPeriodId,
              syncStatus: "SYNCED",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            updateStore((s) => {
              if (!s.expenses) s.expenses = [];
              s.expenses.push(newExp as any);
            });
            params.stats.recordsCreated++;

            await upsertRecordMapping({
              recordType: "EXPENSE",
              internalRecordId: newExp.id,
              stableIdentifier: stableId,
              yearPeriodId: params.yearPeriodId,
              spreadsheetId: params.spreadsheetId,
              sheetTabName: "Expanses",
              sheetTabGid: "223912461",
              lastRowIndex: i + 2,
              lastSyncedHash: computeRecordHash(newExp),
            });
          }
        }
      }
    }
  }
}
