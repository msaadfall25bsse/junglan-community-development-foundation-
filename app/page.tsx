"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { ImpactStats } from "@/components/home/ImpactStats";
import { AboutSection } from "@/components/home/AboutSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { HowSupportWorks } from "@/components/home/HowSupportWorks";
import { HealthcareProjectSection } from "@/components/home/HealthcareProjectSection";
import { AgricultureProjectSection } from "@/components/home/AgricultureProjectSection";
import { WhereWeWorkSection } from "@/components/home/WhereWeWorkSection";
import { NewsSection } from "@/components/home/NewsSection";
import { FinalDonationCTA } from "@/components/home/FinalDonationCTA";
import { Footer } from "@/components/layout/Footer";
import { DonationModal } from "@/components/common/DonationModal";

export default function HomePage() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState<boolean>(false);
  const [designatedProject, setDesignatedProject] = useState<string>("All Foundation Initiatives");

  const handleOpenDonate = (project?: string) => {
    if (project) {
      setDesignatedProject(project);
    } else {
      setDesignatedProject("All Foundation Initiatives");
    }
    setIsDonationModalOpen(true);
  };

  const handleCloseDonate = () => {
    setIsDonationModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header / Navbar */}
      <Navbar onOpenDonateModal={handleOpenDonate} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection onOpenDonateModal={handleOpenDonate} />

        {/* 3. Trust / Impact Strip */}
        <ImpactStats />

        {/* 4. About The Foundation ("Who We Are") */}
        <AboutSection onOpenDonateModal={() => handleOpenDonate()} />

        {/* 5. Our Projects */}
        <ProjectsSection onOpenDonateModal={handleOpenDonate} />

        {/* 6. How Your Support Makes An Impact */}
        <HowSupportWorks onOpenDonateModal={() => handleOpenDonate()} />

        {/* 7. Featured Healthcare Project */}
        <HealthcareProjectSection onOpenDonateModal={handleOpenDonate} />

        {/* 8. Agriculture / Olive Project Section */}
        <AgricultureProjectSection onOpenDonateModal={handleOpenDonate} />

        {/* 9. Where We Work */}
        <WhereWeWorkSection />

        {/* 10. News & Updates */}
        <NewsSection />

        {/* 11. Final Donation CTA */}
        <FinalDonationCTA onOpenDonateModal={() => handleOpenDonate()} />
      </main>

      {/* 12. Footer */}
      <Footer onOpenDonateModal={handleOpenDonate} />

      {/* Interactive Global Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={handleCloseDonate}
        defaultProject={designatedProject}
      />
    </div>
  );
}
