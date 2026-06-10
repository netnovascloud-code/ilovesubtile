"use client";

import { useState } from "react";
import { FileText, Loader2, AlertTriangle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { callTool } from "@/lib/tool-api";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "Contract PDF",
    readingPdf: "Reading the PDF…",
    analyzingClauses: "Analyzing the clauses…",
    reAnalyze: "Re-analyze",
    analyze: "Analyze contract",
    rowParties: "Parties",
    rowEffectiveDate: "Effective date",
    rowTerm: "Term",
    rowPaymentTerms: "Payment terms",
    rowLiability: "Liability",
    rowConfidentiality: "Confidentiality",
    rowGoverningLaw: "Governing law",
    notableClauses: "Notable clauses",
    redFlags: "Red flags",
    disclaimer: "AI-generated analysis for orientation only — not legal advice. Long contracts are read up to ~120 KB. Scanned PDFs need OCR first.",
    noText: "No text could be extracted from this PDF — is it a scan? Try the PDF OCR tool first.",
  },
  fr: {
    dropLabel: "PDF du contrat",
    readingPdf: "Lecture du PDF…",
    analyzingClauses: "Analyse des clauses…",
    reAnalyze: "Ré-analyser",
    analyze: "Analyser le contrat",
    rowParties: "Parties",
    rowEffectiveDate: "Date d'entrée en vigueur",
    rowTerm: "Durée",
    rowPaymentTerms: "Conditions de paiement",
    rowLiability: "Responsabilité",
    rowConfidentiality: "Confidentialité",
    rowGoverningLaw: "Droit applicable",
    notableClauses: "Clauses notables",
    redFlags: "Points d'alerte",
    disclaimer: "Analyse générée par IA à titre indicatif uniquement — ne constitue pas un conseil juridique. Les contrats longs sont lus jusqu'à ~120 Ko. Les PDF scannés nécessitent une OCR préalable.",
    noText: "Aucun texte n'a pu être extrait de ce PDF — est-ce un scan ? Essayez d'abord l'outil OCR PDF.",
  },
  es: {
    dropLabel: "PDF del contrato",
    readingPdf: "Leyendo el PDF…",
    analyzingClauses: "Analizando las cláusulas…",
    reAnalyze: "Re-analizar",
    analyze: "Analizar contrato",
    rowParties: "Partes",
    rowEffectiveDate: "Fecha de entrada en vigor",
    rowTerm: "Duración",
    rowPaymentTerms: "Condiciones de pago",
    rowLiability: "Responsabilidad",
    rowConfidentiality: "Confidencialidad",
    rowGoverningLaw: "Ley aplicable",
    notableClauses: "Cláusulas destacadas",
    redFlags: "Señales de alerta",
    disclaimer: "Análisis generado por IA solo con fines orientativos — no constituye asesoramiento legal. Los contratos largos se leen hasta ~120 KB. Los PDF escaneados necesitan OCR primero.",
    noText: "No se pudo extraer texto de este PDF — ¿es un escaneo? Prueba primero la herramienta OCR de PDF.",
  },
  pt: {
    dropLabel: "PDF do contrato",
    readingPdf: "A ler o PDF…",
    analyzingClauses: "A analisar as cláusulas…",
    reAnalyze: "Re-analisar",
    analyze: "Analisar contrato",
    rowParties: "Partes",
    rowEffectiveDate: "Data de entrada em vigor",
    rowTerm: "Prazo",
    rowPaymentTerms: "Condições de pagamento",
    rowLiability: "Responsabilidade",
    rowConfidentiality: "Confidencialidade",
    rowGoverningLaw: "Lei aplicável",
    notableClauses: "Cláusulas notáveis",
    redFlags: "Sinais de alerta",
    disclaimer: "Análise gerada por IA apenas para orientação — não constitui aconselhamento jurídico. Contratos longos são lidos até ~120 KB. PDFs digitalizados precisam de OCR primeiro.",
    noText: "Não foi possível extrair texto deste PDF — é um scan? Tente primeiro a ferramenta OCR de PDF.",
  },
  de: {
    dropLabel: "Vertrags-PDF",
    readingPdf: "PDF wird gelesen…",
    analyzingClauses: "Klauseln werden analysiert…",
    reAnalyze: "Erneut analysieren",
    analyze: "Vertrag analysieren",
    rowParties: "Parteien",
    rowEffectiveDate: "Datum des Inkrafttretens",
    rowTerm: "Laufzeit",
    rowPaymentTerms: "Zahlungsbedingungen",
    rowLiability: "Haftung",
    rowConfidentiality: "Vertraulichkeit",
    rowGoverningLaw: "Anwendbares Recht",
    notableClauses: "Bemerkenswerte Klauseln",
    redFlags: "Warnzeichen",
    disclaimer: "KI-generierte Analyse nur zur Orientierung — keine Rechtsberatung. Lange Verträge werden bis zu ~120 KB gelesen. Gescannte PDFs benötigen zuerst OCR.",
    noText: "Aus dieser PDF konnte kein Text extrahiert werden — ist es ein Scan? Versuchen Sie zuerst das PDF-OCR-Tool.",
  },
  it: {
    dropLabel: "PDF del contratto",
    readingPdf: "Lettura del PDF…",
    analyzingClauses: "Analisi delle clausole…",
    reAnalyze: "Ri-analizza",
    analyze: "Analizza contratto",
    rowParties: "Parti",
    rowEffectiveDate: "Data di entrata in vigore",
    rowTerm: "Durata",
    rowPaymentTerms: "Termini di pagamento",
    rowLiability: "Responsabilità",
    rowConfidentiality: "Riservatezza",
    rowGoverningLaw: "Legge applicabile",
    notableClauses: "Clausole notevoli",
    redFlags: "Segnali d'allarme",
    disclaimer: "Analisi generata da AI solo a scopo orientativo — non costituisce consulenza legale. I contratti lunghi vengono letti fino a ~120 KB. I PDF scansionati richiedono prima l'OCR.",
    noText: "Non è stato possibile estrarre testo da questo PDF — è una scansione? Prova prima lo strumento OCR PDF.",
  },
  nl: {
    dropLabel: "Contract PDF",
    readingPdf: "PDF lezen…",
    analyzingClauses: "Clausules analyseren…",
    reAnalyze: "Opnieuw analyseren",
    analyze: "Contract analyseren",
    rowParties: "Partijen",
    rowEffectiveDate: "Ingangsdatum",
    rowTerm: "Looptijd",
    rowPaymentTerms: "Betalingsvoorwaarden",
    rowLiability: "Aansprakelijkheid",
    rowConfidentiality: "Vertrouwelijkheid",
    rowGoverningLaw: "Toepasselijk recht",
    notableClauses: "Opmerkelijke clausules",
    redFlags: "Waarschuwingssignalen",
    disclaimer: "Door AI gegenereerde analyse uitsluitend ter oriëntatie — geen juridisch advies. Lange contracten worden tot ~120 KB gelezen. Gescande PDF's hebben eerst OCR nodig.",
    noText: "Er kon geen tekst worden geëxtraheerd uit deze PDF — is het een scan? Probeer eerst de PDF OCR-tool.",
  },
  ja: {
    dropLabel: "契約PDF",
    readingPdf: "PDFを読み込み中…",
    analyzingClauses: "条項を分析中…",
    reAnalyze: "再分析",
    analyze: "契約を分析",
    rowParties: "当事者",
    rowEffectiveDate: "発効日",
    rowTerm: "期間",
    rowPaymentTerms: "支払条件",
    rowLiability: "責任",
    rowConfidentiality: "守秘義務",
    rowGoverningLaw: "準拠法",
    notableClauses: "注目すべき条項",
    redFlags: "要注意事項",
    disclaimer: "AI生成の分析は参考情報のみ — 法的アドバイスではありません。長い契約書は最大~120 KBまで読み取られます。スキャンされたPDFは事前にOCRが必要です。",
    noText: "このPDFからテキストを抽出できませんでした — スキャンですか？まずPDF OCRツールをお試しください。",
  },
  zh: {
    dropLabel: "合同PDF",
    readingPdf: "正在读取PDF…",
    analyzingClauses: "正在分析条款…",
    reAnalyze: "重新分析",
    analyze: "分析合同",
    rowParties: "当事方",
    rowEffectiveDate: "生效日期",
    rowTerm: "期限",
    rowPaymentTerms: "付款条款",
    rowLiability: "责任",
    rowConfidentiality: "保密条款",
    rowGoverningLaw: "适用法律",
    notableClauses: "重要条款",
    redFlags: "风险提示",
    disclaimer: "AI生成的分析仅供参考 — 不构成法律建议。长合同最多读取~120 KB。扫描PDF需要先进行OCR。",
    noText: "无法从此PDF中提取文本 — 是扫描件吗？请先使用PDF OCR工具。",
  },
  ko: {
    dropLabel: "계약서 PDF",
    readingPdf: "PDF 읽는 중…",
    analyzingClauses: "조항 분석 중…",
    reAnalyze: "재분석",
    analyze: "계약서 분석",
    rowParties: "당사자",
    rowEffectiveDate: "발효일",
    rowTerm: "기간",
    rowPaymentTerms: "지불 조건",
    rowLiability: "책임",
    rowConfidentiality: "기밀 유지",
    rowGoverningLaw: "준거법",
    notableClauses: "주요 조항",
    redFlags: "주의 사항",
    disclaimer: "AI 생성 분석은 참고용으로만 — 법적 조언이 아닙니다. 긴 계약서는 최대 ~120 KB까지 읽습니다. 스캔된 PDF는 먼저 OCR이 필요합니다.",
    noText: "이 PDF에서 텍스트를 추출할 수 없습니다 — 스캔본인가요? 먼저 PDF OCR 도구를 사용해보세요.",
  },
  ar: {
    dropLabel: "PDF العقد",
    readingPdf: "جاري قراءة PDF…",
    analyzingClauses: "جاري تحليل البنود…",
    reAnalyze: "إعادة التحليل",
    analyze: "تحليل العقد",
    rowParties: "الأطراف",
    rowEffectiveDate: "تاريخ النفاذ",
    rowTerm: "المدة",
    rowPaymentTerms: "شروط الدفع",
    rowLiability: "المسؤولية",
    rowConfidentiality: "السرية",
    rowGoverningLaw: "القانون الحاكم",
    notableClauses: "البنود الجديرة بالملاحظة",
    redFlags: "إشارات التحذير",
    disclaimer: "تحليل مُولَّد بالذكاء الاصطناعي للتوجيه فقط — وليس استشارة قانونية. العقود الطويلة تُقرأ حتى ~120 كيلوبايت. تحتاج ملفات PDF الممسوحة ضوئياً إلى OCR أولاً.",
    noText: "تعذر استخراج نص من هذا PDF — هل هو مسح ضوئي؟ جرّب أداة OCR للـ PDF أولاً.",
  },
  ru: {
    dropLabel: "PDF договора",
    readingPdf: "Чтение PDF…",
    analyzingClauses: "Анализ пунктов…",
    reAnalyze: "Повторный анализ",
    analyze: "Анализировать договор",
    rowParties: "Стороны",
    rowEffectiveDate: "Дата вступления в силу",
    rowTerm: "Срок",
    rowPaymentTerms: "Условия оплаты",
    rowLiability: "Ответственность",
    rowConfidentiality: "Конфиденциальность",
    rowGoverningLaw: "Применимое право",
    notableClauses: "Примечательные пункты",
    redFlags: "Тревожные сигналы",
    disclaimer: "Анализ, сгенерированный ИИ, носит ориентировочный характер — не является юридической консультацией. Длинные договоры читаются до ~120 КБ. Сканированные PDF требуют предварительного OCR.",
    noText: "Из этого PDF не удалось извлечь текст — это скан? Сначала воспользуйтесь инструментом OCR для PDF.",
  },
  hi: {
    dropLabel: "अनुबंध PDF",
    readingPdf: "PDF पढ़ा जा रहा है…",
    analyzingClauses: "खंडों का विश्लेषण हो रहा है…",
    reAnalyze: "पुनः विश्लेषण",
    analyze: "अनुबंध का विश्लेषण करें",
    rowParties: "पक्षकार",
    rowEffectiveDate: "प्रभावी तिथि",
    rowTerm: "अवधि",
    rowPaymentTerms: "भुगतान की शर्तें",
    rowLiability: "दायित्व",
    rowConfidentiality: "गोपनीयता",
    rowGoverningLaw: "शासी कानून",
    notableClauses: "उल्लेखनीय खंड",
    redFlags: "चेतावनी संकेत",
    disclaimer: "AI-जनित विश्लेषण केवल मार्गदर्शन के लिए — कानूनी सलाह नहीं। लंबे अनुबंध ~120 KB तक पढ़े जाते हैं। स्कैन किए गए PDF को पहले OCR की आवश्यकता होती है।",
    noText: "इस PDF से कोई टेक्स्ट नहीं निकाला जा सका — क्या यह स्कैन है? पहले PDF OCR टूल आज़माएं।",
  },
  tr: {
    dropLabel: "Sözleşme PDF'si",
    readingPdf: "PDF okunuyor…",
    analyzingClauses: "Maddeler analiz ediliyor…",
    reAnalyze: "Yeniden analiz et",
    analyze: "Sözleşmeyi analiz et",
    rowParties: "Taraflar",
    rowEffectiveDate: "Yürürlük tarihi",
    rowTerm: "Süre",
    rowPaymentTerms: "Ödeme koşulları",
    rowLiability: "Sorumluluk",
    rowConfidentiality: "Gizlilik",
    rowGoverningLaw: "Uygulanacak hukuk",
    notableClauses: "Önemli maddeler",
    redFlags: "Uyarı işaretleri",
    disclaimer: "Yapay zeka tarafından oluşturulan analiz yalnızca yönlendirme amaçlıdır — hukuki tavsiye değildir. Uzun sözleşmeler ~120 KB'a kadar okunur. Taranmış PDF'ler önce OCR gerektirir.",
    noText: "Bu PDF'den metin çıkarılamadı — taranmış mı? Önce PDF OCR aracını deneyin.",
  },
  id: {
    dropLabel: "PDF Kontrak",
    readingPdf: "Membaca PDF…",
    analyzingClauses: "Menganalisis klausul…",
    reAnalyze: "Analisis ulang",
    analyze: "Analisis kontrak",
    rowParties: "Pihak-pihak",
    rowEffectiveDate: "Tanggal berlaku",
    rowTerm: "Jangka waktu",
    rowPaymentTerms: "Ketentuan pembayaran",
    rowLiability: "Tanggung jawab",
    rowConfidentiality: "Kerahasiaan",
    rowGoverningLaw: "Hukum yang berlaku",
    notableClauses: "Klausul penting",
    redFlags: "Tanda peringatan",
    disclaimer: "Analisis yang dihasilkan AI hanya untuk orientasi — bukan nasihat hukum. Kontrak panjang dibaca hingga ~120 KB. PDF hasil scan perlu OCR terlebih dahulu.",
    noText: "Tidak ada teks yang dapat diekstrak dari PDF ini — apakah ini hasil scan? Coba alat OCR PDF terlebih dahulu.",
  },
  vi: {
    dropLabel: "PDF hợp đồng",
    readingPdf: "Đang đọc PDF…",
    analyzingClauses: "Đang phân tích các điều khoản…",
    reAnalyze: "Phân tích lại",
    analyze: "Phân tích hợp đồng",
    rowParties: "Các bên",
    rowEffectiveDate: "Ngày hiệu lực",
    rowTerm: "Thời hạn",
    rowPaymentTerms: "Điều khoản thanh toán",
    rowLiability: "Trách nhiệm pháp lý",
    rowConfidentiality: "Bảo mật",
    rowGoverningLaw: "Luật áp dụng",
    notableClauses: "Các điều khoản đáng chú ý",
    redFlags: "Dấu hiệu cảnh báo",
    disclaimer: "Phân tích do AI tạo ra chỉ để định hướng — không phải tư vấn pháp lý. Hợp đồng dài được đọc đến ~120 KB. PDF được quét cần OCR trước.",
    noText: "Không thể trích xuất văn bản từ PDF này — có phải bản quét không? Hãy thử công cụ OCR PDF trước.",
  },
  sv: {
    dropLabel: "Kontrakt PDF",
    readingPdf: "Läser PDF…",
    analyzingClauses: "Analyserar klausuler…",
    reAnalyze: "Analysera igen",
    analyze: "Analysera kontrakt",
    rowParties: "Parter",
    rowEffectiveDate: "Ikraftträdandedatum",
    rowTerm: "Löptid",
    rowPaymentTerms: "Betalningsvillkor",
    rowLiability: "Ansvar",
    rowConfidentiality: "Sekretess",
    rowGoverningLaw: "Tillämplig lag",
    notableClauses: "Anmärkningsvärda klausuler",
    redFlags: "Varningssignaler",
    disclaimer: "AI-genererad analys endast för orientering — inte juridisk rådgivning. Långa kontrakt läses upp till ~120 KB. Skannade PDF:er behöver OCR först.",
    noText: "Ingen text kunde extraheras från denna PDF — är det en skanning? Prova PDF OCR-verktyget först.",
  },
  pl: {
    dropLabel: "PDF umowy",
    readingPdf: "Odczytywanie PDF…",
    analyzingClauses: "Analiza klauzul…",
    reAnalyze: "Analizuj ponownie",
    analyze: "Analizuj umowę",
    rowParties: "Strony",
    rowEffectiveDate: "Data wejścia w życie",
    rowTerm: "Okres obowiązywania",
    rowPaymentTerms: "Warunki płatności",
    rowLiability: "Odpowiedzialność",
    rowConfidentiality: "Poufność",
    rowGoverningLaw: "Prawo właściwe",
    notableClauses: "Godne uwagi klauzule",
    redFlags: "Sygnały ostrzegawcze",
    disclaimer: "Analiza wygenerowana przez AI tylko w celach orientacyjnych — nie stanowi porady prawnej. Długie umowy są odczytywane do ~120 KB. Zeskanowane pliki PDF wymagają najpierw OCR.",
    noText: "Nie można było wyodrębnić tekstu z tego pliku PDF — czy to skan? Najpierw wypróbuj narzędzie OCR PDF.",
  },
  uk: {
    dropLabel: "PDF договору",
    readingPdf: "Читання PDF…",
    analyzingClauses: "Аналіз пунктів…",
    reAnalyze: "Повторний аналіз",
    analyze: "Аналізувати договір",
    rowParties: "Сторони",
    rowEffectiveDate: "Дата набрання чинності",
    rowTerm: "Термін",
    rowPaymentTerms: "Умови оплати",
    rowLiability: "Відповідальність",
    rowConfidentiality: "Конфіденційність",
    rowGoverningLaw: "Застосовне право",
    notableClauses: "Примітні пункти",
    redFlags: "Тривожні сигнали",
    disclaimer: "Аналіз, згенерований ШІ, має орієнтовний характер — не є юридичною консультацією. Довгі договори читаються до ~120 КБ. Відскановані PDF потребують попереднього OCR.",
    noText: "З цього PDF не вдалося витягти текст — це скан? Спочатку скористайтеся інструментом OCR для PDF.",
  },
  cs: {
    dropLabel: "PDF smlouvy",
    readingPdf: "Čtení PDF…",
    analyzingClauses: "Analýza klauzulí…",
    reAnalyze: "Znovu analyzovat",
    analyze: "Analyzovat smlouvu",
    rowParties: "Strany",
    rowEffectiveDate: "Datum účinnosti",
    rowTerm: "Doba trvání",
    rowPaymentTerms: "Platební podmínky",
    rowLiability: "Odpovědnost",
    rowConfidentiality: "Důvěrnost",
    rowGoverningLaw: "Rozhodné právo",
    notableClauses: "Pozoruhodné klauzule",
    redFlags: "Varovné signály",
    disclaimer: "Analýza vygenerovaná umělou inteligencí slouží pouze k orientaci — není právní radou. Dlouhé smlouvy jsou čteny až do ~120 KB. Naskenované PDF soubory potřebují nejprve OCR.",
    noText: "Z tohoto PDF nelze extrahovat žádný text — je to sken? Nejprve vyzkoušejte nástroj PDF OCR.",
  },
};

