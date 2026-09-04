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
  MapPin,
} from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { CONTACT_INFO } from "@/lib/constants/navigation";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";

interface HeroSectionProps {
  onOpenDonateModal: (project?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDonateModal }) => {
  return (
    <section
      id="hero"
      aria-label="Welcome and Mission Overview"
      className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-28 text-white"
    >
      {/* 1. Cinematic Background Video & Multi-layer Overlay */}
      <HeroBackgroundVideo
        videoSrc="/videos/hero-sunup.mp4"
        fallbackVideoSrc="/videos/hero-clouds.mp4"
        posterSrc="/images/hero-poster.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Mission Narrative & Fundraising CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left animate-fade-in">
            
            {/* Mission Category Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="sky" pulseDot>
                Community Development & Humanitarian NGO
              </Badge>
              <Badge variant="danger" dot>
                24/7 Rural Ambulance Fleet Active
              </Badge>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-sky-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 backdrop-blur-md">
                <MapPin className="w-3 h-3 text-sky-400" />
                Junglan, Abbottabad
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-md">
              Building Stronger Communities,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-teal-300">
                Creating Lasting Impact
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed font-normal drop-shadow-xs">
              Junglan Community Development Foundation empowers underserved rural valleys through practical, high-impact interventions in{" "}
              <strong className="text-white font-bold">24/7 emergency health transit</strong>,{" "}
              <strong className="text-white font-bold">sustainable olive agriculture</strong>, and{" "}
              <strong className="text-white font-bold">community self-sufficiency</strong>.
            </p>

            {/* 3 Core Pillar Cards with Glassmorphism */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/75 border border-white/15 backdrop-blur-md shadow-lg hover:border-sky-400/60 hover:bg-slate-900/90 transition-all group">
                <div className="w-10 h-10 bg-sky-500/20 text-sky-300 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-sky-400/30">
                  <Ambulance className="w-5 h-5 text-sky-300" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-white">Healthcare</div>
                  <div className="text-sky-200/80">24/7 Ambulance Fleet</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/75 border border-white/15 backdrop-blur-md shadow-lg hover:border-emerald-400/60 hover:bg-slate-900/90 transition-all group">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-300 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-emerald-400/30">
                  <Sprout className="w-5 h-5 text-emerald-300" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-white">Agriculture</div>
                  <div className="text-emerald-200/80">15,000+ Olive Trees</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/75 border border-white/15 backdrop-blur-md shadow-lg hover:border-indigo-400/60 hover:bg-slate-900/90 transition-all group">
                <div className="w-10 h-10 bg-indigo-500/20 text-indigo-300 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-indigo-400/30">
                  <Building2 className="w-5 h-5 text-indigo-300" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-white">Development</div>
                  <div className="text-indigo-200/80">Rural Infrastructure</div>
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
                className="shadow-xl shadow-red-600/40 cursor-pointer text-base font-black border-red-500"
              >
                Donate to Field Missions
              </Button>

              <Link href="/#projects" className="inline-flex">
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-md shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Explore Our Projects</span>
                  <ArrowRight className="w-4 h-4 text-sky-300" />
                </button>
              </Link>
            </div>

            {/* Emergency Hotline Banner under CTAs */}
            <div className="p-3 rounded-2xl bg-red-950/80 border border-red-800/80 backdrop-blur-md flex items-center justify-between gap-3 max-w-xl shadow-lg">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <PhoneCall className="w-4 h-4 animate-pulse" />
                </span>
                <div className="text-xs truncate">
                  <span className="font-bold text-red-200 block truncate">
                    Emergency Patient Transport Dispatch Hotline
                  </span>
                  <span className="text-white font-extrabold text-sm">
                    {CONTACT_INFO.emergencyHotline} (24/7 Response)
                  </span>
                </div>
              </div>
              <a
                href={`tel:${CONTACT_INFO.emergencyHotline}`}
                className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shrink-0 shadow-md flex items-center gap-1"
              >
                <span>Call Dispatch</span>
              </a>
            </div>

            {/* Trust Assurance Markers */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>100% Direct Field Allocation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Community Projects</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Transparent Annual Audits</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Visual Card Composition */}
          <div className="lg:col-span-5 relative animate-fade-in">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Composition Card with Frosted Glass */}
              <div className="relative rounded-3xl bg-slate-900/80 border border-white/20 p-4 sm:p-5 shadow-2xl backdrop-blur-xl overflow-hidden">
                
                {/* Hero Showcase Graphical Visual */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-tr from-sky-950 via-slate-900 to-sky-900 flex flex-col justify-between p-5 text-white shadow-inner border border-white/10">
                  {/* Subtle Grid Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />
                  
                  {/* Top Badges */}
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-sky-200 border border-white/15 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
                      Community Mission
                    </span>
                    <span className="px-3 py-1 bg-red-600 backdrop-blur-md rounded-full text-xs font-bold text-white shadow-xs">
                      Active In Field
                    </span>
                  </div>

                  {/* Central Visual Collage Vector */}
                  <div className="relative z-10 my-auto text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-3.5 bg-white/15 rounded-2xl backdrop-blur-md border border-white/25 shadow-inner">
                      <Users className="w-8 h-8 text-sky-300" />
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      Empowering Lives Locally
                    </h2>
                    <p className="text-xs text-sky-200 max-w-xs mx-auto leading-relaxed">
                      Transforming rural resilience from emergency relief to sustainable self-sufficiency in Abbottabad district.
                    </p>
                  </div>

                  {/* Bottom Live Progress Bar */}
                  <div className="relative z-10 pt-2 border-t border-white/15 flex items-center justify-between text-xs">
                    <span className="text-sky-200">2026 Community Reach</span>
                    <span className="text-white font-extrabold tracking-wide">35,000+ People</span>
                  </div>
                </div>

                {/* Floating Micro-Cards */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  
                  {/* Floating Micro-Card 1: Healthcare */}
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-sm hover:bg-white/15 transition-all">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 border border-sky-400/30">
                        <Ambulance className="w-4 h-4 text-sky-300" />
                      </div>
                      <span className="text-xs font-bold text-white">Healthcare</span>
                    </div>
                    <div className="text-lg font-black text-sky-300">1,850+</div>
                    <p className="text-[11px] text-slate-300">Emergency transits</p>
                  </div>

                  {/* Floating Micro-Card 2: Agriculture */}
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-sm hover:bg-white/15 transition-all">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
                        <Sprout className="w-4 h-4 text-emerald-300" />
                      </div>
                      <span className="text-xs font-bold text-white">Agriculture</span>
                    </div>
                    <div className="text-lg font-black text-emerald-300">15,000+</div>
                    <p className="text-[11px] text-slate-300">Olive trees planted</p>
                  </div>

                </div>

                {/* Quick Impact Contribution Prompt */}
                <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-sky-600/90 to-sky-700/90 border border-sky-400/30 text-white flex items-center justify-between shadow-md backdrop-blur-md">
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
                    className="shrink-0 font-bold shadow-md"
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
