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
  BarChart3,
  Calendar,
  Lock,
  Unlock,
  CheckCircle,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  FileText,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  AlertTriangle,
  Download,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";

interface ReportItem {
  id: string;
  title: string;
  year: number;
  period: string;
  category: "FINANCIAL" | "OPERATIONAL" | "ANNUAL" | "IMPACT";
  fileSize: string;
  downloadUrl: string;
  summary: string;
  publishedDate: string;
}

interface YearPeriodItem {
  id: string;
  year: number;
  label: string;
  status: "ACTIVE" | "CLOSED" | "FUTURE" | "ARCHIVED";
  isCurrentActive: boolean;
  startDate: string;
  endDate: string;
  _count?: {
    patients?: number;
    trips?: number;
    expenses?: number;
    fundings?: number;
  };
}

interface AnalyticsData {
  summary: {
    lifetimePatientsCount: number;
    lifetimeTripsCount: number;
    lifetimeDistanceKm: number;
    lifetimeFundingPKR: number;
    lifetimeExpensesPKR: number;
    lifetimeNetTreasuryPKR: number;
    averageFuelCostPerKm: number;
  };
  yearlyBreakdown: Array<{
    id: string;
    year: number;
    label: string;
    status: string;
    isCurrentActive: boolean;
    patientsCount: number;
    tripsCount: number;
    distanceKm: number;
    fundingPKR: number;
    expensesPKR: number;
    netTreasuryPKR: number;
    fuelExpensesPKR: number;
    maintenanceExpensesPKR: number;
    fuelCostPerKm: number;
  }>;
}

