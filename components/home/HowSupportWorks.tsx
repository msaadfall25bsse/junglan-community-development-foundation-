"use client";

import React from "react";
import {
  Heart,
  ShieldCheck,
  Hammer,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  PieChart,
  ArrowRight,
  Receipt,
  Users,
} from "lucide-react";
import { IMPACT_FLOW } from "@/data/homepage-data";
import { Button, Badge, SectionHeader } from "@/components/ui";

interface HowSupportWorksProps {
  onOpenDonateModal: () => void;
}

const iconStepMap: Record<string, React.ElementType> = {
  Heart: Heart,
  ShieldCheck: ShieldCheck,
  Hammer: Hammer,
  TrendingUp: TrendingUp,
};

export const HowSupportWorks: React.FC<HowSupportWorksProps> = ({ onOpenDonateModal }) => {
  return (
    <section
      id="impact-flow"
      aria-label="How Support Works and Donor Transparency"
      className="py-16 sm:py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeader
          tag="Accountability & Stewardship"
          tagIcon={<Sparkles className="w-3.5 h-3.5 text-red-500" />}
          title="How Your Support Translates to Verified Impact"
          subtitle="We adhere to a closed-loop transparency protocol. Every donated rupee is ring-fenced for direct operational expenditures — from ambulance fuel and vehicle upkeep to olive sapling distribution and drip irrigation hardware."
          align="center"
        />

        {/* 4-Step Visual Flow Diagram */}
        <div className="relative mb-16">
          {/* Connecting Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-1 bg-gradient-to-r from-sky-200 via-sky-400 to-emerald-400 -translate-y-8 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
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
                      <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-100 group-hover:bg-sky-600 group-hover:text-white transition-colors shadow-2xs">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-black text-sky-200 group-hover:text-sky-500 transition-colors">
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

                  <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Phase {index + 1} Audited</span>
                    </span>
                    <span className="text-slate-400">100% Verified</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Financial Transparency & Fund Allocation Breakdown Strip */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 md:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 5 cols: Narrative */}
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100/80 px-2.5 py-1 rounded-full">
                <PieChart className="w-3.5 h-3.5 text-sky-600" />
                <span>Audited Fund Allocation</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Where Does Your Funding Go?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We believe trust is earned through radical transparency. Our administrative expenses are subsidized by founding members, ensuring that public donations are strictly channeled to frontline needs.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Receipt className="w-3.5 h-3.5 text-sky-600" />
                  Instant Digital Receipts
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  Local Council Oversight
                </span>
              </div>
            </div>

            {/* Right 7 cols: Allocation Bars */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Bar 1: Field operations */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                    Direct Field Operations (Ambulance fuel, fleet maintenance, olive saplings, drip hardware)
                  </span>
                  <span className="text-sky-700 font-extrabold text-sm">85%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-600 rounded-full w-[85%]" />
                </div>
              </div>

              {/* Bar 2: Training */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    Community Training & First Responder Capacity (Technicians, soil experts, village health workers)
                  </span>
                  <span className="text-emerald-700 font-extrabold text-sm">10%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full w-[10%]" />
                </div>
              </div>

              {/* Bar 3: Independent Auditing */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Independent Annual Auditing, Compliance & Legal Transparency
                  </span>
                  <span className="text-amber-700 font-extrabold text-sm">5%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[5%]" />
                </div>
              </div>

              {/* Zero-Waste Callout */}
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  0% Corporate Lavishness or Inflated Bureaucracy
                </span>
                <Badge variant="success">Guaranteed</Badge>
              </div>

            </div>

          </div>
        </div>

        {/* Transparency Pledge CTA Card */}
        <div className="rounded-3xl bg-gradient-to-br from-sky-900 via-sky-800 to-slate-900 p-6 sm:p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-300">
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>100% Donor Transparency Pledge</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Ready to create permanent, measurable change?
            </h4>
            <p className="text-xs sm:text-sm text-sky-200 max-w-2xl leading-relaxed">
              Join hundreds of community supporters who are providing lifelines for rural families in Abbottabad. Every dollar is tracked, verified, and reported back to you.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Button
              variant="danger"
              size="lg"
              onClick={onOpenDonateModal}
              leftIcon={<Heart className="w-4 h-4 fill-white" />}
              rightIcon={<ArrowRight className="w-4 h-4 ml-0.5" />}
              className="shadow-lg shadow-red-600/30"
            >
              Support Our Mission
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowSupportWorks;
