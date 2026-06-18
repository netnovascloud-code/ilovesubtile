"use client";

import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Download, ShieldAlert, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

type Tags = Record<string, string>;

const TAG_NAMES: Record<number, string> = {
  0x010f: "Make", 0x0110: "Camera model", 0x0112: "Orientation", 0x0131: "Software",
  0x0132: "Date/time", 0x013b: "Artist", 0x8298: "Copyright", 0x9003: "Date taken",
  0x829a: "Exposure time", 0x829d: "F-number", 0x8827: "ISO", 0x920a: "Focal length",
  0xa002: "Width", 0xa003: "Height",
};
const GPS_NAMES: Record<number, string> = { 0x0001: "GPS lat ref", 0x0002: "GPS latitude", 0x0003: "GPS long ref", 0x0004: "GPS longitude" };

function readEntries(dv: DataView, tiff: number, ifd: number, le: boolean, names: Record<number, string>, out: Tags, follow?: { exif?: number[]; gps?: number[] }) {
  const u16 = (o: number) => dv.getUint16(o, le);
  const u32 = (o: number) => dv.getUint32(o, le);
  const count = u16(ifd);
  for (let i = 0; i < count; i++) {
    const e = ifd + 2 + i * 12;
    const tag = u16(e), type = u16(e + 2), num = u32(e + 4);
    const sizes: Record<number, number> = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 9: 4, 10: 8 };
    const byteLen = (sizes[type] ?? 1) * num;
    const valOff = byteLen <= 4 ? e + 8 : tiff + u32(e + 8);
    if (follow?.exif && tag === 0x8769) { follow.exif.push(tiff + u32(e + 8)); continue; }
    if (follow?.gps && tag === 0x8825) { follow.gps.push(tiff + u32(e + 8)); continue; }
    const name = names[tag];
    if (!name) continue;
    let value = "";
    if (type === 2) {
      let s = "";
      for (let j = 0; j < num && dv.getUint8(valOff + j); j++) s += String.fromCharCode(dv.getUint8(valOff + j));
      value = s.trim();
    } else if (type === 3) value = String(u16(valOff));
    else if (type === 4) value = String(u32(valOff));
    else if (type === 5 || type === 10) {
      const parts: string[] = [];
      for (let j = 0; j < num; j++) {
        const n = le ? dv.getUint32(valOff + j * 8, true) : dv.getUint32(valOff + j * 8, false);
        const d = le ? dv.getUint32(valOff + j * 8 + 4, true) : dv.getUint32(valOff + j * 8 + 4, false);
        parts.push(d ? String(+(n / d).toFixed(4)) : String(n));
      }
      value = parts.join(", ");
    }
    if (value) out[name] = value;
  }
}

