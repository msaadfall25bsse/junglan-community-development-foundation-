"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

interface MetricCardData {
  category: string;
  icon: string;
  value: string;
  description: string;
  badgeIcon: string;
  badgeText: string;
  accentColor: string;
  badgeBorderColor: string;
  badgeBgColor: string;
  badgeTextColor: string;
  bgImageUrl: string;
  bgImageAlt: string;
}

const METRICS_DATA: MetricCardData[] = [
  {
    category: "Emergency Evacuations",
    icon: "ambulance",
    value: "462",
    description: "Critical patients safely transported in 2.5 years (maternity, trauma, cardiac).",
    badgeIcon: "verified",
    badgeText: "Logged in Dispatch Register",
    accentColor: "#ef4444",
    badgeBorderColor: "border-red-500/30",
    badgeBgColor: "bg-red-500/15",
    badgeTextColor: "text-red-400",
    bgImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDw4BkN-FvKCwKlRRua2XMaGjBOw_zYQAHyN7RuJDALBbE3l97_h3vp7dtUnlDA375DQ0pyn-rbofYsFX5s80SCxOhRgRsoyUmPsoQpc5d9Ut-RI1H7l3-4nKafOUhNOUWX399iQyJ0lUjSJPQhI8iOl4SZSS82Ckhr_Gx7FlWdA9KMwAKBMQMvprcp7N-yh5VLrnZLBlK2RQ0siAFNzf7fCV289n1oeoG6Qn050VS5ojSIjSJfoRzlad-GvrHhyZ4j1w",
    bgImageAlt: "24/7 Emergency Hospital and Ambulance Transit",
  },
  {
    category: "Core Settlements",
    icon: "location_city",
    value: "4",
    description: "Core mountain villages served continuously, plus 15+ surrounding isolated hamlets.",
    badgeIcon: "terrain",
    badgeText: "Hazara High-Altitude",
    accentColor: "#34d399",
    badgeBorderColor: "border-emerald-500/30",
    badgeBgColor: "bg-emerald-500/15",
    badgeTextColor: "text-emerald-400",
    bgImageUrl: "/metric-settlements.jpg",
    bgImageAlt: "High-altitude mountain settlement terraced terrain in Janglan",
  },
  {
    category: "Ambulance Unit",
    icon: "emergency",
    value: "1",
    description: "Dedicated mountain unit (AMB-01, oxygen-equipped, 24/7 mountain driver).",
    badgeIcon: "check_circle",
    badgeText: "100% Free for Needy",
    accentColor: "#38bdf8",
    badgeBorderColor: "border-sky-500/30",
    badgeBgColor: "bg-sky-500/15",
    badgeTextColor: "text-sky-400",
    bgImageUrl: "/metric-ambulance.jpg",
    bgImageAlt: "24/7 Emergency response and mountain patient transit",
  },
  {
    category: "Fiduciary Audit",
    icon: "receipt_long",
    value: "100%",
    description: "Transparent stewardship verified against bank receipts and field ledgers.",
    badgeIcon: "policy",
    badgeText: "SECP Reg. CUIN 0348227",
    accentColor: "#a3e635",
    badgeBorderColor: "border-lime-500/30",
    badgeBgColor: "bg-lime-500/15",
    badgeTextColor: "text-lime-400",
    bgImageUrl: "/metric-fiduciary.jpg",
    bgImageAlt: "Field audits and institutional transparency ledgers",
  },
];

