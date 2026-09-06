"use client";

import React, { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import {
  Phone,
  Building2,
  TrendingUp,
  Save,
  CheckCircle,
  RefreshCw,
  FileText,
  Database,
  Download,
  Upload,
  AlertCircle,
  Server,
  ShieldCheck,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"contact" | "cms" | "bank" | "stats" | "backup">("contact");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dbHealth, setDbHealth] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [settings, setSettings] = useState({
    appName: "Junglan Community Development Foundation",
    ambulanceHotline: "+92 300 0000000",
    whatsappNumber: "+92 300 0000000",
    supportEmail: "info@junglanfoundation.org",
    officeAddress: "Main Bazaar, Junglan Valley, Tehsil Oghi, District Mansehra, KP, Pakistan",
    bankName: "Meezan Bank Limited",
    accountTitle: "Junglan Community Development Foundation",
    accountNumber: "0102-0109283746",
    iban: "PK36MEZN0001020109283746",
    branchCode: "0102 (Oghi Branch)",
    raastId: "03000000000",
    aboutHeading: "Pioneering Rapid Emergency Healthcare & Regenerative Olive Horticulture in Hazara",
    aboutParagraph1: "The Junglan Community Development Foundation was established with a singular humanitarian imperative: to bridge the life-threatening geographical divide that separates remote mountain populations from emergency medical care, while simultaneously cultivating sustainable economic resilience through commercial olive agriculture.",
    aboutParagraph2: "In the rugged terrain of Tehsil Oghi and District Mansehra, access to tertiary medical facilities was historically obstructed by severe road topography and lack of specialized transport. Critical obstetric patients, trauma victims, and cardiac cases faced catastrophic delays.",
    aboutParagraph3: "Founded by local community leaders, doctors, and philanthropists, the Foundation operates a zero-cost 24/7 mountain ambulance service equipped with medical oxygen, trauma stretchers, and trained responders, alongside grassroots agrarian empowerment programs.",
    missionStatement: "To deliver uninterrupted, free emergency medical transit to vulnerable mountain communities and foster generational prosperity through climate-resilient olive cultivation.",
    visionStatement: "A self-sustaining rural society where no life is lost due to transit delays and every smallholder farmer thrives on sustainable mountain agriculture.",
    donationNotes: "100% of all public contributions are audited and directly allocated to fuel, medical oxygen, vehicle maintenance, and subsidized olive saplings.",
    patientsServed: 420,
    familiesAssisted: 780,
    treesPlanted: 5000,
    activeAmbulancesCount: 2,
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const [resSettings, resHealth] = await Promise.all([
        fetch("/api/settings"),
        fetch("/api/health"),
      ]);
      const jsonSettings = await resSettings.json();
      const jsonHealth = await resHealth.json();

      if (jsonSettings.success && jsonSettings.data) {
        const s = jsonSettings.data;
        const paragraphs = Array.isArray(s.aboutOriginStory) ? s.aboutOriginStory : [];
        setSettings({
          ...s,
          whatsappNumber: s.whatsappNumber || "+92 300 0000000",
          raastId: s.raastId || "03000000000",
          aboutHeading: s.aboutHeading || "Pioneering Rapid Emergency Healthcare & Regenerative Olive Horticulture in Hazara",
          aboutParagraph1: paragraphs[0] || settings.aboutParagraph1,
          aboutParagraph2: paragraphs[1] || settings.aboutParagraph2,
          aboutParagraph3: paragraphs[2] || settings.aboutParagraph3,
          missionStatement: s.missionStatement || settings.missionStatement,
          visionStatement: s.visionStatement || settings.visionStatement,
          donationNotes: s.donationNotes || settings.donationNotes,
        });
      }

      if (jsonHealth.success) {
        setDbHealth(jsonHealth.database);
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);
    try {
      const payload = {
        ...settings,
        aboutOriginStory: [
          settings.aboutParagraph1,
          settings.aboutParagraph2,
          settings.aboutParagraph3,
        ].filter(Boolean),
      };

      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback("Website content, hotlines, and settings updated successfully!");
      } else {
        setErrorMessage(json.error?.message || "Failed to update settings.");
      }
    } catch (err) {
      console.error("Save settings error:", err);
      setErrorMessage("Network error while saving settings.");
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleDownloadBackup = async () => {
    try {
      const res = await fetch("/api/settings/backup");
      const json = await res.json();
      if (json.success && json.data) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json.data, null, 2));
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `junglan-foundation-backup-${new Date().toISOString().split("T")[0]}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        setFeedback("Database backup downloaded successfully!");
      }
    } catch (err) {
      console.error("Backup download error:", err);
      alert("Failed to download database backup.");
    }
  };

  const handleRestoreFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm("Are you sure you want to restore the database from this file? This will overwrite existing stored records.")) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      const res = await fetch("/api/settings/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback("Database successfully restored from backup!");
        await fetchSettings();
      } else {
        alert(`Restore failed: ${json.error?.message || "Invalid backup structure"}`);
      }
    } catch (err) {
      console.error("Restore error:", err);
      alert("Failed to parse JSON backup file.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Foundation Settings & Website CMS"
      pageSubtitle="Configure public hotlines, About Us narrative, official donation bank accounts, and verified impact statistics."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings" }]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchSettings}>
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Reload
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-1.5" />
            {saving ? "Saving Changes..." : "Save All Changes"}
          </Button>
        </div>
      }
    >
      {feedback && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-medium">{feedback}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 mb-6">
        {[
          { id: "contact", label: "Emergency & Contact", icon: Phone },
          { id: "cms", label: "About Us & Mission CMS", icon: FileText },
          { id: "bank", label: "Donation Bank Accounts", icon: Building2 },
          { id: "stats", label: "Verified Impact Stats", icon: TrendingUp },
          { id: "backup", label: "Database & Cloud Backup", icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-600 border-t-transparent mb-3" />
          <p className="text-sm font-medium">Loading foundation configuration...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
          {/* TAB 1: Emergency & Contact */}
          {activeTab === "contact" && (
            <Card>
              <CardHeader>
                <CardTitle>Emergency Hotlines & Public Contact Desks</CardTitle>
                <CardDescription>
                  These contact details power the website header, emergency call buttons, and public contact directory.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="24/7 Mountain Ambulance Hotline" required>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-mono font-semibold"
                        value={settings.ambulanceHotline}
                        onChange={(e) =>
                          setSettings({ ...settings, ambulanceHotline: e.target.value })
                        }
                      />
                      <Phone className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                    </div>
                  </FormField>

                  <FormField label="Emergency WhatsApp Desk" required>
                    <input
                      type="text"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-mono font-semibold"
                      value={settings.whatsappNumber}
                      onChange={(e) =>
                        setSettings({ ...settings, whatsappNumber: e.target.value })
                      }
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Official Inquiries Email" required>
                    <input
                      type="email"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                      value={settings.supportEmail}
                      onChange={(e) =>
                        setSettings({ ...settings, supportEmail: e.target.value })
                      }
                    />
                  </FormField>

                  <FormField label="Official Organization Legal Name" required>
                    <input
                      type="text"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-medium"
                      value={settings.appName}
                      onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
                    />
                  </FormField>
                </div>

                <FormField label="Headquarters / Office Physical Address" required>
                  <input
                    type="text"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                    value={settings.officeAddress}
                    onChange={(e) =>
                      setSettings({ ...settings, officeAddress: e.target.value })
                    }
                  />
                </FormField>
              </CardContent>
            </Card>
          )}

          {/* TAB 2: About Us & Mission CMS */}
          {activeTab === "cms" && (
            <Card>
              <CardHeader>
                <CardTitle>About Us Page & Constitutional Narrative CMS</CardTitle>
                <CardDescription>
                  Direct administrative control to customize the foundation origin story, mission statement, and vision on the public /about page.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField label="About Page Headline" required>
                  <input
                    type="text"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-semibold"
                    value={settings.aboutHeading}
                    onChange={(e) => setSettings({ ...settings, aboutHeading: e.target.value })}
                  />
                </FormField>

                <FormField label="Origin Story — Paragraph 1 (Genesis & Purpose)" required>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                    value={settings.aboutParagraph1}
                    onChange={(e) => setSettings({ ...settings, aboutParagraph1: e.target.value })}
                  />
                </FormField>

                <FormField label="Origin Story — Paragraph 2 (Terrain & Community Challenges)" required>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                    value={settings.aboutParagraph2}
                    onChange={(e) => setSettings({ ...settings, aboutParagraph2: e.target.value })}
                  />
                </FormField>

                <FormField label="Origin Story — Paragraph 3 (Current Operations & Vision)" required>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                    value={settings.aboutParagraph3}
                    onChange={(e) => setSettings({ ...settings, aboutParagraph3: e.target.value })}
                  />
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <FormField label="Mission Statement" required>
                    <textarea
                      required
                      rows={3}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                      value={settings.missionStatement}
                      onChange={(e) => setSettings({ ...settings, missionStatement: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Vision Statement" required>
                    <textarea
                      required
                      rows={3}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                      value={settings.visionStatement}
                      onChange={(e) => setSettings({ ...settings, visionStatement: e.target.value })}
                    />
                  </FormField>
                </div>

                <FormField label="Donation Audit Guarantee Note">
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                    value={settings.donationNotes}
                    onChange={(e) => setSettings({ ...settings, donationNotes: e.target.value })}
                  />
                </FormField>
              </CardContent>
            </Card>
          )}

          {/* TAB 3: Donation Bank Accounts */}
          {activeTab === "bank" && (
            <Card>
              <CardHeader>
                <CardTitle>Official Donation Bank Account Details</CardTitle>
                <CardDescription>
                  Shown on the public donation page, bank transfer instructions, and audit receipts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Bank Name" required>
                    <input
                      type="text"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-semibold"
                      value={settings.bankName}
                      onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                    />
                  </FormField>

                  <FormField label="Official Account Title" required>
                    <input
                      type="text"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-semibold"
                      value={settings.accountTitle}
                      onChange={(e) =>
                        setSettings({ ...settings, accountTitle: e.target.value })
                      }
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="Account Number" required>
                    <input
                      type="text"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-mono"
                      value={settings.accountNumber}
                      onChange={(e) =>
                        setSettings({ ...settings, accountNumber: e.target.value })
                      }
                    />
                  </FormField>

                  <FormField label="IBAN (International)" required>
                    <input
                      type="text"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-mono"
                      value={settings.iban}
                      onChange={(e) => setSettings({ ...settings, iban: e.target.value })}
                    />
                  </FormField>

                  <FormField label="RAAST ID / Mobile Alias">
                    <input
                      type="text"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-mono"
                      value={settings.raastId}
                      onChange={(e) => setSettings({ ...settings, raastId: e.target.value })}
                    />
                  </FormField>
                </div>

                <FormField label="Branch Code & Location">
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                    value={settings.branchCode}
                    onChange={(e) => setSettings({ ...settings, branchCode: e.target.value })}
                  />
                </FormField>
              </CardContent>
            </Card>
          )}

          {/* TAB 4: Verified Impact Stats */}
          {activeTab === "stats" && (
            <Card>
              <CardHeader>
                <CardTitle>Verified Public Impact Statistics</CardTitle>
                <CardDescription>
                  Audited figures highlighted on the homepage impact banner and public transparency reports.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <FormField label="Patients Transported" required>
                    <input
                      type="number"
                      required
                      min={0}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                      value={settings.patientsServed}
                      onChange={(e) =>
                        setSettings({ ...settings, patientsServed: Number(e.target.value) })
                      }
                    />
                  </FormField>

                  <FormField label="Families Assisted" required>
                    <input
                      type="number"
                      required
                      min={0}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                      value={settings.familiesAssisted}
                      onChange={(e) =>
                        setSettings({ ...settings, familiesAssisted: Number(e.target.value) })
                      }
                    />
                  </FormField>

                  <FormField label="Olive Trees Planted" required>
                    <input
                      type="number"
                      required
                      min={0}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                      value={settings.treesPlanted}
                      onChange={(e) =>
                        setSettings({ ...settings, treesPlanted: Number(e.target.value) })
                      }
                    />
                  </FormField>

                  <FormField label="Active Ambulances" required>
                    <input
                      type="number"
                      required
                      min={1}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                      value={settings.activeAmbulancesCount}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          activeAmbulancesCount: Number(e.target.value),
                        })
                      }
                    />
                  </FormField>
                </div>
              </CardContent>
            </Card>
          )}

          {/* TAB 5: Database & Cloud Backup */}
          {activeTab === "backup" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-sky-600" />
                    Database Health & Storage Engine
                  </CardTitle>
                  <CardDescription>
                    Real-time diagnostics of the persistence layer supporting the Junglan Foundation platform.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-semibold">Engine Type</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">
                        {dbHealth?.engine || "Atomic Persistent Store"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-semibold">Status</div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{dbHealth?.status || "READY"}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-semibold">Storage Location</div>
                      <div className="text-xs font-mono text-slate-600 mt-0.5 truncate">
                        {dbHealth?.databaseUrlMasked || "Serverless Persistent Engine"}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Database Backup & Restoration Tools
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadBackup}
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4 text-sky-600" />
                        Download Database Backup (JSON)
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4 text-emerald-600" />
                        Restore Database from File
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={handleRestoreFile}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Downloading a backup exports all projects, reports, ambulance fleet logs, trips, and expenses in a standardized portable JSON file.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Cloud PostgreSQL (Neon / Supabase) Setup Guide */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Server className="w-4 h-4 text-indigo-600" />
                    How to Connect Remote Cloud PostgreSQL on Vercel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-slate-600 leading-relaxed">
                  <p>
                    For multi-region zero-latency persistence in high-traffic deployments:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1.5">
                    <li>
                      Create a free serverless PostgreSQL database on <strong>Neon (neon.tech)</strong> or <strong>Supabase (supabase.com)</strong>.
                    </li>
                    <li>
                      Copy the Connection String (starts with <code>postgresql://...</code>).
                    </li>
                    <li>
                      In your <strong>Vercel Dashboard &gt; Project Settings &gt; Environment Variables</strong>, add <code>DATABASE_URL</code> and paste your connection string.
                    </li>
                    <li>
                      Redeploy on Vercel. Prisma automatically detects the live PostgreSQL database and activates authoritative SQL storage with zero code modifications!
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab !== "backup" && (
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button variant="primary" type="submit" disabled={saving}>
                <Save className="w-4 h-4 mr-1.5" />
                {saving ? "Saving Changes..." : "Save Settings"}
              </Button>
            </div>
          )}
        </form>
      )}
    </DashboardLayout>
  );
}
