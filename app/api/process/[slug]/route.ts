import { NextResponse } from "next/server";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { checkAndReserveQuota } from "@/lib/quotas";

export const runtime = "nodejs";

const FN_MAP: Record<string, string> = {
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

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const tool = TOOLS_BY_SLUG[params.slug];
  if (!tool) return NextResponse.json({ error: "unknown_tool" }, { status: 404 });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anon) {
    return NextResponse.json(
      {
        error: "backend_not_configured",
        message: "Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.",
      },
      { status: 503 },
    );
  }

  const fn = FN_MAP[tool.slug];
  if (!fn) {
    return NextResponse.json(
      { error: "client_only", message: "This tool runs entirely in the browser." },
      { status: 400 },
    );
  }

  // Daily quota gate — applies to signed-in users only (anonymous traffic
  // is limited at the Edge Function level when it lands).
  const quota = await checkAndReserveQuota();
  if (!quota.ok) {
    return NextResponse.json(
      {
        error: "daily_limit_reached",
        plan: quota.plan,
        resetAt: quota.resetAt,
        message: "You've hit today's free limit. Upgrade to Pro for unlimited runs.",
      },
      { status: 429 },
    );
  }

  const target = `${supabaseUrl}/functions/v1/${fn}?tool=${encodeURIComponent(tool.slug)}`;
  try {
    const upstream = await fetch(target, {
      method: "POST",
      headers: {
        Authorization: req.headers.get("authorization") ?? `Bearer ${anon}`,
        "Content-Type": req.headers.get("content-type") ?? "application/octet-stream",
      },
      body: req.body,
      // @ts-expect-error — duplex is part of the fetch spec, not in DOM types yet.
      duplex: "half",
    });
    const body = await upstream.text();
    return new NextResponse(body, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "application/json",
        "X-Plan": quota.plan,
        "X-Remaining": String(quota.remaining === Infinity ? "unlimited" : quota.remaining),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "upstream_failed", message: err instanceof Error ? err.message : "Unknown" },
      { status: 502 },
    );
  }
}
