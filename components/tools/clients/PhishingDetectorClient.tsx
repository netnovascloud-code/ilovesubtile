"use client";

import { useState } from "react";
import { ShieldAlert, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { CharMeter } from "@/components/tools/CharMeter";
import { useCharLimit } from "@/hooks/useCharLimit";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    label: "Paste the suspicious email",
    placeholder: "Paste the full email content here — sender, subject and body…",
    analysingBtn: "Analysing…",
    checkBtn: "Check for phishing",
    verdictSafe: "Looks legitimate",
    verdictSuspicious: "Suspicious — be careful",
    verdictDangerous: "Likely a scam / phishing",
    impersonates: "Appears to impersonate:",
    warningSigns: "Warning signs",
    dangerousLinks: "Dangerous links found",
    errorDefault: "Could not analyse that email. Please try again.",
    errorNetwork: "Network error — please try again.",
    footer: "AI-assisted analysis for guidance only — it cross-checks any links against Google Safe Browsing but cannot guarantee an email is safe. When in doubt, never click links or share personal information.",
  },
  fr: {
    label: "Collez l'e-mail suspect",
    placeholder: "Collez ici le contenu complet de l'e-mail — expéditeur, objet et corps…",
    analysingBtn: "Analyse en cours…",
    checkBtn: "Vérifier le hameçonnage",
    verdictSafe: "Semble légitime",
    verdictSuspicious: "Suspect — soyez prudent",
    verdictDangerous: "Probablement une arnaque / hameçonnage",
    impersonates: "Semble usurper l'identité de :",
    warningSigns: "Signes d'alerte",
    dangerousLinks: "Liens dangereux trouvés",
    errorDefault: "Impossible d'analyser cet e-mail. Veuillez réessayer.",
    errorNetwork: "Erreur réseau — veuillez réessayer.",
    footer: "Analyse assistée par IA à titre indicatif uniquement — les liens sont vérifiés contre Google Safe Browsing mais ne garantit pas qu'un e-mail est sûr. En cas de doute, ne cliquez jamais sur des liens et ne partagez pas d'informations personnelles.",
  },
  es: {
    label: "Pega el correo sospechoso",
    placeholder: "Pega aquí el contenido completo del correo — remitente, asunto y cuerpo…",
    analysingBtn: "Analizando…",
    checkBtn: "Verificar phishing",
    verdictSafe: "Parece legítimo",
    verdictSuspicious: "Sospechoso — ten cuidado",
    verdictDangerous: "Probablemente una estafa / phishing",
    impersonates: "Parece suplantar a:",
    warningSigns: "Señales de alerta",
    dangerousLinks: "Enlaces peligrosos encontrados",
    errorDefault: "No se pudo analizar ese correo. Por favor inténtalo de nuevo.",
    errorNetwork: "Error de red — inténtalo de nuevo.",
    footer: "Análisis asistido por IA solo orientativo — verifica los enlaces contra Google Safe Browsing pero no puede garantizar que un correo sea seguro. En caso de duda, nunca hagas clic en enlaces ni compartas información personal.",
  },
  pt: {
    label: "Cole o e-mail suspeito",
    placeholder: "Cole aqui o conteúdo completo do e-mail — remetente, assunto e corpo…",
    analysingBtn: "Analisando…",
    checkBtn: "Verificar phishing",
    verdictSafe: "Parece legítimo",
    verdictSuspicious: "Suspeito — tenha cuidado",
    verdictDangerous: "Provavelmente uma fraude / phishing",
    impersonates: "Parece se passar por:",
    warningSigns: "Sinais de alerta",
    dangerousLinks: "Links perigosos encontrados",
    errorDefault: "Não foi possível analisar esse e-mail. Tente novamente.",
    errorNetwork: "Erro de rede — tente novamente.",
    footer: "Análise assistida por IA apenas orientativa — verifica links contra o Google Safe Browsing, mas não pode garantir que um e-mail é seguro. Na dúvida, nunca clique em links nem compartilhe informações pessoais.",
  },
  de: {
    label: "Verdächtige E-Mail einfügen",
    placeholder: "Hier den vollständigen E-Mail-Inhalt einfügen — Absender, Betreff und Text…",
    analysingBtn: "Wird analysiert…",
    checkBtn: "Auf Phishing prüfen",
    verdictSafe: "Sieht legitim aus",
    verdictSuspicious: "Verdächtig — sei vorsichtig",
    verdictDangerous: "Wahrscheinlich Betrug / Phishing",
    impersonates: "Gibt sich aus als:",
    warningSigns: "Warnsignale",
    dangerousLinks: "Gefährliche Links gefunden",
    errorDefault: "Diese E-Mail konnte nicht analysiert werden. Bitte erneut versuchen.",
    errorNetwork: "Netzwerkfehler — bitte erneut versuchen.",
    footer: "KI-gestützte Analyse nur zur Orientierung — Links werden gegen Google Safe Browsing geprüft, können aber keine Sicherheit garantieren. Im Zweifelsfall niemals auf Links klicken oder persönliche Daten teilen.",
  },
  it: {
    label: "Incolla l'e-mail sospetta",
    placeholder: "Incolla qui il contenuto completo dell'e-mail — mittente, oggetto e corpo…",
    analysingBtn: "Analisi in corso…",
    checkBtn: "Controlla phishing",
    verdictSafe: "Sembra legittima",
    verdictSuspicious: "Sospetta — fai attenzione",
    verdictDangerous: "Probabilmente una truffa / phishing",
    impersonates: "Sembra fingersi:",
    warningSigns: "Segnali di allarme",
    dangerousLinks: "Link pericolosi trovati",
    errorDefault: "Impossibile analizzare quell'e-mail. Riprova.",
    errorNetwork: "Errore di rete — riprova.",
    footer: "Analisi assistita da IA solo indicativa — i link vengono verificati contro Google Safe Browsing ma non garantisce che un'e-mail sia sicura. In caso di dubbio, non cliccare mai su link né condividere informazioni personali.",
  },
  nl: {
    label: "Plak de verdachte e-mail",
    placeholder: "Plak hier de volledige inhoud van de e-mail — afzender, onderwerp en tekst…",
    analysingBtn: "Analyseren…",
    checkBtn: "Controleren op phishing",
    verdictSafe: "Ziet er legitiem uit",
    verdictSuspicious: "Verdacht — wees voorzichtig",
    verdictDangerous: "Waarschijnlijk oplichterij / phishing",
    impersonates: "Lijkt zich voor te doen als:",
    warningSigns: "Waarschuwingssignalen",
    dangerousLinks: "Gevaarlijke links gevonden",
    errorDefault: "Kon die e-mail niet analyseren. Probeer het opnieuw.",
    errorNetwork: "Netwerkfout — probeer het opnieuw.",
    footer: "AI-ondersteunde analyse alleen ter indicatie — links worden gecontroleerd via Google Safe Browsing maar kan niet garanderen dat een e-mail veilig is. Klik bij twijfel nooit op links en deel geen persoonlijke informatie.",
  },
  ja: {
    label: "不審なメールを貼り付ける",
    placeholder: "メールの全内容をここに貼り付けてください — 送信者、件名、本文…",
    analysingBtn: "分析中…",
    checkBtn: "フィッシング確認",
    verdictSafe: "正当に見えます",
    verdictSuspicious: "怪しい — 注意してください",
    verdictDangerous: "詐欺 / フィッシングの可能性が高い",
    impersonates: "なりすまし先：",
    warningSigns: "警告サイン",
    dangerousLinks: "危険なリンクが見つかりました",
    errorDefault: "そのメールを分析できませんでした。もう一度お試しください。",
    errorNetwork: "ネットワークエラー — 再試行してください。",
    footer: "AI支援による参考分析のみ — リンクはGoogle Safe Browsingと照合されますが、メールの安全性を保証するものではありません。疑わしい場合は、リンクをクリックしたり個人情報を共有したりしないでください。",
  },
  zh: {
    label: "粘贴可疑邮件",
    placeholder: "在此粘贴完整的邮件内容 — 发件人、主题和正文…",
    analysingBtn: "分析中…",
    checkBtn: "检测钓鱼邮件",
    verdictSafe: "看起来合法",
    verdictSuspicious: "可疑 — 请小心",
    verdictDangerous: "可能是诈骗 / 钓鱼",
    impersonates: "似乎冒充：",
    warningSigns: "警告信号",
    dangerousLinks: "发现危险链接",
    errorDefault: "无法分析该邮件。请重试。",
    errorNetwork: "网络错误 — 请重试。",
    footer: "仅供参考的AI辅助分析 — 对链接进行Google Safe Browsing交叉检查，但不能保证邮件安全。如有疑问，切勿点击链接或分享个人信息。",
  },
  ko: {
    label: "의심스러운 이메일 붙여넣기",
    placeholder: "이메일 전체 내용을 여기에 붙여넣으세요 — 발신자, 제목, 본문…",
    analysingBtn: "분석 중…",
    checkBtn: "피싱 확인",
    verdictSafe: "합법적으로 보입니다",
    verdictSuspicious: "의심스러움 — 주의하세요",
    verdictDangerous: "사기 / 피싱 가능성 높음",
    impersonates: "가장한 것으로 보임:",
    warningSigns: "경고 신호",
    dangerousLinks: "위험한 링크 발견",
    errorDefault: "해당 이메일을 분석할 수 없습니다. 다시 시도하세요.",
    errorNetwork: "네트워크 오류 — 다시 시도하세요.",
    footer: "참고용 AI 보조 분석 — Google Safe Browsing과 링크를 교차 확인하지만 이메일이 안전하다고 보장할 수 없습니다. 의심스러울 경우 링크를 클릭하거나 개인 정보를 공유하지 마세요.",
  },
  ar: {
    label: "الصق البريد المشبوه",
    placeholder: "الصق هنا المحتوى الكامل للبريد — المرسل والموضوع والنص…",
    analysingBtn: "جارٍ التحليل…",
    checkBtn: "فحص التصيّد",
    verdictSafe: "يبدو شرعياً",
    verdictSuspicious: "مشبوه — كن حذراً",
    verdictDangerous: "يُرجَّح أنه احتيال / تصيّد",
    impersonates: "يبدو أنه ينتحل صفة:",
    warningSigns: "علامات التحذير",
    dangerousLinks: "تم العثور على روابط خطيرة",
    errorDefault: "تعذّر تحليل هذا البريد. يرجى المحاولة مرة أخرى.",
    errorNetwork: "خطأ في الشبكة — يرجى المحاولة مرة أخرى.",
    footer: "تحليل بمساعدة الذكاء الاصطناعي للإرشاد فقط — يتحقق من الروابط عبر Google Safe Browsing لكن لا يضمن سلامة البريد. عند الشك، لا تنقر أبداً على الروابط ولا تشارك بياناتك الشخصية.",
  },
  ru: {
    label: "Вставьте подозрительное письмо",
    placeholder: "Вставьте сюда полное содержимое письма — отправитель, тема и тело…",
    analysingBtn: "Анализируется…",
    checkBtn: "Проверить на фишинг",
    verdictSafe: "Выглядит законно",
    verdictSuspicious: "Подозрительно — будьте осторожны",
    verdictDangerous: "Вероятно мошенничество / фишинг",
    impersonates: "Похоже, имитирует:",
    warningSigns: "Предупредительные знаки",
    dangerousLinks: "Найдены опасные ссылки",
    errorDefault: "Не удалось проанализировать это письмо. Попробуйте ещё раз.",
    errorNetwork: "Ошибка сети — попробуйте ещё раз.",
    footer: "Анализ с помощью ИИ только для ориентира — ссылки проверяются через Google Safe Browsing, но безопасность письма не гарантируется. При сомнении никогда не переходите по ссылкам и не передавайте личные данные.",
  },
  hi: {
    label: "संदिग्ध ईमेल पेस्ट करें",
    placeholder: "यहाँ ईमेल की पूरी सामग्री पेस्ट करें — प्रेषक, विषय और मुख्य भाग…",
    analysingBtn: "विश्लेषण हो रहा है…",
    checkBtn: "फ़िशिंग जाँचें",
    verdictSafe: "वैध लगता है",
    verdictSuspicious: "संदिग्ध — सावधान रहें",
    verdictDangerous: "संभावित घोटाला / फ़िशिंग",
    impersonates: "नकल करता प्रतीत होता है:",
    warningSigns: "चेतावनी के संकेत",
    dangerousLinks: "खतरनाक लिंक मिले",
    errorDefault: "उस ईमेल का विश्लेषण नहीं हो सका। कृपया पुनः प्रयास करें।",
    errorNetwork: "नेटवर्क त्रुटि — कृपया पुनः प्रयास करें।",
    footer: "केवल मार्गदर्शन के लिए AI-सहायता प्राप्त विश्लेषण — लिंक को Google Safe Browsing के विरुद्ध जाँचा जाता है लेकिन ईमेल की सुरक्षा की गारंटी नहीं दी जा सकती। संदेह होने पर कभी भी लिंक पर क्लिक न करें या व्यक्तिगत जानकारी साझा न करें।",
  },
  tr: {
    label: "Şüpheli e-postayı yapıştırın",
    placeholder: "E-postanın tüm içeriğini buraya yapıştırın — gönderici, konu ve gövde…",
    analysingBtn: "Analiz ediliyor…",
    checkBtn: "Kimlik avı kontrol et",
    verdictSafe: "Meşru görünüyor",
    verdictSuspicious: "Şüpheli — dikkatli olun",
    verdictDangerous: "Muhtemelen dolandırıcılık / kimlik avı",
    impersonates: "Şunun kimliğine bürünüyor gibi görünüyor:",
    warningSigns: "Uyarı işaretleri",
    dangerousLinks: "Tehlikeli bağlantılar bulundu",
    errorDefault: "O e-posta analiz edilemedi. Lütfen tekrar deneyin.",
    errorNetwork: "Ağ hatası — lütfen tekrar deneyin.",
    footer: "Yalnızca rehberlik için yapay zeka destekli analiz — bağlantılar Google Safe Browsing'e karşı çapraz kontrol edilir ancak bir e-postanın güvenli olduğu garanti edilemez. Şüphe duyduğunuzda asla bağlantılara tıklamayın veya kişisel bilgi paylaşmayın.",
  },
  id: {
    label: "Tempel email yang mencurigakan",
    placeholder: "Tempel seluruh konten email di sini — pengirim, subjek, dan isi…",
    analysingBtn: "Menganalisis…",
    checkBtn: "Periksa phishing",
    verdictSafe: "Terlihat sah",
    verdictSuspicious: "Mencurigakan — berhati-hatilah",
    verdictDangerous: "Kemungkinan penipuan / phishing",
    impersonates: "Tampaknya menyamar sebagai:",
    warningSigns: "Tanda peringatan",
    dangerousLinks: "Tautan berbahaya ditemukan",
    errorDefault: "Tidak dapat menganalisis email tersebut. Coba lagi.",
    errorNetwork: "Kesalahan jaringan — coba lagi.",
    footer: "Analisis berbantuan AI hanya sebagai panduan — tautan diperiksa silang terhadap Google Safe Browsing tetapi tidak dapat menjamin keamanan email. Jika ragu, jangan pernah mengklik tautan atau berbagi informasi pribadi.",
  },
  vi: {
    label: "Dán email đáng ngờ",
    placeholder: "Dán toàn bộ nội dung email vào đây — người gửi, chủ đề và nội dung…",
    analysingBtn: "Đang phân tích…",
    checkBtn: "Kiểm tra lừa đảo",
    verdictSafe: "Có vẻ hợp lệ",
    verdictSuspicious: "Đáng ngờ — hãy cẩn thận",
    verdictDangerous: "Có khả năng là lừa đảo / phishing",
    impersonates: "Có vẻ mạo danh:",
    warningSigns: "Dấu hiệu cảnh báo",
    dangerousLinks: "Tìm thấy liên kết nguy hiểm",
    errorDefault: "Không thể phân tích email đó. Vui lòng thử lại.",
    errorNetwork: "Lỗi mạng — vui lòng thử lại.",
    footer: "Phân tích hỗ trợ AI chỉ để hướng dẫn — liên kết được kiểm tra chéo với Google Safe Browsing nhưng không thể đảm bảo email an toàn. Khi nghi ngờ, đừng bao giờ nhấp vào liên kết hoặc chia sẻ thông tin cá nhân.",
  },
  sv: {
    label: "Klistra in det misstänkta e-postmeddelandet",
    placeholder: "Klistra in hela e-postinnehållet här — avsändare, ämne och text…",
    analysingBtn: "Analyserar…",
    checkBtn: "Kontrollera nätfiske",
    verdictSafe: "Ser legitimt ut",
    verdictSuspicious: "Misstänkt — var försiktig",
    verdictDangerous: "Troligtvis bedrägeri / nätfiske",
    impersonates: "Verkar utge sig för att vara:",
    warningSigns: "Varningssignaler",
    dangerousLinks: "Farliga länkar hittades",
    errorDefault: "Kunde inte analysera det e-postmeddelandet. Försök igen.",
    errorNetwork: "Nätverksfel — försök igen.",
    footer: "AI-stödd analys bara för vägledning — länkar kontrolleras mot Google Safe Browsing men kan inte garantera att ett e-postmeddelande är säkert. Klicka aldrig på länkar eller dela personlig information om du är osäker.",
  },
  pl: {
    label: "Wklej podejrzany e-mail",
    placeholder: "Wklej tutaj pełną treść e-maila — nadawca, temat i treść…",
    analysingBtn: "Analizowanie…",
    checkBtn: "Sprawdź phishing",
    verdictSafe: "Wygląda na legalne",
    verdictSuspicious: "Podejrzane — bądź ostrożny",
    verdictDangerous: "Prawdopodobnie oszustwo / phishing",
    impersonates: "Wydaje się podszywać pod:",
    warningSigns: "Sygnały ostrzegawcze",
    dangerousLinks: "Znaleziono niebezpieczne linki",
    errorDefault: "Nie można przeanalizować tego e-maila. Spróbuj ponownie.",
    errorNetwork: "Błąd sieci — spróbuj ponownie.",
    footer: "Analiza wspomagana AI tylko w celach informacyjnych — linki są sprawdzane w Google Safe Browsing, ale nie można zagwarantować, że e-mail jest bezpieczny. W razie wątpliwości nigdy nie klikaj linków ani nie podawaj danych osobowych.",
  },
  uk: {
    label: "Вставте підозрілий лист",
    placeholder: "Вставте сюди повний вміст листа — відправник, тема та тіло…",
    analysingBtn: "Аналізується…",
    checkBtn: "Перевірити на фішинг",
    verdictSafe: "Виглядає законно",
    verdictSuspicious: "Підозрілий — будьте обережні",
    verdictDangerous: "Ймовірно шахрайство / фішинг",
    impersonates: "Схоже, імітує:",
    warningSigns: "Попереджувальні знаки",
    dangerousLinks: "Знайдено небезпечні посилання",
    errorDefault: "Не вдалося проаналізувати цей лист. Спробуйте ще раз.",
    errorNetwork: "Помилка мережі — спробуйте ще раз.",
    footer: "Аналіз за допомогою ШІ лише для орієнтиру — посилання перевіряються через Google Safe Browsing, але безпека листа не гарантується. У разі сумніву ніколи не переходьте за посиланнями та не передавайте особисті дані.",
  },
  cs: {
    label: "Vložte podezřelý e-mail",
    placeholder: "Vložte sem celý obsah e-mailu — odesílatel, předmět a tělo…",
    analysingBtn: "Analyzuji…",
    checkBtn: "Zkontrolovat phishing",
    verdictSafe: "Vypadá legitimně",
    verdictSuspicious: "Podezřelé — buďte opatrní",
    verdictDangerous: "Pravděpodobně podvod / phishing",
    impersonates: "Zdá se, že se vydává za:",
    warningSigns: "Varovné signály",
    dangerousLinks: "Nalezeny nebezpečné odkazy",
    errorDefault: "Tento e-mail se nepodařilo analyzovat. Zkuste to znovu.",
    errorNetwork: "Chyba sítě — zkuste to znovu.",
    footer: "Analýza s podporou AI pouze pro orientaci — odkazy jsou křížově kontrolovány vůči Google Safe Browsing, ale bezpečnost e-mailu není zaručena. V případě pochybností nikdy neklikejte na odkazy ani nesdílejte osobní údaje.",
  },
};

