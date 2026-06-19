"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Loader2, Wand2, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOOLS, TOOLS_BY_SLUG } from "@/lib/tools-config";
import { callTool } from "@/lib/tool-api";
import { type Locale, localePath } from "@/lib/i18n/locales";
import { resolveToolI18n } from "@/lib/i18n/resolve-tool-i18n";

type Step = { slug: string; why: string };

// Strings: English base + French; other locales fall back to English until
// translated (same degradation as plan-compare / runs-on).
const T: Record<string, Record<string, string>> = {
  en: {
    title: "Tell the assistant what you want to do",
    subtitle: "Describe your goal in plain words — it points you to the right tool, or the steps to chain.",
    placeholder: "e.g. compress this video to email it, or turn a PDF into clean text",
    ask: "Ask",
    asking: "Thinking…",
    empty: "No tool matched that — try rephrasing, or browse the tools above.",
    errorGeneric: "Something went wrong. Please try again.",
    limit: "You've reached your AI limit. Upgrade your plan or try again later.",
    suggested: "Suggested steps",
    open: "Open",
    buildWorkflow: "Build these as one workflow",
  },
  fr: {
    title: "Dites à l'assistant ce que vous voulez faire",
    subtitle: "Décrivez votre objectif simplement — il vous oriente vers le bon outil, ou les étapes à enchaîner.",
    placeholder: "ex. compresser cette vidéo pour l'envoyer par mail, ou transformer un PDF en texte propre",
    ask: "Demander",
    asking: "Réflexion…",
    empty: "Aucun outil ne correspond — reformulez, ou parcourez les outils ci-dessus.",
    errorGeneric: "Une erreur est survenue. Veuillez réessayer.",
    limit: "Vous avez atteint votre limite IA. Passez à l'offre supérieure ou réessayez plus tard.",
    suggested: "Étapes suggérées",
    open: "Ouvrir",
    buildWorkflow: "En faire un seul workflow",
  },
  es: {
    title: "Dile al asistente lo que quieres hacer",
    subtitle: "Describe tu objetivo con palabras sencillas: te indica la herramienta adecuada o los pasos a encadenar.",
    placeholder: "p. ej. comprimir este vídeo para enviarlo por correo, o convertir un PDF en texto limpio",
    ask: "Preguntar",
    asking: "Pensando…",
    empty: "Ninguna herramienta coincide — prueba a reformularlo o explora las herramientas de arriba.",
    errorGeneric: "Algo salió mal. Inténtalo de nuevo.",
    limit: "Has alcanzado tu límite de IA. Mejora tu plan o inténtalo más tarde.",
    suggested: "Pasos sugeridos",
    open: "Abrir",
    buildWorkflow: "Crear un solo flujo de trabajo",
  },
  pt: {
    title: "Diga ao assistente o que você quer fazer",
    subtitle: "Descreva o seu objetivo em palavras simples — ele indica a ferramenta certa ou os passos a encadear.",
    placeholder: "ex. comprimir este vídeo para enviar por e-mail, ou transformar um PDF em texto limpo",
    ask: "Perguntar",
    asking: "Pensando…",
    empty: "Nenhuma ferramenta corresponde — tente reformular ou explore as ferramentas acima.",
    errorGeneric: "Algo deu errado. Tente novamente.",
    limit: "Você atingiu o seu limite de IA. Faça upgrade do seu plano ou tente novamente mais tarde.",
    suggested: "Passos sugeridos",
    open: "Abrir",
    buildWorkflow: "Criar um único fluxo de trabalho",
  },
  de: {
    title: "Sag dem Assistenten, was du tun möchtest",
    subtitle: "Beschreibe dein Ziel mit einfachen Worten — er weist dir das passende Tool oder die nötigen Schritte.",
    placeholder: "z. B. dieses Video für den E-Mail-Versand komprimieren oder ein PDF in sauberen Text umwandeln",
    ask: "Fragen",
    asking: "Denkt nach…",
    empty: "Kein Tool passt dazu — formuliere es anders oder sieh dir die Tools oben an.",
    errorGeneric: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
    limit: "Du hast dein KI-Limit erreicht. Upgrade deinen Tarif oder versuche es später erneut.",
    suggested: "Vorgeschlagene Schritte",
    open: "Öffnen",
    buildWorkflow: "Daraus einen Workflow machen",
  },
  it: {
    title: "Di' all'assistente cosa vuoi fare",
    subtitle: "Descrivi il tuo obiettivo con parole semplici — ti indica lo strumento giusto o i passaggi da concatenare.",
    placeholder: "es. comprimere questo video per inviarlo via email, o trasformare un PDF in testo pulito",
    ask: "Chiedi",
    asking: "Sto pensando…",
    empty: "Nessuno strumento corrisponde — prova a riformulare o sfoglia gli strumenti qui sopra.",
    errorGeneric: "Qualcosa è andato storto. Riprova.",
    limit: "Hai raggiunto il tuo limite IA. Passa a un piano superiore o riprova più tardi.",
    suggested: "Passaggi suggeriti",
    open: "Apri",
    buildWorkflow: "Crea un unico flusso di lavoro",
  },
  nl: {
    title: "Vertel de assistent wat je wilt doen",
    subtitle: "Beschrijf je doel in gewone woorden — hij wijst je de juiste tool of de te volgen stappen.",
    placeholder: "bijv. deze video comprimeren om te mailen, of een PDF omzetten naar schone tekst",
    ask: "Vragen",
    asking: "Aan het denken…",
    empty: "Geen tool gevonden — probeer het anders te formuleren of bekijk de tools hierboven.",
    errorGeneric: "Er ging iets mis. Probeer het opnieuw.",
    limit: "Je hebt je AI-limiet bereikt. Upgrade je abonnement of probeer het later opnieuw.",
    suggested: "Voorgestelde stappen",
    open: "Openen",
    buildWorkflow: "Maak er één workflow van",
  },
  ja: {
    title: "やりたいことをアシスタントに伝えてください",
    subtitle: "目標を普通の言葉で説明してください。最適なツールや、つなげるべき手順を案内します。",
    placeholder: "例：この動画をメールで送れるよう圧縮する、PDFをきれいなテキストに変換する",
    ask: "質問する",
    asking: "考え中…",
    empty: "一致するツールがありませんでした。言い換えるか、上のツールを見てみてください。",
    errorGeneric: "問題が発生しました。もう一度お試しください。",
    limit: "AIの利用上限に達しました。プランをアップグレードするか、後ほど再度お試しください。",
    suggested: "おすすめの手順",
    open: "開く",
    buildWorkflow: "ひとつのワークフローにまとめる",
  },
  zh: {
    title: "告诉助手你想做什么",
    subtitle: "用简单的话描述你的目标——它会为你指向合适的工具，或需要串联的步骤。",
    placeholder: "例如：压缩这个视频以便用邮件发送，或把 PDF 转换成干净的文本",
    ask: "提问",
    asking: "思考中…",
    empty: "没有匹配的工具——换个说法，或浏览上方的工具。",
    errorGeneric: "出了点问题，请重试。",
    limit: "你已达到 AI 使用上限。请升级套餐或稍后再试。",
    suggested: "建议步骤",
    open: "打开",
    buildWorkflow: "合并为一个工作流",
  },
  ko: {
    title: "무엇을 하고 싶은지 어시스턴트에게 알려주세요",
    subtitle: "목표를 쉬운 말로 설명해 주세요 — 알맞은 도구나 이어서 진행할 단계를 안내해 드립니다.",
    placeholder: "예: 이 영상을 이메일로 보낼 수 있게 압축하기, 또는 PDF를 깔끔한 텍스트로 변환하기",
    ask: "질문하기",
    asking: "생각 중…",
    empty: "일치하는 도구가 없습니다 — 다시 표현하거나 위의 도구를 둘러보세요.",
    errorGeneric: "문제가 발생했습니다. 다시 시도해 주세요.",
    limit: "AI 사용 한도에 도달했습니다. 요금제를 업그레이드하거나 나중에 다시 시도해 주세요.",
    suggested: "추천 단계",
    open: "열기",
    buildWorkflow: "하나의 워크플로로 묶기",
  },
  ar: {
    title: "أخبر المساعد بما تريد فعله",
    subtitle: "صِف هدفك بكلمات بسيطة — يرشدك إلى الأداة المناسبة أو الخطوات التي تربطها معًا.",
    placeholder: "مثال: ضغط هذا الفيديو لإرساله بالبريد الإلكتروني، أو تحويل ملف PDF إلى نص نظيف",
    ask: "اسأل",
    asking: "جارٍ التفكير…",
    empty: "لا توجد أداة مطابقة — جرّب إعادة الصياغة أو تصفّح الأدوات أعلاه.",
    errorGeneric: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    limit: "لقد وصلت إلى حد استخدام الذكاء الاصطناعي. قم بترقية خطتك أو حاول لاحقًا.",
    suggested: "الخطوات المقترحة",
    open: "فتح",
    buildWorkflow: "اجعلها سير عمل واحدًا",
  },
  ru: {
    title: "Скажите ассистенту, что вы хотите сделать",
    subtitle: "Опишите свою цель простыми словами — он подскажет подходящий инструмент или нужные шаги.",
    placeholder: "напр. сжать это видео, чтобы отправить по почте, или превратить PDF в чистый текст",
    ask: "Спросить",
    asking: "Думаю…",
    empty: "Подходящего инструмента не нашлось — переформулируйте запрос или посмотрите инструменты выше.",
    errorGeneric: "Что-то пошло не так. Пожалуйста, попробуйте снова.",
    limit: "Вы достигли лимита ИИ. Повысьте тариф или попробуйте позже.",
    suggested: "Предлагаемые шаги",
    open: "Открыть",
    buildWorkflow: "Объединить в один процесс",
  },
  hi: {
    title: "असिस्टेंट को बताएं कि आप क्या करना चाहते हैं",
    subtitle: "अपना लक्ष्य सरल शब्दों में बताएं — यह आपको सही टूल या जोड़ने वाले चरण बताता है।",
    placeholder: "उदा. इस वीडियो को ईमेल करने के लिए कॉम्प्रेस करें, या PDF को साफ़ टेक्स्ट में बदलें",
    ask: "पूछें",
    asking: "सोच रहा है…",
    empty: "कोई टूल मेल नहीं खाया — दोबारा लिखकर देखें, या ऊपर दिए टूल देखें।",
    errorGeneric: "कुछ गड़बड़ हो गई। कृपया फिर से कोशिश करें।",
    limit: "आप अपनी AI सीमा तक पहुँच गए हैं। अपना प्लान अपग्रेड करें या बाद में फिर कोशिश करें।",
    suggested: "सुझाए गए चरण",
    open: "खोलें",
    buildWorkflow: "इन्हें एक वर्कफ़्लो बनाएं",
  },
  tr: {
    title: "Asistana ne yapmak istediğini söyle",
    subtitle: "Hedefini sade kelimelerle anlat — sana doğru aracı ya da izlenecek adımları gösterir.",
    placeholder: "ör. bu videoyu e-postayla göndermek için sıkıştır ya da bir PDF'yi temiz metne dönüştür",
    ask: "Sor",
    asking: "Düşünüyor…",
    empty: "Eşleşen araç yok — farklı ifade etmeyi dene veya yukarıdaki araçlara göz at.",
    errorGeneric: "Bir şeyler ters gitti. Lütfen tekrar dene.",
    limit: "Yapay zekâ limitine ulaştın. Planını yükselt veya daha sonra tekrar dene.",
    suggested: "Önerilen adımlar",
    open: "Aç",
    buildWorkflow: "Bunları tek bir iş akışı yap",
  },
  id: {
    title: "Beri tahu asisten apa yang ingin Anda lakukan",
    subtitle: "Jelaskan tujuan Anda dengan kata-kata sederhana — ia mengarahkan Anda ke alat yang tepat atau langkah yang perlu dirangkai.",
    placeholder: "mis. kompres video ini agar bisa dikirim lewat email, atau ubah PDF menjadi teks yang rapi",
    ask: "Tanya",
    asking: "Berpikir…",
    empty: "Tidak ada alat yang cocok — coba ubah kalimatnya, atau lihat alat di atas.",
    errorGeneric: "Terjadi kesalahan. Silakan coba lagi.",
    limit: "Anda telah mencapai batas AI. Tingkatkan paket Anda atau coba lagi nanti.",
    suggested: "Langkah yang disarankan",
    open: "Buka",
    buildWorkflow: "Jadikan satu alur kerja",
  },
  vi: {
    title: "Cho trợ lý biết bạn muốn làm gì",
    subtitle: "Mô tả mục tiêu của bạn bằng lời lẽ đơn giản — trợ lý sẽ chỉ cho bạn công cụ phù hợp hoặc các bước cần nối tiếp.",
    placeholder: "vd. nén video này để gửi qua email, hoặc chuyển PDF thành văn bản sạch",
    ask: "Hỏi",
    asking: "Đang suy nghĩ…",
    empty: "Không có công cụ nào phù hợp — hãy thử diễn đạt lại, hoặc xem các công cụ ở trên.",
    errorGeneric: "Đã xảy ra lỗi. Vui lòng thử lại.",
    limit: "Bạn đã đạt giới hạn AI. Hãy nâng cấp gói hoặc thử lại sau.",
    suggested: "Các bước gợi ý",
    open: "Mở",
    buildWorkflow: "Gộp thành một quy trình",
  },
  sv: {
    title: "Berätta för assistenten vad du vill göra",
    subtitle: "Beskriv ditt mål med enkla ord — den pekar dig mot rätt verktyg, eller stegen att kedja ihop.",
    placeholder: "t.ex. komprimera den här videon för att mejla den, eller göra om en PDF till ren text",
    ask: "Fråga",
    asking: "Tänker…",
    empty: "Inget verktyg matchade — prova att formulera om, eller bläddra bland verktygen ovan.",
    errorGeneric: "Något gick fel. Försök igen.",
    limit: "Du har nått din AI-gräns. Uppgradera din plan eller försök igen senare.",
    suggested: "Föreslagna steg",
    open: "Öppna",
    buildWorkflow: "Gör dem till ett arbetsflöde",
  },
  pl: {
    title: "Powiedz asystentowi, co chcesz zrobić",
    subtitle: "Opisz swój cel prostymi słowami — wskaże Ci odpowiednie narzędzie lub kroki do połączenia.",
    placeholder: "np. skompresuj ten film, aby wysłać go mailem, albo zamień PDF na czysty tekst",
    ask: "Zapytaj",
    asking: "Myślę…",
    empty: "Żadne narzędzie nie pasuje — spróbuj sformułować inaczej lub przejrzyj narzędzia powyżej.",
    errorGeneric: "Coś poszło nie tak. Spróbuj ponownie.",
    limit: "Osiągnięto limit AI. Ulepsz swój plan lub spróbuj ponownie później.",
    suggested: "Sugerowane kroki",
    open: "Otwórz",
    buildWorkflow: "Połącz w jeden przepływ pracy",
  },
  uk: {
    title: "Скажіть асистенту, що ви хочете зробити",
    subtitle: "Опишіть свою мету простими словами — він підкаже потрібний інструмент або кроки, які варто поєднати.",
    placeholder: "напр. стиснути це відео, щоб надіслати поштою, або перетворити PDF на чистий текст",
    ask: "Запитати",
    asking: "Думаю…",
    empty: "Жоден інструмент не підійшов — спробуйте переформулювати або перегляньте інструменти вище.",
    errorGeneric: "Щось пішло не так. Будь ласка, спробуйте ще раз.",
    limit: "Ви досягли ліміту ШІ. Оновіть тарифний план або спробуйте пізніше.",
    suggested: "Запропоновані кроки",
    open: "Відкрити",
    buildWorkflow: "Об'єднати в один процес",
  },
  cs: {
    title: "Řekněte asistentovi, co chcete udělat",
    subtitle: "Popište svůj cíl jednoduchými slovy — nasměruje vás na správný nástroj nebo na kroky, které je třeba spojit.",
    placeholder: "např. zkomprimovat toto video, aby šlo poslat e-mailem, nebo převést PDF na čistý text",
    ask: "Zeptat se",
    asking: "Přemýšlím…",
    empty: "Žádný nástroj neodpovídá — zkuste to přeformulovat nebo si projděte nástroje výše.",
    errorGeneric: "Něco se pokazilo. Zkuste to prosím znovu.",
    limit: "Dosáhli jste limitu AI. Vylepšete svůj plán nebo to zkuste později.",
    suggested: "Navržené kroky",
    open: "Otevřít",
    buildWorkflow: "Spojit do jednoho pracovního postupu",
  },
};

