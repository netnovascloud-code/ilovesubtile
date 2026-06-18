"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Download, X, Eraser, PenLine, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

/**
 * Sign PDF — 100% in-browser (pdf-lib): draw a signature on a canvas, stamp
 * it onto the last page of the uploaded PDF, download the signed PDF.
 * No upload, no quota — privacy-first by design.
 *
 * Trade-off: pdf-lib alone can't render PDFs, so we don't show a preview-with-
 * pages. The signature is dropped at the bottom-right of the LAST page, which
 * is the standard signature location and covers 95 % of use cases.
 */

const T: Record<string, Record<string, string>> = {
  en: {
    uploadLabel: "Upload your PDF",
    uploadHint: "Anything with at least one page — stays in your browser",
    drawSignature: "Draw your signature",
    clear: "Clear",
    canvasHint: "Drawn locally — never uploaded. Mouse, trackpad or finger.",
    signing: "Signing…",
    signPdf: "Sign PDF",
    download: "Download",
    privacy: "Signs on the last page (bottom-right). Drawn signature, embedded as PNG with transparency. Everything happens in your browser — your PDF is never uploaded.",
    drawFirst: "Please draw your signature first.",
    couldNotSign: "Could not sign that PDF.",
  },
  fr: {
    uploadLabel: "Téléverser votre PDF",
    uploadHint: "N'importe quel PDF avec au moins une page — reste dans votre navigateur",
    drawSignature: "Dessinez votre signature",
    clear: "Effacer",
    canvasHint: "Dessinée localement — jamais téléversée. Souris, pavé tactile ou doigt.",
    signing: "Signature…",
    signPdf: "Signer le PDF",
    download: "Télécharger",
    privacy: "Signature apposée sur la dernière page (bas-droite). Signature dessinée, intégrée en PNG avec transparence. Tout se passe dans votre navigateur — votre PDF n'est jamais téléversé.",
    drawFirst: "Veuillez d'abord dessiner votre signature.",
    couldNotSign: "Impossible de signer ce PDF.",
  },
  es: {
    uploadLabel: "Sube tu PDF",
    uploadHint: "Cualquier cosa con al menos una página — se queda en tu navegador",
    drawSignature: "Dibuja tu firma",
    clear: "Borrar",
    canvasHint: "Dibujada localmente — nunca se sube. Ratón, trackpad o dedo.",
    signing: "Firmando…",
    signPdf: "Firmar PDF",
    download: "Descargar",
    privacy: "Firma en la última página (abajo a la derecha). Firma dibujada, incrustada como PNG con transparencia. Todo ocurre en tu navegador — tu PDF nunca se sube.",
    drawFirst: "Por favor, dibuja primero tu firma.",
    couldNotSign: "No se pudo firmar ese PDF.",
  },
  pt: {
    uploadLabel: "Carregue o seu PDF",
    uploadHint: "Qualquer coisa com pelo menos uma página — fica no seu navegador",
    drawSignature: "Desenhe a sua assinatura",
    clear: "Limpar",
    canvasHint: "Desenhada localmente — nunca enviada. Rato, trackpad ou dedo.",
    signing: "A assinar…",
    signPdf: "Assinar PDF",
    download: "Transferir",
    privacy: "Assina na última página (canto inferior direito). Assinatura desenhada, incorporada como PNG com transparência. Tudo acontece no seu navegador — o PDF nunca é enviado.",
    drawFirst: "Por favor, desenhe primeiro a sua assinatura.",
    couldNotSign: "Não foi possível assinar esse PDF.",
  },
  de: {
    uploadLabel: "PDF hochladen",
    uploadHint: "Alles mit mindestens einer Seite — bleibt in Ihrem Browser",
    drawSignature: "Unterschrift zeichnen",
    clear: "Löschen",
    canvasHint: "Lokal gezeichnet — wird nie hochgeladen. Maus, Touchpad oder Finger.",
    signing: "Signieren…",
    signPdf: "PDF signieren",
    download: "Herunterladen",
    privacy: "Unterschrift auf der letzten Seite (unten rechts). Gezeichnete Unterschrift als PNG mit Transparenz eingebettet. Alles geschieht in Ihrem Browser — Ihre PDF wird niemals hochgeladen.",
    drawFirst: "Bitte zeichnen Sie zuerst Ihre Unterschrift.",
    couldNotSign: "Diese PDF konnte nicht signiert werden.",
  },
  it: {
    uploadLabel: "Carica il tuo PDF",
    uploadHint: "Qualsiasi cosa con almeno una pagina — rimane nel browser",
    drawSignature: "Disegna la tua firma",
    clear: "Cancella",
    canvasHint: "Disegnata localmente — mai caricata. Mouse, trackpad o dito.",
    signing: "Firma in corso…",
    signPdf: "Firma PDF",
    download: "Scarica",
    privacy: "Firma sull'ultima pagina (in basso a destra). Firma disegnata, incorporata come PNG con trasparenza. Tutto avviene nel browser — il tuo PDF non viene mai caricato.",
    drawFirst: "Disegna prima la tua firma.",
    couldNotSign: "Impossibile firmare quel PDF.",
  },
  nl: {
    uploadLabel: "Uw PDF uploaden",
    uploadHint: "Alles met minimaal één pagina — blijft in uw browser",
    drawSignature: "Teken uw handtekening",
    clear: "Wissen",
    canvasHint: "Lokaal getekend — nooit geüpload. Muis, trackpad of vinger.",
    signing: "Ondertekenen…",
    signPdf: "PDF ondertekenen",
    download: "Downloaden",
    privacy: "Handtekening op de laatste pagina (rechtsonder). Getekende handtekening als PNG met transparantie ingesloten. Alles gebeurt in uw browser — uw PDF wordt nooit geüpload.",
    drawFirst: "Teken eerst uw handtekening.",
    couldNotSign: "Kan dat PDF-bestand niet ondertekenen.",
  },
  ja: {
    uploadLabel: "PDFをアップロード",
    uploadHint: "少なくとも1ページあるもの — ブラウザ内に保持",
    drawSignature: "署名を描く",
    clear: "クリア",
    canvasHint: "ローカルで描画 — アップロードされません。マウス、タッチパッド、または指。",
    signing: "署名中…",
    signPdf: "PDFに署名",
    download: "ダウンロード",
    privacy: "最後のページ（右下）に署名します。透明度付きPNGとして埋め込まれた描画署名。すべてブラウザ内で処理 — PDFはアップロードされません。",
    drawFirst: "まず署名を描いてください。",
    couldNotSign: "そのPDFに署名できませんでした。",
  },
  zh: {
    uploadLabel: "上传您的PDF",
    uploadHint: "至少有一页的任何内容 — 保留在您的浏览器中",
    drawSignature: "绘制您的签名",
    clear: "清除",
    canvasHint: "本地绘制 — 从不上传。鼠标、触控板或手指。",
    signing: "正在签署…",
    signPdf: "签署PDF",
    download: "下载",
    privacy: "在最后一页（右下角）签名。绘制的签名以透明PNG嵌入。一切在您的浏览器中完成 — PDF永不上传。",
    drawFirst: "请先绘制您的签名。",
    couldNotSign: "无法签署该PDF。",
  },
  ko: {
    uploadLabel: "PDF 업로드",
    uploadHint: "최소 한 페이지 이상인 모든 것 — 브라우저에 유지",
    drawSignature: "서명 그리기",
    clear: "지우기",
    canvasHint: "로컬에서 그림 — 업로드되지 않음. 마우스, 트랙패드 또는 손가락.",
    signing: "서명 중…",
    signPdf: "PDF 서명",
    download: "다운로드",
    privacy: "마지막 페이지(오른쪽 하단)에 서명합니다. 그린 서명이 투명 PNG로 포함됩니다. 모든 것이 브라우저에서 처리 — PDF는 업로드되지 않습니다.",
    drawFirst: "먼저 서명을 그려주세요.",
    couldNotSign: "해당 PDF에 서명할 수 없습니다.",
  },
  ar: {
    uploadLabel: "ارفع PDF الخاص بك",
    uploadHint: "أي شيء بصفحة واحدة على الأقل — يبقى في متصفحك",
    drawSignature: "ارسم توقيعك",
    clear: "مسح",
    canvasHint: "مرسوم محلياً — لا يُرفع أبداً. الفأرة أو لوحة اللمس أو الإصبع.",
    signing: "جاري التوقيع…",
    signPdf: "توقيع PDF",
    download: "تنزيل",
    privacy: "يُوقَّع في آخر صفحة (أسفل اليمين). توقيع مرسوم، مضمَّن كـ PNG مع الشفافية. كل شيء يحدث في متصفحك — لا يُرفع PDF أبداً.",
    drawFirst: "يرجى رسم توقيعك أولاً.",
    couldNotSign: "تعذر توقيع هذا PDF.",
  },
  ru: {
    uploadLabel: "Загрузить PDF",
    uploadHint: "Любой файл хотя бы с одной страницей — остаётся в браузере",
    drawSignature: "Нарисуйте подпись",
    clear: "Очистить",
    canvasHint: "Рисуется локально — никогда не загружается. Мышь, тачпад или палец.",
    signing: "Подпись…",
    signPdf: "Подписать PDF",
    download: "Скачать",
    privacy: "Подпись размещается на последней странице (справа внизу). Нарисованная подпись встраивается как PNG с прозрачностью. Всё происходит в браузере — PDF никогда не загружается.",
    drawFirst: "Пожалуйста, сначала нарисуйте подпись.",
    couldNotSign: "Не удалось подписать PDF.",
  },
  hi: {
    uploadLabel: "अपना PDF अपलोड करें",
    uploadHint: "कम से कम एक पृष्ठ वाला कुछ भी — ब्राउज़र में रहता है",
    drawSignature: "अपना हस्ताक्षर बनाएं",
    clear: "साफ़ करें",
    canvasHint: "स्थानीय रूप से बनाया गया — कभी अपलोड नहीं। माउस, ट्रैकपैड या उंगली।",
    signing: "हस्ताक्षर हो रहा है…",
    signPdf: "PDF पर हस्ताक्षर करें",
    download: "डाउनलोड",
    privacy: "अंतिम पृष्ठ पर (नीचे-दाएं) हस्ताक्षर करता है। पारदर्शिता के साथ PNG के रूप में एम्बेडेड बनाया गया हस्ताक्षर। सब कुछ आपके ब्राउज़र में होता है — आपका PDF कभी अपलोड नहीं होता।",
    drawFirst: "कृपया पहले अपना हस्ताक्षर बनाएं।",
    couldNotSign: "उस PDF पर हस्ताक्षर नहीं किया जा सका।",
  },
  tr: {
    uploadLabel: "PDF'nizi yükleyin",
    uploadHint: "En az bir sayfası olan her şey — tarayıcınızda kalır",
    drawSignature: "İmzanızı çizin",
    clear: "Temizle",
    canvasHint: "Yerel olarak çizildi — hiçbir zaman yüklenmez. Fare, dokunmatik yüzey veya parmak.",
    signing: "İmzalanıyor…",
    signPdf: "PDF'yi İmzala",
    download: "İndir",
    privacy: "Son sayfaya (sağ alt) imzalar. Şeffaflıkla PNG olarak gömülü çizilmiş imza. Her şey tarayıcınızda gerçekleşir — PDF'niz hiçbir zaman yüklenmez.",
    drawFirst: "Lütfen önce imzanızı çizin.",
    couldNotSign: "O PDF imzalanamadı.",
  },
  id: {
    uploadLabel: "Unggah PDF Anda",
    uploadHint: "Apa pun dengan setidaknya satu halaman — tetap di browser Anda",
    drawSignature: "Gambar tanda tangan Anda",
    clear: "Hapus",
    canvasHint: "Digambar secara lokal — tidak pernah diunggah. Mouse, trackpad, atau jari.",
    signing: "Menandatangani…",
    signPdf: "Tandatangani PDF",
    download: "Unduh",
    privacy: "Menandatangani di halaman terakhir (kanan bawah). Tanda tangan yang digambar, disematkan sebagai PNG dengan transparansi. Semuanya terjadi di browser Anda — PDF tidak pernah diunggah.",
    drawFirst: "Silakan gambar tanda tangan Anda terlebih dahulu.",
    couldNotSign: "Tidak dapat menandatangani PDF tersebut.",
  },
  vi: {
    uploadLabel: "Tải lên PDF của bạn",
    uploadHint: "Bất kỳ thứ gì có ít nhất một trang — lưu trong trình duyệt của bạn",
    drawSignature: "Vẽ chữ ký của bạn",
    clear: "Xóa",
    canvasHint: "Vẽ cục bộ — không bao giờ tải lên. Chuột, bàn di chuột hoặc ngón tay.",
    signing: "Đang ký…",
    signPdf: "Ký PDF",
    download: "Tải xuống",
    privacy: "Ký ở trang cuối (góc dưới phải). Chữ ký được vẽ, nhúng dưới dạng PNG với độ trong suốt. Mọi thứ xảy ra trong trình duyệt của bạn — PDF không bao giờ được tải lên.",
    drawFirst: "Vui lòng vẽ chữ ký của bạn trước.",
    couldNotSign: "Không thể ký PDF đó.",
  },
  sv: {
    uploadLabel: "Ladda upp din PDF",
    uploadHint: "Vad som helst med minst en sida — stannar i din webbläsare",
    drawSignature: "Rita din signatur",
    clear: "Rensa",
    canvasHint: "Ritad lokalt — laddas aldrig upp. Mus, styrplatta eller finger.",
    signing: "Signerar…",
    signPdf: "Signera PDF",
    download: "Ladda ner",
    privacy: "Signerar på sista sidan (nedre höger). Ritad signatur inbäddad som PNG med transparens. Allt sker i din webbläsare — din PDF laddas aldrig upp.",
    drawFirst: "Rita din signatur först.",
    couldNotSign: "Kunde inte signera den PDF:en.",
  },
  pl: {
    uploadLabel: "Prześlij plik PDF",
    uploadHint: "Cokolwiek z co najmniej jedną stroną — pozostaje w przeglądarce",
    drawSignature: "Narysuj swój podpis",
    clear: "Wyczyść",
    canvasHint: "Rysowane lokalnie — nigdy nie przesyłane. Mysz, touchpad lub palec.",
    signing: "Podpisywanie…",
    signPdf: "Podpisz PDF",
    download: "Pobierz",
    privacy: "Podpisuje na ostatniej stronie (prawy dolny róg). Narysowany podpis osadzony jako PNG z przezroczystością. Wszystko dzieje się w przeglądarce — PDF nigdy nie jest przesyłany.",
    drawFirst: "Najpierw narysuj swój podpis.",
    couldNotSign: "Nie można podpisać tego pliku PDF.",
  },
  uk: {
    uploadLabel: "Завантажте свій PDF",
    uploadHint: "Будь-що з принаймні однією сторінкою — залишається у браузері",
    drawSignature: "Намалюйте підпис",
    clear: "Очистити",
    canvasHint: "Малюється локально — ніколи не завантажується. Миша, тачпад або палець.",
    signing: "Підписання…",
    signPdf: "Підписати PDF",
    download: "Завантажити",
    privacy: "Підписує на останній сторінці (праворуч знизу). Намальований підпис вбудовується як PNG з прозорістю. Все відбувається у вашому браузері — PDF ніколи не завантажується.",
    drawFirst: "Будь ласка, спочатку намалюйте підпис.",
    couldNotSign: "Не вдалося підписати цей PDF.",
  },
  cs: {
    uploadLabel: "Nahrát váš PDF",
    uploadHint: "Cokoliv s alespoň jednou stranou — zůstane ve vašem prohlížeči",
    drawSignature: "Nakreslete svůj podpis",
    clear: "Vymazat",
    canvasHint: "Nakresleno lokálně — nikdy nahráno. Myš, touchpad nebo prst.",
    signing: "Podepisuji…",
    signPdf: "Podepsat PDF",
    download: "Stáhnout",
    privacy: "Podepisuje na poslední stránce (vpravo dole). Nakreslený podpis vložen jako PNG s průhledností. Vše probíhá ve vašem prohlížeči — váš PDF se nikdy nenahrává.",
    drawFirst: "Nejprve nakreslete svůj podpis.",
    couldNotSign: "Tento PDF nelze podepsat.",
  },
};

