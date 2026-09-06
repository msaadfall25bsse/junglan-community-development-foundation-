"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Phone, Building2, TrendingUp, Save, CheckCircle, RefreshCw } from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    appName: "Junglan Community Development Foundation",
    ambulanceHotline: "+92 300 0000000",
    supportEmail: "info@junglanfoundation.org",
    officeAddress: "Main Bazaar, Junglan Valley, Tehsil Oghi, District Mansehra, KP, Pakistan",
    bankName: "Meezan Bank Limited",
    accountTitle: "Junglan Community Development Foundation",
    accountNumber: "0102-0109283746",
    iban: "PK36MEZN0001020109283746",
    branchCode: "0102 (Oghi Branch)",
    patientsServed: 420,
    familiesAssisted: 780,
    treesPlanted: 5000,
    activeAmbulancesCount: 2,
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings");
      const json = await res.json();
      if (json.success && json.data) {
        setSettings(json.data);
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const json = await res.json();
      if (json.success) {
        setFeedback("Foundation settings and public hotlines saved successfully!");
      }
    } catch (err) {
      console.error("Save settings error:", err);
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  return (
    <DashboardLayout
      role="ADMIN"
      pageTitle="Foundation Settings & Public Controls"
      pageSubtitle="Configure 24/7 ambulance emergency hotline, official donation bank accounts, and verified impact metrics appearing across the entire website."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings" }]}
      actions={
        <Button variant="outline" size="sm" onClick={fetchSettings}>
          <RefreshCw className="w-4 h-4 mr-1.5" />
          Reload
        </Button>
      }
    >
      {feedback && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium">{feedback}</span>
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-slate-500">Loading settings...</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
          {/* Section 1: Emergency & Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Hotlines & Contact Desks</CardTitle>
              <CardDescription>
                These contact details are shown on the website header, emergency call buttons, and contact page.
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

          {/* Section 2: Donation Bank Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>Donation Bank Account Details</CardTitle>
              <CardDescription>
                Official bank transfer details displayed on the /donate portal for donors.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Bank Name" required>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                      value={settings.bankName}
                      onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                    />
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </FormField>

                <FormField label="Account Title" required>
                  <input
                    type="text"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-emerald-500"
                    value={settings.accountNumber}
                    onChange={(e) =>
                      setSettings({ ...settings, accountNumber: e.target.value })
                    }
                  />
                </FormField>

                <FormField label="IBAN" required>
                  <input
                    type="text"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-emerald-500 uppercase"
                    value={settings.iban}
                    onChange={(e) => setSettings({ ...settings, iban: e.target.value })}
                  />
                </FormField>

                <FormField label="Branch Code">
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
                    value={settings.branchCode}
                    onChange={(e) =>
                      setSettings({ ...settings, branchCode: e.target.value })
                    }
                  />
                </FormField>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Verified Impact Counters */}
          <Card>
            <CardHeader>
              <CardTitle>Public Impact Metrics & Numbers</CardTitle>
              <CardDescription>
                These metrics are displayed on the homepage, /our-impact, and hero stat counters.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="Emergency Patients Transported">
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                      value={settings.patientsServed}
                      onChange={(e) =>
                        setSettings({ ...settings, patientsServed: Number(e.target.value) })
                      }
                    />
                    <TrendingUp className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                  </div>
                </FormField>

                <FormField label="Families Assisted">
                  <input
                    type="number"
                    min={0}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                    value={settings.familiesAssisted}
                    onChange={(e) =>
                      setSettings({ ...settings, familiesAssisted: Number(e.target.value) })
                    }
                  />
                </FormField>

                <FormField label="Olive Trees & Saplings Planted">
                  <input
                    type="number"
                    min={0}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                    value={settings.treesPlanted}
                    onChange={(e) =>
                      setSettings({ ...settings, treesPlanted: Number(e.target.value) })
                    }
                  />
                </FormField>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button variant="primary" size="lg" type="submit" disabled={saving}>
              <Save className="w-5 h-5 mr-2" />
              {saving ? "Saving Changes..." : "Save Foundation Settings"}
            </Button>
          </div>
        </form>
      )}
    </DashboardLayout>
  );
}
