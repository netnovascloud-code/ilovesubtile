"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRANSFORMS: { id: string; label: string; fn: (s: string) => string }[] = [
  { id: "upper", label: "UPPERCASE", fn: (s) => s.toLocaleUpperCase() },
  { id: "lower", label: "lowercase", fn: (s) => s.toLocaleLowerCase() },
  { id: "title", label: "Title Case", fn: (s) => s.replace(/\w\S*/g, (w) => w[0].toLocaleUpperCase() + w.slice(1).toLocaleLowerCase()) },
  { id: "sentence", label: "Sentence case", fn: (s) => s.toLocaleLowerCase().replace(/(^|[.!?]\s+)([a-z])/g, (_m, p, c) => p + c.toLocaleUpperCase()) },
  { id: "camel", label: "camelCase", fn: (s) => words(s).map((w, i) => i === 0 ? w.toLocaleLowerCase() : capit(w)).join("") },
  { id: "pascal", label: "PascalCase", fn: (s) => words(s).map(capit).join("") },
  { id: "snake", label: "snake_case", fn: (s) => words(s).map((w) => w.toLocaleLowerCase()).join("_") },
  { id: "kebab", label: "kebab-case", fn: (s) => words(s).map((w) => w.toLocaleLowerCase()).join("-") },
  { id: "constant", label: "CONSTANT_CASE", fn: (s) => words(s).map((w) => w.toLocaleUpperCase()).join("_") },
  { id: "invert", label: "iNVERT cASE", fn: (s) => s.split("").map((c) => c === c.toLocaleLowerCase() ? c.toLocaleUpperCase() : c.toLocaleLowerCase()).join("") },
];

function words(s: string): string[] {
  return s
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}
function capit(w: string): string {
  return w[0].toLocaleUpperCase() + w.slice(1).toLocaleLowerCase();
}

export function CaseConverterClient() {
  const [text, setText] = useState("The Quick Brown Fox jumps over the lazy_dog-and-RUNS away.");
  const [copied, setCopied] = useState<string | null>(null);
  const stats = useMemo(() => ({
    chars: text.length,
    words: words(text).length,
    lines: text ? text.split("\n").length : 0,
  }), [text]);

  async function copy(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 1200);
    } catch {}
  }

  return (
    <div className="space-y-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste any text…"
        className="h-44 w-full resize-y rounded-lg border border-ink-200 bg-white p-4 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
        <span>{stats.words.toLocaleString()} words</span>
        <span>·</span>
        <span>{stats.chars.toLocaleString()} characters</span>
        <span>·</span>
        <span>{stats.lines.toLocaleString()} lines</span>
      </div>

      <ul className="space-y-2">
        {TRANSFORMS.map((t) => {
          const value = text ? t.fn(text) : "";
          return (
            <li key={t.id} className="flex items-start gap-3 rounded-lg border border-ink-100 bg-white p-3">
              <span className="w-32 shrink-0 text-xs font-semibold uppercase tracking-wide text-ink-400">{t.label}</span>
              <span className="flex-1 break-all font-mono text-sm text-ink-800">{value || <span className="text-ink-300">—</span>}</span>
              <Button size="sm" variant="outline" disabled={!value} onClick={() => copy(t.id, value)}>
                {copied === t.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === t.id ? "Copied" : "Copy"}
              </Button>
            </li>
          );
        })}
      </ul>

      <p className="text-xs text-ink-400">100% in your browser — your text never leaves your device.</p>
    </div>
  );
}
