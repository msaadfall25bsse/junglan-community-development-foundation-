"use client";

import React from "react";
import {
  Heart,
  ShieldCheck,
  Hammer,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";
import { IMPACT_FLOW } from "@/data/homepage-data";

interface HowSupportWorksProps {
  onOpenDonateModal: () => void;
}

const iconStepMap = {
  Heart: Heart,
  ShieldCheck: ShieldCheck,
  Hammer: Hammer,
  TrendingUp: TrendingUp,
};

export const HowSupportWorks: React.FC<HowSupportWorksProps> = ({ onOpenDonateModal }) => {
  return (
    <section id="impact-flow" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Accountability & Stewardship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Support Creates Real Impact
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Every contribution directly funds vital field operations in healthcare and sustainable olive agriculture, with full transparency at every phase.
          </p>
        </div>

        {/* 4-Step Visual Flow Diagram */}
        <div className="relative">
          {/* Connecting Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-sky-200 via-sky-400 to-emerald-400 -translate-y-8 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {IMPACT_FLOW.map((step, index) => {
              const IconComponent = iconStepMap[step.icon as keyof typeof iconStepMap] || Heart;

              return (
                <div
                  key={step.stepNumber}
                  className="p-6 rounded-3xl bg-white border border-sky-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Top Row: Step Badge & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-100 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-black text-sky-200 group-hover:text-sky-400 transition-colors">
                        {step.stepNumber}
                      </span>
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-1">
                      {step.shortDesc}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Phase {index + 1} Audited</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transparency Pledge Card */}
        <div className="mt-14 rounded-3xl bg-gradient-to-br from-sky-50 via-white to-sky-50/50 p-6 sm:p-8 border border-sky-200/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800">
              <FileCheck2 className="w-4 h-4 text-sky-600" />
              <span>100% Donor Transparency Pledge</span>
            </div>
            <h4 className="text-xl font-bold text-slate-900">
              Where does your funding go?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              We allocate donations directly into operational costs (ambulance fuel, vehicle maintenance, medical kits, certified olive saplings, drip irrigation, and field team training) rather than inflated administrative overhead.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onOpenDonateModal}
              className="py-3.5 px-8 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-red-600/20 flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Support Our Mission</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowSupportWorks;
