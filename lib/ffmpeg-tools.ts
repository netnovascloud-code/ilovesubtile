// Per-slug FFmpeg.wasm command builders for audio/video tools. All run
// in-browser via WebAssembly — no server, no upload, no quota.

export type FfmpegOption = {
  id: string;
  label: string;
  values: { id: string; label: string }[];
  default: string;
};

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
    options: [{ id: "fps", label: "Frame rate", values: [{ id: "10", label: "10 fps" }, { id: "15", label: "15 fps" }, { id: "24", label: "24 fps" }], default: "12" }, { id: "w", label: "Width", values: [{ id: "320", label: "320 px" }, { id: "480", label: "480 px" }, { id: "640", label: "640 px" }], default: "480" }],
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
};
