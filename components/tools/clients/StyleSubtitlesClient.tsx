"use client";

import { useState } from "react";
import { UploadZone } from "@/components/tools/UploadZone";
import { ProcessingScreen } from "@/components/tools/ProcessingScreen";
import { ResultScreen } from "@/components/tools/ResultScreen";
import { Button } from "@/components/ui/button";
import { SubtitleStylePicker, DEFAULT_STYLE, type SubtitleStyle } from "@/components/tools/SubtitleStylePicker";
import { useLocale } from "@/hooks/useLocale";
import { getChrome, t as tt } from "@/lib/i18n/chrome";
import { getToolUi } from "@/lib/i18n/tool-ui";

type Phase = "idle" | "configure" | "uploading" | "done" | "error";

export function StyleSubtitlesClient() {
  const [file, setFile] = useState<File | null>(null);
  const [style, setStyle] = useState<SubtitleStyle>(DEFAULT_STYLE);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState<string | null>(null);

  const locale = useLocale();
  const chrome = getChrome(locale);
  const ui = getToolUi(locale);

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
      fd.append("style", JSON.stringify(style));
      const res = await fetch("/api/process/style-subtitles", { method: "POST", body: fd });
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
      setResultName(data.filename ?? `${file.name.replace(/\.[^.]+$/, "")}.ass`);
      setPhase("done");
    } catch (err) {
      setPhase("error");
      setError(err instanceof Error ? err.message : chrome.errors.network);
    }
  }

  function reset() {
    setFile(null);
    setStyle(DEFAULT_STYLE);
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
      />
    );
  }

  if (phase === "uploading" && file) {
    return <ProcessingScreen filename={file.name} fileSize={file.size} status={chrome.processing.processing} />;
  }

  if (phase === "configure" && file) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
          <div className="text-sm text-ink-500">{file.name}</div>
          <h3 className="mt-2 text-lg font-semibold text-ink-900">{ui.burnIn.customise}</h3>
          <div className="mt-6">
            <SubtitleStylePicker value={style} onChange={setStyle} labels={ui.style} />
          </div>
        </div>

        {error && (
          <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        <div className="flex gap-2">
          <Button onClick={start}>{ui.style.download}</Button>
          <Button variant="outline" onClick={reset}>
            {chrome.sync.cancel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <UploadZone accept={["srt", "vtt"]} maxMb={25} onFile={onFile} />
      {phase === "error" && error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
}
