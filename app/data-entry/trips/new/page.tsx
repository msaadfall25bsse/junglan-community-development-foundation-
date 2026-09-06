"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { FormField, Input, Select, Textarea } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import {
  Route,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

interface AmbulanceOption {
  id: string;
  ambulanceIdentifier: string;
  registrationNumber: string;
  model: string;
  status: string;
}

export default function NewTripPage() {
  const [ambulances, setAmbulances] = useState<AmbulanceOption[]>([]);
  const [formData, setFormData] = useState({
    ambulanceId: "",
    patientCode: "P-4829",
    patientName: "Emergency Patient P-4829",
    emergencyType: "Maternity Care",
    pickupLocation: "",
    destinationHospital: "DHQ Hospital Mansehra",
    driver: "M. Tariq Khan",
    driverPhone: "03001234567",
    odometerStart: "",
    odometerEnd: "",
    attendantNotes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("/api/ambulances")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setAmbulances(data.data);
          if (data.data.length > 0) {
            setFormData((prev) => ({
              ...prev,
              ambulanceId: prev.ambulanceId || data.data[0].id,
            }));
          }
        }
      })
      .catch((err) => console.error("Error fetching ambulances:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    let urgencyLevel: "ROUTINE" | "URGENT" | "CRITICAL" = "ROUTINE";
    if (formData.emergencyType.includes("Accident") || formData.emergencyType.includes("Critical")) {
      urgencyLevel = "CRITICAL";
    } else if (formData.emergencyType.includes("Maternity") || formData.emergencyType.includes("Cardiac")) {
      urgencyLevel = "URGENT";
    }

    const startKm = Number(formData.odometerStart) || 0;
    const endKm = formData.odometerEnd ? Number(formData.odometerEnd) : undefined;
    const distKm = endKm && endKm >= startKm ? endKm - startKm : 0;

    const payload = {
      ambulanceId: formData.ambulanceId || (ambulances[0]?.id ?? "amb-01"),
      driverName: formData.driver.trim() || "M. Tariq Khan",
      driverPhone: formData.driverPhone.trim() || "03001234567",
      patientName: formData.patientName.trim() || formData.patientCode,
      pickupLocation: formData.pickupLocation.trim(),
      dropoffHospital: formData.destinationHospital.trim(),
      startOdometerKm: startKm,
      endOdometerKm: endKm,
      distanceKm: distKm,
      dispatchTime: new Date().toISOString(),
      urgencyLevel,
      status: endKm ? "COMPLETED" : "DISPATCHED",
      notes: formData.attendantNotes.trim() || undefined,
      yearPeriodId: "YP-2026",
    };

    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to dispatch ambulance.");
      }
      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      ambulanceId: ambulances[0]?.id || "",
      patientCode: `P-${Date.now().toString().slice(-4)}`,
      patientName: `Emergency Patient P-${Date.now().toString().slice(-4)}`,
      emergencyType: "Maternity Care",
      pickupLocation: "",
      destinationHospital: "DHQ Hospital Mansehra",
      driver: "M. Tariq Khan",
      driverPhone: "03001234567",
      odometerStart: "",
      odometerEnd: "",
      attendantNotes: "",
    });
    setIsSuccess(false);
    setErrorMessage("");
  };

  return (
    <DashboardLayout
      role="DATA_ENTRY"
      pageTitle="Log Emergency Trip Dispatch"
      pageSubtitle="Record official patient ambulance transport for operational log and audit reconciliation."
      breadcrumbs={[
        { label: "Operations Desk", href: "/data-entry" },
        { label: "New Trip Dispatch" },
      ]}
      actions={
        <Button
          href="/data-entry"
          variant="outline"
          size="sm"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back to Desk
        </Button>
      }
    >
      <div className="max-w-3xl mx-auto">
        {isSuccess ? (
          <div className="p-8 rounded-2xl bg-white border border-emerald-200 shadow-sm text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Trip Dispatch Logged Successfully!
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Entry recorded under Patient Reference Code{" "}
              <strong className="text-slate-900 font-mono">
                {formData.patientCode}
              </strong>
              . This transport is archived for operational review and audit reporting.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                href="/data-entry"
              >
                Return to Desk
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleReset}
              >
                Log Another Trip
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6"
          >
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-xs text-red-800">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 flex items-center gap-2.5 text-xs text-sky-900">
              <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0" />
              <span>
                <strong>Confidentiality Assurance:</strong> Patient identities are designated via anonymous internal codes to safeguard dignity and medical privacy per Al-Khidmat ethics.
              </span>
            </div>

            {/* Section 1: Dispatch Core Info */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                1. Case Identification
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Assigned Patient Code" helpText="System-generated identifier">
                  <Input
                    type="text"
                    disabled
                    value={formData.patientCode}
                    className="bg-slate-50 font-mono font-bold"
                  />
                </FormField>

                <FormField label="Emergency Classification" required>
                  <Select
                    value={formData.emergencyType}
                    onChange={(e) =>
                      setFormData({ ...formData, emergencyType: e.target.value })
                    }
                  >
                    <option value="Maternity Care">Maternity Care / Ob-Gyn Emergency</option>
                    <option value="Accident & Trauma">Accident & Trauma Emergency</option>
                    <option value="Elderly / Cardiac">Elderly / Cardiac Urgent Transfer</option>
                    <option value="Pediatric Referral">Pediatric Medical Referral</option>
                    <option value="General Critical">General Critical Patient Transfer</option>
                  </Select>
                </FormField>
              </div>
            </div>

            {/* Section 2: Route & Destination */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                2. Route & Transit Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Pickup Location / Village"
                  required
                  helpText="Specify village hamlet or landmark"
                >
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Upper Junglan Hamlet"
                    value={formData.pickupLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, pickupLocation: e.target.value })
                    }
                  />
                </FormField>

                <FormField label="Receiving Medical Center" required>
                  <Select
                    value={formData.destinationHospital}
                    onChange={(e) =>
                      setFormData({ ...formData, destinationHospital: e.target.value })
                    }
                  >
                    <option value="DHQ Hospital Mansehra">DHQ Hospital Mansehra</option>
                    <option value="King Abdullah Teaching Hospital">
                      King Abdullah Teaching Hospital Mansehra
                    </option>
                    <option value="Ayub Medical Complex Abbottabad">
                      Ayub Medical Complex Abbottabad (Tertiary Referral)
                    </option>
                    <option value="RHC Oghi">Rural Health Center (RHC) Oghi</option>
                  </Select>
                </FormField>
              </div>
            </div>

            {/* Section 3: Vehicle & Mileage */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                3. Vehicle Deployment & Mileage
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <FormField label="Assigned Ambulance" required>
                  <Select
                    value={formData.ambulanceId}
                    onChange={(e) =>
                      setFormData({ ...formData, ambulanceId: e.target.value })
                    }
                  >
                    {ambulances.length === 0 ? (
                      <option value="amb-01">AMB-01 (Toyota Hilux 4x4)</option>
                    ) : (
                      ambulances.map((amb) => (
                        <option key={amb.id} value={amb.id}>
                          {amb.ambulanceIdentifier} ({amb.model}) — {amb.status}
                        </option>
                      ))
                    )}
                  </Select>
                </FormField>

                <FormField label="Driver on Shift" required>
                  <Input
                    type="text"
                    required
                    value={formData.driver}
                    onChange={(e) =>
                      setFormData({ ...formData, driver: e.target.value })
                    }
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Starting Odometer (km)"
                  required
                  helpText="Meter reading at departure"
                >
                  <Input
                    type="number"
                    required
                    placeholder="e.g. 42850"
                    value={formData.odometerStart}
                    onChange={(e) =>
                      setFormData({ ...formData, odometerStart: e.target.value })
                    }
                  />
                </FormField>

                <FormField
                  label="Ending Odometer (km)"
                  required
                  helpText="Meter reading at return to base"
                >
                  <Input
                    type="number"
                    required
                    placeholder="e.g. 42918"
                    value={formData.odometerEnd}
                    onChange={(e) =>
                      setFormData({ ...formData, odometerEnd: e.target.value })
                    }
                  />
                </FormField>
              </div>
            </div>

            {/* Section 4: Operational Field Notes */}
            <div className="pt-4 border-t border-slate-100">
              <FormField
                label="Operational Field Notes"
                helpText="Mention oxygen used, weather/road conditions, or hand-over notes."
              >
                <Textarea
                  rows={3}
                  placeholder="e.g. Patient transferred safely to emergency triage. Oxygen administered during transit."
                  value={formData.attendantNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, attendantNotes: e.target.value })
                  }
                />
              </FormField>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="md"
                href="/data-entry"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                leftIcon={<Route className="w-4 h-4" />}
              >
                Submit Trip Entry
              </Button>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}
