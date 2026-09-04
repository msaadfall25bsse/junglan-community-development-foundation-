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
  PhoneCall,
  Activity,
} from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { CONTACT_INFO } from "@/lib/constants/navigation";

interface HeroSectionProps {
  onOpenDonateModal: (project?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDonateModal }) => {
  return (
    <section
      id="hero"
      aria-label="Welcome and Mission Overview"
      className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-white pt-6 pb-16 lg:pt-12 lg:pb-24"
    >
      {/* Background Decorative Mesh & Light Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl animate-pulse-subtle" />
        <div className="absolute top-48 -left-20 w-80 h-80 bg-sky-100/60 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-red-100/25 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Mission Narrative & Fundraising CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left animate-fade-in">
            
            {/* Mission Category Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="sky" pulseDot>
                Community Development & Humanitarian NGO
              </Badge>
              <Badge variant="danger" dot>
                24/7 Emergency Ambulance Active
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Building Stronger Communities,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-800">
                Creating Lasting Impact
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              Junglan Community Development Foundation empowers underserved rural valleys through practical, high-impact interventions in{" "}
              <strong className="text-slate-800 font-semibold">emergency healthcare transit</strong>,{" "}
              <strong className="text-slate-800 font-semibold">sustainable olive agriculture</strong>, and{" "}
              <strong className="text-slate-800 font-semibold">community self-sufficiency</strong>.
            </p>

            {/* 3 Core Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-sky-100 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all group">
                <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Ambulance className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900">Healthcare</div>
                  <div className="text-slate-500">24/7 Ambulance Fleet</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-sky-100 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all group">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Sprout className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900">Agriculture</div>
                  <div className="text-slate-500">Olive Cultivation</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-sky-100 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all group">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900">Development</div>
                  <div className="text-slate-500">Rural Infrastructure</div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Primary Donate + Secondary Explore */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Button
                variant="danger"
                size="lg"
                onClick={() => onOpenDonateModal()}
                leftIcon={<Heart className="w-5 h-5 fill-white" />}
                rightIcon={<ArrowRight className="w-4 h-4 ml-0.5" />}
                className="shadow-lg shadow-red-600/25 cursor-pointer text-base"
              >
                Donate to Field Missions
              </Button>

              <Link href="/#projects" className="inline-flex">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto text-slate-800 hover:text-sky-700"
                >
                  Explore Our Projects
                </Button>
              </Link>
            </div>

            {/* Emergency Hotline Banner under CTAs */}
            <div className="p-3 rounded-2xl bg-red-50/80 border border-red-200/80 flex items-center justify-between gap-3 max-w-xl">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <PhoneCall className="w-4 h-4 animate-pulse" />
                </span>
                <div className="text-xs truncate">
                  <span className="font-bold text-red-900 block truncate">
                    Emergency Patient Transport Hotline
                  </span>
                  <span className="text-red-700 font-semibold">
                    {CONTACT_INFO.emergencyHotline} (Direct Dispatch)
                  </span>
                </div>
              </div>
              <a
                href={`tel:${CONTACT_INFO.emergencyHotline}`}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shrink-0 shadow-xs"
              >
                Call
              </a>
            </div>

            {/* Trust Assurance Markers */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>100% Direct Field Allocation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Community Projects</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Transparent Annual Audits</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Visual Card Composition */}
          <div className="lg:col-span-5 relative animate-fade-in">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Composition Card */}
              <div className="relative rounded-3xl bg-gradient-to-br from-white via-sky-50/50 to-white p-4 sm:p-5 border border-sky-100 shadow-2xl overflow-hidden">
                
                {/* Hero Showcase Graphical Visual */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-tr from-sky-900 via-sky-800 to-slate-900 flex flex-col justify-between p-5 text-white shadow-inner">
                  {/* Subtle Grid Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                  
                  {/* Top Badges */}
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-sky-200 border border-white/10 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
                      Community Mission
                    </span>
                    <span className="px-3 py-1 bg-red-600/90 backdrop-blur-md rounded-full text-xs font-bold text-white shadow-xs">
                      Active In Field
                    </span>
                  </div>

                  {/* Central Visual Collage Vector */}
                  <div className="relative z-10 my-auto text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-3.5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner">
                      <Users className="w-8 h-8 text-sky-300" />
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      Empowering Lives Locally
                    </h2>
                    <p className="text-xs text-sky-200 max-w-xs mx-auto leading-relaxed">
                      Transforming rural resilience from emergency relief to sustainable self-sufficiency.
                    </p>
                  </div>

                  {/* Bottom Live Progress Bar */}
                  <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-sky-200">2026 Community Reach</span>
                    <span className="text-white font-extrabold tracking-wide">35,000+ People</span>
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
                    <div className="text-lg font-black text-sky-700">1,850+</div>
                    <p className="text-[11px] text-slate-500">Emergency transits</p>
                  </div>

                  {/* Floating Micro-Card 2: Agriculture */}
                  <div className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Sprout className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">Agriculture</span>
                    </div>
                    <div className="text-lg font-black text-emerald-700">15,000+</div>
                    <p className="text-[11px] text-slate-500">Olive trees planted</p>
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
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onOpenDonateModal("Emergency Healthcare & Ambulance")}
                    className="shrink-0 font-bold"
                  >
                    Support
                  </Button>
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
