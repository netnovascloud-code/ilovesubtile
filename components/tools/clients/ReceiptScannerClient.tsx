"use client";

import { useState } from "react";
import { Image as ImageIcon, Loader2, Download, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { callVisionJson } from "@/lib/vision-client";
import { useLocale } from "@/hooks/useLocale";

type Item = { description: string; quantity: number | null; price: number | null };
type Receipt = {
  merchant: string | null; date: string | null; currency: string | null;
  total: number | null; subtotal: number | null; tax: number | null;
  items: Item[];
};

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "Receipt photo",
    readingReceipt: "Reading the receipt…",
    extractBtn: "Extract receipt data",
    labelMerchant: "Merchant",
    labelDate: "Date",
    labelTotal: "Total",
    colItem: "Item",
    colQty: "Qty",
    colPrice: "Price",
    downloadCsv: "Download CSV",
    privacy: "Powered by AI vision. Numbers are extracted raw (no currency symbol) for accounting tools.",
  },
  fr: {
    dropLabel: "Photo du reçu",
    readingReceipt: "Lecture du reçu…",
    extractBtn: "Extraire les données du reçu",
    labelMerchant: "Marchand",
    labelDate: "Date",
    labelTotal: "Total",
    colItem: "Article",
    colQty: "Qté",
    colPrice: "Prix",
    downloadCsv: "Télécharger le CSV",
    privacy: "Propulsé par la vision IA. Les montants sont extraits bruts (sans symbole monétaire) pour les outils comptables.",
  },
  es: {
    dropLabel: "Foto del recibo",
    readingReceipt: "Leyendo el recibo…",
    extractBtn: "Extraer datos del recibo",
    labelMerchant: "Comercio",
    labelDate: "Fecha",
    labelTotal: "Total",
    colItem: "Artículo",
    colQty: "Cant.",
    colPrice: "Precio",
    downloadCsv: "Descargar CSV",
    privacy: "Con tecnología de visión IA. Los números se extraen en bruto (sin símbolo de moneda) para herramientas contables.",
  },
  pt: {
    dropLabel: "Foto do recibo",
    readingReceipt: "A ler o recibo…",
    extractBtn: "Extrair dados do recibo",
    labelMerchant: "Comerciante",
    labelDate: "Data",
    labelTotal: "Total",
    colItem: "Item",
    colQty: "Qtd.",
    colPrice: "Preço",
    downloadCsv: "Baixar CSV",
    privacy: "Tecnologia de visão IA. Os números são extraídos em bruto (sem símbolo de moeda) para ferramentas contabilísticas.",
  },
  de: {
    dropLabel: "Kassenbonfoto",
    readingReceipt: "Beleg wird gelesen…",
    extractBtn: "Belegdaten extrahieren",
    labelMerchant: "Händler",
    labelDate: "Datum",
    labelTotal: "Gesamt",
    colItem: "Artikel",
    colQty: "Menge",
    colPrice: "Preis",
    downloadCsv: "CSV herunterladen",
    privacy: "KI-gestützte Bilderkennung. Beträge werden ohne Währungszeichen extrahiert (für Buchhaltungstools).",
  },
  it: {
    dropLabel: "Foto dello scontrino",
    readingReceipt: "Lettura dello scontrino…",
    extractBtn: "Estrai dati dello scontrino",
    labelMerchant: "Esercente",
    labelDate: "Data",
    labelTotal: "Totale",
    colItem: "Articolo",
    colQty: "Qtà",
    colPrice: "Prezzo",
    downloadCsv: "Scarica CSV",
    privacy: "Basato su visione IA. I numeri vengono estratti in formato grezzo (senza simbolo di valuta) per strumenti contabili.",
  },
  nl: {
    dropLabel: "Foto van bon",
    readingReceipt: "Bon wordt gelezen…",
    extractBtn: "Bongegevens extraheren",
    labelMerchant: "Winkel",
    labelDate: "Datum",
    labelTotal: "Totaal",
    colItem: "Artikel",
    colQty: "Aantal",
    colPrice: "Prijs",
    downloadCsv: "CSV downloaden",
    privacy: "Aangedreven door AI-visie. Bedragen worden onbewerkt geëxtraheerd (zonder valutasymbool) voor boekhoudtools.",
  },
  ja: {
    dropLabel: "レシートの写真",
    readingReceipt: "レシートを読み取り中…",
    extractBtn: "レシートデータを抽出",
    labelMerchant: "店舗名",
    labelDate: "日付",
    labelTotal: "合計",
    colItem: "商品",
    colQty: "数量",
    colPrice: "価格",
    downloadCsv: "CSV をダウンロード",
    privacy: "AI ビジョンを使用。数値は会計ツール向けに通貨記号なしで抽出されます。",
  },
  zh: {
    dropLabel: "收据照片",
    readingReceipt: "正在读取收据…",
    extractBtn: "提取收据数据",
    labelMerchant: "商家",
    labelDate: "日期",
    labelTotal: "合计",
    colItem: "商品",
    colQty: "数量",
    colPrice: "价格",
    downloadCsv: "下载 CSV",
    privacy: "由 AI 视觉驱动。数字以原始格式提取（无货币符号），适用于会计工具。",
  },
  ko: {
    dropLabel: "영수증 사진",
    readingReceipt: "영수증 읽는 중…",
    extractBtn: "영수증 데이터 추출",
    labelMerchant: "가맹점",
    labelDate: "날짜",
    labelTotal: "합계",
    colItem: "항목",
    colQty: "수량",
    colPrice: "가격",
    downloadCsv: "CSV 다운로드",
    privacy: "AI 비전 기반. 숫자는 회계 도구를 위해 통화 기호 없이 원시 형태로 추출됩니다.",
  },
  ar: {
    dropLabel: "صورة الإيصال",
    readingReceipt: "جاريقراءة الإيصال…",
    extractBtn: "استخراج بيانات الإيصال",
    labelMerchant: "التاجر",
    labelDate: "التاريخ",
    labelTotal: "الإجمالي",
    colItem: "الصنف",
    colQty: "الكمية",
    colPrice: "السعر",
    downloadCsv: "تنزيل CSV",
    privacy: "مدعوم برؤية الذكاء الاصطناعي. تُستخرج الأرقام بشكل خام (بدون رمز العملة) لأدوات المحاسبة.",
  },
  ru: {
    dropLabel: "Фото чека",
    readingReceipt: "Читаем чек…",
    extractBtn: "Извлечь данные чека",
    labelMerchant: "Продавец",
    labelDate: "Дата",
    labelTotal: "Итого",
    colItem: "Товар",
    colQty: "Кол-во",
    colPrice: "Цена",
    downloadCsv: "Скачать CSV",
    privacy: "Работает на ИИ-зрении. Числа извлекаются без символа валюты для бухгалтерских инструментов.",
  },
  hi: {
    dropLabel: "रसीद की फ़ोटो",
    readingReceipt: "रसीद पढ़ी जा रही है…",
    extractBtn: "रसीद डेटा निकालें",
    labelMerchant: "व्यापारी",
    labelDate: "तारीख़",
    labelTotal: "कुल",
    colItem: "वस्तु",
    colQty: "मात्रा",
    colPrice: "मूल्य",
    downloadCsv: "CSV डाउनलोड करें",
    privacy: "AI दृष्टि द्वारा संचालित। लेखांकन टूल के लिए संख्याएँ कच्ची (बिना मुद्रा चिह्न) निकाली जाती हैं।",
  },
  tr: {
    dropLabel: "Fiş fotoğrafı",
    readingReceipt: "Fiş okunuyor…",
    extractBtn: "Fiş verilerini çıkar",
    labelMerchant: "Satıcı",
    labelDate: "Tarih",
    labelTotal: "Toplam",
    colItem: "Ürün",
    colQty: "Miktar",
    colPrice: "Fiyat",
    downloadCsv: "CSV indir",
    privacy: "Yapay zeka görüntü teknolojisi ile. Sayılar muhasebe araçları için ham (para birimi sembolü olmadan) çıkarılır.",
  },
  id: {
    dropLabel: "Foto struk",
    readingReceipt: "Membaca struk…",
    extractBtn: "Ekstrak data struk",
    labelMerchant: "Pedagang",
    labelDate: "Tanggal",
    labelTotal: "Total",
    colItem: "Item",
    colQty: "Jml",
    colPrice: "Harga",
    downloadCsv: "Unduh CSV",
    privacy: "Didukung oleh AI vision. Angka diekstrak mentah (tanpa simbol mata uang) untuk alat akuntansi.",
  },
  vi: {
    dropLabel: "Ảnh hóa đơn",
    readingReceipt: "Đang đọc hóa đơn…",
    extractBtn: "Trích xuất dữ liệu hóa đơn",
    labelMerchant: "Cửa hàng",
    labelDate: "Ngày",
    labelTotal: "Tổng cộng",
    colItem: "Mặt hàng",
    colQty: "Số lượng",
    colPrice: "Giá",
    downloadCsv: "Tải xuống CSV",
    privacy: "Được hỗ trợ bởi AI vision. Các con số được trích xuất thô (không có ký hiệu tiền tệ) cho các công cụ kế toán.",
  },
  sv: {
    dropLabel: "Foto av kvitto",
    readingReceipt: "Läser kvittot…",
    extractBtn: "Extrahera kvittodata",
    labelMerchant: "Handlare",
    labelDate: "Datum",
    labelTotal: "Totalt",
    colItem: "Artikel",
    colQty: "Antal",
    colPrice: "Pris",
    downloadCsv: "Ladda ned CSV",
    privacy: "Drivs av AI-vision. Siffror extraheras rå (utan valutasymbol) för bokföringsverktyg.",
  },
  pl: {
    dropLabel: "Zdjęcie paragonu",
    readingReceipt: "Odczytywanie paragonu…",
    extractBtn: "Wyodrębnij dane paragonu",
    labelMerchant: "Sprzedawca",
    labelDate: "Data",
    labelTotal: "Razem",
    colItem: "Artykuł",
    colQty: "Ilość",
    colPrice: "Cena",
    downloadCsv: "Pobierz CSV",
    privacy: "Obsługiwane przez AI vision. Liczby są wyodrębniane w postaci surowej (bez symbolu waluty) dla narzędzi księgowych.",
  },
  uk: {
    dropLabel: "Фото чека",
    readingReceipt: "Читаємо чек…",
    extractBtn: "Витягти дані чека",
    labelMerchant: "Продавець",
    labelDate: "Дата",
    labelTotal: "Разом",
    colItem: "Товар",
    colQty: "К-сть",
    colPrice: "Ціна",
    downloadCsv: "Завантажити CSV",
    privacy: "Працює на ШІ-зорі. Числа витягуються без символу валюти для бухгалтерських інструментів.",
  },
  cs: {
    dropLabel: "Fotografie účtenky",
    readingReceipt: "Čtení účtenky…",
    extractBtn: "Extrahovat data účtenky",
    labelMerchant: "Prodejce",
    labelDate: "Datum",
    labelTotal: "Celkem",
    colItem: "Položka",
    colQty: "Množství",
    colPrice: "Cena",
    downloadCsv: "Stáhnout CSV",
    privacy: "Poháněno AI vizí. Čísla jsou extrahována v hrubé podobě (bez symbolu měny) pro účetní nástroje.",
  },
};

