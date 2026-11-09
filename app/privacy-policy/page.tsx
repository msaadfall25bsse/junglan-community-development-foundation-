import React from "react";
import type { Metadata } from "next";
import Header from "@/components/ui/layout/Header";
import Footer from "@/components/ui/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Junglan Community Development Foundation",
  description:
    "Official Privacy Policy of Junglan Community Development Foundation (SECP CUIN: 0348227). Read how we safeguard donor and community stakeholder information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-white text-on-surface font-body-md antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-surface-bright border-b border-stone-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              LEGAL &amp; COMPLIANCE
            </span>
            <h1 className="text-3xl sm:text-4xl font-headline-xl text-primary tracking-tight font-semibold">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-on-surface-variant">
              Last Updated: Operational Year 2026 • Registered SECP CUIN: 0348227
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-stone-border space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-primary">
                1. Institutional Commitment to Privacy
              </h2>
              <p>
                Junglan Community Development Foundation (JCDF) operates under a strict fiduciary mandate to protect the confidentiality, dignity, and personal information of all contributors, donors, volunteers, and rural beneficiaries across Hazara Division, Pakistan.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-stone-border space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-primary">
                2. Information We Collect
              </h2>
              <p>
                When you interact with our Valley Desk or submit a donation notification, we may collect the following basic details:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Donor contact identity: Full name, verified contact number, and email address.</li>
                <li>Transaction reference information: Deposit slip number, bank reference, or mobile transaction ID.</li>
                <li>Geographic origin: City and country of remittance for compliance audit reporting.</li>
              </ul>
              <p className="pt-1 text-slate-600">
                <strong>Important:</strong> We do NOT collect or store credit card numbers, CVVs, or online banking passwords on our website frontend.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-stone-border space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-primary">
                3. Anonymous Donations
              </h2>
              <p>
                We fully respect and honor donors who choose to remain anonymous. If you select the anonymous contribution option, your name will never appear in public transparency ledgers or reports shared with external stakeholders.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-stone-border space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-primary">
                4. Data Protection &amp; Beneficiary Confidentiality
              </h2>
              <p>
                Medical patient records transported by our high-altitude ambulance service (AMB-01) are held under strict healthcare confidentiality. No patient clinical data or private medical diagnoses are ever made public.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-stone-border space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-primary">
                5. Contact Regarding Privacy Inquiries
              </h2>
              <p>
                For questions regarding data records or privacy rights, please connect with our Valley Desk:
              </p>
              <div className="pt-2 text-primary font-semibold space-y-1">
                <p>Helpline: +92 301 6541825</p>
                <p>WhatsApp Coordinator: +49 171 5114247</p>
                <p>Location: Junglan Base Camp, Tehsil Baffa Pakhal, Mansehra, KP, Pakistan</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

