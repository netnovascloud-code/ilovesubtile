"use client";

import { useEffect, useRef, useState } from "react";
import { FilmIcon, FileText, Loader2, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { useLocale } from "@/hooks/useLocale";
import { getToolUi } from "@/lib/i18n/tool-ui";
import { getFfmpeg } from "@/lib/ffmpeg-client";

type Phase = "idle" | "loading" | "running" | "done" | "error";

// Muxes the subtitle file into the MP4 as a soft (selectable) track via
// -c:s mov_text. Runs entirely in the browser — no libass dependency, no server.
//
// Note: this produces a TOGGLEABLE caption track. Players (VLC, Quicktime,
// Apple TV, etc.) will offer it as a subtitle option. It does NOT burn captions
// into the pixels — social-media autoplay (TikTok/Instagram) won't show it.
// The UI says so explicitly so users aren't surprised.
export function AddSubtitlesToVideoClient({ crossLinks = [] }: { crossLinks?: { href: string; label: string }[] }) {
  const [video, setVideo] = useState<File | null>(null);
  const [subs, setSubs] = useState<File | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState<string>("");
  const [outSize, setOutSize] = useState(0);
  const cleanup = useRef<string | null>(null);

  const locale = useLocale();
  const ui = getToolUi(locale);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  async function run() {
    if (!video || !subs) {
      setError(getToolUi(locale).autoSync.bothNeeded);
      return;
    }
    setPhase("loading"); setError(null); setProgress(0);
    try {
      const ff = await getFfmpeg((p) => setProgress(p));
      const { fetchFile } = await import("@ffmpeg/util");
      const vExt = (video.name.split(".").pop() || "mp4").toLowerCase();
      const sExt = (subs.name.split(".").pop() || "srt").toLowerCase();
      const vIn = `video.${vExt}`;
      const sIn = `subs.${sExt}`;
      const out = "out.mp4";
      await ff.writeFile(vIn, await fetchFile(video));
      await ff.writeFile(sIn, await fetchFile(subs));
      setPhase("running");
      // Stream-copy the video + audio and mux the subtitles as a selectable
      // mov_text track. faststart moves the moov atom to the front so the file
      // plays as it loads.
      const code = await ff.exec([
        "-i", vIn, "-i", sIn,
        "-map", "0:v:0", "-map", "0:a:0?", "-map", "1:0",
        "-c:v", "copy", "-c:a", "copy", "-c:s", "mov_text",
        "-metadata:s:s:0", "language=und",
        "-movflags", "+faststart",
        out,
      ]);
      if (code !== 0) throw new Error("FFmpeg exited with a non-zero status.");
      const data = await ff.readFile(out);
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url); setOutSize(blob.size);
      setOutName(`${video.name.replace(/\.[^.]+$/, "")}.subtitled.mp4`);
      try { await ff.deleteFile(vIn); await ff.deleteFile(sIn); await ff.deleteFile(out); } catch {}
      setProgress(100); setPhase("done");
    } catch (e) {
      setError(`Could not mux the subtitles: ${(e as Error).message}`);
      setPhase("error");
    }
  }

  function reset() {
    setVideo(null); setSubs(null); setPhase("idle"); setProgress(0); setOutUrl(null); setError(null);
  }

  const busy = phase === "loading" || phase === "running";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <MiniDrop
          label={ui.burnIn.videoFile}
          accept={{
            "video/mp4": [".mp4"],
            "video/quicktime": [".mov"],
            "video/webm": [".webm"],
            "video/x-matroska": [".mkv"],
            "video/x-msvideo": [".avi"],
          }}
          icon={<FilmIcon className="h-5 w-5" />}
          onFile={setVideo}
          current={video}
        />
        <MiniDrop
          label={ui.burnIn.subtitleFile}
          accept={{ "application/x-subrip": [".srt"], "text/vtt": [".vtt"] }}
          icon={<FileText className="h-5 w-5" />}
          onFile={setSubs}
          current={subs}
        />
      </div>

      {video && subs && phase === "idle" && (
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-800">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            Captions will be added as a <strong>selectable subtitle track</strong> in the MP4 — viewers can turn them on in any modern player.
            For autoplay-with-captions on TikTok / Instagram, use the styled .ass from <strong>Style Subtitles</strong> with your own editor first.
          </span>
        </div>
      )}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">{phase === "loading" ? "Loading the video engine…" : "Muxing the subtitle track…"}</p>
            <p className="text-xs text-ink-400">{phase === "loading" ? "First load is ~30 MB; cached afterwards." : `${progress}% complete`}</p>
          </div>
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={run} disabled={!video || !subs || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FilmIcon className="h-4 w-4" />}
          {phase === "done" ? "Run again" : busy ? (phase === "loading" ? "Loading…" : "Working…") : "Add subtitle track"}
        </Button>
        {outUrl && (
          <a href={outUrl} download={outName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download · {formatBytes(outSize)}</Button>
          </a>
        )}
        {(video || subs || outUrl) && !busy && (
          <Button variant="outline" size="lg" onClick={reset}>Reset</Button>
        )}
      </div>

      {crossLinks.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {crossLinks.map((c) => (
            <a key={c.href} href={c.href} className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs text-ink-700 hover:border-brand-300 hover:text-ink-900">{c.label}</a>
          ))}
        </div>
      )}

      <p className="text-xs text-ink-400">Processed 100% in your browser via FFmpeg WebAssembly — your video is never uploaded.</p>
    </div>
  );
}