function parseExif(buf: ArrayBuffer): { tags: Tags; hasGps: boolean } {
  const dv = new DataView(buf);
  const out: Tags = {};
  if (dv.getUint16(0) !== 0xffd8) return { tags: out, hasGps: false };
  let offset = 2, hasGps = false;
  while (offset + 4 < dv.byteLength) {
    const marker = dv.getUint16(offset);
    if (marker === 0xffe1) {
      const tiff = offset + 10; // APP1(2) + size(2) + "Exif\0\0"(6)
      if (dv.getUint32(offset + 4) !== 0x45786966) break; // not "Exif"
      const le = dv.getUint16(tiff) === 0x4949;
      const ifd0 = tiff + dv.getUint32(tiff + 4, le);
      const follow = { exif: [] as number[], gps: [] as number[] };
      readEntries(dv, tiff, ifd0, le, TAG_NAMES, out, follow);
      for (const ex of follow.exif) readEntries(dv, tiff, ex, le, TAG_NAMES, out);
      for (const g of follow.gps) { hasGps = true; readEntries(dv, tiff, g, le, GPS_NAMES, out); }
      break;
    }
    if ((marker & 0xff00) !== 0xff00) break;
    offset += 2 + dv.getUint16(offset + 2);
  }
  return { tags: out, hasGps };
}

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "Image (JPEG keeps EXIF)",
    working: "Working…",
    gpsWarning: "This image contains GPS location data. Strip the metadata before sharing it publicly.",
    metaWarning: "This image carries camera/software metadata (no GPS found).",
    noExif: "No EXIF metadata found in this image.",
    reStrip: "Re-strip",
    removeMetadata: "Remove all metadata",
    downloadClean: "Download clean image",
    privacyNote: "Parsed and cleaned entirely in your browser — your image is never uploaded.",
  },
  fr: {
    dropLabel: "Image (JPEG conserve les données EXIF)",
    working: "Analyse en cours…",
    gpsWarning: "Cette image contient des données de localisation GPS. Supprimez les métadonnées avant de la partager publiquement.",
    metaWarning: "Cette image contient des métadonnées d'appareil/logiciel (aucun GPS trouvé).",
    noExif: "Aucune métadonnée EXIF trouvée dans cette image.",
    reStrip: "Nettoyer à nouveau",
    removeMetadata: "Supprimer toutes les métadonnées",
    downloadClean: "Télécharger l'image nettoyée",
    privacyNote: "Analysé et nettoyé entièrement dans votre navigateur — votre image n'est jamais envoyée.",
  },
  es: {
    dropLabel: "Imagen (JPEG conserva EXIF)",
    working: "Analizando…",
    gpsWarning: "Esta imagen contiene datos de ubicación GPS. Elimina los metadatos antes de compartirla públicamente.",
    metaWarning: "Esta imagen contiene metadatos de cámara/software (no se encontró GPS).",
    noExif: "No se encontraron metadatos EXIF en esta imagen.",
    reStrip: "Limpiar de nuevo",
    removeMetadata: "Eliminar todos los metadatos",
    downloadClean: "Descargar imagen limpia",
    privacyNote: "Analizado y limpiado completamente en tu navegador — tu imagen nunca se sube.",
  },
  pt: {
    dropLabel: "Imagem (JPEG mantém EXIF)",
    working: "Analisando…",
    gpsWarning: "Esta imagem contém dados de localização GPS. Remova os metadados antes de compartilhá-la publicamente.",
    metaWarning: "Esta imagem contém metadados de câmera/software (GPS não encontrado).",
    noExif: "Nenhum metadado EXIF encontrado nesta imagem.",
    reStrip: "Limpar novamente",
    removeMetadata: "Remover todos os metadados",
    downloadClean: "Baixar imagem limpa",
    privacyNote: "Analisado e limpo inteiramente no seu navegador — sua imagem nunca é enviada.",
  },
  de: {
    dropLabel: "Bild (JPEG behält EXIF)",
    working: "Wird analysiert…",
    gpsWarning: "Dieses Bild enthält GPS-Standortdaten. Entfernen Sie die Metadaten, bevor Sie es öffentlich teilen.",
    metaWarning: "Dieses Bild enthält Kamera-/Softwaremetadaten (kein GPS gefunden).",
    noExif: "Keine EXIF-Metadaten in diesem Bild gefunden.",
    reStrip: "Erneut bereinigen",
    removeMetadata: "Alle Metadaten entfernen",
    downloadClean: "Bereinigtes Bild herunterladen",
    privacyNote: "Vollständig in Ihrem Browser analysiert und bereinigt — Ihr Bild wird niemals hochgeladen.",
  },
  it: {
    dropLabel: "Immagine (JPEG conserva EXIF)",
    working: "Analisi in corso…",
    gpsWarning: "Questa immagine contiene dati di posizione GPS. Rimuovi i metadati prima di condividerla pubblicamente.",
    metaWarning: "Questa immagine contiene metadati di fotocamera/software (nessun GPS trovato).",
    noExif: "Nessun metadato EXIF trovato in questa immagine.",
    reStrip: "Rimuovi di nuovo",
    removeMetadata: "Rimuovi tutti i metadati",
    downloadClean: "Scarica immagine pulita",
    privacyNote: "Analizzato e pulito interamente nel browser — la tua immagine non viene mai caricata.",
  },
  nl: {
    dropLabel: "Afbeelding (JPEG behoudt EXIF)",
    working: "Bezig…",
    gpsWarning: "Deze afbeelding bevat GPS-locatiegegevens. Verwijder de metadata voordat u deze publiekelijk deelt.",
    metaWarning: "Deze afbeelding bevat camera-/softwaremetadata (geen GPS gevonden).",
    noExif: "Geen EXIF-metadata gevonden in deze afbeelding.",
    reStrip: "Opnieuw verwijderen",
    removeMetadata: "Alle metadata verwijderen",
    downloadClean: "Schone afbeelding downloaden",
    privacyNote: "Volledig in uw browser geanalyseerd en opgeschoond — uw afbeelding wordt nooit geüpload.",
  },
  ja: {
    dropLabel: "画像（JPEG は EXIF を保持）",
    working: "解析中…",
    gpsWarning: "この画像には GPS 位置情報が含まれています。公開共有する前にメタデータを削除してください。",
    metaWarning: "この画像にはカメラ／ソフトウェアのメタデータが含まれています（GPS なし）。",
    noExif: "この画像には EXIF メタデータがありません。",
    reStrip: "再度削除",
    removeMetadata: "すべてのメタデータを削除",
    downloadClean: "クリーン画像をダウンロード",
    privacyNote: "ブラウザ内で完全に解析・クリーニング — 画像はアップロードされません。",
  },
  zh: {
    dropLabel: "图片（JPEG 保留 EXIF）",
    working: "正在分析…",
    gpsWarning: "此图片包含 GPS 位置数据。在公开分享前请先清除元数据。",
    metaWarning: "此图片包含相机/软件元数据（未发现 GPS）。",
    noExif: "此图片中未发现 EXIF 元数据。",
    reStrip: "重新清除",
    removeMetadata: "删除所有元数据",
    downloadClean: "下载干净图片",
    privacyNote: "完全在您的浏览器中解析和清理 — 您的图片永远不会被上传。",
  },
  ko: {
    dropLabel: "이미지 (JPEG는 EXIF 포함)",
    working: "분석 중…",
    gpsWarning: "이 이미지에는 GPS 위치 데이터가 포함되어 있습니다. 공개 공유 전에 메타데이터를 제거하세요.",
    metaWarning: "이 이미지에는 카메라/소프트웨어 메타데이터가 있습니다 (GPS 없음).",
    noExif: "이 이미지에서 EXIF 메타데이터가 발견되지 않았습니다.",
    reStrip: "다시 제거",
    removeMetadata: "모든 메타데이터 제거",
    downloadClean: "깨끗한 이미지 다운로드",
    privacyNote: "브라우저에서 완전히 분석 및 정리 — 이미지는 절대 업로드되지 않습니다.",
  },
  ar: {
    dropLabel: "صورة (JPEG تحتفظ بـ EXIF)",
    working: "جارٍ التحليل…",
    gpsWarning: "تحتوي هذه الصورة على بيانات موقع GPS. احذف البيانات الوصفية قبل مشاركتها علنًا.",
    metaWarning: "تحتوي هذه الصورة على بيانات وصفية للكاميرا/البرنامج (لم يُعثر على GPS).",
    noExif: "لم يُعثر على بيانات EXIF الوصفية في هذه الصورة.",
    reStrip: "إزالة مرة أخرى",
    removeMetadata: "إزالة جميع البيانات الوصفية",
    downloadClean: "تنزيل الصورة النظيفة",
    privacyNote: "تُحلَّل وتُنظَّف بالكامل في متصفحك — صورتك لن تُرفع أبدًا.",
  },
  ru: {
    dropLabel: "Изображение (JPEG сохраняет EXIF)",
    working: "Анализируется…",
    gpsWarning: "Это изображение содержит данные о местоположении GPS. Удалите метаданные перед публичной публикацией.",
    metaWarning: "Это изображение содержит метаданные камеры/программного обеспечения (GPS не обнаружен).",
    noExif: "Метаданные EXIF в этом изображении не найдены.",
    reStrip: "Удалить снова",
    removeMetadata: "Удалить все метаданные",
    downloadClean: "Скачать очищенное изображение",
    privacyNote: "Полностью проанализировано и очищено в вашем браузере — ваше изображение никогда не загружается.",
  },
  hi: {
    dropLabel: "छवि (JPEG EXIF रखता है)",
    working: "विश्लेषण जारी है…",
    gpsWarning: "इस छवि में GPS स्थान डेटा है। इसे सार्वजनिक रूप से साझा करने से पहले मेटाडेटा हटाएं।",
    metaWarning: "इस छवि में कैमरा/सॉफ़्टवेयर मेटाडेटा है (GPS नहीं मिला)।",
    noExif: "इस छवि में कोई EXIF मेटाडेटा नहीं मिला।",
    reStrip: "फिर से हटाएं",
    removeMetadata: "सभी मेटाडेटा हटाएं",
    downloadClean: "साफ़ छवि डाउनलोड करें",
    privacyNote: "आपके ब्राउज़र में पूरी तरह विश्लेषित और साफ़ किया गया — आपकी छवि कभी अपलोड नहीं होती।",
  },
  tr: {
    dropLabel: "Görsel (JPEG, EXIF'i saklar)",
    working: "Analiz ediliyor…",
    gpsWarning: "Bu görsel GPS konum verisi içeriyor. Herkese açık paylaşmadan önce meta verileri kaldırın.",
    metaWarning: "Bu görsel kamera/yazılım meta verisi içeriyor (GPS bulunamadı).",
    noExif: "Bu görselde EXIF meta verisi bulunamadı.",
    reStrip: "Tekrar kaldır",
    removeMetadata: "Tüm meta verileri kaldır",
    downloadClean: "Temiz görseli indir",
    privacyNote: "Tamamen tarayıcınızda analiz edilip temizlendi — görseliniz hiçbir zaman yüklenmez.",
  },
  id: {
    dropLabel: "Gambar (JPEG menyimpan EXIF)",
    working: "Menganalisis…",
    gpsWarning: "Gambar ini mengandung data lokasi GPS. Hapus metadata sebelum membagikannya secara publik.",
    metaWarning: "Gambar ini mengandung metadata kamera/perangkat lunak (GPS tidak ditemukan).",
    noExif: "Tidak ada metadata EXIF yang ditemukan dalam gambar ini.",
    reStrip: "Hapus lagi",
    removeMetadata: "Hapus semua metadata",
    downloadClean: "Unduh gambar bersih",
    privacyNote: "Dianalisis dan dibersihkan sepenuhnya di browser Anda — gambar Anda tidak pernah diunggah.",
  },
  vi: {
    dropLabel: "Ảnh (JPEG giữ EXIF)",
    working: "Đang phân tích…",
    gpsWarning: "Ảnh này chứa dữ liệu vị trí GPS. Hãy xóa metadata trước khi chia sẻ công khai.",
    metaWarning: "Ảnh này chứa metadata của máy ảnh/phần mềm (không tìm thấy GPS).",
    noExif: "Không tìm thấy metadata EXIF trong ảnh này.",
    reStrip: "Xóa lại",
    removeMetadata: "Xóa tất cả metadata",
    downloadClean: "Tải ảnh sạch",
    privacyNote: "Được phân tích và làm sạch hoàn toàn trên trình duyệt của bạn — ảnh không bao giờ được tải lên.",
  },
  sv: {
    dropLabel: "Bild (JPEG behåller EXIF)",
    working: "Bearbetar…",
    gpsWarning: "Den här bilden innehåller GPS-platsdata. Ta bort metadata innan du delar den offentligt.",
    metaWarning: "Den här bilden innehåller kamera-/programvarumeta data (ingen GPS hittades).",
    noExif: "Inga EXIF-metadata hittades i den här bilden.",
    reStrip: "Ta bort igen",
    removeMetadata: "Ta bort all metadata",
    downloadClean: "Ladda ner ren bild",
    privacyNote: "Analyserat och rensat helt i din webbläsare — din bild laddas aldrig upp.",
  },
  pl: {
    dropLabel: "Obraz (JPEG zachowuje EXIF)",
    working: "Analizowanie…",
    gpsWarning: "Ten obraz zawiera dane lokalizacji GPS. Usuń metadane przed publicznym udostępnieniem.",
    metaWarning: "Ten obraz zawiera metadane aparatu/oprogramowania (GPS nie znaleziono).",
    noExif: "W tym obrazie nie znaleziono metadanych EXIF.",
    reStrip: "Usuń ponownie",
    removeMetadata: "Usuń wszystkie metadane",
    downloadClean: "Pobierz czysty obraz",
    privacyNote: "W pełni przeanalizowane i oczyszczone w Twojej przeglądarce — Twój obraz nigdy nie jest przesyłany.",
  },
  uk: {
    dropLabel: "Зображення (JPEG зберігає EXIF)",
    working: "Аналізується…",
    gpsWarning: "Це зображення містить дані про місцезнаходження GPS. Видаліть метадані перед публічним поширенням.",
    metaWarning: "Це зображення містить метадані камери/програмного забезпечення (GPS не знайдено).",
    noExif: "Метадані EXIF у цьому зображенні не знайдено.",
    reStrip: "Видалити знову",
    removeMetadata: "Видалити всі метадані",
    downloadClean: "Завантажити очищене зображення",
    privacyNote: "Повністю проаналізовано і очищено у вашому браузері — ваше зображення ніколи не завантажується.",
  },
  cs: {
    dropLabel: "Obrázek (JPEG si uchovává EXIF)",
    working: "Analyzování…",
    gpsWarning: "Tento obrázek obsahuje data o poloze GPS. Před veřejným sdílením odstraňte metadata.",
    metaWarning: "Tento obrázek obsahuje metadata fotoaparátu/softwaru (GPS nenalezeno).",
    noExif: "V tomto obrázku nebyla nalezena žádná metadata EXIF.",
    reStrip: "Odstranit znovu",
    removeMetadata: "Odstranit všechna metadata",
    downloadClean: "Stáhnout čistý obrázek",
    privacyNote: "Zcela analyzováno a vyčištěno ve vašem prohlížeči — váš obrázek není nikdy nahrán.",
  },
};

