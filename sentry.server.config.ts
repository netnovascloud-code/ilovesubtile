// Sentry — Node server runtime init (loaded by instrumentation.ts). Inert in dev
// and without a DSN. Reads SENTRY_DSN (server secret) or falls back to the public one.
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  enabled: !!dsn && process.env.NODE_ENV === "production",
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
