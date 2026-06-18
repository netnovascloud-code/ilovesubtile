"use client";

import { useState } from "react";
import { Image as ImageIcon, Loader2, Download, Table2, FileJson, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { callTool } from "@/lib/tool-api";
import { fileToDataUrl } from "@/lib/vision-client";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "Upload a table image",
    dropHint: "JPG, PNG or WebP · a photo, scan or screenshot of a table",
    reading: "Reading the table…",
    extractBtn: "Extract table",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Column",
    rowsDetected: "rows",
    colsDetected: "columns detected. Always double-check the numbers against the original.",
    privacy: "Your image is sent securely for AI reading and never stored. Powered by AI vision.",
    tooLarge: "That image is too large — try a smaller one.",
    cantRead: "Couldn't read a table from that image. Try a clearer photo.",
    noTable: "No table was detected in that image.",
    networkError: "Network error — please try again.",
  },
  fr: {
    dropLabel: "Téléverser une image de tableau",
    dropHint: "JPG, PNG ou WebP · une photo, scan ou capture d'écran d'un tableau",
    reading: "Lecture du tableau…",
    extractBtn: "Extraire le tableau",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Colonne",
    rowsDetected: "lignes",
    colsDetected: "colonnes détectées. Vérifiez toujours les chiffres par rapport à l'original.",
    privacy: "Votre image est envoyée de manière sécurisée pour lecture par IA et n'est jamais stockée. Propulsé par la vision IA.",
    tooLarge: "Cette image est trop grande — essayez-en une plus petite.",
    cantRead: "Impossible de lire un tableau dans cette image. Essayez une photo plus nette.",
    noTable: "Aucun tableau n'a été détecté dans cette image.",
    networkError: "Erreur réseau — veuillez réessayer.",
  },
  es: {
    dropLabel: "Subir una imagen de tabla",
    dropHint: "JPG, PNG o WebP · una foto, escaneo o captura de pantalla de una tabla",
    reading: "Leyendo la tabla…",
    extractBtn: "Extraer tabla",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Columna",
    rowsDetected: "filas",
    colsDetected: "columnas detectadas. Siempre verifica los números con el original.",
    privacy: "Tu imagen se envía de forma segura para lectura por IA y nunca se almacena. Impulsado por visión IA.",
    tooLarge: "Esa imagen es demasiado grande — prueba con una más pequeña.",
    cantRead: "No se pudo leer una tabla en esa imagen. Prueba con una foto más clara.",
    noTable: "No se detectó ninguna tabla en esa imagen.",
    networkError: "Error de red — por favor inténtalo de nuevo.",
  },
  pt: {
    dropLabel: "Carregar uma imagem de tabela",
    dropHint: "JPG, PNG ou WebP · uma foto, digitalização ou captura de ecrã de uma tabela",
    reading: "A ler a tabela…",
    extractBtn: "Extrair tabela",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Coluna",
    rowsDetected: "linhas",
    colsDetected: "colunas detetadas. Verifique sempre os números com o original.",
    privacy: "A sua imagem é enviada de forma segura para leitura por IA e nunca é armazenada. Alimentado por visão IA.",
    tooLarge: "Essa imagem é demasiado grande — tente uma mais pequena.",
    cantRead: "Não foi possível ler uma tabela nessa imagem. Tente uma foto mais nítida.",
    noTable: "Não foi detetada nenhuma tabela nessa imagem.",
    networkError: "Erro de rede — tente novamente.",
  },
  de: {
    dropLabel: "Tabellenbild hochladen",
    dropHint: "JPG, PNG oder WebP · ein Foto, Scan oder Screenshot einer Tabelle",
    reading: "Tabelle wird gelesen…",
    extractBtn: "Tabelle extrahieren",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Spalte",
    rowsDetected: "Zeilen",
    colsDetected: "Spalten erkannt. Überprüfen Sie die Zahlen stets mit dem Original.",
    privacy: "Ihr Bild wird sicher für die KI-Lektüre übermittelt und niemals gespeichert. Unterstützt von KI-Vision.",
    tooLarge: "Dieses Bild ist zu groß — versuchen Sie ein kleineres.",
    cantRead: "Eine Tabelle konnte in diesem Bild nicht gelesen werden. Versuchen Sie ein klareres Foto.",
    noTable: "In diesem Bild wurde keine Tabelle erkannt.",
    networkError: "Netzwerkfehler — bitte erneut versuchen.",
  },
  it: {
    dropLabel: "Carica un'immagine di tabella",
    dropHint: "JPG, PNG o WebP · una foto, scansione o screenshot di una tabella",
    reading: "Lettura della tabella…",
    extractBtn: "Estrai tabella",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Colonna",
    rowsDetected: "righe",
    colsDetected: "colonne rilevate. Verifica sempre i numeri con l'originale.",
    privacy: "La tua immagine viene inviata in modo sicuro per la lettura AI e non viene mai archiviata. Basato su visione AI.",
    tooLarge: "Quell'immagine è troppo grande — prova con una più piccola.",
    cantRead: "Non è stato possibile leggere una tabella da quell'immagine. Prova con una foto più nitida.",
    noTable: "In quell'immagine non è stata rilevata nessuna tabella.",
    networkError: "Errore di rete — riprova.",
  },
  nl: {
    dropLabel: "Tabelafbeelding uploaden",
    dropHint: "JPG, PNG of WebP · een foto, scan of screenshot van een tabel",
    reading: "Tabel lezen…",
    extractBtn: "Tabel extraheren",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Kolom",
    rowsDetected: "rijen",
    colsDetected: "kolommen gedetecteerd. Controleer de cijfers altijd met het origineel.",
    privacy: "Uw afbeelding wordt veilig verzonden voor AI-lezing en nooit opgeslagen. Aangedreven door AI-visie.",
    tooLarge: "Die afbeelding is te groot — probeer een kleinere.",
    cantRead: "Er kon geen tabel worden gelezen uit die afbeelding. Probeer een duidelijkere foto.",
    noTable: "Er is geen tabel gedetecteerd in die afbeelding.",
    networkError: "Netwerkfout — probeer het opnieuw.",
  },
  ja: {
    dropLabel: "表の画像をアップロード",
    dropHint: "JPG、PNG、WebP · 表の写真、スキャン、スクリーンショット",
    reading: "表を読み込み中…",
    extractBtn: "表を抽出",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "列",
    rowsDetected: "行",
    colsDetected: "列が検出されました。数値は必ず原本と照合してください。",
    privacy: "画像はAI読み取りのために安全に送信され、保存されることはありません。AIビジョンで動作。",
    tooLarge: "その画像は大きすぎます — より小さい画像をお試しください。",
    cantRead: "その画像から表を読み取れませんでした。より鮮明な写真をお試しください。",
    noTable: "その画像から表は検出されませんでした。",
    networkError: "ネットワークエラー — もう一度お試しください。",
  },
  zh: {
    dropLabel: "上传表格图片",
    dropHint: "JPG、PNG或WebP · 表格的照片、扫描件或截图",
    reading: "正在读取表格…",
    extractBtn: "提取表格",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "列",
    rowsDetected: "行",
    colsDetected: "列已检测。请务必与原始内容核对数字。",
    privacy: "您的图片将被安全地发送以供AI读取，从不存储。由AI视觉驱动。",
    tooLarge: "该图片太大 — 请尝试较小的图片。",
    cantRead: "无法从该图片读取表格。请尝试更清晰的照片。",
    noTable: "在该图片中未检测到表格。",
    networkError: "网络错误 — 请重试。",
  },
  ko: {
    dropLabel: "표 이미지 업로드",
    dropHint: "JPG, PNG 또는 WebP · 표의 사진, 스캔 또는 스크린샷",
    reading: "표 읽는 중…",
    extractBtn: "표 추출",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "열",
    rowsDetected: "행",
    colsDetected: "열 감지됨. 항상 원본과 숫자를 대조하여 확인하세요.",
    privacy: "이미지는 AI 읽기를 위해 안전하게 전송되며 저장되지 않습니다. AI 비전으로 구동.",
    tooLarge: "해당 이미지가 너무 큽니다 — 더 작은 이미지를 사용해보세요.",
    cantRead: "해당 이미지에서 표를 읽을 수 없습니다. 더 선명한 사진을 사용해보세요.",
    noTable: "해당 이미지에서 표가 감지되지 않았습니다.",
    networkError: "네트워크 오류 — 다시 시도해주세요.",
  },
  ar: {
    dropLabel: "رفع صورة جدول",
    dropHint: "JPG أو PNG أو WebP · صورة أو مسح ضوئي أو لقطة شاشة لجدول",
    reading: "جاري قراءة الجدول…",
    extractBtn: "استخراج الجدول",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "عمود",
    rowsDetected: "صف",
    colsDetected: "عمود مُكتشَف. تحقق دائماً من الأرقام مقارنةً بالأصل.",
    privacy: "تُرسَل صورتك بأمان للقراءة بالذكاء الاصطناعي ولا تُخزَّن أبداً. مدعوم بالرؤية الاصطناعية.",
    tooLarge: "هذه الصورة كبيرة جداً — جرّب صورة أصغر.",
    cantRead: "تعذر قراءة جدول من هذه الصورة. جرّب صورة أوضح.",
    noTable: "لم يُكتشَف أي جدول في هذه الصورة.",
    networkError: "خطأ في الشبكة — يرجى المحاولة مجدداً.",
  },
  ru: {
    dropLabel: "Загрузить изображение таблицы",
    dropHint: "JPG, PNG или WebP · фото, скан или снимок экрана таблицы",
    reading: "Считывание таблицы…",
    extractBtn: "Извлечь таблицу",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Столбец",
    rowsDetected: "строк",
    colsDetected: "столбцов обнаружено. Всегда сверяйте цифры с оригиналом.",
    privacy: "Ваше изображение отправляется безопасно для чтения ИИ и никогда не сохраняется. На основе ИИ-зрения.",
    tooLarge: "Это изображение слишком большое — попробуйте меньшее.",
    cantRead: "Не удалось прочитать таблицу с этого изображения. Попробуйте более чёткое фото.",
    noTable: "На этом изображении таблица не обнаружена.",
    networkError: "Ошибка сети — пожалуйста, попробуйте снова.",
  },
  hi: {
    dropLabel: "तालिका छवि अपलोड करें",
    dropHint: "JPG, PNG या WebP · तालिका की फ़ोटो, स्कैन या स्क्रीनशॉट",
    reading: "तालिका पढ़ी जा रही है…",
    extractBtn: "तालिका निकालें",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "स्तंभ",
    rowsDetected: "पंक्तियाँ",
    colsDetected: "स्तंभ पाए गए। संख्याओं को हमेशा मूल से जांचें।",
    privacy: "आपकी छवि AI पढ़ने के लिए सुरक्षित रूप से भेजी जाती है और कभी संग्रहीत नहीं होती। AI विज़न द्वारा संचालित।",
    tooLarge: "वह छवि बहुत बड़ी है — एक छोटी छवि आज़माएं।",
    cantRead: "उस छवि से तालिका नहीं पढ़ी जा सकी। एक स्पष्ट फ़ोटो आज़माएं।",
    noTable: "उस छवि में कोई तालिका नहीं पाई गई।",
    networkError: "नेटवर्क त्रुटि — कृपया पुनः प्रयास करें।",
  },
  tr: {
    dropLabel: "Tablo resmi yükle",
    dropHint: "JPG, PNG veya WebP · bir tablonun fotoğrafı, taraması veya ekran görüntüsü",
    reading: "Tablo okunuyor…",
    extractBtn: "Tabloyu çıkar",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Sütun",
    rowsDetected: "satır",
    colsDetected: "sütun algılandı. Sayıları her zaman orijinalle karşılaştırın.",
    privacy: "Görüntünüz AI okuma için güvenli şekilde gönderilir ve hiçbir zaman depolanmaz. AI görüşü ile desteklenmektedir.",
    tooLarge: "O resim çok büyük — daha küçük bir tane deneyin.",
    cantRead: "O resimden tablo okunamadı. Daha net bir fotoğraf deneyin.",
    noTable: "O resimde tablo algılanmadı.",
    networkError: "Ağ hatası — lütfen tekrar deneyin.",
  },
  id: {
    dropLabel: "Unggah gambar tabel",
    dropHint: "JPG, PNG atau WebP · foto, scan atau tangkapan layar dari tabel",
    reading: "Membaca tabel…",
    extractBtn: "Ekstrak tabel",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Kolom",
    rowsDetected: "baris",
    colsDetected: "kolom terdeteksi. Selalu periksa angka-angka terhadap aslinya.",
    privacy: "Gambar Anda dikirim dengan aman untuk dibaca AI dan tidak pernah disimpan. Didukung oleh AI vision.",
    tooLarge: "Gambar tersebut terlalu besar — coba yang lebih kecil.",
    cantRead: "Tidak dapat membaca tabel dari gambar tersebut. Coba foto yang lebih jelas.",
    noTable: "Tidak ada tabel yang terdeteksi di gambar tersebut.",
    networkError: "Kesalahan jaringan — silakan coba lagi.",
  },
  vi: {
    dropLabel: "Tải lên ảnh bảng",
    dropHint: "JPG, PNG hoặc WebP · ảnh chụp, bản quét hoặc ảnh chụp màn hình của bảng",
    reading: "Đang đọc bảng…",
    extractBtn: "Trích xuất bảng",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Cột",
    rowsDetected: "hàng",
    colsDetected: "cột được phát hiện. Luôn kiểm tra lại các số liệu với bản gốc.",
    privacy: "Hình ảnh của bạn được gửi an toàn để AI đọc và không bao giờ được lưu trữ. Được hỗ trợ bởi AI vision.",
    tooLarge: "Ảnh đó quá lớn — hãy thử ảnh nhỏ hơn.",
    cantRead: "Không thể đọc bảng từ ảnh đó. Hãy thử ảnh rõ hơn.",
    noTable: "Không phát hiện bảng nào trong ảnh đó.",
    networkError: "Lỗi mạng — vui lòng thử lại.",
  },
  sv: {
    dropLabel: "Ladda upp en tabellbild",
    dropHint: "JPG, PNG eller WebP · ett foto, skanning eller skärmdump av en tabell",
    reading: "Läser tabell…",
    extractBtn: "Extrahera tabell",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Kolumn",
    rowsDetected: "rader",
    colsDetected: "kolumner identifierade. Dubbelkolla alltid siffrorna mot originalet.",
    privacy: "Din bild skickas säkert för AI-läsning och lagras aldrig. Drivs av AI-vision.",
    tooLarge: "Den bilden är för stor — prova en mindre.",
    cantRead: "Kunde inte läsa en tabell från den bilden. Prova ett tydligare foto.",
    noTable: "Ingen tabell hittades i den bilden.",
    networkError: "Nätverksfel — försök igen.",
  },
  pl: {
    dropLabel: "Prześlij obraz tabeli",
    dropHint: "JPG, PNG lub WebP · zdjęcie, skan lub zrzut ekranu tabeli",
    reading: "Odczytywanie tabeli…",
    extractBtn: "Wyodrębnij tabelę",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Kolumna",
    rowsDetected: "wierszy",
    colsDetected: "kolumn wykrytych. Zawsze sprawdzaj liczby z oryginałem.",
    privacy: "Twój obraz jest bezpiecznie przesyłany do odczytu przez AI i nigdy nie jest przechowywany. Zasilane przez wizję AI.",
    tooLarge: "Ten obraz jest za duży — spróbuj mniejszego.",
    cantRead: "Nie można odczytać tabeli z tego obrazu. Spróbuj wyraźniejszego zdjęcia.",
    noTable: "W tym obrazie nie wykryto żadnej tabeli.",
    networkError: "Błąd sieci — spróbuj ponownie.",
  },
  uk: {
    dropLabel: "Завантажте зображення таблиці",
    dropHint: "JPG, PNG або WebP · фото, скан або знімок екрана таблиці",
    reading: "Зчитування таблиці…",
    extractBtn: "Витягти таблицю",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Стовпець",
    rowsDetected: "рядків",
    colsDetected: "стовпців виявлено. Завжди звіряйте числа з оригіналом.",
    privacy: "Ваше зображення надсилається безпечно для читання ШІ і ніколи не зберігається. На основі ШІ-зору.",
    tooLarge: "Це зображення занадто велике — спробуйте менше.",
    cantRead: "Не вдалося прочитати таблицю з цього зображення. Спробуйте чіткіше фото.",
    noTable: "У цьому зображенні таблицю не виявлено.",
    networkError: "Помилка мережі — будь ласка, спробуйте ще раз.",
  },
  cs: {
    dropLabel: "Nahrát obrázek tabulky",
    dropHint: "JPG, PNG nebo WebP · fotografie, sken nebo snímek obrazovky tabulky",
    reading: "Čtení tabulky…",
    extractBtn: "Extrahovat tabulku",
    excelBtn: "Excel (.xlsx)",
    csvBtn: "CSV",
    jsonBtn: "JSON",
    column: "Sloupec",
    rowsDetected: "řádků",
    colsDetected: "sloupců zjištěno. Vždy zkontrolujte čísla oproti originálu.",
    privacy: "Váš obrázek je bezpečně odeslán ke čtení pomocí AI a nikdy není uložen. Poháněno vizí AI.",
    tooLarge: "Tento obrázek je příliš velký — zkuste menší.",
    cantRead: "Z tohoto obrázku se nepodařilo přečíst tabulku. Zkuste jasnější fotografii.",
    noTable: "V tomto obrázku nebyla nalezena žádná tabulka.",
    networkError: "Chyba sítě — zkuste to prosím znovu.",
  },
};

