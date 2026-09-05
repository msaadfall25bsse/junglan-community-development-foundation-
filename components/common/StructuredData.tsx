import React from "react";
import { FOUNDATION_INFO } from "@/data/content";

export function OrganizationStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: FOUNDATION_INFO.name,
    alternateName: FOUNDATION_INFO.shortName,
    url: "https://junglanfoundation.org",
    logo: "https://junglanfoundation.org/favicon.ico",
    description: FOUNDATION_INFO.description,
    telephone: FOUNDATION_INFO.hotline,
    email: FOUNDATION_INFO.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Junglan, District Mansehra",
      addressRegion: "Khyber Pakhtunkhwa",
      addressCountry: "PK",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "District Mansehra & Hazara Division, Khyber Pakhtunkhwa, Pakistan",
    },
    nonprofitStatus: "Nonprofit501c3",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: FOUNDATION_INFO.name,
    url: "https://junglanfoundation.org",
    description: FOUNDATION_INFO.tagline,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
