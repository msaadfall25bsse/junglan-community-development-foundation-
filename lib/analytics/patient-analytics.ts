import prisma from "@/lib/prisma";
import { readStore } from "@/lib/db/persistent-store";
import { tryPrismaOrFallback } from "@/lib/services/db-helper";
import type { PatientStatisticsResult, AnalyticsDateFilter } from "./types";

// ==============================================================================
// PATIENT AGGREGATE ANALYTICS SERVICE — STRICT PRIVACY ENFORCED
// ==============================================================================
// Strictly conforming to Sections 8, 9, 24, 108 of Part 8 specification.
// NEVER returns raw patient identities, phone numbers, CNICs, or personal addresses.

export async function getPatientStatistics(
  params?: AnalyticsDateFilter
): Promise<PatientStatisticsResult> {
  const targetYear = String(params?.year || new Date().getFullYear());
  const targetMonth = params?.month ? Number(params.month) : null;

  return tryPrismaOrFallback(
    async () => {
      // 1. Fetch Patients from PostgreSQL
      const patients = await prisma.patient.findMany({
        where: {
          deletedAt: null,
          isArchived: false,
        },
        select: {
          id: true,
          gender: true,
          age: true,
          residenceArea: true,
          medicalConditionSummary: true,
          createdAt: true,
          yearPeriodId: true,
        },
      });

      return computePatientAggregates(patients, targetYear, targetMonth);
    },
    async () => {
      // 2. Fallback to Local Persistent Store
      const store = readStore();
      const patients = (store.patients || []).filter(
        (p: any) => !p.deletedAt && !p.isArchived
      );
      return computePatientAggregates(patients, targetYear, targetMonth);
    }
  );
}

function computePatientAggregates(
  patients: Array<any>,
  targetYear: string,
  targetMonth: number | null
): PatientStatisticsResult {
  const patientsByYear: Record<string, number> = {};
  const patientsByMonth: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0,
  };

  let totalFilteredPatients = 0;
  let male = 0;
  let female = 0;
  let other = 0;
  let children = 0; // 0-12
  let youth = 0;    // 13-25
  let adults = 0;   // 26-59
  let seniors = 0;  // 60+
  let unspecifiedAge = 0;
  let emergency = 0;
  let routine = 0;
  const areaCounts: Record<string, number> = {};

  for (const p of patients) {
    const createdDate = new Date(p.createdAt || Date.now());
    const itemYear = p.yearPeriodId || String(createdDate.getFullYear());
    const itemMonth = createdDate.getMonth() + 1;

    // Track multi-year aggregate counts
    patientsByYear[itemYear] = (patientsByYear[itemYear] || 0) + 1;

    // Check if within the target scope
    const matchesYear = !targetYear || itemYear === targetYear;
    const matchesMonth = targetMonth === null || itemMonth === targetMonth;

    if (itemYear === targetYear) {
      patientsByMonth[itemMonth] = (patientsByMonth[itemMonth] || 0) + 1;
    }

    if (matchesYear && matchesMonth) {
      totalFilteredPatients++;

      // Gender
      const g = String(p.gender || "").toUpperCase();
      if (g === "MALE") male++;
      else if (g === "FEMALE") female++;
      else other++;

      // Age brackets
      const age = typeof p.age === "number" ? p.age : parseInt(p.age, 10);
      if (isNaN(age)) {
        unspecifiedAge++;
      } else if (age <= 12) {
        children++;
      } else if (age <= 25) {
        youth++;
      } else if (age <= 59) {
        adults++;
      } else {
        seniors++;
      }

      // Emergency status
      if (p.isEmergency || String(p.medicalConditionSummary || "").toLowerCase().includes("emergency") || String(p.medicalConditionSummary || "").toLowerCase().includes("critical")) {
        emergency++;
      } else {
        routine++;
      }

      // Residence Area (Aggregated anonymized counts)
      const area = (p.residenceArea || "Unspecified Area").trim();
      areaCounts[area] = (areaCounts[area] || 0) + 1;
    }
  }

  // Calculate Emergency Percentage
  const emergencyPercentage =
    totalFilteredPatients > 0 ? Math.round((emergency / totalFilteredPatients) * 1000) / 10 : 0;

  // Top Residence Areas
  const topResidences = Object.entries(areaCounts)
    .map(([area, count]) => ({ area, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalPatients: totalFilteredPatients,
    year: targetYear,
    month: targetMonth,
    patientsByYear,
    patientsByMonth,
    genderBreakdown: { male, female, other },
    ageDemographics: {
      children,
      youth,
      adults,
      seniors,
      unspecified: unspecifiedAge,
    },
    emergencyRatio: {
      emergency,
      routine,
      emergencyPercentage,
    },
    topResidences,
    generatedAt: new Date().toISOString(),
  };
}
