"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  ArrowRight,
  ShieldCheck,
  Ambulance,
  Sprout,
  Building2,
  Users,
  CheckCircle,
  Sparkles,
} from "lucide-react";

interface HeroSectionProps {
  onOpenDonateModal: (project?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDonateModal }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Decorative Mesh & Light Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="absolute top-48 -left-20 w-80 h-80 bg-sky-100/60 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-red-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Mission Narrative & Fundraising CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Mission Category Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>Community Development & Humanitarian NGO</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Building Stronger Communities,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-800">
                Creating Lasting Impact
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              Junglan Community Development Foundation empowers underserved villages and families through practical, high-impact initiatives in{" "}
              <strong className="text-slate-800 font-semibold">emergency healthcare transit</strong>,{" "}
              <strong className="text-slate-800 font-semibold">sustainable olive agriculture</strong>, and{" "}
              <strong className="text-slate-800 font-semibold">long-term community development</strong>.
            </p>

            {/* Multi-Project Pillar Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-sky-100 shadow-xs hover:border-sky-300 transition-colors">
                <div className="p-2 bg-sky-50 text-sky-600 rounded-lg shrink-0">
                  <Ambulance className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Healthcare</div>
                  <div className="text-slate-500">Ambulance Service</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-sky-100 shadow-xs hover:border-sky-300 transition-colors">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                  <Sprout className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Agriculture</div>
                  <div className="text-slate-500">Olive Cultivation</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-sky-100 shadow-xs hover:border-sky-300 transition-colors">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Development</div>
                  <div className="text-slate-500">Infrastructure</div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Primary Donate + Secondary Explore */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onOpenDonateModal()}
                className="py-3.5 px-8 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-extrabold text-base rounded-xl transition-all shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-white transition-transform group-hover:scale-115" />
                <span>Donate Now</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                href="#projects"
                className="py-3.5 px-7 bg-white hover:bg-sky-50 text-slate-800 hover:text-sky-700 border border-slate-200 hover:border-sky-300 font-bold text-base rounded-xl transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Explore Our Projects</span>
              </Link>
            </div>

            {/* Trust Assurance Markers */}
            <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>100% Direct Project Allocation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Verified Community Programs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Transparent Annual Audits</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Visual Card Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Composition Card */}
              <div className="relative rounded-3xl bg-gradient-to-br from-white via-sky-50/50 to-white p-4 sm:p-5 border border-sky-100 shadow-2xl overflow-hidden">
                
                {/* Hero Showcase Graphical Visual */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-tr from-sky-900 via-sky-800 to-slate-900 flex flex-col justify-between p-5 text-white shadow-inner">
                  {/* Subtle Grid Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                  
                  {/* Top Badges */}
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-sky-200 border border-white/10">
                      Community Mission
                    </span>
                    <span className="px-3 py-1 bg-red-600/90 backdrop-blur-md rounded-full text-xs font-bold text-white shadow-xs">
                      Active In The Field
                    </span>
                  </div>

                  {/* Central Visual Collage Vector */}
                  <div className="relative z-10 my-auto text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                      <Users className="w-8 h-8 text-sky-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Empowering Lives Locally
                    </h3>
                    <p className="text-xs text-sky-200 max-w-xs mx-auto leading-relaxed">
                      Transforming rural resilience from emergency relief to sustainable self-sufficiency.
                    </p>
                  </div>

                  {/* Bottom Live Progress Bar */}
                  <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-sky-200">2026 Community Reach</span>
                    <span className="text-white font-bold">35,000+ People</span>
                  </div>
                </div>

                {/* Floating Micro-Cards */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  
                  {/* Floating Micro-Card 1: Healthcare */}
                  <div className="p-3.5 rounded-2xl bg-white border border-sky-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                        <Ambulance className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">Healthcare</span>
                    </div>
                    <div className="text-lg font-extrabold text-sky-700">1,850+</div>
                    <p className="text-[11px] text-slate-500">Emergency transits operated</p>
                  </div>

                  {/* Floating Micro-Card 2: Agriculture */}
                  <div className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Sprout className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">Agriculture</span>
                    </div>
                    <div className="text-lg font-extrabold text-emerald-700">15,000+</div>
                    <p className="text-[11px] text-slate-500">Olive saplings planted</p>
                  </div>

                </div>

                {/* Quick Impact Contribution Prompt */}
                <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-700 text-white flex items-center justify-between shadow-md">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-sky-200">
                      Fund Immediate Needs
                    </div>
                    <div className="text-xs text-white">
                      $25 fuels 2 emergency medical trips
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenDonateModal()}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-transform active:scale-95 shadow-sm"
                  >
                    Support
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
