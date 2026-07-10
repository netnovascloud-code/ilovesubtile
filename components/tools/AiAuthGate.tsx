"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";

/**
 * Gate for AI tools. The Mistral modules cost money and are reserved for
 * signed-in accounts (Free = 5 runs/day), and their backend rejects anonymous
 * callers with a 401. Rather than let a visitor type a prompt and hit that raw
 * error, anonymous users see a clear sign-in prompt in place of the tool.
 * Rendered by ToolPageShell only when `toolRequiresAuth(slug)` is true.
 */
export function AiAuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();

  // Hold the space while auth resolves so we don't flash the tool then swap it
  // for the gate (anonymous) or jump the layout (signed-in).
  if (loading) {
    return (
      <div
        className="min-h-[220px] animate-pulse rounded-xl border border-ink-100 bg-ink-50/50"
        aria-hidden
      />
    );
  }

  if (user) return <>{children}</>;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-ink-100 bg-white p-8 text-center shadow-card">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
        <Lock className="h-6 w-6" />
      </span>
      <div>
        <h2 className="text-lg font-semibold text-ink-900">Sign in to use this AI tool</h2>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-ink-500">
          Our AI tools run on your account — free accounts include 5 AI runs per
          day. Create one in seconds, no card required.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link href="/login">
          <Button>Sign in</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline">Create free account</Button>
        </Link>
      </div>
    </div>
  );
}
