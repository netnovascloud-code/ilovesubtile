"use client";

import { useState } from "react";
import { UploadZone } from "@/components/tools/UploadZone";
import { ProcessingScreen } from "@/components/tools/ProcessingScreen";
import { ResultScreen } from "@/components/tools/ResultScreen";
import { useLocale } from "@/hooks/useLocale";
import { getChrome, t as tt } from "@/lib/i18n/chrome";
import { getToolUi } from "@/lib/i18n/tool-ui";
import { LANGUAGES, DEFAULT_TARGETS, type LanguageCode } from "@/lib/languages";

type Phase = "idle" | "uploading" | "done" | "error";

export function TranslateClient({ crossLinks = [] }: { crossLinks?: { href: string; label: string }[] }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [sourceLang, setSourceLang] = useState<string>("");
  const locale = useLocale();
  const initialTarget: LanguageCode = (DEFAULT_TARGETS[locale] as LanguageCode) ?? "EN";
  const [targetLang, setTargetLang] = useState<LanguageCode>(initialTarget);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState<string | null>(null);

  const chrome = getChrome(locale);
  const ui = getToolUi(locale).translate;

  async function start(f: File) {
    setFile(f);
    setPhase("uploading");
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", f);
      fd.append("target_lang", targetLang);
      if (sourceLang) fd.append("source_lang", sourceLang);

      const res = await fetch("/api/process/translate-subtitles", { method: "POST", body: fd });
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
      setResultUrl(data.url);
      setResultName(data.filename ?? `${f.name.replace(/\.[^.]+$/, "")}.${targetLang.toLowerCase()}.srt`);
      setPhase("done");
    } catch (err) {
      setPhase("error");
      setError(err instanceof Error ? err.message : chrome.errors.network);
    }
  }

  function reset() {
    setPhase("idle");
    setFile(null);
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

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
        <p className="text-sm text-ink-700">{ui.helper}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-ink-700" htmlFor="source-lang">
              {ui.sourceLang}
            </label>
            <select
              id="source-lang"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
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
            <label className="text-sm font-medium text-ink-700" htmlFor="target-lang">
              {ui.targetLang}
            </label>
            <select
              id="target-lang"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value as LanguageCode)}
              className="mt-1 h-10 w-full rounded border border-ink-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.native} ({l.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <UploadZone accept={["srt", "vtt"]} maxMb={25} onFile={start} cta={ui.translateNow} />
      {phase === "error" && error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
}
