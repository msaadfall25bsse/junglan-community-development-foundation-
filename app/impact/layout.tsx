import React from "react";
import type { Metadata } from "next";
import Header from "@/components/ui/layout/Header";
import Footer from "@/components/ui/layout/Footer";

export const metadata: Metadata = {
  title: "Impact & Audits | Junglan Community Development Foundation (JCDF)",
  description:
    "Explore Junglan Community Development Foundation's verified impact metrics, transparency records, operational resources, and audited governance pipelines.",
};

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background antialiased font-body-md text-body-md selection:bg-secondary-container selection:text-on-secondary-fixed overflow-x-hidden">
      {/* Universal Header */}
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
