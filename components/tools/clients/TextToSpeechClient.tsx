"use client";

import { useState } from "react";
import Link from "next/link";
import { AudioLines, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { callTool } from "@/lib/tool-api";
import { useLocale } from "@/hooks/useLocale";
import { localePath, type Locale } from "@/lib/i18n/locales";

const VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"] as const;

type Strings = {
  placeholder: string;
  voice: string;
  generate: string;
  generating: string;
  download: string;
  chars: string; // "{n} characters"
  comingSoon: string;
  signIn: string;
  signInCta: string;
  quota: string;
  upgradeCta: string;
  tooLong: string; // "{n}"
  failed: string;
  privacy: string;
};

const EN: Strings = {
  placeholder: "Type or paste the text to turn into speech…",
  voice: "Voice",
  generate: "Generate speech",
  generating: "Generating…",
  download: "Download MP3",
  chars: "{n} characters",
  comingSoon: "Text-to-speech is coming soon — it's not activated yet.",
  signIn: "Sign in to generate speech (it uses one AI run).",
  signInCta: "Sign in",
  quota: "You've reached your AI quota for now.",
  upgradeCta: "See plans",
  tooLong: "Text is too long for your plan (max {n} characters).",
  failed: "Could not generate the audio. Please try again.",
  privacy: "Processed on our servers via the AI provider, then discarded — nothing is stored.",
};

const FR: Strings = {
  placeholder: "Saisissez ou collez le texte à transformer en voix…",
  voice: "Voix",
  generate: "Générer la voix",
  generating: "Génération…",
  download: "Télécharger le MP3",
  chars: "{n} caractères",
  comingSoon: "La synthèse vocale arrive bientôt — elle n'est pas encore activée.",
  signIn: "Connectez-vous pour générer la voix (cela utilise une exécution IA).",
  signInCta: "Se connecter",
  quota: "Vous avez atteint votre quota IA pour le moment.",
  upgradeCta: "Voir les offres",
  tooLong: "Texte trop long pour votre offre (max {n} caractères).",
  failed: "Impossible de générer l'audio. Réessayez.",
  privacy: "Traité sur nos serveurs via le fournisseur IA, puis supprimé — rien n'est stocké.",
};

const ES: Strings = {
  placeholder: "Escribe o pega el texto que quieres convertir en voz…",
  voice: "Voz",
  generate: "Generar voz",
  generating: "Generando…",
  download: "Descargar MP3",
  chars: "{n} caracteres",
  comingSoon: "La conversión de texto a voz llegará pronto — aún no está activada.",
  signIn: "Inicia sesión para generar la voz (usa una ejecución de IA).",
  signInCta: "Iniciar sesión",
  quota: "Has alcanzado tu cuota de IA por ahora.",
  upgradeCta: "Ver planes",
  tooLong: "El texto es demasiado largo para tu plan (máx. {n} caracteres).",
  failed: "No se pudo generar el audio. Inténtalo de nuevo.",
  privacy: "Procesado en nuestros servidores a través del proveedor de IA y luego descartado — no se almacena nada.",
};

const PT: Strings = {
  placeholder: "Digite ou cole o texto para transformar em voz…",
  voice: "Voz",
  generate: "Gerar voz",
  generating: "Gerando…",
  download: "Baixar MP3",
  chars: "{n} caracteres",
  comingSoon: "A conversão de texto em voz chega em breve — ainda não está ativada.",
  signIn: "Entre para gerar a voz (usa uma execução de IA).",
  signInCta: "Entrar",
  quota: "Você atingiu sua cota de IA por enquanto.",
  upgradeCta: "Ver planos",
  tooLong: "Texto longo demais para o seu plano (máx. {n} caracteres).",
  failed: "Não foi possível gerar o áudio. Tente novamente.",
  privacy: "Processado em nossos servidores via provedor de IA e depois descartado — nada é armazenado.",
};

const DE: Strings = {
  placeholder: "Tippe oder füge den Text ein, der in Sprache umgewandelt werden soll…",
  voice: "Stimme",
  generate: "Sprache erzeugen",
  generating: "Wird erzeugt…",
  download: "MP3 herunterladen",
  chars: "{n} Zeichen",
  comingSoon: "Text-zu-Sprache kommt bald — es ist noch nicht aktiviert.",
  signIn: "Melde dich an, um Sprache zu erzeugen (verbraucht einen KI-Lauf).",
  signInCta: "Anmelden",
  quota: "Du hast dein KI-Kontingent vorerst erreicht.",
  upgradeCta: "Tarife ansehen",
  tooLong: "Text ist zu lang für deinen Tarif (max. {n} Zeichen).",
  failed: "Audio konnte nicht erzeugt werden. Bitte versuche es erneut.",
  privacy: "Auf unseren Servern über den KI-Anbieter verarbeitet und danach verworfen — nichts wird gespeichert.",
};

const IT: Strings = {
  placeholder: "Digita o incolla il testo da trasformare in voce…",
  voice: "Voce",
  generate: "Genera voce",
  generating: "Generazione…",
  download: "Scarica MP3",
  chars: "{n} caratteri",
  comingSoon: "Il text-to-speech arriverà presto — non è ancora attivato.",
  signIn: "Accedi per generare la voce (usa un'esecuzione IA).",
  signInCta: "Accedi",
  quota: "Hai raggiunto la tua quota IA per ora.",
  upgradeCta: "Vedi i piani",
  tooLong: "Testo troppo lungo per il tuo piano (max {n} caratteri).",
  failed: "Impossibile generare l'audio. Riprova.",
  privacy: "Elaborato sui nostri server tramite il fornitore IA, poi eliminato — nulla viene memorizzato.",
};

const NL: Strings = {
  placeholder: "Typ of plak de tekst die je in spraak wilt omzetten…",
  voice: "Stem",
  generate: "Spraak genereren",
  generating: "Genereren…",
  download: "MP3 downloaden",
  chars: "{n} tekens",
  comingSoon: "Tekst-naar-spraak komt binnenkort — het is nog niet geactiveerd.",
  signIn: "Log in om spraak te genereren (dit gebruikt één AI-run).",
  signInCta: "Inloggen",
  quota: "Je hebt je AI-quotum voorlopig bereikt.",
  upgradeCta: "Bekijk abonnementen",
  tooLong: "Tekst is te lang voor je abonnement (max. {n} tekens).",
  failed: "Kon de audio niet genereren. Probeer het opnieuw.",
  privacy: "Verwerkt op onze servers via de AI-aanbieder en daarna verwijderd — er wordt niets opgeslagen.",
};

const JA: Strings = {
  placeholder: "音声に変換するテキストを入力または貼り付け…",
  voice: "声",
  generate: "音声を生成",
  generating: "生成中…",
  download: "MP3 をダウンロード",
  chars: "{n} 文字",
  comingSoon: "テキスト読み上げは近日公開 — まだ有効になっていません。",
  signIn: "サインインして音声を生成（AI 実行を 1 回使用します）。",
  signInCta: "サインイン",
  quota: "現在の AI 利用上限に達しました。",
  upgradeCta: "プランを見る",
  tooLong: "テキストがプランの上限を超えています（最大 {n} 文字）。",
  failed: "音声を生成できませんでした。もう一度お試しください。",
  privacy: "AI プロバイダー経由で当社サーバーで処理し、その後破棄します — 何も保存されません。",
};

const ZH: Strings = {
  placeholder: "输入或粘贴要转换为语音的文本…",
  voice: "声音",
  generate: "生成语音",
  generating: "生成中…",
  download: "下载 MP3",
  chars: "{n} 个字符",
  comingSoon: "文字转语音即将推出 — 目前尚未启用。",
  signIn: "登录以生成语音（将使用一次 AI 运行）。",
  signInCta: "登录",
  quota: "您暂时已达到 AI 配额。",
  upgradeCta: "查看套餐",
  tooLong: "文本对于您的套餐过长（最多 {n} 个字符）。",
  failed: "无法生成音频。请重试。",
  privacy: "通过 AI 提供商在我们的服务器上处理，然后丢弃 — 不会存储任何内容。",
};

const KO: Strings = {
  placeholder: "음성으로 변환할 텍스트를 입력하거나 붙여넣으세요…",
  voice: "음성",
  generate: "음성 생성",
  generating: "생성 중…",
  download: "MP3 다운로드",
  chars: "{n}자",
  comingSoon: "텍스트 음성 변환이 곧 출시됩니다 — 아직 활성화되지 않았습니다.",
  signIn: "로그인하여 음성을 생성하세요(AI 실행 1회를 사용합니다).",
  signInCta: "로그인",
  quota: "현재 AI 사용량 한도에 도달했습니다.",
  upgradeCta: "요금제 보기",
  tooLong: "텍스트가 요금제에 비해 너무 깁니다(최대 {n}자).",
  failed: "오디오를 생성할 수 없습니다. 다시 시도해 주세요.",
  privacy: "AI 제공업체를 통해 당사 서버에서 처리한 후 폐기됩니다 — 아무것도 저장되지 않습니다.",
};

const AR: Strings = {
  placeholder: "اكتب أو الصق النص الذي تريد تحويله إلى صوت…",
  voice: "الصوت",
  generate: "إنشاء الصوت",
  generating: "جارٍ الإنشاء…",
  download: "تنزيل MP3",
  chars: "{n} حرفًا",
  comingSoon: "تحويل النص إلى كلام قادم قريبًا — لم يُفعَّل بعد.",
  signIn: "سجّل الدخول لإنشاء الصوت (يستخدم تشغيلًا واحدًا للذكاء الاصطناعي).",
  signInCta: "تسجيل الدخول",
  quota: "لقد بلغت حصتك من الذكاء الاصطناعي في الوقت الحالي.",
  upgradeCta: "عرض الخطط",
  tooLong: "النص طويل جدًا لخطتك (بحد أقصى {n} حرفًا).",
  failed: "تعذّر إنشاء الصوت. حاول مرة أخرى.",
  privacy: "تتم المعالجة على خوادمنا عبر مزوّد الذكاء الاصطناعي ثم تُتلف — لا يُخزَّن شيء.",
};

const RU: Strings = {
  placeholder: "Введите или вставьте текст для преобразования в речь…",
  voice: "Голос",
  generate: "Сгенерировать речь",
  generating: "Генерация…",
  download: "Скачать MP3",
  chars: "{n} символов",
  comingSoon: "Преобразование текста в речь скоро появится — пока не активировано.",
  signIn: "Войдите, чтобы сгенерировать речь (используется один запуск ИИ).",
  signInCta: "Войти",
  quota: "Вы пока достигли своей квоты ИИ.",
  upgradeCta: "Смотреть тарифы",
  tooLong: "Текст слишком длинный для вашего тарифа (макс. {n} символов).",
  failed: "Не удалось сгенерировать аудио. Попробуйте ещё раз.",
  privacy: "Обрабатывается на наших серверах через поставщика ИИ, затем удаляется — ничего не хранится.",
};

const HI: Strings = {
  placeholder: "वह टेक्स्ट टाइप करें या पेस्ट करें जिसे आवाज़ में बदलना है…",
  voice: "आवाज़",
  generate: "आवाज़ बनाएँ",
  generating: "बना रहे हैं…",
  download: "MP3 डाउनलोड करें",
  chars: "{n} वर्ण",
  comingSoon: "टेक्स्ट-टू-स्पीच जल्द आ रहा है — यह अभी सक्रिय नहीं है।",
  signIn: "आवाज़ बनाने के लिए साइन इन करें (इसमें एक AI रन उपयोग होता है)।",
  signInCta: "साइन इन करें",
  quota: "आपने फ़िलहाल अपना AI कोटा पूरा कर लिया है।",
  upgradeCta: "प्लान देखें",
  tooLong: "आपके प्लान के लिए टेक्स्ट बहुत लंबा है (अधिकतम {n} वर्ण)।",
  failed: "ऑडियो नहीं बनाया जा सका। कृपया फिर से प्रयास करें।",
  privacy: "AI प्रदाता के माध्यम से हमारे सर्वर पर संसाधित किया जाता है, फिर हटा दिया जाता है — कुछ भी संग्रहीत नहीं होता।",
};

const TR: Strings = {
  placeholder: "Sese dönüştürmek istediğin metni yaz veya yapıştır…",
  voice: "Ses",
  generate: "Ses oluştur",
  generating: "Oluşturuluyor…",
  download: "MP3 indir",
  chars: "{n} karakter",
  comingSoon: "Metinden sese çevirme yakında geliyor — henüz etkin değil.",
  signIn: "Ses oluşturmak için giriş yap (bir AI çalıştırması kullanır).",
  signInCta: "Giriş yap",
  quota: "Şimdilik AI kotana ulaştın.",
  upgradeCta: "Planları gör",
  tooLong: "Metin, planın için fazla uzun (en fazla {n} karakter).",
  failed: "Ses oluşturulamadı. Lütfen tekrar dene.",
  privacy: "Yapay zeka sağlayıcısı aracılığıyla sunucularımızda işlenir, ardından silinir — hiçbir şey saklanmaz.",
};

const ID: Strings = {
  placeholder: "Ketik atau tempel teks yang ingin diubah menjadi suara…",
  voice: "Suara",
  generate: "Buat suara",
  generating: "Membuat…",
  download: "Unduh MP3",
  chars: "{n} karakter",
  comingSoon: "Teks ke suara segera hadir — belum diaktifkan.",
  signIn: "Masuk untuk membuat suara (menggunakan satu kali proses AI).",
  signInCta: "Masuk",
  quota: "Anda telah mencapai kuota AI untuk saat ini.",
  upgradeCta: "Lihat paket",
  tooLong: "Teks terlalu panjang untuk paket Anda (maks {n} karakter).",
  failed: "Tidak dapat membuat audio. Silakan coba lagi.",
  privacy: "Diproses di server kami melalui penyedia AI, lalu dibuang — tidak ada yang disimpan.",
};

const VI: Strings = {
  placeholder: "Nhập hoặc dán văn bản cần chuyển thành giọng nói…",
  voice: "Giọng",
  generate: "Tạo giọng nói",
  generating: "Đang tạo…",
  download: "Tải MP3",
  chars: "{n} ký tự",
  comingSoon: "Chuyển văn bản thành giọng nói sắp ra mắt — hiện chưa được kích hoạt.",
  signIn: "Đăng nhập để tạo giọng nói (sử dụng một lượt chạy AI).",
  signInCta: "Đăng nhập",
  quota: "Bạn đã đạt hạn mức AI vào lúc này.",
  upgradeCta: "Xem gói",
  tooLong: "Văn bản quá dài cho gói của bạn (tối đa {n} ký tự).",
  failed: "Không thể tạo âm thanh. Vui lòng thử lại.",
  privacy: "Được xử lý trên máy chủ của chúng tôi qua nhà cung cấp AI, sau đó loại bỏ — không lưu trữ gì.",
};

const SV: Strings = {
  placeholder: "Skriv eller klistra in texten du vill omvandla till tal…",
  voice: "Röst",
  generate: "Generera tal",
  generating: "Genererar…",
  download: "Ladda ner MP3",
  chars: "{n} tecken",
  comingSoon: "Text till tal kommer snart — det är inte aktiverat ännu.",
  signIn: "Logga in för att generera tal (det använder en AI-körning).",
  signInCta: "Logga in",
  quota: "Du har nått din AI-kvot för tillfället.",
  upgradeCta: "Se planer",
  tooLong: "Texten är för lång för din plan (max {n} tecken).",
  failed: "Det gick inte att generera ljudet. Försök igen.",
  privacy: "Bearbetas på våra servrar via AI-leverantören och kasseras sedan — inget lagras.",
};

const PL: Strings = {
  placeholder: "Wpisz lub wklej tekst, który chcesz zamienić na mowę…",
  voice: "Głos",
  generate: "Generuj mowę",
  generating: "Generowanie…",
  download: "Pobierz MP3",
  chars: "{n} znaków",
  comingSoon: "Zamiana tekstu na mowę już wkrótce — jeszcze nie jest aktywna.",
  signIn: "Zaloguj się, aby wygenerować mowę (zużywa jedno uruchomienie AI).",
  signInCta: "Zaloguj się",
  quota: "Na razie wykorzystałeś swój limit AI.",
  upgradeCta: "Zobacz plany",
  tooLong: "Tekst jest za długi dla Twojego planu (maks. {n} znaków).",
  failed: "Nie udało się wygenerować dźwięku. Spróbuj ponownie.",
  privacy: "Przetwarzane na naszych serwerach za pośrednictwem dostawcy AI, a następnie usuwane — nic nie jest przechowywane.",
};

const UK: Strings = {
  placeholder: "Введіть або вставте текст для перетворення на мовлення…",
  voice: "Голос",
  generate: "Згенерувати мовлення",
  generating: "Генерація…",
  download: "Завантажити MP3",
  chars: "{n} символів",
  comingSoon: "Перетворення тексту на мовлення скоро з'явиться — ще не активовано.",
  signIn: "Увійдіть, щоб згенерувати мовлення (використовується один запуск ШІ).",
  signInCta: "Увійти",
  quota: "Ви наразі досягли своєї квоти ШІ.",
  upgradeCta: "Переглянути тарифи",
  tooLong: "Текст задовгий для вашого тарифу (макс. {n} символів).",
  failed: "Не вдалося згенерувати аудіо. Спробуйте ще раз.",
  privacy: "Обробляється на наших серверах через постачальника ШІ, а потім видаляється — нічого не зберігається.",
};

const CS: Strings = {
  placeholder: "Napište nebo vložte text, který chcete převést na řeč…",
  voice: "Hlas",
  generate: "Vygenerovat řeč",
  generating: "Generování…",
  download: "Stáhnout MP3",
  chars: "{n} znaků",
  comingSoon: "Převod textu na řeč brzy přijde — zatím není aktivován.",
  signIn: "Přihlaste se pro vygenerování řeči (využije jedno spuštění AI).",
  signInCta: "Přihlásit se",
  quota: "Pro tuto chvíli jste dosáhli své kvóty AI.",
  upgradeCta: "Zobrazit plány",
  tooLong: "Text je pro váš plán příliš dlouhý (max. {n} znaků).",
  failed: "Zvuk se nepodařilo vygenerovat. Zkuste to znovu.",
  privacy: "Zpracováno na našich serverech přes poskytovatele AI a poté zahozeno — nic se neukládá.",
};

const TABLE: Partial<Record<Locale, Strings>> = {
  en: EN, fr: FR, es: ES, pt: PT, de: DE, it: IT, nl: NL, ja: JA, zh: ZH, ko: KO,
  ar: AR, ru: RU, hi: HI, tr: TR, id: ID, vi: VI, sv: SV, pl: PL, uk: UK, cs: CS,
};

export function TextToSpeechClient() {
  const locale = useLocale();
  const t = TABLE[locale] ?? EN;
  const [text, setText] = useState("");
  const [voice, setVoice] = useState<(typeof VOICES)[number]>("alloy");
  const [busy, setBusy] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [note, setNote] = useState<{ kind: "info" | "signin" | "quota" | "error"; text: string } | null>(null);

  async function generate() {
    if (!text.trim() || busy) return;
    setBusy(true);
    setNote(null);
    if (audioUrl) { URL.revokeObjectURL(audioUrl); setAudioUrl(null); }
    try {
      const res = await callTool("text-to-speech", { text: text.trim(), voice });
      if (!res.ok) {
        const data = await res.json().catch(() => ({} as { error?: string; limit?: number }));
        if (data.error === "not_configured") setNote({ kind: "info", text: t.comingSoon });
        else if (data.error === "auth_required") setNote({ kind: "signin", text: t.signIn });
        else if (data.error === "daily_limit" || data.error === "monthly_limit") setNote({ kind: "quota", text: t.quota });
        else if (data.error === "text_too_long") setNote({ kind: "error", text: t.tooLong.replace("{n}", String(data.limit ?? "")) });
        else setNote({ kind: "error", text: t.failed });
        return;
      }
      const blob = await res.blob();
      setAudioUrl(URL.createObjectURL(blob));
    } catch {
      setNote({ kind: "error", text: t.failed });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.placeholder}
        rows={8}
        className="w-full resize-y rounded-xl border border-ink-200 bg-white p-4 text-sm text-ink-800 outline-none focus:border-brand-400"
      />
      <div className="flex flex-wrap items-end gap-4">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-ink-700">{t.voice}</span>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value as (typeof VOICES)[number])}
            className="rounded-md border border-ink-200 bg-white px-3 py-2 text-sm capitalize"
          >
            {VOICES.map((v) => <option key={v} value={v} className="capitalize">{v}</option>)}
          </select>
        </label>
        <Button onClick={generate} disabled={busy || !text.trim()}>
          {busy ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <AudioLines className="mr-1.5 h-4 w-4" />}
          {busy ? t.generating : t.generate}
        </Button>
        <span className="text-xs text-ink-400">{t.chars.replace("{n}", text.length.toLocaleString(locale))}</span>
      </div>

      {note && (
        <div className={cnNote(note.kind)}>
          <span>{note.text}</span>
          {note.kind === "signin" && <Link href={`/login`} className="font-semibold underline">{t.signInCta}</Link>}
          {note.kind === "quota" && <Link href={localePath(locale, "pricing")} className="font-semibold underline">{t.upgradeCta}</Link>}
        </div>
      )}

      {audioUrl && (
        <div className="space-y-3 rounded-xl border border-ink-100 bg-white p-4">
          <audio controls src={audioUrl} className="w-full" />
          <a
            href={audioUrl}
            download="speech.mp3"
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-100"
          >
            <Download className="h-4 w-4" /> {t.download}
          </a>
        </div>
      )}

      <p className="text-xs text-ink-400">{t.privacy}</p>
    </div>
  );
}

function cnNote(kind: "info" | "signin" | "quota" | "error"): string {
  const base = "flex flex-wrap items-center gap-2 rounded-lg px-3 py-2.5 text-sm";
  if (kind === "error") return `${base} bg-red-50 text-red-700`;
  if (kind === "quota" || kind === "signin") return `${base} bg-amber-50 text-amber-800`;
  return `${base} bg-ink-50 text-ink-600`;
}
