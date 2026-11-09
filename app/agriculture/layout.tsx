import React from "react";
import type { Metadata } from "next";
import Header from "@/components/ui/layout/Header";
import Footer from "@/components/ui/layout/Footer";

export const metadata: Metadata = {
  title: "Agriculture & Rural Development — Janglan Community Development Foundation (JCDF)",
  description:
    "Growing sustainable agriculture and strengthening mountain communities through olive agroforestry, nursery development, and climate adaptation in Hazara Division.",
};

export default function AgricultureLayout({
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
