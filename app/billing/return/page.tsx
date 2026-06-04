"use client";

/**
 * /billing/return — iframe break-out after a successful Lemon Squeezy checkout.
 *
 * The checkout iframe on /billing/checkout finishes by navigating itself to
 * this URL (LS's redirect_url). Same-origin → we can read window.top and
 * promote the redirect to the parent frame so the user lands on the dashboard
 * outside the iframe. If we're already on the top frame (LS sometimes opens
 * the redirect_url in a new tab), we just navigate normally.
 *
 * `?dest=` is sanitised: only same-origin paths are followed; anything else
 * falls back to /dashboard.
 */

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function safeDest(raw: string | null): string {
  if (!raw) return "/dashboard";
  // Only allow paths on our own site.
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/dashboard";
  return raw;
}

export default function BillingReturnPage() {
  const params = useSearchParams();
  const router = useRouter();
  const dest = safeDest(params.get("dest"));

  useEffect(() => {
    try {
      if (window.top && window.top !== window.self) {
        window.top.location.href = dest;
        return;
      }
    } catch {
      // Cross-origin top — fall through to normal router push.
    }
    router.replace(dest);
  }, [dest, router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-ink-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Finalising your purchase…
      </div>
    </div>
  );
}
