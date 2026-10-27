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

export default function HomePage() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="inline-defs-container"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      ></svg>

      {/* 1. CIVIC HERO SECTION */}
      <HeroSection />

      {/* 2. KEY METRICS OF VERIFIED FIELD DATA */}
      <MetricsSection />

      {/* 3. FOUNDATION ORIGIN & SACRED MISSION */}
      <AboutOriginSection />

      {/* 4. CORE WORK PILLARS */}
      <WorkPillarsSection />

      {/* 5. TOPOGRAPHIC REALITY & THE GEOGRAPHIC CHALLENGE */}
      <GeographicChallengeSection />

      {/* 6. TRANSPARENCY & 4-STEP AUDIT PIPELINE */}
      <AuditPipelineSection />

      {/* 7. DETAILED SECTION: EMERGENCY HEALTHCARE & AMBULANCE FLEET */}
      <HealthcareSection />

      {/* 8. DETAILED SECTION: SUSTAINABLE OLIVE AGROFORESTRY */}
      <AgroforestrySection />

      {/* 9. COMMUNITY ENGAGEMENT & DONATION INQUIRY CTA */}
      <EngagementCtaSection />
    </>
  );
}
