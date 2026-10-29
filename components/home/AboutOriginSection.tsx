"use client";

import React, { useState } from "react";
import Link from "next/link";

export function AboutOriginSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-surface border-b border-stone-border overflow-hidden" id="about-origin">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Increased gap between images and text by 40px to 50px (gap-12 lg:gap-20 xl:gap-24) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 xl:gap-24 items-center">
          {/* 3-Image Mosaic Column (Left) */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {/* Main Community Card */}
            <div className="relative rounded-2xl overflow-hidden border border-stone-border shadow-md bg-[#0b1b3d] group">
              <div className="relative aspect-[595/418] overflow-hidden">
                <img
                  alt="Community solidarity paper cutouts holding hands"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="/community-paper-cutouts.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-3 sm:bottom-4 left-3.5 sm:left-4 right-3.5 sm:right-4 text-white">
                  <div className="text-[10px] sm:text-xs text-secondary-fixed uppercase font-label-uppercase tracking-wider font-bold">
                    Grassroots Unity
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-surface">
                    Building Resilience Shoulder-to-Shoulder
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 2 Image Cards */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              <div className="relative rounded-xl overflow-hidden border border-stone-border shadow-sm bg-[#121926] group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    alt="Mountain summit sunrise celebrating community silhouettes"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="/shared-hope-summit.png"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center gap-1.5 text-white text-[10px] sm:text-xs font-semibold tracking-wide">
                    <span className="material-symbols-outlined text-xs sm:text-sm text-secondary-fixed">wb_sunny</span>
                    <span className="truncate">Shared Hope &amp; Vision</span>
                  </div>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-stone-border shadow-sm bg-[#131d27] group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    alt="Hazara mountain valley landscape around Janglan base camp"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="/junglan-valley-terrain.png"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center gap-1.5 text-white text-[10px] sm:text-xs font-semibold tracking-wide">
                    <span className="material-symbols-outlined text-xs sm:text-sm text-secondary-fixed">landscape</span>
                    <span className="truncate">Janglan Valley Terrain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Narrative Content Column */}
          <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-5">
            <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider text-xs font-bold">
              Foundation Introduction &amp; Origin
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary tracking-tight leading-tight font-bold">
              Rooted in Community, Dedicated to Mountain Life
            </h2>

            {/* Shortened, Concise Core Content */}
            <div className="space-y-3 text-on-surface-variant text-sm sm:text-body-md font-body-md leading-relaxed">
              <p>
                Janglan Community Development Foundation delivers free emergency medical transit and sustainable development to remote mountain villages across Hazara Division, KP.
              </p>

              <p className="border-l-2 border-secondary pl-3.5 sm:pl-4 text-primary font-medium bg-surface-container-low/60 py-2 rounded-r-lg">
                Born from personal tragedy, our pledge is absolute: no family in Janglan Valley should ever lose a loved one due to lack of timely emergency transport.
              </p>

              {/* Animated Expandable Narrative with Smooth Transitions */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden space-y-3 text-on-surface-variant">
                  <p className="pt-1">
                    The foundation’s inception stems from heartbreak: the founder’s brother, a bright pre-medical student, tragically lost his life following an accident because emergency transport could not reach him in time over the rugged, unpaved mountain trails.
                  </p>
                  <p>
                    Today, JCDF operates not only as a rapid 24/7 emergency medical lifeline, but also as a civic engine establishing permanent agricultural wealth through commercial olive agroforestry.
                  </p>
                </div>
              </div>
            </div>

            {/* Animated Read More Action Button & Full Story Link */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Interactive Read More Toggle Button with Ripple & Icon Animation */}
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-surface font-label-md text-label-md font-semibold overflow-hidden shadow-sm hover:shadow-md hover:bg-navy-deep active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {/* Subtle animated glowing shine effect across button on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

                <span className="relative z-10">
                  {isExpanded ? "Show Less" : "Read More"}
                </span>

                <span
                  className={`material-symbols-outlined text-[18px] relative z-10 transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : "group-hover:translate-y-0.5"
                  }`}
                >
                  keyboard_arrow_down
                </span>
              </button>

              {/* Learn About Our Mission Link */}
              <Link
                href="/about"
                className="group inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-border bg-stone-white text-primary font-label-md text-label-md font-semibold hover:bg-surface-container-low transition-colors"
              >
                <span>About Our Mission</span>
                <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Institutional Values Grid - Beautiful Professional Cards with Relevant Background Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-3 border-t border-stone-border">
              {/* Card 1: Direct Grassroots Service */}
              <div className="relative group rounded-xl overflow-hidden border border-white/20 shadow-md hover:shadow-xl transition-all duration-300 p-4 flex items-start gap-3.5 select-none min-h-[92px]">
                {/* Background Image: Grassroots community gathering & village jirga in mountain terrain */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKeq26xvxwo2QtsXHflibW5xFM2DAIIwjdwIcTGMiAUxSizwq63f2Gs4SIeeCXO79D43R6i-OaLM2vT7GEAzUj0Ejolc3OVigk_flLY3g0zb7APuHdOHjKmQ7SCtxi5KIilMlxDMDBNJgOxRwC14zOagAIPxJ8OwJE5rdDVLwJOBYquoDihbqlyoDNap1POQS47sk6d_Z2n_kDc8j17UkgJYk2ksrOyOVH-JVZlo2mWny2ArSsyU8Mo2mhb23v-ADT-g"
                  alt="Direct Grassroots community consultation and village jirga in Janglan"
                  className="absolute inset-0 w-full h-full object-cover object-center scale-110 group-hover:scale-120 transition-transform duration-700 ease-out pointer-events-none"
                />
                {/* Translucent Dark Gradient Overlay for optimal text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/65 group-hover:via-black/70 transition-colors duration-500 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 flex items-start gap-3 w-full">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-md bg-white/15 border border-white/20 shadow-sm text-secondary-fixed">
                    <span className="material-symbols-outlined text-2xl">account_balance</span>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-sm">
                      Direct Grassroots Service
                    </h4>
                    <p className="text-xs sm:text-[13px] text-slate-200 mt-0.5 leading-snug drop-shadow-sm font-medium">
                      Working shoulder-to-shoulder with village jirgas and smallholders.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Audited Governance */}
              <div className="relative group rounded-xl overflow-hidden border border-white/20 shadow-md hover:shadow-xl transition-all duration-300 p-4 flex items-start gap-3.5 select-none min-h-[92px]">
                {/* Background Image: Institutional leadership, transparent governance and audit ledger */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuASbl218rw6F8qnPCszluLItlrNKEIWTmj2M-Y_eKx8iZVN7HTc8-6DcBuYIj15lsGneZt_7hPO4D88oVA8fRa9P_Al--M4z7OLTcuZqlow1TF4lBc8e1HkqTrcrtKYkbRLGiHkDOgavj0uMUrTXXA5aapBvez83nbh0RlqcYKbiLB45CqdkTRcQGkdqD9m_MOwCEi5trIhkXMhPeNTTxTazUmyuJ23CpEiQrtx10QbawvzOmqjrJkxx3ly1cMWRKAjQw"
                  alt="Audited Governance documentation and SECP compliance"
                  className="absolute inset-0 w-full h-full object-cover object-center scale-110 group-hover:scale-120 transition-transform duration-700 ease-out pointer-events-none"
                />
                {/* Translucent Dark Gradient Overlay for optimal text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/65 group-hover:via-black/70 transition-colors duration-500 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 flex items-start gap-3 w-full">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-md bg-white/15 border border-white/20 shadow-sm text-secondary-fixed">
                    <span className="material-symbols-outlined text-2xl">gavel</span>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-sm">
                      Audited Governance
                    </h4>
                    <p className="text-xs sm:text-[13px] text-slate-200 mt-0.5 leading-snug drop-shadow-sm font-medium">
                      Strict statutory compliance under SECP registration CUIN 0348227.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutOriginSection;