// RFC 4180 CSV escaping: wrap with quotes when needed, double internal quotes.
function csvCell(v: unknown): string {
  if (v == null) return "";
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(r: Receipt): string {
  const rows: string[][] = [
    ["Merchant", r.merchant ?? ""],
    ["Date", r.date ?? ""],
    ["Currency", r.currency ?? ""],
    ["Subtotal", r.subtotal != null ? String(r.subtotal) : ""],
    ["Tax", r.tax != null ? String(r.tax) : ""],
    ["Total", r.total != null ? String(r.total) : ""],
    [],
    ["Description", "Quantity", "Price"],
    ...r.items.map((i) => [i.description, i.quantity != null ? String(i.quantity) : "", i.price != null ? String(i.price) : ""]),
  ];
  return rows.map((row) => row.map(csvCell).join(",")).join("\n");
}

function fmt(v: number | null, cur: string | null): string {
  if (v == null) return "—";
  try { return new Intl.NumberFormat(undefined, { style: cur ? "currency" : "decimal", currency: cur || undefined, maximumFractionDigits: 2 }).format(v); }
  catch { return v.toFixed(2) + (cur ? " " + cur : ""); }
}

export function ReceiptScannerClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [r, setR] = useState<Receipt | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (!file) return;
    setBusy(true); setError(null); setR(null);
    try {
      const data = await callVisionJson<Receipt>("receipt-scanner", "receipt", file);
      setR({ ...data, items: data.items ?? [] });
    } catch (e) {
      setError((e as Error).message);
    } finally { setBusy(false); }
  }

  const downloadCsv = () => {
    if (!r) return;
    const blob = new Blob([toCsv(r)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `${(r.merchant ?? "receipt").replace(/\s+/g, "-").toLowerCase()}-${r.date ?? "scan"}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  return (
    <div className="space-y-5">
      <MiniDrop
        label={s.dropLabel}
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setR(null); }}
        current={file}
      />

      {file && (
        <Button onClick={run} disabled={busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />}
          {busy ? s.readingReceipt : s.extractBtn}
        </Button>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {r && (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-ink-100 bg-white p-3">
              <div className="text-xs uppercase tracking-wide text-ink-400">{s.labelMerchant}</div>
              <div className="mt-1 text-base font-semibold text-ink-900">{r.merchant ?? "—"}</div>
            </div>
            <div className="rounded-lg border border-ink-100 bg-white p-3">
              <div className="text-xs uppercase tracking-wide text-ink-400">{s.labelDate}</div>
              <div className="mt-1 text-base font-semibold text-ink-900">{r.date ?? "—"}</div>
            </div>
            <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-3">
              <div className="text-xs uppercase tracking-wide text-brand-700">{s.labelTotal}</div>
              <div className="mt-1 text-base font-semibold text-ink-900">{fmt(r.total, r.currency)}</div>
            </div>
          </div>

          {r.items.length > 0 && (
            <div className="overflow-hidden rounded-lg border border-ink-100">
              <table className="w-full text-sm">
                <thead className="bg-ink-50/50 text-xs uppercase tracking-wide text-ink-500">
                  <tr><th className="px-3 py-2 text-left">{s.colItem}</th><th className="px-3 py-2 text-right w-20">{s.colQty}</th><th className="px-3 py-2 text-right w-24">{s.colPrice}</th></tr>
                </thead>
                <tbody>
                  {r.items.map((it, i) => (
                    <tr key={i} className="border-t border-ink-100">
                      <td className="px-3 py-2 text-ink-900">{it.description}</td>
                      <td className="px-3 py-2 text-right text-ink-700">{it.quantity ?? "—"}</td>
                      <td className="px-3 py-2 text-right text-ink-900">{fmt(it.price, r.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Button onClick={downloadCsv} size="lg">
            <Download className="h-4 w-4" /> {s.downloadCsv}
          </Button>
        </>
      )}

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
