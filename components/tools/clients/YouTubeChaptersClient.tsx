"use client";

import { useState } from "react";
import { Loader2, Copy, CheckCircle2 } from "lucide-react";
import { UploadZone } from "@/components/tools/UploadZone";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { getChrome, t as tt } from "@/lib/i18n/chrome";
import { getToolUi } from "@/lib/i18n/tool-ui";
import { callTool } from "@/lib/tool-api";
import { parseSubtitles, toPlainText, detectFormat } from "@/lib/srt-utils";

type Phase = "idle" | "ready" | "running" | "done" | "error";

export function YouTubeChaptersClient() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState("");
  const [chapters, setChapters] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const locale = useLocale();
  const chrome = getChrome(locale);
  const ui = getToolUi(locale).chapters;

  async function handleFile(file: File) {
    setError(null);
    const raw = await file.text();
    const fmt = detectFormat(file.name, raw);
    if (fmt === "unknown") {
      // Treat as plain text transcript.
      setText(raw);
    } else {
      const cues = parseSubtitles(raw);
      if (!cues.length) {
        setError(chrome.errors.noCues);
        return;
      }
      // Preserve timing context for the AI by including timestamps.
      const withTiming = cues
        .map((c) => {
          const total = Math.max(0, Math.round(c.start / 1000));
          const h = Math.floor(total / 3600);
          const m = Math.floor((total % 3600) / 60);
          const s = total % 60;
          const ts = h
            ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
            : `${m}:${String(s).padStart(2, "0")}`;
          return `[${ts}] ${c.lines.join(" ")}`;
        })
        .join("\n");
      setText(withTiming);
    }
    setPhase("ready");
  }

  async function generate() {
    if (!text.trim()) return;
    setPhase("running");
    setError(null);
    try {
      const res = await callTool("youtube-chapters", { task: "chapters", text });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        const code = typeof errBody?.error === "string" ? errBody.error : "";
        setPhase("error");
        setError(code.startsWith("missing_") ? chrome.errors.notWiredUp : tt(chrome.errors.serverReturned, { status: res.status }));
        return;
      }
      const data = (await res.json()) as { output?: string };
      if (!data.output) {
        setPhase("error");
        setError(chrome.errors.noResultUrl);
        return;
      }
      setChapters(data.output);
      setPhase("done");
    } catch (err) {
      setPhase("error");
      setError(err instanceof Error ? err.message : chrome.errors.network);
    }
  }

  function reset() {
    setPhase("idle");
    setText("");
    setChapters(null);
    setError(null);
    setCopied(false);
  }

  async function copyChapters() {
    if (!chapters) return;
    try {
      await navigator.clipboard.writeText(chapters);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback for older browsers
    }
  }

  if (phase === "done" && chapters) {
    return (
      <div className="rounded-lg border border-ink-100 bg-white p-8 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-ink-900">{ui.chaptersTitle}</h3>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={copyChapters}>
              <Copy className="h-3.5 w-3.5" />
              {copied ? ui.copied : ui.copy}
            </Button>
            <Button size="sm" variant="ghost" onClick={reset}>
              {chrome.result.tryAnother}
            </Button>
          </div>
        </div>
        <pre className="mt-6 max-h-96 overflow-auto rounded border border-ink-100 bg-ink-50 p-4 text-sm leading-relaxed text-ink-700">
          {chapters}
        </pre>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <UploadZone accept={["srt", "vtt", "txt"]} maxMb={10} onFile={handleFile} cta={ui.uploadOrPaste} />

      <div className="text-center text-xs uppercase tracking-wide text-ink-300">— ou —</div>

      <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value.trim()) setPhase("ready");
            else setPhase("idle");
          }}
          rows={8}
          placeholder={ui.pasteHere}
          className="w-full resize-y rounded border border-ink-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        {error && (
          <p className="mt-3 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}
        <div className="mt-4 flex gap-2">
          <Button onClick={generate} disabled={phase === "running" || !text.trim()}>
            {phase === "running" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {chrome.processing.processing}
              </>
            ) : (
              ui.generate
            )}
          </Button>
          {text && (
            <Button variant="outline" onClick={reset}>
              {chrome.sync.cancel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
