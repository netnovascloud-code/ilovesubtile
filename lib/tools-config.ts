import type { LucideIcon } from "lucide-react";
import {
  Captions,
  Clapperboard,
  ArrowRightLeft,
  ArrowLeftRight,
  Languages,
  Clock,
  FileDown,
  SquarePen,
  Smartphone,
  Eraser,
  FileText,
  ListOrdered,
  Globe,
  Type,
  RefreshCw,
  Terminal,
  Braces,
  FileJson,
  FileCode,
  FileSpreadsheet,
  Binary,
  Link2,
  KeyRound,
  Hash,
  Code,
  Minimize2,
  Regex,
} from "lucide-react";

export type ToolCategory =
  | "documents"
  | "audio"
  | "video"
  | "images"
  | "subtitles"
  | "developer"
  | "text-ai";

export type ToolFaq = { q: string; a: string };

export type ToolDefinition = {
  /** URL slug — also the i18n key */
  slug: string;
  /** Phase 1 = MVP, 2 = growth, 3 = premium IA / dev */
  phase: 1 | 2 | 3;
  /** Implementation strategy */
  kind: "client" | "edge" | "ffmpeg" | "ai";
  category: ToolCategory;
  icon: LucideIcon;
  /** Accent class for the icon tile in the grid */
  tone: "blue" | "indigo" | "green" | "amber" | "rose" | "violet" | "teal" | "slate";
  name: string;
  short: string;
  /** SEO H1 — long-tail */
  h1: string;
  /** SEO meta title (<= 60 chars ideally) */
  metaTitle: string;
  /** SEO meta description (<= 160 chars ideally) */
  metaDescription: string;
  /** Primary keyword for this page */
  primaryKeyword: string;
  /** Accepted file extensions for upload (no leading dot) */
  accept: string[];
  /** Max MB for the free tier on this tool */
  freeMaxMb: number;
  /** Output file type to advertise */
  outputType: string;
  /** Five FAQs for FAQPage schema */
  faqs: ToolFaq[];
  /** "How it works" steps (max 3 ideally) */
  steps: { title: string; body: string }[];
  /** Pro-only? (always usable, but feature/limit upgrades for Pro) */
  proOnly?: boolean;
};

export type CategoryDef = {
  id: ToolCategory;
  /** English label (localised separately for the UI) */
  label: string;
  /** lucide-react icon name (resolved client-side via the icon map) */
  iconName: string;
  tone: ToolDefinition["tone"];
  blurb: string;
};

export const CATEGORIES: CategoryDef[] = [
  { id: "documents", label: "Documents", iconName: "FileText", tone: "blue", blurb: "PDF, Word, Excel, PowerPoint, EPUB & more." },
  { id: "audio", label: "Audio", iconName: "Music", tone: "violet", blurb: "Convert, compress, cut and transcribe audio." },
  { id: "video", label: "Video", iconName: "Video", tone: "rose", blurb: "Convert, compress, trim and edit video." },
  { id: "images", label: "Images", iconName: "Image", tone: "amber", blurb: "Convert, resize, compress and edit images." },
  { id: "subtitles", label: "Subtitles", iconName: "Captions", tone: "indigo", blurb: "Generate, translate, sync and convert subtitles." },
  { id: "developer", label: "Code & Dev", iconName: "Code", tone: "teal", blurb: "Format, convert and encode for developers." },
  { id: "text-ai", label: "Text & AI", iconName: "Sparkles", tone: "green", blurb: "Translate, rephrase, summarise and fix text." },
];

export const CATEGORY_BY_ID: Record<ToolCategory, CategoryDef> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<ToolCategory, CategoryDef>;

const baseFaqs = (name: string, ext: string): ToolFaq[] => [
  {
    q: `Is ${name} free to use?`,
    a: `Yes. Wyrlo is free for everyone. Free users can run ${name} a few times per day with a file size limit. Pro users (€12/month) get unlimited runs, larger files, and no ads.`,
  },
  {
    q: `Do you store my files?`,
    a: `Files are processed in a temporary location and deleted automatically after a short retention window (typically 1 hour). We never use your content to train models.`,
  },
  {
    q: `Which formats does ${name} accept?`,
    a: `${name} accepts ${ext}. If you need another format, use our converters first and then come back to this tool.`,
  },
  {
    q: `Is there a watermark?`,
    a: `Text-only outputs (SRT, VTT, TXT) are never watermarked. Free users get a small watermark when burning subtitles into videos. Pro removes it.`,
  },
  {
    q: `Do I need to sign up?`,
    a: `No account is required for casual use. Signing up gives you a few extra runs per day and a history of your last files. Pro unlocks unlimited usage.`,
  },
];

