"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function DonationSubmissionSection() {
  const [formData, setFormData] = useState({
    donorName: "",
    contactNumber: "",
    email: "",
    amount: "15000",
    cause: "GENERAL",
    paymentChannel: "BANK_TRANSFER",
    transactionRef: "",
    isAnonymous: false,
    notes: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [referenceId, setReferenceId] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate immediate acknowledgement and generate standard reference code
    const refCode = `FND-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // In development or production, submit to notification / WhatsApp format
      await new Promise((resolve) => setTimeout(resolve, 800));
      setReferenceId(refCode);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-[48px] lg:py-[64px] bg-surface-container-lowest border-b border-stone-border relative overflow-hidden" id="report-transfer">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Context & Verification Steps (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <ScrollReveal variant="heading" delay={100}>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
                STEP 2: NOTIFY OUR AUDIT DESK
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-primary font-semibold leading-tight">
                Report Your Bank Transfer or Mobile Wallet Gift
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="text" delay={150}>
              <p className="text-xs sm:text-body-md text-on-surface-variant leading-relaxed">
                Once you have transferred funds via IBAN, Easypaisa, or JazzCash, submitting this notification enables our audit team to reconcile your contribution against our bank statements and issue an official SECP-compliant receipt.
              </p>
            </ScrollReveal>

            {/* Fiduciary Transparency Guarantee */}
            <ScrollReveal variant="card" delay={200}>
              <div className="ui-glassmorphic p-4 rounded-xl border border-secondary/20 bg-secondary/5 space-y-3">
                <div className="flex items-center gap-2 text-secondary font-semibold text-xs sm:text-sm">
                  <span className="material-symbols-outlined text-base">verified_user</span>
                  <span>Our 100% Stewardship Protocol</span>
                </div>
                <ul className="text-xs text-on-surface-variant space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-xs text-secondary mt-0.5">check_circle</span>
                    <span>Direct ledger matching with zero administrative deduction.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-xs text-secondary mt-0.5">check_circle</span>
                    <span>Immediate WhatsApp verification available via desk liaison.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-xs text-secondary mt-0.5">check_circle</span>
                    <span>Anonymous contributions are fully supported and honored.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Direct WhatsApp Quick-Share Button */}
            <ScrollReveal variant="text" delay={250}>
              <div className="p-4 rounded-xl bg-surface border border-stone-border space-y-2">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase font-label-uppercase block">
                  Prefer Direct WhatsApp Receipt?
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  You can also screenshot your transfer confirmation slip and send it directly to our desk on WhatsApp:
                </p>
                <a
                  href="https://wa.me/491715114247?text=Assalam-o-Alaikum%20JCDF%2C%20I%20have%20made%20a%20contribution%20to%20the%20community%20fund."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>Send Slip on WhatsApp (+49 171 5114247)</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Submission Form (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="card" delay={150}>
              <div className="ui-claymorphic bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 p-5 sm:p-7 rounded-2xl border border-stone-border shadow-sm">
                {status === "success" ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-secondary mx-auto flex items-center justify-center border-2 border-emerald-300">
                      <span className="material-symbols-outlined text-3xl">task_alt</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold font-label-uppercase text-secondary uppercase tracking-wider">
                        Submission Received
                      </span>
                      <h3 className="text-xl font-semibold text-primary">
                        JazakAllah Khair / Thank You for Your Stewardship
                      </h3>
                      <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto pt-1 leading-relaxed">
                        Your transaction notification has been logged under Tracking Code:
                      </p>
                      <div className="inline-block py-1.5 px-4 rounded-lg bg-surface border border-secondary font-mono text-sm font-bold text-secondary mt-2">
                        {referenceId}
                      </div>
                    </div>
                    <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                      Our valley accounts team will verify the transfer against bank records and send your acknowledgement slip.
                    </p>
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setStatus("idle");
                          setFormData({
                            donorName: "",
                            contactNumber: "",
                            email: "",
                            amount: "15000",
                            cause: "GENERAL",
                            paymentChannel: "BANK_TRANSFER",
                            transactionRef: "",
                            isAnonymous: false,
                            notes: "",
                          });
                        }}
                        className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors cursor-pointer"
                      >
                        Submit Another Contribution
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border-b border-stone-border/70 pb-3">
                      <h3 className="font-headline-sm text-base sm:text-lg text-primary font-semibold">
                        Transfer Notification Form
                      </h3>
                      <p className="text-xs text-on-surface-variant">
                        Fill in your transaction details for instant record-keeping.
                      </p>
                    </div>

                    {/* Donor Name & Anonymous */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-primary mb-1">
                          Donor Name / Contributor
                        </label>
                        <input
                          type="text"
                          name="donorName"
                          disabled={formData.isAnonymous}
                          placeholder={formData.isAnonymous ? "Kept Anonymous" : "e.g. Muhammad Farooq"}
                          value={formData.isAnonymous ? "" : formData.donorName}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg border border-stone-border bg-surface text-xs text-primary focus:outline-none focus:border-secondary transition-colors disabled:bg-slate-100 disabled:text-slate-400"
                          required={!formData.isAnonymous}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary mb-1">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="text"
                          name="contactNumber"
                          placeholder="e.g. +92 300 1234567"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg border border-stone-border bg-surface text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Amount & Cause */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-primary mb-1">
                          Amount Contributed (PKR)
                        </label>
                        <input
                          type="number"
                          name="amount"
                          min="500"
                          step="100"
                          value={formData.amount}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg border border-stone-border bg-surface text-xs font-semibold text-primary focus:outline-none focus:border-secondary transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary mb-1">
                          Designated Cause / Pillar
                        </label>
                        <select
                          name="cause"
                          value={formData.cause}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg border border-stone-border bg-surface text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                        >
                          <option value="GENERAL">General Mountain Community Relief</option>
                          <option value="HEALTHCARE">Emergency Ambulance Fuel & Oxygen</option>
                          <option value="AGRO">Olive Nursery & Agricultural Cultivars</option>
                          <option value="MAINTENANCE">Fleet Overhaul & Mountain Tires</option>
                        </select>
                      </div>
                    </div>

                    {/* Payment Channel & Transaction Reference */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-primary mb-1">
                          Payment Channel Used
                        </label>
                        <select
                          name="paymentChannel"
                          value={formData.paymentChannel}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg border border-stone-border bg-surface text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                        >
                          <option value="BANK_TRANSFER">Bank Transfer (IBAN / RAAST)</option>
                          <option value="EASYPAISA">Easypaisa Mobile Account</option>
                          <option value="JAZZCASH">JazzCash Mobile Account</option>
                          <option value="INTERNATIONAL">Overseas Wire / SWIFT</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary mb-1">
                          Transaction ID / Reference / Slip No.
                        </label>
                        <input
                          type="text"
                          name="transactionRef"
                          placeholder="e.g. TRX-982341 or Bank Ref"
                          value={formData.transactionRef}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg border border-stone-border bg-surface text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Anonymous Checkbox */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="isAnonymous"
                        name="isAnonymous"
                        checked={formData.isAnonymous}
                        onChange={handleChange}
                        className="w-4 h-4 text-secondary rounded border-stone-border focus:ring-secondary cursor-pointer"
                      />
                      <label htmlFor="isAnonymous" className="text-xs text-on-surface-variant cursor-pointer select-none">
                        Keep my donation anonymous in public transparency ledgers
                      </label>
                    </div>

                    {/* Optional Note */}
                    <div>
                      <label className="block text-xs font-semibold text-primary mb-1">
                        Optional Note or Dedication (Optional)
                      </label>
                      <textarea
                        name="notes"
                        rows={2}
                        placeholder="In memory of, or specific valley hamlet preference..."
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-stone-border bg-surface text-xs text-primary focus:outline-none focus:border-secondary transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full py-2.5 sm:py-3 rounded-xl bg-[#e5252a] hover:bg-[#c0171c] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                      >
                        <span className="material-symbols-outlined text-base">send</span>
                        <span>{status === "submitting" ? "Submitting Notification..." : "Submit Transfer Notification"}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
export default DonationSubmissionSection;