type Verdict = "safe" | "suspicious" | "dangerous";
type Result = {
  score: number; verdict: Verdict; signals: string[];
  impersonates: string | null;
  badUrls: { url: string; threat: string }[];
  urlsChecked: number;
};

export function PhishingDetectorClient() {
  const s = T[useLocale()] ?? T.en;

  const TONE: Record<Verdict, { bg: string; text: string; ring: string; label: string }> = {
    safe: { bg: "bg-emerald-500", text: "text-emerald-700", ring: "ring-emerald-200", label: s.verdictSafe },
    suspicious: { bg: "bg-amber-500", text: "text-amber-700", ring: "ring-amber-200", label: s.verdictSuspicious },
    dangerous: { bg: "bg-red-500", text: "text-red-700", ring: "ring-red-200", label: s.verdictDangerous },
  };

  const [input, setInput] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);
  const meter = useCharLimit(input);

  async function run() {
    if (!input.trim() || loading || meter.over) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await callTool("phishing-detector", { action: "analyze_phishing", text: input.trim() });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "daily_limit" || data.error === "monthly_limit") {
          setQuotaReason({ kind: data.error === "monthly_limit" ? "monthly" : "daily", limit: data.limit ?? 0, used: data.used ?? 0, resetAt: data.resetAt ?? null });
          return;
        }
        setError(data.message ?? s.errorDefault);
        return;
      }
      setResult(data as Result);
    } catch {
      setError(s.errorNetwork);
    } finally {
      setLoading(false);
    }
  }

  const tone = result ? TONE[result.verdict] : null;
  const dangerous = result?.verdict === "dangerous";

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">{s.label}</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          placeholder={s.placeholder}
          className={cn("h-56 w-full resize-y rounded-lg border bg-white p-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2",
            meter.over ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-ink-200 focus:border-brand-400 focus:ring-brand-100")} />
        <CharMeter state={meter} />
      </div>

      <Button onClick={run} disabled={!input.trim() || loading || meter.over} size="lg">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
        {loading ? s.analysingBtn : s.checkBtn}
      </Button>

      {result && tone && (
        <div className={cn("rounded-xl border bg-white p-5 shadow-card ring-1", tone.ring)}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex items-center gap-2">
              {dangerous ? <ShieldAlert className="h-6 w-6 text-red-600" /> : <ShieldCheck className={cn("h-6 w-6", tone.text)} />}
              <div>
                <p className={cn("text-sm font-semibold", tone.text)}>{tone.label}</p>
                {result.impersonates && <p className="text-xs text-ink-500">{s.impersonates} <span className="font-medium">{result.impersonates}</span></p>}
              </div>
            </div>
            <span className={cn("text-4xl font-semibold tabular-nums", tone.text)}>{result.score}<span className="text-base font-normal text-ink-400">/100</span></span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-100">
            <div className={cn("h-full rounded-full transition-all duration-500", tone.bg)} style={{ width: `${result.score}%` }} />
          </div>

          {result.signals.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{s.warningSigns}</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-700">
                {result.signals.map((sig, i) => <li key={i}>{sig}</li>)}
              </ul>
            </div>
          )}

          {result.badUrls.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-red-600">{s.dangerousLinks}</p>
              <ul className="mt-1 space-y-1 text-sm">
                {result.badUrls.map((b, i) => (
                  <li key={i} className="break-all"><span className="rounded bg-red-50 px-1.5 py-0.5 font-mono text-[12px] text-red-700">{b.url}</span> <span className="text-xs text-red-600">({b.threat})</span></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <p className="text-xs text-ink-400">{s.footer}</p>
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}
