"use client";

import { useState } from "react";
import { Loader2, Download, Plus, Trash2, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Exp = { role: string; company: string; period: string; bullets: string };
type Edu = { degree: string; school: string; period: string };
type Resume = {
  name: string; title: string; email: string; phone: string; location: string; summary: string;
  experience: Exp[]; education: Edu[]; skills: string; photo: string | null;
};

type Layout = "clean" | "modern" | "elegant" | "sidebar";
const LAYOUTS: { id: Layout; label: string; hint: string }[] = [
  { id: "clean", label: "Clean", hint: "Minimal, ATS-friendly" },
  { id: "modern", label: "Modern", hint: "Accent bars, bold" },
  { id: "elegant", label: "Elegant", hint: "Serif, centered" },
  { id: "sidebar", label: "Sidebar", hint: "Coloured column + photo" },
];

// Accent palette — layout × colour × font gives hundreds of distinct looks.
const COLORS: { id: string; hex: string; rgb: [number, number, number] }[] = [
  { id: "Indigo", hex: "#4f46e5", rgb: [0.31, 0.27, 0.9] },
  { id: "Blue", hex: "#2563eb", rgb: [0.15, 0.39, 0.92] },
  { id: "Teal", hex: "#0d9488", rgb: [0.05, 0.58, 0.53] },
  { id: "Emerald", hex: "#059669", rgb: [0.02, 0.59, 0.41] },
  { id: "Rose", hex: "#e11d48", rgb: [0.88, 0.11, 0.28] },
  { id: "Amber", hex: "#b45309", rgb: [0.71, 0.33, 0.04] },
  { id: "Slate", hex: "#334155", rgb: [0.2, 0.25, 0.33] },
  { id: "Violet", hex: "#7c3aed", rgb: [0.49, 0.23, 0.93] },
  { id: "Cyan", hex: "#0891b2", rgb: [0.03, 0.57, 0.7] },
  { id: "Charcoal", hex: "#111827", rgb: [0.07, 0.09, 0.15] },
];

const SEED: Resume = {
  name: "Alex Rivera", title: "Senior Product Designer", email: "alex@example.com",
  phone: "+1 555 0142", location: "Paris, France",
  summary: "Product designer with 8 years of experience leading design systems, end-to-end shipping and cross-functional collaboration.",
  experience: [
    { role: "Senior Product Designer", company: "Acme Inc.", period: "2021 — present",
      bullets: "Led the redesign of the core checkout flow (+18% conversion)\nBuilt the new design system used across 4 product surfaces\nMentored 3 junior designers" },
    { role: "Product Designer", company: "Globex", period: "2018 — 2021",
      bullets: "Owned the mobile onboarding (+22% activation)\nRan weekly user research and synthesized findings for the team" },
  ],
  education: [{ degree: "MA Interaction Design", school: "ENSCI Les Ateliers", period: "2014 — 2016" }],
  skills: "Figma, Design Systems, User Research, Prototyping, HTML/CSS, Workshop facilitation",
  photo: null,
};

/** Downscale a headshot to ≤512px JPEG so the PDF stays small. */
async function toPhotoDataUrl(file: File): Promise<string> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 512 / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  c.getContext("2d")!.drawImage(bmp, 0, 0, w, h); bmp.close();
  return c.toDataURL("image/jpeg", 0.9);
}

