"use client";

import React from "react";
import AmbulanceHeroSection from "@/components/Ambulance Service/AmbulanceHeroSection";
import AboutAmbulanceServiceSection from "@/components/Ambulance Service/AboutAmbulanceServiceSection";
import AmbulanceCapabilitiesSection from "@/components/Ambulance Service/AmbulanceCapabilitiesSection";
import AmbulanceGeographicalChallengeSection from "@/components/Ambulance Service/AmbulanceGeographicalChallengeSection";
import AmbulanceRouteSection from "@/components/Ambulance Service/AmbulanceRouteSection";
import AmbulanceGallerySection from "@/components/Ambulance Service/AmbulanceGallerySection";
import AmbulanceImpactSection from "@/components/Ambulance Service/AmbulanceImpactSection";
import WhyAmbulanceServiceMattersSection from "@/components/Ambulance Service/WhyAmbulanceServiceMattersSection";
import AmbulanceCtaSection from "@/components/Ambulance Service/AmbulanceCtaSection";
import { StackingCard } from "@/components/home/StackingCard";

/**
 * Ambulance Services Page (100% exact parity with index.html)
 * Modularized clean components located in @/components/Ambulance Service/
 * Integrated with:
 * - Permanent responsive Stacking Cards system
 * - Bi-directional ScrollReveal animations
 * - Expandable "See More" toggles on complex copy
 * - 3D Interactive Flip Buttons (1s delay navigation)
 * - 10 UI/UX modern design enhancements
 */
export default function AmbulanceServicePage() {
  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <StackingCard order={1} cardAppearance={false} className="bg-surface-container-lowest">
        <AmbulanceHeroSection />
      </StackingCard>

      {/* 2. ABOUT OUR AMBULANCE SERVICE */}
      <StackingCard order={2} className="bg-surface-container-low">
        <AboutAmbulanceServiceSection />
      </StackingCard>

      {/* 3. OUR AMBULANCE CAPABILITIES */}
      <StackingCard order={3} className="bg-surface-container-lowest">
        <AmbulanceCapabilitiesSection />
      </StackingCard>

      {/* 4. THE GEOGRAPHICAL CHALLENGE */}
      <StackingCard order={4} className="bg-surface-container-low">
        <AmbulanceGeographicalChallengeSection />
      </StackingCard>

      {/* 5. OUR TRANSPORTATION ROUTE */}
      <StackingCard order={5} className="bg-surface-container-lowest">
        <AmbulanceRouteSection />
      </StackingCard>

      {/* 6. OUR AMBULANCE IN ACTION (GALLERY) */}
      <StackingCard order={6} className="bg-surface-container-low">
        <AmbulanceGallerySection />
      </StackingCard>

      {/* 7. OUR IMPACT */}
      <StackingCard order={7} className="bg-surface-container-lowest">
        <AmbulanceImpactSection />
      </StackingCard>

      {/* 8. WHY COMMUNITY TRANSPORTATION SUPPORT MATTERS */}
      <StackingCard order={8} className="bg-surface-container-low">
        <WhyAmbulanceServiceMattersSection />
      </StackingCard>

      {/* 9. EMERGENCY ASSISTANCE & DISPATCH CALL TO ACTION */}
      <StackingCard order={9} className="bg-navy-deep">
        <AmbulanceCtaSection />
      </StackingCard>
    </div>
  );
}

