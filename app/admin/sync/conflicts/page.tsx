"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Split,
  EyeOff,
  Clock,
  Check,
} from "lucide-react";

interface ConflictItem {
  id: string;
  conflictIdentifier: string;
  recordType: "PATIENT" | "TRIP" | "EXPENSE";
  recordId: string;
  stableIdentifier: string;
  sheetRowReference: string | null;
  databaseValue: Record<string, any>;
  sheetValue: Record<string, any>;
  lastDatabaseUpdate: string;
  lastSheetUpdate: string | null;
  conflictReason: string;
  status: "OPEN" | "RESOLVED_KEEP_DB" | "RESOLVED_KEEP_SHEET" | "RESOLVED_MERGED" | "DISMISSED";
  resolutionNotes: string | null;
  resolvedAt: string | null;
  createdAt: string;
}

export default function ConflictResolutionPage() {
  const [conflicts, setConflicts] = useState<ConflictItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"OPEN" | "ALL">("OPEN");
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ id: string; message: string; success: boolean } | null>(null);

  // Merge Modal State
  const [mergeModalConflict, setMergeModalConflict] = useState<ConflictItem | null>(null);
  const [mergedFields, setMergedFields] = useState<Record<string, any>>({});
  const [mergeNotes, setMergeNotes] = useState("");

  const fetchConflicts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/sync/conflicts?status=${statusFilter}`);
      const json = await res.json();
      if (json.success && json.data) {
        setConflicts(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch conflicts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConflicts();
  }, [statusFilter]);

  const handleResolve = async (
    conflictId: string,
    resolution: "KEEP_DB" | "KEEP_SHEET" | "MERGE" | "DISMISS",
    mergedValues?: Record<string, any>,
    notes?: string
  ) => {
    setResolvingId(conflictId);
    setFeedback(null);
    try {
      const res = await fetch(`/api/sync/conflicts/${conflictId}/resolve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resolution,
          mergedValues,
          resolutionNotes: notes,
        }),
      });
      const json = await res.json();

      if (json.success) {
        setFeedback({
          id: conflictId,
          message: json.message || "Conflict resolved successfully!",
          success: true,
        });
        if (mergeModalConflict?.id === conflictId) {
          setMergeModalConflict(null);
        }
        // Refresh list
        fetchConflicts();
      } else {
        setFeedback({
          id: conflictId,
          message: json.error || "Failed to resolve conflict",
          success: false,
        });
      }
    } catch (err: any) {
      setFeedback({
        id: conflictId,
        message: err.message || "Network error",
        success: false,
      });
    } finally {
      setResolvingId(null);
    }
  };

  const openMergeModal = (conflict: ConflictItem) => {
    setMergeModalConflict(conflict);
    // Initialize merged fields with DB values by default
    setMergedFields({ ...conflict.databaseValue });
    setMergeNotes("");
  };

  const formatDateTime = (iso: string | null) => {
    if (!iso) return "—";
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

  // Extract all unique field keys across db and sheet objects
  const getFieldKeys = (db: Record<string, any>, sheet: Record<string, any>) => {
    const keys = new Set([...Object.keys(db || {}), ...Object.keys(sheet || {})]);
    // Filter out internal metadata keys
    return Array.from(keys).filter(
      (k) => !["id", "createdAt", "updatedAt", "syncStatus", "syncVersion", "lastSyncedAt"].includes(k)
    );
  };

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Synchronization Conflict Resolution Workbench"
      pageSubtitle="Deterministic human-in-the-loop resolution for discrepancies between PostgreSQL and Google Sheets."
      breadcrumbs={[
        { label: "Overview", href: "/admin" },
        { label: "Integrations", href: "/admin/integrations/google" },
        { label: "Conflict Workbench" },
      ]}
      actions={
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setStatusFilter("OPEN")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                statusFilter === "OPEN"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Open ({conflicts.filter((c) => c.status === "OPEN").length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("ALL")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                statusFilter === "ALL"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Records
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchConflicts}
            disabled={loading}
            className="flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Guidance Alert Banner */}
        <div className="bg-sky-50/70 border border-sky-200/80 rounded-xl p-4 flex items-start gap-3 shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
          <div className="text-xs text-sky-900 leading-relaxed space-y-1">
            <span className="font-semibold">Zero-Guess Resolution Policy:</span> The synchronization engine flags
            concurrent changes as conflicts rather than blindly overwriting either side. Choose{" "}
            <span className="font-semibold">Keep Database</span> to push PostgreSQL values to Google Sheets, or{" "}
            <span className="font-semibold">Keep Google Sheet</span> to update the institutional database.
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-sky-600" />
            <span className="text-sm font-medium">Scanning for synchronization conflicts...</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && conflicts.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">
              No Synchronization Conflicts Found
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              All records between PostgreSQL and Google Sheets are completely synchronized and consistent.
            </p>
          </div>
        )}

        {/* Conflicts List */}
        {!loading && conflicts.length > 0 && (
          <div className="space-y-6">
            {conflicts.map((conflict) => {
              const fieldKeys = getFieldKeys(conflict.databaseValue, conflict.sheetValue);
              const isItemResolving = resolvingId === conflict.id;

              return (
                <div
                  key={conflict.id}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden transition-shadow hover:shadow-sm"
                >
                  {/* Conflict Card Header */}
                  <div className="px-6 py-4 bg-slate-50/60 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">
                            {conflict.conflictIdentifier}
                          </span>
                          <Badge variant="warning" size="sm">
                            {conflict.recordType}
                          </Badge>
                          <span className="text-xs font-mono font-medium text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {conflict.stableIdentifier}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Detected: {formatDateTime(conflict.createdAt)} • Row Reference:{" "}
                          {conflict.sheetRowReference || "Dynamic Index"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          conflict.status === "OPEN"
                            ? "danger"
                            : conflict.status === "DISMISSED"
                            ? "neutral"
                            : "success"
                        }
                        size="sm"
                      >
                        {conflict.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Conflict Reason Banner */}
                  <div className="px-6 py-2.5 bg-amber-50/40 border-b border-amber-100/60 text-xs text-amber-900 flex items-center gap-2">
                    <span className="font-semibold">Reason:</span>
                    <span>{conflict.conflictReason}</span>
                  </div>

                  {/* Side-by-Side Diff Table */}
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                            <th className="py-2.5 px-3 w-1/4">Field</th>
                            <th className="py-2.5 px-3 w-3/8 text-slate-900 bg-sky-50/30 rounded-t">
                              <span className="flex items-center gap-1.5 text-sky-800">
                                <Database className="w-3.5 h-3.5" /> PostgreSQL Value
                              </span>
                            </th>
                            <th className="py-2.5 px-3 w-3/8 text-slate-900 bg-emerald-50/30 rounded-t">
                              <span className="flex items-center gap-1.5 text-emerald-800">
                                <FileSpreadsheet className="w-3.5 h-3.5" /> Google Sheet Value
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {fieldKeys.map((key) => {
                            const dbVal = conflict.databaseValue?.[key];
                            const sheetVal = conflict.sheetValue?.[key];
                            const isDifferent =
                              String(dbVal ?? "").trim() !== String(sheetVal ?? "").trim();

                            return (
                              <tr
                                key={key}
                                className={isDifferent ? "bg-amber-50/20" : "hover:bg-slate-50/50"}
                              >
                                <td className="py-2.5 px-3 font-medium text-slate-700">
                                  {key}
                                  {isDifferent && (
                                    <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  )}
                                </td>
                                <td
                                  className={`py-2.5 px-3 font-mono ${
                                    isDifferent
                                      ? "text-sky-900 font-semibold bg-sky-50/40"
                                      : "text-slate-600"
                                  }`}
                                >
                                  {dbVal !== undefined && dbVal !== null ? String(dbVal) : "—"}
                                </td>
                                <td
                                  className={`py-2.5 px-3 font-mono ${
                                    isDifferent
                                      ? "text-emerald-900 font-semibold bg-emerald-50/40"
                                      : "text-slate-600"
                                  }`}
                                >
                                  {sheetVal !== undefined && sheetVal !== null ? String(sheetVal) : "—"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Feedback Message */}
                    {feedback?.id === conflict.id && (
                      <div
                        className={`mt-4 p-3 rounded-lg text-xs flex items-center gap-2 ${
                          feedback.success
                            ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                            : "bg-red-50 text-red-900 border border-red-200"
                        }`}
                      >
                        {feedback.success ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                        )}
                        <span>{feedback.message}</span>
                      </div>
                    )}

                    {/* Action Bar (Only for OPEN conflicts) */}
                    {conflict.status === "OPEN" && (
                      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          DB modified: {formatDateTime(conflict.lastDatabaseUpdate)}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            disabled={isItemResolving}
                            onClick={() =>
                              handleResolve(
                                conflict.id,
                                "KEEP_DB",
                                undefined,
                                "Admin selected PostgreSQL value as authoritative"
                              )
                            }
                            className="flex items-center gap-1.5"
                          >
                            <Database className="w-3.5 h-3.5" />
                            Keep Database Value
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isItemResolving}
                            onClick={() =>
                              handleResolve(
                                conflict.id,
                                "KEEP_SHEET",
                                undefined,
                                "Admin selected Google Sheet value as authoritative"
                              )
                            }
                            className="flex items-center gap-1.5 border-emerald-300 text-emerald-800 hover:bg-emerald-50"
                          >
                            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                            Keep Google Sheet Value
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isItemResolving}
                            onClick={() => openMergeModal(conflict)}
                            className="flex items-center gap-1.5"
                          >
                            <Split className="w-3.5 h-3.5 text-slate-600" />
                            Custom Merge...
                          </Button>

                          <button
                            type="button"
                            disabled={isItemResolving}
                            onClick={() =>
                              handleResolve(
                                conflict.id,
                                "DISMISS",
                                undefined,
                                "Dismissed by admin without changes"
                              )
                            }
                            className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL: Custom Merge Workbench */}
      <Modal
        isOpen={Boolean(mergeModalConflict)}
        onClose={() => setMergeModalConflict(null)}
        title={`Custom Merge: ${mergeModalConflict?.conflictIdentifier}`}
      >
        {mergeModalConflict && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Select or edit the authoritative value for each conflicting field. The resulting record will be
              written to both PostgreSQL and Google Sheets.
            </p>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {getFieldKeys(mergeModalConflict.databaseValue, mergeModalConflict.sheetValue).map((key) => {
                const dbVal = mergeModalConflict.databaseValue?.[key];
                const sheetVal = mergeModalConflict.sheetValue?.[key];

                return (
                  <div key={key} className="p-3 bg-slate-50/70 rounded-lg border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{key}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            setMergedFields((prev) => ({
                              ...prev,
                              [key]: dbVal,
                            }))
                          }
                          className="text-[11px] font-medium text-sky-700 bg-sky-50 px-2 py-0.5 rounded hover:bg-sky-100"
                        >
                          Use DB
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setMergedFields((prev) => ({
                              ...prev,
                              [key]: sheetVal,
                            }))
                          }
                          className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded hover:bg-emerald-100"
                        >
                          Use Sheet
                        </button>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={mergedFields[key] !== undefined ? String(mergedFields[key]) : ""}
                      onChange={(e) =>
                        setMergedFields((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="w-full text-xs font-mono p-2 border rounded-md bg-white border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>DB: {String(dbVal ?? "—")}</span>
                      <span>Sheet: {String(sheetVal ?? "—")}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-xs font-semibold text-slate-700">Resolution Note (Audit Trail):</label>
              <input
                type="text"
                value={mergeNotes}
                onChange={(e) => setMergeNotes(e.target.value)}
                placeholder="Reason for merged selection..."
                className="w-full text-xs p-2 border rounded-md border-slate-300"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMergeModalConflict(null)}
                disabled={Boolean(resolvingId)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={Boolean(resolvingId)}
                onClick={() =>
                  handleResolve(
                    mergeModalConflict.id,
                    "MERGE",
                    mergedFields,
                    mergeNotes || "Admin applied custom merged fields"
                  )
                }
              >
                {resolvingId ? "Applying Merge..." : "Confirm & Apply to Both Sides"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
