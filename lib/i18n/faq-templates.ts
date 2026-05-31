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
  (name) => ({ q: `Is ${name} free to use?`, a: `Yes. Konver is free for everyone. Free users can run ${name} a few times per day with a file size limit. Pro users (€12/month) get a higher monthly quota, larger files, and no ads.` }),
  () => ({ q: `Do you store my files?`, a: `Files are processed in a temporary location and deleted automatically after a short retention window (typically 1 hour). We never use your content to train models.` }),
  (name, formats) => ({ q: `Which formats does ${name} accept?`, a: `${name} accepts ${formats}. If you need another format, use our converters first and then come back to this tool.` }),
  () => ({ q: `Is there a watermark?`, a: `Text-only outputs (SRT, VTT, TXT) are never watermarked. Free users get a small watermark when burning subtitles into videos. Pro removes it.` }),
  () => ({ q: `Do I need to sign up?`, a: `No account is required for casual use. Signing up gives you a few extra runs per day and a history of your last files. Pro unlocks a much higher monthly quota.` }),
];

const fr: FaqFactory[] = [
  (name) => ({ q: `${name} est-il gratuit ?`, a: `Oui. Konver est gratuit pour tous. Les utilisateurs gratuits peuvent utiliser ${name} plusieurs fois par jour avec une limite de taille. Les Pro (12 €/mois) ont un usage illimité, des fichiers plus gros et aucune pub.` }),
  () => ({ q: `Stockez-vous mes fichiers ?`, a: `Les fichiers sont traités dans un espace temporaire puis automatiquement supprimés (généralement sous 1 heure). Nous n'utilisons jamais votre contenu pour entraîner des modèles.` }),
  (name, formats) => ({ q: `Quels formats ${name} accepte-t-il ?`, a: `${name} accepte ${formats}. Si vous avez besoin d'un autre format, utilisez d'abord nos convertisseurs puis revenez à cet outil.` }),
  () => ({ q: `Y a-t-il un filigrane ?`, a: `Les sorties texte (SRT, VTT, TXT) ne sont jamais filigranées. Les utilisateurs gratuits ont un petit filigrane sur les vidéos avec sous-titres incrustés. Pro le supprime.` }),
  () => ({ q: `Faut-il s'inscrire ?`, a: `Aucun compte n'est requis pour un usage ponctuel. S'inscrire donne quelques utilisations supplémentaires par jour et un historique. Pro débloque l'usage illimité.` }),
];

const es: FaqFactory[] = [
  (name) => ({ q: `¿${name} es gratis?`, a: `Sí. Konver es gratis para todos. Los usuarios gratuitos pueden usar ${name} varias veces al día con un límite de tamaño. Pro (12 €/mes) ofrece usos ilimitados, archivos grandes y sin anuncios.` }),
  () => ({ q: `¿Almacenáis mis archivos?`, a: `Los archivos se procesan en un espacio temporal y se eliminan automáticamente en poco tiempo (normalmente 1 hora). Nunca usamos tu contenido para entrenar modelos.` }),
  (name, formats) => ({ q: `¿Qué formatos acepta ${name}?`, a: `${name} acepta ${formats}. Si necesitas otro formato, usa primero nuestros conversores y vuelve a esta herramienta.` }),
  () => ({ q: `¿Hay marca de agua?`, a: `Las salidas de texto (SRT, VTT, TXT) nunca llevan marca de agua. Los usuarios gratuitos obtienen una pequeña marca al incrustar subtítulos en vídeo. Pro la elimina.` }),
  () => ({ q: `¿Necesito registrarme?`, a: `No se necesita cuenta para usos ocasionales. Registrarse da algunos usos extra al día y un historial. Pro desbloquea el uso ilimitado.` }),
];

