"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getSupabaseBrowser } from "@/lib/supabase/client";

export function GoogleButton({ redirect = "/dashboard" }: { redirect?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn() {
    setError(null);
    setLoading(true);
    try {
      const supabase = getSupabaseBrowser();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
        },
      });
      if (error) {
        // Most common cause: the Google provider isn't enabled in
        // Supabase → Authentication → Providers, or the redirect URL
        // isn't allowlisted for this domain.
        setError(
          error.message?.toLowerCase().includes("provider")
            ? "Google sign-in isn't enabled yet. Enable it in Supabase → Authentication → Providers."
            : error.message,
        );
        setLoading(false);
        return;
      }
      // signInWithOAuth returns a URL we must navigate to.
      if (data?.url) {
        window.location.assign(data.url);
        return;
      }
      setError("Could not start Google sign-in.");
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reach the auth server.");
      setLoading(false);
    }
  }

  return (
    <>
    <Button type="button" variant="outline" className="w-full" onClick={signIn} disabled={loading}>
      <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
        <path
          fill="#FFC107"
          d="M43.6 20.5H42V20H24v8h11.3C33.7 32.1 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 5 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.7 20-21 0-1.2-.1-2.4-.4-3.5z"
        />
        <path
          fill="#FF3D00"
          d="M6.3 14.7l6.6 4.8C14.6 16.1 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 7 29.3 5 24 5 16.1 5 9.3 9.1 6.3 14.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.3-4.5 2.1-7.2 2.1-5.3 0-9.7-3.5-11.3-8.4l-6.5 5C9.2 40.9 16 45 24 45z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.2 5.2c-.4.3 6.7-4.9 6.7-15-.0-1.2-.1-2.4-.4-3.4z"
        />
      </svg>
      Continue with Google
    </Button>
    {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </>
  );
}
