"use client";

import React from "react";
import { Users, Ambulance, Sprout, HeartHandshake, ShieldCheck, ArrowUpRight } from "lucide-react";
import { IMPACT_STATS } from "@/data/homepage-data";

const iconMap: Record<string, React.ElementType> = {
  Users: Users,
  Ambulance: Ambulance,
  Sprout: Sprout,
  HeartHandshake: HeartHandshake,
};

const badgeMap: Record<string, string> = {
  "1": "Audited Reach",
  "2": "Active 24/7",
  "3": "Eco Livelihood",
  "4": "Full Transparency",
};

export const ImpactStats: React.FC = () => {
  return (
    <section
      aria-label="Impact Statistics and Verified Metrics"
      className="relative z-10 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white rounded-3xl shadow-xl border border-sky-100 p-6 sm:p-8 md:p-10">
        
        {/* Header trust subline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-100 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 font-bold text-slate-800 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-full text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>Verified Impact & Field Performance</span>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span>Independent Community Audit (2024 – 2026)</span>
          </div>
          <div className="text-sky-700 font-bold flex items-center gap-1">
            <span>100% Public Donation Direct-to-Cause</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACT_STATS.map((stat) => {
            const IconComponent = iconMap[stat.iconName] || Users;
            const badgeLabel = badgeMap[stat.id] || "Field Data";

            return (
              <div
                key={stat.id}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-sky-50/40 hover:bg-sky-50/80 transition-all duration-200 border border-sky-100/70 hover:border-sky-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white text-sky-700 shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform border border-sky-100/50">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 bg-white border border-sky-200 px-2 py-0.5 rounded-full shadow-2xs">
                    {badgeLabel}
                  </span>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {stat.value}
                    <span className="text-sky-600 font-extrabold ml-0.5">{stat.suffix}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-1">
                    {stat.label}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {stat.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
