"use client";

import React, { useState, useEffect, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
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
  CheckCircle,
  Truck,
} from "lucide-react";

interface TripItem {
  id: string;
  tripIdentifier: string;
  date: string;
  patientName: string;
  pickupLocation: string;
  dropoffHospital: string;
  tripType: string;
  distanceKm: number;
  startOdometerKm: number;
  endOdometerKm?: number | null;
  status: "DISPATCHED" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED";
  urgencyLevel: "ROUTINE" | "URGENT" | "CRITICAL";
  driverName: string;
  ambulanceId: string;
  patientPhone?: string | null;
  notes?: string | null;
}

export default function AdminTripsPage() {
  const [trips, setTrips] = useState<TripItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [completeModalTrip, setCompleteModalTrip] = useState<TripItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [endOdometer, setEndOdometer] = useState<number>(0);

  // Dispatch Form
  const [dispatchForm, setDispatchForm] = useState({
    ambulanceId: "amb-1",
    patientName: "",
    patientPhone: "03001234567",
    pickupLocation: "",
    dropoffHospital: "DHQ Hospital Mansehra",
    startOdometerKm: 14850,
    driverName: "M. Tariq Khan",
    urgencyLevel: "CRITICAL" as const,
    notes: "Emergency transit with life support oxygen",
    yearPeriodId: "2026",
    dispatchTime: new Date().toISOString(),
  });

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/trips");
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

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setDispatchModalOpen(false);
      } else {
        alert(json.error?.message || "Failed to dispatch");
      }
    } catch (err) {
      console.error("Dispatch error:", err);
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleCompleteTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!completeModalTrip) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/trips/${completeModalTrip.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endOdometerKm: endOdometer,
          returnTime: new Date().toISOString(),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Mission ${completeModalTrip.tripIdentifier} marked as completed.`);
        fetchTrips();
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

  const filteredTrips = useMemo(() => {
    return trips.filter((t) => {
      const matchesSearch =
        t.tripIdentifier.toLowerCase().includes(search.toLowerCase()) ||
        t.patientName.toLowerCase().includes(search.toLowerCase()) ||
        t.pickupLocation.toLowerCase().includes(search.toLowerCase()) ||
        t.dropoffHospital.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "ALL" || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [trips, search, statusFilter]);

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Ambulance Trip Dispatches"
      pageSubtitle="Live operational log of mountain patient transfers, hospital triage, odometer audits, and vehicle availability."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Trips" }]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchTrips}>
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Refresh
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setDispatchModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Dispatch Ambulance
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

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by mission ID, patient, pickup location, or hospital..."
            className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            className="px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Mission Statuses</option>
            <option value="DISPATCHED">Dispatched / En Route</option>
            <option value="IN_TRANSIT">In Transit</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mission Code & Date</TableHead>
              <TableHead>Patient & Phone</TableHead>
              <TableHead>Route (Pickup → Destination)</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Driver & Vehicle</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                  Loading mission logs...
                </TableCell>
              </TableRow>
            ) : filteredTrips.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                  No trips match the current filter.
                </TableCell>
              </TableRow>
            ) : (
              filteredTrips.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <div className="font-semibold text-slate-900">{t.tripIdentifier}</div>
                    <div className="text-xs text-slate-500">
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(t.date))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-800">{t.patientName}</div>
                    <div className="text-xs text-slate-500">{t.patientPhone || "No contact"}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-slate-900">{t.pickupLocation}</div>
                    <div className="text-xs text-slate-500">→ {t.dropoffHospital}</div>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-800">
                    {t.distanceKm} km
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-slate-800">{t.driverName}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      {t.ambulanceId}
                    </div>
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
                    <Badge variant={t.status === "COMPLETED" ? "success" : "warning"}>
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {t.status !== "COMPLETED" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCompleteModalTrip(t);
                          setEndOdometer(t.startOdometerKm + 25);
                        }}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                        Complete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dispatch Ambulance Modal */}
      <Modal
        isOpen={dispatchModalOpen}
        onClose={() => setDispatchModalOpen(false)}
        title="Dispatch Emergency Ambulance"
        size="lg"
      >
        <form onSubmit={handleDispatch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Assign Ambulance Vehicle" required>
              <select
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-medium"
                value={dispatchForm.ambulanceId}
                onChange={(e) =>
                  setDispatchForm({ ...dispatchForm, ambulanceId: e.target.value })
                }
              >
                <option value="amb-1">AMB-01 (Toyota 4x4 Mountain Cruiser)</option>
                <option value="amb-2">AMB-02 (Toyota HiAce High-Roof Transit)</option>
              </select>
            </FormField>

            <FormField label="Urgency Level" required>
              <select
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-medium"
                value={dispatchForm.urgencyLevel}
                onChange={(e) =>
                  setDispatchForm({ ...dispatchForm, urgencyLevel: e.target.value as any })
                }
              >
                <option value="CRITICAL">Critical (Immediate Oxygen / Trauma)</option>
                <option value="URGENT">Urgent (Maternal Labor / Fracture)</option>
                <option value="ROUTINE">Routine Transit</option>
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Patient Full Name" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Bibi Fatima"
                value={dispatchForm.patientName}
                onChange={(e) =>
                  setDispatchForm({ ...dispatchForm, patientName: e.target.value })
                }
              />
            </FormField>

            <FormField label="Contact / Caller Phone" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={dispatchForm.patientPhone}
                onChange={(e) =>
                  setDispatchForm({ ...dispatchForm, patientPhone: e.target.value })
                }
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Pickup Location / Village" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Upper Junglan Hamlet"
                value={dispatchForm.pickupLocation}
                onChange={(e) =>
                  setDispatchForm({ ...dispatchForm, pickupLocation: e.target.value })
                }
              />
            </FormField>

            <FormField label="Destination Hospital" required>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <FormField label="Starting Odometer (km)" required>
              <input
                type="number"
                required
                min={0}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
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

          <FormField label="Medical Dispatch Notes">
            <textarea
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
              value={dispatchForm.notes}
              onChange={(e) => setDispatchForm({ ...dispatchForm, notes: e.target.value })}
            />
          </FormField>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <Button variant="outline" type="button" onClick={() => setDispatchModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
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
          title={`Complete Mission: ${completeModalTrip.tripIdentifier}`}
        >
          <form onSubmit={handleCompleteTrip} className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
              <div>
                <span className="text-slate-500">Patient:</span>{" "}
                <span className="font-semibold">{completeModalTrip.patientName}</span>
              </div>
              <div>
                <span className="text-slate-500">Starting Odometer:</span>{" "}
                <span className="font-semibold">{completeModalTrip.startOdometerKm} km</span>
              </div>
            </div>

            <FormField label="Ending Odometer Reading (km)" required>
              <input
                type="number"
                required
                min={completeModalTrip.startOdometerKm}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                value={endOdometer}
                onChange={(e) => setEndOdometer(Number(e.target.value))}
              />
              <div className="text-xs text-slate-500 mt-1">
                Computed distance:{" "}
                <strong className="text-emerald-700">
                  {Math.max(0, endOdometer - completeModalTrip.startOdometerKm)} km
                </strong>
              </div>
            </FormField>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                type="button"
                onClick={() => setCompleteModalTrip(null)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={saving}>
                {saving ? "Completing..." : "Complete Mission & Release Ambulance"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  );
}