export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState<"ANALYTICS" | "YEAR_PERIODS" | "REPORTS">("ANALYTICS");
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [yearPeriods, setYearPeriods] = useState<YearPeriodItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Reports modal state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<ReportItem | null>(null);
  const [savingReport, setSavingReport] = useState(false);
  const [reportForm, setReportForm] = useState({
    title: "",
    year: 2026,
    period: "Annual 2026",
    category: "OPERATIONAL" as "FINANCIAL" | "OPERATIONAL" | "ANNUAL" | "IMPACT",
    fileSize: "1.8 MB",
    downloadUrl: "#",
    summary: "",
  });

  // Year Period modals
  const [createYearModalOpen, setCreateYearModalOpen] = useState(false);
  const [savingYear, setSavingYear] = useState(false);
  const [yearForm, setYearForm] = useState({
    year: "2027",
    label: "Operational Year 2027",
    startDate: "2027-01-01",
    endDate: "2027-12-31",
    isActive: false,
    notes: "Planned operational period",
  });

  // Action confirmations
  const [selectedPeriod, setSelectedPeriod] = useState<YearPeriodItem | null>(null);
  const [activateModalOpen, setActivateModalOpen] = useState(false);
  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const [actionProcessing, setActionProcessing] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [reportsRes, yearsRes, analyticsRes] = await Promise.all([
        fetch("/api/reports").then((r) => r.json()).catch(() => ({ data: [] })),
        fetch("/api/year-periods").then((r) => r.json()).catch(() => ({ data: { periods: [] } })),
        fetch("/api/analytics/cross-year").then((r) => r.json()).catch(() => ({ data: null })),
      ]);

      if (reportsRes.success) {
        const raw = Array.isArray(reportsRes.data)
          ? reportsRes.data
          : reportsRes.data?.reports || [];
        setReports(raw);
      }

      if (yearsRes.success && yearsRes.data?.periods) {
        setYearPeriods(yearsRes.data.periods);
      }

      if (analyticsRes.success && analyticsRes.data) {
        setAnalytics(analyticsRes.data);
      }
    } catch (err) {
      console.error("Failed loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 4000);
  };

  // ---------------------------------------------------------------------------
  // Year Period Actions
  // ---------------------------------------------------------------------------
  const handleCreateYear = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingYear(true);
    try {
      const res = await fetch("/api/year-periods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(yearForm),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to create year period.");
      }
      triggerFeedback(`Operational Year Period '${yearForm.label}' created successfully.`);
      setCreateYearModalOpen(false);
      loadData();
    } catch (err: any) {
      alert(err.message || "Failed to create year period.");
    } finally {
      setSavingYear(false);
    }
  };

  const handleActivatePeriod = async () => {
    if (!selectedPeriod) return;
    setActionProcessing(true);
    try {
      const res = await fetch(`/api/year-periods/${selectedPeriod.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "SET_ACTIVE" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to activate year period.");
      }
      triggerFeedback(`Operational Year Period '${selectedPeriod.label}' is now active.`);
      setActivateModalOpen(false);
      setSelectedPeriod(null);
      loadData();
    } catch (err: any) {
      alert(err.message || "Failed to activate period.");
    } finally {
      setActionProcessing(false);
    }
  };

  const handleClosePeriod = async () => {
    if (!selectedPeriod) return;
    setActionProcessing(true);
    try {
      const res = await fetch(`/api/year-periods/${selectedPeriod.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "CLOSE" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to close year period.");
      }
      triggerFeedback(
        `Operational Year Period '${selectedPeriod.label}' is now locked into historical read-only ledger.`
      );
      setCloseModalOpen(false);
      setSelectedPeriod(null);
      loadData();
    } catch (err: any) {
      alert(err.message || "Failed to close period.");
    } finally {
      setActionProcessing(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Reports Actions
  // ---------------------------------------------------------------------------
  const handleOpenCreateReport = () => {
    setEditingReport(null);
    setReportForm({
      title: "",
      year: new Date().getFullYear(),
      period: "Annual 2026",
      category: "OPERATIONAL",
      fileSize: "1.8 MB",
      downloadUrl: "#",
      summary: "",
    });
    setReportModalOpen(true);
  };

  const handleOpenEditReport = (rep: ReportItem) => {
    setEditingReport(rep);
    setReportForm({
      title: rep.title,
      year: rep.year,
      period: rep.period,
      category: rep.category,
      fileSize: rep.fileSize,
      downloadUrl: rep.downloadUrl,
      summary: rep.summary,
    });
    setReportModalOpen(true);
  };

  const handleSaveReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingReport(true);
    try {
      if (editingReport) {
        const res = await fetch(`/api/reports/${editingReport.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reportForm),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error?.message);
        triggerFeedback("Report updated successfully.");
      } else {
        const res = await fetch("/api/reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...reportForm,
            yearPeriodId: "2026",
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error?.message);
        triggerFeedback("New transparency report published successfully.");
      }
      setReportModalOpen(false);
      loadData();
    } catch (err: any) {
      alert(err.message || "Failed to save report.");
    } finally {
      setSavingReport(false);
    }
  };

  const handleDeleteReport = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this report publication?")) return;
    try {
      const res = await fetch(`/api/reports/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error?.message);
      triggerFeedback("Report deleted successfully.");
      loadData();
    } catch (err: any) {
      alert(err.message || "Failed to delete report.");
    }
  };

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Operational Intelligence & Year Periods Command Center"
      pageSubtitle="Multi-year historical preservation, period locking safeguards, cross-year performance trends, and official transparency publications."
      breadcrumbs={[{ label: "Governance" }, { label: "Reports & Analytics" }]}
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadData}>
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Refresh Data
          </Button>
          {activeTab === "YEAR_PERIODS" && (
            <Button variant="primary" size="sm" onClick={() => setCreateYearModalOpen(true)}>
              <Plus className="w-4 h-4 mr-1.5" />
              New Operational Year
            </Button>
          )}
          {activeTab === "REPORTS" && (
            <Button variant="primary" size="sm" onClick={handleOpenCreateReport}>
              <Plus className="w-4 h-4 mr-1.5" />
              Publish New Report
            </Button>
          )}
        </div>
      }
    >
      {/* Toast Feedback */}
      {feedback && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-in fade-in duration-200 shadow-sm">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          {feedback}
        </div>
      )}

      {/* 3-Tab Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("ANALYTICS")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "ANALYTICS"
              ? "bg-sky-700 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Cross-Year Operational Analytics
        </button>

        <button
          onClick={() => setActiveTab("YEAR_PERIODS")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "YEAR_PERIODS"
              ? "bg-sky-700 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Calendar className="w-4 h-4" />
          Operational Year Periods & Archival Locks
          {yearPeriods.length > 0 && (
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === "YEAR_PERIODS" ? "bg-sky-900 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              {yearPeriods.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("REPORTS")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "REPORTS"
              ? "bg-sky-700 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <FileText className="w-4 h-4" />
          Published Transparency Reports
          {reports.length > 0 && (
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === "REPORTS" ? "bg-sky-900 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              {reports.length}
            </span>
          )}
        </button>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: CROSS-YEAR OPERATIONAL ANALYTICS                               */}
      {/* ===================================================================== */}
      {activeTab === "ANALYTICS" && (
        <div className="space-y-6">
          {/* Lifetime Summary KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardStatCard
              title="Lifetime Patients Registered"
              value={analytics?.summary.lifetimePatientsCount.toLocaleString() || "0"}
              subtitle="Unduplicated community healthcare intakes"
              icon={<Users className="w-5 h-5" />}
              variant="sky"
            />
            <DashboardStatCard
              title="Emergency Transit Covered"
              value={`${(analytics?.summary.lifetimeDistanceKm || 0).toLocaleString()} km`}
              subtitle="Total rugged mountain mission mileage"
              icon={<Truck className="w-5 h-5" />}
              variant="emerald"
            />
            <DashboardStatCard
              title="Lifetime Treasury Turnover"
              value={`PKR ${((analytics?.summary.lifetimeFundingPKR || 0) / 1000000).toFixed(2)}M`}
              subtitle={`Disbursed: PKR ${((analytics?.summary.lifetimeExpensesPKR || 0) / 1000000).toFixed(2)}M`}
              icon={<Wallet className="w-5 h-5" />}
              variant="amber"
            />
            <DashboardStatCard
              title="Fleet Fuel Efficiency"
              value={`PKR ${analytics?.summary.averageFuelCostPerKm || 0}/km`}
              subtitle="Average operational fuel cost per kilometer"
              icon={<TrendingUp className="w-5 h-5" />}
              variant="default"
            />
          </div>

          {/* Multi-Year Comparative Cards (2024 vs 2025 vs 2026) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {analytics?.yearlyBreakdown.map((item) => (
              <div
                key={item.id}
                className={`p-6 rounded-2xl bg-white border transition-all ${
                  item.isCurrentActive
                    ? "border-emerald-300 ring-2 ring-emerald-500/20 shadow-md"
                    : "border-slate-200 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">{item.year}</h3>
                    <Badge
                      variant={
                        item.isCurrentActive
                          ? "success"
                          : item.status === "CLOSED"
                          ? "neutral"
                          : "warning"
                      }
                      size="sm"
                    >
                      {item.isCurrentActive ? "Active Year" : item.status}
                    </Badge>
                  </div>
                  {item.status === "CLOSED" ? (
                    <span className="text-xs text-slate-400 font-medium inline-flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      Locked
                    </span>
                  ) : (
                    <span className="text-xs text-emerald-700 font-medium inline-flex items-center gap-1">
                      <Unlock className="w-3.5 h-3.5" />
                      Open
                    </span>
                  )}
                </div>

                <div className="space-y-3 text-xs border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Patients Intake:</span>
                    <span className="font-bold text-slate-900 text-sm">
                      {item.patientsCount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Emergency Trips Logged:</span>
                    <span className="font-bold text-slate-900">
                      {item.tripsCount.toLocaleString()} missions
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Transit Mileage:</span>
                    <span className="font-mono font-bold text-sky-800">
                      {item.distanceKm.toLocaleString()} km
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                    <span className="text-slate-500">Inflow / Grants:</span>
                    <span className="font-mono font-bold text-emerald-700">
                      PKR {item.fundingPKR.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Operational Outflow:</span>
                    <span className="font-mono font-bold text-slate-800">
                      PKR {item.expensesPKR.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                    <span className="text-slate-500">Net Treasury Reserve:</span>
                    <span
                      className={`font-mono font-bold ${
                        item.netTreasuryPKR >= 0 ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      PKR {item.netTreasuryPKR.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg mt-2">
                    <span className="text-slate-600 font-medium">Fuel Efficiency:</span>
                    <span className="font-mono font-bold text-amber-800">
                      PKR {item.fuelCostPerKm} / km
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparative Programmatic Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Annual Comparative Performance Matrix
                </h3>
                <p className="text-xs text-slate-500">
                  Benchmarking community service growth, ambulance response distance, and treasury stability.
                </p>
              </div>
            </div>

            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Operational Year</TableHead>
                    <TableHead>Ledger Status</TableHead>
                    <TableHead className="text-right">Patients Served</TableHead>
                    <TableHead className="text-right">Ambulance Missions</TableHead>
                    <TableHead className="text-right">Transit Distance</TableHead>
                    <TableHead className="text-right">Funding (PKR)</TableHead>
                    <TableHead className="text-right">Disbursements (PKR)</TableHead>
                    <TableHead className="text-right">Fuel Cost / km</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics?.yearlyBreakdown.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-bold text-slate-900">
                        {row.label}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            row.isCurrentActive
                              ? "success"
                              : row.status === "CLOSED"
                              ? "neutral"
                              : "warning"
                          }
                          size="sm"
                        >
                          {row.isCurrentActive ? "Active" : row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold text-slate-900">
                        {row.patientsCount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-slate-700">
                        {row.tripsCount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sky-700">
                        {row.distanceKm.toLocaleString()} km
                      </TableCell>
                      <TableCell className="text-right font-mono text-emerald-700">
                        PKR {row.fundingPKR.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-mono text-slate-800">
                        PKR {row.expensesPKR.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-amber-800">
                        PKR {row.fuelCostPerKm}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: OPERATIONAL YEAR PERIODS & ARCHIVAL LOCKS                       */}
      {/* ===================================================================== */}
      {activeTab === "YEAR_PERIODS" && (
        <div className="space-y-6">
          {/* Safeguard Informational Banner */}
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200/80 text-sky-900 text-xs flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm mb-1">
                Single Active Year Policy & Immutable Historical Archives (Section 14 & 48)
              </div>
              <p className="text-sky-800/90 leading-relaxed">
                At any point in time, exactly <strong>one</strong> operational period is marked as <code>ACTIVE</code>. When an operational year is closed, its historical ledger is permanently locked against modifications or backdating. Any attempt by users to create or edit records in closed periods will be automatically rejected.
              </p>
            </div>
          </div>

          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Period Label</TableHead>
                  <TableHead>Date Interval</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Audit Records Logged</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      Loading year periods...
                    </TableCell>
                  </TableRow>
                ) : yearPeriods.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      No operational year periods registered.
                    </TableCell>
                  </TableRow>
                ) : (
                  yearPeriods.map((yp) => (
                    <TableRow key={yp.id}>
                      <TableCell className="font-mono font-bold text-slate-900 text-sm">
                        {yp.year}
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-slate-900">{yp.label}</div>
                        <div className="text-[11px] text-slate-500 font-mono">ID: {yp.id}</div>
                      </TableCell>
                      <TableCell className="text-xs text-slate-600">
                        {new Date(yp.startDate).toLocaleDateString("en-GB")} &rarr;{" "}
                        {new Date(yp.endDate).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            yp.isCurrentActive
                              ? "success"
                              : yp.status === "CLOSED"
                              ? "neutral"
                              : "warning"
                          }
                        >
                          {yp.isCurrentActive ? "Active Working Period" : yp.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
                          <span>{yp._count?.patients ?? 0} patients</span>
                          <span>&bull;</span>
                          <span>{yp._count?.trips ?? 0} trips</span>
                          <span>&bull;</span>
                          <span>{yp._count?.expenses ?? 0} vouchers</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!yp.isCurrentActive && yp.status !== "CLOSED" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedPeriod(yp);
                                setActivateModalOpen(true);
                              }}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                              Set Active
                            </Button>
                          )}

                          {yp.status !== "CLOSED" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedPeriod(yp);
                                setCloseModalOpen(true);
                              }}
                              className="text-amber-700 hover:text-amber-800"
                            >
                              <Lock className="w-3.5 h-3.5 mr-1" />
                              Lock & Close
                            </Button>
                          ) : (
                            <span className="text-xs text-slate-400 font-medium inline-flex items-center gap-1">
                              <Lock className="w-3.5 h-3.5" />
                              Immutable
                            </span>
                          )}
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

      {/* ===================================================================== */}
      {/* TAB 3: PUBLISHED TRANSPARENCY REPORTS                                 */}
      {/* ===================================================================== */}
      {activeTab === "REPORTS" && (
        <div className="space-y-4">
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Publication Title</TableHead>
                  <TableHead>Year / Period</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>File Size</TableHead>
                  <TableHead>Published Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      Loading transparency publications...
                    </TableCell>
                  </TableRow>
                ) : reports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      No reports published yet. Click &quot;Publish New Report&quot; to upload one.
                    </TableCell>
                  </TableRow>
                ) : (
                  reports.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        <div className="font-bold text-slate-900 text-sm">{r.title}</div>
                        <div className="text-xs text-slate-500 truncate max-w-sm">{r.summary}</div>
                      </TableCell>
                      <TableCell className="text-xs text-slate-600 font-mono">
                        {r.period} ({r.year})
                      </TableCell>
                      <TableCell>
                        <Badge variant="sky">{r.category}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500 font-mono">{r.fileSize}</TableCell>
                      <TableCell className="text-xs text-slate-600">
                        {new Date(r.publishedDate).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={r.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Download Report"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleOpenEditReport(r)}
                            className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Report"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteReport(r.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Report"
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

      {/* ===================================================================== */}
      {/* MODALS                                                                */}
      {/* ===================================================================== */}

      {/* Modal 1: Register New Operational Year */}
      <Modal
        isOpen={createYearModalOpen}
        onClose={() => setCreateYearModalOpen(false)}
        title="Register New Operational Year Period"
        description="Establish an operational interval for patient intake, ambulance dispatch, and financial budgeting."
      >
        <form onSubmit={handleCreateYear} className="space-y-4">
          <FormField label="Operational Year (4-digit)" required>
            <input
              type="text"
              required
              pattern="^\d{4}$"
              placeholder="e.g. 2027"
              value={yearForm.year}
              onChange={(e) => setYearForm({ ...yearForm, year: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </FormField>

          <FormField label="Period Display Label" required>
            <input
              type="text"
              required
              placeholder="e.g. Operational Year 2027"
              value={yearForm.label}
              onChange={(e) => setYearForm({ ...yearForm, label: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Start Date" required>
              <input
                type="date"
                required
                value={yearForm.startDate}
                onChange={(e) => setYearForm({ ...yearForm, startDate: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </FormField>
            <FormField label="End Date" required>
              <input
                type="date"
                required
                value={yearForm.endDate}
                onChange={(e) => setYearForm({ ...yearForm, endDate: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </FormField>
          </div>

          <FormField label="Operational Notes">
            <textarea
              rows={2}
              placeholder="Operational goals, grant allocations, or expansion plans for this period..."
              value={yearForm.notes}
              onChange={(e) => setYearForm({ ...yearForm, notes: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </FormField>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isYearActiveNow"
              checked={yearForm.isActive}
              onChange={(e) => setYearForm({ ...yearForm, isActive: e.target.checked })}
              className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
            />
            <label htmlFor="isYearActiveNow" className="text-xs font-semibold text-slate-800">
              Set as current active period immediately (will deactivate previous year)
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCreateYearModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={savingYear}>
              Register Year Period
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: Set Active Period Confirmation */}
      <Modal
        isOpen={activateModalOpen}
        onClose={() => setActivateModalOpen(false)}
        title={`Activate '${selectedPeriod?.label}'?`}
        description="Switching active working period context for the entire foundation."
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            By activating <strong>{selectedPeriod?.label}</strong>, all new patients, trips, and expense vouchers will automatically default to this operational year. The previous active period will be un-flagged but remain accessible.
          </p>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setActivateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              isLoading={actionProcessing}
              onClick={handleActivatePeriod}
            >
              Confirm Activation
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal 3: Lock & Close Period Confirmation */}
      <Modal
        isOpen={closeModalOpen}
        onClose={() => setCloseModalOpen(false)}
        title={`Lock and Close '${selectedPeriod?.label}'?`}
        description="Permanently lock historical records against backdating or unauthorized edits."
      >
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
            <p>
              <strong>Caution:</strong> Once locked and marked <code>CLOSED</code>, no user will be able to register new patients, trips, or expense vouchers for this year. Existing records will remain visible as read-only historical archives.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCloseModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="emergency"
              size="sm"
              isLoading={actionProcessing}
              onClick={handleClosePeriod}
            >
              Lock & Close Period
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal 4: Publish/Edit Report */}
      <Modal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        title={editingReport ? "Edit Transparency Report" : "Publish Official Foundation Report"}
        description="Upload verified PDF documentation for public download and donor scrutiny."
      >
        <form onSubmit={handleSaveReport} className="space-y-4">
          <FormField label="Report Title" required>
            <input
              type="text"
              required
              placeholder="e.g. Annual Transparency & Operations Audit Report 2025"
              value={reportForm.title}
              onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Year" required>
              <input
                type="number"
                required
                value={reportForm.year}
                onChange={(e) => setReportForm({ ...reportForm, year: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </FormField>

            <FormField label="Period / Cycle" required>
              <input
                type="text"
                required
                placeholder="e.g. Annual 2025 or Q3 2025"
                value={reportForm.period}
                onChange={(e) => setReportForm({ ...reportForm, period: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Category" required>
              <select
                value={reportForm.category}
                onChange={(e) =>
                  setReportForm({
                    ...reportForm,
                    category: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              >
                <option value="OPERATIONAL">OPERATIONAL</option>
                <option value="FINANCIAL">FINANCIAL</option>
                <option value="ANNUAL">ANNUAL</option>
                <option value="IMPACT">IMPACT</option>
              </select>
            </FormField>

            <FormField label="File Size" required>
              <input
                type="text"
                required
                placeholder="e.g. 2.4 MB"
                value={reportForm.fileSize}
                onChange={(e) => setReportForm({ ...reportForm, fileSize: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </FormField>
          </div>

          <FormField label="Download URL / Document Path" required>
            <input
              type="text"
              required
              placeholder="e.g. /documents/annual-report-2025.pdf"
              value={reportForm.downloadUrl}
              onChange={(e) => setReportForm({ ...reportForm, downloadUrl: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </FormField>

          <FormField label="Executive Summary">
            <textarea
              rows={3}
              placeholder="Brief summary of achievements, patients assisted, and audit signoffs..."
              value={reportForm.summary}
              onChange={(e) => setReportForm({ ...reportForm, summary: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </FormField>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setReportModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={savingReport}>
              {editingReport ? "Update Publication" : "Publish Report"}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
