"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

function hexToHsl(hex: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const int = parseInt(m[1], 16);
  const r = ((int >> 16) & 255) / 255, g = ((int >> 8) & 255) / 255, b = (int & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return [h, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360; s = Math.max(0, Math.min(100, s)) / 100; l = Math.max(0, Math.min(100, l)) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0]; else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x]; else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c]; else [r, g, b] = [c, 0, x];
  const to = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

const T: Record<string, Record<string, string>> = {
  en: {
    baseColour: "Base colour",
    hex: "HEX",
    copyHex: "Copy HEX",
    hexError: "Enter a 6-digit HEX colour, e.g. #4F46E5.",
    complementary: "Complementary",
    analogous: "Analogous",
    triadic: "Triadic",
    tetradic: "Tetradic",
    shadesTints: "Shades & tints",
    privacy: "Click any swatch to copy its HEX. Generated in your browser.",
  },
  fr: {
    baseColour: "Couleur de base",
    hex: "HEX",
    copyHex: "Copier le HEX",
    hexError: "Entrez une couleur HEX à 6 chiffres, ex. #4F46E5.",
    complementary: "Complémentaire",
    analogous: "Analogue",
    triadic: "Triadique",
    tetradic: "Tétradique",
    shadesTints: "Nuances et teintes",
    privacy: "Cliquez sur une palette pour copier son HEX. Généré dans votre navigateur.",
  },
  es: {
    baseColour: "Color base",
    hex: "HEX",
    copyHex: "Copiar HEX",
    hexError: "Introduzca un color HEX de 6 dígitos, ej. #4F46E5.",
    complementary: "Complementario",
    analogous: "Análogo",
    triadic: "Triádico",
    tetradic: "Tetrádico",
    shadesTints: "Sombras y matices",
    privacy: "Haga clic en cualquier muestra para copiar su HEX. Generado en su navegador.",
  },
  pt: {
    baseColour: "Cor base",
    hex: "HEX",
    copyHex: "Copiar HEX",
    hexError: "Introduza uma cor HEX de 6 dígitos, ex. #4F46E5.",
    complementary: "Complementar",
    analogous: "Análogo",
    triadic: "Triádico",
    tetradic: "Tetrádico",
    shadesTints: "Sombras e tons",
    privacy: "Clique em qualquer amostra para copiar o seu HEX. Gerado no seu navegador.",
  },
  de: {
    baseColour: "Grundfarbe",
    hex: "HEX",
    copyHex: "HEX kopieren",
    hexError: "Geben Sie eine 6-stellige HEX-Farbe ein, z. B. #4F46E5.",
    complementary: "Komplementär",
    analogous: "Analog",
    triadic: "Triadisch",
    tetradic: "Tetradisch",
    shadesTints: "Schattierungen & Töne",
    privacy: "Klicken Sie auf ein Farbfeld, um seinen HEX zu kopieren. Im Browser generiert.",
  },
  it: {
    baseColour: "Colore base",
    hex: "HEX",
    copyHex: "Copia HEX",
    hexError: "Inserisci un colore HEX a 6 cifre, es. #4F46E5.",
    complementary: "Complementare",
    analogous: "Analogo",
    triadic: "Triadico",
    tetradic: "Tetraedico",
    shadesTints: "Sfumature e tinte",
    privacy: "Clicca su un campione per copiarne il HEX. Generato nel tuo browser.",
  },
  nl: {
    baseColour: "Basiskleur",
    hex: "HEX",
    copyHex: "HEX kopiëren",
    hexError: "Voer een 6-cijferige HEX-kleur in, bijv. #4F46E5.",
    complementary: "Complementair",
    analogous: "Analoog",
    triadic: "Triadisch",
    tetradic: "Tetradisch",
    shadesTints: "Tinten en nuances",
    privacy: "Klik op een kleurstaal om de HEX te kopiëren. Gegenereerd in uw browser.",
  },
  ja: {
    baseColour: "ベースカラー",
    hex: "HEX",
    copyHex: "HEX をコピー",
    hexError: "6桁の HEX カラーを入力してください（例: #4F46E5）。",
    complementary: "補色",
    analogous: "類似色",
    triadic: "三角配色",
    tetradic: "四角配色",
    shadesTints: "シェード & ティント",
    privacy: "任意のスウォッチをクリックして HEX をコピーできます。ブラウザ内で生成されます。",
  },
  zh: {
    baseColour: "基础颜色",
    hex: "HEX",
    copyHex: "复制 HEX",
    hexError: "请输入6位 HEX 颜色，例如 #4F46E5。",
    complementary: "互补色",
    analogous: "类似色",
    triadic: "三角配色",
    tetradic: "四角配色",
    shadesTints: "深浅色调",
    privacy: "点击任意色块可复制其 HEX。在您的浏览器中生成。",
  },
  ko: {
    baseColour: "기본 색상",
    hex: "HEX",
    copyHex: "HEX 복사",
    hexError: "6자리 HEX 색상을 입력하세요, 예: #4F46E5.",
    complementary: "보색",
    analogous: "유사색",
    triadic: "삼각 배색",
    tetradic: "사각 배색",
    shadesTints: "음영 및 색조",
    privacy: "색상 견본을 클릭하여 HEX를 복사하세요. 브라우저에서 생성됩니다.",
  },
  ar: {
    baseColour: "اللون الأساسي",
    hex: "HEX",
    copyHex: "نسخ HEX",
    hexError: "أدخل لونًا HEX مكونًا من 6 أرقام، مثل #4F46E5.",
    complementary: "تكميلي",
    analogous: "مماثل",
    triadic: "ثلاثي",
    tetradic: "رباعي",
    shadesTints: "الظلال والألوان الفاتحة",
    privacy: "انقر فوق أي لوحة لنسخ قيمة HEX الخاصة بها. يتم إنشاؤها في متصفحك.",
  },
  ru: {
    baseColour: "Базовый цвет",
    hex: "HEX",
    copyHex: "Копировать HEX",
    hexError: "Введите 6-значный HEX-цвет, например #4F46E5.",
    complementary: "Дополнительный",
    analogous: "Аналогичный",
    triadic: "Триадный",
    tetradic: "Тетрадный",
    shadesTints: "Оттенки и тона",
    privacy: "Нажмите на любой образец, чтобы скопировать его HEX. Сгенерировано в вашем браузере.",
  },
  hi: {
    baseColour: "आधार रंग",
    hex: "HEX",
    copyHex: "HEX कॉपी करें",
    hexError: "6-अंकीय HEX रंग दर्ज करें, जैसे #4F46E5।",
    complementary: "पूरक",
    analogous: "सदृश",
    triadic: "त्रिक",
    tetradic: "चतुष्क",
    shadesTints: "शेड और टिंट",
    privacy: "किसी भी स्वैच पर क्लिक करके उसका HEX कॉपी करें। आपके ब्राउज़र में उत्पन्न।",
  },
  tr: {
    baseColour: "Temel renk",
    hex: "HEX",
    copyHex: "HEX kopyala",
    hexError: "6 haneli HEX renk girin, ör. #4F46E5.",
    complementary: "Tamamlayıcı",
    analogous: "Benzer",
    triadic: "Üçlü",
    tetradic: "Dörtlü",
    shadesTints: "Tonlar ve nüanslar",
    privacy: "HEX'ini kopyalamak için herhangi bir renk örneğine tıklayın. Tarayıcınızda oluşturulur.",
  },
  id: {
    baseColour: "Warna dasar",
    hex: "HEX",
    copyHex: "Salin HEX",
    hexError: "Masukkan warna HEX 6 digit, mis. #4F46E5.",
    complementary: "Komplementer",
    analogous: "Analog",
    triadic: "Triadik",
    tetradic: "Tetradik",
    shadesTints: "Bayangan & tint",
    privacy: "Klik swatch mana pun untuk menyalin HEX-nya. Dibuat di browser Anda.",
  },
  vi: {
    baseColour: "Màu cơ sở",
    hex: "HEX",
    copyHex: "Sao chép HEX",
    hexError: "Nhập màu HEX 6 chữ số, ví dụ #4F46E5.",
    complementary: "Màu bổ sung",
    analogous: "Màu tương tự",
    triadic: "Màu tam giác",
    tetradic: "Màu tứ giác",
    shadesTints: "Sắc tối và sắc nhạt",
    privacy: "Nhấp vào bất kỳ mẫu màu nào để sao chép HEX. Được tạo trong trình duyệt của bạn.",
  },
  sv: {
    baseColour: "Grundfärg",
    hex: "HEX",
    copyHex: "Kopiera HEX",
    hexError: "Ange en 6-siffrig HEX-färg, t.ex. #4F46E5.",
    complementary: "Komplementär",
    analogous: "Analog",
    triadic: "Triadisk",
    tetradic: "Tetradisk",
    shadesTints: "Nyanser och toner",
    privacy: "Klicka på valfri färgprova för att kopiera dess HEX. Genereras i din webbläsare.",
  },
  pl: {
    baseColour: "Kolor podstawowy",
    hex: "HEX",
    copyHex: "Kopiuj HEX",
    hexError: "Wprowadź 6-cyfrowy kolor HEX, np. #4F46E5.",
    complementary: "Dopełniający",
    analogous: "Analogiczny",
    triadic: "Triadyczny",
    tetradic: "Tetradyczny",
    shadesTints: "Cienie i odcienie",
    privacy: "Kliknij dowolną próbkę, aby skopiować jej HEX. Wygenerowane w Twojej przeglądarce.",
  },
  uk: {
    baseColour: "Базовий колір",
    hex: "HEX",
    copyHex: "Копіювати HEX",
    hexError: "Введіть 6-значний HEX-колір, наприклад #4F46E5.",
    complementary: "Додатковий",
    analogous: "Аналогічний",
    triadic: "Тріадний",
    tetradic: "Тетрадний",
    shadesTints: "Відтінки і тони",
    privacy: "Натисніть будь-який зразок, щоб скопіювати його HEX. Генерується у вашому браузері.",
  },
  cs: {
    baseColour: "Základní barva",
    hex: "HEX",
    copyHex: "Kopírovat HEX",
    hexError: "Zadejte 6místnou HEX barvu, např. #4F46E5.",
    complementary: "Doplňkový",
    analogous: "Analogický",
    triadic: "Triadický",
    tetradic: "Tetradický",
    shadesTints: "Odstíny a tóny",
    privacy: "Kliknutím na libovolný vzorek zkopírujete jeho HEX. Vygenerováno ve vašem prohlížeči.",
  },
};

