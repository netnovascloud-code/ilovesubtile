// Sentry — browser/client init. Loaded by withSentryConfig (Next 14).
// Inert in development and whenever no DSN is configured, so it never pollutes
// Sentry with local noise. The DSN is public by design (client-side).
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  enabled: !!dsn && process.env.NODE_ENV === "production",
  environment: process.env.NODE_ENV,
  // Performance traces at a low rate; errors are always captured.
  tracesSampleRate: 0.1,
  // No Session Replay — errors only (smaller bundle, no extra privacy surface).
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
});
