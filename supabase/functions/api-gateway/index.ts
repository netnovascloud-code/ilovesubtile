// Konvertools public REST gateway. Authenticated by a Konvertools API key
// (knv_live_…), NOT a Supabase JWT — hence verify_jwt is disabled and we
// validate the key ourselves. Deducts credits per call and logs a job.
//
//   GET  /functions/v1/api-gateway?action=me                (cost 0)
//   GET  /functions/v1/api-gateway?action=job&id=<uuid>     (cost 0)
//   POST /functions/v1/api-gateway?action=transcribe        (10 / started min)
//   POST /functions/v1/api-gateway?action=translate         (5 / 1000 words, min 5)
//   POST /functions/v1/api-gateway?action=rephrase          (3 short / 8 long)
//   POST /functions/v1/api-gateway?action=summarize         (3 short / 6 long)
//   POST /functions/v1/api-gateway?action=humanize          (5 short / 12 long)
//   POST /functions/v1/api-gateway?action=convert_code      (4)
//   Header: Authorization: Bearer knv_live_…
//
// Credit costs mirror lib/credits.ts on the frontend — keep in sync.
// Deploy: supabase functions deploy api-gateway --no-verify-jwt
// Secret: MISTRAL_API_KEY
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// Key hashing + validation rules live in a shared module so they're exercised by
// the Node test suite (tests/api-key.test.ts) — same code, single source of truth.
import { sha256Hex, isValidApiKeyFormat, isKeyUsable } from "../_shared/api-key.ts";
// Best-effort error monitoring (inert until SENTRY_DSN is set).
import { captureEdgeException } from "../_shared/sentry.ts";

const BUY_CREDITS_URL = "https://konvertools.com/pricing";

// CORS allowlist. We echo the caller's Origin only when it's a known host
// (production vercel.app domains, the future konvertools.com, and local dev);
// otherwise we fall back to the canonical site. Server-to-server API callers
// send no Origin and are unaffected. Note: api-gateway is JWT-free and uses
// API-key auth, so CORS is defence-in-depth, not the primary control.
const STATIC_ORIGINS = new Set<string>([
  "https://konvertools.com", "https://www.konvertools.com",
  "https://konver.app", "https://www.konver.app",
  "http://localhost:3000", "http://127.0.0.1:3000",
]);
function allowOrigin(req: Request): string {
  const o = req.headers.get("origin") ?? "";
  if (STATIC_ORIGINS.has(o)) return o;
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(o)) return o;
  return "https://konvertools.com";
}
function corsFor(req: Request): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": allowOrigin(req),
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };
}

/** Validate a single URL against the SSRF denylist. Throws on rejection. */
function assertSafeUrl(raw: string): URL {
  let u: URL;
  try { u = new URL(raw); } catch { throw new Error("invalid_url"); }
  if (u.protocol !== "https:") throw new Error("only_https_allowed");
  if (u.username || u.password) throw new Error("credentials_in_url_forbidden");
  if (u.port && u.port !== "443") throw new Error("nonstandard_port_forbidden");
  const host = u.hostname.toLowerCase();
  if (["localhost", "ip6-localhost", "ip6-loopback", "metadata.google.internal"].includes(host)) {
    throw new Error("private_host_forbidden");
  }
  const m4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m4) {
    const [a, b] = [Number(m4[1]), Number(m4[2])];
    const priv =
      a === 0 || a === 10 || a === 127 ||
      (a === 169 && b === 254) ||         // link-local & AWS IMDS
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a >= 224;                            // multicast / reserved
    if (priv) throw new Error("private_ip_forbidden");
  }
  if (host.startsWith("[")) {
    const v6 = host.slice(1, -1).toLowerCase();
    if (v6 === "::1" || v6.startsWith("fc") || v6.startsWith("fd") || v6.startsWith("fe80")) {
      throw new Error("private_ip_forbidden");
    }
  }
  return u;
}

