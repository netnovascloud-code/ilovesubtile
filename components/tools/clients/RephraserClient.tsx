"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Check, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";

const STYLES = [
  "Professional", "Casual", "Academic", "Creative",
  "Simple", "Punchy", "Legal", "Marketing",
] as const;

// ── Word-level diff (LCS) to turn original + corrected into change segments ──

type Token = string;
type Seg = { type: "equal" | "del" | "ins"; text: string };

function tokenize(s: string): Token[] {
  // Split into runs of word chars, whitespace, or single punctuation so diffs are word-aligned.
  return s.match(/[A-Za-zÀ-ÿ0-9']+|\s+|[^\sA-Za-zÀ-ÿ0-9']/g) ?? [];
}
function diff(a: Token[], b: Token[]): Seg[] {
  const n = a.length, m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out: Seg[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { out.push({ type: "equal", text: a[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ type: "del", text: a[i] }); i++; }
    else { out.push({ type: "ins", text: b[j] }); j++; }
  }
  while (i < n) { out.push({ type: "del", text: a[i++] }); }
  while (j < m) { out.push({ type: "ins", text: b[j++] }); }
  return out;
}

type Change = { id: number; from: string; to: string };

/**
 * Group adjacent del/ins segments into a single "change" so a replaced word
 * (foo → bar) becomes one clickable suggestion instead of two siblings.
 */
function groupChanges(segs: Seg[]): { items: ({ kind: "equal"; text: string } | { kind: "change"; id: number; from: string; to: string })[]; changes: Change[] } {
  const items: ({ kind: "equal"; text: string } | { kind: "change"; id: number; from: string; to: string })[] = [];
  const changes: Change[] = [];
  let i = 0;
  let cid = 0;
  while (i < segs.length) {
    if (segs[i].type === "equal") { items.push({ kind: "equal", text: segs[i].text }); i++; continue; }
    let from = "", to = "";
    while (i < segs.length && segs[i].type !== "equal") {
      if (segs[i].type === "del") from += segs[i].text; else to += segs[i].text;
      i++;
    }
    const id = cid++;
    items.push({ kind: "change", id, from, to });
    changes.push({ id, from, to });
  }
  return { items, changes };
}

export function RephraserClient() {
  const [tab, setTab] = useState<"correct" | "reformulate">("correct");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [corrected, setCorrected] = useState<string>("");
  const [decisions, setDecisions] = useState<Record<number, "accept" | "reject">>({});
  const [style, setStyle] = useState<string>(STYLES[0]);
  const [reformulated, setReformulated] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const reqId = useRef(0);

  async function runCorrect() {
    const text = input.trim();
    if (!text) return;
    setLoading(true); setError(null); setCorrected(""); setDecisions({});
    try {
      const res = await callTool("fix-grammar", { task: "grammar", text });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error === "daily_limit" ? "Daily free limit reached." : "Could not run the correction."); return; }
      setCorrected(data.output ?? "");
    } catch { setError("Network error — please try again."); }
    finally { setLoading(false); }
  }

  // Reformulate: live debounce 500ms on input + style change.
  useEffect(() => {
    if (tab !== "reformulate") return;
    const text = input.trim();
    if (!text) { setReformulated(""); return; }
    setLoading(true);
    const id = ++reqId.current;
    const timer = setTimeout(async () => {
      try {
        const res = await callTool("rephrase-text", { task: "rephrase", text, options: { style } });
        const data = await res.json().catch(() => ({}));
        if (id !== reqId.current) return;
        setReformulated(res.ok ? (data.output ?? "") : "—");
      } catch {
        if (id === reqId.current) setReformulated("—");
      } finally {
        if (id === reqId.current) setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [tab, input, style]);

  const { items, changes } = useMemo(() => {
    if (!corrected || !input.trim()) return { items: [], changes: [] as Change[] };
    const segs = diff(tokenize(input), tokenize(corrected));
    return groupChanges(segs);
  }, [input, corrected]);

  const finalText = useMemo(() => {
    return items.map((it) => it.kind === "equal" ? it.text : (decisions[it.id] === "reject" ? it.from : it.to)).join("");
  }, [items, decisions]);

  function copyResult() {
    const text = tab === "correct" ? finalText : reformulated;
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  }

  function set(id: number, d: "accept" | "reject") {
    setDecisions((s) => ({ ...s, [id]: d }));
    document.getElementById(`chg-${id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
        {(["correct", "reformulate"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("rounded-md px-4 py-1.5 text-sm font-medium transition-colors", tab === t ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
            {t === "correct" ? "Correct" : "Reformulate"}
          </button>
        ))}
      </div>

      {/* Style picker — reformulate only */}
      {tab === "reformulate" && (
        <div className="flex flex-wrap gap-1.5">
          {STYLES.map((s) => (
            <button key={s} onClick={() => setStyle(s)}
              className={cn("rounded-full border px-3 py-1 text-sm transition-colors", style === s ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-600 hover:border-ink-300")}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {/* Input */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Your text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tab === "correct" ? "Paste text to check spelling, grammar and style…" : "Paste text to rephrase in the selected style…"}
            className="h-72 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {tab === "correct" && (
            <Button onClick={runCorrect} disabled={!input.trim() || loading} size="sm" className="mt-2">
              <Sparkles className="h-3.5 w-3.5" /> {loading ? "Checking…" : "Check text"}
            </Button>
          )}
        </div>

        {/* Result */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-ink-700">{tab === "correct" ? "Corrected text" : "Rewritten text"}</label>
            <div className="flex items-center gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin text-brand-500" />}
              <Button size="sm" variant="outline" onClick={copyResult} disabled={!(tab === "correct" ? finalText : reformulated)}>
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
          {tab === "correct" ? (
            <div className="h-72 w-full overflow-auto whitespace-pre-wrap rounded-lg border border-ink-200 bg-ink-50/50 p-3 text-sm leading-relaxed text-ink-900">
              {items.length === 0 ? (
                <span className="text-ink-300">Click "Check text" to see corrections.</span>
              ) : items.map((it, idx) => {
                if (it.kind === "equal") return <span key={idx}>{it.text}</span>;
                const d = decisions[it.id];
                if (d === "reject") return <span key={idx}>{it.from}</span>;
                return (
                  <button key={idx} onClick={() => document.getElementById(`chg-${it.id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" })}
                    title={`${it.from || "∅"} → ${it.to || "∅"}`}
                    className={cn("mx-px rounded px-0.5 text-left", it.from && it.to
                      ? "bg-amber-100 text-amber-900 underline decoration-amber-400 decoration-2 underline-offset-2"
                      : it.from ? "bg-red-100 text-red-700 line-through"
                      : "bg-emerald-100 text-emerald-800")}>
                    {it.to || it.from}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="h-72 w-full overflow-auto whitespace-pre-wrap rounded-lg border border-ink-200 bg-ink-50/50 p-3 text-sm leading-relaxed text-ink-900">
              {reformulated || <span className="text-ink-300">Your rewritten text will appear here.</span>}
            </div>
          )}
        </div>
      </div>

      {/* Change list — correct mode only */}
      {tab === "correct" && changes.length > 0 && (
        <div className="rounded-xl border border-ink-100 bg-white p-4">
          <div className="mb-3 text-sm font-semibold text-ink-900">{changes.length} change{changes.length > 1 ? "s" : ""}</div>
          <ul className="space-y-2">
            {changes.map((c) => {
              const d = decisions[c.id];
              return (
                <li id={`chg-${c.id}`} key={c.id} className="flex items-center justify-between gap-3 rounded-lg border border-ink-100 px-3 py-2">
                  <div className="min-w-0 flex-1 text-sm">
                    {c.from && <span className="mr-1 rounded bg-red-50 px-1.5 py-0.5 font-mono text-[12px] text-red-700 line-through">{c.from}</span>}
                    <span className="text-ink-400">→</span>
                    {c.to && <span className="ml-1 rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[12px] text-emerald-700">{c.to}</span>}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => set(c.id, "accept")} className={cn("rounded-md px-2 py-1 text-xs font-medium transition-colors", d === "accept" ? "bg-emerald-100 text-emerald-700" : "text-ink-500 hover:bg-ink-50")}>Accept</button>
                    <button onClick={() => set(c.id, "reject")} className={cn("rounded-md px-2 py-1 text-xs font-medium transition-colors", d === "reject" ? "bg-red-100 text-red-700" : "text-ink-500 hover:bg-ink-50")}>Reject</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-xs text-ink-400">By default every change is accepted. Reject a change to keep your original wording.</p>
        </div>
      )}

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <p className="text-xs text-ink-400">Your text is never stored. Powered by advanced AI.</p>
    </div>
  );
}
