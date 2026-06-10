"use client";

import { useCallback, useState } from "react";
import { ShieldCheck, ShieldAlert, AlertCircle, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    label: "Website URL",
    checkingBtn: "Checking…",
    checkBtn: "Check SSL",
    certNotValid: "Certificate not valid",
    certExpiresSoon: "Valid — expires in {n} days",
    certValid: "Valid certificate",
    rowExpires: "Expires",
    rowIssuedBy: "Issued by",
    rowIssued: "Issued",
    rowKeyStrength: "Key strength",
    rowDomains: "Covered domains",
    errorDefault: "Could not read the SSL certificate for that site.",
    errorNetwork: "Network error — please try again.",
    footer: "We open a live TLS connection to read the certificate and return the result in real time — nothing is stored. A valid certificate means the connection is encrypted and the domain is CA-verified; it doesn't certify the site's content.",
  },
  fr: {
    label: "URL du site web",
    checkingBtn: "Vérification…",
    checkBtn: "Vérifier SSL",
    certNotValid: "Certificat non valide",
    certExpiresSoon: "Valide — expire dans {n} jours",
    certValid: "Certificat valide",
    rowExpires: "Expire",
    rowIssuedBy: "Émis par",
    rowIssued: "Émis le",
    rowKeyStrength: "Force de la clé",
    rowDomains: "Domaines couverts",
    errorDefault: "Impossible de lire le certificat SSL de ce site.",
    errorNetwork: "Erreur réseau — veuillez réessayer.",
    footer: "Nous ouvrons une connexion TLS en direct pour lire le certificat et retourner le résultat en temps réel — rien n'est stocké. Un certificat valide signifie que la connexion est chiffrée et que le domaine est vérifié par une AC ; cela ne certifie pas le contenu du site.",
  },
  es: {
    label: "URL del sitio web",
    checkingBtn: "Comprobando…",
    checkBtn: "Comprobar SSL",
    certNotValid: "Certificado no válido",
    certExpiresSoon: "Válido — caduca en {n} días",
    certValid: "Certificado válido",
    rowExpires: "Caduca",
    rowIssuedBy: "Emitido por",
    rowIssued: "Emitido",
    rowKeyStrength: "Fortaleza de clave",
    rowDomains: "Dominios cubiertos",
    errorDefault: "No se pudo leer el certificado SSL de ese sitio.",
    errorNetwork: "Error de red — inténtalo de nuevo.",
    footer: "Abrimos una conexión TLS en vivo para leer el certificado y devolver el resultado en tiempo real — nada se almacena. Un certificado válido significa que la conexión está cifrada y el dominio está verificado por una CA; no certifica el contenido del sitio.",
  },
  pt: {
    label: "URL do site",
    checkingBtn: "Verificando…",
    checkBtn: "Verificar SSL",
    certNotValid: "Certificado inválido",
    certExpiresSoon: "Válido — expira em {n} dias",
    certValid: "Certificado válido",
    rowExpires: "Expira",
    rowIssuedBy: "Emitido por",
    rowIssued: "Emitido",
    rowKeyStrength: "Força da chave",
    rowDomains: "Domínios cobertos",
    errorDefault: "Não foi possível ler o certificado SSL desse site.",
    errorNetwork: "Erro de rede — tente novamente.",
    footer: "Abrimos uma conexão TLS ao vivo para ler o certificado e retornar o resultado em tempo real — nada é armazenado. Um certificado válido significa que a conexão está criptografada e o domínio é verificado por uma CA; não certifica o conteúdo do site.",
  },
  de: {
    label: "Website-URL",
    checkingBtn: "Wird geprüft…",
    checkBtn: "SSL prüfen",
    certNotValid: "Zertifikat ungültig",
    certExpiresSoon: "Gültig — läuft in {n} Tagen ab",
    certValid: "Gültiges Zertifikat",
    rowExpires: "Läuft ab",
    rowIssuedBy: "Ausgestellt von",
    rowIssued: "Ausgestellt",
    rowKeyStrength: "Schlüsselstärke",
    rowDomains: "Abgedeckte Domains",
    errorDefault: "SSL-Zertifikat für diese Website konnte nicht gelesen werden.",
    errorNetwork: "Netzwerkfehler — bitte erneut versuchen.",
    footer: "Wir öffnen eine Live-TLS-Verbindung, um das Zertifikat zu lesen und das Ergebnis in Echtzeit zurückzugeben — es wird nichts gespeichert. Ein gültiges Zertifikat bedeutet, dass die Verbindung verschlüsselt und die Domain CA-verifiziert ist; es zertifiziert nicht den Inhalt der Website.",
  },
  it: {
    label: "URL del sito web",
    checkingBtn: "Verifica in corso…",
    checkBtn: "Controlla SSL",
    certNotValid: "Certificato non valido",
    certExpiresSoon: "Valido — scade tra {n} giorni",
    certValid: "Certificato valido",
    rowExpires: "Scade",
    rowIssuedBy: "Emesso da",
    rowIssued: "Emesso il",
    rowKeyStrength: "Forza chiave",
    rowDomains: "Domini coperti",
    errorDefault: "Impossibile leggere il certificato SSL per questo sito.",
    errorNetwork: "Errore di rete — riprova.",
    footer: "Apriamo una connessione TLS dal vivo per leggere il certificato e restituire il risultato in tempo reale — nulla viene memorizzato. Un certificato valido significa che la connessione è crittografata e il dominio è verificato da una CA; non certifica il contenuto del sito.",
  },
  nl: {
    label: "Website-URL",
    checkingBtn: "Controleren…",
    checkBtn: "SSL controleren",
    certNotValid: "Certificaat ongeldig",
    certExpiresSoon: "Geldig — verloopt over {n} dagen",
    certValid: "Geldig certificaat",
    rowExpires: "Verloopt",
    rowIssuedBy: "Uitgegeven door",
    rowIssued: "Uitgegeven",
    rowKeyStrength: "Sleutelsterkte",
    rowDomains: "Gedekte domeinen",
    errorDefault: "Kon het SSL-certificaat voor die site niet lezen.",
    errorNetwork: "Netwerkfout — probeer het opnieuw.",
    footer: "We openen een live TLS-verbinding om het certificaat te lezen en het resultaat in realtime te retourneren — er wordt niets opgeslagen. Een geldig certificaat betekent dat de verbinding versleuteld is en het domein CA-geverifieerd is; het certificeert niet de inhoud van de site.",
  },
  ja: {
    label: "ウェブサイトURL",
    checkingBtn: "確認中…",
    checkBtn: "SSL確認",
    certNotValid: "証明書が無効です",
    certExpiresSoon: "有効 — {n}日後に期限切れ",
    certValid: "有効な証明書",
    rowExpires: "有効期限",
    rowIssuedBy: "発行者",
    rowIssued: "発行日",
    rowKeyStrength: "鍵の強度",
    rowDomains: "対象ドメイン",
    errorDefault: "そのサイトのSSL証明書を読み取れませんでした。",
    errorNetwork: "ネットワークエラー — 再試行してください。",
    footer: "ライブTLS接続を開いて証明書を読み取り、結果をリアルタイムで返します — 何も保存されません。有効な証明書とは、接続が暗号化されドメインがCA検証済みであることを意味します。サイトのコンテンツを保証するものではありません。",
  },
  zh: {
    label: "网站URL",
    checkingBtn: "检查中…",
    checkBtn: "检查SSL",
    certNotValid: "证书无效",
    certExpiresSoon: "有效 — {n}天后到期",
    certValid: "有效证书",
    rowExpires: "到期时间",
    rowIssuedBy: "颁发者",
    rowIssued: "颁发日期",
    rowKeyStrength: "密钥强度",
    rowDomains: "涵盖域名",
    errorDefault: "无法读取该网站的SSL证书。",
    errorNetwork: "网络错误 — 请重试。",
    footer: "我们打开实时TLS连接读取证书并实时返回结果 — 不存储任何内容。有效证书意味着连接已加密且域名经CA验证；这不能证明网站内容的可信度。",
  },
  ko: {
    label: "웹사이트 URL",
    checkingBtn: "확인 중…",
    checkBtn: "SSL 확인",
    certNotValid: "인증서가 유효하지 않습니다",
    certExpiresSoon: "유효 — {n}일 후 만료",
    certValid: "유효한 인증서",
    rowExpires: "만료",
    rowIssuedBy: "발급자",
    rowIssued: "발급일",
    rowKeyStrength: "키 강도",
    rowDomains: "적용 도메인",
    errorDefault: "해당 사이트의 SSL 인증서를 읽을 수 없습니다.",
    errorNetwork: "네트워크 오류 — 다시 시도하세요.",
    footer: "실시간 TLS 연결을 열어 인증서를 읽고 결과를 실시간으로 반환합니다 — 아무것도 저장되지 않습니다. 유효한 인증서는 연결이 암호화되고 도메인이 CA 검증되었음을 의미합니다. 사이트 콘텐츠를 보증하지는 않습니다.",
  },
  ar: {
    label: "عنوان URL للموقع",
    checkingBtn: "جارٍ التحقق…",
    checkBtn: "فحص SSL",
    certNotValid: "الشهادة غير صالحة",
    certExpiresSoon: "صالحة — تنتهي خلال {n} يوم",
    certValid: "شهادة صالحة",
    rowExpires: "تنتهي",
    rowIssuedBy: "صادرة عن",
    rowIssued: "تاريخ الإصدار",
    rowKeyStrength: "قوة المفتاح",
    rowDomains: "النطاقات المشمولة",
    errorDefault: "تعذّر قراءة شهادة SSL لهذا الموقع.",
    errorNetwork: "خطأ في الشبكة — يرجى المحاولة مرة أخرى.",
    footer: "نفتح اتصال TLS مباشراً لقراءة الشهادة وإعادة النتيجة في الوقت الفعلي — لا يُخزَّن شيء. تعني الشهادة الصالحة أن الاتصال مشفّر وأن النطاق موثّق من قِبل جهة CA؛ ولا تضمن محتوى الموقع.",
  },
  ru: {
    label: "URL сайта",
    checkingBtn: "Проверка…",
    checkBtn: "Проверить SSL",
    certNotValid: "Сертификат недействителен",
    certExpiresSoon: "Действителен — истекает через {n} дней",
    certValid: "Действительный сертификат",
    rowExpires: "Истекает",
    rowIssuedBy: "Выдан",
    rowIssued: "Дата выдачи",
    rowKeyStrength: "Длина ключа",
    rowDomains: "Охватываемые домены",
    errorDefault: "Не удалось прочитать SSL-сертификат этого сайта.",
    errorNetwork: "Ошибка сети — попробуйте ещё раз.",
    footer: "Мы открываем живое TLS-соединение для чтения сертификата и возвращаем результат в реальном времени — ничего не сохраняется. Действительный сертификат означает, что соединение зашифровано и домен верифицирован CA; это не удостоверяет содержимое сайта.",
  },
  hi: {
    label: "वेबसाइट URL",
    checkingBtn: "जाँच हो रही है…",
    checkBtn: "SSL जाँचें",
    certNotValid: "प्रमाणपत्र अमान्य है",
    certExpiresSoon: "वैध — {n} दिनों में समाप्त",
    certValid: "वैध प्रमाणपत्र",
    rowExpires: "समाप्ति",
    rowIssuedBy: "जारीकर्ता",
    rowIssued: "जारी तिथि",
    rowKeyStrength: "कुंजी शक्ति",
    rowDomains: "कवर किए गए डोमेन",
    errorDefault: "उस साइट का SSL प्रमाणपत्र पढ़ा नहीं जा सका।",
    errorNetwork: "नेटवर्क त्रुटि — कृपया पुनः प्रयास करें।",
    footer: "हम प्रमाणपत्र पढ़ने और परिणाम वास्तविक समय में वापस करने के लिए एक लाइव TLS कनेक्शन खोलते हैं — कुछ भी संग्रहीत नहीं होता। एक वैध प्रमाणपत्र का अर्थ है कि कनेक्शन एन्क्रिप्टेड है और डोमेन CA-सत्यापित है; यह साइट की सामग्री को प्रमाणित नहीं करता।",
  },
  tr: {
    label: "Web sitesi URL'si",
    checkingBtn: "Kontrol ediliyor…",
    checkBtn: "SSL Kontrol Et",
    certNotValid: "Sertifika geçersiz",
    certExpiresSoon: "Geçerli — {n} gün içinde sona eriyor",
    certValid: "Geçerli sertifika",
    rowExpires: "Sona eriyor",
    rowIssuedBy: "Veren kuruluş",
    rowIssued: "Verilme tarihi",
    rowKeyStrength: "Anahtar gücü",
    rowDomains: "Kapsanan alan adları",
    errorDefault: "O sitenin SSL sertifikası okunamadı.",
    errorNetwork: "Ağ hatası — lütfen tekrar deneyin.",
    footer: "Sertifikayı okumak ve sonucu gerçek zamanlı olarak döndürmek için canlı bir TLS bağlantısı açıyoruz — hiçbir şey depolanmıyor. Geçerli bir sertifika, bağlantının şifrelendiği ve alan adının CA tarafından doğrulandığı anlamına gelir; sitenin içeriğini onaylamaz.",
  },
  id: {
    label: "URL Situs Web",
    checkingBtn: "Memeriksa…",
    checkBtn: "Periksa SSL",
    certNotValid: "Sertifikat tidak valid",
    certExpiresSoon: "Valid — berakhir dalam {n} hari",
    certValid: "Sertifikat valid",
    rowExpires: "Berakhir",
    rowIssuedBy: "Diterbitkan oleh",
    rowIssued: "Diterbitkan",
    rowKeyStrength: "Kekuatan kunci",
    rowDomains: "Domain yang dicakup",
    errorDefault: "Tidak dapat membaca sertifikat SSL untuk situs tersebut.",
    errorNetwork: "Kesalahan jaringan — coba lagi.",
    footer: "Kami membuka koneksi TLS langsung untuk membaca sertifikat dan mengembalikan hasilnya secara real time — tidak ada yang disimpan. Sertifikat yang valid berarti koneksi dienkripsi dan domain diverifikasi CA; ini tidak membuktikan konten situs.",
  },
  vi: {
    label: "URL trang web",
    checkingBtn: "Đang kiểm tra…",
    checkBtn: "Kiểm tra SSL",
    certNotValid: "Chứng chỉ không hợp lệ",
    certExpiresSoon: "Hợp lệ — hết hạn sau {n} ngày",
    certValid: "Chứng chỉ hợp lệ",
    rowExpires: "Hết hạn",
    rowIssuedBy: "Cấp bởi",
    rowIssued: "Ngày cấp",
    rowKeyStrength: "Độ mạnh khóa",
    rowDomains: "Tên miền được bảo vệ",
    errorDefault: "Không thể đọc chứng chỉ SSL cho trang đó.",
    errorNetwork: "Lỗi mạng — vui lòng thử lại.",
    footer: "Chúng tôi mở kết nối TLS trực tiếp để đọc chứng chỉ và trả về kết quả theo thời gian thực — không có gì được lưu trữ. Chứng chỉ hợp lệ có nghĩa là kết nối được mã hóa và tên miền được CA xác minh; nó không chứng nhận nội dung trang web.",
  },
  sv: {
    label: "Webbplats-URL",
    checkingBtn: "Kontrollerar…",
    checkBtn: "Kontrollera SSL",
    certNotValid: "Certifikatet är ogiltigt",
    certExpiresSoon: "Giltigt — löper ut om {n} dagar",
    certValid: "Giltigt certifikat",
    rowExpires: "Löper ut",
    rowIssuedBy: "Utfärdat av",
    rowIssued: "Utfärdat",
    rowKeyStrength: "Nyckelstyrka",
    rowDomains: "Täckta domäner",
    errorDefault: "Kunde inte läsa SSL-certifikatet för den webbplatsen.",
    errorNetwork: "Nätverksfel — försök igen.",
    footer: "Vi öppnar en live TLS-anslutning för att läsa certifikatet och returnera resultatet i realtid — ingenting lagras. Ett giltigt certifikat innebär att anslutningen är krypterad och domänen är CA-verifierad; det intygar inte webbplatsens innehåll.",
  },
  pl: {
    label: "URL strony internetowej",
    checkingBtn: "Sprawdzanie…",
    checkBtn: "Sprawdź SSL",
    certNotValid: "Certyfikat nieważny",
    certExpiresSoon: "Ważny — wygasa za {n} dni",
    certValid: "Ważny certyfikat",
    rowExpires: "Wygasa",
    rowIssuedBy: "Wystawiony przez",
    rowIssued: "Wystawiony",
    rowKeyStrength: "Siła klucza",
    rowDomains: "Objęte domeny",
    errorDefault: "Nie można odczytać certyfikatu SSL dla tej witryny.",
    errorNetwork: "Błąd sieci — spróbuj ponownie.",
    footer: "Otwieramy połączenie TLS na żywo, aby odczytać certyfikat i zwrócić wynik w czasie rzeczywistym — nic nie jest przechowywane. Ważny certyfikat oznacza, że połączenie jest szyfrowane, a domena zweryfikowana przez CA; nie certyfikuje treści witryny.",
  },
  uk: {
    label: "URL сайту",
    checkingBtn: "Перевірка…",
    checkBtn: "Перевірити SSL",
    certNotValid: "Сертифікат недійсний",
    certExpiresSoon: "Дійсний — закінчується через {n} днів",
    certValid: "Дійсний сертифікат",
    rowExpires: "Закінчується",
    rowIssuedBy: "Видано",
    rowIssued: "Дата видачі",
    rowKeyStrength: "Довжина ключа",
    rowDomains: "Охоплені домени",
    errorDefault: "Не вдалося прочитати SSL-сертифікат цього сайту.",
    errorNetwork: "Помилка мережі — спробуйте ще раз.",
    footer: "Ми відкриваємо живе TLS-з'єднання для читання сертифіката та повернення результату в реальному часі — нічого не зберігається. Дійсний сертифікат означає, що з'єднання зашифроване та домен верифіковано CA; це не посвідчує вміст сайту.",
  },
  cs: {
    label: "URL webu",
    checkingBtn: "Probíhá kontrola…",
    checkBtn: "Zkontrolovat SSL",
    certNotValid: "Certifikát není platný",
    certExpiresSoon: "Platný — vyprší za {n} dní",
    certValid: "Platný certifikát",
    rowExpires: "Vyprší",
    rowIssuedBy: "Vydal",
    rowIssued: "Vydáno",
    rowKeyStrength: "Síla klíče",
    rowDomains: "Pokryté domény",
    errorDefault: "Nelze přečíst SSL certifikát pro tento web.",
    errorNetwork: "Chyba sítě — zkuste to znovu.",
    footer: "Otevíráme živé TLS připojení, abychom přečetli certifikát a vrátili výsledek v reálném čase — nic se neukládá. Platný certifikát znamená, že připojení je šifrované a doména je ověřená CA; necertifikuje obsah webu.",
  },
};

