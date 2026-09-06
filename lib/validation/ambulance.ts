import { z } from "zod";
import {
  paginationQuerySchema,
  pakistaniPhoneSchema,
  positiveDecimalSchema,
  nonNegativeDecimalSchema,
} from "./common";

// ==============================================================================
// AMBULANCE VEHICLE SCHEMAS
// ==============================================================================

export const createAmbulanceSchema = z.object({
  vehicleNumber: z
    .string()
    .trim()
    .min(2, "Vehicle number/plate is required")
    .max(30),
  make: z.string().trim().min(2).max(50),
  model: z.string().trim().min(2).max(50),
  yearOfManufacture: z
    .coerce
    .number()
    .int()
    .min(1990)
    .max(new Date().getFullYear() + 1),
  status: z
    .enum(["AVAILABLE", "ON_MISSION", "MAINTENANCE", "OUT_OF_SERVICE"])
    .default("AVAILABLE"),
  baseLocation: z.string().trim().min(2).max(150),
  currentOdometerKm: nonNegativeDecimalSchema.default(0),
  equipmentList: z.array(z.string()).optional().default([]),
});

export type CreateAmbulanceInput = z.infer<typeof createAmbulanceSchema>;
export const updateAmbulanceSchema = createAmbulanceSchema.partial();
export type UpdateAmbulanceInput = z.infer<typeof updateAmbulanceSchema>;

// ==============================================================================
// TRIP LOG SCHEMAS
// ==============================================================================

export const createTripSchema = z.object({
  ambulanceId: z.string().min(1, "Ambulance selection is required"),
  driverName: z.string().trim().min(2, "Driver name is required").max(100),
  driverPhone: pakistaniPhoneSchema,
  paramedicName: z.string().trim().max(100).optional().or(z.literal("")),
  patientId: z.string().trim().optional().or(z.literal("")),
  patientName: z.string().trim().min(2, "Patient name is required").max(100),
  patientPhone: pakistaniPhoneSchema.optional().or(z.literal("")),
  pickupLocation: z.string().trim().min(2, "Pickup location is required").max(200),
  dropoffHospital: z.string().trim().min(2, "Dropoff hospital is required").max(200),
  startOdometerKm: nonNegativeDecimalSchema,
  endOdometerKm: nonNegativeDecimalSchema.optional(),
  distanceKm: nonNegativeDecimalSchema.default(0),
  dispatchTime: z.string().min(1, "Dispatch timestamp is required"),
  returnTime: z.string().optional().or(z.literal("")),
  urgencyLevel: z.enum(["ROUTINE", "URGENT", "CRITICAL"]),
  status: z
    .enum(["DISPATCHED", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
    .default("DISPATCHED"),
  tripCostPKR: nonNegativeDecimalSchema.default(0),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  yearPeriodId: z.string().min(1, "Year period is required"),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
export const updateTripSchema = createTripSchema.partial();
export type UpdateTripInput = z.infer<typeof updateTripSchema>;

export const tripQuerySchema = paginationQuerySchema.extend({
  ambulanceId: z.string().trim().optional(),
  urgencyLevel: z.enum(["ROUTINE", "URGENT", "CRITICAL"]).optional(),
  status: z.enum(["DISPATCHED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
});

export type TripQueryInput = z.infer<typeof tripQuerySchema>;

// ==============================================================================
// FUEL LOG SCHEMAS
// ==============================================================================

export const createFuelLogSchema = z.object({
  ambulanceId: z.string().min(1, "Ambulance selection is required"),
  fuelDate: z.string().min(1, "Fuel date is required"),
  quantityLiters: positiveDecimalSchema,
  pricePerLiter: positiveDecimalSchema,
  totalCostPKR: positiveDecimalSchema,
  odometerReading: nonNegativeDecimalSchema,
  fuelStation: z.string().trim().min(2, "Fuel station is required").max(150),
  receiptNumber: z.string().trim().max(100).optional().or(z.literal("")),
  yearPeriodId: z.string().min(1, "Year period is required"),
});

export type CreateFuelLogInput = z.infer<typeof createFuelLogSchema>;

export const fuelLogQuerySchema = paginationQuerySchema.extend({
  ambulanceId: z.string().trim().optional(),
});

// ==============================================================================
// MAINTENANCE LOG SCHEMAS
// ==============================================================================

export const createMaintenanceLogSchema = z.object({
  ambulanceId: z.string().min(1, "Ambulance selection is required"),
  maintenanceDate: z.string().min(1, "Maintenance date is required"),
  serviceType: z.enum([
    "SCHEDULED_SERVICE",
    "OIL_CHANGE",
    "TIRE_REPLACEMENT",
    "BRAKE_REPAIR",
    "ENGINE_OVERHAUL",
    "ELECTRICAL",
    "INSPECTION",
    "OTHER",
  ]),
  description: z.string().trim().min(3, "Description is required").max(500),
  workshopName: z.string().trim().min(2, "Workshop name is required").max(150),
  costPKR: nonNegativeDecimalSchema,
  odometerReading: nonNegativeDecimalSchema,
  invoiceNumber: z.string().trim().max(100).optional().or(z.literal("")),
  yearPeriodId: z.string().min(1, "Year period is required"),
});

export type CreateMaintenanceLogInput = z.infer<typeof createMaintenanceLogSchema>;

export const maintenanceLogQuerySchema = paginationQuerySchema.extend({
  ambulanceId: z.string().trim().optional(),
  serviceType: z
    .enum([
      "SCHEDULED_SERVICE",
      "OIL_CHANGE",
      "TIRE_REPLACEMENT",
      "BRAKE_REPAIR",
      "ENGINE_OVERHAUL",
      "ELECTRICAL",
      "INSPECTION",
      "OTHER",
    ])
    .optional(),
});
