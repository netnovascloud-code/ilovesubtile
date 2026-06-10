"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Code } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    full_name: "Full name",
    job_title: "Job title",
    company: "Company",
    email: "Email",
    phone: "Phone",
    website: "Website",
    accent_colour: "Accent colour",
    preview: "Preview",
    copy_signature: "Copy signature",
    copy_html: "Copy HTML",
    disclaimer: '"Copy signature" pastes the styled block straight into Gmail/Outlook; "Copy HTML" gives the raw source. Built in your browser.',
  },
  fr: {
    full_name: "Nom complet",
    job_title: "Titre du poste",
    company: "Entreprise",
    email: "E-mail",
    phone: "Téléphone",
    website: "Site web",
    accent_colour: "Couleur d'accent",
    preview: "Aperçu",
    copy_signature: "Copier la signature",
    copy_html: "Copier le HTML",
    disclaimer: "« Copier la signature » colle le bloc stylisé directement dans Gmail/Outlook ; « Copier le HTML » donne le code source brut. Généré dans votre navigateur.",
  },
  es: {
    full_name: "Nombre completo",
    job_title: "Cargo",
    company: "Empresa",
    email: "Correo electrónico",
    phone: "Teléfono",
    website: "Sitio web",
    accent_colour: "Color de acento",
    preview: "Vista previa",
    copy_signature: "Copiar firma",
    copy_html: "Copiar HTML",
    disclaimer: '"Copiar firma" pega el bloque con estilo directamente en Gmail/Outlook; "Copiar HTML" proporciona el código fuente. Creado en tu navegador.',
  },
  pt: {
    full_name: "Nome completo",
    job_title: "Cargo",
    company: "Empresa",
    email: "E-mail",
    phone: "Telefone",
    website: "Website",
    accent_colour: "Cor de destaque",
    preview: "Pré-visualização",
    copy_signature: "Copiar assinatura",
    copy_html: "Copiar HTML",
    disclaimer: '"Copiar assinatura" cola o bloco estilizado diretamente no Gmail/Outlook; "Copiar HTML" fornece o código-fonte. Criado no seu navegador.',
  },
  de: {
    full_name: "Vollständiger Name",
    job_title: "Berufsbezeichnung",
    company: "Unternehmen",
    email: "E-Mail",
    phone: "Telefon",
    website: "Website",
    accent_colour: "Akzentfarbe",
    preview: "Vorschau",
    copy_signature: "Signatur kopieren",
    copy_html: "HTML kopieren",
    disclaimer: '„Signatur kopieren" fügt den formatierten Block direkt in Gmail/Outlook ein; „HTML kopieren" liefert den Quellcode. Im Browser erstellt.',
  },
  it: {
    full_name: "Nome completo",
    job_title: "Qualifica",
    company: "Azienda",
    email: "E-mail",
    phone: "Telefono",
    website: "Sito web",
    accent_colour: "Colore accento",
    preview: "Anteprima",
    copy_signature: "Copia firma",
    copy_html: "Copia HTML",
    disclaimer: '"Copia firma" incolla il blocco stilizzato direttamente in Gmail/Outlook; "Copia HTML" fornisce il codice sorgente. Creato nel tuo browser.',
  },
  nl: {
    full_name: "Volledige naam",
    job_title: "Functietitel",
    company: "Bedrijf",
    email: "E-mail",
    phone: "Telefoon",
    website: "Website",
    accent_colour: "Accentkleur",
    preview: "Voorbeeld",
    copy_signature: "Handtekening kopiëren",
    copy_html: "HTML kopiëren",
    disclaimer: '"Handtekening kopiëren" plakt het opgemaakte blok rechtstreeks in Gmail/Outlook; "HTML kopiëren" geeft de broncode. Gebouwd in uw browser.',
  },
  ja: {
    full_name: "氏名",
    job_title: "役職",
    company: "会社名",
    email: "メール",
    phone: "電話番号",
    website: "ウェブサイト",
    accent_colour: "アクセントカラー",
    preview: "プレビュー",
    copy_signature: "署名をコピー",
    copy_html: "HTMLをコピー",
    disclaimer: "「署名をコピー」はスタイル付きブロックをGmail/Outlookに直接貼り付けます。「HTMLをコピー」は生のソースコードを提供します。ブラウザで作成。",
  },
  zh: {
    full_name: "全名",
    job_title: "职位",
    company: "公司",
    email: "电子邮件",
    phone: "电话",
    website: "网站",
    accent_colour: "强调色",
    preview: "预览",
    copy_signature: "复制签名",
    copy_html: "复制HTML",
    disclaimer: '"复制签名"将样式块直接粘贴到Gmail/Outlook；"复制HTML"提供原始源代码。在您的浏览器中构建。',
  },
  ko: {
    full_name: "이름",
    job_title: "직함",
    company: "회사",
    email: "이메일",
    phone: "전화번호",
    website: "웹사이트",
    accent_colour: "강조 색상",
    preview: "미리보기",
    copy_signature: "서명 복사",
    copy_html: "HTML 복사",
    disclaimer: '"서명 복사"는 스타일이 적용된 블록을 Gmail/Outlook에 직접 붙여넣습니다. "HTML 복사"는 원시 소스 코드를 제공합니다. 브라우저에서 생성됩니다.',
  },
  ar: {
    full_name: "الاسم الكامل",
    job_title: "المسمى الوظيفي",
    company: "الشركة",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    website: "الموقع الإلكتروني",
    accent_colour: "اللون المميز",
    preview: "معاينة",
    copy_signature: "نسخ التوقيع",
    copy_html: "نسخ HTML",
    disclaimer: '«نسخ التوقيع» يلصق الكتلة المنسّقة مباشرةً في Gmail/Outlook؛ «نسخ HTML» يوفر الكود المصدري الخام. مبني في متصفحك.',
  },
  ru: {
    full_name: "Полное имя",
    job_title: "Должность",
    company: "Компания",
    email: "Электронная почта",
    phone: "Телефон",
    website: "Веб-сайт",
    accent_colour: "Цвет акцента",
    preview: "Предварительный просмотр",
    copy_signature: "Скопировать подпись",
    copy_html: "Скопировать HTML",
    disclaimer: '«Скопировать подпись» вставляет стилизованный блок прямо в Gmail/Outlook; «Скопировать HTML» даёт исходный код. Создано в вашем браузере.',
  },
  hi: {
    full_name: "पूरा नाम",
    job_title: "नौकरी का पदनाम",
    company: "कंपनी",
    email: "ईमेल",
    phone: "फ़ोन",
    website: "वेबसाइट",
    accent_colour: "एक्सेंट रंग",
    preview: "पूर्वावलोकन",
    copy_signature: "सिग्नेचर कॉपी करें",
    copy_html: "HTML कॉपी करें",
    disclaimer: '"सिग्नेचर कॉपी करें" स्टाइल किए गए ब्लॉक को सीधे Gmail/Outlook में पेस्ट करता है; "HTML कॉपी करें" कच्चा स्रोत कोड देता है। आपके ब्राउज़र में बनाया गया।',
  },
  tr: {
    full_name: "Ad Soyad",
    job_title: "Unvan",
    company: "Şirket",
    email: "E-posta",
    phone: "Telefon",
    website: "Web sitesi",
    accent_colour: "Vurgu rengi",
    preview: "Önizleme",
    copy_signature: "İmzayı kopyala",
    copy_html: "HTML kopyala",
    disclaimer: '"İmzayı kopyala" biçimlendirilmiş bloğu doğrudan Gmail/Outlook\'a yapıştırır; "HTML kopyala" ham kaynak kodu verir. Tarayıcınızda oluşturulmuştur.',
  },
  id: {
    full_name: "Nama lengkap",
    job_title: "Jabatan",
    company: "Perusahaan",
    email: "Email",
    phone: "Telepon",
    website: "Website",
    accent_colour: "Warna aksen",
    preview: "Pratinjau",
    copy_signature: "Salin tanda tangan",
    copy_html: "Salin HTML",
    disclaimer: '"Salin tanda tangan" menempelkan blok bergaya langsung ke Gmail/Outlook; "Salin HTML" memberikan kode sumber mentah. Dibuat di browser Anda.',
  },
  vi: {
    full_name: "Họ và tên",
    job_title: "Chức danh",
    company: "Công ty",
    email: "Email",
    phone: "Điện thoại",
    website: "Website",
    accent_colour: "Màu nhấn",
    preview: "Xem trước",
    copy_signature: "Sao chép chữ ký",
    copy_html: "Sao chép HTML",
    disclaimer: '"Sao chép chữ ký" dán khối có kiểu dáng thẳng vào Gmail/Outlook; "Sao chép HTML" cung cấp mã nguồn thô. Được tạo trong trình duyệt của bạn.',
  },
  sv: {
    full_name: "Fullständigt namn",
    job_title: "Jobbtitel",
    company: "Företag",
    email: "E-post",
    phone: "Telefon",
    website: "Webbplats",
    accent_colour: "Accentfärg",
    preview: "Förhandsvisning",
    copy_signature: "Kopiera signatur",
    copy_html: "Kopiera HTML",
    disclaimer: '"Kopiera signatur" klistrar in det stiliserade blocket direkt i Gmail/Outlook; "Kopiera HTML" ger råkällkoden. Skapad i din webbläsare.',
  },
  pl: {
    full_name: "Pełne imię i nazwisko",
    job_title: "Stanowisko",
    company: "Firma",
    email: "E-mail",
    phone: "Telefon",
    website: "Strona internetowa",
    accent_colour: "Kolor akcentu",
    preview: "Podgląd",
    copy_signature: "Kopiuj podpis",
    copy_html: "Kopiuj HTML",
    disclaimer: '"Kopiuj podpis" wkleja sformatowany blok bezpośrednio do Gmail/Outlook; "Kopiuj HTML" podaje surowy kod źródłowy. Zbudowane w Twojej przeglądarce.',
  },
  uk: {
    full_name: "Повне ім'я",
    job_title: "Посада",
    company: "Компанія",
    email: "Електронна пошта",
    phone: "Телефон",
    website: "Веб-сайт",
    accent_colour: "Колір акценту",
    preview: "Попередній перегляд",
    copy_signature: "Скопіювати підпис",
    copy_html: "Скопіювати HTML",
    disclaimer: '«Скопіювати підпис» вставляє стилізований блок прямо в Gmail/Outlook; «Скопіювати HTML» надає вихідний код. Створено у вашому браузері.',
  },
  cs: {
    full_name: "Celé jméno",
    job_title: "Pracovní pozice",
    company: "Společnost",
    email: "E-mail",
    phone: "Telefon",
    website: "Webová stránka",
    accent_colour: "Barva zvýraznění",
    preview: "Náhled",
    copy_signature: "Kopírovat podpis",
    copy_html: "Kopírovat HTML",
    disclaimer: '"Kopírovat podpis" vloží stylizovaný blok přímo do Gmail/Outlook; "Kopírovat HTML" poskytne zdrojový kód. Vytvořeno ve vašem prohlížeči.',
  },
};

