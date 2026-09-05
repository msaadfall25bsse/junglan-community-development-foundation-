"use client";

import React, { useState } from "react";
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
  TablePagination,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  Truck,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  ShieldCheck,
  Plus,
} from "lucide-react";

interface AmbulanceRecord {
  id: string;
  registrationNumber: string;
  model: string;
  terrainType: "Mountain 4x4 Hilux" | "Standard Hiace Van";
  assignedDriver: string;
  driverPhone: string;
  currentStatus: "ACTIVE_READY" | "ON_MISSION" | "MAINTENANCE_DUE";
  lastOdometer: string;
  lastServiceDate: string;
  fuelEfficiency: string;
}

const FLEET_RECORDS: AmbulanceRecord[] = [
  {
    id: "amb-1",
    registrationNumber: "PK-KP-2024-AMB1",
    model: "Toyota Hilux 4x4 High-Clearance Emergency Unit",
    terrainType: "Mountain 4x4 Hilux",
    assignedDriver: "M. Tariq Khan",
    driverPhone: "+92 300 1234567",
    currentStatus: "ACTIVE_READY",
    lastOdometer: "42,850 km",
    lastServiceDate: "15 Aug 2026",
    fuelEfficiency: "9.2 km/L (Rough Terrain)",
  },
  {
    id: "amb-2",
    registrationNumber: "PK-KP-2025-AMB2",
    model: "Toyota Hiace High-Roof Patient Transport Unit",
    terrainType: "Standard Hiace Van",
    assignedDriver: "Sajid Mehmood",
    driverPhone: "+92 301 7654321",
    currentStatus: "ACTIVE_READY",
    lastOdometer: "28,120 km",
    lastServiceDate: "28 Jul 2026",
    fuelEfficiency: "11.5 km/L (Highway & Main Roads)",
  },
];

export default function AdminAmbulancesPage() {
  const [selectedAmbulance, setSelectedAmbulance] = useState<AmbulanceRecord | null>(null);

  const statusMap = {
    ACTIVE_READY: { label: "Active & 24/7 Ready", variant: "success" as const, icon: CheckCircle2 },
    ON_MISSION: { label: "On Emergency Dispatch", variant: "sky" as const, icon: Truck },
    MAINTENANCE_DUE: { label: "Routine Service Due", variant: "warning" as const, icon: AlertTriangle },
  };

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Ambulance Fleet Management"
      pageSubtitle="Supervise vehicle deployment, driver rosters, terrain capabilities, and scheduled maintenance."
      breadcrumbs={[
        { label: "Overview", href: "/admin" },
        { label: "Ambulance Fleet" },
      ]}
      actions={
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => alert("Fleet Registry addition is configured for Part 3 database migration.")}
        >
          Register Vehicle
        </Button>
      }
    >
      {/* Fleet KPI overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <DashboardStatCard
          title="Total Fleet Size"
          value="2 Vehicles"
          subtitle="1 Mountain 4x4 + 1 High-Roof"
          variant="sky"
          icon={<Truck className="w-5 h-5" />}
        />
        <DashboardStatCard
          title="Fleet Readiness"
          value="100%"
          subtitle="Both units fully operational"
          variant="emerald"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <DashboardStatCard
          title="Next Scheduled Service"
          value="Sep 15"
          subtitle="AMB-01 Filter & Brake Check"
          variant="amber"
          icon={<Wrench className="w-5 h-5" />}
        />
      </div>

      {/* Fleet Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Registered Emergency Ambulances
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            2 Vehicles Registered
          </span>
        </div>

        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Registration / Plate</TableHead>
                <TableHead>Vehicle Specifications</TableHead>
                <TableHead>Assigned Driver</TableHead>
                <TableHead>Odometer</TableHead>
                <TableHead>Readiness Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FLEET_RECORDS.map((vehicle) => {
                const badge = statusMap[vehicle.currentStatus];
                const Icon = badge.icon;
                return (
                  <TableRow
                    key={vehicle.id}
                    isClickable
                    onClick={() => setSelectedAmbulance(vehicle)}
                  >
                    <TableCell>
                      <div>
                        <div className="font-mono font-bold text-slate-900 text-xs">
                          {vehicle.registrationNumber}
                        </div>
                        <div className="text-[11px] text-sky-700 font-medium">
                          {vehicle.terrainType}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-medium text-slate-800 max-w-xs">
                        {vehicle.model}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <div className="font-bold text-slate-900">{vehicle.assignedDriver}</div>
                        <div className="text-slate-400 text-[11px]">{vehicle.driverPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-mono font-medium text-slate-700">
                        {vehicle.lastOdometer}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={badge.variant} size="sm">
                        <Icon className="w-3 h-3 mr-1" />
                        {badge.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAmbulance(vehicle);
                        }}
                        className="text-xs font-bold text-sky-700 hover:text-sky-900 hover:underline cursor-pointer"
                      >
                        Details
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            currentPage={1}
            totalPages={1}
            totalItems={FLEET_RECORDS.length}
            itemsPerPage={10}
            onPageChange={() => {}}
          />
        </TableContainer>
      </div>

      {/* Ambulance Detail Modal */}
      {selectedAmbulance && (
        <Modal
          isOpen={!!selectedAmbulance}
          onClose={() => setSelectedAmbulance(null)}
          title={selectedAmbulance.model}
          description={`Plate Registration: ${selectedAmbulance.registrationNumber}`}
          footer={
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedAmbulance(null)}
            >
              Done
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                  Status
                </span>
                <span className="font-bold text-emerald-700 text-sm mt-0.5 inline-block">
                  {selectedAmbulance.currentStatus.replace("_", " ")}
                </span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                  Last Full Service
                </span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 inline-block">
                  {selectedAmbulance.lastServiceDate}
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div>
                <strong className="text-slate-700">Terrain Configuration:</strong>{" "}
                <span className="text-slate-900 font-medium">{selectedAmbulance.terrainType}</span>
              </div>
              <div>
                <strong className="text-slate-700">Primary Duty Driver:</strong>{" "}
                <span className="text-slate-900 font-medium">{selectedAmbulance.assignedDriver} ({selectedAmbulance.driverPhone})</span>
              </div>
              <div>
                <strong className="text-slate-700">Current Odometer:</strong>{" "}
                <span className="text-slate-900 font-mono font-medium">{selectedAmbulance.lastOdometer}</span>
              </div>
              <div>
                <strong className="text-slate-700">Operational Fuel Efficiency:</strong>{" "}
                <span className="text-slate-900 font-medium">{selectedAmbulance.fuelEfficiency}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 flex items-start gap-2.5 text-sky-900">
              <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                Emergency equipment including stretcher, oxygen cylinder, suction unit, and first-response trauma kit are verified before each shift.
              </div>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
