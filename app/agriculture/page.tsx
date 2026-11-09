"use client";

import React from "react";
import AgricultureHeroSection from "@/components/Agriculture/AgricultureHeroSection";
import AboutAgricultureSection from "@/components/Agriculture/AboutAgricultureSection";
import AgricultureFocusAreasSection from "@/components/Agriculture/AgricultureFocusAreasSection";
import MountainFarmingChallengesSection from "@/components/Agriculture/MountainFarmingChallengesSection";
import ClimateSmartAgricultureSection from "@/components/Agriculture/ClimateSmartAgricultureSection";
import NurseryDevelopmentSection from "@/components/Agriculture/NurseryDevelopmentSection";
import SupportingLocalFarmersSection from "@/components/Agriculture/SupportingLocalFarmersSection";
import AgriculturalRoadmapSection from "@/components/Agriculture/AgriculturalRoadmapSection";
import AgriculturalImpactMetricsSection from "@/components/Agriculture/AgriculturalImpactMetricsSection";
import AgricultureGallerySection from "@/components/Agriculture/AgricultureGallerySection";
import WhyAgricultureMattersSection from "@/components/Agriculture/WhyAgricultureMattersSection";
import AgricultureCtaSection from "@/components/Agriculture/AgricultureCtaSection";
import { StackingCard } from "@/components/home/StackingCard";

/**
 * Agriculture & Rural Development Page (100% exact parity with agriculture.html)
 * Modularized clean components located in @/components/Agriculture/
 * Integrated with:
 * - Permanent responsive Stacking Cards system
 * - Bi-directional ScrollReveal animations
 * - Expandable "See More" toggles on complex copy
 * - 3D Interactive Flip Buttons (1s delay navigation)
 * - 10 UI/UX modern design enhancements
 */
export default function AgriculturePage() {
  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <StackingCard order={1} cardAppearance={false} className="bg-surface-bright">
        <AgricultureHeroSection />
      </StackingCard>

      {/* 2. ABOUT OUR AGRICULTURAL WORK */}
      <StackingCard order={2} className="bg-surface">
        <AboutAgricultureSection />
      </StackingCard>

      {/* 3. OUR AGRICULTURAL FOCUS AREAS */}
      <StackingCard order={3} className="bg-surface-bright">
        <AgricultureFocusAreasSection />
      </StackingCard>

      {/* 4. AGRICULTURAL CHALLENGES */}
      <StackingCard order={4} className="bg-surface">
        <MountainFarmingChallengesSection />
      </StackingCard>

      {/* 5. CLIMATE-SMART AGRICULTURE */}
      <StackingCard order={5} className="bg-surface-bright">
        <ClimateSmartAgricultureSection />
      </StackingCard>

      {/* 6. NURSERY & SAPLING DEVELOPMENT */}
      <StackingCard order={6} className="bg-surface">
        <NurseryDevelopmentSection />
      </StackingCard>

      {/* 7. SUPPORTING LOCAL FARMERS */}
      <StackingCard order={7} className="bg-surface-bright">
        <SupportingLocalFarmersSection />
      </StackingCard>

      {/* 8. OUR AGRICULTURAL ROADMAP */}
      <StackingCard order={8} className="bg-surface">
        <AgriculturalRoadmapSection />
      </StackingCard>

      {/* 9. OUR COMMUNITY IMPACT */}
      <StackingCard order={9} className="bg-surface-bright">
        <AgriculturalImpactMetricsSection />
      </StackingCard>

      {/* 10. AGRICULTURE GALLERY */}
      <StackingCard order={10} className="bg-surface">
        <AgricultureGallerySection />
      </StackingCard>

      {/* 11. WHY AGRICULTURAL DEVELOPMENT MATTERS */}
      <StackingCard order={11} className="bg-surface-bright">
        <WhyAgricultureMattersSection />
      </StackingCard>

      {/* 12. FINAL CALL TO ACTION */}
      <StackingCard order={12} className="bg-[#1b4332]">
        <AgricultureCtaSection />
      </StackingCard>
    </div>
  );
}

