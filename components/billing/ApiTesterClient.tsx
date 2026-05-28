"use client";

import { useState } from "react";
import { Play, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUPABASE_URL } from "@/lib/utils";

const BASE = `${SUPABASE_URL}/functions/v1/api-gateway`;

export function ApiTesterClient() {
  const [key, setKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function test() {
    if (!key.trim() || busy) return;
    setBusy(true); setError(null); setResult(null);
    try {
      const res = await fetch(`${BASE}?action=me`, { headers: { Authorization: `Bearer ${key.trim()}` } });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(`HTTP ${res.status} — ${data.error ?? "unknown error"}`); return; }
      setResult(JSON.stringify(data, null, 2));
    } catch (e) { setError(`Network error: ${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  return (
    <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
      <h3 className="font-semibold text-ink-900">Try it live</h3>
      <p className="mt-1 text-sm text-ink-500">Paste your API key — we call <code className="rounded bg-ink-100 px-1 text-xs">?action=me</code> (0 credits) and show the raw response.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="cf_live_…"
          className="min-w-0 flex-1 rounded-md border border-ink-200 bg-white px-3 py-2 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        <Button onClick={test} disabled={!key.trim() || busy} size="sm">
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
          {busy ? "Calling…" : "Test"}
        </Button>
      </div>
      {result && <pre className="mt-3 overflow-x-auto rounded bg-ink-900 p-3 text-xs text-ink-50">{result}</pre>}
      {error && <p className="mt-3 flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
    </div>
  );
}
