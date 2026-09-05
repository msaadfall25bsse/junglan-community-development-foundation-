import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://junglanfoundation.org";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/data-entry", "/data-entry/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
