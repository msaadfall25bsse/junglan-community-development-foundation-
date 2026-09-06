import { prisma } from "@/lib/prisma";
import { readStore, updateStore } from "@/lib/db";
import { NotFoundError, ConflictError } from "@/lib/api/errors";
import { assertYearPeriodActive } from "./year-period.service";
import { createAuditEntry } from "./audit.service";
import { tryPrismaOrFallback } from "./db-helper";
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

async function generatePatientIdentifier(yearPeriodId: string): Promise<string> {
  const count = await prisma.patient.count({
    where: { yearPeriodId },
  });
  const padded = String(count + 1).padStart(4, "0");
  return `JCD-P-${yearPeriodId}-${padded}`;
}

export async function createPatient(
  data: CreatePatientInput,
  actorId?: string | null
) {
  return tryPrismaOrFallback(
    async () => {
      await assertYearPeriodActive(data.yearPeriodId);

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

      const patientIdentifier = await generatePatientIdentifier(data.yearPeriodId);

      return prisma.$transaction(async (tx) => {
        const patient = await (tx as any).patient.create({
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
    },
    async () => {
      const store = readStore();
      if (data.cnicOrBForm && data.cnicOrBForm.trim() !== "") {
        const existing = store.patients.find((p) => p.cnicOrBForm === data.cnicOrBForm?.trim());
        if (existing) {
          throw new ConflictError(
            `A patient record already exists with CNIC '${data.cnicOrBForm}' (ID: ${existing.patientIdentifier}).`,
            { patientIdentifier: existing.patientIdentifier }
          );
        }
      }

      const count = store.patients.length;
      const patientIdentifier = `JCD-P-${data.yearPeriodId}-${String(count + 1).padStart(4, "0")}`;

      const newPatient = {
        id: `pat-${Date.now()}`,
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
        isFlaggedForReview: false,
        flagReason: null,
        isArchived: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        s.patients.unshift(newPatient);
        s.settings.patientsServed += 1;
        s.auditLogs.push({
          id: `aud-${Date.now()}`,
          action: "CREATE",
          module: "PATIENTS",
          recordId: newPatient.id,
          userId: actorId,
          timestamp: new Date().toISOString(),
          metadataJson: JSON.stringify({ patientIdentifier }),
        });
      });

      return newPatient;
    }
  );
}

export async function getPatients(query: PatientQueryInput) {
  return tryPrismaOrFallback(
    async () => {
      const page = query.page || 1;
      const limit = query.limit || 20;
      const skip = (page - 1) * limit;

      const where: Prisma.PatientWhereInput = {
        deletedAt: null,
      };

      if (query.yearPeriodId) where.yearPeriodId = query.yearPeriodId;
      if (query.gender) where.gender = query.gender;
      if (query.isUnderReview !== undefined) where.isFlaggedForReview = query.isUnderReview;
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
              select: { id: true, year: true, label: true },
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
    },
    async () => {
      const store = readStore();
      let items = [...store.patients];

      if (query.yearPeriodId) items = items.filter((p) => p.yearPeriodId === query.yearPeriodId);
      if (query.gender) items = items.filter((p) => p.gender === query.gender);
      if (query.isUnderReview !== undefined) items = items.filter((p) => p.isFlaggedForReview === query.isUnderReview);
      if (query.search) {
        const term = query.search.toLowerCase().trim();
        items = items.filter(
          (p) =>
            p.fullName.toLowerCase().includes(term) ||
            p.patientIdentifier.toLowerCase().includes(term) ||
            p.contactNumber.includes(term) ||
            p.residenceArea.toLowerCase().includes(term)
        );
      }

      const page = query.page || 1;
      const limit = query.limit || 20;
      const total = items.length;
      const totalPages = Math.ceil(total / limit);
      const paginated = items.slice((page - 1) * limit, page * limit);

      return {
        patients: paginated,
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
  );
}

export async function getPatientById(idOrIdentifier: string) {
  return tryPrismaOrFallback(
    async () => {
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
    },
    async () => {
      const store = readStore();
      const patient = store.patients.find(
        (p) => p.id === idOrIdentifier || p.patientIdentifier === idOrIdentifier
      );
      if (!patient) {
        throw new NotFoundError("Patient", idOrIdentifier);
      }
      const trips = store.trips.filter((t) => t.patientName === patient.fullName);
      return { ...patient, trips };
    }
  );
}

export async function updatePatient(
  id: string,
  data: UpdatePatientInput,
  actorId?: string | null
) {
  return tryPrismaOrFallback(
    async () => {
      const existing = await prisma.patient.findUnique({
        where: { id },
      });

      if (!existing || existing.deletedAt) {
        throw new NotFoundError("Patient", id);
      }

      return prisma.$transaction(async (tx) => {
        const updated = await (tx as any).patient.update({
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
    },
    async () => {
      const store = readStore();
      const index = store.patients.findIndex((p) => p.id === id || p.patientIdentifier === id);
      if (index === -1) {
        throw new NotFoundError("Patient", id);
      }

      let updated: (typeof store.patients)[0];

      updateStore((s) => {
        const existing = s.patients[index];
        updated = {
          ...existing,
          ...(data.fullName ? { fullName: data.fullName } : {}),
          ...(data.cnicOrBForm !== undefined ? { cnicOrBForm: data.cnicOrBForm?.trim() || null } : {}),
          ...(data.gender ? { gender: data.gender } : {}),
          ...(data.age !== undefined ? { age: data.age } : {}),
          ...(data.contactNumber ? { contactNumber: data.contactNumber } : {}),
          ...(data.residenceArea ? { residenceArea: data.residenceArea } : {}),
          ...(data.medicalConditionSummary ? { medicalConditionSummary: data.medicalConditionSummary } : {}),
          ...(data.isUnderReview !== undefined ? { isFlaggedForReview: data.isUnderReview } : {}),
          ...(data.reviewNotes !== undefined ? { flagReason: data.reviewNotes?.trim() || null } : {}),
          ...(data.isArchived !== undefined ? { isArchived: data.isArchived } : {}),
          updatedAt: new Date().toISOString(),
        };
        s.patients[index] = updated;
      });

      return updated!;
    }
  );
}
