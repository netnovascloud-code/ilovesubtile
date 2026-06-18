"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const SIZES = [256, 512, 1024] as const;
const LEVELS = [
  { id: "L", label: "Low (≈7%)" },
  { id: "M", label: "Medium (≈15%)" },
  { id: "Q", label: "Quartile (≈25%)" },
  { id: "H", label: "High (≈30%)" },
] as const;

const T: Record<string, Record<string, string>> = {
  en: {
    content: "Content",
    placeholder: "URL, text, Wi-Fi credentials…",
    errorCorrection: "Error correction",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "Generated in your browser — nothing is uploaded.",
    typeSomething: "Type something…",
    downloadPng: "Download PNG",
    errorPrefix: "Could not encode: ",
  },
  fr: {
    content: "Contenu",
    placeholder: "URL, texte, identifiants Wi-Fi…",
    errorCorrection: "Correction d’erreur",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "Généré dans votre navigateur — rien n’est envoyé.",
    typeSomething: "Saisissez quelque chose…",
    downloadPng: "Télécharger PNG",
    errorPrefix: "Impossible d’encoder : ",
  },
  es: {
    content: "Contenido",
    placeholder: "URL, texto, credenciales Wi-Fi…",
    errorCorrection: "Corrección de errores",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "Generado en tu navegador — nada se sube.",
    typeSomething: "Escribe algo…",
    downloadPng: "Descargar PNG",
    errorPrefix: "No se pudo codificar: ",
  },
  pt: {
    content: "Conteúdo",
    placeholder: "URL, texto, credenciais Wi-Fi…",
    errorCorrection: "Correção de erros",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "Gerado no seu navegador — nada é enviado.",
    typeSomething: "Digite algo…",
    downloadPng: "Baixar PNG",
    errorPrefix: "Não foi possível codificar: ",
  },
  de: {
    content: "Inhalt",
    placeholder: "URL, Text, WLAN-Zugangsdaten…",
    errorCorrection: "Fehlerkorrektur",
    fgLabel: "VG",
    bgLabel: "HG",
    privacy: "In Ihrem Browser generiert — nichts wird hochgeladen.",
    typeSomething: "Etwas eingeben…",
    downloadPng: "PNG herunterladen",
    errorPrefix: "Codierung fehlgeschlagen: ",
  },
  it: {
    content: "Contenuto",
    placeholder: "URL, testo, credenziali Wi-Fi…",
    errorCorrection: "Correzione errori",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "Generato nel tuo browser — nulla viene caricato.",
    typeSomething: "Digita qualcosa…",
    downloadPng: "Scarica PNG",
    errorPrefix: "Impossibile codificare: ",
  },
  nl: {
    content: "Inhoud",
    placeholder: "URL, tekst, Wi-Fi-inloggegevens…",
    errorCorrection: "Foutcorrectie",
    fgLabel: "VG",
    bgLabel: "AG",
    privacy: "Gegenereerd in uw browser — er wordt niets geüpload.",
    typeSomething: "Typ iets…",
    downloadPng: "PNG downloaden",
    errorPrefix: "Coderen mislukt: ",
  },
  ja: {
    content: "コンテンツ",
    placeholder: "URL、テキスト、Wi-Fi認証情報…",
    errorCorrection: "誤り訂正",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "ブラウザ内で生成 — 何もアップロードされません。",
    typeSomething: "何か入力してください…",
    downloadPng: "PNG をダウンロード",
    errorPrefix: "エンコードできませんでした: ",
  },
  zh: {
    content: "内容",
    placeholder: "URL、文本、Wi-Fi 凭证…",
    errorCorrection: "纠错级别",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "在您的浏览器中生成 — 不上传任何内容。",
    typeSomething: "请输入内容…",
    downloadPng: "下载 PNG",
    errorPrefix: "无法编码: ",
  },
  ko: {
    content: "내용",
    placeholder: "URL, 텍스트, Wi-Fi 자격 증명…",
    errorCorrection: "오류 보정",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "브라우저에서 생성 — 엄로드되지 않습니다.",
    typeSomething: "무언가 입력하세요…",
    downloadPng: "PNG 다운로드",
    errorPrefix: "인코딩 실패: ",
  },
  ar: {
    content: "المحتوى",
    placeholder: "رابط URL أو نص أو بيانات Wi-Fi…",
    errorCorrection: "تصحيح الأخطاء",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "يُولَد في متصفحك — لا يُرفع شيء.",
    typeSomething: "اكتب شيئاً…",
    downloadPng: "تنزيل PNG",
    errorPrefix: "تعذّر الترميز: ",
  },
  ru: {
    content: "Содержимое",
    placeholder: "URL, текст, данные Wi-Fi…",
    errorCorrection: "Исправление ошибок",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "Генерация в браузере — ничего не загружается.",
    typeSomething: "Введите текст…",
    downloadPng: "Скачать PNG",
    errorPrefix: "Ошибка кодирования: ",
  },
  hi: {
    content: "सामग्री",
    placeholder: "URL, त्वरित संदेश, Wi-Fi क्रेडेंशियल…",
    errorCorrection: "त्रुटि सुधार",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "आपके ब्राउज़र में निर्मित — कुछ भी अपलोड नहीं होता।",
    typeSomething: "कुछ टाइप करें…",
    downloadPng: "PNG डाउनलोड करें",
    errorPrefix: "एन्कोड नहीं हो सका: ",
  },
  tr: {
    content: "İçerik",
    placeholder: "URL, metin, Wi-Fi kimlik bilgileri…",
    errorCorrection: "Hata düzeltme",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "Tarayıcınızda oluşturuldu — hiçbir şey yüklenmedi.",
    typeSomething: "Bir şeyler yazın…",
    downloadPng: "PNG indir",
    errorPrefix: "Kodlanamadı: ",
  },
  id: {
    content: "Konten",
    placeholder: "URL, teks, kredensial Wi-Fi…",
    errorCorrection: "Koreksi kesalahan",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "Dibuat di browser Anda — tidak ada yang diunggah.",
    typeSomething: "Ketik sesuatu…",
    downloadPng: "Unduh PNG",
    errorPrefix: "Tidak dapat mengkodekan: ",
  },
  vi: {
    content: "Nội dung",
    placeholder: "URL, văn bản, thông tin Wi-Fi…",
    errorCorrection: "Sửa lỗi",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "Được tạo trong trình duyệt — không có gì được tải lên.",
    typeSomething: "Gõ gì đó…",
    downloadPng: "Tải xuống PNG",
    errorPrefix: "Không thể mã hóa: ",
  },
  sv: {
    content: "Innehåll",
    placeholder: "URL, text, Wi-Fi-uppgifter…",
    errorCorrection: "Felkorrigering",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "Genereras i din webbläsare — inget laddas upp.",
    typeSomething: "Skriv något…",
    downloadPng: "Ladda ner PNG",
    errorPrefix: "Kunde inte koda: ",
  },
  pl: {
    content: "Treść",
    placeholder: "URL, tekst, dane logowania Wi-Fi…",
    errorCorrection: "Korekcja błędów",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "Wygenerowano w Twojej przeglądarce — nic nie jest wysyłane.",
    typeSomething: "Wpisz coś…",
    downloadPng: "Pobierz PNG",
    errorPrefix: "Nie można zakodować: ",
  },
  uk: {
    content: "Вміст",
    placeholder: "URL, текст, дані Wi-Fi…",
    errorCorrection: "Виправлення помилок",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "Створено у вашому браузері — нічого не завантажується.",
    typeSomething: "Введіть щось…",
    downloadPng: "Завантажити PNG",
    errorPrefix: "Помилка кодування: ",
  },
  cs: {
    content: "Obsah",
    placeholder: "URL, text, přihlašovací údaje Wi-Fi…",
    errorCorrection: "Oprava chyb",
    fgLabel: "FG",
    bgLabel: "BG",
    privacy: "Vygenerováno ve vašem prohlížeči — nic se nenačítá.",
    typeSomething: "Zadejte něco…",
    downloadPng: "Stáhnout PNG",
    errorPrefix: "Nelze kódovat: ",
  },
};

