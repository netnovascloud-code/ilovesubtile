// Konver — Mistral Vision tasks (Pixtral Large). POST JSON:
//   { task, image, prompt? }
// where `image` is a data URL (data:image/...;base64,...) OR a publicly
// reachable URL. Returns either `{ output: string }` or `{ data: object }`
// depending on whether the task asked for JSON output.
//
// Auth: optional user JWT. Free signed-in users share the same 2/day cap as
// ai-process (see DAILY_LIMIT below — must stay in sync with that file).
// Anonymous calls pass through; the client gates them.
//
// Deploy: supabase functions deploy ai-vision
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const STATIC_ORIGINS = new Set<string>([
  "https://konver.app", "https://www.konver.app",
  "http://localhost:3000", "http://127.0.0.1:3000",
]);
function corsFor(req: Request): Record<string, string> {
  const o = req.headers.get("origin") ?? "";
  const allow = STATIC_ORIGINS.has(o) || /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(o) ? o : "https://konver.app";
  return {
    "Access-Control-Allow-Origin": allow,
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// Quota mirrors of ai-process — free is a rolling 24h counter, Pro/Business
// are monthly (UTC calendar month). Keep in sync with lib/ai-quotas.ts.
const DAILY_LIMIT: Record<string, number> = { free: 2, pro: 0, business: 0 };
const MONTHLY_LIMIT: Record<string, number> = { free: 0, pro: 500, business: 3000 };
function utcMonth(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

type VisionTask = "ocr-handwriting" | "business-card" | "receipt" | "screenshot-to-code" | "image-to-table";

const SYSTEMS: Record<VisionTask, { sys: string; json: boolean }> = {
  "ocr-handwriting": {
    sys: "You receive a photo of handwritten text. Transcribe every legible word as faithfully as possible — preserve line breaks and paragraph structure. Do NOT add commentary, headings, or guess at illegible passages (use [illegible] for those). Output ONLY the transcribed text.",
    json: false,
  },
  "business-card": {
    sys: 'You receive a photo of a business card. Extract the contact details and return ONLY a JSON object with these keys (use null when the field is absent or ambiguous): name, title, company, email, phone, website, address. Phone numbers should keep their leading "+" if present.',
    json: true,
  },
  "receipt": {
    sys: 'You receive a photo of a receipt or invoice. Return ONLY a JSON object with these keys: merchant, date (ISO 8601 YYYY-MM-DD), currency (ISO 4217 code), total (number), subtotal (number or null), tax (number or null), items (array of {description, quantity, price}). Use null when a field is missing. Numbers must be raw (no currency symbol).',
    json: true,
  },
  "screenshot-to-code": {
    sys: "You receive a screenshot of a UI. Produce a single self-contained HTML5 document that recreates the visible layout as closely as possible using semantic HTML and Tailwind CSS utility classes (via the official Tailwind CDN <script src=\"https://cdn.tailwindcss.com\"></script>). Use placeholder text/images for non-essential content. Output ONLY the HTML, starting with <!doctype html>.",
    json: false,
  },
  "image-to-table": {
    sys: 'You receive an image containing a table, spreadsheet, form, or columnar/tabular data. Extract it and return ONLY a JSON object of the shape {"headers": string[], "rows": string[][]}. `headers` is the column header row (use an empty array if there is no clear header). Every entry in `rows` is an array of cell strings with the SAME length as `headers` (or as the widest row when there are no headers); pad missing cells with "". Preserve cell text exactly as shown — keep numbers as plain strings, do not strip currency symbols or reformat. Merge multi-line cells onto one line. Do not add commentary.',
    json: true,
  },
};

Deno.serve(async (req) => {
  const cors = corsFor(req);
  const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const mistralKey = Deno.env.get("MISTRAL_API_KEY");
  if (!mistralKey) return json({ error: "missing_mistral_key" }, { status: 500 });

  const url = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
  const svc = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const body = (await req.json().catch(() => ({}))) as { task?: VisionTask; image?: string; prompt?: string };
  const task = body.task as VisionTask;
  const image = (body.image ?? "").trim();
  if (!task || !SYSTEMS[task]) return json({ error: "bad_task" }, { status: 400 });
  if (!image) return json({ error: "missing_image" }, { status: 400 });
  // 12 MB base64 is roughly a 9 MB JPEG — plenty for any single photo and
  // keeps the worker from holding multi-GB payloads in memory.
  if (image.length > 12 * 1024 * 1024) return json({ error: "image_too_large" }, { status: 413 });

  // Resolve caller (optional) and enforce the per-day free-tier cap.
  let userId: string | null = null;
  const authz = req.headers.get("Authorization");
  if (authz && !authz.endsWith(anon)) {
    try {
      const u = createClient(url, anon, { global: { headers: { Authorization: authz } } });
      const { data } = await u.auth.getUser();
      userId = data.user?.id ?? null;
    } catch { /* anon */ }
  }
  if (userId) {
    try {
      const { data: prof } = await svc.from("profiles")
        .select("plan, daily_usage, usage_reset_at, monthly_ai_usage, monthly_ai_month")
        .eq("id", userId).maybeSingle();
      const plan = (prof?.plan as string) ?? "free";

      if (plan === "free") {
        const limit = DAILY_LIMIT.free;
        const now = Date.now();
        const resetAt = prof?.usage_reset_at ? new Date(prof.usage_reset_at).getTime() : 0;
        const overdue = now - resetAt > 24 * 3600 * 1000;
        const current = overdue ? 0 : (prof?.daily_usage ?? 0);
        if (current >= limit) {
          return json({ error: "daily_limit", plan, limit, used: current, remaining: 0, resetAt: new Date((overdue ? now : resetAt) + 24 * 3600 * 1000).toISOString() }, { status: 429 });
        }
        await svc.from("profiles").update({
          daily_usage: current + 1,
          usage_reset_at: overdue ? new Date().toISOString() : (prof?.usage_reset_at ?? new Date().toISOString()),
        }).eq("id", userId);
      } else {
        const limit = MONTHLY_LIMIT[plan] ?? MONTHLY_LIMIT.pro;
        const month = utcMonth();
        const used = prof?.monthly_ai_month === month ? (prof?.monthly_ai_usage ?? 0) : 0;
        if (used >= limit) {
          const next = new Date();
          next.setUTCDate(1); next.setUTCHours(0, 0, 0, 0); next.setUTCMonth(next.getUTCMonth() + 1);
          return json({ error: "monthly_limit", plan, limit, used, remaining: 0, resetAt: next.toISOString() }, { status: 429 });
        }
        await svc.from("profiles").update({ monthly_ai_usage: used + 1, monthly_ai_month: month }).eq("id", userId);
      }
    } catch { /* fail-open */ }
  }

  const { sys, json: wantsJson } = SYSTEMS[task];
  const userText = (body.prompt ?? "Process this image per the instructions.").slice(0, 800);
  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${mistralKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "pixtral-large-latest",
      messages: [
        { role: "system", content: sys },
        { role: "user", content: [
          { type: "text", text: userText },
          { type: "image_url", image_url: image },
        ] },
      ],
      ...(wantsJson ? { response_format: { type: "json_object" } } : {}),
      temperature: wantsJson ? 0.1 : 0.3,
    }),
  });
  if (!res.ok) return json({ error: "processing_failed", message: (await res.text()).slice(0, 600) }, { status: 502 });
  const out = (await res.json()) as { choices: { message: { content: string } }[] };
  const content = out.choices?.[0]?.message?.content?.trim() ?? "";

  // Privacy + DB hygiene: vision results are returned inline and never stored,
  // so we don't log a jobs row. Quota lives on the profiles counter above.

  if (wantsJson) {
    try { return json({ data: JSON.parse(content) }); }
    catch { return json({ error: "bad_model_output", raw: content.slice(0, 600) }, { status: 502 }); }
  }
  return json({ output: content });
});
