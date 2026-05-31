"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function makeSentence() {
  const len = rand(8, 16);
  const out: string[] = [];
  for (let i = 0; i < len; i++) out.push(WORDS[rand(0, WORDS.length - 1)]);
  return out.join(" ").replace(/^./, (c) => c.toUpperCase()) + ".";
}
function makeParagraph(startsWithLorem: boolean) {
  const sentences = rand(4, 7);
  const parts: string[] = [];
  for (let i = 0; i < sentences; i++) parts.push(makeSentence());
  if (startsWithLorem) parts[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  return parts.join(" ");
}

export function LoremIpsumClient() {
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(5);
  const [classic, setClassic] = useState(true);
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);
  // SSR rolls one Math.random sequence and the client rolls a different one,
  // causing a hydration mismatch on the rendered text. Gate the output on a
  // mounted flag so SSR renders an empty placeholder and the client fills it.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const output = useMemo(() => {
    void seed;
    if (!mounted) return "";
    if (unit === "paragraphs") {
      return Array.from({ length: Math.max(1, count) }, (_, i) => makeParagraph(classic && i === 0)).join("\n\n");
    }
    if (unit === "sentences") {
      const parts = Array.from({ length: Math.max(1, count) }, () => makeSentence());
      if (classic) parts[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      return parts.join(" ");
    }
    const all: string[] = [];
    if (classic) all.push(...["Lorem", "ipsum", "dolor", "sit", "amet"]);
    while (all.length < Math.max(1, count)) all.push(WORDS[rand(0, WORDS.length - 1)]);
    return all.slice(0, count).join(" ");
  }, [unit, count, classic, seed, mounted]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3 rounded-lg border border-ink-100 bg-white p-4">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Generate
          <input type="number" min={1} max={500} value={count} onChange={(e) => setCount(Math.max(1, Math.min(500, Number(e.target.value) || 1)))}
            className="mt-1 w-24 rounded-md border border-ink-200 bg-white px-2 py-1.5 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Unit
          <select value={unit} onChange={(e) => setUnit(e.target.value as typeof unit)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-2 py-1.5 text-sm text-ink-900">
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </label>
        <label className="flex items-center gap-2 self-end text-sm text-ink-700">
          <input type="checkbox" checked={classic} onChange={(e) => setClassic(e.target.checked)} className="h-4 w-4" />
          Start with "Lorem ipsum…"
        </label>
        <div className="ml-auto flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setSeed((s) => s + 1)}>
            <RefreshCw className="h-3.5 w-3.5" /> Regenerate
          </Button>
          <Button size="sm" onClick={copy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>

      <pre className="whitespace-pre-wrap rounded-lg border border-ink-100 bg-white p-5 text-sm leading-relaxed text-ink-800">{output}</pre>

      <p className="text-xs text-ink-400">100% in your browser — generated on demand, never sent anywhere.</p>
    </div>
  );
}