type Result = {
  host: string;
  valid: boolean;
  notBefore: string;
  notAfter: string;
  daysRemaining: number;
  issuer: string;
  subject: string;
  domains: string[];
  keyStrength: string;
};

export function SslCheckerClient() {
  const s = T[useLocale()] ?? T.en;
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);

  const run = useCallback(async () => {
    if (!url.trim() || loading) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await callTool("ssl-checker", { action: "ssl_check", url: url.trim() });
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
  }, [url, loading, s]);

  const expiringSoon = result && result.daysRemaining >= 0 && result.daysRemaining <= 30;
  const ok = result?.valid && !expiringSoon;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">{s.label}</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input value={url} onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="example.com"
              className="w-full rounded-lg border border-ink-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </div>
          <Button onClick={run} disabled={!url.trim() || loading} size="lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            {loading ? s.checkingBtn : s.checkBtn}
          </Button>
        </div>
      </div>

      {result && (
        <div className={cn("rounded-xl border p-5 shadow-card ring-1", result.valid ? (expiringSoon ? "border-amber-200 bg-amber-50/40 ring-amber-200" : "border-emerald-200 bg-emerald-50/40 ring-emerald-200") : "border-red-200 bg-red-50/40 ring-red-200")}>
          <div className="flex items-center gap-3">
            {ok ? <ShieldCheck className="h-8 w-8 text-emerald-600" /> : <ShieldAlert className={cn("h-8 w-8", result.valid ? "text-amber-600" : "text-red-600")} />}
            <div>
              <p className={cn("text-base font-semibold", result.valid ? (expiringSoon ? "text-amber-700" : "text-emerald-700") : "text-red-700")}>
                {!result.valid ? s.certNotValid : expiringSoon ? s.certExpiresSoon.replace("{n}", String(result.daysRemaining)) : s.certValid}
              </p>
              <p className="text-xs text-ink-500 break-all">{result.host}</p>
            </div>
          </div>
          <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <Row label={s.rowExpires} value={`${result.notAfter.slice(0, 10)} (${result.daysRemaining} days)`} />
            <Row label={s.rowIssuedBy} value={result.issuer} />
            <Row label={s.rowIssued} value={result.notBefore.slice(0, 10)} />
            <Row label={s.rowKeyStrength} value={result.keyStrength} />
            <Row label={s.rowDomains} value={result.domains.slice(0, 6).join(", ") + (result.domains.length > 6 ? `, +${result.domains.length - 6}` : "")} full />
          </dl>
        </div>
      )}

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <p className="text-xs text-ink-400">{s.footer}</p>
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}

function Row({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={cn("rounded-md border border-ink-100 bg-white px-3 py-2", full && "sm:col-span-2")}>
      <dt className="text-xs uppercase tracking-wide text-ink-400">{label}</dt>
      <dd className="mt-0.5 break-words font-medium text-ink-900">{value || "—"}</dd>
    </div>
  );
}