const pt: FaqFactory[] = [
  (name) => ({ q: `${name} é grátis?`, a: `Sim. Konver é grátis para todos. Usuários gratuitos podem usar ${name} algumas vezes ao dia com um limite de tamanho. Pro (€12/mês) tem usos ilimitados, arquivos maiores e sem anúncios.` }),
  () => ({ q: `Vocês armazenam meus arquivos?`, a: `Os arquivos são processados em um local temporário e removidos automaticamente em pouco tempo (normalmente 1 hora). Nunca usamos seu conteúdo para treinar modelos.` }),
  (name, formats) => ({ q: `Quais formatos ${name} aceita?`, a: `${name} aceita ${formats}. Se precisar de outro formato, use nossos conversores primeiro e volte para esta ferramenta.` }),
  () => ({ q: `Tem marca d'água?`, a: `Saídas de texto (SRT, VTT, TXT) nunca têm marca d'água. Usuários grátis ganham uma pequena marca ao gravar legendas em vídeo. Pro remove.` }),
  () => ({ q: `Preciso me cadastrar?`, a: `Nenhuma conta necessária para uso ocasional. Cadastrar-se dá alguns usos extras por dia e um histórico. Pro libera uso ilimitado.` }),
];

const de: FaqFactory[] = [
  (name) => ({ q: `Ist ${name} kostenlos?`, a: `Ja. Konver ist für alle kostenlos. Gratis-Nutzer können ${name} mehrmals täglich mit Dateigrößenlimit verwenden. Pro (12 €/Monat) hebt das auf, erlaubt größere Dateien und entfernt Werbung.` }),
  () => ({ q: `Speichert ihr meine Dateien?`, a: `Dateien werden temporär verarbeitet und automatisch gelöscht (meist innerhalb 1 Stunde). Wir nutzen deine Inhalte nie zum Training von Modellen.` }),
  (name, formats) => ({ q: `Welche Formate akzeptiert ${name}?`, a: `${name} akzeptiert ${formats}. Brauchst du ein anderes Format, nutze zuerst unsere Konverter und komm dann hierher zurück.` }),
  () => ({ q: `Gibt es ein Wasserzeichen?`, a: `Reine Text-Ausgaben (SRT, VTT, TXT) haben nie ein Wasserzeichen. Gratis-Nutzer bekommen ein kleines beim Einbrennen in Videos. Pro entfernt es.` }),
  () => ({ q: `Muss ich mich registrieren?`, a: `Für gelegentliche Nutzung kein Konto nötig. Registrierte erhalten ein paar Durchläufe mehr pro Tag und eine Historie. Pro schaltet unbegrenzte Nutzung frei.` }),
];

const it: FaqFactory[] = [
  (name) => ({ q: `${name} è gratis?`, a: `Sì. Konver è gratis per tutti. Gli utenti gratis possono usare ${name} alcune volte al giorno con un limite di dimensione. Pro (12 €/mese) offre utilizzi illimitati, file più grandi e niente pubblicità.` }),
  () => ({ q: `Conservate i miei file?`, a: `I file vengono elaborati in una posizione temporanea ed eliminati automaticamente in breve tempo (di solito entro 1 ora). Non usiamo mai i tuoi contenuti per addestrare modelli.` }),
  (name, formats) => ({ q: `Quali formati accetta ${name}?`, a: `${name} accetta ${formats}. Se ti serve un altro formato, usa prima i nostri convertitori e poi torna qui.` }),
  () => ({ q: `C'è una filigrana?`, a: `Le uscite di testo (SRT, VTT, TXT) non sono mai filigranate. Gli utenti gratis vedono una piccola filigrana quando incidono i sottotitoli nei video. Pro la rimuove.` }),
  () => ({ q: `Devo registrarmi?`, a: `Non serve un account per l'uso occasionale. Registrarsi dà alcuni utilizzi in più al giorno e una cronologia. Pro sblocca l'uso illimitato.` }),
];

