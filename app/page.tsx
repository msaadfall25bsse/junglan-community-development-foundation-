import React from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { ImpactStats } from "@/components/home/ImpactStats";
import { AboutSection } from "@/components/home/AboutSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { DonationImpactFlow } from "@/components/home/DonationImpactFlow";
import { HealthcareSection } from "@/components/home/HealthcareSection";
import { AgricultureSection } from "@/components/home/AgricultureSection";
import { WhereWeWorkSection } from "@/components/home/WhereWeWorkSection";
import { NewsSection } from "@/components/home/NewsSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

export default function HomePage() {
  return (
    <PublicLayout>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Impact Statistics */}
      <ImpactStats />

      {/* 3. About Foundation */}
      <AboutSection />

      {/* 4. Projects Showcase */}
      <ProjectsSection />

      {/* 5. Donation Impact Flow (Transparency Process) */}
      <DonationImpactFlow />

      {/* 6. Healthcare & Ambulance Spotlight */}
      <HealthcareSection />

      {/* 7. Agriculture & Olive Cultivation Spotlight */}
      <AgricultureSection />

      {/* 8. Where We Work (Operational Hubs) */}
      <WhereWeWorkSection />

      {/* 9. Latest News & Field Dispatches */}
      <NewsSection />

      {/* 10. Final Call to Action */}
      <FinalCTASection />
    </PublicLayout>
  );
}
