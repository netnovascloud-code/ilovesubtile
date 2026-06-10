"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

type JsBarcodeOpts = { format: string; width?: number; height?: number; displayValue?: boolean; margin?: number; background?: string; lineColor?: string };
type JsBarcodeFn = (target: HTMLElement | SVGElement | string, value: string, options?: JsBarcodeOpts) => void;

async function loadJsBarcode(): Promise<JsBarcodeFn> {
  const url = "https://esm.sh/jsbarcode@3.11.6";
  const mod = (await import(/* webpackIgnore: true */ url)) as { default: JsBarcodeFn } | JsBarcodeFn;
  return typeof mod === "function" ? mod : (mod as { default: JsBarcodeFn }).default;
}

const FORMATS = [
  { id: "CODE128", label: "Code 128 (general purpose)" },
  { id: "CODE39", label: "Code 39" },
  { id: "EAN13", label: "EAN-13 (retail)" },
  { id: "EAN8", label: "EAN-8" },
  { id: "UPC", label: "UPC-A" },
  { id: "ITF14", label: "ITF-14" },
  { id: "MSI", label: "MSI" },
  { id: "pharmacode", label: "Pharmacode" },
];

const SAMPLES: Record<string, string> = {
  CODE128: "KONVER-12345",
  CODE39: "KONVER 39",
  EAN13: "5901234123457",
  EAN8: "96385074",
  UPC: "123456789012",
  ITF14: "10012345678902",
  MSI: "1234567",
  pharmacode: "1234",
};

