"use client";

import { useState } from "react";
import { UploadZone } from "@/components/tools/UploadZone";
import { ProcessingScreen } from "@/components/tools/ProcessingScreen";
import { ResultScreen } from "@/components/tools/ResultScreen";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import { getChrome, t as tt } from "@/lib/i18n/chrome";
import { getToolUi } from "@/lib/i18n/tool-ui";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import { parseSubtitles, toVtt } from "@/lib/srt-utils";

type Phase = "idle" | "configure" | "uploading" | "done" | "error";
type Format = "srt" | "vtt";

export function SubtitleGeneratorClient({ crossLinks = [] }: { crossLinks?: { href: string; label: string }[] }) {
  const [file, setFile] = useState<File | null>(null);
  const [sourceLang, setSourceLang] = useState<"" | LanguageCode>("");
  const [format, setFormat] = useState<Format>("srt");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState<string | null>(null);

  const locale = useLocale();
  const chrome = getChrome(locale);
  const ui = getToolUi(locale).generator;

  function onFile(f: File) {
    setFile(f);
    setPhase("configure");
    setError(null);
  }

  async function start() {
    if (!file) return;
    setPhase("uploading");
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      if (sourceLang) fd.append("language", sourceLang.toLowerCase());
      const res = await fetch("/api/process/subtitle-generator", { method: "POST", body: fd });
      if (res.status === 503) {
        setPhase("error");
        setError(chrome.errors.notWiredUp);
        return;
      }
      if (!res.ok) {
        setPhase("error");
        setError(tt(chrome.errors.serverReturned, { status: res.status }));
        return;
      }
      const data = (await res.json()) as { url?: string; filename?: string };
      if (!data.url) {
        setPhase("error");
        setError(chrome.errors.noResultUrl);
        return;
      }

      let url = data.url;
      let name = data.filename ?? `${file.name.replace(/\.[^.]+$/, "")}.srt`;

      // The backend always returns SRT — convert to VTT client-side if requested.
      if (format === "vtt") {
        try {
          const srtRes = await fetch(url);
          const srt = await srtRes.text();
          const cues = parseSubtitles(srt);
          const vtt = toVtt(cues);
          const blob = new Blob([vtt], { type: "text/vtt;charset=utf-8" });
          url = URL.createObjectURL(blob);
          name = name.replace(/\.srt$/i, ".vtt");
        } catch {
          // fall back to SRT
        }
      }

      setResultUrl(url);
      setResultName(name);
      setPhase("done");
    } catch (err) {
      setPhase("error");
      setError(err instanceof Error ? err.message : chrome.errors.network);
    }
  }

  function reset() {
    setFile(null);
    setSourceLang("");
    setFormat("srt");
    setPhase("idle");
    setResultUrl(null);
    setResultName(null);
    setError(null);
  }

  if (phase === "done" && resultUrl && resultName) {
    return (
      <ResultScreen
        filename={resultName}
        onDownload={() => {
          const a = document.createElement("a");
          a.href = resultUrl;
          a.download = resultName;
          document.body.appendChild(a);
          a.click();
          a.remove();
        }}
        onReset={reset}
        crossLinks={crossLinks}
      />
    );
  }

  if (phase === "uploading" && file) {
    return <ProcessingScreen filename={file.name} fileSize={file.size} status={chrome.processing.processing} />;
  }

  if (phase === "configure" && file) {
    return (
      <div className="rounded-lg border border-ink-100 bg-white p-8 shadow-card">
        <div className="text-sm text-ink-500">{file.name}</div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-ink-700" htmlFor="src-lang">
              {ui.sourceLang}
            </label>
            <select
              id="src-lang"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value as "" | LanguageCode)}
              className="mt-1 h-10 w-full rounded border border-ink-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">{ui.autoDetect}</option>
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.native} ({l.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="text-sm font-medium text-ink-700">{ui.outputFormat}</div>
            <div className="mt-1 flex gap-2">
              {(["srt", "vtt"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  aria-pressed={format === f}
                  className={cn(
                    "h-10 flex-1 rounded border text-sm font-medium uppercase",
                    format === f ? "border-brand-500 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-700",
                  )}
                >
                  {f === "srt" ? ui.srt : ui.vtt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        <div className="mt-6 flex gap-2">
          <Button onClick={start}>{ui.generate}</Button>
          <Button variant="outline" onClick={reset}>
            {chrome.sync.cancel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <UploadZone
        accept={["mp4", "mov", "webm", "mkv", "avi", "mp3", "wav", "m4a", "flac", "ogg"]}
        maxMb={25}
        onFile={onFile}
      />
      {phase === "error" && error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
}
