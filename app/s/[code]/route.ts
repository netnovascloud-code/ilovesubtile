import { NextResponse } from "next/server";

// Public link resolver for konvertools.com/s/<code>.
//   • short / magic → 302 redirect to the destination (410 once dead).
//   • deep          → tiny HTML interstitial that bounces to the iOS / Android
//                     app URL when present, else the web fallback.
// Resolution goes through the resolve_link() SECURITY DEFINER RPC (granted to
// anon), so this route needs no service role and can never read other rows.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Resolved = {
  kind: "short" | "deep" | "magic";
  target_url: string;
  ios_url: string | null;
  android_url: string | null;
  expired: boolean;
};

async function resolve(code: string): Promise<Resolved | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  try {
    const res = await fetch(`${url}/rest/v1/rpc/resolve_link`, {
      method: "POST",
      headers: { apikey: anon, Authorization: `Bearer ${anon}`, "Content-Type": "application/json" },
      body: JSON.stringify({ p_code: code }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const rows = (await res.json()) as Resolved[];
    return Array.isArray(rows) && rows.length ? rows[0] : null;
  } catch {
    return null;
  }
}

function notFoundPage(): Response {
  return new NextResponse(page("Link not found", "This short link doesn’t exist or was removed."), {
    status: 404,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function expiredPage(): Response {
  return new NextResponse(page("Link expired", "This link has expired or reached its usage limit."), {
    status: 410,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function page(title: string, body: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} — Konvertools</title><style>body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#0B0F19;color:#fff;display:grid;place-items:center;min-height:100vh;text-align:center}main{padding:2rem;max-width:28rem}h1{font-size:1.5rem;margin:0 0 .5rem}p{color:#9aa3b2;margin:0 0 1.5rem}a{color:#7c9cff;text-decoration:none;font-weight:600}</style></head><body><main><h1>${title}</h1><p>${body}</p><a href="https://konvertools.com">← Back to Konvertools</a></main></body></html>`;
}

// Deep-link interstitial: pick the platform target client-side. Falls back to
// the web URL on desktop or if the app isn't installed.
function deepLinkPage(r: Resolved): string {
  const data = JSON.stringify({ ios: r.ios_url, android: r.android_url, web: r.target_url });
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Opening…</title><style>body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#0B0F19;color:#fff;display:grid;place-items:center;min-height:100vh;text-align:center}main{padding:2rem}p{color:#9aa3b2}a{color:#7c9cff}</style></head><body><main><p>Opening the app…</p><p><a id="fallback" href="#">Tap here if nothing happens</a></p></main><script>
(function(){
  var t=${data};
  var ua=navigator.userAgent||"";
  var isIOS=/iPhone|iPad|iPod/i.test(ua);
  var isAndroid=/Android/i.test(ua);
  var dest=t.web;
  if(isIOS&&t.ios)dest=t.ios;else if(isAndroid&&t.android)dest=t.android;
  var fb=document.getElementById("fallback");
  if(fb)fb.href=t.web||dest;
  // Try the deep target; if the app doesn't grab it, fall back to web shortly after.
  if(dest!==t.web&&t.web){
    var bounced=false;
    setTimeout(function(){ if(!bounced) window.location.replace(t.web); },1500);
    window.addEventListener("pagehide",function(){bounced=true;});
    window.addEventListener("blur",function(){bounced=true;});
  }
  window.location.replace(dest);
})();
</script></body></html>`;
}

export async function GET(_request: Request, { params }: { params: { code: string } }) {
  const code = (params.code ?? "").trim();
  if (!code || !/^[a-z0-9_-]{1,64}$/i.test(code)) return notFoundPage();

  const r = await resolve(code);
  if (!r) return notFoundPage();
  if (r.expired) return expiredPage();

  if (r.kind === "deep") {
    return new NextResponse(deepLinkPage(r), {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  // short / magic → straight redirect.
  return NextResponse.redirect(r.target_url, { status: 302, headers: { "Cache-Control": "no-store" } });
}
