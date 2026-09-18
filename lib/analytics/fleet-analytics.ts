import prisma from "@/lib/prisma";
import { readStore } from "@/lib/db/persistent-store";
import { tryPrismaOrFallback } from "@/lib/services/db-helper";
import type {
  AmbulanceStatisticsResult,
  FuelSummaryResult,
  MaintenanceSummaryResult,
  AnalyticsDateFilter,
} from "./types";

// ==============================================================================
// FLEET, FUEL & MAINTENANCE ANALYTICS SERVICE — JUNGLAN FOUNDATION
// ==============================================================================
// Strictly conforming to Sections 13, 14, 15 of Part 8 specification.
// Vehicle upkeep telemetry, fuel efficiency, and workshop servicing breakdowns.

export async function getAmbulanceStatistics(params?: {
  year?: string | number;
}): Promise<AmbulanceStatisticsResult> {
  const targetYear = String(params?.year || new Date().getFullYear());

  return tryPrismaOrFallback(
    async () => {
      // 1. Fetch Ambulances, Trips, Fuel, Maintenance from PostgreSQL
      const [ambulances, trips, fuelLogs, maintenanceLogs] = await Promise.all([
        prisma.ambulanceVehicle.findMany(),
        prisma.trip.findMany({ where: { yearPeriodId: targetYear, deletedAt: null } }),
        prisma.fuelLog.findMany({ where: { yearPeriodId: targetYear, deletedAt: null } }),
        prisma.maintenanceLog.findMany({ where: { yearPeriodId: targetYear, deletedAt: null } }),
      ]);

      return computeFleetAggregates(ambulances, trips, fuelLogs, maintenanceLogs, targetYear);
    },
    async () => {
      // 2. Fallback to Local Persistent Store
      const store = readStore();
      const ambulances = store.ambulances || [];
      const trips = (store.trips || []).filter((t: any) => !t.deletedAt);
      const expenses = (store.expenses || []).filter((e: any) => !e.deletedAt);

      return computeFleetFallbackAggregates(ambulances, trips, expenses, targetYear);
    }
  );
}

export async function getFuelSummary(
  params?: AnalyticsDateFilter & { ambulanceId?: string }
): Promise<FuelSummaryResult> {
  const targetYear = String(params?.year || new Date().getFullYear());
  const targetMonth = params?.month ? Number(params.month) : null;
  const ambulanceFilter = params?.ambulanceId || null;

  return tryPrismaOrFallback(
    async () => {
      const [fuelLogs, trips] = await Promise.all([
        prisma.fuelLog.findMany({
          where: { deletedAt: null },
          include: { ambulance: true },
        }),
        prisma.trip.findMany({ where: { deletedAt: null } }),
      ]);

      return computeFuelAggregates(fuelLogs, trips, targetYear, targetMonth, ambulanceFilter);
    },
    async () => {
      const store = readStore();
      const expenses = (store.expenses || []).filter(
        (e: any) => !e.deletedAt && String(e.category || "").toUpperCase().includes("FUEL")
      );
      const trips = (store.trips || []).filter((t: any) => !t.deletedAt);

      return computeFuelFallbackAggregates(expenses, trips, targetYear, targetMonth, ambulanceFilter);
    }
  );
}

export async function getMaintenanceSummary(
  params?: AnalyticsDateFilter & { ambulanceId?: string }
): Promise<MaintenanceSummaryResult> {
  const targetYear = String(params?.year || new Date().getFullYear());
  const targetMonth = params?.month ? Number(params.month) : null;
  const ambulanceFilter = params?.ambulanceId || null;

  return tryPrismaOrFallback(
    async () => {
      const maintenanceLogs = await prisma.maintenanceLog.findMany({
        where: { deletedAt: null },
        include: { ambulance: true },
      });

      return computeMaintenanceAggregates(maintenanceLogs, targetYear, targetMonth, ambulanceFilter);
    },
    async () => {
      const store = readStore();
      const expenses = (store.expenses || []).filter(
        (e: any) =>
          !e.deletedAt &&
          (String(e.category || "").toUpperCase().includes("MAINTENANCE") ||
            String(e.category || "").toUpperCase().includes("REPAIR"))
      );

      return computeMaintenanceFallbackAggregates(expenses, targetYear, targetMonth, ambulanceFilter);
    }
  );
}

