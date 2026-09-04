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
  title: "Junglan Community Development Foundation | Building Stronger Communities",
  description:
    "Junglan Community Development Foundation is a nonprofit dedicated to sustainable community empowerment through healthcare initiatives, modern olive agriculture, and long-term community development projects.",
  keywords: [
    "Junglan Community Development Foundation",
    "Community Development",
    "Nonprofit Foundation",
    "Healthcare Ambulance Project",
    "Sustainable Olive Agriculture",
    "Zaitoon Project",
    "Charity",
    "Humanitarian Aid",
    "Donations",
  ],
  authors: [{ name: "Junglan Community Development Foundation" }],
  openGraph: {
    title: "Junglan Community Development Foundation",
    description:
      "Building stronger communities and creating lasting impact through healthcare, sustainable agriculture, and community development.",
    type: "website",
    locale: "en_US",
    siteName: "Junglan Community Development Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Junglan Community Development Foundation",
    description:
      "Empowering communities with healthcare accessibility, agricultural sustainability, and long-term development.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-white text-slate-900 selection:bg-sky-100 selection:text-sky-900">
        {children}
      </body>
    </html>
  );
}
