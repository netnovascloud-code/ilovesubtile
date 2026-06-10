"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, AlertCircle, Loader2, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    label: "URL to check",
    scanningBtn: "Scanning…",
    scanBtn: "Scan URL",
    dangerous: "Dangerous link",
    safe: "No threats found",
    checkedAgainst: "Checked against {source}.",
    errorDefault: "Could not scan that URL. Please try again.",
    errorNetwork: "Network error — please try again.",
    footer: "Indicative result from Google Safe Browsing (a database of known unsafe sites). A \"no threats found\" result does not guarantee a site is safe — new phishing pages can appear before they're catalogued.",
  },
  fr: {
    label: "URL à vérifier",
    scanningBtn: "Analyse en cours…",
    scanBtn: "Scanner l'URL",
    dangerous: "Lien dangereux",
    safe: "Aucune menace trouvée",
    checkedAgainst: "Vérifié via {source}.",
    errorDefault: "Impossible de scanner cette URL. Veuillez réessayer.",
    errorNetwork: "Erreur réseau — veuillez réessayer.",
    footer: "Résultat indicatif de Google Safe Browsing (une base de données de sites dangereux connus). Un résultat « aucune menace » ne garantit pas qu'un site est sûr — de nouvelles pages de hameçonnage peuvent apparaître avant d'être répertoriées.",
  },
  es: {
    label: "URL a comprobar",
    scanningBtn: "Escaneando…",
    scanBtn: "Escanear URL",
    dangerous: "Enlace peligroso",
    safe: "No se encontraron amenazas",
    checkedAgainst: "Comprobado en {source}.",
    errorDefault: "No se pudo escanear esa URL. Por favor inténtalo de nuevo.",
    errorNetwork: "Error de red — inténtalo de nuevo.",
    footer: "Resultado indicativo de Google Safe Browsing (base de datos de sitios peligrosos conocidos). Un resultado «no se encontraron amenazas» no garantiza que un sitio sea seguro — las nuevas páginas de phishing pueden aparecer antes de ser catalogadas.",
  },
  pt: {
    label: "URL a verificar",
    scanningBtn: "Escaneando…",
    scanBtn: "Escanear URL",
    dangerous: "Link perigoso",
    safe: "Nenhuma ameaça encontrada",
    checkedAgainst: "Verificado em {source}.",
    errorDefault: "Não foi possível escanear essa URL. Tente novamente.",
    errorNetwork: "Erro de rede — tente novamente.",
    footer: "Resultado indicativo do Google Safe Browsing (banco de dados de sites inseguros conhecidos). Um resultado «nenhuma ameaça encontrada» não garante que um site seja seguro — novas páginas de phishing podem aparecer antes de serem catalogadas.",
  },
  de: {
    label: "URL prüfen",
    scanningBtn: "Wird gescannt…",
    scanBtn: "URL scannen",
    dangerous: "Gefährlicher Link",
    safe: "Keine Bedrohungen gefunden",
    checkedAgainst: "Geprüft über {source}.",
    errorDefault: "Diese URL konnte nicht gescannt werden. Bitte erneut versuchen.",
    errorNetwork: "Netzwerkfehler — bitte erneut versuchen.",
    footer: "Indikativer Befund von Google Safe Browsing (Datenbank bekannter unsicherer Seiten). Kein Bedrohungsbefund garantiert nicht die Sicherheit einer Website — neue Phishing-Seiten können erscheinen, bevor sie erfasst werden.",
  },
  it: {
    label: "URL da controllare",
    scanningBtn: "Scansione in corso…",
    scanBtn: "Scansiona URL",
    dangerous: "Link pericoloso",
    safe: "Nessuna minaccia trovata",
    checkedAgainst: "Verificato tramite {source}.",
    errorDefault: "Impossibile scansionare quell'URL. Riprova.",
    errorNetwork: "Errore di rete — riprova.",
    footer: "Risultato indicativo da Google Safe Browsing (database di siti noti come non sicuri). Un risultato «nessuna minaccia» non garantisce che un sito sia sicuro — nuove pagine di phishing possono apparire prima di essere catalogate.",
  },
  nl: {
    label: "Te controleren URL",
    scanningBtn: "Scannen…",
    scanBtn: "URL scannen",
    dangerous: "Gevaarlijke link",
    safe: "Geen bedreigingen gevonden",
    checkedAgainst: "Gecontroleerd via {source}.",
    errorDefault: "Kon die URL niet scannen. Probeer het opnieuw.",
    errorNetwork: "Netwerkfout — probeer het opnieuw.",
    footer: "Indicatief resultaat van Google Safe Browsing (een database van bekende onveilige sites). Een resultaat «geen bedreigingen gevonden» garandeert niet dat een site veilig is — nieuwe phishingpagina's kunnen verschijnen voordat ze zijn gecatalogiseerd.",
  },
  ja: {
    label: "確認するURL",
    scanningBtn: "スキャン中…",
    scanBtn: "URLをスキャン",
    dangerous: "危険なリンク",
    safe: "脅威は見つかりませんでした",
    checkedAgainst: "{source}で確認済み。",
    errorDefault: "そのURLをスキャンできませんでした。もう一度お試しください。",
    errorNetwork: "ネットワークエラー — 再試行してください。",
    footer: "Google Safe Browsing（既知の危険なサイトのデータベース）による参考結果です。「脅威なし」の結果はサイトが安全であることを保証しません — 新しいフィッシングページは登録される前に現れることがあります。",
  },
  zh: {
    label: "要检查的URL",
    scanningBtn: "扫描中…",
    scanBtn: "扫描URL",
    dangerous: "危险链接",
    safe: "未发现威胁",
    checkedAgainst: "已通过 {source} 检查。",
    errorDefault: "无法扫描该URL。请重试。",
    errorNetwork: "网络错误 — 请重试。",
    footer: "来自Google Safe Browsing（已知不安全网站数据库）的参考结果。未发现威胁的结果不保证网站安全 — 新的钓鱼页面可能在被收录前就已出现。",
  },
  ko: {
    label: "확인할 URL",
    scanningBtn: "스캔 중…",
    scanBtn: "URL 스캔",
    dangerous: "위험한 링크",
    safe: "위협이 발견되지 않았습니다",
    checkedAgainst: "{source}에서 확인됨.",
    errorDefault: "해당 URL을 스캔할 수 없습니다. 다시 시도하세요.",
    errorNetwork: "네트워크 오류 — 다시 시도하세요.",
    footer: "Google Safe Browsing(알려진 안전하지 않은 사이트 데이터베이스)의 참고 결과입니다. \"위협 없음\" 결과가 사이트의 안전을 보장하지는 않습니다 — 새 피싱 페이지는 목록에 등록되기 전에 나타날 수 있습니다.",
  },
  ar: {
    label: "عنوان URL للفحص",
    scanningBtn: "جارٍ الفحص…",
    scanBtn: "فحص URL",
    dangerous: "رابط خطير",
    safe: "لم يُعثر على تهديدات",
    checkedAgainst: "تم الفحص عبر {source}.",
    errorDefault: "تعذّر فحص هذا الرابط. يرجى المحاولة مرة أخرى.",
    errorNetwork: "خطأ في الشبكة — يرجى المحاولة مرة أخرى.",
    footer: "نتيجة استرشادية من Google Safe Browsing (قاعدة بيانات المواقع الخطرة المعروفة). نتيجة «لم يُعثر على تهديدات» لا تضمن سلامة الموقع — قد تظهر صفحات تصيّد جديدة قبل تسجيلها.",
  },
  ru: {
    label: "URL для проверки",
    scanningBtn: "Сканируется…",
    scanBtn: "Сканировать URL",
    dangerous: "Опасная ссылка",
    safe: "Угрозы не найдены",
    checkedAgainst: "Проверено через {source}.",
    errorDefault: "Не удалось просканировать этот URL. Попробуйте ещё раз.",
    errorNetwork: "Ошибка сети — попробуйте ещё раз.",
    footer: "Индикативный результат от Google Safe Browsing (база известных небезопасных сайтов). Результат «угрозы не найдены» не гарантирует безопасность сайта — новые фишинговые страницы могут появиться до занесения в базу.",
  },
  hi: {
    label: "जाँचने के लिए URL",
    scanningBtn: "स्कैन हो रहा है…",
    scanBtn: "URL स्कैन करें",
    dangerous: "खतरनाक लिंक",
    safe: "कोई खतरा नहीं मिला",
    checkedAgainst: "{source} के विरुद्ध जाँचा गया।",
    errorDefault: "उस URL को स्कैन नहीं किया जा सका। कृपया पुनः प्रयास करें।",
    errorNetwork: "नेटवर्क त्रुटि — कृपया पुनः प्रयास करें।",
    footer: "Google Safe Browsing (ज्ञात असुरक्षित साइटों का डेटाबेस) से सांकेतिक परिणाम। \"कोई खतरा नहीं\" परिणाम यह गारंटी नहीं देता कि साइट सुरक्षित है — नए फ़िशिंग पेज सूचीबद्ध होने से पहले प्रकट हो सकते हैं।",
  },
  tr: {
    label: "Kontrol edilecek URL",
    scanningBtn: "Taranıyor…",
    scanBtn: "URL Tara",
    dangerous: "Tehlikeli bağlantı",
    safe: "Tehdit bulunamadı",
    checkedAgainst: "{source} üzerinden kontrol edildi.",
    errorDefault: "O URL taranamadı. Lütfen tekrar deneyin.",
    errorNetwork: "Ağ hatası — lütfen tekrar deneyin.",
    footer: "Google Safe Browsing'den (bilinen güvensiz sitelerin veritabanı) gösterge niteliğinde sonuç. \"Tehdit bulunamadı\" sonucu bir sitenin güvenli olduğunu garanti etmez — yeni kimlik avı sayfaları kataloğa eklenmeden önce görünebilir.",
  },
  id: {
    label: "URL yang akan diperiksa",
    scanningBtn: "Memindai…",
    scanBtn: "Pindai URL",
    dangerous: "Tautan berbahaya",
    safe: "Tidak ada ancaman ditemukan",
    checkedAgainst: "Diperiksa terhadap {source}.",
    errorDefault: "Tidak dapat memindai URL tersebut. Coba lagi.",
    errorNetwork: "Kesalahan jaringan — coba lagi.",
    footer: "Hasil indikatif dari Google Safe Browsing (database situs tidak aman yang diketahui). Hasil \"tidak ada ancaman\" tidak menjamin keamanan situs — halaman phishing baru dapat muncul sebelum dikatalogkan.",
  },
  vi: {
    label: "URL cần kiểm tra",
    scanningBtn: "Đang quét…",
    scanBtn: "Quét URL",
    dangerous: "Liên kết nguy hiểm",
    safe: "Không tìm thấy mối đe dọa",
    checkedAgainst: "Đã kiểm tra qua {source}.",
    errorDefault: "Không thể quét URL đó. Vui lòng thử lại.",
    errorNetwork: "Lỗi mạng — vui lòng thử lại.",
    footer: "Kết quả tham khảo từ Google Safe Browsing (cơ sở dữ liệu các trang không an toàn đã biết). Kết quả \"không tìm thấy mối đe dọa\" không đảm bảo trang web an toàn — các trang phishing mới có thể xuất hiện trước khi được ghi nhận.",
  },
  sv: {
    label: "URL att kontrollera",
    scanningBtn: "Skannar…",
    scanBtn: "Skanna URL",
    dangerous: "Farlig länk",
    safe: "Inga hot hittades",
    checkedAgainst: "Kontrollerat mot {source}.",
    errorDefault: "Kunde inte skanna den URL:en. Försök igen.",
    errorNetwork: "Nätverksfel — försök igen.",
    footer: "Indikativt resultat från Google Safe Browsing (databas över kända osäkra webbplatser). Ett \"inga hot hittades\"-resultat garanterar inte att en webbplats är säker — nya nätfiskesidor kan dyka upp innan de katalogiseras.",
  },
  pl: {
    label: "URL do sprawdzenia",
    scanningBtn: "Skanowanie…",
    scanBtn: "Skanuj URL",
    dangerous: "Niebezpieczny link",
    safe: "Nie znaleziono zagrożeń",
    checkedAgainst: "Sprawdzono w {source}.",
    errorDefault: "Nie można przeskanować tego URL. Spróbuj ponownie.",
    errorNetwork: "Błąd sieci — spróbuj ponownie.",
    footer: "Wynik orientacyjny z Google Safe Browsing (bazy znanych niebezpiecznych stron). brak wykrytych zagrożeń nie gwarantuje, że strona jest bezpieczna — nowe strony phishingowe mogą pojawić się przed ich skatalogowaniem.",
  },
  uk: {
    label: "URL для перевірки",
    scanningBtn: "Сканується…",
    scanBtn: "Сканувати URL",
    dangerous: "Небезпечне посилання",
    safe: "Загроз не знайдено",
    checkedAgainst: "Перевірено через {source}.",
    errorDefault: "Не вдалося просканувати цей URL. Спробуйте ще раз.",
    errorNetwork: "Помилка мережі — спробуйте ще раз.",
    footer: "Індикативний результат від Google Safe Browsing (база відомих небезпечних сайтів). Результат «загроз не знайдено» не гарантує безпеку сайту — нові фішингові сторінки можуть з'явитися до занесення в базу.",
  },
  cs: {
    label: "URL ke kontrole",
    scanningBtn: "Probíhá skenování…",
    scanBtn: "Skenovat URL",
    dangerous: "Nebezpečný odkaz",
    safe: "Žádné hrozby nenalezeny",
    checkedAgainst: "Zkontrolováno přes {source}.",
    errorDefault: "Tento URL se nepodařilo naskenovat. Zkuste to znovu.",
    errorNetwork: "Chyba sítě — zkuste to znovu.",
    footer: "Orientační výsledek z Google Safe Browsing (databáze známých nebezpečných webů). Výsledek bez zjištěných hrozeb nezaručuje bezpečnost webu — nové phishingové stránky se mohou objevit dříve, než jsou zaevidovány.",
  },
};

