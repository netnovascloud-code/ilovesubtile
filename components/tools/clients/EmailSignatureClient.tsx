"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Code } from "lucide-react";

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
}

/** Table-based HTML — the only layout email clients render reliably. */
function buildSignature(f: {
  name: string; title: string; company: string; email: string;
  phone: string; website: string; accent: string;
}): string {
  const a = /^#[0-9a-f]{6}$/i.test(f.accent) ? f.accent : "#4f46e5";
  const line = (label: string, value: string, href?: string) =>
    value
      ? `<tr><td style="padding:1px 0;font-size:12px;color:#444;">${label ? `<span style="color:#888;">${esc(label)} </span>` : ""}${href ? `<a href="${esc(href)}" style="color:${a};text-decoration:none;">${esc(value)}</a>` : esc(value)}</td></tr>`
      : "";
  return `<table cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;">
  <tr>
    <td style="border-left:3px solid ${a};padding:2px 0 2px 12px;">
      <table cellpadding="0" cellspacing="0">
        <tr><td style="font-size:16px;font-weight:bold;color:#111;padding-bottom:2px;">${esc(f.name) || "Your Name"}</td></tr>
        ${f.title || f.company ? `<tr><td style="font-size:12px;color:#666;padding-bottom:4px;">${esc(f.title)}${f.title && f.company ? " · " : ""}${esc(f.company)}</td></tr>` : ""}
        ${line("✉", f.email, f.email ? `mailto:${f.email}` : undefined)}
        ${line("☎", f.phone, f.phone ? `tel:${f.phone.replace(/[^+\d]/g, "")}` : undefined)}
        ${line("🌐", f.website, f.website ? (/^https?:\/\//.test(f.website) ? f.website : `https://${f.website}`) : undefined)}
      </table>
    </td>
  </tr>
</table>`;
}

export function EmailSignatureClient() {
  const [f, setF] = useState({
    name: "Alex Rivera", title: "Product Designer", company: "Acme Inc.",
    email: "alex@acme.com", phone: "+1 555 0142", website: "acme.com", accent: "#4f46e5",
  });
  const [copied, setCopied] = useState<"html" | "rich" | null>(null);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  const html = useMemo(() => buildSignature(f), [f]);

  const copyHtml = () => { navigator.clipboard?.writeText(html); setCopied("html"); setTimeout(() => setCopied(null), 1400); };
  const copyRich = async () => {
    try {
      const blob = new Blob([html], { type: "text/html" });
      // Rich copy: pastes the rendered signature straight into Gmail/Outlook.
      await navigator.clipboard.write([new ClipboardItem({ "text/html": blob, "text/plain": new Blob([html], { type: "text/plain" }) })]);
      setCopied("rich"); setTimeout(() => setCopied(null), 1400);
    } catch { copyHtml(); }
  };

  const field = (k: keyof typeof f, label: string, type = "text") => (
    <label className="flex flex-col text-xs font-medium text-ink-600">
      {label}
      <input type={type} value={f[k]} onChange={set(k)}
        className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
    </label>
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {field("name", "Full name")}
        {field("title", "Job title")}
        {field("company", "Company")}
        {field("email", "Email", "email")}
        {field("phone", "Phone")}
        {field("website", "Website")}
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Accent colour
          <input type="color" value={/^#[0-9a-f]{6}$/i.test(f.accent) ? f.accent : "#4f46e5"} onChange={set("accent")}
            className="mt-1 h-9 w-16 cursor-pointer rounded-md border border-ink-200 bg-white p-1" />
        </label>
      </div>

      <div>
        <div className="mb-2 text-xs font-medium text-ink-600">Preview</div>
        <div className="rounded-lg border border-ink-100 bg-white p-5" dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={copyRich} className="inline-flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600">
          {copied === "rich" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          Copy signature
        </button>
        <button onClick={copyHtml} className="inline-flex items-center gap-2 rounded-md border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 hover:border-brand-300">
          {copied === "html" ? <Check className="h-4 w-4" /> : <Code className="h-4 w-4" />}
          Copy HTML
        </button>
      </div>

      <p className="text-xs text-ink-400">
        “Copy signature” pastes the styled block straight into Gmail/Outlook; “Copy HTML” gives the raw source. Built in your browser.
      </p>
    </div>
  );
}
