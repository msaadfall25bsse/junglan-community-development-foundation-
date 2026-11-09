"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function FutureInitiativesSection() {
  return (
    <section className="py-16 md:py-20 bg-surface-container-lowest border-b border-stone-border" id="future-initiatives">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <ScrollReveal variant="card" delay={100}>
          <div className="ui-claymorphic relative overflow-hidden bg-surface-container-low rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-status-planned text-label-uppercase font-bold border border-amber-200">
                  <span className="w-2 h-2 rounded-full bg-status-planned"></span>
                  Planned Initiative
                </span>
                <span className="text-xs text-outline font-medium">In Pipeline Scoping</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary font-semibold">
                Future Development Initiatives
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                JCDF’s future development priorities may include construction-related initiatives as plans and project details are confirmed. This section communicates verified information about the purpose, scope, and progress of those initiatives.
              </p>
            </div>
            <div className="flex-shrink-0">
              <FlipButton
                href="#contact"
                variant="outline"
                frontText="Learn More"
                backText="Opening Details..."
                icon="info"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default FutureInitiativesSection;

