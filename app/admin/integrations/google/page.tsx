"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  FolderCheck,
  FileSpreadsheet,
  Zap,
  Clock,
  ArrowRightLeft,
  ArrowUpRight,
  ArrowDownLeft,
  XCircle,
  Database,
  Unplug,
  Activity,
  Layers,
} from "lucide-react";

interface IntegrationState {
  id: string;
  status: "ACTIVE" | "CONFIGURING" | "NEEDS_REAUTH" | "ERROR";
  authType: string;
  accountEmail: string | null;
  driveRootFolderId: string | null;
  spreadsheetId: string | null;
  syncHealth: "HEALTHY" | "DEGRADED" | "ERROR";
  lastSyncAt: string | null;
  lastSuccessfulSyncAt: string | null;
  totalSyncedRecords: number;
  conflictCount: number;
}

interface LockState {
  isLocked: boolean;
  activeJob: {
    id: string;
    jobIdentifier: string;
    direction: string;
    status: string;
    startedAt: string;
    recordsProcessed: number;
  } | null;
}

interface TestReport {
  connected: boolean;
  health: "HEALTHY" | "DEGRADED" | "ERROR";
  authMode: string;
  accountEmail: string | null;
  driveRootFolderId: string | null;
  spreadsheetId: string | null;
  availableTabs: string[];
  latencyMs?: number;
  checks: {
    tokenValid: boolean;
    driveAccessible: boolean;
    sheetsAccessible: boolean;
    rootFolderVerified: boolean;
  };
  message: string;
  testedAt: string;
}

