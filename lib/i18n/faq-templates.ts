import type { Locale } from "@/lib/i18n/locales";
import type { ToolFaq } from "@/lib/tools-config";

/**
 * Five reusable FAQ templates per locale. The same five questions get
 * re-used across every tool — the only thing that varies is the tool's
 * display name and its accepted formats list.
 *
 * Yields native, fluent FAQs for every (tool × locale) pair without
 * exploding into thousands of hand-written entries.
 */
type FaqFactory = (name: string, formats: string) => ToolFaq;

const en: FaqFactory[] = [
  (name) => ({ q: `Is ${name} free to use?`, a: `Yes. Konver is free for everyone. Free users can run ${name} a few times per day with a file size limit. Pro users (€9/month) get unlimited runs, larger files, and no ads.` }),
  () => ({ q: `Do you store my files?`, a: `Files are processed in a temporary location and deleted automatically after a short retention window (typically 1 hour). We never use your content to train models.` }),
  (name, formats) => ({ q: `Which formats does ${name} accept?`, a: `${name} accepts ${formats}. If you need another format, use our converters first and then come back to this tool.` }),
  () => ({ q: `Is there a watermark?`, a: `Text-only outputs (SRT, VTT, TXT) are never watermarked. Free users get a small watermark when burning subtitles into videos. Pro removes it.` }),
  () => ({ q: `Do I need to sign up?`, a: `No account is required for casual use. Signing up gives you a few extra runs per day and a history of your last files. Pro unlocks unlimited usage.` }),
];

const fr: FaqFactory[] = [
  (name) => ({ q: `${name} est-il gratuit ?`, a: `Oui. Konver est gratuit pour tous. Les utilisateurs gratuits peuvent utiliser ${name} plusieurs fois par jour avec une limite de taille. Les Pro (9 €/mois) ont un usage illimité, des fichiers plus gros et aucune pub.` }),
  () => ({ q: `Stockez-vous mes fichiers ?`, a: `Les fichiers sont traités dans un espace temporaire puis automatiquement supprimés (généralement sous 1 heure). Nous n'utilisons jamais votre contenu pour entraîner des modèles.` }),
  (name, formats) => ({ q: `Quels formats ${name} accepte-t-il ?`, a: `${name} accepte ${formats}. Si vous avez besoin d'un autre format, utilisez d'abord nos convertisseurs puis revenez à cet outil.` }),
  () => ({ q: `Y a-t-il un filigrane ?`, a: `Les sorties texte (SRT, VTT, TXT) ne sont jamais filigranées. Les utilisateurs gratuits ont un petit filigrane sur les vidéos avec sous-titres incrustés. Pro le supprime.` }),
  () => ({ q: `Faut-il s'inscrire ?`, a: `Aucun compte n'est requis pour un usage ponctuel. S'inscrire donne quelques utilisations supplémentaires par jour et un historique. Pro débloque l'usage illimité.` }),
];

const es: FaqFactory[] = [
  (name) => ({ q: `¿${name} es gratis?`, a: `Sí. Konver es gratis para todos. Los usuarios gratuitos pueden usar ${name} varias veces al día con un límite de tamaño. Pro (9 €/mes) ofrece usos ilimitados, archivos grandes y sin anuncios.` }),
  () => ({ q: `¿Almacenáis mis archivos?`, a: `Los archivos se procesan en un espacio temporal y se eliminan automáticamente en poco tiempo (normalmente 1 hora). Nunca usamos tu contenido para entrenar modelos.` }),
  (name, formats) => ({ q: `¿Qué formatos acepta ${name}?`, a: `${name} acepta ${formats}. Si necesitas otro formato, usa primero nuestros conversores y vuelve a esta herramienta.` }),
  () => ({ q: `¿Hay marca de agua?`, a: `Las salidas de texto (SRT, VTT, TXT) nunca llevan marca de agua. Los usuarios gratuitos obtienen una pequeña marca al incrustar subtítulos en vídeo. Pro la elimina.` }),
  () => ({ q: `¿Necesito registrarme?`, a: `No se necesita cuenta para usos ocasionales. Registrarse da algunos usos extra al día y un historial. Pro desbloquea el uso ilimitado.` }),
];

