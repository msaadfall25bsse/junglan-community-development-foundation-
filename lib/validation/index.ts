// ==============================================================================
// CENTRAL VALIDATION EXPORT HUB
// ==============================================================================

export * from "./common";
export * from "./patient";
export * from "./ambulance";
export * from "./finance";
export * from "./project";
export * from "./cms";
export * from "./year-period";
export * from "./auth";
export * from "./audit";
export * from "./middleware";

// Backward compatibility alias for legacy schemas.ts imports
export {
  donationInputSchema,
  type DonationInput,
  patientIntakeSchema,
  type PatientIntakeInput,
  tripLogSchema,
  type TripLogInput,
  expenseSchema,
  type ExpenseInput,
} from "./schemas";
