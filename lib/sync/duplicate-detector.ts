import { normalizeString, normalizeFinancial, normalizeDate } from "./normalizer";

// ==============================================================================
// INTELLIGENT DUPLICATE DETECTION ENGINE — JUNGLAN FOUNDATION
// ==============================================================================
// Strictly conforming to Sections 20, 21, 86 of Part 7 specification.
// Module-specific heuristic detection without destructive assumptions.

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  confidence: "EXACT" | "HIGH" | "MEDIUM" | "NONE";
  matchedRecordId?: string;
  matchedIdentifier?: string;
  reason?: string;
}

/**
 * Checks for duplicate patient records
 */
export function checkPatientDuplicate(
  candidate: {
    patientIdentifier?: string | null;
    fullName: string;
    cnicOrBForm?: string | null;
    contactNumber?: string | null;
    residenceArea?: string | null;
  },
  existingPatients: Array<any>
): DuplicateCheckResult {
  const normName = normalizeString(candidate.fullName).toLowerCase();
  const normCnic = candidate.cnicOrBForm ? normalizeString(candidate.cnicOrBForm).replace(/[^0-9]/g, "") : "";
  const normPhone = candidate.contactNumber ? normalizeString(candidate.contactNumber).replace(/[^0-9]/g, "") : "";
  const normArea = candidate.residenceArea ? normalizeString(candidate.residenceArea).toLowerCase() : "";

  for (const p of existingPatients) {
    // 1. Exact Identifier match
    if (candidate.patientIdentifier && p.patientIdentifier === candidate.patientIdentifier) {
      return {
        isDuplicate: true,
        confidence: "EXACT",
        matchedRecordId: p.id,
        matchedIdentifier: p.patientIdentifier,
        reason: `Exact Patient Identifier match: "${p.patientIdentifier}"`,
      };
    }

    // 2. Exact CNIC / B-Form match
    const existingCnic = p.cnicOrBForm ? normalizeString(p.cnicOrBForm).replace(/[^0-9]/g, "") : "";
    if (normCnic && existingCnic && normCnic === existingCnic) {
      return {
        isDuplicate: true,
        confidence: "EXACT",
        matchedRecordId: p.id,
        matchedIdentifier: p.patientIdentifier,
        reason: `Exact CNIC/B-Form match: "${p.cnicOrBForm}" (Patient: ${p.fullName})`,
      };
    }

    // 3. Exact Phone Number match
    const existingPhone = p.contactNumber ? normalizeString(p.contactNumber).replace(/[^0-9]/g, "") : "";
    if (normPhone && existingPhone && normPhone.length >= 10 && normPhone === existingPhone) {
      return {
        isDuplicate: true,
        confidence: "HIGH",
        matchedRecordId: p.id,
        matchedIdentifier: p.patientIdentifier,
        reason: `Identical phone number "${p.contactNumber}" on existing record "${p.fullName}"`,
      };
    }

    // 4. Name + Area match
    const existingName = normalizeString(p.fullName).toLowerCase();
    const existingArea = p.residenceArea ? normalizeString(p.residenceArea).toLowerCase() : "";
    if (normName && existingName && normName === existingName && normArea && existingArea && normArea === existingArea) {
      return {
        isDuplicate: true,
        confidence: "MEDIUM",
        matchedRecordId: p.id,
        matchedIdentifier: p.patientIdentifier,
        reason: `Matching full name and residential area: "${p.fullName}" in "${p.residenceArea}"`,
      };
    }
  }

  return { isDuplicate: false, confidence: "NONE" };
}

/**
 * Checks for duplicate trip records
 */
