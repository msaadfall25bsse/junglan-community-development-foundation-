"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function WhyWeWorkSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className="relative border-b border-stone-border py-20 md:py-32 min-h-[580px] md:min-h-[640px] flex items-center justify-center bg-stone-white overflow-hidden"
      id="why-we-work"
      style={{
        backgroundImage:
          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuABBJaec2OfxSzwp3Uu9SAsUhXYxU0uA-vdOhVv_KVv_XxilA7LqUliqC5lApMxLHjrxotUBh80_n10NWsPIUYgg939B7H2EpgdsAzMTV5mcjvJ1hpZ-x9Ljl4VdWgDrp-nRo2Td4TFxZ76v82_o2CsTpajoqKoZqYgJWlxS9QTpCivX8UjgW6erm7H4RMrLhbqDmMghb8Z1t8lUkSj-0jimZ3AhHqnKjZyoE0ukcXjKvXUAjxxD4ISTRVRAqZDoGyTwA")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-4xl mx-auto px-margin-sm md:px-margin relative z-10 w-full">
        <div className="text-center bg-transparent p-4 sm:p-6">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2.5 font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              OUR DRIVING PURPOSE
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-semibold mb-6 tracking-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              Why We Work
            </h2>
          </ScrollReveal>

          {/* Text with See More Toggle */}
          <ScrollReveal variant="text" delay={200}>
            <div className="font-body-lg text-body-lg text-primary leading-relaxed space-y-4 text-center max-w-3xl mx-auto">
              <p className="font-semibold text-slate-900 leading-relaxed text-base sm:text-lg drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
                Rural and mountain valleys possess tremendous resilience, proud cultural traditions, and hardworking people. However, rugged geography and distance from major urban centers frequently create critical bottlenecks in accessing timely emergency transport.
              </p>

              {/* Expandable hidden narrative */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden space-y-3 pt-1">
                  <p className="font-body-md text-body-md text-slate-800 font-medium leading-relaxed text-sm sm:text-base drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
                    We work because every family in our valley deserves safe, dignity-preserving transit in times of acute medical distress, sustainable agricultural avenues that bring generational income, and well-planned community development that respects local autonomy.
                  </p>
                </div>
              </div>

              {/* Actions & See More Toggle Button */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <FlipButton
                  href="/#work-pillars"
                  variant="primary"
                  frontText="Explore Foundation Pillars"
                  backText="Opening Pillars..."
                  icon="account_balance"
                />
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/90 hover:bg-white text-xs font-bold text-primary shadow-sm border border-stone-border transition-all cursor-pointer focus:outline-none"
                >
                  <span>{isExpanded ? "Show Less" : "See More"}</span>
                  <span
                    className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default WhyWeWorkSection;