const nl: FaqFactory[] = [
  (name) => ({ q: `Is ${name} gratis?`, a: `Ja. Konver is gratis voor iedereen. Gratis gebruikers kunnen ${name} enkele keren per dag draaien met een grootte-limiet. Pro (€12/maand) geeft onbeperkt gebruik, grotere bestanden en geen advertenties.` }),
  () => ({ q: `Slaan jullie mijn bestanden op?`, a: `Bestanden worden tijdelijk verwerkt en automatisch verwijderd (meestal binnen 1 uur). We gebruiken je content nooit om modellen te trainen.` }),
  (name, formats) => ({ q: `Welke formaten accepteert ${name}?`, a: `${name} accepteert ${formats}. Heb je een ander formaat nodig, gebruik dan eerst onze converters en kom hier daarna terug.` }),
  () => ({ q: `Is er een watermerk?`, a: `Tekst-output (SRT, VTT, TXT) krijgt nooit een watermerk. Gratis gebruikers krijgen een klein watermerk bij ingebrande video-ondertitels. Pro verwijdert dat.` }),
  () => ({ q: `Moet ik me aanmelden?`, a: `Geen account nodig voor incidenteel gebruik. Aanmelden geeft een paar runs extra per dag en een geschiedenis. Pro ontgrendelt onbeperkt gebruik.` }),
];

const ja: FaqFactory[] = [
  (name) => ({ q: `${name} は無料ですか？`, a: `はい。Konver は誰でも無料です。無料ユーザーは ${name} を 1 日数回まで、ファイルサイズ制限ありで利用可。Pro（月 12 ユーロ）は無制限、より大きなファイル、広告なしです。` }),
  () => ({ q: `ファイルは保存されますか？`, a: `ファイルは一時的な場所で処理され、通常 1 時間以内に自動削除されます。コンテンツをモデル学習に使用することはありません。` }),
  (name, formats) => ({ q: `${name} はどの形式に対応していますか？`, a: `${name} は ${formats} に対応します。別の形式が必要な場合は、先にコンバーターを使ってからこのツールに戻ってください。` }),
  () => ({ q: `透かしはありますか？`, a: `テキスト出力（SRT、VTT、TXT）に透かしはありません。動画に字幕を焼き込む場合、無料ユーザーには小さな透かしが入ります。Pro なら削除されます。` }),
  () => ({ q: `登録は必要ですか？`, a: `単発利用なら不要です。登録すると 1 日あたりの利用回数が少し増え、履歴が見られます。Pro で無制限利用が解放されます。` }),
];

const zh: FaqFactory[] = [
  (name) => ({ q: `${name} 是免费的吗?`, a: `是的,Konver 对所有人免费。免费用户每天可使用 ${name} 数次,有文件大小限制。Pro 用户(€12/月)享有无限使用、更大文件、无广告。` }),
  () => ({ q: `你们会存储我的文件吗?`, a: `文件在临时位置处理,通常在 1 小时内自动删除。我们绝不使用您的内容训练模型。` }),
  (name, formats) => ({ q: `${name} 支持哪些格式?`, a: `${name} 支持 ${formats}。如果需要其他格式,请先使用我们的转换器,然后再回到本工具。` }),
  () => ({ q: `会有水印吗?`, a: `纯文本输出(SRT、VTT、TXT)从不带水印。免费用户在烧录字幕到视频时会有小水印,Pro 移除水印。` }),
  () => ({ q: `需要注册吗?`, a: `偶尔使用无需账户。注册可每日多几次使用,并保留历史记录。Pro 解锁无限使用。` }),
];

const ko: FaqFactory[] = [
  (name) => ({ q: `${name} 는 무료인가요?`, a: `네. Konver 는 모두에게 무료입니다. 무료 사용자는 ${name} 를 하루 몇 번, 파일 크기 제한 하에 사용할 수 있습니다. Pro(월 12유로)는 무제한 사용, 더 큰 파일, 광고 없음.` }),
  () => ({ q: `파일을 저장하나요?`, a: `파일은 임시 위치에서 처리되어 짧은 시간 내(보통 1시간)에 자동 삭제됩니다. 콘텐츠를 모델 학습에 사용하지 않습니다.` }),
  (name, formats) => ({ q: `${name} 는 어떤 형식을 지원하나요?`, a: `${name} 는 ${formats} 를 지원합니다. 다른 형식이 필요하면 먼저 변환기를 사용한 뒤 이 도구로 돌아오세요.` }),
  () => ({ q: `워터마크가 있나요?`, a: `텍스트 출력(SRT, VTT, TXT)에는 워터마크가 없습니다. 영상에 자막을 인코딩하면 무료 사용자에게는 작은 워터마크가 들어갑니다. Pro 는 제거됩니다.` }),
  () => ({ q: `가입해야 하나요?`, a: `간헐적 사용에는 계정이 필요 없습니다. 가입하면 하루 몇 번 더 사용할 수 있고 기록이 남습니다. Pro 는 무제한을 잠금 해제합니다.` }),
];

