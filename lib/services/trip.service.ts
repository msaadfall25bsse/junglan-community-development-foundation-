import { prisma } from "@/lib/prisma";
import { readStore, updateStore } from "@/lib/db";
import { NotFoundError, ConflictError, BadRequestError } from "@/lib/api/errors";
import { assertYearPeriodActive } from "./year-period.service";
import { createAuditEntry } from "./audit.service";
import { tryPrismaOrFallback } from "./db-helper";
import { Prisma } from "@prisma/client";
import type {
  CreateTripInput,
  UpdateTripInput,
  TripQueryInput,
  CreateAmbulanceInput,
} from "@/lib/validation";

// ==============================================================================
// AMBULANCE FLEET & TRIP SERVICE
// ==============================================================================

async function generateTripIdentifier(yearPeriodId: string): Promise<string> {
  const count = await prisma.trip.count({
    where: { yearPeriodId },
  });
  const padded = String(count + 1).padStart(6, "0");
  return `TRP-${yearPeriodId}-${padded}`;
}

export async function getAmbulances() {
  return tryPrismaOrFallback(
    async () => {
      return prisma.ambulanceVehicle.findMany({
        orderBy: { ambulanceIdentifier: "asc" },
      });
    },
    async () => {
      const store = readStore();
      return store.ambulances;
    }
  );
}

export async function createAmbulance(data: CreateAmbulanceInput) {
  return tryPrismaOrFallback(
    async () => {
      return prisma.ambulanceVehicle.create({
        data: {
          ambulanceIdentifier: data.vehicleNumber,
          registrationNumber: data.vehicleNumber,
          model: `${data.make} ${data.model}`,
          manufacturingYear: data.yearOfManufacture,
          status: data.status === "ON_MISSION" ? "ON_TRIP" : (data.status as any) || "AVAILABLE",
          currentOdometerKm: new Prisma.Decimal(data.currentOdometerKm || 0),
          assignedDriverName: "M. Tariq Khan",
        },
      });
    },
    async () => {
      const store = readStore();
      const newAmb = {
        id: `amb-${Date.now()}`,
        ambulanceIdentifier: data.vehicleNumber,
        registrationNumber: data.vehicleNumber,
        model: `${data.make} ${data.model}`,
        manufacturingYear: data.yearOfManufacture,
        status: (data.status as any) || "AVAILABLE",
        currentOdometerKm: Number(data.currentOdometerKm || 0),
        assignedDriverName: "M. Tariq Khan",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      updateStore((s) => {
        s.ambulances.push(newAmb);
        s.settings.activeAmbulancesCount = s.ambulances.length;
      });
      return newAmb;
    }
  );
}

export async function createTrip(
  data: CreateTripInput,
  actorId?: string | null
) {
  return tryPrismaOrFallback(
    async () => {
      await assertYearPeriodActive(data.yearPeriodId);

      const vehicle = await prisma.ambulanceVehicle.findUnique({
        where: { id: data.ambulanceId },
      });

      if (!vehicle) {
        throw new NotFoundError("AmbulanceVehicle", data.ambulanceId);
      }

      if (vehicle.status !== "AVAILABLE") {
        throw new ConflictError(
          `Ambulance ${vehicle.registrationNumber} is currently ${vehicle.status} and cannot be dispatched.`
        );
      }

      const tripIdentifier = await generateTripIdentifier(data.yearPeriodId);

      return prisma.$transaction(async (tx) => {
        await (tx as any).ambulanceVehicle.update({
          where: { id: data.ambulanceId },
          data: { status: "ON_TRIP" },
        });

        const trip = await (tx as any).trip.create({
          data: {
            tripIdentifier,
            date: new Date(data.dispatchTime),
            ambulanceId: data.ambulanceId,
            patientId: data.patientId && data.patientId.trim() !== "" ? data.patientId : null,
            patientName: data.patientName,
            patientPhone: data.patientPhone?.trim() || null,
            pickupLocation: data.pickupLocation,
            dropoffHospital: data.dropoffHospital,
            startOdometerKm: new Prisma.Decimal(data.startOdometerKm),
            endOdometerKm: data.endOdometerKm ? new Prisma.Decimal(data.endOdometerKm) : null,
            distanceKm: new Prisma.Decimal(data.distanceKm || 0),
            dispatchTime: new Date(data.dispatchTime),
            urgencyLevel: data.urgencyLevel,
            status: data.status === "COMPLETED" ? "COMPLETED" : "DISPATCHED",
            driverName: data.driverName,
            paramedicName: data.paramedicName?.trim() || null,
            notes: data.notes?.trim() || null,
            yearPeriodId: data.yearPeriodId,
            createdById: actorId || null,
          },
        });

        await createAuditEntry(tx, {
          action: "CREATE",
          module: "TRIPS",
          recordId: trip.id,
          userId: actorId,
          metadata: {
            tripIdentifier: trip.tripIdentifier,
            ambulanceId: trip.ambulanceId,
            patientName: trip.patientName,
          },
        });

        return trip;
      });
    },
    async () => {
      const store = readStore();
      const vehicle = store.ambulances.find(
        (a) => a.id === data.ambulanceId || a.ambulanceIdentifier === data.ambulanceId
      );

      if (!vehicle) {
        throw new NotFoundError("AmbulanceVehicle", data.ambulanceId);
      }

      if (vehicle.status !== "AVAILABLE") {
        throw new ConflictError(
          `Ambulance ${vehicle.registrationNumber} is currently ${vehicle.status} and cannot be dispatched.`
        );
      }

      const count = store.trips.length;
      const tripIdentifier = `TRP-${data.yearPeriodId}-${String(count + 1).padStart(6, "0")}`;

      const newTrip = {
        id: `trp-${Date.now()}`,
        tripIdentifier,
        date: data.dispatchTime,
        ambulanceId: vehicle.id,
        patientName: data.patientName,
        patientPhone: data.patientPhone?.trim() || null,
        pickupLocation: data.pickupLocation,
        dropoffHospital: data.dropoffHospital,
        tripType: "Emergency Transfer",
        distanceKm: Number(data.distanceKm || 0),
        startOdometerKm: Number(data.startOdometerKm),
        endOdometerKm: data.endOdometerKm ? Number(data.endOdometerKm) : null,
        dispatchTime: data.dispatchTime,
        status: (data.status as any) || "DISPATCHED",
        urgencyLevel: data.urgencyLevel,
        driverName: data.driverName,
        paramedicName: data.paramedicName?.trim() || null,
        notes: data.notes?.trim() || null,
        yearPeriodId: data.yearPeriodId,
        createdById: actorId || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        const v = s.ambulances.find((a) => a.id === vehicle.id);
        if (v) v.status = "ON_TRIP";
        s.trips.unshift(newTrip);
        s.auditLogs.push({
          id: `aud-${Date.now()}`,
          action: "CREATE",
          module: "TRIPS",
          recordId: newTrip.id,
          userId: actorId,
          timestamp: new Date().toISOString(),
          metadataJson: JSON.stringify({ tripIdentifier }),
        });
      });

      return newTrip;
    }
  );
}

