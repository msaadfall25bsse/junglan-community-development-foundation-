import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Junglan Community Development Foundation",
    template: "%s | Junglan Community Development Foundation",
  },
  description:
    "Empowering rural and local communities through accessible emergency healthcare, sustainable olive agriculture, and long-term socio-economic development.",
  keywords: [
    "Junglan Community Development Foundation",
    "Nonprofit Healthcare",
    "Emergency Ambulance Service",
    "Sustainable Agriculture",
    "Olive Farming",
    "Community Development",
    "Pakistan Charity",
  ],
  authors: [{ name: "Junglan Community Development Foundation" }],
  openGraph: {
    title: "Junglan Community Development Foundation",
    description:
      "Empowering communities with healthcare accessibility, agricultural sustainability, and transparent stewardship.",
    type: "website",
    locale: "en_US",
    siteName: "Junglan Community Development Foundation",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import {
  OrganizationStructuredData,
  WebsiteStructuredData,
} from "@/components/common/StructuredData";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} scroll-smooth`}
    >
      <head>
        <OrganizationStructuredData />
        <WebsiteStructuredData />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
