"use client";

import { useState } from "react";
import { Image as ImageIcon, Loader2, Download, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { callVisionJson } from "@/lib/vision-client";

type Card = {
  name: string | null; title: string | null; company: string | null;
  email: string | null; phone: string | null; website: string | null; address: string | null;
};

function vcardEscape(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

function buildVcard(c: Card): string {
  const lines = ["BEGIN:VCARD", "VERSION:3.0"];
  if (c.name) lines.push(`FN:${vcardEscape(c.name)}`);
  if (c.title) lines.push(`TITLE:${vcardEscape(c.title)}`);
  if (c.company) lines.push(`ORG:${vcardEscape(c.company)}`);
  if (c.email) lines.push(`EMAIL;TYPE=WORK:${c.email.trim()}`);
  if (c.phone) lines.push(`TEL;TYPE=WORK,VOICE:${c.phone.trim()}`);
  if (c.website) lines.push(`URL:${c.website.trim()}`);
  if (c.address) lines.push(`ADR;TYPE=WORK:;;${vcardEscape(c.address)};;;;`);
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

export function BusinessCardScannerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [card, setCard] = useState<Card | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (!file) return;
    setBusy(true); setError(null); setCard(null);
    try {
      setCard(await callVisionJson<Card>("business-card-scanner", "business-card", file));
    } catch (e) {
      setError((e as Error).message);
    } finally { setBusy(false); }
  }

  const downloadVcf = () => {
    if (!card) return;
    const blob = new Blob([buildVcard(card)], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `${(card.name ?? "contact").replace(/\s+/g, "-").toLowerCase()}.vcf`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  const row = (label: string, v: string | null) => (
    <tr className="border-b border-ink-100 last:border-0">
      <td className="bg-ink-50/50 px-3 py-2 font-medium text-ink-600 w-1/3">{label}</td>
      <td className="px-3 py-2 text-ink-900">{v ?? <span className="text-ink-400">—</span>}</td>
    </tr>
  );

  return (
    <div className="space-y-5">
      <MiniDrop
        label="Business card photo"
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setCard(null); }}
        current={file}
      />

      {file && (
        <Button onClick={run} disabled={busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />}
          {busy ? "Reading the card…" : "Extract contact details"}
        </Button>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {card && (
        <>
          <div className="overflow-hidden rounded-lg border border-ink-100">
            <table className="w-full text-sm">
              <tbody>
                {row("Name", card.name)} {row("Title", card.title)} {row("Company", card.company)}
                {row("Email", card.email)} {row("Phone", card.phone)} {row("Website", card.website)} {row("Address", card.address)}
              </tbody>
            </table>
          </div>
          <Button onClick={downloadVcf} size="lg">
            <Download className="h-4 w-4" /> Download vCard (.vcf)
          </Button>
        </>
      )}

      <p className="text-xs text-ink-400">Imports cleanly into Apple Contacts, Google Contacts and Outlook. Powered by AI vision.</p>
    </div>
  );
}
