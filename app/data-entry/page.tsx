"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  Route,
  Fuel,
  PlusCircle,
  CheckCircle2,
  Search,
  AlertTriangle,
  RefreshCw,
  Truck,
  HeartPulse,
  Receipt,
  BarChart3,
  Download,
  Calendar,
  MapPin,
  Wallet,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Edit2,
  Trash2,
  Settings,
  Globe,
  Filter,
  Check,
  ExternalLink,
} from "lucide-react";
import {
  GoogleSheetTrip,
  GoogleSheetExpense,
  GoogleSheetAnalytics,
  filterByMonthWindow,
  filterExpensesByDateRange,
} from "@/types/google-sheets";

export default function DataEntryDeskPage() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"TRIPS" | "EXPENSES" | "ANALYTICS">("TRIPS");

  // Live Google Sheet data states
  const [trips, setTrips] = useState<GoogleSheetTrip[]>([]);
  const [expenses, setExpenses] = useState<GoogleSheetExpense[]>([]);
  const [analytics, setAnalytics] = useState<GoogleSheetAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1-Month / Date Window Filter (Default: CURRENT_MONTH)
  const [monthFilter, setMonthFilter] = useState<"CURRENT_MONTH" | "LAST_MONTH" | "ALL">("CURRENT_MONTH");

  // Tab 2 Date Range Filter States
  const [expenseFromDate, setExpenseFromDate] = useState<string>("");
  const [expenseToDate, setExpenseToDate] = useState<string>("");
  const [expenseSearchQuery, setExpenseSearchQuery] = useState<string>("");

  // Google Drive Connection Config State
  const [driveConfig, setDriveConfig] = useState<{ configured: boolean; webhookUrl: string | null }>({
    configured: false,
    webhookUrl: null,
  });
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [webhookInput, setWebhookInput] = useState("");
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [webhookTestFeedback, setWebhookTestFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [isDeskSyncing, setIsDeskSyncing] = useState(false);
  const [deskSyncFeedback, setDeskSyncFeedback] = useState<string | null>(null);

  // Search & Filter for Tab 1
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GoogleSheetTrip[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Creation Modals state
  const [activeModal, setActiveModal] = useState<"PATIENT_TRIP" | "EXPENSE" | null>(null);
  const [modalSuccess, setModalSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit Modals state
  const [editingTrip, setEditingTrip] = useState<GoogleSheetTrip | null>(null);
  const [editingExpense, setEditingExpense] = useState<GoogleSheetExpense | null>(null);

  // Delete Confirmation Modal state
  const [deletingItem, setDeletingItem] = useState<{
    type: "TRIP" | "EXPENSE";
    idOrSNo: string;
    label: string;
    extra?: any;
  } | null>(null);

  // Expense tab category filter
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState<string>("ALL");

  // FORM 1: Patient & Ambulance Trip Form Data (13 Fields matching Sheet Tab 1 gid=0)
  const [tripForm, setTripForm] = useState({
    no: "595",
    sNo: "595",
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    patientName: "",
    pickup: "Gali",
    drop: "Mansehra",
    kmPick: "",
    kmDrop: "",
    distance: "",
    petrol: "",
    received: "",
    remark: "",
    otherExpense: "",
  });

  // FORM 2: General Expense Form Data (7 Fields matching Sheet Tab 2 gid=223912461)
  const [expenseForm, setExpenseForm] = useState({
    date: new Date().toISOString().split("T")[0],
    name: "",
    received: "",
    expense: "",
    reason: "Used Service",
    jcdfReceipt: "",
    remark: "",
  });

  // Load Google Drive Config
  const loadDriveConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/google-sheets/config");
      const json = await res.json();
      if (json.success) {
        setDriveConfig({ configured: json.configured, webhookUrl: json.webhookUrl });
        if (json.webhookUrl) setWebhookInput(json.webhookUrl);
      }
    } catch {
      // ignore
    }
  }, []);

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
        const nextNum = (analyticsRes.data.lastSNo || 594) + 1;
        setTripForm((prev) => ({
          ...prev,
          no: String(nextNum),
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
    loadDriveConfig();
    loadSheetData();
  }, [loadDriveConfig, loadSheetData]);

  // Dynamic Live Recalculation for KPI Cards
  const { liveTotalExpenses, liveTotalReceived, liveTotalDistance } = useMemo(() => {
    let expSum = 0;
    let recvSum = 0;
    let distSum = 0;

    expenses.forEach((e) => {
      const expVal = parseFloat(e.expense);
      if (!isNaN(expVal)) expSum += expVal;
      const recvVal = parseFloat(e.received);
      if (!isNaN(recvVal)) recvSum += recvVal;
    });

    trips.forEach((t) => {
      const dVal = parseFloat(t.distance);
      if (!isNaN(dVal)) distSum += dVal;
    });

    return {
      liveTotalExpenses: expSum,
      liveTotalReceived: recvSum,
      liveTotalDistance: distSum,
    };
  }, [expenses, trips]);

  // Filtered trips for Tab 1
  const monthFilteredTrips = useMemo(() => {
    return filterByMonthWindow(trips, monthFilter);
  }, [trips, monthFilter]);

  // Filtered expenses for Tab 2 (with Date Range, Category, and Live Search)
  const filteredExpenses = useMemo(() => {
    let result = expenses;

    // 1. Date filter (custom date range has highest priority)
    if (expenseFromDate || expenseToDate) {
      result = filterExpensesByDateRange(result, expenseFromDate, expenseToDate);
    } else {
      result = filterByMonthWindow(result, monthFilter);
    }

    // 2. Category filter
    if (expenseCategoryFilter !== "ALL") {
      result = result.filter(
        (e) => e.reason?.toLowerCase().trim() === expenseCategoryFilter.toLowerCase().trim()
      );
    }

    // 3. Search query filter
    if (expenseSearchQuery.trim()) {
      const q = expenseSearchQuery.toLowerCase().trim();
      result = result.filter(
        (e) =>
          e.name?.toLowerCase().includes(q) ||
          e.reason?.toLowerCase().includes(q) ||
          e.jcdfReceipt?.toLowerCase().includes(q) ||
          e.remark?.toLowerCase().includes(q) ||
          e.date?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [expenses, expenseFromDate, expenseToDate, monthFilter, expenseCategoryFilter, expenseSearchQuery]);

  // Live Period Summary Calculation for Tab 2
  const periodSummary = useMemo(() => {
    let expSum = 0;
    let recvSum = 0;

    filteredExpenses.forEach((e) => {
      const expVal = parseFloat(e.expense);
      if (!isNaN(expVal)) expSum += expVal;
      const recvVal = parseFloat(e.received);
      if (!isNaN(recvVal)) recvSum += recvVal;
    });

    return {
      periodExpense: expSum,
      periodReceived: recvSum,
      periodNet: recvSum - expSum,
      periodCount: filteredExpenses.length,
    };
  }, [filteredExpenses]);

  // Quick Preset Helper for Tab 2 Date Range
  const setQuickDateRange = (preset: "TODAY" | "LAST_7_DAYS" | "THIS_MONTH" | "ALL") => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    if (preset === "TODAY") {
      setExpenseFromDate(todayStr);
      setExpenseToDate(todayStr);
    } else if (preset === "LAST_7_DAYS") {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      setExpenseFromDate(d.toISOString().split("T")[0]);
      setExpenseToDate(todayStr);
    } else if (preset === "THIS_MONTH") {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      setExpenseFromDate(firstDay.toISOString().split("T")[0]);
      setExpenseToDate(todayStr);
    } else if (preset === "ALL") {
      setExpenseFromDate("");
      setExpenseToDate("");
      setMonthFilter("ALL");
    }
  };

  // On-demand Quick Two-Way Sync from Data Entry Desk
  const handleQuickSync = async () => {
    setIsDeskSyncing(true);
    setDeskSyncFeedback(null);
    try {
      const res = await fetch("/api/sync/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction: "TWO_WAY", scope: "ALL", yearPeriodId: "2026" }),
      });
      const json = await res.json();
      if (json.success) {
        setDeskSyncFeedback("Google Sheets & Database synchronized successfully.");
        loadSheetData();
      } else {
        setDeskSyncFeedback(json.error || "Sync in progress or failed.");
      }
    } catch {
      setDeskSyncFeedback("Failed to trigger synchronization.");
    } finally {
      setIsDeskSyncing(false);
      setTimeout(() => setDeskSyncFeedback(null), 5000);
    }
  };

  // Live Auto-Calculation for Trip Form (Distance = kmDrop - kmPick)
  const handleTripFormChange = (field: string, value: string) => {
    setTripForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "no") {
        updated.sNo = value;
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

  // Live Auto-Calculation for Editing Trip Form
  const handleEditTripChange = (field: string, value: string) => {
    if (!editingTrip) return;
    setEditingTrip((prev) => {
      if (!prev) return null;
      const updated = { ...prev, [field]: value };
      if (field === "no") {
        updated.sNo = value;
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

  // Handle Search
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

  // Save/Test Webhook Connection
  const handleSaveWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTestingWebhook(true);
    setWebhookTestFeedback(null);
    try {
      const res = await fetch("/api/google-sheets/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookUrl: webhookInput.trim() }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setWebhookTestFeedback({ success: true, message: json.message || "Connected to Google Sheet successfully!" });
        setDriveConfig({ configured: true, webhookUrl: webhookInput.trim() });
        setTimeout(() => {
          setIsDriveModalOpen(false);
          loadSheetData();
        }, 1500);
      } else {
        setWebhookTestFeedback({ success: false, message: json.error || "Failed to connect to Webhook." });
      }
    } catch (err: any) {
      setWebhookTestFeedback({ success: false, message: err.message || "Network error while testing webhook." });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  // Handle Patient Trip Submit (Create)
  const handleTripSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      if (!tripForm.patientName.trim()) {
        throw new Error("Please provide patient name.");
      }

      const tripNumber = tripForm.no || tripForm.sNo;
      const res = await fetch("/api/google-sheets/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...tripForm,
          no: tripNumber,
          sNo: tripNumber,
          remark: tripForm.remark,
          reason: tripForm.remark,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to record patient trip");
      }

      setModalSuccess(
        `Trip #${tripNumber} registered! Auto-split financial rows (Used Service, Petrol, Maintenance) saved to ledger.`
      );

      setTimeout(() => {
        setModalSuccess(null);
        setActiveModal(null);
        loadSheetData();
        const nextNum = parseInt(tripNumber, 10) + 1;
        setTripForm({
          no: isNaN(nextNum) ? "" : String(nextNum),
          sNo: isNaN(nextNum) ? "" : String(nextNum),
          date: new Date().toISOString().split("T")[0],
          time: "10:00",
          patientName: "",
          pickup: "Gali",
          drop: "Mansehra",
          kmPick: tripForm.kmDrop || "",
          kmDrop: "",
          distance: "",
          petrol: "",
          received: "",
          remark: "",
          otherExpense: "",
        });
      }, 1200);
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Trip Update (Edit)
  const handleTripUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrip) return;
    setIsSubmitting(true);
    setFormError(null);

    try {
      const tripNumber = editingTrip.no || editingTrip.sNo;
      const res = await fetch("/api/google-sheets/trips", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingTrip,
          no: tripNumber,
          sNo: tripNumber,
          remark: editingTrip.remark || editingTrip.reason || "",
          reason: editingTrip.remark || editingTrip.reason || "",
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to update trip");
      }

      setModalSuccess(`Trip #${tripNumber} updated successfully!`);
      setTimeout(() => {
        setModalSuccess(null);
        setEditingTrip(null);
        loadSheetData();
      }, 1200);
    } catch (err: any) {
      setFormError(err.message || "Failed to update trip.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle General Expense Submit (Create)
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
          reason: "Used Service",
          jcdfReceipt: "",
          remark: "",
        });
      }, 1200);
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Expense Update (Edit)
  const handleExpenseUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExpense) return;
    setIsSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/google-sheets/expenses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingExpense),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to update expense");
      }

      setModalSuccess("Expense voucher updated successfully!");
      setTimeout(() => {
        setModalSuccess(null);
        setEditingExpense(null);
        loadSheetData();
      }, 1200);
    } catch (err: any) {
      setFormError(err.message || "Failed to update expense voucher.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Confirmation (Delete)
  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    setIsSubmitting(true);
    setFormError(null);

    try {
      if (deletingItem.type === "TRIP") {
        const res = await fetch(`/api/google-sheets/trips?no=${encodeURIComponent(deletingItem.idOrSNo)}`, {
          method: "DELETE",
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || "Failed to delete trip");
      } else {
        const res = await fetch(
          `/api/google-sheets/expenses?id=${encodeURIComponent(deletingItem.idOrSNo)}&date=${encodeURIComponent(
            deletingItem.extra?.date || ""
          )}&reason=${encodeURIComponent(deletingItem.extra?.reason || "")}`,
          { method: "DELETE" }
        );
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || "Failed to delete expense");
      }

      setDeletingItem(null);
      loadSheetData();
    } catch (err: any) {
      setFormError(err.message || "Delete failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // CSV Export Helper
  const downloadCSV = (type: "TRIPS" | "EXPENSES") => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (type === "TRIPS") {
      csvContent += "No,Date,Time,Patient Name,Pick up,Drop,Km at Pickup,Km at Drop,Distance Coverd in One Trip KM,Petrol,Received,Remark,Other Expanse\n";
      trips.forEach((t) => {
        const tripNum = t.no || t.sNo || "";
        const remarkVal = t.remark || t.reason || "";
        csvContent += `"${tripNum}","${t.date}","${t.time}","${(t.patientName || "").replace(/"/g, '""')}","${t.pickup}","${t.drop}","${t.kmPick}","${t.kmDrop}","${t.distance}","${t.petrol}","${t.received}","${remarkVal.replace(/"/g, '""')}","${t.otherExpense}"\n`;
      });
    } else {
      csvContent += "Date,Name,Received,Expense,Reason,JCDF Receipt,Remark\n";
      expenses.forEach((e) => {
        csvContent += `"${e.date}","${(e.name || "").replace(/"/g, '""')}","${e.received}","${e.expense}","${e.reason}","${e.jcdfReceipt}","${(e.remark || "").replace(/"/g, '""')}"\n`;
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

  return (
    <DashboardLayout
      role="DATA_ENTRY"
      pageTitle="Field Operations & Google Drive Intake Desk"
      pageSubtitle="Direct Google Sheets synchronization workstation. Zero Vercel storage footprint with instant date-sorting & ledger auto-splitting."
      breadcrumbs={[{ label: "Operations Desk" }]}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          {/* Google Drive Status Indicator */}
          <button
            onClick={() => setIsDriveModalOpen(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              driveConfig.configured
                ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                : "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100 animate-pulse"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                driveConfig.configured ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            {driveConfig.configured ? "Google Drive: Connected" : "Connect Google Drive"}
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={loadSheetData}
            disabled={isLoading}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleQuickSync}
            disabled={isDeskSyncing}
            className="border-sky-300 text-sky-700 hover:bg-sky-50"
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isDeskSyncing ? "animate-spin text-sky-600" : ""}`} />}
          >
            {isDeskSyncing ? "Syncing..." : "Sync Sheets"}
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
        {/* Quick Sync Feedback Pill */}
        {deskSyncFeedback && (
          <div className="p-3 bg-sky-50 border border-sky-200 text-sky-900 rounded-xl text-xs flex items-center justify-between shadow-2xs">
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              {deskSyncFeedback}
            </span>
            <button
              onClick={() => setDeskSyncFeedback(null)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}
        {/* Dynamic Telemetry KPI Cards */}
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
            value={`${(liveTotalDistance || analytics?.totalDistanceKm || 0).toLocaleString()} KM`}
            subtitle="Transit route telemetry"
            icon={<Truck className="w-5 h-5" />}
            variant="emerald"
          />
          <DashboardStatCard
            title="Received (Revenue)"
            value={`PKR ${(liveTotalReceived || analytics?.totalReceivedPKR || 0).toLocaleString()}`}
            subtitle="Patient fares & service funds"
            icon={<Wallet className="w-5 h-5" />}
            variant="emerald"
          />
          <DashboardStatCard
            title="Total Expenses"
            value={`PKR ${(liveTotalExpenses || analytics?.totalExpensesPKR || 0).toLocaleString()}`}
            subtitle="Fuel, maintenance & salaries"
            icon={<Fuel className="w-5 h-5" />}
            variant="red"
          />
        </div>

        {/* 2 Primary Clean Action Cards */}
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
                Record emergency transit with exact 14 columns matching Sheet 1. Auto-computes distance & day, and automatically splits Used Service, Petrol, and Maintenance into the financial ledger.
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
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                      <tr>
                        <th className="p-2.5">No</th>
                        <th className="p-2.5">Date</th>
                        <th className="p-2.5">Time</th>
                        <th className="p-2.5">Patient Name</th>
                        <th className="p-2.5">Route</th>
                        <th className="p-2.5">Odometer (KM)</th>
                        <th className="p-2.5">Distance</th>
                        <th className="p-2.5">Petrol</th>
                        <th className="p-2.5">Received</th>
                        <th className="p-2.5">Remark</th>
                        <th className="p-2.5">Other Exp</th>
                        <th className="p-2.5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {searchResults.map((r, i) => (
                        <tr key={i} className="hover:bg-sky-50/50 transition-colors">
                          <td className="p-2.5 font-bold text-sky-700">#{r.no || r.sNo}</td>
                          <td className="p-2.5 text-slate-600">{r.date}</td>
                          <td className="p-2.5 text-slate-500">{r.time}</td>
                          <td className="p-2.5 font-semibold text-slate-900">{r.patientName}</td>
                          <td className="p-2.5 text-slate-700">{r.pickup} &rarr; {r.drop}</td>
                          <td className="p-2.5 text-slate-500">{r.kmPick} - {r.kmDrop}</td>
                          <td className="p-2.5 font-semibold text-slate-800">{r.distance} KM</td>
                          <td className="p-2.5 text-amber-700">{r.petrol ? `PKR ${r.petrol}` : "-"}</td>
                          <td className="p-2.5 text-emerald-700 font-bold">{r.received ? `PKR ${r.received}` : "-"}</td>
                          <td className="p-2.5 text-slate-600">{r.remark || r.reason || "-"}</td>
                          <td className="p-2.5 text-rose-700">{r.otherExpense ? `PKR ${r.otherExpense}` : "-"}</td>
                          <td className="p-2.5 text-center whitespace-nowrap">
                            <button
                              onClick={() => {
                                setEditingTrip(r);
                                setFormError(null);
                                setModalSuccess(null);
                              }}
                              className="p-1 text-slate-500 hover:text-sky-600 rounded transition-colors"
                              title="Edit Trip"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() =>
                                setDeletingItem({
                                  type: "TRIP",
                                  idOrSNo: r.no || r.sNo || "",
                                  label: `Trip #${r.no || r.sNo} (${r.patientName})`,
                                })
                              }
                              className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors ml-1"
                              title="Delete Trip"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3 Main View Tabs + 1-Month Window Filter */}
        <div className="border-b border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
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
                Ambulance Service Patient Record ({monthFilteredTrips.length})
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
                Financial Expense Ledger ({filteredExpenses.length})
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
                Live Analysis & Summary (Full Year)
              </button>
            </div>

            {/* Right Tools: Month Filter + CSV Export */}
            <div className="flex items-center gap-2 pb-2">
              {activeTab !== "ANALYTICS" && (
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                  <span className="text-slate-500 px-2 flex items-center gap-1">
                    <Filter className="w-3 h-3" /> Window:
                  </span>
                  <button
                    onClick={() => {
                      setMonthFilter("CURRENT_MONTH");
                      setExpenseFromDate("");
                      setExpenseToDate("");
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      monthFilter === "CURRENT_MONTH" && !expenseFromDate && !expenseToDate
                        ? "bg-white text-slate-900 shadow-2xs font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Current Month
                  </button>
                  <button
                    onClick={() => {
                      setMonthFilter("LAST_MONTH");
                      setExpenseFromDate("");
                      setExpenseToDate("");
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      monthFilter === "LAST_MONTH" && !expenseFromDate && !expenseToDate
                        ? "bg-white text-slate-900 shadow-2xs font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Last Month
                  </button>
                  <button
                    onClick={() => {
                      setMonthFilter("ALL");
                      setExpenseFromDate("");
                      setExpenseToDate("");
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      monthFilter === "ALL" && !expenseFromDate && !expenseToDate
                        ? "bg-white text-slate-900 shadow-2xs font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    All ({activeTab === "TRIPS" ? trips.length : expenses.length})
                  </button>
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadCSV(activeTab === "EXPENSES" ? "EXPENSES" : "TRIPS")}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        {/* TAB 1: AMBULANCE SERVICE PATIENT RECORD (13 COLUMNS + EDIT / DELETE) */}
        {activeTab === "TRIPS" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Ambulance Service Patient Record (Tab 1: gid=0)
                </h2>
                <p className="text-xs text-slate-500">
                  Displaying {monthFilter === "CURRENT_MONTH" ? "current operational month" : monthFilter} in exact 13-column sequence.
                </p>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Showing {monthFilteredTrips.length} active row(s)
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">No</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Patient Name</th>
                    <th className="p-3">Pick Up</th>
                    <th className="p-3">Drop</th>
                    <th className="p-3">Pick KM</th>
                    <th className="p-3">Drop KM</th>
                    <th className="p-3">Distance</th>
                    <th className="p-3">Petrol (PKR)</th>
                    <th className="p-3">Received (PKR)</th>
                    <th className="p-3">Remark</th>
                    <th className="p-3">Other Exp</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {monthFilteredTrips.length === 0 ? (
                    <tr>
                      <td colSpan={14} className="p-8 text-center text-slate-400">
                        No trips found in this month filter. Click &quot;All&quot; to view historical records or add a new trip.
                      </td>
                    </tr>
                  ) : (
                    monthFilteredTrips.map((t, idx) => (
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
                          #{t.no || t.sNo}
                        </td>
                        <td className="p-3 text-slate-600 whitespace-nowrap">{t.date}</td>
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
                        <td className="p-3 text-slate-600">{t.remark || t.reason || "-"}</td>
                        <td className="p-3 text-rose-700 font-medium">
                          {t.otherExpense ? `PKR ${t.otherExpense}` : "-"}
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          <button
                            onClick={() => {
                              setEditingTrip(t);
                              setFormError(null);
                              setModalSuccess(null);
                            }}
                            className="p-1 text-slate-500 hover:text-sky-600 rounded transition-colors"
                            title="Edit Trip"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              setDeletingItem({
                                type: "TRIP",
                                idOrSNo: t.no || t.sNo || "",
                                label: `Trip #${t.no || t.sNo} (${t.patientName})`,
                              })
                            }
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors ml-1"
                            title="Delete Trip"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: FINANCIAL EXPENSE LEDGER (7 COLUMNS + DATE RANGE FILTER & LIVE PERIOD SUMMARY) */}
        {activeTab === "EXPENSES" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Financial Accounting General Ledger (Tab 2: Expanses - gid=223912461)
                </h2>
                <p className="text-xs text-slate-500">
                  Chronological Date order. Use Date Range Filter or presets below to inspect dynamic financial summaries.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  "ALL",
                  "Used Service",
                  "Petrol",
                  "Maintenance",
                  "Salary",
                  "Documentation Expanse",
                  "Ambulance Installment",
                  "Fund",
                  "Other",
                ].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setExpenseCategoryFilter(reason)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                      expenseCategoryFilter === reason
                        ? "bg-amber-700 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>

            {/* NEW: Date Range Filter Bar & Quick Preset Chips */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-800" />
                  <span className="text-xs font-bold text-amber-950">Filter by Date Range:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-2xs font-semibold text-slate-500 mr-1">Quick Presets:</span>
                  <button
                    onClick={() => setQuickDateRange("ALL")}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                      !expenseFromDate && !expenseToDate
                        ? "bg-amber-800 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    All History
                  </button>
                  <button
                    onClick={() => setQuickDateRange("TODAY")}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setQuickDateRange("LAST_7_DAYS")}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all"
                  >
                    Last 7 Days
                  </button>
                  <button
                    onClick={() => setQuickDateRange("THIS_MONTH")}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all"
                  >
                    This Month
                  </button>
                  {(expenseFromDate || expenseToDate) && (
                    <button
                      onClick={() => {
                        setExpenseFromDate("");
                        setExpenseToDate("");
                      }}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-all ml-1"
                    >
                      Clear Range
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-2xs font-bold text-slate-600 mb-1">From Date:</label>
                  <input
                    type="date"
                    value={expenseFromDate}
                    onChange={(e) => setExpenseFromDate(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-2xs font-bold text-slate-600 mb-1">To Date:</label>
                  <input
                    type="date"
                    value={expenseToDate}
                    onChange={(e) => setExpenseToDate(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-2xs font-bold text-slate-600 mb-1">Instant Ledger Search:</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={expenseSearchQuery}
                      onChange={(e) => setExpenseSearchQuery(e.target.value)}
                      placeholder="Payee, Reason, Receipt #, Note..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* NEW: Live Period Expense Summary Card */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-2xl bg-gradient-to-r from-amber-50/80 via-white to-sky-50/60 border border-amber-200/90 shadow-2xs">
              <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs">
                <span className="text-2xs font-bold uppercase tracking-wider text-rose-600 block">Period Total Expense</span>
                <span className="text-base font-black text-rose-700">PKR {periodSummary.periodExpense.toLocaleString()}</span>
                <span className="text-2xs text-slate-400 block mt-0.5">Outflows in selected scope</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs">
                <span className="text-2xs font-bold uppercase tracking-wider text-emerald-600 block">Period Total Received</span>
                <span className="text-base font-black text-emerald-700">PKR {periodSummary.periodReceived.toLocaleString()}</span>
                <span className="text-2xs text-slate-400 block mt-0.5">Inflows in selected scope</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs">
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-600 block">Net Period Balance</span>
                <span className={`text-base font-black ${periodSummary.periodNet >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                  {periodSummary.periodNet >= 0 ? `+PKR ${periodSummary.periodNet.toLocaleString()}` : `-PKR ${Math.abs(periodSummary.periodNet).toLocaleString()}`}
                </span>
                <span className="text-2xs text-slate-400 block mt-0.5">Balance for period</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs">
                <span className="text-2xs font-bold uppercase tracking-wider text-sky-600 block">Vouchers in Scope</span>
                <span className="text-base font-black text-sky-700">{periodSummary.periodCount} records</span>
                <span className="text-2xs text-slate-400 block mt-0.5">Matching active filters</span>
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
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredExpenses.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-400">
                        No expense records match the selected date range or category filters. Click &quot;All History&quot; or clear the search.
                      </td>
                    </tr>
                  ) : (
                    filteredExpenses.map((e, idx) => (
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
                                : e.reason === "Documentation Expanse" || e.reason === "Documentation"
                                ? "bg-blue-100 text-blue-800"
                                : e.reason === "Ambulance Installment"
                                ? "bg-indigo-100 text-indigo-800"
                                : e.reason === "Fund"
                                ? "bg-teal-100 text-teal-800"
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
                        <td className="p-3 text-center whitespace-nowrap">
                          <button
                            onClick={() => {
                              setEditingExpense(e);
                              setFormError(null);
                              setModalSuccess(null);
                            }}
                            className="p-1 text-slate-500 hover:text-amber-700 rounded transition-colors"
                            title="Edit Expense"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              setDeletingItem({
                                type: "EXPENSE",
                                idOrSNo: e.id || `exp-${idx}`,
                                label: `${e.reason} (${e.expense ? `PKR ${e.expense}` : `PKR ${e.received}`}) on ${e.date}`,
                                extra: { date: e.date, reason: e.reason },
                              })
                            }
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors ml-1"
                            title="Delete Expense"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE FULL-YEAR ANALYTICS & SUMMARY (MIRRORING ANALYSIS TAB) */}
        {activeTab === "ANALYTICS" && analytics && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Full-Year Analytics & Service Intelligence (Tab 3: Analysis)
                </h2>
                <p className="text-xs text-slate-500">
                  Aggregated from all trips and ledger vouchers.
                </p>
              </div>
            </div>

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
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
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
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
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
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
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
        {/* MODAL 1: NEW PATIENT & AMBULANCE TRIP FORM (CREATE)                       */}
        {/* ========================================================================= */}
        <Modal
          isOpen={activeModal === "PATIENT_TRIP"}
          onClose={() => {
            if (!isSubmitting) setActiveModal(null);
          }}
          title="New Patient & Ambulance Trip Form"
          description="Exact 13-field order matching Google Sheet Tab 1 (gid=0). Submitting auto-splits Used Service, Petrol, and Maintenance rows into the financial ledger."
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
                {/* 1. No */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">1. No (Trip Serial Number)</label>
                  <input
                    type="text"
                    required
                    value={tripForm.no}
                    onChange={(e) => handleTripFormChange("no", e.target.value)}
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

                {/* 3. Time */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">3. Time</label>
                  <input
                    type="text"
                    value={tripForm.time}
                    onChange={(e) => handleTripFormChange("time", e.target.value)}
                    placeholder="e.g. 10:00 AM or 16:00"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 4. Patient Name */}
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    4. Patient Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={tripForm.patientName}
                    onChange={(e) => handleTripFormChange("patientName", e.target.value)}
                    placeholder="e.g. Basat Shah Daughter, Kabir Shah Wife..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 5. Pick up */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">5. Pick Up (Origin)</label>
                  <input
                    type="text"
                    list="pickup-list"
                    value={tripForm.pickup}
                    onChange={(e) => handleTripFormChange("pickup", e.target.value)}
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
                    <option value="Bhatian" />
                    <option value="Mehmodha" />
                    <option value="Sunder" />
                  </datalist>
                </div>

                {/* 6. Drop */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">6. Drop (Destination)</label>
                  <input
                    type="text"
                    list="drop-list"
                    value={tripForm.drop}
                    onChange={(e) => handleTripFormChange("drop", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <datalist id="drop-list">
                    <option value="Mansehra" />
                    <option value="Abbottabad" />
                    <option value="Takia" />
                    <option value="Narbeer" />
                    <option value="Chakiyah" />
                  </datalist>
                </div>

                {/* 7. KM Pick */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">7. Km at Pickup</label>
                  <input
                    type="number"
                    value={tripForm.kmPick}
                    onChange={(e) => handleTripFormChange("kmPick", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 8. KM Drop */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">8. Km at Drop</label>
                  <input
                    type="number"
                    value={tripForm.kmDrop}
                    onChange={(e) => handleTripFormChange("kmDrop", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 9. Distance */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    9. Distance Coverd (KM) <span className="text-emerald-600 font-normal">(Auto)</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={tripForm.distance ? `${tripForm.distance} KM` : ""}
                    className="w-full px-3 py-2 bg-emerald-50/70 border border-emerald-200 rounded-lg font-bold text-emerald-800"
                  />
                </div>

                {/* 10. Petrol */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">10. Petrol (PKR)</label>
                  <input
                    type="number"
                    value={tripForm.petrol}
                    onChange={(e) => handleTripFormChange("petrol", e.target.value)}
                    placeholder="e.g. 3000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 11. Received */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">11. Received / Fare (PKR)</label>
                  <input
                    type="number"
                    value={tripForm.received}
                    onChange={(e) => handleTripFormChange("received", e.target.value)}
                    placeholder="e.g. 1200"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-emerald-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 12. Remark */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">12. Remark</label>
                  <input
                    type="text"
                    value={tripForm.remark}
                    onChange={(e) => handleTripFormChange("remark", e.target.value)}
                    placeholder="e.g. Janaza, Routine, Emergency..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* 13. Other Expanse */}
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">13. Other Expanse (PKR)</label>
                  <input
                    type="number"
                    value={tripForm.otherExpense}
                    onChange={(e) => handleTripFormChange("otherExpense", e.target.value)}
                    placeholder="e.g. 2500"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-sky-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Automatic 3-Way Split:</strong> Submitting will record the trip in Tab 1, and automatically create matching rows in Tab 2 (Expanses) for Used Service (PKR {tripForm.received || "0"}), Petrol (PKR {tripForm.petrol || "0"}), and Maintenance (PKR {tripForm.otherExpense || "0"}).
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
        {/* MODAL 2: GENERAL EXPENSE VOUCHER FORM (CREATE)                            */}
        {/* ========================================================================= */}
        <Modal
          isOpen={activeModal === "EXPENSE"}
          onClose={() => {
            if (!isSubmitting) setActiveModal(null);
          }}
          title="Record Expense / Documentary Voucher"
          description="Exact 7-field order matching Google Sheet Tab 2 (gid=223912461). Automatically sorted chronologically by Date in the official ledger."
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
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

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    2. Payee / Name <span className="text-slate-400 font-normal">(Staff/Vendor/Donor)</span>
                  </label>
                  <input
                    type="text"
                    value={expenseForm.name}
                    onChange={(e) => setExpenseForm({ ...expenseForm, name: e.target.value })}
                    placeholder="e.g. Angelika Katarzyna, Habeeb Sahib..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    3. Received (PKR) <span className="text-slate-400 font-normal">(If Inflow)</span>
                  </label>
                  <input
                    type="number"
                    value={expenseForm.received}
                    onChange={(e) => setExpenseForm({ ...expenseForm, received: e.target.value })}
                    placeholder="e.g. 14400"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-emerald-700 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    4. Expense (PKR) <span className="text-slate-400 font-normal">(If Outflow)</span>
                  </label>
                  <input
                    type="number"
                    value={expenseForm.expense}
                    onChange={(e) => setExpenseForm({ ...expenseForm, expense: e.target.value })}
                    placeholder="e.g. 20000, 15000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-rose-700 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">5. Reason / Category</label>
                  <select
                    value={expenseForm.reason}
                    onChange={(e) => setExpenseForm({ ...expenseForm, reason: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                  >
                    <option value="Used Service">Used Service (Ambulance Fare)</option>
                    <option value="Petrol">Petrol / Fuel</option>
                    <option value="Maintenance">Maintenance / Workshop Repairs</option>
                    <option value="Salary">Salary (Staff / Drivers)</option>
                    <option value="Documentation Expanse">Documentation Expanse (Excise / Paperwork)</option>
                    <option value="Ambulance Installment">Ambulance Installment</option>
                    <option value="Fund">Fund (Donation / Grant Inflow)</option>
                    <option value="Other">Other Operational</option>
                  </select>
                </div>

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

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">7. Remark / Description</label>
                  <input
                    type="text"
                    value={expenseForm.remark}
                    onChange={(e) => setExpenseForm({ ...expenseForm, remark: e.target.value })}
                    placeholder="e.g. For Jan, Vehicle registration, Routine maintenance..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

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

        {/* ========================================================================= */}
        {/* MODAL 3: EDIT PATIENT & AMBULANCE TRIP MODAL                              */}
        {/* ========================================================================= */}
        <Modal
          isOpen={editingTrip !== null}
          onClose={() => {
            if (!isSubmitting) setEditingTrip(null);
          }}
          title={`Edit Trip #${editingTrip?.no || editingTrip?.sNo || ""}`}
          description="Update trip details directly in Google Sheet. Changes are saved live to the cloud."
          size="xl"
        >
          {modalSuccess ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Trip Updated!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">{modalSuccess}</p>
            </div>
          ) : (
            editingTrip && (
              <form onSubmit={handleTripUpdate} className="space-y-4">
                {formError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">1. No</label>
                    <input
                      type="text"
                      readOnly
                      value={editingTrip.no || editingTrip.sNo}
                      className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg font-mono font-bold text-sky-700"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">2. Date</label>
                    <input
                      type="date"
                      required
                      value={editingTrip.date}
                      onChange={(e) => handleEditTripChange("date", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">3. Time</label>
                    <input
                      type="text"
                      value={editingTrip.time}
                      onChange={(e) => handleEditTripChange("time", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">4. Patient Name</label>
                    <input
                      type="text"
                      required
                      value={editingTrip.patientName}
                      onChange={(e) => handleEditTripChange("patientName", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">5. Pick Up</label>
                    <input
                      type="text"
                      value={editingTrip.pickup}
                      onChange={(e) => handleEditTripChange("pickup", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">6. Drop</label>
                    <input
                      type="text"
                      value={editingTrip.drop}
                      onChange={(e) => handleEditTripChange("drop", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">7. KM at Pick up</label>
                    <input
                      type="number"
                      value={editingTrip.kmPick}
                      onChange={(e) => handleEditTripChange("kmPick", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">8. KM at Drop</label>
                    <input
                      type="number"
                      value={editingTrip.kmDrop}
                      onChange={(e) => handleEditTripChange("kmDrop", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">9. Distance (KM)</label>
                    <input
                      type="text"
                      readOnly
                      value={editingTrip.distance ? `${editingTrip.distance} KM` : ""}
                      className="w-full px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg font-bold text-emerald-800"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">10. Petrol (PKR)</label>
                    <input
                      type="number"
                      value={editingTrip.petrol}
                      onChange={(e) => handleEditTripChange("petrol", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">11. Received (PKR)</label>
                    <input
                      type="number"
                      value={editingTrip.received}
                      onChange={(e) => handleEditTripChange("received", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-emerald-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">12. Remark</label>
                    <input
                      type="text"
                      value={editingTrip.remark || editingTrip.reason || ""}
                      onChange={(e) => handleEditTripChange("remark", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">13. Other Expanse (PKR)</label>
                    <input
                      type="number"
                      value={editingTrip.otherExpense}
                      onChange={(e) => handleEditTripChange("otherExpense", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => setEditingTrip(null)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    leftIcon={<Check className="w-4 h-4" />}
                  >
                    {isSubmitting ? "Updating..." : "Save Changes to Google Sheet"}
                  </Button>
                </div>
              </form>
            )
          )}
        </Modal>

        {/* ========================================================================= */}
        {/* MODAL 4: EDIT GENERAL EXPENSE VOUCHER MODAL                               */}
        {/* ========================================================================= */}
        <Modal
          isOpen={editingExpense !== null}
          onClose={() => {
            if (!isSubmitting) setEditingExpense(null);
          }}
          title="Edit Expense Voucher"
          description="Update expense details in Google Sheet ledger."
          size="lg"
        >
          {modalSuccess ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Voucher Updated!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">{modalSuccess}</p>
            </div>
          ) : (
            editingExpense && (
              <form onSubmit={handleExpenseUpdate} className="space-y-4">
                {formError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">1. Date</label>
                    <input
                      type="date"
                      required
                      value={editingExpense.date}
                      onChange={(e) => setEditingExpense({ ...editingExpense, date: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">2. Payee / Name</label>
                    <input
                      type="text"
                      value={editingExpense.name}
                      onChange={(e) => setEditingExpense({ ...editingExpense, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">3. Received (PKR)</label>
                    <input
                      type="number"
                      value={editingExpense.received}
                      onChange={(e) => setEditingExpense({ ...editingExpense, received: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-emerald-700 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">4. Expense (PKR)</label>
                    <input
                      type="number"
                      value={editingExpense.expense}
                      onChange={(e) => setEditingExpense({ ...editingExpense, expense: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-rose-700 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">5. Reason / Category</label>
                    <select
                      value={editingExpense.reason}
                      onChange={(e) => setEditingExpense({ ...editingExpense, reason: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                    >
                      <option value="Used Service">Used Service (Ambulance Fare)</option>
                      <option value="Petrol">Petrol / Fuel</option>
                      <option value="Maintenance">Maintenance / Workshop Repairs</option>
                      <option value="Salary">Salary (Staff / Drivers)</option>
                      <option value="Documentation Expanse">Documentation Expanse (Excise / Paperwork)</option>
                      <option value="Ambulance Installment">Ambulance Installment</option>
                      <option value="Fund">Fund (Donation / Grant Inflow)</option>
                      <option value="Other">Other Operational</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">6. JCDF Receipt #</label>
                    <input
                      type="text"
                      value={editingExpense.jcdfReceipt}
                      onChange={(e) => setEditingExpense({ ...editingExpense, jcdfReceipt: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">7. Remark / Note</label>
                    <input
                      type="text"
                      value={editingExpense.remark}
                      onChange={(e) => setEditingExpense({ ...editingExpense, remark: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => setEditingExpense(null)}
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
                    leftIcon={<Check className="w-4 h-4" />}
                  >
                    {isSubmitting ? "Updating..." : "Save Changes to Google Sheet"}
                  </Button>
                </div>
              </form>
            )
          )}
        </Modal>

        {/* ========================================================================= */}
        {/* MODAL 5: DELETE CONFIRMATION MODAL                                        */}
        {/* ========================================================================= */}
        <Modal
          isOpen={deletingItem !== null}
          onClose={() => {
            if (!isSubmitting) setDeletingItem(null);
          }}
          title="Confirm Deletion"
          description="Are you sure you want to delete this record? This action will remove the row from your Google Sheet."
          size="sm"
        >
          {formError && (
            <div className="p-3 mb-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="py-3">
            <p className="text-xs text-slate-700">
              You are about to delete:
            </p>
            <p className="text-sm font-bold text-rose-700 mt-1 p-2 rounded-lg bg-rose-50 border border-rose-100">
              {deletingItem?.label}
            </p>
            {deletingItem?.type === "TRIP" && (
              <p className="text-2xs text-slate-500 mt-2">
                Note: Any automatically split ledger rows in the Expanse sheet for this receipt will also be removed.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => setDeletingItem(null)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="emergency"
              size="md"
              onClick={handleConfirmDelete}
              disabled={isSubmitting}
              leftIcon={<Trash2 className="w-4 h-4" />}
            >
              {isSubmitting ? "Deleting..." : "Yes, Delete Record"}
            </Button>
          </div>
        </Modal>

        {/* ========================================================================= */}
        {/* MODAL 6: GOOGLE DRIVE WEBHOOK CONNECTION CONFIG MODAL                      */}
        {/* ========================================================================= */}
        <Modal
          isOpen={isDriveModalOpen}
          onClose={() => setIsDriveModalOpen(false)}
          title="Google Drive / Sheets Direct Sync Setup"
          description="Connect your Google Sheet Web App URL to enable real-time writes, edits, and deletes."
          size="lg"
        >
          <form onSubmit={handleSaveWebhook} className="space-y-4">
            {webhookTestFeedback && (
              <div
                className={`p-3 rounded-xl text-xs flex items-start gap-2 border ${
                  webhookTestFeedback.success
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-rose-50 border-rose-200 text-rose-800"
                }`}
              >
                {webhookTestFeedback.success ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
                )}
                <span>{webhookTestFeedback.message}</span>
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-800 text-xs mb-1">
                Google Apps Script Web App URL
              </label>
              <input
                type="url"
                required
                value={webhookInput}
                onChange={(e) => setWebhookInput(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <p className="text-2xs text-slate-500 mt-1">
                Paste the deployment Web App URL generated from your Google Sheet.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-sky-600" />
                Quick 1-Minute Setup Guide:
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-2xs text-slate-600 leading-relaxed">
                <li>
                  Open your Google Sheet: <span className="font-semibold text-slate-800">&quot;Ambulance data 2026&quot;</span>
                </li>
                <li>Click <strong>Extensions &rarr; Apps Script</strong>.</li>
                <li>
                  Copy the ready-to-use code from your project file:
                  <code className="mx-1 px-1.5 py-0.5 bg-slate-200 rounded font-mono text-slate-800">
                    scripts/google-apps-script-sync.js
                  </code>
                  and paste it into Code.gs.
                </li>
                <li>
                  Click <strong>Deploy &rarr; New deployment</strong>, select <strong>Web app</strong>, set <em>Who has access</em> to <strong>Anyone</strong>, and click Deploy.
                </li>
                <li>Copy the resulting Web App URL and paste it in the box above!</li>
              </ol>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => setIsDriveModalOpen(false)}
              >
                Close
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isTestingWebhook}
                leftIcon={<RefreshCw className={`w-4 h-4 ${isTestingWebhook ? "animate-spin" : ""}`} />}
              >
                {isTestingWebhook ? "Testing Connection..." : "Test & Save Connection"}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
