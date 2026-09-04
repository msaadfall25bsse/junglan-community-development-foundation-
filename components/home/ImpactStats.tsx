"use client";

import React from "react";
import { Users, Ambulance, Sprout, HeartHandshake, ShieldCheck } from "lucide-react";
import { IMPACT_STATS } from "@/data/homepage-data";

const iconMap = {
  Users: Users,
  Ambulance: Ambulance,
  Sprout: Sprout,
  HeartHandshake: HeartHandshake,
  Building2: HeartHandshake,
};

export const ImpactStats: React.FC = () => {
  return (
    <section className="relative z-10 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl border border-sky-100 p-6 sm:p-8 md:p-10">
        
        {/* Header trust subline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-6 border-b border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span className="font-semibold text-slate-700">Verified Impact & Field Performance</span>
            <span className="text-slate-400">•</span>
            <span>Audited Period: 2024 – 2026</span>
          </div>
          <div className="text-sky-700 font-medium">
            100% Community-Driven Outcomes
          </div>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {IMPACT_STATS.map((stat) => {
            const IconComponent = iconMap[stat.iconName] || Users;

            return (
              <div
                key={stat.id}
                className="group relative flex flex-col justify-between p-4 rounded-2xl bg-sky-50/40 hover:bg-sky-50 transition-colors border border-sky-100/60"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-sky-700 shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 bg-sky-100/80 px-2 py-0.5 rounded-full">
                    Field Data
                  </span>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                    <span className="text-sky-600 font-bold">{stat.suffix}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-1">
                    {stat.label}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
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
