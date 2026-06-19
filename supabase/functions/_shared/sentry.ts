// Minimal Sentry error capture for Deno Edge Functions — no SDK, just a POST to
// Sentry's store endpoint. INERT unless SENTRY_DSN is set, so this ships ready to
// activate (set the secret in Supabase → errors start flowing). Best-effort:
// never throws, never blocks the response. Imported by both the Deno functions
// and the Node test suite (tests/sentry-edge.test.ts), so the real code is tested.

export type EdgeErrorContext = {
  /** Which Edge Function threw (becomes the `function` tag / server_name). */
  fn: string;
  /** Authenticated user id, if any (no PII beyond the id). */
  userId?: string | null;
  /** Request shape — route/method only, never the body/PII. */
  request?: { method?: string; route?: string };
  /** Optional business message (e.g. "negative credit balance detected"). */
  message?: string;
};

/** Parse a Sentry DSN into the store URL + public key. Returns null if invalid. */
export function parseDsn(dsn: string): { url: string; key: string } | null {
  try {
    const u = new URL(dsn);
    const key = u.username;
    const projectId = u.pathname.replace(/^\/+/, "");
    if (!key || !projectId) return null;
    return { url: `${u.protocol}//${u.host}/api/${projectId}/store/`, key };
  } catch {
    return null;
  }
}

function envDsn(): string {
  // Present in Deno (Edge Functions); undefined in Node tests (DSN passed in).
  const d = (globalThis as { Deno?: { env?: { get?: (k: string) => string | undefined } } }).Deno;
  return d?.env?.get?.("SENTRY_DSN") ?? "";
}

/**
 * Send an exception to Sentry. Returns true if an event was sent. No-ops (false)
 * when there's no DSN. `dsn`/`fetchImpl` are injectable for testing.
 */
export async function captureEdgeException(
  err: unknown,
  ctx: EdgeErrorContext,
  opts: { dsn?: string; fetchImpl?: typeof fetch } = {},
): Promise<boolean> {
  const dsn = opts.dsn ?? envDsn();
  if (!dsn) return false;
  const parsed = parseDsn(dsn);
  if (!parsed) return false;

  const e = err instanceof Error ? err : new Error(typeof err === "string" ? err : "Unknown error");
  const event = {
    event_id: crypto.randomUUID().replace(/-/g, ""),
    timestamp: new Date().toISOString(),
    platform: "javascript",
    level: "error",
    server_name: ctx.fn,
    tags: { function: ctx.fn, ...(ctx.request?.route ? { route: ctx.request.route } : {}) },
    ...(ctx.userId ? { user: { id: ctx.userId } } : {}),
    ...(ctx.message ? { message: ctx.message } : {}),
    exception: { values: [{ type: e.name, value: e.message, ...(e.stack ? { stacktrace: { frames: [] } } : {}) }] },
    extra: { method: ctx.request?.method },
  };

  try {
    const res = await (opts.fetchImpl ?? fetch)(parsed.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Sentry-Auth": `Sentry sentry_version=7, sentry_client=konver-edge/1.0, sentry_key=${parsed.key}`,
      },
      body: JSON.stringify(event),
    });
    return res.ok;
  } catch {
    return false; // monitoring must never break the function it monitors
  }
}
