// Shared single-session FFmpeg.wasm instance. Loaded once (~30 MB core from the
// unpkg CDN) and reused across every in-browser FFmpeg tool so we never download
// the core twice. Single-threaded @ffmpeg/core@0.12.6 — note this build does NOT
// include libass, so the `subtitles`/`ass` video filters are unavailable.
//
// IMPORTANT — root cause of "Conversion failed: undefined" on every audio/
// video tool, and why this exact setup fixes it:
//
//   • @ffmpeg/ffmpeg@0.12.x resolves (under Next/Webpack) to its ESM build,
//     whose FFmpeg.load() creates the API worker as a MODULE worker:
//        new Worker(new URL("./worker.js", import.meta.url), { type: "module" })
//     Webpack only emits that worker chunk when it transpiles the package —
//     hence `transpilePackages: ["@ffmpeg/ffmpeg"]` in next.config.mjs. Without
//     it the worker never loads and load() rejects with a non-Error.
//
//   • Inside that MODULE worker, importScripts() doesn't exist, so the worker
//     loads the core via dynamic `import(coreURL)` and reads `.default`. A UMD
//     core has no ESM default export → ERROR_IMPORT_FAILURE. So we MUST point
//     coreURL at the ESM core (/dist/esm), whose default export is
//     createFFmpegCore. (We do NOT pass classWorkerURL: the package's UMD
//     814 worker has its dynamic import() stubbed to MODULE_NOT_FOUND by its
//     own bundling, which would re-break core loading.)
//
//   • The single-threaded core does NOT use SharedArrayBuffer, so we do NOT
//     enable COOP/COEP isolation — that would break the ~30 client tools that
//     load from esm.sh/unpkg without CORP headers (pdf.js, tesseract, @imgly,
//     jsQR, zxing), plus Google Fonts and Ezoic ads.

const CORE_BASE = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";

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
      });
      return ffmpeg;
    })();
  }
  const ff = (await ffmpegPromise) as FfmpegInstance;
  if (onProgress) ff.on("progress", (e) => onProgress(Math.max(1, Math.min(99, Math.round((e.progress ?? 0) * 100)))));
  return ff;
}