export async function completeTrip(
  id: string,
  data: UpdateTripInput,
  actorId?: string | null
) {
  return tryPrismaOrFallback(
    async () => {
      const trip = await prisma.trip.findUnique({
        where: { id },
        include: { ambulance: true },
      });

      if (!trip || trip.deletedAt) {
        throw new NotFoundError("Trip", id);
      }

      if (trip.status === "COMPLETED") {
        throw new ConflictError("This trip has already been marked as completed.");
      }

      const endOdometer = data.endOdometerKm !== undefined ? Number(data.endOdometerKm) : null;
      const startOdometer = Number(trip.startOdometerKm);

      if (endOdometer !== null && endOdometer < startOdometer) {
        throw new BadRequestError(
          `End odometer reading (${endOdometer} km) cannot be less than start odometer reading (${startOdometer} km).`
        );
      }

      const calculatedDistance =
        endOdometer !== null ? endOdometer - startOdometer : Number(trip.distanceKm);

      return prisma.$transaction(async (tx) => {
        const updatedTrip = await (tx as any).trip.update({
          where: { id },
          data: {
            status: "COMPLETED",
            completedTime: data.returnTime ? new Date(data.returnTime) : new Date(),
            ...(endOdometer !== null
              ? { endOdometerKm: new Prisma.Decimal(endOdometer) }
              : {}),
            distanceKm: new Prisma.Decimal(calculatedDistance),
            ...(data.notes ? { notes: data.notes } : {}),
          },
        });

        await (tx as any).ambulanceVehicle.update({
          where: { id: trip.ambulanceId },
          data: {
            status: "AVAILABLE",
            ...(endOdometer !== null
              ? { currentOdometerKm: new Prisma.Decimal(endOdometer) }
              : {}),
          },
        });

        await createAuditEntry(tx, {
          action: "UPDATE",
          module: "TRIPS",
          recordId: updatedTrip.id,
          userId: actorId,
          metadata: {
            tripIdentifier: updatedTrip.tripIdentifier,
            distanceKm: calculatedDistance,
            status: "COMPLETED",
          },
        });

        return updatedTrip;
      });
    },
    async () => {
      const store = readStore();
      const tripIndex = store.trips.findIndex((t) => t.id === id || t.tripIdentifier === id);
      if (tripIndex === -1) {
        throw new NotFoundError("Trip", id);
      }

      const trip = store.trips[tripIndex];
      const endOdometer = data.endOdometerKm !== undefined ? Number(data.endOdometerKm) : null;
      const startOdometer = Number(trip.startOdometerKm);

      if (endOdometer !== null && endOdometer < startOdometer) {
        throw new BadRequestError(
          `End odometer reading (${endOdometer} km) cannot be less than start odometer reading (${startOdometer} km).`
        );
      }

      const calculatedDistance =
        endOdometer !== null ? endOdometer - startOdometer : Number(trip.distanceKm);

      let updatedTrip: (typeof store.trips)[0];

      updateStore((s) => {
        const current = s.trips[tripIndex];
        updatedTrip = {
          ...current,
          status: "COMPLETED",
          completedTime: data.returnTime || new Date().toISOString(),
          endOdometerKm: endOdometer !== null ? endOdometer : current.endOdometerKm,
          distanceKm: calculatedDistance,
          notes: data.notes || current.notes,
          updatedAt: new Date().toISOString(),
        };
        s.trips[tripIndex] = updatedTrip;

        const vehicle = s.ambulances.find((a) => a.id === current.ambulanceId);
        if (vehicle) {
          vehicle.status = "AVAILABLE";
          if (endOdometer !== null) vehicle.currentOdometerKm = endOdometer;
        }

        s.auditLogs.push({
          id: `aud-${Date.now()}`,
          action: "UPDATE",
          module: "TRIPS",
          recordId: updatedTrip.id,
          userId: actorId,
          timestamp: new Date().toISOString(),
          metadataJson: JSON.stringify({ tripIdentifier: updatedTrip.tripIdentifier, status: "COMPLETED" }),
        });
      });

      return updatedTrip!;
    }
  );
}