export const TOOLS: ToolDefinition[] = [
  // ── Phase 1 — MVP ────────────────────────────────────────────────────────
  {
    slug: "subtitle-generator",
    phase: 1,
    kind: "ai",
    category: "subtitles",
    icon: Captions,
    tone: "blue",
    name: "Subtitle Generator",
    short: "Generate subtitles from any video or audio with AI.",
    h1: "Generate Subtitles from Video & Audio — Free AI Subtitle Generator",
    metaTitle: "Free AI Subtitle Generator — Auto Captions from Video | Wyrlo",
    metaDescription:
      "Generate accurate subtitles from any video or audio file with AI. Free, fast, supports 30+ languages. Download as SRT or VTT.",
    primaryKeyword: "generate subtitles online",
    accept: ["mp4", "mov", "webm", "mkv", "avi", "mp3", "wav", "m4a", "flac", "ogg"],
    freeMaxMb: 25,
    outputType: "SRT",
    steps: [
      { title: "Upload your media", body: "Drop a video or audio file. We support MP4, MOV, MP3, WAV and more." },
      { title: "AI generates captions", body: "AI transcribes your audio with timestamps in 30+ languages." },
      { title: "Download the SRT", body: "Get a clean .srt file ready for YouTube, Premiere, or any player." },
    ],
    faqs: baseFaqs("the subtitle generator", "MP4, MOV, WebM, MKV, AVI, MP3, WAV, M4A, FLAC, OGG"),
  },
  {
    slug: "add-subtitles-to-video",
    phase: 1,
    kind: "ffmpeg",
    category: "subtitles",
    icon: Clapperboard,
    tone: "indigo",
    name: "Add Subtitles to Video",
    short: "Burn subtitles permanently into your video file.",
    h1: "Add Subtitles to Video Online — Burn SRT into MP4 for Free",
    metaTitle: "Add Subtitles to Video Online Free — Burn SRT into MP4 | Wyrlo",
    metaDescription:
      "Burn subtitles permanently into any video. Upload your MP4 and SRT, choose a style, and download a captioned MP4. No watermark with Pro.",
    primaryKeyword: "add subtitles to video online free",
    accept: ["mp4", "mov", "webm", "mkv", "avi", "srt", "vtt", "ass"],
    freeMaxMb: 200,
    outputType: "MP4",
    steps: [
      { title: "Upload video + subtitles", body: "Pick your MP4/MOV and an SRT or VTT file." },
      { title: "Choose a style", body: "Font, size, color, position — or keep the clean default." },
      { title: "Download captioned MP4", body: "We render with FFmpeg and send you back the finished video." },
    ],
    faqs: baseFaqs("Add Subtitles to Video", "MP4, MOV, WebM, MKV, AVI for video; SRT, VTT, ASS for subtitles"),
  },
  {
    slug: "srt-to-vtt",
    phase: 1,
    kind: "client",
    category: "subtitles",
    icon: ArrowRightLeft,
    tone: "teal",
    name: "SRT to VTT",
    short: "Convert SubRip (.srt) to WebVTT (.vtt) instantly.",
    h1: "SRT to VTT Converter — Convert SubRip Subtitles to WebVTT",
    metaTitle: "SRT to VTT Converter Online — Free & Instant | Wyrlo",
    metaDescription:
      "Convert SRT subtitle files to WebVTT instantly in your browser. Free, unlimited, no upload to a server. Works offline once loaded.",
    primaryKeyword: "srt to vtt converter",
    accept: ["srt"],
    freeMaxMb: 25,
    outputType: "VTT",
    steps: [
      { title: "Drop your .srt file", body: "Or paste subtitle text directly into the editor." },
      { title: "Auto-convert in-browser", body: "Conversion runs entirely on your device — your file never leaves it." },
      { title: "Download .vtt", body: "Drop it into <video> or any HTML5 player." },
    ],
    faqs: baseFaqs("SRT to VTT", "SRT files"),
  },
  {
    slug: "vtt-to-srt",
    phase: 1,
    kind: "client",
    category: "subtitles",
    icon: ArrowLeftRight,
    tone: "teal",
    name: "VTT to SRT",
    short: "Convert WebVTT (.vtt) back to SubRip (.srt).",
    h1: "VTT to SRT Converter — Convert WebVTT to SubRip Online",
    metaTitle: "VTT to SRT Converter Online — Free & Instant | Wyrlo",
    metaDescription:
      "Convert WebVTT subtitle files to SRT instantly in your browser. Free, unlimited, runs entirely on your device.",
    primaryKeyword: "vtt to srt converter",
    accept: ["vtt"],
    freeMaxMb: 25,
    outputType: "SRT",
    steps: [
      { title: "Drop your .vtt file", body: "Or paste WebVTT cues straight into the editor." },
      { title: "Instant conversion", body: "Headers, styling and cue identifiers are cleaned up automatically." },
      { title: "Download .srt", body: "Ready for Premiere, DaVinci, YouTube — anywhere." },
    ],
    faqs: baseFaqs("VTT to SRT", "VTT files"),
  },
  {
    slug: "translate-subtitles",
    phase: 1,
    kind: "edge",
    category: "subtitles",
    icon: Languages,
    tone: "violet",
    name: "Translate Subtitles",
    short: "Translate SRT or VTT into 30+ languages.",
    h1: "Translate Subtitles Online — SRT & VTT Translator (30+ Languages)",
    metaTitle: "Translate Subtitles Online Free — SRT Translator | Wyrlo",
    metaDescription:
      "Translate SRT or VTT subtitles into 30+ languages with AI. Timestamps stay perfectly intact, cue boundaries preserved.",
    primaryKeyword: "translate srt file online",
    accept: ["srt", "vtt"],
    freeMaxMb: 25,
    outputType: "SRT",
    steps: [
      { title: "Upload SRT or VTT", body: "Source language is detected automatically." },
      { title: "Pick a target language", body: "From English and Spanish to Japanese and Arabic." },
      { title: "Download translated file", body: "Same timing, translated text. Perfect for re-publishing globally." },
    ],
    faqs: baseFaqs("the subtitle translator", "SRT and VTT files"),
  },
  {
    slug: "sync-subtitles",
    phase: 1,
    kind: "client",
    category: "subtitles",
    icon: Clock,
    tone: "amber",
    name: "Sync Subtitles",
    short: "Shift every cue forward or backward in milliseconds.",
    h1: "Sync Subtitles Online — Fix Subtitle Timing for SRT & VTT",
    metaTitle: "Sync Subtitles Online — Fix Subtitle Timing Free | Wyrlo",
    metaDescription:
      "Offset every subtitle line by an exact number of seconds or milliseconds. Fix out-of-sync SRT and VTT files in seconds.",
    primaryKeyword: "sync subtitles online",
    accept: ["srt", "vtt"],
    freeMaxMb: 25,
    outputType: "SRT",
    steps: [
      { title: "Upload the desynced file", body: "We support SRT and VTT." },
      { title: "Enter the offset", body: "Positive to delay, negative to advance. Millisecond precision." },
      { title: "Download the fixed file", body: "Every cue shifted exactly — start and end timestamps preserved." },
    ],
    faqs: baseFaqs("Sync Subtitles", "SRT and VTT files"),
  },

  // ── Phase 2 — growth ────────────────────────────────────────────────────
  {
    slug: "extract-subtitles",
    phase: 2,
    kind: "ffmpeg",
    category: "subtitles",
    icon: FileDown,
    tone: "rose",
    name: "Extract Subtitles",
    short: "Pull embedded subtitle tracks out of MKV or MP4.",
    h1: "Extract Subtitles from Video — MKV & MP4 Subtitle Extractor",
    metaTitle: "Extract Subtitles from Video Online — MKV & MP4 | Wyrlo",
    metaDescription:
      "Pull every embedded subtitle track from MKV, MP4 and MOV files. Download each track as a separate SRT.",
    primaryKeyword: "extract subtitles from video online",
    accept: ["mkv", "mp4", "mov", "webm"],
    freeMaxMb: 200,
    outputType: "SRT",
    steps: [
      { title: "Upload the video", body: "MKV, MP4, MOV, WebM — anything with embedded tracks." },
      { title: "Pick the tracks", body: "We list every subtitle track with its language and codec." },
      { title: "Download SRTs", body: "Each track exported as a clean .srt file." },
    ],
    faqs: baseFaqs("the subtitle extractor", "MKV, MP4, MOV and WebM"),
  },
  {
    slug: "subtitle-editor",
    phase: 2,
    kind: "client",
    category: "subtitles",
    icon: SquarePen,
    tone: "blue",
    name: "Subtitle Editor",
    short: "Edit text and timestamps with a live video preview.",
    h1: "Online Subtitle Editor — Edit SRT & VTT in Your Browser",
    metaTitle: "Online Subtitle Editor — Edit SRT & VTT Free | Wyrlo",
    metaDescription:
      "Edit subtitle text and timestamps directly in your browser with a live video preview. Free, no sign-up required.",
    primaryKeyword: "online subtitle editor",
    accept: ["srt", "vtt", "mp4", "mov", "webm"],
    freeMaxMb: 200,
    outputType: "SRT",
    steps: [
      { title: "Load file + video", body: "Drop your subtitles and (optionally) the matching video." },
      { title: "Edit cues live", body: "Click a line, fix the text or timing, see it on the preview." },
      { title: "Export", body: "Download the corrected SRT or VTT when you're done." },
    ],
    faqs: baseFaqs("the subtitle editor", "SRT, VTT and common video formats"),
  },
  {
    slug: "tiktok-subtitles",
    phase: 2,
    kind: "ai",
    category: "subtitles",
    icon: Smartphone,
    tone: "rose",
    name: "TikTok-Style Subtitles",
    short: "Bold word-by-word captions for short-form video.",
    h1: "TikTok-Style Subtitles — Auto-Caption Reels, Shorts & TikTok",
    metaTitle: "TikTok Subtitle Generator — Reels & Shorts Captions | Wyrlo",
    metaDescription:
      "Generate viral word-by-word captions for TikTok, Reels and YouTube Shorts. Big text, perfect timing, ready to burn in.",
    primaryKeyword: "tiktok subtitle generator",
    accept: ["mp4", "mov", "webm", "mp3", "m4a"],
    freeMaxMb: 100,
    outputType: "MP4",
    steps: [
      { title: "Upload your short-form video", body: "Vertical or horizontal — any aspect ratio." },
      { title: "Pick a caption style", body: "Karaoke, pop-up, classic — preview before rendering." },
      { title: "Download the captioned MP4", body: "Already styled. Drop it into your scheduler and post." },
    ],
    faqs: baseFaqs("TikTok-Style Subtitles", "MP4, MOV, WebM and audio files"),
  },
  {
    slug: "clean-subtitles",
    phase: 2,
    kind: "client",
    category: "subtitles",
    icon: Eraser,
    tone: "slate",
    name: "Clean Subtitles",
    short: "Remove duplicates, fix punctuation, strip SDH tags.",
    h1: "Clean Subtitles Online — Remove Duplicates, SDH & Fix Punctuation",
    metaTitle: "Clean Subtitle File Online — Fix SRT Free | Wyrlo",
    metaDescription:
      "Strip SDH descriptions, kill duplicate lines, fix capitalisation and punctuation in any SRT or VTT file.",
    primaryKeyword: "clean srt subtitles",
    accept: ["srt", "vtt"],
    freeMaxMb: 25,
    outputType: "SRT",
    steps: [
      { title: "Upload SRT or VTT", body: "We run a deterministic cleanup pass — nothing else is changed." },
      { title: "Pick what to clean", body: "[Music], (laughter), uppercase shouting, double spaces — toggle each." },
      { title: "Download the cleaned file", body: "Smaller, tidier, and ready for publishing." },
    ],
    faqs: baseFaqs("Clean Subtitles", "SRT and VTT files"),
  },
  {
    slug: "srt-to-text",
    phase: 2,
    kind: "client",
    category: "subtitles",
    icon: FileText,
    tone: "slate",
    name: "SRT to Text",
    short: "Strip every timestamp and get the plain transcript.",
    h1: "SRT to Text — Convert SubRip Subtitles to Plain Transcript",
    metaTitle: "SRT to Text Converter Online — Free Transcript | Wyrlo",
    metaDescription:
      "Convert any SRT file into a clean plain-text transcript. Timestamps and indices removed, paragraphs preserved.",
    primaryKeyword: "srt to text converter",
    accept: ["srt", "vtt"],
    freeMaxMb: 25,
    outputType: "TXT",
    steps: [
      { title: "Drop your subtitle file", body: "SRT or VTT — both work." },
      { title: "Pick a layout", body: "One line per cue, merged paragraphs, or with speaker labels." },
      { title: "Download .txt", body: "Use it as a clean transcript, summary input, or article draft." },
    ],
    faqs: baseFaqs("SRT to Text", "SRT and VTT files"),
  },
  {
    slug: "youtube-chapters",
    phase: 2,
    kind: "ai",
    category: "subtitles",
    icon: ListOrdered,
    tone: "amber",
    name: "YouTube Chapter Generator",
    short: "Generate YouTube chapters from a transcript.",
    h1: "YouTube Chapter Generator — From SRT or Transcript",
    metaTitle: "YouTube Chapter Generator from SRT — Free AI | Wyrlo",
    metaDescription:
      "Paste your transcript or upload an SRT and get YouTube chapters with timestamps you can copy-paste straight into your video description.",
    primaryKeyword: "youtube chapter generator from srt",
    accept: ["srt", "vtt", "txt"],
    freeMaxMb: 10,
    outputType: "Text",
    steps: [
      { title: "Upload transcript", body: "SRT, VTT or plain text." },
      { title: "AI finds the chapter breaks", body: "We pick semantically meaningful sections, not arbitrary intervals." },
      { title: "Copy & paste", body: "Drop the formatted chapters into your YouTube description." },
    ],
    faqs: baseFaqs("the YouTube chapter generator", "SRT, VTT and plain-text transcripts"),
  },

  // ── Phase 3 — premium IA / dev ──────────────────────────────────────────
  {
    slug: "batch-translate",
    phase: 3,
    kind: "edge",
    category: "subtitles",
    icon: Globe,
    tone: "violet",
    name: "Batch Translate",
    short: "Translate one SRT into 10+ languages in a single pass.",
    h1: "Batch Subtitle Translation — One SRT, Many Languages",
    metaTitle: "Batch Subtitle Translation — 10+ Languages at Once | Wyrlo",
    metaDescription:
      "Pro tool: translate a single SRT into up to 30 languages in one job. Perfect for global launches and creator localisation.",
    primaryKeyword: "batch translate subtitles",
    accept: ["srt", "vtt"],
    freeMaxMb: 50,
    outputType: "ZIP",
    proOnly: true,
    steps: [
      { title: "Upload your master SRT", body: "Choose source language or let us detect it." },
      { title: "Select target languages", body: "Tick up to 30. We run them in parallel." },
      { title: "Download a ZIP", body: "One translated SRT per language, ready to attach to each release." },
    ],
    faqs: baseFaqs("Batch Translate", "SRT and VTT files"),
  },
  {
    slug: "style-subtitles",
    phase: 3,
    kind: "ffmpeg",
    category: "subtitles",
    icon: Type,
    tone: "rose",
    name: "Style Subtitles (ASS)",
    short: "Convert to ASS and style fonts, colors and positions.",
    h1: "Style Subtitles — Convert SRT to ASS with Custom Styles",
    metaTitle: "Subtitle Styler — Convert SRT to Styled ASS | Wyrlo",
    metaDescription:
      "Turn any SRT into a styled ASS file. Pick font, size, color, outline and position — perfect for cinematic captions.",
    primaryKeyword: "style subtitles ass",
    accept: ["srt", "vtt"],
    freeMaxMb: 25,
    outputType: "ASS",
    steps: [
      { title: "Upload your SRT or VTT", body: "Or paste cues in directly." },
      { title: "Customise styles", body: "Font, size, color, border, drop shadow, alignment, vertical position." },
      { title: "Download .ass", body: "Drop it into VLC, Aegisub or any modern player." },
    ],
    faqs: baseFaqs("Style Subtitles", "SRT and VTT files"),
  },
  {
    slug: "auto-sync",
    phase: 3,
    kind: "ai",
    category: "subtitles",
    icon: RefreshCw,
    tone: "teal",
    name: "Auto-Sync (AI)",
    short: "Re-align mistimed subtitles automatically from audio.",
    h1: "Auto-Sync Subtitles — AI Audio-to-Subtitle Alignment",
    metaTitle: "Auto-Sync Subtitles to Video — AI Aligner | Wyrlo",
    metaDescription:
      "Drop in a video and a mistimed SRT — we re-align every cue to the actual audio using AI forced alignment.",
    primaryKeyword: "auto sync subtitles ai",
    accept: ["srt", "vtt", "mp4", "mov", "webm", "mp3", "wav"],
    freeMaxMb: 200,
    outputType: "SRT",
    steps: [
      { title: "Upload video + subtitles", body: "We need both — the audio is the reference." },
      { title: "AI realigns each cue", body: "Forced alignment matches every line to where it's actually spoken." },
      { title: "Download a synced SRT", body: "Cues now sit exactly on the spoken words." },
    ],
    faqs: baseFaqs("Auto-Sync", "video and audio files paired with SRT or VTT"),
  },
  {
    slug: "api",
    phase: 3,
    kind: "edge",
    category: "subtitles",
    icon: Terminal,
    tone: "slate",
    name: "Public API",
    short: "REST endpoints to automate everything above.",
    h1: "Wyrlo API — REST Endpoints for Subtitles",
    metaTitle: "Subtitle REST API — Transcribe, Translate, Burn-in | Wyrlo",
    metaDescription:
      "Programmatic access to the same engine that powers Wyrlo: generate, translate, sync and burn in. Pay-as-you-go.",
    primaryKeyword: "subtitle api",
    accept: [],
    freeMaxMb: 0,
    outputType: "JSON",
    steps: [
      { title: "Get an API key", body: "Available on the Business plan or pay-as-you-go." },
      { title: "POST your job", body: "REST endpoints for every tool. Webhooks for long-running jobs." },
      { title: "Receive your file", body: "JSON response with a signed download URL." },
    ],
    faqs: baseFaqs("the API", "the same formats as the web tools"),
  },
];