// ------------------------------------------------------------------------------
// AGGREGATE COMPUTATION HELPERS
// ------------------------------------------------------------------------------

function computeFleetAggregates(
  ambulances: Array<any>,
  trips: Array<any>,
  fuelLogs: Array<any>,
  maintenanceLogs: Array<any>,
  targetYear: string
): AmbulanceStatisticsResult {
  const fleetBreakdown = ambulances.map((amb) => {
    const ambTrips = trips.filter((t) => t.ambulanceId === amb.id);
    const ambFuel = fuelLogs.filter((f) => f.ambulanceId === amb.id);
    const ambMaint = maintenanceLogs.filter((m) => m.ambulanceId === amb.id);

    const tripCount = ambTrips.length;
    const distanceKm = ambTrips.reduce((acc, t) => acc + (Number(t.distanceKm) || 0), 0);
    const fuelCostPKR = ambFuel.reduce((acc, f) => acc + (Number(f.totalCostPKR) || 0), 0);
    const maintenanceCostPKR = ambMaint.reduce((acc, m) => acc + (Number(m.costPKR) || 0), 0);

    return {
      id: amb.id,
      registrationNumber: amb.registrationNumber || "Amb",
      model: amb.model || "Ambulance",
      status: amb.status || "ACTIVE",
      tripCount,
      distanceKm,
      fuelCostPKR,
      maintenanceCostPKR,
      totalOperatingCostPKR: fuelCostPKR + maintenanceCostPKR,
    };
  });

  const activeAmbulances = ambulances.filter((a) => a.status === "ACTIVE" || !a.status).length;

  return {
    totalAmbulances: ambulances.length,
    activeAmbulances,
    year: targetYear,
    fleetBreakdown,
    generatedAt: new Date().toISOString(),
  };
}

function computeFleetFallbackAggregates(
  ambulances: Array<any>,
  trips: Array<any>,
  expenses: Array<any>,
  targetYear: string
): AmbulanceStatisticsResult {
  const fleetBreakdown = ambulances.map((amb) => {
    const ambTrips = trips.filter((t) => t.ambulanceId === amb.id || t.ambulanceRegistration === amb.registrationNumber);
    const tripCount = ambTrips.length;
    const distanceKm = ambTrips.reduce((acc, t) => acc + (Number(t.distanceKm) || 0), 0);

    const fuelCostPKR = ambTrips.reduce((acc, t) => acc + (Number(t.fuelExpensePKR) || 0), 0);
    const maintenanceCostPKR = expenses
      .filter((e) => e.category?.includes("MAINTENANCE") && (e.description?.includes(amb.registrationNumber) || e.title?.includes(amb.registrationNumber)))
      .reduce((acc, e) => acc + (Number(e.amountPKR) || 0), 0);

    return {
      id: amb.id,
      registrationNumber: amb.registrationNumber || "Amb",
      model: amb.model || "Toyota HiAce Ambulance",
      status: amb.status || "ACTIVE",
      tripCount,
      distanceKm,
      fuelCostPKR,
      maintenanceCostPKR,
      totalOperatingCostPKR: fuelCostPKR + maintenanceCostPKR,
    };
  });

  return {
    totalAmbulances: ambulances.length,
    activeAmbulances: ambulances.length,
    year: targetYear,
    fleetBreakdown,
    generatedAt: new Date().toISOString(),
  };
}

