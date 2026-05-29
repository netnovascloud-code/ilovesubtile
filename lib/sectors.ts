/** Sector/audience landing pages — high-intent B2B traffic.
 *  Each sector groups the most relevant tool slugs with a sector-specific
 *  hook and a single CTA pair. Slugs MUST exist in TOOLS_BY_SLUG.
 */
export type Sector = {
  id: string;
  hero: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  highlights: { title: string; body: string }[];
  toolSlugs: string[];
  faq: { q: string; a: string }[];
};

export const SECTORS: Record<string, Sector> = {
  youtubers: {
    id: "youtubers",
    hero: "Konver for YouTubers — Subtitles, Audio & Thumbnails",
    intro: "Generate subtitles in 30+ languages, extract audio for podcast versions, compress videos for previews, and create polished thumbnails — all in your browser, free.",
    metaTitle: "Konver for YouTubers — Subtitles, Audio & Thumbnails Free | Konver",
    metaDescription: "Free tools built for YouTubers: AI subtitle generation, translation, video compression, audio extraction, thumbnail crop and resize. No editor, no sign-up.",
    highlights: [
      { title: "Subtitles in 30+ languages", body: "AI transcription + translation cue-by-cue, with timestamps preserved." },
      { title: "Audio extraction in seconds", body: "Pull the MP3 out of any MP4/MOV for podcast re-uploads." },
      { title: "Thumbnails that fit", body: "Resize, crop and convert images to YouTube's recommended formats." },
    ],
    toolSlugs: ["subtitle-generator", "translate-subtitles", "add-subtitles-to-video", "audio-from-video", "compress-video", "resize-image", "crop-image", "youtube-chapters"],
    faq: [
      { q: "Can I generate burned-in subtitles?", a: "Yes — generate the SRT then use Add Subtitles to Video to burn them straight into the MP4." },
      { q: "What's the file size limit?", a: "25 MB free anonymous, 500 MB on Pro, 2 GB on Business." },
      { q: "Are my videos uploaded?", a: "Most video tools run in your browser via FFmpeg.wasm — your files never leave your device." },
    ],
  },
  developers: {
    id: "developers",
    hero: "Konver for Developers — JSON, Code & API Tools",
    intro: "Format and validate JSON, convert between data formats, decode JWTs, encode Base64, generate UUIDs — and call any of it programmatically via the public REST API.",
    metaTitle: "Konver for Developers — JSON, Code & API Tools | Konver",
    metaDescription: "Free dev tools: JSON formatter, JSON↔CSV/XML/YAML, Base64, URL encode, JWT decoder, UUID v4/v7, regex tester, diff. Plus a paid REST API for automation.",
    highlights: [
      { title: "Browser-first, zero upload", body: "JSON, regex, diff, UUID — runs in your browser. Your code never leaves the device." },
      { title: "REST API for automation", body: "transcribe, translate, rephrase, summarize, humanize, convert_code — pay-as-you-go." },
      { title: "Strict, well-formed output", body: "JSON parsed via the engine; XML/CSV/YAML round-trip cleanly." },
    ],
    toolSlugs: ["format-json", "json-to-csv", "csv-to-json", "json-to-xml", "json-to-yaml", "yaml-to-json", "xml-to-json", "base64", "url-encode", "jwt-decoder", "regex-tester", "uuid-generator", "text-diff", "unix-timestamp", "minify-css", "format-sql", "api"],
    faq: [
      { q: "Is there a REST API?", a: "Yes — the public REST API exposes the same engine. See the API docs page for endpoints and costs." },
      { q: "Are there rate limits?", a: "60 requests/minute per API key on top of the credit system." },
      { q: "What about data privacy?", a: "Everything browser-side runs entirely on your device. API outputs are signed for 10 minutes and purged within 30." },
    ],
  },
  podcasters: {
    id: "podcasters",
    hero: "Konver for Podcasters — Transcription & Audio Tools",
    intro: "Transcribe episodes with AI, translate them, clean up MP3s, cut, merge, and compress — everything you need to turn a raw recording into a ready-to-publish episode.",
    metaTitle: "Konver for Podcasters — Transcription & Audio Tools | Konver",
    metaDescription: "Free podcaster tools: AI transcription with timestamps, multi-language translation, audio cut/merge/compress, MP3↔WAV conversion, volume and speed control.",
    highlights: [
      { title: "AI transcription with timestamps", body: "Voxtral-grade accuracy across 30+ languages, exported to SRT." },
      { title: "Audio editing, browser-first", body: "Cut, merge, compress, change speed and volume — no upload, no editor." },
      { title: "Translate the show", body: "Reach a new audience in days, not months." },
    ],
    toolSlugs: ["subtitle-generator", "srt-to-text", "translate-subtitles", "cut-audio", "merge-audio", "compress-audio", "change-speed", "change-volume", "audio-from-video", "mp3-to-wav", "wav-to-mp3", "clean-subtitles"],
    faq: [
      { q: "What audio formats are supported?", a: "MP3, WAV, M4A, FLAC, OGG, AAC — converted via FFmpeg.wasm in your browser." },
      { q: "How accurate is the transcription?", a: "Modern AI transcription is strong across English, French, Spanish, German, Portuguese and 25+ other languages." },
      { q: "Can I publish show notes from a transcript?", a: "Yes — convert SRT to plain text, then rephrase or summarize with the AI text tools." },
    ],
  },
  designers: {
    id: "designers",
    hero: "Konver for Designers — Image & Color Tools",
    intro: "Convert between image formats, remove backgrounds, resize, crop, rotate, build a colour palette, and grab the exact HEX/RGB/HSL/CMYK values — all in seconds.",
    metaTitle: "Konver for Designers — Image & Color Tools Free | Konver",
    metaDescription: "Free designer tools: AI background removal, image format conversion (JPG/PNG/WebP/SVG), resize, crop, rotate, grayscale, colour converter (HEX/RGB/HSL/CMYK).",
    highlights: [
      { title: "AI background removal", body: "Cut out a clean transparent PNG in seconds — entirely in the browser." },
      { title: "Format conversion that respects quality", body: "JPG, PNG, WebP, SVG — round-trip without bloat." },
      { title: "Colour values at your fingertips", body: "HEX, RGB, HSL and CMYK side by side, ready to copy." },
    ],
    toolSlugs: ["remove-background", "jpg-to-png", "png-to-jpg", "jpg-to-webp", "png-to-webp", "svg-to-png", "compress-image", "resize-image", "crop-image", "rotate-image", "grayscale-image", "color-converter", "qr-generator"],
    faq: [
      { q: "Are my images uploaded for background removal?", a: "No — the AI runs in your browser via WebAssembly. Your image never leaves the device." },
      { q: "Which formats are supported?", a: "JPG, PNG, WebP and SVG (in or out). AVIF/HEIC are on the roadmap." },
      { q: "Can I batch-resize?", a: "Yes — the Pro plan unlocks batch processing of up to 20 files at a time." },
    ],
  },
  students: {
    id: "students",
    hero: "Konver for Students — Free Study & Document Tools",
    intro: "Merge lecture notes, convert PDFs to Word, summarize long readings, generate study flashcards from a transcript, translate articles — all free, no sign-up.",
    metaTitle: "Konver for Students — Free Study & Document Tools | Konver",
    metaDescription: "Free student tools: merge/split/compress PDF, PDF↔Word, AI summarization, translation, transcription, JSON/CSV — everything you need for assignments and notes.",
    highlights: [
      { title: "Convert PDFs without paying", body: "Merge, split, compress, PDF↔Word — entirely in your browser." },
      { title: "Summarize and translate", body: "Long readings → bullet points; foreign articles → your language." },
      { title: "Transcribe lectures", body: "Drop the audio, get timestamped notes you can search." },
    ],
    toolSlugs: ["merge-pdf", "split-pdf", "compress-pdf", "pdf-to-word", "word-to-pdf", "pdf-to-jpg", "summarize-text", "translate-text", "subtitle-generator", "srt-to-text", "word-counter"],
    faq: [
      { q: "Is it really free?", a: "Yes — all browser-side tools are free and unlimited. AI tools have a generous free daily allowance." },
      { q: "Will my files be deleted?", a: "Browser tools never upload anything. AI-powered tools delete files within 30 minutes." },
      { q: "Can I use it on my phone?", a: "Yes — every tool works on mobile browsers (iOS Safari and Android Chrome included)." },
    ],
  },
  lawyers: {
    id: "lawyers",
    hero: "Konver for Legal Professionals — Document Conversion",
    intro: "Merge briefs, split filings, lock PDFs, redact and translate — all without uploading sensitive material to a stranger's server.",
    metaTitle: "Konver for Legal Professionals — Document Tools | Konver",
    metaDescription: "Free document tools for legal work: merge/split/compress PDF, PDF↔Word, redact, translate filings with AI, transcribe depositions. Browser-first privacy.",
    highlights: [
      { title: "Browser-first privacy", body: "PDF operations run entirely in your browser. Files never leave your device." },
      { title: "Translation that preserves structure", body: "Cue-by-cue translation keeps timestamps, layout and numbering intact." },
      { title: "Transcribe depositions", body: "AI transcription with timestamps, ready to export to a document." },
    ],
    toolSlugs: ["merge-pdf", "split-pdf", "compress-pdf", "pdf-to-word", "word-to-pdf", "pdf-to-jpg", "translate-text", "subtitle-generator", "srt-to-text"],
    faq: [
      { q: "Is this suitable for confidential documents?", a: "Yes for browser-side tools — they never upload your file. For AI tools, files are processed in an EU-hosted Supabase project and deleted within 30 minutes." },
      { q: "Do you store transcripts?", a: "No — they're returned to you and the temporary copy is purged within 30 minutes." },
      { q: "Can I get a DPA / SCC?", a: "Business plan customers can request a DPA from billing — contact us via the dashboard." },
    ],
  },
  recruiters: {
    id: "recruiters",
    hero: "Konver for HR & Recruiters — CV & Document Tools",
    intro: "Convert CVs between formats, batch-translate candidate documents, summarize cover letters, and standardize file types before sharing with hiring managers.",
    metaTitle: "Konver for HR & Recruiters — CV & Document Tools | Konver",
    metaDescription: "Free HR & recruiter tools: PDF↔Word for CV conversion, AI translation, summarization, document compression. Batch process candidate files securely.",
    highlights: [
      { title: "Standardize CV formats", body: "PDF↔Word in seconds — every candidate file in the same shape." },
      { title: "Cross-language hiring", body: "AI translation in 30+ languages so you can read every CV." },
      { title: "Summarize at a glance", body: "Cover letters → 3 bullets so you can triage faster." },
    ],
    toolSlugs: ["pdf-to-word", "word-to-pdf", "compress-pdf", "merge-pdf", "translate-text", "summarize-text", "rephrase-text", "word-counter", "fix-grammar"],
    faq: [
      { q: "Can I batch-translate multiple CVs?", a: "Yes — the Pro plan unlocks batch translation of up to 20 files at a time." },
      { q: "Are candidate files private?", a: "Browser tools never upload anything. AI tools delete every file within 30 minutes." },
      { q: "Will the layout be preserved?", a: "Best-effort — the original layout, fonts and tables are preserved as much as the source allows." },
    ],
  },
  ecommerce: {
    id: "ecommerce",
    hero: "Konver for E-commerce — Product Images & Descriptions",
    intro: "Cut out clean transparent backgrounds, resize for every marketplace, compress for fast pages, generate product descriptions with AI, translate listings.",
    metaTitle: "Konver for E-commerce — Product Images & Descriptions | Konver",
    metaDescription: "Free e-commerce tools: AI background removal, image resize/compress, AI product description generator, listing translation, QR codes for offline campaigns.",
    highlights: [
      { title: "Catalogue-ready images", body: "AI background removal + resize for Amazon, Shopify, eBay specs." },
      { title: "Descriptions that convert", body: "AI-generated copy in your brand voice, translated into 30+ languages." },
      { title: "Fast pages, better SEO", body: "Image compression keeps your storefront snappy." },
    ],
    toolSlugs: ["remove-background", "compress-image", "resize-image", "crop-image", "jpg-to-webp", "png-to-webp", "product-description", "translate-text", "rephrase-text", "qr-generator", "vat-calculator"],
    faq: [
      { q: "Can I batch-process my catalogue?", a: "Yes — the Pro plan unlocks batch image processing of up to 20 files at a time." },
      { q: "Are these images marketplace-ready?", a: "Yes — convert to WebP and resize to the exact dimensions each marketplace requires." },
      { q: "Can I use the AI text in production listings?", a: "Yes — Pro/Business unlock unlimited generation, and the API lets you script it into your catalog flow." },
    ],
  },
};

export const SECTOR_IDS = Object.keys(SECTORS) as (keyof typeof SECTORS)[];
