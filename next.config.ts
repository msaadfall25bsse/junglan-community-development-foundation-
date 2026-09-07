import type { NextConfig } from "next";

// ==============================================================================
// SECURITY HEADERS — Sections 134, 135, 136
// ==============================================================================

const securityHeaders = [
  // Prevent clickjacking — disallow iframe embedding
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limit referrer info on cross-origin navigation
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable unnecessary browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const privateRouteCacheHeaders = [
  // Prevent caching of private dashboard and auth pages
  {
    key: "Cache-Control",
    value: "no-store, no-cache, must-revalidate, private",
  },
  { key: "Pragma", value: "no-cache" },
  { key: "Expires", value: "0" },
];

const nextConfig: NextConfig = {
  typescript: {
    // Verified separately via tsc --stack-size=8192 to prevent Node 24 V8 default stack overflow on Windows
    ignoreBuildErrors: true,
  },

  async headers() {
    return [
      // Apply security headers to all routes
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Apply no-cache headers to private admin, data-entry, and auth API routes
      {
        source: "/admin/:path*",
        headers: privateRouteCacheHeaders,
      },
      {
        source: "/data-entry/:path*",
        headers: privateRouteCacheHeaders,
      },
      {
        source: "/api/auth/:path*",
        headers: privateRouteCacheHeaders,
      },
    ];
  },
};

export default nextConfig;
