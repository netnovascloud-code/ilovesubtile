"use client";

import { useState } from "react";
import { Loader2, Download, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Exp = { role: string; company: string; period: string; bullets: string };
type Edu = { degree: string; school: string; period: string };
type Resume = {
  name: string; title: string; email: string; phone: string; location: string; summary: string;
  experience: Exp[]; education: Edu[]; skills: string;
};

type Template = "clean" | "modern";

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
};

export function ResumeBuilderClient() {
  const [r, setR] = useState<Resume>(SEED);
  const [template, setTemplate] = useState<Template>("clean");
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof Resume>(k: K) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setR({ ...r, [k]: e.target.value });

  const setExp = (i: number, field: keyof Exp, v: string) => {
    const next = [...r.experience]; next[i] = { ...next[i], [field]: v }; setR({ ...r, experience: next });
  };
  const setEdu = (i: number, field: keyof Edu, v: string) => {
    const next = [...r.education]; next[i] = { ...next[i], [field]: v }; setR({ ...r, education: next });
  };
  const addExp = () => setR({ ...r, experience: [...r.experience, { role: "", company: "", period: "", bullets: "" }] });
  const delExp = (i: number) => setR({ ...r, experience: r.experience.filter((_, j) => j !== i) });
  const addEdu = () => setR({ ...r, education: [...r.education, { degree: "", school: "", period: "" }] });
  const delEdu = (i: number) => setR({ ...r, education: r.education.filter((_, j) => j !== i) });

  async function exportPdf() {
    setBusy(true);
    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      const helv = await doc.embedFont(StandardFonts.Helvetica);
      const bold = await doc.embedFont(StandardFonts.HelveticaBold);
      const accent = template === "modern" ? rgb(0.31, 0.27, 0.9) : rgb(0.1, 0.1, 0.12);
      const ink = rgb(0.12, 0.13, 0.16);
      const muted = rgb(0.4, 0.42, 0.46);

      let page = doc.addPage([595, 842]); // A4
      const left = 56, right = 595 - 56;
      let y = 800;

      const newPage = () => { page = doc.addPage([595, 842]); y = 800; };
      const ensure = (h: number) => { if (y - h < 56) newPage(); };
      const wrap = (text: string, size: number, font: typeof helv, maxW: number): string[] => {
        const out: string[] = [];
        for (const para of text.split(/\n/)) {
          const words = para.split(/\s+/); let line = "";
          for (const w of words) {
            const c = line ? `${line} ${w}` : w;
            if (font.widthOfTextAtSize(c, size) > maxW) { if (line) out.push(line); line = w; }
            else line = c;
          }
          if (line) out.push(line);
        }
        return out;
      };
      const drawText = (text: string, opts: { size: number; font: typeof helv; color?: typeof ink; gap?: number; maxW?: number; x?: number }) => {
        const { size, font, color = ink, gap = 4, maxW = right - left } = opts;
        const x = opts.x ?? left;
        for (const line of wrap(text, size, font, maxW)) {
          ensure(size + gap);
          page.drawText(line, { x, y, size, font, color });
          y -= size + gap;
        }
      };
      const rule = () => {
        ensure(8);
        page.drawLine({ start: { x: left, y: y - 2 }, end: { x: right, y: y - 2 }, thickness: 0.6, color: muted });
        y -= 10;
      };
      const sectionTitle = (label: string) => {
        ensure(20);
        if (template === "modern") {
          page.drawRectangle({ x: left, y: y - 4, width: 4, height: 14, color: accent });
          page.drawText(label.toUpperCase(), { x: left + 10, y: y, size: 12, font: bold, color: accent });
          y -= 22;
        } else {
          drawText(label, { size: 13, font: bold, gap: 4, color: ink });
          rule();
        }
      };

      // Header
      drawText(r.name || "Name", { size: 24, font: bold, color: accent, gap: 4 });
      if (r.title) drawText(r.title, { size: 13, font: helv, color: muted, gap: 6 });
      const contact = [r.email, r.phone, r.location].filter(Boolean).join("  ·  ");
      if (contact) drawText(contact, { size: 10, font: helv, color: muted, gap: 12 });

      if (r.summary.trim()) { sectionTitle("Summary"); drawText(r.summary, { size: 10.5, font: helv, gap: 4 }); y -= 6; }

      if (r.experience.some((e) => e.role || e.company)) {
        sectionTitle("Experience");
        for (const e of r.experience) {
          if (!e.role && !e.company) continue;
          ensure(40);
          drawText(`${e.role}${e.company ? "  ·  " + e.company : ""}`, { size: 11.5, font: bold, gap: 2 });
          if (e.period) drawText(e.period, { size: 9.5, font: helv, color: muted, gap: 4 });
          for (const b of e.bullets.split(/\n/).filter(Boolean)) drawText(`•  ${b}`, { size: 10.5, font: helv, gap: 3 });
          y -= 6;
        }
      }

      if (r.education.some((e) => e.degree || e.school)) {
        sectionTitle("Education");
        for (const e of r.education) {
          if (!e.degree && !e.school) continue;
          ensure(28);
          drawText(`${e.degree}${e.school ? "  ·  " + e.school : ""}`, { size: 11, font: bold, gap: 2 });
          if (e.period) drawText(e.period, { size: 9.5, font: helv, color: muted, gap: 4 });
          y -= 4;
        }
      }

      if (r.skills.trim()) { sectionTitle("Skills"); drawText(r.skills, { size: 10.5, font: helv, gap: 4 }); }

      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url;
      a.download = `${(r.name || "resume").replace(/\s+/g, "-").toLowerCase()}.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } finally { setBusy(false); }
  }

  const inputCls = "mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
  const label = (l: string) => <span className="text-xs font-medium text-ink-600">{l}</span>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          {(["clean", "modern"] as const).map((t) => (
            <button key={t} onClick={() => setTemplate(t)}
              className={`rounded-md px-3 py-1 text-xs font-medium capitalize ${template === t ? "bg-brand-500 text-white" : "text-ink-600"}`}>
              {t}
            </button>
          ))}
        </div>
        <Button onClick={exportPdf} disabled={busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Download PDF
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label>{label("Full name")}<input className={inputCls + " w-full"} value={r.name} onChange={set("name")} /></label>
        <label>{label("Title")}<input className={inputCls + " w-full"} value={r.title} onChange={set("title")} /></label>
        <label>{label("Email")}<input className={inputCls + " w-full"} value={r.email} onChange={set("email")} /></label>
        <label>{label("Phone")}<input className={inputCls + " w-full"} value={r.phone} onChange={set("phone")} /></label>
        <label className="sm:col-span-2">{label("Location")}<input className={inputCls + " w-full"} value={r.location} onChange={set("location")} /></label>
        <label className="sm:col-span-2">{label("Summary")}<textarea rows={3} className={inputCls + " w-full"} value={r.summary} onChange={set("summary")} /></label>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink-800">Experience</h3>
          <Button variant="outline" size="sm" onClick={addExp}><Plus className="h-3.5 w-3.5" /> Add</Button>
        </div>
        {r.experience.map((e, i) => (
          <div key={i} className="rounded-lg border border-ink-100 bg-white p-3">
            <div className="grid gap-2 sm:grid-cols-3">
              <label className="sm:col-span-1">{label("Role")}<input className={inputCls + " w-full"} value={e.role} onChange={(ev) => setExp(i, "role", ev.target.value)} /></label>
              <label className="sm:col-span-1">{label("Company")}<input className={inputCls + " w-full"} value={e.company} onChange={(ev) => setExp(i, "company", ev.target.value)} /></label>
              <label className="sm:col-span-1">{label("Period")}<input className={inputCls + " w-full"} value={e.period} onChange={(ev) => setExp(i, "period", ev.target.value)} /></label>
              <label className="sm:col-span-3">{label("Bullets (one per line)")}<textarea rows={3} className={inputCls + " w-full"} value={e.bullets} onChange={(ev) => setExp(i, "bullets", ev.target.value)} /></label>
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
            <label>{label("Degree")}<input className={inputCls + " w-full"} value={e.degree} onChange={(ev) => setEdu(i, "degree", ev.target.value)} /></label>
            <label>{label("School")}<input className={inputCls + " w-full"} value={e.school} onChange={(ev) => setEdu(i, "school", ev.target.value)} /></label>
            <label>{label("Period")}<input className={inputCls + " w-full"} value={e.period} onChange={(ev) => setEdu(i, "period", ev.target.value)} /></label>
            <div className="sm:col-span-3 flex justify-end">
              <button onClick={() => delEdu(i)} className="text-xs text-red-600 hover:underline"><Trash2 className="mr-1 inline h-3 w-3" />Remove</button>
            </div>
          </div>
        ))}
      </div>

      <label className="block">{label("Skills (comma-separated)")}<textarea rows={2} className={inputCls + " w-full"} value={r.skills} onChange={set("skills")} /></label>

      <p className="text-xs text-ink-400">
        Built entirely in your browser. The PDF is generated client-side with pdf-lib — your data never leaves your device.
      </p>
    </div>
  );
}
