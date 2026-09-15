"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  PlusCircle,
  CheckCircle2,
  Users,
  Search,
  AlertTriangle,
  RefreshCw,
  Truck,
  HeartPulse,
  Receipt,
  FileText,
  BarChart3,
  Download,
  Calendar,
  Clock,
  MapPin,
  Gauge,
  Wallet,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import type {
  GoogleSheetTrip,
  GoogleSheetExpense,
  GoogleSheetAnalytics,
} from "@/lib/google-sheets";

export default function DataEntryDeskPage() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"TRIPS" | "EXPENSES" | "ANALYTICS">("TRIPS");

  // Live Google Sheet data states
  const [trips, setTrips] = useState<GoogleSheetTrip[]>([]);
  const [expenses, setExpenses] = useState<GoogleSheetExpense[]>([]);
  const [analytics, setAnalytics] = useState<GoogleSheetAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter (Privacy on demand)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GoogleSheetTrip[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Modals state
  const [activeModal, setActiveModal] = useState<"PATIENT_TRIP" | "EXPENSE" | null>(null);
  const [modalSuccess, setModalSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Expense tab filter
  const [expenseFilter, setExpenseFilter] = useState<string>("ALL");

  // FORM 1: Patient & Ambulance Trip Form Data (14 Fields in exact Google Sheet sequence)
  const [tripForm, setTripForm] = useState({
    sNo: "758",
    date: new Date().toISOString().split("T")[0],
    day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
    time: "10:00 AM",
    patientName: "",
    pickup: "Gali",
    drop: "Mansehra",
    kmPick: "",
    kmDrop: "",
    distance: "",
    petrol: "",
    received: "",
    reason: "",
    otherExpense: "",
  });

  // FORM 2: General Expense Form Data (7 Fields in exact Google Sheet sequence)
  const [expenseForm, setExpenseForm] = useState({
    date: new Date().toISOString().split("T")[0],
    name: "",
    received: "",
    expense: "",
    reason: "Documentation",
    jcdfReceipt: "",
    remark: "",
  });

  // Load Google Sheet Data
  const loadSheetData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [tripsRes, expensesRes, analyticsRes] = await Promise.all([
        fetch("/api/google-sheets/trips").then((r) => r.json()).catch(() => ({ data: [] })),
        fetch("/api/google-sheets/expenses").then((r) => r.json()).catch(() => ({ data: [] })),
        fetch("/api/google-sheets/analytics").then((r) => r.json()).catch(() => ({ data: null })),
      ]);

      if (tripsRes.success && Array.isArray(tripsRes.data)) {
        setTrips(tripsRes.data);
      }
      if (expensesRes.success && Array.isArray(expensesRes.data)) {
        setExpenses(expensesRes.data);
      }
      if (analyticsRes.success && analyticsRes.data) {
        setAnalytics(analyticsRes.data);
        // Pre-fill next S.No and last drop KM
        const nextNum = (analyticsRes.data.lastSNo || 757) + 1;
        setTripForm((prev) => ({
          ...prev,
          sNo: String(nextNum),
        }));
      }
    } catch (err) {
      console.error("Failed to load sheet data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSheetData();
  }, [loadSheetData]);

  // Live Auto-Calculation for Trip Form (Distance = kmDrop - kmPick, Day from Date)
  const handleTripFormChange = (field: string, value: string) => {
    setTripForm((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "date") {
        const parsed = new Date(value);
        if (!isNaN(parsed.getTime())) {
          updated.day = parsed.toLocaleDateString("en-US", { weekday: "long" });
        }
      }

      if (field === "kmPick" || field === "kmDrop") {
        const pick = parseFloat(field === "kmPick" ? value : prev.kmPick);
        const drop = parseFloat(field === "kmDrop" ? value : prev.kmDrop);
        if (!isNaN(drop) && !isNaN(pick) && drop >= pick) {
          updated.distance = String(drop - pick);
        } else {
          updated.distance = "";
        }
      }

      return updated;
    });
  };

  // Handle Live Patient Search (Privacy-First on demand)
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) {
      setSearchResults(null);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(`/api/google-sheets/trips?q=${encodeURIComponent(q)}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setSearchResults(json.data);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Patient Trip Submit
  const handleTripSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      if (!tripForm.patientName.trim()) {
        throw new Error("Please provide patient name.");
      }

      const res = await fetch("/api/google-sheets/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripForm),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to record patient trip");
      }

      setModalSuccess(
        `Trip S.No #${tripForm.sNo} registered! Financial rows (Used Service, Petrol, Maintenance) auto-split into ledger.`
      );

      setTimeout(() => {
        setModalSuccess(null);
        setActiveModal(null);
        loadSheetData();
        // Reset form with incremented S.No
        const nextNum = parseInt(tripForm.sNo, 10) + 1;
        setTripForm({
          sNo: isNaN(nextNum) ? "" : String(nextNum),
          date: new Date().toISOString().split("T")[0],
          day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
          time: "10:00 AM",
          patientName: "",
          pickup: "Gali",
          drop: "Mansehra",
          kmPick: tripForm.kmDrop || "",
          kmDrop: "",
          distance: "",
          petrol: "",
          received: "",
          reason: "",
          otherExpense: "",
        });
      }, 1400);
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle General Expense Submit
  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      if (!expenseForm.expense && !expenseForm.received) {
        throw new Error("Please enter either an Expense amount or Received amount.");
      }

      const res = await fetch("/api/google-sheets/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseForm),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to record expense voucher");
      }

      setModalSuccess("Expense voucher recorded and sorted chronologically by Date in official ledger.");

      setTimeout(() => {
        setModalSuccess(null);
        setActiveModal(null);
        loadSheetData();
        setExpenseForm({
          date: new Date().toISOString().split("T")[0],
          name: "",
          received: "",
          expense: "",
          reason: "Documentation",
          jcdfReceipt: "",
          remark: "",
        });
      }, 1400);
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // CSV Export Helper
  const downloadCSV = (type: "TRIPS" | "EXPENSES") => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (type === "TRIPS") {
      csvContent += "S.No,Date,Day,Time,Patient name,Pick up,Drop,KM at Pick up,KM at Drop,Distance cover in one trip KM,Petrol,Received,Reason,Other Expanse\n";
      trips.forEach((t) => {
        csvContent += `"${t.sNo}","${t.date}","${t.day}","${t.time}","${t.patientName.replace(/"/g, '""')}","${t.pickup}","${t.drop}","${t.kmPick}","${t.kmDrop}","${t.distance}","${t.petrol}","${t.received}","${t.reason}","${t.otherExpense}"\n`;
      });
    } else {
      csvContent += "Date,Name,Received,Expense,Reason,JCDF Receipt,Remark\n";
      expenses.forEach((e) => {
        csvContent += `"${e.date}","${e.name.replace(/"/g, '""')}","${e.received}","${e.expense}","${e.reason}","${e.jcdfReceipt}","${e.remark.replace(/"/g, '""')}"\n`;
      });
    }
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `JCDF_${type}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter expenses based on selected reason
  const filteredExpenses = expenses.filter((e) => {
    if (expenseFilter === "ALL") return true;
    return e.reason?.toLowerCase().trim() === expenseFilter.toLowerCase().trim();
  });

  return (
    <DashboardLayout
      role="DATA_ENTRY"
      pageTitle="Field Operations & Google Drive Intake Desk"
      pageSubtitle="Direct Google Sheets synchronization workstation. Zero Vercel storage footprint with instant date-sorting & ledger auto-splitting."
      breadcrumbs={[{ label: "Operations Desk" }]}
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadSheetData}
            disabled={isLoading}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />}
          >
            Refresh Sheet
          </Button>
          <Button
            onClick={() => {
              setFormError(null);
              setModalSuccess(null);
              setActiveModal("PATIENT_TRIP");
            }}
            variant="primary"
            size="sm"
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            New Patient Trip
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top Shift Telemetry KPI Cards from Google Sheet */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <DashboardStatCard
            title="Total Trips"
            value={analytics ? analytics.totalTrips : trips.length}
            subtitle={`Last S.No: #${analytics?.lastSNo || 757}`}
            icon={<Route className="w-5 h-5" />}
            variant="sky"
          />
          <DashboardStatCard
            title="Total Distance"
            value={`${(analytics?.totalDistanceKm || 0).toLocaleString()} KM`}
            subtitle="Transit route telemetry"
            icon={<Truck className="w-5 h-5" />}
            variant="emerald"
          />
          <DashboardStatCard
            title="Received (Revenue)"
            value={`PKR ${(analytics?.totalReceivedPKR || 0).toLocaleString()}`}
            subtitle="Patient fares & service funds"
            icon={<Wallet className="w-5 h-5" />}
            variant="emerald"
          />
          <DashboardStatCard
            title="Total Expenses"
            value={`PKR ${(analytics?.totalExpensesPKR || 0).toLocaleString()}`}
            subtitle="Fuel, maintenance & salaries"
            icon={<Fuel className="w-5 h-5" />}
            variant="red"
          />
        </div>

        {/* 2 Primary Clean Action Cards (Replacing redundant forms) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Action 1: Patient & Trip Entry */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-sky-50/40 border border-sky-100 shadow-sm hover:border-sky-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-xl bg-sky-100/70 text-sky-700">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> Google Sheet Sync
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                New Patient & Ambulance Trip Entry
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Record emergency transit with exact 14 columns matching Sheet 1. Auto-calculates distance & day, and automatically splits Used Service, Petrol, and Maintenance into the financial ledger.
              </p>
            </div>
            <Button
              onClick={() => {
                setFormError(null);
                setModalSuccess(null);
                setActiveModal("PATIENT_TRIP");
              }}
              variant="primary"
              size="md"
              className="w-full justify-center bg-sky-600 hover:bg-sky-700"
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Open Patient Trip Form
            </Button>
          </div>

          {/* Action 2: General Expense Voucher */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-amber-50/40 border border-amber-100 shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-xl bg-amber-100/70 text-amber-800">
                  <Receipt className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  <Calendar className="w-3.5 h-3.5" /> Chronological Sort
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Record Expense / Documentary Voucher
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Record staff salaries, office paperwork, vehicle registration, or independent workshop expenses. Never clutters patient tables and automatically seats itself in proper date order.
              </p>
            </div>
            <Button
              onClick={() => {
                setFormError(null);
                setModalSuccess(null);
                setActiveModal("EXPENSE");
              }}
              variant="outline"
              size="md"
              className="w-full justify-center border-amber-300 text-amber-900 hover:bg-amber-50"
              leftIcon={<Receipt className="w-4 h-4" />}
            >
              Log Expense Voucher
            </Button>
          </div>
        </div>

        {/* Privacy-First Patient Lookup & Live Search Section */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-sky-600" />
                Patient Record Verification & Live Lookup
              </h2>
              <p className="text-xs text-slate-500">
                Patient records are securely stored on Google Drive. Filter on demand by patient name or S.No without screen clutter.
              </p>
            </div>
            {searchResults !== null && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults(null);
                }}
              >
                Clear Search
              </Button>
            )}
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type Patient Name, Pickup Location, or S.No (e.g. 'Idrees', 'Abdul Hameed', or '597')..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSearching}
              leftIcon={<Search className="w-4 h-4" />}
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </form>

          {/* Search Results Display */}
          {searchResults !== null && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700">
                  Found {searchResults.length} matching trip record(s) in Google Drive:
                </span>
              </div>
              {searchResults.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500">
                  No matching records found for &quot;{searchQuery}&quot;. Please check the spelling or search by S.No.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                      <tr>
                        <th className="p-2.5 font-bold">S.No</th>
                        <th className="p-2.5 font-bold">Date & Day</th>
                        <th className="p-2.5 font-bold">Patient Name</th>
                        <th className="p-2.5 font-bold">Route</th>
                        <th className="p-2.5 font-bold">Odometer (KM)</th>
                        <th className="p-2.5 font-bold">Distance</th>
                        <th className="p-2.5 font-bold">Fare Received</th>
                        <th className="p-2.5 font-bold">Petrol</th>
                        <th className="p-2.5 font-bold">Other Exp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {searchResults.map((r, i) => (
                        <tr key={i} className="hover:bg-sky-50/50 transition-colors">
                          <td className="p-2.5 font-bold text-sky-700">#{r.sNo}</td>
                          <td className="p-2.5 text-slate-600">{r.date} ({r.day})</td>
                          <td className="p-2.5 font-semibold text-slate-900">{r.patientName}</td>
                          <td className="p-2.5 text-slate-700">{r.pickup} &rarr; {r.drop}</td>
                          <td className="p-2.5 text-slate-500">{r.kmPick} - {r.kmDrop}</td>
                          <td className="p-2.5 font-semibold text-slate-800">{r.distance} KM</td>
                          <td className="p-2.5 text-emerald-700 font-bold">{r.received ? `PKR ${r.received}` : "-"}</td>
                          <td className="p-2.5 text-amber-700">{r.petrol ? `PKR ${r.petrol}` : "-"}</td>
                          <td className="p-2.5 text-rose-700">{r.otherExpense ? `PKR ${r.otherExpense} (${r.reason})` : "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3 Main View Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 sm:gap-6">
              <button
                onClick={() => setActiveTab("TRIPS")}
                className={`pb-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
                  activeTab === "TRIPS"
                    ? "border-sky-600 text-sky-700"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Truck className="w-4 h-4" />
                Ambulance Record Complete ({trips.length})
              </button>
              <button
                onClick={() => setActiveTab("EXPENSES")}
                className={`pb-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
                  activeTab === "EXPENSES"
                    ? "border-amber-600 text-amber-800"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Receipt className="w-4 h-4" />
                Financial Expense Ledger ({expenses.length})
              </button>
              <button
                onClick={() => setActiveTab("ANALYTICS")}
                className={`pb-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
                  activeTab === "ANALYTICS"
                    ? "border-emerald-600 text-emerald-800"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Live Analysis & Summary
              </button>
            </div>

            <div className="pb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadCSV(activeTab === "EXPENSES" ? "EXPENSES" : "TRIPS")}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Export CSV ({activeTab === "EXPENSES" ? "Expanse" : "2026 Trips"})
              </Button>
            </div>
          </div>
        </div>

        {/* TAB 1: 2026 AMBULANCE RECORD COMPLETE (14 COLUMNS) */}
        {activeTab === "TRIPS" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Ambulance Trip Register (Tab 1: 2026 ambulance record complete )
                </h2>
                <p className="text-xs text-slate-500">
                  Displaying live records in exact 14-column sequence from Google Sheet.
                </p>
              </div>
              <span className="text-xs text-slate-400">
                Showing {Math.min(trips.length, 50)} of {trips.length} rows
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">S.No</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Day</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Patient Name</th>
                    <th className="p-3">Pick Up</th>
                    <th className="p-3">Drop</th>
                    <th className="p-3">Pick KM</th>
                    <th className="p-3">Drop KM</th>
                    <th className="p-3">Distance</th>
                    <th className="p-3">Petrol (PKR)</th>
                    <th className="p-3">Received (PKR)</th>
                    <th className="p-3">Reason</th>
                    <th className="p-3">Other Exp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trips.slice(0, 50).map((t, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        t.isLiveAdded ? "bg-emerald-50/40" : ""
                      }`}
                    >
                      <td className="p-3 font-bold text-sky-700">
                        {t.isLiveAdded && (
                          <span className="mr-1.5 inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                        #{t.sNo}
                      </td>
                      <td className="p-3 text-slate-600 whitespace-nowrap">{t.date}</td>
                      <td className="p-3 text-slate-500">{t.day}</td>
                      <td className="p-3 text-slate-500 whitespace-nowrap">{t.time}</td>
                      <td className="p-3 font-semibold text-slate-900">{t.patientName}</td>
                      <td className="p-3 text-slate-700">{t.pickup}</td>
                      <td className="p-3 text-slate-700">{t.drop}</td>
                      <td className="p-3 text-slate-500">{t.kmPick || "-"}</td>
                      <td className="p-3 text-slate-500">{t.kmDrop || "-"}</td>
                      <td className="p-3 font-semibold text-slate-800">
                        {t.distance ? `${t.distance} KM` : "-"}
                      </td>
                      <td className="p-3 text-amber-700 font-medium">
                        {t.petrol ? `PKR ${t.petrol}` : "-"}
                      </td>
                      <td className="p-3 text-emerald-700 font-bold">
                        {t.received ? `PKR ${t.received}` : "-"}
                      </td>
                      <td className="p-3 text-slate-600">{t.reason || "-"}</td>
                      <td className="p-3 text-rose-700 font-medium">
                        {t.otherExpense ? `PKR ${t.otherExpense}` : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: FINANCIAL EXPENSE LEDGER (7 COLUMNS) */}
        {activeTab === "EXPENSES" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Financial Accounting General Ledger (Tab 2: Expanse)
                </h2>
                <p className="text-xs text-slate-500">
                  Sorted chronologically by Date. Contains Used Service fares, Fuel, Maintenance, Salaries, and Paperwork.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  "ALL",
                  "Used Service",
                  "Petrol",
                  "Maintenance",
                  "Salary",
                  "Documentation",
                  "Ambulance Insurance",
                  "Fund",
                ].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setExpenseFilter(reason)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                      expenseFilter === reason
                        ? "bg-amber-700 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Payee / Name</th>
                    <th className="p-3">Received (Inflow)</th>
                    <th className="p-3">Expense (Outflow)</th>
                    <th className="p-3">Reason / Category</th>
                    <th className="p-3">JCDF Receipt #</th>
                    <th className="p-3">Remark / Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredExpenses.slice(0, 60).map((e, idx) => (
                    <tr
                      key={e.id || idx}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        e.isLiveAdded ? "bg-amber-50/40" : ""
                      }`}
                    >
                      <td className="p-3 font-semibold text-slate-700 whitespace-nowrap">
                        {e.isLiveAdded && (
                          <span className="mr-1.5 inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        )}
                        {e.date}
                      </td>
                      <td className="p-3 text-slate-900 font-medium">
                        {e.name || <span className="text-slate-400 italic">-</span>}
                      </td>
                      <td className="p-3 text-emerald-700 font-bold">
                        {e.received ? `PKR ${Number(e.received).toLocaleString()}` : "-"}
                      </td>
                      <td className="p-3 text-rose-700 font-bold">
                        {e.expense ? `PKR ${Number(e.expense).toLocaleString()}` : "-"}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold ${
                            e.reason === "Used Service"
                              ? "bg-emerald-100 text-emerald-800"
                              : e.reason === "Petrol"
                              ? "bg-amber-100 text-amber-800"
                              : e.reason === "Maintenance"
                              ? "bg-purple-100 text-purple-800"
                              : e.reason === "Salary"
                              ? "bg-sky-100 text-sky-800"
                              : e.reason === "Documentation"
                              ? "bg-blue-100 text-blue-800"
                              : e.reason === "Fund"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {e.reason}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 font-mono">
                        {e.jcdfReceipt ? (
                          <span className="font-bold text-sky-700">#{e.jcdfReceipt}</span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="p-3 text-slate-500 max-w-xs truncate">{e.remark || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE ANALYTICS & SUMMARY (MIRRORING ANALYSIS TAB) */}
        {activeTab === "ANALYTICS" && analytics && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Pickup Leaderboard */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  Top Pickup Locations (Origins)
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  Trip frequency aggregated from community valleys
                </p>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {analytics.pickupCounts.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs"
                    >
                      <span className="font-semibold text-slate-800">{item.location}</span>
                      <span className="font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {item.count} Trips
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drop Leaderboard */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-sky-600" />
                  Top Drop Destinations (Hospitals)
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  Receiving medical centers and transit endpoints
                </p>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {analytics.dropCounts.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs"
                    >
                      <span className="font-semibold text-slate-800">{item.location}</span>
                      <span className="font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                        {item.count} Drops
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Ledger Breakdown */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  Financial Accounting Breakdown
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  Reason-wise summary matching Sheet 3 Pivot
                </p>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {analytics.reasonBreakdown.map((item, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs space-y-1"
                    >
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{item.reason}</span>
                        <span>
                          {item.expense > 0 ? (
                            <span className="text-rose-700">PKR {item.expense.toLocaleString()}</span>
                          ) : (
                            <span className="text-emerald-700">+PKR {item.received.toLocaleString()}</span>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 1: NEW PATIENT & AMBULANCE TRIP FORM (14 FIELDS EXACT SEQUENCE)     */}
        {/* ========================================================================= */}
        <Modal
          isOpen={activeModal === "PATIENT_TRIP"}
          onClose={() => {
            if (!isSubmitting) setActiveModal(null);
          }}
          title="New Patient & Ambulance Trip Form"
          description="Exact 14-field order matching Google Sheet Tab 1. Submitting auto-splits Used Service, Petrol, and Maintenance rows into the financial ledger."
          size="xl"
        >
          {modalSuccess ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Trip Registered Successfully!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">{modalSuccess}</p>
            </div>
          ) : (
            <form onSubmit={handleTripSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 14 Fields in Two-Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
                {/* 1. S.No */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    1. S.No (Serial / Receipt)
                  </label>
                  <input
                    type="text"
                    required
                    value={tripForm.sNo}
                    onChange={(e) => handleTripFormChange("sNo", e.target.value)}
                    placeholder="e.g. 758"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-sky-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 2. Date */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">2. Date</label>
                  <input
                    type="date"
                    required
                    value={tripForm.date}
                    onChange={(e) => handleTripFormChange("date", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 3. Day (Auto-calculated) */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    3. Day <span className="text-sky-600 font-normal">(Auto)</span>
                  </label>
                  <input
                    type="text"
                    value={tripForm.day}
                    onChange={(e) => handleTripFormChange("day", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg font-medium text-slate-700"
                  />
                </div>

                {/* 4. Time */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">4. Time</label>
                  <input
                    type="text"
                    value={tripForm.time}
                    onChange={(e) => handleTripFormChange("time", e.target.value)}
                    placeholder="e.g. 10:00 AM"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 5. Patient Name */}
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    5. Patient Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={tripForm.patientName}
                    onChange={(e) => handleTripFormChange("patientName", e.target.value)}
                    placeholder="e.g. Abdul Hameed, Idrees's wife, Qary Awais..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 6. Pick up */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">6. Pick Up (Origin)</label>
                  <input
                    type="text"
                    list="pickup-list"
                    value={tripForm.pickup}
                    onChange={(e) => handleTripFormChange("pickup", e.target.value)}
                    placeholder="e.g. Gali, Batangi, Naari, Danna..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <datalist id="pickup-list">
                    <option value="Gali" />
                    <option value="Klarian" />
                    <option value="Naari" />
                    <option value="Danna" />
                    <option value="Junglan" />
                    <option value="Barwala" />
                    <option value="Batangi" />
                    <option value="Batian" />
                  </datalist>
                </div>

                {/* 7. Drop */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">7. Drop (Destination)</label>
                  <input
                    type="text"
                    list="drop-list"
                    value={tripForm.drop}
                    onChange={(e) => handleTripFormChange("drop", e.target.value)}
                    placeholder="e.g. Mansehra, Abbottabad, Narbeer..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <datalist id="drop-list">
                    <option value="Mansehra" />
                    <option value="Abbottabad" />
                    <option value="Takia" />
                    <option value="Narbeer" />
                    <option value="Chikia" />
                    <option value="Qalanderabad" />
                  </datalist>
                </div>

                {/* 8. KM at Pick up */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">8. KM at Pick up</label>
                  <input
                    type="number"
                    value={tripForm.kmPick}
                    onChange={(e) => handleTripFormChange("kmPick", e.target.value)}
                    placeholder="e.g. 33000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 9. KM at Drop */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">9. KM at Drop</label>
                  <input
                    type="number"
                    value={tripForm.kmDrop}
                    onChange={(e) => handleTripFormChange("kmDrop", e.target.value)}
                    placeholder="e.g. 33045"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 10. Distance (Auto calculated) */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    10. Distance (KM) <span className="text-emerald-600 font-normal">(Auto)</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={tripForm.distance ? `${tripForm.distance} KM` : ""}
                    placeholder="Auto: Drop - Pick"
                    className="w-full px-3 py-2 bg-emerald-50/70 border border-emerald-200 rounded-lg font-bold text-emerald-800"
                  />
                </div>

                {/* 11. Petrol (Fuel Expense) */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">11. Petrol (PKR)</label>
                  <input
                    type="number"
                    value={tripForm.petrol}
                    onChange={(e) => handleTripFormChange("petrol", e.target.value)}
                    placeholder="e.g. 3400 (leave empty if none)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 12. Received (Fare) */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    12. Received / Fare (PKR)
                  </label>
                  <input
                    type="number"
                    value={tripForm.received}
                    onChange={(e) => handleTripFormChange("received", e.target.value)}
                    placeholder="e.g. 1200, 800"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-emerald-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 13. Reason */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">13. Reason</label>
                  <input
                    type="text"
                    value={tripForm.reason}
                    onChange={(e) => handleTripFormChange("reason", e.target.value)}
                    placeholder="e.g. Maintenance, Routine Transfer..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 14. Other Expanse */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">14. Other Expanse (PKR)</label>
                  <input
                    type="number"
                    value={tripForm.otherExpense}
                    onChange={(e) => handleTripFormChange("otherExpense", e.target.value)}
                    placeholder="e.g. 25000 (leave empty if none)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Informational Auto-Split Notice */}
              <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-sky-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Automatic 3-Way Split:</strong> Submitting will record the trip in Tab 1, and automatically create matching rows in Tab 2 (Expanse) for Used Service (PKR {tripForm.received || "0"}), Petrol (PKR {tripForm.petrol || "0"}), and Maintenance (PKR {tripForm.otherExpense || "0"}).
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setActiveModal(null)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  {isSubmitting ? "Recording Trip..." : "Record Trip in Google Sheet"}
                </Button>
              </div>
            </form>
          )}
        </Modal>

        {/* ========================================================================= */}
        {/* MODAL 2: GENERAL EXPENSE VOUCHER FORM (7 FIELDS EXACT SEQUENCE)           */}
        {/* ========================================================================= */}
        <Modal
          isOpen={activeModal === "EXPENSE"}
          onClose={() => {
            if (!isSubmitting) setActiveModal(null);
          }}
          title="Record Expense / Documentary Voucher"
          description="Exact 7-field order matching Google Sheet Tab 2. Automatically sorted chronologically by Date in the official ledger."
          size="lg"
        >
          {modalSuccess ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Voucher Logged Successfully!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">{modalSuccess}</p>
            </div>
          ) : (
            <form onSubmit={handleExpenseSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 7 Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                {/* 1. Date */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">1. Date</label>
                  <input
                    type="date"
                    required
                    value={expenseForm.date}
                    onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* 2. Name */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    2. Payee / Name <span className="text-slate-400 font-normal">(Staff/Vendor)</span>
                  </label>
                  <input
                    type="text"
                    value={expenseForm.name}
                    onChange={(e) => setExpenseForm({ ...expenseForm, name: e.target.value })}
                    placeholder="e.g. Habeeb Sahib, Excise Dept..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* 3. Received */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    3. Received (PKR) <span className="text-slate-400 font-normal">(If Inflow)</span>
                  </label>
                  <input
                    type="number"
                    value={expenseForm.received}
                    onChange={(e) => setExpenseForm({ ...expenseForm, received: e.target.value })}
                    placeholder="e.g. 2200"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-emerald-700 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* 4. Expense */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    4. Expense (PKR) <span className="text-slate-400 font-normal">(If Outflow)</span>
                  </label>
                  <input
                    type="number"
                    value={expenseForm.expense}
                    onChange={(e) => setExpenseForm({ ...expenseForm, expense: e.target.value })}
                    placeholder="e.g. 20000, 51800"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-rose-700 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* 5. Reason */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">5. Reason / Category</label>
                  <select
                    value={expenseForm.reason}
                    onChange={(e) => setExpenseForm({ ...expenseForm, reason: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                  >
                    <option value="Documentation">Documentation (Excise / Paperwork)</option>
                    <option value="Salary">Salary (Staff / Drivers)</option>
                    <option value="Ambulance Insurance">Ambulance Insurance</option>
                    <option value="Maintenance">Maintenance / Repairs</option>
                    <option value="Petrol">Petrol / Fuel</option>
                    <option value="Fund">Fund (Inflow / Donation)</option>
                    <option value="Used Service">Used Service</option>
                    <option value="Other">Other Operational</option>
                  </select>
                </div>

                {/* 6. JCDF Receipt */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    6. JCDF Receipt # <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={expenseForm.jcdfReceipt}
                    onChange={(e) => setExpenseForm({ ...expenseForm, jcdfReceipt: e.target.value })}
                    placeholder="e.g. 595 (leave blank if general)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* 7. Remark */}
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">7. Remark / Description</label>
                  <input
                    type="text"
                    value={expenseForm.remark}
                    onChange={(e) => setExpenseForm({ ...expenseForm, remark: e.target.value })}
                    placeholder="e.g. For Jan Salary, Vehicle registration, Routine maintenance..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Informational Notice */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                <Calendar className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Date-Wise Sorting:</strong> Regardless of when this is entered, it will automatically place itself in chronological sequence by its date in the official financial ledger.
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setActiveModal(null)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="bg-amber-700 hover:bg-amber-800"
                  disabled={isSubmitting}
                  leftIcon={<Receipt className="w-4 h-4" />}
                >
                  {isSubmitting ? "Saving Voucher..." : "Save Expense Voucher"}
                </Button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}
