import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { edgeFnUrl, safeInternalPath } from "@/lib/utils";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  // Shared strict validation — blocks open-redirect via scheme, //host or /\host.
  const redirect = safeInternalPath(url.searchParams.get("redirect"));

  // No code → nothing to exchange. Never fall through to the success redirect
  // (that would silently leave any pre-existing session in place and look like
  // you logged into the "wrong" account). Send back to login.
  if (!code) {
    const back = new URL("/login", url.origin);
    back.searchParams.set("error", "oauth");
    return NextResponse.redirect(back);
  }

  {
    const supabase = getSupabaseServer();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    // If the exchange fails (expired/replayed code, PKCE verifier mismatch),
    // do NOT continue — otherwise the user keeps whatever session the browser
    // already had, which presents as being signed into the previous account.
    if (exchangeError) {
      const back = new URL("/login", url.origin);
      back.searchParams.set("error", "oauth");
      return NextResponse.redirect(back);
    }

    // Best-effort welcome email for brand-new accounts. Gated on a fresh
    // profile (created < 2 min ago) so it only fires right after signup,
    // not on every subsequent login. Never blocks the redirect.
    try {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (user?.email && anon) {
        // Record ToS acceptance + marketing opt-in on the profile if not yet
        // set. For email signups the value is forwarded via user_metadata by
        // EmailAuthForm; for OAuth (Google) signups the click-through notice
        // above the Google button on /register constitutes acceptance, so we
        // stamp the current time. Idempotent: a `coalesce` keeps the original
        // timestamp on subsequent logins.
        const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
        const tosFromMeta = typeof meta.tos_accepted_at === "string" ? meta.tos_accepted_at : new Date().toISOString();
        const marketingFromMeta = meta.marketing_opt_in === true;
        try {
          await supabase.rpc("ensure_tos_acceptance", {
            p_user: user.id, p_ts: tosFromMeta, p_marketing: marketingFromMeta,
          });
        } catch { /* ignore — legal stamp is best-effort, will retry on next login */ }
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
