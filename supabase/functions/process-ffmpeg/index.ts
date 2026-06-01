// Konvertools — forwarder to a self-hosted FFmpeg worker.
//
// This function is dormant. There is no VPS, and the three tools it used to
// route to (add-subtitles-to-video, extract-subtitles, style-subtitles) run
// entirely in the browser via FFmpeg.wasm. We keep the function deployed
// only because removing a previously-deployed Supabase Function is awkward;
// it now refuses every request (501 service_disabled) regardless of whether
// VPS_API_URL is set.
//
// If you ever do wire up a real upstream, you MUST also:
//   1. require `caller` (authenticated user) — never proxy anonymously,
//   2. validate `tool` against the ALLOWED set below, and
//   3. drop the wildcard CORS to your own origin allowlist.
// All three are enforced below; do not relax them.

import { corsHeaders, handleOptions, json } from "../_shared/cors.ts";
import { getCaller, getServiceClient } from "../_shared/auth.ts";

const ALLOWED_TOOLS = new Set([
  "add-subtitles-to-video",
  "extract-subtitles",
  "style-subtitles",
]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return handleOptions();
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  // HARD KILL-SWITCH: this function is intentionally disabled.
  // The browser already does the FFmpeg work for these tools.
  return json({
    error: "service_disabled",
    message: "This endpoint is no longer in service. The corresponding tools run in your browser.",
  }, { status: 501 });

  // -- Unreachable below: kept as the safe template for any future revival. --
  // deno-lint-ignore no-unreachable
  const caller = await getCaller(req);
  if (!caller) return json({ error: "unauthorized" }, { status: 401 });

  const tool = new URL(req.url).searchParams.get("tool") ?? "";
  if (!ALLOWED_TOOLS.has(tool)) return json({ error: "invalid_tool" }, { status: 400 });

  const vpsUrl = Deno.env.get("VPS_API_URL");
  const vpsKey = Deno.env.get("VPS_API_KEY");
  if (!vpsUrl || !vpsKey) return json({ error: "missing_vps_config" }, { status: 500 });

  const supabase = getServiceClient();
  const upstream = await fetch(`${vpsUrl}/${tool}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${vpsKey}`,
      "Content-Type": req.headers.get("content-type") ?? "application/octet-stream",
    },
    body: req.body,
    // @ts-expect-error duplex is in the fetch spec.
    duplex: "half",
  });

  if (!upstream.ok) {
    return json({ error: "vps_failed", message: await upstream.text() }, { status: 502 });
  }
  const data = (await upstream.json()) as { url: string; filename: string };

  await supabase.from("jobs").insert({
    user_id: caller.id,
    tool,
    status: "done",
    output_file_url: data.url,
    completed_at: new Date().toISOString(),
  });

  return json(data, { headers: corsHeaders });
});