export function SignPdfClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState("signed.pdf");
  const [outSize, setOutSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [empty, setEmpty] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  // Init canvas with a baseline guide.
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    cv.width = cv.clientWidth * (window.devicePixelRatio || 1);
    cv.height = cv.clientHeight * (window.devicePixelRatio || 1);
    const ctx = cv.getContext("2d")!;
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0f172a";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cv.clientWidth, cv.clientHeight);
    // Faint baseline.
    ctx.save();
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, cv.clientHeight - 24);
    ctx.lineTo(cv.clientWidth - 20, cv.clientHeight - 24);
    ctx.stroke();
    ctx.restore();
  }, []);

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    drawing.current = true;
    const { x, y } = pos(e);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(x, y);
    canvasRef.current!.setPointerCapture(e.pointerId);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const { x, y } = pos(e);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.lineTo(x, y);
    ctx.stroke();
    setEmpty(false);
  }
  function end() { drawing.current = false; }

  function clearSig() {
    const cv = canvasRef.current!;
    const ctx = cv.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cv.clientWidth, cv.clientHeight);
    ctx.save();
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, cv.clientHeight - 24);
    ctx.lineTo(cv.clientWidth - 20, cv.clientHeight - 24);
    ctx.stroke();
    ctx.restore();
    setEmpty(true);
  }

  // Crop the bounding box of the inked pixels so the signature lands tight on
  // the page (no big white border around the strokes).
  async function trimSignature(): Promise<Blob | null> {
    const cv = canvasRef.current!;
    const ctx = cv.getContext("2d")!;
    const { width: w, height: h } = cv;
    const data = ctx.getImageData(0, 0, w, h).data;
    let minX = w, minY = h, maxX = 0, maxY = 0, found = false;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        // Treat near-white as background (the baseline guide is light grey, so
        // its pixels are >= ~220; ink is < ~80 typically).
        if (data[i] < 180) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
          found = true;
        }
      }
    }
    if (!found) return null;
    const pad = 8;
    minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
    maxX = Math.min(w - 1, maxX + pad); maxY = Math.min(h - 1, maxY + pad);
    const ow = maxX - minX + 1, oh = maxY - minY + 1;
    const out = document.createElement("canvas");
    out.width = ow; out.height = oh;
    const trimCtx = out.getContext("2d")!;
    trimCtx.drawImage(cv, minX, minY, ow, oh, 0, 0, ow, oh);
    // Drop near-white to transparent so the stamp blends onto any background.
    const px = trimCtx.getImageData(0, 0, ow, oh);
    for (let i = 0; i < px.data.length; i += 4) {
      const lum = (px.data[i] + px.data[i + 1] + px.data[i + 2]) / 3;
      // 225 (was 235) so the very light baseline guide line (#e2e8f0 ≈ 233) is
      // dropped to transparent too; real pen ink is far darker (<150).
      if (lum > 225) px.data[i + 3] = 0;
    }
    trimCtx.putImageData(px, 0, 0);
    return await new Promise<Blob | null>((res) => out.toBlob(res, "image/png"));
  }

  async function sign() {
    if (!file || empty || busy) return;
    setBusy(true); setError(null); setOutUrl(null);
    try {
      const sigBlob = await trimSignature();
      if (!sigBlob) { setError(s.drawFirst); setBusy(false); return; }

      const { PDFDocument } = await import("pdf-lib");
      const pdfBytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(pdfBytes);
      const sigBytes = new Uint8Array(await sigBlob.arrayBuffer());
      const png = await doc.embedPng(sigBytes);

      // Drop on the LAST page, bottom-right, ~22% of page width.
      const pages = doc.getPages();
      const last = pages[pages.length - 1];
      const { width: pw, height: ph } = last.getSize();
      const targetW = pw * 0.22;
      const targetH = targetW * (png.height / png.width);
      const margin = Math.min(pw, ph) * 0.05;
      last.drawImage(png, {
        x: pw - targetW - margin,
        y: margin,
        width: targetW,
        height: targetH,
      });

      const outBytes = await doc.save();
      const blob = new Blob([new Uint8Array(outBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(url);
      setOutSize(blob.size);
      setOutName(file.name.replace(/\.pdf$/i, "") + "-signed.pdf");
    } catch (e) {
      setError(e instanceof Error ? e.message : s.couldNotSign);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 bg-brand-50/30 px-6 py-12 text-center transition-colors hover:border-brand-300">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Upload className="h-5 w-5" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">{s.uploadLabel}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setOutUrl(null); setError(null); } }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setOutUrl(null); }}
            className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="rounded-lg border border-ink-100 bg-white p-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-ink-700">{s.drawSignature}</label>
          <Button size="sm" variant="outline" onClick={clearSig}><Eraser className="h-3.5 w-3.5" /> {s.clear}</Button>
        </div>
        <canvas
          ref={canvasRef}
          onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onPointerLeave={end}
          className="mt-2 h-40 w-full touch-none cursor-crosshair rounded border border-ink-200 bg-white"
        />
        <p className="mt-1 text-xs text-ink-400">{s.canvasHint}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={sign} disabled={!file || empty || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <PenLine className="h-4 w-4" />}
          {busy ? s.signing : s.signPdf}
        </Button>
        {outUrl && (
          <a href={outUrl} download={outName}>
            <Button size="lg" variant="outline">
              <Download className="h-4 w-4" /> {s.download} · {formatBytes(outSize)}
            </Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">
        {s.privacy}
      </p>
    </div>
  );
}