// ── Wyrlo — Developer & Text (pure client-side, free & unlimited) ──────────
const codeFaqs = (name: string): ToolFaq[] => [
  { q: `Is ${name} free?`, a: `Yes — completely free and unlimited, with no account required. It runs entirely in your browser, so there are no usage limits.` },
  { q: `Are my files or data uploaded?`, a: `No. ${name} runs 100% locally in your browser. Your data never leaves your device and is never sent to a server.` },
  { q: `Does it work offline?`, a: `Once the page has loaded, the conversion runs on-device, so it keeps working even with a flaky connection.` },
  { q: `Is there a file size limit?`, a: `There's no hard limit — you're only bound by your device's memory. Very large inputs may be slower to process.` },
  { q: `Do I need to install anything?`, a: `No. ${name} is a web tool — just open the page and start. Nothing to download or install.` },
];

TOOLS.push(
  {
    slug: "format-json",
    phase: 3,
    kind: "client",
    category: "developer",
    icon: Braces,
    tone: "teal",
    name: "JSON Formatter",
    short: "Beautify, validate or minify JSON instantly.",
    h1: "JSON Formatter & Validator — Beautify or Minify JSON Online",
    metaTitle: "JSON Formatter Online — Beautify & Validate JSON Free | Wyrlo",
    metaDescription: "Format, validate and minify JSON instantly in your browser. Free, unlimited, private — your data never leaves your device.",
    primaryKeyword: "json formatter",
    accept: [],
    freeMaxMb: 0,
    outputType: "JSON",
    steps: [
      { title: "Paste your JSON", body: "Drop in any JSON — valid or not." },
      { title: "Beautify or minify", body: "We pretty-print with 2-space indents, or strip all whitespace." },
      { title: "Copy or download", body: "Grab the clean result as a .json file or to your clipboard." },
    ],
    faqs: codeFaqs("the JSON formatter"),
  },
  {
    slug: "json-to-csv",
    phase: 3,
    kind: "client",
    category: "developer",
    icon: FileSpreadsheet,
    tone: "teal",
    name: "JSON to CSV",
    short: "Convert a JSON array of objects into CSV.",
    h1: "JSON to CSV Converter — Turn JSON Arrays into Spreadsheets",
    metaTitle: "JSON to CSV Converter Online — Free & Instant | Wyrlo",
    metaDescription: "Convert a JSON array of objects to CSV instantly in your browser. Columns are detected automatically. Free, unlimited, private.",
    primaryKeyword: "json to csv",
    accept: [],
    freeMaxMb: 0,
    outputType: "CSV",
    steps: [
      { title: "Paste a JSON array", body: "An array of objects, like API output." },
      { title: "Auto-detect columns", body: "We collect every key across rows into CSV headers." },
      { title: "Download the CSV", body: "Open it straight in Excel, Sheets or Numbers." },
    ],
    faqs: codeFaqs("the JSON to CSV converter"),
  },
  {
    slug: "csv-to-json",
    phase: 3,
    kind: "client",
    category: "developer",
    icon: FileJson,
    tone: "teal",
    name: "CSV to JSON",
    short: "Convert CSV rows into a JSON array of objects.",
    h1: "CSV to JSON Converter — Turn Spreadsheets into JSON",
    metaTitle: "CSV to JSON Converter Online — Free & Instant | Wyrlo",
    metaDescription: "Convert CSV to a JSON array of objects instantly in your browser. Handles quoted fields and commas. Free, unlimited, private.",
    primaryKeyword: "csv to json",
    accept: [],
    freeMaxMb: 0,
    outputType: "JSON",
    steps: [
      { title: "Paste your CSV", body: "The first row is treated as the header." },
      { title: "We parse it safely", body: "Quoted fields, escaped quotes and commas are handled." },
      { title: "Copy the JSON", body: "A clean array of objects, ready for your code." },
    ],
    faqs: codeFaqs("the CSV to JSON converter"),
  },
  {
    slug: "json-to-xml",
    phase: 3,
    kind: "client",
    category: "developer",
    icon: FileCode,
    tone: "teal",
    name: "JSON to XML",
    short: "Convert JSON into well-formed XML.",
    h1: "JSON to XML Converter — Convert JSON to XML Online",
    metaTitle: "JSON to XML Converter Online — Free & Instant | Wyrlo",
    metaDescription: "Convert JSON to well-formed XML instantly in your browser. Free, unlimited, private — nothing is uploaded.",
    primaryKeyword: "json to xml",
    accept: [],
    freeMaxMb: 0,
    outputType: "XML",
    steps: [
      { title: "Paste your JSON", body: "Objects and arrays both supported." },
      { title: "Convert to XML", body: "Keys become tags; arrays become repeated <item> elements." },
      { title: "Download the XML", body: "Well-formed and ready to use." },
    ],
    faqs: codeFaqs("the JSON to XML converter"),
  },
  {
    slug: "base64",
    phase: 3,
    kind: "client",
    category: "developer",
    icon: Binary,
    tone: "teal",
    name: "Base64 Encode / Decode",
    short: "Encode text to Base64 or decode it back.",
    h1: "Base64 Encoder & Decoder — Encode or Decode Online",
    metaTitle: "Base64 Encode / Decode Online — Free & Instant | Wyrlo",
    metaDescription: "Encode text to Base64 or decode Base64 back to text instantly. UTF-8 safe, runs in your browser. Free, unlimited, private.",
    primaryKeyword: "base64 encode decode",
    accept: [],
    freeMaxMb: 0,
    outputType: "Text",
    steps: [
      { title: "Pick a mode", body: "Encode plain text, or decode a Base64 string." },
      { title: "Type or paste", body: "UTF-8 is handled correctly, including emoji." },
      { title: "Copy the result", body: "Instant, on-device, no upload." },
    ],
    faqs: codeFaqs("the Base64 tool"),
  },
  {
    slug: "url-encode",
    phase: 3,
    kind: "client",
    category: "developer",
    icon: Link2,
    tone: "teal",
    name: "URL Encode / Decode",
    short: "Percent-encode or decode URLs and query strings.",
    h1: "URL Encoder & Decoder — Percent-Encode URLs Online",
    metaTitle: "URL Encode / Decode Online — Free & Instant | Wyrlo",
    metaDescription: "Percent-encode or decode URLs and query parameters instantly in your browser. Free, unlimited, private.",
    primaryKeyword: "url encode decode",
    accept: [],
    freeMaxMb: 0,
    outputType: "Text",
    steps: [
      { title: "Choose encode or decode", body: "Toggle between the two modes." },
      { title: "Paste your URL or text", body: "Spaces, accents and symbols handled correctly." },
      { title: "Copy the result", body: "Ready to drop into a link or API call." },
    ],
    faqs: codeFaqs("the URL encoder"),
  },
  {
    slug: "jwt-decoder",
    phase: 3,
    kind: "client",
    category: "developer",
    icon: KeyRound,
    tone: "teal",
    name: "JWT Decoder",
    short: "Decode a JWT's header and payload instantly.",
    h1: "JWT Decoder — Decode JSON Web Tokens Online",
    metaTitle: "JWT Decoder Online — Decode JWT Header & Payload Free | Wyrlo",
    metaDescription: "Decode the header and payload of any JSON Web Token instantly in your browser. Private — your token is never sent anywhere.",
    primaryKeyword: "jwt decoder",
    accept: [],
    freeMaxMb: 0,
    outputType: "JSON",
    steps: [
      { title: "Paste your JWT", body: "The full token: header.payload.signature." },
      { title: "Decode locally", body: "We Base64URL-decode the header and payload on-device." },
      { title: "Inspect the claims", body: "Read the JSON — nothing is sent to a server." },
    ],
    faqs: codeFaqs("the JWT decoder"),
  },
  {
    slug: "word-counter",
    phase: 3,
    kind: "client",
    category: "text-ai",
    icon: Hash,
    tone: "green",
    name: "Word & Character Counter",
    short: "Count words, characters, sentences and reading time.",
    h1: "Word Counter — Count Words, Characters & Reading Time",
    metaTitle: "Word & Character Counter Online — Free | Wyrlo",
    metaDescription: "Count words, characters, sentences, paragraphs and estimated reading time as you type. Free, unlimited, private.",
    primaryKeyword: "word counter",
    accept: [],
    freeMaxMb: 0,
    outputType: "Text",
    steps: [
      { title: "Paste your text", body: "Anything from a tweet to a thesis." },
      { title: "See live stats", body: "Words, characters, sentences, paragraphs and reading time." },
      { title: "Use anywhere", body: "Perfect for essays, SEO meta, and social posts." },
    ],
    faqs: codeFaqs("the word counter"),
  },
);