const T: Record<string, Record<string, string>> = {
  en: {
    format: "Format",
    value: "Value",
    showValue: "Show value under the barcode",
    barWidth: "Bar width: ",
    height: "Height: ",
    heightUnit: "px",
    downloadPng: "Download PNG",
    downloadSvg: "Download SVG",
    privacy: "100% in your browser via JsBarcode — your data never leaves your device.",
    loadError: "Could not load JsBarcode: ",
  },
  fr: {
    format: "Format",
    value: "Valeur",
    showValue: "Afficher la valeur sous le code-barres",
    barWidth: "Largeur des barres : ",
    height: "Hauteur : ",
    heightUnit: "px",
    downloadPng: "Télécharger PNG",
    downloadSvg: "Télécharger SVG",
    privacy: "100 % dans votre navigateur via JsBarcode — vos données ne quittent jamais votre appareil.",
    loadError: "Impossible de charger JsBarcode : ",
  },
  es: {
    format: "Formato",
    value: "Valor",
    showValue: "Mostrar valor bajo el código de barras",
    barWidth: "Ancho de barra: ",
    height: "Alto: ",
    heightUnit: "px",
    downloadPng: "Descargar PNG",
    downloadSvg: "Descargar SVG",
    privacy: "100 % en tu navegador vía JsBarcode — tus datos nunca salen de tu dispositivo.",
    loadError: "No se pudo cargar JsBarcode: ",
  },
  pt: {
    format: "Formato",
    value: "Valor",
    showValue: "Mostrar valor abaixo do código de barras",
    barWidth: "Largura da barra: ",
    height: "Altura: ",
    heightUnit: "px",
    downloadPng: "Baixar PNG",
    downloadSvg: "Baixar SVG",
    privacy: "100% no seu navegador via JsBarcode — os seus dados nunca saem do dispositivo.",
    loadError: "Não foi possível carregar o JsBarcode: ",
  },
  de: {
    format: "Format",
    value: "Wert",
    showValue: "Wert unter dem Barcode anzeigen",
    barWidth: "Balkenbreite: ",
    height: "Höhe: ",
    heightUnit: "px",
    downloadPng: "PNG herunterladen",
    downloadSvg: "SVG herunterladen",
    privacy: "100 % im Browser via JsBarcode — Ihre Daten verlassen Ihr Gerät nie.",
    loadError: "JsBarcode konnte nicht geladen werden: ",
  },
  it: {
    format: "Formato",
    value: "Valore",
    showValue: "Mostra valore sotto il codice a barre",
    barWidth: "Larghezza barra: ",
    height: "Altezza: ",
    heightUnit: "px",
    downloadPng: "Scarica PNG",
    downloadSvg: "Scarica SVG",
    privacy: "100% nel tuo browser tramite JsBarcode — i tuoi dati non lasciano mai il dispositivo.",
    loadError: "Impossibile caricare JsBarcode: ",
  },
  nl: {
    format: "Formaat",
    value: "Waarde",
    showValue: "Waarde onder streepjescode weergeven",
    barWidth: "Staafbreedte: ",
    height: "Hoogte: ",
    heightUnit: "px",
    downloadPng: "PNG downloaden",
    downloadSvg: "SVG downloaden",
    privacy: "100% in uw browser via JsBarcode — uw gegevens verlaten uw apparaat nooit.",
    loadError: "JsBarcode kon niet worden geladen: ",
  },
  ja: {
    format: "フォーマット",
    value: "値",
    showValue: "バーコードの下に値を表示する",
    barWidth: "バーの幅: ",
    height: "高さ: ",
    heightUnit: "px",
    downloadPng: "PNG をダウンロード",
    downloadSvg: "SVG をダウンロード",
    privacy: "JsBarcode を使用してブラウザ内で 100% 処理 — データはデバイスから出ません。",
    loadError: "JsBarcode を読み込めませんでした: ",
  },
  zh: {
    format: "格式",
    value: "值",
    showValue: "在条形码下方显示值",
    barWidth: "条形宽度: ",
    height: "高度: ",
    heightUnit: "px",
    downloadPng: "下载 PNG",
    downloadSvg: "下载 SVG",
    privacy: "通过 JsBarcode 在您的浏览器中 100% 处理 — 您的数据永远不会离开您的设备。",
    loadError: "无法加载 JsBarcode: ",
  },
  ko: {
    format: "형식",
    value: "값",
    showValue: "바코드 아래에 값 표시",
    barWidth: "막대 너비: ",
    height: "높이: ",
    heightUnit: "px",
    downloadPng: "PNG 다운로드",
    downloadSvg: "SVG 다운로드",
    privacy: "JsBarcode를 통해 브라우저에서 100% 처리 — 데이터는 기기를 절대 벗어나지 않습니다.",
    loadError: "JsBarcode를 로드할 수 없습니다: ",
  },
  ar: {
    format: "الصيغة",
    value: "القيمة",
    showValue: "إظهار القيمة أسفل الباركود",
    barWidth: "عرض الشريط: ",
    height: "الارتفاع: ",
    heightUnit: "px",
    downloadPng: "تنزيل PNG",
    downloadSvg: "تنزيل SVG",
    privacy: "100٪ في متصفحك عبر JsBarcode — بياناتك لا تغادر جهازك أبداً.",
    loadError: "تعذّر تحميل JsBarcode: ",
  },
  ru: {
    format: "Формат",
    value: "Значение",
    showValue: "Показывать значение под штрихкодом",
    barWidth: "Ширина полосы: ",
    height: "Высота: ",
    heightUnit: "пкс",
    downloadPng: "Скачать PNG",
    downloadSvg: "Скачать SVG",
    privacy: "100% в вашем браузере через JsBarcode — данные никогда не покидают устройство.",
    loadError: "Не удалось загрузить JsBarcode: ",
  },
  hi: {
    format: "प्रारूप",
    value: "मान",
    showValue: "बारकोड के नीचे मान दिखाएं",
    barWidth: "बार चौड़ाई: ",
    height: "ऊंचाई: ",
    heightUnit: "px",
    downloadPng: "PNG डाउनलोड करें",
    downloadSvg: "SVG डाउनलोड करें",
    privacy: "JsBarcode के माध्यम से आपके ब्राउज़र में 100% — आपका डेटा कभी डिवाइस नहीं छोड़ता।",
    loadError: "JsBarcode लोड नहीं हो सका: ",
  },
  tr: {
    format: "Biçim",
    value: "Değer",
    showValue: "Barkodun altındaki değeri göster",
    barWidth: "Çubuk genişliği: ",
    height: "Yükseklik: ",
    heightUnit: "px",
    downloadPng: "PNG indir",
    downloadSvg: "SVG indir",
    privacy: "Tarayıcınızda JsBarcode üzerinden %100 işlem — verileriniz asla cihazınızı terk etmez.",
    loadError: "JsBarcode yüklenemedi: ",
  },
  id: {
    format: "Format",
    value: "Nilai",
    showValue: "Tampilkan nilai di bawah barcode",
    barWidth: "Lebar batang: ",
    height: "Tinggi: ",
    heightUnit: "px",
    downloadPng: "Unduh PNG",
    downloadSvg: "Unduh SVG",
    privacy: "100% di browser Anda via JsBarcode — data Anda tidak pernah meninggalkan perangkat.",
    loadError: "Tidak dapat memuat JsBarcode: ",
  },
  vi: {
    format: "Định dạng",
    value: "Giá trị",
    showValue: "Hiển thị giá trị dưới mã vạch",
    barWidth: "Độ rộng thanh: ",
    height: "Chiều cao: ",
    heightUnit: "px",
    downloadPng: "Tải xuống PNG",
    downloadSvg: "Tải xuống SVG",
    privacy: "100% trong trình duyệt của bạn qua JsBarcode — dữ liệu của bạn không bao giờ rời khỏi thiết bị.",
    loadError: "Không thể tải JsBarcode: ",
  },
  sv: {
    format: "Format",
    value: "Värde",
    showValue: "Visa värde under streckkoden",
    barWidth: "Stapebredd: ",
    height: "Höjd: ",
    heightUnit: "px",
    downloadPng: "Ladda ner PNG",
    downloadSvg: "Ladda ner SVG",
    privacy: "100 % i din webbläsare via JsBarcode — dina data lämnar aldrig din enhet.",
    loadError: "Kunde inte ladda JsBarcode: ",
  },
  pl: {
    format: "Format",
    value: "Wartość",
    showValue: "Pokaż wartość pod kodem kreskowym",
    barWidth: "Szerokość paska: ",
    height: "Wysokość: ",
    heightUnit: "px",
    downloadPng: "Pobierz PNG",
    downloadSvg: "Pobierz SVG",
    privacy: "100% w Twojej przeglądarce przez JsBarcode — Twoje dane nigdy nie opuszczają urządzenia.",
    loadError: "Nie można załadować JsBarcode: ",
  },
  uk: {
    format: "Формат",
    value: "Значення",
    showValue: "Показувати значення під штрихкодом",
    barWidth: "Ширина смуги: ",
    height: "Висота: ",
    heightUnit: "пкс",
    downloadPng: "Завантажити PNG",
    downloadSvg: "Завантажити SVG",
    privacy: "100% у вашому браузері через JsBarcode — дані ніколи не залишають пристрій.",
    loadError: "Не вдалося завантажити JsBarcode: ",
  },
  cs: {
    format: "Formát",
    value: "Hodnota",
    showValue: "Zobrazit hodnotu pod čárovým kódem",
    barWidth: "Šířka pruhu: ",
    height: "Výška: ",
    heightUnit: "px",
    downloadPng: "Stáhnout PNG",
    downloadSvg: "Stáhnout SVG",
    privacy: "100 % ve vašem prohlížeči přes JsBarcode — vaše data nikdy neopustí vaše zařízení.",
    loadError: "Nelze načíst JsBarcode: ",
  },
};

