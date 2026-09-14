"use client";

import React, { useState, useEffect, use } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import {
  ArrowLeft,
  Truck,
  User,
  MapPin,
  Clock,
  Gauge,
  HeartPulse,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Edit2,
  Trash2,
  Calendar,
  Building2,
  FileText,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TripDetail {
  id: string;
  tripIdentifier: string;
  date: string;
  ambulanceId: string;
  patientId?: string | null;
  patientName: string;
  patientPhone?: string | null;
  pickupLocation: string;
  dropoffHospital: string;
  tripType: string;
  distanceKm: number;
  startOdometerKm: number;
  endOdometerKm?: number | null;
  dispatchTime: string;
  completedTime?: string | null;
  status: "DISPATCHED" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED";
  urgencyLevel: "ROUTINE" | "URGENT" | "CRITICAL";
  driverName: string;
  paramedicName?: string | null;
  notes?: string | null;
  yearPeriodId: string;
  isArchived?: boolean;
  createdAt: string;
  updatedAt: string;
  ambulance?: {
    id: string;
    ambulanceIdentifier: string;
    registrationNumber: string;
    model: string;
    status: string;
    currentOdometerKm: number;
  };
  patient?: {
    id: string;
    patientIdentifier: string;
    fullName: string;
    contactNumber: string;
    residenceArea?: string;
  };
}

export default function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Complete Modal State
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [endOdometer, setEndOdometer] = useState<number>(0);
  const [completeNotes, setCompleteNotes] = useState<string>("");
  const [saving, setSaving] = useState(false);

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    patientName: "",
    patientPhone: "",
    pickupLocation: "",
    dropoffHospital: "",
    driverName: "",
    paramedicName: "",
    urgencyLevel: "URGENT" as "ROUTINE" | "URGENT" | "CRITICAL",
    notes: "",
  });

  // Archive Modal State
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [archiving, setArchiving] = useState(false);

  const fetchTrip = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/trips/${id}`);
      const json = await res.json();
      if (json.success && json.data) {
        setTrip(json.data);
        setEndOdometer(
          json.data.endOdometerKm
            ? Number(json.data.endOdometerKm)
            : Number(json.data.startOdometerKm) + 25
        );
        setCompleteNotes(json.data.notes || "Patient delivered safely to hospital emergency ward.");
        setEditForm({
          patientName: json.data.patientName,
          patientPhone: json.data.patientPhone || "",
          pickupLocation: json.data.pickupLocation,
          dropoffHospital: json.data.dropoffHospital,
          driverName: json.data.driverName,
          paramedicName: json.data.paramedicName || "",
          urgencyLevel: json.data.urgencyLevel,
          notes: json.data.notes || "",
        });
      }
    } catch (err) {
      console.error("Failed to fetch trip:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, [id]);

  // Complete Mission
  const handleCompleteTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trip) return;
    if (endOdometer < Number(trip.startOdometerKm)) {
      alert("End odometer cannot be less than start odometer reading.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/trips/${trip.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endOdometerKm: endOdometer,
          returnTime: new Date().toISOString(),
          notes: completeNotes,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Emergency Mission ${trip.tripIdentifier} completed! Distance: ${endOdometer - Number(trip.startOdometerKm)} km.`);
        fetchTrip();
        setCompleteModalOpen(false);
      } else {
        alert(json.error?.message || "Failed to complete trip");
      }
    } catch (err) {
      console.error("Complete error:", err);
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Edit Mission
  const handleEditTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trip) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/trips/${trip.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Trip ${trip.tripIdentifier} updated successfully!`);
        fetchTrip();
        setEditModalOpen(false);
      } else {
        alert(json.error?.message || "Failed to update trip");
      }
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Archive Mission
  const handleArchiveTrip = async () => {
    if (!trip) return;
    setArchiving(true);
    try {
      const res = await fetch(`/api/trips/${trip.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Mission ${trip.tripIdentifier} cancelled and archived safely.`);
        fetchTrip();
        setArchiveModalOpen(false);
      } else {
        alert(json.error?.message || "Failed to archive trip");
      }
    } catch (err) {
      console.error("Archive error:", err);
    } finally {
      setArchiving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        role="ADMIN"
        pageTitle="Loading Emergency Mission..."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Emergency Trips", href: "/admin/trips" },
          { label: "Loading..." },
        ]}
      >
        <div className="p-12 text-center text-slate-500">Loading mission dossier...</div>
      </DashboardLayout>
    );
  }

  if (!trip) {
    return (
      <DashboardLayout
        role="ADMIN"
        pageTitle="Trip Not Found"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Emergency Trips", href: "/admin/trips" },
          { label: "Not Found" },
        ]}
      >
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center">
          <p className="text-slate-600 mb-4">The requested ambulance mission could not be found.</p>
          <Button href="/admin/trips" variant="primary">
            Back to Trips Registry
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const durationMinutes =
    trip.completedTime && trip.dispatchTime
      ? Math.round(
          (new Date(trip.completedTime).getTime() - new Date(trip.dispatchTime).getTime()) /
            (1000 * 60)
        )
      : null;

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle={`Mission Dossier: ${trip.tripIdentifier}`}
      pageSubtitle="Official record of emergency patient transit, vehicle telemetry, route details, and hospital handover."
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Emergency Trips", href: "/admin/trips" },
        { label: trip.tripIdentifier },
      ]}
      actions={
        <div className="flex gap-2">
          <Button
            href="/admin/trips"
            variant="outline"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Trips
          </Button>
          {(trip.status === "DISPATCHED" || trip.status === "IN_TRANSIT") && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setCompleteModalOpen(true)}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Complete Mission
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditModalOpen(true)}
            leftIcon={<Edit2 className="w-4 h-4" />}
          >
            Edit Mission
          </Button>
          {trip.status !== "CANCELLED" && (
            <Button
              variant="emergency"
              size="sm"
              onClick={() => setArchiveModalOpen(true)}
              leftIcon={<Trash2 className="w-4 h-4" />}
            >
              Cancel Mission
            </Button>
          )}
        </div>
      }
    >
      {feedback && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium">{feedback}</span>
        </div>
      )}

      {/* Header Status Strip */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 font-mono">
                {trip.tripIdentifier}
              </h2>
              <Badge
                variant={
                  trip.urgencyLevel === "CRITICAL"
                    ? "danger"
                    : trip.urgencyLevel === "URGENT"
                    ? "warning"
                    : "neutral"
                }
              >
                {trip.urgencyLevel}
              </Badge>
              <Badge
                variant={
                  trip.status === "COMPLETED"
                    ? "success"
                    : trip.status === "DISPATCHED" || trip.status === "IN_TRANSIT"
                    ? "sky"
                    : "neutral"
                }
              >
                {trip.status}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Dispatched on{" "}
              {new Date(trip.dispatchTime).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">Total Distance</span>
            <span className="text-lg font-bold text-slate-900 font-mono">
              {trip.status === "COMPLETED" ? `${trip.distanceKm} km` : "In Transit"}
            </span>
          </div>
          {durationMinutes !== null && (
            <div className="text-right">
              <span className="text-xs text-slate-500 uppercase tracking-wider block">Duration</span>
              <span className="text-lg font-bold text-emerald-700 font-mono">
                {durationMinutes} mins
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Patient & Clinical Handover */}
        <div className="space-y-6">
          {/* Patient Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" />
                Patient Dossier
              </h3>
              {trip.patientId && (
                <Link
                  href={`/admin/patients/${trip.patientId}`}
                  className="text-xs font-semibold text-emerald-700 hover:underline"
                >
                  View Full Profile →
                </Link>
              )}
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-slate-500 block">Patient Name</span>
                <span className="font-semibold text-slate-900">{trip.patientName}</span>
              </div>
              {trip.patientPhone && (
                <div>
                  <span className="text-xs text-slate-500 block">Contact Phone</span>
                  <span className="font-mono text-slate-800">{trip.patientPhone}</span>
                </div>
              )}
              {trip.patient?.residenceArea && (
                <div>
                  <span className="text-xs text-slate-500 block">Residence Area</span>
                  <span className="text-slate-800">{trip.patient.residenceArea}</span>
                </div>
              )}
              <div>
                <span className="text-xs text-slate-500 block">Registration Link</span>
                {trip.patientId ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Registry Patient ({trip.patient?.patientIdentifier})
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 italic">Ad-hoc Emergency Patient</span>
                )}
              </div>
            </div>
          </div>

          {/* Clinical & Transit Notes */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
              <FileText className="w-4 h-4 text-emerald-600" />
              Transit & Clinical Notes
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 min-h-[80px]">
              {trip.notes || "No special clinical observations noted for this emergency transit."}
            </p>
          </div>
        </div>

        {/* Middle Column: Route & Hospital Handover */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <MapPin className="w-4 h-4 text-rose-500" />
              Route Logistics & Timing
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  A
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Pickup Location</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {trip.pickupLocation}
                  </span>
                </div>
              </div>

              <div className="w-0.5 h-6 bg-slate-200 ml-3" />

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  B
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Destination Hospital</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {trip.dropoffHospital}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Dispatch Time</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {new Date(trip.dispatchTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Completion Time</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {trip.completedTime
                      ? new Date(trip.completedTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "En route"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Crew Information */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-emerald-600" />
              Emergency Response Crew
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-slate-500 block">Ambulance Driver</span>
                <span className="font-semibold text-slate-900">{trip.driverName}</span>
              </div>
              {trip.paramedicName && (
                <div>
                  <span className="text-xs text-slate-500 block">Paramedic / Attendant</span>
                  <span className="font-semibold text-slate-900">{trip.paramedicName}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Vehicle & Telemetry */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                Vehicle & Telemetry
              </h3>
              <Link
                href="/admin/ambulances"
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                Fleet Registry →
              </Link>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-slate-500 block">Assigned Unit</span>
                <span className="font-bold text-slate-900">
                  {trip.ambulance?.ambulanceIdentifier || "AMB-01"}
                </span>
                <span className="text-xs text-slate-500 font-mono ml-2">
                  ({trip.ambulance?.registrationNumber || "ICT-LE-482"})
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Vehicle Model</span>
                <span className="text-slate-800">
                  {trip.ambulance?.model || "Toyota 4x4 Mountain Land Cruiser"}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-500 block">Start Odometer</span>
                  <span className="text-sm font-bold text-slate-900">
                    {trip.startOdometerKm} km
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-500 block">End Odometer</span>
                  <span className="text-sm font-bold text-slate-900">
                    {trip.endOdometerKm ? `${trip.endOdometerKm} km` : "—"}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-center">
                <span className="text-xs text-emerald-800 block">Total Transit Distance</span>
                <span className="text-xl font-bold text-emerald-900 font-mono">
                  {trip.distanceKm} km
                </span>
              </div>
            </div>
          </div>

          {/* Audit & Archival Metadata */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-xs text-slate-500 space-y-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              System Audit Trail
            </h3>
            <div><strong>Record ID:</strong> <span className="font-mono">{trip.id}</span></div>
            <div><strong>Year Period:</strong> <span className="font-mono">{trip.yearPeriodId}</span></div>
            <div><strong>Created:</strong> {new Date(trip.createdAt).toLocaleString()}</div>
            <div><strong>Last Updated:</strong> {new Date(trip.updatedAt).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Complete Trip Modal */}
      {completeModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setCompleteModalOpen(false)}
          title={`Complete Emergency Mission: ${trip.tripIdentifier}`}
          size="md"
        >
          <form onSubmit={handleCompleteTrip} className="space-y-4">
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
              <div><strong>Patient:</strong> {trip.patientName}</div>
              <div><strong>Vehicle:</strong> {trip.ambulance?.ambulanceIdentifier || "AMB-01"}</div>
              <div><strong>Start Odometer:</strong> {trip.startOdometerKm} km</div>
            </div>

            <FormField label="End Odometer Reading (km)" required>
              <input
                type="number"
                required
                min={Number(trip.startOdometerKm)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-base font-bold focus:ring-2 focus:ring-emerald-500"
                value={endOdometer}
                onChange={(e) => setEndOdometer(Number(e.target.value))}
              />
            </FormField>

            <div className="p-3 bg-slate-100 rounded-lg text-xs flex justify-between font-mono font-semibold">
              <span>Calculated Distance:</span>
              <span className="text-emerald-700 font-bold">
                {Math.max(0, endOdometer - Number(trip.startOdometerKm))} km
              </span>
            </div>

            <FormField label="Clinical Handover / Arrival Notes">
              <textarea
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={completeNotes}
                onChange={(e) => setCompleteNotes(e.target.value)}
              />
            </FormField>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <Button
                variant="outline"
                type="button"
                onClick={() => setCompleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={saving}>
                {saving ? "Completing..." : "Complete Mission"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Trip Modal */}
      {editModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setEditModalOpen(false)}
          title={`Edit Mission Details: ${trip.tripIdentifier}`}
          size="lg"
        >
          <form onSubmit={handleEditTrip} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Patient Name" required>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={editForm.patientName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, patientName: e.target.value })
                  }
                />
              </FormField>

              <FormField label="Patient Phone">
                <input
                  type="text"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={editForm.patientPhone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, patientPhone: e.target.value })
                  }
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Pickup Location" required>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={editForm.pickupLocation}
                  onChange={(e) =>
                    setEditForm({ ...editForm, pickupLocation: e.target.value })
                  }
                />
              </FormField>

              <FormField label="Dropoff Hospital" required>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={editForm.dropoffHospital}
                  onChange={(e) =>
                    setEditForm({ ...editForm, dropoffHospital: e.target.value })
                  }
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Driver Name" required>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={editForm.driverName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, driverName: e.target.value })
                  }
                />
              </FormField>

              <FormField label="Paramedic">
                <input
                  type="text"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={editForm.paramedicName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, paramedicName: e.target.value })
                  }
                />
              </FormField>

              <FormField label="Urgency Level" required>
                <select
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={editForm.urgencyLevel}
                  onChange={(e) =>
                    setEditForm({ ...editForm, urgencyLevel: e.target.value as any })
                  }
                >
                  <option value="CRITICAL">CRITICAL</option>
                  <option value="URGENT">URGENT</option>
                  <option value="ROUTINE">ROUTINE</option>
                </select>
              </FormField>
            </div>

            <FormField label="Notes">
              <textarea
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={editForm.notes}
                onChange={(e) =>
                  setEditForm({ ...editForm, notes: e.target.value })
                }
              />
            </FormField>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <Button
                variant="outline"
                type="button"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Cancel / Archive Modal */}
      {archiveModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setArchiveModalOpen(false)}
          title="Cancel & Archive Emergency Mission"
          size="md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold mb-1">
                  Cancel {trip.tripIdentifier}?
                </p>
                <p className="text-amber-800 text-xs leading-relaxed">
                  In accordance with the Zero-Loss rule, this trip record will be archived as <strong>CANCELLED</strong>. The assigned ambulance vehicle will automatically be restored to <strong>AVAILABLE</strong> status.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setArchiveModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="emergency"
                onClick={handleArchiveTrip}
                disabled={archiving}
              >
                {archiving ? "Archiving..." : "Confirm Cancellation"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
