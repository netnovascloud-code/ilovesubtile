"use client";

import { useState } from "react";
import { Play, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SUPABASE_URL } from "@/lib/utils";

const BASE = `${SUPABASE_URL}/functions/v1/api-gateway`;

type Endpoint = { id: "me" | "rephrase" | "summarize"; label: string; method: "GET" | "POST"; cost: number; body?: object; payload?: () => string };

const ENDPOINTS: Endpoint[] = [
  { id: "me", label: "/me", method: "GET", cost: 0 },
  { id: "rephrase", label: "/rephrase", method: "POST", cost: 3, payload: () => "Hey can u send file asap thx" },
  { id: "summarize", label: "/summarize", method: "POST", cost: 3, payload: () => "Wyrlo is a free online conversion platform with 90+ tools spanning images, PDF, audio, video, code and AI text — most run entirely in the browser." },
];

export function ApiTesterClient() {
  const [key, setKey] = useState("");
  const [endpoint, setEndpoint] = useState<Endpoint["id"]>("me");
  const [input, setInput] = useState(ENDPOINTS[1].payload!());
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cur = ENDPOINTS.find((e) => e.id === endpoint)!;

  async function test() {
    if (!key.trim() || busy) return;
    setBusy(true); setError(null); setResult(null);
    try {
      const url = `${BASE}?action=${endpoint}`;
      const init: RequestInit = {
        method: cur.method,
        headers: { Authorization: `Bearer ${key.trim()}`, ...(cur.method === "POST" ? { "Content-Type": "application/json" } : {}) },
      };
      if (cur.method === "POST") {
        const opts = endpoint === "rephrase" ? { text: input, style: "formal professional" }
          : endpoint === "summarize" ? { text: input, format: "sentence" }
          : { text: input };
        init.body = JSON.stringify(opts);
      }
      const res = await fetch(url, init);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(`HTTP ${res.status} — ${data.error ?? "unknown"}`); return; }
      setResult(JSON.stringify(data, null, 2));
    } catch (e) { setError(`Network error: ${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  return (
    <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
      <h3 className="font-semibold text-ink-900">Try it live</h3>
      <p className="mt-1 text-sm text-ink-500">Paste your API key, pick an endpoint, we make the real call and show the response.</p>

      <div className="mt-3 inline-flex rounded-lg border border-ink-200 bg-white p-1">
        {ENDPOINTS.map((e) => (
          <button key={e.id} onClick={() => { setEndpoint(e.id); if (e.payload) setInput(e.payload()); }} className={cn("rounded-md px-2.5 py-1 text-xs font-mono font-medium transition-colors", endpoint === e.id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
            {e.label}
            {e.cost > 0 && <span className={cn("ml-1 text-[10px]", endpoint === e.id ? "text-white/80" : "text-amber-600")}>−{e.cost}c</span>}
          </button>
        ))}
      </div>

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

      {cur.method === "POST" && (
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-2 h-20 w-full resize-y rounded-md border border-ink-200 bg-white p-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          placeholder="Text to send…"
        />
      )}

      {result && <pre className="mt-3 max-h-72 overflow-auto rounded bg-ink-900 p-3 text-xs text-ink-50">{result}</pre>}
      {error && <p className="mt-3 flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
    </div>
  );
}
