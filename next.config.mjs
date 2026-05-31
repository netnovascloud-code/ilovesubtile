/** @type {import('next').NextConfig} */

// Content-Security-Policy — fitted to the actual dependency surface used by
// the in-browser tools so they keep working. Highlights:
//   • 'wasm-unsafe-eval'   : FFmpeg.wasm, pdf-lib, @imgly background removal
//   • esm.sh + unpkg.com   : ESM-CDN-loaded libs (jsQR, JsBarcode, zxing,
//                            pdfjs, @imgly, mammoth) via webpackIgnore
//   • blob: + worker-src   : FFmpeg.wasm Web Workers
//   • *.supabase.co        : auth, storage, edge functions, storage CDN
//   • checkout/billing.stripe.com / m.stripe.network : Stripe Checkout iframe
//   • api.frankfurter.dev  : currency-converter live rates
//   • api.pwnedpasswords.com : HaveIBeenPwned k-anonymity check on signup
//   • api.mistral.ai       : reachable only from edge functions (server-side),
//                            kept in connect-src for completeness.
//   • *.ezoic.net / *.ezojs.com / *.ezoic.com : Ezoic display ads (sa.min.js
//                            is loaded in the root layout and serves ad frames).
//   • 'unsafe-inline' on script-src is required for Next.js' inline hydration
//     boot scripts in 14.x; nonce-based CSP would need an app-wide refactor.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://esm.sh https://unpkg.com https://*.supabase.co https://checkout.stripe.com https://js.stripe.com https://m.stripe.network https://www.ezojs.com https://*.ezojs.com https://*.ezoic.net https://*.ezoic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https: *.supabase.co",
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
  "connect-src 'self' blob: https://*.supabase.co https://esm.sh https://unpkg.com https://api.frankfurter.dev https://api.pwnedpasswords.com https://api.mistral.ai https://checkout.stripe.com https://*.ezoic.net https://*.ezojs.com",
  "frame-src 'self' https://checkout.stripe.com https://js.stripe.com https://hooks.stripe.com https://billing.stripe.com https://*.ezoic.net",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://checkout.stripe.com",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig = {
  reactStrictMode: true,
  // Transpile @ffmpeg/ffmpeg so Webpack processes its
  // `new Worker(new URL("./worker.js", import.meta.url))` and emits the worker
  // chunk — without this the FFmpeg API worker never loads and every audio/
  // video conversion fails with "Conversion failed: undefined".
  transpilePackages: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
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