type PdfPage = { getTextContent: () => Promise<{ items: { str: string; hasEOL?: boolean }[] }> };
type PdfDoc = { numPages: number; getPage: (n: number) => Promise<PdfPage> };
type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: Uint8Array }) => { promise: Promise<PdfDoc> };
};

let pdfjsCache: PdfJs | null = null;
async function loadPdfjs(): Promise<PdfJs> {
  if (pdfjsCache) return pdfjsCache;
  const url = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.min.mjs";
  const lib = (await import(/* webpackIgnore: true */ url)) as unknown as PdfJs;
  lib.GlobalWorkerOptions.workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs";
  pdfjsCache = lib;
  return lib;
}

async function extractText(file: File): Promise<string> {
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const pages: string[] = [];
  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const content = await page.getTextContent();
    let line = "";
    const lines: string[] = [];
    for (const it of content.items) {
      line += it.str;
      if (it.hasEOL) { lines.push(line); line = ""; }
      else line += " ";
    }
    if (line) lines.push(line);
    pages.push(lines.join("\n"));
  }
  return pages.join("\n\n");
}

type Analysis = {
  parties: string[];
  effective_date: string | null;
  term: string | null;
  payment_terms: string | null;
  liability: string | null;
  confidentiality: string | null;
  governing_law: string | null;
  notable_clauses: { title: string; summary: string }[];
  red_flags: string[];
};