// Compact tool catalogue sent to the model: "slug — name — description", one
// per line. Built once from the static config; the model returns slugs only.
const CATALOGUE = TOOLS.filter((t) => !t.pending)
  .map((t) => `${t.slug} — ${t.name} — ${t.short}`)
  .join("\n");

// Image tools that map to a Workflow-Builder step kind. When the assistant
// suggests a chain of two or more of these, we offer to assemble them into a
// single in-browser pipeline (no extra AI call — the builder runs locally).
const SLUG_TO_KIND: Record<string, string> = {
  "resize-image": "resize",
  "rotate-image": "rotate",
  "grayscale-image": "grayscale",
  "watermark-image": "watermark",
  "images-to-pdf": "to-pdf",
  "png-to-jpg": "format", "jpg-to-png": "format", "png-to-webp": "format",
  "jpg-to-webp": "format", "webp-to-jpg": "format", "webp-to-png": "format",
  "avif-to-jpg": "format", "avif-to-png": "format", "compress-image": "format",
};

export function AssistantBar({ locale }: { locale: Locale }) {
  const s = T[locale] ?? T.en;
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[] | null>(null);

  async function ask() {
    const goal = prompt.trim();
    if (!goal || busy) return;
    setBusy(true); setError(null); setSteps(null);
    try {
      const text = `Goal: ${goal}\n\nCatalogue:\n${CATALOGUE}`;
      const res = await callTool("smart-assistant", { text });
      const data = (await res.json().catch(() => ({}))) as { steps?: Step[]; message?: string };
      if (res.status === 429) { setError(s.limit); return; }
      if (!res.ok) { setError(data.message ?? s.errorGeneric); return; }
      setSteps((data.steps ?? []).filter((st) => st && typeof st.slug === "string" && TOOLS_BY_SLUG[st.slug]));
    } catch {
      setError(s.errorGeneric);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="border-t border-ink-100 bg-white">
      <div className="container py-14">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand-600">
            <Wand2 className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink-900">{s.title}</h2>
          <p className="mt-2 text-sm text-ink-500">{s.subtitle}</p>
        </div>

        <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-2 sm:flex-row">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") ask(); }}
            placeholder={s.placeholder}
            aria-label={s.title}
            className="flex-1 rounded-lg border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <Button onClick={ask} disabled={busy || !prompt.trim()} size="lg">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {busy ? s.asking : s.ask}
          </Button>
        </div>

        {error && (
          <p className="mx-auto mt-4 max-w-2xl rounded-lg bg-amber-50 px-4 py-3 text-center text-sm text-amber-800">{error}</p>
        )}

        {steps && steps.length === 0 && !error && (
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-ink-500">{s.empty}</p>
        )}

        {steps && steps.length > 0 && (
          <div className="mx-auto mt-6 max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">{s.suggested}</p>
            <ol className="space-y-2">
              {steps.map((st, i) => {
                const tool = TOOLS_BY_SLUG[st.slug];
                const i18n = locale === "en" ? null : resolveToolI18n(st.slug, locale);
                const name = i18n?.name ?? tool.name;
                return (
                  <li key={`${st.slug}-${i}`}>
                    <Link
                      href={localePath(locale, st.slug)}
                      className="group flex items-center gap-3 rounded-lg border border-ink-100 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-200"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">{i + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium text-ink-900">{name}</span>
                        <span className="block truncate text-sm text-ink-500">{st.why}</span>
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-600">
                        {s.open} <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>

            {(() => {
              const kinds = steps.map((st) => SLUG_TO_KIND[st.slug]).filter(Boolean);
              if (kinds.length < 2) return null;
              return (
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      try { sessionStorage.setItem("konver_wf_steps", JSON.stringify(kinds.slice(0, 5))); } catch { /* ignore */ }
                      router.push(localePath(locale, "workflow"));
                    }}
                  >
                    <GitBranch className="h-4 w-4" /> {s.buildWorkflow ?? T.en.buildWorkflow}
                  </Button>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
}
