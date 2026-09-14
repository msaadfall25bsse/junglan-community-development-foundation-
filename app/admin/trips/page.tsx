"use client";

import React, { useState, useEffect, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import {
  Search,
  Filter,
  CheckCircle2,
  Plus,
  RefreshCw,
  Truck,
  MapPin,
  Clock,
  Gauge,
  AlertTriangle,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  User,
  Activity,
  HeartPulse,
} from "lucide-react";
import Link from "next/link";

interface TripItem {
  id: string;
  tripIdentifier: string;
  date: string;
  patientId?: string | null;
  patientName: string;
  patientPhone?: string | null;
  pickupLocation: string;
  dropoffHospital: string;
  tripType: string;
  distanceKm: number;
  startOdometerKm: number;
  endOdometerKm?: number | null;
  status: "DISPATCHED" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED";
  urgencyLevel: "ROUTINE" | "URGENT" | "CRITICAL";
  driverName: string;
  paramedicName?: string | null;
  ambulanceId: string;
  notes?: string | null;
  ambulance?: {
    id: string;
    ambulanceIdentifier: string;
    registrationNumber: string;
    model: string;
  };
}

interface AmbulanceOption {
  id: string;
  ambulanceIdentifier: string;
  registrationNumber: string;
  model: string;
  status: string;
  currentOdometerKm: number;
  assignedDriverName?: string;
}

interface PatientOption {
  id: string;
  patientIdentifier: string;
  fullName: string;
  contactNumber: string;
}

export default function AdminTripsPage() {
  const [trips, setTrips] = useState<TripItem[]>([]);
  const [ambulances, setAmbulances] = useState<AmbulanceOption[]>([]);
  const [patients, setPatients] = useState<PatientOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [urgencyFilter, setUrgencyFilter] = useState("ALL");
  const [feedback, setFeedback] = useState<string | null>(null);

  // Dispatch Modal State
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dispatchForm, setDispatchForm] = useState({
    ambulanceId: "",
    patientId: "",
    patientName: "",
    patientPhone: "",
    pickupLocation: "Upper Junglan Valley",
    dropoffHospital: "DHQ Hospital Mansehra",
    startOdometerKm: 0,
    driverName: "M. Tariq Khan",
    driverPhone: "03001234567",
    paramedicName: "",
    urgencyLevel: "CRITICAL" as "ROUTINE" | "URGENT" | "CRITICAL",
    notes: "",
    yearPeriodId: "2026",
  });

  // Complete Modal State
  const [completeModalTrip, setCompleteModalTrip] = useState<TripItem | null>(null);
  const [endOdometer, setEndOdometer] = useState<number>(0);
  const [completeNotes, setCompleteNotes] = useState<string>("");

  // Edit Modal State
  const [editModalTrip, setEditModalTrip] = useState<TripItem | null>(null);
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

  // Cancel/Archive Modal State
  const [archiveModalTrip, setArchiveModalTrip] = useState<TripItem | null>(null);
  const [archiving, setArchiving] = useState(false);

  // Fetch Trips
  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/trips?limit=100");
      const json = await res.json();
      if (json.success && json.data) {
        setTrips(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch trips:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Ambulances & Patients for pickers
  const fetchMetadata = async () => {
    try {
      const [ambRes, patRes] = await Promise.all([
        fetch("/api/ambulances"),
        fetch("/api/patients?limit=200"),
      ]);
      const ambJson = await ambRes.json();
      const patJson = await patRes.json();

      if (ambJson.success && ambJson.data) {
        setAmbulances(ambJson.data);
      }
      if (patJson.success && patJson.data) {
        setPatients(patJson.data);
      }
    } catch (err) {
      console.error("Failed to fetch metadata:", err);
    }
  };

  useEffect(() => {
    fetchTrips();
    fetchMetadata();
  }, []);

  // Available Ambulances for dispatch
  const availableAmbulances = useMemo(() => {
    return ambulances.filter((a) => a.status === "AVAILABLE");
  }, [ambulances]);

  // Open Dispatch Modal
  const openDispatchModal = () => {
    const firstAmb = availableAmbulances[0] || ambulances[0];
    setDispatchForm({
      ambulanceId: firstAmb ? firstAmb.id : "",
      patientId: "",
      patientName: "",
      patientPhone: "",
      pickupLocation: "Upper Junglan Valley",
      dropoffHospital: "DHQ Hospital Mansehra",
      startOdometerKm: firstAmb ? Number(firstAmb.currentOdometerKm) : 0,
      driverName: firstAmb?.assignedDriverName || "M. Tariq Khan",
      driverPhone: "03001234567",
      paramedicName: "",
      urgencyLevel: "CRITICAL",
      notes: "Emergency life-support transit",
      yearPeriodId: "2026",
    });
    setDispatchModalOpen(true);
  };

  // When Ambulance selected in Dispatch Form, update starting odometer and driver
  const handleAmbulanceSelect = (ambId: string) => {
    const amb = ambulances.find((a) => a.id === ambId);
    if (amb) {
      setDispatchForm((prev) => ({
        ...prev,
        ambulanceId: amb.id,
        startOdometerKm: Number(amb.currentOdometerKm),
        driverName: amb.assignedDriverName || prev.driverName,
      }));
    }
  };

  // When Patient selected from picker
  const handlePatientSelect = (patId: string) => {
    if (!patId) {
      setDispatchForm((prev) => ({
        ...prev,
        patientId: "",
      }));
      return;
    }
    const pat = patients.find((p) => p.id === patId);
    if (pat) {
      setDispatchForm((prev) => ({
        ...prev,
        patientId: pat.id,
        patientName: pat.fullName,
        patientPhone: pat.contactNumber,
      }));
    }
  };

  // Submit Dispatch
  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchForm.ambulanceId) {
      alert("Please select an available ambulance.");
      return;
    }
    if (!dispatchForm.patientName.trim()) {
      alert("Please provide patient name.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...dispatchForm,
          dispatchTime: new Date().toISOString(),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Emergency Mission ${json.data.tripIdentifier} dispatched!`);
        fetchTrips();
        fetchMetadata();
        setDispatchModalOpen(false);
      } else {
        alert(json.error?.message || "Failed to dispatch ambulance");
      }
    } catch (err) {
      console.error("Dispatch error:", err);
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Open Complete Modal
  const openCompleteModal = (trip: TripItem) => {
    setCompleteModalTrip(trip);
    setEndOdometer(Number(trip.startOdometerKm) + 25);
    setCompleteNotes(trip.notes || "Patient delivered safely to emergency ward.");
  };

  // Submit Complete Trip
  const handleCompleteTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!completeModalTrip) return;
    if (endOdometer < Number(completeModalTrip.startOdometerKm)) {
      alert("End odometer cannot be less than start odometer reading.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/trips/${completeModalTrip.id}/complete`, {
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
        setFeedback(`Mission ${completeModalTrip.tripIdentifier} marked as completed! Distance: ${endOdometer - Number(completeModalTrip.startOdometerKm)} km.`);
        fetchTrips();
        fetchMetadata();
        setCompleteModalTrip(null);
      } else {
        alert(json.error?.message || "Error completing trip");
      }
    } catch (err) {
      console.error("Complete error:", err);
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Open Edit Modal
  const openEditModal = (trip: TripItem) => {
    setEditModalTrip(trip);
    setEditForm({
      patientName: trip.patientName,
      patientPhone: trip.patientPhone || "",
      pickupLocation: trip.pickupLocation,
      dropoffHospital: trip.dropoffHospital,
      driverName: trip.driverName,
      paramedicName: trip.paramedicName || "",
      urgencyLevel: trip.urgencyLevel,
      notes: trip.notes || "",
    });
  };

  // Submit Edit Trip
  const handleEditTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalTrip) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/trips/${editModalTrip.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Trip ${editModalTrip.tripIdentifier} updated successfully!`);
        fetchTrips();
        setEditModalTrip(null);
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

  // Submit Archive Trip
  const handleArchiveTrip = async () => {
    if (!archiveModalTrip) return;
    setArchiving(true);
    try {
      const res = await fetch(`/api/trips/${archiveModalTrip.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Mission ${archiveModalTrip.tripIdentifier} cancelled and archived safely.`);
        fetchTrips();
        fetchMetadata();
        setArchiveModalTrip(null);
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

  // Filtered Trips List
  const filteredTrips = useMemo(() => {
    return trips.filter((t) => {
      const matchesStatus =
        statusFilter === "ALL" || t.status === statusFilter;
      const matchesUrgency =
        urgencyFilter === "ALL" || t.urgencyLevel === urgencyFilter;
      const term = search.toLowerCase().trim();
      const matchesSearch =
        !term ||
        t.tripIdentifier?.toLowerCase().includes(term) ||
        t.patientName?.toLowerCase().includes(term) ||
        t.driverName?.toLowerCase().includes(term) ||
        t.pickupLocation?.toLowerCase().includes(term) ||
        t.dropoffHospital?.toLowerCase().includes(term) ||
        t.ambulance?.ambulanceIdentifier?.toLowerCase().includes(term) ||
        t.ambulance?.registrationNumber?.toLowerCase().includes(term);

      return matchesStatus && matchesUrgency && matchesSearch;
    });
  }, [trips, statusFilter, urgencyFilter, search]);

  // Statistics
  const activeMissionsCount = trips.filter(
    (t) => t.status === "DISPATCHED" || t.status === "IN_TRANSIT"
  ).length;
  const completedMissionsCount = trips.filter((t) => t.status === "COMPLETED").length;
  const totalDistanceKm = trips.reduce(
    (acc, t) => acc + (Number(t.distanceKm) || 0),
    0
  );

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Ambulance Missions & Emergency Trip Dispatch"
      pageSubtitle="24/7 mountain emergency transit logs, telemetry tracking, patient linkage, and clinical destination monitoring."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Emergency Trips" }]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => { fetchTrips(); fetchMetadata(); }}>
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Refresh
          </Button>
          <Button variant="primary" size="sm" onClick={openDispatchModal}>
            <Plus className="w-4 h-4 mr-1.5" />
            Dispatch Emergency
          </Button>
        </div>
      }
    >
      {feedback && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium">{feedback}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardStatCard
          title="Total Emergency Missions"
          value={`${trips.length} Trips`}
          subtitle="All-time recorded transfers"
          icon={<Truck className="w-5 h-5" />}
          variant="default"
        />
        <DashboardStatCard
          title="Active in Transit"
          value={`${activeMissionsCount} Active`}
          subtitle="En route / Dispatched"
          icon={<HeartPulse className="w-5 h-5" />}
          variant="amber"
        />
        <DashboardStatCard
          title="Completed Missions"
          value={`${completedMissionsCount} Delivered`}
          subtitle="Safe hospital dropoffs"
          icon={<CheckCircle2 className="w-5 h-5" />}
          variant="emerald"
        />
        <DashboardStatCard
          title="Total Distance Logged"
          value={`${Math.round(totalDistanceKm).toLocaleString()} km`}
          subtitle="Terrain transit covered"
          icon={<Gauge className="w-5 h-5" />}
          variant="sky"
        />
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search trip ID, patient, driver, hospital..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Status:
          </span>
          {[
            { label: "All", value: "ALL" },
            { label: "Active", value: "DISPATCHED" },
            { label: "Completed", value: "COMPLETED" },
            { label: "Cancelled", value: "CANCELLED" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                statusFilter === tab.value
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}

          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-2">
            Urgency:
          </span>
          {[
            { label: "All", value: "ALL" },
            { label: "Critical", value: "CRITICAL" },
            { label: "Urgent", value: "URGENT" },
            { label: "Routine", value: "ROUTINE" },
          ].map((u) => (
            <button
              key={u.value}
              onClick={() => setUrgencyFilter(u.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                urgencyFilter === u.value
                  ? "bg-rose-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trips Table */}
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mission ID & Date</TableHead>
              <TableHead>Patient Dossier</TableHead>
              <TableHead>Transit Route (From → To)</TableHead>
              <TableHead>Vehicle & Driver</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                  Loading emergency trips...
                </TableCell>
              </TableRow>
            ) : filteredTrips.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                  No trips found. Click &quot;Dispatch Emergency&quot; to log a mission.
                </TableCell>
              </TableRow>
            ) : (
              filteredTrips.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <Link
                      href={`/admin/trips/${t.id}`}
                      className="font-mono font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                    >
                      {t.tripIdentifier}
                    </Link>
                    <div className="text-xs text-slate-500">
                      {new Date(t.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-slate-900">
                      {t.patientId ? (
                        <Link
                          href={`/admin/patients/${t.patientId}`}
                          className="hover:underline text-emerald-800"
                        >
                          {t.patientName}
                        </Link>
                      ) : (
                        t.patientName
                      )}
                    </div>
                    {t.patientPhone && (
                      <div className="text-xs text-slate-500 font-mono">{t.patientPhone}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-slate-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{t.pickupLocation}</span>
                    </div>
                    <div className="text-xs text-slate-600 pl-4">
                      → {t.dropoffHospital}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-slate-900">
                      {t.ambulance?.ambulanceIdentifier || "AMB-01"}
                    </div>
                    <div className="text-xs text-slate-500">
                      Driver: {t.driverName}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {t.status === "COMPLETED" ? (
                      <span className="font-bold text-slate-900">{t.distanceKm} km</span>
                    ) : (
                      <span className="text-slate-400 text-xs italic">In Transit</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        t.urgencyLevel === "CRITICAL"
                          ? "danger"
                          : t.urgencyLevel === "URGENT"
                          ? "warning"
                          : "neutral"
                      }
                    >
                      {t.urgencyLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        t.status === "COMPLETED"
                          ? "success"
                          : t.status === "DISPATCHED" || t.status === "IN_TRANSIT"
                          ? "sky"
                          : "neutral"
                      }
                    >
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/admin/trips/${t.id}`}
                        className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Mission Dossier"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      {(t.status === "DISPATCHED" || t.status === "IN_TRANSIT") && (
                        <button
                          onClick={() => openCompleteModal(t)}
                          className="px-2 py-1 text-xs font-semibold bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => openEditModal(t)}
                        className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Trip Details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {t.status !== "CANCELLED" && (
                        <button
                          onClick={() => setArchiveModalTrip(t)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Safe Cancel & Archive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dispatch Modal */}
      <Modal
        isOpen={dispatchModalOpen}
        onClose={() => setDispatchModalOpen(false)}
        title="Dispatch Emergency Ambulance Mission"
        size="lg"
      >
        <form onSubmit={handleDispatch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Assign Ambulance Vehicle" required>
              <select
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-semibold"
                value={dispatchForm.ambulanceId}
                onChange={(e) => handleAmbulanceSelect(e.target.value)}
              >
                {availableAmbulances.length === 0 ? (
                  <option value="">No AVAILABLE ambulances in depot!</option>
                ) : (
                  availableAmbulances.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.ambulanceIdentifier} ({a.model}) — {a.currentOdometerKm} km
                    </option>
                  ))
                )}
              </select>
            </FormField>

            <FormField label="Start Odometer Reading (km)" required>
              <input
                type="number"
                required
                min={0}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                value={dispatchForm.startOdometerKm}
                onChange={(e) =>
                  setDispatchForm({
                    ...dispatchForm,
                    startOdometerKm: Number(e.target.value),
                  })
                }
              />
            </FormField>
          </div>

          {/* Patient Selection / Linking */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <FormField label="Link to Registered Patient (Optional)">
              <select
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                value={dispatchForm.patientId}
                onChange={(e) => handlePatientSelect(e.target.value)}
              >
                <option value="">-- Choose Registered Patient (or enter ad-hoc below) --</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.patientIdentifier} - {p.fullName} ({p.contactNumber})
                  </option>
                ))}
              </select>
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField label="Patient Full Name" required>
                <input
                  type="text"
                  required
                  placeholder="Patient Name"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                  value={dispatchForm.patientName}
                  onChange={(e) =>
                    setDispatchForm({ ...dispatchForm, patientName: e.target.value })
                  }
                />
              </FormField>

              <FormField label="Patient Contact Phone">
                <input
                  type="text"
                  placeholder="03001234567"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                  value={dispatchForm.patientPhone}
                  onChange={(e) =>
                    setDispatchForm({ ...dispatchForm, patientPhone: e.target.value })
                  }
                />
              </FormField>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Pickup Location" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={dispatchForm.pickupLocation}
                onChange={(e) =>
                  setDispatchForm({ ...dispatchForm, pickupLocation: e.target.value })
                }
              />
            </FormField>

            <FormField label="Dropoff Hospital / Destination" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={dispatchForm.dropoffHospital}
                onChange={(e) =>
                  setDispatchForm({ ...dispatchForm, dropoffHospital: e.target.value })
                }
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Assigned Driver Name" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={dispatchForm.driverName}
                onChange={(e) =>
                  setDispatchForm({ ...dispatchForm, driverName: e.target.value })
                }
              />
            </FormField>

            <FormField label="Paramedic / Escort">
              <input
                type="text"
                placeholder="Optional"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={dispatchForm.paramedicName}
                onChange={(e) =>
                  setDispatchForm({ ...dispatchForm, paramedicName: e.target.value })
                }
              />
            </FormField>

            <FormField label="Emergency Urgency" required>
              <select
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-semibold"
                value={dispatchForm.urgencyLevel}
                onChange={(e) =>
                  setDispatchForm({
                    ...dispatchForm,
                    urgencyLevel: e.target.value as any,
                  })
                }
              >
                <option value="CRITICAL">CRITICAL (Oxygen / Life Support)</option>
                <option value="URGENT">URGENT (Fracture / Maternity)</option>
                <option value="ROUTINE">ROUTINE (Follow-up / Transit)</option>
              </select>
            </FormField>
          </div>

          <FormField label="Operational & Medical Dispatch Notes">
            <textarea
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
              value={dispatchForm.notes}
              onChange={(e) =>
                setDispatchForm({ ...dispatchForm, notes: e.target.value })
              }
            />
          </FormField>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <Button
              variant="outline"
              type="button"
              onClick={() => setDispatchModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={saving || availableAmbulances.length === 0}
            >
              {saving ? "Dispatching..." : "Confirm & Dispatch"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Complete Trip Modal */}
      {completeModalTrip && (
        <Modal
          isOpen={true}
          onClose={() => setCompleteModalTrip(null)}
          title={`Complete Emergency Mission: ${completeModalTrip.tripIdentifier}`}
          size="md"
        >
          <form onSubmit={handleCompleteTrip} className="space-y-4">
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
              <div><strong>Patient:</strong> {completeModalTrip.patientName}</div>
              <div><strong>Vehicle:</strong> {completeModalTrip.ambulance?.ambulanceIdentifier || "AMB-01"}</div>
              <div><strong>Start Odometer:</strong> {completeModalTrip.startOdometerKm} km</div>
            </div>

            <FormField label="End Odometer Reading (km)" required>
              <input
                type="number"
                required
                min={Number(completeModalTrip.startOdometerKm)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-base font-bold focus:ring-2 focus:ring-emerald-500"
                value={endOdometer}
                onChange={(e) => setEndOdometer(Number(e.target.value))}
              />
            </FormField>

            <div className="p-3 bg-slate-100 rounded-lg text-xs flex justify-between font-mono font-semibold">
              <span>Calculated Distance:</span>
              <span className="text-emerald-700 font-bold">
                {Math.max(0, endOdometer - Number(completeModalTrip.startOdometerKm))} km
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
                onClick={() => setCompleteModalTrip(null)}
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
      {editModalTrip && (
        <Modal
          isOpen={true}
          onClose={() => setEditModalTrip(null)}
          title={`Edit Mission Details: ${editModalTrip.tripIdentifier}`}
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
                onClick={() => setEditModalTrip(null)}
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

      {/* Safe Archive / Cancel Modal */}
      {archiveModalTrip && (
        <Modal
          isOpen={true}
          onClose={() => setArchiveModalTrip(null)}
          title="Cancel & Archive Emergency Mission"
          size="md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold mb-1">
                  Cancel {archiveModalTrip.tripIdentifier}?
                </p>
                <p className="text-amber-800 text-xs leading-relaxed">
                  In accordance with the Zero-Loss rule, this trip record will be archived as <strong>CANCELLED</strong>. The assigned ambulance vehicle will automatically be restored to <strong>AVAILABLE</strong> status.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setArchiveModalTrip(null)}
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