function MetricCardItem({ metric }: { metric: MetricCardData }) {
  return (
    <div className="relative group w-[280px] xs:w-[300px] sm:w-[320px] md:w-[340px] shrink-0 h-[260px] sm:h-[280px] rounded-2xl overflow-hidden ui-maximalist select-none transition-all duration-300">
      {/* Background Image Layer:
          - Uses object-cover with object-center to anchor from center
          - Enhanced zoom (scale-125 sm:scale-135) to physically expand image to reach the extreme bottom of the card
          - Covers 100% of the entire card including behind the footer
      */}
      <img
        src={metric.bgImageUrl}
        alt={metric.bgImageAlt}
        className="absolute inset-0 w-full h-full object-cover object-center scale-125 sm:scale-135 group-hover:scale-145 transition-transform duration-700 ease-out pointer-events-none"
      />

      {/* Ultra-subtle, uniform translucent shade for readability so the background image remains clearly vivid and visible across the entire card down to the bottom */}
      <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-500 pointer-events-none" />

      {/* Card Content Layer */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-col justify-between h-full bg-transparent">
        {/* Top Header Row */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className="text-[10px] sm:text-xs uppercase font-label-uppercase font-bold tracking-wider truncate drop-shadow-md"
              style={{ color: metric.accentColor }}
            >
              {metric.category}
            </span>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-md border border-white/20 shadow-sm"
              style={{ backgroundColor: `${metric.accentColor}35` }}
            >
              <span
                className="material-symbols-outlined text-[18px] sm:text-[20px]"
                style={{ color: metric.accentColor }}
              >
                {metric.icon}
              </span>
            </div>
          </div>

          {/* Metric Value */}
          <div
            className="text-3xl sm:text-4xl md:text-stat-display font-stat-display font-extrabold tracking-tight leading-none my-1 drop-shadow-md"
            style={{ color: metric.accentColor }}
          >
            {metric.value}
          </div>

          {/* Metric Description */}
          <p className="text-[12px] sm:text-[13px] text-white mt-2 leading-relaxed font-body-sm line-clamp-2 drop-shadow-md font-semibold">
            {metric.description}
          </p>
        </div>

        {/* Footer Verification Area: Completely transparent and borderless/glass so the bottom of the image is 100% visible */}
        <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between bg-transparent">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide backdrop-blur-md border ${metric.badgeBorderColor} ${metric.badgeBgColor} ${metric.badgeTextColor} shadow-sm`}
          >
            <span className="material-symbols-outlined text-[14px] shrink-0">
              {metric.badgeIcon}
            </span>
            <span className="truncate">{metric.badgeText}</span>
          </div>

          <span className="material-symbols-outlined text-white text-[18px] group-hover:translate-x-0.5 transition-transform drop-shadow">
            arrow_forward
          </span>
        </div>
      </div>
    </div>
  );
}

export function MetricsSection() {
  return (
    <section className="py-8 sm:py-12 md:py-14 bg-surface-container-lowest border-b border-stone-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
          <ScrollReveal variant="heading" delay={100} className="space-y-1">
            <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider text-[10px] sm:text-[11px] font-bold">
              Field Operational Verification
            </span>
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-headline-md font-headline-md text-primary font-semibold tracking-tight">
              Measurable Progress Across Janglan Valley
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <div className="text-body-sm font-body-sm text-on-surface-variant max-w-md text-xs sm:text-sm leading-relaxed">
              Field data updated on monthly accounting cycle • 100% verified against bank receipts and emergency dispatch trip logs.
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Infinite Moving Marquee (Right-to-Left Continuous Smooth Motion)
          Works on all screens (Desktop, Tablet, Mobile) with hover-pause
      */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge fades for professional polish */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-surface-container-lowest to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-surface-container-lowest to-transparent z-20" />

        <div className="animate-marquee-metrics flex gap-4 sm:gap-5 px-4">
          {/* First loop of cards */}
          {METRICS_DATA.map((metric, idx) => (
            <MetricCardItem key={`loop1-${idx}`} metric={metric} />
          ))}
          {/* Second loop of cards for seamless infinite right-to-left transition */}
          {METRICS_DATA.map((metric, idx) => (
            <MetricCardItem key={`loop2-${idx}`} metric={metric} />
          ))}
          {/* Third loop for ultra-wide monitor seamlessly loop */}
          {METRICS_DATA.map((metric, idx) => (
            <MetricCardItem key={`loop3-${idx}`} metric={metric} />
          ))}
          {/* Fourth loop */}
          {METRICS_DATA.map((metric, idx) => (
            <MetricCardItem key={`loop4-${idx}`} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MetricsSection;
