"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FilmIcon, FileText } from "lucide-react";
import { ProcessingScreen } from "@/components/tools/ProcessingScreen";
import { ResultScreen } from "@/components/tools/ResultScreen";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import { getChrome, t as tt } from "@/lib/i18n/chrome";
import { getToolUi } from "@/lib/i18n/tool-ui";

type Phase = "idle" | "uploading" | "done" | "error";

function MiniDrop({
  label,
  accept,
  onFile,
  current,
  icon,
}: {
  label: string;
  accept: Record<string, string[]>;
  onFile: (f: File) => void;
  current: File | null;
  icon: React.ReactNode;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => files[0] && onFile(files[0]),
    multiple: false,
    accept,
  });
  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-ink-200 bg-white p-6 text-center transition-colors",
        isDragActive && "border-brand-500 bg-brand-50/50",
      )}
    >
      <input {...getInputProps()} />
      <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600">
        {icon}
      </div>
      <div className="mt-3 text-sm font-medium text-ink-900">{label}</div>
      {current && (
        <div className="mt-2 truncate text-xs text-ink-500" title={current.name}>
          {current.name} · {formatBytes(current.size)}
        </div>
      )}
    </div>
  );
}

export function AutoSyncClient() {
  const [video, setVideo] = useState<File | null>(null);
  const [subs, setSubs] = useState<File | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState<string | null>(null);

  const locale = useLocale();
  const chrome = getChrome(locale);
  const ui = getToolUi(locale).autoSync;

  async function start() {
    if (!video || !subs) {
      setError(ui.bothNeeded);
      return;
    }
    setPhase("uploading");
    setError(null);
    try {
      const fd = new FormData();
      fd.append("video", video);
      fd.append("subtitles", subs);
      const res = await fetch("/api/process/auto-sync", { method: "POST", body: fd });
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
      setResultName(data.filename ?? `${subs.name.replace(/\.[^.]+$/, "")}.synced.srt`);
      setPhase("done");
    } catch (err) {
      setPhase("error");
      setError(err instanceof Error ? err.message : chrome.errors.network);
    }
  }

  function reset() {
    setVideo(null);
    setSubs(null);
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

  if (phase === "uploading" && video && subs) {
    return <ProcessingScreen filename={`${video.name} + ${subs.name}`} fileSize={video.size + subs.size} />;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <MiniDrop
          label={ui.videoFile}
          accept={{
            "video/mp4": [".mp4"],
            "video/quicktime": [".mov"],
            "video/webm": [".webm"],
            "audio/mpeg": [".mp3"],
            "audio/wav": [".wav"],
          }}
          icon={<FilmIcon className="h-5 w-5" />}
          onFile={setVideo}
          current={video}
        />
        <MiniDrop
          label={ui.subtitleFile}
          accept={{ "application/x-subrip": [".srt"], "text/vtt": [".vtt"] }}
          icon={<FileText className="h-5 w-5" />}
          onFile={setSubs}
          current={subs}
        />
      </div>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <div className="flex gap-2">
        <Button onClick={start} disabled={!video || !subs}>
          <Upload className="h-4 w-4" />
          {ui.align}
        </Button>
      </div>
    </div>
  );
}
