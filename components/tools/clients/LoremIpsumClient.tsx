"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function makeSentence() {
  const len = rand(8, 16);
  const out: string[] = [];
  for (let i = 0; i < len; i++) out.push(WORDS[rand(0, WORDS.length - 1)]);
  return out.join(" ").replace(/^./, (c) => c.toUpperCase()) + ".";
}
function makeParagraph(startsWithLorem: boolean) {
  const sentences = rand(4, 7);
  const parts: string[] = [];
  for (let i = 0; i < sentences; i++) parts.push(makeSentence());
  if (startsWithLorem) parts[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  return parts.join(" ");
}

const T: Record<string, Record<string, string>> = {
  en: {
    generate: "Generate",
    unit: "Unit",
    paragraphs: "Paragraphs",
    sentences: "Sentences",
    words: "Words",
    startWithLorem: "Start with \"Lorem ipsum…\"",
    regenerate: "Regenerate",
    copy: "Copy",
    copied: "Copied",
    privacy: "100% in your browser — generated on demand, never sent anywhere.",
  },
  fr: {
    generate: "Générer",
    unit: "Unité",
    paragraphs: "Paragraphes",
    sentences: "Phrases",
    words: "Mots",
    startWithLorem: "Commencer par « Lorem ipsum… »",
    regenerate: "Régénérer",
    copy: "Copier",
    copied: "Copié",
    privacy: "100 % dans votre navigateur — généré à la demande, jamais envoyé nulle part.",
  },
  es: {
    generate: "Generar",
    unit: "Unidad",
    paragraphs: "Párrafos",
    sentences: "Oraciones",
    words: "Palabras",
    startWithLorem: "Empezar con \"Lorem ipsum…\"",
    regenerate: "Regenerar",
    copy: "Copiar",
    copied: "Copiado",
    privacy: "100 % en tu navegador — generado bajo demanda, nunca enviado a ningún lado.",
  },
  pt: {
    generate: "Gerar",
    unit: "Unidade",
    paragraphs: "Parágrafos",
    sentences: "Frases",
    words: "Palavras",
    startWithLorem: "Começar com \"Lorem ipsum…\"",
    regenerate: "Regenerar",
    copy: "Copiar",
    copied: "Copiado",
    privacy: "100% no seu navegador — gerado sob demanda, nunca enviado para nenhum lugar.",
  },
  de: {
    generate: "Generieren",
    unit: "Einheit",
    paragraphs: "Absätze",
    sentences: "Sätze",
    words: "Wörter",
    startWithLorem: "Mit \"Lorem ipsum…\" beginnen",
    regenerate: "Neu generieren",
    copy: "Kopieren",
    copied: "Kopiert",
    privacy: "100 % im Browser — auf Anfrage generiert, niemals irgendwohin gesendet.",
  },
  it: {
    generate: "Genera",
    unit: "Unità",
    paragraphs: "Paragrafi",
    sentences: "Frasi",
    words: "Parole",
    startWithLorem: "Inizia con \"Lorem ipsum…\"",
    regenerate: "Rigenera",
    copy: "Copia",
    copied: "Copiato",
    privacy: "100% nel tuo browser — generato su richiesta, mai inviato da nessuna parte.",
  },
  nl: {
    generate: "Genereren",
    unit: "Eenheid",
    paragraphs: "Alinea's",
    sentences: "Zinnen",
    words: "Woorden",
    startWithLorem: "Begin met \"Lorem ipsum…\"",
    regenerate: "Opnieuw genereren",
    copy: "Kopiëren",
    copied: "Gekopieerd",
    privacy: "100% in uw browser — op aanvraag gegenereerd, nooit ergens naartoe gestuurd.",
  },
  ja: {
    generate: "生成",
    unit: "単位",
    paragraphs: "段落",
    sentences: "文",
    words: "単語",
    startWithLorem: "「Lorem ipsum…」で始める",
    regenerate: "再生成",
    copy: "コピー",
    copied: "コピー済み",
    privacy: "ブラウザ内で 100% 処理 — オンデマンド生成、どこにも送信されません。",
  },
  zh: {
    generate: "生成",
    unit: "单位",
    paragraphs: "段落",
    sentences: "句子",
    words: "单词",
    startWithLorem: "以\"Lorem ipsum…\"开头",
    regenerate: "重新生成",
    copy: "复制",
    copied: "已复制",
    privacy: "在您的浏览器中 100% 处理 — 按需生成，从不发送到任何地方。",
  },
  ko: {
    generate: "생성",
    unit: "단위",
    paragraphs: "단락",
    sentences: "문장",
    words: "단어",
    startWithLorem: "\"Lorem ipsum…\"으로 시작",
    regenerate: "재생성",
    copy: "복사",
    copied: "복사됨",
    privacy: "브라우저에서 100% 처리 — 필요 시 생성, 어디에도 전송되지 않습니다.",
  },
  ar: {
    generate: "توليد",
    unit: "الوحدة",
    paragraphs: "فقرات",
    sentences: "جمل",
    words: "كلمات",
    startWithLorem: "ابدأ بـ \"Lorem ipsum…\"",
    regenerate: "إعادة التوليد",
    copy: "نسخ",
    copied: "تم النسخ",
    privacy: "100٪ في متصفحك — يُولَد عند الطلب، لا يُرسل إلى أي مكان.",
  },
  ru: {
    generate: "Создать",
    unit: "Единица",
    paragraphs: "Абзацы",
    sentences: "Предложения",
    words: "Слова",
    startWithLorem: "Начать с «Lorem ipsum…»",
    regenerate: "Пересоздать",
    copy: "Копировать",
    copied: "Скопировано",
    privacy: "100% в вашем браузере — генерируется по запросу, никуда не отправляется.",
  },
  hi: {
    generate: "उत्पन्न करें",
    unit: "इकाई",
    paragraphs: "अनुच्छेद",
    sentences: "वाक्य",
    words: "शब्द",
    startWithLorem: "\"Lorem ipsum…\" से शुरू करें",
    regenerate: "पुनर्निर्मित करें",
    copy: "कॉपी करें",
    copied: "कॉपी हो गया",
    privacy: "आपके ब्राउज़र में 100% — मांग पर उत्पन्न, कहीं नहीं भेजा जाता।",
  },
  tr: {
    generate: "Oluştur",
    unit: "Birim",
    paragraphs: "Paragraflar",
    sentences: "Cümleler",
    words: "Kelimeler",
    startWithLorem: "\"Lorem ipsum…\" ile başla",
    regenerate: "Yeniden oluştur",
    copy: "Kopyala",
    copied: "Kopyalandı",
    privacy: "Tarayıcınızda %100 işlem — talep üzerine oluşturulur, hiçbir yere gönderilmez.",
  },
  id: {
    generate: "Buat",
    unit: "Satuan",
    paragraphs: "Paragraf",
    sentences: "Kalimat",
    words: "Kata",
    startWithLorem: "Mulai dengan \"Lorem ipsum…\"",
    regenerate: "Buat ulang",
    copy: "Salin",
    copied: "Disalin",
    privacy: "100% di browser Anda — dibuat sesuai permintaan, tidak pernah dikirim ke mana pun.",
  },
  vi: {
    generate: "Tạo",
    unit: "Đơn vị",
    paragraphs: "Đoạn văn",
    sentences: "Câu",
    words: "Từ",
    startWithLorem: "Bắt đầu bằng \"Lorem ipsum…\"",
    regenerate: "Tạo lại",
    copy: "Sao chép",
    copied: "Đã sao chép",
    privacy: "100% trong trình duyệt của bạn — được tạo theo yêu cầu, không bao giờ gửi đi đâu.",
  },
  sv: {
    generate: "Generera",
    unit: "Enhet",
    paragraphs: "Stycken",
    sentences: "Meningar",
    words: "Ord",
    startWithLorem: "Börja med \"Lorem ipsum…\"",
    regenerate: "Generera om",
    copy: "Kopiera",
    copied: "Kopierat",
    privacy: "100 % i din webbläsare — genereras vid behov, skickas aldrig någonstans.",
  },
  pl: {
    generate: "Generuj",
    unit: "Jednostka",
    paragraphs: "Akapity",
    sentences: "Zdania",
    words: "Słowa",
    startWithLorem: "Zacznij od \"Lorem ipsum…\"",
    regenerate: "Generuj ponownie",
    copy: "Kopiuj",
    copied: "Skopiowano",
    privacy: "100% w Twojej przeglądarce — generowane na żądanie, nigdy nigdzie nie wysyłane.",
  },
  uk: {
    generate: "Створити",
    unit: "Одиниця",
    paragraphs: "Абзаци",
    sentences: "Речення",
    words: "Слова",
    startWithLorem: "Починати з «Lorem ipsum…»",
    regenerate: "Перегенерувати",
    copy: "Копіювати",
    copied: "Скопійовано",
    privacy: "100% у вашому браузері — генерується на вимогу, нікуди не надсилається.",
  },
  cs: {
    generate: "Generovat",
    unit: "Jednotka",
    paragraphs: "Odstavce",
    sentences: "Věty",
    words: "Slova",
    startWithLorem: "Začít s \"Lorem ipsum…\"",
    regenerate: "Regenerovat",
    copy: "Kopírovat",
    copied: "Zkopírováno",
    privacy: "100 % ve vašem prohlížeči — generováno na vyžádání, nikam neposíláno.",
  },
};

export function LoremIpsumClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(5);
  const [classic, setClassic] = useState(true);
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);
  // SSR rolls one Math.random sequence and the client rolls a different one,
  // causing a hydration mismatch on the rendered text. Gate the output on a
  // mounted flag so SSR renders an empty placeholder and the client fills it.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const output = useMemo(() => {
    void seed;
    if (!mounted) return "";
    if (unit === "paragraphs") {
      return Array.from({ length: Math.max(1, count) }, (_, i) => makeParagraph(classic && i === 0)).join("\n\n");
    }
    if (unit === "sentences") {
      const parts = Array.from({ length: Math.max(1, count) }, () => makeSentence());
      if (classic) parts[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      return parts.join(" ");
    }
    const all: string[] = [];
    if (classic) all.push(...["Lorem", "ipsum", "dolor", "sit", "amet"]);
    while (all.length < Math.max(1, count)) all.push(WORDS[rand(0, WORDS.length - 1)]);
    return all.slice(0, count).join(" ");
  }, [unit, count, classic, seed, mounted]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3 rounded-lg border border-ink-100 bg-white p-4">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.generate}
          <input type="number" min={1} max={500} value={count} onChange={(e) => setCount(Math.max(1, Math.min(500, Number(e.target.value) || 1)))}
            className="mt-1 w-24 rounded-md border border-ink-200 bg-white px-2 py-1.5 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.unit}
          <select value={unit} onChange={(e) => setUnit(e.target.value as typeof unit)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-2 py-1.5 text-sm text-ink-900">
            <option value="paragraphs">{s.paragraphs}</option>
            <option value="sentences">{s.sentences}</option>
            <option value="words">{s.words}</option>
          </select>
        </label>
        <label className="flex items-center gap-2 self-end text-sm text-ink-700">
          <input type="checkbox" checked={classic} onChange={(e) => setClassic(e.target.checked)} className="h-4 w-4" />
          {s.startWithLorem}
        </label>
        <div className="ml-auto flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setSeed((seed) => seed + 1)}>
            <RefreshCw className="h-3.5 w-3.5" /> {s.regenerate}
          </Button>
          <Button size="sm" onClick={copy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? s.copied : s.copy}
          </Button>
        </div>
      </div>

      <pre className="whitespace-pre-wrap rounded-lg border border-ink-100 bg-white p-5 text-sm leading-relaxed text-ink-800">{output}</pre>

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
