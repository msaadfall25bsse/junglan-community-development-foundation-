"use client";

import React from "react";
import ImpactHeroSection from "@/components/Impact/ImpactHeroSection";
import AboutImpactSection from "@/components/Impact/AboutImpactSection";
import ImpactReachGlanceSection from "@/components/Impact/ImpactReachGlanceSection";
import PracticalInitiativesSection from "@/components/Impact/PracticalInitiativesSection";
import TransparencyRecordsSection from "@/components/Impact/TransparencyRecordsSection";
import OperationalResourcesSection from "@/components/Impact/OperationalResourcesSection";
import VerificationTrustSection from "@/components/Impact/VerificationTrustSection";
import DocumentationCultureSection from "@/components/Impact/DocumentationCultureSection";
import OrganizationalReportingSection from "@/components/Impact/OrganizationalReportingSection";
import AuditReportsAccessSection from "@/components/Impact/AuditReportsAccessSection";
import AccountabilityResponsibilitySection from "@/components/Impact/AccountabilityResponsibilitySection";
import ImpactCtaSection from "@/components/Impact/ImpactCtaSection";
import { StackingCard } from "@/components/home/StackingCard";

/**
 * Impact & Audits Page (100% exact parity with impact.html)
 * Modularized clean components located in @/components/Impact/
 * Integrated with:
 * - Permanent responsive Stacking Cards system
 * - Clean visual hierarchy & 10 UI/UX modern design approaches
 * - Responsive mobile & desktop layout
 */
export default function ImpactPage() {
  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <StackingCard order={1} cardAppearance={false} className="bg-surface-bright">
        <ImpactHeroSection />
      </StackingCard>

      {/* 2. INTRODUCTION & COMMITMENT */}
      <StackingCard order={2} className="bg-surface-container-lowest">
        <AboutImpactSection />
      </StackingCard>

      {/* 3. AT A GLANCE REACH */}
      <StackingCard order={3} className="bg-surface">
        <ImpactReachGlanceSection />
      </StackingCard>

      {/* 4. PRACTICAL INITIATIVES */}
      <StackingCard order={4} className="bg-surface-container-lowest">
        <PracticalInitiativesSection />
      </StackingCard>

      {/* 5. TRANSPARENT RECORDS */}
      <StackingCard order={5} className="bg-surface">
        <TransparencyRecordsSection />
      </StackingCard>

      {/* 6. OPERATIONAL RESOURCES */}
      <StackingCard order={6} className="bg-surface-container-lowest">
        <OperationalResourcesSection />
      </StackingCard>

      {/* 7. VERIFICATION & TRUST */}
      <StackingCard order={7} className="bg-surface">
        <VerificationTrustSection />
      </StackingCard>

      {/* 8. DOCUMENTATION CULTURE */}
      <StackingCard order={8} className="bg-surface-container-lowest">
        <DocumentationCultureSection />
      </StackingCard>

      {/* 9. ORGANIZATIONAL REPORTING */}
      <StackingCard order={9} className="bg-surface">
        <OrganizationalReportingSection />
      </StackingCard>

      {/* 10. ACCESS AUDIT & ORGANIZATIONAL REPORTS */}
      <StackingCard order={10} className="bg-surface-container-lowest">
        <AuditReportsAccessSection />
      </StackingCard>

      {/* 11. ACCOUNTABILITY RESPONSIBILITY */}
      <StackingCard order={11} className="bg-surface">
        <AccountabilityResponsibilitySection />
      </StackingCard>

      {/* 12. IMPACT CTA */}
      <StackingCard order={12} className="bg-primary-container text-surface-container-lowest">
        <ImpactCtaSection />
      </StackingCard>
    </div>
  );
}

