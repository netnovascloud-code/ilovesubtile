// Shared single-session FFmpeg.wasm instance. Loaded once (~30 MB core from the
// unpkg CDN) and reused across every in-browser FFmpeg tool so we never download
// the core twice. Single-threaded @ffmpeg/core@0.12.6 — note this build does NOT
// include libass, so the `subtitles`/`ass` video filters are unavailable.
//
// IMPORTANT — why `classWorkerURL` is set explicitly:
// @ffmpeg/ffmpeg@0.12.x's FFmpeg.load() spins up its API worker via
//   new Worker(new URL("./worker.js", import.meta.url), { type: "module" })
// which Next/Webpack does NOT reliably emit as a chunk — the worker silently
// fails to load and load() rejects with a non-Error, surfacing to users as
// "Conversion failed: undefined". Passing classWorkerURL (the package's own
// 814.ffmpeg.js, fetched from the CDN as a blob) bypasses Webpack's worker
// resolution entirely and fixes every audio/video tool.
//
// NOTE — the single-threaded core does NOT need SharedArrayBuffer, so we do
// NOT enable COOP/COEP cross-origin isolation: that would break the ~30 other
// client tools that load libraries from esm.sh/unpkg without CORP headers
// (pdf.js, tesseract.js, @imgly, jsQR, zxing…), plus Google Fonts and ads.

const FFMPEG_VERSION = "0.12.15"; // keep in sync with package.json @ffmpeg/ffmpeg
const CORE_BASE = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
const WORKER_URL = `https://unpkg.com/@ffmpeg/ffmpeg@${FFMPEG_VERSION}/dist/umd/814.ffmpeg.js`;

export type FfmpegInstance = {
  exec: (args: string[]) => Promise<number>;
  writeFile: (n: string, d: Uint8Array) => Promise<void>;
  readFile: (n: string) => Promise<Uint8Array>;
  deleteFile: (n: string) => Promise<void>;
  on: (event: string, h: (e: { progress?: number; type?: string; message?: string }) => void) => void;
};

let ffmpegPromise: Promise<unknown> | null = null;

export async function getFfmpeg(onProgress?: (p: number) => void): Promise<FfmpegInstance> {
  if (!ffmpegPromise) {
    ffmpegPromise = (async () => {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { toBlobURL } = await import("@ffmpeg/util");
      const ffmpeg = new FFmpeg();
      await ffmpeg.load({
        coreURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.wasm`, "application/wasm"),
        classWorkerURL: await toBlobURL(WORKER_URL, "text/javascript"),
      });
      return ffmpeg;
    })();
  }
  const ff = (await ffmpegPromise) as FfmpegInstance;
  if (onProgress) ff.on("progress", (e) => onProgress(Math.max(1, Math.min(99, Math.round((e.progress ?? 0) * 100)))));
  return ff;
}
