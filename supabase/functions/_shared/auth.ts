import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Resolve the calling user from the Authorization header.
 * Returns null for anonymous requests (which are allowed for the free tier).
 */
export async function getCaller(req: Request) {
  const auth = req.headers.get("Authorization");
  if (!auth) return null;
  const url = Deno.env.get("SUPABASE_URL");
  const anon = Deno.env.get("SUPABASE_ANON_KEY");
  if (!url || !anon) return null;

  const supabase = createClient(url, anon, {
    global: { headers: { Authorization: auth } },
  });
  const { data } = await supabase.auth.getUser();
  return data.user;
}

/** Service-role client for server-side writes (jobs, profiles). */
export function getServiceClient() {
  const url = Deno.env.get("SUPABASE_URL")!;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  return createClient(url, key);
}
