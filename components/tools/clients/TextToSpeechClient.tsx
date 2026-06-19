"use client";

import { useState } from "react";
import Link from "next/link";
import { AudioLines, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { callTool } from "@/lib/tool-api";
import { useLocale } from "@/hooks/useLocale";
import { localePath, type Locale } from "@/lib/i18n/locales";

const VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"] as const;

type Strings = {
  placeholder: string;
  voice: string;
  generate: string;
  generating: string;
  download: string;
  chars: string; // "{n} characters"
  comingSoon: string;
  signIn: string;
  signInCta: string;
  quota: string;
  upgradeCta: string;
  tooLong: string; // "{n}"
  failed: string;
  privacy: string;
};

const EN: Strings = {
  placeholder: "Type or paste the text to turn into speech…",
  voice: "Voice",
  generate: "Generate speech",
  generating: "Generating…",
  download: "Download MP3",
  chars: "{n} characters",
  comingSoon: "Text-to-speech is coming soon — it's not activated yet.",
  signIn: "Sign in to generate speech (it uses one AI run).",
  signInCta: "Sign in",
  quota: "You've reached your AI quota for now.",
  upgradeCta: "See plans",
  tooLong: "Text is too long for your plan (max {n} characters).",
  failed: "Could not generate the audio. Please try again.",
  privacy: "Processed on our servers via the AI provider, then discarded — nothing is stored.",
};

const FR: Strings = {
  placeholder: "Saisissez ou collez le texte à transformer en voix…",
  voice: "Voix",
  generate: "Générer la voix",
  generating: "Génération…",
  download: "Télécharger le MP3",
  chars: "{n} caractères",
  comingSoon: "La synthèse vocale arrive bientôt — elle n'est pas encore activée.",
  signIn: "Connectez-vous pour générer la voix (cela utilise une exécution IA).",
  signInCta: "Se connecter",
  quota: "Vous avez atteint votre quota IA pour le moment.",
  upgradeCta: "Voir les offres",
  tooLong: "Texte trop long pour votre offre (max {n} caractères).",
  failed: "Impossible de générer l'audio. Réessayez.",
  privacy: "Traité sur nos serveurs via le fournisseur IA, puis supprimé — rien n'est stocké.",
};

const TABLE: Partial<Record<Locale, Strings>> = { en: EN, fr: FR };

export function TextToSpeechClient() {
  const locale = useLocale();
  const t = TABLE[locale] ?? EN;
  const [text, setText] = useState("");
  const [voice, setVoice] = useState<(typeof VOICES)[number]>("alloy");
  const [busy, setBusy] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [note, setNote] = useState<{ kind: "info" | "signin" | "quota" | "error"; text: string } | null>(null);

  async function generate() {
    if (!text.trim() || busy) return;
    setBusy(true);
    setNote(null);
    if (audioUrl) { URL.revokeObjectURL(audioUrl); setAudioUrl(null); }
    try {
      const res = await callTool("text-to-speech", { text: text.trim(), voice });
      if (!res.ok) {
        const data = await res.json().catch(() => ({} as { error?: string; limit?: number }));
        if (data.error === "not_configured") setNote({ kind: "info", text: t.comingSoon });
        else if (data.error === "auth_required") setNote({ kind: "signin", text: t.signIn });
        else if (data.error === "daily_limit" || data.error === "monthly_limit") setNote({ kind: "quota", text: t.quota });
        else if (data.error === "text_too_long") setNote({ kind: "error", text: t.tooLong.replace("{n}", String(data.limit ?? "")) });
        else setNote({ kind: "error", text: t.failed });
        return;
      }
      const blob = await res.blob();
      setAudioUrl(URL.createObjectURL(blob));
    } catch {
      setNote({ kind: "error", text: t.failed });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.placeholder}
        rows={8}
        className="w-full resize-y rounded-xl border border-ink-200 bg-white p-4 text-sm text-ink-800 outline-none focus:border-brand-400"
      />
      <div className="flex flex-wrap items-end gap-4">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-ink-700">{t.voice}</span>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value as (typeof VOICES)[number])}
            className="rounded-md border border-ink-200 bg-white px-3 py-2 text-sm capitalize"
          >
            {VOICES.map((v) => <option key={v} value={v} className="capitalize">{v}</option>)}
          </select>
        </label>
        <Button onClick={generate} disabled={busy || !text.trim()}>
          {busy ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <AudioLines className="mr-1.5 h-4 w-4" />}
          {busy ? t.generating : t.generate}
        </Button>
        <span className="text-xs text-ink-400">{t.chars.replace("{n}", text.length.toLocaleString(locale))}</span>
      </div>

      {note && (
        <div className={cnNote(note.kind)}>
          <span>{note.text}</span>
          {note.kind === "signin" && <Link href={`/login`} className="font-semibold underline">{t.signInCta}</Link>}
          {note.kind === "quota" && <Link href={localePath(locale, "pricing")} className="font-semibold underline">{t.upgradeCta}</Link>}
        </div>
      )}

      {audioUrl && (
        <div className="space-y-3 rounded-xl border border-ink-100 bg-white p-4">
          <audio controls src={audioUrl} className="w-full" />
          <a
            href={audioUrl}
            download="speech.mp3"
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-100"
          >
            <Download className="h-4 w-4" /> {t.download}
          </a>
        </div>
      )}

      <p className="text-xs text-ink-400">{t.privacy}</p>
    </div>
  );
}

function cnNote(kind: "info" | "signin" | "quota" | "error"): string {
  const base = "flex flex-wrap items-center gap-2 rounded-lg px-3 py-2.5 text-sm";
  if (kind === "error") return `${base} bg-red-50 text-red-700`;
  if (kind === "quota" || kind === "signin") return `${base} bg-amber-50 text-amber-800`;
  return `${base} bg-ink-50 text-ink-600`;
}
