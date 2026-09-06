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
import { Plus, Edit2, Trash2, ExternalLink, CheckCircle, RefreshCw } from "lucide-react";

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: "HEALTHCARE" | "AGRICULTURE" | "COMMUNITY_DEVELOPMENT";
  shortDescription: string;
  fullDescription: string;
  targetFundingPKR: number;
  currentFundingPKR: number;
  beneficiariesImpactedCount: number;
  status: "ACTIVE" | "PLANNED" | "COMPLETED" | "ON_HOLD";
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    sector: "HEALTHCARE",
    targetFundingPKR: 5000000,
    currentFundingPKR: 0,
    beneficiariesEstimate: 100,
    description: "",
    status: "ACTIVE",
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const json = await res.json();
      if (json.success && json.data) {
        setProjects(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      sector: "HEALTHCARE",
      targetFundingPKR: 5000000,
      currentFundingPKR: 0,
      beneficiariesEstimate: 100,
      description: "",
      status: "ACTIVE",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (proj: ProjectItem) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      slug: proj.slug,
      sector: proj.category,
      targetFundingPKR: proj.targetFundingPKR,
      currentFundingPKR: proj.currentFundingPKR,
      beneficiariesEstimate: proj.beneficiariesImpactedCount,
      description: proj.fullDescription,
      status: proj.status,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingProject) {
        // PATCH
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setFeedback("Project updated successfully!");
          fetchProjects();
          setModalOpen(false);
        }
      } else {
        // POST
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setFeedback("New project launched successfully!");
          fetchProjects();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setFeedback("Project removed.");
        fetchProjects();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Projects & Initiatives Management"
      pageSubtitle="Full administrative control to create, update funding targets, and modify all community initiatives appearing on the public website."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Projects" }]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchProjects}>
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Refresh
          </Button>
          <Button variant="primary" size="sm" onClick={handleOpenCreate}>
            <Plus className="w-4 h-4 mr-1.5" />
            Launch New Project
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
              <TableHead>Project Title & Slug</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Funding Progress (PKR)</TableHead>
              <TableHead>Beneficiaries</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  Loading projects...
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  No projects found. Click &quot;Launch New Project&quot; to add one.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((p) => {
                const percent = Math.min(
                  100,
                  Math.round((p.currentFundingPKR / (p.targetFundingPKR || 1)) * 100)
                );
                return (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="font-semibold text-slate-900">{p.title}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <code>/{p.slug}</code>
                        <a
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sky-600 hover:text-sky-700 inline-flex items-center"
                        >
                          <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          p.category === "HEALTHCARE"
                            ? "danger"
                            : p.category === "AGRICULTURE"
                            ? "success"
                            : "sky"
                        }
                      >
                        {p.category.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-48">
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span>PKR {p.currentFundingPKR.toLocaleString()}</span>
                          <span className="text-slate-500">{percent}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full transition-all"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Goal: PKR {p.targetFundingPKR.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-700">
                      {p.beneficiariesImpactedCount.toLocaleString()} individuals
                    </TableCell>
                    <TableCell>
                      <Badge variant={p.status === "ACTIVE" ? "success" : "neutral"}>
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEdit(p)}
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4 text-slate-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(p.id)}
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4 text-rose-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Project Editor Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject ? `Edit Project: ${editingProject.title}` : "Launch New Project"}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField label="Project Title" required>
            <input
              type="text"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  title,
                  slug: editingProject
                    ? prev.slug
                    : title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, ""),
                }));
              }}
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="URL Slug" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </FormField>

            <FormField label="Sector / Category" required>
              <select
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              >
                <option value="HEALTHCARE">Healthcare & Ambulance</option>
                <option value="AGRICULTURE">Olive / Agriculture</option>
                <option value="COMMUNITY_DEVELOPMENT">Community Development / Water</option>
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Target Goal (PKR)" required>
              <input
                type="number"
                required
                min={1}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.targetFundingPKR}
                onChange={(e) =>
                  setFormData({ ...formData, targetFundingPKR: Number(e.target.value) })
                }
              />
            </FormField>

            <FormField label="Current Raised (PKR)">
              <input
                type="number"
                min={0}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.currentFundingPKR}
                onChange={(e) =>
                  setFormData({ ...formData, currentFundingPKR: Number(e.target.value) })
                }
              />
            </FormField>

            <FormField label="Estimated Beneficiaries">
              <input
                type="number"
                min={0}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.beneficiariesEstimate}
                onChange={(e) =>
                  setFormData({ ...formData, beneficiariesEstimate: Number(e.target.value) })
                }
              />
            </FormField>
          </div>

          <FormField label="Full Description" required>
            <textarea
              required
              rows={4}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </FormField>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : editingProject ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
