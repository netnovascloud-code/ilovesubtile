"use client";

import { useCallback, useState } from "react";
import { ShieldCheck, ShieldAlert, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

// 100% client-side breach check via the HaveIBeenPwned k-anonymity API.
// We hash the password locally with SHA-1, send only the first 5 hex chars
// of the hash, and match the returned suffixes locally. The full password
// (and full hash) never leave the browser.
type Result = { count: number };

const T: Record<string, Record<string, string>> = {
  en: {
    label: "Password to check",
    placeholder: "Type a password to test…",
    ariaHide: "Hide",
    ariaShow: "Show",
    checkingBtn: "Checking…",
    checkBtn: "Check",
    pwnedTitle: "Compromised — don't use this password",
    pwnedTimeSingular: "It appeared {n} time in known data breaches.",
    pwnedTimePlural: "It appeared {n} times in known data breaches.",
    safeTitle: "Safe — never seen in a breach",
    safeBody: "This password isn't in the HaveIBeenPwned breach corpus.",
    pwnedAdvice: "Change it everywhere you used it and pick a unique password (a password manager helps). A leaked password is on attacker credential-stuffing lists even if it looks strong.",
    errorNetwork: "Could not reach the breach database. Please try again.",
    footer: "Your password never leaves your browser. We hash it locally with SHA-1 and query HaveIBeenPwned using k-anonymity — only the first 5 characters of the hash are sent, never the password or full hash.",
  },
  fr: {
    label: "Mot de passe à vérifier",
    placeholder: "Tapez un mot de passe à tester…",
    ariaHide: "Masquer",
    ariaShow: "Afficher",
    checkingBtn: "Vérification…",
    checkBtn: "Vérifier",
    pwnedTitle: "Compromis — n'utilisez pas ce mot de passe",
    pwnedTimeSingular: "Il est apparu {n} fois dans des fuites de données connues.",
    pwnedTimePlural: "Il est apparu {n} fois dans des fuites de données connues.",
    safeTitle: "Sûr — jamais vu dans une fuite",
    safeBody: "Ce mot de passe ne figure pas dans la base de fuites HaveIBeenPwned.",
    pwnedAdvice: "Changez-le partout où vous l'avez utilisé et choisissez un mot de passe unique (un gestionnaire de mots de passe aide). Un mot de passe divulgué figure sur les listes de credential stuffing des attaquants même s'il semble fort.",
    errorNetwork: "Impossible d'accéder à la base de données de violations. Veuillez réessayer.",
    footer: "Votre mot de passe ne quitte jamais votre navigateur. Nous le hachons localement avec SHA-1 et interrogeons HaveIBeenPwned via la k-anonymat — seuls les 5 premiers caractères du hachage sont envoyés, jamais le mot de passe ni le hachage complet.",
  },
  es: {
    label: "Contraseña a comprobar",
    placeholder: "Escribe una contraseña para probar…",
    ariaHide: "Ocultar",
    ariaShow: "Mostrar",
    checkingBtn: "Comprobando…",
    checkBtn: "Comprobar",
    pwnedTitle: "Comprometida — no uses esta contraseña",
    pwnedTimeSingular: "Apareció {n} vez en filtraciones de datos conocidas.",
    pwnedTimePlural: "Apareció {n} veces en filtraciones de datos conocidas.",
    safeTitle: "Segura — nunca vista en una filtración",
    safeBody: "Esta contraseña no está en el corpus de filtraciones de HaveIBeenPwned.",
    pwnedAdvice: "Cámbiala en todos los sitios donde la usaste y elige una contraseña única (un gestor de contraseñas ayuda). Una contraseña filtrada está en las listas de relleno de credenciales de los atacantes aunque parezca fuerte.",
    errorNetwork: "No se pudo acceder a la base de datos de filtraciones. Por favor inténtalo de nuevo.",
    footer: "Tu contraseña nunca sale de tu navegador. La hasheamos localmente con SHA-1 y consultamos HaveIBeenPwned mediante k-anonymity — solo se envían los primeros 5 caracteres del hash, nunca la contraseña ni el hash completo.",
  },
  pt: {
    label: "Senha a verificar",
    placeholder: "Digite uma senha para testar…",
    ariaHide: "Ocultar",
    ariaShow: "Mostrar",
    checkingBtn: "Verificando…",
    checkBtn: "Verificar",
    pwnedTitle: "Comprometida — não use esta senha",
    pwnedTimeSingular: "Apareceu {n} vez em violações de dados conhecidas.",
    pwnedTimePlural: "Apareceu {n} vezes em violações de dados conhecidas.",
    safeTitle: "Segura — nunca vista em uma violação",
    safeBody: "Esta senha não está no corpus de violações do HaveIBeenPwned.",
    pwnedAdvice: "Altere-a em todos os lugares onde a utilizou e escolha uma senha única (um gerenciador de senhas ajuda). Uma senha vazada está nas listas de credential stuffing dos atacantes mesmo que pareça forte.",
    errorNetwork: "Não foi possível acessar o banco de dados de violações. Tente novamente.",
    footer: "Sua senha nunca sai do seu navegador. Nós a hashamos localmente com SHA-1 e consultamos o HaveIBeenPwned usando k-anonymity — apenas os primeiros 5 caracteres do hash são enviados, nunca a senha ou o hash completo.",
  },
  de: {
    label: "Zu prüfendes Passwort",
    placeholder: "Passwort zum Testen eingeben…",
    ariaHide: "Verbergen",
    ariaShow: "Anzeigen",
    checkingBtn: "Wird geprüft…",
    checkBtn: "Prüfen",
    pwnedTitle: "Kompromittiert — verwende dieses Passwort nicht",
    pwnedTimeSingular: "Es erschien {n} Mal in bekannten Datenlecks.",
    pwnedTimePlural: "Es erschien {n} Mal in bekannten Datenlecks.",
    safeTitle: "Sicher — noch nie in einem Datenleck gesehen",
    safeBody: "Dieses Passwort ist nicht im HaveIBeenPwned-Datenleck-Korpus.",
    pwnedAdvice: "Ändere es überall, wo du es verwendet hast, und wähle ein einzigartiges Passwort (ein Passwortmanager hilft). Ein geleaktes Passwort steht auf den Credential-Stuffing-Listen von Angreifern, auch wenn es stark wirkt.",
    errorNetwork: "Die Datenleck-Datenbank konnte nicht erreicht werden. Bitte erneut versuchen.",
    footer: "Dein Passwort verlässt nie deinen Browser. Wir hashen es lokal mit SHA-1 und befragen HaveIBeenPwned per k-Anonymität — nur die ersten 5 Zeichen des Hashes werden gesendet, nie das Passwort oder der vollständige Hash.",
  },
  it: {
    label: "Password da controllare",
    placeholder: "Digita una password da testare…",
    ariaHide: "Nascondi",
    ariaShow: "Mostra",
    checkingBtn: "Verifica in corso…",
    checkBtn: "Controlla",
    pwnedTitle: "Compromessa — non usare questa password",
    pwnedTimeSingular: "È apparsa {n} volta in violazioni di dati note.",
    pwnedTimePlural: "È apparsa {n} volte in violazioni di dati note.",
    safeTitle: "Sicura — mai vista in una violazione",
    safeBody: "Questa password non è nel corpus di violazioni di HaveIBeenPwned.",
    pwnedAdvice: "Cambiala ovunque l'hai usata e scegli una password unica (un gestore di password aiuta). Una password trapelata è nelle liste di credential stuffing degli attaccanti anche se sembra robusta.",
    errorNetwork: "Impossibile raggiungere il database delle violazioni. Riprova.",
    footer: "La tua password non lascia mai il browser. La hashelemo localmente con SHA-1 e interroghiamo HaveIBeenPwned tramite k-anonymity — vengono inviati solo i primi 5 caratteri dell'hash, mai la password o l'hash completo.",
  },
  nl: {
    label: "Te controleren wachtwoord",
    placeholder: "Typ een wachtwoord om te testen…",
    ariaHide: "Verbergen",
    ariaShow: "Tonen",
    checkingBtn: "Controleren…",
    checkBtn: "Controleer",
    pwnedTitle: "Gecompromitteerd — gebruik dit wachtwoord niet",
    pwnedTimeSingular: "Het verscheen {n} keer in bekende datalekken.",
    pwnedTimePlural: "Het verscheen {n} keer in bekende datalekken.",
    safeTitle: "Veilig — nooit gezien in een datalek",
    safeBody: "Dit wachtwoord staat niet in het HaveIBeenPwned-lekkenbestand.",
    pwnedAdvice: "Verander het overal waar je het hebt gebruikt en kies een uniek wachtwoord (een wachtwoordmanager helpt). Een gelekt wachtwoord staat op de credential-stuffinglijsten van aanvallers, ook als het sterk lijkt.",
    errorNetwork: "Kon de lekdatabase niet bereiken. Probeer het opnieuw.",
    footer: "Jouw wachtwoord verlaat nooit je browser. We hashen het lokaal met SHA-1 en raadplegen HaveIBeenPwned via k-anonymity — alleen de eerste 5 tekens van de hash worden verzonden, nooit het wachtwoord of de volledige hash.",
  },
  ja: {
    label: "確認するパスワード",
    placeholder: "テストするパスワードを入力…",
    ariaHide: "非表示",
    ariaShow: "表示",
    checkingBtn: "確認中…",
    checkBtn: "確認",
    pwnedTitle: "漏洩済み — このパスワードは使用しないでください",
    pwnedTimeSingular: "既知のデータ侵害で{n}回確認されました。",
    pwnedTimePlural: "既知のデータ侵害で{n}回確認されました。",
    safeTitle: "安全 — 侵害で見つかりませんでした",
    safeBody: "このパスワードはHaveIBeenPwnedの侵害データベースにありません。",
    pwnedAdvice: "使用したすべての場所でパスワードを変更し、ユニークなパスワードを設定してください（パスワードマネージャーが役立ちます）。漏洩したパスワードは強そうに見えても攻撃者のクレデンシャルスタッフィングリストに載っています。",
    errorNetwork: "侵害データベースに到達できませんでした。再試行してください。",
    footer: "パスワードはブラウザから出ません。SHA-1でローカルにハッシュ化し、k-匿名性を使用してHaveIBeenPwnedに問い合わせます — ハッシュの最初の5文字のみ送信され、パスワードや完全なハッシュは送信されません。",
  },
  zh: {
    label: "要检查的密码",
    placeholder: "输入要测试的密码…",
    ariaHide: "隐藏",
    ariaShow: "显示",
    checkingBtn: "检查中…",
    checkBtn: "检查",
    pwnedTitle: "已泄露 — 请勿使用此密码",
    pwnedTimeSingular: "在已知数据泄露中出现了{n}次。",
    pwnedTimePlural: "在已知数据泄露中出现了{n}次。",
    safeTitle: "安全 — 从未在泄露中出现",
    safeBody: "此密码不在HaveIBeenPwned泄露数据库中。",
    pwnedAdvice: "在您使用过它的所有地方更改密码并选择唯一密码（密码管理器有帮助）。泄露的密码即使看起来很强也会出现在攻击者的凭据填充列表中。",
    errorNetwork: "无法访问泄露数据库。请重试。",
    footer: "您的密码永远不会离开您的浏览器。我们在本地用SHA-1对其进行哈希处理，并使用k-anonymity查询HaveIBeenPwned — 只发送哈希的前5个字符，从不发送密码或完整哈希。",
  },
  ko: {
    label: "확인할 비밀번호",
    placeholder: "테스트할 비밀번호를 입력하세요…",
    ariaHide: "숨기기",
    ariaShow: "표시",
    checkingBtn: "확인 중…",
    checkBtn: "확인",
    pwnedTitle: "유출됨 — 이 비밀번호를 사용하지 마세요",
    pwnedTimeSingular: "알려진 데이터 유출에서 {n}번 발견되었습니다.",
    pwnedTimePlural: "알려진 데이터 유출에서 {n}번 발견되었습니다.",
    safeTitle: "안전 — 유출에서 발견된 적 없음",
    safeBody: "이 비밀번호는 HaveIBeenPwned 유출 데이터베이스에 없습니다.",
    pwnedAdvice: "사용한 모든 곳에서 변경하고 고유한 비밀번호를 선택하세요(비밀번호 관리자가 도움이 됩니다). 유출된 비밀번호는 강해 보여도 공격자의 크리덴셜 스터핑 목록에 있습니다.",
    errorNetwork: "유출 데이터베이스에 접근할 수 없습니다. 다시 시도하세요.",
    footer: "비밀번호는 브라우저를 벗어나지 않습니다. SHA-1로 로컬에서 해시하고 k-anonymity를 사용하여 HaveIBeenPwned에 쿼리합니다 — 해시의 처음 5자만 전송되며 비밀번호나 전체 해시는 절대 전송되지 않습니다.",
  },
  ar: {
    label: "كلمة المرور للفحص",
    placeholder: "اكتب كلمة مرور للاختبار…",
    ariaHide: "إخفاء",
    ariaShow: "إظهار",
    checkingBtn: "جارٍ التحقق…",
    checkBtn: "تحقق",
    pwnedTitle: "مخترقة — لا تستخدم كلمة المرور هذه",
    pwnedTimeSingular: "ظهرت {n} مرة في تسريبات بيانات معروفة.",
    pwnedTimePlural: "ظهرت {n} مرة في تسريبات بيانات معروفة.",
    safeTitle: "آمنة — لم تظهر في أي تسريب",
    safeBody: "كلمة المرور هذه غير موجودة في قاعدة بيانات تسريبات HaveIBeenPwned.",
    pwnedAdvice: "غيّرها في كل مكان استخدمتها فيه واختر كلمة مرور فريدة (مدير كلمات المرور يساعد). كلمة المرور المسرّبة موجودة على قوائم حشو بيانات الاعتماد لدى المهاجمين حتى لو بدت قوية.",
    errorNetwork: "تعذّر الوصول إلى قاعدة بيانات التسريبات. يرجى المحاولة مرة أخرى.",
    footer: "كلمة مرورك لا تغادر متصفحك أبدًا. نقوم بتجزئتها محليًا باستخدام SHA-1 واستعلام HaveIBeenPwned بالك-مجهولية — يُرسل فقط أول 5 أحرف من التجزئة، وليس كلمة المرور أو التجزئة الكاملة.",
  },
  ru: {
    label: "Пароль для проверки",
    placeholder: "Введите пароль для проверки…",
    ariaHide: "Скрыть",
    ariaShow: "Показать",
    checkingBtn: "Проверка…",
    checkBtn: "Проверить",
    pwnedTitle: "Скомпрометирован — не используйте этот пароль",
    pwnedTimeSingular: "Встречался {n} раз в известных утечках данных.",
    pwnedTimePlural: "Встречался {n} раз в известных утечках данных.",
    safeTitle: "Безопасен — никогда не встречался в утечках",
    safeBody: "Этого пароля нет в базе утечек HaveIBeenPwned.",
    pwnedAdvice: "Смените его везде, где использовали, и выберите уникальный пароль (менеджер паролей поможет). Утёкший пароль попадает в списки credential stuffing злоумышленников, даже если выглядит сложным.",
    errorNetwork: "Не удалось подключиться к базе утечек. Попробуйте ещё раз.",
    footer: "Ваш пароль никогда не покидает браузер. Мы хешируем его локально с SHA-1 и запрашиваем HaveIBeenPwned через k-анонимность — отправляются только первые 5 символов хеша, никогда пароль или полный хеш.",
  },
  hi: {
    label: "जाँचने के लिए पासवर्ड",
    placeholder: "परीक्षण के लिए पासवर्ड टाइप करें…",
    ariaHide: "छिपाएं",
    ariaShow: "दिखाएं",
    checkingBtn: "जाँच हो रही है…",
    checkBtn: "जाँचें",
    pwnedTitle: "संक्रमित — इस पासवर्ड का उपयोग न करें",
    pwnedTimeSingular: "यह ज्ञात डेटा उल्लंघनों में {n} बार दिखाई दिया।",
    pwnedTimePlural: "यह ज्ञात डेटा उल्लंघनों में {n} बार दिखाई दिया।",
    safeTitle: "सुरक्षित — कभी भी उल्लंघन में नहीं देखा गया",
    safeBody: "यह पासवर्ड HaveIBeenPwned उल्लंघन डेटाबेस में नहीं है।",
    pwnedAdvice: "जहाँ भी उपयोग किया वहाँ बदलें और एक अद्वितीय पासवर्ड चुनें (पासवर्ड मैनेजर मददगार है)। लीक हुआ पासवर्ड मजबूत दिखने पर भी हमलावरों की क्रेडेंशियल स्टफिंग सूचियों में होता है।",
    errorNetwork: "उल्लंघन डेटाबेस तक पहुँच नहीं सकी। कृपया पुनः प्रयास करें।",
    footer: "आपका पासवर्ड कभी भी आपके ब्राउज़र से बाहर नहीं जाता। हम इसे SHA-1 के साथ स्थानीय रूप से हैश करते हैं और k-anonymity का उपयोग करके HaveIBeenPwned से पूछताछ करते हैं — केवल हैश के पहले 5 अक्षर भेजे जाते हैं, कभी पासवर्ड या पूर्ण हैश नहीं।",
  },
  tr: {
    label: "Kontrol edilecek şifre",
    placeholder: "Test etmek için bir şifre yazın…",
    ariaHide: "Gizle",
    ariaShow: "Göster",
    checkingBtn: "Kontrol ediliyor…",
    checkBtn: "Kontrol Et",
    pwnedTitle: "Tehlikeye girdi — bu şifreyi kullanmayın",
    pwnedTimeSingular: "Bilinen veri ihlallerinde {n} kez görüldü.",
    pwnedTimePlural: "Bilinen veri ihlallerinde {n} kez görüldü.",
    safeTitle: "Güvenli — hiçbir ihlalde görülmedi",
    safeBody: "Bu şifre HaveIBeenPwned ihlal veritabanında yok.",
    pwnedAdvice: "Kullandığınız her yerde değiştirin ve benzersiz bir şifre seçin (şifre yöneticisi yardımcı olur). Sızdırılmış bir şifre güçlü görünse de saldırganların kimlik bilgisi doldurma listelerindedir.",
    errorNetwork: "İhlal veritabanına ulaşılamadı. Lütfen tekrar deneyin.",
    footer: "Şifreniz tarayıcınızdan hiçbir zaman çıkmaz. SHA-1 ile yerel olarak hashleyip k-anonimlik kullanarak HaveIBeenPwned'i sorguluyoruz — yalnızca hashin ilk 5 karakteri gönderilir, şifre veya tam hash asla gönderilmez.",
  },
  id: {
    label: "Kata sandi untuk diperiksa",
    placeholder: "Ketik kata sandi untuk diuji…",
    ariaHide: "Sembunyikan",
    ariaShow: "Tampilkan",
    checkingBtn: "Memeriksa…",
    checkBtn: "Periksa",
    pwnedTitle: "Bocor — jangan gunakan kata sandi ini",
    pwnedTimeSingular: "Muncul {n} kali dalam pelanggaran data yang diketahui.",
    pwnedTimePlural: "Muncul {n} kali dalam pelanggaran data yang diketahui.",
    safeTitle: "Aman — belum pernah terlihat dalam pelanggaran",
    safeBody: "Kata sandi ini tidak ada dalam korpus pelanggaran HaveIBeenPwned.",
    pwnedAdvice: "Ubah di semua tempat Anda menggunakannya dan pilih kata sandi unik (pengelola kata sandi membantu). Kata sandi yang bocor ada di daftar credential stuffing penyerang meskipun terlihat kuat.",
    errorNetwork: "Tidak dapat menjangkau database pelanggaran. Coba lagi.",
    footer: "Kata sandi Anda tidak pernah meninggalkan browser Anda. Kami melakukan hash secara lokal dengan SHA-1 dan query HaveIBeenPwned menggunakan k-anonymity — hanya 5 karakter pertama hash yang dikirim, bukan kata sandi atau hash lengkap.",
  },
  vi: {
    label: "Mật khẩu cần kiểm tra",
    placeholder: "Nhập mật khẩu để kiểm tra…",
    ariaHide: "Ẩn",
    ariaShow: "Hiển thị",
    checkingBtn: "Đang kiểm tra…",
    checkBtn: "Kiểm tra",
    pwnedTitle: "Đã bị lộ — đừng dùng mật khẩu này",
    pwnedTimeSingular: "Xuất hiện {n} lần trong các vụ rò rỉ dữ liệu đã biết.",
    pwnedTimePlural: "Xuất hiện {n} lần trong các vụ rò rỉ dữ liệu đã biết.",
    safeTitle: "An toàn — chưa từng thấy trong bất kỳ vụ rò rỉ nào",
    safeBody: "Mật khẩu này không có trong cơ sở dữ liệu rò rỉ của HaveIBeenPwned.",
    pwnedAdvice: "Thay đổi ở tất cả nơi bạn đã sử dụng và chọn mật khẩu duy nhất (trình quản lý mật khẩu sẽ giúp ích). Mật khẩu bị rò rỉ có trong danh sách credential stuffing của kẻ tấn công dù trông có vẻ mạnh.",
    errorNetwork: "Không thể truy cập cơ sở dữ liệu rò rỉ. Vui lòng thử lại.",
    footer: "Mật khẩu của bạn không bao giờ rời khỏi trình duyệt. Chúng tôi hash nó cục bộ với SHA-1 và truy vấn HaveIBeenPwned bằng k-anonymity — chỉ 5 ký tự đầu của hash được gửi, không bao giờ gửi mật khẩu hay hash đầy đủ.",
  },
  sv: {
    label: "Lösenord att kontrollera",
    placeholder: "Skriv ett lösenord att testa…",
    ariaHide: "Dölj",
    ariaShow: "Visa",
    checkingBtn: "Kontrollerar…",
    checkBtn: "Kontrollera",
    pwnedTitle: "Komprometterat — använd inte det här lösenordet",
    pwnedTimeSingular: "Det hittades {n} gång i kända dataintrång.",
    pwnedTimePlural: "Det hittades {n} gånger i kända dataintrång.",
    safeTitle: "Säkert — har aldrig setts i ett intrång",
    safeBody: "Det här lösenordet finns inte i HaveIBeenPwned-intrångsdatabasen.",
    pwnedAdvice: "Byt ut det överallt du använt det och välj ett unikt lösenord (en lösenordshanterare hjälper). Ett läckt lösenord finns på angriparnas credential-stuffinglistor även om det verkar starkt.",
    errorNetwork: "Kunde inte nå intrångsdatabasen. Försök igen.",
    footer: "Ditt lösenord lämnar aldrig din webbläsare. Vi hashar det lokalt med SHA-1 och frågar HaveIBeenPwned med k-anonymitet — bara de första 5 tecknen i hashen skickas, aldrig lösenordet eller hela hashen.",
  },
  pl: {
    label: "Hasło do sprawdzenia",
    placeholder: "Wpisz hasło do przetestowania…",
    ariaHide: "Ukryj",
    ariaShow: "Pokaż",
    checkingBtn: "Sprawdzanie…",
    checkBtn: "Sprawdź",
    pwnedTitle: "Skompromitowane — nie używaj tego hasła",
    pwnedTimeSingular: "Pojawiło się {n} raz w znanych wyciekach danych.",
    pwnedTimePlural: "Pojawiło się {n} razy w znanych wyciekach danych.",
    safeTitle: "Bezpieczne — nigdy nie widziane w wycieku",
    safeBody: "To hasło nie znajduje się w bazie wycieków HaveIBeenPwned.",
    pwnedAdvice: "Zmień je wszędzie gdzie go używałeś i wybierz unikalne hasło (menedżer haseł pomoże). Wykradzione hasło jest na listach credential stuffing atakujących nawet jeśli wydaje się silne.",
    errorNetwork: "Nie można dotrzeć do bazy danych wycieków. Spróbuj ponownie.",
    footer: "Twoje hasło nigdy nie opuszcza przeglądarki. Hashujemy je lokalnie z SHA-1 i pytamy HaveIBeenPwned używając k-anonimowości — wysyłane jest tylko pierwsze 5 znaków hashu, nigdy hasło ani pełny hash.",
  },
  uk: {
    label: "Пароль для перевірки",
    placeholder: "Введіть пароль для тестування…",
    ariaHide: "Приховати",
    ariaShow: "Показати",
    checkingBtn: "Перевірка…",
    checkBtn: "Перевірити",
    pwnedTitle: "Скомпрометований — не використовуйте цей пароль",
    pwnedTimeSingular: "Зустрічався {n} раз у відомих витоках даних.",
    pwnedTimePlural: "Зустрічався {n} разів у відомих витоках даних.",
    safeTitle: "Безпечний — ніколи не зустрічався у витоках",
    safeBody: "Цього пароля немає в базі витоків HaveIBeenPwned.",
    pwnedAdvice: "Змініть його скрізь, де використовували, та оберіть унікальний пароль (менеджер паролів допоможе). Витік пароля потрапляє до списків credential stuffing зловмисників, навіть якщо виглядає складним.",
    errorNetwork: "Не вдалося підключитися до бази витоків. Спробуйте ще раз.",
    footer: "Ваш пароль ніколи не покидає браузер. Ми хешуємо його локально з SHA-1 та запитуємо HaveIBeenPwned через k-анонімність — надсилаються лише перші 5 символів хешу, ніколи пароль або повний хеш.",
  },
  cs: {
    label: "Heslo ke kontrole",
    placeholder: "Napište heslo k otestování…",
    ariaHide: "Skrýt",
    ariaShow: "Zobrazit",
    checkingBtn: "Probíhá kontrola…",
    checkBtn: "Zkontrolovat",
    pwnedTitle: "Kompromitováno — nepoužívejte toto heslo",
    pwnedTimeSingular: "Objevilo se {n}krát ve známých únicích dat.",
    pwnedTimePlural: "Objevilo se {n}krát ve známých únicích dat.",
    safeTitle: "Bezpečné — nikdy neviděno v úniku",
    safeBody: "Toto heslo není v databázi úniků HaveIBeenPwned.",
    pwnedAdvice: "Změňte ho všude, kde jste ho použili, a zvolte jedinečné heslo (správce hesel pomůže). Uniklé heslo je na seznamech credential stuffing útočníků, i když se zdá silné.",
    errorNetwork: "Nelze se připojit k databázi úniků. Zkuste to znovu.",
    footer: "Vaše heslo nikdy neopustí váš prohlížeč. Hashujeme ho lokálně pomocí SHA-1 a dotazujeme HaveIBeenPwned pomocí k-anonymity — odesílá se pouze prvních 5 znaků hashe, nikdy heslo ani celý hash.",
  },
};

async function pwnedCount(password: string): Promise<number> {
  const buf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(password));
  const hex = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  const prefix = hex.slice(0, 5);
  const suffix = hex.slice(5);
  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, { headers: { "Add-Padding": "true" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  for (const line of text.split("\n")) {
    const [s, c] = line.trim().split(":");
    if (s === suffix) return Number(c) || 0;
  }
  return 0;
}

export function PasswordCheckerClient() {
  const s = T[useLocale()] ?? T.en;
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    if (!password || loading) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const count = await pwnedCount(password);
      setResult({ count });
    } catch {
      setError(s.errorNetwork);
    } finally {
      setLoading(false);
    }
  }, [password, loading, s]);

  const pwned = result && result.count > 0;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">{s.label}</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setResult(null); }}
              onKeyDown={(e) => e.key === "Enter" && run()}
              autoComplete="off"
              placeholder={s.placeholder}
              className="w-full rounded-lg border border-ink-200 bg-white py-2.5 pl-3 pr-10 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            <button type="button" onClick={() => setShow((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700" aria-label={show ? s.ariaHide : s.ariaShow}>
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <Button onClick={run} disabled={!password || loading} size="lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            {loading ? s.checkingBtn : s.checkBtn}
          </Button>
        </div>
      </div>

      {result && (
        <div className={cn("rounded-xl border p-5 shadow-card ring-1", pwned ? "border-red-200 bg-red-50/40 ring-red-200" : "border-emerald-200 bg-emerald-50/40 ring-emerald-200")}>
          <div className="flex items-center gap-3">
            {pwned ? <ShieldAlert className="h-8 w-8 text-red-600" /> : <ShieldCheck className="h-8 w-8 text-emerald-600" />}
            <div>
              {pwned ? (
                <>
                  <p className="text-base font-semibold text-red-700">{s.pwnedTitle}</p>
                  <p className="text-xs text-ink-500">
                    {(result.count === 1 ? s.pwnedTimeSingular : s.pwnedTimePlural).replace("{n}", result.count.toLocaleString())}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base font-semibold text-emerald-700">{s.safeTitle}</p>
                  <p className="text-xs text-ink-500">{s.safeBody}</p>
                </>
              )}
            </div>
          </div>
          {pwned && (
            <p className="mt-3 text-xs text-ink-500">{s.pwnedAdvice}</p>
          )}
        </div>
      )}

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <p className="text-xs text-ink-400">{s.footer}</p>
    </div>
  );
}
