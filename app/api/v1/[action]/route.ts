import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ALLOWED = new Set(["transcribe", "translate"]);

/**
 * Public REST API proxy. Forwards to the api-gateway Edge Function, which
 * validates the CaptionFlow API key (cf_live_...) and deducts credits.
 * This route holds no secrets — the user's key travels in Authorization,
 * and the gateway does all auth + billing.
 *
 *   POST /api/v1/transcribe   (multipart 'file'  OR  JSON { file_url })
 *   POST /api/v1/translate    (+ target_lang)
 */
export async function POST(req: Request, { params }: { params: { action: string } }) {
  if (!ALLOWED.has(params.action)) {
    return NextResponse.json({ error: "unknown_action" }, { status: 404 });
  }
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anon) {
    return NextResponse.json({ error: "backend_not_configured" }, { status: 503 });
  }

  const auth = req.headers.get("authorization");
  if (!auth) {
    return NextResponse.json(
      { error: "missing_api_key", message: "Send 'Authorization: Bearer cf_live_...'." },
      { status: 401 },
    );
  }

  const target = `${supabaseUrl}/functions/v1/api-gateway?action=${params.action}`;
  try {
    const upstream = await fetch(target, {
      method: "POST",
      headers: {
        Authorization: auth,
        apikey: anon,
        "Content-Type": req.headers.get("content-type") ?? "application/octet-stream",
      },
      body: req.body,
      // @ts-expect-error duplex is part of the fetch spec, not in DOM types yet.
      duplex: "half",
    });
    const body = await upstream.text();
    return new NextResponse(body, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "upstream_failed", message: err instanceof Error ? err.message : "Unknown" },
      { status: 502 },
    );
  }
}
