"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";

interface AmbulanceItem {
  id: string;
  ambulanceIdentifier: string;
  registrationNumber: string;
  model: string;
  manufacturingYear: number;
  status: "AVAILABLE" | "ON_TRIP" | "MAINTENANCE" | "OUT_OF_SERVICE";
  currentOdometerKm: number;
  assignedDriverName: string;
}

export default function AdminAmbulancesPage() {
  const [ambulances, setAmbulances] = useState<AmbulanceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    vehicleNumber: "AMB-03",
    make: "Toyota",
    model: "Hilux 4x4 Mountain Unit",
    yearOfManufacture: 2025,
    status: "AVAILABLE" as const,
    baseLocation: "Junglan Central Depot",
    currentOdometerKm: 1200,
  });

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/ambulances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Ambulance ${formData.vehicleNumber} registered into fleet!`);
        fetchAmbulances();
        setModalOpen(false);
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

  const availableCount = ambulances.filter((a) => a.status === "AVAILABLE").length;
  const onMissionCount = ambulances.filter((a) => a.status === "ON_TRIP").length;

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Emergency Ambulance Fleet Registry"
      pageSubtitle="Vehicle availability, live GPS dispatch readiness, odometer tracking, and mountain terrain maintenance schedules."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Ambulance Fleet" }]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchAmbulances}>
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Refresh
          </Button>
          <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <DashboardStatCard
          title="Total Registered Fleet"
          value={`${ambulances.length} Units`}
          subtitle="100% emergency equipped"
          icon={<Truck className="w-5 h-5" />}
          variant="emerald"
        />
        <DashboardStatCard
          title="Active & Ready for Dispatch"
          value={`${availableCount} Ready`}
          subtitle="Oxygen equipped"
          icon={<CheckCircle className="w-5 h-5" />}
          variant="sky"
        />
        <DashboardStatCard
          title="Currently on Mission"
          value={`${onMissionCount} Dispatched`}
          subtitle="Patient in transit"
          icon={<Phone className="w-5 h-5" />}
          variant="amber"
        />
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fleet ID & Plate</TableHead>
              <TableHead>Model / Type</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Odometer</TableHead>
              <TableHead>Assigned Driver</TableHead>
              <TableHead>Operational Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  Loading fleet data...
                </TableCell>
              </TableRow>
            ) : ambulances.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  No vehicles registered. Click &quot;Register Vehicle&quot; to add one.
                </TableCell>
              </TableRow>
            ) : (
              ambulances.map((a) => (
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
                  <TableCell className="text-slate-700">{a.assignedDriverName}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        a.status === "AVAILABLE"
                          ? "success"
                          : a.status === "ON_TRIP"
                          ? "sky"
                          : "warning"
                      }
                    >
                      {a.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Register Ambulance Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Register New Ambulance Vehicle"
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Fleet Code (e.g. AMB-03)" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                value={formData.vehicleNumber}
                onChange={(e) =>
                  setFormData({ ...formData, vehicleNumber: e.target.value })
                }
              />
            </FormField>

            <FormField label="Manufacturer / Make" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Model & Specs" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </FormField>

            <FormField label="Manufacturing Year" required>
              <input
                type="number"
                required
                min={2000}
                max={2030}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.yearOfManufacture}
                onChange={(e) =>
                  setFormData({ ...formData, yearOfManufacture: Number(e.target.value) })
                }
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Current Odometer Reading (km)" required>
              <input
                type="number"
                required
                min={0}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.currentOdometerKm}
                onChange={(e) =>
                  setFormData({ ...formData, currentOdometerKm: Number(e.target.value) })
                }
              />
            </FormField>

            <FormField label="Station / Base Location" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.baseLocation}
                onChange={(e) =>
                  setFormData({ ...formData, baseLocation: e.target.value })
                }
              />
            </FormField>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? "Registering..." : "Register Ambulance"}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
