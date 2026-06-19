"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FLAGS = [
  { id: "g", label: "global" },
  { id: "i", label: "ignore case" },
  { id: "m", label: "multiline" },
  { id: "s", label: "dotall" },
  { id: "u", label: "unicode" },
];

export function RegexClient() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState<Record<string, boolean>>({ g: true, i: false, m: false, s: false, u: false });
  const [text, setText] = useState("Contact ada@konvertools.com or sales@konvertools.com for details.");

  const flagStr = Object.entries(flags).filter(([, on]) => on).map(([f]) => f).join("");

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: null as string | null };
    let re: RegExp;
    try { re = new RegExp(pattern, flagStr); }
    catch (e) { return { matches: [], error: (e as Error).message }; }
    const found: { index: number; match: string; groups: string[] }[] = [];
    if (flagStr.includes("g")) {
      let m: RegExpExecArray | null;
      let guard = 0;
      while ((m = re.exec(text)) !== null && guard < 10000) {
        found.push({ index: m.index, match: m[0], groups: m.slice(1) });
        if (m.index === re.lastIndex) re.lastIndex++;
        guard++;
      }
    } else {
      // Non-global: a regex tester must report exactly one match, matching the
      // displayed /flags. (Previously 'g' was force-appended → always global.)
      const m = re.exec(text);
      if (m) found.push({ index: m.index, match: m[0], groups: m.slice(1) });
    }
    return { matches: found, error: null };
  }, [pattern, flagStr, text]);

  // Highlight matches in the test text.
  const highlighted = useMemo(() => {
    if (error || matches.length === 0) return null;
    const segs: { t: string; hit: boolean }[] = [];
    let cursor = 0;
    for (const m of matches) {
      if (m.index > cursor) segs.push({ t: text.slice(cursor, m.index), hit: false });
      segs.push({ t: m.match || "", hit: true });
      cursor = m.index + (m.match?.length || 0);
    }
    if (cursor < text.length) segs.push({ t: text.slice(cursor), hit: false });
    return segs;
  }, [matches, text, error]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center rounded-lg border border-ink-200 bg-white font-mono text-sm focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
          <span className="pl-3 text-ink-400">/</span>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-ink-900 focus:outline-none"
            placeholder="pattern"
          />
          <span className="pr-3 text-ink-400">/{flagStr}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {FLAGS.map((f) => (
            <button
              key={f.id}
              title={f.label}
              onClick={() => setFlags((s) => ({ ...s, [f.id]: !s[f.id] }))}
              className={cn(
                "rounded-md border px-2.5 py-1.5 font-mono text-sm transition-colors",
                flags[f.id] ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-500 hover:border-ink-300",
              )}
            >
              {f.id}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="flex items-start gap-1.5 text-sm text-red-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Test text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            className="h-56 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-[13px] text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">
            Matches <span className="text-ink-400">({matches.length})</span>
          </label>
          <div className="h-56 overflow-auto rounded-lg border border-ink-200 bg-ink-50/50 p-3 font-mono text-[13px]">
            {highlighted ? (
              <p className="whitespace-pre-wrap break-words leading-relaxed text-ink-700">
                {highlighted.map((s, i) => s.hit
                  ? <mark key={i} className="rounded bg-amber-200 px-0.5 text-ink-900">{s.t}</mark>
                  : <span key={i}>{s.t}</span>)}
              </p>
            ) : (
              <p className="text-ink-400">{error ? "Fix the pattern to see matches." : "No matches."}</p>
            )}
          </div>
        </div>
      </div>

      {matches.length > 0 && (
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <table className="w-full text-left text-sm">
            <thead className="text-ink-400">
              <tr><th className="pb-2 pr-4 font-medium">#</th><th className="pb-2 pr-4 font-medium">Match</th><th className="pb-2 font-medium">Groups</th></tr>
            </thead>
            <tbody className="font-mono text-[13px] text-ink-800">
              {matches.slice(0, 100).map((m, i) => (
                <tr key={i} className="border-t border-ink-100">
                  <td className="py-1.5 pr-4 text-ink-400">{i + 1}</td>
                  <td className="py-1.5 pr-4">{m.match}</td>
                  <td className="py-1.5 text-ink-500">{m.groups.length ? m.groups.map((g, j) => `$${j + 1}=${g}`).join("  ") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-ink-400">100% in your browser — nothing is uploaded. Free and unlimited, no account needed.</p>
    </div>
  );
}
