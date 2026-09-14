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
  Truck,
  CheckCircle,
  Plus,
  RefreshCw,
  Phone,
  Wrench,
  Search,
  Filter,
  Edit2,
  Trash2,
  AlertTriangle,
  MapPin,
  Calendar,
  Gauge,
  User,
} from "lucide-react";
import Link from "next/link";

interface AmbulanceItem {
  id: string;
  ambulanceIdentifier: string;
  registrationNumber: string;
  model: string;
  manufacturingYear: number;
  status: "AVAILABLE" | "ON_TRIP" | "MAINTENANCE" | "OUT_OF_SERVICE";
  currentOdometerKm: number;
  assignedDriverName?: string;
  baseLocation?: string;
  isActive?: boolean;
  _count?: {
    trips: number;
  };
}

export default function AdminAmbulancesPage() {
  const [ambulances, setAmbulances] = useState<AmbulanceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [feedback, setFeedback] = useState<string | null>(null);

  // Register Modal State
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    vehicleNumber: "",
    make: "Toyota",
    model: "Hilux 4x4 Mountain Unit",
    yearOfManufacture: 2025,
    status: "AVAILABLE" as const,
    baseLocation: "Junglan Central Depot",
    currentOdometerKm: 1200,
  });

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingAmbulance, setEditingAmbulance] = useState<AmbulanceItem | null>(null);
  const [editForm, setEditForm] = useState({
    status: "AVAILABLE" as "AVAILABLE" | "ON_TRIP" | "MAINTENANCE" | "OUT_OF_SERVICE",
    assignedDriverName: "",
    currentOdometerKm: 0,
    baseLocation: "",
    model: "",
  });

  // Decommission Modal State
  const [decommissionModalOpen, setDecommissionModalOpen] = useState(false);
  const [decommissionTarget, setDecommissionTarget] = useState<AmbulanceItem | null>(null);
  const [decommissioning, setDecommissioning] = useState(false);

  const fetchAmbulances = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ambulances");
      const json = await res.json();
      if (json.success && json.data) {
        setAmbulances(json.data);
      }
    } catch (err) {
      console.error("Failed to load ambulances:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmbulances();
  }, []);

  // Handle Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/ambulances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Ambulance ${registerForm.vehicleNumber} registered into fleet!`);
        fetchAmbulances();
        setRegisterModalOpen(false);
        setRegisterForm({
          vehicleNumber: "",
          make: "Toyota",
          model: "Hilux 4x4 Mountain Unit",
          yearOfManufacture: 2025,
          status: "AVAILABLE",
          baseLocation: "Junglan Central Depot",
          currentOdometerKm: 0,
        });
      } else {
        alert(json.error?.message || "Failed to register ambulance");
      }
    } catch (err) {
      console.error("Register error:", err);
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Open Edit
  const openEditModal = (a: AmbulanceItem) => {
    setEditingAmbulance(a);
    setEditForm({
      status: a.status,
      assignedDriverName: a.assignedDriverName || "M. Tariq Khan",
      currentOdometerKm: Number(a.currentOdometerKm),
      baseLocation: a.baseLocation || "Junglan Central Depot",
      model: a.model,
    });
    setEditModalOpen(true);
  };

  // Handle Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAmbulance) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/ambulances/${editingAmbulance.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Vehicle ${editingAmbulance.ambulanceIdentifier} updated successfully!`);
        fetchAmbulances();
        setEditModalOpen(false);
        setEditingAmbulance(null);
      } else {
        alert(json.error?.message || "Failed to update ambulance");
      }
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Open Decommission
  const openDecommissionModal = (a: AmbulanceItem) => {
    setDecommissionTarget(a);
    setDecommissionModalOpen(true);
  };

  // Handle Decommission
  const handleDecommission = async () => {
    if (!decommissionTarget) return;
    setDecommissioning(true);
    try {
      const res = await fetch(`/api/ambulances/${decommissionTarget.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Ambulance ${decommissionTarget.ambulanceIdentifier} decommissioned from active fleet.`);
        fetchAmbulances();
        setDecommissionModalOpen(false);
        setDecommissionTarget(null);
      } else {
        alert(json.error?.message || "Failed to decommission vehicle");
      }
    } catch (err) {
      console.error("Decommission error:", err);
    } finally {
      setDecommissioning(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Filtered List
  const filteredAmbulances = useMemo(() => {
    return ambulances.filter((a) => {
      const matchesStatus =
        statusFilter === "ALL" || a.status === statusFilter;
      const term = search.toLowerCase().trim();
      const matchesSearch =
        !term ||
        a.ambulanceIdentifier?.toLowerCase().includes(term) ||
        a.registrationNumber?.toLowerCase().includes(term) ||
        a.model?.toLowerCase().includes(term) ||
        a.assignedDriverName?.toLowerCase().includes(term) ||
        a.baseLocation?.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [ambulances, statusFilter, search]);

  const availableCount = ambulances.filter((a) => a.status === "AVAILABLE").length;
  const onMissionCount = ambulances.filter((a) => a.status === "ON_TRIP").length;
  const maintenanceCount = ambulances.filter((a) => a.status === "MAINTENANCE").length;

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Emergency Ambulance Fleet Registry"
      pageSubtitle="Vehicle availability, live emergency readiness, driver assignments, and mountain terrain maintenance schedules."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Ambulance Fleet" }]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchAmbulances}>
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Refresh
          </Button>
          <Button variant="primary" size="sm" onClick={() => setRegisterModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            Register Vehicle
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

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardStatCard
          title="Total Fleet Units"
          value={`${ambulances.length} Vehicles`}
          subtitle="Registered emergency fleet"
          icon={<Truck className="w-5 h-5" />}
          variant="emerald"
        />
        <DashboardStatCard
          title="Ready for Dispatch"
          value={`${availableCount} Ready`}
          subtitle="Oxygen & lifesupport ready"
          icon={<CheckCircle className="w-5 h-5" />}
          variant="sky"
        />
        <DashboardStatCard
          title="Currently on Mission"
          value={`${onMissionCount} Active`}
          subtitle="Emergency transit underway"
          icon={<Phone className="w-5 h-5" />}
          variant="amber"
        />
        <DashboardStatCard
          title="In Maintenance / Workshop"
          value={`${maintenanceCount} Units`}
          subtitle="Routine & terrain servicing"
          icon={<Wrench className="w-5 h-5" />}
          variant="default"
        />
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search code, plate, model, driver..."
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
            { label: "All Units", value: "ALL" },
            { label: "Available", value: "AVAILABLE" },
            { label: "On Mission", value: "ON_TRIP" },
            { label: "Maintenance", value: "MAINTENANCE" },
            { label: "Decommissioned", value: "OUT_OF_SERVICE" },
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
        </div>
      </div>

      {/* Fleet Table */}
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fleet ID & Plate</TableHead>
              <TableHead>Model / Specs</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Current Odometer</TableHead>
              <TableHead>Assigned Driver</TableHead>
              <TableHead>Station Base</TableHead>
              <TableHead>Missions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-slate-500">
                  Loading fleet data...
                </TableCell>
              </TableRow>
            ) : filteredAmbulances.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-slate-500">
                  No vehicles found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredAmbulances.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <div className="font-bold text-slate-900">{a.ambulanceIdentifier}</div>
                    <div className="text-xs text-slate-500 font-mono">{a.registrationNumber}</div>
                  </TableCell>
                  <TableCell className="text-slate-800 font-medium">{a.model}</TableCell>
                  <TableCell className="text-slate-600">{a.manufacturingYear}</TableCell>
                  <TableCell className="font-semibold text-slate-900">
                    {Number(a.currentOdometerKm).toLocaleString()} km
                  </TableCell>
                  <TableCell className="text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{a.assignedDriverName || "Unassigned"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 text-xs">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{a.baseLocation || "Junglan Central Depot"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/trips?ambulanceId=${a.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded"
                    >
                      {a._count?.trips || 0} Trips
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        a.status === "AVAILABLE"
                          ? "success"
                          : a.status === "ON_TRIP"
                          ? "sky"
                          : a.status === "MAINTENANCE"
                          ? "warning"
                          : "neutral"
                      }
                    >
                      {a.status === "ON_TRIP"
                        ? "ON MISSION"
                        : a.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(a)}
                        className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Vehicle & Status"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {a.status !== "OUT_OF_SERVICE" && (
                        <button
                          onClick={() => openDecommissionModal(a)}
                          disabled={a.status === "ON_TRIP"}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title={
                            a.status === "ON_TRIP"
                              ? "Cannot decommission while on active trip"
                              : "Safe Decommission Vehicle"
                          }
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

      {/* Register Ambulance Modal */}
      <Modal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        title="Register New Ambulance Vehicle"
        size="lg"
      >
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Fleet Code / Plate Number (e.g. AMB-03 / ICT-LE-901)" required>
              <input
                type="text"
                required
                placeholder="AMB-03"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                value={registerForm.vehicleNumber}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, vehicleNumber: e.target.value })
                }
              />
            </FormField>

            <FormField label="Manufacturer / Make" required>
              <input
                type="text"
                required
                placeholder="Toyota"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={registerForm.make}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, make: e.target.value })
                }
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Model & Specs" required>
              <input
                type="text"
                required
                placeholder="Hilux 4x4 Mountain Unit"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={registerForm.model}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, model: e.target.value })
                }
              />
            </FormField>

            <FormField label="Manufacturing Year" required>
              <input
                type="number"
                required
                min={2000}
                max={2030}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={registerForm.yearOfManufacture}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    yearOfManufacture: Number(e.target.value),
                  })
                }
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Initial Odometer Reading (km)" required>
              <input
                type="number"
                required
                min={0}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={registerForm.currentOdometerKm}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    currentOdometerKm: Number(e.target.value),
                  })
                }
              />
            </FormField>

            <FormField label="Station / Base Location" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={registerForm.baseLocation}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, baseLocation: e.target.value })
                }
              />
            </FormField>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <Button
              variant="outline"
              type="button"
              onClick={() => setRegisterModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? "Registering..." : "Register Ambulance"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Ambulance Modal */}
      {editingAmbulance && (
        <Modal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title={`Edit Vehicle: ${editingAmbulance.ambulanceIdentifier}`}
          size="lg"
        >
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Operational Status" required>
                <select
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      status: e.target.value as any,
                    })
                  }
                >
                  <option value="AVAILABLE">AVAILABLE (Ready for Emergency)</option>
                  <option value="ON_TRIP">ON TRIP (Active Mission)</option>
                  <option value="MAINTENANCE">MAINTENANCE (In Workshop)</option>
                  <option value="OUT_OF_SERVICE">OUT OF SERVICE (Decommissioned)</option>
                </select>
              </FormField>

              <FormField label="Assigned Driver Name" required>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={editForm.assignedDriverName}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      assignedDriverName: e.target.value,
                    })
                  }
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Current Odometer (km)" required>
                <input
                  type="number"
                  required
                  min={0}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={editForm.currentOdometerKm}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      currentOdometerKm: Number(e.target.value),
                    })
                  }
                />
              </FormField>

              <FormField label="Station / Base Location" required>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={editForm.baseLocation}
                  onChange={(e) =>
                    setEditForm({ ...editForm, baseLocation: e.target.value })
                  }
                />
              </FormField>
            </div>

            <FormField label="Model & Equipment Specifications">
              <input
                type="text"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={editForm.model}
                onChange={(e) =>
                  setEditForm({ ...editForm, model: e.target.value })
                }
              />
            </FormField>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                type="button"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={saving}>
                {saving ? "Saving Changes..." : "Update Vehicle"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Safe Decommission Modal */}
      {decommissionTarget && (
        <Modal
          isOpen={decommissionModalOpen}
          onClose={() => setDecommissionModalOpen(false)}
          title="Safe Decommission Ambulance"
          size="md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold mb-1">
                  Decommissioning {decommissionTarget.ambulanceIdentifier} ({decommissionTarget.model})
                </p>
                <p className="text-amber-800 text-xs leading-relaxed">
                  In accordance with the foundation&apos;s Zero-Loss policy, this vehicle will be marked as <strong>OUT OF SERVICE</strong>. Historical emergency transit records, audit logs, and fuel logs associated with this vehicle will remain 100% preserved.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setDecommissionModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="emergency"
                onClick={handleDecommission}
                disabled={decommissioning}
              >
                {decommissioning ? "Decommissioning..." : "Confirm Decommission"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