type Table = { headers: string[]; rows: string[][] };

// RFC 4180 CSV escaping.
function csvCell(v: unknown): string {
  const str = v == null ? "" : String(v);
  return /[",\n\r]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}
function toCsv(t: Table): string {
  const rows = t.headers.length ? [t.headers, ...t.rows] : t.rows;
  return rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
}
function toJson(t: Table): string {
  // With headers → array of objects; without → array of arrays.
  if (t.headers.length) {
    const objs = t.rows.map((r) => Object.fromEntries(t.headers.map((h, i) => [h || `col_${i + 1}`, r[i] ?? ""])));
    return JSON.stringify(objs, null, 2);
  }
  return JSON.stringify(t.rows, null, 2);
}

function downloadFile(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function ImageToTableClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [table, setTable] = useState<Table | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);

  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "table";

  async function run() {
    if (!file || busy) return;
    setBusy(true); setError(null); setTable(null);
    try {
      const image = await fileToDataUrl(file);
      const res = await callTool("image-to-table", { task: "image-to-table", image });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "daily_limit" || data.error === "monthly_limit") {
          setQuotaReason({
            kind: data.error === "monthly_limit" ? "monthly" : "daily",
            limit: data.limit ?? 0, used: data.used ?? 0, resetAt: data.resetAt ?? null,
          });
          return;
        }
        setError(data.error === "image_too_large" ? s.tooLarge : s.cantRead);
        return;
      }
      const t = data.data as Table | undefined;
      if (!t || !Array.isArray(t.rows)) { setError(s.noTable); return; }
      setTable({ headers: Array.isArray(t.headers) ? t.headers : [], rows: t.rows.filter((r) => Array.isArray(r)) });
    } catch {
      setError(s.networkError);
    } finally {
      setBusy(false);
    }
  }

  async function exportXlsx() {
    if (!table) return;
    const XLSX = await import("xlsx");
    const aoa = table.headers.length ? [table.headers, ...table.rows] : table.rows;
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Table");
    const out = XLSX.write(wb, { type: "array", bookType: "xlsx" }) as ArrayBuffer;
    downloadFile(new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), `${baseName}.xlsx`);
  }
  function exportCsv() {
    if (!table) return;
    downloadFile(new Blob([toCsv(table)], { type: "text/csv;charset=utf-8" }), `${baseName}.csv`);
  }
  function exportJson() {
    if (!table) return;
    downloadFile(new Blob([toJson(table)], { type: "application/json" }), `${baseName}.json`);
  }

  const colCount = table ? Math.max(table.headers.length, ...table.rows.map((r) => r.length), 1) : 0;

  return (
    <div className="space-y-4">
      <MiniDrop
        label={file ? file.name : s.dropLabel}
        hint={s.dropHint}
        accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
        onFile={(f) => { setFile(f); setTable(null); setError(null); }}
        current={file}
        icon={<ImageIcon className="h-5 w-5" />}
      />

      <Button onClick={run} disabled={!file || busy} size="lg">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Table2 className="h-4 w-4" />}
        {busy ? s.reading : s.extractBtn}
      </Button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {table && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={exportXlsx}><FileSpreadsheet className="h-3.5 w-3.5" /> {s.excelBtn}</Button>
            <Button size="sm" variant="outline" onClick={exportCsv}><Download className="h-3.5 w-3.5" /> {s.csvBtn}</Button>
            <Button size="sm" variant="outline" onClick={exportJson}><FileJson className="h-3.5 w-3.5" /> {s.jsonBtn}</Button>
          </div>
          <div className="overflow-auto rounded-lg border border-ink-100">
            <table className="w-full border-collapse text-left text-sm">
              {table.headers.length > 0 && (
                <thead className="bg-ink-50 text-ink-700">
                  <tr>
                    {table.headers.map((h, i) => (
                      <th key={i} className="border-b border-ink-100 px-3 py-2 font-semibold">{h || `${s.column} ${i + 1}`}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {table.rows.map((r, ri) => (
                  <tr key={ri} className="odd:bg-white even:bg-ink-50/40">
                    {Array.from({ length: colCount }).map((_, ci) => (
                      <td key={ci} className="border-b border-ink-50 px-3 py-1.5 text-ink-800">{r[ci] ?? ""}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ink-400">{table.rows.length} {s.rowsDetected} · {colCount} {s.colsDetected}</p>
        </div>
      )}

      <p className="text-xs text-ink-400">{s.privacy}</p>
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}