function esc(str: string): string {
  return str.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
}

/** Table-based HTML — the only layout email clients render reliably. */
function buildSignature(f: {
  name: string; title: string; company: string; email: string;
  phone: string; website: string; accent: string;
}): string {
  const a = /^#[0-9a-f]{6}$/i.test(f.accent) ? f.accent : "#4f46e5";
  const line = (label: string, value: string, href?: string) =>
    value
      ? `<tr><td style="padding:1px 0;font-size:12px;color:#444;">${label ? `<span style="color:#888;">${esc(label)} </span>` : ""}${href ? `<a href="${esc(href)}" style="color:${a};text-decoration:none;">${esc(value)}</a>` : esc(value)}</td></tr>`
      : "";
  return `<table cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;">
  <tr>
    <td style="border-left:3px solid ${a};padding:2px 0 2px 12px;">
      <table cellpadding="0" cellspacing="0">
        <tr><td style="font-size:16px;font-weight:bold;color:#111;padding-bottom:2px;">${esc(f.name) || "Your Name"}</td></tr>
        ${f.title || f.company ? `<tr><td style="font-size:12px;color:#666;padding-bottom:4px;">${esc(f.title)}${f.title && f.company ? " · " : ""}${esc(f.company)}</td></tr>` : ""}
        ${line("✉", f.email, f.email ? `mailto:${f.email}` : undefined)}
        ${line("☎", f.phone, f.phone ? `tel:${f.phone.replace(/[^+\d]/g, "")}` : undefined)}
        ${line("🌐", f.website, f.website ? (/^https?:\/\//.test(f.website) ? f.website : `https://${f.website}`) : undefined)}
      </table>
    </td>
  </tr>
</table>`;
}

export function EmailSignatureClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [f, setF] = useState({
    name: "Alex Rivera", title: "Product Designer", company: "Acme Inc.",
    email: "alex@acme.com", phone: "+1 555 0142", website: "acme.com", accent: "#4f46e5",
  });
  const [copied, setCopied] = useState<"html" | "rich" | null>(null);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  const html = useMemo(() => buildSignature(f), [f]);

  const copyHtml = () => { navigator.clipboard?.writeText(html); setCopied("html"); setTimeout(() => setCopied(null), 1400); };
  const copyRich = async () => {
    try {
      const blob = new Blob([html], { type: "text/html" });
      // Rich copy: pastes the rendered signature straight into Gmail/Outlook.
      await navigator.clipboard.write([new ClipboardItem({ "text/html": blob, "text/plain": new Blob([html], { type: "text/plain" }) })]);
      setCopied("rich"); setTimeout(() => setCopied(null), 1400);
    } catch { copyHtml(); }
  };

  const field = (k: keyof typeof f, label: string, type = "text") => (
    <label className="flex flex-col text-xs font-medium text-ink-600">
      {label}
      <input type={type} value={f[k]} onChange={set(k)}
        className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
    </label>
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {field("name", s.full_name)}
        {field("title", s.job_title)}
        {field("company", s.company)}
        {field("email", s.email, "email")}
        {field("phone", s.phone)}
        {field("website", s.website)}
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.accent_colour}
          <input type="color" value={/^#[0-9a-f]{6}$/i.test(f.accent) ? f.accent : "#4f46e5"} onChange={set("accent")}
            className="mt-1 h-9 w-16 cursor-pointer rounded-md border border-ink-200 bg-white p-1" />
        </label>
      </div>

      <div>
        <div className="mb-2 text-xs font-medium text-ink-600">{s.preview}</div>
        <div className="rounded-lg border border-ink-100 bg-white p-5" dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={copyRich} className="inline-flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600">
          {copied === "rich" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {s.copy_signature}
        </button>
        <button onClick={copyHtml} className="inline-flex items-center gap-2 rounded-md border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 hover:border-brand-300">
          {copied === "html" ? <Check className="h-4 w-4" /> : <Code className="h-4 w-4" />}
          {s.copy_html}
        </button>
      </div>

      <p className="text-xs text-ink-400">
        {s.disclaimer}
      </p>
    </div>
  );
}
