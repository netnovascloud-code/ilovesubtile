// Shared single-session FFmpeg.wasm instance. Loaded once (~30 MB core from the
// unpkg CDN) and reused across every in-browser FFmpeg tool so we never download
// the core twice. Single-threaded @ffmpeg/core@0.12.6 — note this build does NOT
// include libass, so the `subtitles`/`ass` video filters are unavailable.
//
// Root cause of "Conversion failed: undefined" on every audio/video tool, and
// the only setup that survives Next/Webpack + our CSP:
//
//   • @ffmpeg/ffmpeg@0.12.x's FFmpeg.load() builds its worker from
//     `new Worker(new URL("./worker.js", import.meta.url), { type: "module" })`.
//     - Without transpilePackages Webpack never emits that chunk → worker dead.
//     - WITH transpilePackages Webpack rewrites the worker's dynamic
//       `import(coreURL)` into a static require → at runtime it throws
//       "Cannot find module 'blob:…'". Both break, oppositely.
//
//   • Fix: bypass Webpack's worker handling entirely. We self-host the
//     package's own ESM worker (worker.js + const.js + errors.js) under
//     /public/ffmpeg and pass it as `classWorkerURL`. It's same-origin (CSP
//     worker-src 'self'), its relative imports resolve natively, and its
//     dynamic `import(coreURL)` stays native — so a blob core URL loads fine.
//
//   • The worker is type:"module", so importScripts() is absent and it loads
//     the core via `import(coreURL).default` → that needs the ESM core
//     (/dist/esm), whose default export is createFFmpegCore. (UMD core has no
//     default export.) Importing a blob: script requires `blob:` in the CSP
//     script-src (added in next.config.mjs).
//
//   • Single-threaded core → no SharedArrayBuffer → we deliberately do NOT
//     enable COOP/COEP isolation, which would break the ~30 other client tools
//     loading from esm.sh/unpkg without CORP (pdf.js, tesseract, @imgly, jsQR,
//     zxing), plus Google Fonts and Ezoic ads.

// The core (~30 MB) is fetched at runtime and turned into a blob URL. We try
// two CDNs in order so a single CDN hiccup (unpkg 5xx / regional block) doesn't
// leave every audio/video tool dead. Both hosts are allow-listed in the CSP
// connect-src (next.config.mjs / middleware.ts).
const CORE_BASES = [
  "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm",
  "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm",
];
// Self-hosted ESM worker (copied from @ffmpeg/ffmpeg/dist/esm) — same-origin so
// it isn't mangled by Webpack and satisfies the CSP worker-src 'self'.
const WORKER_URL = "/ffmpeg/worker.js";
// A 404 on the worker (or a wedged CDN) makes @ffmpeg/ffmpeg's load() hang
// forever with no error — the UI then sits on "loading" with no progress and
// no failure. Cap it so a stuck load surfaces as a clear, retryable error.
const LOAD_TIMEOUT_MS = 60_000;

export type FfmpegInstance = {
  exec: (args: string[]) => Promise<number>;
  writeFile: (n: string, d: Uint8Array) => Promise<void>;
  readFile: (n: string) => Promise<Uint8Array>;
  deleteFile: (n: string) => Promise<void>;
  on: (event: string, h: (e: { progress?: number; type?: string; message?: string }) => void) => void;
};

let ffmpegPromise: Promise<unknown> | null = null;

function withTimeout<T>(p: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    p.then(
      (v) => { clearTimeout(timer); resolve(v); },
      (e) => { clearTimeout(timer); reject(e); },
    );
  });
}

async function loadFfmpeg(): Promise<FfmpegInstance> {
  const { FFmpeg } = await import("@ffmpeg/ffmpeg");
  const { toBlobURL } = await import("@ffmpeg/util");
  const classWorkerURL = new URL(WORKER_URL, window.location.origin).href;
  let lastErr: unknown;
  for (const base of CORE_BASES) {
    try {
      const ffmpeg = new FFmpeg();
      const [coreURL, wasmURL] = await Promise.all([
        toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
        toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
      ]);
      await withTimeout(
        ffmpeg.load({ coreURL, wasmURL, classWorkerURL }),
        LOAD_TIMEOUT_MS,
        "The conversion engine timed out while loading. Check your connection or try another browser.",
      );
      return ffmpeg as unknown as FfmpegInstance;
    } catch (e) {
      lastErr = e; // try the next CDN
    }
  }
  throw lastErr instanceof Error
    ? lastErr
    : new Error("Could not load the conversion engine — please retry.");
}

export async function getFfmpeg(onProgress?: (p: number) => void): Promise<FfmpegInstance> {
  if (!ffmpegPromise) {
    // Reset the cache on failure so the next attempt re-tries (and can fall
    // through to the backup CDN) instead of replaying a rejected promise.
    ffmpegPromise = loadFfmpeg().catch((e) => { ffmpegPromise = null; throw e; });
  }
  const ff = (await ffmpegPromise) as FfmpegInstance;
  if (onProgress) ff.on("progress", (e) => onProgress(Math.max(1, Math.min(99, Math.round((e.progress ?? 0) * 100)))));
  return ff;
}
