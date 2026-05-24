// Forwarder to a Hetzner-hosted FFmpeg worker.
// The Edge Function never runs ffmpeg itself — it forwards multipart uploads
// to a tiny Express service on a VPS that has ffmpeg installed.
//
// Deploy: supabase functions deploy process-ffmpeg
// Secrets:
//   supabase secrets set VPS_API_URL=https://ffmpeg.example.com/api
//   supabase secrets set VPS_API_KEY=...

import { corsHeaders, handleOptions, json } from "../_shared/cors.ts";
import { getCaller, getServiceClient } from "../_shared/auth.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return handleOptions();
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const vpsUrl = Deno.env.get("VPS_API_URL");
  const vpsKey = Deno.env.get("VPS_API_KEY");
  if (!vpsUrl || !vpsKey) return json({ error: "missing_vps_config" }, { status: 500 });

  const caller = await getCaller(req);
  const supabase = getServiceClient();

  // tool=add-subtitles-to-video|extract-subtitles|style-subtitles
  const tool = new URL(req.url).searchParams.get("tool") ?? "add-subtitles-to-video";

  // Forward the multipart body verbatim — VPS handles the heavy lifting.
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
    const message = await upstream.text();
    return json({ error: "vps_failed", message }, { status: 502 });
  }

  // The VPS replies with { url, filename }.
  const data = (await upstream.json()) as { url: string; filename: string };

  if (caller) {
    await supabase.from("jobs").insert({
      user_id: caller.id,
      tool,
      status: "done",
      output_file_url: data.url,
      completed_at: new Date().toISOString(),
    });
  }

  return json(data, { headers: corsHeaders });
});
