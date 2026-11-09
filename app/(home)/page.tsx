"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import MetricsSection from "@/components/home/MetricsSection";
import AboutOriginSection from "@/components/home/AboutOriginSection";
import WorkPillarsSection from "@/components/home/WorkPillarsSection";
import GeographicChallengeSection from "@/components/home/GeographicChallengeSection";
import AuditPipelineSection from "@/components/home/AuditPipelineSection";
import HealthcareSection from "@/components/home/HealthcareSection";
import { AgroforestrySection } from "@/components/home/AgroforestrySection";
import { EngagementCtaSection } from "@/components/home/EngagementCtaSection";
import { StackingCard } from "@/components/home/StackingCard";

/**
 * HomePage with Permanent Responsive Stacking Cards
 * Each section stays sticky at the top, sliding over the previous section like a deck of cards.
 * Fully optimized for Desktop, Tablet, and Mobile viewports.
 */
export default function HomePage() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="inline-defs-container"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      ></svg>

      <div className="relative w-full">
        {/* 1. CIVIC HERO SECTION (Base Card) */}
        <StackingCard order={1} cardAppearance={false} className="bg-[#FDFBF7]">
          <HeroSection />
        </StackingCard>

        {/* 2. KEY METRICS OF VERIFIED FIELD DATA */}
        <StackingCard order={2} className="bg-[#00162d]">
          <MetricsSection />
        </StackingCard>

        {/* 3. FOUNDATION ORIGIN & SACRED MISSION */}
        <StackingCard order={3} className="bg-surface">
          <AboutOriginSection />
        </StackingCard>

        {/* 4. CORE WORK PILLARS */}
        <StackingCard order={4} className="bg-surface-container-lowest">
          <WorkPillarsSection />
        </StackingCard>

        {/* 5. TOPOGRAPHIC REALITY & THE GEOGRAPHIC CHALLENGE */}
        <StackingCard order={5} className="bg-surface">
          <GeographicChallengeSection />
        </StackingCard>

        {/* 6. TRANSPARENCY & 4-STEP AUDIT PIPELINE */}
        <StackingCard order={6} className="bg-surface-container-lowest">
          <AuditPipelineSection />
        </StackingCard>

        {/* 7. DETAILED SECTION: EMERGENCY HEALTHCARE & AMBULANCE FLEET */}
        <StackingCard order={7} className="bg-surface">
          <HealthcareSection />
        </StackingCard>

        {/* 8. DETAILED SECTION: SUSTAINABLE OLIVE AGROFORESTRY */}
        <StackingCard order={8} className="bg-surface-container-lowest">
          <AgroforestrySection />
        </StackingCard>

        {/* 9. COMMUNITY ENGAGEMENT & DONATION INQUIRY CTA */}
        <StackingCard order={9} className="bg-navy-deep">
          <EngagementCtaSection />
        </StackingCard>
      </div>
    </>
  );
}
