"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

const PAYMENT_METHODS = [
  {
    id: "BANK_TRANSFER",
    title: "Direct Bank Transfer (IBAN)",
    subtitle: "Recommended for all domestic & overseas remittances",
    badge: "Official Foundation Account",
    bankName: "Meezan Bank Limited / National Bank of Pakistan",
    accountTitle: "Junglan Community Development Foundation",
    accountNumber: "02010108924822",
    iban: "PK72MEZN0002010108924822",
    branchCode: "0201 (Mansehra Branch)",
    instructions: "Please send interbank transfer / RAAST from any banking app using the IBAN above.",
    icon: "account_balance",
  },
  {
    id: "EASYPAISA",
    title: "Easypaisa Account",
    subtitle: "Instant mobile wallet transfer inside Pakistan",
    badge: "Instant Mobile",
    bankName: "Easypaisa / Telenor Microfinance Bank",
    accountTitle: "Junglan Community Dev Foundation (JCDF Desk)",
    accountNumber: "0301 6541825",
    iban: "PK28TPBK00000003016541825",
    branchCode: "Valley Mobile Desk",
    instructions: "Open your Easypaisa App -> Send Money -> Enter 03016541825 -> Confirm JCDF Title.",
    icon: "phone_android",
  },
  {
    id: "JAZZCASH",
    title: "JazzCash Account",
    subtitle: "Rapid mobile transfer across all local operators",
    badge: "Instant Mobile",
    bankName: "JazzCash / Mobilink Microfinance Bank",
    accountTitle: "Junglan Community Dev Foundation (JCDF Desk)",
    accountNumber: "0301 6541825",
    iban: "PK53JCMP00000003016541825",
    branchCode: "Valley Mobile Desk",
    instructions: "Open JazzCash App -> Money Transfer -> Mobile Account -> 03016541825.",
    icon: "payments",
  },
  {
    id: "INTERNATIONAL",
    title: "Overseas Remittances & SWIFT",
    subtitle: "Dedicated support for UK, EU, Gulf & North American donors",
    badge: "Global Wire & WhatsApp Liaison",
    bankName: "Meezan Bank Limited (Head Office Karachi / Mansehra)",
    accountTitle: "Junglan Community Development Foundation",
    accountNumber: "02010108924822",
    iban: "PK72MEZN0002010108924822",
    branchCode: "SWIFT: MEZNPKKA",
    instructions: "Contact our international coordinator directly on WhatsApp (+49 171 5114247) for routing advice and tax receipts.",
    icon: "public",
  },
];

export function PaymentMethodsSection() {
  const [activeTab, setActiveTab] = useState<string>("BANK_TRANSFER");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const activeMethod = PAYMENT_METHODS.find((m) => m.id === activeTab) || PAYMENT_METHODS[0];

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section className="py-[48px] lg:py-[64px] bg-surface border-b border-stone-border relative overflow-hidden" id="payment-methods">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block">
              OFFICIAL PAYMENT CHANNELS
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
              Select Your Preferred Contribution Channel
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={150}>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              We operate exclusively through official foundation accounts registered under SECP CUIN 0348227. No personal or unauthorized middleman accounts are ever utilized.
            </p>
          </ScrollReveal>
        </div>

        {/* Tab selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {PAYMENT_METHODS.map((method) => {
            const isActive = activeTab === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setActiveTab(method.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-surface-container-lowest text-on-surface-variant border-stone-border hover:border-primary/40"
                }`}
              >
                <span className="material-symbols-outlined text-base">{method.icon}</span>
                <span>{method.title.split("(")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Payment Channel Detail Card */}
        <div className="max-w-4xl mx-auto">
          <ScrollReveal variant="card" delay={200}>
            <div className="ui-claymorphic bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 p-5 sm:p-7 rounded-2xl border border-stone-border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-border/70">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10.5px] font-bold uppercase font-label-uppercase tracking-wider">
                    {activeMethod.badge}
                  </span>
                  <h3 className="font-headline-sm text-base sm:text-lg text-primary font-semibold mt-1.5">
                    {activeMethod.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {activeMethod.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-secondary font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 self-start sm:self-auto">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>SECP CUIN: 0348227</span>
                </div>
              </div>

              {/* Account Credentials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
                {/* Bank / Platform */}
                <div className="p-3.5 rounded-xl bg-surface border border-stone-border/70">
                  <span className="text-[10.5px] text-on-surface-variant font-medium block uppercase tracking-wider font-label-uppercase">
                    Bank / Institution
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-primary block mt-0.5">
                    {activeMethod.bankName}
                  </span>
                </div>

                {/* Account Title */}
                <div className="p-3.5 rounded-xl bg-surface border border-stone-border/70">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] text-on-surface-variant font-medium block uppercase tracking-wider font-label-uppercase">
                      Beneficiary Account Title
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(activeMethod.accountTitle, "title")}
                      className="text-[11px] font-semibold text-secondary hover:underline inline-flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-xs">content_copy</span>
                      <span>{copiedField === "title" ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-primary block mt-0.5">
                    {activeMethod.accountTitle}
                  </span>
                </div>

                {/* Account / Mobile Number */}
                <div className="p-3.5 rounded-xl bg-surface border border-stone-border/70">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] text-on-surface-variant font-medium block uppercase tracking-wider font-label-uppercase">
                      Account / Phone Number
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(activeMethod.accountNumber.replace(/\s+/g, ""), "acc")}
                      className="text-[11px] font-semibold text-secondary hover:underline inline-flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-xs">content_copy</span>
                      <span>{copiedField === "acc" ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                  <span className="text-sm sm:text-base font-bold font-mono text-primary block mt-0.5">
                    {activeMethod.accountNumber}
                  </span>
                </div>

                {/* IBAN / Routing Code */}
                <div className="p-3.5 rounded-xl bg-surface border border-stone-border/70">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] text-on-surface-variant font-medium block uppercase tracking-wider font-label-uppercase">
                      IBAN / International Routing
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(activeMethod.iban, "iban")}
                      className="text-[11px] font-semibold text-secondary hover:underline inline-flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-xs">content_copy</span>
                      <span>{copiedField === "iban" ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                  <span className="text-xs sm:text-sm font-bold font-mono text-primary block mt-0.5 break-all">
                    {activeMethod.iban}
                  </span>
                </div>
              </div>

              {/* Instructions banner */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-2.5 text-xs text-primary leading-relaxed">
                <span className="material-symbols-outlined text-base text-primary shrink-0 mt-0.5">info</span>
                <div>
                  <strong>Guideline:</strong> {activeMethod.instructions}
                </div>
              </div>

              {/* Direct Help Strip */}
              <div className="mt-4 pt-3 border-t border-stone-border/60 flex flex-wrap items-center justify-between gap-3 text-xs text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-secondary">support_agent</span>
                  <span>Need assistance? Call Valley Desk: <strong className="text-primary">+92 301 6541825</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-secondary">chat</span>
                  <span>WhatsApp Liaison: <strong className="text-primary">+49 171 5114247</strong></span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
export default PaymentMethodsSection;

