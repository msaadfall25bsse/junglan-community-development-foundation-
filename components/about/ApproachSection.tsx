"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function ApproachSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className="py-16 md:py-20 border-b border-stone-border relative"
      id="approach"
      style={{
        backgroundImage:
          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASbl218rw6F8qnPCszluLItlrNKEIWTmj2M-Y_eKx8iZVN7HTc8-6DcBuYIj15lsGneZt_7hPO4D88oVA8fRa9P_Al--M4z7OLTcuZqlow1TF4lBc8e1HkqTrcrtKYkbRLGiHkDOgavj0uMUrTXXA5aapBvez83nbh0RlqcYKbiLB45CqdkTRcQGkdqD9m_MOwCEi5trIhkXMhPeNTTxTazUmyuJ23CpEiQrtx10QbawvzOmqjrJkxx3ly1cMWRKAjQw")',
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-1 font-bold">
              OPERATIONAL METHODOLOGY
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-semibold">
              Our Approach to Community Development
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <div className="flex flex-col items-start md:items-end">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-white/60 text-on-surface-variant font-body-sm text-body-sm font-semibold">
                Suggested consultative approach.
              </span>
              {/* Expandable note */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden pt-2 max-w-sm text-right text-xs text-slate-700 bg-white/80 p-2 rounded-lg mt-1 border border-white/80 backdrop-blur-sm">
                  We maintain strict accountability with itemized accounting, field verification, and open stakeholder communication.
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
          </ScrollReveal>
        </div>

        {/* 4-Step Horizontal Process Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 01 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="ui-glassmorphic p-6 rounded-xl flex flex-col justify-between h-full transition-all duration-300 hover:scale-[1.02]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-stat-display text-2xl text-secondary font-bold">01</span>
                  <span className="material-symbols-outlined text-outline text-[20px]">hearing</span>
                </div>
                <h3 className="font-headline-sm text-[16px] text-primary font-semibold mb-2">
                  Understand Needs
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                  Engage directly with village elders, families, and workers to listen and map genuine ground challenges.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-border/60 text-[11px] font-label-uppercase text-outline font-semibold">
                Stage: Field Listening
              </div>
            </div>
          </ScrollReveal>

          {/* Step 02 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="ui-glassmorphic p-6 rounded-xl flex flex-col justify-between h-full transition-all duration-300 hover:scale-[1.02]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-stat-display text-2xl text-secondary font-bold">02</span>
                  <span className="material-symbols-outlined text-outline text-[20px]">filter_alt</span>
                </div>
                <h3 className="font-headline-sm text-[16px] text-primary font-semibold mb-2">
                  Target Priority Issues
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                  Concentrate resources on specific high-impact needs: emergency patient transit and agroforestry.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-border/60 text-[11px] font-label-uppercase text-outline font-semibold">
                Stage: Focus Definition
              </div>
            </div>
          </ScrollReveal>

          {/* Step 03 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="ui-glassmorphic p-6 rounded-xl flex flex-col justify-between h-full transition-all duration-300 hover:scale-[1.02]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-stat-display text-2xl text-secondary font-bold">03</span>
                  <span className="material-symbols-outlined text-outline text-[20px]">handshake</span>
                </div>
                <h3 className="font-headline-sm text-[16px] text-primary font-semibold mb-2">
                  Implement Cooperatively
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                  Deploy frontline assistance from ambulance transport to agricultural planting days and irrigation care.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-border/60 text-[11px] font-label-uppercase text-outline font-semibold">
                Stage: Field Action
              </div>
            </div>
          </ScrollReveal>

          {/* Step 04 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="ui-glassmorphic p-6 rounded-xl flex flex-col justify-between h-full transition-all duration-300 hover:scale-[1.02]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-stat-display text-2xl text-secondary font-bold">04</span>
                  <span className="material-symbols-outlined text-outline text-[20px]">sync</span>
                </div>
                <h3 className="font-headline-sm text-[16px] text-primary font-semibold mb-2">
                  Review &amp; Refine
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                  Regularly assess service delivery, solicit community feedback, and optimize operations transparently.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-border/60 text-[11px] font-label-uppercase text-outline font-semibold">
                Stage: Stewardship
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default ApproachSection;
