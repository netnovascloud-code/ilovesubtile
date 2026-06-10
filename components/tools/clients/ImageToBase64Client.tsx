"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    headingEncode: "Image → Base64",
    uploadLabel: "Upload an image",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — encoded in your browser",
    includePrefix: "Include",
    uriPrefix: "URI prefix",
    copied: "Copied",
    copy: "Copy",
    headingDecode: "Base64 → Image",
    decodePlaceholder: "Paste a base64 string (with or without the data: URI prefix)…",
    defaultMime: "Default MIME (when no",
    prefix: "prefix)",
    decodeBtn: "Decode",
    downloadBtn: "Download",
    privacy: "100% in your browser — your image and base64 string never leave your device.",
  },
  fr: {
    headingEncode: "Image → Base64",
    uploadLabel: "Télécharger une image",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — encodé dans votre navigateur",
    includePrefix: "Inclure le préfixe",
    uriPrefix: "URI",
    copied: "Copié",
    copy: "Copier",
    headingDecode: "Base64 → Image",
    decodePlaceholder: "Collez une chaîne base64 (avec ou sans le préfixe data: URI)…",
    defaultMime: "MIME par défaut (sans préfixe",
    prefix: ")",
    decodeBtn: "Décoder",
    downloadBtn: "Télécharger",
    privacy: "100% dans votre navigateur — votre image et la chaîne base64 ne quittent jamais votre appareil.",
  },
  es: {
    headingEncode: "Imagen → Base64",
    uploadLabel: "Subir una imagen",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — codificado en tu navegador",
    includePrefix: "Incluir prefijo",
    uriPrefix: "URI",
    copied: "Copiado",
    copy: "Copiar",
    headingDecode: "Base64 → Imagen",
    decodePlaceholder: "Pega una cadena base64 (con o sin el prefijo data: URI)…",
    defaultMime: "MIME predeterminado (sin prefijo",
    prefix: ")",
    decodeBtn: "Decodificar",
    downloadBtn: "Descargar",
    privacy: "100% en tu navegador — tu imagen y la cadena base64 nunca salen de tu dispositivo.",
  },
  pt: {
    headingEncode: "Imagem → Base64",
    uploadLabel: "Carregar uma imagem",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — codificado no seu navegador",
    includePrefix: "Incluir prefixo",
    uriPrefix: "URI",
    copied: "Copiado",
    copy: "Copiar",
    headingDecode: "Base64 → Imagem",
    decodePlaceholder: "Cole uma string base64 (com ou sem o prefixo data: URI)…",
    defaultMime: "MIME padrão (sem prefixo",
    prefix: ")",
    decodeBtn: "Decodificar",
    downloadBtn: "Baixar",
    privacy: "100% no seu navegador — a sua imagem e a string base64 nunca saem do seu dispositivo.",
  },
  de: {
    headingEncode: "Bild → Base64",
    uploadLabel: "Bild hochladen",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — im Browser kodiert",
    includePrefix: "Präfix einschließen",
    uriPrefix: "URI",
    copied: "Kopiert",
    copy: "Kopieren",
    headingDecode: "Base64 → Bild",
    decodePlaceholder: "Base64-Zeichenkette einfügen (mit oder ohne data: URI-Präfix)…",
    defaultMime: "Standard-MIME (ohne Präfix",
    prefix: ")",
    decodeBtn: "Dekodieren",
    downloadBtn: "Herunterladen",
    privacy: "100% im Browser — Ihr Bild und die Base64-Zeichenkette verlassen nie Ihr Gerät.",
  },
  it: {
    headingEncode: "Immagine → Base64",
    uploadLabel: "Carica un'immagine",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — codificato nel browser",
    includePrefix: "Includi prefisso",
    uriPrefix: "URI",
    copied: "Copiato",
    copy: "Copia",
    headingDecode: "Base64 → Immagine",
    decodePlaceholder: "Incolla una stringa base64 (con o senza il prefisso data: URI)…",
    defaultMime: "MIME predefinito (senza prefisso",
    prefix: ")",
    decodeBtn: "Decodifica",
    downloadBtn: "Scarica",
    privacy: "100% nel browser — la tua immagine e la stringa base64 non lasciano mai il tuo dispositivo.",
  },
  nl: {
    headingEncode: "Afbeelding → Base64",
    uploadLabel: "Afbeelding uploaden",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — gecodeerd in uw browser",
    includePrefix: "Voorvoegsel opnemen",
    uriPrefix: "URI",
    copied: "Gekopieerd",
    copy: "Kopieer",
    headingDecode: "Base64 → Afbeelding",
    decodePlaceholder: "Plak een base64-tekenreeks (met of zonder het data: URI-voorvoegsel)…",
    defaultMime: "Standaard MIME (zonder voorvoegsel",
    prefix: ")",
    decodeBtn: "Decoderen",
    downloadBtn: "Downloaden",
    privacy: "100% in uw browser — uw afbeelding en de base64-string verlaten nooit uw apparaat.",
  },
  ja: {
    headingEncode: "画像 → Base64",
    uploadLabel: "画像をアップロード",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — ブラウザでエンコード",
    includePrefix: "プレフィックスを含める",
    uriPrefix: "URI",
    copied: "コピーしました",
    copy: "コピー",
    headingDecode: "Base64 → 画像",
    decodePlaceholder: "base64 文字列を貼り付けてください（data: URI プレフィックスあり・なし）…",
    defaultMime: "デフォルト MIME（プレフィックスなし",
    prefix: "）",
    decodeBtn: "デコード",
    downloadBtn: "ダウンロード",
    privacy: "ブラウザ内で 100% 処理—画像と base64 文字列はデバイスから出ません。",
  },
  zh: {
    headingEncode: "图片 → Base64",
    uploadLabel: "上传图片",
    uploadHint: "JPG、PNG、GIF、WebP、SVG — 在您的浏览器中编码",
    includePrefix: "包含前缀",
    uriPrefix: "URI",
    copied: "已复制",
    copy: "复制",
    headingDecode: "Base64 → 图片",
    decodePlaceholder: "粘贴 base64 字符串（带或不带 data: URI 前缀）…",
    defaultMime: "默认 MIME（无前缀",
    prefix: "）",
    decodeBtn: "解码",
    downloadBtn: "下载",
    privacy: "100% 在您的浏览器中处理—图片和 base64 字符串不会离开您的设备。",
  },
  ko: {
    headingEncode: "이미지 → Base64",
    uploadLabel: "이미지 업로드",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — 브라우저에서 인코딩",
    includePrefix: "접두사 포함",
    uriPrefix: "URI",
    copied: "복사됨",
    copy: "복사",
    headingDecode: "Base64 → 이미지",
    decodePlaceholder: "base64 문자열을 붙여넣으세요 (data: URI 접두사 포함 또는 제외)…",
    defaultMime: "기본 MIME (접두사 없음",
    prefix: ")",
    decodeBtn: "디코딩",
    downloadBtn: "다운로드",
    privacy: "브라우저에서 100% 처리—이미지와 base64 문자열은 기기를 벗어나지 않습니다.",
  },
  ar: {
    headingEncode: "صورة → Base64",
    uploadLabel: "تحميل صورة",
    uploadHint: "JPG أو PNG أو GIF أو WebP أو SVG — مُشفَّر في متصفحك",
    includePrefix: "تضمين البادئة",
    uriPrefix: "URI",
    copied: "تم النسخ",
    copy: "نسخ",
    headingDecode: "Base64 → صورة",
    decodePlaceholder: "الصق سلسلة base64 (مع بادئة data: URI أو بدونها)…",
    defaultMime: "MIME الافتراضي (بدون بادئة",
    prefix: ")",
    decodeBtn: "فك التشفير",
    downloadBtn: "تنزيل",
    privacy: "100% في متصفحك — صورتك وسلسلة base64 لا تغادران جهازك أبداً.",
  },
  ru: {
    headingEncode: "Изображение → Base64",
    uploadLabel: "Загрузить изображение",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — кодирование в браузере",
    includePrefix: "Включить префикс",
    uriPrefix: "URI",
    copied: "Скопировано",
    copy: "Копировать",
    headingDecode: "Base64 → Изображение",
    decodePlaceholder: "Вставьте строку base64 (с префиксом data: URI или без)…",
    defaultMime: "MIME по умолчанию (без префикса",
    prefix: ")",
    decodeBtn: "Декодировать",
    downloadBtn: "Скачать",
    privacy: "100% в браузере — ваше изображение и строка base64 никогда не покидают устройство.",
  },
  hi: {
    headingEncode: "छवि → Base64",
    uploadLabel: "छवि अपलोड करें",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — आपके ब्राउज़र में एन्कोड",
    includePrefix: "प्रीफिक्स शामिल करें",
    uriPrefix: "URI",
    copied: "कॉपी हो गया",
    copy: "कॉपी करें",
    headingDecode: "Base64 → छवि",
    decodePlaceholder: "base64 स्ट्रिंग पेस्ट करें (data: URI प्रीफिक्स के साथ या बिना)…",
    defaultMime: "डिफ़ॉल्ट MIME (प्रीफिक्स के बिना",
    prefix: ")",
    decodeBtn: "डिकोड करें",
    downloadBtn: "डाउनलोड",
    privacy: "आपके ब्राउज़र में 100% — आपकी छवि और base64 स्ट्रिंग आपके डिवाइस से कभी नहीं निकलते।",
  },
  tr: {
    headingEncode: "Görsel → Base64",
    uploadLabel: "Görsel yükle",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — tarayıcınızda kodlanır",
    includePrefix: "Ön ek ekle",
    uriPrefix: "URI",
    copied: "Kopyalandı",
    copy: "Kopyala",
    headingDecode: "Base64 → Görsel",
    decodePlaceholder: "base64 dizisini yapıştırın (data: URI ön ekiyle veya olmadan)…",
    defaultMime: "Varsayılan MIME (ön ek olmadan",
    prefix: ")",
    decodeBtn: "Çöz",
    downloadBtn: "İndir",
    privacy: "Tarayıcınızda %100 — görseliniz ve base64 dizisi hiçbir zaman cihazınızı terk etmez.",
  },
  id: {
    headingEncode: "Gambar → Base64",
    uploadLabel: "Unggah gambar",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — dikodekan di browser Anda",
    includePrefix: "Sertakan awalan",
    uriPrefix: "URI",
    copied: "Disalin",
    copy: "Salin",
    headingDecode: "Base64 → Gambar",
    decodePlaceholder: "Tempelkan string base64 (dengan atau tanpa awalan data: URI)…",
    defaultMime: "MIME default (tanpa awalan",
    prefix: ")",
    decodeBtn: "Dekode",
    downloadBtn: "Unduh",
    privacy: "100% di browser Anda — gambar dan string base64 tidak pernah meninggalkan perangkat Anda.",
  },
  vi: {
    headingEncode: "Hình ảnh → Base64",
    uploadLabel: "Tải lên hình ảnh",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — mã hóa trong trình duyệt của bạn",
    includePrefix: "Bao gồm tiền tố",
    uriPrefix: "URI",
    copied: "Đã sao chép",
    copy: "Sao chép",
    headingDecode: "Base64 → Hình ảnh",
    decodePlaceholder: "Dán chuỗi base64 (có hoặc không có tiền tố data: URI)…",
    defaultMime: "MIME mặc định (không có tiền tố",
    prefix: ")",
    decodeBtn: "Giải mã",
    downloadBtn: "Tải xuống",
    privacy: "100% trong trình duyệt của bạn — hình ảnh và chuỗi base64 không bao giờ rời khỏi thiết bị của bạn.",
  },
  sv: {
    headingEncode: "Bild → Base64",
    uploadLabel: "Ladda upp en bild",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — kodad i din webbläsare",
    includePrefix: "Inkludera prefix",
    uriPrefix: "URI",
    copied: "Kopierat",
    copy: "Kopiera",
    headingDecode: "Base64 → Bild",
    decodePlaceholder: "Klistra in en base64-sträng (med eller utan data: URI-prefix)…",
    defaultMime: "Standard-MIME (utan prefix",
    prefix: ")",
    decodeBtn: "Avkoda",
    downloadBtn: "Ladda ned",
    privacy: "100% i din webbläsare — din bild och base64-strängen lämnar aldrig din enhet.",
  },
  pl: {
    headingEncode: "Obraz → Base64",
    uploadLabel: "Prześlij obraz",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — kodowane w Twojej przeglądarce",
    includePrefix: "Dołącz prefiks",
    uriPrefix: "URI",
    copied: "Skopiowano",
    copy: "Kopiuj",
    headingDecode: "Base64 → Obraz",
    decodePlaceholder: "Wklej ciąg base64 (z prefiksem data: URI lub bez)…",
    defaultMime: "Domyślny MIME (bez prefiksu",
    prefix: ")",
    decodeBtn: "Dekoduj",
    downloadBtn: "Pobierz",
    privacy: "100% w Twojej przeglądarce — Twój obraz i ciąg base64 nigdy nie opuszczają Twojego urządzenia.",
  },
  uk: {
    headingEncode: "Зображення → Base64",
    uploadLabel: "Завантажити зображення",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — кодування у браузері",
    includePrefix: "Включити префікс",
    uriPrefix: "URI",
    copied: "Скопійовано",
    copy: "Копіювати",
    headingDecode: "Base64 → Зображення",
    decodePlaceholder: "Вставте рядок base64 (з префіксом data: URI або без)…",
    defaultMime: "MIME за замовчуванням (без префіксу",
    prefix: ")",
    decodeBtn: "Декодувати",
    downloadBtn: "Завантажити",
    privacy: "100% у браузері — ваше зображення та рядок base64 ніколи не залишають пристрій.",
  },
  cs: {
    headingEncode: "Obrázek → Base64",
    uploadLabel: "Nahrát obrázek",
    uploadHint: "JPG, PNG, GIF, WebP, SVG — kódováno ve vašem prohlížeči",
    includePrefix: "Zahrnout předponu",
    uriPrefix: "URI",
    copied: "Zkopírováno",
    copy: "Kopírovat",
    headingDecode: "Base64 → Obrázek",
    decodePlaceholder: "Vložte base64 řetězec (s předponou data: URI nebo bez)…",
    defaultMime: "Výchozí MIME (bez předpony",
    prefix: ")",
    decodeBtn: "Dekódovat",
    downloadBtn: "Stáhnout",
    privacy: "100% ve vašem prohlížeči — váš obrázek a base64 řetězec nikdy neopustí vaše zařízení.",
  },
};

