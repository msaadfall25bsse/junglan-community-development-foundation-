// ==============================================================================
// 2. HEALTHCARE, AMBULANCE & OPERATIONAL DOMAIN TYPES
// ==============================================================================

export type TripType = "EMERGENCY" | "MATERNAL" | "CRITICAL_TRANSFER" | "ROUTINE_AID";
export type TripStatus = "DISPATCHED" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED";
export type AmbulanceStatus = "AVAILABLE" | "ON_MISSION" | "MAINTENANCE" | "OUT_OF_SERVICE";

export interface Patient {
  id: string;
  fullName: string;
  age?: number;
  gender?: "MALE" | "FEMALE" | "OTHER";
  contactNumber?: string;
  villageOrLocation: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ambulance {
  id: string;
  plateNumber: string;
  model: string;
  yearOfManufacture: number;
  status: AmbulanceStatus;
  primaryDriverName?: string;
  primaryDriverPhone?: string;
  fuelCapacityLiters: number;
  currentOdometerKm: number;
  conditionNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: string;
  tripCode: string;
  date: string;
  ambulanceId: string;
  patientId?: string;
  pickupLocation: string;
  destinationHospital: string;
  tripType: TripType;
  distanceKm: number;
  status: TripStatus;
  dispatchTime: string;
  arrivalTime?: string;
  notes?: string;
  yearPeriod: string; // e.g. "2026"
  recordedByUserId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FuelRecord {
  id: string;
  ambulanceId: string;
  date: string;
  liters: number;
  totalCost: number;
  fuelType: "DIESEL" | "PETROL" | "OCTANE";
  odometerReadingKm: number;
  receiptNumber?: string;
  receiptDocUrl?: string;
  yearPeriod: string;
  recordedByUserId: string;
  notes?: string;
  createdAt: string;
}

export interface MaintenanceRecord {
  id: string;
  ambulanceId: string;
  date: string;
  maintenanceType: "ROUTINE_SERVICE" | "TIRE_REPLACEMENT" | "ENGINE_REPAIR" | "ELECTRICAL" | "OTHER";
  description: string;
  cost: number;
  serviceCenterName?: string;
  receiptNumber?: string;
  receiptDocUrl?: string;
  yearPeriod: string;
  recordedByUserId: string;
  createdAt: string;
}
