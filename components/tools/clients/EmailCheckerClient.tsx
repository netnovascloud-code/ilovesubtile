"use client";

import { useState } from "react";
import { ShieldCheck, AlertCircle, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    label: "Email address",
    checkingBtn: "Checking…",
    checkBtn: "Verify",
    verdictValid: "Valid & deliverable",
    verdictRisky: "Risky — may not receive mail",
    verdictDisposable: "Disposable / throwaway",
    verdictNoDomain: "Domain does not exist",
    verdictInvalid: "Invalid address",
    checkSyntax: "Valid syntax",
    checkDomain: "Domain resolves",
    checkMx: "Accepts mail (MX)",
    checkNotDisposable: "Not disposable",
    errorDefault: "Could not check that email. Please try again.",
    errorNetwork: "Network error — please try again.",
    footer: "Checks syntax, that the domain resolves, that it has mail (MX) records, and whether it's a disposable provider. A mailbox can still be inactive — this is an indicative reliability score, not a guarantee of delivery.",
  },
  fr: {
    label: "Adresse e-mail",
    checkingBtn: "Vérification…",
    checkBtn: "Vérifier",
    verdictValid: "Valide et livrable",
    verdictRisky: "Risqué — peut ne pas recevoir de courrier",
    verdictDisposable: "Jetable / temporaire",
    verdictNoDomain: "Le domaine n'existe pas",
    verdictInvalid: "Adresse invalide",
    checkSyntax: "Syntaxe valide",
    checkDomain: "Domaine résolu",
    checkMx: "Accepte le courrier (MX)",
    checkNotDisposable: "Non jetable",
    errorDefault: "Impossible de vérifier cet e-mail. Veuillez réessayer.",
    errorNetwork: "Erreur réseau — veuillez réessayer.",
    footer: "Vérifie la syntaxe, que le domaine se résout, qu'il a des enregistrements MX, et s'il s'agit d'un fournisseur jetable. Une boîte mail peut toujours être inactive — il s'agit d'un score indicatif, pas d'une garantie de livraison.",
  },
  es: {
    label: "Dirección de correo",
    checkingBtn: "Comprobando…",
    checkBtn: "Verificar",
    verdictValid: "Válido y entregable",
    verdictRisky: "Arriesgado — puede no recibir correo",
    verdictDisposable: "Desechable / temporal",
    verdictNoDomain: "El dominio no existe",
    verdictInvalid: "Dirección inválida",
    checkSyntax: "Sintaxis válida",
    checkDomain: "El dominio resuelve",
    checkMx: "Acepta correo (MX)",
    checkNotDisposable: "No desechable",
    errorDefault: "No se pudo comprobar ese correo. Por favor inténtalo de nuevo.",
    errorNetwork: "Error de red — inténtalo de nuevo.",
    footer: "Comprueba la sintaxis, que el dominio resuelve, que tiene registros MX, y si es un proveedor desechable. Un buzón puede estar inactivo — esta es una puntuación indicativa, no una garantía de entrega.",
  },
  pt: {
    label: "Endereço de e-mail",
    checkingBtn: "Verificando…",
    checkBtn: "Verificar",
    verdictValid: "Válido e entregável",
    verdictRisky: "Arriscado — pode não receber e-mail",
    verdictDisposable: "Descartável / temporário",
    verdictNoDomain: "O domínio não existe",
    verdictInvalid: "Endereço inválido",
    checkSyntax: "Sintaxe válida",
    checkDomain: "Domínio resolve",
    checkMx: "Aceita e-mail (MX)",
    checkNotDisposable: "Não descartável",
    errorDefault: "Não foi possível verificar esse e-mail. Tente novamente.",
    errorNetwork: "Erro de rede — tente novamente.",
    footer: "Verifica a sintaxe, se o domínio resolve, se tem registros MX e se é um provedor descartável. Uma caixa de correio ainda pode estar inativa — esta é uma pontuação indicativa, não uma garantia de entrega.",
  },
  de: {
    label: "E-Mail-Adresse",
    checkingBtn: "Wird geprüft…",
    checkBtn: "Überprüfen",
    verdictValid: "Gültig und zustellbar",
    verdictRisky: "Riskant — empfängt möglicherweise keine E-Mail",
    verdictDisposable: "Wegwerf-Adresse",
    verdictNoDomain: "Domain existiert nicht",
    verdictInvalid: "Ungültige Adresse",
    checkSyntax: "Gültige Syntax",
    checkDomain: "Domain auflösbar",
    checkMx: "Empfängt E-Mails (MX)",
    checkNotDisposable: "Kein Wegwerf-Anbieter",
    errorDefault: "Diese E-Mail konnte nicht geprüft werden. Bitte versuche es erneut.",
    errorNetwork: "Netzwerkfehler — bitte erneut versuchen.",
    footer: "Prüft Syntax, ob die Domain auflösbar ist, MX-Einträge vorhanden sind und ob es ein Wegwerf-Anbieter ist. Ein Postfach kann trotzdem inaktiv sein — dies ist ein indikativer Zuverlässigkeitswert, keine Zustellgarantie.",
  },
  it: {
    label: "Indirizzo e-mail",
    checkingBtn: "Verifica in corso…",
    checkBtn: "Verifica",
    verdictValid: "Valido e recapitabile",
    verdictRisky: "Rischioso — potrebbe non ricevere mail",
    verdictDisposable: "Usa e getta",
    verdictNoDomain: "Il dominio non esiste",
    verdictInvalid: "Indirizzo non valido",
    checkSyntax: "Sintassi valida",
    checkDomain: "Il dominio si risolve",
    checkMx: "Accetta mail (MX)",
    checkNotDisposable: "Non usa e getta",
    errorDefault: "Impossibile verificare quell'e-mail. Riprova.",
    errorNetwork: "Errore di rete — riprova.",
    footer: "Controlla la sintassi, se il dominio si risolve, se ha record MX e se è un provider usa e getta. Una casella può comunque essere inattiva — questo è un punteggio indicativo, non una garanzia di consegna.",
  },
  nl: {
    label: "E-mailadres",
    checkingBtn: "Controleren…",
    checkBtn: "Verifiëren",
    verdictValid: "Geldig en afleverbaar",
    verdictRisky: "Riskant — ontvangt mogelijk geen e-mail",
    verdictDisposable: "Wegwerp-adres",
    verdictNoDomain: "Domein bestaat niet",
    verdictInvalid: "Ongeldig adres",
    checkSyntax: "Geldige syntaxis",
    checkDomain: "Domein resolveert",
    checkMx: "Accepteert e-mail (MX)",
    checkNotDisposable: "Geen wegwerpservice",
    errorDefault: "Kon dat e-mailadres niet controleren. Probeer het opnieuw.",
    errorNetwork: "Netwerkfout — probeer het opnieuw.",
    footer: "Controleert de syntaxis, of het domein resolveert, of het MX-records heeft en of het een wegwerpservice is. Een mailbox kan nog steeds inactief zijn — dit is een indicatieve betrouwbaarheidsscore, geen bezorggarantie.",
  },
  ja: {
    label: "メールアドレス",
    checkingBtn: "確認中…",
    checkBtn: "確認",
    verdictValid: "有効かつ配信可能",
    verdictRisky: "リスクあり — メールが届かない可能性",
    verdictDisposable: "使い捨てアドレス",
    verdictNoDomain: "ドメインが存在しません",
    verdictInvalid: "無効なアドレス",
    checkSyntax: "構文有効",
    checkDomain: "ドメイン解決可能",
    checkMx: "メール受信可能 (MX)",
    checkNotDisposable: "使い捨てではない",
    errorDefault: "そのメールを確認できませんでした。もう一度お試しください。",
    errorNetwork: "ネットワークエラー — 再試行してください。",
    footer: "構文、ドメインの解決可否、MXレコードの有無、使い捨てプロバイダかどうかを確認します。メールボックスが非アクティブな場合もあります — これは信頼性の参考スコアであり、配信の保証ではありません。",
  },
  zh: {
    label: "电子邮件地址",
    checkingBtn: "检查中…",
    checkBtn: "验证",
    verdictValid: "有效且可投递",
    verdictRisky: "有风险 — 可能无法接收邮件",
    verdictDisposable: "一次性/临时地址",
    verdictNoDomain: "域名不存在",
    verdictInvalid: "无效地址",
    checkSyntax: "语法有效",
    checkDomain: "域名可解析",
    checkMx: "可接收邮件 (MX)",
    checkNotDisposable: "非一次性",
    errorDefault: "无法检查该邮箱。请重试。",
    errorNetwork: "网络错误 — 请重试。",
    footer: "检查语法、域名是否可解析、是否有MX记录以及是否为一次性提供商。邮箱仍可能处于非活动状态 — 这是一个参考可靠性分数，不保证投递成功。",
  },
  ko: {
    label: "이메일 주소",
    checkingBtn: "확인 중…",
    checkBtn: "확인",
    verdictValid: "유효하며 수신 가능",
    verdictRisky: "위험 — 메일을 받지 못할 수 있음",
    verdictDisposable: "일회용 주소",
    verdictNoDomain: "도메인이 존재하지 않음",
    verdictInvalid: "유효하지 않은 주소",
    checkSyntax: "구문 유효",
    checkDomain: "도메인 확인 가능",
    checkMx: "메일 수신 가능 (MX)",
    checkNotDisposable: "일회용 아님",
    errorDefault: "해당 이메일을 확인할 수 없습니다. 다시 시도하세요.",
    errorNetwork: "네트워크 오류 — 다시 시도하세요.",
    footer: "구문, 도메인 해석 가능 여부, MX 레코드 존재 여부, 일회용 공급자 여부를 확인합니다. 사서함이 비활성화되어 있을 수 있습니다 — 이것은 참고용 신뢰도 점수이며 배달을 보장하지 않습니다.",
  },
  ar: {
    label: "عنوان البريد الإلكتروني",
    checkingBtn: "جارٍ التحقق…",
    checkBtn: "تحقق",
    verdictValid: "صالح وقابل للتسليم",
    verdictRisky: "محفوف بالمخاطر — قد لا يستقبل بريداً",
    verdictDisposable: "مؤقت / للاستخدام مرة واحدة",
    verdictNoDomain: "النطاق غير موجود",
    verdictInvalid: "عنوان غير صالح",
    checkSyntax: "صياغة صحيحة",
    checkDomain: "النطاق قابل للحل",
    checkMx: "يقبل البريد (MX)",
    checkNotDisposable: "غير مؤقت",
    errorDefault: "تعذّر التحقق من هذا البريد. يرجى المحاولة مرة أخرى.",
    errorNetwork: "خطأ في الشبكة — يرجى المحاولة مرة أخرى.",
    footer: "يتحقق من الصياغة، وقابلية حل النطاق، وسجلات MX، وما إذا كان مزودًا مؤقتًا. قد تكون صندوق البريد غير نشطة — هذه نقطة موثوقية استرشادية، وليست ضمانًا للتسليم.",
  },
  ru: {
    label: "Адрес электронной почты",
    checkingBtn: "Проверка…",
    checkBtn: "Проверить",
    verdictValid: "Действителен и доставляем",
    verdictRisky: "Рискованный — может не получать почту",
    verdictDisposable: "Одноразовый адрес",
    verdictNoDomain: "Домен не существует",
    verdictInvalid: "Недействительный адрес",
    checkSyntax: "Корректный синтаксис",
    checkDomain: "Домен резолвится",
    checkMx: "Принимает почту (MX)",
    checkNotDisposable: "Не одноразовый",
    errorDefault: "Не удалось проверить этот адрес. Попробуйте ещё раз.",
    errorNetwork: "Ошибка сети — попробуйте ещё раз.",
    footer: "Проверяет синтаксис, резолвируемость домена, наличие MX-записей и является ли адрес одноразовым. Почтовый ящик может быть неактивен — это индикативная оценка надёжности, а не гарантия доставки.",
  },
  hi: {
    label: "ईमेल पता",
    checkingBtn: "जाँच हो रही है…",
    checkBtn: "सत्यापित करें",
    verdictValid: "वैध और वितरण योग्य",
    verdictRisky: "जोखिमपूर्ण — मेल प्राप्त नहीं हो सकता",
    verdictDisposable: "अस्थायी / एकबारगी पता",
    verdictNoDomain: "डोमेन मौजूद नहीं है",
    verdictInvalid: "अमान्य पता",
    checkSyntax: "वैध सिंटैक्स",
    checkDomain: "डोमेन हल होता है",
    checkMx: "मेल स्वीकार करता है (MX)",
    checkNotDisposable: "अस्थायी नहीं",
    errorDefault: "उस ईमेल की जाँच नहीं हो सकी। कृपया पुनः प्रयास करें।",
    errorNetwork: "नेटवर्क त्रुटि — कृपया पुनः प्रयास करें।",
    footer: "सिंटैक्स, डोमेन रिज़ॉल्यूशन, MX रिकॉर्ड और अस्थायी प्रदाता की जाँच करता है। मेलबॉक्स फिर भी निष्क्रिय हो सकता है — यह एक सांकेतिक विश्वसनीयता स्कोर है, डिलीवरी की गारंटी नहीं।",
  },
  tr: {
    label: "E-posta adresi",
    checkingBtn: "Kontrol ediliyor…",
    checkBtn: "Doğrula",
    verdictValid: "Geçerli ve teslim edilebilir",
    verdictRisky: "Riskli — posta almayabilir",
    verdictDisposable: "Tek kullanımlık adres",
    verdictNoDomain: "Alan adı mevcut değil",
    verdictInvalid: "Geçersiz adres",
    checkSyntax: "Geçerli sözdizimi",
    checkDomain: "Alan adı çözümleniyor",
    checkMx: "Posta kabul ediyor (MX)",
    checkNotDisposable: "Tek kullanımlık değil",
    errorDefault: "Bu e-posta kontrol edilemedi. Lütfen tekrar deneyin.",
    errorNetwork: "Ağ hatası — lütfen tekrar deneyin.",
    footer: "Sözdizimini, alan adı çözümlemesini, MX kayıtlarını ve tek kullanımlık sağlayıcı olup olmadığını kontrol eder. Bir posta kutusu yine de etkin olmayabilir — bu gösterge niteliğinde bir güvenilirlik puanıdır, teslim garantisi değildir.",
  },
  id: {
    label: "Alamat email",
    checkingBtn: "Memeriksa…",
    checkBtn: "Verifikasi",
    verdictValid: "Valid dan dapat dikirim",
    verdictRisky: "Berisiko — mungkin tidak menerima email",
    verdictDisposable: "Alamat sekali pakai",
    verdictNoDomain: "Domain tidak ada",
    verdictInvalid: "Alamat tidak valid",
    checkSyntax: "Sintaks valid",
    checkDomain: "Domain dapat diselesaikan",
    checkMx: "Menerima email (MX)",
    checkNotDisposable: "Bukan sekali pakai",
    errorDefault: "Tidak dapat memeriksa email tersebut. Coba lagi.",
    errorNetwork: "Kesalahan jaringan — coba lagi.",
    footer: "Memeriksa sintaks, apakah domain dapat diselesaikan, apakah memiliki catatan MX, dan apakah itu penyedia sekali pakai. Kotak surat mungkin masih tidak aktif — ini adalah skor keandalan indikatif, bukan jaminan pengiriman.",
  },
  vi: {
    label: "Địa chỉ email",
    checkingBtn: "Đang kiểm tra…",
    checkBtn: "Xác minh",
    verdictValid: "Hợp lệ và có thể gửi được",
    verdictRisky: "Rủi ro — có thể không nhận được thư",
    verdictDisposable: "Địa chỉ dùng một lần",
    verdictNoDomain: "Tên miền không tồn tại",
    verdictInvalid: "Địa chỉ không hợp lệ",
    checkSyntax: "Cú pháp hợp lệ",
    checkDomain: "Tên miền phân giải được",
    checkMx: "Chấp nhận thư (MX)",
    checkNotDisposable: "Không phải dùng một lần",
    errorDefault: "Không thể kiểm tra email đó. Vui lòng thử lại.",
    errorNetwork: "Lỗi mạng — vui lòng thử lại.",
    footer: "Kiểm tra cú pháp, tên miền có phân giải được không, có bản ghi MX không và có phải nhà cung cấp dùng một lần không. Hộp thư vẫn có thể không hoạt động — đây là điểm tin cậy tham khảo, không phải đảm bảo gửi thành công.",
  },
  sv: {
    label: "E-postadress",
    checkingBtn: "Kontrollerar…",
    checkBtn: "Verifiera",
    verdictValid: "Giltig och leveransbar",
    verdictRisky: "Riskabel — tar kanske inte emot post",
    verdictDisposable: "Engångsadress",
    verdictNoDomain: "Domänen finns inte",
    verdictInvalid: "Ogiltig adress",
    checkSyntax: "Giltig syntax",
    checkDomain: "Domänen resolvar",
    checkMx: "Tar emot e-post (MX)",
    checkNotDisposable: "Inte engångsadress",
    errorDefault: "Kunde inte kontrollera den e-postadressen. Försök igen.",
    errorNetwork: "Nätverksfel — försök igen.",
    footer: "Kontrollerar syntax, om domänen resolvar, om den har MX-poster och om det är en engångsleverantör. En brevlåda kan ändå vara inaktiv — detta är ett indikativt tillförlitlighetspoäng, inte en leveransgaranti.",
  },
  pl: {
    label: "Adres e-mail",
    checkingBtn: "Sprawdzanie…",
    checkBtn: "Weryfikuj",
    verdictValid: "Prawidłowy i dostarczalny",
    verdictRisky: "Ryzykowny — może nie odbierać poczty",
    verdictDisposable: "Jednorazowy adres",
    verdictNoDomain: "Domena nie istnieje",
    verdictInvalid: "Nieprawidłowy adres",
    checkSyntax: "Prawidłowa składnia",
    checkDomain: "Domena jest rozwiązywalna",
    checkMx: "Odbiera pocztę (MX)",
    checkNotDisposable: "Nie jednorazowy",
    errorDefault: "Nie można sprawdzić tego adresu e-mail. Spróbuj ponownie.",
    errorNetwork: "Błąd sieci — spróbuj ponownie.",
    footer: "Sprawdza składnię, rozwiązywalność domeny, rekordy MX i czy jest to jednorazowy dostawca. Skrzynka pocztowa może być nieaktywna — to jest indykatywny wynik niezawodności, a nie gwarancja dostarczenia.",
  },
  uk: {
    label: "Адреса електронної пошти",
    checkingBtn: "Перевірка…",
    checkBtn: "Перевірити",
    verdictValid: "Дійсна та доставляється",
    verdictRisky: "Ризикована — може не отримувати пошту",
    verdictDisposable: "Одноразова адреса",
    verdictNoDomain: "Домен не існує",
    verdictInvalid: "Недійсна адреса",
    checkSyntax: "Коректний синтаксис",
    checkDomain: "Домен резолвиться",
    checkMx: "Приймає пошту (MX)",
    checkNotDisposable: "Не одноразова",
    errorDefault: "Не вдалося перевірити цю адресу. Спробуйте ще раз.",
    errorNetwork: "Помилка мережі — спробуйте ще раз.",
    footer: "Перевіряє синтаксис, резолвованість домену, наявність MX-записів та чи є це одноразовим провайдером. Поштова скринька може бути неактивною — це індикативна оцінка надійності, а не гарантія доставки.",
  },
  cs: {
    label: "E-mailová adresa",
    checkingBtn: "Probíhá kontrola…",
    checkBtn: "Ověřit",
    verdictValid: "Platná a doručitelná",
    verdictRisky: "Riziková — nemusí přijímat poštu",
    verdictDisposable: "Jednorázová adresa",
    verdictNoDomain: "Doména neexistuje",
    verdictInvalid: "Neplatná adresa",
    checkSyntax: "Platná syntaxe",
    checkDomain: "Doména se rezolvuje",
    checkMx: "Přijímá poštu (MX)",
    checkNotDisposable: "Není jednorázová",
    errorDefault: "Tuto e-mailovou adresu se nepodařilo zkontrolovat. Zkuste to znovu.",
    errorNetwork: "Chyba sítě — zkuste to znovu.",
    footer: "Kontroluje syntaxi, rezolvovatelnost domény, záznamy MX a zda jde o jednorázového poskytovatele. Poštovní schránka může být stále neaktivní — jde o orientační skóre spolehlivosti, nikoli o záruku doručení.",
  },
};

