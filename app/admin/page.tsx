"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Route,
  Receipt,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Fuel,
} from "lucide-react";

// Initial mock data strictly structured as CMS/PostgreSQL-ready schemas
interface DispatchRecord {
  id: string;
  dispatchId: string;
  patientName: string;
  emergencyType: "Maternity / Trauma" | "Accident / Critical" | "Elderly Transfer" | "Pediatric";
  pickup: string;
  destination: string;
  ambulanceId: string;
  driver: string;
  status: "COMPLETED" | "IN_TRANSIT" | "STANDBY";
  time: string;
}

const RECENT_DISPATCHES: DispatchRecord[] = [
  {
    id: "1",
    dispatchId: "DSP-2026-089",
    patientName: "Emergency Patient (Protected)",
    emergencyType: "Maternity / Trauma",
    pickup: "Upper Junglan Hamlet",
    destination: "DHQ Hospital Mansehra",
    ambulanceId: "AMB-01 (Toyota Hilux 4x4)",
    driver: "M. Tariq Khan",
    status: "COMPLETED",
    time: "2 hours ago",
  },
  {
    id: "2",
    dispatchId: "DSP-2026-088",
    patientName: "Elderly Patient (Protected)",
    emergencyType: "Elderly Transfer",
    pickup: "Bala Kot Outpost",
    destination: "King Abdullah Teaching Hospital",
    ambulanceId: "AMB-02 (Toyota Hiace)",
    driver: "Sajid Mehmood",
    status: "IN_TRANSIT",
    time: "45 mins ago",
  },
  {
    id: "3",
    dispatchId: "DSP-2026-087",
    patientName: "Farm Worker (Protected)",
    emergencyType: "Accident / Critical",
    pickup: "Olive Nursery Sector 3",
    destination: "RHC Oghi",
    ambulanceId: "AMB-01 (Toyota Hilux 4x4)",
    driver: "M. Tariq Khan",
    status: "COMPLETED",
    time: "Yesterday",
  },
  {
    id: "4",
    dispatchId: "DSP-2026-086",
    patientName: "Pediatric Referral (Protected)",
    emergencyType: "Pediatric",
    pickup: "Lower Village Junglan",
    destination: "Ayub Medical Complex Abbottabad",
    ambulanceId: "AMB-02 (Toyota Hiace)",
    driver: "Sajid Mehmood",
    status: "COMPLETED",
    time: "2 days ago",
  },
];

