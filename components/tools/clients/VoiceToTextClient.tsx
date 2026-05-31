"use client";

import { useState } from "react";
import { Copy, Check, Download, FileAudio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadZone } from "@/components/tools/UploadZone";
import { ProcessingScreen } from "@/components/tools/ProcessingScreen";
import { useLocale } from "@/hooks/useLocale";
import { getChrome, t as tt } from "@/lib/i18n/chrome";
import { callTool } from "@/lib/tool-api";
import { parseSubtitles } from "@/lib/srt-utils";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";

type Phase = "idle" | "configure" | "uploading" | "done" | "error";

// Turn timed cues into readable prose: join each cue's lines, then start a new
// paragraph whenever there's a >2s gap (a natural pause / topic break).
function cuesToText(srt: string): string {
  const cues = parseSubtitles(srt);
  if (!cues.length) return "";
  const parts: string[] = [];
  let prevEnd = cues[0].start;
  for (const c of cues) {
    const line = c.lines.join(" ").trim();
    if (!line) continue;
    parts.push(c.start - prevEnd > 2000 && parts.length ? `\n\n${line}` : line);
    prevEnd = c.end;
  }
  return parts.join(" ").replace(/ \n\n/g, "\n\n").replace(/[ \t]{2,}/g, " ").trim();
}

export function VoiceToTextClient({ maxMb = 100 }: { maxMb?: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [sourceLang, setSourceLang] = useState<"" | LanguageCode>("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);

  const locale = useLocale();
  const chrome = getChrome(locale);

  async function start() {
    if (!file) return;
    setPhase("uploading"); setError(null); setText("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      if (sourceLang) fd.append("language", sourceLang.toLowerCase());
      const res = await callTool("voice-to-text", fd);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "daily_limit" || data.error === "monthly_limit") {
          setPhase("configure");
          setQuotaReason({ kind: data.error === "monthly_limit" ? "monthly" : "daily", limit: data.limit ?? 0, used: data.used ?? 0, resetAt: data.resetAt ?? null });
          return;
        }
        setPhase("error");
        const code = typeof data?.error === "string" ? data.error : "";
        setError(code.startsWith("missing_") ? chrome.errors.notWiredUp : tt(chrome.errors.serverReturned, { status: res.status }));
        return;
      }
      if (!data.url) { setPhase("error"); setError(chrome.errors.noResultUrl); return; }
      const srt = await (await fetch(data.url)).text();
      const transcript = cuesToText(srt);
      if (!transcript) { setPhase("error"); setError(chrome.errors.noCues); return; }
      setText(transcript);
      setPhase("done");
    } catch (e) {
      setPhase("error");
      setError(e instanceof Error ? e.message : chrome.errors.network);
    }
  }

  function reset() { setFile(null); setText(""); setPhase("idle"); setError(null); }
  function copy() { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }
  function download() {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${(file?.name ?? "transcript").replace(/\.[^.]+$/, "")}.txt`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  if (phase === "uploading" && file) {
    return <ProcessingScreen filename={file.name} fileSize={file.size} status={chrome.processing.processing} />;
  }

  if (phase === "done") {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-500">{words.toLocaleString(locale)} words</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={copy}>{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}</Button>
            <Button size="sm" variant="outline" onClick={download}><Download className="h-3.5 w-3.5" /> .txt</Button>
            <Button size="sm" onClick={reset}>New file</Button>
          </div>
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="h-80 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 text-sm leading-relaxed text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        <p className="text-xs text-ink-400">Transcribed with AI. Your file is processed transiently and deleted within the hour.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <UploadZone
          accept={["mp3", "wav", "m4a", "flac", "ogg", "mp4", "mov", "webm", "mkv"]}
          maxMb={maxMb}
          onFile={(f) => { setFile(f); setPhase("configure"); }}
          cta="Transcribe"
        />
      ) : (
        <div className="space-y-3 rounded-lg border border-ink-100 bg-white p-4">
          <div className="flex items-center gap-2 text-sm text-ink-700">
            <FileAudio className="h-4 w-4 text-brand-500" /> <span className="font-medium">{file.name}</span>
          </div>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Spoken language (optional)
            <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value as "" | LanguageCode)}
              className="mt-1 max-w-xs rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
              <option value="">Auto-detect</option>
              {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.native} ({l.code})</option>)}
            </select>
          </label>
          <div className="flex gap-2">
            <Button onClick={start} size="lg">Transcribe to text</Button>
            <Button onClick={reset} size="lg" variant="outline">Cancel</Button>
          </div>
        </div>
      )}
      {phase === "error" && error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}
