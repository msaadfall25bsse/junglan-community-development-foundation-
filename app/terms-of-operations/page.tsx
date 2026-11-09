import React from "react";
import type { Metadata } from "next";
import Header from "@/components/ui/layout/Header";
import Footer from "@/components/ui/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Operations | Junglan Community Development Foundation",
  description:
    "Official operational framework, field guidelines, and stewardship terms of Junglan Community Development Foundation (SECP CUIN: 0348227).",
};

export default function TermsOfOperationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-white text-on-surface font-body-md antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-surface-bright border-b border-stone-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              OPERATIONAL GOVERNANCE
            </span>
            <h1 className="text-3xl sm:text-4xl font-headline-xl text-primary tracking-tight font-semibold">
              Terms of Operations
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-on-surface-variant">
              Field Dispatch &amp; Administrative Principles • SECP CUIN: 0348227
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-stone-border space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-primary">
                1. Scope of Community Operations
              </h2>
              <p>
                Junglan Community Development Foundation operates as a registered non-profit organization dedicated exclusively to civic relief, emergency mountain patient transport, and sustainable olive agroforestry in Hazara Division, Khyber Pakhtunkhwa.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-stone-border space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-primary">
                2. Emergency Ambulance Service Protocols
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong>Field Dispatch Priority:</strong> Priority is granted based on acute medical triage (severe trauma, maternity labor emergencies, critical respiratory collapse) determined by valley coordinators and medical responders.
                </li>
                <li>
                  <strong>Zero-Refusal Policy:</strong> No indigent patient in Junglan Valley is ever turned away due to inability to pay fuel costs. Relief funds subsidize non-commercial transport journeys.
                </li>
                <li>
                  <strong>Mountain Road Safety:</strong> In cases of extreme mountain landslides, severe snow blockages, or flash flood washed-out bridges, transit timing is subject to driver and paramedic safety clearance.
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-stone-border space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-primary">
                3. Direct Frontline Allocation Guarantee
              </h2>
              <p>
                All public donations are held under strict fiduciary trust. Donated funds are utilized directly on vehicle petrol/diesel, certified high-altitude nursery saplings, mechanical upkeep, and essential oxygen replenishments without unauthorized diversion.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-stone-border space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-primary">
                4. Volunteer Conduct &amp; Ethics
              </h2>
              <p>
                All foundation drivers, agro-trainers, and field coordinators adhere to community honor codes, mutual respect, and accountability to local village elders and administrative authorities.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-stone-border space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-primary">
                5. Governance &amp; Resolution
              </h2>
              <p>
                These terms are governed by the statutory regulations of Pakistan under the Securities and Exchange Commission of Pakistan (SECP). Any inquiries or clarifications may be directed to our registered Valley Base Camp.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

