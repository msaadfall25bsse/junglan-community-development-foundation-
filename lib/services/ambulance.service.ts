import { prisma } from "@/lib/prisma";
import { readStore, updateStore } from "@/lib/db";
import { NotFoundError, ConflictError, BadRequestError } from "@/lib/api/errors";
import { createAuditEntry } from "./audit.service";
import { tryPrismaOrFallback } from "./db-helper";
import { Prisma } from "@prisma/client";
import type {
  CreateAmbulanceInput,
  UpdateAmbulanceInput,
} from "@/lib/validation";

// ==============================================================================
// AMBULANCE FLEET SERVICE
// ==============================================================================

export async function generateAmbulanceIdentifier(): Promise<string> {
  return tryPrismaOrFallback(
    async () => {
      const count = await prisma.ambulanceVehicle.count();
      return `AMB-${String(count + 1).padStart(2, "0")}`;
    },
    async () => {
      const store = readStore();
      return `AMB-${String((store.ambulances?.length || 0) + 1).padStart(2, "0")}`;
    }
  );
}

export async function getAmbulances(query?: {
  status?: string;
  search?: string;
  isActive?: boolean;
}) {
  return tryPrismaOrFallback(
    async () => {
      const where: Prisma.AmbulanceVehicleWhereInput = {};
      if (query?.isActive !== undefined) {
        where.isActive = query.isActive;
      }
      if (query?.status && query.status !== "ALL") {
        where.status = query.status as Prisma.EnumVehicleStatusFilter;
      }
      if (query?.search) {
        const term = query.search.trim();
        where.OR = [
          { ambulanceIdentifier: { contains: term, mode: "insensitive" } },
          { registrationNumber: { contains: term, mode: "insensitive" } },
          { model: { contains: term, mode: "insensitive" } },
          { assignedDriverName: { contains: term, mode: "insensitive" } },
        ];
      }

      return prisma.ambulanceVehicle.findMany({
        where,
        orderBy: { ambulanceIdentifier: "asc" },
        include: {
          _count: {
            select: { trips: true },
          },
        },
      });
    },
    async () => {
      const store = readStore();
      let list = store.ambulances || [];

      if (query?.isActive !== undefined) {
        list = list.filter((a) => (a.isActive ?? true) === query.isActive);
      }
      if (query?.status && query.status !== "ALL") {
        list = list.filter((a) => a.status === query.status);
      }
      if (query?.search) {
        const term = query.search.toLowerCase().trim();
        list = list.filter(
          (a) =>
            a.ambulanceIdentifier?.toLowerCase().includes(term) ||
            a.registrationNumber?.toLowerCase().includes(term) ||
            a.model?.toLowerCase().includes(term) ||
            a.assignedDriverName?.toLowerCase().includes(term)
        );
      }

      return list.map((a) => {
        const tripCount = (store.trips || []).filter(
          (t) => t.ambulanceId === a.id || t.ambulanceId === a.ambulanceIdentifier
        ).length;
        return {
          ...a,
          _count: { trips: tripCount },
        };
      });
    }
  );
}

export async function getAmbulanceById(idOrIdentifier: string) {
  return tryPrismaOrFallback(
    async () => {
      const vehicle = await prisma.ambulanceVehicle.findFirst({
        where: {
          OR: [
            { id: idOrIdentifier },
            { ambulanceIdentifier: idOrIdentifier },
            { registrationNumber: idOrIdentifier },
          ],
        },
        include: {
          trips: {
            orderBy: { date: "desc" },
            take: 10,
            include: {
              patient: {
                select: {
                  id: true,
                  patientIdentifier: true,
                  fullName: true,
                },
              },
            },
          },
          _count: {
            select: { trips: true, fuelLogs: true, maintenanceLogs: true },
          },
        },
      });

      if (!vehicle) {
        throw new NotFoundError("AmbulanceVehicle", idOrIdentifier);
      }

      return vehicle;
    },
    async () => {
      const store = readStore();
      const vehicle = (store.ambulances || []).find(
        (a) =>
          a.id === idOrIdentifier ||
          a.ambulanceIdentifier === idOrIdentifier ||
          a.registrationNumber === idOrIdentifier
      );

      if (!vehicle) {
        throw new NotFoundError("AmbulanceVehicle", idOrIdentifier);
      }

      const trips = (store.trips || [])
        .filter((t) => t.ambulanceId === vehicle.id || t.ambulanceId === vehicle.ambulanceIdentifier)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10)
        .map((t) => {
          const patient = (store.patients || []).find((p) => p.id === (t as any).patientId);
          return {
            ...t,
            patient: patient
              ? {
                  id: patient.id,
                  patientIdentifier: patient.patientIdentifier,
                  fullName: patient.fullName,
                }
              : null,
          };
        });

      return {
        ...vehicle,
        trips,
        _count: {
          trips: trips.length,
          fuelLogs: (store.expenses || []).filter((e) => e.category === "FUEL").length,
          maintenanceLogs: (store.expenses || []).filter((e) => e.category === "MAINTENANCE").length,
        },
      };
    }
  );
}