const ar: FaqFactory[] = [
  (name) => ({ q: `هل ${name} مجاني؟`, a: `نعم. Konver مجاني للجميع. يمكن للمستخدم المجاني تشغيل ${name} عدة مرات يوميًا مع حد لحجم الملف. Pro (12 يورو/شهر) يمنح استخدامًا غير محدود، ملفات أكبر، وبلا إعلانات.` }),
  () => ({ q: `هل تحتفظون بملفاتي؟`, a: `تُعالج الملفات في موقع مؤقت وتُحذف تلقائيًا خلال فترة قصيرة (عادةً ساعة واحدة). لا نستخدم محتواك مطلقًا لتدريب النماذج.` }),
  (name, formats) => ({ q: `ما الصيغ التي يقبلها ${name}؟`, a: `${name} يقبل ${formats}. إن احتجت صيغة أخرى، استخدم محوّلاتنا أولًا ثم عُد إلى هذه الأداة.` }),
  () => ({ q: `هل توجد علامة مائية؟`, a: `المخرجات النصية (SRT، VTT، TXT) لا تحوي علامة مائية أبدًا. عند حرق الترجمة في الفيديو، تظهر علامة صغيرة للمستخدم المجاني فقط. Pro يزيلها.` }),
  () => ({ q: `هل أحتاج إلى التسجيل؟`, a: `لا حاجة لحساب للاستخدام العرضي. التسجيل يمنحك بضع استخدامات إضافية يوميًا وسجلًا. Pro يفتح الاستخدام بلا حدود.` }),
];

const ru: FaqFactory[] = [
  (name) => ({ q: `${name} бесплатно?`, a: `Да. Konver бесплатен для всех. Бесплатные пользователи могут запускать ${name} несколько раз в день с лимитом на размер файла. Pro (12 €/мес) даёт безлимит, большие файлы и без рекламы.` }),
  () => ({ q: `Храните ли вы мои файлы?`, a: `Файлы обрабатываются во временном хранилище и автоматически удаляются в течение короткого окна (обычно 1 час). Мы никогда не используем ваш контент для обучения моделей.` }),
  (name, formats) => ({ q: `Какие форматы принимает ${name}?`, a: `${name} принимает ${formats}. Если нужен другой формат, сначала воспользуйтесь нашими конвертерами и вернитесь к этому инструменту.` }),
  () => ({ q: `Есть ли водяной знак?`, a: `Текстовые выходы (SRT, VTT, TXT) никогда не имеют водяного знака. У бесплатных пользователей при вшивании субтитров в видео появляется маленький знак. Pro его убирает.` }),
  () => ({ q: `Нужно ли регистрироваться?`, a: `Для разового использования аккаунт не нужен. Регистрация даёт несколько дополнительных запусков в день и историю. Pro открывает безлимит.` }),
];

