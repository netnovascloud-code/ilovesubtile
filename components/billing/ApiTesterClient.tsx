"use client";

import { useState } from "react";
import { Play, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SUPABASE_URL } from "@/lib/utils";

const BASE = `${SUPABASE_URL}/functions/v1/api-gateway`;

type EndpointId = "me" | "rephrase" | "summarize" | "translate" | "humanize" | "convert_code";
type Endpoint = { id: EndpointId; label: string; method: "GET" | "POST"; cost: number; payload?: () => string };

const ENDPOINTS: Endpoint[] = [
  { id: "me", label: "/me", method: "GET", cost: 0 },
  { id: "rephrase", label: "/rephrase", method: "POST", cost: 3, payload: () => "Hey can u send file asap thx" },
  { id: "summarize", label: "/summarize", method: "POST", cost: 3, payload: () => "Konvertools is a free online conversion platform with 90+ tools spanning images, PDF, audio, video, code and AI text — most run entirely in the browser." },
  { id: "translate", label: "/translate", method: "POST", cost: 5, payload: () => "Hello world, this is a quick test." },
  { id: "humanize", label: "/humanize", method: "POST", cost: 5, payload: () => "The aforementioned methodology facilitates the optimization of operational efficiencies across the organization." },
  { id: "convert_code", label: "/convert_code", method: "POST", cost: 4, payload: () => "def add(a, b):\n    return a + b" },
];

export function ApiTesterClient() {
  const [key, setKey] = useState("");
  const [endpoint, setEndpoint] = useState<Endpoint["id"]>("me");
  const [input, setInput] = useState(ENDPOINTS[1].payload!());
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);

  const cur = ENDPOINTS.find((e) => e.id === endpoint)!;

  async function test() {
    if (!key.trim() || busy) return;
    setBusy(true); setError(null); setResult(null); setCredits(null);
    try {
      const url = `${BASE}?action=${endpoint}`;
      const init: RequestInit = {
        method: cur.method,
        headers: { Authorization: `Bearer ${key.trim()}`, ...(cur.method === "POST" ? { "Content-Type": "application/json" } : {}) },
      };
      if (cur.method === "POST") {
        const opts = endpoint === "rephrase" ? { text: input, style: "professional" }
          : endpoint === "summarize" ? { text: input, format: "sentence" }
          : endpoint === "translate" ? { text: input, target_lang: "ES" }
          : endpoint === "humanize" ? { text: input, level: "medium" }
          : endpoint === "convert_code" ? { code: input, from_language: "python", to_language: "javascript" }
          : { text: input };
        init.body = JSON.stringify(opts);
      }
      const res = await fetch(url, init);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(`HTTP ${res.status} — ${data.error ?? "unknown"}${data.message ? `: ${data.message}` : ""}`); return; }
      const bal = typeof data.credits_remaining === "number" ? data.credits_remaining
        : typeof data.credits === "number" ? data.credits : null;
      setCredits(bal);
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
          placeholder="knv_live_…"
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

      {credits !== null && (
        <p className="mt-3 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
          {credits.toLocaleString()} credits remaining
        </p>
      )}
      {result && <pre className="mt-3 max-h-72 overflow-auto rounded bg-ink-900 p-3 text-xs text-ink-50">{result}</pre>}
      {error && <p className="mt-3 flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
    </div>
  );
}
