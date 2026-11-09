import React from "react";
import type { Metadata } from "next";
import Header from "@/components/ui/layout/Header";
import Footer from "@/components/ui/layout/Footer";

export const metadata: Metadata = {
  title: "Donate & Support Fund | Junglan Community Development Foundation",
  description:
    "Official donation page for Junglan Community Development Foundation (SECP CUIN: 0348227). Support emergency healthcare transit, high-altitude olive agroforestry, and rural development in Hazara Division.",
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-white text-on-surface font-body-md antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Universal Website Header */}
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      {/* Universal Website Footer */}
      <Footer />
    </div>
  );
}

