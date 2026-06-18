"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    label_website_url: "Website URL",
    label_source: "Campaign source",
    label_medium: "Campaign medium",
    label_campaign: "Campaign name",
    label_term: "Campaign term",
    label_content: "Campaign content",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "spring_sale",
    ph_term: "running+shoes (paid keywords)",
    ph_content: "logolink, textlink (A/B testing)",
    error_invalid_url: "Enter a valid URL (with or without https://).",
    privacy_note: "Built in your browser — nothing is uploaded.",
    result_label: "Tagged campaign URL",
    result_copied: "Copied",
    result_copy: "Copy",
  },
  fr: {
    label_website_url: "URL du site web",
    label_source: "Source de la campagne",
    label_medium: "Support de la campagne",
    label_campaign: "Nom de la campagne",
    label_term: "Terme de la campagne",
    label_content: "Contenu de la campagne",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "soldes_printemps",
    ph_term: "chaussures+running (mots-clés payants)",
    ph_content: "lienlogo, llientexte (test A/B)",
    error_invalid_url: "Entrez une URL valide (avec ou sans https://).",
    privacy_note: "Construit dans votre navigateur — rien n'est téléchargé.",
    result_label: "URL de campagne taguée",
    result_copied: "Copié",
    result_copy: "Copier",
  },
  es: {
    label_website_url: "URL del sitio web",
    label_source: "Fuente de la campaña",
    label_medium: "Medio de la campaña",
    label_campaign: "Nombre de la campaña",
    label_term: "Término de la campaña",
    label_content: "Contenido de la campaña",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "venta_primavera",
    ph_term: "zapatillas+running (palabras clave de pago)",
    ph_content: "enlacelogo, enlacetexto (prueba A/B)",
    error_invalid_url: "Introduce una URL válida (con o sin https://).",
    privacy_note: "Construido en tu navegador — nada se sube.",
    result_label: "URL de campaña etiquetada",
    result_copied: "Copiado",
    result_copy: "Copiar",
  },
  pt: {
    label_website_url: "URL do site",
    label_source: "Fonte da campanha",
    label_medium: "Meio da campanha",
    label_campaign: "Nome da campanha",
    label_term: "Termo da campanha",
    label_content: "Conteúdo da campanha",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "venda_primavera",
    ph_term: "tenis+corrida (palavras-chave pagas)",
    ph_content: "linklogo, linktexto (teste A/B)",
    error_invalid_url: "Insira uma URL válida (com ou sem https://).",
    privacy_note: "Criado no seu navegador — nada é enviado.",
    result_label: "URL de campanha marcada",
    result_copied: "Copiado",
    result_copy: "Copiar",
  },
  de: {
    label_website_url: "Website-URL",
    label_source: "Kampagnenquelle",
    label_medium: "Kampagnenmedium",
    label_campaign: "Kampagnenname",
    label_term: "Kampagnenbegriff",
    label_content: "Kampagneninhalt",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "frühjahrsaktion",
    ph_term: "laufschuhe+keywords (bezahlte Keywords)",
    ph_content: "logolink, textlink (A/B-Tests)",
    error_invalid_url: "Gib eine gültige URL ein (mit oder ohne https://).",
    privacy_note: "In deinem Browser erstellt — nichts wird hochgeladen.",
    result_label: "Getaggte Kampagnen-URL",
    result_copied: "Kopiert",
    result_copy: "Kopieren",
  },
  it: {
    label_website_url: "URL del sito web",
    label_source: "Sorgente campagna",
    label_medium: "Mezzo campagna",
    label_campaign: "Nome campagna",
    label_term: "Termine campagna",
    label_content: "Contenuto campagna",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "saldi_primavera",
    ph_term: "scarpe+corsa (parole chiave a pagamento)",
    ph_content: "linklogo, linktesto (test A/B)",
    error_invalid_url: "Inserisci un URL valido (con o senza https://).",
    privacy_note: "Creato nel tuo browser — niente viene caricato.",
    result_label: "URL campagna con tag",
    result_copied: "Copiato",
    result_copy: "Copia",
  },
  nl: {
    label_website_url: "Website-URL",
    label_source: "Campagnebron",
    label_medium: "Campagnemedium",
    label_campaign: "Campagnenaam",
    label_term: "Campagneterm",
    label_content: "Campagne-inhoud",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "lenteverkoop",
    ph_term: "hardloopschoenen+keywords (betaalde zoekwoorden)",
    ph_content: "logolink, tekstlink (A/B-test)",
    error_invalid_url: "Voer een geldige URL in (met of zonder https://).",
    privacy_note: "In je browser gebouwd — niets wordt geüpload.",
    result_label: "Getagde campagne-URL",
    result_copied: "Gekopieerd",
    result_copy: "Kopiëren",
  },
  ja: {
    label_website_url: "ウェブサイトURL",
    label_source: "キャンペーンソース",
    label_medium: "キャンペーンメディア",
    label_campaign: "キャンペーン名",
    label_term: "キャンペーンタームs",
    label_content: "キャンペーンコンテンツ",
    ph_source: "google、newsletter、facebook",
    ph_medium: "cpc、email、social",
    ph_campaign: "spring_sale",
    ph_term: "running+shoes（有料キーワード）",
    ph_content: "logolink、textlink（A/Bテスト）",
    error_invalid_url: "有効なURLを入力してください（https://あり・なし両方可）。",
    privacy_note: "ブラウザ内で生成 — 何もアップロードされません。",
    result_label: "タグ付きキャンペーンURL",
    result_copied: "コピー済み",
    result_copy: "コピー",
  },
  zh: {
    label_website_url: "网站网址",
    label_source: "广告系列来源",
    label_medium: "广告系列媒介",
    label_campaign: "广告系列名称",
    label_term: "广告系列字词",
    label_content: "广告系列内容",
    ph_source: "google、newsletter、facebook",
    ph_medium: "cpc、email、social",
    ph_campaign: "spring_sale",
    ph_term: "running+shoes（付费关键词）",
    ph_content: "logolink、textlink（A/B测试）",
    error_invalid_url: "请输入有效的网址（可以不含 https://）。",
    privacy_note: "在浏览器中生成 — 不会上传任何内容。",
    result_label: "已标记的广告系列网址",
    result_copied: "已复制",
    result_copy: "复制",
  },
  ko: {
    label_website_url: "웹사이트 URL",
    label_source: "캠페인 소스",
    label_medium: "캠페인 매체",
    label_campaign: "캠페인 이름",
    label_term: "캠페인 키워드",
    label_content: "캠페인 콘텐츠",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "spring_sale",
    ph_term: "running+shoes (유료 키워드)",
    ph_content: "logolink, textlink (A/B 테스트)",
    error_invalid_url: "유효한 URL을 입력하세요 (https:// 포함 여부 무관).",
    privacy_note: "브라우저에서 생성 — 아무것도 업로드되지 않습니다.",
    result_label: "태그된 캠페인 URL",
    result_copied: "복사됨",
    result_copy: "복사",
  },
  ar: {
    label_website_url: "رابط الموقع الإلكتروني",
    label_source: "مصدر الحملة",
    label_medium: "وسيلة الحملة",
    label_campaign: "اسم الحملة",
    label_term: "مصطلح الحملة",
    label_content: "محتوى الحملة",
    ph_source: "google، newsletter، facebook",
    ph_medium: "cpc، email، social",
    ph_campaign: "spring_sale",
    ph_term: "running+shoes (كلمات مفتاحية مدفوعة)",
    ph_content: "logolink، textlink (اختبار A/B)",
    error_invalid_url: "أدخل رابطاً صحيحاً (مع https:// أو بدونه).",
    privacy_note: "يُنشأ في متصفحك — لا يُرفع أي شيء.",
    result_label: "رابط الحملة المُعلَّم",
    result_copied: "تم النسخ",
    result_copy: "نسخ",
  },
  ru: {
    label_website_url: "URL сайта",
    label_source: "Источник кампании",
    label_medium: "Канал кампании",
    label_campaign: "Название кампании",
    label_term: "Ключевое слово кампании",
    label_content: "Содержание кампании",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "spring_sale",
    ph_term: "running+shoes (платные ключевые слова)",
    ph_content: "logolink, textlink (A/B тестирование)",
    error_invalid_url: "Введите корректный URL (с https:// или без).",
    privacy_note: "Создаётся в вашем браузере — ничего не загружается.",
    result_label: "Размеченный URL кампании",
    result_copied: "Скопировано",
    result_copy: "Копировать",
  },
  hi: {
    label_website_url: "वेबसाइट URL",
    label_source: "कैंपेन स्रोत",
    label_medium: "कैंपेन माध्यम",
    label_campaign: "कैंपेन नाम",
    label_term: "कैंपेन टर्म",
    label_content: "कैंपेन कंटेंट",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "spring_sale",
    ph_term: "running+shoes (पेड कीवर्ड)",
    ph_content: "logolink, textlink (A/B परीक्षण)",
    error_invalid_url: "एक मान्य URL दर्ज करें (https:// के साथ या बिना)।",
    privacy_note: "आपके ब्राउज़र में निर्मित — कुछ भी अपलोड नहीं होता।",
    result_label: "टैग की गई कैंपेन URL",
    result_copied: "कॉपी हो गया",
    result_copy: "कॉपी करें",
  },
  tr: {
    label_website_url: "Web sitesi URL'si",
    label_source: "Kampanya kaynağı",
    label_medium: "Kampanya ortamı",
    label_campaign: "Kampanya adı",
    label_term: "Kampanya terimi",
    label_content: "Kampanya içeriği",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "bahar_indirimi",
    ph_term: "running+shoes (ücretli anahtar kelimeler)",
    ph_content: "logolink, textlink (A/B testi)",
    error_invalid_url: "Geçerli bir URL girin (https:// ile veya olmadan).",
    privacy_note: "Tarayıcınızda oluşturulur — hiçbir şey yüklenmez.",
    result_label: "Etiketlenmiş kampanya URL'si",
    result_copied: "Kopyalandı",
    result_copy: "Kopyala",
  },
  id: {
    label_website_url: "URL situs web",
    label_source: "Sumber kampanye",
    label_medium: "Media kampanye",
    label_campaign: "Nama kampanye",
    label_term: "Kata kunci kampanye",
    label_content: "Konten kampanye",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "diskon_musim_semi",
    ph_term: "running+shoes (kata kunci berbayar)",
    ph_content: "logolink, textlink (uji A/B)",
    error_invalid_url: "Masukkan URL yang valid (dengan atau tanpa https://).",
    privacy_note: "Dibuat di browser Anda — tidak ada yang diunggah.",
    result_label: "URL kampanye bertag",
    result_copied: "Disalin",
    result_copy: "Salin",
  },
  vi: {
    label_website_url: "URL trang web",
    label_source: "Nguồn chiến dịch",
    label_medium: "Phương tiện chiến dịch",
    label_campaign: "Tên chiến dịch",
    label_term: "Từ khóa chiến dịch",
    label_content: "Nội dung chiến dịch",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "sale_mua_xuan",
    ph_term: "running+shoes (từ khóa trả phí)",
    ph_content: "logolink, textlink (thử nghiệm A/B)",
    error_invalid_url: "Nhập URL hợp lệ (có hoặc không có https://).",
    privacy_note: "Tạo trong trình duyệt của bạn — không có gì được tải lên.",
    result_label: "URL chiến dịch đã gắn thẻ",
    result_copied: "Đã sao chép",
    result_copy: "Sao chép",
  },
  sv: {
    label_website_url: "Webbadress",
    label_source: "Kampanjkälla",
    label_medium: "Kampanjmedium",
    label_campaign: "Kampanjnamn",
    label_term: "Kampanjterm",
    label_content: "Kampanjinnehåll",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "vårrea",
    ph_term: "running+shoes (betalda sökord)",
    ph_content: "logolink, textlink (A/B-test)",
    error_invalid_url: "Ange en giltig URL (med eller utan https://).",
    privacy_note: "Skapad i din webbläsare — inget laddas upp.",
    result_label: "Taggad kampanj-URL",
    result_copied: "Kopierad",
    result_copy: "Kopiera",
  },
  pl: {
    label_website_url: "URL strony internetowej",
    label_source: "Źródło kampanii",
    label_medium: "Medium kampanii",
    label_campaign: "Nazwa kampanii",
    label_term: "Słowo kluczowe kampanii",
    label_content: "Treść kampanii",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "wiosenna_wyprzedaz",
    ph_term: "running+shoes (płatne słowa kluczowe)",
    ph_content: "logolink, textlink (test A/B)",
    error_invalid_url: "Wprowadź poprawny URL (z https:// lub bez).",
    privacy_note: "Tworzony w Twojej przeglądarce — nic nie jest przesyłane.",
    result_label: "Oznakowany URL kampanii",
    result_copied: "Skopiowano",
    result_copy: "Kopiuj",
  },
  uk: {
    label_website_url: "URL сайту",
    label_source: "Джерело кампанії",
    label_medium: "Канал кампанії",
    label_campaign: "Назва кампанії",
    label_term: "Ключове слово кампанії",
    label_content: "Вміст кампанії",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "spring_sale",
    ph_term: "running+shoes (платні ключові слова)",
    ph_content: "logolink, textlink (A/B тестування)",
    error_invalid_url: "Введіть коректний URL (з https:// або без).",
    privacy_note: "Створено у вашому браузері — нічого не завантажується.",
    result_label: "URL кампанії з мітками",
    result_copied: "Скопійовано",
    result_copy: "Копіювати",
  },
  cs: {
    label_website_url: "URL webové stránky",
    label_source: "Zdroj kampaně",
    label_medium: "Médium kampaně",
    label_campaign: "Název kampaně",
    label_term: "Klíčové slovo kampaně",
    label_content: "Obsah kampaně",
    ph_source: "google, newsletter, facebook",
    ph_medium: "cpc, email, social",
    ph_campaign: "jarni_vyprodej",
    ph_term: "running+shoes (placená klíčová slova)",
    ph_content: "logolink, textlink (A/B testování)",
    error_invalid_url: "Zadejte platnou URL adresu (s https:// nebo bez).",
    privacy_note: "Vytvořeno ve vašem prohlížeči — nic se nenahrává.",
    result_label: "Označená URL kampaně",
    result_copied: "Zkopírováno",
    result_copy: "Kopírovat",
  },
};

