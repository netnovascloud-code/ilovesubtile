import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** Refreshes the Supabase session cookie and propagates any extra request
 *  headers (e.g. the per-request CSP nonce) to the rendered page. The page
 *  reads them via next/headers `headers()`. */
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
  if (!url || !anon) return response;

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

  await supabase.auth.getUser();
  return response;
}
