"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Copy, Check, ArrowLeftRight, Loader2, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { LANGUAGES } from "@/lib/languages";
import { TemplatesBar } from "@/components/tools/TemplatesBar";
import { useUser } from "@/hooks/useUser";
import { useLocale } from "@/hooks/useLocale";

const MAX = 5000;

const T: Record<string, Record<string, string>> = {
  en: {
    detect: "Detect language",
    type: "Type to translate…",
    translation: "Translation",
    copy: "Copy",
    swap: "Swap languages",
    signInTitle: "Sign in to translate",
    signInBody: "Translation is available to signed-in members. It's quick, accurate and your text is never stored.",
    signIn: "Sign in",
    limit: "Monthly translation limit reached.",
    footer: "Fast, accurate translation · your text is never stored.",
  },
  fr: {
    detect: "Détecter la langue",
    type: "Saisissez le texte à traduire…",
    translation: "Traduction",
    copy: "Copier",
    swap: "Inverser les langues",
    signInTitle: "Connectez-vous pour traduire",
    signInBody: "La traduction est réservée aux membres connectés. Rapide, précise, et votre texte n'est jamais stocké.",
    signIn: "Se connecter",
    limit: "Limite de traduction mensuelle atteinte.",
    footer: "Traduction rapide et précise · votre texte n'est jamais stocké.",
  },
};

export function TranslatorClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;
  const { user, loading: userLoading } = useUser();
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("FR");
  const [loading, setLoading] = useState(false);
  const [limitHit, setLimitHit] = useState(false);
  const [copied, setCopied] = useState<"src" | "tgt" | null>(null);
  const reqId = useRef(0);

  useEffect(() => {
    const text = source.trim();
    if (!text || !user) { setTarget(""); setLoading(false); return; }
    setLoading(true);
    setLimitHit(false);
    const id = ++reqId.current;
    const timer = setTimeout(async () => {
      try {
        const res = await callTool("translator", {
          text: source.slice(0, MAX),
          target: targetLang,
          source: sourceLang === "auto" ? undefined : sourceLang,
        });
        const data = await res.json().catch(() => ({}));
        if (id !== reqId.current) return; // a newer request superseded this one
        if (res.status === 429) { setLimitHit(true); setTarget(""); return; }
        setTarget(res.ok ? (data.output ?? "") : "—");
      } catch {
        if (id === reqId.current) setTarget("—");
      } finally {
        if (id === reqId.current) setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [source, targetLang, sourceLang, user]);

  function copy(which: "src" | "tgt") {
    navigator.clipboard.writeText(which === "src" ? source : target);
    setCopied(which);
    setTimeout(() => setCopied(null), 1500);
  }

  function swap() {
    if (sourceLang === "auto") return;
    setSource(target);
    setTarget(source);
    const sl = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(sl);
  }

  const selectCls = "rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
  const signedOut = !userLoading && !user;

  return (
    <div className="space-y-3">
      <TemplatesBar
        tool="translator"
        settings={{ targetLang }}
        onApply={(st) => {
          if (typeof st.targetLang === "string") setTargetLang(st.targetLang);
        }}
      />

      {signedOut && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-brand-200 bg-brand-50/50 p-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-semibold text-ink-900">{s.signInTitle}</p>
            <p className="text-xs text-ink-600">{s.signInBody}</p>
          </div>
          <Link href="/login" className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white hover:bg-brand-600">
            <LogIn className="h-4 w-4" /> {s.signIn}
          </Link>
        </div>
      )}

      <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
        {/* Source */}
        <div className="flex flex-col rounded-xl border border-ink-200 bg-white">
          <div className="flex items-center justify-between border-b border-ink-100 px-3 py-2">
            <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className={selectCls} aria-label="Source language">
              <option value="auto">{s.detect}</option>
              {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.native}</option>)}
            </select>
          </div>
          <textarea
            value={source}
            onChange={(e) => setSource(e.target.value.slice(0, MAX))}
            aria-label="Text to translate"
            placeholder={s.type}
            className="h-72 w-full resize-none bg-transparent p-4 text-base text-ink-900 placeholder:text-ink-300 focus:outline-none"
          />
          <div className="flex items-center justify-between border-t border-ink-100 px-3 py-2 text-xs text-ink-400">
            <span>{source.length} / {MAX}</span>
            <button onClick={() => copy("src")} disabled={!source} className="inline-flex items-center gap-1 hover:text-ink-700 disabled:opacity-40">
              {copied === "src" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {s.copy}
            </button>
          </div>
        </div>

        {/* Swap */}
        <div className="flex items-center justify-center">
          <button onClick={swap} title={s.swap} aria-label={s.swap} className="rounded-full border border-ink-200 bg-white p-2 text-ink-500 transition-colors hover:text-brand-600 disabled:opacity-40" disabled={sourceLang === "auto"}>
            <ArrowLeftRight className="h-4 w-4" />
          </button>
        </div>

        {/* Target */}
        <div className="flex flex-col rounded-xl border border-ink-200 bg-ink-50/40">
          <div className="flex items-center justify-between border-b border-ink-100 px-3 py-2">
            <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className={selectCls} aria-label="Target language">
              {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.native}</option>)}
            </select>
            {loading && <Loader2 className="h-4 w-4 animate-spin text-brand-500" />}
          </div>
          <textarea
            value={limitHit ? s.limit : target}
            readOnly
            aria-label="Translation"
            placeholder={s.translation}
            className="h-72 w-full resize-none bg-transparent p-4 text-base text-ink-900 placeholder:text-ink-300 focus:outline-none"
          />
          <div className="flex items-center justify-end border-t border-ink-100 px-3 py-2 text-xs text-ink-400">
            <button onClick={() => copy("tgt")} disabled={!target} className="inline-flex items-center gap-1 hover:text-ink-700 disabled:opacity-40">
              {copied === "tgt" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {s.copy}
            </button>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-ink-400">{s.footer}</p>
    </div>
  );
}
