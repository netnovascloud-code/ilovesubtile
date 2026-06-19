// Next.js instrumentation hook — loads the right Sentry init per runtime.
// Requires experimental.instrumentationHook in next.config (Next 14).
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

// Captures errors thrown in nested React Server Components (Next 15+; harmless on 14).
export { captureRequestError as onRequestError } from "@sentry/nextjs";
