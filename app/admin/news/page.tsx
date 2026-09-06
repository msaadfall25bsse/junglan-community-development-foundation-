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

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  category: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt: string;
}

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "COMMUNITY_STORY",
    authorName: "JCDF Media Team",
    excerpt: "",
    content: "",
    status: "PUBLISHED",
  });

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news");
      const json = await res.json();
      if (json.success && json.data) {
        setArticles(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      slug: "",
      category: "COMMUNITY_STORY",
      authorName: "JCDF Media Team",
      excerpt: "",
      content: "",
      status: "PUBLISHED",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (article: NewsItem) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      category: article.category,
      authorName: article.authorName,
      excerpt: article.excerpt,
      content: article.content,
      status: article.status,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingArticle) {
        const res = await fetch(`/api/news/${editingArticle.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setFeedback("Article updated successfully!");
          fetchNews();
          setModalOpen(false);
        }
      } else {
        const res = await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setFeedback("News dispatch published successfully!");
          fetchNews();
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
    if (!confirm("Are you sure you want to remove this article?")) return;
    try {
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setFeedback("Article deleted.");
        fetchNews();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="News & Field Dispatches CMS"
      pageSubtitle="Publish community stories, operational milestones, press releases, and announcements directly to the public website."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "News" }]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchNews}>
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Refresh
          </Button>
          <Button variant="primary" size="sm" onClick={handleOpenCreate}>
            <Plus className="w-4 h-4 mr-1.5" />
            Publish Article
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
              <TableHead>Article Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  Loading articles...
                </TableCell>
              </TableRow>
            ) : articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  No articles found. Click &quot;Publish Article&quot; to add one.
                </TableCell>
              </TableRow>
            ) : (
              articles.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <div className="font-semibold text-slate-900 line-clamp-1">{a.title}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <code>/{a.slug}</code>
                      <a
                        href={`/news/${a.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-600 hover:text-sky-700 inline-flex items-center"
                      >
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="neutral">{a.category.replace("_", " ")}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{a.authorName}</TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(a.publishedAt))}
                  </TableCell>
                  <TableCell>
                    <Badge variant={a.status === "PUBLISHED" ? "success" : "warning"}>
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenEdit(a)}
                        title="Edit Article"
                      >
                        <Edit2 className="w-4 h-4 text-slate-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(a.id)}
                        title="Delete Article"
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

      {/* News Article Editor Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingArticle ? `Edit Article: ${editingArticle.title}` : "Write & Publish News Article"}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField label="Article Headline" required>
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
                  slug: editingArticle
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

            <FormField label="Category" required>
              <select
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="COMMUNITY_STORY">Community Story</option>
                <option value="FIELD_REPORT">Field Report</option>
                <option value="PRESS_RELEASE">Press Release</option>
                <option value="ANNOUNCEMENT">Official Announcement</option>
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Author / Department" required>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
              />
            </FormField>

            <FormField label="Publication Status">
              <select
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="PUBLISHED">Published (Live on Website)</option>
                <option value="DRAFT">Draft (Admin Only)</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </FormField>
          </div>

          <FormField label="Excerpt / Summary" required>
            <textarea
              required
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
              placeholder="Short 2-sentence summary visible in news cards..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            />
          </FormField>

          <FormField label="Full Article Content" required>
            <textarea
              required
              rows={6}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
              placeholder="Detailed article text..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </FormField>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? "Publishing..." : editingArticle ? "Update Article" : "Publish Article"}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
