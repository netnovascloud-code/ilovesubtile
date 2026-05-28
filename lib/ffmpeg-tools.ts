// Per-slug FFmpeg.wasm command builders for audio/video tools. All run
// in-browser via WebAssembly — no server, no upload, no quota.

export type FfmpegOption =
  | { id: string; label: string; type?: "select"; values: { id: string; label: string }[]; default: string }
  | { id: string; label: string; type: "number" | "range"; min: number; max: number; step?: number; unit?: string; default: string };

export type FfmpegToolDef = {
  label: string;
  accept: string;
  inputExt: string;
  outputExt: string;
  outputMime: string;
  options?: FfmpegOption[];
  command: (input: string, output: string, opt: Record<string, string>) => string[];
};

const QUALITY_AUDIO: FfmpegOption = {
  id: "bitrate", label: "Bitrate",
  values: [
    { id: "128k", label: "128 kbps · small" },
    { id: "192k", label: "192 kbps · balanced" },
    { id: "256k", label: "256 kbps · good" },
    { id: "320k", label: "320 kbps · max" },
  ],
  default: "192k",
};

const CRF_VIDEO: FfmpegOption = {
  id: "crf", label: "Quality",
  values: [
    { id: "32", label: "Smaller (CRF 32)" },
    { id: "28", label: "Balanced (CRF 28)" },
    { id: "23", label: "High (CRF 23)" },
  ],
  default: "28",
};

