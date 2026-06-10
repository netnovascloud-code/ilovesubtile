"use client";

import { useCallback, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    labelHtml: "HTML",
    labelWidth: "Width (px)",
    labelHeight: "Height (px)",
    labelFormat: "Format",
    renderBtn: "Render image",
    rendering: "Rendering…",
    download: "Download",
    couldNotRender: "Could not render HTML.",
    privacy: "Rendered in your browser with html2canvas — inline styles work best, and any external images must be CORS-accessible to appear.",
  },
  fr: {
    labelHtml: "HTML",
    labelWidth: "Largeur (px)",
    labelHeight: "Hauteur (px)",
    labelFormat: "Format",
    renderBtn: "Rendre l'image",
    rendering: "Rendu…",
    download: "Télécharger",
    couldNotRender: "Impossible de rendre le HTML.",
    privacy: "Rendu dans votre navigateur avec html2canvas — les styles en ligne fonctionnent mieux, et les images externes doivent être accessibles en CORS.",
  },
  es: {
    labelHtml: "HTML",
    labelWidth: "Ancho (px)",
    labelHeight: "Alto (px)",
    labelFormat: "Formato",
    renderBtn: "Renderizar imagen",
    rendering: "Renderizando…",
    download: "Descargar",
    couldNotRender: "No se pudo renderizar el HTML.",
    privacy: "Renderizado en tu navegador con html2canvas — los estilos en línea funcionan mejor, y las imágenes externas deben ser accesibles vía CORS.",
  },
  pt: {
    labelHtml: "HTML",
    labelWidth: "Largura (px)",
    labelHeight: "Altura (px)",
    labelFormat: "Formato",
    renderBtn: "Renderizar imagem",
    rendering: "A renderizar…",
    download: "Baixar",
    couldNotRender: "Não foi possível renderizar o HTML.",
    privacy: "Renderizado no seu navegador com html2canvas — os estilos inline funcionam melhor e as imagens externas precisam de ser acessíveis via CORS.",
  },
  de: {
    labelHtml: "HTML",
    labelWidth: "Breite (px)",
    labelHeight: "Höhe (px)",
    labelFormat: "Format",
    renderBtn: "Bild rendern",
    rendering: "Wird gerendert…",
    download: "Herunterladen",
    couldNotRender: "HTML konnte nicht gerendert werden.",
    privacy: "Im Browser mit html2canvas gerendert — Inline-Styles funktionieren am besten; externe Bilder müssen CORS-zugänglich sein.",
  },
  it: {
    labelHtml: "HTML",
    labelWidth: "Larghezza (px)",
    labelHeight: "Altezza (px)",
    labelFormat: "Formato",
    renderBtn: "Renderizza immagine",
    rendering: "Rendering…",
    download: "Scarica",
    couldNotRender: "Impossibile renderizzare l'HTML.",
    privacy: "Renderizzato nel browser con html2canvas — gli stili inline funzionano meglio; le immagini esterne devono essere accessibili via CORS.",
  },
  nl: {
    labelHtml: "HTML",
    labelWidth: "Breedte (px)",
    labelHeight: "Hoogte (px)",
    labelFormat: "Formaat",
    renderBtn: "Afbeelding renderen",
    rendering: "Renderen…",
    download: "Downloaden",
    couldNotRender: "Kon HTML niet renderen.",
    privacy: "Gerenderd in uw browser met html2canvas — inline stijlen werken het beste; externe afbeeldingen moeten CORS-toegankelijk zijn.",
  },
  ja: {
    labelHtml: "HTML",
    labelWidth: "幅 (px)",
    labelHeight: "高さ (px)",
    labelFormat: "形式",
    renderBtn: "画像をレンダリング",
    rendering: "レンダリング中…",
    download: "ダウンロード",
    couldNotRender: "HTML をレンダリングできませんでした。",
    privacy: "html2canvas でブラウザ内にレンダリング — インラインスタイルが最も機能します。外部画像は CORS アクセスが必要です。",
  },
  zh: {
    labelHtml: "HTML",
    labelWidth: "宽度 (px)",
    labelHeight: "高度 (px)",
    labelFormat: "格式",
    renderBtn: "渲染图片",
    rendering: "渲染中…",
    download: "下载",
    couldNotRender: "无法渲染 HTML。",
    privacy: "使用 html2canvas 在您的浏览器中渲染 — 内联样式效果最佳，外部图片必须支持 CORS 才能显示。",
  },
  ko: {
    labelHtml: "HTML",
    labelWidth: "너비 (px)",
    labelHeight: "높이 (px)",
    labelFormat: "형식",
    renderBtn: "이미지 렌더링",
    rendering: "렌더링 중…",
    download: "다운로드",
    couldNotRender: "HTML을 렌더링할 수 없습니다.",
    privacy: "html2canvas로 브라우저에서 렌더링 — 인라인 스타일이 가장 잘 작동하며 외부 이미지는 CORS 접근이 필요합니다.",
  },
  ar: {
    labelHtml: "HTML",
    labelWidth: "العرض (بكسل)",
    labelHeight: "الارتفاع (بكسل)",
    labelFormat: "التنسيق",
    renderBtn: "تصيير الصورة",
    rendering: "جاريالتصيير…",
    download: "تنزيل",
    couldNotRender: "تعذّر تصيير HTML.",
    privacy: "يُصيَّر في متصفحك باستخدام html2canvas — الأنماط المضمّنة تعمل بشكل أفضل، ويجب أن تكون الصور الخارجية قابلة للوصول عبر CORS.",
  },
  ru: {
    labelHtml: "HTML",
    labelWidth: "Ширина (пикс.)",
    labelHeight: "Высота (пикс.)",
    labelFormat: "Формат",
    renderBtn: "Рендерить изображение",
    rendering: "Рендеринг…",
    download: "Скачать",
    couldNotRender: "Не удалось рендерить HTML.",
    privacy: "Рендеринг в браузере с помощью html2canvas — встроенные стили работают лучше всего; внешние изображения должны быть доступны через CORS.",
  },
  hi: {
    labelHtml: "HTML",
    labelWidth: "चौड़ाई (px)",
    labelHeight: "ऊंचाई (px)",
    labelFormat: "प्रारूप",
    renderBtn: "छवि रेंडर करें",
    rendering: "रेंडर हो रहा है…",
    download: "डाउनलोड",
    couldNotRender: "HTML रेंडर नहीं हो सका।",
    privacy: "html2canvas से आपके ब्राउज़र में रेंडर — इनलाइन स्टाइल सबसे अच्छे काम करते हैं; बाहरी छवियाँ CORS-सुलभ होनी चाहिए।",
  },
  tr: {
    labelHtml: "HTML",
    labelWidth: "Genişlik (px)",
    labelHeight: "Yükseklik (px)",
    labelFormat: "Format",
    renderBtn: "Görsel oluştur",
    rendering: "Oluşturuluyor…",
    download: "İndir",
    couldNotRender: "HTML oluşturulamadı.",
    privacy: "html2canvas ile tarayıcınızda oluşturulur — satır içi stiller en iyi şekilde çalışır; dış görseller CORS erişilebilir olmalıdır.",
  },
  id: {
    labelHtml: "HTML",
    labelWidth: "Lebar (px)",
    labelHeight: "Tinggi (px)",
    labelFormat: "Format",
    renderBtn: "Render gambar",
    rendering: "Merender…",
    download: "Unduh",
    couldNotRender: "Tidak dapat merender HTML.",
    privacy: "Dirender di browser Anda dengan html2canvas — gaya inline paling berfungsi baik; gambar eksternal harus dapat diakses melalui CORS.",
  },
  vi: {
    labelHtml: "HTML",
    labelWidth: "Chiều rộng (px)",
    labelHeight: "Chiều cao (px)",
    labelFormat: "Định dạng",
    renderBtn: "Render hình ảnh",
    rendering: "Đang render…",
    download: "Tải xuống",
    couldNotRender: "Không thể render HTML.",
    privacy: "Được render trong trình duyệt của bạn với html2canvas — kiểu nội tuyến hoạt động tốt nhất; hình ảnh ngoài phải có thể truy cập qua CORS.",
  },
  sv: {
    labelHtml: "HTML",
    labelWidth: "Bredd (px)",
    labelHeight: "Höjd (px)",
    labelFormat: "Format",
    renderBtn: "Rendera bild",
    rendering: "Renderar…",
    download: "Ladda ned",
    couldNotRender: "Kunde inte rendera HTML.",
    privacy: "Renderas i din webbläsare med html2canvas — inline-stilar fungerar bäst; externa bilder måste vara CORS-tillgängliga.",
  },
  pl: {
    labelHtml: "HTML",
    labelWidth: "Szerokość (px)",
    labelHeight: "Wysokość (px)",
    labelFormat: "Format",
    renderBtn: "Renderuj obraz",
    rendering: "Renderowanie…",
    download: "Pobierz",
    couldNotRender: "Nie można wyrenderować HTML.",
    privacy: "Renderowany w Twojej przeglądarce za pomocą html2canvas — najlepiej działają style wbudowane; zewnętrzne obrazy muszą być dostępne przez CORS.",
  },
  uk: {
    labelHtml: "HTML",
    labelWidth: "Ширина (пкс)",
    labelHeight: "Висота (пкс)",
    labelFormat: "Формат",
    renderBtn: "Рендерити зображення",
    rendering: "Рендеринг…",
    download: "Завантажити",
    couldNotRender: "Не вдалося рендерити HTML.",
    privacy: "Рендеринг у браузері за допомогою html2canvas — вбудовані стилі працюють найкраще; зовнішні зображення мають бути доступні через CORS.",
  },
  cs: {
    labelHtml: "HTML",
    labelWidth: "Šířka (px)",
    labelHeight: "Výška (px)",
    labelFormat: "Formát",
    renderBtn: "Vykreslit obrázek",
    rendering: "Vykreslování…",
    download: "Stáhnout",
    couldNotRender: "HTML nelze vykreslit.",
    privacy: "Vykresleno ve vašem prohlížeči pomocí html2canvas — inline styly fungují nejlépe; externí obrázky musí být přístupné přes CORS.",
  },
};

