import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { edgeFnUrl } from "@/lib/utils";

/** Only allow same-origin redirects expressed as a root-relative path.
 *  Anything that looks like a scheme, host or "//" prefix is rejected to
 *  prevent open-redirect phishing via /auth/callback?redirect=https://evil.com. */
function safeRedirectPath(raw: string | null): string {
  const fallback = "/dashboard";
  if (!raw) return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) return fallback;
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw)) return fallback;
  if (raw.length > 512) return fallback;
  return raw;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const redirect = safeRedirectPath(url.searchParams.get("redirect"));

  if (code) {
    const supabase = getSupabaseServer();
    await supabase.auth.exchangeCodeForSession(code);

    // Best-effort welcome email for brand-new accounts. Gated on a fresh
    // profile (created < 2 min ago) so it only fires right after signup,
    // not on every subsequent login. Never blocks the redirect.
    try {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (user?.email && anon) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("created_at, full_name")
          .eq("id", user.id)
          .maybeSingle();
        const createdMs = profile?.created_at ? new Date(profile.created_at).getTime() : 0;
        if (Date.now() - createdMs < 120_000) {
          const { data: sess } = await supabase.auth.getSession();
          const token = sess.session?.access_token;
          if (token) {
            await fetch(edgeFnUrl("send-email"), {
              method: "POST",
              headers: { Authorization: `Bearer ${token}`, apikey: anon, "Content-Type": "application/json" },
              body: JSON.stringify({
                to: user.email,
                template: "welcome",
                data: { name: profile?.full_name ?? undefined },
              }),
            }).catch(() => {});
          }
        }
      }
    } catch {
      // ignore — email is non-critical
    }
  }

  return NextResponse.redirect(new URL(redirect, url.origin));
}
