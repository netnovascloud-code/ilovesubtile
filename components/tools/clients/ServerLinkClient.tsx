"use client";

import { useState } from "react";
import Link from "next/link";
import { Link2, Copy, Check, ShieldCheck, LogIn, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { callTool } from "@/lib/tool-api";
import { useUser } from "@/hooks/useUser";

type Kind = "short" | "deep" | "magic";

type CreateResult = { code: string; url: string; kind: Kind; expires_at: string | null; max_clicks: number | null };

const COPY = {
  short: {
    title: "Shorten a link",
    blurb: "Turn a long URL into a tidy konvertools.com/s/… link. Every destination is screened with Google Safe Browsing before it's created.",
    cta: "Create short link",
  },
  deep: {
    title: "Create a smart / deep link",
    blurb: "One link that opens your iOS or Android app when installed, and falls back to a web page everywhere else.",
    cta: "Create smart link",
  },
  magic: {
    title: "Create a magic link",
    blurb: "A single-use or time-limited link — perfect for confirmations, one-off downloads or invitations. It stops working once it expires or hits its click limit.",
    cta: "Create magic link",
  },
} as const;

export function ServerLinkClient({ kind }: { kind: Kind }) {
  const { user, loading } = useUser();
  const [target, setTarget] = useState("");
  const [ios, setIos] = useState("");
  const [android, setAndroid] = useState("");
  const [alias, setAlias] = useState("");
  const [days, setDays] = useState("");
  const [maxClicks, setMaxClicks] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateResult | null>(null);
  const [copied, setCopied] = useState(false);

  const copy = useCopy(setCopied);

  async function create() {
    setError(null);
    setResult(null);
    if (!target.trim()) {
      setError("Enter the destination URL.");
      return;
    }
    setBusy(true);
    try {
      const payload: Record<string, unknown> = { kind, target_url: target.trim() };
      if (alias.trim()) payload.code = alias.trim();
      if (kind === "deep") {
        if (ios.trim()) payload.ios_url = ios.trim();
        if (android.trim()) payload.android_url = android.trim();
      }
      if (kind === "magic") {
        if (days.trim()) payload.expires_in_days = Number(days);
        if (maxClicks.trim()) payload.max_clicks = Number(maxClicks);
      }
      const res = await callTool("create-link", payload);
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        setError("Please sign in to create links.");
        return;
      }
      if (!res.ok) {
        setError((data as { message?: string }).message ?? "Could not create the link. Please try again.");
        return;
      }
      setResult(data as CreateResult);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  // ── login gate ──────────────────────────────────────────────────────
  if (!loading && !user) {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-8 text-center shadow-card">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-600">
          <LogIn className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-ink-900">Sign in to create links</h3>
        <p className="mx-auto mt-1 max-w-md text-sm text-ink-500">
          Links are tied to your account so you can manage and revoke them, and so we can screen every
          destination for phishing. It’s free.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Link href={`/login?redirect=${encodeURIComponent(redirectFor(kind))}`}>
            <Button>Sign in</Button>
          </Link>
          <Link href={`/register?redirect=${encodeURIComponent(redirectFor(kind))}`}>
            <Button variant="outline">Create a free account</Button>
          </Link>
        </div>
      </div>
    );
  }

  const c = COPY[kind];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-ink-100 bg-white p-5 shadow-card">
        <div className="mb-4 flex items-start gap-3">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
            <Link2 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-ink-900">{c.title}</h2>
            <p className="mt-0.5 text-sm text-ink-500">{c.blurb}</p>
          </div>
        </div>

        <div className="space-y-3">
          <Field label={kind === "deep" ? "Web fallback URL" : "Destination URL"}>
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="https://example.com/your-page"
              inputMode="url"
              className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </Field>

          {kind === "deep" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="iOS app URL (optional)" hint="e.g. myapp:// or an App Store link">
                <input value={ios} onChange={(e) => setIos(e.target.value)} placeholder="https://apps.apple.com/…"
                  className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
              </Field>
              <Field label="Android app URL (optional)" hint="e.g. intent:// or a Play Store link">
                <input value={android} onChange={(e) => setAndroid(e.target.value)} placeholder="https://play.google.com/…"
                  className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
              </Field>
            </div>
          )}

          {kind === "magic" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Expires after (days)" hint="Leave blank for no time limit">
                <input value={days} onChange={(e) => setDays(e.target.value.replace(/\D/g, ""))} placeholder="7" inputMode="numeric"
                  className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
              </Field>
              <Field label="Max clicks" hint="Defaults to 1 (single-use) if both are blank">
                <input value={maxClicks} onChange={(e) => setMaxClicks(e.target.value.replace(/\D/g, ""))} placeholder="1" inputMode="numeric"
                  className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
              </Field>
            </div>
          )}

          <Field label="Custom alias (optional)" hint="Letters, numbers, - and _ — 3 to 32 chars">
            <div className="flex items-stretch overflow-hidden rounded-lg border border-ink-200 bg-white focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
              <span className="flex items-center bg-ink-50 px-3 text-sm text-ink-400">konvertools.com/s/</span>
              <input value={alias} onChange={(e) => setAlias(e.target.value.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase())} placeholder="my-link"
                className="flex-1 px-3 py-2 text-sm focus:outline-none" />
            </div>
          </Field>

          <div className="flex items-center justify-between gap-3 pt-1">
            <p className="inline-flex items-center gap-1.5 text-xs text-ink-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Anti-phishing screened
            </p>
            <Button onClick={create} disabled={busy}>
              {busy ? "Creating…" : c.cta}
            </Button>
          </div>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        </div>
      </div>

      {result && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <p className="mb-2 text-sm font-medium text-emerald-800">Your link is ready</p>
          <div className="flex items-stretch gap-2">
            <input
              readOnly
              value={result.url}
              onFocus={(e) => e.currentTarget.select()}
              className="flex-1 rounded-lg border border-emerald-200 bg-white px-3 py-2 font-mono text-sm text-ink-900"
            />
            <Button variant="outline" onClick={() => copy(result.url)}>
              {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
            </Button>
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline"><ExternalLink className="h-4 w-4" /> Open</Button>
            </a>
          </div>
          <p className="mt-2 text-xs text-emerald-700">
            {result.kind === "magic"
              ? `One-time / limited link${result.expires_at ? `, expires ${new Date(result.expires_at).toLocaleDateString()}` : ""}${result.max_clicks ? `, ${result.max_clicks} click${result.max_clicks > 1 ? "s" : ""} max` : ""}.`
              : result.kind === "deep"
              ? "Opens your app when installed, web fallback otherwise."
              : "Manage your links from your dashboard."}
          </p>
        </div>
      )}
    </div>
  );
}

function redirectFor(kind: Kind): string {
  return kind === "deep" ? "/deep-link" : kind === "magic" ? "/magic-link" : "/url-shortener";
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-400">{hint}</span>}
    </label>
  );
}

function useCopy(setCopied: (v: boolean) => void) {
  return async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
}
