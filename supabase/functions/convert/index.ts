// Konvertools — `convert` Edge Function: the broker between the front and the
// containerised conversion microservice (Scaleway).
//
// Flow:
//   1. Front uploads the source to Storage bucket `uploads/<uid>/<file>`.
//   2. Front POSTs { fileKey, sourceFormat, targetFormat } here (with its JWT).
//   3. We validate the JWT, mint a short-lived signed DOWNLOAD url (source) and a
//      signed UPLOAD url (result in `outputs`), and hand BOTH to the microservice.
//   4. The microservice downloads, converts, uploads the result — it NEVER sees
//      the service_role key, only these signed urls + the shared X-Internal-Token.
//   5. We return a signed download url for the produced result.
//
// Deploy: supabase functions deploy convert
// Secrets: CONVERSION_SERVICE_URL, CONVERSION_INTERNAL_TOKEN (set by the owner).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const STATIC_ORIGINS = new Set<string>([
  "https://konvertools.com", "https://www.konvertools.com",
  "https://konver.app", "https://www.konver.app",
  "http://localhost:3000", "http://127.0.0.1:3000",
]);
function corsFor(req: Request): Record<string, string> {
  const o = req.headers.get("origin") ?? "";
  const allow = STATIC_ORIGINS.has(o) || /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(o) ? o : "https://konvertools.com";
  return {
    "Access-Control-Allow-Origin": allow,
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
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
  const serviceUrl = Deno.env.get("CONVERSION_SERVICE_URL");
  const internalToken = Deno.env.get("CONVERSION_INTERNAL_TOKEN");
  if (!serviceUrl || !internalToken) return json({ error: "conversion_not_configured" }, { status: 500 });

  // 1) Validate the user's JWT.
  const auth = req.headers.get("Authorization");
  if (!auth) return json({ error: "unauthorized" }, { status: 401 });
  const userClient = createClient(url, anon, { global: { headers: { Authorization: auth } } });
  const { data: u } = await userClient.auth.getUser();
  const user = u.user;
  if (!user) return json({ error: "unauthorized" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as { fileKey?: string; sourceFormat?: string; targetFormat?: string };
  const fileKey = (body.fileKey ?? "").trim();
  const sourceFormat = (body.sourceFormat ?? "").trim().toLowerCase().replace(/^\./, "");
  const targetFormat = (body.targetFormat ?? "").trim().toLowerCase().replace(/^\./, "");
  if (!fileKey || !sourceFormat || !targetFormat) return json({ error: "bad_request" }, { status: 400 });

  // The source must live under the caller's own folder — a user can only convert
  // their own uploads, never someone else's key.
  if (!fileKey.startsWith(`${user.id}/`)) return json({ error: "forbidden" }, { status: 403 });

  const svc = createClient(url, service);

  // 2) Signed DOWNLOAD url for the source (short-lived).
  const { data: dl, error: dlErr } = await svc.storage.from("uploads").createSignedUrl(fileKey, 120);
  if (dlErr || !dl?.signedUrl) return json({ error: "source_not_found" }, { status: 404 });

  // 3) Signed UPLOAD url for the result. pdf→image conversions return a ZIP of pages.
  const outExt = ["png", "jpg", "jpeg"].includes(targetFormat) ? "zip" : targetFormat;
  const outPath = `${user.id}/${crypto.randomUUID()}.${outExt}`;
  const { data: up, error: upErr } = await svc.storage.from("outputs").createSignedUploadUrl(outPath);
  if (upErr || !up?.signedUrl) return json({ error: "upload_url_failed", message: upErr?.message }, { status: 500 });

  // 4) Call the microservice with the signed urls + the shared internal token.
  let res: Response;
  try {
    res = await fetch(`${serviceUrl.replace(/\/$/, "")}/convert`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Internal-Token": internalToken },
      body: JSON.stringify({ inputUrl: dl.signedUrl, outputUrl: up.signedUrl, sourceFormat, targetFormat }),
    });
  } catch (e) {
    return json({ error: "service_unreachable", message: e instanceof Error ? e.message : "?" }, { status: 502 });
  }
  if (!res.ok) {
    const detail = (await res.json().catch(() => ({}))) as { detail?: string };
    // 422 = clean conversion failure (bad/unsupported file); bubble the message.
    return json({ error: "conversion_failed", message: detail.detail ?? `service ${res.status}` },
      { status: res.status === 422 ? 422 : 502 });
  }

  // 5) Signed DOWNLOAD url for the produced result (1 h).
  const { data: out } = await svc.storage.from("outputs").createSignedUrl(outPath, 3600);
  if (!out?.signedUrl) return json({ error: "result_unavailable" }, { status: 500 });
  return json({ url: out.signedUrl, path: outPath, ext: outExt });
});