export function ResumeBuilderClient() {
  const [r, setR] = useState<Resume>(SEED);
  const [layout, setLayout] = useState<Layout>("clean");
  const [color, setColor] = useState(COLORS[0]);
  const [serif, setSerif] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof Resume>(k: K) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setR({ ...r, [k]: e.target.value });
  const setExp = (i: number, field: keyof Exp, v: string) => { const next = [...r.experience]; next[i] = { ...next[i], [field]: v }; setR({ ...r, experience: next }); };
  const setEdu = (i: number, field: keyof Edu, v: string) => { const next = [...r.education]; next[i] = { ...next[i], [field]: v }; setR({ ...r, education: next }); };
  const addExp = () => setR({ ...r, experience: [...r.experience, { role: "", company: "", period: "", bullets: "" }] });
  const delExp = (i: number) => setR({ ...r, experience: r.experience.filter((_, j) => j !== i) });
  const addEdu = () => setR({ ...r, education: [...r.education, { degree: "", school: "", period: "" }] });
  const delEdu = (i: number) => setR({ ...r, education: r.education.filter((_, j) => j !== i) });

  async function onPhoto(f: File | null) {
    if (!f) return;
    try { setR((s) => ({ ...s, photo: null })); const url = await toPhotoDataUrl(f); setR((s) => ({ ...s, photo: url })); }
    catch { /* ignore bad image */ }
  }

  async function exportPdf() {
    setBusy(true);
    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      const font = await doc.embedFont(serif ? StandardFonts.TimesRoman : StandardFonts.Helvetica);
      const bold = await doc.embedFont(serif ? StandardFonts.TimesRomanBold : StandardFonts.HelveticaBold);
      const accent = rgb(...color.rgb);
      const ink = rgb(0.12, 0.13, 0.16);
      const muted = rgb(0.42, 0.45, 0.5);
      const white = rgb(1, 1, 1);
      const softWhite = rgb(0.9, 0.92, 0.96);

      // Embed the photo once (JPEG from our downscale).
      let photo: Awaited<ReturnType<typeof doc.embedJpg>> | null = null;
      if (r.photo?.startsWith("data:image/jpeg")) {
        try { photo = await doc.embedJpg(r.photo); } catch { photo = null; }
      }

      const A4: [number, number] = [595, 842];
      const wrap = (text: string, size: number, f: typeof font, maxW: number): string[] => {
        const out: string[] = [];
        for (const para of text.split(/\n/)) {
          const words = para.split(/\s+/); let line = "";
          for (const w of words) {
            const c = line ? `${line} ${w}` : w;
            if (f.widthOfTextAtSize(c, size) > maxW) { if (line) out.push(line); line = w; } else line = c;
          }
          out.push(line);
        }
        return out;
      };

      if (layout === "sidebar") {
        // ── Two-column: coloured left rail (photo + contact + skills) ─────────
        const SW = 200; // sidebar width
        let page = doc.addPage(A4);
        const drawRail = () => page.drawRectangle({ x: 0, y: 0, width: SW, height: A4[1], color: accent });
        drawRail();
        // Left column cursor (white text inside the rail).
        const lx = 28, lW = SW - 56;
        let ly = A4[1] - 40;
        // Rail page-break: if the sidebar content (contact/skills/education)
        // overflows the page, start a new page and redraw the rail rather than
        // drawing into negative-y (which silently dropped the overflow).
        const ensureL = (h: number) => { if (ly - h < 40) { page = doc.addPage(A4); drawRail(); ly = A4[1] - 40; } };
        if (photo) {
          const s = 110; const px = (SW - s) / 2;
          page.drawImage(photo, { x: px, y: ly - s, width: s, height: s });
          ly -= s + 24;
        }
        const railText = (text: string, size: number, f: typeof font, gap: number, color = softWhite) => {
          for (const line of wrap(text, size, f, lW)) { ensureL(size + gap); page.drawText(line, { x: lx, y: ly, size, font: f, color }); ly -= size + gap; }
        };
        const railTitle = (t: string) => { ly -= 8; railText(t.toUpperCase(), 11, bold, 6, white); };
        railTitle("Contact");
        for (const c of [r.email, r.phone, r.location].filter(Boolean)) railText(c, 9.5, font, 4);
        if (r.skills.trim()) { railTitle("Skills"); for (const sk of r.skills.split(/,\s*/).filter(Boolean)) railText(`•  ${sk}`, 9.5, font, 4); }
        if (r.education.some((e) => e.degree || e.school)) {
          railTitle("Education");
          for (const e of r.education) { if (!e.degree && !e.school) continue; railText(e.degree, 9.5, bold, 2, white); if (e.school) railText(e.school, 9, font, 2); if (e.period) railText(e.period, 8.5, font, 6); }
        }

        // Right column cursor (ink text on white).
        const rx = SW + 32, rW = A4[0] - rx - 40;
        let ry = A4[1] - 56;
        const ensureR = (h: number) => { if (ry - h < 48) { page = doc.addPage(A4); drawRail(); ry = A4[1] - 56; } };
        const rt = (text: string, size: number, f: typeof font, gap: number, color = ink) => {
          for (const line of wrap(text, size, f, rW)) { ensureR(size + gap); page.drawText(line, { x: rx, y: ry, size, font: f, color }); ry -= size + gap; }
        };
        const rTitle = (t: string) => { ensureR(22); page.drawText(t.toUpperCase(), { x: rx, y: ry, size: 12, font: bold, color: accent }); ry -= 18; };
        rt(r.name || "Name", 24, bold, 4, ink);
        if (r.title) rt(r.title, 13, font, 12, muted);
        if (r.summary.trim()) { rTitle("Profile"); rt(r.summary, 10.5, font, 4); ry -= 6; }
        if (r.experience.some((e) => e.role || e.company)) {
          rTitle("Experience");
          for (const e of r.experience) {
            if (!e.role && !e.company) continue;
            ensureR(40);
            rt(`${e.role}${e.company ? "  ·  " + e.company : ""}`, 11.5, bold, 2);
            if (e.period) rt(e.period, 9.5, font, 4, muted);
            for (const b of e.bullets.split(/\n/).filter(Boolean)) rt(`•  ${b}`, 10.5, font, 3);
            ry -= 6;
          }
        }
      } else {
        // ── Single column (clean / modern / elegant) ──────────────────────────
        const left = 56, right = A4[0] - 56;
        let page = doc.addPage(A4);
        let y = 800;
        const centered = layout === "elegant";
        const newPage = () => { page = doc.addPage(A4); y = 800; };
        const ensure = (h: number) => { if (y - h < 56) newPage(); };
        // Photo: top-right thumbnail for clean/modern; centered above name for elegant.
        let headerMaxW = right - left;
        if (photo && !centered) {
          const s = 78; page.drawImage(photo, { x: right - s, y: y - s + 10, width: s, height: s }); headerMaxW = right - left - s - 16;
        }
        if (photo && centered) {
          const s = 84; page.drawImage(photo, { x: (A4[0] - s) / 2, y: y - s, width: s, height: s }); y -= s + 12;
        }
        const draw = (text: string, size: number, f: typeof font, color = ink, gap = 4, maxW = headerMaxW, center = false) => {
          for (const line of wrap(text, size, f, maxW)) {
            ensure(size + gap);
            const x = center ? (A4[0] - f.widthOfTextAtSize(line, size)) / 2 : left;
            page.drawText(line, { x, y, size, font: f, color });
            y -= size + gap;
          }
        };
        const sectionTitle = (labelText: string) => {
          ensure(22);
          if (layout === "modern") {
            page.drawRectangle({ x: left, y: y - 4, width: 4, height: 14, color: accent });
            page.drawText(labelText.toUpperCase(), { x: left + 10, y, size: 12, font: bold, color: accent });
            y -= 22;
          } else if (centered) {
            const t = labelText.toUpperCase();
            page.drawText(t, { x: (A4[0] - bold.widthOfTextAtSize(t, 11)) / 2, y, size: 11, font: bold, color: accent });
            y -= 18;
          } else {
            draw(labelText, 13, bold, ink, 4, right - left);
            page.drawLine({ start: { x: left, y: y - 2 }, end: { x: right, y: y - 2 }, thickness: 0.6, color: muted }); y -= 10;
          }
        };
        // Header
        draw(r.name || "Name", 24, bold, accent, 4, headerMaxW, centered);
        if (r.title) draw(r.title, 13, font, muted, 6, headerMaxW, centered);
        const contact = [r.email, r.phone, r.location].filter(Boolean).join("  ·  ");
        if (contact) draw(contact, 10, font, muted, 12, right - left, centered);
        if (r.summary.trim()) { sectionTitle("Summary"); draw(r.summary, 10.5, font, ink, 4, right - left); y -= 6; }
        if (r.experience.some((e) => e.role || e.company)) {
          sectionTitle("Experience");
          for (const e of r.experience) {
            if (!e.role && !e.company) continue;
            ensure(40);
            draw(`${e.role}${e.company ? "  ·  " + e.company : ""}`, 11.5, bold, ink, 2, right - left);
            if (e.period) draw(e.period, 9.5, font, muted, 4, right - left);
            for (const b of e.bullets.split(/\n/).filter(Boolean)) draw(`•  ${b}`, 10.5, font, ink, 3, right - left);
            y -= 6;
          }
        }
        if (r.education.some((e) => e.degree || e.school)) {
          sectionTitle("Education");
          for (const e of r.education) {
            if (!e.degree && !e.school) continue;
            ensure(28);
            draw(`${e.degree}${e.school ? "  ·  " + e.school : ""}`, 11, bold, ink, 2, right - left);
            if (e.period) draw(e.period, 9.5, font, muted, 4, right - left);
            y -= 4;
          }
        }
        if (r.skills.trim()) { sectionTitle("Skills"); draw(r.skills, 10.5, font, ink, 4, right - left); }
      }

      const bytes = await doc.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url;
      a.download = `${(r.name || "resume").replace(/\s+/g, "-").toLowerCase()}.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } finally { setBusy(false); }
  }

  const inputCls = "mt-1 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
  const label = (l: string) => <span className="text-xs font-medium text-ink-600">{l}</span>;

  return (
    <div className="space-y-6">
      {/* Template gallery */}
      <div className="rounded-xl border border-ink-100 bg-white p-4">
        <p className="text-sm font-semibold text-ink-800">Template</p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {LAYOUTS.map((l) => (
            <button key={l.id} onClick={() => setLayout(l.id)}
              className={cn("rounded-lg border p-3 text-left transition-colors", layout === l.id ? "border-brand-400 ring-2 ring-brand-100" : "border-ink-200 hover:border-ink-300")}>
              <span className="block text-sm font-medium text-ink-900">{l.label}</span>
              <span className="mt-0.5 block text-xs text-ink-400">{l.hint}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div>
            <p className="text-xs font-medium text-ink-600">Accent colour</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {COLORS.map((c) => (
                <button key={c.id} title={c.id} onClick={() => setColor(c)}
                  className={cn("h-6 w-6 rounded-full ring-offset-2 transition", color.id === c.id && "ring-2 ring-ink-400")}
                  style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-ink-600">Font</p>
            <div className="mt-1.5 inline-flex rounded-lg border border-ink-200 bg-white p-1">
              {[{ id: false, l: "Sans" }, { id: true, l: "Serif" }].map((f) => (
                <button key={f.l} onClick={() => setSerif(f.id)}
                  className={cn("rounded-md px-3 py-1 text-xs font-medium", serif === f.id ? "bg-brand-500 text-white" : "text-ink-600")}>
                  {f.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-ink-600">Photo {layout !== "sidebar" && "(optional)"}</p>
            <div className="mt-1.5 flex items-center gap-2">
              {r.photo ? (
                <span className="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-2 py-1 text-xs text-ink-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.photo} alt="" className="h-6 w-6 rounded object-cover" />
                  Added
                  <button onClick={() => setR((s) => ({ ...s, photo: null }))} className="text-ink-400 hover:text-red-600"><X className="h-3 w-3" /></button>
                </span>
              ) : (
                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-600 hover:border-ink-300">
                  <ImagePlus className="h-3.5 w-3.5" /> Upload headshot
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0] ?? null)} />
                </label>
              )}
            </div>
          </div>
          <Button onClick={exportPdf} disabled={busy} size="lg" className="ml-auto">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label>{label("Full name")}<input className={inputCls} value={r.name} onChange={set("name")} /></label>
        <label>{label("Title")}<input className={inputCls} value={r.title} onChange={set("title")} /></label>
        <label>{label("Email")}<input className={inputCls} value={r.email} onChange={set("email")} /></label>
        <label>{label("Phone")}<input className={inputCls} value={r.phone} onChange={set("phone")} /></label>
        <label className="sm:col-span-2">{label("Location")}<input className={inputCls} value={r.location} onChange={set("location")} /></label>
        <label className="sm:col-span-2">{label("Summary")}<textarea rows={3} className={inputCls} value={r.summary} onChange={set("summary")} /></label>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink-800">Experience</h3>
          <Button variant="outline" size="sm" onClick={addExp}><Plus className="h-3.5 w-3.5" /> Add</Button>
        </div>
        {r.experience.map((e, i) => (
          <div key={i} className="rounded-lg border border-ink-100 bg-white p-3">
            <div className="grid gap-2 sm:grid-cols-3">
              <label>{label("Role")}<input className={inputCls} value={e.role} onChange={(ev) => setExp(i, "role", ev.target.value)} /></label>
              <label>{label("Company")}<input className={inputCls} value={e.company} onChange={(ev) => setExp(i, "company", ev.target.value)} /></label>
              <label>{label("Period")}<input className={inputCls} value={e.period} onChange={(ev) => setExp(i, "period", ev.target.value)} /></label>
              <label className="sm:col-span-3">{label("Bullets (one per line)")}<textarea rows={3} className={inputCls} value={e.bullets} onChange={(ev) => setExp(i, "bullets", ev.target.value)} /></label>
            </div>
            <div className="mt-2 flex justify-end">
              <button onClick={() => delExp(i)} className="text-xs text-red-600 hover:underline"><Trash2 className="mr-1 inline h-3 w-3" />Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink-800">Education</h3>
          <Button variant="outline" size="sm" onClick={addEdu}><Plus className="h-3.5 w-3.5" /> Add</Button>
        </div>
        {r.education.map((e, i) => (
          <div key={i} className="grid gap-2 rounded-lg border border-ink-100 bg-white p-3 sm:grid-cols-3">
            <label>{label("Degree")}<input className={inputCls} value={e.degree} onChange={(ev) => setEdu(i, "degree", ev.target.value)} /></label>
            <label>{label("School")}<input className={inputCls} value={e.school} onChange={(ev) => setEdu(i, "school", ev.target.value)} /></label>
            <label>{label("Period")}<input className={inputCls} value={e.period} onChange={(ev) => setEdu(i, "period", ev.target.value)} /></label>
            <div className="sm:col-span-3 flex justify-end">
              <button onClick={() => delEdu(i)} className="text-xs text-red-600 hover:underline"><Trash2 className="mr-1 inline h-3 w-3" />Remove</button>
            </div>
          </div>
        ))}
      </div>

      <label className="block">{label("Skills (comma-separated)")}<textarea rows={2} className={inputCls} value={r.skills} onChange={set("skills")} /></label>

      <p className="text-xs text-ink-400">
        {LAYOUTS.length} layouts × {COLORS.length} colours × 2 fonts = hundreds of looks. Built entirely in your browser with pdf-lib — your data and photo never leave your device.
      </p>
    </div>
  );
}
