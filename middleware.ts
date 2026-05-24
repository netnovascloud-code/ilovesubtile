import { NextResponse, type NextRequest } from "next/server";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Refresh the Supabase session cookie if envs are present.
  const response = await updateSupabaseSession(request);

  // Auth-gate /dashboard. Anonymous traffic gets redirected to /login.
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/dashboard")) {
    const hasSession =
      request.cookies.has("sb-access-token") ||
      [...request.cookies.getAll()].some((c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"));
    if (!hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|og/|robots.txt|sitemap.xml).*)",
  ],
};