export const FFMPEG_TOOLS: Record<string, FfmpegToolDef> = {
  "mp3-to-wav": {
    label: "an MP3", accept: "audio/mpeg,.mp3", inputExt: "mp3", outputExt: "wav", outputMime: "audio/wav",
    command: (i, o) => ["-i", i, o],
  },
  "wav-to-mp3": {
    label: "a WAV", accept: "audio/wav,.wav", inputExt: "wav", outputExt: "mp3", outputMime: "audio/mpeg",
    options: [QUALITY_AUDIO],
    command: (i, o, opt) => ["-i", i, "-c:a", "libmp3lame", "-b:a", opt.bitrate ?? "192k", o],
  },
  "compress-audio": {
    label: "an audio file", accept: "audio/*,.mp3,.wav,.m4a,.flac,.ogg,.aac", inputExt: "mp3", outputExt: "mp3", outputMime: "audio/mpeg",
    options: [QUALITY_AUDIO],
    command: (i, o, opt) => ["-i", i, "-c:a", "libmp3lame", "-b:a", opt.bitrate ?? "128k", o],
  },
  "audio-from-video": {
    label: "a video", accept: "video/*,.mp4,.mov,.mkv,.webm,.avi", inputExt: "mp4", outputExt: "mp3", outputMime: "audio/mpeg",
    options: [QUALITY_AUDIO],
    command: (i, o, opt) => ["-i", i, "-vn", "-c:a", "libmp3lame", "-b:a", opt.bitrate ?? "192k", o],
  },
  "compress-video": {
    label: "a video", accept: "video/*,.mp4,.mov,.mkv,.webm,.avi", inputExt: "mp4", outputExt: "mp4", outputMime: "video/mp4",
    options: [CRF_VIDEO],
    command: (i, o, opt) => ["-i", i, "-c:v", "libx264", "-crf", opt.crf ?? "28", "-preset", "veryfast", "-c:a", "aac", "-b:a", "128k", o],
  },
  "mp4-to-gif": {
    label: "an MP4", accept: "video/mp4,video/quicktime,.mp4,.mov,.webm", inputExt: "mp4", outputExt: "gif", outputMime: "image/gif",
    options: [
      { id: "fps", label: "Frame rate", values: [{ id: "10", label: "10 fps" }, { id: "12", label: "12 fps" }, { id: "15", label: "15 fps" }, { id: "24", label: "24 fps" }], default: "12" },
      { id: "w", label: "Width", values: [{ id: "320", label: "320 px" }, { id: "480", label: "480 px" }, { id: "640", label: "640 px" }], default: "480" },
    ],
    command: (i, o, opt) => ["-i", i, "-vf", `fps=${opt.fps ?? 12},scale=${opt.w ?? 480}:-1:flags=lanczos`, "-loop", "0", o],
  },
  "gif-to-mp4": {
    label: "a GIF", accept: "image/gif,.gif", inputExt: "gif", outputExt: "mp4", outputMime: "video/mp4",
    command: (i, o) => ["-i", i, "-movflags", "faststart", "-pix_fmt", "yuv420p", "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2", o],
  },
  "mp4-to-webm": {
    label: "an MP4", accept: "video/mp4,video/quicktime,.mp4,.mov", inputExt: "mp4", outputExt: "webm", outputMime: "video/webm",
    options: [CRF_VIDEO],
    command: (i, o, opt) => ["-i", i, "-c:v", "libvpx-vp9", "-crf", opt.crf ?? "32", "-b:v", "0", "-c:a", "libopus", "-b:a", "96k", o],
  },

  // ── Audio: trim / volume / speed ────────────────────────────────────────
  "cut-audio": {
    label: "an audio file", accept: "audio/*,.mp3,.wav,.m4a,.flac,.ogg,.aac", inputExt: "mp3", outputExt: "mp3", outputMime: "audio/mpeg",
    options: [
      { id: "start", label: "Start (seconds)", type: "number", min: 0, max: 36000, step: 0.1, default: "0" },
      { id: "end", label: "End (seconds)", type: "number", min: 0.1, max: 36000, step: 0.1, default: "10" },
    ],
    command: (i, o, opt) => ["-i", i, "-ss", opt.start || "0", "-to", opt.end || "10", "-c:a", "libmp3lame", "-b:a", "192k", o],
  },
  "change-volume": {
    label: "an audio file", accept: "audio/*,.mp3,.wav,.m4a,.flac,.ogg,.aac", inputExt: "mp3", outputExt: "mp3", outputMime: "audio/mpeg",
    options: [
      { id: "gain", label: "Volume (dB)", type: "range", min: -12, max: 12, step: 1, unit: "dB", default: "3" },
    ],
    command: (i, o, opt) => ["-i", i, "-af", `volume=${opt.gain || "0"}dB`, "-c:a", "libmp3lame", "-b:a", "192k", o],
  },
  "change-speed": {
    label: "an audio file", accept: "audio/*,.mp3,.wav,.m4a,.flac,.ogg,.aac", inputExt: "mp3", outputExt: "mp3", outputMime: "audio/mpeg",
    options: [
      { id: "speed", label: "Speed", values: [
        { id: "0.5", label: "0.5× (slow)" }, { id: "0.75", label: "0.75×" },
        { id: "1.25", label: "1.25×" }, { id: "1.5", label: "1.5×" }, { id: "2.0", label: "2× (fast)" },
      ], default: "1.5" },
    ],
    command: (i, o, opt) => ["-i", i, "-filter:a", `atempo=${opt.speed || "1.5"}`, "-c:a", "libmp3lame", "-b:a", "192k", o],
  },

  // ── Video: trim / resize / rotate ───────────────────────────────────────
  "trim-video": {
    label: "a video", accept: "video/*,.mp4,.mov,.mkv,.webm", inputExt: "mp4", outputExt: "mp4", outputMime: "video/mp4",
    options: [
      { id: "start", label: "Start (seconds)", type: "number", min: 0, max: 36000, step: 0.1, default: "0" },
      { id: "end", label: "End (seconds)", type: "number", min: 0.1, max: 36000, step: 0.1, default: "10" },
    ],
    command: (i, o, opt) => ["-i", i, "-ss", opt.start || "0", "-to", opt.end || "10", "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-c:a", "aac", "-b:a", "128k", o],
  },
  "resize-video": {
    label: "a video", accept: "video/*,.mp4,.mov,.mkv,.webm", inputExt: "mp4", outputExt: "mp4", outputMime: "video/mp4",
    options: [
      { id: "w", label: "Width", type: "number", min: 32, max: 7680, step: 2, unit: "px", default: "1280" },
      { id: "h", label: "Height", type: "number", min: 32, max: 4320, step: 2, unit: "px", default: "720" },
    ],
    command: (i, o, opt) => ["-i", i, "-vf", `scale=${opt.w || "1280"}:${opt.h || "720"}`, "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-c:a", "copy", o],
  },
  "rotate-video": {
    label: "a video", accept: "video/*,.mp4,.mov,.mkv,.webm", inputExt: "mp4", outputExt: "mp4", outputMime: "video/mp4",
    options: [
      { id: "rot", label: "Rotation", values: [
        { id: "transpose=1", label: "90° clockwise" },
        { id: "transpose=2", label: "90° counter-clockwise" },
        { id: "transpose=1,transpose=1", label: "180°" },
      ], default: "transpose=1" },
    ],
    command: (i, o, opt) => ["-i", i, "-vf", opt.rot || "transpose=1", "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-c:a", "copy", o],
  },
};
