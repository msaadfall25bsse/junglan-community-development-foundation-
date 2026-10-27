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

export default function AboutPage() {
  return (
    <>
      {/* 1. ABOUT US HERO SECTION */}
      <AboutHeroSection />

      {/* 2. WHO WE ARE WITH COMMUNITY LEADERSHIP CAROUSEL */}
      <WhoWeAreSection />

      {/* 3. WHY WE WORK (OUR PURPOSE) */}
      <WhyWeWorkSection />

      {/* 4. MISSION & VISION */}
      <MissionVisionSection />

      {/* 5. CORE VALUES */}
      <CoreValuesSection />

      {/* 6. WHAT WE WORK ON (OUR AREAS OF WORK) */}
      <AreasOfWorkSection />

      {/* 7. OUR APPROACH TO COMMUNITY DEVELOPMENT */}
      <ApproachSection />

      {/* 8. UNDERSTANDING LOCAL NEEDS (COMMUNITY CONTEXT) */}
      <CommunityContextSection />

      {/* 9. OUR COMMITMENT */}
      <CommitmentSection />

      {/* 10. CALL TO ACTION */}
      <AboutCtaSection />
    </>
  );
}