const pt: FaqFactory[] = [
  (name) => ({ q: `${name} é grátis?`, a: `Sim. Konver é grátis para todos. Usuários gratuitos podem usar ${name} algumas vezes ao dia com um limite de tamanho. Pro (€9/mês) tem usos ilimitados, arquivos maiores e sem anúncios.` }),
  () => ({ q: `Vocês armazenam meus arquivos?`, a: `Os arquivos são processados em um local temporário e removidos automaticamente em pouco tempo (normalmente 1 hora). Nunca usamos seu conteúdo para treinar modelos.` }),
  (name, formats) => ({ q: `Quais formatos ${name} aceita?`, a: `${name} aceita ${formats}. Se precisar de outro formato, use nossos conversores primeiro e volte para esta ferramenta.` }),
  () => ({ q: `Tem marca d'água?`, a: `Saídas de texto (SRT, VTT, TXT) nunca têm marca d'água. Usuários grátis ganham uma pequena marca ao gravar legendas em vídeo. Pro remove.` }),
  () => ({ q: `Preciso me cadastrar?`, a: `Nenhuma conta necessária para uso ocasional. Cadastrar-se dá alguns usos extras por dia e um histórico. Pro libera uso ilimitado.` }),
];

const de: FaqFactory[] = [
  (name) => ({ q: `Ist ${name} kostenlos?`, a: `Ja. Konver ist für alle kostenlos. Gratis-Nutzer können ${name} mehrmals täglich mit Dateigrößenlimit verwenden. Pro (9 €/Monat) hebt das auf, erlaubt größere Dateien und entfernt Werbung.` }),
  () => ({ q: `Speichert ihr meine Dateien?`, a: `Dateien werden temporär verarbeitet und automatisch gelöscht (meist innerhalb 1 Stunde). Wir nutzen deine Inhalte nie zum Training von Modellen.` }),
  (name, formats) => ({ q: `Welche Formate akzeptiert ${name}?`, a: `${name} akzeptiert ${formats}. Brauchst du ein anderes Format, nutze zuerst unsere Konverter und komm dann hierher zurück.` }),
  () => ({ q: `Gibt es ein Wasserzeichen?`, a: `Reine Text-Ausgaben (SRT, VTT, TXT) haben nie ein Wasserzeichen. Gratis-Nutzer bekommen ein kleines beim Einbrennen in Videos. Pro entfernt es.` }),
  () => ({ q: `Muss ich mich registrieren?`, a: `Für gelegentliche Nutzung kein Konto nötig. Registrierte erhalten ein paar Durchläufe mehr pro Tag und eine Historie. Pro schaltet unbegrenzte Nutzung frei.` }),
];

const it: FaqFactory[] = [
  (name) => ({ q: `${name} è gratis?`, a: `Sì. Konver è gratis per tutti. Gli utenti gratis possono usare ${name} alcune volte al giorno con un limite di dimensione. Pro (9 €/mese) offre utilizzi illimitati, file più grandi e niente pubblicità.` }),
  () => ({ q: `Conservate i miei file?`, a: `I file vengono elaborati in una posizione temporanea ed eliminati automaticamente in breve tempo (di solito entro 1 ora). Non usiamo mai i tuoi contenuti per addestrare modelli.` }),
  (name, formats) => ({ q: `Quali formati accetta ${name}?`, a: `${name} accetta ${formats}. Se ti serve un altro formato, usa prima i nostri convertitori e poi torna qui.` }),
  () => ({ q: `C'è una filigrana?`, a: `Le uscite di testo (SRT, VTT, TXT) non sono mai filigranate. Gli utenti gratis vedono una piccola filigrana quando incidono i sottotitoli nei video. Pro la rimuove.` }),
  () => ({ q: `Devo registrarmi?`, a: `Non serve un account per l'uso occasionale. Registrarsi dà alcuni utilizzi in più al giorno e una cronologia. Pro sblocca l'uso illimitato.` }),
];

const nl: FaqFactory[] = [
  (name) => ({ q: `Is ${name} gratis?`, a: `Ja. Konver is gratis voor iedereen. Gratis gebruikers kunnen ${name} enkele keren per dag draaien met een grootte-limiet. Pro (€9/maand) geeft onbeperkt gebruik, grotere bestanden en geen advertenties.` }),
  () => ({ q: `Slaan jullie mijn bestanden op?`, a: `Bestanden worden tijdelijk verwerkt en automatisch verwijderd (meestal binnen 1 uur). We gebruiken je content nooit om modellen te trainen.` }),
  (name, formats) => ({ q: `Welke formaten accepteert ${name}?`, a: `${name} accepteert ${formats}. Heb je een ander formaat nodig, gebruik dan eerst onze converters en kom hier daarna terug.` }),
  () => ({ q: `Is er een watermerk?`, a: `Tekst-output (SRT, VTT, TXT) krijgt nooit een watermerk. Gratis gebruikers krijgen een klein watermerk bij ingebrande video-ondertitels. Pro verwijdert dat.` }),
  () => ({ q: `Moet ik me aanmelden?`, a: `Geen account nodig voor incidenteel gebruik. Aanmelden geeft een paar runs extra per dag en een geschiedenis. Pro ontgrendelt onbeperkt gebruik.` }),
];

