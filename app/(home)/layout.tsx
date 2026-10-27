import React from "react";
import Header from "@/components/ui/layout/Header";
import Footer from "@/components/ui/layout/Footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background antialiased font-body-md text-body-md selection:bg-secondary-container selection:text-on-secondary-fixed overflow-x-hidden">
      {/* Universal Header (from components/layout/Navbar) */}
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      {/* Universal Footer (from components/layout/Footer) */}
      <Footer />
    </div>
  );
}
