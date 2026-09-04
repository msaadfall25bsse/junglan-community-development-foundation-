"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Heart,
  Users,
  Target,
  Compass,
  Building,
  Scale,
  Award,
} from "lucide-react";
import { Button, Badge, SectionHeader } from "@/components/ui";

interface AboutSectionProps {
  onOpenDonateModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenDonateModal }) => {
  return (
    <section
      id="about"
      aria-label="About Junglan Community Development Foundation"
      className="py-16 sm:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          tag="Our Foundation & Identity"
          tagIcon={<Compass className="w-3.5 h-3.5" />}
          title="Who We Are & What We Stand For"
          subtitle="Junglan Community Development Foundation is a grassroots non-governmental organization established to empower vulnerable rural communities through emergency health transit, sustainable agriculture, and long-term socio-economic self-reliance."
        />

        {/* 3 Core Philosophical Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          
          {/* Card 1: Who are we? */}
          <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 transition-all hover:shadow-lg flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors shadow-2xs">
                <Users className="w-6 h-6" />
              </div>
              <Badge variant="info" className="mb-2">Foundation Identity</Badge>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">Who Are We?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We are a community-led foundation governed by local community elders, healthcare workers, and agricultural specialists. We partner directly with underserved rural villages to solve fundamental life challenges with dignity and long-term vision.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-200/70 flex items-center gap-2 text-xs font-semibold text-sky-700">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Grassroots community governance</span>
            </div>
          </div>

          {/* Card 2: What do we believe? */}
          <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 transition-all hover:shadow-lg flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors shadow-2xs">
                <Target className="w-6 h-6" />
              </div>
              <Badge variant="info" className="mb-2">Our Methodology</Badge>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">What Do We Believe?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We believe true community resilience requires both immediate emergency safeguards (such as 24/7 patient transport) and generational economic catalysts (such as commercial olive orchards and clean water infrastructure).
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-200/70 flex items-center gap-2 text-xs font-semibold text-sky-700">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Sustainable, multifaceted empowerment</span>
            </div>
          </div>

          {/* Card 3: Why do we exist? */}
          <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 transition-all hover:shadow-lg flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors shadow-2xs">
                <Heart className="w-6 h-6" />
              </div>
              <Badge variant="danger" className="mb-2">Humanitarian Purpose</Badge>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">Why Do We Exist?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We exist because geographic isolation and financial hardship should never prevent a rural family from receiving emergency medical care during labor, trauma, or critical illness. Every human life deserves prompt care and opportunity.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-200/70 flex items-center gap-2 text-xs font-semibold text-red-700">
              <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
              <span>Universal dignity, equity & healthcare access</span>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Institutional Integrity Grid */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our 4 Pillars of Institutional Integrity
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Every decision, expenditure, and field program adheres strictly to these institutional commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">1. Grassroots Ownership</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Local village councils directly identify, prioritize, and monitor all development initiatives.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">2. 100% Direct Allocation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every donated rupee goes straight to field operational costs with published quarterly financial statements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">3. Sustainable Catalysts</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Programs are structured to build productive assets (e.g. olive groves) that generate ongoing local wealth.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">4. Zero-Barrier Service</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Emergency ambulance dispatch and medical transit are provided unconditionally without fee for the impoverished.
              </p>
            </div>
          </div>
        </div>

        {/* Institutional Credibility & Stewardship Strip */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-950 via-sky-900 to-slate-950 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl border border-sky-900">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Community Non-Profit Governance</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Transparent, Audited, and Accountable to the Public
            </h4>
            <p className="text-xs sm:text-sm text-sky-200 max-w-2xl leading-relaxed">
              Our governing board comprises respected local educators, physicians, and civic organizers. All donations are accounted for with full documentation and quarterly field reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link href="/#projects">
              <Button
                variant="secondary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4 text-sky-700" />}
                className="bg-white text-slate-900 hover:bg-sky-50"
              >
                Explore Projects
              </Button>
            </Link>

            <Button
              variant="danger"
              size="md"
              onClick={onOpenDonateModal}
              leftIcon={<Heart className="w-4 h-4 fill-white" />}
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

export default AboutSection;
