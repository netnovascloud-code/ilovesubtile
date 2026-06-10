"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

const TRANSFORMS: { id: string; label: string; fn: (s: string) => string }[] = [
  { id: "upper", label: "UPPERCASE", fn: (s) => s.toLocaleUpperCase() },
  { id: "lower", label: "lowercase", fn: (s) => s.toLocaleLowerCase() },
  { id: "title", label: "Title Case", fn: (s) => s.replace(/\w\S*/g, (w) => w[0].toLocaleUpperCase() + w.slice(1).toLocaleLowerCase()) },
  { id: "sentence", label: "Sentence case", fn: (s) => s.toLocaleLowerCase().replace(/(^|[.!?]\s+)([a-z])/g, (_m, p, c) => p + c.toLocaleUpperCase()) },
  { id: "camel", label: "camelCase", fn: (s) => words(s).map((w, i) => i === 0 ? w.toLocaleLowerCase() : capit(w)).join("") },
  { id: "pascal", label: "PascalCase", fn: (s) => words(s).map(capit).join("") },
  { id: "snake", label: "snake_case", fn: (s) => words(s).map((w) => w.toLocaleLowerCase()).join("_") },
  { id: "kebab", label: "kebab-case", fn: (s) => words(s).map((w) => w.toLocaleLowerCase()).join("-") },
  { id: "constant", label: "CONSTANT_CASE", fn: (s) => words(s).map((w) => w.toLocaleUpperCase()).join("_") },
  { id: "invert", label: "iNVERT cASE", fn: (s) => s.split("").map((c) => c === c.toLocaleLowerCase() ? c.toLocaleUpperCase() : c.toLocaleLowerCase()).join("") },
];

function words(s: string): string[] {
  return s
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}
function capit(w: string): string {
  return w[0].toLocaleUpperCase() + w.slice(1).toLocaleLowerCase();
}

