"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Users,
  Search,
  AlertTriangle,
  RefreshCw,
  Truck,
  HeartPulse,
  UserCheck,
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

interface PatientItem {
  id: string;
  patientIdentifier: string;
  fullName: string;
  cnicOrBForm?: string | null;
  gender: "MALE" | "FEMALE" | "CHILD" | "OTHER";
  age: number;
  contactNumber: string;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  residenceArea: string;
  village?: string | null;
  medicalConditionSummary: string;
  yearPeriodId: string;
  createdAt: string;
}

export default function DataEntryOverviewPage() {
  const [activeTab, setActiveTab] = useState<"SHIFT_LOG" | "PATIENT_LOOKUP">("SHIFT_LOG");
  const [entries, setEntries] = useState<ShiftEntry[]>([]);
  const [patients, setPatients] = useState<PatientItem[]>([]);
  const [patientSearch, setPatientSearch] = useState("");
  
  // Shift telemetry stats
  const [stats, setStats] = useState({
    todayDispatches: 0,
    totalPatients: 0,
    readyAmbulances: 2,
    shiftVouchersCount: 0,
  });

  // Modals state
  const [activeModal, setActiveModal] = useState<"PATIENT" | "FUEL" | "MAINTENANCE" | null>(null);
  const [modalSuccess, setModalSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Duplicate warning state for patient intake
  const [duplicateMatches, setDuplicateMatches] = useState<any[] | null>(null);

  // Patient Intake Form Data
  const [patientForm, setPatientForm] = useState({
    fullName: "",
    cnicOrBForm: "",
    gender: "MALE" as "MALE" | "FEMALE" | "CHILD" | "OTHER",
    age: 32,
    contactNumber: "03001234567",
    emergencyContactName: "",
    emergencyContactPhone: "",
    residenceArea: "Junglan Main Valley",
    village: "Junglan",
    medicalConditionSummary: "Emergency medical transit required.",
    yearPeriodId: "2026",
  });

  // Fuel Slip Form Data
  const [fuelForm, setFuelForm] = useState({
    vehicle: "AMB-01",
    liters: "50",
    odometer: "51200",
    station: "PSO Station Mansehra",
    cost: "14250",
  });

  // Maintenance Slip Form Data
  const [maintenanceForm, setMaintenanceForm] = useState({
    vehicle: "AMB-01",
    serviceType: "Routine Oil & Filter Change",
    vendor: "Oghi Central Workshop",
    invoiceNumber: "INV-8912",
    amountPKR: "8500",
    description: "Scheduled engine oil replacement, oil filter, and air pressure check.",
  });

  // Load telemetry and live activity stream
  const loadLiveEntries = useCallback(() => {
    Promise.all([
      fetch("/api/trips?limit=15").then((r) => r.json()).catch(() => ({ data: [] })),
      fetch("/api/expenses?limit=15").then((r) => r.json()).catch(() => ({ data: [] })),
      fetch("/api/patients?limit=50").then((r) => r.json()).catch(() => ({ data: [] })),
      fetch("/api/ambulances").then((r) => r.json()).catch(() => ({ data: [] })),
    ]).then(([tripsRes, expensesRes, patientsRes, ambulancesRes]) => {
      const shiftList: ShiftEntry[] = [];
      let dispatchCount = 0;
      let vouchersCount = 0;

      if (tripsRes.success && Array.isArray(tripsRes.data)) {
        dispatchCount = tripsRes.data.length;
        tripsRes.data.slice(0, 10).forEach((t: any) => {
          shiftList.push({
            id: t.id,
            type: "DISPATCH",
            title: `${t.tripIdentifier || "Trip"} (${t.patientName || "Patient Transfer"} to ${t.dropoffHospital})`,
            vehicle: t.ambulance?.ambulanceIdentifier || t.ambulanceId || "AMB-01",
            timestamp: new Date(t.dispatchTime || t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            loggedBy: t.driverName || "Field Driver",
            status: "SUBMITTED",
          });
        });
      }

      if (expensesRes.success && Array.isArray(expensesRes.data)) {
        vouchersCount = expensesRes.data.length;
        expensesRes.data.slice(0, 8).forEach((e: any) => {
          shiftList.push({
            id: e.id,
            type: e.category?.includes("FUEL") ? "FUEL" : "MAINTENANCE",
            title: `${e.voucherNumber}: ${e.title} (PKR ${Number(e.amountPKR).toLocaleString()})`,
            vehicle: e.category?.includes("FUEL") ? "Ambulance Unit" : "Workshop Depot",
            timestamp: new Date(e.expenseDate || e.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            loggedBy: e.paidTo || "Intake Desk",
            status: "SUBMITTED",
          });
        });
      }

      let patientCount = 0;
      if (patientsRes.success && Array.isArray(patientsRes.data)) {
        patientCount = patientsRes.data.length;
        setPatients(patientsRes.data);
      }

      let availableAmbulanceCount = 2;
      if (ambulancesRes.success && Array.isArray(ambulancesRes.data)) {
        availableAmbulanceCount = ambulancesRes.data.filter((a: any) => a.status === "AVAILABLE" || a.isActive).length;
      }

      setStats({
        todayDispatches: dispatchCount,
        totalPatients: patientCount,
        readyAmbulances: availableAmbulanceCount || 2,
        shiftVouchersCount: vouchersCount,
      });

      if (shiftList.length > 0) {
        setEntries(shiftList);
      }
    });
  }, []);

  useEffect(() => {
    loadLiveEntries();
  }, [loadLiveEntries]);

  // Real-time Duplicate Patient Detection Handler
  const checkDuplicate = useCallback(async (cnic: string, phone: string) => {
    if (!cnic && !phone) {
      setDuplicateMatches(null);
      return;
    }
    const cleanCnic = cnic.replace(/\D/g, "");
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanCnic.length < 13 && cleanPhone.length < 10) {
      setDuplicateMatches(null);
      return;
    }

    try {
      const params = new URLSearchParams();
      if (cleanCnic.length >= 13) params.set("cnic", cnic);
      if (cleanPhone.length >= 10) params.set("phone", phone);

      const res = await fetch(`/api/patients/check-duplicate?${params.toString()}`);
      const data = await res.json();
      if (data.success && data.matches && data.matches.length > 0) {
        setDuplicateMatches(data.matches);
      } else {
        setDuplicateMatches(null);
      }
    } catch {
      setDuplicateMatches(null);
    }
  }, []);

  // Debounced trigger for duplicate checking
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeModal === "PATIENT") {
        checkDuplicate(patientForm.cnicOrBForm, patientForm.contactNumber);
      }
    }, 450);
    return () => clearTimeout(timer);
  }, [patientForm.cnicOrBForm, patientForm.contactNumber, activeModal, checkDuplicate]);

  // Handle Patient Intake Submit
  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: patientForm.fullName.trim(),
          cnicOrBForm: patientForm.cnicOrBForm.trim() || undefined,
          gender: patientForm.gender,
          age: Number(patientForm.age),
          contactNumber: patientForm.contactNumber.trim(),
          emergencyContactName: patientForm.emergencyContactName.trim() || undefined,
          emergencyContactPhone: patientForm.emergencyContactPhone.trim() || undefined,
          residenceArea: patientForm.residenceArea.trim(),
          village: patientForm.village.trim() || undefined,
          medicalConditionSummary: patientForm.medicalConditionSummary.trim(),
          yearPeriodId: patientForm.yearPeriodId,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to register patient");
      }

      setModalSuccess(`Patient "${patientForm.fullName}" registered successfully with ID: ${json.data?.patientIdentifier || "Generated"}`);
      setTimeout(() => {
        setModalSuccess(null);
        setActiveModal(null);
        setPatientForm({
          fullName: "",
          cnicOrBForm: "",
          gender: "MALE",
          age: 30,
          contactNumber: "03001234567",
          emergencyContactName: "",
          emergencyContactPhone: "",
          residenceArea: "Junglan Main Valley",
          village: "Junglan",
          medicalConditionSummary: "Emergency medical transit required.",
          yearPeriodId: "2026",
        });
        setDuplicateMatches(null);
        loadLiveEntries();
      }, 1200);
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred during patient registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Fuel Slip Submit
  const handleFuelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    const litersNum = Number(fuelForm.liters) || 0;
    const calculatedAmount = Number(fuelForm.cost) || (litersNum * 285) || 5000;
    const voucherNumber = `EXP-2026-F${Date.now().toString().slice(-4)}`;

    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voucherNumber,
          title: `Ambulance Diesel: ${fuelForm.liters}L (${fuelForm.vehicle})`,
          category: "AMBULANCE_FUEL",
          amountPKR: calculatedAmount,
          paidTo: fuelForm.station,
          paymentMethod: "CASH",
          expenseDate: new Date().toISOString(),
          description: `Fuel refill ${fuelForm.liters}L at ${fuelForm.station}, Odometer ${fuelForm.odometer} km. Logged at Field Operations Desk.`,
          yearPeriodId: "2026",
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to record fuel slip voucher");
      }

      setModalSuccess("Fuel voucher logged successfully into official treasury ledger.");
      setTimeout(() => {
        setModalSuccess(null);
        setActiveModal(null);
        setFuelForm({ vehicle: "AMB-01", liters: "50", odometer: "51200", station: "PSO Station Mansehra", cost: "14250" });
        loadLiveEntries();
      }, 1200);
    } catch (err: any) {
      setFormError(err.message || "Failed to record fuel voucher");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Workshop Maintenance Submit
  const handleMaintenanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    const voucherNumber = `EXP-2026-M${Date.now().toString().slice(-4)}`;

    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voucherNumber,
          title: `${maintenanceForm.serviceType} (${maintenanceForm.vehicle})`,
          category: "VEHICLE_MAINTENANCE",
          amountPKR: Number(maintenanceForm.amountPKR) || 5000,
          paidTo: maintenanceForm.vendor,
          paymentMethod: "CASH",
          expenseDate: new Date().toISOString(),
          description: `Invoice: ${maintenanceForm.invoiceNumber}. ${maintenanceForm.description}`,
          yearPeriodId: "2026",
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to record maintenance voucher");
      }

      setModalSuccess("Maintenance service voucher recorded into fleet log.");
      setTimeout(() => {
        setModalSuccess(null);
        setActiveModal(null);
        setMaintenanceForm({
          vehicle: "AMB-01",
          serviceType: "Routine Oil & Filter Change",
          vendor: "Oghi Central Workshop",
          invoiceNumber: "INV-8912",
          amountPKR: "8500",
          description: "Scheduled engine oil replacement, oil filter, and air pressure check.",
        });
        loadLiveEntries();
      }, 1200);
    } catch (err: any) {
      setFormError(err.message || "Failed to record maintenance slip");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter patients for Tab 2
  const filteredPatients = patients.filter((p) => {
    if (!patientSearch.trim()) return true;
    const query = patientSearch.toLowerCase();
    return (
      p.fullName.toLowerCase().includes(query) ||
      (p.cnicOrBForm && p.cnicOrBForm.includes(query)) ||
      p.contactNumber.includes(query) ||
      p.residenceArea.toLowerCase().includes(query) ||
      (p.village && p.village.toLowerCase().includes(query)) ||
      p.patientIdentifier.toLowerCase().includes(query)
    );
  });

  return (
    <DashboardLayout
      role="DATA_ENTRY"
      pageTitle="Field Operations & Intake Desk"
      pageSubtitle="Authorized workstation for rapid patient intake, ambulance dispatching, fuel slips, and workshop invoices."
      breadcrumbs={[{ label: "Operations Desk" }]}
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadLiveEntries}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh Desk
          </Button>
          <Button
            href="/data-entry/trips/new"
            variant="primary"
            size="sm"
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Dispatch Ambulance
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top Shift Telemetry KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <DashboardStatCard
            title="Total Dispatches"
            value={stats.todayDispatches}
            subtitle="Emergency transit runs"
            icon={<Route className="w-5 h-5" />}
            variant="sky"
          />
          <DashboardStatCard
            title="Patients Enrolled"
            value={stats.totalPatients}
            subtitle="Verified community registry"
            icon={<Users className="w-5 h-5" />}
            variant="emerald"
          />
          <DashboardStatCard
            title="Fleet Readiness"
            value={`${stats.readyAmbulances} Units`}
            subtitle="Available 4x4 vehicles"
            icon={<Truck className="w-5 h-5" />}
            variant="amber"
          />
          <DashboardStatCard
            title="Shift Vouchers"
            value={stats.shiftVouchersCount}
            subtitle="Fuel & workshop receipts"
            icon={<Fuel className="w-5 h-5" />}
            variant="default"
          />
        </div>

        {/* 4 Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Dispatch */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-xl bg-sky-50 text-sky-700 w-fit mb-3">
                <Route className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Emergency Trip Dispatch
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Launch rapid patient transfer with assigned driver, vehicle, and route telemetry.
              </p>
            </div>
            <Button
              href="/data-entry/trips/new"
              variant="primary"
              size="sm"
              className="w-full justify-center"
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Start Trip Dispatch
            </Button>
          </div>

          {/* Card 2: Patient Intake */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 w-fit mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Quick Patient Intake
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Register incoming patient with live CNIC/Phone duplicate detection before dispatch.
              </p>
            </div>
            <Button
              onClick={() => {
                setFormError(null);
                setModalSuccess(null);
                setActiveModal("PATIENT");
              }}
              variant="outline"
              size="sm"
              className="w-full justify-center border-emerald-300 text-emerald-800 hover:bg-emerald-50"
              leftIcon={<HeartPulse className="w-4 h-4" />}
            >
              Admit New Patient
            </Button>
          </div>

          {/* Card 3: Fuel */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-amber-300 hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-xl bg-amber-50 text-amber-700 w-fit mb-3">
                <Fuel className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Record Fuel Voucher
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Submit pump fuel slip, station name, liters dispensed, and odometer reading.
              </p>
            </div>
            <Button
              onClick={() => {
                setFormError(null);
                setModalSuccess(null);
                setActiveModal("FUEL");
              }}
              variant="outline"
              size="sm"
              className="w-full justify-center border-amber-300 text-amber-800 hover:bg-amber-50"
              leftIcon={<Fuel className="w-4 h-4" />}
            >
              Log Fuel Slip
            </Button>
          </div>

          {/* Card 4: Maintenance */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-xl bg-slate-100 text-slate-700 w-fit mb-3">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Workshop Service Slip
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Document oil service, tire repair, brake pads, or medical oxygen cylinder refill.
              </p>
            </div>
            <Button
              onClick={() => {
                setFormError(null);
                setModalSuccess(null);
                setActiveModal("MAINTENANCE");
              }}
              variant="outline"
              size="sm"
              className="w-full justify-center"
              leftIcon={<Wrench className="w-4 h-4" />}
            >
              Log Service Check
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("SHIFT_LOG")}
              className={`pb-3 text-sm font-bold transition-all border-b-2 ${
                activeTab === "SHIFT_LOG"
                  ? "border-sky-600 text-sky-700"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Today&apos;s Field Shift Log ({entries.length})
            </button>
            <button
              onClick={() => setActiveTab("PATIENT_LOOKUP")}
              className={`pb-3 text-sm font-bold transition-all border-b-2 ${
                activeTab === "PATIENT_LOOKUP"
                  ? "border-sky-600 text-sky-700"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Patient Registry & Verification ({patients.length})
            </button>
          </div>
        </div>

        {/* TAB 1: SHIFT LOG */}
        {activeTab === "SHIFT_LOG" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Current Duty Shift Activity Stream
                </h2>
                <p className="text-xs text-slate-500">
                  Real-time feed of trips, fuel slips, and maintenance vouchers logged at this terminal.
                </p>
              </div>
              <Badge variant="success" size="sm">
                Duty Cycle: Active
              </Badge>
            </div>

            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity Type</TableHead>
                    <TableHead>Event Details</TableHead>
                    <TableHead>Assigned Vehicle</TableHead>
                    <TableHead>Logged Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-slate-400">
                        No shift entries recorded yet today. Click one of the quick actions above to record activity.
                      </TableCell>
                    </TableRow>
                  ) : (
                    entries.map((entry) => (
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
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {/* TAB 2: PATIENT LOOKUP */}
        {activeTab === "PATIENT_LOOKUP" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Patient Registry & Rapid Verification
                </h2>
                <p className="text-xs text-slate-500">
                  Search existing patient medical profiles before dispatching an ambulance to avoid duplication.
                </p>
              </div>
              <Button
                onClick={() => {
                  setFormError(null);
                  setModalSuccess(null);
                  setActiveModal("PATIENT");
                }}
                variant="primary"
                size="sm"
                leftIcon={<PlusCircle className="w-4 h-4" />}
              >
                Intake New Patient
              </Button>
            </div>

            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                placeholder="Search by Name, CNIC, Phone, or Village..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>

            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Identifier</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Age / Gender</TableHead>
                    <TableHead>Contact Phone</TableHead>
                    <TableHead>Residence / Village</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                        No matching patients found. Click &quot;Intake New Patient&quot; to enroll this patient.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPatients.slice(0, 15).map((pat) => (
                      <TableRow key={pat.id}>
                        <TableCell>
                          <span className="font-mono text-xs font-bold text-sky-700">
                            {pat.patientIdentifier}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-slate-900 text-xs">
                            {pat.fullName}
                          </div>
                          {pat.cnicOrBForm && (
                            <div className="text-[10px] text-slate-400 font-mono">
                              CNIC: {pat.cnicOrBForm}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-xs text-slate-700">
                            {pat.age} yrs • {pat.gender}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs text-slate-600 font-mono">
                            {pat.contactNumber}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs text-slate-700 font-medium">
                            {pat.residenceArea}
                          </div>
                          {pat.village && (
                            <div className="text-[10px] text-slate-400">
                              {pat.village}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link
                            href={`/data-entry/trips/new?patientId=${pat.id}&patientName=${encodeURIComponent(pat.fullName)}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 transition-colors"
                          >
                            <Route className="w-3.5 h-3.5" />
                            Dispatch Trip
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {/* MODAL 1: QUICK PATIENT INTAKE */}
        {activeModal === "PATIENT" && (
          <Modal
            isOpen={activeModal === "PATIENT"}
            onClose={() => setActiveModal(null)}
            title="Field Patient Rapid Intake"
            description="Enroll incoming patient with duplicate verification and assign to current operational year."
          >
            {modalSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-50 text-emerald-900 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="font-bold text-base">Patient Admitted Successfully!</div>
                <p className="text-xs text-emerald-700">{modalSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handlePatientSubmit} className="space-y-4 text-xs">
                {formError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Duplicate Warning Banner */}
                {duplicateMatches && duplicateMatches.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-amber-800">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Potential Duplicate Found in Registry!</span>
                    </div>
                    <p className="text-[11px] text-amber-700">
                      The entered CNIC or Phone Number matches an existing patient:
                    </p>
                    <div className="space-y-1">
                      {duplicateMatches.map((m: any) => (
                        <div key={m.id} className="p-2 rounded bg-white/80 border border-amber-200 text-[11px] font-medium flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-800">{m.fullName}</span> ({m.patientIdentifier}) — {m.residenceArea || m.village}
                          </div>
                          <Badge variant="warning" size="sm">Existing Match</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abdul Hameed"
                      value={patientForm.fullName}
                      onChange={(e) => setPatientForm({ ...patientForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      CNIC / Form-B (XXXXX-XXXXXXX-X)
                    </label>
                    <input
                      type="text"
                      placeholder="13202-1234567-1"
                      value={patientForm.cnicOrBForm}
                      onChange={(e) => setPatientForm({ ...patientForm, cnicOrBForm: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Gender <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={patientForm.gender}
                      onChange={(e: any) => setPatientForm({ ...patientForm, gender: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900"
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="CHILD">Child</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Age (Years) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="125"
                      value={patientForm.age}
                      onChange={(e) => setPatientForm({ ...patientForm, age: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Contact Phone <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="03001234567"
                      value={patientForm.contactNumber}
                      onChange={(e) => setPatientForm({ ...patientForm, contactNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Residence Area / Mohalla <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Birote Mohalla, Junglan"
                      value={patientForm.residenceArea}
                      onChange={(e) => setPatientForm({ ...patientForm, residenceArea: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Village / Valley
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Junglan, Oghi"
                      value={patientForm.village}
                      onChange={(e) => setPatientForm({ ...patientForm, village: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Emergency Medical Summary / Chief Complaint <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. Acute respiratory distress, oxygen support required during transfer."
                    value={patientForm.medicalConditionSummary}
                    onChange={(e) => setPatientForm({ ...patientForm, medicalConditionSummary: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveModal(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    isLoading={isSubmitting}
                    leftIcon={<UserCheck className="w-4 h-4" />}
                  >
                    Complete Intake
                  </Button>
                </div>
              </form>
            )}
          </Modal>
        )}

        {/* MODAL 2: FUEL SLIP */}
        {activeModal === "FUEL" && (
          <Modal
            isOpen={activeModal === "FUEL"}
            onClose={() => setActiveModal(null)}
            title="Log Ambulance Fuel Slip"
            description="Enter verified pump voucher details for operational fuel ledger."
          >
            {modalSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-50 text-emerald-900 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="font-bold text-base">Fuel Slip Logged Successfully!</div>
                <p className="text-xs text-emerald-700">{modalSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleFuelSubmit} className="space-y-4 text-xs">
                {formError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    {formError}
                  </div>
                )}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Ambulance Unit <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={fuelForm.vehicle}
                    onChange={(e) => setFuelForm({ ...fuelForm, vehicle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 font-medium"
                  >
                    <option value="AMB-01">AMB-01 (Toyota Hilux 4x4 Mountain Unit)</option>
                    <option value="AMB-02">AMB-02 (Toyota Hiace Van Service)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Quantity (Liters) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 50"
                      value={fuelForm.liters}
                      onChange={(e) => {
                        const lit = Number(e.target.value) || 0;
                        setFuelForm({ ...fuelForm, liters: e.target.value, cost: String(lit * 285) });
                      }}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Current Odometer (km) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 51200"
                      value={fuelForm.odometer}
                      onChange={(e) => setFuelForm({ ...fuelForm, odometer: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Pump / Station Slip <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="PSO Station Mansehra"
                      value={fuelForm.station}
                      onChange={(e) => setFuelForm({ ...fuelForm, station: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Total Cost (PKR) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 14250"
                      value={fuelForm.cost}
                      onChange={(e) => setFuelForm({ ...fuelForm, cost: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 font-bold text-sky-800"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveModal(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
                    Record Voucher
                  </Button>
                </div>
              </form>
            )}
          </Modal>
        )}

        {/* MODAL 3: WORKSHOP MAINTENANCE */}
        {activeModal === "MAINTENANCE" && (
          <Modal
            isOpen={activeModal === "MAINTENANCE"}
            onClose={() => setActiveModal(null)}
            title="Log Workshop Service Slip"
            description="Record vehicle repair, routine oil check, or medical oxygen refill."
          >
            {modalSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-50 text-emerald-900 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="font-bold text-base">Service Slip Recorded!</div>
                <p className="text-xs text-emerald-700">{modalSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleMaintenanceSubmit} className="space-y-4 text-xs">
                {formError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    {formError}
                  </div>
                )}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Ambulance Vehicle <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={maintenanceForm.vehicle}
                    onChange={(e) => setMaintenanceForm({ ...maintenanceForm, vehicle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 font-medium"
                  >
                    <option value="AMB-01">AMB-01 (Toyota Hilux 4x4)</option>
                    <option value="AMB-02">AMB-02 (Toyota Hiace Van)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Service Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={maintenanceForm.serviceType}
                      onChange={(e) => setMaintenanceForm({ ...maintenanceForm, serviceType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900"
                    >
                      <option value="Routine Oil & Filter Change">Routine Oil & Filter Change</option>
                      <option value="Brake Overhaul & Fluid">Brake Overhaul & Fluid</option>
                      <option value="Oxygen Cylinder Refill">Medical Oxygen Cylinder Refill</option>
                      <option value="All-Terrain Tire Replacement">All-Terrain Tire Replacement</option>
                      <option value="Suspension & Steering Overhaul">Suspension & Steering Overhaul</option>
                      <option value="Electrical / Siren System">Electrical / Siren System</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Total Cost (PKR) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 8500"
                      value={maintenanceForm.amountPKR}
                      onChange={(e) => setMaintenanceForm({ ...maintenanceForm, amountPKR: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 font-bold text-sky-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Workshop / Vendor Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oghi Central Workshop"
                      value={maintenanceForm.vendor}
                      onChange={(e) => setMaintenanceForm({ ...maintenanceForm, vendor: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Invoice Reference <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. INV-8912"
                      value={maintenanceForm.invoiceNumber}
                      onChange={(e) => setMaintenanceForm({ ...maintenanceForm, invoiceNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Service Notes & Summary
                  </label>
                  <textarea
                    rows={2}
                    value={maintenanceForm.description}
                    onChange={(e) => setMaintenanceForm({ ...maintenanceForm, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveModal(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
                    Record Service Slip
                  </Button>
                </div>
              </form>
            )}
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
}
