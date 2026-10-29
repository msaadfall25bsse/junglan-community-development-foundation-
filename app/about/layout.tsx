import React from "react";
import Header from "@/components/ui/layout/Header";
import Footer from "@/components/ui/layout/Footer";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-white text-on-surface font-body-md antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Universal Header (from components/layout/Navbar) */}
      <Header />
      <main className="flex-1 flex flex-col about-page-wrapper">{children}</main>
      {/* Universal Footer (from components/layout/Footer) */}
      <Footer />
    </div>
  );
}
