"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function WorkOverviewSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-20 bg-surface border-b border-stone-border" id="overview">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="max-w-2xl mb-12">
          <ScrollReveal variant="heading" delay={100}>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold mb-3">
              The Areas We Work In
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Our work focuses on practical community needs, including access to healthcare transportation and opportunities related to agriculture and rural development.
            </p>

            {/* Expandable Overview Context */}
            <div
              className={`grid transition-all duration-500 ease-in-out ${
                isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden space-y-2 pt-2 font-body-md text-on-surface-variant">
                <p>
                  Each area addresses persistent mountain bottlenecks: immediate survival during high-altitude medical crises, and long-term economic stability through sustainable regenerative agriculture.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors pt-2 cursor-pointer focus:outline-none"
            >
              <span>{isExpanded ? "Show Less" : "See More"}</span>
              <span
                className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>
          </ScrollReveal>
        </div>

        {/* 2 Feature Cards Grid with Full-bleed Background Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature Card 1: Ambulance Service */}
          <ScrollReveal variant="card" delay={150}>
            <div className="ui-spatial-card ui-glassmorphic-dark relative rounded-2xl overflow-hidden border border-white/15 shadow-xl flex flex-col justify-between p-8 bg-navy-deep group h-full min-h-[460px]">
              {/* Full Background Image: Official JCDF Mountain Ambulance (ADA 262) */}
              <img
                src="/work-overview-ambulance.jpg"
                alt="Official JCDF Mountain Emergency Ambulance (ADA 262)"
                className="absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none"
              />
              {/* Translucent Dark Gradient Overlay for flawless text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#081A2D]/85 to-black/70 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/30 text-red-200 border border-red-500/40 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                    Active Frontline Service
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 backdrop-blur-sm border border-red-400/30 flex items-center justify-center text-red-300">
                    <span className="material-symbols-outlined text-2xl">
                      ambulance
                    </span>
                  </div>
                </div>

                <h3 className="font-headline-md text-headline-md text-white font-semibold tracking-tight">
                  Ambulance Service
                </h3>

                <p className="font-body-md text-body-md text-slate-200 leading-relaxed font-medium">
                  JCDF’s ambulance service supports patient transportation for healthcare facilities. The service is especially relevant where reaching medical care by private transport can be difficult.
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="text-xs bg-white/10 backdrop-blur-md text-slate-200 border border-white/15 px-3 py-1 rounded-full font-medium">
                    24/7 Rapid Triage
                  </span>
                  <span className="text-xs bg-white/10 backdrop-blur-md text-slate-200 border border-white/15 px-3 py-1 rounded-full font-medium">
                    Maternity &amp; Emergency
                  </span>
                  <span className="text-xs bg-white/10 backdrop-blur-md text-slate-200 border border-white/15 px-3 py-1 rounded-full font-medium">
                    Oxygen Onboard
                  </span>
                </div>
              </div>

              <div className="relative z-10 pt-8 mt-6 border-t border-white/15">
                <FlipButton
                  href="#ambulance"
                  variant="red"
                  frontText="Learn About Ambulance Services"
                  backText="Opening Ambulance..."
                  icon="ambulance"
                  className="w-full"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Feature Card 2: Agriculture & Rural Development */}
          <ScrollReveal variant="card" delay={250}>
            <div className="ui-spatial-card ui-glassmorphic-dark relative rounded-2xl overflow-hidden border border-white/15 shadow-xl flex flex-col justify-between p-8 bg-navy-deep group h-full min-h-[460px]">
              {/* Full Background Image */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo6qTjJQ2mlEmfbLnavFaqpwfD3UMmMNNybnxGlvsg_iF-qz74cQ3ZHdjhzlubkGLd1fNplsS9777GGtWoZGQjBqmv3z2l7q1T2C5L9LN3CF3XrOlFIspCip7U26vRGFsjeJsXI1I7nMQR9D6fmTp9XljovIXeXmrMnJDbzafZ2sXJw6A_piJX6YztLZgFpfqwBylDPqM84bnJPyvsfHJuY5cS_iJwdFT73GH7bh_tI0ig6QUqOqxnWhObOfpMbSPxDQ"
                alt="Mountain Olive Agroforestry & Rural Development"
                className="absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none"
              />
              {/* Translucent Dark Gradient Overlay for flawless text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#081A2D]/85 to-black/70 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Community Pillar
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                    <span className="material-symbols-outlined text-2xl">
                      agriculture
                    </span>
                  </div>
                </div>

                <h3 className="font-headline-md text-headline-md text-white font-semibold tracking-tight">
                  Agriculture &amp; Rural Development
                </h3>

                <p className="font-body-md text-body-md text-slate-200 leading-relaxed font-medium">
                  Agriculture is an important part of rural life and local development. This area highlights agricultural opportunities, local farming needs, responsible natural resource use, and practical ideas that support livelihoods.
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="text-xs bg-white/10 backdrop-blur-md text-slate-200 border border-white/15 px-3 py-1 rounded-full font-medium">
                    Soil Stewardship
                  </span>
                  <span className="text-xs bg-white/10 backdrop-blur-md text-slate-200 border border-white/15 px-3 py-1 rounded-full font-medium">
                    Water Efficiency
                  </span>
                  <span className="text-xs bg-white/10 backdrop-blur-md text-slate-200 border border-white/15 px-3 py-1 rounded-full font-medium">
                    Terraced Agroforestry
                  </span>
                </div>
              </div>

              <div className="relative z-10 pt-8 mt-6 border-t border-white/15">
                <FlipButton
                  href="#agriculture"
                  variant="primary"
                  frontText="Explore Agriculture"
                  backText="Opening Agriculture..."
                  icon="park"
                  className="w-full"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default WorkOverviewSection;