export function checkTripDuplicate(
  candidate: {
    tripIdentifier?: string | null;
    date: string | Date;
    patientName: string;
    pickupLocation?: string | null;
    dropoffHospital?: string | null;
    ambulanceId?: string | null;
  },
  existingTrips: Array<any>
): DuplicateCheckResult {
  const normDate = normalizeDate(candidate.date).displayDate;
  const normPatient = normalizeString(candidate.patientName).toLowerCase();
  const normPick = candidate.pickupLocation ? normalizeString(candidate.pickupLocation).toLowerCase() : "";
  const normDrop = candidate.dropoffHospital ? normalizeString(candidate.dropoffHospital).toLowerCase() : "";

  for (const t of existingTrips) {
    // 1. Exact Identifier match
    if (candidate.tripIdentifier && t.tripIdentifier === candidate.tripIdentifier) {
      return {
        isDuplicate: true,
        confidence: "EXACT",
        matchedRecordId: t.id,
        matchedIdentifier: t.tripIdentifier,
        reason: `Exact Trip Identifier match: "${t.tripIdentifier}"`,
      };
    }

    // 2. Same Date + Patient + Pickup + Drop
    const existingDate = normalizeDate(t.date).displayDate;
    const existingPatient = normalizeString(t.patientName).toLowerCase();
    const existingPick = t.pickupLocation ? normalizeString(t.pickupLocation).toLowerCase() : "";
    const existingDrop = t.dropoffHospital ? normalizeString(t.dropoffHospital).toLowerCase() : "";

    if (
      normDate === existingDate &&
      normPatient === existingPatient &&
      normPick === existingPick &&
      normDrop === existingDrop
    ) {
      return {
        isDuplicate: true,
        confidence: "HIGH",
        matchedRecordId: t.id,
        matchedIdentifier: t.tripIdentifier,
        reason: `Identical trip on date ${normDate} for patient "${t.patientName}" from "${t.pickupLocation}" to "${t.dropoffHospital}"`,
      };
    }
  }

  return { isDuplicate: false, confidence: "NONE" };
}

/**
 * Checks for duplicate expense records
 */
export function checkExpenseDuplicate(
  candidate: {
    voucherNumber?: string | null;
    date: string | Date;
    amountPKR: string | number;
    category?: string | null;
    paidTo?: string | null;
    title?: string | null;
  },
  existingExpenses: Array<any>
): DuplicateCheckResult {
  const normDate = normalizeDate(candidate.date).displayDate;
  const normAmount = normalizeFinancial(candidate.amountPKR);
  const normCategory = candidate.category ? normalizeString(candidate.category).toLowerCase() : "";
  const normPaidTo = candidate.paidTo ? normalizeString(candidate.paidTo).toLowerCase() : "";

  for (const exp of existingExpenses) {
    // 1. Exact Voucher Number match
    if (candidate.voucherNumber && exp.voucherNumber === candidate.voucherNumber) {
      return {
        isDuplicate: true,
        confidence: "EXACT",
        matchedRecordId: exp.id,
        matchedIdentifier: exp.voucherNumber,
        reason: `Exact Voucher Number match: "${exp.voucherNumber}"`,
      };
    }

    // 2. Exact Date + Amount + Category + PaidTo
    const existingDate = normalizeDate(exp.date).displayDate;
    const existingAmount = normalizeFinancial(exp.amountPKR);
    const existingCategory = exp.category ? normalizeString(exp.category).toLowerCase() : "";
    const existingPaidTo = exp.paidTo ? normalizeString(exp.paidTo).toLowerCase() : "";

    if (
      normDate === existingDate &&
      normAmount === existingAmount &&
      normCategory === existingCategory &&
      normPaidTo === existingPaidTo &&
      parseFloat(normAmount) > 0
    ) {
      return {
        isDuplicate: true,
        confidence: "HIGH",
        matchedRecordId: exp.id,
        matchedIdentifier: exp.voucherNumber,
        reason: `Duplicate voucher detected on ${normDate} for PKR ${normAmount} (${exp.category} paid to "${exp.paidTo}")`,
      };
    }
  }

  return { isDuplicate: false, confidence: "NONE" };
}