export function ExifViewerClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<Tags | null>(null);
  const [hasGps, setHasGps] = useState(false);
  const [cleanUrl, setCleanUrl] = useState<string | null>(null);
  const [cleanSize, setCleanSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  async function onFile(f: File) {
    setFile(f); setCleanUrl(null); setBusy(true);
    try {
      const { tags, hasGps } = parseExif(await f.arrayBuffer());
      setTags(tags); setHasGps(hasGps);
    } finally { setBusy(false); }
  }

  // Re-encoding through a canvas drops every metadata segment (EXIF, GPS, XMP).
  async function strip() {
    if (!file) return;
    setBusy(true);
    try {
      // Bake in EXIF orientation before we strip metadata, otherwise a phone
      // photo (Orientation 6/8) loses its tag and renders sideways.
      const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
      const canvas = document.createElement("canvas");
      canvas.width = bmp.width; canvas.height = bmp.height;
      canvas.getContext("2d")!.drawImage(bmp, 0, 0);
      bmp.close?.();
      const isJpg = /jpe?g/i.test(file.type);
      const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), isJpg ? "image/jpeg" : "image/png", isJpg ? 0.95 : undefined));
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setCleanUrl(url); setCleanSize(blob.size);
    } finally { setBusy(false); }
  }

  const entries = tags ? Object.entries(tags) : [];
  const ext = file && /jpe?g/i.test(file.type) ? "jpg" : "png";

  return (
    <div className="space-y-5">
      <MiniDrop
        label={s.dropLabel}
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"], "image/tiff": [".tif", ".tiff"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={onFile}
        current={file}
      />

      {busy && <div className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> {s.working}</div>}

      {file && !busy && (
        hasGps ? (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{s.gpsWarning}</span>
          </div>
        ) : entries.length > 0 ? (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-800">
            <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{s.metaWarning}</span>
          </div>
        ) : (
          <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{s.noExif}</span>
          </div>
        )
      )}

      {entries.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-ink-100">
          <table className="w-full text-sm">
            <tbody>
              {entries.map(([k, v]) => (
                <tr key={k} className="border-b border-ink-100 last:border-0">
                  <td className="bg-ink-50/50 px-3 py-2 font-medium text-ink-600">{k}</td>
                  <td className="px-3 py-2 text-ink-900">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {file && !busy && (
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={strip} variant={cleanUrl ? "outline" : "primary"} size="lg">
            <ShieldCheck className="h-4 w-4" /> {cleanUrl ? s.reStrip : s.removeMetadata}
          </Button>
          {cleanUrl && (
            <a href={cleanUrl} download={`${file.name.replace(/\.[^.]+$/, "")}-clean.${ext}`}>
              <Button size="lg"><Download className="h-4 w-4" /> {s.downloadClean} · {formatBytes(cleanSize)}</Button>
            </a>
          )}
        </div>
      )}

      <p className="text-xs text-ink-400">{s.privacyNote}</p>
    </div>
  );
}
