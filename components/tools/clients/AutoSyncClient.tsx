"use client";

import { useState } from "react";
import { Upload, FilmIcon, FileText } from "lucide-react";
import { ProcessingScreen } from "@/components/tools/ProcessingScreen";
import { ResultScreen } from "@/components/tools/ResultScreen";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { getChrome, t as tt } from "@/lib/i18n/chrome";
import { getToolUi } from "@/lib/i18n/tool-ui";
import { callTool } from "@/lib/tool-api";

type Phase = "idle" | "uploading" | "done" | "error";

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
      const res = await callTool("auto-sync", fd);
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        const code = typeof errBody?.error === "string" ? errBody.error : "";
        setPhase("error");
        setError(code.startsWith("missing_") ? chrome.errors.notWiredUp : tt(chrome.errors.serverReturned, { status: res.status }));
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
