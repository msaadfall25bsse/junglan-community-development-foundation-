"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { ResponsiveCardCarousel } from "@/components/common/ResponsiveCardCarousel";

const TRUST_CARDS = [
  {
    title: "Transparent Fund Management",
    desc: "We adhere strictly to registered fiduciary requirements. All contributions are credited into institutional foundation accounts with zero arbitrary personal deductions.",
    icon: "account_balance",
  },
  {
    title: "Community-Focused Initiatives",
    desc: "100% of public donations are applied directly to frontline needs—supporting emergency patient transit fuel, high-altitude saplings, and village welfare projects.",
    icon: "diversity_3",
  },
  {
    title: "Organizational Accountability",
    desc: "Incorporated under SECP (CUIN: 0348227). Operational trip sheets, verified expenditure vouchers, and audit reporting are systematically organized.",
    icon: "fact_check",
  },
];

export function TransparencyAccountabilitySection() {
  return (
    <section className="py-12 lg:py-16 bg-surface border-b border-stone-border relative overflow-hidden" id="transparency-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              ETHICAL FIDUCIARY MANDATE
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
              Committed to Transparency and Accountability
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={150}>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              We believe that community support should be built on trust, responsible resource management, and transparent reporting.
            </p>
          </ScrollReveal>
        </div>

        <ResponsiveCardCarousel intervalMs={4000} gridClassName="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TRUST_CARDS.map((card, idx) => (
            <ScrollReveal key={card.title} variant="card" delay={100 + idx * 75}>
              <div className="ui-claymorphic bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 p-6 rounded-2xl border border-stone-border shadow-xs hover:border-primary/40 transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-primary flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-primary mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-border/60 text-xs text-secondary font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span>Verified Standard</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </ResponsiveCardCarousel>

        {/* View Impact & Audits CTA */}
        <div className="text-center mt-10">
          <ScrollReveal variant="text" delay={200}>
            <Link
              href="/impact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-xs sm:text-sm hover:bg-primary-container transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-base text-emerald-300">verified</span>
              <span>View Impact &amp; Audits</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
export default TransparencyAccountabilitySection;

