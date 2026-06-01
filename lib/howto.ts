/** "How to …" informational guides — rank on long-tail queries and funnel
 *  into the matching tool. Each maps to a real Konvertools tool (honest CTA). */
export type HowToStep = { title: string; body: string };
export type HowTo = {
  id: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  toolSlug: string;
  toolCta: string;
  steps: HowToStep[];
  why: string;
  faq: { q: string; a: string }[];
};

export const HOWTOS: Record<string, HowTo> = {
  "compress-pdf-without-losing-quality": {
    id: "compress-pdf-without-losing-quality",
    h1: "How to Compress a PDF Without Losing Quality — Step-by-Step",
    metaTitle: "How to Compress a PDF Without Losing Quality | Konvertools",
    metaDescription: "Shrink a PDF for email or upload while keeping it sharp and readable — free, in your browser, no sign-up. A simple step-by-step guide.",
    intro: "Big PDFs bounce off email limits and crawl when uploaded. The trick is to reduce file size without visibly degrading text or images. You don't need desktop software or an account — a good in-browser compressor re-optimises the file's images and structure while keeping everything legible, and never uploads your document to a server.",
    toolSlug: "compress-pdf",
    toolCta: "Compress a PDF now",
    steps: [
      { title: "Open the PDF compressor", body: "Head to the Compress PDF tool — it runs entirely in your browser." },
      { title: "Drop in your PDF", body: "Your file stays on your device; nothing is uploaded." },
      { title: "Let it re-optimise", body: "Images and structure are recompressed while text stays crisp." },
      { title: "Download the smaller file", body: "Compare the size — usually a fraction of the original, still readable." },
    ],
    why: "Konvertools compresses PDFs locally in your browser, so your document is never uploaded and the result is instant. It's free and unlimited, with no watermark on the output.",
    faq: [
      { q: "Will the text get blurry?", a: "No — text stays vector-sharp. Only embedded images are recompressed, which is where the size savings come from." },
      { q: "Is there a file-size limit?", a: "Free users can compress generously; Pro raises the limit to 500 MB." },
      { q: "Are my files uploaded?", a: "No. Compression happens entirely in your browser — the PDF never leaves your device." },
    ],
  },
  "convert-pdf-to-word-free-online": {
    id: "convert-pdf-to-word-free-online",
    h1: "How to Convert a PDF to Word Free Online — Step-by-Step",
    metaTitle: "How to Convert a PDF to Word Free Online | Konvertools",
    metaDescription: "Turn a PDF into an editable Word (.docx) document for free, in your browser, with no sign-up. Follow four simple steps.",
    intro: "PDFs are great for sharing but painful to edit. Converting one back to an editable Word document lets you fix typos, update figures or reuse the text. You can do it free online without installing Office — the tool extracts the text layer into a clean .docx you can open in Word, Google Docs or Pages.",
    toolSlug: "pdf-to-word",
    toolCta: "Convert PDF to Word now",
    steps: [
      { title: "Open the PDF to Word tool", body: "It extracts text in your browser into an editable .docx." },
      { title: "Upload your PDF", body: "The file stays on your device — no server upload." },
      { title: "Wait a moment", body: "Each page's text is pulled out and written into a Word document." },
      { title: "Download the .docx", body: "Open it in Word, Google Docs or Pages and start editing." },
    ],
    why: "Konvertools converts in your browser, so your document is private and the result is instant — free and unlimited, no account required.",
    faq: [
      { q: "Will the layout be perfect?", a: "Text and basic structure are preserved. Very complex multi-column layouts and images may need touch-ups — it's an editable starting point." },
      { q: "Does it work on scanned PDFs?", a: "Scanned PDFs have no text layer, so run them through OCR first. Digital PDFs convert directly." },
      { q: "Is it really free?", a: "Yes — free and unlimited, with no sign-up." },
    ],
  },
  "remove-background-from-photo-free": {
    id: "remove-background-from-photo-free",
    h1: "How to Remove the Background from a Photo Free — Step-by-Step",
    metaTitle: "How to Remove the Background from a Photo Free | Konvertools",
    metaDescription: "Cut out the background of any photo to a transparent PNG for free, in your browser, with no sign-up. AI-powered, four easy steps.",
    intro: "Whether it's a product shot, a profile picture or a design asset, a clean transparent background makes an image far more useful. You no longer need Photoshop — AI background removal runs right in your browser, detects the subject automatically and exports a transparent PNG in seconds, without uploading your photo anywhere.",
    toolSlug: "remove-background",
    toolCta: "Remove a background now",
    steps: [
      { title: "Open the background remover", body: "It runs an AI model in your browser via WebAssembly." },
      { title: "Upload your photo", body: "JPG, PNG or WebP — it never leaves your device." },
      { title: "Let the AI cut out the subject", body: "The model isolates the foreground automatically." },
      { title: "Download the transparent PNG", body: "Drop it onto any background, slide or store listing." },
    ],
    why: "Konvertools runs the AI entirely in your browser, so your image is never uploaded — and it's free at full resolution, with no credit wall.",
    faq: [
      { q: "Is it free at full resolution?", a: "Yes — the full-resolution transparent PNG is free, with no credits or upsell." },
      { q: "Are my photos uploaded?", a: "No. The AI runs locally via WebAssembly; your image stays on your device." },
      { q: "What formats can I use?", a: "JPG, PNG and WebP. The output is always a transparent PNG." },
    ],
  },
  "transcribe-audio-to-text-automatically": {
    id: "transcribe-audio-to-text-automatically",
    h1: "How to Transcribe Audio to Text Automatically — Step-by-Step",
    metaTitle: "How to Transcribe Audio to Text Automatically | Konvertools",
    metaDescription: "Turn any audio or video into accurate, timestamped text automatically with AI — free to start, 30+ languages. A quick step-by-step guide.",
    intro: "Manually typing out an interview, lecture or podcast takes hours. Modern AI transcription does it in minutes, with timestamps, across 30+ languages. Upload your audio or video, let the model transcribe it, and download clean text or subtitles you can search, edit and repurpose.",
    toolSlug: "subtitle-generator",
    toolCta: "Transcribe audio now",
    steps: [
      { title: "Open the generator", body: "It accepts audio or video and produces timestamped text." },
      { title: "Upload your file", body: "Pick the language or let it auto-detect." },
      { title: "Let the AI transcribe", body: "Accurate text with timestamps in 30+ languages." },
      { title: "Download SRT or plain text", body: "Edit, translate or convert to a transcript." },
    ],
    why: "Konvertools uses state-of-the-art AI transcription and deletes your file within 30 minutes. Free to start, with a generous daily allowance.",
    faq: [
      { q: "How accurate is it?", a: "Very accurate for clear speech across major languages; background noise and heavy accents can reduce precision." },
      { q: "How long does it take?", a: "Typically under a minute per few minutes of audio." },
      { q: "What about privacy?", a: "Your file is processed and deleted within 30 minutes — never used to train models." },
    ],
  },
  "convert-mp4-to-mp3-online": {
    id: "convert-mp4-to-mp3-online",
    h1: "How to Convert MP4 to MP3 Online — Step-by-Step",
    metaTitle: "How to Convert MP4 to MP3 Online Free | Konvertools",
    metaDescription: "Extract the audio from an MP4 (or MOV/MKV) to MP3 for free, in your browser, with no upload. A simple four-step guide.",
    intro: "Sometimes you only want the audio — a song from a music video, the talk track of a webinar, a podcast version of a recording. Extracting MP3 from an MP4 is quick and free in the browser: the video's audio stream is decoded and re-encoded to MP3 locally, so nothing is uploaded.",
    toolSlug: "audio-from-video",
    toolCta: "Extract MP3 from video",
    steps: [
      { title: "Open the audio extractor", body: "It pulls the audio track out of any video, in your browser." },
      { title: "Upload your MP4", body: "MOV, MKV and WebM work too; the file stays local." },
      { title: "Pick a bitrate", body: "128 to 320 kbps depending on quality vs size." },
      { title: "Download the MP3", body: "Ready for your music app or podcast feed." },
    ],
    why: "Konvertools runs FFmpeg in your browser, so your video is never uploaded and the conversion is instant — free and unlimited.",
    faq: [
      { q: "Which video formats are supported?", a: "MP4, MOV, MKV, WebM and other common containers." },
      { q: "Can I choose the audio quality?", a: "Yes — pick from 128, 192, 256 or 320 kbps." },
      { q: "Is it uploaded anywhere?", a: "No. Everything runs locally via FFmpeg.wasm." },
    ],
  },
  "translate-pdf-document-online": {
    id: "translate-pdf-document-online",
    h1: "How to Translate a PDF Document Online — Step-by-Step",
    metaTitle: "How to Translate a PDF Document Online Free | Konvertools",
    metaDescription: "Translate the text of a PDF into 30+ languages with AI for free. Extract the text, translate it, and keep working — a simple step-by-step guide.",
    intro: "Need to read or share a PDF in another language? The fastest route is to pull the text out, translate it with AI, and paste it where you need it. You can do the whole thing free online — extract the text, translate into any of 30+ languages, and reuse the result, without uploading the file to a translation service.",
    toolSlug: "translate-text",
    toolCta: "Translate text now",
    steps: [
      { title: "Get the text out of the PDF", body: "Use PDF to Word or a text extractor to grab the content." },
      { title: "Open the AI translator", body: "Paste the text and choose your target language." },
      { title: "Translate with AI", body: "Natural, idiomatic translation in 30+ languages." },
      { title: "Reuse the result", body: "Paste it back into a document or share it." },
    ],
    why: "Konvertools's AI translates naturally rather than word-for-word, and pairs with the PDF tools so you can extract and translate in one place. Free to start.",
    faq: [
      { q: "Can it translate the PDF in place?", a: "It translates the extracted text; for a translated file, paste the result into Word to PDF afterwards." },
      { q: "How many languages?", a: "Over 30, including all major European and Asian languages." },
      { q: "Is my document private?", a: "Browser-side extraction keeps the PDF local; the AI step deletes text within 30 minutes." },
    ],
  },
  "generate-subtitles-for-video-free": {
    id: "generate-subtitles-for-video-free",
    h1: "How to Generate Subtitles for a Video Free — Step-by-Step",
    metaTitle: "How to Generate Subtitles for a Video Free | Konvertools",
    metaDescription: "Auto-generate accurate subtitles for any video with AI, free to start — export SRT/VTT or burn them in. A quick step-by-step guide.",
    intro: "Subtitles boost watch time, accessibility and reach. Generating them by hand is tedious; AI does it in minutes. Upload your video, let the model transcribe the speech with timestamps, fine-tune if needed, then download an SRT/VTT or burn the captions straight into the video.",
    toolSlug: "subtitle-generator",
    toolCta: "Generate subtitles now",
    steps: [
      { title: "Open the subtitle generator", body: "It transcribes your video's speech with timestamps." },
      { title: "Upload your video", body: "Pick the language or auto-detect it." },
      { title: "Review the SRT", body: "Tweak any lines in the editor if you like." },
      { title: "Export or burn in", body: "Download SRT/VTT, or burn the captions into the MP4." },
    ],
    why: "Konvertools generates subtitles with state-of-the-art AI in 30+ languages, then lets you translate or burn them in — free to start, files deleted within 30 minutes.",
    faq: [
      { q: "Can I translate the subtitles?", a: "Yes — generate, then translate cue-by-cue into 30+ languages with timestamps kept." },
      { q: "Can I burn them into the video?", a: "Yes, with the Add Subtitles to Video tool. Free outputs carry a small watermark; Pro removes it." },
      { q: "How accurate is it?", a: "Very accurate for clear speech; review is quick in the built-in editor." },
    ],
  },
  "add-a-watermark-to-a-pdf": {
    id: "add-a-watermark-to-a-pdf",
    h1: "How to Add a Watermark to a PDF — Step-by-Step",
    metaTitle: "How to Add a Watermark to a PDF Free | Konvertools",
    metaDescription: "Stamp a CONFIDENTIAL, DRAFT or custom watermark across every page of a PDF for free, in your browser, with no upload. Four easy steps.",
    intro: "A watermark protects drafts, marks confidential documents and brands your PDFs. You don't need Acrobat — a browser-based tool can stamp diagonal text across every page, with your choice of wording, colour and opacity, without uploading the file anywhere.",
    toolSlug: "watermark-pdf",
    toolCta: "Watermark a PDF now",
    steps: [
      { title: "Open the Watermark PDF tool", body: "It stamps text on every page, in your browser." },
      { title: "Upload your PDF", body: "The file stays on your device." },
      { title: "Style the watermark", body: "Set the text, colour, opacity and size." },
      { title: "Download the result", body: "Every page now carries your diagonal watermark." },
    ],
    why: "Konvertools adds watermarks locally with pdf-lib, so your document is never uploaded — free and unlimited, no watermark-on-the-watermark catch.",
    faq: [
      { q: "Can I use my own text?", a: "Yes — type anything: CONFIDENTIAL, DRAFT, a name, a URL, and pick the colour and opacity." },
      { q: "Is it applied to every page?", a: "Yes, the watermark is stamped diagonally on all pages." },
      { q: "Are my files uploaded?", a: "No. It runs in your browser via pdf-lib; the PDF never leaves your device." },
    ],
  },
};

export const HOWTO_IDS = Object.keys(HOWTOS);
