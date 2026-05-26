// Transactional email sender (Resend).
// POST JSON: { to: string, template: "welcome" | "job-done" | "upgrade" | "renewal-reminder", data: object }
//
// Deploy: supabase functions deploy send-email
// Secrets: supabase secrets set RESEND_API_KEY=re_...

import { json } from "../_shared/cors.ts";

const TEMPLATES = {
  welcome: (data: { name?: string }) => ({
    subject: "Welcome to Wyrlo 👋",
    html: `<p>Hi ${data.name ?? "there"}, welcome to Wyrlo.</p>
<p>You're on the Free plan: 5 runs per day, files up to 50&nbsp;MB. Try the
<a href="https://wyrlo.io/subtitle-generator">subtitle generator</a> to get started.</p>`,
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
    html: `<p>Your Wyrlo subscription renews on ${data.dueDate}. Manage it from your dashboard.</p>`,
  }),
} as const;

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) return json({ error: "missing_resend_key" }, { status: 500 });

  const body = (await req.json()) as {
    to?: string;
    template?: keyof typeof TEMPLATES;
    data?: Record<string, unknown>;
  };

  if (!body.to || !body.template || !(body.template in TEMPLATES)) {
    return json({ error: "bad_request" }, { status: 400 });
  }

  const tpl = TEMPLATES[body.template](body.data ?? {});

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Wyrlo <hello@wyrlo.io>",
      to: body.to,
      subject: tpl.subject,
      html: tpl.html,
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    return json({ error: "resend_failed", message }, { status: 502 });
  }

  return json({ sent: true });
});