// Pure client-side UTM campaign URL builder — nothing leaves the browser.
const FIELD_KEYS = [
  { key: "utm_source", labelKey: "label_source", required: true, placeholderKey: "ph_source" },
  { key: "utm_medium", labelKey: "label_medium", required: true, placeholderKey: "ph_medium" },
  { key: "utm_campaign", labelKey: "label_campaign", required: true, placeholderKey: "ph_campaign" },
  { key: "utm_term", labelKey: "label_term", required: false, placeholderKey: "ph_term" },
  { key: "utm_content", labelKey: "label_content", required: false, placeholderKey: "ph_content" },
] as const;

export function UtmBuilderClient() {
  const s = T[useLocale()] ?? T.en;
  const [base, setBase] = useState("");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const b = base.trim();
    if (!b) return "";
    let url: URL;
    try {
      url = new URL(b.includes("://") ? b : `https://${b}`);
    } catch {
      return "";
    }
    for (const f of FIELD_KEYS) {
      const v = (vals[f.key] ?? "").trim();
      if (v) url.searchParams.set(f.key, v);
    }
    return url.toString();
  }, [base, vals]);

  const invalid = base.trim() !== "" && result === "";

  async function copy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-ink-100 bg-white p-5 shadow-card">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-700">{s.label_website_url}</span>
          <input
            value={base}
            onChange={(e) => setBase(e.target.value)}
            placeholder="https://example.com/landing"
            inputMode="url"
            className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {FIELD_KEYS.map((f) => (
            <label key={f.key} className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-700">
                {s[f.labelKey]} {f.required && <span className="text-red-500">*</span>}
                <code className="ml-1 text-xs font-normal text-ink-400">{f.key}</code>
              </span>
              <input
                value={vals[f.key] ?? ""}
                onChange={(e) => setVals((p) => ({ ...p, [f.key]: e.target.value }))}
                placeholder={s[f.placeholderKey]}
                className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </label>
          ))}
        </div>
        {invalid && <p className="mt-2 text-sm text-red-600">{s.error_invalid_url}</p>}
        <p className="mt-3 text-xs text-ink-400">{s.privacy_note}</p>
      </div>

      {result && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <p className="mb-2 text-sm font-medium text-emerald-800">{s.result_label}</p>
          <div className="flex items-stretch gap-2">
            <input readOnly value={result} onFocus={(e) => e.currentTarget.select()}
              className="flex-1 rounded-lg border border-emerald-200 bg-white px-3 py-2 font-mono text-xs text-ink-900" />
            <Button variant="outline" onClick={copy}>
              {copied ? <><Check className="h-4 w-4" /> {s.result_copied}</> : <><Copy className="h-4 w-4" /> {s.result_copy}</>}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
