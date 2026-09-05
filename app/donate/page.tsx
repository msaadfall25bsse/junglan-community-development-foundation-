"use client";

import React, { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { OFFICIAL_BANK_DETAILS, FOUNDATION_INFO } from "@/data/content";
import {
  HeartHandshake,
  ShieldCheck,
  Building2,
  Copy,
  Check,
  CheckCircle2,
  Truck,
  Sprout,
  Users,
} from "lucide-react";

export default function DonatePage() {
  const [category, setCategory] = useState<"HEALTHCARE" | "AGRICULTURE" | "GENERAL">("HEALTHCARE");
  const [selectedAmount, setSelectedAmount] = useState<number | "CUSTOM">(5000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [donorForm, setDonorForm] = useState({
    name: "",
    phone: "",
    email: "",
    referenceNumber: "",
    isAnonymous: false,
    notes: "",
  });

  const [submitStatus, setSubmitStatus] = useState<"IDLE" | "LOADING" | "SUCCESS">("IDLE");

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmitSlip = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("LOADING");
    setTimeout(() => {
      setSubmitStatus("SUCCESS");
    }, 800);
  };

  const finalAmount =
    selectedAmount === "CUSTOM"
      ? Number(customAmount) || 0
      : selectedAmount;

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-gradient-to-b from-sky-50/70 via-white to-white py-16 sm:py-20 border-b border-slate-100">
        <Container>
          <SectionHeader
            badge="Direct Community Giving"
            badgeVariant="sky"
            title="Empower Lives with 100% Transparent Giving"
            subtitle="Your financial contribution directly funds emergency patient ambulance fuel, trauma care supplies, and certified olive saplings. Zero administrative diversion."
          />
        </Container>
      </section>

      {/* Main Donation Portal */}
      <section className="py-16 sm:py-20 bg-slate-50/50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Donation Configuration */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Select Category */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">
                  Step 1: Choose Operational Fund
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Where should your support be allocated?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <button
                    type="button"
                    onClick={() => setCategory("HEALTHCARE")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      category === "HEALTHCARE"
                        ? "border-red-500 bg-red-50/40 ring-2 ring-red-500/20"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-red-100 text-red-600 w-fit mb-2">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-sm text-slate-900">Healthcare</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Ambulance fuel & patient care
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory("AGRICULTURE")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      category === "AGRICULTURE"
                        ? "border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 w-fit mb-2">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-sm text-slate-900">Agriculture</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Olive saplings & farmer tools
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory("GENERAL")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      category === "GENERAL"
                        ? "border-sky-500 bg-sky-50/40 ring-2 ring-sky-500/20"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-sky-100 text-sky-700 w-fit mb-2">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-sm text-slate-900">General Fund</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Highest emergency priority
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Select Amount */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">
                  Step 2: Contribution Tier
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Select Suggested Amount (PKR)
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {[1000, 5000, 10000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSelectedAmount(amt)}
                      className={`py-3 px-4 rounded-xl border font-bold text-sm transition-all ${
                        selectedAmount === amt
                          ? "border-sky-600 bg-sky-600 text-white shadow-sm"
                          : "border-slate-200 hover:border-slate-300 text-slate-800 bg-white"
                      }`}
                    >
                      PKR {amt.toLocaleString()}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSelectedAmount("CUSTOM")}
                    className={`py-3 px-4 rounded-xl border font-bold text-sm transition-all ${
                      selectedAmount === "CUSTOM"
                        ? "border-sky-600 bg-sky-600 text-white shadow-sm"
                        : "border-slate-200 hover:border-slate-300 text-slate-800 bg-white"
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {selectedAmount === "CUSTOM" && (
                  <div className="mt-3">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Enter Custom Amount in PKR:
                    </label>
                    <input
                      type="number"
                      min="100"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="e.g. 25000"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 font-bold"
                    />
                  </div>
                )}
              </div>

              {/* Step 3: Record Bank Transfer Slip Form */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">
                  Step 3: Transfer Confirmation
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Log Transfer Receipt for Formal Audit Record
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  After initiating the transfer with the bank details on the right, notify our finance desk for instant ledger entry.
                </p>

                {submitStatus === "SUCCESS" ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                    <div className="font-bold text-sm mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Transfer Logged Successfully!</span>
                    </div>
                    <div>
                      Thank you for your generous contribution. Our accounts department will verify the transaction against bank statements and issue your formal receipt.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitSlip} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Donor Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={donorForm.name}
                          onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })}
                          placeholder="Your Full Name"
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={donorForm.phone}
                          onChange={(e) => setDonorForm({ ...donorForm, phone: e.target.value })}
                          placeholder="0300 0000000"
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email (For Official PDF Receipt)
                        </label>
                        <input
                          type="email"
                          value={donorForm.email}
                          onChange={(e) => setDonorForm({ ...donorForm, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Bank Transaction / Reference ID
                        </label>
                        <input
                          type="text"
                          value={donorForm.referenceNumber}
                          onChange={(e) => setDonorForm({ ...donorForm, referenceNumber: e.target.value })}
                          placeholder="e.g. TRX-982147"
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="anonymousCheck"
                        checked={donorForm.isAnonymous}
                        onChange={(e) => setDonorForm({ ...donorForm, isAnonymous: e.target.checked })}
                        className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 w-4 h-4"
                      />
                      <label htmlFor="anonymousCheck" className="text-xs text-slate-600">
                        Keep my name anonymous in public audit reports
                      </label>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={submitStatus === "LOADING"}
                      leftIcon={<HeartHandshake className="w-4 h-4" />}
                    >
                      Record Donation (PKR {finalAmount.toLocaleString()})
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Official Bank Account Details */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
                  <div className="flex items-center gap-3 pb-5 border-b border-slate-800 mb-6">
                    <div className="p-3 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        Official Bank Details
                      </h4>
                      <p className="text-xs text-slate-400">
                        Direct Account Transfer in Pakistan
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="text-slate-400 text-[11px] uppercase tracking-wider mb-0.5">
                        Bank Name
                      </div>
                      <div className="font-bold text-white text-sm">
                        {OFFICIAL_BANK_DETAILS.bankName}
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-400 text-[11px] uppercase tracking-wider mb-0.5">
                        Account Title
                      </div>
                      <div className="font-bold text-white text-sm">
                        {OFFICIAL_BANK_DETAILS.accountTitle}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-400 text-[11px] uppercase tracking-wider">
                          Account Number
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(OFFICIAL_BANK_DETAILS.accountNumber, "acc")}
                          className="text-sky-400 hover:text-sky-300 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === "acc" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === "acc" ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                      <div className="font-mono font-bold text-white text-sm tracking-wide">
                        {OFFICIAL_BANK_DETAILS.accountNumber}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-400 text-[11px] uppercase tracking-wider">
                          IBAN Number
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(OFFICIAL_BANK_DETAILS.iban, "iban")}
                          className="text-sky-400 hover:text-sky-300 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === "iban" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === "iban" ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                      <div className="font-mono font-bold text-sky-300 text-xs sm:text-sm tracking-wider break-all">
                        {OFFICIAL_BANK_DETAILS.iban}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-slate-400">
                      <span>SWIFT / BIC Code:</span>
                      <span className="font-mono font-bold text-white">
                        {OFFICIAL_BANK_DETAILS.swiftCode}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
                    {OFFICIAL_BANK_DETAILS.instructions}
                  </div>
                </div>

                {/* Helpline Card */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">Need Immediate Help?</div>
                    <div className="text-slate-500">Contact Finance Desk: {FOUNDATION_INFO.hotline}</div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
