"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Check, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

/** UUID v7 (time-ordered) generator — pure JS, no deps. */
function uuidv7(): string {
  const ms = Date.now();
  const rand = new Uint8Array(10);
  crypto.getRandomValues(rand);
  rand[0] = (rand[0] & 0x0f) | 0x70; // version 7
  rand[2] = (rand[2] & 0x3f) | 0x80; // variant RFC 4122
  const hex = (n: number, w: number) => n.toString(16).padStart(w, "0");
  const msHex = ms.toString(16).padStart(12, "0");
  const bytes = Array.from(rand, (b) => hex(b, 2)).join("");
  return `${msHex.slice(0, 8)}-${msHex.slice(8, 12)}-${bytes.slice(0, 4)}-${bytes.slice(4, 8)}-${bytes.slice(8, 20)}`;
}

const COUNTS = [1, 10, 100, 1000] as const;

const T: Record<string, Record<string, string>> = {
  en: {
    howMany: "How many",
    hyphens: "Hyphens",
    uppercase: "Uppercase",
    regenerate: "Regenerate",
    copyAll: "Copy all",
    copied: "Copied",
    privacy: "100% in your browser via Web Crypto — never sent anywhere.",
  },
  fr: {
    howMany: "Combien",
    hyphens: "Tirets",
    uppercase: "Majuscules",
    regenerate: "Régénérer",
    copyAll: "Tout copier",
    copied: "Copié",
    privacy: "100 % dans votre navigateur via Web Crypto — jamais envoyé nulle part.",
  },
  es: {
    howMany: "Cuántos",
    hyphens: "Guiones",
    uppercase: "Mayúsculas",
    regenerate: "Regenerar",
    copyAll: "Copiar todo",
    copied: "Copiado",
    privacy: "100 % en tu navegador vía Web Crypto — nunca enviado a ningún lado.",
  },
  pt: {
    howMany: "Quantos",
    hyphens: "Hífens",
    uppercase: "Maiúsculas",
    regenerate: "Regenerar",
    copyAll: "Copiar tudo",
    copied: "Copiado",
    privacy: "100% no seu navegador via Web Crypto — nunca enviado para nenhum lugar.",
  },
  de: {
    howMany: "Wie viele",
    hyphens: "Bindestriche",
    uppercase: "Großbuchstaben",
    regenerate: "Neu generieren",
    copyAll: "Alle kopieren",
    copied: "Kopiert",
    privacy: "100 % im Browser via Web Crypto — niemals irgendwohin gesendet.",
  },
  it: {
    howMany: "Quanti",
    hyphens: "Trattini",
    uppercase: "Maiuscolo",
    regenerate: "Rigenera",
    copyAll: "Copia tutto",
    copied: "Copiato",
    privacy: "100% nel tuo browser tramite Web Crypto — mai inviato da nessuna parte.",
  },
  nl: {
    howMany: "Hoeveel",
    hyphens: "Koppeltekens",
    uppercase: "Hoofdletters",
    regenerate: "Opnieuw genereren",
    copyAll: "Alles kopiëren",
    copied: "Gekopieerd",
    privacy: "100% in uw browser via Web Crypto — nooit ergens naartoe gestuurd.",
  },
  ja: {
    howMany: "数量",
    hyphens: "ハイフン",
    uppercase: "大文字",
    regenerate: "再生成",
    copyAll: "すべてコピー",
    copied: "コピー済み",
    privacy: "Web Crypto を使用してブラウザ内で 100% 処理 — どこにも送信されません。",
  },
  zh: {
    howMany: "数量",
    hyphens: "连字符",
    uppercase: "大写",
    regenerate: "重新生成",
    copyAll: "全部复制",
    copied: "已复制",
    privacy: "通过 Web Crypto 在您的浏览器中 100% 处理 — 从不发送到任何地方。",
  },
  ko: {
    howMany: "수량",
    hyphens: "하이픈",
    uppercase: "대문자",
    regenerate: "재생성",
    copyAll: "전부 복사",
    copied: "복사됨",
    privacy: "Web Crypto를 통해 브라우저에서 100% 처리 — 어디에도 전송되지 않습니다.",
  },
  ar: {
    howMany: "الكمية",
    hyphens: "شرطات",
    uppercase: "أحرف كبيرة",
    regenerate: "إعادة التوليد",
    copyAll: "نسخ الكل",
    copied: "تم النسخ",
    privacy: "100٪ في متصفحك عبر Web Crypto — لا يُرسل إلى أي مكان.",
  },
  ru: {
    howMany: "Количество",
    hyphens: "Дефисы",
    uppercase: "Верхний регистр",
    regenerate: "Пересоздать",
    copyAll: "Копировать всё",
    copied: "Скопировано",
    privacy: "100% в вашем браузере через Web Crypto — никуда не отправляется.",
  },
  hi: {
    howMany: "कितने",
    hyphens: "हाइफ़न",
    uppercase: "बड़े अक्षर",
    regenerate: "पुनर्निर्मित करें",
    copyAll: "सभी कॉपी करें",
    copied: "कॉपी हो गया",
    privacy: "Web Crypto के माध्यम से आपके ब्राउज़र में 100% — कहीं नहीं भेजा जाता।",
  },
  tr: {
    howMany: "Kaç tane",
    hyphens: "Kısa çizgiler",
    uppercase: "Büyük harf",
    regenerate: "Yeniden oluştur",
    copyAll: "Tümünü kopyala",
    copied: "Kopyalandı",
    privacy: "Tarayıcınızda Web Crypto üzerinden %100 işlem — hiçbir yere gönderilmez.",
  },
  id: {
    howMany: "Berapa banyak",
    hyphens: "Tanda hubung",
    uppercase: "Huruf kapital",
    regenerate: "Buat ulang",
    copyAll: "Salin semua",
    copied: "Disalin",
    privacy: "100% di browser Anda via Web Crypto — tidak pernah dikirim ke mana pun.",
  },
  vi: {
    howMany: "Bao nhiêu",
    hyphens: "Dấu gạch ngang",
    uppercase: "Chữ hoa",
    regenerate: "Tạo lại",
    copyAll: "Sao chép tất cả",
    copied: "Đã sao chép",
    privacy: "100% trong trình duyệt của bạn qua Web Crypto — không bao giờ gửi đi đâu.",
  },
  sv: {
    howMany: "Hur många",
    hyphens: "Bindestreck",
    uppercase: "Versaler",
    regenerate: "Generera om",
    copyAll: "Kopiera alla",
    copied: "Kopierat",
    privacy: "100 % i din webbläsare via Web Crypto — skickas aldrig någonstans.",
  },
  pl: {
    howMany: "Ile",
    hyphens: "Myślniki",
    uppercase: "Wielkie litery",
    regenerate: "Generuj ponownie",
    copyAll: "Kopiuj wszystko",
    copied: "Skopiowano",
    privacy: "100% w Twojej przeglądarce przez Web Crypto — nigdy nigdzie nie wysyłane.",
  },
  uk: {
    howMany: "Скільки",
    hyphens: "Дефіси",
    uppercase: "Верхній регістр",
    regenerate: "Перегенерувати",
    copyAll: "Копіювати все",
    copied: "Скопійовано",
    privacy: "100% у вашому браузері через Web Crypto — нікуди не надсилається.",
  },
  cs: {
    howMany: "Kolik",
    hyphens: "Pomlčky",
    uppercase: "Velká písmena",
    regenerate: "Regenerovat",
    copyAll: "Kopírovat vše",
    copied: "Zkopírováno",
    privacy: "100 % ve vašem prohlížeči přes Web Crypto — nikam neposíláno.",
  },
};