export async function createAmbulance(
  data: CreateAmbulanceInput,
  actorId?: string | null
) {
  const normalizedStatus =
    data.status === "ON_MISSION" ? "ON_TRIP" : (data.status as any) || "AVAILABLE";

  return tryPrismaOrFallback(
    async () => {
      // Check for duplicate plate or identifier
      const existing = await prisma.ambulanceVehicle.findFirst({
        where: {
          OR: [
            { ambulanceIdentifier: data.vehicleNumber },
            { registrationNumber: data.vehicleNumber },
          ],
        },
      });

      if (existing) {
        throw new ConflictError(
          `An ambulance with identifier or plate '${data.vehicleNumber}' already exists.`
        );
      }

      return prisma.$transaction(async (tx) => {
        const vehicle = await tx.ambulanceVehicle.create({
          data: {
            ambulanceIdentifier: data.vehicleNumber,
            registrationNumber: data.vehicleNumber,
            model: `${data.make} ${data.model}`,
            manufacturingYear: data.yearOfManufacture,
            status: normalizedStatus,
            currentOdometerKm: new Prisma.Decimal(data.currentOdometerKm || 0),
            assignedDriverName: "M. Tariq Khan",
            isActive: true,
          },
        });

        await createAuditEntry(tx, {
          action: "CREATE",
          module: "FLEET",
          recordId: vehicle.id,
          userId: actorId,
          metadata: {
            ambulanceIdentifier: vehicle.ambulanceIdentifier,
            registrationNumber: vehicle.registrationNumber,
            model: vehicle.model,
          },
        });

        return vehicle;
      });
    },
    async () => {
      const store = readStore();
      const exists = (store.ambulances || []).some(
        (a) =>
          a.ambulanceIdentifier?.toLowerCase() === data.vehicleNumber.toLowerCase() ||
          a.registrationNumber?.toLowerCase() === data.vehicleNumber.toLowerCase()
      );

      if (exists) {
        throw new ConflictError(
          `An ambulance with identifier or plate '${data.vehicleNumber}' already exists.`
        );
      }

      const newAmb = {
        id: `amb-${Date.now()}`,
        ambulanceIdentifier: data.vehicleNumber,
        registrationNumber: data.vehicleNumber,
        model: `${data.make} ${data.model}`,
        manufacturingYear: data.yearOfManufacture,
        status: normalizedStatus,
        currentOdometerKm: Number(data.currentOdometerKm || 0),
        assignedDriverName: "M. Tariq Khan",
        baseLocation: data.baseLocation || "Junglan Central Depot",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        if (!s.ambulances) s.ambulances = [];
        s.ambulances.push(newAmb);
        if (s.settings) {
          s.settings.activeAmbulancesCount = s.ambulances.filter((a) => a.isActive).length;
        }
        s.auditLogs.push({
          id: `aud-${Date.now()}`,
          action: "CREATE",
          module: "FLEET",
          recordId: newAmb.id,
          userId: actorId,
          timestamp: new Date().toISOString(),
          metadataJson: JSON.stringify({
            ambulanceIdentifier: newAmb.ambulanceIdentifier,
            registrationNumber: newAmb.registrationNumber,
          }),
        });
      });

      return newAmb;
    }
  );
}