const T: Record<string, Record<string, string>> = {
  en: {
    placeholder: "Paste any text…",
    words: "words",
    characters: "characters",
    lines: "lines",
    copy: "Copy",
    copied: "Copied",
    privacy: "100% in your browser — your text never leaves your device.",
  },
  fr: {
    placeholder: "Collez n'importe quel texte…",
    words: "mots",
    characters: "caractères",
    lines: "lignes",
    copy: "Copier",
    copied: "Copié",
    privacy: "100 % dans votre navigateur — votre texte ne quitte jamais votre appareil.",
  },
  es: {
    placeholder: "Pega cualquier texto…",
    words: "palabras",
    characters: "caracteres",
    lines: "líneas",
    copy: "Copiar",
    copied: "Copiado",
    privacy: "100 % en tu navegador — tu texto nunca sale de tu dispositivo.",
  },
  pt: {
    placeholder: "Cole qualquer texto…",
    words: "palavras",
    characters: "caracteres",
    lines: "linhas",
    copy: "Copiar",
    copied: "Copiado",
    privacy: "100% no seu navegador — o seu texto nunca sai do dispositivo.",
  },
  de: {
    placeholder: "Text einfügen…",
    words: "Wörter",
    characters: "Zeichen",
    lines: "Zeilen",
    copy: "Kopieren",
    copied: "Kopiert",
    privacy: "100 % im Browser — Ihr Text verlässt Ihr Gerät nie.",
  },
  it: {
    placeholder: "Incolla qualsiasi testo…",
    words: "parole",
    characters: "caratteri",
    lines: "righe",
    copy: "Copia",
    copied: "Copiato",
    privacy: "100% nel tuo browser — il tuo testo non lascia mai il dispositivo.",
  },
  nl: {
    placeholder: "Plak tekst hier…",
    words: "woorden",
    characters: "tekens",
    lines: "regels",
    copy: "Kopiëren",
    copied: "Gekopieerd",
    privacy: "100% in uw browser — uw tekst verlaat uw apparaat nooit.",
  },
  ja: {
    placeholder: "テキストを貼り付け…",
    words: "語",
    characters: "文字",
    lines: "行",
    copy: "コピー",
    copied: "コピー済み",
    privacy: "ブラウザ内で 100% 処理 — テキストはデバイスから出ません。",
  },
  zh: {
    placeholder: "粘贴任意文本…",
    words: "词",
    characters: "字符",
    lines: "行",
    copy: "复制",
    copied: "已复制",
    privacy: "在您的浏览器中 100% 处理 — 您的文本永远不会离开您的设备。",
  },
  ko: {
    placeholder: "텍스트를 붙여넣기…",
    words: "단어",
    characters: "문자",
    lines: "줄",
    copy: "복사",
    copied: "복사됨",
    privacy: "브라우저에서 100% 처리 — 텍스트는 기기를 절대 벗어나지 않습니다.",
  },
  ar: {
    placeholder: "الصق أي نص…",
    words: "كلمات",
    characters: "أحرف",
    lines: "أسطر",
    copy: "نسخ",
    copied: "تم النسخ",
    privacy: "100٪ في متصفحك — نصك لا يغادر جهازك أبداً.",
  },
  ru: {
    placeholder: "Вставьте любой текст…",
    words: "слов",
    characters: "символов",
    lines: "строк",
    copy: "Копировать",
    copied: "Скопировано",
    privacy: "100% в вашем браузере — текст никогда не покидает устройство.",
  },
  hi: {
    placeholder: "कोई भी टेक्स्ट पेस्ट करें…",
    words: "शब्द",
    characters: "अक्षर",
    lines: "पंक्तियाँ",
    copy: "कॉपी करें",
    copied: "कॉपी हो गया",
    privacy: "आपके ब्राउज़र में 100% — आपका टेक्स्ट कभी डिवाइस नहीं छोड़ता।",
  },
  tr: {
    placeholder: "Herhangi bir metin yapıştırın…",
    words: "kelime",
    characters: "karakter",
    lines: "satır",
    copy: "Kopyala",
    copied: "Kopyalandı",
    privacy: "Tarayıcınızda %100 işlem — metniniz asla cihazınızı terk etmez.",
  },
  id: {
    placeholder: "Tempel teks apa saja…",
    words: "kata",
    characters: "karakter",
    lines: "baris",
    copy: "Salin",
    copied: "Disalin",
    privacy: "100% di browser Anda — teks Anda tidak pernah meninggalkan perangkat.",
  },
  vi: {
    placeholder: "Dán bất kỳ văn bản nào…",
    words: "từ",
    characters: "ký tự",
    lines: "dòng",
    copy: "Sao chép",
    copied: "Đã sao chép",
    privacy: "100% trong trình duyệt của bạn — văn bản của bạn không bao giờ rời khỏi thiết bị.",
  },
  sv: {
    placeholder: "Klistra in text…",
    words: "ord",
    characters: "tecken",
    lines: "rader",
    copy: "Kopiera",
    copied: "Kopierat",
    privacy: "100 % i din webbläsare — din text lämnar aldrig din enhet.",
  },
  pl: {
    placeholder: "Wklej dowolny tekst…",
    words: "słów",
    characters: "znaków",
    lines: "wierszy",
    copy: "Kopiuj",
    copied: "Skopiowano",
    privacy: "100% w Twojej przeglądarce — Twój tekst nigdy nie opuszcza urządzenia.",
  },
  uk: {
    placeholder: "Вставте будь-який текст…",
    words: "слів",
    characters: "символів",
    lines: "рядків",
    copy: "Копіювати",
    copied: "Скопійовано",
    privacy: "100% у вашому браузері — текст ніколи не залишає пристрій.",
  },
  cs: {
    placeholder: "Vložte libovolný text…",
    words: "slov",
    characters: "znaků",
    lines: "řádků",
    copy: "Kopírovat",
    copied: "Zkopírováno",
    privacy: "100 % ve vašem prohlížeči — váš text nikdy neopustí vaše zařízení.",
  },
};

export function CaseConverterClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [text, setText] = useState("The Quick Brown Fox jumps over the lazy_dog-and-RUNS away.");
  const [copied, setCopied] = useState<string | null>(null);
  const stats = useMemo(() => ({
    chars: text.length,
    words: words(text).length,
    lines: text ? text.split("\n").length : 0,
  }), [text]);

  async function copy(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 1200);
    } catch {}
  }

  return (
    <div className="space-y-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={s.placeholder}
        className="h-44 w-full resize-y rounded-lg border border-ink-200 bg-white p-4 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
        <span>{stats.words.toLocaleString()} {s.words}</span>
        <span>·</span>
        <span>{stats.chars.toLocaleString()} {s.characters}</span>
        <span>·</span>
        <span>{stats.lines.toLocaleString()} {s.lines}</span>
      </div>

      <ul className="space-y-2">
        {TRANSFORMS.map((t) => {
          const value = text ? t.fn(text) : "";
          return (
            <li key={t.id} className="flex items-start gap-3 rounded-lg border border-ink-100 bg-white p-3">
              <span className="w-32 shrink-0 text-xs font-semibold uppercase tracking-wide text-ink-400">{t.label}</span>
              <span className="flex-1 break-all font-mono text-sm text-ink-800">{value || <span className="text-ink-300">—</span>}</span>
              <Button size="sm" variant="outline" disabled={!value} onClick={() => copy(t.id, value)}>
                {copied === t.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === t.id ? s.copied : s.copy}
              </Button>
            </li>
          );
        })}
      </ul>

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
