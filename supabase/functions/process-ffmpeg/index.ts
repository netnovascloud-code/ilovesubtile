// Wyrlo — forwarder to a self-hosted FFmpeg worker.
//
// This function intentionally has NO third-party API integration. It just
// forwards a multipart upload to a VPS (or any HTTP service) that you
// run yourself. Until VPS_API_URL and VPS_API_KEY are set as Supabase
// secrets, the function returns 500 `missing_vps_config` — every
// FFmpeg-backed tool page will surface that to the user as
// "Backend not configured for this tool yet."
//
// When you're ready to wire it up:
//   supabase secrets set VPS_API_URL=https://your-ffmpeg-host/api
//   supabase secrets set VPS_API_KEY=...
//
// Deploy: supabase functions deploy process-ffmpeg

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
