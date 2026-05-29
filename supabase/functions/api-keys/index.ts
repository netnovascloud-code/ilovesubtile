// Wyrlo — manage REST API keys (Business plan).
// POST /functions/v1/api-keys  body { action: 'list' | 'create' | 'revoke', name?, id? }
// Auth: the user's Supabase JWT. Only Business plan may create keys.
//
// Deploy: supabase functions deploy api-keys
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const STATIC_ORIGINS = new Set<string>([
  "https://wyrlo.io", "https://www.wyrlo.io",
  "http://localhost:3000", "http://127.0.0.1:3000",
]);
function corsFor(req: Request): Record<string, string> {
  const o = req.headers.get("origin") ?? "";
  const allow = STATIC_ORIGINS.has(o) || /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(o) ? o : "https://wyrlo.io";
  return {
    "Access-Control-Allow-Origin": allow,
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}
async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
// wyr_live_ + 32 random bytes, base64url-encoded (43 chars, no padding).
// The raw key is shown to the user exactly once; only its SHA-256 hash and a
// 12-char display prefix are persisted.
function randomKey(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  const b64url = btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return "wyr_live_" + b64url;
}

Deno.serve(async (req) => {
  const cors = corsFor(req);
  const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const url = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
  const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const auth = req.headers.get("Authorization");
  if (!auth) return json({ error: "unauthorized" }, { status: 401 });

  const userClient = createClient(url, anon, { global: { headers: { Authorization: auth } } });
  const { data: u } = await userClient.auth.getUser();
  const user = u.user;
  if (!user) return json({ error: "unauthorized" }, { status: 401 });

  const svc = createClient(url, service);
  const { data: profile } = await svc.from("profiles").select("plan").eq("id", user.id).maybeSingle();
  const plan = (profile?.plan as string) ?? "free";

  const body = await req.json().catch(() => ({}));
  const action = body.action as string;

  if (action === "list") {
    const { data } = await svc.from("api_keys")
      .select("id, name, key_prefix, last_used_at, revoked, created_at")
      .eq("user_id", user.id).order("created_at", { ascending: false });
    return json({ keys: data ?? [] });
  }

  if (action === "create") {
    if (plan !== "business") return json({ error: "business_plan_required" }, { status: 403 });
    const raw = randomKey();
    const key_hash = await sha256(raw);
    const key_prefix = raw.slice(0, 12);
    const { error } = await svc.from("api_keys").insert({
      user_id: user.id, name: (body.name as string)?.slice(0, 60) || "Default", key_hash, key_prefix,
    });
    if (error) return json({ error: "insert_failed", message: error.message }, { status: 500 });
    // Return the raw key ONCE — it is never stored or shown again.
    return json({ key: raw, key_prefix });
  }

  if (action === "revoke") {
    const id = body.id as string;
    if (!id) return json({ error: "missing_id" }, { status: 400 });
    await svc.from("api_keys").update({ revoked: true }).eq("id", id).eq("user_id", user.id);
    return json({ ok: true });
  }

  return json({ error: "unknown_action" }, { status: 400 });
});