// HTML → PNG/JPG via the SVG <foreignObject> trick — no dependency. The
// HTML is wrapped in an SVG, loaded as a data URL into an <img>, then
// drawn to a canvas. External resources (https images) are kept, but
// they must be CORS-friendly for the canvas to stay un-tainted.
const SAMPLE = `<div style="
  font-family: -apple-system, Segoe UI, Roboto, sans-serif;
  background: linear-gradient(135deg, #2D6BE4, #1F54C2);
  color: white;
  padding: 60px;
  border-radius: 24px;
  width: 800px;
  box-sizing: border-box;
">
  <h1 style="font-size: 56px; margin: 0;">Hello, Konvertools 👋</h1>
  <p style="font-size: 22px; opacity: 0.9; margin-top: 16px;">
    Paste any HTML on the left to render it as an image — perfect for social cards,
    quick mockups or styled snippets.
  </p>
</div>`;

export function HtmlToImageClient() {
  const s = T[useLocale()] ?? T.en;

  const [html, setHtml] = useState(SAMPLE);
  const [width, setWidth] = useState(900);
  const [height, setHeight] = useState(560);
  const [format, setFormat] = useState<"png" | "jpg">("png");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);

  const run = useCallback(async () => {
    setBusy(true); setError(null);
    let host: HTMLDivElement | null = null;
    try {
      // Render the HTML in a real off-screen DOM node and rasterise it with
      // html2canvas. The previous SVG <foreignObject> → <img> → canvas trick
      // TAINTS the canvas in Chrome ("Tainted canvases may not be exported"),
      // so toBlob always failed. html2canvas walks the DOM and draws primitives,
      // so the resulting canvas stays exportable.
      host = document.createElement("div");
      host.style.cssText = `position:fixed;left:-99999px;top:0;width:${width}px;height:${height}px;overflow:hidden;`;
      host.innerHTML = html;
      document.body.appendChild(host);

      // NB: import a URL stored in a variable (not a string literal) so TS
      // doesn't try to resolve it as a local module and fail the build.
      const h2cUrl = "https://esm.sh/html2canvas@1.4.1";
      const html2canvas = ((await import(/* webpackIgnore: true */ h2cUrl)) as { default: (el: HTMLElement, opts?: Record<string, unknown>) => Promise<HTMLCanvasElement> }).default;
      const canvas = await html2canvas(host, {
        width, height, scale: 1, useCORS: true, logging: false,
        backgroundColor: format === "jpg" ? "#ffffff" : null,
      });
      const mime = format === "png" ? "image/png" : "image/jpeg";
      const outBlob: Blob = await new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("Encoding failed."))), mime, 0.94));
      if (out) URL.revokeObjectURL(out.url);
      setOut({ url: URL.createObjectURL(outBlob), size: outBlob.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : s.couldNotRender);
    } finally {
      if (host) host.remove();
      setBusy(false);
    }
  }, [html, width, height, format, out, s.couldNotRender]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.labelHtml}
          <textarea value={html} onChange={(e) => setHtml(e.target.value)} rows={14}
            className="mt-1 rounded-md border border-ink-200 bg-white p-3 font-mono text-xs text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="flex flex-col text-xs font-medium text-ink-600">
              {s.labelWidth}
              <input type="number" min={100} max={4000} value={width} onChange={(e) => setWidth(Number(e.target.value) || 900)}
                className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900" />
            </label>
            <label className="flex flex-col text-xs font-medium text-ink-600">
              {s.labelHeight}
              <input type="number" min={100} max={4000} value={height} onChange={(e) => setHeight(Number(e.target.value) || 560)}
                className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900" />
            </label>
            <label className="flex flex-col text-xs font-medium text-ink-600">
              {s.labelFormat}
              <select value={format} onChange={(e) => setFormat(e.target.value as "png" | "jpg")}
                className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
              </select>
            </label>
          </div>
          {out && <img src={out.url} alt="preview" className="max-h-[360px] w-full rounded border border-ink-200 object-contain" />}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={run} disabled={busy}>
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{s.rendering}</> : s.renderBtn}
        </Button>
        {out && (
          <a href={out.url} download={`html-${Date.now()}.${format}`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> {s.download} ({formatBytes(out.size)})
          </a>
        )}
      </div>

      <p className="text-xs text-ink-400">
        {s.privacy}
      </p>
    </div>
  );
}