const MIMES: { id: string; label: string }[] = [
  { id: "image/png", label: "PNG" },
  { id: "image/jpeg", label: "JPEG" },
  { id: "image/gif", label: "GIF" },
  { id: "image/webp", label: "WebP" },
  { id: "image/svg+xml", label: "SVG" },
];

const EXT_BY_MIME: Record<string, string> = {
  "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif", "image/webp": "webp", "image/svg+xml": "svg",
};

export function ImageToBase64Client() {
  const s = T[useLocale()] ?? T.en;

  // ─── Encode mode ────────────────────────────────────────────────────────
  const [file, setFile] = useState<File | null>(null);
  const [b64, setB64] = useState<string>("");
  const [withPrefix, setWithPrefix] = useState(true);
  const [copied, setCopied] = useState(false);
  // ─── Decode mode ────────────────────────────────────────────────────────
  const [decodeInput, setDecodeInput] = useState("");
  const [decodeMime, setDecodeMime] = useState("image/png");
  const [decodeUrl, setDecodeUrl] = useState<string | null>(null);
  const [decodeName, setDecodeName] = useState("decoded.png");
  const decodeRef = useRef<string | null>(null);

  useEffect(() => () => { if (decodeRef.current) URL.revokeObjectURL(decodeRef.current); }, []);

  async function pick(f: File | null) {
    if (!f) return;
    setFile(f);
    const buf = new Uint8Array(await f.arrayBuffer());
    // Streaming-safe base64 of a Uint8Array (chunked to avoid argument size limits).
    let out = "";
    const chunk = 0x8000;
    for (let i = 0; i < buf.length; i += chunk) {
      out += String.fromCharCode.apply(null, buf.subarray(i, i + chunk) as unknown as number[]);
    }
    setB64(btoa(out));
  }

  const output = b64 ? (withPrefix ? `data:${file?.type || "image/png"};base64,${b64}` : b64) : "";

  async function copyEnc() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
  }

  function decode() {
    setDecodeUrl(null);
    if (decodeRef.current) { URL.revokeObjectURL(decodeRef.current); decodeRef.current = null; }
    const raw = decodeInput.trim();
    if (!raw) return;
    const m = raw.match(/^data:(image\/[a-z0-9+\-.]+);base64,(.+)$/i);
    const data = m ? m[2] : raw.replace(/\s+/g, "");
    const mime = m ? m[1] : decodeMime;
    setDecodeName(`decoded.${EXT_BY_MIME[mime.toLowerCase()] ?? "bin"}`);
    try {
      const bin = atob(data);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      const url = URL.createObjectURL(new Blob([arr as BlobPart], { type: mime }));
      decodeRef.current = url;
      setDecodeUrl(url);
    } catch {
      setDecodeUrl(null);
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-base font-semibold text-ink-900">{s.headingEncode}</h2>
        {!file ? (
          <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
            <Upload className="h-6 w-6 text-teal-600" />
            <span className="mt-2 font-medium text-ink-900">{s.uploadLabel}</span>
            <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
          </label>
        ) : (
          <div className="mt-3 flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
            <div className="min-w-0 truncate">
              <span className="font-medium text-ink-900">{file.name}</span>
              <span className="ml-2 text-ink-400">{formatBytes(file.size)} · {file.type}</span>
            </div>
            <button onClick={() => { setFile(null); setB64(""); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
          </div>
        )}

        {b64 && (
          <>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-ink-700">
                <input type="checkbox" checked={withPrefix} onChange={(e) => setWithPrefix(e.target.checked)} className="h-4 w-4" />
                {s.includePrefix} <code className="rounded bg-ink-100 px-1 text-xs">data:</code> {s.uriPrefix}
              </label>
              <span className="text-xs text-ink-400">{output.length.toLocaleString()} chars</span>
              <Button size="sm" variant="outline" onClick={copyEnc}>
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? s.copied : s.copy}
              </Button>
            </div>
            <textarea readOnly value={output}
              className="mt-3 h-48 w-full resize-y rounded-lg border border-ink-100 bg-ink-900 p-3 font-mono text-xs text-ink-50" />
          </>
        )}
      </section>

      <section>
        <h2 className="text-base font-semibold text-ink-900">{s.headingDecode}</h2>
        <textarea value={decodeInput} onChange={(e) => setDecodeInput(e.target.value)}
          placeholder={s.decodePlaceholder}
          className="mt-3 h-32 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-xs text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-ink-700">
            {s.defaultMime} <code className="rounded bg-ink-100 px-1 text-xs">data:</code> {s.prefix}
            <select value={decodeMime} onChange={(e) => setDecodeMime(e.target.value)} className="rounded-md border border-ink-200 bg-white px-2 py-1 text-sm">
              {MIMES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </label>
          <Button size="sm" onClick={decode} disabled={!decodeInput.trim()}>{s.decodeBtn}</Button>
        </div>
        {decodeUrl && (
          <div className="mt-4 flex flex-wrap items-center gap-4 rounded-lg border border-ink-100 bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={decodeUrl} alt="Decoded" className="max-h-56 max-w-full rounded" />
            <a href={decodeUrl} download={decodeName}>
              <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> {s.downloadBtn}</Button>
            </a>
          </div>
        )}
      </section>

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
