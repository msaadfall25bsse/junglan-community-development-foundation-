import { prisma } from "@/lib/prisma";
import { NotFoundError, ConflictError, BadRequestError } from "@/lib/api/errors";
import { assertYearPeriodActive } from "./year-period.service";
import { createAuditEntry } from "./audit.service";
import { Prisma } from "@prisma/client";
import type {
  CreateTripInput,
  UpdateTripInput,
  TripQueryInput,
} from "@/lib/validation";

// ==============================================================================
// AMBULANCE TRIP SERVICE
// ==============================================================================
// Section 18 & 19: Mission dispatch lifecycle, vehicle odometer and availability atomicity.

async function generateTripIdentifier(yearPeriodId: string): Promise<string> {
  const count = await prisma.trip.count({
    where: { yearPeriodId },
  });
  const padded = String(count + 1).padStart(6, "0");
  return `TRP-${yearPeriodId}-${padded}`;
}

/**
 * Dispatches an ambulance on a mission:
 * Atomically creates Trip and marks AmbulanceVehicle as ON_TRIP.
 */
export async function createTrip(
  data: CreateTripInput,
  actorId?: string | null
) {
  // 1. Verify active fiscal year period
  await assertYearPeriodActive(data.yearPeriodId);

  // 2. Verify ambulance existence & status
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

  // 3. Generate trip identifier
  const tripIdentifier = await generateTripIdentifier(data.yearPeriodId);

  // 4. Atomic Transaction: Trip Creation + Vehicle Status Update + Audit Trail
  return prisma.$transaction(async (tx) => {
    // A. Update vehicle status to ON_TRIP
    await tx.ambulanceVehicle.update({
      where: { id: data.ambulanceId },
      data: { status: "ON_TRIP" },
    });

    // B. Create Trip record
    const trip = await tx.trip.create({
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

    // C. Write immutable audit log
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
}

/**
 * Completes an active trip:
 * Atomically marks Trip as COMPLETED, calculates distance, updates vehicle current odometer,
 * and sets vehicle status back to AVAILABLE.
 */
export async function completeTrip(
  id: string,
  data: UpdateTripInput,
  actorId?: string | null
) {
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
    // A. Update Trip
    const updatedTrip = await tx.trip.update({
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

    // B. Update Vehicle: reset status to AVAILABLE and advance current odometer
    await tx.ambulanceVehicle.update({
      where: { id: trip.ambulanceId },
      data: {
        status: "AVAILABLE",
        ...(endOdometer !== null
          ? { currentOdometerKm: new Prisma.Decimal(endOdometer) }
          : {}),
      },
    });

    // C. Write audit log
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
}

/**
 * Paginated list of trips with vehicle and patient details
 */
export async function getTrips(query: TripQueryInput) {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  const where: Prisma.TripWhereInput = {
    deletedAt: null,
  };

  if (query.yearPeriodId) {
    where.yearPeriodId = query.yearPeriodId;
  }
  if (query.ambulanceId) {
    where.ambulanceId = query.ambulanceId;
  }
  if (query.urgencyLevel) {
    where.urgencyLevel = query.urgencyLevel;
  }
  if (query.status) {
    where.status = query.status as Prisma.EnumTripStatusFilter;
  }
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
        patient: {
          select: {
            id: true,
            patientIdentifier: true,
            fullName: true,
            contactNumber: true,
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
}