function computeFuelAggregates(
  fuelLogs: Array<any>,
  trips: Array<any>,
  targetYear: string,
  targetMonth: number | null,
  ambulanceFilter: string | null
): FuelSummaryResult {
  const fuelByMonth: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0,
  };
  const ambFuelMap: Record<string, { registrationNumber: string; totalCostPKR: number; liters: number }> = {};

  let totalCost = 0;
  let totalLiters = 0;

  for (const log of fuelLogs) {
    const date = new Date(log.date || log.createdAt || Date.now());
    const itemYear = log.yearPeriodId || String(date.getFullYear());
    const itemMonth = date.getMonth() + 1;
    const cost = Number(log.totalCostPKR) || 0;
    const liters = Number(log.liters) || 0;

    if (itemYear === targetYear) {
      fuelByMonth[itemMonth] = (fuelByMonth[itemMonth] || 0) + cost;
    }

    const matchesYear = !targetYear || itemYear === targetYear;
    const matchesMonth = targetMonth === null || itemMonth === targetMonth;
    const matchesAmb = !ambulanceFilter || log.ambulanceId === ambulanceFilter;

    if (matchesYear && matchesMonth && matchesAmb) {
      totalCost += cost;
      totalLiters += liters;

      if (log.ambulanceId) {
        if (!ambFuelMap[log.ambulanceId]) {
          ambFuelMap[log.ambulanceId] = {
            registrationNumber: log.ambulance?.registrationNumber || "Ambulance",
            totalCostPKR: 0,
            liters: 0,
          };
        }
        ambFuelMap[log.ambulanceId].totalCostPKR += cost;
        ambFuelMap[log.ambulanceId].liters += liters;
      }
    }
  }

  const averagePricePerLiter =
    totalLiters > 0 ? Math.round((totalCost / totalLiters) * 100) / 100 : 0;

  // Average cost per KM
  const totalDist = trips
    .filter((t) => (!targetYear || t.yearPeriodId === targetYear) && (!ambulanceFilter || t.ambulanceId === ambulanceFilter))
    .reduce((acc, t) => acc + (Number(t.distanceKm) || 0), 0);

  const averageCostPerKm =
    totalDist > 0 ? Math.round((totalCost / totalDist) * 100) / 100 : null;

  return {
    totalFuelCostPKR: totalCost,
    totalLiters,
    averagePricePerLiterPKR: averagePricePerLiter,
    year: targetYear,
    month: targetMonth,
    fuelByMonth,
    fuelByAmbulance: Object.entries(ambFuelMap).map(([ambulanceId, d]) => ({
      ambulanceId,
      ...d,
    })),
    averageCostPerKm,
    generatedAt: new Date().toISOString(),
  };
}

function computeFuelFallbackAggregates(
  expenses: Array<any>,
  trips: Array<any>,
  targetYear: string,
  targetMonth: number | null,
  ambulanceFilter: string | null
): FuelSummaryResult {
  const fuelByMonth: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0,
  };

  let totalCost = 0;
  for (const e of expenses) {
    const date = new Date(e.date || e.createdAt || Date.now());
    const itemYear = e.yearPeriodId || String(date.getFullYear());
    const itemMonth = date.getMonth() + 1;
    const cost = Number(e.amountPKR) || 0;

    if (itemYear === targetYear) {
      fuelByMonth[itemMonth] = (fuelByMonth[itemMonth] || 0) + cost;
    }

    if ((!targetYear || itemYear === targetYear) && (targetMonth === null || itemMonth === targetMonth)) {
      totalCost += cost;
    }
  }

  const estimatedLiters = Math.round(totalCost / 280); // ~280 PKR / Liter average
  const totalDist = trips.reduce((acc, t) => acc + (Number(t.distanceKm) || 0), 0);
  const averageCostPerKm = totalDist > 0 ? Math.round((totalCost / totalDist) * 100) / 100 : null;

  return {
    totalFuelCostPKR: totalCost,
    totalLiters: estimatedLiters,
    averagePricePerLiterPKR: 280,
    year: targetYear,
    month: targetMonth,
    fuelByMonth,
    fuelByAmbulance: [],
    averageCostPerKm,
    generatedAt: new Date().toISOString(),
  };
}