TOOLS.push(
  {
    slug: "xml-to-json",
    phase: 3, kind: "client", category: "developer", icon: FileCode, tone: "teal",
    name: "XML to JSON",
    short: "Convert XML into clean JSON.",
    h1: "XML to JSON Converter — Convert XML to JSON Online",
    metaTitle: "XML to JSON Converter Online — Free & Instant | Wyrlo",
    metaDescription: "Convert XML to JSON instantly in your browser. Repeated tags become arrays. Free, unlimited, private — nothing is uploaded.",
    primaryKeyword: "xml to json",
    accept: [], freeMaxMb: 0, outputType: "JSON",
    steps: [
      { title: "Paste your XML", body: "Any well-formed XML document." },
      { title: "Convert locally", body: "Tags become keys; repeated tags become arrays." },
      { title: "Copy the JSON", body: "Ready to use in your code." },
    ],
    faqs: codeFaqs("the XML to JSON converter"),
  },
  {
    slug: "json-to-yaml",
    phase: 3, kind: "client", category: "developer", icon: Code, tone: "teal",
    name: "JSON to YAML",
    short: "Convert JSON into readable YAML.",
    h1: "JSON to YAML Converter — Convert JSON to YAML Online",
    metaTitle: "JSON to YAML Converter Online — Free & Instant | Wyrlo",
    metaDescription: "Convert JSON to YAML instantly in your browser. Great for config files and CI pipelines. Free, unlimited, private.",
    primaryKeyword: "json to yaml",
    accept: [], freeMaxMb: 0, outputType: "YAML",
    steps: [
      { title: "Paste your JSON", body: "Objects, arrays and scalars supported." },
      { title: "Convert to YAML", body: "Indentation-based, human-readable output." },
      { title: "Download the YAML", body: "Drop it straight into your config." },
    ],
    faqs: codeFaqs("the JSON to YAML converter"),
  },
  {
    slug: "yaml-to-json",
    phase: 3, kind: "client", category: "developer", icon: Braces, tone: "teal",
    name: "YAML to JSON",
    short: "Convert YAML config into JSON.",
    h1: "YAML to JSON Converter — Convert YAML to JSON Online",
    metaTitle: "YAML to JSON Converter Online — Free & Instant | Wyrlo",
    metaDescription: "Convert YAML to JSON instantly in your browser. Free, unlimited, private — your config never leaves your device.",
    primaryKeyword: "yaml to json",
    accept: [], freeMaxMb: 0, outputType: "JSON",
    steps: [
      { title: "Paste your YAML", body: "Maps, sequences and nested blocks." },
      { title: "Convert to JSON", body: "We parse indentation and scalars on-device." },
      { title: "Copy the JSON", body: "Ready for any tool that speaks JSON." },
    ],
    faqs: codeFaqs("the YAML to JSON converter"),
  },
  {
    slug: "markdown-to-html",
    phase: 3, kind: "client", category: "developer", icon: FileText, tone: "teal",
    name: "Markdown to HTML",
    short: "Render Markdown into clean HTML.",
    h1: "Markdown to HTML Converter — Render Markdown Online",
    metaTitle: "Markdown to HTML Converter Online — Free & Instant | Wyrlo",
    metaDescription: "Convert Markdown to HTML instantly in your browser. Headings, lists, links, code blocks and more. Free, unlimited, private.",
    primaryKeyword: "markdown to html",
    accept: [], freeMaxMb: 0, outputType: "HTML",
    steps: [
      { title: "Write or paste Markdown", body: "Headings, bold, italics, lists, links, code fences." },
      { title: "Convert to HTML", body: "Rendered instantly as you type." },
      { title: "Copy or download", body: "Grab the HTML for your site or CMS." },
    ],
    faqs: codeFaqs("the Markdown to HTML converter"),
  },
  {
    slug: "html-to-markdown",
    phase: 3, kind: "client", category: "developer", icon: Type, tone: "teal",
    name: "HTML to Markdown",
    short: "Convert HTML back into Markdown.",
    h1: "HTML to Markdown Converter — Convert HTML to MD Online",
    metaTitle: "HTML to Markdown Converter Online — Free & Instant | Wyrlo",
    metaDescription: "Convert HTML to Markdown instantly in your browser. Headings, links, lists and emphasis preserved. Free, unlimited, private.",
    primaryKeyword: "html to markdown",
    accept: [], freeMaxMb: 0, outputType: "Markdown",
    steps: [
      { title: "Paste your HTML", body: "A snippet or a full document body." },
      { title: "Convert to Markdown", body: "Common tags map to clean Markdown." },
      { title: "Copy the Markdown", body: "Ready for your README or docs." },
    ],
    faqs: codeFaqs("the HTML to Markdown converter"),
  },
  {
    slug: "minify-css",
    phase: 3, kind: "client", category: "developer", icon: Minimize2, tone: "teal",
    name: "CSS Minifier",
    short: "Strip whitespace and comments from CSS.",
    h1: "CSS Minifier — Minify & Compress CSS Online",
    metaTitle: "CSS Minifier Online — Compress CSS Free & Instant | Wyrlo",
    metaDescription: "Minify CSS instantly in your browser — comments and whitespace removed, string literals preserved. Free, unlimited, private.",
    primaryKeyword: "css minifier",
    accept: [], freeMaxMb: 0, outputType: "CSS",
    steps: [
      { title: "Paste your CSS", body: "A rule or a whole stylesheet." },
      { title: "Minify it", body: "Comments and redundant whitespace stripped safely." },
      { title: "Download the result", body: "Smaller files, faster page loads." },
    ],
    faqs: codeFaqs("the CSS minifier"),
  },
  {
    slug: "format-sql",
    phase: 3, kind: "client", category: "developer", icon: Terminal, tone: "teal",
    name: "SQL Formatter",
    short: "Format SQL queries with clause line breaks.",
    h1: "SQL Formatter — Beautify SQL Queries Online",
    metaTitle: "SQL Formatter Online — Beautify SQL Free & Instant | Wyrlo",
    metaDescription: "Format and beautify SQL queries instantly in your browser. Clauses on their own lines, keywords capitalised. Free, unlimited, private.",
    primaryKeyword: "sql formatter",
    accept: [], freeMaxMb: 0, outputType: "SQL",
    steps: [
      { title: "Paste your SQL", body: "A SELECT, INSERT, UPDATE or DELETE." },
      { title: "Format it", body: "Major clauses get their own lines; keywords capitalised." },
      { title: "Copy the result", body: "Readable SQL for reviews and docs." },
    ],
    faqs: codeFaqs("the SQL formatter"),
  },
  {
    slug: "regex-tester",
    phase: 3, kind: "client", category: "developer", icon: Regex, tone: "teal",
    name: "Regex Tester",
    short: "Test regular expressions against your text live.",
    h1: "Regex Tester — Test Regular Expressions Online",
    metaTitle: "Regex Tester Online — Test & Debug Regex Free | Wyrlo",
    metaDescription: "Test and debug regular expressions live in your browser. See matches and capture groups instantly. Free, unlimited, private.",
    primaryKeyword: "regex tester",
    accept: [], freeMaxMb: 0, outputType: "Matches",
    steps: [
      { title: "Enter a pattern", body: "Type your regex and pick flags (g, i, m, s)." },
      { title: "Paste test text", body: "Matches highlight as you type." },
      { title: "Inspect groups", body: "Every match and capture group is listed." },
    ],
    faqs: codeFaqs("the regex tester"),
  },
);

