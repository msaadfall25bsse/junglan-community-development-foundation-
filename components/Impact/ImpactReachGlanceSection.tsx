'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from "@/components/home/ScrollReveal";

export default function ImpactReachGlanceSection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface border-b border-stone-border relative overflow-hidden" id="at-a-glance">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              MEASURABLE PROGRESS
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
              Understanding the Reach of Our Work
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="mt-2 text-xs sm:text-body-md text-on-surface-variant leading-relaxed">
              Documented metrics reflecting active ground service across the Hazara mountain corridor. We emphasize verified operational data over projected claims.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-red-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-red-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center mb-3 shadow-xs border border-red-200">
                  <span className="material-symbols-outlined text-xl">ambulance</span>
                </div>
                <span className="font-stat-display text-3xl sm:text-4xl text-primary font-bold block tracking-tight">~450</span>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold mt-1">Patients Transported</h3>
                <p className="mt-2 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Recorded across an approximate 2.5-year structured analysis period (2024 onward) navigating emergency transit to district hospitals.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/60 flex items-center text-xs text-status-active font-semibold relative z-10">
                <span className="material-symbols-outlined text-sm mr-1">check_circle</span> Verified Field Manifest
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-primary-container flex items-center justify-center mb-3 shadow-xs border border-blue-200">
                  <span className="material-symbols-outlined text-xl">calendar_month</span>
                </div>
                <span className="font-stat-display text-3xl sm:text-4xl text-primary font-bold block tracking-tight">Since 2018</span>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold mt-1">Community Service</h3>
                <p className="mt-2 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Continuous local volunteer presence, maintaining an unbroken emergency hotline and rescue vehicle lifeline for remote residents.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/60 flex items-center text-xs text-primary font-semibold relative z-10">
                <span className="material-symbols-outlined text-sm mr-1">history</span> Grassroots Roots
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-secondary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-secondary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-secondary flex items-center justify-center mb-3 shadow-xs border border-emerald-200">
                  <span className="material-symbols-outlined text-xl">terrain</span>
                </div>
                <span className="font-stat-display text-3xl sm:text-4xl text-primary font-bold block tracking-tight">4+</span>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold mt-1">Core Valley Hamlets</h3>
                <p className="mt-2 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Uninterrupted high-altitude route access connecting Janglan, Upper Slopes, Galiyan, and surrounding agrarian ridge clusters.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/60 flex items-center text-xs text-secondary font-semibold relative z-10">
                <span className="material-symbols-outlined text-sm mr-1">alt_route</span> High Altitude Coverage
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-amber-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-amber-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-3 shadow-xs border border-amber-200">
                  <span className="material-symbols-outlined text-xl">fact_check</span>
                </div>
                <span className="font-stat-display text-3xl sm:text-4xl text-primary font-bold block tracking-tight">2024+</span>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold mt-1">Structured Records</h3>
                <p className="mt-2 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Standardized operational ledgers, physical maintenance invoices, and fuel receipt reconciliations cataloged for institutional review.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/60 flex items-center text-xs text-status-planned font-semibold relative z-10">
                <span className="material-symbols-outlined text-sm mr-1">folder_open</span> Active Audit Pipeline
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Data Scope & Integrity Notice */}
        <ScrollReveal variant="card" delay={500}>
          <div className="mt-6 p-3.5 sm:p-4 bg-gradient-to-r from-surface-container-low via-white to-blue-50/20 rounded-xl border border-stone-border flex items-start gap-3 shadow-2xs ui-neumorphic-inset">
            <span className="material-symbols-outlined text-primary text-xl mt-0.5 shrink-0">info</span>
            <div className="text-xs sm:text-body-sm text-on-surface-variant leading-relaxed">
              <strong className="text-primary font-semibold">Data Scope &amp; Integrity Notice:</strong> 
              {" "}Data reflects operational activity documented by JCDF field coordinators. Figures from 2018–2023 represent community volunteer service logs; structured, digitized trip vouchers began comprehensive cataloging in January 2024. All stated metrics are open to verification at the foundation&apos;s Valley Desk.
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
