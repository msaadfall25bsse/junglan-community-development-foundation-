import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field Data Entry Operations | Junglan Community Development Foundation",
  description: "Operational logging desk for ambulance dispatches, fuel vouchers, and patient records.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DataEntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