type Verdict = "safe" | "dangerous";
type Result = { url: string; verdict: Verdict; threats: string[]; source: string };

export function UrlScannerClient() {
  const s = T[useLocale()] ?? T.en;
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);

  async function run() {
    if (!url.trim() || loading) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await callTool("url-scanner", { action: "scan_url", url: url.trim() });
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

  const dangerous = result?.verdict === "dangerous";

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">{s.label}</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input value={url} onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="https://example.com/login"
              className="w-full rounded-lg border border-ink-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </div>
          <Button onClick={run} disabled={!url.trim() || loading} size="lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            {loading ? s.scanningBtn : s.scanBtn}
          </Button>
        </div>
      </div>

      {result && (
        <div className={cn("rounded-xl border p-5 shadow-card ring-1", dangerous ? "border-red-200 bg-red-50/40 ring-red-200" : "border-emerald-200 bg-emerald-50/40 ring-emerald-200")}>
          <div className="flex items-center gap-3">
            {dangerous ? <ShieldAlert className="h-8 w-8 text-red-600" /> : <ShieldCheck className="h-8 w-8 text-emerald-600" />}
            <div>
              <p className={cn("text-base font-semibold", dangerous ? "text-red-700" : "text-emerald-700")}>
                {dangerous ? s.dangerous : s.safe}
              </p>
              <p className="text-xs text-ink-500 break-all">{result.url}</p>
            </div>
          </div>
          {dangerous && result.threats.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {result.threats.map((t, i) => (
                <li key={i} className="rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-semibold text-red-700">{t}</li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-ink-400">{s.checkedAgainst.replace("{source}", result.source)}</p>
        </div>
      )}

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <p className="text-xs text-ink-400">{s.footer}</p>
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}
