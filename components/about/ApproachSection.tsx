"use client";

import React from "react";

export function ApproachSection() {
  return (
    <section className="py-16 md:py-20 bg-surface-container-lowest border-b border-stone-border" id="approach">
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
          <span className="font-body-sm text-body-sm text-outline italic">
            Suggested consultative approach.
          </span>
        </div>
        {/* 4-Step Horizontal Process Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 01 */}
          <div className="relative bg-stone-white p-6 rounded-xl border border-stone-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-stat-display text-2xl text-secondary font-bold">01</span>
                <span className="material-symbols-outlined text-outline text-[20px]">hearing</span>
              </div>
              <h3 className="font-headline-sm text-[16px] text-primary font-bold mb-2">
                Understand Community Needs
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Engage directly with village elders, families, and workers to listen and map genuine ground challenges.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-border text-[11px] font-label-uppercase text-outline">
              Stage: Field Listening
            </div>
          </div>

          {/* Step 02 */}
          <div className="relative bg-stone-white p-6 rounded-xl border border-stone-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-stat-display text-2xl text-secondary font-bold">02</span>
                <span className="material-symbols-outlined text-outline text-[20px]">filter_alt</span>
              </div>
              <h3 className="font-headline-sm text-[16px] text-primary font-bold mb-2">
                Identify Practical Priorities
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Filter prospective initiatives to ensure they are actionable, immediately needed, and locally sustainable.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-border text-[11px] font-label-uppercase text-outline">
              Stage: Feasibility Assessment
            </div>
          </div>

          {/* Step 03 */}
          <div className="relative bg-stone-white p-6 rounded-xl border border-stone-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-stat-display text-2xl text-secondary font-bold">03</span>
                <span className="material-symbols-outlined text-outline text-[20px]">engineering</span>
              </div>
              <h3 className="font-headline-sm text-[16px] text-primary font-bold mb-2">
                Support Relevant Activities
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Deploy tangible assistance—from frontline ambulance transport to agricultural planting days and irrigation care.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-border text-[11px] font-label-uppercase text-outline">
              Stage: Direct Execution
            </div>
          </div>

          {/* Step 04 */}
          <div className="relative bg-stone-white p-6 rounded-xl border border-stone-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-stat-display text-2xl text-secondary font-bold">04</span>
                <span className="material-symbols-outlined text-outline text-[20px]">published_with_changes</span>
              </div>
              <h3 className="font-headline-sm text-[16px] text-primary font-bold mb-2">
                Review and Improve
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Continuously collect user feedback, publish transparent audit records, and calibrate work for greater impact.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-border text-[11px] font-label-uppercase text-outline">
              Stage: Iterative Audit
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApproachSection;
