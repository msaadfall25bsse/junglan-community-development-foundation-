// ==============================================================================
// AMBULANCE & FLEET DOMAIN TYPES
// ==============================================================================

export type VehicleStatus = "AVAILABLE" | "ON_TRIP" | "MAINTENANCE" | "OUT_OF_SERVICE";

export interface AmbulanceVehicle {
  id: string; // e.g. "AMB-01"
  registrationNumber: string; // e.g. "ICT-LE-482"
  model: string; // e.g. "Toyota HiAce High Roof Emergency Response"
  year: number;
  status: VehicleStatus;
  currentOdometerKm: number;
  assignedDriverId?: string;
  equipmentChecklist: {
    hasOxygenCylinder: boolean;
    hasFirstAidKit: boolean;
    hasStretcher: boolean;
    hasDefibrillator: boolean;
    hasSuctionUnit: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export type TripStatus = "SCHEDULED" | "DISPATCHED" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED";

export interface TripRecord {
  id: string; // e.g. "TRP-2026-000001"
  ambulanceId: string;
  driverName: string;
  paramedicName?: string;
  patientId?: string;
  patientName: string;
  patientPhone?: string;
  pickupLocation: string;
  dropoffHospital: string;
  distanceKm: number;
  startOdometerKm: number;
  endOdometerKm?: number;
  dispatchTime: string;
  completedTime?: string;
  tripStatus: TripStatus;
  urgencyLevel: "ROUTINE" | "URGENT" | "CRITICAL";
  notes?: string;
  yearPeriodId: string; // e.g. "2026"
  createdAt: string;
  updatedAt: string;
}

export interface PatientRecord {
  id: string; // e.g. "PAT-2026-000001"
  fullName: string;
  cnicOrBForm?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  age: number;
  contactNumber: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  residenceArea: string;
  medicalConditionSummary: string;
  firstEncounterDate: string;
  totalTripsCount: number;
  isFlaggedForReview?: boolean;
  flagReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FuelLog {
  id: string; // e.g. "FUEL-2026-000001"
  ambulanceId: string;
  liters: number;
  pricePerLiterPKR: number;
  totalCostPKR: number;
  odometerReadingKm: number;
  fuelStationName: string;
  receiptNumber?: string;
  loggedByUserId: string;
  yearPeriodId: string; // e.g. "2026"
  createdAt: string;
}

export interface MaintenanceLog {
  id: string; // e.g. "MNT-2026-000001"
  ambulanceId: string;
  serviceType: "OIL_CHANGE" | "TIRE_REPLACEMENT" | "BRAKE_SERVICE" | "ENGINE_REPAIR" | "PERIODIC_INSPECTION" | "OTHER";
  description: string;
  costPKR: number;
  workshopName: string;
  odometerReadingKm: number;
  invoiceNumber?: string;
  performedDate: string;
  yearPeriodId: string;
  createdAt: string;
}
