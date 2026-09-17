"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SyncLogStatus, SyncRecordType, SyncDirection } from "@/types/sync";

interface SyncLogItem {
  id: string;
  syncJobId: string | null;
  recordType: SyncRecordType;
  recordId: string;
  stableIdentifier: string | null;
  externalReference: string | null;
  direction: SyncDirection;
  status: SyncLogStatus;
  errorCode: string | null;
  errorMessage: string | null;
  retryCount: number;
  payloadSnapshot: string | null;
  createdAt: string;
}

export default function SyncLogsPage() {
  const [logs, setLogs] = useState<SyncLogItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [directionFilter, setDirectionFilter] = useState<string>("ALL");
  const [recordTypeFilter, setRecordTypeFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 25;

  // Payload Detail Modal
  const [selectedLog, setSelectedLog] = useState<SyncLogItem | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set("searchQuery", searchQuery.trim());
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (directionFilter !== "ALL") params.set("direction", directionFilter);
      if (recordTypeFilter !== "ALL") params.set("recordType", recordTypeFilter);
      params.set("limit", String(pageSize));
      params.set("offset", String((page - 1) * pageSize));

      const res = await fetch(`/api/sync/logs?${params.toString()}`);
      const json = await res.json();
      if (json.success && json.data) {
        setLogs(json.data.logs || []);
        setTotalCount(json.data.totalCount || 0);
      }
    } catch (err) {
      console.error("Failed to fetch sync logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, statusFilter, directionFilter, recordTypeFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLogs();
  };

  const formatDateTime = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString("en-PK", {
        timeZone: "Asia/Karachi",
        dateStyle: "medium",
        timeStyle: "medium",
      });
    } catch {
      return iso;
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Synchronization Audit Trail & Telemetry"
      pageSubtitle="Immutable event log tracking every projection, import, conflict, and retry between PostgreSQL and Google Cloud."
      breadcrumbs={[
        { label: "Overview", href: "/admin" },
        { label: "Integrations", href: "/admin/integrations/google" },
        { label: "Sync Audit Logs" },
      ]}
      actions={
        <Button
          variant="outline"
          size="sm"
          onClick={fetchLogs}
          disabled={loading}
          className="flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Logs
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Filters and Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Stable ID, Reference, or Record ID..."
                className="w-full pl-9 pr-3 py-2 text-xs border rounded-lg border-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500 bg-slate-50/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="text-xs border rounded-lg border-slate-200 px-3 py-2 bg-white text-slate-700"
              >
                <option value="ALL">All Statuses</option>
                <option value="SYNCED">SYNCED</option>
                <option value="PENDING">PENDING</option>
                <option value="CONFLICT">CONFLICT</option>
                <option value="FAILED">FAILED</option>
                <option value="SKIPPED">SKIPPED</option>
              </select>

              <select
                value={directionFilter}
                onChange={(e) => {
                  setDirectionFilter(e.target.value);
                  setPage(1);
                }}
                className="text-xs border rounded-lg border-slate-200 px-3 py-2 bg-white text-slate-700"
              >
                <option value="ALL">All Directions</option>
                <option value="OUTBOUND">Outbound (DB → Sheets)</option>
                <option value="INBOUND">Inbound (Sheets → DB)</option>
                <option value="BIDIRECTIONAL">Bidirectional</option>
              </select>

              <select
                value={recordTypeFilter}
                onChange={(e) => {
                  setRecordTypeFilter(e.target.value);
                  setPage(1);
                }}
                className="text-xs border rounded-lg border-slate-200 px-3 py-2 bg-white text-slate-700"
              >
                <option value="ALL">All Modules</option>
                <option value="TRIP">Trips</option>
                <option value="EXPENSE">Expenses</option>
                <option value="PATIENT">Patients</option>
              </select>

              <Button variant="primary" size="sm" type="submit">
                Search
              </Button>
            </div>
          </form>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              Showing <span className="font-medium text-slate-800">{logs.length}</span> of{" "}
              <span className="font-medium text-slate-800">{totalCount}</span> total synchronization entries
            </span>
            <span className="text-[11px] text-slate-400">Timezone: Asia/Karachi (PKT)</span>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Timestamp (PKT)</th>
                  <th className="py-3 px-4">Direction</th>
                  <th className="py-3 px-4">Module</th>
                  <th className="py-3 px-4">Identifier / Reference</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Details / Message</th>
                  <th className="py-3 px-4 text-right">Payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-sky-600" />
                      Loading audit records...
                    </td>
                  </tr>
                )}

                {!loading && logs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      No synchronization events match the selected filters.
                    </td>
                  </tr>
                )}

                {!loading &&
                  logs.map((log) => {
                    const isOutbound = log.direction === "OUTBOUND";
                    const isInbound = log.direction === "INBOUND";

                    return (
                      <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4 font-mono text-slate-600 whitespace-nowrap">
                          {formatDateTime(log.createdAt)}
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 font-medium text-[11px] px-2 py-0.5 rounded ${
                              isOutbound
                                ? "bg-emerald-50 text-emerald-700"
                                : isInbound
                                ? "bg-indigo-50 text-indigo-700"
                                : "bg-sky-50 text-sky-700"
                            }`}
                          >
                            {isOutbound ? (
                              <ArrowUpRight className="w-3 h-3" />
                            ) : isInbound ? (
                              <ArrowDownLeft className="w-3 h-3" />
                            ) : (
                              <ArrowRightLeft className="w-3 h-3" />
                            )}
                            {log.direction}
                          </span>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <Badge variant="neutral" size="sm">
                            {log.recordType}
                          </Badge>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-mono font-medium text-slate-900">
                            {log.stableIdentifier || log.recordId}
                          </div>
                          {log.externalReference && (
                            <div className="text-[11px] font-mono text-slate-500 truncate max-w-xs">
                              {log.externalReference}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <Badge
                            variant={
                              log.status === "SYNCED"
                                ? "success"
                                : log.status === "CONFLICT"
                                ? "danger"
                                : log.status === "FAILED"
                                ? "danger"
                                : log.status === "SKIPPED"
                                ? "neutral"
                                : "warning"
                            }
                            size="sm"
                            dot
                          >
                            {log.status}
                          </Badge>
                        </td>

                        <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                          {log.errorMessage || (log.errorCode ? `Code: ${log.errorCode}` : "—")}
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          {log.payloadSnapshot ? (
                            <button
                              type="button"
                              onClick={() => setSelectedLog(log)}
                              className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-600 hover:text-sky-700 bg-sky-50 px-2 py-1 rounded hover:bg-sky-100"
                            >
                              <Eye className="w-3 h-3" />
                              View
                            </button>
                          ) : (
                            <span className="text-slate-300 text-[11px]">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <div>
              Page <span className="font-semibold text-slate-900">{page}</span> of{" "}
              <span className="font-semibold text-slate-900">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages || loading}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex items-center gap-1"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Sanitized Payload Viewer */}
      <Modal
        isOpen={Boolean(selectedLog)}
        onClose={() => setSelectedLog(null)}
        title={`Audit Payload: ${selectedLog?.stableIdentifier || selectedLog?.recordId}`}
      >
        {selectedLog && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b">
              <span className="text-slate-500">Event Time:</span>
              <span className="font-mono text-slate-800">{formatDateTime(selectedLog.createdAt)}</span>
            </div>

            <div className="text-xs text-slate-600">
              Sanitized data projection payload captured at time of event:
            </div>

            <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto max-h-80 leading-relaxed">
              {(() => {
                try {
                  return JSON.stringify(JSON.parse(selectedLog.payloadSnapshot || "{}"), null, 2);
                } catch {
                  return selectedLog.payloadSnapshot;
                }
              })()}
            </pre>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedLog(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