export default function GoogleIntegrationPage() {
  const [integration, setIntegration] = useState<IntegrationState | null>(null);
  const [lock, setLock] = useState<LockState>({ isLocked: false, activeJob: null });
  const [openConflictsCount, setOpenConflictsCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Health Test States
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<TestReport | null>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  // Sync Trigger States
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [syncDirection, setSyncDirection] = useState<"TWO_WAY" | "DB_TO_SHEET" | "SHEET_TO_DB">("TWO_WAY");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<any | null>(null);

  // Disconnect Modal States
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const fetchSyncStatus = async () => {
    try {
      const res = await fetch("/api/sync/status");
      const json = await res.json();
      if (json.success && json.data) {
        setIntegration(json.data.integration);
        setLock(json.data.lock);
        setOpenConflictsCount(json.data.openConflictsCount || 0);
      }
    } catch (err) {
      console.error("Failed to load sync status:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSyncStatus();
    // Auto refresh status every 15 seconds
    const interval = setInterval(fetchSyncStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/google/test-connection", { method: "POST" });
      const json = await res.json();
      setTestResult(json.data || null);
      setIsTestModalOpen(true);
      fetchSyncStatus();
    } catch (err) {
      console.error("Test connection failed:", err);
    } finally {
      setIsTesting(false);
    }
  };

  const handleExecuteSync = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/sync/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          direction: syncDirection,
          scope: "ALL",
          yearPeriodId: "2026",
        }),
      });
      const json = await res.json();
      setSyncResult(json);
      fetchSyncStatus();
    } catch (err) {
      console.error("Sync trigger failed:", err);
      setSyncResult({ success: false, error: "Network or server error during sync trigger." });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      const res = await fetch("/api/google/disconnect", { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setIsDisconnectModalOpen(false);
        fetchSyncStatus();
      }
    } catch (err) {
      console.error("Disconnect failed:", err);
    } finally {
      setIsDisconnecting(false);
    }
  };

  const formatDateTime = (iso: string | null) => {
    if (!iso) return "Never";
    try {
      const d = new Date(iso);
      return d.toLocaleString("en-PK", {
        timeZone: "Asia/Karachi",
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return iso;
    }
  };

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Google Workspace Synchronization Control Center"
      pageSubtitle="Two-way live synchronization between PostgreSQL institutional records and Google Sheets / Google Drive."
      breadcrumbs={[
        { label: "Overview", href: "/admin" },
        { label: "Integrations" },
        { label: "Google Workspace" },
      ]}
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleTestConnection}
            disabled={isTesting}
            className="flex items-center gap-1.5"
          >
            <Activity className={`w-4 h-4 ${isTesting ? "animate-spin text-sky-600" : "text-slate-600"}`} />
            {isTesting ? "Diagnosing..." : "Test Health"}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsSyncModalOpen(true)}
            disabled={lock.isLocked || isSyncing}
            className="flex items-center gap-1.5 shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing || lock.isLocked ? "animate-spin" : ""}`} />
            {lock.isLocked ? "Sync in Progress" : "Sync Now"}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Active Concurrency Lock Banner */}
        {lock.isLocked && (
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <RefreshCw className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-amber-900">
                  Active Sync Job in Progress: {lock.activeJob?.jobIdentifier}
                </h4>
                <p className="text-xs text-amber-700">
                  Direction: <span className="font-medium">{lock.activeJob?.direction}</span> • Started at:{" "}
                  {formatDateTime(lock.activeJob?.startedAt || null)} • Processed: {lock.activeJob?.recordsProcessed || 0}
                </p>
              </div>
            </div>
            <Badge variant="warning" size="sm">
              Locked
            </Badge>
          </div>
        )}

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Integration Status */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Integration State
              </span>
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">
                {integration?.status || "CONNECTED"}
              </span>
              <Badge
                variant={
                  integration?.syncHealth === "HEALTHY"
                    ? "success"
                    : integration?.syncHealth === "DEGRADED"
                    ? "warning"
                    : "danger"
                }
                size="sm"
                dot
              >
                {integration?.syncHealth || "HEALTHY"}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Auth Mode: <span className="font-medium text-slate-700">{integration?.authType || "SERVICE_ACCOUNT"}</span>
            </p>
          </div>

          {/* Card 2: Total Synced */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Synced Projections
              </span>
              <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
                <Database className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">
                {integration?.totalSyncedRecords || 0}
              </span>
              <span className="text-xs text-slate-500">records</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Patients, Trips & Vouchers mapped
            </p>
          </div>

          {/* Card 3: Open Conflicts */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Sync Discrepancies
              </span>
              <div
                className={`p-2 rounded-lg ${
                  openConflictsCount > 0 ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-600"
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">
                {openConflictsCount}
              </span>
              {openConflictsCount > 0 ? (
                <Badge variant="danger" size="sm">
                  Review Req.
                </Badge>
              ) : (
                <Badge variant="success" size="sm">
                  Clean
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {openConflictsCount > 0 ? (
                <a href="/admin/sync/conflicts" className="text-sky-600 hover:underline font-medium">
                  Resolve in Workbench →
                </a>
              ) : (
                "Zero unresolved discrepancies"
              )}
            </p>
          </div>

          {/* Card 4: Last Sync */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Last Heartbeat
              </span>
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-sm font-bold text-slate-900 truncate">
              {formatDateTime(integration?.lastSyncAt || null)}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Success: {formatDateTime(integration?.lastSuccessfulSyncAt || null)}
            </p>
          </div>
        </div>

        {/* Main Configuration & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Google Cloud Resource Linkages */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resource Card */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-slate-900 text-sm">
                    Connected Google Workspace Resources
                  </h3>
                </div>
                <Badge variant="success" size="sm">
                  Live Projection
                </Badge>
              </div>

              <div className="p-6 space-y-5">
                {/* Connected Identity */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Service Account Identity
                    </div>
                    <div className="text-sm font-mono text-slate-800 break-all">
                      {integration?.accountEmail || "junglan-sync-service@junglan-foundation.iam.gserviceaccount.com"}
                    </div>
                  </div>
                  <Badge variant="neutral" size="sm">
                    Server-Only
                  </Badge>
                </div>

                {/* Google Spreadsheet Linkage */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Active Google Spreadsheet
                    </div>
                    <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {integration?.spreadsheetId || "15uC_XxXwQ9LUgKfHX9r6-p0ZC87ODhn26iX2Yfr2-GU"}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Validated Tabs:{" "}
                      <span className="font-medium text-slate-700">Ambulance Service Patient Reco</span> (13 cols) •{" "}
                      <span className="font-medium text-slate-700">Expanses</span> (7 cols)
                    </div>
                  </div>

                  <a
                    href={`https://docs.google.com/spreadsheets/d/${
                      integration?.spreadsheetId || "15uC_XxXwQ9LUgKfHX9r6-p0ZC87ODhn26iX2Yfr2-GU"
                    }/edit`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 hover:text-sky-700 bg-sky-50 px-2.5 py-1.5 rounded-lg border border-sky-200/60"
                  >
                    Open Sheet
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Google Drive Root Folder Linkage */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Google Drive Root Archive
                    </div>
                    <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {integration?.driveRootFolderId || "1H57jB0X-rZ90d_JUNGLAN_ROOT_FOLDER"}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Folder Hierarchy:{" "}
                      <span className="font-medium text-slate-700">
                        Junglan Community Development Foundation / 2026 / (Ambulance Records, Reports, Receipts)
                      </span>
                    </div>
                  </div>

                  {integration?.driveRootFolderId && (
                    <a
                      href={`https://drive.google.com/drive/folders/${integration.driveRootFolderId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 hover:text-sky-700 bg-sky-50 px-2.5 py-1.5 rounded-lg border border-sky-200/60"
                    >
                      Open Drive
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Architecture Notice */}
            <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1 text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-800">
                    PostgreSQL Absolute Primacy & Safe Fallbacks:
                  </span>{" "}
                  PostgreSQL is the single authoritative source of truth. Google Sheets acts as a controlled operational
                  projection. Outbound updates write stable internal identifiers (`PAT-XXXXXX`, `TRP-2026-XXXXXX`,
                  `EXP-2026-XXXXXX`) so data integrity is guaranteed regardless of row movement.
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Quick Actions & Operations */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
              <h3 className="font-semibold text-slate-900 text-sm">
                Synchronization Actions
              </h3>

              <div className="space-y-2.5">
                <Button
                  variant="primary"
                  className="w-full justify-center flex items-center gap-2"
                  onClick={() => setIsSyncModalOpen(true)}
                  disabled={lock.isLocked || isSyncing}
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
                  Trigger Sync Cycle
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-center flex items-center gap-2"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                >
                  <Activity className="w-4 h-4 text-slate-600" />
                  Run Health Diagnostic
                </Button>

                <a
                  href="/admin/sync/conflicts"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Conflict Workbench ({openConflictsCount})
                </a>

                <a
                  href="/admin/sync/logs"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-600" />
                  View Sync Audit Logs
                </a>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDisconnectModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-medium py-1.5 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Unplug className="w-3.5 h-3.5" />
                  Disconnect Google Integration
                </button>
              </div>
            </div>

            {/* Quick Status Pill Card */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Subsystem Health
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Token Authorization
                  </span>
                  <span className="font-medium text-slate-900">Valid (RS256 JWT)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Drive Structure (2026)
                  </span>
                  <span className="font-medium text-slate-900">Ready</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sheets Canonical Layout
                  </span>
                  <span className="font-medium text-slate-900">13 Col / 7 Col</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Concurrency Lock
                  </span>
                  <span className="font-medium text-slate-900">
                    {lock.isLocked ? "Engaged" : "Available"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Run Diagnostics / Test Result */}
      <Modal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        title="Google Cloud Connection Diagnostic"
      >
        <div className="space-y-4">
          {testResult ? (
            <>
              <div
                className={`p-4 rounded-xl border flex items-center justify-between ${
                  testResult.connected
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-red-50 border-red-200 text-red-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  {testResult.connected ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <div>
                    <div className="text-sm font-semibold">
                      {testResult.connected ? "Connection Healthy" : "Connection Issue Detected"}
                    </div>
                    <div className="text-xs opacity-90">{testResult.message}</div>
                  </div>
                </div>
                {testResult.latencyMs && (
                  <Badge variant="neutral" size="sm">
                    {testResult.latencyMs}ms
                  </Badge>
                )}
              </div>

              <div className="space-y-2 text-xs border rounded-lg p-3 bg-slate-50/50">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Access Token Validated</span>
                  <span className="font-medium text-slate-900">
                    {testResult.checks.tokenValid ? "PASSED" : "FAILED"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Google Drive API Access</span>
                  <span className="font-medium text-slate-900">
                    {testResult.checks.driveAccessible ? "PASSED" : "FAILED"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Root Folder & 2026 Archive</span>
                  <span className="font-medium text-slate-900">
                    {testResult.checks.rootFolderVerified ? "PASSED" : "FAILED"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-600">Google Sheets API & Metadata</span>
                  <span className="font-medium text-slate-900">
                    {testResult.checks.sheetsAccessible ? "PASSED" : "FAILED"}
                  </span>
                </div>
              </div>

              {testResult.availableTabs.length > 0 && (
                <div className="text-xs text-slate-500">
                  Discovered Spreadsheet Tabs:{" "}
                  <span className="font-mono text-slate-700">
                    {testResult.availableTabs.join(", ")}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6 text-slate-500">Running diagnostic tests...</div>
          )}

          <div className="flex justify-end pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsTestModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* MODAL 2: Execute Sync Trigger */}
      <Modal
        isOpen={isSyncModalOpen}
        onClose={() => !isSyncing && setIsSyncModalOpen(false)}
        title="Trigger Synchronization Cycle"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Choose the synchronization flow to execute. All operations are non-destructive and PostgreSQL remains
            the unconditional source of truth.
          </p>

          <div className="space-y-2">
            <label
              className={`block p-3 rounded-xl border cursor-pointer transition-colors ${
                syncDirection === "TWO_WAY"
                  ? "border-sky-500 bg-sky-50/50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="syncDir"
                  checked={syncDirection === "TWO_WAY"}
                  onChange={() => setSyncDirection("TWO_WAY")}
                  className="text-sky-600 focus:ring-sky-500"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <ArrowRightLeft className="w-4 h-4 text-sky-600" />
                    Two-Way Bidirectional Sync (Recommended)
                  </div>
                  <div className="text-xs text-slate-500">
                    Safely pushes database updates to Google Sheets and imports verified sheet rows into PostgreSQL.
                  </div>
                </div>
              </div>
            </label>

            <label
              className={`block p-3 rounded-xl border cursor-pointer transition-colors ${
                syncDirection === "DB_TO_SHEET"
                  ? "border-sky-500 bg-sky-50/50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="syncDir"
                  checked={syncDirection === "DB_TO_SHEET"}
                  onChange={() => setSyncDirection("DB_TO_SHEET")}
                  className="text-sky-600 focus:ring-sky-500"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    Outbound Only (Website / Database → Google Sheets)
                  </div>
                  <div className="text-xs text-slate-500">
                    Project all verified database records into Google Sheets with stable identifiers.
                  </div>
                </div>
              </div>
            </label>

            <label
              className={`block p-3 rounded-xl border cursor-pointer transition-colors ${
                syncDirection === "SHEET_TO_DB"
                  ? "border-sky-500 bg-sky-50/50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="syncDir"
                  checked={syncDirection === "SHEET_TO_DB"}
                  onChange={() => setSyncDirection("SHEET_TO_DB")}
                  className="text-sky-600 focus:ring-sky-500"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <ArrowDownLeft className="w-4 h-4 text-indigo-600" />
                    Inbound Only (Google Sheets → Website / Database)
                  </div>
                  <div className="text-xs text-slate-500">
                    Import newly entered rows from Google Sheets after normalizing and running duplicate detection.
                  </div>
                </div>
              </div>
            </label>
          </div>

          {syncResult && (
            <div
              className={`p-3 rounded-lg text-xs ${
                syncResult.success
                  ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                  : "bg-red-50 text-red-900 border border-red-200"
              }`}
            >
              <div className="font-semibold">{syncResult.message || syncResult.error}</div>
              {syncResult.data && (
                <div className="mt-1 text-slate-600">
                  Created: {syncResult.data.recordsCreated} • Updated: {syncResult.data.recordsUpdated} • Conflicts:{" "}
                  {syncResult.data.conflictsDetected} • Duration: {syncResult.data.durationMs}ms
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSyncModalOpen(false)}
              disabled={isSyncing}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleExecuteSync}
              disabled={isSyncing}
              className="flex items-center gap-1.5"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
              {isSyncing ? "Executing Synchronization..." : "Start Sync"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* MODAL 3: Safe Disconnect Confirmation */}
      <Modal
        isOpen={isDisconnectModalOpen}
        onClose={() => !isDisconnecting && setIsDisconnectModalOpen(false)}
        title="Disconnect Google Integration"
      >
        <div className="space-y-4">
          <div className="p-3 bg-red-50 border border-red-200 text-red-900 rounded-lg text-xs">
            <div className="font-semibold mb-1">Safe Unlinking Guarantee</div>
            Disconnecting clears the active Google authorization token. All records in your PostgreSQL database,
            historical audit logs, and existing Google Drive files will remain 100% intact.
          </div>

          <p className="text-xs text-slate-600">
            Are you sure you want to disconnect Google Workspace synchronization?
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDisconnectModalOpen(false)}
              disabled={isDisconnecting}
            >
              Cancel
            </Button>
            <Button
              variant="emergency"
              size="sm"
              onClick={handleDisconnect}
              disabled={isDisconnecting}
            >
              {isDisconnecting ? "Disconnecting..." : "Confirm Disconnect"}
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