export const TOOLS_BY_SLUG: Record<string, ToolDefinition> = Object.fromEntries(
  TOOLS.map((t) => [t.slug, t]),
);

/** A primitives-only projection of a tool — safe to pass to Client Components. */
export function toClientSpec(t: ToolDefinition) {
  return {
    slug: t.slug,
    name: t.name,
    accept: t.accept,
    freeMaxMb: t.freeMaxMb,
    outputType: t.outputType,
  } as const;
}

export type ToolCardSpec = {
  slug: string;
  name: string;
  short: string;
  category: ToolCategory;
  tone: ToolDefinition["tone"];
  iconName: string;
  free: boolean;
};

/** Card-sized, serialisable projection for the interactive homepage grid. */
export function toCardSpec(t: ToolDefinition): ToolCardSpec {
  return {
    slug: t.slug,
    name: t.name,
    short: t.short,
    category: t.category,
    tone: t.tone,
    iconName: (t.icon as { displayName?: string }).displayName ?? "Wrench",
    // Pure client-side tools are free & unlimited (no AI, no quota, no ads).
    free: t.kind === "client",
  };
}

/** "What to do next" cross-sell — 3 logically related tools per tool. */
export const RELATED_TOOLS: Record<string, string[]> = {
  "subtitle-generator": ["translate-subtitles", "add-subtitles-to-video", "subtitle-editor"],
  "add-subtitles-to-video": ["subtitle-generator", "tiktok-subtitles", "style-subtitles"],
  "srt-to-vtt": ["vtt-to-srt", "sync-subtitles", "translate-subtitles"],
  "vtt-to-srt": ["srt-to-vtt", "sync-subtitles", "translate-subtitles"],
  "translate-subtitles": ["subtitle-generator", "batch-translate", "srt-to-vtt"],
  "sync-subtitles": ["subtitle-generator", "srt-to-vtt", "subtitle-editor"],
  "extract-subtitles": ["translate-subtitles", "clean-subtitles", "subtitle-editor"],
  "subtitle-editor": ["sync-subtitles", "clean-subtitles", "translate-subtitles"],
  "tiktok-subtitles": ["add-subtitles-to-video", "subtitle-generator", "style-subtitles"],
  "clean-subtitles": ["subtitle-editor", "translate-subtitles", "srt-to-text"],
  "srt-to-text": ["youtube-chapters", "translate-subtitles", "clean-subtitles"],
  "youtube-chapters": ["srt-to-text", "subtitle-generator", "translate-subtitles"],
  "batch-translate": ["translate-subtitles", "subtitle-generator", "add-subtitles-to-video"],
  "style-subtitles": ["add-subtitles-to-video", "tiktok-subtitles", "subtitle-editor"],
  "auto-sync": ["sync-subtitles", "subtitle-editor", "subtitle-generator"],
  "api": ["subtitle-generator", "translate-subtitles", "add-subtitles-to-video"],
};

