"use client";

import React from "react";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import WhoWeAreSection from "@/components/about/WhoWeAreSection";
import WhyWeWorkSection from "@/components/about/WhyWeWorkSection";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import AreasOfWorkSection from "@/components/about/AreasOfWorkSection";
import ApproachSection from "@/components/about/ApproachSection";
import CommunityContextSection from "@/components/about/CommunityContextSection";
import CommitmentSection from "@/components/about/CommitmentSection";
import AboutCtaSection from "@/components/about/AboutCtaSection";
import { StackingCard } from "@/components/home/StackingCard";

/**
 * AboutPage with Permanent Responsive Stacking Cards & ScrollReveal Animations
 * Fully synchronized with HomePage design language:
 * - 60px expanded gap on 2-column image/text layouts
 * - Smooth "See More" toggle on complex text
 * - Bi-directional ScrollReveal animations (Right-to-Left headings, Bottom-to-Top text, Top-to-Bottom cards)
 * - Layered card deck stacking with sticky positioning
 */
export default function AboutPage() {
  return (
    <div className="relative w-full">
      {/* 1. ABOUT US HERO SECTION */}
      <StackingCard order={1} cardAppearance={false} className="bg-surface-container-lowest">
        <AboutHeroSection />
      </StackingCard>

      {/* 2. WHO WE ARE WITH COMMUNITY LEADERSHIP CAROUSEL */}
      <StackingCard order={2} className="bg-stone-white">
        <WhoWeAreSection />
      </StackingCard>

      {/* 3. WHY WE WORK (OUR PURPOSE) */}
      <StackingCard order={3} className="bg-stone-white">
        <WhyWeWorkSection />
      </StackingCard>

      {/* 4. MISSION & VISION */}
      <StackingCard order={4} className="bg-surface">
        <MissionVisionSection />
      </StackingCard>

      {/* 5. CORE VALUES */}
      <StackingCard order={5} className="bg-surface-container-lowest">
        <CoreValuesSection />
      </StackingCard>

      {/* 6. WHAT WE WORK ON (OUR AREAS OF WORK) */}
      <StackingCard order={6} className="bg-stone-white">
        <AreasOfWorkSection />
      </StackingCard>

      {/* 7. OUR APPROACH TO COMMUNITY DEVELOPMENT */}
      <StackingCard order={7} className="bg-surface">
        <ApproachSection />
      </StackingCard>

      {/* 8. UNDERSTANDING LOCAL NEEDS (COMMUNITY CONTEXT) */}
      <StackingCard order={8} className="bg-stone-white">
        <CommunityContextSection />
      </StackingCard>

      {/* 9. OUR COMMITMENT */}
      <StackingCard order={9} className="bg-surface-container-lowest">
        <CommitmentSection />
      </StackingCard>

      {/* 10. CALL TO ACTION */}
      <StackingCard order={10} className="bg-primary">
        <AboutCtaSection />
      </StackingCard>
    </div>
  );
}
