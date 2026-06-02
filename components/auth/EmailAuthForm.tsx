"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { isPasswordPwned } from "@/lib/leaked-password";

export function EmailAuthForm({ mode, redirect = "/dashboard" }: { mode: "login" | "register"; redirect?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tosAccepted, setTosAccepted] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      const supabase = getSupabaseBrowser();
      if (mode === "register") {
        // Defence in depth — the button is also disabled until tosAccepted.
        // Required by GDPR consent + KONVER Part 6 (legal evidence).
        if (!tosAccepted) {
          setError("You must accept the Terms of Service and Privacy Policy to create an account.");
          return;
        }
        // Block known-breached passwords client-side via HIBP k-anonymity.
        // Only the first 5 chars of the SHA-1 hash leave the device.
        if (await isPasswordPwned(password)) {
          setError("This password has appeared in a known data breach. Please choose a different one.");
          return;
        }
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          // Stash the consent flags in user_metadata so the post-confirmation
          // handler (or a database trigger) can copy them onto the profiles
          // row — supabase.auth.signUp doesn't sign you in until the email
          // is confirmed, so we can't write to profiles right away here.
          options: {
            data: { tos_accepted_at: new Date().toISOString(), marketing_opt_in: marketing },
            emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
          },
        });
        if (error) throw error;
        // Best-effort write: when email-confirmation is disabled, the signUp
        // call already returned a session, so we can update profiles directly.
        if (data.session?.user?.id) {
          await supabase
            .from("profiles")
            .update({ tos_accepted_at: new Date().toISOString(), marketing_opt_in: marketing })
            .eq("id", data.session.user.id);
        }
        setInfo("Check your inbox to confirm your email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(redirect);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-ink-700" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-ink-700" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          required
          minLength={8}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1"
        />
      </div>
      {mode === "register" && (
        <div className="space-y-2 rounded-md border border-ink-100 bg-ink-50/40 p-3">
          <label className="flex items-start gap-2 text-sm text-ink-700">
            <input
              type="checkbox"
              required
              checked={tosAccepted}
              onChange={(e) => setTosAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-brand-500"
            />
            <span>
              I accept the{" "}
              <Link href="/terms" target="_blank" className="text-brand-600 underline">
                Terms of Service
              </Link>{" "}
              and the{" "}
              <Link href="/privacy" target="_blank" className="text-brand-600 underline">
                Privacy Policy
              </Link>
              . <span className="text-red-600">*</span>
            </span>
          </label>
          <label className="flex items-start gap-2 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-brand-500"
            />
            <span className="text-ink-600">
              Send me occasional emails about new tools and updates (optional).
            </span>
          </label>
        </div>
      )}
      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
      {info && (
        <p className="rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {info}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={loading || (mode === "register" && !tosAccepted)}>
        {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
      </Button>
    </form>
  );
}
