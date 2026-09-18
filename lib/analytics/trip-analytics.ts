import prisma from "@/lib/prisma";
import { readStore } from "@/lib/db/persistent-store";
import { tryPrismaOrFallback } from "@/lib/services/db-helper";
import type { TripStatisticsResult, AnalyticsDateFilter, AmbulanceTripMetric } from "./types";

// ==============================================================================
// AMBULANCE TRIP ANALYTICS SERVICE — JUNGLAN FOUNDATION
// ==============================================================================
// Strictly conforming to Section 10 of Part 8 specification.
// Calculates trip volumes, vehicle telemetry, destination distributions, and distance averages.

export async function getTripStatistics(
  params?: AnalyticsDateFilter & { ambulanceId?: string }
): Promise<TripStatisticsResult> {
  const targetYear = String(params?.year || new Date().getFullYear());
  const targetMonth = params?.month ? Number(params.month) : null;
  const ambulanceFilter = params?.ambulanceId || null;

  return tryPrismaOrFallback(
    async () => {
      // 1. Fetch Trips and Ambulances from PostgreSQL
      const [trips, ambulances] = await Promise.all([
        prisma.trip.findMany({
          where: {
            deletedAt: null,
            isArchived: false,
          },
          include: {
            ambulance: true,
          },
        }),
        prisma.ambulanceVehicle.findMany(),
      ]);

      return computeTripAggregates(trips, ambulances, targetYear, targetMonth, ambulanceFilter);
    },
    async () => {
      // 2. Fallback to Local Persistent Store
      const store = readStore();
      const trips = (store.trips || []).filter((t: any) => !t.deletedAt && !t.isArchived);
      const ambulances = store.ambulances || [];

      return computeTripAggregates(trips, ambulances, targetYear, targetMonth, ambulanceFilter);
    }
  );
}

function computeTripAggregates(
  trips: Array<any>,
  ambulances: Array<any>,
  targetYear: string,
  targetMonth: number | null,
  ambulanceFilter: string | null
): TripStatisticsResult {
  const tripsByYear: Record<string, number> = {};
  const tripsByMonth: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0,
  };

  let totalFilteredTrips = 0;
  let completed = 0;
  let inProgress = 0;
  let cancelled = 0;
  let totalDistanceKm = 0;
  let emergencyTrips = 0;
  const destinationCounts: Record<string, number> = {};
  const ambulanceMetricsMap: Record<string, AmbulanceTripMetric> = {};

  // Initialize ambulance metrics map
  for (const amb of ambulances) {
    ambulanceMetricsMap[amb.id] = {
      ambulanceId: amb.id,
      registrationNumber: amb.registrationNumber || amb.vehicleRegistrationNumber || "Amb",
      model: amb.model || "Toyota HiAce Ambulance",
      tripCount: 0,
      totalDistanceKm: 0,
      fuelCostPKR: 0,
    };
  }

  for (const t of trips) {
    const tripDate = new Date(t.date || t.createdAt || Date.now());
    const itemYear = t.yearPeriodId || String(tripDate.getFullYear());
    const itemMonth = tripDate.getMonth() + 1;

    // Track multi-year counts
    tripsByYear[itemYear] = (tripsByYear[itemYear] || 0) + 1;

    if (itemYear === targetYear) {
      tripsByMonth[itemMonth] = (tripsByMonth[itemMonth] || 0) + 1;
    }

    // Filter match
    const matchesYear = !targetYear || itemYear === targetYear;
    const matchesMonth = targetMonth === null || itemMonth === targetMonth;
    const matchesAmb = !ambulanceFilter || t.ambulanceId === ambulanceFilter;

    if (matchesYear && matchesMonth && matchesAmb) {
      totalFilteredTrips++;

      // Status
      const status = String(t.status || "").toUpperCase();
      if (status === "COMPLETED") completed++;
      else if (status === "IN_PROGRESS" || status === "ACTIVE") inProgress++;
      else if (status === "CANCELLED") cancelled++;
      else completed++;

      // Distance
      const dist = Number(t.distanceKm) || 0;
      totalDistanceKm += dist;

      // Fuel cost
      const fuelCost = Number(t.fuelExpensePKR) || 0;

      // Emergency
      if (t.isEmergency || t.patientCondition?.toLowerCase().includes("critical")) {
        emergencyTrips++;
      }

      // Ambulance Telemetry
      if (t.ambulanceId) {
        if (!ambulanceMetricsMap[t.ambulanceId]) {
          ambulanceMetricsMap[t.ambulanceId] = {
            ambulanceId: t.ambulanceId,
            registrationNumber: t.ambulance?.registrationNumber || "Ambulance",
            model: t.ambulance?.model || "Fleet Unit",
            tripCount: 0,
            totalDistanceKm: 0,
            fuelCostPKR: 0,
          };
        }
        ambulanceMetricsMap[t.ambulanceId].tripCount++;
        ambulanceMetricsMap[t.ambulanceId].totalDistanceKm += dist;
        ambulanceMetricsMap[t.ambulanceId].fuelCostPKR += fuelCost;
      }

      // Top Destinations
      const destination = (t.dropoffHospital || t.destinationHospital || "Local Hospital").trim();
      destinationCounts[destination] = (destinationCounts[destination] || 0) + 1;
    }
  }

  const averageDistanceKm =
    totalFilteredTrips > 0 ? Math.round((totalDistanceKm / totalFilteredTrips) * 10) / 10 : 0;

  const topDestinations = Object.entries(destinationCounts)
    .map(([hospital, count]) => ({ hospital, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalTrips: totalFilteredTrips,
    year: targetYear,
    month: targetMonth,
    tripsByYear,
    tripsByMonth,
    tripsByStatus: {
      completed,
      inProgress,
      cancelled,
    },
    totalDistanceKm,
    averageDistanceKm,
    emergencyTrips,
    ambulanceBreakdown: Object.values(ambulanceMetricsMap),
    topDestinations,
    generatedAt: new Date().toISOString(),
  };
}