export async function getTrips(query: TripQueryInput) {
  return tryPrismaOrFallback(
    async () => {
      const page = query.page || 1;
      const limit = query.limit || 20;
      const skip = (page - 1) * limit;

      const where: Prisma.TripWhereInput = {
        deletedAt: null,
      };

      if (query.yearPeriodId) where.yearPeriodId = query.yearPeriodId;
      if (query.ambulanceId) where.ambulanceId = query.ambulanceId;
      if (query.urgencyLevel) where.urgencyLevel = query.urgencyLevel;
      if (query.status) where.status = query.status as Prisma.EnumTripStatusFilter;
      if (query.search) {
        const term = query.search.trim();
        where.OR = [
          { tripIdentifier: { contains: term, mode: "insensitive" } },
          { patientName: { contains: term, mode: "insensitive" } },
          { driverName: { contains: term, mode: "insensitive" } },
          { pickupLocation: { contains: term, mode: "insensitive" } },
          { dropoffHospital: { contains: term, mode: "insensitive" } },
        ];
      }

      const [total, trips] = await Promise.all([
        prisma.trip.count({ where }),
        prisma.trip.findMany({
          where,
          skip,
          take: limit,
          orderBy: { date: "desc" },
          include: {
            ambulance: {
              select: {
                id: true,
                ambulanceIdentifier: true,
                registrationNumber: true,
                model: true,
              },
            },
          },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        trips,
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
      let items = [...store.trips];

      if (query.yearPeriodId) items = items.filter((t) => t.yearPeriodId === query.yearPeriodId);
      if (query.ambulanceId) items = items.filter((t) => t.ambulanceId === query.ambulanceId);
      if (query.urgencyLevel) items = items.filter((t) => t.urgencyLevel === query.urgencyLevel);
      if (query.status) items = items.filter((t) => t.status === query.status);
      if (query.search) {
        const term = query.search.toLowerCase().trim();
        items = items.filter(
          (t) =>
            t.tripIdentifier.toLowerCase().includes(term) ||
            t.patientName.toLowerCase().includes(term) ||
            t.driverName.toLowerCase().includes(term) ||
            t.pickupLocation.toLowerCase().includes(term) ||
            t.dropoffHospital.toLowerCase().includes(term)
        );
      }

      const page = query.page || 1;
      const limit = query.limit || 20;
      const total = items.length;
      const totalPages = Math.ceil(total / limit);
      const paginated = items.slice((page - 1) * limit, page * limit);

      return {
        trips: paginated,
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
