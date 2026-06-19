// Konvertools — `convert` Edge Function: DISABLED (hard kill-switch).
//
// This previously brokered uploads to an EXTERNAL containerised conversion
// microservice (Scaleway). Konvertools no longer uses any external processing
// server: every file conversion runs entirely in the browser (FFmpeg.wasm,
// pdf-lib, canvas, jszip, …) and all AI tasks go to Mistral. The front-end does
// NOT reference this endpoint anymore.
//
// It is kept only as a kill-switch so the old route can never proxy a file to an
// outside server, and so it stays version-controlled. It is safe to delete in
// the Supabase dashboard, along with the CONVERSION_SERVICE_URL and
// CONVERSION_INTERNAL_TOKEN secrets, which are now unused.
//
// Deploy: supabase functions deploy convert

const cors = {
  "Access-Control-Allow-Origin": "https://konvertools.com",
  "Vary": "Origin",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve((req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  return new Response(
    JSON.stringify({
      error: "service_disabled",
      message: "This endpoint is retired. File conversions run entirely in your browser.",
    }),
    { status: 501, headers: { ...cors, "Content-Type": "application/json" } },
  );
});
