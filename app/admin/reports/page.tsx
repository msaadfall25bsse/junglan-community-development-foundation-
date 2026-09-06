"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
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
import { Plus, Trash2, CheckCircle, RefreshCw, FileText } from "lucide-react";

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

export default function AdminReportsPage() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    year: 2026,
    period: "Q1 2026",
    category: "OPERATIONAL",
    fileSize: "1.5 MB",
    downloadUrl: "#",
    summary: "",
  });

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reports");
      const json = await res.json();
      if (json.success && json.data && json.data.reports) {
        setReports(json.data.reports);
      }
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleOpenCreate = () => {
    setFormData({
      title: "",
      year: new Date().getFullYear(),
      period: "Q1 2026",
      category: "OPERATIONAL",
      fileSize: "1.5 MB",
      downloadUrl: "#",
      summary: "",
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback("Transparency report uploaded successfully!");
        fetchReports();
        setModalOpen(false);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this report?")) return;
    try {
      const res = await fetch(`/api/reports/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setFeedback("Report deleted.");
        fetchReports();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Transparency & Audit Reports Management"
      pageSubtitle="Manage financial audits, ambulance operational logs, and impact assessments publicly accessible in the transparency section."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports" }]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchReports}>
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Refresh
          </Button>
          <Button variant="primary" size="sm" onClick={handleOpenCreate}>
            <Plus className="w-4 h-4 mr-1.5" />
            Add Report
          </Button>
        </div>
      }
    >
      {feedback && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium">{feedback}</span>
        </div>
      )}

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Title & Period</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>File Size</TableHead>
              <TableHead>Published Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  Loading reports...
                </TableCell>
              </TableRow>
            ) : reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  No reports published yet. Click &quot;Add Report&quot; to publish one.
                </TableCell>
              </TableRow>
            ) : (
              reports.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{r.title}</div>
                        <div className="text-xs text-slate-500">{r.period}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={r.category === "FINANCIAL" ? "sky" : "neutral"}>
                      {r.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-800">{r.year}</TableCell>
                  <TableCell className="text-sm text-slate-600">{r.fileSize}</TableCell>
                  <TableCell className="text-sm text-slate-600">{r.publishedDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(r.id)}
                        title="Delete Report"
                      >
                        <Trash2 className="w-4 h-4 text-rose-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Report Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Transparency or Audit Report"
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField label="Report Title" required>
            <input
              type="text"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. Annual Operational & Financial Audit 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Fiscal Year" required>
              <input
                type="number"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              />
            </FormField>

            <FormField label="Operational Period" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Q1 2026 or Full Year 2025"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              />
            </FormField>

            <FormField label="Category" required>
              <select
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              >
                <option value="FINANCIAL">Financial Audit</option>
                <option value="OPERATIONAL">Ambulance Operational</option>
                <option value="ANNUAL">Annual Report</option>
                <option value="IMPACT">Impact Evaluation</option>
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="File Size (e.g. 2.4 MB)">
              <input
                type="text"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.fileSize}
                onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
              />
            </FormField>

            <FormField label="Download URL / Storage Reference">
              <input
                type="text"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                placeholder="/documents/audit-2026.pdf"
                value={formData.downloadUrl}
                onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
              />
            </FormField>
          </div>

          <FormField label="Executive Summary" required>
            <textarea
              required
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
              placeholder="Short summary describing the scope and findings of this audit..."
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            />
          </FormField>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? "Adding..." : "Add Report"}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
