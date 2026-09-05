"use client";

import React, { useState } from "react";
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
import {
  Route,
  Fuel,
  Wrench,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";

interface ShiftEntry {
  id: string;
  type: "DISPATCH" | "FUEL" | "MAINTENANCE";
  title: string;
  vehicle: string;
  timestamp: string;
  loggedBy: string;
  status: "SUBMITTED" | "PENDING_AUDIT";
}

const TODAY_ENTRIES: ShiftEntry[] = [
  {
    id: "1",
    type: "DISPATCH",
    title: "Trip DSP-2026-089 (Maternity Transfer)",
    vehicle: "AMB-01 (Toyota Hilux 4x4)",
    timestamp: "13:40 PKT",
    loggedBy: "Field Operator",
    status: "SUBMITTED",
  },
  {
    id: "2",
    type: "FUEL",
    title: "Diesel Receipt VCH-2026-0091 (PSO 60 Liters)",
    vehicle: "AMB-01 (Toyota Hilux 4x4)",
    timestamp: "11:15 PKT",
    loggedBy: "Field Operator",
    status: "SUBMITTED",
  },
  {
    id: "3",
    type: "DISPATCH",
    title: "Trip DSP-2026-088 (Elderly Transfer)",
    vehicle: "AMB-02 (Toyota Hiace)",
    timestamp: "09:30 PKT",
    loggedBy: "Field Operator",
    status: "SUBMITTED",
  },
];

export default function DataEntryOverviewPage() {
  const [activeModal, setActiveModal] = useState<"FUEL" | "MAINTENANCE" | null>(null);
  const [voucherModalSuccess, setVoucherModalSuccess] = useState(false);

  const [fuelForm, setFuelForm] = useState({
    vehicle: "AMB-01",
    liters: "",
    odometer: "",
    station: "PSO Station Mansehra",
    cost: "",
  });

  const handleFuelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherModalSuccess(true);
    setTimeout(() => {
      setVoucherModalSuccess(false);
      setActiveModal(null);
      setFuelForm({ vehicle: "AMB-01", liters: "", odometer: "", station: "PSO Station Mansehra", cost: "" });
    }, 1200);
  };

  return (
    <DashboardLayout
      role="DATA_ENTRY"
      pageTitle="Field Operations & Intake Desk"
      pageSubtitle="Dedicated operational portal for ambulance trip logging, fuel vouchers, and patient dispatches."
      breadcrumbs={[{ label: "Operations Desk" }]}
      actions={
        <Button
          href="/data-entry/trips/new"
          variant="primary"
          size="sm"
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          New Trip Dispatch
        </Button>
      }
    >
      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Dispatch */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all flex flex-col justify-between">
          <div>
            <div className="p-3 rounded-xl bg-sky-50 text-sky-700 w-fit mb-4">
              <Route className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Patient Trip Dispatch
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Log patient transport, origin village, destination hospital, and mileage.
            </p>
          </div>
          <Button
            href="/data-entry/trips/new"
            variant="primary"
            size="sm"
            className="w-full justify-center"
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Start Trip Entry
          </Button>
        </div>

        {/* Card 2: Fuel */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-amber-300 hover:shadow-xs transition-all flex flex-col justify-between">
          <div>
            <div className="p-3 rounded-xl bg-amber-50 text-amber-700 w-fit mb-4">
              <Fuel className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Record Fuel Voucher
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Submit official fuel receipt, pump station voucher slip, and odometer reading.
            </p>
          </div>
          <Button
            onClick={() => setActiveModal("FUEL")}
            variant="outline"
            size="sm"
            className="w-full justify-center"
            leftIcon={<Fuel className="w-4 h-4" />}
          >
            Log Fuel Slip
          </Button>
        </div>

        {/* Card 3: Maintenance */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between">
          <div>
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 w-fit mb-4">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Log Service Check
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Record routine oil check, tire rotation, or medical oxygen cylinder replacements.
            </p>
          </div>
          <Button
            onClick={() => setActiveModal("MAINTENANCE")}
            variant="outline"
            size="sm"
            className="w-full justify-center"
            leftIcon={<Wrench className="w-4 h-4" />}
          >
            Log Maintenance
          </Button>
        </div>
      </div>

      {/* Today's Shift Activity Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Today&apos;s Field Shift Log
            </h2>
            <p className="text-xs text-slate-500">
              Entries logged during current 24-hour duty cycle.
            </p>
          </div>
          <Badge variant="neutral" size="sm">
            Current Shift: Active
          </Badge>
        </div>

        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Activity Details</TableHead>
                <TableHead>Assigned Ambulance</TableHead>
                <TableHead>Logged Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TODAY_ENTRIES.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <Badge
                      variant={
                        entry.type === "DISPATCH"
                          ? "sky"
                          : entry.type === "FUEL"
                          ? "warning"
                          : "neutral"
                      }
                      size="sm"
                    >
                      {entry.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-slate-800 text-xs">
                      {entry.title}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-slate-600 font-medium">
                      {entry.vehicle}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-slate-500 font-mono">
                      {entry.timestamp}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="success" size="sm">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Submitted
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Fuel Voucher Modal */}
      {activeModal === "FUEL" && (
        <Modal
          isOpen={activeModal === "FUEL"}
          onClose={() => setActiveModal(null)}
          title="Log Ambulance Fuel Slip"
          description="Enter verified pump voucher details for operational fuel ledger."
        >
          {voucherModalSuccess ? (
            <div className="p-6 rounded-xl bg-emerald-50 text-emerald-900 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <div className="font-bold text-base">Fuel Slip Logged Successfully!</div>
              <p className="text-xs text-emerald-700">
                Receipt queued for reconciliation in foundation audit ledger.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFuelSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Ambulance Unit <span className="text-red-500">*</span>
                </label>
                <select
                  value={fuelForm.vehicle}
                  onChange={(e) => setFuelForm({ ...fuelForm, vehicle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 font-medium"
                >
                  <option value="AMB-01">AMB-01 (Toyota Hilux 4x4)</option>
                  <option value="AMB-02">AMB-02 (Toyota Hiace Van)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Fuel Quantity (Liters) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 55"
                    value={fuelForm.liters}
                    onChange={(e) => setFuelForm({ ...fuelForm, liters: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Current Odometer (km) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 42890"
                    value={fuelForm.odometer}
                    onChange={(e) => setFuelForm({ ...fuelForm, odometer: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Gas Station & Slip No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PSO Station Mansehra / Slip #982"
                  value={fuelForm.station}
                  onChange={(e) => setFuelForm({ ...fuelForm, station: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveModal(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Entry
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}

      {/* Maintenance Modal */}
      {activeModal === "MAINTENANCE" && (
        <Modal
          isOpen={activeModal === "MAINTENANCE"}
          onClose={() => setActiveModal(null)}
          title="Log Vehicle Service Event"
          description="Document mechanical check, oil change, or equipment refill."
          footer={
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveModal(null)}
            >
              Close
            </Button>
          }
        >
          <div className="space-y-3 text-xs text-slate-600">
            <p>
              Routine maintenance form is ready for Part 3 database persistence. For emergency mechanical faults, contact the Chief Trustee immediately via helpline.
            </p>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