type Verdict = "valid" | "risky" | "disposable" | "no_domain" | "invalid";
type Result = {
  email: string; verdict: Verdict; score: number;
  checks: { syntax: boolean; domain: boolean; mx: boolean; disposable: boolean };
  signals: string[];
};

export function EmailCheckerClient() {
  const s = T[useLocale()] ?? T.en;

  const TONE: Record<Verdict, { bg: string; text: string; ring: string; label: string }> = {
    valid: { bg: "bg-emerald-500", text: "text-emerald-700", ring: "ring-emerald-200", label: s.verdictValid },
    risky: { bg: "bg-amber-500", text: "text-amber-700", ring: "ring-amber-200", label: s.verdictRisky },
    disposable: { bg: "bg-orange-500", text: "text-orange-700", ring: "ring-orange-200", label: s.verdictDisposable },
    no_domain: { bg: "bg-red-500", text: "text-red-700", ring: "ring-red-200", label: s.verdictNoDomain },
    invalid: { bg: "bg-red-500", text: "text-red-700", ring: "ring-red-200", label: s.verdictInvalid },
  };

  const CHECK_LABELS: { key: keyof Result["checks"]; label: string; good: (v: boolean) => boolean }[] = [
    { key: "syntax", label: s.checkSyntax, good: (v) => v },
    { key: "domain", label: s.checkDomain, good: (v) => v },
    { key: "mx", label: s.checkMx, good: (v) => v },
    { key: "disposable", label: s.checkNotDisposable, good: (v) => !v },
  ];

  const [email, setEmail] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);

  async function run() {
    if (!email.trim() || loading) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await callTool("email-checker", { action: "validate_email", email: email.trim() });
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

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">{s.label}</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input value={email} onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="name@example.com" type="email"
              className="w-full rounded-lg border border-ink-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </div>
          <Button onClick={run} disabled={!email.trim() || loading} size="lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            {loading ? s.checkingBtn : s.checkBtn}
          </Button>
        </div>
      </div>

      {result && tone && (
        <div className={cn("rounded-xl border bg-white p-5 shadow-card ring-1", tone.ring)}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className={cn("text-sm font-semibold", tone.text)}>{tone.label}</p>
              <p className="text-xs text-ink-500 break-all">{result.email}</p>
            </div>
            <span className={cn("text-4xl font-semibold tabular-nums", tone.text)}>{result.score}<span className="text-base font-normal text-ink-400">/100</span></span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-100">
            <div className={cn("h-full rounded-full transition-all duration-500", tone.bg)} style={{ width: `${result.score}%` }} />
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {CHECK_LABELS.map((c) => {
              const ok = c.good(result.checks[c.key]);
              return (
                <li key={c.key} className={cn("flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium", ok ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700")}>
                  <span>{ok ? "✓" : "✗"}</span> {c.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <p className="text-xs text-ink-400">{s.footer}</p>
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}
