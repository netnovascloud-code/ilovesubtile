"use client";

import { useState } from "react";
import { Image as ImageIcon, Loader2, Copy, Check, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { callVisionText } from "@/lib/vision-client";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "Photo of handwriting",
    reading: "Reading…",
    transcribe: "Transcribe handwriting",
    transcriptionLabel: "Transcription",
    chars: "chars",
    copy: "Copy",
    privacyNote: "Powered by AI vision. Clear photos under good lighting transcribe best. Illegible passages are tagged [illegible] rather than guessed.",
  },
  fr: {
    dropLabel: "Photo d'écriture manuscrite",
    reading: "Lecture en cours…",
    transcribe: "Transcrire l'écriture",
    transcriptionLabel: "Transcription",
    chars: "caractères",
    copy: "Copier",
    privacyNote: "Propulsé par la vision IA. Les photos nettes bien éclairées donnent les meilleurs résultats. Les passages illisibles sont marqués [illisible] plutôt que devinés.",
  },
  es: {
    dropLabel: "Foto de escritura a mano",
    reading: "Leyendo…",
    transcribe: "Transcribir escritura",
    transcriptionLabel: "Transcripción",
    chars: "caracteres",
    copy: "Copiar",
    privacyNote: "Con tecnología de visión IA. Las fotos claras con buena iluminación transcriben mejor. Los pasajes ilegibles se etiquetan como [ilegible] en lugar de adivinarse.",
  },
  pt: {
    dropLabel: "Foto de escrita à mão",
    reading: "Lendo…",
    transcribe: "Transcrever escrita",
    transcriptionLabel: "Transcrição",
    chars: "caracteres",
    copy: "Copiar",
    privacyNote: "Powered pela visão de IA. Fotos nítidas com boa iluminação transcrevem melhor. Passagens ilegíveis são marcadas como [ilegível] em vez de adivinhar.",
  },
  de: {
    dropLabel: "Foto der Handschrift",
    reading: "Liest…",
    transcribe: "Handschrift transkribieren",
    transcriptionLabel: "Transkription",
    chars: "Zeichen",
    copy: "Kopieren",
    privacyNote: "Mit KI-Vision betrieben. Klare Fotos bei guter Beleuchtung liefern die besten Ergebnisse. Unleserliche Passagen werden als [unleserlich] markiert, nicht geraten.",
  },
  it: {
    dropLabel: "Foto di scrittura a mano",
    reading: "Lettura in corso…",
    transcribe: "Trascrivi scrittura",
    transcriptionLabel: "Trascrizione",
    chars: "caratteri",
    copy: "Copia",
    privacyNote: "Basato su visione AI. Le foto nitide con buona illuminazione trascrivono meglio. I passaggi illeggibili sono contrassegnati come [illeggibile] anziché ipotizzati.",
  },
  nl: {
    dropLabel: "Foto van handschrift",
    reading: "Lezen…",
    transcribe: "Handschrift transcriberen",
    transcriptionLabel: "Transcriptie",
    chars: "tekens",
    copy: "Kopiëren",
    privacyNote: "Aangedreven door AI-visie. Heldere foto's bij goede belichting transcriberen het beste. Onleesbare passages worden gemarkeerd als [onleesbaar] in plaats van geraden.",
  },
  ja: {
    dropLabel: "手書きの写真",
    reading: "読み取り中…",
    transcribe: "手書きを文字起こし",
    transcriptionLabel: "文字起こし",
    chars: "文字",
    copy: "コピー",
    privacyNote: "AI ビジョンによって動作します。明るい場所で撮影した鮮明な写真が最も正確に変換されます。判読不能な箇所は推測せず [illegible] と表記されます。",
  },
  zh: {
    dropLabel: "手写照片",
    reading: "读取中…",
    transcribe: "转录手写内容",
    transcriptionLabel: "转录结果",
    chars: "字符",
    copy: "复制",
    privacyNote: "由 AI 视觉驱动。光线良好、清晰的照片转录效果最佳。无法辨认的段落标记为 [illegible]，而非猜测。",
  },
  ko: {
    dropLabel: "손글씨 사진",
    reading: "읽는 중…",
    transcribe: "손글씨 변환",
    transcriptionLabel: "변환 결과",
    chars: "자",
    copy: "복사",
    privacyNote: "AI 비전으로 구동됩니다. 조명이 좋은 환경의 선명한 사진이 가장 잘 변환됩니다. 읽기 어려운 부분은 추측 대신 [illegible]로 표시됩니다.",
  },
  ar: {
    dropLabel: "صورة للخط اليدوي",
    reading: "جارٍ القراءة…",
    transcribe: "نسخ الخط اليدوي",
    transcriptionLabel: "النسخ",
    chars: "حرفًا",
    copy: "نسخ",
    privacyNote: "مدعوم بالرؤية الاصطناعية. الصور الواضحة في إضاءة جيدة تُنسخ بشكل أفضل. تُوسَم المقاطع غير المقروءة بـ [illegible] عوضًا عن التخمين.",
  },
  ru: {
    dropLabel: "Фото рукописного текста",
    reading: "Чтение…",
    transcribe: "Транскрибировать рукопись",
    transcriptionLabel: "Транскрипция",
    chars: "символов",
    copy: "Копировать",
    privacyNote: "Работает на основе ИИ-зрения. Чёткие фото при хорошем освещении распознаются лучше всего. Нечитаемые фрагменты помечаются [illegible], а не угадываются.",
  },
  hi: {
    dropLabel: "हस्तलेखन की फ़ोटो",
    reading: "पढ़ा जा रहा है…",
    transcribe: "हस्तलेखन को पाठ में बदलें",
    transcriptionLabel: "ट्रांसक्रिप्शन",
    chars: "अक्षर",
    copy: "कॉपी करें",
    privacyNote: "AI विज़न द्वारा संचालित। अच्छी रोशनी में ली गई स्पष्ट तस्वीरें सबसे अच्छी तरह ट्रांसक्राइब होती हैं। अपठनीय अंश अनुमान के बजाय [illegible] से चिह्नित किए जाते हैं।",
  },
  tr: {
    dropLabel: "El yazısının fotoğrafı",
    reading: "Okunuyor…",
    transcribe: "El yazısını dönüştür",
    transcriptionLabel: "Transkripsiyon",
    chars: "karakter",
    copy: "Kopyala",
    privacyNote: "AI görüsüyle desteklenmektedir. İyi ışıkta çekilen net fotoğraflar en iyi sonucu verir. Okunamayan bölümler tahmin edilmek yerine [illegible] olarak işaretlenir.",
  },
  id: {
    dropLabel: "Foto tulisan tangan",
    reading: "Membaca…",
    transcribe: "Transkripsi tulisan tangan",
    transcriptionLabel: "Transkripsi",
    chars: "karakter",
    copy: "Salin",
    privacyNote: "Didukung oleh AI vision. Foto yang jelas dengan pencahayaan baik menghasilkan transkripsi terbaik. Bagian yang tidak terbaca ditandai [illegible] bukan ditebak.",
  },
  vi: {
    dropLabel: "Ảnh chữ viết tay",
    reading: "Đang đọc…",
    transcribe: "Chuyển đổi chữ viết tay",
    transcriptionLabel: "Bản sao chép",
    chars: "ký tự",
    copy: "Sao chép",
    privacyNote: "Được hỗ trợ bởi AI vision. Ảnh rõ nét dưới ánh sáng tốt cho kết quả tốt nhất. Các đoạn không đọc được được đánh dấu [illegible] thay vì đoán.",
  },
  sv: {
    dropLabel: "Foto av handstil",
    reading: "Läser…",
    transcribe: "Transkribera handstil",
    transcriptionLabel: "Transkription",
    chars: "tecken",
    copy: "Kopiera",
    privacyNote: "Drivs av AI-syn. Klara foton i bra belysning transkriberas bäst. Oläsliga passager märks som [illegible] istället för att gissas.",
  },
  pl: {
    dropLabel: "Zdjęcie pisma odręcznego",
    reading: "Odczytywanie…",
    transcribe: "Transkrybuj pismo",
    transcriptionLabel: "Transkrypcja",
    chars: "znaków",
    copy: "Kopiuj",
    privacyNote: "Zasilany przez AI vision. Wyraźne zdjęcia przy dobrym oświetleniu dają najlepsze wyniki. Nieczytelne fragmenty są oznaczane jako [illegible], a nie zgadywane.",
  },
  uk: {
    dropLabel: "Фото рукописного тексту",
    reading: "Читання…",
    transcribe: "Транскрибувати рукопис",
    transcriptionLabel: "Транскрипція",
    chars: "символів",
    copy: "Копіювати",
    privacyNote: "Працює на основі штучного інтелекту. Чіткі фото при хорошому освітленні транскрибуються найкраще. Нечитабельні фрагменти позначаються [illegible], а не вгадуються.",
  },
  cs: {
    dropLabel: "Fotografie rukopisu",
    reading: "Čtení…",
    transcribe: "Přepsat rukopis",
    transcriptionLabel: "Přepis",
    chars: "znaků",
    copy: "Kopírovat",
    privacyNote: "Využívá AI vision. Jasné fotografie při dobrém osvětlení se přepisují nejlépe. Nečitelné pasáže jsou označeny jako [illegible], nikoli odhadovány.",
  },
};

export function HandwritingToTextClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function run() {
    if (!file) return;
    setBusy(true); setError(null); setText("");
    try {
      setText(await callVisionText("handwriting-to-text", "ocr-handwriting", file));
    } catch (e) {
      setError((e as Error).message);
    } finally { setBusy(false); }
  }

  const copy = async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1400); };
  const download = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `${(file?.name ?? "handwriting").replace(/\.[^.]+$/, "")}.txt`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  return (
    <div className="space-y-5">
      <MiniDrop
        label={s.dropLabel}
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setText(""); }}
        current={file}
      />

      {file && (
        <Button onClick={run} disabled={busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
          {busy ? s.reading : s.transcribe}
        </Button>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {text && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-600">{s.transcriptionLabel} · {text.length.toLocaleString()} {s.chars}</span>
            <div className="flex gap-2">
              <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
                {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />} {s.copy}
              </button>
              <button onClick={download} className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
                <Download className="h-3 w-3" /> .txt
              </button>
            </div>
          </div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} spellCheck={false}
            className="h-72 w-full rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
      )}

      <p className="text-xs text-ink-400">
        {s.privacyNote}
      </p>
    </div>
  );
}
