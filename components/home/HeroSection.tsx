import React from "react";
import Link from "next/link";
import {
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sprout,
  Users,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FOUNDATION_INFO } from "@/data/content";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/80 via-white to-slate-50/50 pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-100">
      {/* Subtle Background Geometric Accents */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-40"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-emerald-100/50 blur-3xl" />
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Supporting Text, and Action Triggers */}
          <div className="lg:col-span-7 text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 text-sky-800 text-xs font-semibold shadow-2xs mb-6">
              <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
              <span>Dedicated Non-Profit Organization • Junglan Valley</span>
            </div>

            {/* Exact Required Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12] mb-6">
              Building Stronger Communities,{" "}
              <span className="text-sky-600 block sm:inline">
                Creating Lasting Impact
              </span>
            </h1>

            {/* Exact Required Supporting Text */}
            <p className="text-base sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal">
              Supporting communities through meaningful projects in healthcare,
              sustainable agriculture and community development.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <Button
                href="/donate"
                variant="primary"
                size="lg"
                leftIcon={<HeartHandshake className="w-5 h-5" />}
                className="shadow-md"
              >
                Donate Now
              </Button>

              <Button
                href="#projects"
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Our Projects
              </Button>
            </div>

            {/* Immediate Trust & Credibility Checklist */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>100% Transparent Use of Funds</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-red-500 shrink-0" />
                <span>Free 24/7 Mountain Ambulance</span>
              </div>
              <div className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sustainable Olive Agriculture</span>
              </div>
            </div>
          </div>

          {/* Right Column: Balanced Visual Presentation (Healthcare & Agriculture) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Feature Composite Card */}
              <div className="rounded-2xl bg-white border border-slate-200 shadow-xl p-6 sm:p-8 relative z-10">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-xs">
                      JCD
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        Junglan Foundation
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Operational Overview
                      </div>
                    </div>
                  </div>
                  <Badge variant="success" dot size="sm">
                    Active Operations
                  </Badge>
                </div>

                {/* Priority Operational Pillars in Composite Card */}
                <div className="py-6 space-y-4">
                  {/* Pillar 1: Healthcare Ambulance */}
                  <Link
                    href="#healthcare"
                    className="group block p-3.5 rounded-xl bg-slate-50 hover:bg-sky-50/70 border border-slate-100 hover:border-sky-200 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-red-100/80 text-red-600 shrink-0">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-sm group-hover:text-sky-700 transition-colors">
                            Emergency Ambulance Fleet
                          </span>
                          <span className="text-[10px] uppercase font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                            24/7 Free
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          High-roof life-support vehicle serving rural mountain hamlets with zero fee for needy patients.
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Pillar 2: Olive Agriculture */}
                  <Link
                    href="#agriculture"
                    className="group block p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-100 hover:border-emerald-200 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                        <Sprout className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                            Olive / Zaitoon Agriculture
                          </span>
                          <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                            Sustainable
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          Commercial olive cultivation and high-yield sapling distribution to establish permanent farmer income.
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Pillar 3: Community Development */}
                  <div className="p-3.5 rounded-xl bg-slate-50/50 border border-dashed border-slate-200">
                    <div className="flex items-start gap-3 opacity-80">
                      <div className="p-2.5 rounded-lg bg-amber-100 text-amber-700 shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800 text-sm">
                            Community Infrastructure
                          </span>
                          <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                            Coming Soon
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Clean drinking water filtration plants and vocational community workshops in planning.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer with Direct Helpline Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`tel:${FOUNDATION_INFO.hotline}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-700 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-red-500" />
                    <span>Emergency Hotline: {FOUNDATION_INFO.hotline}</span>
                  </a>
                  <span className="text-[11px] text-slate-400">
                    Mansehra, KP
                  </span>
                </div>
              </div>

              {/* Decorative Floating Indicator */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 z-20 items-center gap-2 p-3 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 text-xs font-medium">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Empowering 15+ Mountain Villages</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
