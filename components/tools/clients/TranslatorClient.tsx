"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check, ArrowLeftRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { LANGUAGES } from "@/lib/languages";
import { TemplatesBar } from "@/components/tools/TemplatesBar";

const MAX = 5000;

export function TranslatorClient() {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("FR");
  const [register, setRegister] = useState<"" | "formal" | "informal">("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<"src" | "tgt" | null>(null);
  const reqId = useRef(0);

  const targetName = LANGUAGES.find((l) => l.code === targetLang)?.english ?? "English";

  useEffect(() => {
    const text = source.trim();
    if (!text) { setTarget(""); setLoading(false); return; }
    setLoading(true);
    const id = ++reqId.current;
    const timer = setTimeout(async () => {
      try {
        const res = await callTool("translate-text", { task: "translate", text: source.slice(0, MAX), options: { target: targetName, register } });
        const data = await res.json().catch(() => ({}));
        if (id !== reqId.current) return; // a newer request superseded this one
        setTarget(res.ok ? (data.output ?? "") : "—");
      } catch {
        if (id === reqId.current) setTarget("—");
      } finally {
        if (id === reqId.current) setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [source, targetName, register]);

  function copy(which: "src" | "tgt") {
    navigator.clipboard.writeText(which === "src" ? source : target);
    setCopied(which);
    setTimeout(() => setCopied(null), 1500);
  }

  function swap() {
    if (sourceLang === "auto") return;
    setSource(target);
    setTarget(source);
    const s = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(s);
  }

  const selectCls = "rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

  return (
    <div className="space-y-3">
      <TemplatesBar
        tool="translator"
        settings={{ targetLang, register }}
        onApply={(s) => {
          if (typeof s.targetLang === "string") setTargetLang(s.targetLang);
          if (typeof s.register === "string") setRegister(s.register as "" | "formal" | "informal");
        }}
      />
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-ink-500">Register:</span>
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          {([["", "Auto"], ["formal", "Formal"], ["informal", "Informal"]] as const).map(([id, label]) => (
            <button key={id} onClick={() => setRegister(id)}
              className={cn("rounded-md px-3 py-1 text-sm font-medium transition-colors", register === id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
        {/* Source */}
        <div className="flex flex-col rounded-xl border border-ink-200 bg-white">
          <div className="flex items-center justify-between border-b border-ink-100 px-3 py-2">
            <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className={selectCls}>
              <option value="auto">Detect language</option>
              {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.native}</option>)}
            </select>
          </div>
          <textarea
            value={source}
            onChange={(e) => setSource(e.target.value.slice(0, MAX))}
            autoFocus
            placeholder="Type to translate…"
            className="h-72 w-full resize-none bg-transparent p-4 text-base text-ink-900 placeholder:text-ink-300 focus:outline-none"
          />
          <div className="flex items-center justify-between border-t border-ink-100 px-3 py-2 text-xs text-ink-400">
            <span>{source.length} / {MAX}</span>
            <button onClick={() => copy("src")} disabled={!source} className="inline-flex items-center gap-1 hover:text-ink-700 disabled:opacity-40">
              {copied === "src" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} Copy
            </button>
          </div>
        </div>

        {/* Swap */}
        <div className="flex items-center justify-center">
          <button onClick={swap} title="Swap languages" className="rounded-full border border-ink-200 bg-white p-2 text-ink-500 transition-colors hover:text-brand-600 disabled:opacity-40" disabled={sourceLang === "auto"}>
            <ArrowLeftRight className="h-4 w-4" />
          </button>
        </div>

        {/* Target */}
        <div className="flex flex-col rounded-xl border border-ink-200 bg-ink-50/40">
          <div className="flex items-center justify-between border-b border-ink-100 px-3 py-2">
            <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className={selectCls}>
              {LANGUAGES.filter((l) => l.code !== "EN" || true).map((l) => <option key={l.code} value={l.code}>{l.native}</option>)}
            </select>
            {loading && <Loader2 className="h-4 w-4 animate-spin text-brand-500" />}
          </div>
          <textarea
            value={target}
            readOnly
            placeholder="Translation"
            className="h-72 w-full resize-none bg-transparent p-4 text-base text-ink-900 placeholder:text-ink-300 focus:outline-none"
          />
          <div className="flex items-center justify-end border-t border-ink-100 px-3 py-2 text-xs text-ink-400">
            <button onClick={() => copy("tgt")} disabled={!target} className="inline-flex items-center gap-1 hover:text-ink-700 disabled:opacity-40">
              {copied === "tgt" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} Copy
            </button>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-ink-400">Powered by advanced AI · Your text is never stored. Free daily use.</p>
    </div>
  );
}