const ja: FaqFactory[] = [
  (name) => ({ q: `${name} は無料ですか？`, a: `はい。Konver は誰でも無料です。無料ユーザーは ${name} を 1 日数回まで、ファイルサイズ制限ありで利用可。Pro（月 9 ユーロ）は無制限、より大きなファイル、広告なしです。` }),
  () => ({ q: `ファイルは保存されますか？`, a: `ファイルは一時的な場所で処理され、通常 1 時間以内に自動削除されます。コンテンツをモデル学習に使用することはありません。` }),
  (name, formats) => ({ q: `${name} はどの形式に対応していますか？`, a: `${name} は ${formats} に対応します。別の形式が必要な場合は、先にコンバーターを使ってからこのツールに戻ってください。` }),
  () => ({ q: `透かしはありますか？`, a: `テキスト出力（SRT、VTT、TXT）に透かしはありません。動画に字幕を焼き込む場合、無料ユーザーには小さな透かしが入ります。Pro なら削除されます。` }),
  () => ({ q: `登録は必要ですか？`, a: `単発利用なら不要です。登録すると 1 日あたりの利用回数が少し増え、履歴が見られます。Pro で無制限利用が解放されます。` }),
];

const zh: FaqFactory[] = [
  (name) => ({ q: `${name} 是免费的吗?`, a: `是的,Konver 对所有人免费。免费用户每天可使用 ${name} 数次,有文件大小限制。Pro 用户(€9/月)享有无限使用、更大文件、无广告。` }),
  () => ({ q: `你们会存储我的文件吗?`, a: `文件在临时位置处理,通常在 1 小时内自动删除。我们绝不使用您的内容训练模型。` }),
  (name, formats) => ({ q: `${name} 支持哪些格式?`, a: `${name} 支持 ${formats}。如果需要其他格式,请先使用我们的转换器,然后再回到本工具。` }),
  () => ({ q: `会有水印吗?`, a: `纯文本输出(SRT、VTT、TXT)从不带水印。免费用户在烧录字幕到视频时会有小水印,Pro 移除水印。` }),
  () => ({ q: `需要注册吗?`, a: `偶尔使用无需账户。注册可每日多几次使用,并保留历史记录。Pro 解锁无限使用。` }),
];

const ko: FaqFactory[] = [
  (name) => ({ q: `${name} 는 무료인가요?`, a: `네. Konver 는 모두에게 무료입니다. 무료 사용자는 ${name} 를 하루 몇 번, 파일 크기 제한 하에 사용할 수 있습니다. Pro(월 9유로)는 무제한 사용, 더 큰 파일, 광고 없음.` }),
  () => ({ q: `파일을 저장하나요?`, a: `파일은 임시 위치에서 처리되어 짧은 시간 내(보통 1시간)에 자동 삭제됩니다. 콘텐츠를 모델 학습에 사용하지 않습니다.` }),
  (name, formats) => ({ q: `${name} 는 어떤 형식을 지원하나요?`, a: `${name} 는 ${formats} 를 지원합니다. 다른 형식이 필요하면 먼저 변환기를 사용한 뒤 이 도구로 돌아오세요.` }),
  () => ({ q: `워터마크가 있나요?`, a: `텍스트 출력(SRT, VTT, TXT)에는 워터마크가 없습니다. 영상에 자막을 인코딩하면 무료 사용자에게는 작은 워터마크가 들어갑니다. Pro 는 제거됩니다.` }),
  () => ({ q: `가입해야 하나요?`, a: `간헐적 사용에는 계정이 필요 없습니다. 가입하면 하루 몇 번 더 사용할 수 있고 기록이 남습니다. Pro 는 무제한을 잠금 해제합니다.` }),
];