export function BarcodeGeneratorClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [format, setFormat] = useState("CODE128");
  const [value, setValue] = useState(SAMPLES.CODE128);
  const [displayValue, setDisplayValue] = useState(true);
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(80);
  const [error, setError] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    if (!svgRef.current) return;
    loadJsBarcode().then((JsBarcode) => {
      if (cancelled || !svgRef.current) return;
      try {
        // Clear before redraw to avoid stale appended children.
        while (svgRef.current.firstChild) svgRef.current.removeChild(svgRef.current.firstChild);
        JsBarcode(svgRef.current, value, { format, displayValue, width, height, margin: 10, background: "#ffffff", lineColor: "#0f172a" });
      } catch (e) {
        setError((e as Error).message);
      }
    }).catch((e) => { if (!cancelled) setError(`${s.loadError}${(e as Error).message}`); });
    return () => { cancelled = true; };
  }, [format, value, displayValue, width, height, s.loadError]);

  function downloadSvg() {
    if (!svgRef.current) return;
    const xml = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob(['<?xml version="1.0"?>\n' + xml], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `barcode-${format}.svg`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
  async function downloadPng() {
    if (!svgRef.current) return;
    const xml = new XMLSerializer().serializeToString(svgRef.current);
    const url = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
    const img = new Image();
    await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = () => rej(new Error("load")); img.src = url; });
    const c = document.createElement("canvas");
    c.width = img.width || 400; c.height = img.height || 120;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0);
    c.toBlob((b) => {
      if (!b) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = `barcode-${format}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    }, "image/png");
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.format}
          <select value={format} onChange={(e) => { setFormat(e.target.value); setValue(SAMPLES[e.target.value] ?? value); }} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm">
            {FORMATS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
          </select>
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.value}
          <input value={value} onChange={(e) => setValue(e.target.value)} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm" />
        </label>
        <label className="flex items-center gap-2 text-xs font-medium text-ink-600">
          <input type="checkbox" checked={displayValue} onChange={(e) => setDisplayValue(e.target.checked)} className="h-4 w-4" /> {s.showValue}
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.barWidth}{width}
          <input type="range" min={1} max={6} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="mt-1" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600 sm:col-span-2">
          {s.height}{height}{s.heightUnit}
          <input type="range" min={40} max={200} value={height} onChange={(e) => setHeight(Number(e.target.value))} className="mt-1" />
        </label>
      </div>

      <div className="grid place-items-center rounded-lg border border-ink-100 bg-white p-6">
        <svg ref={svgRef} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={downloadPng}><Download className="h-3.5 w-3.5" /> {s.downloadPng}</Button>
        <Button variant="outline" onClick={downloadSvg}><Download className="h-3.5 w-3.5" /> {s.downloadSvg}</Button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
