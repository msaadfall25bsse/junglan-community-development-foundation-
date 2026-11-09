import React from "react";
import type { Metadata } from "next";
import Header from "@/components/ui/layout/Header";
import Footer from "@/components/ui/layout/Footer";

export const metadata: Metadata = {
  title: "SECP Filings & Statutory Compliance | Junglan Community Development Foundation",
  description:
    "Official corporate registry and statutory documentation under the Securities and Exchange Commission of Pakistan (CUIN: 0348227).",
};

export default function SecpFilingsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-white text-on-surface font-body-md antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-surface-bright border-b border-stone-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              STATUTORY COMPLIANCE
            </span>
            <h1 className="text-3xl sm:text-4xl font-headline-xl text-primary tracking-tight font-semibold">
              SECP Filings &amp; Corporate Credentials
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-on-surface-variant">
              Corporate Universal Identification Number (CUIN: 0348227) • Public Disclosure
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            {/* Verification Badge Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-blue-50/30 border border-emerald-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-label-uppercase">
                  Official Registry Credential
                </span>
                <h2 className="text-xl font-semibold text-primary mt-2">
                  Securities &amp; Exchange Commission of Pakistan
                </h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Registered Non-Profit Entity under Companies Act • Islamabad / Peshawar CRO
                </p>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <span className="text-[11px] text-on-surface-variant block uppercase font-label-uppercase">CUIN Registry</span>
                <span className="font-mono text-xl font-bold text-secondary">0348227</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-stone-border space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-primary">
                1. Legal Incorporation Status
              </h3>
              <p>
                Junglan Community Development Foundation is duly registered under Section 42 of the Companies Act, 2017 with the Securities and Exchange Commission of Pakistan (SECP). This status confirms our non-profit, non-political, and charitable public character.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-stone-border space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-primary">
                2. Annual Returns &amp; Statutory Books
              </h3>
              <p>
                In compliance with statutory requirements:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Annual statutory returns and documentation registers are submitted according to prescribed company regulations.</li>
                <li>Books of accounts, donation ledgers, and expense vouchers are maintained systematically for annual audit scrutiny.</li>
                <li>A dedicated Board of Directors provides governance oversight to ensure full adherence to our registered memorandum and articles of association.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-stone-border space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-primary">
                3. Audit Transparency Pipeline
              </h3>
              <p>
                As part of our commitment to transparency, summarized financial reports, operational trip summaries, and nursery distribution records are published open-access in our <a href="/impact" className="text-secondary font-semibold hover:underline">Impact &amp; Audits</a> section.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-stone-border space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-primary">
                4. Inspection of Public Documents
              </h3>
              <p>
                Verified copies of incorporation certificates and official corporate filings are available for inspection by authorized stakeholders and institutional partners upon written request to our registered secretariat.
              </p>
              <div className="pt-2 text-primary font-semibold text-xs">
                Email / Liaison: <a href="tel:+923016541825" className="hover:underline">+92 301 6541825</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

