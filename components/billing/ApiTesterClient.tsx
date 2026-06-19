"use client";

import { useState } from "react";
import { Play, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SUPABASE_URL } from "@/lib/utils";
import { getApi } from "@/lib/i18n/page-api";
import { type Locale } from "@/lib/i18n/locales";

const BASE = `${SUPABASE_URL}/functions/v1/api-gateway`;

type EndpointId =
  | "me" | "rephrase" | "summarize" | "translate" | "humanize" | "convert_code" | "explain_code"
  | "validate_email" | "scan_url" | "password_check" | "ssl_check" | "analyze_phishing" | "transcribe";
type Endpoint = {
  id: EndpointId;
  label: string;
  method: "GET" | "POST";
  cost: number;
  /** "none" = no body (GET), "text" = textarea body, "file" = multipart upload. */
  kind: "none" | "text" | "file";
  payload?: () => string;
};

const ENDPOINTS: Endpoint[] = [
  { id: "me", label: "/me", method: "GET", cost: 0, kind: "none" },
  { id: "rephrase", label: "/rephrase", method: "POST", cost: 3, kind: "text", payload: () => "Hey can u send file asap thx" },
  { id: "summarize", label: "/summarize", method: "POST", cost: 3, kind: "text", payload: () => "Konvertools is a free online conversion platform with 90+ tools spanning images, PDF, audio, video, code and AI text — most run entirely in the browser." },
  { id: "translate", label: "/translate", method: "POST", cost: 5, kind: "text", payload: () => "Hello world, this is a quick test." },
  { id: "humanize", label: "/humanize", method: "POST", cost: 5, kind: "text", payload: () => "The aforementioned methodology facilitates the optimization of operational efficiencies across the organization." },
  { id: "convert_code", label: "/convert_code", method: "POST", cost: 4, kind: "text", payload: () => "def add(a, b):\n    return a + b" },
  { id: "explain_code", label: "/explain_code", method: "POST", cost: 3, kind: "text", payload: () => "def add(a, b):\n    return a + b" },
  { id: "transcribe", label: "/transcribe", method: "POST", cost: 10, kind: "file" },
  { id: "validate_email", label: "/validate_email", method: "POST", cost: 1, kind: "text", payload: () => "you@example.com" },
  { id: "scan_url", label: "/scan_url", method: "POST", cost: 1, kind: "text", payload: () => "https://example.com" },
  { id: "ssl_check", label: "/ssl_check", method: "POST", cost: 1, kind: "text", payload: () => "example.com" },
  { id: "password_check", label: "/password_check", method: "POST", cost: 1, kind: "text", payload: () => "5BAA61E4C9B93F3F0682250B6CF8331B7EE68FD8" },
  { id: "analyze_phishing", label: "/analyze_phishing", method: "POST", cost: 3, kind: "text", payload: () => "Your account has been suspended. Click here immediately to verify your password or it will be permanently deleted." },
];

function bodyFor(id: EndpointId, input: string): object {
  switch (id) {
    case "rephrase": return { text: input, style: "professional" };
    case "summarize": return { text: input, format: "sentence" };
    case "translate": return { text: input, target_lang: "ES" };
    case "humanize": return { text: input, level: "medium" };
    case "convert_code": return { code: input, from_language: "python", to_language: "javascript" };
    case "explain_code": return { code: input };
    case "validate_email": return { email: input };
    case "scan_url": return { url: input };
    case "ssl_check": return { url: input };
    case "password_check": return { sha1: input.trim().toUpperCase() };
    case "analyze_phishing": return { text: input };
    default: return { text: input };
  }
}

export function ApiTesterClient({ locale = "en" }: { locale?: Locale }) {
  const t = getApi(locale).tester;
  const [key, setKey] = useState("");
  const [endpoint, setEndpoint] = useState<Endpoint["id"]>("me");
  const [input, setInput] = useState(ENDPOINTS[1].payload!());
  const [file, setFile] = useState<File | null>(null);
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
      const headers: Record<string, string> = { Authorization: `Bearer ${key.trim()}` };
      const init: RequestInit = { method: cur.method, headers };
      if (cur.kind === "file") {
        if (!file) { setError(t.networkError("Choose an audio or video file first.")); return; }
        const form = new FormData();
        form.append("file", file);
        init.body = form; // browser sets the multipart Content-Type
      } else if (cur.method === "POST") {
        headers["Content-Type"] = "application/json";
        init.body = JSON.stringify(bodyFor(endpoint, input));
      }
      const res = await fetch(url, init);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(t.httpError(String(res.status), data.error ?? "unknown", data.message ?? "")); return; }
      const bal = typeof data.credits_remaining === "number" ? data.credits_remaining
        : typeof data.credits === "number" ? data.credits : null;
      setCredits(bal);
      setResult(JSON.stringify(data, null, 2));
    } catch (e) { setError(t.networkError((e as Error).message)); }
    finally { setBusy(false); }
  }

  return (
    <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
      <h3 className="font-semibold text-ink-900">{t.title}</h3>
      <p className="mt-1 text-sm text-ink-500">{t.lead}</p>

      <div className="mt-3 flex flex-wrap gap-1 rounded-lg border border-ink-200 bg-white p-1">
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
          placeholder={t.keyPlaceholder}
          className="min-w-0 flex-1 rounded-md border border-ink-200 bg-white px-3 py-2 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        <Button onClick={test} disabled={!key.trim() || busy} size="sm">
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
          {busy ? t.calling : t.test}
        </Button>
      </div>

      {cur.kind === "text" && (
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-2 h-20 w-full resize-y rounded-md border border-ink-200 bg-white p-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          placeholder={t.inputPlaceholder}
        />
      )}
      {cur.kind === "file" && (
        <input
          type="file"
          accept="audio/*,video/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="mt-2 block w-full text-sm text-ink-600 file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-brand-700 hover:file:bg-brand-100"
        />
      )}

      {credits !== null && (
        <p className="mt-3 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
          {t.creditsRemaining(credits.toLocaleString())}
        </p>
      )}
      {result && <pre className="mt-3 max-h-72 overflow-auto rounded bg-ink-900 p-3 text-xs text-ink-50">{result}</pre>}
      {error && <p className="mt-3 flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
    </div>
  );
}
