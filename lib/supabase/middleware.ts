import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** Refreshes the Supabase session cookie and propagates any extra request
 *  headers (e.g. the per-request CSP nonce) to the rendered page. The page
 *  reads them via next/headers `headers()`. Also returns the caller's id and
 *  Authenticator Assurance Level (aal1 / aal2) so middleware can enforce 2FA. */
export async function updateSupabaseSession(request: NextRequest, extraReqHeaders?: Headers) {
  // Bake extra headers into the NextResponse.next({ request: { headers } })
  // invocation so server components downstream can read them.
  const buildRequestInit = (): { headers: Headers } | undefined => {
    if (!extraReqHeaders) return undefined;
    const headers = new Headers(request.headers);
    for (const [k, v] of extraReqHeaders.entries()) headers.set(k, v);
    return { headers };
  };
  let response = NextResponse.next({ request: buildRequestInit() ?? request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return { response, userId: null, aal: null };

  // Anonymous fast-path. The overwhelming majority of traffic is logged-out,
  // and with no `sb-<ref>-auth-token` cookie there is no session to validate
  // or refresh — so skip constructing the client and the GoTrue /user round
  // trip entirely. Without this, every navigation AND every sub-request that
  // matches the middleware matcher hits /auth/v1/user, which is exactly the
  // flood of /user calls visible in the auth logs. (Chunked sessions split the
  // cookie into .0/.1, so match by *contains*, not equality.)
  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.includes("-auth-token"));
  if (!hasAuthCookie) return { response, userId: null, aal: null };

  const supabase = createServerClient(url, anon, {
    cookies: {
      get: (name: string) => request.cookies.get(name)?.value,
      set: (name: string, value: string, options: CookieOptions) => {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({ request: buildRequestInit() ?? request });
        response.cookies.set({ name, value, ...options });
      },
      remove: (name: string, options: CookieOptions) => {
        request.cookies.set({ name, value: "", ...options });
        response = NextResponse.next({ request: buildRequestInit() ?? request });
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  let aal: string | null = null;
  // Only resolve the Authenticator Assurance Level when the MFA gate is armed.
  // The gate (in middleware.ts) ships dormant — it only fires when
  // MFA_REQUIRED === "true" — so fetching the AAL otherwise is a wasted
  // round-trip on every authenticated request.
  if (user && process.env.MFA_REQUIRED === "true") {
    try {
      const { data } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      aal = data?.currentLevel ?? null;
    } catch {
      // Leave aal null on a lookup error — fail-open so a transient glitch can
      // never lock a user out of their own account.
    }
  }
  return { response, userId: user?.id ?? null, aal };
}
