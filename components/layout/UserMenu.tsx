"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, CreditCard, LogOut, ChevronDown } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";

function initials(email: string | null | undefined): string {
  if (!email) return "?";
  const name = email.split("@")[0];
  const parts = name.split(/[.\-_]/).filter(Boolean);
  const a = parts[0]?.[0] ?? name[0] ?? "?";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export function UserMenu({ labels }: { labels: { login: string; start: string; dashboard: string; billing: string; logout: string } }) {
  const { user, plan, loading } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function signOut() {
    try {
      await getSupabaseBrowser().auth.signOut();
    } catch {
      /* ignore */
    }
    window.location.assign("/");
  }

  // Default to the logged-out CTA (the common case + present in static HTML).
  // Once a session is confirmed we swap to the account menu.
  if (loading || !user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="inline-flex h-8 items-center rounded px-3 text-sm font-medium text-ink-700 hover:bg-ink-50"
        >
          {labels.login}
        </Link>
        <Link
          href="/register"
          className="inline-flex h-8 items-center rounded bg-brand-500 px-3 text-sm font-medium text-white hover:bg-brand-600"
        >
          {labels.start}
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-ink-100 bg-white py-1 pl-1 pr-2 text-sm hover:bg-ink-50"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-xs font-semibold text-white">
          {initials(user.email)}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-ink-100 bg-white p-1 shadow-card">
          <div className="px-3 py-2">
            <div className="truncate text-sm font-medium text-ink-900">{user.email}</div>
            <div className="mt-0.5 text-xs uppercase tracking-wide text-brand-600">{plan}</div>
          </div>
          <div className="my-1 h-px bg-ink-100" />
          <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded px-3 py-2 text-sm text-ink-700 hover:bg-ink-50">
            <LayoutDashboard className="h-4 w-4" /> {labels.dashboard}
          </Link>
          <Link href="/dashboard#billing" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded px-3 py-2 text-sm text-ink-700 hover:bg-ink-50">
            <CreditCard className="h-4 w-4" /> {labels.billing}
          </Link>
          <div className="my-1 h-px bg-ink-100" />
          <button onClick={signOut} className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-red-600 hover:bg-red-50">
            <LogOut className="h-4 w-4" /> {labels.logout}
          </button>
        </div>
      )}
    </div>
  );
}