export default function AdminOverviewPage() {
  const [selectedRecord, setSelectedRecord] = useState<DispatchRecord | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const statusBadge = {
    COMPLETED: { label: "Completed", variant: "success" as const, icon: CheckCircle2 },
    IN_TRANSIT: { label: "In-Transit", variant: "sky" as const, icon: Clock },
    STANDBY: { label: "Standby", variant: "neutral" as const, icon: AlertTriangle },
  };

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Executive Operations & Governance"
      pageSubtitle="Al-Khidmat & Institutional foundation standards: Real-time oversight of ambulances, field dispatches, and financial ledger."
      breadcrumbs={[{ label: "Overview" }]}
      actions={
        <div className="flex items-center gap-2">
          <Button
            href="/admin/trips"
            variant="outline"
            size="sm"
            leftIcon={<Route className="w-4 h-4" />}
          >
            All Trips
          </Button>
          <Button
            href="/admin/ambulances"
            variant="primary"
            size="sm"
            leftIcon={<Truck className="w-4 h-4" />}
          >
            Manage Fleet
          </Button>
        </div>
      }
    >
      {/* Top Notice: Institutional Transparency Guarantee */}
      <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-sky-900">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-sky-700 shrink-0" />
          <span>
            <strong>Part 2 UI Shell Notice:</strong> Data values are structured as CMS-ready schema models. Medical privacy ethics strictly protect patient identities per Al-Khidmat / UNICEF standards.
          </span>
        </div>
        <Badge variant="sky" size="sm">
          Strict Audit Protocol
        </Badge>
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <DashboardStatCard
          title="Active Ambulance Fleet"
          value="2 Units"
          subtitle="100% operational readiness"
          variant="sky"
          icon={<Truck className="w-5 h-5" />}
          trend={{ value: "24/7 Ready", isPositive: true }}
        />
        <DashboardStatCard
          title="Monthly Dispatches"
          value="48"
          subtitle="Emergency patient transfers"
          variant="emerald"
          icon={<Route className="w-5 h-5" />}
          trend={{ value: "+12%", isPositive: true, label: "vs last month" }}
        />
        <DashboardStatCard
          title="Monthly Fuel Disbursed"
          value="840 L"
          subtitle="Direct vehicle voucher logging"
          variant="amber"
          icon={<Fuel className="w-5 h-5" />}
          trend={{ value: "Verified", isPositive: true }}
        />
        <DashboardStatCard
          title="Public Audited Ledger"
          value="PKR 1.25M"
          subtitle="Zero administrative diversion"
          variant="default"
          icon={<Receipt className="w-5 h-5" />}
          trend={{ value: "100%", isPositive: true, label: "reconciled" }}
        />
      </div>

      {/* Recent Dispatches Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Recent Field Dispatches & Patient Transfers
            </h2>
            <p className="text-xs text-slate-500">
              Latest emergency calls dispatched by Junglan rescue control.
            </p>
          </div>
          <Link
            href="/admin/trips"
            className="text-xs font-bold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1"
          >
            <span>View Full Ledger</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dispatch ID</TableHead>
                <TableHead>Emergency Type</TableHead>
                <TableHead>Route (Pickup → Hospital)</TableHead>
                <TableHead>Vehicle & Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_DISPATCHES.map((row) => {
                const badge = statusBadge[row.status];
                const Icon = badge.icon;
                return (
                  <TableRow
                    key={row.id}
                    isClickable
                    onClick={() => setSelectedRecord(row)}
                  >
                    <TableCell>
                      <span className="font-mono font-bold text-slate-900 text-xs">
                        {row.dispatchId}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-slate-800 text-xs">
                        {row.emergencyType}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <span className="text-slate-900 font-medium">{row.pickup}</span>
                        <span className="text-slate-400 mx-1.5">→</span>
                        <span className="text-slate-600 font-medium">{row.destination}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <div className="font-medium text-slate-800">{row.ambulanceId}</div>
                        <div className="text-slate-400 text-[11px]">{row.driver}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={badge.variant} size="sm">
                        <Icon className="w-3 h-3 mr-1" />
                        {badge.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-slate-500">{row.time}</span>
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(row);
                        }}
                        className="text-xs font-bold text-sky-700 hover:text-sky-900 hover:underline cursor-pointer"
                      >
                        Inspect
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            currentPage={currentPage}
            totalPages={1}
            totalItems={RECENT_DISPATCHES.length}
            itemsPerPage={10}
            onPageChange={setCurrentPage}
          />
        </TableContainer>
      </div>

      {/* Inspection Modal */}
      {selectedRecord && (
        <Modal
          isOpen={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
          title={`Dispatch Record: ${selectedRecord.dispatchId}`}
          description="Verified field dispatch entry logged in the Junglan emergency system."
          footer={
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedRecord(null)}
            >
              Close
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                  Status
                </span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 inline-block">
                  {selectedRecord.status}
                </span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                  Timestamp
                </span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 inline-block">
                  {selectedRecord.time}
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div>
                <strong className="text-slate-700">Nature of Emergency:</strong>{" "}
                <span className="text-slate-900 font-medium">{selectedRecord.emergencyType}</span>
              </div>
              <div>
                <strong className="text-slate-700">Assigned Vehicle:</strong>{" "}
                <span className="text-slate-900 font-medium">{selectedRecord.ambulanceId}</span>
              </div>
              <div>
                <strong className="text-slate-700">Driver on Shift:</strong>{" "}
                <span className="text-slate-900 font-medium">{selectedRecord.driver}</span>
              </div>
              <div>
                <strong className="text-slate-700">Route Origin:</strong>{" "}
                <span className="text-slate-900 font-medium">{selectedRecord.pickup}</span>
              </div>
              <div>
                <strong className="text-slate-700">Receiving Medical Center:</strong>{" "}
                <span className="text-slate-900 font-medium">{selectedRecord.destination}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] leading-relaxed">
              Medical details and patient clinical condition are strictly protected under patient confidentiality protocols.
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
