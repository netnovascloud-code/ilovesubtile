"use client";

import { useState } from "react";
import { Lock, Unlock, Loader2, Eye, EyeOff, Upload, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { decryptFile, encryptFile } from "@/lib/aes-file";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    modeEncrypt: "Encrypt",
    modeDecrypt: "Decrypt",
    dropEncrypt: "Click to pick a file to encrypt",
    dropDecrypt: "Click to pick a .enc file to decrypt",
    dropHintEncrypt: "Any file type — processed privately in your browser",
    dropHintDecrypt: "Only Konvertools .enc containers",
    passwordLabel: "Password",
    passwordPlaceholderEncrypt: "Pick a strong password",
    passwordPlaceholderDecrypt: "Same password used to encrypt",
    ariaHidePassword: "Hide password",
    ariaShowPassword: "Show password",
    passwordHint: "Use a long, unique password. If you lose it the file is unrecoverable — there is no reset.",
    ariaRemoveFile: "Remove file",
    encryptingBtn: "Encrypting…",
    decryptingBtn: "Decrypting…",
    encryptFileBtn: "Encrypt file",
    decryptFileBtn: "Decrypt file",
    encryptedReady: "Encrypted file ready",
    decryptedReady: "Decrypted file ready",
    download: "Download",
    operationFailed: "Operation failed.",
    footer: "AES-256-GCM, key derived from your password via PBKDF2-SHA-256 (600 000 iterations, OWASP 2023). The original filename is embedded inside the encrypted blob so the recipient gets it back automatically on decryption. 100% in your browser — file and password never leave the device.",
  },
  fr: {
    modeEncrypt: "Chiffrer",
    modeDecrypt: "Déchiffrer",
    dropEncrypt: "Cliquez pour choisir un fichier à chiffrer",
    dropDecrypt: "Cliquez pour choisir un fichier .enc à déchiffrer",
    dropHintEncrypt: "Tout type de fichier — traité en privé dans votre navigateur",
    dropHintDecrypt: "Uniquement les conteneurs .enc de Konvertools",
    passwordLabel: "Mot de passe",
    passwordPlaceholderEncrypt: "Choisissez un mot de passe fort",
    passwordPlaceholderDecrypt: "Même mot de passe utilisé pour le chiffrement",
    ariaHidePassword: "Masquer le mot de passe",
    ariaShowPassword: "Afficher le mot de passe",
    passwordHint: "Utilisez un mot de passe long et unique. Si vous le perdez, le fichier est irrécupérable — il n'y a pas de réinitialisation.",
    ariaRemoveFile: "Supprimer le fichier",
    encryptingBtn: "Chiffrement…",
    decryptingBtn: "Déchiffrement…",
    encryptFileBtn: "Chiffrer le fichier",
    decryptFileBtn: "Déchiffrer le fichier",
    encryptedReady: "Fichier chiffré prêt",
    decryptedReady: "Fichier déchiffré prêt",
    download: "Télécharger",
    operationFailed: "Opération échouée.",
    footer: "AES-256-GCM, clé dérivée de votre mot de passe via PBKDF2-SHA-256 (600 000 itérations, OWASP 2023). Le nom de fichier original est intégré dans le blob chiffré, le destinataire le récupère automatiquement lors du déchiffrement. 100% dans votre navigateur — fichier et mot de passe ne quittent jamais l'appareil.",
  },
  es: {
    modeEncrypt: "Cifrar",
    modeDecrypt: "Descifrar",
    dropEncrypt: "Haz clic para seleccionar un archivo a cifrar",
    dropDecrypt: "Haz clic para seleccionar un archivo .enc a descifrar",
    dropHintEncrypt: "Cualquier tipo de archivo — procesado en privado en tu navegador",
    dropHintDecrypt: "Solo contenedores .enc de Konvertools",
    passwordLabel: "Contraseña",
    passwordPlaceholderEncrypt: "Elige una contraseña fuerte",
    passwordPlaceholderDecrypt: "Misma contraseña usada para cifrar",
    ariaHidePassword: "Ocultar contraseña",
    ariaShowPassword: "Mostrar contraseña",
    passwordHint: "Usa una contraseña larga y única. Si la pierdes, el archivo es irrecuperable — no hay restablecimiento.",
    ariaRemoveFile: "Eliminar archivo",
    encryptingBtn: "Cifrando…",
    decryptingBtn: "Descifrando…",
    encryptFileBtn: "Cifrar archivo",
    decryptFileBtn: "Descifrar archivo",
    encryptedReady: "Archivo cifrado listo",
    decryptedReady: "Archivo descifrado listo",
    download: "Descargar",
    operationFailed: "Operación fallida.",
    footer: "AES-256-GCM, clave derivada de tu contraseña mediante PBKDF2-SHA-256 (600 000 iteraciones, OWASP 2023). El nombre original del archivo está embebido en el blob cifrado, el destinatario lo recupera automáticamente al descifrar. 100% en tu navegador — archivo y contraseña nunca abandonan el dispositivo.",
  },
  pt: {
    modeEncrypt: "Criptografar",
    modeDecrypt: "Descriptografar",
    dropEncrypt: "Clique para selecionar um arquivo para criptografar",
    dropDecrypt: "Clique para selecionar um arquivo .enc para descriptografar",
    dropHintEncrypt: "Qualquer tipo de arquivo — processado privadamente no seu navegador",
    dropHintDecrypt: "Apenas contêineres .enc do Konvertools",
    passwordLabel: "Senha",
    passwordPlaceholderEncrypt: "Escolha uma senha forte",
    passwordPlaceholderDecrypt: "Mesma senha usada para criptografar",
    ariaHidePassword: "Ocultar senha",
    ariaShowPassword: "Mostrar senha",
    passwordHint: "Use uma senha longa e única. Se perdê-la, o arquivo é irrecuperável — não há redefinição.",
    ariaRemoveFile: "Remover arquivo",
    encryptingBtn: "Criptografando…",
    decryptingBtn: "Descriptografando…",
    encryptFileBtn: "Criptografar arquivo",
    decryptFileBtn: "Descriptografar arquivo",
    encryptedReady: "Arquivo criptografado pronto",
    decryptedReady: "Arquivo descriptografado pronto",
    download: "Baixar",
    operationFailed: "Operação falhou.",
    footer: "AES-256-GCM, chave derivada da sua senha via PBKDF2-SHA-256 (600 000 iterações, OWASP 2023). O nome original do arquivo está incorporado no blob criptografado, o destinatário o recupera automaticamente na descriptografia. 100% no seu navegador — arquivo e senha nunca saem do dispositivo.",
  },
  de: {
    modeEncrypt: "Verschlüsseln",
    modeDecrypt: "Entschlüsseln",
    dropEncrypt: "Klicken, um eine zu verschlüsselnde Datei auszuwählen",
    dropDecrypt: "Klicken, um eine .enc-Datei zum Entschlüsseln auszuwählen",
    dropHintEncrypt: "Jeder Dateityp — privat in deinem Browser verarbeitet",
    dropHintDecrypt: "Nur Konvertools .enc-Container",
    passwordLabel: "Passwort",
    passwordPlaceholderEncrypt: "Sicheres Passwort wählen",
    passwordPlaceholderDecrypt: "Gleiches Passwort wie beim Verschlüsseln",
    ariaHidePassword: "Passwort verbergen",
    ariaShowPassword: "Passwort anzeigen",
    passwordHint: "Verwende ein langes, einzigartiges Passwort. Wenn du es verlierst, ist die Datei unwiederbringlich verloren — es gibt kein Zurücksetzen.",
    ariaRemoveFile: "Datei entfernen",
    encryptingBtn: "Wird verschlüsselt…",
    decryptingBtn: "Wird entschlüsselt…",
    encryptFileBtn: "Datei verschlüsseln",
    decryptFileBtn: "Datei entschlüsseln",
    encryptedReady: "Verschlüsselte Datei bereit",
    decryptedReady: "Entschlüsselte Datei bereit",
    download: "Herunterladen",
    operationFailed: "Vorgang fehlgeschlagen.",
    footer: "AES-256-GCM, Schlüssel aus deinem Passwort via PBKDF2-SHA-256 (600 000 Iterationen, OWASP 2023) abgeleitet. Der ursprüngliche Dateiname ist im verschlüsselten Blob eingebettet, sodass der Empfänger ihn beim Entschlüsseln automatisch erhält. 100% in deinem Browser — Datei und Passwort verlassen das Gerät nie.",
  },
  it: {
    modeEncrypt: "Cifra",
    modeDecrypt: "Decifra",
    dropEncrypt: "Clicca per scegliere un file da cifrare",
    dropDecrypt: "Clicca per scegliere un file .enc da decifrare",
    dropHintEncrypt: "Qualsiasi tipo di file — elaborato privatamente nel tuo browser",
    dropHintDecrypt: "Solo container .enc di Konvertools",
    passwordLabel: "Password",
    passwordPlaceholderEncrypt: "Scegli una password robusta",
    passwordPlaceholderDecrypt: "Stessa password usata per cifrare",
    ariaHidePassword: "Nascondi password",
    ariaShowPassword: "Mostra password",
    passwordHint: "Usa una password lunga e unica. Se la perdi il file è irrecuperabile — non esiste ripristino.",
    ariaRemoveFile: "Rimuovi file",
    encryptingBtn: "Cifratura in corso…",
    decryptingBtn: "Decifratura in corso…",
    encryptFileBtn: "Cifra file",
    decryptFileBtn: "Decifra file",
    encryptedReady: "File cifrato pronto",
    decryptedReady: "File decifrato pronto",
    download: "Scarica",
    operationFailed: "Operazione non riuscita.",
    footer: "AES-256-GCM, chiave derivata dalla password tramite PBKDF2-SHA-256 (600 000 iterazioni, OWASP 2023). Il nome del file originale è incorporato nel blob cifrato, il destinatario lo recupera automaticamente alla decifratura. 100% nel tuo browser — file e password non lasciano mai il dispositivo.",
  },
  nl: {
    modeEncrypt: "Versleutelen",
    modeDecrypt: "Ontsleutelen",
    dropEncrypt: "Klik om een te versleutelen bestand te kiezen",
    dropDecrypt: "Klik om een .enc-bestand te kiezen om te ontsleutelen",
    dropHintEncrypt: "Elk bestandstype — privé verwerkt in je browser",
    dropHintDecrypt: "Alleen Konvertools .enc-containers",
    passwordLabel: "Wachtwoord",
    passwordPlaceholderEncrypt: "Kies een sterk wachtwoord",
    passwordPlaceholderDecrypt: "Hetzelfde wachtwoord als bij versleuteling",
    ariaHidePassword: "Wachtwoord verbergen",
    ariaShowPassword: "Wachtwoord tonen",
    passwordHint: "Gebruik een lang, uniek wachtwoord. Als je het verliest, is het bestand onherstelbaar — er is geen hersteloptie.",
    ariaRemoveFile: "Bestand verwijderen",
    encryptingBtn: "Versleutelen…",
    decryptingBtn: "Ontsleutelen…",
    encryptFileBtn: "Bestand versleutelen",
    decryptFileBtn: "Bestand ontsleutelen",
    encryptedReady: "Versleuteld bestand klaar",
    decryptedReady: "Ontsleuteld bestand klaar",
    download: "Downloaden",
    operationFailed: "Bewerking mislukt.",
    footer: "AES-256-GCM, sleutel afgeleid van je wachtwoord via PBKDF2-SHA-256 (600 000 iteraties, OWASP 2023). De oorspronkelijke bestandsnaam is ingebed in de versleutelde blob zodat de ontvanger die automatisch terugkrijgt bij ontsleuteling. 100% in je browser — bestand en wachtwoord verlaten het apparaat nooit.",
  },
  ja: {
    modeEncrypt: "暗号化",
    modeDecrypt: "復号化",
    dropEncrypt: "暗号化するファイルを選択するにはクリック",
    dropDecrypt: "復号化する.encファイルを選択するにはクリック",
    dropHintEncrypt: "あらゆるファイル形式 — ブラウザ内でプライベートに処理",
    dropHintDecrypt: "Konvertools の .enc コンテナのみ",
    passwordLabel: "パスワード",
    passwordPlaceholderEncrypt: "強力なパスワードを選択してください",
    passwordPlaceholderDecrypt: "暗号化に使用したパスワード",
    ariaHidePassword: "パスワードを非表示",
    ariaShowPassword: "パスワードを表示",
    passwordHint: "長くてユニークなパスワードを使用してください。紛失した場合、ファイルは復元不能です — リセット機能はありません。",
    ariaRemoveFile: "ファイルを削除",
    encryptingBtn: "暗号化中…",
    decryptingBtn: "復号化中…",
    encryptFileBtn: "ファイルを暗号化",
    decryptFileBtn: "ファイルを復号化",
    encryptedReady: "暗号化済みファイルの準備完了",
    decryptedReady: "復号化済みファイルの準備完了",
    download: "ダウンロード",
    operationFailed: "操作に失敗しました。",
    footer: "AES-256-GCM、パスワードからPBKDF2-SHA-256（600,000回反復、OWASP 2023）でキーを導出。元のファイル名は暗号化されたBlob内に埋め込まれているため、受信者は復号時に自動的に取得できます。100%ブラウザ内処理 — ファイルとパスワードはデバイスから出ません。",
  },
  zh: {
    modeEncrypt: "加密",
    modeDecrypt: "解密",
    dropEncrypt: "点击选择要加密的文件",
    dropDecrypt: "点击选择要解密的.enc文件",
    dropHintEncrypt: "任何文件类型 — 在您的浏览器中私密处理",
    dropHintDecrypt: "仅限Konvertools .enc容器",
    passwordLabel: "密码",
    passwordPlaceholderEncrypt: "选择一个强密码",
    passwordPlaceholderDecrypt: "与加密时相同的密码",
    ariaHidePassword: "隐藏密码",
    ariaShowPassword: "显示密码",
    passwordHint: "使用长且唯一的密码。如果丢失，文件将无法恢复 — 没有重置选项。",
    ariaRemoveFile: "删除文件",
    encryptingBtn: "加密中…",
    decryptingBtn: "解密中…",
    encryptFileBtn: "加密文件",
    decryptFileBtn: "解密文件",
    encryptedReady: "加密文件已就绪",
    decryptedReady: "解密文件已就绪",
    download: "下载",
    operationFailed: "操作失败。",
    footer: "AES-256-GCM，通过PBKDF2-SHA-256（600,000次迭代，OWASP 2023）从密码派生密钥。原始文件名嵌入在加密数据中，接收方解密时会自动恢复。100%在您的浏览器中处理 — 文件和密码永远不会离开设备。",
  },
  ko: {
    modeEncrypt: "암호화",
    modeDecrypt: "복호화",
    dropEncrypt: "암호화할 파일을 선택하려면 클릭",
    dropDecrypt: "복호화할 .enc 파일을 선택하려면 클릭",
    dropHintEncrypt: "모든 파일 형식 — 브라우저에서 비공개로 처리",
    dropHintDecrypt: "Konvertools .enc 컨테이너만 가능",
    passwordLabel: "비밀번호",
    passwordPlaceholderEncrypt: "강력한 비밀번호를 선택하세요",
    passwordPlaceholderDecrypt: "암호화에 사용한 것과 동일한 비밀번호",
    ariaHidePassword: "비밀번호 숨기기",
    ariaShowPassword: "비밀번호 표시",
    passwordHint: "길고 고유한 비밀번호를 사용하세요. 잃어버리면 파일을 복구할 수 없습니다 — 재설정 기능이 없습니다.",
    ariaRemoveFile: "파일 제거",
    encryptingBtn: "암호화 중…",
    decryptingBtn: "복호화 중…",
    encryptFileBtn: "파일 암호화",
    decryptFileBtn: "파일 복호화",
    encryptedReady: "암호화된 파일 준비 완료",
    decryptedReady: "복호화된 파일 준비 완료",
    download: "다운로드",
    operationFailed: "작업에 실패했습니다.",
    footer: "AES-256-GCM, PBKDF2-SHA-256(600,000 반복, OWASP 2023)을 통해 비밀번호에서 파생된 키. 원본 파일명이 암호화된 데이터에 포함되어 있어 수신자가 복호화 시 자동으로 복원됩니다. 100% 브라우저에서 처리 — 파일과 비밀번호는 장치를 벗어나지 않습니다.",
  },
  ar: {
    modeEncrypt: "تشفير",
    modeDecrypt: "فك التشفير",
    dropEncrypt: "انقر لاختيار ملف للتشفير",
    dropDecrypt: "انقر لاختيار ملف .enc لفك التشفير",
    dropHintEncrypt: "أي نوع ملف — تتم المعالجة بشكل خاص في متصفحك",
    dropHintDecrypt: "حاويات .enc من Konvertools فقط",
    passwordLabel: "كلمة المرور",
    passwordPlaceholderEncrypt: "اختر كلمة مرور قوية",
    passwordPlaceholderDecrypt: "نفس كلمة المرور المستخدمة للتشفير",
    ariaHidePassword: "إخفاء كلمة المرور",
    ariaShowPassword: "إظهار كلمة المرور",
    passwordHint: "استخدم كلمة مرور طويلة وفريدة. إذا فقدتها، يصبح الملف غير قابل للاسترداد — لا يوجد إعادة تعيين.",
    ariaRemoveFile: "إزالة الملف",
    encryptingBtn: "جارٍ التشفير…",
    decryptingBtn: "جارٍ فك التشفير…",
    encryptFileBtn: "تشفير الملف",
    decryptFileBtn: "فك تشفير الملف",
    encryptedReady: "الملف المشفّر جاهز",
    decryptedReady: "الملف المفكوك التشفير جاهز",
    download: "تنزيل",
    operationFailed: "فشلت العملية.",
    footer: "AES-256-GCM، مفتاح مشتق من كلمة مرورك عبر PBKDF2-SHA-256 (600 000 تكرار، OWASP 2023). اسم الملف الأصلي مضمّن داخل الكتلة المشفّرة بحيث يسترده المستقبِل تلقائيًا عند فك التشفير. 100% في متصفحك — الملف وكلمة المرور لا يغادران الجهاز أبدًا.",
  },
  ru: {
    modeEncrypt: "Зашифровать",
    modeDecrypt: "Расшифровать",
    dropEncrypt: "Нажмите, чтобы выбрать файл для шифрования",
    dropDecrypt: "Нажмите, чтобы выбрать .enc файл для расшифровки",
    dropHintEncrypt: "Любой тип файла — обрабатывается приватно в браузере",
    dropHintDecrypt: "Только .enc-контейнеры Konvertools",
    passwordLabel: "Пароль",
    passwordPlaceholderEncrypt: "Выберите надёжный пароль",
    passwordPlaceholderDecrypt: "Тот же пароль, что при шифровании",
    ariaHidePassword: "Скрыть пароль",
    ariaShowPassword: "Показать пароль",
    passwordHint: "Используйте длинный уникальный пароль. Если забудете его, файл восстановить невозможно — сброса не существует.",
    ariaRemoveFile: "Удалить файл",
    encryptingBtn: "Шифрование…",
    decryptingBtn: "Расшифровка…",
    encryptFileBtn: "Зашифровать файл",
    decryptFileBtn: "Расшифровать файл",
    encryptedReady: "Зашифрованный файл готов",
    decryptedReady: "Расшифрованный файл готов",
    download: "Скачать",
    operationFailed: "Операция не удалась.",
    footer: "AES-256-GCM, ключ выводится из пароля через PBKDF2-SHA-256 (600 000 итераций, OWASP 2023). Исходное имя файла встроено в зашифрованный блоб, поэтому получатель автоматически получает его при расшифровке. 100% в браузере — файл и пароль никогда не покидают устройство.",
  },
  hi: {
    modeEncrypt: "एन्क्रिप्ट",
    modeDecrypt: "डिक्रिप्ट",
    dropEncrypt: "एन्क्रिप्ट करने के लिए फ़ाइल चुनने हेतु क्लिक करें",
    dropDecrypt: "डिक्रिप्ट करने के लिए .enc फ़ाइल चुनने हेतु क्लिक करें",
    dropHintEncrypt: "कोई भी फ़ाइल प्रकार — आपके ब्राउज़र में निजी तरीके से संसाधित",
    dropHintDecrypt: "केवल Konvertools .enc कंटेनर",
    passwordLabel: "पासवर्ड",
    passwordPlaceholderEncrypt: "एक मजबूत पासवर्ड चुनें",
    passwordPlaceholderDecrypt: "एन्क्रिप्ट करने के लिए उपयोग किया गया वही पासवर्ड",
    ariaHidePassword: "पासवर्ड छिपाएं",
    ariaShowPassword: "पासवर्ड दिखाएं",
    passwordHint: "एक लंबा, अद्वितीय पासवर्ड उपयोग करें। यदि आप इसे खो देते हैं तो फ़ाइल अपुनर्प्राप्य है — कोई रीसेट नहीं है।",
    ariaRemoveFile: "फ़ाइल हटाएं",
    encryptingBtn: "एन्क्रिप्ट हो रहा है…",
    decryptingBtn: "डिक्रिप्ट हो रहा है…",
    encryptFileBtn: "फ़ाइल एन्क्रिप्ट करें",
    decryptFileBtn: "फ़ाइल डिक्रिप्ट करें",
    encryptedReady: "एन्क्रिप्टेड फ़ाइल तैयार है",
    decryptedReady: "डिक्रिप्टेड फ़ाइल तैयार है",
    download: "डाउनलोड",
    operationFailed: "ऑपरेशन विफल।",
    footer: "AES-256-GCM, PBKDF2-SHA-256 (600,000 पुनरावृत्तियां, OWASP 2023) के माध्यम से आपके पासवर्ड से कुंजी प्राप्त की। मूल फ़ाइल नाम एन्क्रिप्टेड ब्लॉब के अंदर एम्बेड किया गया है ताकि प्राप्तकर्ता को डिक्रिप्शन पर यह स्वचालित रूप से मिल जाए। 100% आपके ब्राउज़र में — फ़ाइल और पासवर्ड कभी भी डिवाइस नहीं छोड़ते।",
  },
  tr: {
    modeEncrypt: "Şifrele",
    modeDecrypt: "Şifreyi Çöz",
    dropEncrypt: "Şifrelenecek dosyayı seçmek için tıklayın",
    dropDecrypt: "Şifresi çözülecek .enc dosyasını seçmek için tıklayın",
    dropHintEncrypt: "Herhangi bir dosya türü — tarayıcınızda gizli olarak işlenir",
    dropHintDecrypt: "Yalnızca Konvertools .enc kapsayıcıları",
    passwordLabel: "Şifre",
    passwordPlaceholderEncrypt: "Güçlü bir şifre seçin",
    passwordPlaceholderDecrypt: "Şifrelemede kullanılan aynı şifre",
    ariaHidePassword: "Şifreyi gizle",
    ariaShowPassword: "Şifreyi göster",
    passwordHint: "Uzun ve benzersiz bir şifre kullanın. Kaybederseniz dosya kurtarılamaz — sıfırlama yoktur.",
    ariaRemoveFile: "Dosyayı kaldır",
    encryptingBtn: "Şifreleniyor…",
    decryptingBtn: "Şifre çözülüyor…",
    encryptFileBtn: "Dosyayı şifrele",
    decryptFileBtn: "Dosyanın şifresini çöz",
    encryptedReady: "Şifreli dosya hazır",
    decryptedReady: "Şifresi çözülmüş dosya hazır",
    download: "İndir",
    operationFailed: "İşlem başarısız.",
    footer: "AES-256-GCM, şifrenizden PBKDF2-SHA-256 (600.000 iterasyon, OWASP 2023) ile türetilen anahtar. Orijinal dosya adı şifreli blobun içine gömülüdür, böylece alıcı şifre çözümünde otomatik olarak alır. 100% tarayıcınızda — dosya ve şifre cihazı asla terk etmez.",
  },
  id: {
    modeEncrypt: "Enkripsi",
    modeDecrypt: "Dekripsi",
    dropEncrypt: "Klik untuk memilih file yang akan dienkripsi",
    dropDecrypt: "Klik untuk memilih file .enc yang akan didekripsi",
    dropHintEncrypt: "Semua jenis file — diproses secara pribadi di browser Anda",
    dropHintDecrypt: "Hanya kontainer .enc Konvertools",
    passwordLabel: "Kata sandi",
    passwordPlaceholderEncrypt: "Pilih kata sandi yang kuat",
    passwordPlaceholderDecrypt: "Kata sandi yang sama digunakan untuk enkripsi",
    ariaHidePassword: "Sembunyikan kata sandi",
    ariaShowPassword: "Tampilkan kata sandi",
    passwordHint: "Gunakan kata sandi yang panjang dan unik. Jika hilang, file tidak dapat dipulihkan — tidak ada reset.",
    ariaRemoveFile: "Hapus file",
    encryptingBtn: "Mengenkripsi…",
    decryptingBtn: "Mendekripsi…",
    encryptFileBtn: "Enkripsi file",
    decryptFileBtn: "Dekripsi file",
    encryptedReady: "File terenkripsi siap",
    decryptedReady: "File terdekripsi siap",
    download: "Unduh",
    operationFailed: "Operasi gagal.",
    footer: "AES-256-GCM, kunci diturunkan dari kata sandi Anda melalui PBKDF2-SHA-256 (600.000 iterasi, OWASP 2023). Nama file asli disematkan di dalam blob terenkripsi sehingga penerima mendapatkannya kembali secara otomatis saat dekripsi. 100% di browser Anda — file dan kata sandi tidak pernah meninggalkan perangkat.",
  },
  vi: {
    modeEncrypt: "Mã hóa",
    modeDecrypt: "Giải mã",
    dropEncrypt: "Nhấp để chọn tệp cần mã hóa",
    dropDecrypt: "Nhấp để chọn tệp .enc cần giải mã",
    dropHintEncrypt: "Mọi loại tệp — được xử lý riêng tư trong trình duyệt của bạn",
    dropHintDecrypt: "Chỉ các container .enc của Konvertools",
    passwordLabel: "Mật khẩu",
    passwordPlaceholderEncrypt: "Chọn mật khẩu mạnh",
    passwordPlaceholderDecrypt: "Mật khẩu giống như khi mã hóa",
    ariaHidePassword: "Ẩn mật khẩu",
    ariaShowPassword: "Hiển thị mật khẩu",
    passwordHint: "Sử dụng mật khẩu dài và duy nhất. Nếu mất, tệp không thể phục hồi — không có tùy chọn đặt lại.",
    ariaRemoveFile: "Xóa tệp",
    encryptingBtn: "Đang mã hóa…",
    decryptingBtn: "Đang giải mã…",
    encryptFileBtn: "Mã hóa tệp",
    decryptFileBtn: "Giải mã tệp",
    encryptedReady: "Tệp đã mã hóa sẵn sàng",
    decryptedReady: "Tệp đã giải mã sẵn sàng",
    download: "Tải xuống",
    operationFailed: "Thao tác thất bại.",
    footer: "AES-256-GCM, khóa được dẫn xuất từ mật khẩu của bạn qua PBKDF2-SHA-256 (600.000 vòng lặp, OWASP 2023). Tên tệp gốc được nhúng bên trong dữ liệu đã mã hóa để người nhận tự động lấy lại khi giải mã. 100% trong trình duyệt của bạn — tệp và mật khẩu không bao giờ rời thiết bị.",
  },
  sv: {
    modeEncrypt: "Kryptera",
    modeDecrypt: "Dekryptera",
    dropEncrypt: "Klicka för att välja en fil att kryptera",
    dropDecrypt: "Klicka för att välja en .enc-fil att dekryptera",
    dropHintEncrypt: "Alla filtyper — behandlas privat i din webbläsare",
    dropHintDecrypt: "Endast Konvertools .enc-containrar",
    passwordLabel: "Lösenord",
    passwordPlaceholderEncrypt: "Välj ett starkt lösenord",
    passwordPlaceholderDecrypt: "Samma lösenord som användes vid kryptering",
    ariaHidePassword: "Dölj lösenord",
    ariaShowPassword: "Visa lösenord",
    passwordHint: "Använd ett långt, unikt lösenord. Om du förlorar det är filen oåterkalleligt — det finns ingen återställning.",
    ariaRemoveFile: "Ta bort fil",
    encryptingBtn: "Krypterar…",
    decryptingBtn: "Dekrypterar…",
    encryptFileBtn: "Kryptera fil",
    decryptFileBtn: "Dekryptera fil",
    encryptedReady: "Krypterad fil klar",
    decryptedReady: "Dekrypterad fil klar",
    download: "Ladda ner",
    operationFailed: "Åtgärden misslyckades.",
    footer: "AES-256-GCM, nyckel härledd från ditt lösenord via PBKDF2-SHA-256 (600 000 iterationer, OWASP 2023). Det ursprungliga filnamnet är inbäddat i den krypterade bloben så att mottagaren automatiskt får tillbaka det vid dekryptering. 100% i din webbläsare — filen och lösenordet lämnar aldrig enheten.",
  },
  pl: {
    modeEncrypt: "Zaszyfruj",
    modeDecrypt: "Odszyfruj",
    dropEncrypt: "Kliknij, aby wybrać plik do zaszyfrowania",
    dropDecrypt: "Kliknij, aby wybrać plik .enc do odszyfrowania",
    dropHintEncrypt: "Dowolny typ pliku — przetwarzany prywatnie w Twojej przeglądarce",
    dropHintDecrypt: "Tylko kontenery .enc Konvertools",
    passwordLabel: "Hasło",
    passwordPlaceholderEncrypt: "Wybierz silne hasło",
    passwordPlaceholderDecrypt: "To samo hasło użyte do szyfrowania",
    ariaHidePassword: "Ukryj hasło",
    ariaShowPassword: "Pokaż hasło",
    passwordHint: "Użyj długiego, unikalnego hasła. Jeśli je stracisz, plik jest nieodwracalny — nie ma opcji resetowania.",
    ariaRemoveFile: "Usuń plik",
    encryptingBtn: "Szyfrowanie…",
    decryptingBtn: "Odszyfrowanie…",
    encryptFileBtn: "Zaszyfruj plik",
    decryptFileBtn: "Odszyfruj plik",
    encryptedReady: "Zaszyfrowany plik gotowy",
    decryptedReady: "Odszyfrowany plik gotowy",
    download: "Pobierz",
    operationFailed: "Operacja nie powiodła się.",
    footer: "AES-256-GCM, klucz wyprowadzany z hasła przez PBKDF2-SHA-256 (600 000 iteracji, OWASP 2023). Oryginalna nazwa pliku jest osadzona wewnątrz zaszyfrowanego bloba, dzięki czemu odbiorca automatycznie ją odzyska przy odszyfrowaniu. 100% w Twojej przeglądarce — plik i hasło nigdy nie opuszczają urządzenia.",
  },
  uk: {
    modeEncrypt: "Зашифрувати",
    modeDecrypt: "Розшифрувати",
    dropEncrypt: "Натисніть, щоб вибрати файл для шифрування",
    dropDecrypt: "Натисніть, щоб вибрати .enc файл для розшифрування",
    dropHintEncrypt: "Будь-який тип файлу — обробляється приватно у браузері",
    dropHintDecrypt: "Лише .enc-контейнери Konvertools",
    passwordLabel: "Пароль",
    passwordPlaceholderEncrypt: "Оберіть надійний пароль",
    passwordPlaceholderDecrypt: "Той самий пароль, що при шифруванні",
    ariaHidePassword: "Приховати пароль",
    ariaShowPassword: "Показати пароль",
    passwordHint: "Використовуйте довгий унікальний пароль. Якщо забудете його, файл не відновити — скидання не передбачено.",
    ariaRemoveFile: "Видалити файл",
    encryptingBtn: "Шифрування…",
    decryptingBtn: "Розшифровка…",
    encryptFileBtn: "Зашифрувати файл",
    decryptFileBtn: "Розшифрувати файл",
    encryptedReady: "Зашифрований файл готовий",
    decryptedReady: "Розшифрований файл готовий",
    download: "Завантажити",
    operationFailed: "Операція не вдалася.",
    footer: "AES-256-GCM, ключ виводиться з пароля через PBKDF2-SHA-256 (600 000 ітерацій, OWASP 2023). Вихідна назва файлу вбудована у зашифрований блоб, тому отримувач автоматично отримає її при розшифруванні. 100% у браузері — файл і пароль ніколи не покидають пристрій.",
  },
  cs: {
    modeEncrypt: "Zašifrovat",
    modeDecrypt: "Dešifrovat",
    dropEncrypt: "Kliknutím vyberte soubor k zašifrování",
    dropDecrypt: "Kliknutím vyberte soubor .enc k dešifrování",
    dropHintEncrypt: "Jakýkoli typ souboru — zpracován soukromě ve vašem prohlížeči",
    dropHintDecrypt: "Pouze .enc kontejnery Konvertools",
    passwordLabel: "Heslo",
    passwordPlaceholderEncrypt: "Zvolte silné heslo",
    passwordPlaceholderDecrypt: "Stejné heslo použité při šifrování",
    ariaHidePassword: "Skrýt heslo",
    ariaShowPassword: "Zobrazit heslo",
    passwordHint: "Použijte dlouhé, unikátní heslo. Pokud ho ztratíte, soubor je neobnovitelný — neexistuje žádné resetování.",
    ariaRemoveFile: "Odstranit soubor",
    encryptingBtn: "Šifrování…",
    decryptingBtn: "Dešifrování…",
    encryptFileBtn: "Zašifrovat soubor",
    decryptFileBtn: "Dešifrovat soubor",
    encryptedReady: "Zašifrovaný soubor je připraven",
    decryptedReady: "Dešifrovaný soubor je připraven",
    download: "Stáhnout",
    operationFailed: "Operace selhala.",
    footer: "AES-256-GCM, klíč odvozený z vašeho hesla přes PBKDF2-SHA-256 (600 000 iterací, OWASP 2023). Původní název souboru je vložen do zašifrovaného blobu, takže jej příjemce automaticky získá zpět při dešifrování. 100% ve vašem prohlížeči — soubor a heslo nikdy neopustí zařízení.",
  },
};