const hi: FaqFactory[] = [
  (name) => ({ q: `क्या ${name} मुफ़्त है?`, a: `हाँ। Konver सभी के लिए मुफ़्त है। मुफ़्त उपयोगकर्ता ${name} को रोज़ कुछ बार उपयोग कर सकते हैं, फ़ाइल आकार सीमा के साथ। Pro (€12/माह) असीमित उपयोग, बड़ी फ़ाइलें, और कोई विज्ञापन नहीं देता है।` }),
  () => ({ q: `क्या आप मेरी फ़ाइलें संग्रहीत करते हैं?`, a: `फ़ाइलें एक अस्थायी स्थान पर प्रोसेस होती हैं और थोड़े समय में (आमतौर पर 1 घंटे के भीतर) स्वचालित रूप से हटा दी जाती हैं। हम कभी भी आपकी सामग्री का उपयोग मॉडल प्रशिक्षण के लिए नहीं करते।` }),
  (name, formats) => ({ q: `${name} किन प्रारूपों को स्वीकार करता है?`, a: `${name} ${formats} स्वीकार करता है. अगर आपको कोई और प्रारूप चाहिए, पहले हमारे कनवर्टर्स का उपयोग करें फिर इस टूल पर वापस आएँ।` }),
  () => ({ q: `क्या वॉटरमार्क होता है?`, a: `केवल-टेक्स्ट आउटपुट (SRT, VTT, TXT) पर कभी वॉटरमार्क नहीं होता। मुफ़्त उपयोगकर्ताओं को वीडियो में सबटाइटल बर्न करते समय एक छोटा वॉटरमार्क मिलता है। Pro इसे हटा देता है।` }),
  () => ({ q: `क्या मुझे साइन अप करना होगा?`, a: `कभी-कभार उपयोग के लिए कोई खाता ज़रूरी नहीं है। साइन अप करने से रोज़ कुछ अतिरिक्त रन और एक इतिहास मिलता है। Pro असीमित उपयोग खोल देता है।` }),
];

