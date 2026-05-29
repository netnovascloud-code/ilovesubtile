// Shared single-session FFmpeg.wasm instance. Loaded once (~30 MB core from the
// unpkg CDN) and reused across every in-browser FFmpeg tool so we never download
// the core twice. Single-threaded @ffmpeg/core@0.12.6 — note this build does NOT
// include libass, so the `subtitles`/`ass` video filters are unavailable.

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
      const base = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ffmpeg.load({
        coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
      });
      return ffmpeg;
    })();
  }
  const ff = (await ffmpegPromise) as FfmpegInstance;
  if (onProgress) ff.on("progress", (e) => onProgress(Math.max(1, Math.min(99, Math.round((e.progress ?? 0) * 100)))));
  return ff;
}
