"use client";

import React, { useState } from "react";
import { DonationHero } from "@/components/donate/DonationHero";
import { DonationInteractiveForm } from "@/components/donate/DonationInteractiveForm";
import { DonationCategoriesSection, DONATION_CATEGORIES } from "@/components/donate/DonationCategoriesSection";
import { WhySupportMattersSection } from "@/components/donate/WhySupportMattersSection";
import { DonationImpactOverviewSection } from "@/components/donate/DonationImpactOverviewSection";
import { TransparencyAccountabilitySection } from "@/components/donate/TransparencyAccountabilitySection";
import { DonationFaqSection } from "@/components/donate/DonationFaqSection";
import { DonationAssistanceSection } from "@/components/donate/DonationAssistanceSection";

export default function DonatePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("general");

  const currentCategory =
    DONATION_CATEGORIES.find((c) => c.id === selectedCategory) || DONATION_CATEGORIES[0];

  return (
    <div className="min-h-screen bg-surface">
      {/* 1. Hero Section – Support Our Community */}
      <DonationHero />

      {/* 2. Top Priority: Main Donation Form & Secure Checkout (Amount, Frequency, Donor Info, Payment Channels & Summary) */}
      <DonationInteractiveForm
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryTitle={currentCategory.title}
      />

      {/* 3. Donation Categories / Choose Where to Contribute */}
      <DonationCategoriesSection
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 4. Why Your Support Matters (4 Pillar Cards) */}
      <WhySupportMattersSection />

      {/* 5. Donation Impact Section – Visual Field Reality Cards */}
      <DonationImpactOverviewSection />

      {/* 6. Transparency & Accountability Section */}
      <TransparencyAccountabilitySection />

      {/* 7. Frequently Asked Questions (8 Accordion Items) */}
      <DonationFaqSection />

      {/* 8. Contact & Donation Assistance */}
      <DonationAssistanceSection />
    </div>
  );
}
