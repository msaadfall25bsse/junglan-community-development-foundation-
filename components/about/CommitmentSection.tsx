"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function CommitmentSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-14 md:py-18 bg-surface-container-lowest border-b border-stone-border">
      <div className="max-w-5xl mx-auto px-margin-sm md:px-margin">
        <ScrollReveal variant="card" delay={150}>
          <div className="ui-skeuomorphic rounded-2xl p-8 md:p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed/60 text-secondary mx-auto flex items-center justify-center mb-4 ui-skeuomorphic-badge">
              <span className="material-symbols-outlined text-[24px]">balance</span>
            </div>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2 font-bold">
              INSTITUTIONAL PLEDGE
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-semibold mb-4">
              A Commitment to Practical Community Support
            </h2>
            <div className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto mb-6 leading-relaxed space-y-3">
              <p>
                Janglan Community Development Foundation is grounded in genuine stewardship. We commit to transparent communication, responsible management of every rupee entrusted to our care, and steadfast adherence to SECP non-profit standards.
              </p>

              {/* Expandable hidden pledge details */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden space-y-2 pt-1 font-body-md text-body-md text-on-surface-variant">
                  <p>
                    Our administrative overhead is minimized to ensure maximum resources directly reach mountain families, fuel ambulance transfers, and nurture certified olive orchards. We welcome independent public auditing at every step.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors pt-1 cursor-pointer focus:outline-none"
              >
                <span>{isExpanded ? "Show Less" : "See Details"}</span>
                <span
                  className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-body-sm text-on-surface-variant font-medium pt-4 border-t border-stone-border/80">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                SECP CUIN: 0348227
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[18px]">assignment</span>
                Annual Financial Audits
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[18px]">public</span>
                100% On-Ground Valley Focus
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default CommitmentSection;
