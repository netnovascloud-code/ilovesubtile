/** "Wyrlo vs <competitor>" comparison pages — high-intent switching traffic.
 *  Honest by design: every page includes a "When <competitor> is the better
 *  pick" section, which reads as credible and ranks better.
 */
export type VsRow = { feature: string; wyrlo: string; them: string; win: boolean };
export type Vs = {
  id: string;
  competitor: string;
  hero: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  rows: VsRow[];
  better: string[];
  whenThem: string;
  ctaSlugs: string[];
};

export const VS: Record<string, Vs> = {
  ilovepdf: {
    id: "ilovepdf",
    competitor: "iLovePDF",
    hero: "Wyrlo vs iLovePDF — More Tools, Free AI, No Ads",
    metaTitle: "Wyrlo vs iLovePDF — More Tools, Free AI, No Ads | Wyrlo",
    metaDescription: "Wyrlo vs iLovePDF compared: 98+ tools beyond PDF, free AI text & subtitle tools, no ads on the free tier, and most processing runs in your browser.",
    intro: "iLovePDF is a solid PDF suite. Wyrlo covers PDF too — merge, split, compress, convert — and adds images, audio, video, code, subtitles and AI text tools, with most processing happening right in your browser.",
    rows: [
      { feature: "Price (paid)", wyrlo: "€9/mo Pro", them: "~€7/mo Premium", win: false },
      { feature: "Free tier", wyrlo: "All browser tools, unlimited", them: "Limited tasks/day", win: true },
      { feature: "Tool count", wyrlo: "98+ across 9 categories", them: "~25, PDF-focused", win: true },
      { feature: "Ads on free", wyrlo: "None", them: "Yes", win: true },
      { feature: "AI tools", wyrlo: "Transcribe, translate, rephrase…", them: "Limited", win: true },
      { feature: "Languages", wyrlo: "13-language UI", them: "Multi-language", win: false },
      { feature: "Runs in browser", wyrlo: "Most tools, no upload", them: "Server-side", win: true },
      { feature: "GDPR", wyrlo: "Files deleted in ≤30 min", them: "Deleted after a few hours", win: true },
    ],
    better: [
      "Far more than PDF — images, audio, video, code, subtitles and AI text in one place.",
      "The free tier is genuinely unlimited for browser-side tools, with no ads.",
      "Most conversions never leave your device, so they're instant and private.",
    ],
    whenThem: "iLovePDF has a polished mobile app and desktop app, and some advanced PDF-specific features (OCR, signatures) that Wyrlo doesn't offer yet. If you live entirely in PDFs and want native apps, it's a fair choice.",
    ctaSlugs: ["merge-pdf", "pdf-to-word", "compress-pdf"],
  },
  convertio: {
    id: "convertio",
    competitor: "Convertio",
    hero: "Wyrlo vs Convertio — Faster, Free, No File Limits",
    metaTitle: "Wyrlo vs Convertio — Faster, Free, No File Limits | Wyrlo",
    metaDescription: "Wyrlo vs Convertio compared: browser-side conversions with no upload, no daily minute caps on free browser tools, plus AI text and subtitle tools.",
    intro: "Convertio converts hundreds of formats on its servers. Wyrlo converts the most-used formats right in your browser — so there's no upload, no queue, and no per-day minute cap on the free browser tools.",
    rows: [
      { feature: "Price (paid)", wyrlo: "€9/mo Pro", them: "from $9.99/mo", win: true },
      { feature: "Free tier", wyrlo: "Unlimited browser tools", them: "10 conversions/day, 100 MB", win: true },
      { feature: "Upload required", wyrlo: "No for most tools", them: "Yes, always", win: true },
      { feature: "Speed", wyrlo: "Instant (local)", them: "Upload + queue", win: true },
      { feature: "AI tools", wyrlo: "Yes", them: "No", win: true },
      { feature: "Format breadth", wyrlo: "Common formats", them: "300+ formats", win: false },
      { feature: "Privacy", wyrlo: "Files stay on device", them: "Uploaded to servers", win: true },
    ],
    better: [
      "Browser-side means no upload wait and nothing leaves your device.",
      "No 10-per-day cap or file-size wall on the free browser tools.",
      "AI text and subtitle tools Convertio simply doesn't have.",
    ],
    whenThem: "Convertio supports an enormous long tail of niche formats (CAD, ebooks, fonts, archives) that a browser can't decode. For an exotic format conversion, it's the better tool.",
    ctaSlugs: ["png-to-jpg", "mp4-to-gif", "json-to-csv"],
  },
  smallpdf: {
    id: "smallpdf",
    competitor: "Smallpdf",
    hero: "Wyrlo vs Smallpdf — Free Forever, No Sign-up Needed",
    metaTitle: "Wyrlo vs Smallpdf — Free Forever, No Sign-up | Wyrlo",
    metaDescription: "Wyrlo vs Smallpdf compared: no sign-up to use the tools, unlimited free browser-side PDF and conversion tools, plus AI and subtitle tools Smallpdf lacks.",
    intro: "Smallpdf is a clean PDF toolkit that nudges you to sign up and caps free use. Wyrlo's browser tools are free and unlimited with no account, and the catalogue goes well beyond PDF.",
    rows: [
      { feature: "Price (paid)", wyrlo: "€9/mo Pro", them: "~€9/mo", win: false },
      { feature: "Sign-up to use", wyrlo: "Never", them: "Pushed / required", win: true },
      { feature: "Free limit", wyrlo: "Unlimited browser tools", them: "2 docs/day", win: true },
      { feature: "Tool breadth", wyrlo: "98+ across 9 categories", them: "PDF + a few", win: true },
      { feature: "AI tools", wyrlo: "Yes", them: "Limited", win: true },
      { feature: "Runs in browser", wyrlo: "Most tools", them: "Server-side", win: true },
      { feature: "GDPR", wyrlo: "Deleted ≤30 min", them: "Deleted after 1h", win: true },
    ],
    better: [
      "No account and no daily document cap on browser tools.",
      "One site for PDF, images, audio, video, code and AI text.",
      "Most tools run locally — faster and more private.",
    ],
    whenThem: "Smallpdf has e-signatures, a desktop app and tight Dropbox/Drive integrations. If you need legally-tracked signing or cloud-storage hooks, it wins there.",
    ctaSlugs: ["compress-pdf", "split-pdf", "pdf-to-jpg"],
  },
  "adobe-acrobat": {
    id: "adobe-acrobat",
    competitor: "Adobe Acrobat",
    hero: "Wyrlo vs Adobe Acrobat — Free Alternative Online",
    metaTitle: "Wyrlo vs Adobe Acrobat — Free Online Alternative | Wyrlo",
    metaDescription: "Wyrlo vs Adobe Acrobat compared: a free, no-install, browser-based alternative for the everyday PDF jobs — merge, split, compress, convert — plus much more.",
    intro: "Adobe Acrobat is the professional standard, with a price to match. For the everyday jobs — merge, split, compress, convert, watermark, page numbers — Wyrlo does them free in your browser with nothing to install.",
    rows: [
      { feature: "Price", wyrlo: "Free / €9/mo Pro", them: "~€19/mo", win: true },
      { feature: "Install", wyrlo: "None — web", them: "Desktop app", win: true },
      { feature: "Everyday PDF jobs", wyrlo: "Yes, free", them: "Yes, paid", win: true },
      { feature: "Runs in browser", wyrlo: "Yes, no upload", them: "App / cloud", win: true },
      { feature: "Editing/OCR/forms", wyrlo: "Limited", them: "Full", win: false },
      { feature: "e-Signatures", wyrlo: "No", them: "Yes", win: false },
      { feature: "Beyond PDF", wyrlo: "Images, AV, code, AI", them: "PDF-centric", win: true },
    ],
    better: [
      "Zero cost and zero install for the 90% of tasks people actually do.",
      "Browser-side processing keeps documents private.",
      "A whole conversion suite alongside the PDF tools.",
    ],
    whenThem: "Acrobat Pro is unmatched for deep PDF editing, OCR, fillable forms, redaction and compliant e-signatures. For professional document workflows, it's worth the price.",
    ctaSlugs: ["merge-pdf", "compress-pdf", "watermark-pdf"],
  },
};

export const VS_IDS = Object.keys(VS);
