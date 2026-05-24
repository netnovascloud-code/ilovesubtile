import { NextResponse } from "next/server";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";

export const runtime = "nodejs";

/**
 * Generic forwarder: client posts a multipart upload here, we authenticate the
 * user, then forward to the matching Supabase Edge Function. The Edge Function
 * holds the third-party API keys (OpenAI, DeepL, Mistral) — we never ship them
 * to the browser.
 */
export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const tool = TOOLS_BY_SLUG[params.slug];
  if (!tool) return NextResponse.json({ error: "Unknown tool" }, { status: 404 });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anon) {
    return NextResponse.json(
      {
        error: "backend_not_configured",
        message:
          "Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY and deploy the matching Edge Function.",
      },
      { status: 503 },
    );
  }

  const fnMap: Record<string, string> = {
    "subtitle-generator": "process-subtitles",
    "tiktok-subtitles": "process-subtitles",
    "translate-subtitles": "translate-subtitles",
    "batch-translate": "translate-subtitles",
    "youtube-chapters": "ai-process",
    "auto-sync": "ai-process",
    "add-subtitles-to-video": "process-ffmpeg",
    "extract-subtitles": "process-ffmpeg",
    "style-subtitles": "process-ffmpeg",
  };
  const fn = fnMap[tool.slug];
  if (!fn) {
    return NextResponse.json(
      { error: "client_only", message: "This tool runs entirely in the browser." },
      { status: 400 },
    );
  }

  // Forward the multipart body as-is.
  const target = `${supabaseUrl}/functions/v1/${fn}?tool=${encodeURIComponent(tool.slug)}`;
  try {
    const upstream = await fetch(target, {
      method: "POST",
      headers: {
        // The Edge Function will accept the same auth as the browser client.
        Authorization: req.headers.get("authorization") ?? `Bearer ${anon}`,
        // Pass through the multipart content type with its boundary.
        "Content-Type": req.headers.get("content-type") ?? "application/octet-stream",
      },
      body: req.body,
      // Required when forwarding a ReadableStream as a Node fetch body.
      // @ts-expect-error — duplex is part of the fetch spec but not yet in DOM types.
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
