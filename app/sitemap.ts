import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://junglanfoundation.org";
  const now = new Date();

  // Public Core Routes
  const routes = [
    "",
    "/about",
    "/impact",
    "/where-we-work",
    "/projects",
    "/projects/healthcare-ambulance",
    "/projects/olive-agriculture",
    "/projects/community-infrastructure",
    "/news",
    "/news/emergency-ambulance-milestone",
    "/news/olive-saplings-preparation",
    "/news/annual-transparency-pledge",
    "/reports",
    "/contact",
    "/donate",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1.0 : route === "/donate" ? 0.9 : 0.8,
  }));

  return routes;
}
