/** @type {import('next').NextConfig} */

// Security headers applied to every route. Notes:
// - frame-ancestors 'none' + X-Frame-Options DENY → clickjacking protection.
// - Permissions-Policy allows camera only on same-origin (the QR-code reader
//   uses getUserMedia); microphone/geolocation are denied everywhere.
// - We deliberately do NOT set a restrictive Content-Security-Policy script-src:
//   the in-browser tools load WASM + workers from esm.sh / unpkg (FFmpeg,
//   @imgly, pdfjs, jsQR, JsBarcode, zxing) and use blob: workers + wasm-eval,
//   which a strict CSP would break. frame-ancestors is set on its own so we
//   still get clickjacking protection without risking the tools.
const securityHeaders = [
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    typedRoutes: false,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
