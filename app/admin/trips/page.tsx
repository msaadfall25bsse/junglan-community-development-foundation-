"use client";

import React, { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
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
  Search,
  Filter,
  CheckCircle2,
  Download,
} from "lucide-react";

interface TripRecord {
  id: string;
  tripCode: string;
  date: string;
  patientType: "Maternity Care" | "Accident & Trauma" | "Elderly / Cardiac" | "Pediatric Referral";
  origin: string;
  destination: string;
  distanceKm: number;
  ambulance: string;
  driver: string;
  status: "COMPLETED" | "IN_TRANSIT" | "STANDBY";
}

const ALL_TRIPS: TripRecord[] = [
  {
    id: "1",
    tripCode: "TRIP-2026-0042",
    date: "04 Sep 2026",
    patientType: "Maternity Care",
    origin: "Upper Junglan Valley",
    destination: "DHQ Hospital Mansehra",
    distanceKm: 34,
    ambulance: "AMB-01 (4x4)",
    driver: "M. Tariq Khan",
    status: "COMPLETED",
  },
  {
    id: "2",
    tripCode: "TRIP-2026-0041",
    date: "04 Sep 2026",
    patientType: "Accident & Trauma",
    origin: "Olive Nursery Bypass",
    destination: "RHC Oghi",
    distanceKm: 18,
    ambulance: "AMB-02 (Hiace)",
    driver: "Sajid Mehmood",
    status: "COMPLETED",
  },
  {
    id: "3",
    tripCode: "TRIP-2026-0040",
    date: "03 Sep 2026",
    patientType: "Elderly / Cardiac",
    origin: "Kotli Hamlets",
    destination: "Ayub Medical Complex Abbottabad",
    distanceKm: 62,
    ambulance: "AMB-01 (4x4)",
    driver: "M. Tariq Khan",
    status: "COMPLETED",
  },
  {
    id: "4",
    tripCode: "TRIP-2026-0039",
    date: "02 Sep 2026",
    patientType: "Pediatric Referral",
    origin: "Lower Junglan",
    destination: "King Abdullah Hospital",
    distanceKm: 28,
    ambulance: "AMB-02 (Hiace)",
    driver: "Sajid Mehmood",
    status: "COMPLETED",
  },
  {
    id: "5",
    tripCode: "TRIP-2026-0038",
    date: "01 Sep 2026",
    patientType: "Maternity Care",
    origin: "Gali Badral Outpost",
    destination: "DHQ Hospital Mansehra",
    distanceKm: 41,
    ambulance: "AMB-01 (4x4)",
    driver: "M. Tariq Khan",
    status: "COMPLETED",
  },
];

export default function AdminTripsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedTrip, setSelectedTrip] = useState<TripRecord | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTrips = useMemo(() => {
    return ALL_TRIPS.filter((t) => {
      const matchesSearch =
        t.tripCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.patientType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = filterStatus === "ALL" || t.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Emergency Dispatches & Trip Registry"
      pageSubtitle="Complete historical and real-time records of patient transports across mountain and valley sectors."
      breadcrumbs={[
        { label: "Overview", href: "/admin" },
        { label: "Trip Dispatches" },
      ]}
      actions={
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => alert("Audit log export formatted for CSV/PDF in Part 3.")}
        >
          Export CSV
        </Button>
      }
    >
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by trip code, village, hospital..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <div className="flex gap-1">
            {["ALL", "COMPLETED", "IN_TRANSIT"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  filterStatus === status
                    ? "bg-sky-600 text-white shadow-2xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {status.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trips Table */}
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trip Code</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Emergency Case</TableHead>
              <TableHead>Route (Origin → Destination)</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Vehicle & Driver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrips.map((row) => (
              <TableRow
                key={row.id}
                isClickable
                onClick={() => setSelectedTrip(row)}
              >
                <TableCell>
                  <span className="font-mono font-bold text-slate-900 text-xs">
                    {row.tripCode}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-xs text-slate-600">{row.date}</span>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-semibold text-slate-800">
                    {row.patientType}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="text-xs">
                    <span className="text-slate-900 font-medium">{row.origin}</span>
                    <span className="text-slate-400 mx-1.5">→</span>
                    <span className="text-slate-600 font-medium">{row.destination}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-mono text-slate-700">
                    {row.distanceKm} km
                  </span>
                </TableCell>
                <TableCell>
                  <div className="text-xs">
                    <div className="font-medium text-slate-800">{row.ambulance}</div>
                    <div className="text-[11px] text-slate-400">{row.driver}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="success" size="sm">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTrip(row);
                    }}
                    className="text-xs font-bold text-sky-700 hover:text-sky-900 hover:underline cursor-pointer"
                  >
                    Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          currentPage={currentPage}
          totalPages={1}
          totalItems={filteredTrips.length}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </TableContainer>

      {/* Trip Details Modal */}
      {selectedTrip && (
        <Modal
          isOpen={!!selectedTrip}
          onClose={() => setSelectedTrip(null)}
          title={`Trip Log: ${selectedTrip.tripCode}`}
          description={`Logged dispatch for ${selectedTrip.date}`}
          footer={
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedTrip(null)}
            >
              Close
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                  Case Category
                </span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 inline-block">
                  {selectedTrip.patientType}
                </span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                  Logged Distance
                </span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 inline-block">
                  {selectedTrip.distanceKm} km Round-trip
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div>
                <strong className="text-slate-700">Patient Pickup Location:</strong>{" "}
                <span className="text-slate-900 font-medium">{selectedTrip.origin}</span>
              </div>
              <div>
                <strong className="text-slate-700">Target Hospital:</strong>{" "}
                <span className="text-slate-900 font-medium">{selectedTrip.destination}</span>
              </div>
              <div>
                <strong className="text-slate-700">Vehicle Assigned:</strong>{" "}
                <span className="text-slate-900 font-medium">{selectedTrip.ambulance}</span>
              </div>
              <div>
                <strong className="text-slate-700">Driver:</strong>{" "}
                <span className="text-slate-900 font-medium">{selectedTrip.driver}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 text-[11px] leading-relaxed">
              Transport provided 100% free of charge to the patient, funded by community donors.
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
