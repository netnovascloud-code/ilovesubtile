// Transactional email sender (Resend). Hardened against abuse:
//   • Service-role calls (from webhooks): unrestricted, can send to any address.
//   • User-token calls: only allowed for the `welcome` template, and only when
//     `to` matches the authenticated caller's own email (case-insensitive).
//   • All other user-token combinations → 403 forbidden.
//   • Anonymous calls (no Authorization at all) → 401.
//
// This prevents the previous abuse vector where any signed-in user could send
// arbitrary emails from the sender address to any recipient.
//
// Deploy: supabase functions deploy send-email
// Secrets: RESEND_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
// Optional: RESEND_FROM (sender, e.g. "Konvertools <no-reply@konvertools.com>").
//   Whatever you use must be a VERIFIED domain/sender in your Resend account,
//   otherwise Resend returns 422 and the send fails.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "https://konvertools.com",
  "Vary": "Origin",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });
}

const TEMPLATES = {
  welcome: (data: { name?: string }) => ({
    subject: "Welcome to Konvertools 👋",
    html: `<p>Hi ${data.name ?? "there"}, welcome to Konvertools.</p>
<p>You're on the Free plan: a few AI runs per day, files up to 20&nbsp;MB. Try the
<a href="https://konvertools.com/subtitle-generator">subtitle generator</a> to get started.</p>`,
  }),
  "job-done": (data: { url?: string; tool?: string }) => ({
    subject: "Your file is ready",
    html: `<p>Your ${data.tool ?? "result"} is ready.</p>
<p><a href="${data.url}">Download it here</a> (link expires in 1 hour).</p>`,
  }),
  upgrade: (data: { plan?: string }) => ({
    subject: `Welcome to ${data.plan?.toUpperCase() ?? "PRO"} 🎉`,
    html: `<p>Your ${data.plan ?? "Pro"} subscription is active. Enjoy unlimited runs and no ads.</p>`,
  }),
  "renewal-reminder": (data: { dueDate?: string }) => ({
    subject: "Your subscription renews soon",
    html: `<p>Your Konvertools subscription renews on ${data.dueDate}. Manage it from your dashboard.</p>`,
  }),
} as const;

/** True for templates a regular signed-in user is allowed to trigger. */
const USER_ALLOWED_TEMPLATES = new Set<string>(["welcome"]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) return json({ error: "missing_resend_key" }, { status: 500 });
  const supaUrl = Deno.env.get("SUPABASE_URL");
  const anon = Deno.env.get("SUPABASE_ANON_KEY");
  const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supaUrl || !anon || !service) return json({ error: "server_error" }, { status: 500 });

  const authz = req.headers.get("Authorization") ?? "";
  if (!authz) return json({ error: "unauthorized" }, { status: 401 });
  const token = authz.replace(/^Bearer\s+/i, "").trim();

  // Service-role caller? (Used by webhooks / internal flows.) Unrestricted.
  const isService = token === service;

  let callerEmail: string | null = null;
  let callerId: string | null = null;
  if (!isService) {
    try {
      const c = createClient(supaUrl, anon, { global: { headers: { Authorization: authz } } });
      const { data } = await c.auth.getUser();
      if (!data.user) return json({ error: "unauthorized" }, { status: 401 });
      callerEmail = data.user.email ?? null;
      callerId = data.user.id;
    } catch {
      return json({ error: "unauthorized" }, { status: 401 });
    }
    // Per-user rate limit: 3 emails per 10 minutes. Welcome already only
    // fires once per account; this is just belt-and-braces against abuse.
    try {
      const svc = createClient(supaUrl, service);
      const { data: rl } = await svc.rpc("user_rate_hit", {
        p_user: callerId, p_bucket: "send-email", p_limit: 3, p_window_secs: 600,
      });
      const row = Array.isArray(rl) ? rl[0] : rl;
      if (row && row.allowed === false) {
        const retry = Number(row.retry_after ?? 600);
        return new Response(
          JSON.stringify({ error: "rate_limited", message: `Too many emails. Retry in ${retry}s.`, retry_after: retry }),
          { status: 429, headers: { ...cors, "Content-Type": "application/json", "Retry-After": String(retry) } },
        );
      }
    } catch { /* fail-open on counter failure — never block a real send */ }
  }

  const body = (await req.json().catch(() => ({}))) as {
    to?: string;
    template?: keyof typeof TEMPLATES;
    data?: Record<string, unknown>;
  };

  if (!body.to || typeof body.to !== "string" || !body.template || !(body.template in TEMPLATES)) {
    return json({ error: "bad_request" }, { status: 400 });
  }
  // Reject obviously malformed addresses and multi-recipient lists (no commas).
  if (!/^[^\s,@]+@[^\s,@]+\.[^\s,@]+$/.test(body.to) || body.to.length > 254) {
    return json({ error: "bad_request" }, { status: 400 });
  }

  if (!isService) {
    if (!USER_ALLOWED_TEMPLATES.has(body.template)) {
      return json({ error: "forbidden", message: "This template can only be sent by the server." }, { status: 403 });
    }
    if (!callerEmail || body.to.toLowerCase() !== callerEmail.toLowerCase()) {
      return json({ error: "forbidden", message: "You can only send this template to your own email." }, { status: 403 });
    }
  }

  const tpl = TEMPLATES[body.template](body.data ?? {});

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: Deno.env.get("RESEND_FROM") ?? "Konvertools <no-reply@konvertools.com>",
      to: body.to,
      subject: tpl.subject,
      html: tpl.html,
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    return json({ error: "resend_failed", message: message.slice(0, 200) }, { status: 502 });
  }

  return json({ sent: true });
});
