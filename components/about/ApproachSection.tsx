"use client";

import React from "react";

export function ApproachSection() {
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
          <div>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-1">
              OPERATIONAL METHODOLOGY
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
              Our Approach to Community Development
            </h2>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/40 backdrop-blur-sm border border-white/40 text-on-surface-variant font-body-sm text-body-sm italic">
            Suggested consultative approach.
          </span>
        </div>
        {/* 4-Step Horizontal Process Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 01 */}
          <div className="relative backdrop-blur-md bg-white/70 hover:bg-white/80 transition-all p-6 rounded-xl border border-white/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-stat-display text-2xl text-secondary font-bold">01</span>
                <span className="material-symbols-outlined text-outline text-[20px]">hearing</span>
              </div>
              <h3 className="font-headline-sm text-[16px] text-primary font-bold mb-2">
                Understand Community Needs
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                Engage directly with village elders, families, and workers to listen and map genuine ground challenges.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-border/60 text-[11px] font-label-uppercase text-outline font-semibold">
              Stage: Field Listening
            </div>
          </div>

          {/* Step 02 */}
          <div className="relative backdrop-blur-md bg-white/70 hover:bg-white/80 transition-all p-6 rounded-xl border border-white/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-stat-display text-2xl text-secondary font-bold">02</span>
                <span className="material-symbols-outlined text-outline text-[20px]">filter_alt</span>
              </div>
              <h3 className="font-headline-sm text-[16px] text-primary font-bold mb-2">
                Identify Practical Priorities
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                Filter prospective initiatives to ensure they are actionable, immediately needed, and locally sustainable.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-border/60 text-[11px] font-label-uppercase text-outline font-semibold">
              Stage: Feasibility Assessment
            </div>
          </div>

          {/* Step 03 */}
          <div className="relative backdrop-blur-md bg-white/70 hover:bg-white/80 transition-all p-6 rounded-xl border border-white/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-stat-display text-2xl text-secondary font-bold">03</span>
                <span className="material-symbols-outlined text-outline text-[20px]">engineering</span>
              </div>
              <h3 className="font-headline-sm text-[16px] text-primary font-bold mb-2">
                Support Relevant Activities
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                Deploy tangible assistance—from frontline ambulance transport to agricultural planting days and irrigation care.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-border/60 text-[11px] font-label-uppercase text-outline font-semibold">
              Stage: Direct Execution
            </div>
          </div>

          {/* Step 04 */}
          <div className="relative backdrop-blur-md bg-white/70 hover:bg-white/80 transition-all p-6 rounded-xl border border-white/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-stat-display text-2xl text-secondary font-bold">04</span>
                <span className="material-symbols-outlined text-outline text-[20px]">published_with_changes</span>
              </div>
              <h3 className="font-headline-sm text-[16px] text-primary font-bold mb-2">
                Review and Improve
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                Continuously collect user feedback, publish transparent audit records, and calibrate work for greater impact.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-border/60 text-[11px] font-label-uppercase text-outline font-semibold">
              Stage: Iterative Audit
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApproachSection;
