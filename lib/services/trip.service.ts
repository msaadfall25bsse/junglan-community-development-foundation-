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

// Re-export all ambulance fleet operations
export * from "./ambulance.service";

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
        patientId: data.patientId && data.patientId.trim() !== "" ? data.patientId : null,
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

export async function getTripById(idOrIdentifier: string) {
  return tryPrismaOrFallback(
    async () => {
      const trip = await prisma.trip.findFirst({
        where: {
          OR: [
            { id: idOrIdentifier },
            { tripIdentifier: idOrIdentifier },
          ],
        },
        include: {
          ambulance: true,
          patient: true,
          yearPeriod: true,
        },
      });

      if (!trip) {
        throw new NotFoundError("Trip", idOrIdentifier);
      }

      return trip;
    },
    async () => {
      const store = readStore();
      const trip = (store.trips || []).find(
        (t) => t.id === idOrIdentifier || t.tripIdentifier === idOrIdentifier
      );

      if (!trip) {
        throw new NotFoundError("Trip", idOrIdentifier);
      }

      const ambulance = (store.ambulances || []).find(
        (a) => a.id === trip.ambulanceId || a.ambulanceIdentifier === trip.ambulanceId
      );
      const patient = (store.patients || []).find((p) => p.id === (trip as any).patientId);
      const yearPeriod = (store.yearPeriods || []).find((yp) => yp.id === trip.yearPeriodId);

      return {
        ...trip,
        ambulance: ambulance || null,
        patient: patient || null,
        yearPeriod: yearPeriod || null,
      };
    }
  );
}

export async function updateTrip(
  id: string,
  data: UpdateTripInput,
  actorId?: string | null
) {
  return tryPrismaOrFallback(
    async () => {
      const trip = await prisma.trip.findUnique({
        where: { id },
      });

      if (!trip) {
        throw new NotFoundError("Trip", id);
      }

      const updateData: Prisma.TripUpdateInput = {};
      if (data.patientName) updateData.patientName = data.patientName;
      if (data.patientPhone !== undefined) updateData.patientPhone = data.patientPhone || null;
      if (data.pickupLocation) updateData.pickupLocation = data.pickupLocation;
      if (data.dropoffHospital) updateData.dropoffHospital = data.dropoffHospital;
      if (data.driverName) updateData.driverName = data.driverName;
      if (data.paramedicName !== undefined) updateData.paramedicName = data.paramedicName || null;
      if (data.urgencyLevel) updateData.urgencyLevel = data.urgencyLevel;
      if (data.status) updateData.status = data.status as any;
      if (data.notes !== undefined) updateData.notes = data.notes || null;

      return prisma.$transaction(async (tx) => {
        const updated = await tx.trip.update({
          where: { id },
          data: updateData,
        });

        await createAuditEntry(tx, {
          action: "UPDATE",
          module: "TRIPS",
          recordId: updated.id,
          userId: actorId,
          metadata: {
            tripIdentifier: updated.tripIdentifier,
            notes: "Trip details updated",
          },
        });

        return updated;
      });
    },
    async () => {
      const store = readStore();
      const idx = (store.trips || []).findIndex(
        (t) => t.id === id || t.tripIdentifier === id
      );

      if (idx === -1) {
        throw new NotFoundError("Trip", id);
      }

      const current = store.trips[idx];
      const updated = {
        ...current,
        patientName: data.patientName || current.patientName,
        patientPhone:
          data.patientPhone !== undefined ? data.patientPhone || null : current.patientPhone,
        pickupLocation: data.pickupLocation || current.pickupLocation,
        dropoffHospital: data.dropoffHospital || current.dropoffHospital,
        driverName: data.driverName || current.driverName,
        paramedicName:
          data.paramedicName !== undefined ? data.paramedicName || null : current.paramedicName,
        urgencyLevel: data.urgencyLevel || current.urgencyLevel,
        status: (data.status as any) || current.status,
        notes: data.notes !== undefined ? data.notes || null : current.notes,
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        s.trips[idx] = updated;
        s.auditLogs.push({
          id: `aud-${Date.now()}`,
          action: "UPDATE",
          module: "TRIPS",
          recordId: updated.id,
          userId: actorId,
          timestamp: new Date().toISOString(),
          metadataJson: JSON.stringify({
            tripIdentifier: updated.tripIdentifier,
            action: "UPDATE_TRIP",
          }),
        });
      });

      return updated;
    }
  );
}

export async function archiveTrip(id: string, actorId?: string | null) {
  return tryPrismaOrFallback(
    async () => {
      const trip = await prisma.trip.findUnique({
        where: { id },
      });

      if (!trip) {
        throw new NotFoundError("Trip", id);
      }

      return prisma.$transaction(async (tx) => {
        const archived = await tx.trip.update({
          where: { id },
          data: {
            isArchived: true,
            deletedAt: new Date(),
            status: "CANCELLED",
          },
        });

        // If trip was active, restore ambulance status to AVAILABLE
        if (trip.status === "DISPATCHED" || trip.status === "IN_TRANSIT") {
          await tx.ambulanceVehicle.update({
            where: { id: trip.ambulanceId },
            data: { status: "AVAILABLE" },
          });
        }

        await createAuditEntry(tx, {
          action: "ARCHIVE",
          module: "TRIPS",
          recordId: archived.id,
          userId: actorId,
          metadata: {
            tripIdentifier: archived.tripIdentifier,
            reason: "Trip cancelled and archived",
          },
        });

        return archived;
      });
    },
    async () => {
      const store = readStore();
      const idx = (store.trips || []).findIndex(
        (t) => t.id === id || t.tripIdentifier === id
      );

      if (idx === -1) {
        throw new NotFoundError("Trip", id);
      }

      const trip = store.trips[idx];
      const archived = {
        ...trip,
        isArchived: true,
        deletedAt: new Date().toISOString(),
        status: "CANCELLED" as const,
        updatedAt: new Date().toISOString(),
      };

      updateStore((s) => {
        s.trips[idx] = archived;

        // If ambulance was ON_TRIP for this trip, restore to AVAILABLE
        if (trip.status === "DISPATCHED" || trip.status === "IN_TRANSIT") {
          const amb = (s.ambulances || []).find(
            (a) => a.id === trip.ambulanceId || a.ambulanceIdentifier === trip.ambulanceId
          );
          if (amb && amb.status === "ON_TRIP") {
            amb.status = "AVAILABLE";
          }
        }

        s.auditLogs.push({
          id: `aud-${Date.now()}`,
          action: "ARCHIVE",
          module: "TRIPS",
          recordId: archived.id,
          userId: actorId,
          timestamp: new Date().toISOString(),
          metadataJson: JSON.stringify({
            tripIdentifier: archived.tripIdentifier,
            action: "ARCHIVE_TRIP",
          }),
        });
      });

      return archived;
    }
  );
}

