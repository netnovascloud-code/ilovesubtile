"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Download, X, Loader2, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { categoryTheme } from "@/lib/category-theme";
import { getFfmpeg } from "@/lib/ffmpeg-client";

type Track = { url: string; name: string; size: number; lang: string; codec: string };
type Phase = "idle" | "loading" | "probing" | "extracting" | "done" | "error";

// Text subtitle codecs we can re-mux to SRT. Image-based tracks (PGS, VobSub)
// would need OCR, so we surface them as "not extractable to text" instead.
const TEXT_CODECS = new Set(["subrip", "srt", "ass", "ssa", "mov_text", "webvtt", "text", "stl"]);

export function ExtractSubtitlesClient() {
  const th = categoryTheme("subtitles");
  const [file, setFile] = useState<File | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [note, setNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const urls = useRef<string[]>([]);

  useEffect(() => () => { urls.current.forEach((u) => URL.revokeObjectURL(u)); }, []);

  function clearTracks() {
    urls.current.forEach((u) => URL.revokeObjectURL(u));
    urls.current = [];
    setTracks([]);
  }

  async function run(f: File) {
    setError(null); setNote(null); clearTracks(); setPhase("loading");
    try {
      const logs: string[] = [];
      const ff = await getFfmpeg();
      ff.on("log", (e) => { if (typeof e.message === "string") logs.push(e.message); });
      const { fetchFile } = await import("@ffmpeg/util");
      const inExt = (f.name.split(".").pop() || "mkv").toLowerCase();
      const input = `input.${inExt}`;
      await ff.writeFile(input, await fetchFile(f));

      // Probe: a no-output run prints stream info to the log, then errors out
      // (expected). We parse the captured lines for Subtitle streams.
      setPhase("probing");
      try { await ff.exec(["-hide_banner", "-i", input]); } catch { /* expected non-zero */ }

      const streams: { codec: string; lang: string }[] = [];
      const re = /Stream #\d+:\d+(?:\[[^\]]*\])?(?:\(([^)]+)\))?:\s*Subtitle:\s*([A-Za-z0-9_]+)/g;
      for (const line of logs) {
        let m: RegExpExecArray | null;
        re.lastIndex = 0;
        while ((m = re.exec(line))) streams.push({ lang: m[1] || "und", codec: m[2].toLowerCase() });
      }

      if (streams.length === 0) {
        setPhase("error");
        setError("No subtitle tracks found in this file. It may have no embedded subtitles, or only burned-in (hard) ones.");
        try { await ff.deleteFile(input); } catch {}
        return;
      }

      // Extract each TEXT subtitle stream to SRT, indexed by its position among
      // subtitle streams (-map 0:s:N).
      setPhase("extracting");
      const out: Track[] = [];
      let skipped = 0;
      const baseName = f.name.replace(/\.[^.]+$/, "");
      for (let i = 0; i < streams.length; i++) {
        const s = streams[i];
        if (!TEXT_CODECS.has(s.codec)) { skipped++; continue; }
        const outName = `track_${i}.srt`;
        try {
          const code = await ff.exec(["-hide_banner", "-i", input, "-map", `0:s:${i}`, outName]);
          if (code !== 0) { skipped++; continue; }
          const data = await ff.readFile(outName);
          if (!data || data.length === 0) { skipped++; continue; }
          const blob = new Blob([data as BlobPart], { type: "application/x-subrip" });
          const url = URL.createObjectURL(blob);
          urls.current.push(url);
          out.push({ url, name: `${baseName}.${s.lang}.${i + 1}.srt`, size: blob.size, lang: s.lang, codec: s.codec });
          try { await ff.deleteFile(outName); } catch {}
        } catch { skipped++; }
      }
      try { await ff.deleteFile(input); } catch {}

      if (out.length === 0) {
        setPhase("error");
        setError(
          skipped > 0
            ? "The subtitle tracks in this file are image-based (e.g. PGS/VobSub) and can't be converted to text SRT here."
            : "Could not extract any subtitle tracks from this file.",
        );
        return;
      }
      if (skipped > 0) setNote(`${skipped} image-based track${skipped > 1 ? "s were" : " was"} skipped (can't convert to text SRT).`);
      setTracks(out);
      setPhase("done");
    } catch (e) {
      setPhase("error");
      setError(`Extraction failed: ${(e as Error).message}`);
    }
  }

  const busy = phase === "loading" || phase === "probing" || phase === "extracting";
  const busyLabel = phase === "loading" ? "Loading the subtitle engine…" : phase === "probing" ? "Scanning for subtitle tracks…" : "Extracting tracks…";

  function reset() { clearTracks(); setFile(null); setPhase("idle"); setError(null); setNote(null); }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className={cn("flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors hover:brightness-95", th.dropBorder, th.dropBg)}>
          <span className={cn("grid h-12 w-12 place-items-center rounded-xl", th.iconBg, th.iconText)}>
            <Upload className="h-6 w-6" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">Click to upload a video</span>
          <span className="mt-0.5 text-xs text-ink-400">MKV, MP4, MOV or WebM with embedded subtitle tracks</span>
          <input
            type="file"
            accept="video/*,.mkv,.mp4,.mov,.webm"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); run(f); } }}
          />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={reset} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">{busyLabel}</p>
            <p className="text-xs text-ink-400">Runs in your browser — large files take longer.</p>
          </div>
        </div>
      )}

      {tracks.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-ink-700">{tracks.length} subtitle track{tracks.length > 1 ? "s" : ""} extracted</p>
          {tracks.map((t, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
              <span className="inline-flex items-center gap-2">
                <FileDown className="h-4 w-4 text-ink-400" />
                <span className="font-medium text-ink-900">{t.lang.toUpperCase()}</span>
                <span className="text-ink-400">{t.codec} · {formatBytes(t.size)}</span>
              </span>
              <a href={t.url} download={t.name}>
                <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> Download .srt</Button>
              </a>
            </div>
          ))}
        </div>
      )}

      {note && <p className="rounded border border-amber-200 bg-amber-50 p-2 text-xs text-amber-700">{note}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Processed 100% in your browser via FFmpeg WebAssembly — your file is never uploaded.</p>
    </div>
  );
}
