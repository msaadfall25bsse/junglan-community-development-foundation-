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
  Receipt,
  CheckCircle,
  Fuel,
  Wrench,
  Plus,
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  Calendar,
  CreditCard,
  Edit2,
  Trash2,
  AlertTriangle,
  FileText,
  User,
  ExternalLink,
  Truck,
  Layers,
} from "lucide-react";

interface ExpenseItem {
  id: string;
  voucherNumber: string;
  date: string;
  category: string;
  title: string;
  description: string;
  amountPKR: number;
  paidTo: string;
  status: string;
  receiptDocumentRef?: string | null;
  yearPeriodId: string;
}

interface FundingItem {
  id: string;
  referenceNumber: string;
  date: string;
  amountPKR: number;
  source: string;
  donorName?: string | null;
  donorContact?: string | null;
  purpose?: string | null;
  paymentMethod: string;
  receiptDocumentRef?: string | null;
  projectId?: string | null;
  isAnonymous?: boolean;
  yearPeriodId: string;
  project?: {
    id: string;
    title: string;
  };
}

interface ProjectOption {
  id: string;
  title: string;
}

interface AmbulanceOption {
  id: string;
  ambulanceIdentifier: string;
  registrationNumber: string;
  model: string;
}

export default function AdminExpensesPage() {
  const [activeTab, setActiveTab] = useState<"EXPENSES" | "FUNDING" | "FUEL" | "MAINTENANCE">("EXPENSES");
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [fundings, setFundings] = useState<FundingItem[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [ambulances, setAmbulances] = useState<AmbulanceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [feedback, setFeedback] = useState<string | null>(null);

  // Expense Modals
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [savingExpense, setSavingExpense] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    voucherNumber: "",
    title: "",
    category: "OPERATIONAL_LOGISTICS" as any,
    amountPKR: 5000,
    paidTo: "",
    paymentMethod: "CASH" as any,
    expenseDate: new Date().toISOString().split("T")[0],
    description: "",
    receiptDocumentUrl: "",
    yearPeriodId: "2026",
  });

  const [editExpenseModalOpen, setEditExpenseModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(null);

  const [voidExpenseModalOpen, setVoidExpenseModalOpen] = useState(false);
  const [voidTargetExpense, setVoidTargetExpense] = useState<ExpenseItem | null>(null);
  const [voidingExpense, setVoidingExpense] = useState(false);

  // Funding Modals
  const [fundingModalOpen, setFundingModalOpen] = useState(false);
  const [savingFunding, setSavingFunding] = useState(false);
  const [fundingForm, setFundingForm] = useState({
    donorName: "",
    donorContact: "",
    fundingSource: "INDIVIDUAL_DONATION" as any,
    amountPKR: 25000,
    projectId: "",
    purpose: "General Community Healthcare & Welfare",
    paymentMethod: "BANK_TRANSFER" as any,
    receiptNumber: "",
    receivedDate: new Date().toISOString().split("T")[0],
    isAnonymous: false,
    yearPeriodId: "2026",
  });

  const [editFundingModalOpen, setEditFundingModalOpen] = useState(false);
  const [editingFunding, setEditingFunding] = useState<FundingItem | null>(null);

  const [voidFundingModalOpen, setVoidFundingModalOpen] = useState(false);
  const [voidTargetFunding, setVoidTargetFunding] = useState<FundingItem | null>(null);
  const [voidingFunding, setVoidingFunding] = useState(false);

  // Fetch Financial Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [expRes, fndRes, prjRes, ambRes] = await Promise.all([
        fetch("/api/expenses?limit=200"),
        fetch("/api/funding?limit=200"),
        fetch("/api/projects"),
        fetch("/api/ambulances"),
      ]);

      const expJson = await expRes.json();
      const fndJson = await fndRes.json();
      const prjJson = await prjRes.json();
      const ambJson = await ambRes.json();

      if (expJson.success && expJson.data) setExpenses(expJson.data);
      if (fndJson.success && fndJson.data) setFundings(fndJson.data);
      if (prjJson.success && prjJson.data) setProjects(prjJson.data);
      if (ambJson.success && ambJson.data) setAmbulances(ambJson.data);
    } catch (err) {
      console.error("Failed to load financial records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open Create Expense Modal
  const openCreateExpense = () => {
    const nextVoucher = `EXP-2026-${String(expenses.length + 1).padStart(6, "0")}`;
    setExpenseForm({
      voucherNumber: nextVoucher,
      title: "",
      category: "OPERATIONAL_LOGISTICS",
      amountPKR: 5000,
      paidTo: "",
      paymentMethod: "CASH",
      expenseDate: new Date().toISOString().split("T")[0],
      description: "",
      receiptDocumentUrl: "",
      yearPeriodId: "2026",
    });
    setExpenseModalOpen(true);
  };

  // Submit Create Expense
  const handleSaveExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingExpense(true);
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseForm),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Expense voucher ${expenseForm.voucherNumber} created!`);
        fetchData();
        setExpenseModalOpen(false);
      } else {
        alert(json.error?.message || "Failed to record expense");
      }
    } catch (err) {
      console.error("Expense error:", err);
    } finally {
      setSavingExpense(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Open Edit Expense
  const openEditExpense = (item: ExpenseItem) => {
    setEditingExpense(item);
    setExpenseForm({
      voucherNumber: item.voucherNumber,
      title: item.title,
      category: item.category as any,
      amountPKR: Number(item.amountPKR),
      paidTo: item.paidTo,
      paymentMethod: "CASH",
      expenseDate: item.date ? item.date.split("T")[0] : new Date().toISOString().split("T")[0],
      description: item.description,
      receiptDocumentUrl: item.receiptDocumentRef || "",
      yearPeriodId: item.yearPeriodId,
    });
    setEditExpenseModalOpen(true);
  };

  // Submit Edit Expense
  const handleUpdateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExpense) return;
    setSavingExpense(true);
    try {
      const res = await fetch(`/api/expenses/${editingExpense.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: expenseForm.title,
          category: expenseForm.category,
          amountPKR: expenseForm.amountPKR,
          paidTo: expenseForm.paidTo,
          expenseDate: expenseForm.expenseDate,
          description: expenseForm.description,
          receiptDocumentUrl: expenseForm.receiptDocumentUrl,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Voucher ${editingExpense.voucherNumber} updated!`);
        fetchData();
        setEditExpenseModalOpen(false);
        setEditingExpense(null);
      } else {
        alert(json.error?.message || "Failed to update voucher");
      }
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setSavingExpense(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Submit Void Expense
  const handleVoidExpense = async () => {
    if (!voidTargetExpense) return;
    setVoidingExpense(true);
    try {
      const res = await fetch(`/api/expenses/${voidTargetExpense.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Voucher ${voidTargetExpense.voucherNumber} voided and archived.`);
        fetchData();
        setVoidExpenseModalOpen(false);
        setVoidTargetExpense(null);
      } else {
        alert(json.error?.message || "Failed to void voucher");
      }
    } catch (err) {
      console.error("Void error:", err);
    } finally {
      setVoidingExpense(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Open Create Funding
  const openCreateFunding = () => {
    setFundingForm({
      donorName: "",
      donorContact: "",
      fundingSource: "INDIVIDUAL_DONATION",
      amountPKR: 25000,
      projectId: projects[0]?.id || "",
      purpose: "General Community Healthcare & Welfare",
      paymentMethod: "BANK_TRANSFER",
      receiptNumber: `REC-${Date.now().toString().slice(-5)}`,
      receivedDate: new Date().toISOString().split("T")[0],
      isAnonymous: false,
      yearPeriodId: "2026",
    });
    setFundingModalOpen(true);
  };

  // Submit Create Funding
  const handleSaveFunding = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingFunding(true);
    try {
      const res = await fetch("/api/funding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fundingForm),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Funding record ${json.data.referenceNumber} recorded!`);
        fetchData();
        setFundingModalOpen(false);
      } else {
        alert(json.error?.message || "Failed to record funding");
      }
    } catch (err) {
      console.error("Funding error:", err);
    } finally {
      setSavingFunding(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Open Edit Funding
  const openEditFunding = (item: FundingItem) => {
    setEditingFunding(item);
    setFundingForm({
      donorName: item.donorName || "",
      donorContact: item.donorContact || "",
      fundingSource: item.source as any,
      amountPKR: Number(item.amountPKR),
      projectId: item.projectId || "",
      purpose: item.purpose || "",
      paymentMethod: item.paymentMethod as any,
      receiptNumber: item.receiptDocumentRef || "",
      receivedDate: item.date ? item.date.split("T")[0] : new Date().toISOString().split("T")[0],
      isAnonymous: item.isAnonymous || false,
      yearPeriodId: item.yearPeriodId,
    });
    setEditFundingModalOpen(true);
  };

  // Submit Edit Funding
  const handleUpdateFunding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFunding) return;
    setSavingFunding(true);
    try {
      const res = await fetch(`/api/funding/${editingFunding.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fundingForm),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Funding record ${editingFunding.referenceNumber} updated!`);
        fetchData();
        setEditFundingModalOpen(false);
        setEditingFunding(null);
      } else {
        alert(json.error?.message || "Failed to update funding");
      }
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setSavingFunding(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Submit Void Funding
  const handleVoidFunding = async () => {
    if (!voidTargetFunding) return;
    setVoidingFunding(true);
    try {
      const res = await fetch(`/api/funding/${voidTargetFunding.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setFeedback(`Funding record ${voidTargetFunding.referenceNumber} voided and archived.`);
        fetchData();
        setVoidFundingModalOpen(false);
        setVoidTargetFunding(null);
      } else {
        alert(json.error?.message || "Failed to void funding");
      }
    } catch (err) {
      console.error("Void error:", err);
    } finally {
      setVoidingFunding(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Financial Calculations
  const totalExpensesPKR = useMemo(() => {
    return expenses.reduce((acc, e) => acc + (Number(e.amountPKR) || 0), 0);
  }, [expenses]);

  const totalFundingPKR = useMemo(() => {
    return fundings.reduce((acc, f) => acc + (Number(f.amountPKR) || 0), 0);
  }, [fundings]);

  const netBalancePKR = totalFundingPKR - totalExpensesPKR;

  const fleetUpkeepPKR = useMemo(() => {
    return expenses
      .filter((e) => e.category.includes("FUEL") || e.category.includes("MAINTENANCE") || e.category.includes("REPAIR"))
      .reduce((acc, e) => acc + (Number(e.amountPKR) || 0), 0);
  }, [expenses]);

  // Filters
  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const matchesCategory =
        categoryFilter === "ALL" || e.category.includes(categoryFilter);
      const term = search.toLowerCase().trim();
      const matchesSearch =
        !term ||
        e.voucherNumber?.toLowerCase().includes(term) ||
        e.title?.toLowerCase().includes(term) ||
        e.paidTo?.toLowerCase().includes(term) ||
        e.description?.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [expenses, categoryFilter, search]);

  const filteredFundings = useMemo(() => {
    return fundings.filter((f) => {
      const term = search.toLowerCase().trim();
      return (
        !term ||
        f.referenceNumber?.toLowerCase().includes(term) ||
        f.donorName?.toLowerCase().includes(term) ||
        f.source?.toLowerCase().includes(term) ||
        f.purpose?.toLowerCase().includes(term)
      );
    });
  }, [fundings, search]);

  const fuelExpenses = useMemo(() => {
    return expenses.filter((e) => e.category.includes("FUEL"));
  }, [expenses]);

  const maintenanceExpenses = useMemo(() => {
    return expenses.filter((e) => e.category.includes("MAINTENANCE") || e.category.includes("REPAIR"));
  }, [expenses]);

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Financial Accounting & Treasury Management"
      pageSubtitle="Strict Decimal vouchers, operational expenditures, donor funding allocations, and ambulance fleet upkeep logs."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Expenses & Treasury" }]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchData}>
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Refresh
          </Button>
          {activeTab === "FUNDING" ? (
            <Button variant="primary" size="sm" onClick={openCreateFunding}>
              <Plus className="w-4 h-4 mr-1.5" />
              Record Inflow / Grant
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={openCreateExpense}>
              <Plus className="w-4 h-4 mr-1.5" />
              Create Voucher
            </Button>
          )}
        </div>
      }
    >
      {feedback && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium">{feedback}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardStatCard
          title="Total Inflow / Grants"
          value={`PKR ${totalFundingPKR.toLocaleString()}`}
          subtitle={`${fundings.length} verified donations`}
          icon={<TrendingUp className="w-5 h-5" />}
          variant="emerald"
        />
        <DashboardStatCard
          title="Total Operational Outflow"
          value={`PKR ${totalExpensesPKR.toLocaleString()}`}
          subtitle={`${expenses.length} approved vouchers`}
          icon={<TrendingDown className="w-5 h-5" />}
          variant="amber"
        />
        <DashboardStatCard
          title="Net Available Treasury"
          value={`PKR ${netBalancePKR.toLocaleString()}`}
          subtitle={netBalancePKR >= 0 ? "Healthy treasury reserve" : "Deficit alert"}
          icon={<Wallet className="w-5 h-5" />}
          variant={netBalancePKR >= 0 ? "sky" : "red"}
        />
        <DashboardStatCard
          title="Fleet Upkeep Spent"
          value={`PKR ${fleetUpkeepPKR.toLocaleString()}`}
          subtitle="Diesel + Workshop repairs"
          icon={<Fuel className="w-5 h-5" />}
          variant="default"
        />
      </div>

      {/* 4-Tab Bar */}
      <div className="flex border-b border-slate-200 mb-6 space-x-1 overflow-x-auto">
        {[
          { id: "EXPENSES", label: "Operational Expenses", icon: Receipt, count: expenses.length },
          { id: "FUNDING", label: "Inflow & Grants", icon: DollarSign, count: fundings.length },
          { id: "FUEL", label: "Fuel Telemetry", icon: Fuel, count: fuelExpenses.length },
          { id: "MAINTENANCE", label: "Workshop Invoices", icon: Wrench, count: maintenanceExpenses.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? "border-emerald-600 text-emerald-800 bg-emerald-50/50"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OPERATIONAL EXPENSES */}
      {activeTab === "EXPENSES" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search voucher #, title, payee..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Category:
              </span>
              {[
                { label: "All", value: "ALL" },
                { label: "Fuel", value: "FUEL" },
                { label: "Maintenance", value: "MAINTENANCE" },
                { label: "Supplies", value: "SUPPLIES" },
                { label: "Operations", value: "OPERATIONS" },
              ].map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategoryFilter(c.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                    categoryFilter === c.value
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Voucher #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Title & Purpose</TableHead>
                  <TableHead>Amount (PKR)</TableHead>
                  <TableHead>Paid To</TableHead>
                  <TableHead>Receipt</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                      Loading financial vouchers...
                    </TableCell>
                  </TableRow>
                ) : filteredExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                      No expense vouchers found. Click &quot;Create Voucher&quot; to log an expenditure.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExpenses.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="font-mono font-bold text-slate-900">
                        {e.voucherNumber}
                      </TableCell>
                      <TableCell className="text-slate-600 text-xs">
                        {new Date(e.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            e.category.includes("FUEL")
                              ? "warning"
                              : e.category.includes("MAINTENANCE")
                              ? "default"
                              : "sky"
                          }
                        >
                          {e.category.replace("AMBULANCE_", "").replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-slate-900">{e.title}</div>
                        <div className="text-xs text-slate-500 truncate max-w-xs">{e.description}</div>
                      </TableCell>
                      <TableCell className="font-mono font-bold text-slate-900">
                        PKR {Number(e.amountPKR).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-slate-700">{e.paidTo}</TableCell>
                      <TableCell>
                        {e.receiptDocumentRef ? (
                          <a
                            href={e.receiptDocumentRef}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:underline"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            View Slip
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400 italic">No slip</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditExpense(e)}
                            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Voucher"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setVoidTargetExpense(e);
                              setVoidExpenseModalOpen(true);
                            }}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Void & Archive Voucher"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* TAB 2: INFLOW & GRANTS */}
      {activeTab === "FUNDING" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search reference #, donor, purpose..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button variant="primary" size="sm" onClick={openCreateFunding}>
              <Plus className="w-4 h-4 mr-1.5" />
              Record Inflow / Grant
            </Button>
          </div>

          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Donor / Benefactor</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Amount (PKR)</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Project Allocation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                      Loading inflow records...
                    </TableCell>
                  </TableRow>
                ) : filteredFundings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                      No funding records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFundings.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell className="font-mono font-bold text-emerald-700">
                        {f.referenceNumber}
                      </TableCell>
                      <TableCell className="text-slate-600 text-xs">
                        {new Date(f.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-slate-900">
                          {f.isAnonymous ? "Anonymous Benefactor" : f.donorName || "Anonymous"}
                        </div>
                        {f.donorContact && (
                          <div className="text-xs text-slate-500 font-mono">{f.donorContact}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="sky">
                          {f.source.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono font-bold text-emerald-800 text-sm">
                        +PKR {Number(f.amountPKR).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-slate-700 text-xs">
                        {f.paymentMethod.replace("_", " ")}
                      </TableCell>
                      <TableCell>
                        {f.project ? (
                          <span className="text-xs font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                            {f.project.title}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 italic">General Foundation Pool</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditFunding(f)}
                            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Inflow Record"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setVoidTargetFunding(f);
                              setVoidFundingModalOpen(true);
                            }}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Void & Archive Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* TAB 3: FUEL TELEMETRY */}
      {activeTab === "FUEL" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Diesel & Fuel Vouchers Breakdown</h3>
              <p className="text-xs text-slate-500">Fuel disbursements linked to mountain transit units.</p>
            </div>
            <div className="font-mono text-sm font-bold text-amber-700">
              Total Fuel Spent: PKR {fuelExpenses.reduce((acc, e) => acc + Number(e.amountPKR), 0).toLocaleString()}
            </div>
          </div>

          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Voucher #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Fuel Station / Vendor</TableHead>
                  <TableHead>Amount (PKR)</TableHead>
                  <TableHead>Receipt Slip</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fuelExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      No fuel vouchers recorded yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  fuelExpenses.map((fe) => (
                    <TableRow key={fe.id}>
                      <TableCell className="font-mono font-bold text-slate-900">{fe.voucherNumber}</TableCell>
                      <TableCell className="text-slate-600 text-xs">
                        {new Date(fe.date).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell className="font-semibold text-slate-800">{fe.title}</TableCell>
                      <TableCell className="text-slate-700">{fe.paidTo}</TableCell>
                      <TableCell className="font-mono font-bold text-amber-900">
                        PKR {Number(fe.amountPKR).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {fe.receiptDocumentRef ? (
                          <a
                            href={fe.receiptDocumentRef}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-emerald-700 hover:underline inline-flex items-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            View Slip
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400 italic">No receipt</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* TAB 4: WORKSHOP MAINTENANCE */}
      {activeTab === "MAINTENANCE" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Workshop Repairs & Routine Servicing</h3>
              <p className="text-xs text-slate-500">Periodic oil changes, brake pads, tire replacements, and mountain overhauls.</p>
            </div>
            <div className="font-mono text-sm font-bold text-indigo-700">
              Total Maintenance: PKR {maintenanceExpenses.reduce((acc, e) => acc + Number(e.amountPKR), 0).toLocaleString()}
            </div>
          </div>

          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Voucher #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Service / Repair Description</TableHead>
                  <TableHead>Workshop / Vendor</TableHead>
                  <TableHead>Amount (PKR)</TableHead>
                  <TableHead>Invoice Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      No workshop maintenance invoices recorded yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  maintenanceExpenses.map((me) => (
                    <TableRow key={me.id}>
                      <TableCell className="font-mono font-bold text-slate-900">{me.voucherNumber}</TableCell>
                      <TableCell className="text-slate-600 text-xs">
                        {new Date(me.date).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-slate-800">{me.title}</div>
                        <div className="text-xs text-slate-500">{me.description}</div>
                      </TableCell>
                      <TableCell className="text-slate-700">{me.paidTo}</TableCell>
                      <TableCell className="font-mono font-bold text-slate-900">
                        PKR {Number(me.amountPKR).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {me.receiptDocumentRef ? (
                          <a
                            href={me.receiptDocumentRef}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-emerald-700 hover:underline inline-flex items-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            View Invoice
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400 italic">No invoice</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* CREATE EXPENSE MODAL */}
      <Modal
        isOpen={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        title="Create Operational Expense Voucher"
        size="lg"
      >
        <form onSubmit={handleSaveExpense} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Voucher Number" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono font-semibold focus:ring-2 focus:ring-emerald-500"
                value={expenseForm.voucherNumber}
                onChange={(e) => setExpenseForm({ ...expenseForm, voucherNumber: e.target.value })}
              />
            </FormField>

            <FormField label="Category" required>
              <select
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-semibold"
                value={expenseForm.category}
                onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value as any })}
              >
                <option value="AMBULANCE_FUEL">Ambulance Fuel / Diesel</option>
                <option value="AMBULANCE_MAINTENANCE">Ambulance Maintenance & Servicing</option>
                <option value="AMBULANCE_REPAIR">Emergency Vehicle Repairs</option>
                <option value="MEDICAL_SUPPLIES">Medical Supplies & Oxygen Refills</option>
                <option value="OPERATIONAL_LOGISTICS">Operational Logistics</option>
                <option value="STAFF_STIPENDS">Staff Honorarium & Stipends</option>
                <option value="ADMIN_OFFICE">Administrative & Office Upkeep</option>
                <option value="COMMUNITY_OUTREACH">Community Outreach & Aid</option>
                <option value="MISCELLANEOUS">Miscellaneous Operational</option>
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Expense Title" required>
              <input
                type="text"
                required
                placeholder="e.g. Diesel Refill for AMB-01"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={expenseForm.title}
                onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
              />
            </FormField>

            <FormField label="Amount in PKR (Strict Decimal)" required>
              <input
                type="number"
                required
                min={1}
                step="any"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono font-bold focus:ring-2 focus:ring-emerald-500"
                value={expenseForm.amountPKR}
                onChange={(e) => setExpenseForm({ ...expenseForm, amountPKR: Number(e.target.value) })}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Paid To (Payee / Vendor)" required>
              <input
                type="text"
                required
                placeholder="PSO Pump / Workshop / Vendor"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={expenseForm.paidTo}
                onChange={(e) => setExpenseForm({ ...expenseForm, paidTo: e.target.value })}
              />
            </FormField>

            <FormField label="Expense Date" required>
              <input
                type="date"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={expenseForm.expenseDate}
                onChange={(e) => setExpenseForm({ ...expenseForm, expenseDate: e.target.value })}
              />
            </FormField>

            <FormField label="Payment Method" required>
              <select
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={expenseForm.paymentMethod}
                onChange={(e) => setExpenseForm({ ...expenseForm, paymentMethod: e.target.value as any })}
              >
                <option value="CASH">CASH</option>
                <option value="BANK_TRANSFER">BANK TRANSFER</option>
                <option value="CHEQUE">CHEQUE</option>
                <option value="ONLINE">ONLINE / RAAST</option>
                <option value="OTHER">OTHER</option>
              </select>
            </FormField>
          </div>

          <FormField label="Description / Justification" required>
            <textarea
              rows={2}
              required
              placeholder="Detailed reason and operational purpose..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
              value={expenseForm.description}
              onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
            />
          </FormField>

          <FormField label="Receipt Document URL / Reference">
            <input
              type="text"
              placeholder="https://... or physical slip voucher #REC-9821"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
              value={expenseForm.receiptDocumentUrl}
              onChange={(e) => setExpenseForm({ ...expenseForm, receiptDocumentUrl: e.target.value })}
            />
          </FormField>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <Button variant="outline" type="button" onClick={() => setExpenseModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={savingExpense}>
              {savingExpense ? "Recording..." : "Record Expense Voucher"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* EDIT EXPENSE MODAL */}
      {editingExpense && (
        <Modal
          isOpen={editExpenseModalOpen}
          onClose={() => setEditExpenseModalOpen(false)}
          title={`Edit Voucher: ${editingExpense.voucherNumber}`}
          size="lg"
        >
          <form onSubmit={handleUpdateExpense} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Expense Title" required>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={expenseForm.title}
                  onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                />
              </FormField>

              <FormField label="Amount in PKR" required>
                <input
                  type="number"
                  required
                  min={1}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono font-bold focus:ring-2 focus:ring-emerald-500"
                  value={expenseForm.amountPKR}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amountPKR: Number(e.target.value) })}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Paid To" required>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={expenseForm.paidTo}
                  onChange={(e) => setExpenseForm({ ...expenseForm, paidTo: e.target.value })}
                />
              </FormField>

              <FormField label="Expense Date" required>
                <input
                  type="date"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={expenseForm.expenseDate}
                  onChange={(e) => setExpenseForm({ ...expenseForm, expenseDate: e.target.value })}
                />
              </FormField>
            </div>

            <FormField label="Description" required>
              <textarea
                rows={2}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={expenseForm.description}
                onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
              />
            </FormField>

            <FormField label="Receipt Document URL">
              <input
                type="text"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={expenseForm.receiptDocumentUrl}
                onChange={(e) => setExpenseForm({ ...expenseForm, receiptDocumentUrl: e.target.value })}
              />
            </FormField>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
              <Button variant="outline" type="button" onClick={() => setEditExpenseModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={savingExpense}>
                {savingExpense ? "Saving..." : "Update Voucher"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* VOID EXPENSE MODAL */}
      {voidTargetExpense && (
        <Modal
          isOpen={voidExpenseModalOpen}
          onClose={() => setVoidExpenseModalOpen(false)}
          title="Void & Soft-Archive Voucher"
          size="md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold mb-1">
                  Void Voucher: {voidTargetExpense.voucherNumber}?
                </p>
                <p className="text-amber-800 text-xs leading-relaxed">
                  In accordance with the Zero-Loss financial policy, this voucher of <strong>PKR {Number(voidTargetExpense.amountPKR).toLocaleString()}</strong> will be marked as <strong>REJECTED / VOID</strong>. The record will permanently remain in the audit trail for regulatory inspection.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setVoidExpenseModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="emergency"
                onClick={handleVoidExpense}
                disabled={voidingExpense}
              >
                {voidingExpense ? "Voiding..." : "Confirm Void Voucher"}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* CREATE FUNDING MODAL */}
      <Modal
        isOpen={fundingModalOpen}
        onClose={() => setFundingModalOpen(false)}
        title="Record Inflow, Grant or Donor Contribution"
        size="lg"
      >
        <form onSubmit={handleSaveFunding} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Donor / Contributor Name" required={!fundingForm.isAnonymous}>
              <input
                type="text"
                disabled={fundingForm.isAnonymous}
                placeholder={fundingForm.isAnonymous ? "Anonymous Benefactor" : "e.g. Haji Abdul Rasheed"}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-100"
                value={fundingForm.donorName}
                onChange={(e) => setFundingForm({ ...fundingForm, donorName: e.target.value })}
              />
            </FormField>

            <div className="flex items-center pt-8">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  checked={fundingForm.isAnonymous}
                  onChange={(e) => setFundingForm({ ...fundingForm, isAnonymous: e.target.checked })}
                />
                <span>Anonymous Donation (Protect Privacy)</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Funding Source" required>
              <select
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-semibold"
                value={fundingForm.fundingSource}
                onChange={(e) => setFundingForm({ ...fundingForm, fundingSource: e.target.value as any })}
              >
                <option value="INDIVIDUAL_DONATION">Individual Community Donation</option>
                <option value="COMMUNITY_POOL">Community General Welfare Pool</option>
                <option value="CORPORATE_CSR">Corporate CSR Contribution</option>
                <option value="GOVERNMENT_GRANT">Government / District Grant</option>
                <option value="INTERNATIONAL_AID">Overseas Pakistani / Diaspora Aid</option>
                <option value="FOUNDATION_RESERVE">Foundation Internal Reserve</option>
                <option value="OTHER">Other Source</option>
              </select>
            </FormField>

            <FormField label="Amount in PKR (Strict Decimal)" required>
              <input
                type="number"
                required
                min={1}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-500"
                value={fundingForm.amountPKR}
                onChange={(e) => setFundingForm({ ...fundingForm, amountPKR: Number(e.target.value) })}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Designated Project (Optional)">
              <select
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={fundingForm.projectId}
                onChange={(e) => setFundingForm({ ...fundingForm, projectId: e.target.value })}
              >
                <option value="">-- General Foundation Pool --</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Payment Method" required>
              <select
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={fundingForm.paymentMethod}
                onChange={(e) => setFundingForm({ ...fundingForm, paymentMethod: e.target.value as any })}
              >
                <option value="BANK_TRANSFER">Direct Bank Transfer / RAAST</option>
                <option value="CASH">Cash Deposit with Receipt</option>
                <option value="CHEQUE">Bank Cheque</option>
                <option value="ONLINE_PORTAL">Online Portal Payment</option>
                <option value="OTHER">Other</option>
              </select>
            </FormField>

            <FormField label="Received Date" required>
              <input
                type="date"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={fundingForm.receivedDate}
                onChange={(e) => setFundingForm({ ...fundingForm, receivedDate: e.target.value })}
              />
            </FormField>
          </div>

          <FormField label="Specific Purpose / Notes">
            <input
              type="text"
              placeholder="e.g. Life-saving oxygen supplies, emergency diesel pool"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
              value={fundingForm.purpose}
              onChange={(e) => setFundingForm({ ...fundingForm, purpose: e.target.value })}
            />
          </FormField>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <Button variant="outline" type="button" onClick={() => setFundingModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={savingFunding}>
              {savingFunding ? "Recording..." : "Record Inflow"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* EDIT FUNDING MODAL */}
      {editingFunding && (
        <Modal
          isOpen={editFundingModalOpen}
          onClose={() => setEditFundingModalOpen(false)}
          title={`Edit Funding Record: ${editingFunding.referenceNumber}`}
          size="lg"
        >
          <form onSubmit={handleUpdateFunding} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Donor / Contributor Name">
                <input
                  type="text"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={fundingForm.donorName}
                  onChange={(e) => setFundingForm({ ...fundingForm, donorName: e.target.value })}
                />
              </FormField>

              <FormField label="Amount in PKR" required>
                <input
                  type="number"
                  required
                  min={1}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-500"
                  value={fundingForm.amountPKR}
                  onChange={(e) => setFundingForm({ ...fundingForm, amountPKR: Number(e.target.value) })}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Purpose">
                <input
                  type="text"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={fundingForm.purpose}
                  onChange={(e) => setFundingForm({ ...fundingForm, purpose: e.target.value })}
                />
              </FormField>

              <FormField label="Received Date" required>
                <input
                  type="date"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                  value={fundingForm.receivedDate}
                  onChange={(e) => setFundingForm({ ...fundingForm, receivedDate: e.target.value })}
                />
              </FormField>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
              <Button variant="outline" type="button" onClick={() => setEditFundingModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={savingFunding}>
                {savingFunding ? "Saving..." : "Update Inflow"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* VOID FUNDING MODAL */}
      {voidTargetFunding && (
        <Modal
          isOpen={voidFundingModalOpen}
          onClose={() => setVoidFundingModalOpen(false)}
          title="Void & Soft-Archive Inflow Record"
          size="md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold mb-1">
                  Void Record: {voidTargetFunding.referenceNumber}?
                </p>
                <p className="text-amber-800 text-xs leading-relaxed">
                  In accordance with the Zero-Loss policy, this contribution record of <strong>PKR {Number(voidTargetFunding.amountPKR).toLocaleString()}</strong> will be archived. If it was allocated to a specific project, the project&apos;s current funding balance will automatically adjust.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setVoidFundingModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="emergency"
                onClick={handleVoidFunding}
                disabled={voidingFunding}
              >
                {voidingFunding ? "Voiding..." : "Confirm Void Record"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