/** SSRF-safe fetch of a URL provided by the API caller.
 *  Hardening:
 *    - https only, default port only, no credentials
 *    - block private/loopback/link-local IPv4 + IPv6 ranges (incl. 169.254.169.254)
 *    - redirects followed MANUALLY, re-validating every hop's Location so a
 *      302 → http://169.254.169.254/ cannot bypass the first-hop check
 *    - 10 MB cap (streamed), 15 s timeout, max 4 hops
 *  NOTE: DNS rebinding can still defeat hostname checks in extreme cases, but
 *  the Supabase Edge runtime is sandboxed (no metadata service, no LAN). */
async function safeFetchUserUrl(raw: string, maxBytes = 10 * 1024 * 1024, timeoutMs = 15000): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    let current = assertSafeUrl(raw);
    let res: Response | null = null;
    for (let hop = 0; hop < 4; hop++) {
      res = await fetch(current.toString(), { method: "GET", redirect: "manual", signal: ctrl.signal });
      // Manual redirect: re-validate the next hop before following it.
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get("location");
        if (!loc) throw new Error(`upstream_${res.status}`);
        try { await res.body?.cancel(); } catch { /* ignore */ }
        current = assertSafeUrl(new URL(loc, current).toString()); // resolve + revalidate
        continue;
      }
      break;
    }
    if (!res) throw new Error("no_response");
    if (!res.ok) throw new Error(`upstream_${res.status}`);
    const lenHeader = res.headers.get("content-length");
    if (lenHeader && Number(lenHeader) > maxBytes) throw new Error("response_too_large");
    // Stream and enforce the cap defensively even if Content-Length lied.
    const reader = res.body?.getReader();
    if (!reader) return res;
    const chunks: Uint8Array[] = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        total += value.length;
        if (total > maxBytes) { try { await reader.cancel(); } catch { /* ignore */ } throw new Error("response_too_large"); }
        chunks.push(value);
      }
    }
    const merged = new Uint8Array(total);
    let off = 0;
    for (const c of chunks) { merged.set(c, off); off += c.length; }
    return new Response(merged, { headers: res.headers, status: res.status });
  } finally {
    clearTimeout(timer);
  }
}

const LONG_TEXT_THRESHOLD = 500;
function countWords(t: string): number {
  const s = t.trim();
  return s ? s.split(/\s+/).length : 0;
}
function transcribeCost(seconds: number): number {
  return Math.max(1, Math.ceil(seconds / 60)) * 10;
}
function translateCost(words: number): number {
  return Math.max(1, Math.ceil(words / 1000)) * 5;
}
const TIER = { rephrase: { short: 3, long: 8 }, summarize: { short: 3, long: 6 }, humanize: { short: 5, long: 12 } } as const;
function tieredCost(op: keyof typeof TIER, words: number): number {
  return words >= LONG_TEXT_THRESHOLD ? TIER[op].long : TIER[op].short;
}

type Segment = { start: number; end: number; text: string };
function srtFromSegments(segs: Segment[]): string {
  const pad = (n: number, w = 2) => String(Math.max(0, n)).padStart(w, "0");
  const fmt = (sec: number) => {
    const t = Math.max(0, sec);
    return `${pad(Math.floor(t / 3600))}:${pad(Math.floor((t % 3600) / 60))}:${pad(Math.floor(t % 60))},${pad(Math.round((t - Math.floor(t)) * 1000), 3)}`;
  };
  return segs.map((s, i) => `${i + 1}\n${fmt(s.start)} --> ${fmt(s.end)}\n${s.text.trim()}`).join("\n\n") + "\n";
}
function parseSrt(raw: string) {
  const blocks = raw.replace(/\r\n?/g, "\n").trim().split(/\n\n+/);
  const cues: { start: string; end: string; lines: string[] }[] = [];
  for (const b of blocks) {
    const lines = b.split("\n");
    const timing = lines.find((l) => l.includes("-->"));
    if (!timing) continue;
    const [start, end] = timing.split("-->").map((s) => s.trim().split(/\s+/)[0]);
    cues.push({ start, end, lines: lines.slice(lines.indexOf(timing) + 1) });
  }
  return cues;
}

