"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

const AMOUNT_PRESETS = [500, 1000, 2500, 5000, 10000];

export type DonationFrequency = "ONE_TIME" | "MONTHLY";
export type PaymentMethodType = "CARD" | "WALLET" | "BANK" | "RAAST";

export interface DonorInfo {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  message: string;
  organization: string;
  isAnonymous: boolean;
  agreedToPolicy: boolean;
}

interface Props {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categoryTitle: string;
}

export function DonationInteractiveForm({ selectedCategory, onSelectCategory, categoryTitle }: Props) {
  // Amount & Frequency
  const [selectedPreset, setSelectedPreset] = useState<number | null>(2500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<DonationFrequency>("ONE_TIME");

  // Donor Details
  const [donor, setDonor] = useState<DonorInfo>({
    fullName: "",
    email: "",
    phone: "",
    country: "Pakistan",
    city: "",
    message: "",
    organization: "",
    isAnonymous: false,
    agreedToPolicy: false,
  });

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("BANK");
  const [bankRefId, setBankRefId] = useState<string>("");
  const [walletType, setWalletType] = useState<"JAZZCASH" | "EASYPAISA">("JAZZCASH");
  const [walletPhone, setWalletPhone] = useState<string>("");

  // Payment UI State
  const [paymentState, setPaymentState] = useState<"IDLE" | "PROCESSING" | "SUCCESS" | "FAILED" | "PENDING">("IDLE");
  const [confirmedRef, setConfirmedRef] = useState<string>("");
  const [confirmedDate, setConfirmedDate] = useState<string>("");

  // Calculate actual numeric amount
  const numericAmount = selectedPreset !== null ? selectedPreset : parseInt(customAmount, 10) || 0;

  const handlePresetClick = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^[0-9\b]+$/.test(val)) {
      setCustomAmount(val);
      setSelectedPreset(null);
    }
  };

  const handleDonorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setDonor((prev) => ({ ...prev, [name]: checked }));
    } else {
      setDonor((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();

    if (numericAmount <= 0) {
      alert("Please select or enter a valid donation amount in PKR.");
      return;
    }

    if (!donor.agreedToPolicy) {
      alert("Please agree to the Privacy Policy to continue.");
      return;
    }

    setPaymentState("PROCESSING");

    // Realistic secure processing simulator
    setTimeout(() => {
      const generatedRef = `JCDF-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const nowStr = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      setConfirmedRef(generatedRef);
      setConfirmedDate(nowStr);

      if (paymentMethod === "BANK" || paymentMethod === "RAAST") {
        setPaymentState("PENDING");
      } else {
        setPaymentState("SUCCESS");
      }
    }, 1400);
  };

  const resetForm = () => {
    setPaymentState("IDLE");
    setDonor({
      fullName: "",
      email: "",
      phone: "",
      country: "Pakistan",
      city: "",
      message: "",
      organization: "",
      isAnonymous: false,
      agreedToPolicy: false,
    });
    setBankRefId("");
    setWalletPhone("");
  };

  return (
    <section className="py-12 lg:py-16 bg-surface border-b border-stone-border relative overflow-hidden" id="donation-form-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              SECURE DONATION CHECKOUT
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
              Make Your Contribution
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={150}>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Choose an amount that works for you. Every contribution matters.
            </p>
          </ScrollReveal>
        </div>

        {/* --- STATE 1: SUCCESS STATE --- */}
        {paymentState === "SUCCESS" && (
          <div className="max-w-2xl mx-auto">
            <div className="ui-claymorphic bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/30 p-6 sm:p-8 rounded-2xl border border-secondary/40 shadow-md text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-secondary mx-auto flex items-center justify-center border-2 border-emerald-300">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold font-label-uppercase text-secondary uppercase tracking-wider">
                  Payment Verified
                </span>
                <h3 className="text-2xl font-semibold text-primary">
                  Thank You for Your Generosity!
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto pt-1 leading-relaxed">
                  Your contribution has been successfully received. Your support helps strengthen our community initiatives across Junglan Valley.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-4 rounded-xl bg-surface border border-stone-border/80 text-left text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between border-b border-stone-border/60 pb-2">
                  <span className="text-on-surface-variant">Donation Reference</span>
                  <span className="font-mono font-bold text-primary">{confirmedRef}</span>
                </div>
                <div className="flex justify-between border-b border-stone-border/60 pb-2">
                  <span className="text-on-surface-variant">Donation Amount</span>
                  <span className="font-bold text-secondary">PKR {numericAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-stone-border/60 pb-2">
                  <span className="text-on-surface-variant">Designated Focus</span>
                  <span className="font-medium text-primary">{categoryTitle}</span>
                </div>
                <div className="flex justify-between border-b border-stone-border/60 pb-2">
                  <span className="text-on-surface-variant">Payment Method</span>
                  <span className="font-medium text-primary">
                    {paymentMethod === "CARD" ? "Debit / Credit Card" : "Mobile Wallet"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-border/60 pb-2">
                  <span className="text-on-surface-variant">Payment Status</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Confirmed
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Donation Date</span>
                  <span className="font-medium text-primary">{confirmedDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => alert(`Official Receipt for ${confirmedRef} will be emailed to ${donor.email || "your email address"}.`)}
                  className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  <span>Download Receipt</span>
                </button>
                <a
                  href="/"
                  className="px-4 py-2.5 rounded-xl border border-stone-border bg-white hover:bg-slate-50 text-primary text-xs font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">home</span>
                  <span>Return to Homepage</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* --- STATE 2: PENDING PAYMENT STATE (Asynchronous Bank / Raast) --- */}
        {paymentState === "PENDING" && (
          <div className="max-w-2xl mx-auto">
            <div className="ui-claymorphic bg-gradient-to-br from-surface-container-lowest via-white to-amber-50/30 p-6 sm:p-8 rounded-2xl border border-amber-300 shadow-md text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center border-2 border-amber-300">
                <span className="material-symbols-outlined text-3xl">hourglass_top</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold font-label-uppercase text-amber-800 uppercase tracking-wider">
                  Pending Verification
                </span>
                <h3 className="text-2xl font-semibold text-primary">
                  Your Payment is Awaiting Confirmation
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto pt-1 leading-relaxed">
                  Your transfer record has been logged. Our accounts team verifies incoming bank and Raast payments against official bank statements before marking them as completed.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-stone-border/80 text-left text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between border-b border-stone-border/60 pb-2">
                  <span className="text-on-surface-variant">Tracking Reference</span>
                  <span className="font-mono font-bold text-primary">{confirmedRef}</span>
                </div>
                <div className="flex justify-between border-b border-stone-border/60 pb-2">
                  <span className="text-on-surface-variant">Transfer Amount</span>
                  <span className="font-bold text-primary">PKR {numericAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-stone-border/60 pb-2">
                  <span className="text-on-surface-variant">Method</span>
                  <span className="font-medium text-primary">{paymentMethod === "RAAST" ? "Raast Instant" : "Direct Bank Transfer"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Current Status</span>
                  <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Awaiting Bank Statement Clearance
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors cursor-pointer"
                >
                  Make Another Contribution
                </button>
                <a
                  href="/impact"
                  className="px-4 py-2.5 rounded-xl border border-stone-border bg-white hover:bg-slate-50 text-primary text-xs font-semibold transition-colors"
                >
                  View Impact &amp; Audits
                </a>
              </div>
            </div>
          </div>
        )}

        {/* --- STATE 3: FAILED PAYMENT STATE --- */}
        {paymentState === "FAILED" && (
          <div className="max-w-2xl mx-auto">
            <div className="ui-claymorphic bg-gradient-to-br from-surface-container-lowest via-white to-red-50/30 p-6 sm:p-8 rounded-2xl border border-red-300 shadow-md text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-red-100 text-red-700 mx-auto flex items-center justify-center border-2 border-red-300">
                <span className="material-symbols-outlined text-3xl">error</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold font-label-uppercase text-red-800 uppercase tracking-wider">
                  Payment Unsuccessful
                </span>
                <h3 className="text-2xl font-semibold text-primary">
                  Payment Could Not Be Completed
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto pt-1 leading-relaxed">
                  We could not complete your payment. Please review your payment details or try another available payment method.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentState("IDLE")}
                  className="px-4 py-2.5 rounded-xl bg-[#e5252a] hover:bg-[#c0171c] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Try Again
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentState("IDLE");
                    setPaymentMethod("BANK");
                  }}
                  className="px-4 py-2.5 rounded-xl border border-stone-border bg-white text-primary text-xs font-semibold transition-colors cursor-pointer"
                >
                  Choose Another Payment Method
                </button>
                <a
                  href="tel:+923016541825"
                  className="px-4 py-2.5 rounded-xl border border-stone-border bg-white text-primary text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-xs text-secondary">phone</span>
                  <span>Contact Support</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* --- STATE 4: PROCESSING OVERLAY / MESSAGE --- */}
        {paymentState === "PROCESSING" && (
          <div className="max-w-md mx-auto py-16 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="text-lg font-semibold text-primary">
              Processing your donation. Please wait...
            </h3>
            <p className="text-xs text-on-surface-variant">
              Connecting securely to the certified donation verification workflow.
            </p>
          </div>
        )}

        {/* --- STATE 5: MAIN ACTIVE FORM --- */}
        {paymentState === "IDLE" && (
          <form onSubmit={handleProceed}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Input Columns (8 Cols) */}
              <div className="lg:col-span-8 space-y-8">
                {/* 1. Frequency Selection */}
                <div className="ui-claymorphic bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 p-5 sm:p-6 rounded-2xl border border-stone-border shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary uppercase font-label-uppercase tracking-wider">
                      Step 1: Donation Frequency
                    </span>
                    <span className="text-[11px] text-on-surface-variant">Default: One-Time</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setFrequency("ONE_TIME")}
                      className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        frequency === "ONE_TIME"
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-surface text-on-surface-variant border-stone-border hover:border-primary/40"
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">event</span>
                      <span>One-Time Donation</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFrequency("MONTHLY")}
                      className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        frequency === "MONTHLY"
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-surface text-on-surface-variant border-stone-border hover:border-primary/40"
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">autorenew</span>
                      <span>Monthly Recurring</span>
                    </button>
                  </div>
                  {frequency === "MONTHLY" && (
                    <p className="text-[11px] text-on-surface-variant bg-blue-50/80 p-2.5 rounded-lg border border-blue-200">
                      * Monthly donations are activated when the selected payment provider supports recurring billing.
                    </p>
                  )}
                </div>

                {/* 2. Amount Selection */}
                <div className="ui-claymorphic bg-gradient-to-br from-surface-container-lowest via-white to-slate-50/50 p-5 sm:p-6 rounded-2xl border border-stone-border shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary uppercase font-label-uppercase tracking-wider">
                      Step 2: Select Contribution Amount (PKR)
                    </span>
                    <span className="text-xs font-semibold text-secondary">
                      Current: PKR {numericAmount.toLocaleString()}
                    </span>
                  </div>

                  {/* Preset Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                    {AMOUNT_PRESETS.map((amt) => {
                      const isSelected = selectedPreset === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handlePresetClick(amt)}
                          className={`py-3 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                            isSelected
                              ? "bg-secondary text-white border-secondary ring-2 ring-secondary/20 shadow-xs"
                              : "bg-surface text-primary border-stone-border hover:border-secondary/40"
                          }`}
                        >
                          PKR {amt.toLocaleString()}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Field */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-primary mb-1">
                      Or Enter Custom Amount (PKR)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-on-surface-variant">
                        PKR
                      </span>
                      <input
                        type="text"
                        placeholder="e.g. 15000"
                        value={customAmount}
                        onChange={handleCustomChange}
                        className="w-full pl-14 pr-4 py-2.5 rounded-xl border border-stone-border bg-surface text-sm font-semibold text-primary focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Donor Information */}
                <div className="ui-claymorphic bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 p-5 sm:p-6 rounded-2xl border border-stone-border shadow-xs space-y-4">
                  <div className="border-b border-stone-border/70 pb-2">
                    <span className="text-xs font-bold text-primary uppercase font-label-uppercase tracking-wider">
                      Step 3: Donor Information
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-primary mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={donor.fullName}
                        onChange={handleDonorChange}
                        disabled={donor.isAnonymous}
                        placeholder={donor.isAnonymous ? "Anonymous Contributor" : "e.g. Tariq Mehmood"}
                        required={!donor.isAnonymous}
                        className="w-full px-3 py-2 rounded-lg border border-stone-border bg-surface text-xs text-primary focus:outline-none focus:border-secondary transition-colors disabled:bg-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-primary mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={donor.email}
                        onChange={handleDonorChange}
                        placeholder="e.g. tariq@example.com"
                        required
                        className="w-full px-3 py-2 rounded-lg border border-stone-border bg-surface text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-primary mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={donor.phone}
                        onChange={handleDonorChange}
                        placeholder="+92 300 1234567"
                        required
                        className="w-full px-3 py-2 rounded-lg border border-stone-border bg-surface text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-primary mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={donor.country}
                        onChange={handleDonorChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-stone-border bg-surface text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-primary mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={donor.city}
                        onChange={handleDonorChange}
                        placeholder="e.g. Mansehra / Islamabad"
                        required
                        className="w-full px-3 py-2 rounded-lg border border-stone-border bg-surface text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-primary mb-1">
                        Organization Name (Optional)
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={donor.organization}
                        onChange={handleDonorChange}
                        placeholder="Company, Trust, or Family Foundation"
                        className="w-full px-3 py-2 rounded-lg border border-stone-border bg-surface text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-primary mb-1">
                        Additional Message (Optional)
                      </label>
                      <input
                        type="text"
                        name="message"
                        value={donor.message}
                        onChange={handleDonorChange}
                        placeholder="Specific dedication or hamlet request"
                        className="w-full px-3 py-2 rounded-lg border border-stone-border bg-surface text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Privacy Checkboxes */}
                  <div className="pt-2 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-on-surface-variant">
                      <input
                        type="checkbox"
                        name="isAnonymous"
                        checked={donor.isAnonymous}
                        onChange={handleDonorChange}
                        className="w-4 h-4 text-secondary rounded border-stone-border focus:ring-secondary"
                      />
                      <span>Keep my donation anonymous in public donor recognitions.</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-primary font-medium">
                      <input
                        type="checkbox"
                        name="agreedToPolicy"
                        checked={donor.agreedToPolicy}
                        onChange={handleDonorChange}
                        required
                        className="w-4 h-4 text-secondary rounded border-stone-border focus:ring-secondary"
                      />
                      <span>I agree to the Privacy Policy and understand how my information will be used.</span>
                    </label>
                  </div>
                </div>

                {/* 4. Payment Method Selection */}
                <div className="ui-claymorphic bg-gradient-to-br from-surface-container-lowest via-white to-slate-50/50 p-5 sm:p-6 rounded-2xl border border-stone-border shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-border/70 pb-2">
                    <span className="text-xs font-bold text-primary uppercase font-label-uppercase tracking-wider">
                      Step 4: Choose Payment Method
                    </span>
                    <span className="text-xs text-secondary font-medium">SECP CUIN: 0348227</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "BANK", label: "Direct Bank Transfer", icon: "account_balance" },
                      { id: "WALLET", label: "Mobile Wallet", icon: "phone_android" },
                      { id: "CARD", label: "Debit / Credit Card", icon: "credit_card" },
                      { id: "RAAST", label: "Raast Instant", icon: "qr_code_2" },
                    ].map((m) => {
                      const isSel = paymentMethod === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id as PaymentMethodType)}
                          className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer text-center ${
                            isSel
                              ? "bg-primary text-white border-primary shadow-xs"
                              : "bg-surface text-on-surface-variant border-stone-border hover:border-primary/40"
                          }`}
                        >
                          <span className="material-symbols-outlined text-xl">{m.icon}</span>
                          <span>{m.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Method Instructions Box */}
                  <div className="p-4 rounded-xl bg-surface border border-stone-border/80 text-xs text-on-surface-variant space-y-2">
                    {paymentMethod === "BANK" && (
                      <div>
                        <div className="font-semibold text-primary mb-1">Direct Bank Account Details:</div>
                        <p>Bank: <strong>Meezan Bank / National Bank of Pakistan</strong></p>
                        <p>Account Title: <strong>Junglan Community Development Foundation</strong></p>
                        <p>Account No: <strong className="font-mono text-primary">02010108924822</strong></p>
                        <p>IBAN: <strong className="font-mono text-primary">PK72MEZN0002010108924822</strong></p>
                        <div className="pt-2">
                          <label className="block text-[11px] font-semibold text-primary mb-0.5">
                            Bank Transfer Reference / Deposit Slip No. (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. TR-892104"
                            value={bankRefId}
                            onChange={(e) => setBankRefId(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-border bg-white text-xs"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "WALLET" && (
                      <div className="space-y-2">
                        <div className="font-semibold text-primary">Mobile Wallet Instructions:</div>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name="walletType"
                              checked={walletType === "JAZZCASH"}
                              onChange={() => setWalletType("JAZZCASH")}
                            />
                            <span>JazzCash</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name="walletType"
                              checked={walletType === "EASYPAISA"}
                              onChange={() => setWalletType("EASYPAISA")}
                            />
                            <span>Easypaisa</span>
                          </label>
                        </div>
                        <p>Foundation Registered Desk No: <strong className="font-mono text-primary">0301 6541825</strong></p>
                        <p>Title: <strong>Junglan Community Dev Foundation (JCDF Desk)</strong></p>
                      </div>
                    )}

                    {paymentMethod === "CARD" && (
                      <div className="space-y-1.5">
                        <div className="font-semibold text-primary">Debit / Credit Card (Visa / Mastercard):</div>
                        <p>
                          Payments are processed through a 256-bit SSL encrypted tokenized payment gateway. Raw card numbers are never stored on our website frontend.
                        </p>
                        <div className="flex items-center gap-2 pt-1 text-slate-500">
                          <span className="material-symbols-outlined text-sm">lock</span>
                          <span>PCI-DSS Tokenized Checkout Environment</span>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "RAAST" && (
                      <div>
                        <div className="font-semibold text-primary mb-1">Raast State Bank of Pakistan Instant Pay:</div>
                        <p>Raast ID / Registered Phone: <strong className="font-mono text-primary">0301 6541825</strong></p>
                        <p>Raast Title: <strong>Junglan Community Development Foundation</strong></p>
                        <p className="text-[11px] text-slate-500 pt-1">
                          You can send money with zero inter-bank transaction fees directly from any Pakistani banking mobile application via Raast.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sticky Donation Summary Panel (4 Cols) */}
              <div className="lg:col-span-4 sticky top-24">
                <div className="ui-claymorphic bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/30 p-5 sm:p-6 rounded-2xl border border-stone-border shadow-md space-y-4">
                  <div className="border-b border-stone-border/70 pb-3">
                    <span className="text-xs font-bold text-secondary uppercase font-label-uppercase tracking-wider">
                      Checkout Overview
                    </span>
                    <h3 className="text-lg font-semibold text-primary mt-0.5">
                      Donation Summary
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-on-surface-variant">Donation Category</span>
                      <span className="font-semibold text-primary text-right max-w-[170px] truncate">
                        {categoryTitle}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-on-surface-variant">Frequency</span>
                      <span className="font-semibold text-primary">
                        {frequency === "ONE_TIME" ? "One-Time" : "Monthly Recurring"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-on-surface-variant">Payment Method</span>
                      <span className="font-semibold text-primary">
                        {paymentMethod === "CARD" && "Credit / Debit Card"}
                        {paymentMethod === "WALLET" && `Mobile Wallet (${walletType})`}
                        {paymentMethod === "BANK" && "Direct Bank Transfer"}
                        {paymentMethod === "RAAST" && "Raast Instant"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-on-surface-variant">Processing Fee</span>
                      <span className="font-semibold text-secondary">PKR 0 (Free)</span>
                    </div>

                    <div className="pt-3 border-t border-stone-border/80 flex justify-between items-baseline">
                      <span className="text-sm font-bold text-primary">Total Amount</span>
                      <span className="text-xl font-bold text-secondary">
                        PKR {numericAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Primary Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl bg-[#e5252a] hover:bg-[#c0171c] text-white font-bold text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                    >
                      <span className="material-symbols-outlined text-base">lock</span>
                      <span>Proceed to Secure Payment</span>
                    </button>
                  </div>

                  {/* Trust Footer inside Panel */}
                  <div className="pt-2 text-[11px] text-on-surface-variant text-center space-y-1">
                    <div className="flex items-center justify-center gap-1.5 text-secondary font-semibold">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      <span>100% Direct Frontline Allocation</span>
                    </div>
                    <p className="text-slate-500">
                      Official SECP CUIN: 0348227. All transactions are verifiable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
export default DonationInteractiveForm;