export function QrGeneratorClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [text, setText] = useState("https://konvertools.com");
  const [size, setSize] = useState<number>(512);
  const [level, setLevel] = useState<string>("M");
  const [fg, setFg] = useState("#0B0F19");
  const [bg, setBg] = useState("#FFFFFF");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!text.trim()) { setDataUrl(""); return; }
      try {
        const QRCode = (await import("qrcode")).default;
        const url = await QRCode.toDataURL(text, { width: size, errorCorrectionLevel: level as "L" | "M" | "Q" | "H", margin: 2, color: { dark: fg, light: bg } });
        if (alive) { setDataUrl(url); setError(null); }
      } catch (e) {
        if (alive) { setError(`${s.errorPrefix}${(e as Error).message}`); setDataUrl(""); }
      }
    })();
    return () => { alive = false; };
  }, [text, size, level, fg, bg, s.errorPrefix]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_auto]">
      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">{s.content}</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={s.placeholder}
            className="h-32 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
            {SIZES.map((sz) => (
              <button key={sz} onClick={() => setSize(sz)} className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors", size === sz ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>{sz}px</button>
            ))}
          </div>
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm">
            {LEVELS.map((l) => <option key={l.id} value={l.id}>{s.errorCorrection}: {l.label}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm text-ink-600">{s.fgLabel} <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-ink-200" /></label>
          <label className="flex items-center gap-2 text-sm text-ink-600">{s.bgLabel} <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-ink-200" /></label>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <p className="text-xs text-ink-400">{s.privacy}</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="rounded-xl border border-ink-200 bg-white p-4 shadow-card">
          {dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={dataUrl} alt="QR code" className="h-56 w-56" />
          ) : (
            <div className="grid h-56 w-56 place-items-center text-sm text-ink-300">{s.typeSomething}</div>
          )}
        </div>
        {dataUrl && (
          <a href={dataUrl} download="qr.png">
            <Button><Download className="h-4 w-4" /> {s.downloadPng}</Button>
          </a>
        )}
      </div>
    </div>
  );
}
