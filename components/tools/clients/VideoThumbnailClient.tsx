"use client";

import { useEffect, useRef, useState } from "react";
import { Film, Download, Loader2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { formatBytes } from "@/lib/utils";

type Thumb = { t: number; url: string; size: number };

const fmtT = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function VideoThumbnailClient() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [thumbs, setThumbs] = useState<Thumb[]>([]);
  const [out, setOut] = useState<Thumb | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const urls = useRef<string[]>([]);

  useEffect(() => () => { urls.current.forEach((u) => URL.revokeObjectURL(u)); }, []);

  function onFile(f: File) {
    urls.current.forEach((u) => URL.revokeObjectURL(u));
    urls.current = [];
    setThumbs([]); setOut(null); setError(null);
    const u = URL.createObjectURL(f);
    urls.current.push(u);
    setFile(f); setSrc(u);
  }

  // Grab the frame currently shown by the <video> element. When `time` is
  // given we seek first and wait for the browser to paint that frame.
  function capture(time?: number): Promise<Thumb> {
    return new Promise((resolve, reject) => {
      const v = videoRef.current;
      if (!v || !v.videoWidth) { reject(new Error("Video not ready yet.")); return; }
      const grab = () => {
        const c = document.createElement("canvas");
        c.width = v.videoWidth; c.height = v.videoHeight;
        c.getContext("2d")!.drawImage(v, 0, 0, c.width, c.height);
        c.toBlob((b) => {
          if (!b) { reject(new Error("Could not encode the frame.")); return; }
          const url = URL.createObjectURL(b);
          urls.current.push(url);
          resolve({ t: v.currentTime, url, size: b.size });
        }, "image/png");
      };
      if (time == null || Math.abs(v.currentTime - time) < 0.02) { grab(); return; }
      const onSeeked = () => { v.removeEventListener("seeked", onSeeked); requestAnimationFrame(grab); };
      v.addEventListener("seeked", onSeeked);
      v.currentTime = time;
    });
  }

  async function genThumbs() {
    const v = videoRef.current;
    if (!v || !isFinite(v.duration) || v.duration <= 0) { setError("Could not read the video duration."); return; }
    setBusy(true); setError(null); setThumbs([]);
    try {
      const positions = [0.05, 0.2, 0.4, 0.6, 0.8, 0.95].map((p) => p * v.duration);
      const collected: Thumb[] = [];
      for (const t of positions) {
        const thumb = await capture(t);
        collected.push(thumb);
        setThumbs([...collected]);
      }
      v.currentTime = 0;
    } catch (e) {
      setError((e as Error).message);
    } finally { setBusy(false); }
  }

  async function captureCurrent() {
    setBusy(true); setError(null);
    try { setOut(await capture()); }
    catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  }

  const baseName = (file?.name ?? "video").replace(/\.[^.]+$/, "");

  return (
    <div className="space-y-5">
      <MiniDrop
        label="Video file"
        accept={{ "video/mp4": [".mp4"], "video/quicktime": [".mov"], "video/webm": [".webm"], "video/x-matroska": [".mkv"] }}
        icon={<Film className="h-5 w-5" />}
        onFile={onFile}
        current={file}
      />

      {src && (
        <>
          <video
            ref={videoRef}
            src={src}
            controls
            muted
            playsInline
            preload="metadata"
            onLoadedMetadata={genThumbs}
            className="mx-auto max-h-80 w-full rounded-lg border border-ink-100 bg-black"
          />

          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={captureCurrent} disabled={busy} size="lg">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              Capture current frame
            </Button>
            <span className="text-xs text-ink-400">Scrub the video to the exact moment, then capture — or pick a suggestion below.</span>
          </div>
        </>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {thumbs.length > 0 && (
        <div>
          <div className="mb-2 text-xs font-medium text-ink-600">Suggested frames</div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {thumbs.map((th) => (
              <button key={th.t} onClick={() => setOut(th)}
                className={`overflow-hidden rounded-lg border ${out?.url === th.url ? "ring-2 ring-brand-500" : "border-ink-200"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={th.url} alt={`Frame at ${fmtT(th.t)}`} className="h-16 w-full object-cover" />
                <div className="bg-white py-0.5 text-center text-[10px] text-ink-500">{fmtT(th.t)}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {out && (
        <div className="space-y-3">
          <div className="text-xs font-medium text-ink-600">Selected frame · {fmtT(out.t)}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={out.url} alt="Selected frame" className="mx-auto max-h-80 rounded-lg border border-ink-100" />
          <a href={out.url} download={`${baseName}-${fmtT(out.t).replace(":", "m")}s.png`}>
            <Button size="lg"><Download className="h-4 w-4" /> Download PNG · {formatBytes(out.size)}</Button>
          </a>
        </div>
      )}

      <p className="text-xs text-ink-400">
        Frames are grabbed in your browser straight from the video — nothing is uploaded. PNG at the video's native resolution.
      </p>
    </div>
  );
}
