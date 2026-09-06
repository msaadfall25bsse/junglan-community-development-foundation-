import { prisma } from "@/lib/prisma";
import { NotFoundError, ConflictError } from "@/lib/api/errors";
import { assertYearPeriodActive } from "./year-period.service";
import { createAuditEntry } from "./audit.service";
import type { Prisma } from "@prisma/client";
import type {
  CreatePatientInput,
  UpdatePatientInput,
  PatientQueryInput,
} from "@/lib/validation";

// ==============================================================================
// PATIENT DOMAIN SERVICE
// ==============================================================================
// Section 17 & 18: Privacy preservation, stable identifiers, transaction-safe intake.

/**
 * Generates the next sequential institutional identifier (e.g. JCD-P-2026-0001)
 */
async function generatePatientIdentifier(yearPeriodId: string): Promise<string> {
  const count = await prisma.patient.count({
    where: { yearPeriodId },
  });
  const padded = String(count + 1).padStart(4, "0");
  return `JCD-P-${yearPeriodId}-${padded}`;
}

/**
 * Creates a new patient intake record with stable identifier and audit log in a transaction
 */
export async function createPatient(
  data: CreatePatientInput,
  actorId?: string | null
) {
  // 1. Enforce active fiscal year guard
  await assertYearPeriodActive(data.yearPeriodId);

  // 2. Check for duplicate active patient by CNIC if provided
  if (data.cnicOrBForm && data.cnicOrBForm.trim() !== "") {
    const existing = await prisma.patient.findFirst({
      where: {
        cnicOrBForm: data.cnicOrBForm.trim(),
        deletedAt: null,
      },
    });

    if (existing) {
      throw new ConflictError(
        `A patient record already exists with CNIC '${data.cnicOrBForm}' (ID: ${existing.patientIdentifier}).`,
        { patientIdentifier: existing.patientIdentifier }
      );
    }
  }

  // 3. Generate sequential identifier
  const patientIdentifier = await generatePatientIdentifier(data.yearPeriodId);

  // 4. Atomic transaction: create patient + write immutable audit log
  return prisma.$transaction(async (tx) => {
    const patient = await tx.patient.create({
      data: {
        patientIdentifier,
        fullName: data.fullName,
        cnicOrBForm: data.cnicOrBForm?.trim() || null,
        gender: data.gender,
        age: data.age,
        contactNumber: data.contactNumber,
        emergencyContactName: data.emergencyContactName?.trim() || null,
        emergencyContactPhone: data.emergencyContactPhone?.trim() || null,
        residenceArea: data.residenceArea,
        medicalConditionSummary: data.medicalConditionSummary,
        yearPeriodId: data.yearPeriodId,
        createdById: actorId || null,
      },
    });

    await createAuditEntry(tx, {
      action: "CREATE",
      module: "PATIENTS",
      recordId: patient.id,
      userId: actorId,
      metadata: {
        patientIdentifier: patient.patientIdentifier,
        yearPeriodId: patient.yearPeriodId,
      },
    });

    return patient;
  });
}

/**
 * Paginated list of patients with search and demographic filters
 */
export async function getPatients(query: PatientQueryInput) {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  const where: Prisma.PatientWhereInput = {
    deletedAt: null,
  };

  if (query.yearPeriodId) {
    where.yearPeriodId = query.yearPeriodId;
  }
  if (query.gender) {
    where.gender = query.gender;
  }
  if (query.isUnderReview !== undefined) {
    where.isFlaggedForReview = query.isUnderReview;
  }
  if (query.search) {
    const term = query.search.trim();
    where.OR = [
      { fullName: { contains: term, mode: "insensitive" } },
      { patientIdentifier: { contains: term, mode: "insensitive" } },
      { contactNumber: { contains: term } },
      { residenceArea: { contains: term, mode: "insensitive" } },
    ];
  }

  const [total, patients] = await Promise.all([
    prisma.patient.count({ where }),
    prisma.patient.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        yearPeriod: {
          select: {
            id: true,
            year: true,
            label: true,
          },
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    patients,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

/**
 * Retrieves a single patient by unique CUID or stable identifier
 */
export async function getPatientById(idOrIdentifier: string) {
  const patient = await prisma.patient.findFirst({
    where: {
      OR: [{ id: idOrIdentifier }, { patientIdentifier: idOrIdentifier }],
      deletedAt: null,
    },
    include: {
      yearPeriod: true,
      trips: {
        orderBy: { date: "desc" },
        include: {
          ambulance: {
            select: {
              ambulanceIdentifier: true,
              registrationNumber: true,
              model: true,
            },
          },
        },
      },
    },
  });

  if (!patient) {
    throw new NotFoundError("Patient", idOrIdentifier);
  }

  return patient;
}

/**
 * Updates a patient record and logs audit entry
 */
export async function updatePatient(
  id: string,
  data: UpdatePatientInput,
  actorId?: string | null
) {
  const existing = await prisma.patient.findUnique({
    where: { id },
  });

  if (!existing || existing.deletedAt) {
    throw new NotFoundError("Patient", id);
  }

  return prisma.$transaction(async (tx) => {
    const updated = await tx.patient.update({
      where: { id },
      data: {
        ...(data.fullName ? { fullName: data.fullName } : {}),
        ...(data.cnicOrBForm !== undefined ? { cnicOrBForm: data.cnicOrBForm?.trim() || null } : {}),
        ...(data.gender ? { gender: data.gender } : {}),
        ...(data.age !== undefined ? { age: data.age } : {}),
        ...(data.contactNumber ? { contactNumber: data.contactNumber } : {}),
        ...(data.emergencyContactName !== undefined ? { emergencyContactName: data.emergencyContactName?.trim() || null } : {}),
        ...(data.emergencyContactPhone !== undefined ? { emergencyContactPhone: data.emergencyContactPhone?.trim() || null } : {}),
        ...(data.residenceArea ? { residenceArea: data.residenceArea } : {}),
        ...(data.medicalConditionSummary ? { medicalConditionSummary: data.medicalConditionSummary } : {}),
        ...(data.isUnderReview !== undefined ? { isFlaggedForReview: data.isUnderReview } : {}),
        ...(data.reviewNotes !== undefined ? { flagReason: data.reviewNotes?.trim() || null } : {}),
        ...(data.isArchived !== undefined ? { isArchived: data.isArchived } : {}),
      },
    });

    await createAuditEntry(tx, {
      action: "UPDATE",
      module: "PATIENTS",
      recordId: updated.id,
      userId: actorId,
      metadata: { patientIdentifier: updated.patientIdentifier },
    });

    return updated;
  });
}
