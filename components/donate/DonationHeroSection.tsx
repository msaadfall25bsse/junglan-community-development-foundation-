"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

const IMPACT_TIERS = [
  {
    amount: "5,000",
    label: "Fuel & Oxygen Pack",
    category: "Emergency Transit",
    desc: "Directly powers 2 emergency mountain ambulance journeys from isolated hamlets to Mansehra DHQ.",
    icon: "local_gas_station",
    tag: "Urgent Relief",
  },
  {
    amount: "15,000",
    label: "High-Altitude Saplings",
    category: "Sustainable Agriculture",
    desc: "Provides 50 certified graft olive cultivars, irrigation piping, and soil enrichment to smallholder families.",
    icon: "park",
    tag: "Ecosystem Wealth",
  },
  {
    amount: "35,000",
    label: "Ambulance Mountain Overhaul",
    category: "4x4 Fleet Maintenance",
    desc: "Funds brake pad replacements, suspension reinforcement, and severe gradient tires for Bolan rescue fleet.",
    icon: "build",
    tag: "Life-Saving Fleet",
  },
  {
    amount: "75,000",
    label: "Community Health & Nursery",
    category: "Valley Infrastructure",
    desc: "Equips village paramedical emergency jump-kits and expands cold-climate olive nursery terracing.",
    icon: "health_and_safety",
    tag: "Permanent Impact",
  },
];

export function DonationHeroSection() {
  const [selectedAmount, setSelectedAmount] = useState<string>("15,000");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [activeCause, setActiveCause] = useState<string>("ALL");

  return (
    <section className="relative bg-surface-bright pt-[30px] pb-[44px] lg:pt-[54px] lg:pb-[54px] border-b border-stone-border overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <ScrollReveal variant="card" delay={50}>
            <div className="ui-skeuomorphic-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-secondary/20 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-label-uppercase text-label-uppercase text-secondary font-bold uppercase tracking-wider text-xs">
                SECP CUIN: 0348227 • DIRECT ALLOCATION
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="heading" delay={150}>
            <h1 className="text-2xl sm:text-3xl md:text-headline-xl font-headline-xl text-primary tracking-tight font-semibold leading-tight">
              Direct Community Stewardship. Tangible Mountain Relief.
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="text" delay={200}>
            <p className="font-body-lg text-xs sm:text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Every single rupee contributed to Junglan Community Development Foundation is deployed directly on field frontlines—powering emergency life-saving ambulance fuel, oxygen cylinders, and high-altitude olive cultivars.
            </p>
          </ScrollReveal>

          {/* Quick Pillar Filter */}
          <ScrollReveal variant="text" delay={250}>
            <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
              {[
                { id: "ALL", label: "General Mountain Relief", icon: "all_inclusive" },
                { id: "HEALTHCARE", label: "Ambulance & Emergency Fuel", icon: "ambulance" },
                { id: "AGRO", label: "Olive Agroforestry Nursery", icon: "eco" },
              ].map((cause) => (
                <button
                  key={cause.id}
                  onClick={() => setActiveCause(cause.id)}
                  type="button"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    activeCause === cause.id
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-surface-container-lowest text-on-surface-variant border-stone-border hover:border-primary/40"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{cause.icon}</span>
                  <span>{cause.label}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* 4 Impact Transparency Tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-8">
          {IMPACT_TIERS.map((tier, idx) => {
            const isSelected = selectedAmount === tier.amount;
            return (
              <ScrollReveal key={tier.amount} variant="card" delay={150 + idx * 75}>
                <div
                  onClick={() => {
                    setSelectedAmount(tier.amount);
                    setCustomAmount("");
                  }}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-full ui-spatial-card group ${
                    isSelected
                      ? "bg-gradient-to-br from-emerald-50/70 via-white to-blue-50/30 border-secondary ring-2 ring-secondary/20 shadow-sm"
                      : "bg-surface-container-lowest border-stone-border hover:border-primary/40 shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-surface border border-stone-border/70 text-on-surface-variant font-label-uppercase">
                        {tier.tag}
                      </span>
                      <span className="material-symbols-outlined text-base text-secondary">{tier.icon}</span>
                    </div>

                    <div className="flex items-baseline gap-1 my-1">
                      <span className="text-xs font-semibold text-secondary">PKR</span>
                      <span className="text-xl sm:text-2xl font-bold text-primary">{tier.amount}</span>
                    </div>

                    <h2 className="text-xs sm:text-sm font-semibold text-primary mt-1">
                      {tier.label}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-on-surface-variant mt-1.5 leading-relaxed font-body-sm">
                      {tier.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-border/60 flex items-center justify-between text-[11px]">
                    <span className="text-on-surface-variant font-medium">{tier.category}</span>
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        isSelected ? "text-secondary" : "text-primary group-hover:text-secondary"
                      }`}
                    >
                      <span>{isSelected ? "Selected" : "Choose"}</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default DonationHeroSection;