const ar: FaqFactory[] = [
  (name) => ({ q: `هل ${name} مجاني؟`, a: `نعم. Konver مجاني للجميع. يمكن للمستخدم المجاني تشغيل ${name} عدة مرات يوميًا مع حد لحجم الملف. Pro (9 يورو/شهر) يمنح استخدامًا غير محدود، ملفات أكبر، وبلا إعلانات.` }),
  () => ({ q: `هل تحتفظون بملفاتي؟`, a: `تُعالج الملفات في موقع مؤقت وتُحذف تلقائيًا خلال فترة قصيرة (عادةً ساعة واحدة). لا نستخدم محتواك مطلقًا لتدريب النماذج.` }),
  (name, formats) => ({ q: `ما الصيغ التي يقبلها ${name}؟`, a: `${name} يقبل ${formats}. إن احتجت صيغة أخرى، استخدم محوّلاتنا أولًا ثم عُد إلى هذه الأداة.` }),
  () => ({ q: `هل توجد علامة مائية؟`, a: `المخرجات النصية (SRT، VTT، TXT) لا تحوي علامة مائية أبدًا. عند حرق الترجمة في الفيديو، تظهر علامة صغيرة للمستخدم المجاني فقط. Pro يزيلها.` }),
  () => ({ q: `هل أحتاج إلى التسجيل؟`, a: `لا حاجة لحساب للاستخدام العرضي. التسجيل يمنحك بضع استخدامات إضافية يوميًا وسجلًا. Pro يفتح الاستخدام بلا حدود.` }),
];

const ru: FaqFactory[] = [
  (name) => ({ q: `${name} бесплатно?`, a: `Да. Konver бесплатен для всех. Бесплатные пользователи могут запускать ${name} несколько раз в день с лимитом на размер файла. Pro (9 €/мес) даёт безлимит, большие файлы и без рекламы.` }),
  () => ({ q: `Храните ли вы мои файлы?`, a: `Файлы обрабатываются во временном хранилище и автоматически удаляются в течение короткого окна (обычно 1 час). Мы никогда не используем ваш контент для обучения моделей.` }),
  (name, formats) => ({ q: `Какие форматы принимает ${name}?`, a: `${name} принимает ${formats}. Если нужен другой формат, сначала воспользуйтесь нашими конвертерами и вернитесь к этому инструменту.` }),
  () => ({ q: `Есть ли водяной знак?`, a: `Текстовые выходы (SRT, VTT, TXT) никогда не имеют водяного знака. У бесплатных пользователей при вшивании субтитров в видео появляется маленький знак. Pro его убирает.` }),
  () => ({ q: `Нужно ли регистрироваться?`, a: `Для разового использования аккаунт не нужен. Регистрация даёт несколько дополнительных запусков в день и историю. Pro открывает безлимит.` }),
];

const hi: FaqFactory[] = [
  (name) => ({ q: `क्या ${name} मुफ़्त है?`, a: `हाँ। Konver सभी के लिए मुफ़्त है। मुफ़्त उपयोगकर्ता ${name} को रोज़ कुछ बार उपयोग कर सकते हैं, फ़ाइल आकार सीमा के साथ। Pro (€9/माह) असीमित उपयोग, बड़ी फ़ाइलें, और कोई विज्ञापन नहीं देता है।` }),
  () => ({ q: `क्या आप मेरी फ़ाइलें संग्रहीत करते हैं?`, a: `फ़ाइलें एक अस्थायी स्थान पर प्रोसेस होती हैं और थोड़े समय में (आमतौर पर 1 घंटे के भीतर) स्वचालित रूप से हटा दी जाती हैं। हम कभी भी आपकी सामग्री का उपयोग मॉडल प्रशिक्षण के लिए नहीं करते।` }),
  (name, formats) => ({ q: `${name} किन प्रारूपों को स्वीकार करता है?`, a: `${name} ${formats} स्वीकार करता है. अगर आपको कोई और प्रारूप चाहिए, पहले हमारे कनवर्टर्स का उपयोग करें फिर इस टूल पर वापस आएँ।` }),
  () => ({ q: `क्या वॉटरमार्क होता है?`, a: `केवल-टेक्स्ट आउटपुट (SRT, VTT, TXT) पर कभी वॉटरमार्क नहीं होता। मुफ़्त उपयोगकर्ताओं को वीडियो में सबटाइटल बर्न करते समय एक छोटा वॉटरमार्क मिलता है। Pro इसे हटा देता है।` }),
  () => ({ q: `क्या मुझे साइन अप करना होगा?`, a: `कभी-कभार उपयोग के लिए कोई खाता ज़रूरी नहीं है। साइन अप करने से रोज़ कुछ अतिरिक्त रन और एक इतिहास मिलता है। Pro असीमित उपयोग खोल देता है।` }),
];

const ALL: Record<Locale, FaqFactory[]> = { en, fr, es, pt, de, it, nl, ja, zh, ko, ar, ru, hi };

export function getLocalisedFaqs(
  locale: Locale,
  name: string,
  formats: string,
): ToolFaq[] {
  const set = ALL[locale] ?? ALL.en;
  return set.map((fn) => fn(name, formats));
}
