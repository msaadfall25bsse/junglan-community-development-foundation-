"use client";

import React from "react";
import {
  Sprout,
  Droplets,
  SunMedium,
  TrendingUp,
  Heart,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Leaf,
} from "lucide-react";

interface AgricultureProjectSectionProps {
  onOpenDonateModal: (project?: string) => void;
}

export const AgricultureProjectSection: React.FC<AgricultureProjectSectionProps> = ({
  onOpenDonateModal,
}) => {
  return (
    <section id="agriculture-section" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Narrative & Sustainable Agriculture Pillars */}
          <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Project Spotlight • Agriculture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Growing Communities Through Sustainable Agriculture
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Sustainable prosperity begins with the soil. Our <strong className="text-slate-800">Olive / Zaitoon Development Project</strong> helps rural farming families transition to drought-resilient olive orchards that yield nutritious fruit, high-value oil, and decades of steady economic stability.
            </p>

            {/* 3 Pillars of Agricultural Empowerment */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/40 border border-emerald-100 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Sprout className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">15,000+ Certified Olive Saplings Distributed</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Providing acclimatized high-yield olive cultivars adapted to local climate and terrain.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/40 border border-emerald-100 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Droplets className="w-4 h-4 text-sky-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Modern Drip Irrigation & Water Efficiency</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Teaching water-saving drip techniques to conserve up to 60% more water during hot summers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/40 border border-emerald-100 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Generational Household Income</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Creating independent income streams for over 450 smallholder farming families.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenDonateModal("Olive / Zaitoon Agriculture Project")}
                className="py-3.5 px-7 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2"
              >
                <Sprout className="w-4 h-4 text-emerald-200" />
                <span>Support Agriculture Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-xs text-slate-500 text-center sm:text-left">
                <strong>$60</strong> sponsors 10 certified olive saplings + farmer training.
              </div>
            </div>

          </div>

          {/* Right Column: Visual Composition & Orchard Showcase */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-2xl border border-emerald-800/40 overflow-hidden">
              
              {/* Status Indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                    Sustainable Cultivation
                  </span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-white/10 rounded-full border border-white/10 text-emerald-200">
                  Active Orchard Fields
                </span>
              </div>

              {/* Central Vector / Orchard Graphics */}
              <div className="py-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shadow-inner">
                  <Sprout className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Zaitoon Development Initiative
                  </h3>
                  <p className="text-xs text-emerald-200 mt-1 max-w-sm mx-auto leading-relaxed">
                    Planting resilient olive groves that transform arid terrains into fertile, income-generating community assets.
                  </p>
                </div>
              </div>

              {/* Agricultural Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
                <div className="p-3 bg-white/5 rounded-2xl">
                  <div className="text-lg font-bold text-emerald-300">15k+</div>
                  <div className="text-[10px] text-slate-300">Saplings Planted</div>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl">
                  <div className="text-lg font-bold text-sky-300">60%</div>
                  <div className="text-[10px] text-slate-300">Water Saved</div>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl">
                  <div className="text-lg font-bold text-emerald-400">450+</div>
                  <div className="text-[10px] text-slate-300">Families Benefiting</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AgricultureProjectSection;