// ── Client-tool FAQs ───────────────────────────────────────────────────────
// In-browser tools (kind: "client") never upload, have no per-day cap and no
// watermark, so the file/subtitle template above is wrong for them — it was
// producing nonsense like "accepte the supported formats" + watermark/SRT
// answers on pages like the Password Generator. These mirror the English
// codeFaqs() and ignore the `formats` argument.
const enC: FaqFactory[] = [
  (name) => ({ q: `Is ${name} free?`, a: `Yes — completely free and unlimited, with no account required. It runs entirely in your browser, so there are no usage limits.` }),
  (name) => ({ q: `Are my files or data uploaded?`, a: `No. ${name} runs 100% locally in your browser. Your data never leaves your device and is never sent to a server.` }),
  () => ({ q: `Does it work offline?`, a: `Once the page has loaded, processing runs on your device, so it keeps working even with a flaky connection.` }),
  () => ({ q: `Is there a size limit?`, a: `There's no hard limit — you're only bound by your device's memory. Very large inputs may be slower to process.` }),
  (name) => ({ q: `Do I need to install anything?`, a: `No. ${name} is a web tool — just open the page and start. Nothing to download or install.` }),
];
const frC: FaqFactory[] = [
  (name) => ({ q: `${name} est-il gratuit ?`, a: `Oui — entièrement gratuit et illimité, sans compte. Tout s'exécute dans votre navigateur, donc aucune limite d'utilisation.` }),
  (name) => ({ q: `Mes fichiers ou données sont-ils envoyés ?`, a: `Non. ${name} fonctionne 100 % localement dans votre navigateur. Vos données ne quittent jamais votre appareil et ne sont jamais envoyées à un serveur.` }),
  () => ({ q: `Fonctionne-t-il hors ligne ?`, a: `Une fois la page chargée, le traitement se fait sur votre appareil : il continue de fonctionner même avec une connexion instable.` }),
  () => ({ q: `Y a-t-il une limite de taille ?`, a: `Aucune limite stricte — vous n'êtes limité que par la mémoire de votre appareil. Les entrées très volumineuses peuvent être plus lentes.` }),
  (name) => ({ q: `Dois-je installer quelque chose ?`, a: `Non. ${name} est un outil web — ouvrez la page et c'est parti. Rien à télécharger ni à installer.` }),
];
const esC: FaqFactory[] = [
  (name) => ({ q: `¿${name} es gratis?`, a: `Sí — totalmente gratis e ilimitado, sin cuenta. Todo se ejecuta en tu navegador, así que no hay límites de uso.` }),
  (name) => ({ q: `¿Se suben mis archivos o datos?`, a: `No. ${name} funciona 100 % localmente en tu navegador. Tus datos nunca salen de tu dispositivo ni se envían a un servidor.` }),
  () => ({ q: `¿Funciona sin conexión?`, a: `Una vez cargada la página, el proceso ocurre en tu dispositivo, así que sigue funcionando incluso con una conexión inestable.` }),
  () => ({ q: `¿Hay límite de tamaño?`, a: `Sin límite estricto — solo te limita la memoria de tu dispositivo. Las entradas muy grandes pueden ser más lentas.` }),
  (name) => ({ q: `¿Necesito instalar algo?`, a: `No. ${name} es una herramienta web — abre la página y empieza. Nada que descargar ni instalar.` }),
];
const ptC: FaqFactory[] = [
  (name) => ({ q: `${name} é grátis?`, a: `Sim — totalmente grátis e ilimitado, sem conta. Tudo roda no seu navegador, então não há limites de uso.` }),
  (name) => ({ q: `Meus arquivos ou dados são enviados?`, a: `Não. ${name} roda 100% localmente no seu navegador. Seus dados nunca saem do seu dispositivo nem são enviados a um servidor.` }),
  () => ({ q: `Funciona offline?`, a: `Depois que a página carrega, o processamento ocorre no dispositivo, então continua funcionando mesmo com conexão instável.` }),
  () => ({ q: `Há limite de tamanho?`, a: `Sem limite rígido — você é limitado apenas pela memória do dispositivo. Entradas muito grandes podem ser mais lentas.` }),
  (name) => ({ q: `Preciso instalar algo?`, a: `Não. ${name} é uma ferramenta web — abra a página e comece. Nada para baixar ou instalar.` }),
];
const deC: FaqFactory[] = [
  (name) => ({ q: `Ist ${name} kostenlos?`, a: `Ja — komplett kostenlos und unbegrenzt, ohne Konto. Alles läuft in deinem Browser, also keine Nutzungslimits.` }),
  (name) => ({ q: `Werden meine Dateien oder Daten hochgeladen?`, a: `Nein. ${name} läuft zu 100 % lokal in deinem Browser. Deine Daten verlassen nie dein Gerät und werden nie an einen Server gesendet.` }),
  () => ({ q: `Funktioniert es offline?`, a: `Sobald die Seite geladen ist, läuft die Verarbeitung auf dem Gerät — auch bei wackliger Verbindung.` }),
  () => ({ q: `Gibt es ein Größenlimit?`, a: `Kein hartes Limit — nur der Arbeitsspeicher deines Geräts begrenzt dich. Sehr große Eingaben können langsamer sein.` }),
  (name) => ({ q: `Muss ich etwas installieren?`, a: `Nein. ${name} ist ein Web-Tool — Seite öffnen und loslegen. Nichts herunterzuladen oder zu installieren.` }),
];
const itC: FaqFactory[] = [
  (name) => ({ q: `${name} è gratis?`, a: `Sì — completamente gratis e illimitato, senza account. Tutto gira nel tuo browser, quindi nessun limite d'uso.` }),
  (name) => ({ q: `I miei file o dati vengono caricati?`, a: `No. ${name} gira al 100% localmente nel tuo browser. I tuoi dati non lasciano mai il dispositivo e non vengono mai inviati a un server.` }),
  () => ({ q: `Funziona offline?`, a: `Una volta caricata la pagina, l'elaborazione avviene sul dispositivo, quindi continua a funzionare anche con una connessione instabile.` }),
  () => ({ q: `C'è un limite di dimensione?`, a: `Nessun limite rigido — sei vincolato solo dalla memoria del dispositivo. Input molto grandi possono essere più lenti.` }),
  (name) => ({ q: `Devo installare qualcosa?`, a: `No. ${name} è uno strumento web — apri la pagina e inizia. Niente da scaricare o installare.` }),
];
const nlC: FaqFactory[] = [
  (name) => ({ q: `Is ${name} gratis?`, a: `Ja — volledig gratis en onbeperkt, zonder account. Alles draait in je browser, dus geen gebruikslimieten.` }),
  (name) => ({ q: `Worden mijn bestanden of gegevens geüpload?`, a: `Nee. ${name} draait 100% lokaal in je browser. Je gegevens verlaten nooit je apparaat en worden nooit naar een server gestuurd.` }),
  () => ({ q: `Werkt het offline?`, a: `Zodra de pagina is geladen, draait de verwerking op je apparaat, dus het blijft werken zelfs bij een wankele verbinding.` }),
  () => ({ q: `Is er een groottelimiet?`, a: `Geen harde limiet — je wordt alleen beperkt door het geheugen van je apparaat. Erg grote invoer kan trager zijn.` }),
  (name) => ({ q: `Moet ik iets installeren?`, a: `Nee. ${name} is een webtool — open de pagina en begin. Niets te downloaden of installeren.` }),
];
const jaC: FaqFactory[] = [
  (name) => ({ q: `${name} は無料ですか？`, a: `はい — 完全無料で無制限、アカウント不要。すべてブラウザ内で動作するため、利用制限はありません。` }),
  (name) => ({ q: `ファイルやデータはアップロードされますか？`, a: `いいえ。${name} は 100% ブラウザ内でローカルに動作します。データが端末を離れることはなく、サーバーに送信されることもありません。` }),
  () => ({ q: `オフラインで動作しますか？`, a: `ページの読み込み後は端末上で処理されるため、接続が不安定でも動作し続けます。` }),
  () => ({ q: `サイズ制限はありますか？`, a: `厳密な制限はありません。端末のメモリにのみ依存します。非常に大きな入力は処理が遅くなることがあります。` }),
  (name) => ({ q: `インストールは必要ですか？`, a: `いいえ。${name} はウェブツールです。ページを開くだけで始められ、ダウンロードやインストールは不要です。` }),
];
const zhC: FaqFactory[] = [
  (name) => ({ q: `${name} 是免费的吗?`, a: `是的 — 完全免费且无限制,无需账户。一切都在您的浏览器中运行,因此没有使用限制。` }),
  (name) => ({ q: `我的文件或数据会被上传吗?`, a: `不会。${name} 100% 在您的浏览器本地运行。您的数据从不离开设备,也绝不发送到服务器。` }),
  () => ({ q: `可以离线使用吗?`, a: `页面加载后,处理在设备上进行,因此即使连接不稳定也能继续工作。` }),
  () => ({ q: `有大小限制吗?`, a: `没有硬性限制 — 仅受设备内存限制。非常大的输入处理会更慢。` }),
  (name) => ({ q: `需要安装什么吗?`, a: `不需要。${name} 是网页工具 — 打开页面即可开始。无需下载或安装。` }),
];
const koC: FaqFactory[] = [
  (name) => ({ q: `${name} 는 무료인가요?`, a: `네 — 완전 무료이며 무제한, 계정이 필요 없습니다. 모든 처리가 브라우저에서 실행되어 사용 제한이 없습니다.` }),
  (name) => ({ q: `내 파일이나 데이터가 업로드되나요?`, a: `아니요. ${name} 는 100% 브라우저에서 로컬로 실행됩니다. 데이터는 기기를 떠나지 않으며 서버로 전송되지 않습니다.` }),
  () => ({ q: `오프라인에서 작동하나요?`, a: `페이지가 로드되면 기기에서 처리되므로 연결이 불안정해도 계속 작동합니다.` }),
  () => ({ q: `크기 제한이 있나요?`, a: `엄격한 제한은 없습니다. 기기 메모리에만 영향을 받습니다. 매우 큰 입력은 처리가 느릴 수 있습니다.` }),
  (name) => ({ q: `설치가 필요한가요?`, a: `아니요. ${name} 는 웹 도구입니다. 페이지를 열면 바로 시작되며 다운로드나 설치가 필요 없습니다.` }),
];
const arC: FaqFactory[] = [
  (name) => ({ q: `هل ${name} مجاني؟`, a: `نعم — مجاني تمامًا وغير محدود، بلا حساب. كل شيء يعمل داخل متصفحك، لذا لا قيود على الاستخدام.` }),
  (name) => ({ q: `هل تُرفع ملفاتي أو بياناتي؟`, a: `لا. ${name} يعمل محليًا بنسبة 100% داخل متصفحك. بياناتك لا تغادر جهازك أبدًا ولا تُرسل إلى أي خادم.` }),
  () => ({ q: `هل يعمل دون اتصال؟`, a: `بمجرد تحميل الصفحة، تتم المعالجة على جهازك، لذا يستمر العمل حتى مع اتصال غير مستقر.` }),
  () => ({ q: `هل هناك حد للحجم؟`, a: `لا حد صارم — أنت مقيد فقط بذاكرة جهازك. قد تكون المدخلات الكبيرة جدًا أبطأ.` }),
  (name) => ({ q: `هل أحتاج إلى تثبيت شيء؟`, a: `لا. ${name} أداة ويب — افتح الصفحة وابدأ. لا شيء للتنزيل أو التثبيت.` }),
];
const ruC: FaqFactory[] = [
  (name) => ({ q: `${name} бесплатно?`, a: `Да — полностью бесплатно и без ограничений, без аккаунта. Всё выполняется в вашем браузере, поэтому лимитов нет.` }),
  (name) => ({ q: `Загружаются ли мои файлы или данные?`, a: `Нет. ${name} работает на 100% локально в вашем браузере. Ваши данные никогда не покидают устройство и не отправляются на сервер.` }),
  () => ({ q: `Работает ли офлайн?`, a: `После загрузки страницы обработка идёт на устройстве, поэтому всё работает даже при нестабильном соединении.` }),
  () => ({ q: `Есть ли ограничение размера?`, a: `Жёсткого лимита нет — вас ограничивает только память устройства. Очень большие данные могут обрабатываться медленнее.` }),
  (name) => ({ q: `Нужно ли что-то устанавливать?`, a: `Нет. ${name} — это веб-инструмент: откройте страницу и начните. Ничего скачивать или устанавливать не нужно.` }),
];
const hiC: FaqFactory[] = [
  (name) => ({ q: `क्या ${name} मुफ़्त है?`, a: `हाँ — पूरी तरह मुफ़्त और असीमित, बिना खाते के। सब कुछ आपके ब्राउज़र में चलता है, इसलिए कोई उपयोग सीमा नहीं।` }),
  (name) => ({ q: `क्या मेरी फ़ाइलें या डेटा अपलोड होते हैं?`, a: `नहीं। ${name} आपके ब्राउज़र में 100% स्थानीय रूप से चलता है। आपका डेटा कभी आपका डिवाइस नहीं छोड़ता और किसी सर्वर पर नहीं भेजा जाता।` }),
  () => ({ q: `क्या यह ऑफ़लाइन काम करता है?`, a: `पेज लोड होने के बाद प्रोसेसिंग आपके डिवाइस पर होती है, इसलिए अस्थिर कनेक्शन पर भी काम करता रहता है।` }),
  () => ({ q: `क्या आकार की कोई सीमा है?`, a: `कोई सख़्त सीमा नहीं — आप केवल अपने डिवाइस की मेमोरी से बंधे हैं। बहुत बड़े इनपुट धीमे हो सकते हैं।` }),
  (name) => ({ q: `क्या मुझे कुछ इंस्टॉल करना होगा?`, a: `नहीं। ${name} एक वेब टूल है — पेज खोलें और शुरू करें। कुछ डाउनलोड या इंस्टॉल करने की ज़रूरत नहीं।` }),
];

// Partial<>: missing locales fall back to the English FAQ templates.
const FILE_ALL: Partial<Record<Locale, FaqFactory[]>> = { en, fr, es, pt, de, it, nl, ja, zh, ko, ar, ru, hi };
const CLIENT_ALL: Partial<Record<Locale, FaqFactory[]>> = { en: enC, fr: frC, es: esC, pt: ptC, de: deC, it: itC, nl: nlC, ja: jaC, zh: zhC, ko: koC, ar: arC, ru: ruC, hi: hiC };

/** "client" = in-browser tool (no upload, no quota, no watermark, no formats). */
export type FaqVariant = "file" | "client";

export function getLocalisedFaqs(
  locale: Locale,
  name: string,
  formats: string,
  variant: FaqVariant = "file",
): ToolFaq[] {
  const map = variant === "client" ? CLIENT_ALL : FILE_ALL;
  const set = map[locale] ?? (variant === "client" ? enC : en);
  return set.map((fn) => fn(name, formats));
}