export type ComparisonRow = { feature: string; us: string; them: string };
export type AlternativeDef = {
  slug: string;
  competitor: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  bulletPoints: string[];
  comparison: ComparisonRow[];
  faqs: ToolFaq[];
};

export const ALTERNATIVES: AlternativeDef[] = [
  {
    slug: "veed-alternative",
    competitor: "VEED.io",
    title: "Best Free VEED.io Alternative — Wyrlo",
    metaTitle: "Free VEED Alternative — No Watermark, AI Subtitles | Wyrlo",
    metaDescription:
      "Looking for a VEED.io alternative? Wyrlo is faster, cheaper (€12/mo vs €18/mo) and focused on subtitles only.",
    bulletPoints: [
      "AI subtitle generation with AI — modern, European, accurate.",
      "€12/month Pro vs VEED's €18/month — and a real free tier.",
      "Single-purpose UI: drop a file, get subtitles. No video editor maze.",
      "No watermark on text outputs (SRT, VTT, TXT) — ever.",
    ],
    comparison: [
      { feature: "Pro price", us: "€12/month", them: "€18/month" },
      { feature: "Free plan", us: "Yes — daily quota", them: "Limited, watermarked" },
      { feature: "File size limit", us: "Up to 500 MB (Pro)", them: "Tiered by plan" },
      { feature: "AI subtitles", us: "AI, 30+ langs", them: "Yes" },
      { feature: "Translation", us: "30+ languages", them: "Add-on" },
      { feature: "Watermark on text", us: "Never", them: "Free plan only" },
      { feature: "Speed / focus", us: "One job per tool", them: "Full editor (heavier)" },
    ],
    faqs: [
      { q: "Is Wyrlo really cheaper than VEED?", a: "Yes — Pro is €12/month vs VEED's €18/month, and our free tier lets you actually generate and download real files." },
      { q: "Can I import my VEED subtitles?", a: "Export your captions from VEED as SRT or VTT and drop them into any Wyrlo tool — translate, sync, clean or burn them in." },
      { q: "Does Wyrlo add a watermark?", a: "Never on SRT/VTT/TXT outputs. Burned-in video gets a small watermark on the free plan only; Pro removes it." },
      { q: "Is Wyrlo a full video editor like VEED?", a: "No, and that's the point. Wyrlo does subtitles only — each tool does one job fast, with no editor learning curve." },
    ],
  },
  {
    slug: "kapwing-alternative",
    competitor: "Kapwing",
    title: "Best Free Kapwing Alternative — Wyrlo",
    metaTitle: "Free Kapwing Alternative — Subtitle Focused | Wyrlo",
    metaDescription:
      "Kapwing alternative built for subtitles. Lighter, faster, and €4/month cheaper than Kapwing Pro.",
    bulletPoints: [
      "Generate, translate, sync, burn-in — all in one place.",
      "No bloated video editor. Just subtitle tools that ship.",
      "Free tier you can actually use — no 4-minute video cap.",
    ],
    comparison: [
      { feature: "Pro price", us: "€12/month", them: "$16/month" },
      { feature: "Free plan", us: "Yes — daily quota", them: "Watermark + limits" },
      { feature: "Focus", us: "Subtitles only", them: "General editor" },
      { feature: "AI subtitles", us: "AI", them: "Yes" },
      { feature: "Translation", us: "30+ languages", them: "Yes" },
      { feature: "Watermark on text", us: "Never", them: "Free plan only" },
      { feature: "Speed", us: "Instant client-side conversions", them: "Cloud render queue" },
    ],
    faqs: [
      { q: "Why pick Wyrlo over Kapwing?", a: "If you only need subtitles, Kapwing's full editor is overkill. Wyrlo is lighter, faster and €4/month cheaper on Pro." },
      { q: "Can I move my Kapwing captions over?", a: "Yes — export as SRT/VTT and use any Wyrlo tool on them." },
      { q: "Is there a free plan?", a: "Yes, with a daily quota and no watermark on text files." },
      { q: "Do conversions upload my files?", a: "SRT↔VTT, sync, clean and SRT-to-text run entirely in your browser — nothing is uploaded." },
    ],
  },
  {
    slug: "happyscribe-alternative",
    competitor: "HappyScribe",
    title: "Affordable HappyScribe Alternative — Wyrlo",
    metaTitle: "HappyScribe Alternative Cheaper — Wyrlo",
    metaDescription:
      "HappyScribe alternative for creators, not just enterprise. €12/month vs €25/month with top-tier accuracy.",
    bulletPoints: [
      "Modern AI engine (AI), half the price.",
      "Self-serve, no sales call required.",
      "Works for indie creators, agencies and teams alike.",
    ],
    comparison: [
      { feature: "Pro price", us: "€12/month", them: "~€25/month" },
      { feature: "Audience", us: "Creators + teams", them: "Enterprise-first" },
      { feature: "Free plan", us: "Yes — daily quota", them: "Trial only" },
      { feature: "AI subtitles", us: "AI", them: "Yes" },
      { feature: "Translation", us: "30+ languages", them: "Yes" },
      { feature: "Onboarding", us: "Self-serve, instant", them: "Often sales-led" },
      { feature: "Watermark on text", us: "Never", them: "N/A" },
    ],
    faqs: [
      { q: "Is Wyrlo accurate enough vs HappyScribe?", a: "We use AI for transcription — modern accuracy across 30+ languages, at half the price." },
      { q: "Do I need to talk to sales?", a: "No. Wyrlo is fully self-serve — sign up and start in seconds." },
      { q: "Is it suitable for teams?", a: "Yes — the Business plan adds seats, API access and priority support." },
      { q: "What does it cost?", a: "Free tier, Pro at €12/month, Business at €49/month. No hidden per-minute fees on the subscription plans." },
    ],
  },
  {
    slug: "clideo-alternative",
    competitor: "Clideo",
    title: "Best Clideo Subtitle Alternative — Wyrlo",
    metaTitle: "Clideo Alternative with AI Subtitles | Wyrlo",
    metaDescription:
      "Clideo doesn't do AI subtitles. We do. Free generator with AI, plus every tool you'd need around it.",
    bulletPoints: [
      "Real AI generation — Clideo only handles add-subtitles-to-video.",
      "16 tools vs Clideo's single one for captions.",
      "Cheaper Pro plan, and a free tier without watermarked text outputs.",
    ],
    comparison: [
      { feature: "AI subtitle generation", us: "Yes (AI)", them: "No" },
      { feature: "Number of subtitle tools", us: "16", them: "~1" },
      { feature: "Translation", us: "30+ languages", them: "No" },
      { feature: "Pro price", us: "€12/month", them: "~$9/month (all tools)" },
      { feature: "Free plan", us: "Yes — daily quota", them: "Watermarked" },
      { feature: "Watermark on text", us: "Never", them: "Free plan" },
      { feature: "Focus", us: "Subtitles specialist", them: "General media utils" },
    ],
    faqs: [
      { q: "Does Clideo generate subtitles with AI?", a: "No — Clideo can add an existing subtitle file to video, but it doesn't transcribe. Wyrlo generates subtitles from audio with AI." },
      { q: "How many subtitle tools does Wyrlo have?", a: "Sixteen — generate, translate, sync, convert, clean, style, burn-in and more." },
      { q: "Is there translation?", a: "Yes, into 30+ languages, cue-by-cue, keeping your timing intact." },
      { q: "Is there a free plan?", a: "Yes, with a daily quota and no watermark on SRT/VTT/TXT outputs." },
    ],
  },
];
