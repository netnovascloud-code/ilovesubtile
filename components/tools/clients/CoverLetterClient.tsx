"use client";

import { useState } from "react";
import { Mail, Loader2, Copy, Check, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { callTool } from "@/lib/tool-api";
import { useLocale } from "@/hooks/useLocale";

const LANGS = ["English", "French", "Spanish", "German", "Italian", "Portuguese", "Dutch"];

const T: Record<string, Record<string, string>> = {
  en: {
    your_name: "Your name",
    current_role: "Current role",
    key_skills: "Key skills & strengths",
    target_job: "Target job description (paste it)",
    language: "Language",
    writing: "Writing…",
    regenerate: "Regenerate",
    generate: "Generate cover letter",
    your_cover_letter: "Your cover letter",
    copy: "Copy",
    pdf: "PDF",
    disclaimer: "Drafted by AI from the job description you paste. Always read it through and tweak it to your voice.",
  },
  fr: {
    your_name: "Votre nom",
    current_role: "Poste actuel",
    key_skills: "Compétences clés et points forts",
    target_job: "Description du poste ciblé (collez-la)",
    language: "Langue",
    writing: "Rédaction…",
    regenerate: "Régénérer",
    generate: "Générer la lettre de motivation",
    your_cover_letter: "Votre lettre de motivation",
    copy: "Copier",
    pdf: "PDF",
    disclaimer: "Rédigée par l'IA à partir de l'offre d'emploi que vous collez. Relisez et adaptez-la à votre style.",
  },
  es: {
    your_name: "Tu nombre",
    current_role: "Puesto actual",
    key_skills: "Habilidades clave y fortalezas",
    target_job: "Descripción del puesto deseado (pégala)",
    language: "Idioma",
    writing: "Escribiendo…",
    regenerate: "Regenerar",
    generate: "Generar carta de presentación",
    your_cover_letter: "Tu carta de presentación",
    copy: "Copiar",
    pdf: "PDF",
    disclaimer: "Redactada por IA a partir de la descripción del puesto que pegues. Léela siempre y ajústala a tu voz.",
  },
  pt: {
    your_name: "Seu nome",
    current_role: "Cargo atual",
    key_skills: "Habilidades-chave e pontos fortes",
    target_job: "Descrição da vaga desejada (cole aqui)",
    language: "Idioma",
    writing: "Escrevendo…",
    regenerate: "Regenerar",
    generate: "Gerar carta de apresentação",
    your_cover_letter: "Sua carta de apresentação",
    copy: "Copiar",
    pdf: "PDF",
    disclaimer: "Redigida por IA a partir da descrição da vaga que você cola. Leia sempre e adapte ao seu estilo.",
  },
  de: {
    your_name: "Ihr Name",
    current_role: "Aktuelle Position",
    key_skills: "Schlüsselkompetenzen und Stärken",
    target_job: "Zieljob-Beschreibung (hier einfügen)",
    language: "Sprache",
    writing: "Wird geschrieben…",
    regenerate: "Neu generieren",
    generate: "Anschreiben generieren",
    your_cover_letter: "Ihr Anschreiben",
    copy: "Kopieren",
    pdf: "PDF",
    disclaimer: "Von der KI anhand der eingefügten Stellenbeschreibung erstellt. Bitte immer lesen und an Ihren Stil anpassen.",
  },
  it: {
    your_name: "Il tuo nome",
    current_role: "Ruolo attuale",
    key_skills: "Competenze chiave e punti di forza",
    target_job: "Descrizione del lavoro target (incollala)",
    language: "Lingua",
    writing: "Scrittura in corso…",
    regenerate: "Rigenera",
    generate: "Genera lettera di accompagnamento",
    your_cover_letter: "La tua lettera di accompagnamento",
    copy: "Copia",
    pdf: "PDF",
    disclaimer: "Redatta dall'IA dalla descrizione del lavoro che incolli. Leggila sempre e adattala al tuo stile.",
  },
  nl: {
    your_name: "Uw naam",
    current_role: "Huidige functie",
    key_skills: "Kernvaardigheden en sterke punten",
    target_job: "Beschrijving van de gewenste vacature (plak hier)",
    language: "Taal",
    writing: "Schrijven…",
    regenerate: "Opnieuw genereren",
    generate: "Motivatiebrief genereren",
    your_cover_letter: "Uw motivatiebrief",
    copy: "Kopiëren",
    pdf: "PDF",
    disclaimer: "Opgesteld door AI op basis van de vacaturetekst die u plakt. Lees het altijd door en pas het aan uw eigen stijl aan.",
  },
  ja: {
    your_name: "お名前",
    current_role: "現在の役職",
    key_skills: "主なスキルと強み",
    target_job: "応募先の求人内容（貼り付け）",
    language: "言語",
    writing: "作成中…",
    regenerate: "再生成",
    generate: "カバーレターを生成",
    your_cover_letter: "カバーレター",
    copy: "コピー",
    pdf: "PDF",
    disclaimer: "貼り付けた求人票をもとにAIが下書きしました。必ず読み直し、あなた自身の表現に調整してください。",
  },
  zh: {
    your_name: "您的姓名",
    current_role: "当前职位",
    key_skills: "核心技能与优势",
    target_job: "目标职位描述（粘贴在此）",
    language: "语言",
    writing: "生成中…",
    regenerate: "重新生成",
    generate: "生成求职信",
    your_cover_letter: "您的求职信",
    copy: "复制",
    pdf: "PDF",
    disclaimer: "由AI根据您粘贴的职位描述生成。请务必通读并调整为您自己的语气。",
  },
  ko: {
    your_name: "이름",
    current_role: "현재 직책",
    key_skills: "핵심 기술 및 강점",
    target_job: "지원할 직무 설명 (붙여넣기)",
    language: "언어",
    writing: "작성 중…",
    regenerate: "다시 생성",
    generate: "자기소개서 생성",
    your_cover_letter: "자기소개서",
    copy: "복사",
    pdf: "PDF",
    disclaimer: "붙여넣은 채용 공고를 기반으로 AI가 초안을 작성했습니다. 반드시 검토 후 나만의 표현으로 수정하세요.",
  },
  ar: {
    your_name: "اسمك",
    current_role: "المنصب الحالي",
    key_skills: "المهارات الرئيسية ونقاط القوة",
    target_job: "وصف الوظيفة المستهدفة (الصقه هنا)",
    language: "اللغة",
    writing: "جارٍ الكتابة…",
    regenerate: "إعادة التوليد",
    generate: "توليد خطاب التقديم",
    your_cover_letter: "خطاب التقديم الخاص بك",
    copy: "نسخ",
    pdf: "PDF",
    disclaimer: "صِيغ بواسطة الذكاء الاصطناعي من وصف الوظيفة الذي تلصقه. اقرأه دائمًا وعدّله ليعبّر عن أسلوبك.",
  },
  ru: {
    your_name: "Ваше имя",
    current_role: "Текущая должность",
    key_skills: "Ключевые навыки и сильные стороны",
    target_job: "Описание желаемой вакансии (вставьте сюда)",
    language: "Язык",
    writing: "Создание…",
    regenerate: "Сгенерировать заново",
    generate: "Создать сопроводительное письмо",
    your_cover_letter: "Ваше сопроводительное письмо",
    copy: "Копировать",
    pdf: "PDF",
    disclaimer: "Составлено ИИ на основе вставленного описания вакансии. Всегда читайте и адаптируйте под свой стиль.",
  },
  hi: {
    your_name: "आपका नाम",
    current_role: "वर्तमान पद",
    key_skills: "मुख्य कौशल और ताकत",
    target_job: "लक्षित नौकरी का विवरण (यहाँ पेस्ट करें)",
    language: "भाषा",
    writing: "लिखा जा रहा है…",
    regenerate: "पुनः उत्पन्न करें",
    generate: "कवर लेटर बनाएं",
    your_cover_letter: "आपका कवर लेटर",
    copy: "कॉपी करें",
    pdf: "PDF",
    disclaimer: "आपके द्वारा पेस्ट की गई नौकरी के विवरण से AI द्वारा तैयार किया गया। हमेशा पढ़ें और अपनी भाषा में ढालें।",
  },
  tr: {
    your_name: "Adınız",
    current_role: "Mevcut pozisyon",
    key_skills: "Temel beceriler ve güçlü yönler",
    target_job: "Hedef iş ilanı açıklaması (yapıştırın)",
    language: "Dil",
    writing: "Yazılıyor…",
    regenerate: "Yeniden oluştur",
    generate: "Ön yazı oluştur",
    your_cover_letter: "Ön yazınız",
    copy: "Kopyala",
    pdf: "PDF",
    disclaimer: "Yapıştırdığınız iş ilanından yapay zeka tarafından taslak oluşturulmuştur. Her zaman okuyun ve kendi üslubunuza göre düzenleyin.",
  },
  id: {
    your_name: "Nama Anda",
    current_role: "Posisi saat ini",
    key_skills: "Keahlian utama dan kekuatan",
    target_job: "Deskripsi pekerjaan yang dituju (tempel di sini)",
    language: "Bahasa",
    writing: "Sedang menulis…",
    regenerate: "Buat ulang",
    generate: "Buat surat lamaran",
    your_cover_letter: "Surat lamaran Anda",
    copy: "Salin",
    pdf: "PDF",
    disclaimer: "Ditulis oleh AI berdasarkan deskripsi pekerjaan yang Anda tempel. Selalu baca dan sesuaikan dengan gaya Anda.",
  },
  vi: {
    your_name: "Tên của bạn",
    current_role: "Vị trí hiện tại",
    key_skills: "Kỹ năng chính và điểm mạnh",
    target_job: "Mô tả công việc mục tiêu (dán vào đây)",
    language: "Ngôn ngữ",
    writing: "Đang viết…",
    regenerate: "Tạo lại",
    generate: "Tạo thư xin việc",
    your_cover_letter: "Thư xin việc của bạn",
    copy: "Sao chép",
    pdf: "PDF",
    disclaimer: "Được AI soạn thảo từ mô tả công việc bạn dán vào. Luôn đọc kỹ và điều chỉnh theo phong cách của bạn.",
  },
  sv: {
    your_name: "Ditt namn",
    current_role: "Nuvarande roll",
    key_skills: "Nyckelkompetenser och styrkor",
    target_job: "Beskrivning av önskad tjänst (klistra in)",
    language: "Språk",
    writing: "Skriver…",
    regenerate: "Generera om",
    generate: "Generera personligt brev",
    your_cover_letter: "Ditt personliga brev",
    copy: "Kopiera",
    pdf: "PDF",
    disclaimer: "Skrivet av AI utifrån jobbannonsen du klistrar in. Läs alltid igenom och anpassa det till din röst.",
  },
  pl: {
    your_name: "Twoje imię i nazwisko",
    current_role: "Obecne stanowisko",
    key_skills: "Kluczowe umiejętności i mocne strony",
    target_job: "Opis poszukiwanego stanowiska (wklej tutaj)",
    language: "Język",
    writing: "Pisanie…",
    regenerate: "Wygeneruj ponownie",
    generate: "Wygeneruj list motywacyjny",
    your_cover_letter: "Twój list motywacyjny",
    copy: "Kopiuj",
    pdf: "PDF",
    disclaimer: "Sporządzony przez AI na podstawie wklejonego opisu stanowiska. Zawsze przeczytaj i dostosuj do własnego stylu.",
  },
  uk: {
    your_name: "Ваше ім'я",
    current_role: "Поточна посада",
    key_skills: "Ключові навички та сильні сторони",
    target_job: "Опис бажаної вакансії (вставте сюди)",
    language: "Мова",
    writing: "Генерація…",
    regenerate: "Згенерувати знову",
    generate: "Згенерувати супровідний лист",
    your_cover_letter: "Ваш супровідний лист",
    copy: "Копіювати",
    pdf: "PDF",
    disclaimer: "Складено ШІ на основі вставленого опису вакансії. Завжди читайте і адаптуйте під свій стиль.",
  },
  cs: {
    your_name: "Vaše jméno",
    current_role: "Současná pozice",
    key_skills: "Klíčové dovednosti a silné stránky",
    target_job: "Popis cílového pracovního místa (vložte sem)",
    language: "Jazyk",
    writing: "Píše se…",
    regenerate: "Vygenerovat znovu",
    generate: "Vygenerovat motivační dopis",
    your_cover_letter: "Váš motivační dopis",
    copy: "Kopírovat",
    pdf: "PDF",
    disclaimer: "Sestaveno AI na základě popisu pracovní pozice, který vložíte. Vždy si to přečtěte a upravte vlastním stylem.",
  },
};

export function CoverLetterClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [target, setTarget] = useState("English");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function run() {
    if (!name.trim() || !jobDesc.trim() || loading) return;
    setLoading(true); setError(null); setOutput("");
    try {
      const payload = JSON.stringify({
        name: name.trim(),
        current_role: role.trim(),
        key_skills: skills.trim(),
        target_job: jobDesc.trim(),
      });
      const res = await callTool("cover-letter", { task: "cover-letter", text: payload, options: { target } });
      const json = (await res.json()) as { output?: string; error?: string; message?: string };
      if (!res.ok || !json.output) throw new Error(json.message ?? json.error ?? `HTTP ${res.status}`);
      setOutput(json.output);
    } catch (e) {
      setError((e as Error).message);
    } finally { setLoading(false); }
  }

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1400); };

  async function downloadPdf() {
    if (!output) return;
    const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
    const doc = await PDFDocument.create();
    const helv = await doc.embedFont(StandardFonts.Helvetica);
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);
    let page = doc.addPage([595, 842]); // A4 in points
    const margin = 56, lineHeight = 15, size = 11;
    let y = 800;

    // Header: candidate name in bold + date
    page.drawText(name || "Cover Letter", { x: margin, y, size: 18, font: bold, color: rgb(0.05, 0.05, 0.06) });
    y -= 24;
    page.drawText(new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }),
      { x: margin, y, size: 10, font: helv, color: rgb(0.4, 0.4, 0.42) });
    y -= 28;

    // Body — word-wrap by manually measuring widths against the available width.
    const maxWidth = 595 - 2 * margin;
    for (const paragraph of output.split(/\n+/)) {
      const words = paragraph.split(/\s+/);
      let line = "";
      for (const w of words) {
        const candidate = line ? `${line} ${w}` : w;
        if (helv.widthOfTextAtSize(candidate, size) > maxWidth) {
          page.drawText(line, { x: margin, y, size, font: helv, color: rgb(0.1, 0.1, 0.12) });
          y -= lineHeight; line = w;
          if (y < margin) { y = 800; page = doc.addPage([595, 842]); }
        } else line = candidate;
      }
      if (line) { page.drawText(line, { x: margin, y, size, font: helv, color: rgb(0.1, 0.1, 0.12) }); y -= lineHeight; }
      y -= 6;
      if (y < margin) { y = 800; page = doc.addPage([595, 842]); }
    }

    const bytes = await doc.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `${(name || "cover-letter").replace(/\s+/g, "-").toLowerCase()}.pdf`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  const field = (label: string, v: string, setValue: (val: string) => void, kind: "input" | "textarea" = "input", rows = 3) => (
    <label className="flex flex-col text-xs font-medium text-ink-600">
      {label}
      {kind === "input" ? (
        <input value={v} onChange={(e) => setValue(e.target.value)}
          className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
      ) : (
        <textarea value={v} onChange={(e) => setValue(e.target.value)} rows={rows}
          className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
      )}
    </label>
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {field(s.your_name, name, setName)}
        {field(s.current_role, role, setRole)}
      </div>
      {field(s.key_skills, skills, setSkills, "textarea", 3)}
      {field(s.target_job, jobDesc, setJobDesc, "textarea", 6)}

      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.language}
          <select value={target} onChange={(e) => setTarget(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
            {LANGS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </label>
        <Button onClick={run} disabled={loading || !name.trim() || !jobDesc.trim()} size="lg">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? s.writing : output ? s.regenerate : s.generate}
        </Button>
      </div>

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-600">{s.your_cover_letter}</span>
            <div className="flex gap-2">
              <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
                {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />} {s.copy}
              </button>
              <button onClick={downloadPdf} className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
                <Download className="h-3 w-3" /> {s.pdf}
              </button>
            </div>
          </div>
          <textarea value={output} onChange={(e) => setOutput(e.target.value)}
            className="h-80 w-full rounded-lg border border-ink-200 bg-white p-4 text-sm leading-relaxed text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
      )}

      <p className="flex items-center gap-1.5 text-xs text-ink-400">
        <Mail className="h-3.5 w-3.5" />
        {s.disclaimer}
      </p>
    </div>
  );
}