function computeMaintenanceAggregates(
  maintenanceLogs: Array<any>,
  targetYear: string,
  targetMonth: number | null,
  ambulanceFilter: string | null
): MaintenanceSummaryResult {
  const maintenanceByMonth: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0,
  };
  const ambMaintMap: Record<string, { registrationNumber: string; totalCostPKR: number; serviceCount: number }> = {};
  const workshopTotals: Record<string, number> = {};

  let totalCost = 0;
  let routineCost = 0;
  let repairCost = 0;

  for (const m of maintenanceLogs) {
    const date = new Date(m.date || m.createdAt || Date.now());
    const itemYear = m.yearPeriodId || String(date.getFullYear());
    const itemMonth = date.getMonth() + 1;
    const cost = Number(m.costPKR) || 0;

    if (itemYear === targetYear) {
      maintenanceByMonth[itemMonth] = (maintenanceByMonth[itemMonth] || 0) + cost;
    }

    const matchesYear = !targetYear || itemYear === targetYear;
    const matchesMonth = targetMonth === null || itemMonth === targetMonth;
    const matchesAmb = !ambulanceFilter || m.ambulanceId === ambulanceFilter;

    if (matchesYear && matchesMonth && matchesAmb) {
      totalCost += cost;

      const sType = String(m.serviceType || "ROUTINE_SERVICE").toUpperCase();
      if (sType.includes("REPAIR") || sType.includes("OVERHAUL")) {
        repairCost += cost;
      } else {
        routineCost += cost;
      }

      if (m.ambulanceId) {
        if (!ambMaintMap[m.ambulanceId]) {
          ambMaintMap[m.ambulanceId] = {
            registrationNumber: m.ambulance?.registrationNumber || "Ambulance",
            totalCostPKR: 0,
            serviceCount: 0,
          };
        }
        ambMaintMap[m.ambulanceId].totalCostPKR += cost;
        ambMaintMap[m.ambulanceId].serviceCount++;
      }

      const workshop = (m.workshopName || "General Workshop").trim();
      workshopTotals[workshop] = (workshopTotals[workshop] || 0) + cost;
    }
  }

  const topWorkshops = Object.entries(workshopTotals)
    .map(([workshop, totalCostPKR]) => ({ workshop, totalCostPKR }))
    .sort((a, b) => b.totalCostPKR - a.totalCostPKR)
    .slice(0, 5);

  return {
    totalMaintenanceCostPKR: totalCost,
    year: targetYear,
    month: targetMonth,
    maintenanceByMonth,
    routineServiceCostPKR: routineCost,
    repairsCostPKR: repairCost,
    maintenanceByAmbulance: Object.entries(ambMaintMap).map(([ambulanceId, d]) => ({
      ambulanceId,
      ...d,
    })),
    topWorkshops,
    generatedAt: new Date().toISOString(),
  };
}

function computeMaintenanceFallbackAggregates(
  expenses: Array<any>,
  targetYear: string,
  targetMonth: number | null,
  ambulanceFilter: string | null
): MaintenanceSummaryResult {
  const maintenanceByMonth: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0,
  };

  let totalCost = 0;
  let repairCost = 0;
  let routineCost = 0;

  for (const e of expenses) {
    const date = new Date(e.date || e.createdAt || Date.now());
    const itemYear = e.yearPeriodId || String(date.getFullYear());
    const itemMonth = date.getMonth() + 1;
    const cost = Number(e.amountPKR) || 0;

    if (itemYear === targetYear) {
      maintenanceByMonth[itemMonth] = (maintenanceByMonth[itemMonth] || 0) + cost;
    }

    if ((!targetYear || itemYear === targetYear) && (targetMonth === null || itemMonth === targetMonth)) {
      totalCost += cost;
      if (String(e.category).includes("REPAIR")) repairCost += cost;
      else routineCost += cost;
    }
  }

  return {
    totalMaintenanceCostPKR: totalCost,
    year: targetYear,
    month: targetMonth,
    maintenanceByMonth,
    routineServiceCostPKR: routineCost,
    repairsCostPKR: repairCost,
    maintenanceByAmbulance: [],
    topWorkshops: [{ workshop: "Authorized Workshop Mansehra", totalCostPKR: totalCost }],
    generatedAt: new Date().toISOString(),
  };
}