export async function updateAmbulance(
  id: string,
  data: UpdateAmbulanceInput & {
    assignedDriverName?: string;
    isActive?: boolean;
  },
  actorId?: string | null
) {
  return tryPrismaOrFallback(
    async () => {
      const existing = await prisma.ambulanceVehicle.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundError("AmbulanceVehicle", id);
      }

      const updateData: Prisma.AmbulanceVehicleUpdateInput = {};

      if (data.vehicleNumber) {
        updateData.ambulanceIdentifier = data.vehicleNumber;
        updateData.registrationNumber = data.vehicleNumber;
      }
      if (data.make || data.model) {
        updateData.model =
          data.make && data.model
            ? `${data.make} ${data.model}`
            : data.model || data.make || existing.model;
      }
      if (data.yearOfManufacture) {
        updateData.manufacturingYear = data.yearOfManufacture;
      }
      if (data.status) {
        const normalized =
          data.status === "ON_MISSION" ? "ON_TRIP" : (data.status as any);
        updateData.status = normalized;
      }
      if (data.currentOdometerKm !== undefined) {
        updateData.currentOdometerKm = new Prisma.Decimal(data.currentOdometerKm);
      }
      if (data.assignedDriverName !== undefined) {
        updateData.assignedDriverName = data.assignedDriverName;
      }
      if (data.isActive !== undefined) {
        updateData.isActive = data.isActive;
      }

      return prisma.$transaction(async (tx) => {
        const updated = await tx.ambulanceVehicle.update({
          where: { id },
          data: updateData,
        });

        await createAuditEntry(tx, {
          action: "UPDATE",
          module: "FLEET",
          recordId: updated.id,
          userId: actorId,
          metadata: {
            ambulanceIdentifier: updated.ambulanceIdentifier,
            status: updated.status,
            currentOdometerKm: Number(updated.currentOdometerKm),
          },
        });

        return updated;
      });
    },
    async () => {
      const store = readStore();
      const idx = (store.ambulances || []).findIndex((a) => a.id === id || a.ambulanceIdentifier === id);
      if (idx === -1) {
        throw new NotFoundError("AmbulanceVehicle", id);
      }

      const current = store.ambulances[idx];
      let newModel = current.model;
      if (data.make && data.model) {
        newModel = `${data.make} ${data.model}`;
      } else if (data.model) {
        newModel = data.model;
      }

      const updated = {
        ...current,
        ambulanceIdentifier: data.vehicleNumber || current.ambulanceIdentifier,
        registrationNumber: data.vehicleNumber || current.registrationNumber,
        model: newModel,
        manufacturingYear: data.yearOfManufacture ?? current.manufacturingYear,
        status: data.status
          ? data.status === "ON_MISSION"
            ? "ON_TRIP"
            : (data.status as any)
          : current.status,
        currentOdometerKm:
          data.currentOdometerKm !== undefined
            ? Number(data.currentOdometerKm)
            : current.currentOdometerKm,
        assignedDriverName:
          data.assignedDriverName !== undefined
            ? data.assignedDriverName
            : current.assignedDriverName,
        baseLocation: data.baseLocation || (current as any).baseLocation || "Junglan Central Depot",
        isActive: data.isActive !== undefined ? data.isActive : current.isActive,
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        s.ambulances[idx] = updated;
        if (s.settings) {
          s.settings.activeAmbulancesCount = s.ambulances.filter((a) => a.isActive).length;
        }
        s.auditLogs.push({
          id: `aud-${Date.now()}`,
          action: "UPDATE",
          module: "FLEET",
          recordId: updated.id,
          userId: actorId,
          timestamp: new Date().toISOString(),
          metadataJson: JSON.stringify({
            ambulanceIdentifier: updated.ambulanceIdentifier,
            status: updated.status,
          }),
        });
      });

      return updated;
    }
  );
}

export async function archiveAmbulance(id: string, actorId?: string | null) {
  return tryPrismaOrFallback(
    async () => {
      const existing = await prisma.ambulanceVehicle.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundError("AmbulanceVehicle", id);
      }

      // Check if ambulance is on active trip
      if (existing.status === "ON_TRIP") {
        throw new BadRequestError(
          `Ambulance ${existing.ambulanceIdentifier} is currently on an active mission and cannot be decommissioned.`
        );
      }

      return prisma.$transaction(async (tx) => {
        const archived = await tx.ambulanceVehicle.update({
          where: { id },
          data: {
            isActive: false,
            status: "OUT_OF_SERVICE",
          },
        });

        await createAuditEntry(tx, {
          action: "ARCHIVE",
          module: "FLEET",
          recordId: archived.id,
          userId: actorId,
          metadata: {
            ambulanceIdentifier: archived.ambulanceIdentifier,
            reason: "Decommissioned from active fleet",
          },
        });

        return archived;
      });
    },
    async () => {
      const store = readStore();
      const idx = (store.ambulances || []).findIndex((a) => a.id === id || a.ambulanceIdentifier === id);
      if (idx === -1) {
        throw new NotFoundError("AmbulanceVehicle", id);
      }

      const vehicle = store.ambulances[idx];
      if (vehicle.status === "ON_TRIP") {
        throw new BadRequestError(
          `Ambulance ${vehicle.ambulanceIdentifier} is currently on an active mission and cannot be decommissioned.`
        );
      }

      const archived = {
        ...vehicle,
        isActive: false,
        status: "OUT_OF_SERVICE" as const,
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        s.ambulances[idx] = archived;
        if (s.settings) {
          s.settings.activeAmbulancesCount = s.ambulances.filter((a) => a.isActive).length;
        }
        s.auditLogs.push({
          id: `aud-${Date.now()}`,
          action: "ARCHIVE",
          module: "FLEET",
          recordId: archived.id,
          userId: actorId,
          timestamp: new Date().toISOString(),
          metadataJson: JSON.stringify({
            ambulanceIdentifier: archived.ambulanceIdentifier,
            action: "ARCHIVED",
          }),
        });
      });

      return archived;
    }
  );
}
