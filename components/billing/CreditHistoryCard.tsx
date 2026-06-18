"use client";

import { useEffect, useState } from "react";
import { History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { getBilling } from "@/lib/i18n/account";
import { type Locale } from "@/lib/i18n/locales";

type Tx = { id: string; amount: number; reason: string; balance_after: number; created_at: string };

/**
 * Recent credit-ledger entries for the signed-in user. RLS ("credit_tx read
 * own") restricts the query to the caller's own rows. Renders nothing until the
 * fetch resolves — so there is no SSR-baked markup to hydration-mismatch — and
 * stays hidden when the ledger is empty.
 */
export function CreditHistoryCard({ locale = "en" }: { locale?: Locale }) {
  const s = getBilling(locale);
  const [rows, setRows] = useState<Tx[] | null>(null);

  /** Turn a ledger `reason` ("pack:scale", "api:rephrase", …) into a friendly label. */
  function label(reason: string): string {
    if (reason.startsWith("pack:")) return s.creditPack(reason.slice(5));
    if (reason.startsWith("api:")) return s.apiCall(reason.slice(4));
    if (reason === "business_monthly_grant") return s.monthlyGrant;
    return reason;
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const sb = getSupabaseBrowser();
        const { data: u } = await sb.auth.getUser();
        if (!u.user) { if (!cancelled) setRows([]); return; }
        const { data } = await sb
          .from("credit_transactions")
          .select("id, amount, reason, balance_after, created_at")
          .eq("user_id", u.user.id)
          .order("created_at", { ascending: false })
          .limit(15);
        if (!cancelled) setRows((data as Tx[] | null) ?? []);
      } catch { if (!cancelled) setRows([]); }
    })();
    return () => { cancelled = true; };
  }, []);

  if (!rows || rows.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><History className="h-4 w-4 text-brand-500" /> {s.creditHistory}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-ink-100 text-sm">
          {rows.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-ink-800">{label(t.reason)}</p>
                <p className="text-xs text-ink-400">
                  {new Date(t.created_at).toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" })}
                </p>
              </div>
              <div className="shrink-0 text-right tabular-nums">
                <p className={t.amount >= 0 ? "font-medium text-emerald-600" : "font-medium text-ink-700"}>
                  {t.amount >= 0 ? "+" : ""}{t.amount.toLocaleString(locale)}
                </p>
                <p className="text-xs text-ink-400">{s.bal(t.balance_after.toLocaleString(locale))}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
