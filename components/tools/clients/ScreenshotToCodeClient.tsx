"use client";

import { useMemo, useState } from "react";
import { Image as ImageIcon, Loader2, Download, Copy, Check, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { callVisionText } from "@/lib/vision-client";
import { useLocale } from "@/hooks/useLocale";

// Strip the assistant's occasional ```html ... ``` fences so the saved file
// is a real HTML document and the iframe srcDoc renders correctly.
function stripFences(s: string): string {
  return s.replace(/^```(?:html)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
}

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "UI screenshot",
    generatingCode: "Generating code…",
    generateHtml: "Generate HTML/CSS",
    tabPreview: "Preview",
    tabCode: "Code",
    copy: "Copy",
    privacyNote: "Generated as a single self-contained HTML5 document with Tailwind CSS classes. Powered by AI vision — best for clean, common UI patterns; expect to adjust the result.",
  },
  fr: {
    dropLabel: "Capture d'écran UI",
    generatingCode: "Génération du code…",
    generateHtml: "Générer HTML/CSS",
    tabPreview: "Aperçu",
    tabCode: "Code",
    copy: "Copier",
    privacyNote: "Généré comme un document HTML5 autonome avec des classes Tailwind CSS. Propulsé par la vision IA — idéal pour les patterns UI communs et nets ; attendez-vous à ajuster le résultat.",
  },
  es: {
    dropLabel: "Captura de pantalla UI",
    generatingCode: "Generando código…",
    generateHtml: "Generar HTML/CSS",
    tabPreview: "Vista previa",
    tabCode: "Código",
    copy: "Copiar",
    privacyNote: "Generado como un documento HTML5 autocontenido con clases de Tailwind CSS. Con tecnología de visión IA — mejor para patrones UI comunes y limpios; espera ajustar el resultado.",
  },
  pt: {
    dropLabel: "Captura de tela UI",
    generatingCode: "Gerando código…",
    generateHtml: "Gerar HTML/CSS",
    tabPreview: "Pré-visualização",
    tabCode: "Código",
    copy: "Copiar",
    privacyNote: "Gerado como um documento HTML5 autossuficiente com classes Tailwind CSS. Powered pela visão IA — melhor para padrões UI comuns e limpos; espere ajustar o resultado.",
  },
  de: {
    dropLabel: "UI-Screenshot",
    generatingCode: "Code wird generiert…",
    generateHtml: "HTML/CSS generieren",
    tabPreview: "Vorschau",
    tabCode: "Code",
    copy: "Kopieren",
    privacyNote: "Als eigenständiges HTML5-Dokument mit Tailwind-CSS-Klassen generiert. Mit KI-Vision betrieben — am besten für klare, gängige UI-Muster; passen Sie das Ergebnis ggf. an.",
  },
  it: {
    dropLabel: "Screenshot UI",
    generatingCode: "Generazione codice…",
    generateHtml: "Genera HTML/CSS",
    tabPreview: "Anteprima",
    tabCode: "Codice",
    copy: "Copia",
    privacyNote: "Generato come documento HTML5 autonomo con classi Tailwind CSS. Basato su visione AI — ideale per pattern UI comuni e puliti; aspettati di aggiustare il risultato.",
  },
  nl: {
    dropLabel: "UI-schermafbeelding",
    generatingCode: "Code genereren…",
    generateHtml: "HTML/CSS genereren",
    tabPreview: "Voorbeeld",
    tabCode: "Code",
    copy: "Kopiëren",
    privacyNote: "Gegenereerd als een op zichzelf staand HTML5-document met Tailwind CSS-klassen. Aangedreven door AI-visie — het beste voor schone, veelgebruikte UI-patronen; verwacht het resultaat aan te passen.",
  },
  ja: {
    dropLabel: "UI スクリーンショット",
    generatingCode: "コードを生成中…",
    generateHtml: "HTML/CSS を生成",
    tabPreview: "プレビュー",
    tabCode: "コード",
    copy: "コピー",
    privacyNote: "Tailwind CSS クラスを使用した単一の自己完結型 HTML5 ドキュメントとして生成されます。AI ビジョンによって動作 — クリーンな一般的な UI パターンに最適；結果の調整が必要な場合があります。",
  },
  zh: {
    dropLabel: "UI 截图",
    generatingCode: "正在生成代码…",
    generateHtml: "生成 HTML/CSS",
    tabPreview: "预览",
    tabCode: "代码",
    copy: "复制",
    privacyNote: "以包含 Tailwind CSS 类的单个独立 HTML5 文档生成。由 AI 视觉驱动 — 最适合简洁、常见的 UI 模式；预计需要调整结果。",
  },
  ko: {
    dropLabel: "UI 스크린샷",
    generatingCode: "코드 생성 중…",
    generateHtml: "HTML/CSS 생성",
    tabPreview: "미리보기",
    tabCode: "코드",
    copy: "복사",
    privacyNote: "Tailwind CSS 클래스가 포함된 단일 자급 HTML5 문서로 생성됩니다. AI 비전으로 구동 — 깔끔하고 일반적인 UI 패턴에 가장 적합합니다; 결과를 조정할 것을 예상하세요.",
  },
  ar: {
    dropLabel: "لقطة شاشة واجهة المستخدم",
    generatingCode: "جارٍ إنشاء الكود…",
    generateHtml: "إنشاء HTML/CSS",
    tabPreview: "معاينة",
    tabCode: "الكود",
    copy: "نسخ",
    privacyNote: "يُنشأ كمستند HTML5 مستقل بالكامل مع فئات Tailwind CSS. مدعوم بالرؤية الاصطناعية — الأفضل للأنماط الشائعة والنظيفة لواجهة المستخدم؛ توقع تعديل النتيجة.",
  },
  ru: {
    dropLabel: "Скриншот UI",
    generatingCode: "Генерируется код…",
    generateHtml: "Сгенерировать HTML/CSS",
    tabPreview: "Предпросмотр",
    tabCode: "Код",
    copy: "Копировать",
    privacyNote: "Генерируется как единый самодостаточный HTML5-документ с классами Tailwind CSS. Работает на основе ИИ-зрения — лучше всего для чистых, распространённых UI-паттернов; ожидайте корректировки результата.",
  },
  hi: {
    dropLabel: "UI स्क्रीनशॉट",
    generatingCode: "कोड जनरेट हो रहा है…",
    generateHtml: "HTML/CSS जनरेट करें",
    tabPreview: "पूर्वावलोकन",
    tabCode: "कोड",
    copy: "कॉपी करें",
    privacyNote: "Tailwind CSS क्लासेस के साथ एकल स्व-निहित HTML5 दस्तावेज़ के रूप में जनरेट किया गया। AI विज़न द्वारा संचालित — साफ़, सामान्य UI पैटर्न के लिए सबसे अच्छा; परिणाम को समायोजित करने की अपेक्षा करें।",
  },
  tr: {
    dropLabel: "UI ekran görüntüsü",
    generatingCode: "Kod oluşturuluyor…",
    generateHtml: "HTML/CSS oluştur",
    tabPreview: "Önizleme",
    tabCode: "Kod",
    copy: "Kopyala",
    privacyNote: "Tailwind CSS sınıflarıyla tek, bağımsız bir HTML5 belgesi olarak oluşturulur. AI görüsüyle desteklenmektedir — temiz, yaygın UI desenleri için en iyisidir; sonucu ayarlamayı bekleyin.",
  },
  id: {
    dropLabel: "Screenshot UI",
    generatingCode: "Membuat kode…",
    generateHtml: "Buat HTML/CSS",
    tabPreview: "Pratinjau",
    tabCode: "Kode",
    copy: "Salin",
    privacyNote: "Dibuat sebagai dokumen HTML5 mandiri dengan kelas Tailwind CSS. Didukung oleh AI vision — terbaik untuk pola UI yang bersih dan umum; harap sesuaikan hasilnya.",
  },
  vi: {
    dropLabel: "Ảnh chụp màn hình UI",
    generatingCode: "Đang tạo mã…",
    generateHtml: "Tạo HTML/CSS",
    tabPreview: "Xem trước",
    tabCode: "Mã nguồn",
    copy: "Sao chép",
    privacyNote: "Được tạo dưới dạng tài liệu HTML5 độc lập với các lớp Tailwind CSS. Được hỗ trợ bởi AI vision — tốt nhất cho các mẫu UI phổ biến và gọn gàng; hãy điều chỉnh kết quả.",
  },
  sv: {
    dropLabel: "UI-skärmbild",
    generatingCode: "Genererar kod…",
    generateHtml: "Generera HTML/CSS",
    tabPreview: "Förhandsgranskning",
    tabCode: "Kod",
    copy: "Kopiera",
    privacyNote: "Genereras som ett fristående HTML5-dokument med Tailwind CSS-klasser. Drivs av AI-syn — bäst för rena, vanliga UI-mönster; förvänta dig att justera resultatet.",
  },
  pl: {
    dropLabel: "Zrzut ekranu UI",
    generatingCode: "Generowanie kodu…",
    generateHtml: "Generuj HTML/CSS",
    tabPreview: "Podgląd",
    tabCode: "Kod",
    copy: "Kopiuj",
    privacyNote: "Generowany jako pojedynczy, samodzielny dokument HTML5 z klasami Tailwind CSS. Zasilany przez AI vision — najlepszy dla czystych, typowych wzorców UI; spodziewaj się dostosowania wyniku.",
  },
  uk: {
    dropLabel: "Скріншот UI",
    generatingCode: "Генерується код…",
    generateHtml: "Згенерувати HTML/CSS",
    tabPreview: "Попередній перегляд",
    tabCode: "Код",
    copy: "Копіювати",
    privacyNote: "Генерується як єдиний автономний документ HTML5 з класами Tailwind CSS. Працює на основі штучного інтелекту — найкраще для чистих, поширених UI-патернів; очікуйте корекції результату.",
  },
  cs: {
    dropLabel: "Snímek UI",
    generatingCode: "Generování kódu…",
    generateHtml: "Generovat HTML/CSS",
    tabPreview: "Náhled",
    tabCode: "Kód",
    copy: "Kopírovat",
    privacyNote: "Generováno jako samostatný dokument HTML5 s třídami Tailwind CSS. Využívá AI vision — nejlepší pro čisté, běžné vzory UI; počítejte s úpravou výsledku.",
  },
};

export function ScreenshotToCodeClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [html, setHtml] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const cleaned = useMemo(() => stripFences(html), [html]);

  async function run() {
    if (!file) return;
    setBusy(true); setError(null); setHtml("");
    try {
      setHtml(await callVisionText("screenshot-to-code", "screenshot-to-code", file));
    } catch (e) {
      setError((e as Error).message);
    } finally { setBusy(false); }
  }

  const copy = async () => { await navigator.clipboard.writeText(cleaned); setCopied(true); setTimeout(() => setCopied(false), 1400); };
  const download = () => {
    const blob = new Blob([cleaned], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `${(file?.name ?? "screenshot").replace(/\.[^.]+$/, "")}.html`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  return (
    <div className="space-y-5">
      <MiniDrop
        label={s.dropLabel}
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setHtml(""); }}
        current={file}
      />

      {file && (
        <Button onClick={run} disabled={busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Code className="h-4 w-4" />}
          {busy ? s.generatingCode : s.generateHtml}
        </Button>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {cleaned && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
              {(["preview", "code"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`rounded-md px-3 py-1 text-xs font-medium ${tab === t ? "bg-brand-500 text-white" : "text-ink-600"}`}>
                  {t === "preview" ? s.tabPreview : s.tabCode}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
                {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />} {s.copy}
              </button>
              <button onClick={download} className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
                <Download className="h-3 w-3" /> .html
              </button>
            </div>
          </div>

          {tab === "preview" ? (
            // sandbox keeps any scripts in the generated page from touching
            // the parent — the Tailwind CDN <script> still works because it
            // doesn't need same-origin access.
            <iframe srcDoc={cleaned} sandbox="allow-scripts" className="h-[28rem] w-full rounded-lg border border-ink-200 bg-white" />
          ) : (
            <pre className="h-[28rem] w-full overflow-auto rounded-lg border border-ink-200 bg-ink-900 p-4 font-mono text-xs leading-relaxed text-ink-100">{cleaned}</pre>
          )}
        </div>
      )}

      <p className="text-xs text-ink-400">
        {s.privacyNote}
      </p>
    </div>
  );
}