export function UuidGeneratorClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [version, setVersion] = useState<"v4" | "v7">("v4");
  const [count, setCount] = useState<(typeof COUNTS)[number]>(10);
  const [hyphens, setHyphens] = useState(true);
  const [upper, setUpper] = useState(false);
  const [seed, setSeed] = useState(0);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedOne, setCopiedOne] = useState<number | null>(null);
  // SSR can't run crypto.randomUUID; we'd otherwise hydration-mismatch when
  // the client generates fresh ids. Gate the list on `mounted` so SSR ships
  // an empty <ul> and the client populates it after hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const ids = useMemo(() => {
    void seed;
    if (!mounted) return [];
    const make = version === "v7" ? uuidv7 : () => crypto.randomUUID();
    const list = Array.from({ length: count }, make);
    return list.map((id) => {
      let str = id;
      if (!hyphens) str = str.replace(/-/g, "");
      if (upper) str = str.toUpperCase();
      return str;
    });
  }, [version, count, hyphens, upper, seed, mounted]);

  async function copyOne(i: number) {
    try {
      await navigator.clipboard.writeText(ids[i]);
      setCopiedOne(i);
      setTimeout(() => setCopiedOne((c) => (c === i ? null : c)), 1000);
    } catch {}
  }
  async function copyAll() {
    try {
      await navigator.clipboard.writeText(ids.join("\n"));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1200);
    } catch {}
  }
  function downloadAll() {
    const blob = new Blob([ids.join("\n") + "\n"], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uuids-${version}-${ids.length}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3 rounded-lg border border-ink-100 bg-white p-4">
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          {(["v4", "v7"] as const).map((v) => (
            <button key={v} onClick={() => setVersion(v)} className={`rounded-md px-3 py-1 text-xs font-medium ${version === v ? "bg-brand-500 text-white" : "text-ink-600"}`}>
              UUID {v}
            </button>
          ))}
        </div>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.howMany}
          <select value={count} onChange={(e) => setCount(Number(e.target.value) as (typeof COUNTS)[number])}
            className="mt-1 rounded-md border border-ink-200 bg-white px-2 py-1.5 text-sm text-ink-900">
            {COUNTS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 self-end text-sm text-ink-700">
          <input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} className="h-4 w-4" />
          {s.hyphens}
        </label>
        <label className="flex items-center gap-2 self-end text-sm text-ink-700">
          <input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} className="h-4 w-4" />
          {s.uppercase}
        </label>
        <div className="ml-auto flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setSeed((seed) => seed + 1)}>
            <RefreshCw className="h-3.5 w-3.5" /> {s.regenerate}
          </Button>
          <Button size="sm" variant="outline" onClick={copyAll}>
            {copiedAll ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copiedAll ? s.copied : s.copyAll}
          </Button>
          <Button size="sm" onClick={downloadAll}>
            <Download className="h-3.5 w-3.5" /> .txt
          </Button>
        </div>
      </div>

      <ul className="max-h-[28rem] divide-y divide-ink-100 overflow-auto rounded-lg border border-ink-100 bg-white">
        {ids.map((id, i) => (
          <li key={i} className="flex items-center gap-3 px-4 py-2">
            <span className="w-12 shrink-0 text-xs text-ink-300">{i + 1}</span>
            <code className="flex-1 break-all font-mono text-sm text-ink-800">{id}</code>
            <button onClick={() => copyOne(i)} aria-label="Copy" className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700">
              {copiedOne === i ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </li>
        ))}
      </ul>

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
