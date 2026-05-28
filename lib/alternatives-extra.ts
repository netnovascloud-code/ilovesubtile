// Wyrlo vs. major competitors — used by the /alternatives/<slug> pages.
import type { AlternativeDef } from "@/lib/tools-config";

export const EXTRA_ALTERNATIVES: AlternativeDef[] = [
  {
    slug: "deepl",
    competitor: "DeepL",
    title: "Free DeepL Alternative — Wyrlo Translator",
    metaTitle: "Wyrlo vs DeepL — Free Translator with Formal/Informal | Wyrlo",
    metaDescription:
      "Looking for a free DeepL alternative? Wyrlo Translator covers 30+ languages with formal/informal register, instant translation and zero file retention.",
    bulletPoints: [
      "30+ languages with auto-detection and a formal/informal toggle.",
      "Two-pane live UI, debounced calls — feels like DeepL.",
      "Free daily use without a subscription, Pro for unlimited.",
      "Translates pasted text and SRT subtitle files alike.",
    ],
    comparison: [
      { feature: "Free tier", us: "Yes — 5 runs/day signed in", them: "Limited free, paywalled beyond" },
      { feature: "Pro price", us: "€12/month", them: "€8.74-30/month" },
      { feature: "Formal / informal", us: "Toggle in the UI", them: "Pro only" },
      { feature: "Subtitle (SRT/VTT) translation", us: "Yes — same engine", them: "No" },
      { feature: "Other tools", us: "150+ in one place", them: "Translation only" },
      { feature: "File retention", us: "Files deleted in 30 min, jobs in 2h", them: "Document storage rules apply" },
    ],
    faqs: [
      { q: "Is Wyrlo's translator as good as DeepL?", a: "It uses an advanced AI model and idiomatic prompts — quality is comparable on common language pairs. DeepL still leads on some European pairs; we keep adding tuning." },
      { q: "Can I translate documents?", a: "You can translate pasted text and SRT/VTT subtitle files today. Word/PDF translation is on the roadmap." },
      { q: "Is there a real free tier?", a: "Yes — 3 runs/day anonymous, 5/day signed in, no card. Pro lifts the limit." },
      { q: "Do you store my text?", a: "No. The input is sent to the AI provider for the moment of the call and is never written to long-term storage." },
    ],
  },
  {
    slug: "ilovepdf",
    competitor: "iLovePDF",
    title: "Free iLovePDF Alternative — All-in-One Wyrlo",
    metaTitle: "Wyrlo vs iLovePDF — Free PDF, Image, Audio, Video Tools | Wyrlo",
    metaDescription:
      "iLovePDF is great for PDF. Wyrlo does PDF too — plus images, audio, video, subtitles, code and AI text — all in one place, all free.",
    bulletPoints: [
      "Same PDF basics (merge, split, rotate, images→PDF) — fully in your browser.",
      "Plus 9 categories iLovePDF doesn't have: audio, video, code, subtitles, AI.",
      "No popup ads, no aggressive upsell, no watermarks on free tier.",
      "Files deleted in 30 minutes max — never months.",
    ],
    comparison: [
      { feature: "PDF basics", us: "Merge / Split / Rotate / Images→PDF (in-browser)", them: "Same + server" },
      { feature: "Audio + Video", us: "Yes — FFmpeg.wasm", them: "No" },
      { feature: "AI text tools", us: "Translator, rephraser, humanizer…", them: "No" },
      { feature: "Code & dev tools", us: "JSON/YAML/XML, hash, regex…", them: "No" },
      { feature: "Pro price", us: "€12/month", them: "€7/month" },
      { feature: "Free tier", us: "Most tools free forever", them: "Limited daily ops" },
      { feature: "File retention", us: "Up to 30 min", them: "2h" },
    ],
    faqs: [
      { q: "Does Wyrlo replace iLovePDF for PDFs?", a: "For Merge / Split / Rotate / Images→PDF, yes — done fully in your browser. PDF→Word, PDF→JPG and compress-PDF are coming via in-browser libraries." },
      { q: "Is the PDF processing private?", a: "Yes — pdf-lib runs in your browser, your file never leaves your device." },
      { q: "What does iLovePDF still do better?", a: "OCR and PDF→Excel are stronger today. We're catching up." },
      { q: "What else does Wyrlo do?", a: "Audio/video conversion, image editing, AI text tools, dev utilities, subtitle tools — 80+ tools total." },
    ],
  },
  {
    slug: "convertio",
    competitor: "Convertio",
    title: "Free Convertio Alternative — Wyrlo",
    metaTitle: "Wyrlo vs Convertio — Faster, Free, Private | Wyrlo",
    metaDescription:
      "Convertio uploads your files; Wyrlo doesn't. Faster, private, no daily upload cap — and free for most conversions.",
    bulletPoints: [
      "Same range of conversions (PDF, images, audio, video, code).",
      "Most run 100% in your browser — your files never leave your device.",
      "No file size cap on client-side tools.",
      "AI text tools, subtitles and dev utilities Convertio doesn't have.",
    ],
    comparison: [
      { feature: "Where conversion runs", us: "In your browser (most)", them: "On their servers" },
      { feature: "Privacy", us: "File never uploaded", them: "File uploaded + stored" },
      { feature: "Free file cap", us: "No hard cap on client tools", them: "100 MB" },
      { feature: "Daily free limit", us: "Unlimited on client tools", them: "10/day" },
      { feature: "AI tools", us: "Translator / Rephraser / Humanizer", them: "No" },
      { feature: "Subtitle tools", us: "16 subtitle tools", them: "Limited" },
    ],
    faqs: [
      { q: "Is Wyrlo as fast as Convertio?", a: "For images, PDFs and most code tools, faster — there's no upload. For audio/video the first run loads FFmpeg.wasm (~30MB), then everything is instant." },
      { q: "Do you support OCR like Convertio?", a: "Not yet. It's on the roadmap once we ship a Tesseract.wasm-based OCR tool." },
      { q: "Are my files truly never uploaded?", a: "Right — for image, PDF, audio/video and dev tools the file is processed locally. Only AI tools (translator/transcribe) send the text/audio to the AI provider." },
      { q: "What if a tool is missing?", a: "Tell us via the contact link in the footer — we add tools quickly." },
    ],
  },
  {
    slug: "remove-bg",
    competitor: "Remove.bg",
    title: "Free Remove.bg Alternative — Wyrlo",
    metaTitle: "Wyrlo vs Remove.bg — Free, In-browser, Unlimited | Wyrlo",
    metaDescription:
      "Remove backgrounds free without paid credits. Wyrlo runs AI background removal in your browser via WebAssembly — no upload, no quota.",
    bulletPoints: [
      "AI background removal that runs entirely in your browser.",
      "No credits, no per-image fee, no upload — even for high-res photos.",
      "Pair it with the other Wyrlo image tools (compress, resize, convert).",
      "Free with no sign-up; Pro removes ads everywhere.",
    ],
    comparison: [
      { feature: "Price", us: "Free, unlimited", them: "Free preview, paid for full-res" },
      { feature: "Where AI runs", us: "Your browser (WASM)", them: "Their servers" },
      { feature: "Privacy", us: "Image never uploaded", them: "Image uploaded" },
      { feature: "Other image tools", us: "Compress, resize, crop, rotate, B&W…", them: "Bg removal only" },
      { feature: "Resolution cap", us: "Limited only by your device", them: "Full-res requires paid" },
    ],
    faqs: [
      { q: "Is the AI as good as Remove.bg?", a: "On portraits and product shots — very close. The model runs on-device so processing takes a few seconds the first time while the WASM core loads." },
      { q: "Will it work on huge photos?", a: "Yes — there's no server limit. Very large images use more RAM and run slower on older devices." },
      { q: "Is it truly free?", a: "Yes — no daily quota and no watermark on background removal." },
      { q: "Can I use it commercially?", a: "Yes, for your own images." },
    ],
  },
  {
    slug: "smallpdf",
    competitor: "Smallpdf",
    title: "Free Smallpdf Alternative — Wyrlo",
    metaTitle: "Wyrlo vs Smallpdf — Free Unlimited PDF Tools | Wyrlo",
    metaDescription:
      "Smallpdf caps the free plan at 2 tasks/day. Wyrlo's PDF tools run in your browser, with no daily cap and no upload.",
    bulletPoints: [
      "Merge, split, rotate and Images→PDF — all client-side via pdf-lib.",
      "No 2-task daily cap, no watermark, no forced sign-up.",
      "Files never uploaded — your PDF stays on your device.",
      "Plus 80+ tools Smallpdf doesn't have (audio, video, AI, code).",
    ],
    comparison: [
      { feature: "Daily free cap", us: "Unlimited on client tools", them: "2 tasks/day" },
      { feature: "Where conversion runs", us: "Your browser", them: "Their servers" },
      { feature: "Pro price", us: "€12/month", them: "$9/month" },
      { feature: "OCR & PDF→Excel", us: "Coming soon", them: "Yes" },
      { feature: "Other categories", us: "Audio, video, AI, code, subtitles", them: "PDF + some images" },
      { feature: "Watermark", us: "Never", them: "Free plan: yes" },
    ],
    faqs: [
      { q: "Is Wyrlo really unlimited for PDFs?", a: "For Merge / Split / Rotate / Images→PDF — yes, with no per-day cap, no waterprint, no upload. The processing runs entirely in your browser." },
      { q: "What does Smallpdf still do better?", a: "OCR, PDF→Excel and a few enterprise features. They're on our roadmap." },
      { q: "Why is Wyrlo cheaper effectively?", a: "We don't charge for tools that run on the user's device — there's no server cost to recoup." },
      { q: "What about privacy?", a: "PDF tools process locally — file never leaves the browser." },
    ],
  },
  {
    slug: "veed",
    competitor: "VEED.io",
    title: "Free VEED Alternative — Wyrlo",
    metaTitle: "Wyrlo vs VEED — Free Video Tools without Watermark | Wyrlo",
    metaDescription:
      "VEED's free plan watermarks everything. Wyrlo's video tools run via FFmpeg.wasm in your browser — no watermark, no upload, no upsell.",
    bulletPoints: [
      "Compress, trim, resize, rotate, MP4↔GIF, MP4→WebM — via FFmpeg.wasm.",
      "No watermark on free tier — ever.",
      "Files never uploaded — runs entirely in your browser.",
      "Lighter than VEED's full editor — one job, done fast.",
    ],
    comparison: [
      { feature: "Watermark on free", us: "Never", them: "Yes" },
      { feature: "Where conversion runs", us: "Your browser", them: "Their servers" },
      { feature: "Daily free limit", us: "Unlimited on client tools", them: "Time/size limited" },
      { feature: "AI subtitles", us: "Via subtitle-generator", them: "Yes (premium)" },
      { feature: "Pro price", us: "€12/month", them: "€18+/month" },
      { feature: "Other categories", us: "PDF, audio, image, code, AI", them: "Video editor focus" },
    ],
    faqs: [
      { q: "Can I use VEED's editor in Wyrlo?", a: "Not the timeline editor — Wyrlo focuses on one-shot conversions and quick edits. Editing complex sequences is still better in VEED or DaVinci." },
      { q: "Are big video files supported?", a: "Yes — limited only by your device's RAM. The first job loads FFmpeg.wasm (~30MB); subsequent jobs are instant." },
      { q: "Is there a watermark?", a: "Never on Wyrlo's client-side video output." },
      { q: "What about subtitles?", a: "Wyrlo has 16 subtitle tools (generate, translate, sync, burn-in, convert)." },
    ],
  },
  {
    slug: "chatgpt",
    competitor: "ChatGPT",
    title: "Free ChatGPT Alternative for Conversions — Wyrlo",
    metaTitle: "Wyrlo AI Tools — ChatGPT Alternative for File Tasks | Wyrlo",
    metaDescription:
      "ChatGPT is generic. Wyrlo's AI is purpose-built for translation, rephrasing, humanising AI text and summarising — instantly, in one click.",
    bulletPoints: [
      "Built for files and copy — not chat. One click, one result.",
      "Specialised UIs: DeepL-style translator, click-to-accept rephraser, humanizer.",
      "Free daily quota, no sign-up required for casual use.",
      "Files never stored — text inputs aren't logged or used to train models.",
    ],
    comparison: [
      { feature: "Translation register", us: "Formal / informal toggle", them: "Prompt engineering" },
      { feature: "Rephrasing styles", us: "8 one-click styles", them: "Manual prompt each time" },
      { feature: "Humanizer score", us: "Live score 0-100", them: "No native indicator" },
      { feature: "File conversion", us: "80+ tools alongside the AI", them: "No" },
      { feature: "Free tier", us: "5 runs/day signed in", them: "Limited GPT-4 access" },
      { feature: "Data retention", us: "Inputs not stored", them: "Used to improve service" },
    ],
    faqs: [
      { q: "Does Wyrlo replace ChatGPT?", a: "Not for open conversation. For specific copy/file tasks (translate, summarise, rephrase, humanize, fix grammar) — yes, faster and with purpose-built UIs." },
      { q: "Which AI does Wyrlo use?", a: "An advanced large language model running server-side via Edge Functions. The technical name isn't surfaced because the experience is what matters." },
      { q: "Is my text stored?", a: "No. The text is sent to the AI provider for the call and is not retained in long-term storage." },
      { q: "What's the limit?", a: "Anonymous: 3 runs/day. Free signed in: 5/day. Pro: unlimited." },
    ],
  },
];
