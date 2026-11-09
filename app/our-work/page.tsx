"use client";

import React from "react";
import OurWorkHeroSection from "@/components/our work/OurWorkHeroSection";
import WorkOverviewSection from "@/components/our work/WorkOverviewSection";
import AmbulanceProgramSection from "@/components/our work/AmbulanceProgramSection";
import AgricultureProgramSection from "@/components/our work/AgricultureProgramSection";
import FutureInitiativesSection from "@/components/our work/FutureInitiativesSection";
import OurWorkCtaSection from "@/components/our work/OurWorkCtaSection";
import { StackingCard } from "@/components/home/StackingCard";

/**
 * Our Work Page (Verbatim parity with work.html)
 * Modularized clean components located in @/components/our work/
 * Integrated with:
 * - Permanent responsive Stacking Cards system
 * - Bi-directional ScrollReveal animations
 * - 60px expanded layout gaps
 * - Expandable "See More" toggles on complex copy
 * - 3D Interactive Flip Buttons (1s delay navigation)
 */
export default function OurWorkPage() {
  return (
    <div className="relative w-full">
      {/* 1. OUR WORK HERO SECTION */}
      <StackingCard order={1} cardAppearance={false} className="bg-surface-container-lowest">
        <OurWorkHeroSection />
      </StackingCard>

      {/* 2. THE AREAS WE WORK IN (OVERVIEW) */}
      <StackingCard order={2} className="bg-surface">
        <WorkOverviewSection />
      </StackingCard>

      {/* 3. AMBULANCE & PATIENT TRANSPORTATION (VERBATIM DETAIL & FINANCIALS) */}
      <StackingCard order={3} className="bg-surface-container-lowest">
        <AmbulanceProgramSection />
      </StackingCard>

      {/* 4. AGRICULTURE & RURAL DEVELOPMENT */}
      <StackingCard order={4} className="bg-surface">
        <AgricultureProgramSection />
      </StackingCard>

      {/* 5. FUTURE DEVELOPMENT INITIATIVES */}
      <StackingCard order={5} className="bg-surface-container-lowest">
        <FutureInitiativesSection />
      </StackingCard>

      {/* 6. COMMUNITY-FOCUSED CALL TO ACTION */}
      <StackingCard order={6} className="bg-surface">
        <OurWorkCtaSection />
      </StackingCard>
    </div>
  );
}
