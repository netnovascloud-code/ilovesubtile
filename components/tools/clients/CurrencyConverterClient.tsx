"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Live currency converter using the Frankfurter public API (no key, ECB rates).
 * Endpoint: https://api.frankfurter.dev/v1/latest?from=EUR&to=USD,GBP,...
 * Falls back gracefully on network errors. Rates cached for 1 hour in
 * sessionStorage to avoid hammering the API while the user plays.
 */

const CURRENCIES = [
  "EUR", "USD", "GBP", "JPY", "CNY", "CAD", "AUD", "CHF", "SEK", "NOK", "DKK", "PLN", "CZK", "HUF",
  "RON", "BGN", "TRY", "RUB", "INR", "BRL", "MXN", "ZAR", "SGD", "HKD", "KRW", "NZD", "ILS", "AED",
];

const CACHE_KEY = "wyrlo_fx_rates_v1";
const CACHE_TTL_MS = 60 * 60 * 1000;

type Rates = { base: string; date: string; rates: Record<string, number> };

async function fetchRates(base: string): Promise<Rates> {
  const cached = sessionStorage.getItem(`${CACHE_KEY}:${base}`);
  if (cached) {
    try {
      const { ts, data } = JSON.parse(cached) as { ts: number; data: Rates };
      if (Date.now() - ts < CACHE_TTL_MS) return data;
    } catch {}
  }
  const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${base}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const data: Rates = { base, date: json.date, rates: json.rates };
  // The API doesn't include the base in `rates`; add a 1.0 self-rate for symmetry.
  data.rates[base] = 1;
  sessionStorage.setItem(`${CACHE_KEY}:${base}`, JSON.stringify({ ts: Date.now(), data }));
  return data;
}

function fmt(n: number, cur: string): string {
  try {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: cur, maximumFractionDigits: 2 }).format(n);
  } catch {
    return n.toFixed(2) + " " + cur;
  }
}

export function CurrencyConverterClient() {
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState("100");
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchRates(from)
      .then((r) => { if (!cancelled) setRates(r); })
      .catch((e) => { if (!cancelled) setError(`Could not fetch live rates (${(e as Error).message}). The market may be closed.`); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [from]);

  const result = useMemo(() => {
    const a = Number(amount);
    if (!rates || !Number.isFinite(a)) return null;
    const r = rates.rates[to];
    if (!r) return null;
    return { value: a * r, rate: r };
  }, [amount, to, rates]);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <label className="block text-xs font-medium text-ink-500">From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)}
            className="mt-1 w-full rounded-md border border-ink-200 bg-white px-3 py-2 font-semibold text-ink-900">
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="mt-3 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-2xl font-semibold text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>

        <div className="flex items-center justify-center">
          <Button variant="outline" size="sm" onClick={swap} aria-label="Swap">
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-4">
          <label className="block text-xs font-medium text-brand-700">To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)}
            className="mt-1 w-full rounded-md border border-ink-200 bg-white px-3 py-2 font-semibold text-ink-900">
            {CURRENCIES.filter((c) => c !== from).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="mt-3 truncate text-2xl font-semibold text-ink-900">
            {loading ? <Loader2 className="h-5 w-5 animate-spin text-brand-500" />
              : result ? fmt(result.value, to) : "—"}
          </div>
        </div>
      </div>

      {result && rates && (
        <div className="text-sm text-ink-500">
          1 {from} = <span className="font-mono text-ink-900">{result.rate.toFixed(6)}</span> {to} · ECB rates {rates.date}
        </div>
      )}
      {error && <p className="flex items-center gap-1.5 text-sm text-red-600"><AlertCircle className="h-4 w-4" /> {error}</p>}
      <p className="text-xs text-ink-400">Rates from frankfurter.dev (ECB) — for information only, not for trading.</p>
    </div>
  );
}
