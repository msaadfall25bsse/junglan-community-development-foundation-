"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Heart, Users, Target, Compass } from "lucide-react";

interface AboutSectionProps {
  onOpenDonateModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenDonateModal }) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Tag */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            <span>Our Foundation & Identity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Who We Are
          </h2>
          <p className="mt-3 text-lg text-slate-600 leading-relaxed">
            Junglan Community Development Foundation is a non-governmental community foundation established to empower vulnerable communities through sustainable, multifaceted development programs.
          </p>
        </div>

        {/* 3 Core Questions & Answer Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Who are we? */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 transition-all hover:shadow-lg flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Foundation Identity</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">Who Are We?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We are a grassroots community foundation driven by local leaders, volunteers, and humanitarian donors. We partner directly with underserved villages to tackle fundamental life challenges with dignity and long-term vision.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-sky-700">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Community-rooted governance</span>
            </div>
          </div>

          {/* Card 2: What do we believe? */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 transition-all hover:shadow-lg flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Our Core Values</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">What Do We Believe?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We believe true community development requires both immediate emergency safeguards (like medical transit) and generational economic catalysts (like sustainable agriculture and infrastructure).
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-sky-700">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Holistic, multifaceted empowerment</span>
            </div>
          </div>

          {/* Card 3: Why do we exist? */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 transition-all hover:shadow-lg flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Our Mission Purpose</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">Why Do We Exist?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We exist because geographic isolation and economic poverty should never prevent human beings from receiving lifesaving medical care or building sustainable livelihoods for their children.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-sky-700">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Dignity, equity & self-reliance</span>
            </div>
          </div>

        </div>

        {/* Visual Callout & Learn More strip */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span>Committed to Transparent Stewardship</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Learn how we implement our projects on the ground
            </h4>
            <p className="text-xs sm:text-sm text-sky-200 max-w-xl">
              Discover our field methodology, community councils, and upcoming five-year development masterplan.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="#projects"
              className="px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-sky-50 font-bold text-sm transition-all flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 text-sky-700" />
            </Link>

            <button
              onClick={onOpenDonateModal}
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Support Us</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