const MISTRAL_CHAT = "https://api.mistral.ai/v1/chat/completions";
async function mistralChat(key: string, system: string, user: string, large = true): Promise<string> {
  const res = await fetch(MISTRAL_CHAT, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: large ? "mistral-large-latest" : "mistral-small-latest",
      temperature: 0.4,
      messages: [{ role: "system", content: system }, { role: "user", content: user }],
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json() as { choices: { message: { content: string } }[] };
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

/** System prompts for the text/code actions. */
function textSystem(action: string, opts: { style?: string; format?: string; level?: string; from?: string; to?: string }): string {
  switch (action) {
    case "rephrase":
      return `Rewrite the user's text in a ${opts.style || "clear, neutral"} style/tone. Keep the original meaning and language. Output ONLY the rewritten text.`;
    case "summarize":
      if (opts.format === "sentence" || opts.format === "short") return `Summarise the user's text in a single concise sentence. Output only that sentence.`;
      if (opts.format === "detailed") return `Write a detailed summary of the user's text in 1-3 short paragraphs. Output only the summary.`;
      return `Summarise the user's text as 3-6 key bullet points in markdown. Output only the bullets.`;
    case "humanize": {
      const intensity = opts.level === "light" ? "Make light, careful edits."
        : opts.level === "strong" ? "Rewrite assertively for maximum natural variation."
        : "Apply a balanced rewrite.";
      return `You rewrite AI-generated text so it reads as natural, human-written prose. ${intensity} Vary sentence length, use less predictable transitions, replace over-formal vocabulary with varied natural synonyms, and break repetitive structures. Keep the original meaning, language and overall length. Output ONLY the rewritten text.`;
    }
    case "convert_code":
      return `You convert source code from ${opts.from || "the source language"} to ${opts.to || "the target language"}. Preserve behaviour and comments. Output ONLY the converted code, no fences, no explanation.`;
    case "explain_code":
      return `You explain source code clearly and concisely for a developer. Output a short paragraph plus, if useful, a bullet list of key steps.`;
    default:
      return "";
  }
}

Deno.serve(async (req) => {
  // Per-request CORS + response helpers (close over the resolved origin).
  const cors = corsFor(req);
  const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });
  const err = (error: string, message: string, status: number, extra: Record<string, unknown> = {}) =>
    json({ error, message, ...extra }, { status });
  const insufficient = (required: number, available: number) =>
    json({
      error: "insufficient_credits",
      message: `This operation costs ${required} credits. Your balance: ${available} credits.`,
      credits_required: required,
      credits_available: available,
      buy_credits_url: BUY_CREDITS_URL,
    }, { status: 402 });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  const mistralKey = Deno.env.get("MISTRAL_API_KEY");
  if (!mistralKey) return err("server_error", "Service misconfigured.", 500);
  const svc = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  // ---- authenticate the Konvertools API key ----
  const authz = req.headers.get("Authorization") ?? "";
  const raw = authz.replace(/^Bearer\s+/i, "").trim();
  // Accept the current knv_ prefix and the legacy wyr_ / cf_ prefixes (keys
  // issued before the Konvertools rename / pre-Wyrlo CaptionFlow era). Validation
  // is hash-based, so old keys keep working.
  if (!isValidApiKeyFormat(raw)) return err("missing_api_key", "Send Authorization: Bearer knv_live_…", 401);
  const hash = await sha256Hex(raw);
  const { data: keyRow } = await svc.from("api_keys").select("id, user_id, revoked").eq("key_hash", hash).maybeSingle();
  if (!isKeyUsable(keyRow)) return err("invalid_api_key", "API key not found or revoked.", 401);
  const userId = keyRow.user_id as string;
  await svc.from("api_keys").update({ last_used_at: new Date().toISOString() }).eq("id", keyRow.id);

  // ---- read profile (plan + balance) FIRST so we can size the rate limit ----
  const { data: prof } = await svc.from("profiles").select("plan, credits, email, monthly_credits, monthly_credits_month").eq("id", userId).maybeSingle();
  const plan = (prof?.plan as string) ?? "free";

  // ---- plan-aware rate limit (60s sliding window) ----
  // Business gets 120/min, anyone else (Pro paying-as-you-go + Free top-ups) 60.
  const rateLimit = plan === "business" ? 120 : 60;
  const { data: rl } = await svc.rpc("api_rate_hit", { p_key_id: keyRow.id, p_limit: rateLimit });
  const row = Array.isArray(rl) ? rl[0] : rl;
  if (row && row.allowed === false) {
    const retry = Number(row.retry_after ?? 60);
    return json(
      { error: "rate_limited", message: `Too many requests. Retry in ${retry}s.`, retry_after: retry },
      { status: 429, headers: { "Retry-After": String(retry) } },
    );
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action") ?? "";
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthly = prof?.monthly_credits_month === thisMonth ? (prof?.monthly_credits ?? 0) : 0;
  const balance = (prof?.credits ?? 0) + monthly;

  // ===== free, read-only actions =====
  if (action === "me") {
    return json({
      user_id: userId,
      email: prof?.email ?? null,
      plan: prof?.plan ?? "free",
      credits: balance,
      credits_permanent: prof?.credits ?? 0,
      credits_monthly: monthly,
      max_file_mb: (prof?.plan === "business") ? 5120 : (prof?.plan === "pro") ? 1024 : 20,
    });
  }
  if (action === "job") {
    const id = url.searchParams.get("id");
    if (!id) return err("bad_request", "Pass &id=<job_id>.", 400);
    const { data: job } = await svc.from("jobs").select("id, tool, status, output_file_url, created_at, completed_at").eq("id", id).eq("user_id", userId).maybeSingle();
    if (!job) return err("job_not_found", "No job with that id on your account.", 404);
    return json({ job });
  }

  if (req.method !== "POST") return err("method_not_allowed", "Use POST for this action.", 405);

  // ===== text / code actions (Mistral chat) =====
  const TEXT_ACTIONS = new Set(["rephrase", "summarize", "humanize", "convert_code", "explain_code"]);
  if (TEXT_ACTIONS.has(action)) {
    let body: Record<string, unknown> = {};
    try { body = await req.json(); } catch { return err("bad_request", "Send a JSON body.", 400); }
    const text = String(body.text ?? body.code ?? "").trim();
    if (!text) return err("bad_request", "Missing `text`.", 400);
    if (text.length > 40000) return err("text_too_long", "Keep payload under 40,000 characters.", 413);
    const words = countWords(text);
    const cost = action === "convert_code" ? 4
      : action === "explain_code" ? 3
      : tieredCost(action as keyof typeof TIER, words);
    if (balance < cost) return insufficient(cost, balance);

    const system = textSystem(action, {
      style: body.style as string, format: body.format as string, level: body.level as string,
      from: (body.from_language ?? body.from) as string, to: (body.to_language ?? body.to) as string,
    });
    let output = "";
    try { output = await mistralChat(mistralKey, system, text, action !== "explain_code"); }
    catch (e) { await captureEdgeException(e, { fn: "api-gateway" }); return err("processing_failed", e instanceof Error ? e.message : "Upstream model error — not charged.", 502); }

    const { data: newBalance, error: spendErr } = await svc.rpc("spend_credits", { p_user: userId, p_amount: cost, p_reason: `api:${action}` });
    if (spendErr) return insufficient(cost, balance);
    const { data: job } = await svc.from("jobs").insert({ user_id: userId, tool: `api-${action}`, status: "done", metadata: { via: "api" }, completed_at: new Date().toISOString() }).select("id").maybeSingle();
    return json({ job_id: job?.id ?? null, output, credits_remaining: newBalance, cost });
  }

  // ===== metered media actions (transcribe / translate) =====
  if (action === "transcribe" || action === "translate") {
    let file: File | null = null;
    let srtText: string | null = null;
    let targetLang = "EN";
    let inputText: string | null = null;
    const ctype = req.headers.get("content-type") ?? "";
    if (ctype.includes("application/json")) {
      const b = await req.json().catch(() => ({}));
      targetLang = String(b.target_lang ?? "EN").toUpperCase();
      if (action === "translate" && typeof b.text === "string") inputText = b.text;
      else {
        const fileUrl = b.file_url ?? b.srt_url;
        if (!fileUrl || typeof fileUrl !== "string") return err("bad_request", "Provide an https `file_url` (or `text` for translate).", 400);
        let r: Response;
        try { r = await safeFetchUserUrl(String(fileUrl)); }
        catch (e) { return err("bad_request", `Could not fetch file_url: ${(e as Error).message}`, 400); }
        if (action === "translate") srtText = await r.text();
        else file = new File([await r.blob()], "input");
      }
    } else {
      const form = await req.formData();
      targetLang = String(form.get("target_lang") ?? "EN").toUpperCase();
      const f = form.get("file");
      if (!(f instanceof File)) return err("bad_request", "Attach a multipart `file`.", 400);
      // File validation: cap size at the user's plan limit (in MB) and reject
      // dangerous executable extensions outright. Free=20, Pro=1024, Business=5120.
      const planMb = (prof?.plan === "business") ? 5120 : (prof?.plan === "pro") ? 1024 : 20;
      if (f.size > planMb * 1024 * 1024) return err("file_too_large", `File exceeds your plan's ${planMb} MB limit.`, 413);
      const name = (f.name || "").toLowerCase();
      const bad = [".exe", ".dll", ".bat", ".cmd", ".sh", ".ps1", ".dmg", ".msi", ".scr", ".com", ".vbs", ".js", ".jar"];
      if (bad.some((ext) => name.endsWith(ext))) return err("bad_request", "Executable file types are not accepted.", 400);
      // For translate, the file must look like a subtitle (text-ish).
      if (action === "translate") {
        if (f.size > 5 * 1024 * 1024) return err("file_too_large", "Subtitle files are capped at 5 MB.", 413);
        srtText = await f.text();
      } else {
        // For transcribe, require an audio/video MIME hint.
        const t = (f.type || "").toLowerCase();
        if (t && !t.startsWith("audio/") && !t.startsWith("video/") && t !== "application/octet-stream") {
          return err("bad_request", `Unsupported content type: ${t}. Send an audio or video file.`, 415);
        }
        file = f;
      }
    }

    // Pre-flight balance check against the minimum this op can cost.
    const minCost = action === "transcribe" ? 10 : 5;
    if (balance < minCost) return insufficient(minCost, balance);

    let outSrt = "";
    let outText = "";
    let cost = minCost;
    try {
      if (action === "transcribe") {
        const fd = new FormData();
        fd.append("file", file!);
        fd.append("model", "voxtral-mini-latest");
        fd.append("response_format", "verbose_json");
        fd.append("timestamp_granularities[]", "segment");
        const res = await fetch("https://api.mistral.ai/v1/audio/transcriptions", { method: "POST", headers: { Authorization: `Bearer ${mistralKey}` }, body: fd });
        if (!res.ok) return err("processing_failed", await res.text(), 502);
        const v = await res.json() as { text?: string; segments?: Segment[] };
        const segs = Array.isArray(v.segments) && v.segments.length ? v.segments : [{ start: 0, end: 3, text: v.text ?? "" }];
        outSrt = srtFromSegments(segs);
        const duration = segs[segs.length - 1]?.end ?? 0;
        cost = transcribeCost(duration);
      } else if (inputText !== null) {
        // Plain-text translation.
        cost = translateCost(countWords(inputText));
        if (balance < cost) return insufficient(cost, balance);
        const system = `You are an expert translator. Translate the user's text into ${targetLang} naturally and idiomatically. Preserve line breaks and formatting. Output ONLY the translation.`;
        outText = await mistralChat(mistralKey, system, inputText);
      } else {
        // SRT/VTT cue-by-cue translation.
        const cues = parseSrt(srtText!);
        if (!cues.length) return err("bad_request", "No subtitle cues found.", 400);
        cost = translateCost(countWords(cues.map((c) => c.lines.join(" ")).join(" ")));
        if (balance < cost) return insufficient(cost, balance);
        const system = `Translate every input subtitle cue to ${targetLang}. Output the SAME number of cues, in order, preserving line breaks. Return ONLY JSON: {"cues":["..."]}`;
        const res = await fetch(MISTRAL_CHAT, {
          method: "POST", headers: { Authorization: `Bearer ${mistralKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "mistral-large-latest", response_format: { type: "json_object" }, temperature: 0.1, messages: [{ role: "system", content: system }, { role: "user", content: JSON.stringify({ cues: cues.map((c) => c.lines.join("\n")) }) }] }),
        });
        if (!res.ok) return err("processing_failed", await res.text(), 502);
        const data = await res.json() as { choices: { message: { content: string } }[] };
        const parsed = JSON.parse(data.choices?.[0]?.message?.content ?? "{}");
        const out: string[] = Array.isArray(parsed.cues) ? parsed.cues.map(String) : [];
        if (out.length !== cues.length) return err("processing_failed", "Translation cue count mismatch.", 502);
        outSrt = cues.map((c, i) => `${i + 1}\n${c.start} --> ${c.end}\n${out[i]}`).join("\n\n") + "\n";
      }
    } catch (e) {
      await captureEdgeException(e, { fn: "api-gateway" });
      return err("processing_failed", e instanceof Error ? e.message : "Upstream model error — not charged.", 502);
    }

    // Final balance guard now that the metered cost is known.
    if (balance < cost) return insufficient(cost, balance);

    let signedUrl: string | null = null;
    if (outSrt) {
      const path = `${userId}/${crypto.randomUUID()}/result.srt`;
      await svc.storage.from("results").upload(path, new Blob([outSrt], { type: "application/x-subrip" }), { contentType: "application/x-subrip" });
      const { data: signed } = await svc.storage.from("results").createSignedUrl(path, 600);
      signedUrl = signed?.signedUrl ?? null;
    }

    const { data: newBalance, error: spendErr } = await svc.rpc("spend_credits", { p_user: userId, p_amount: cost, p_reason: `api:${action}` });
    if (spendErr) return insufficient(cost, balance);
    const { data: job } = await svc.from("jobs").insert({
      user_id: userId, tool: `api-${action}`, status: "done",
      output_file_url: signedUrl, language_target: action === "translate" ? targetLang : null,
      metadata: { via: "api" }, completed_at: new Date().toISOString(),
    }).select("id").maybeSingle();

    return json({ job_id: job?.id ?? null, url: signedUrl, output: outText || undefined, credits_remaining: newBalance, cost });
  }

  // ===== security tools (delegate to the security-tools function) =====
  // Per-action credit cost; matches lib/credits.ts CREDIT_COST.
  const SEC_COST: Record<string, number> = { validate_email: 1, analyze_phishing: 3, scan_url: 1, password_check: 1, ssl_check: 1 };
  if (action in SEC_COST) {
    const cost = SEC_COST[action];
    if (balance < cost) return insufficient(cost, balance);
    let body: Record<string, unknown> = {};
    try { body = await req.json(); } catch { return err("bad_request", "Send a JSON body.", 400); }
    // Map the gateway's flat action name onto the security-tools envelope.
    const innerBody = { action, ...body };
    const internal = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/security-tools`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: Deno.env.get("SUPABASE_ANON_KEY")!, Authorization: `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")!}` },
      body: JSON.stringify(innerBody),
    });
    const innerText = await internal.text();
    if (!internal.ok) {
      // Pass the upstream status through (502 for our server faults, 503 for missing keys).
      return new Response(innerText, { status: internal.status, headers: { ...cors, "Content-Type": "application/json" } });
    }
    let result: unknown = innerText;
    try { result = JSON.parse(innerText); } catch { /* leave raw */ }
    // Charge only on success.
    const { data: newBalance, error: spendErr } = await svc.rpc("spend_credits", { p_user: userId, p_amount: cost, p_reason: `api:${action}` });
    if (spendErr) return insufficient(cost, balance);
    const { data: job } = await svc.from("jobs").insert({ user_id: userId, tool: `api-${action}`, status: "done", metadata: { via: "api" }, completed_at: new Date().toISOString() }).select("id").maybeSingle();
    return json({ job_id: job?.id ?? null, result, credits_remaining: newBalance, cost });
  }

  // ===== in-browser-only ops (no server engine yet) =====
  if (action === "remove_background" || action === "convert_image" || action === "convert_pdf") {
    return err("not_implemented", `\`${action}\` runs in-browser today and isn't yet available over REST. Use the web tool, or watch ${BUY_CREDITS_URL} for the API rollout. You were not charged.`, 501);
  }

  return err("bad_request", `Unknown action: ${action || "(none)"}.`, 400);
});