type Mode = "encrypt" | "decrypt";

export function FileEncryptorClient() {
  const s = T[useLocale()] ?? T.en;
  const [mode, setMode] = useState<Mode>("encrypt");
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function clearResult() {
    setResult(null); setError(null);
  }

  async function run() {
    if (!file) return;
    setBusy(true); clearResult();
    try {
      const out = mode === "encrypt"
        ? await encryptFile(file, password)
        : await decryptFile(file, password);
      setResult({ blob: out.blob, name: out.suggestedName });
    } catch (e) {
      setError(e instanceof Error ? e.message : s.operationFailed);
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url; a.download = result.name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  const accept = mode === "encrypt" ? undefined : ".enc,application/octet-stream";
  const dropLabel = mode === "encrypt" ? s.dropEncrypt : s.dropDecrypt;

  return (
    <div className="space-y-5">
      <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
        {(["encrypt", "decrypt"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setFile(null); clearResult(); }}
            className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              mode === m ? "bg-rose-500 text-white" : "text-ink-600 hover:text-ink-900"
            }`}
          >
            {m === "encrypt" ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
            {m === "encrypt" ? s.modeEncrypt : s.modeDecrypt}
          </button>
        ))}
      </div>

      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-rose-300 bg-rose-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-rose-50 text-rose-600">
            <Upload className="h-6 w-6" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">{dropLabel}</span>
          <span className="mt-0.5 text-xs text-ink-400">
            {mode === "encrypt" ? s.dropHintEncrypt : s.dropHintDecrypt}
          </span>
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); clearResult(); } }}
          />
        </label>
      ) : (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-ink-200 bg-white px-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-ink-900">{file.name}</div>
            <div className="text-xs text-ink-400">{formatBytes(file.size)}</div>
          </div>
          <button
            type="button"
            onClick={() => { setFile(null); clearResult(); }}
            className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
            aria-label={s.ariaRemoveFile}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700" htmlFor="file-aes-pwd">
          {s.passwordLabel}
        </label>
        <div className="relative">
          <input
            id="file-aes-pwd"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "encrypt" ? s.passwordPlaceholderEncrypt : s.passwordPlaceholderDecrypt}
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 pr-10 text-sm text-ink-900 placeholder:text-ink-300 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? s.ariaHidePassword : s.ariaShowPassword}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-ink-400 hover:text-ink-700"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {mode === "encrypt" && (
          <p className="mt-1.5 text-xs text-ink-500">{s.passwordHint}</p>
        )}
      </div>

      <Button onClick={run} disabled={busy || !file || !password} size="lg">
        {busy
          ? <Loader2 className="h-4 w-4 animate-spin" />
          : (mode === "encrypt" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />)}
        {busy
          ? (mode === "encrypt" ? s.encryptingBtn : s.decryptingBtn)
          : (mode === "encrypt" ? s.encryptFileBtn : s.decryptFileBtn)}
      </Button>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      {result && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-ink-900">
                {mode === "encrypt" ? s.encryptedReady : s.decryptedReady}
              </div>
              <div className="truncate text-xs text-ink-500">{result.name} · {formatBytes(result.blob.size)}</div>
            </div>
            <Button onClick={download} size="sm">
              <Download className="h-4 w-4" /> {s.download}
            </Button>
          </div>
        </div>
      )}

      <p className="text-xs text-ink-400">{s.footer}</p>
    </div>
  );
}