export function ContractAnalyzerClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [phase, setPhase] = useState<"idle" | "extracting" | "analyzing" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (!file) return;
    setError(null); setAnalysis(null); setPhase("extracting");
    try {
      const text = await extractText(file);
      if (!text.trim()) throw new Error(s.noText);
      setPhase("analyzing");
      // ai-process accepts up to 120 KB for the contract-analyze task.
      const res = await callTool("contract-analyzer", { task: "contract-analyze", text: text.slice(0, 120_000) });
      const json = (await res.json()) as { output?: string; error?: string; message?: string };
      if (!res.ok || !json.output) throw new Error(json.message ?? json.error ?? `HTTP ${res.status}`);
      setAnalysis(JSON.parse(json.output) as Analysis);
      setPhase("done");
    } catch (e) {
      setError((e as Error).message);
      setPhase("error");
    }
  }

  const busy = phase === "extracting" || phase === "analyzing";

  const row = (label: string, v: string | string[] | null) => {
    if (v == null || (Array.isArray(v) && v.length === 0)) return null;
    return (
      <tr className="border-b border-ink-100 last:border-0 align-top">
        <td className="bg-ink-50/50 px-3 py-2 font-medium text-ink-600 w-1/3">{label}</td>
        <td className="px-3 py-2 text-ink-900">{Array.isArray(v) ? v.join(", ") : v}</td>
      </tr>
    );
  };

  return (
    <div className="space-y-5">
      <MiniDrop
        label={s.dropLabel}
        accept={{ "application/pdf": [".pdf"] }}
        icon={<FileText className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setAnalysis(null); setPhase("idle"); }}
        current={file}
      />

      {file && (
        <Button onClick={run} disabled={busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
          {phase === "extracting" ? s.readingPdf :
           phase === "analyzing" ? s.analyzingClauses :
           analysis ? s.reAnalyze : s.analyze}
        </Button>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {analysis && (
        <>
          <div className="overflow-hidden rounded-lg border border-ink-100">
            <table className="w-full text-sm">
              <tbody>
                {row(s.rowParties, analysis.parties)}
                {row(s.rowEffectiveDate, analysis.effective_date)}
                {row(s.rowTerm, analysis.term)}
                {row(s.rowPaymentTerms, analysis.payment_terms)}
                {row(s.rowLiability, analysis.liability)}
                {row(s.rowConfidentiality, analysis.confidentiality)}
                {row(s.rowGoverningLaw, analysis.governing_law)}
              </tbody>
            </table>
          </div>

          {analysis.notable_clauses?.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-ink-800">{s.notableClauses}</h3>
              <ul className="space-y-2">
                {analysis.notable_clauses.map((c, i) => (
                  <li key={i} className="rounded-lg border border-ink-100 bg-white p-3">
                    <div className="text-sm font-semibold text-ink-900">{c.title}</div>
                    <p className="mt-1 text-sm text-ink-600">{c.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.red_flags?.length > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-4">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-800">
                <ShieldAlert className="h-4 w-4" /> {s.redFlags}
              </h3>
              <ul className="space-y-1.5 text-sm text-amber-800">
                {analysis.red_flags.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      <p className="text-xs text-ink-400">
        {s.disclaimer}
      </p>
    </div>
  );
}