type Scheme = { title: string; colors: string[] };

function Swatch({ hex, copyLabel }: { hex: string; copyLabel: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard?.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      className="group flex-1 overflow-hidden rounded-lg border border-ink-100 text-left"
      title={copyLabel}
    >
      <div className="h-16 w-full" style={{ background: hex }} />
      <div className="flex items-center justify-between gap-1 px-2 py-1.5 text-xs font-mono text-ink-700">
        {hex.toUpperCase()}
        {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3 text-ink-300 group-hover:text-ink-600" />}
      </div>
    </button>
  );
}

export function ColorPaletteClient() {
  const s = T[useLocale()] ?? T.en;

  const [base, setBase] = useState("#4f46e5");

  const schemes = useMemo<Scheme[] | null>(() => {
    const hsl = hexToHsl(base);
    if (!hsl) return null;
    const [h, sv, l] = hsl;
    return [
      { title: s.complementary, colors: [hslToHex(h, sv, l), hslToHex(h + 180, sv, l)] },
      { title: s.analogous, colors: [hslToHex(h - 30, sv, l), hslToHex(h, sv, l), hslToHex(h + 30, sv, l)] },
      { title: s.triadic, colors: [hslToHex(h, sv, l), hslToHex(h + 120, sv, l), hslToHex(h + 240, sv, l)] },
      { title: s.tetradic, colors: [hslToHex(h, sv, l), hslToHex(h + 90, sv, l), hslToHex(h + 180, sv, l), hslToHex(h + 270, sv, l)] },
      { title: s.shadesTints, colors: [90, 70, 55, 40, 25].map((ll) => hslToHex(h, sv, ll)) },
    ];
  }, [base, s.complementary, s.analogous, s.triadic, s.tetradic, s.shadesTints]);

  const valid = schemes !== null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.baseColour}
          <input type="color" value={valid ? base : "#4f46e5"} onChange={(e) => setBase(e.target.value)}
            className="mt-1 h-10 w-16 cursor-pointer rounded-md border border-ink-200 bg-white p-1" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.hex}
          <input value={base} onChange={(e) => setBase(e.target.value)}
            className={`mt-1 w-32 rounded-md border bg-white px-3 py-2 font-mono text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-100 ${valid ? "border-ink-200 focus:border-brand-400" : "border-red-300"}`} />
        </label>
      </div>

      {!valid && <p className="text-sm text-amber-700">{s.hexError}</p>}

      {valid && schemes.map((sc) => (
        <div key={sc.title}>
          <h3 className="mb-2 text-sm font-semibold text-ink-800">{sc.title}</h3>
          <div className="flex gap-2">
            {sc.colors.map((c, i) => <Swatch key={`${sc.title}-${i}`} hex={c} copyLabel={s.copyHex} />)}
          </div>
        </div>
      ))}

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
