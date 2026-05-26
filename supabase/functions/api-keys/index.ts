// Wyrlo — manage REST API keys (Business plan).
// POST /functions/v1/api-keys  body { action: 'list' | 'create' | 'revoke', name?, id? }
// Auth: the user's Supabase JWT. Only Business plan may create keys.
//
// Deploy: supabase functions deploy api-keys
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });
}
async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function randomKey(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return "cf_live_" + Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
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
    const key_prefix = raw.slice(0, 16);
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
