import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Governance & Operations | Junglan Foundation",
  description: "Executive administrative dashboard for foundation management and oversight.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
