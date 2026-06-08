/** @type {import('next').NextConfig} */

// Content-Security-Policy is set per-request in middleware.ts with a fresh
// nonce + 'strict-dynamic' instead of 'unsafe-inline'. The other security
// headers below are static and apply to every response via next.config.mjs.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
  // 2 years + includeSubDomains + preload → eligible for the browser HSTS
  // preload list (hstspreload.org). Pin protects against the first-visit
  // SSL-strip vector even before the first request to konvertools.com.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig = {
  reactStrictMode: true,
  // Standalone output produces a minimal Node server in .next/standalone/
  // (~50 MB instead of ~500 MB with full node_modules). Required for the
  // Docker build and any non-Vercel host (Coolify, Railway, Render, Fly,
  // Cloud Run, a plain VPS, …). Vercel ignores this flag, so previews still
  // work unchanged.
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    typedRoutes: false,
    // Tree-shake icon imports so we don't ship the whole lucide-react index per
    // page (123 import statements across the repo). Saves ~30-50 kB on shared.
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
