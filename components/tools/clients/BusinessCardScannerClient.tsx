"use client";

import { useState } from "react";
import { Image as ImageIcon, Loader2, Download, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { callVisionJson } from "@/lib/vision-client";
import { useLocale } from "@/hooks/useLocale";

type Card = {
  name: string | null; title: string | null; company: string | null;
  email: string | null; phone: string | null; website: string | null; address: string | null;
};

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "Business card photo",
    readingCard: "Reading the card…",
    extractBtn: "Extract contact details",
    fieldName: "Name",
    fieldTitle: "Title",
    fieldCompany: "Company",
    fieldEmail: "Email",
    fieldPhone: "Phone",
    fieldWebsite: "Website",
    fieldAddress: "Address",
    downloadVcard: "Download vCard (.vcf)",
    privacy: "Imports cleanly into Apple Contacts, Google Contacts and Outlook. Powered by AI vision.",
  },
  fr: {
    dropLabel: "Photo de carte de visite",
    readingCard: "Lecture de la carte…",
    extractBtn: "Extraire les coordonnées",
    fieldName: "Nom",
    fieldTitle: "Titre",
    fieldCompany: "Entreprise",
    fieldEmail: "E-mail",
    fieldPhone: "Téléphone",
    fieldWebsite: "Site web",
    fieldAddress: "Adresse",
    downloadVcard: "Télécharger la vCard (.vcf)",
    privacy: "Importe proprement dans Apple Contacts, Google Contacts et Outlook. Propulsé par la vision IA.",
  },
  es: {
    dropLabel: "Foto de tarjeta de visita",
    readingCard: "Leyendo la tarjeta…",
    extractBtn: "Extraer datos de contacto",
    fieldName: "Nombre",
    fieldTitle: "Título",
    fieldCompany: "Empresa",
    fieldEmail: "Correo",
    fieldPhone: "Teléfono",
    fieldWebsite: "Sitio web",
    fieldAddress: "Dirección",
    downloadVcard: "Descargar vCard (.vcf)",
    privacy: "Se importa limpiamente en Apple Contacts, Google Contacts y Outlook. Con tecnología de visión IA.",
  },
  pt: {
    dropLabel: "Foto do cartão de visita",
    readingCard: "A ler o cartão…",
    extractBtn: "Extrair dados de contacto",
    fieldName: "Nome",
    fieldTitle: "Título",
    fieldCompany: "Empresa",
    fieldEmail: "E-mail",
    fieldPhone: "Telefone",
    fieldWebsite: "Website",
    fieldAddress: "Endereço",
    downloadVcard: "Baixar vCard (.vcf)",
    privacy: "Importa sem problemas para Apple Contacts, Google Contacts e Outlook. Tecnologia de visão IA.",
  },
  de: {
    dropLabel: "Visitenkartenfoto",
    readingCard: "Karte wird gelesen…",
    extractBtn: "Kontaktdaten extrahieren",
    fieldName: "Name",
    fieldTitle: "Titel",
    fieldCompany: "Unternehmen",
    fieldEmail: "E-Mail",
    fieldPhone: "Telefon",
    fieldWebsite: "Website",
    fieldAddress: "Adresse",
    downloadVcard: "vCard (.vcf) herunterladen",
    privacy: "Wird sauber in Apple Contacts, Google Contacts und Outlook importiert. KI-gestützte Bilderkennung.",
  },
  it: {
    dropLabel: "Foto del biglietto da visita",
    readingCard: "Lettura del biglietto…",
    extractBtn: "Estrai dettagli di contatto",
    fieldName: "Nome",
    fieldTitle: "Titolo",
    fieldCompany: "Azienda",
    fieldEmail: "Email",
    fieldPhone: "Telefono",
    fieldWebsite: "Sito web",
    fieldAddress: "Indirizzo",
    downloadVcard: "Scarica vCard (.vcf)",
    privacy: "Importa correttamente in Apple Contacts, Google Contacts e Outlook. Basato su visione IA.",
  },
  nl: {
    dropLabel: "Foto van visitekaartje",
    readingCard: "Kaart wordt gelezen…",
    extractBtn: "Contactgegevens extraheren",
    fieldName: "Naam",
    fieldTitle: "Titel",
    fieldCompany: "Bedrijf",
    fieldEmail: "E-mail",
    fieldPhone: "Telefoon",
    fieldWebsite: "Website",
    fieldAddress: "Adres",
    downloadVcard: "vCard (.vcf) downloaden",
    privacy: "Importeert soepel in Apple Contacts, Google Contacts en Outlook. Aangedreven door AI-visie.",
  },
  ja: {
    dropLabel: "名刺の写真",
    readingCard: "カードを読み取り中…",
    extractBtn: "連絡先情報を抽出",
    fieldName: "氏名",
    fieldTitle: "役職",
    fieldCompany: "会社",
    fieldEmail: "メール",
    fieldPhone: "電話",
    fieldWebsite: "ウェブサイト",
    fieldAddress: "住所",
    downloadVcard: "vCard (.vcf) をダウンロード",
    privacy: "Apple Contacts、Google Contacts、Outlookにきれいにインポートできます。AI ビジョンを使用。",
  },
  zh: {
    dropLabel: "名片照片",
    readingCard: "正在读取名片…",
    extractBtn: "提取联系人信息",
    fieldName: "姓名",
    fieldTitle: "职位",
    fieldCompany: "公司",
    fieldEmail: "电子邮件",
    fieldPhone: "电话",
    fieldWebsite: "网站",
    fieldAddress: "地址",
    downloadVcard: "下载 vCard (.vcf)",
    privacy: "可干净地导入 Apple Contacts、Google Contacts 和 Outlook。由 AI 视觉驱动。",
  },
  ko: {
    dropLabel: "명함 사진",
    readingCard: "명함 읽는 중…",
    extractBtn: "연락처 정보 추출",
    fieldName: "이름",
    fieldTitle: "직함",
    fieldCompany: "회사",
    fieldEmail: "이메일",
    fieldPhone: "전화",
    fieldWebsite: "웹사이트",
    fieldAddress: "주소",
    downloadVcard: "vCard (.vcf) 다운로드",
    privacy: "Apple Contacts, Google Contacts 및 Outlook으로 깔끔하게 가져옵니다. AI 비전 기반.",
  },
  ar: {
    dropLabel: "صورة بطاقة العمل",
    readingCard: "جاريقراءة البطاقة…",
    extractBtn: "استخراج بيانات الاتصال",
    fieldName: "الاسم",
    fieldTitle: "المسمى الوظيفي",
    fieldCompany: "الشركة",
    fieldEmail: "البريد الإلكتروني",
    fieldPhone: "الهاتف",
    fieldWebsite: "الموقع الإلكتروني",
    fieldAddress: "العنوان",
    downloadVcard: "تنزيل vCard (.vcf)",
    privacy: "يستورد بسلاسة إلى Apple Contacts وGoogle Contacts وOutlook. مدعوم برؤية الذكاء الاصطناعي.",
  },
  ru: {
    dropLabel: "Фото визитки",
    readingCard: "Читаем карточку…",
    extractBtn: "Извлечь контактные данные",
    fieldName: "Имя",
    fieldTitle: "Должность",
    fieldCompany: "Компания",
    fieldEmail: "Эл. почта",
    fieldPhone: "Телефон",
    fieldWebsite: "Сайт",
    fieldAddress: "Адрес",
    downloadVcard: "Скачать vCard (.vcf)",
    privacy: "Импортируется в Apple Contacts, Google Contacts и Outlook. Работает на ИИ-зрении.",
  },
  hi: {
    dropLabel: "बिज़नेस कार्ड की फ़ोटो",
    readingCard: "कार्ड पढ़ा जा रहा है…",
    extractBtn: "संपर्क विवरण निकालें",
    fieldName: "नाम",
    fieldTitle: "पदनाम",
    fieldCompany: "कंपनी",
    fieldEmail: "ईमेल",
    fieldPhone: "फ़ोन",
    fieldWebsite: "वेबसाइट",
    fieldAddress: "पता",
    downloadVcard: "vCard (.vcf) डाउनलोड करें",
    privacy: "Apple Contacts, Google Contacts और Outlook में आसानी से आयात होता है। AI दृष्टि द्वारा संचालित।",
  },
  tr: {
    dropLabel: "Kartvizit fotoğrafı",
    readingCard: "Kart okunuyor…",
    extractBtn: "İletişim bilgilerini çıkar",
    fieldName: "Ad",
    fieldTitle: "Unvan",
    fieldCompany: "Şirket",
    fieldEmail: "E-posta",
    fieldPhone: "Telefon",
    fieldWebsite: "Web sitesi",
    fieldAddress: "Adres",
    downloadVcard: "vCard (.vcf) indir",
    privacy: "Apple Contacts, Google Contacts ve Outlook'a temiz şekilde aktarır. Yapay zeka görüntü teknolojisi ile.",
  },
  id: {
    dropLabel: "Foto kartu nama",
    readingCard: "Membaca kartu…",
    extractBtn: "Ekstrak detail kontak",
    fieldName: "Nama",
    fieldTitle: "Jabatan",
    fieldCompany: "Perusahaan",
    fieldEmail: "Email",
    fieldPhone: "Telepon",
    fieldWebsite: "Website",
    fieldAddress: "Alamat",
    downloadVcard: "Unduh vCard (.vcf)",
    privacy: "Diimpor dengan rapi ke Apple Contacts, Google Contacts, dan Outlook. Didukung oleh AI vision.",
  },
  vi: {
    dropLabel: "Ảnh danh thiếp",
    readingCard: "Đang đọc thẻ…",
    extractBtn: "Trích xuất thông tin liên hệ",
    fieldName: "Tên",
    fieldTitle: "Chức danh",
    fieldCompany: "Công ty",
    fieldEmail: "Email",
    fieldPhone: "Điện thoại",
    fieldWebsite: "Trang web",
    fieldAddress: "Địa chỉ",
    downloadVcard: "Tải xuống vCard (.vcf)",
    privacy: "Nhập gọn vào Apple Contacts, Google Contacts và Outlook. Được hỗ trợ bởi AI vision.",
  },
  sv: {
    dropLabel: "Foto av visitkort",
    readingCard: "Läser kortet…",
    extractBtn: "Extrahera kontaktuppgifter",
    fieldName: "Namn",
    fieldTitle: "Titel",
    fieldCompany: "Företag",
    fieldEmail: "E-post",
    fieldPhone: "Telefon",
    fieldWebsite: "Webbplats",
    fieldAddress: "Adress",
    downloadVcard: "Ladda ned vCard (.vcf)",
    privacy: "Importeras smidigt till Apple Contacts, Google Contacts och Outlook. Drivs av AI-vision.",
  },
  pl: {
    dropLabel: "Zdjęcie wizytówki",
    readingCard: "Odczytywanie karty…",
    extractBtn: "Wyodrębnij dane kontaktowe",
    fieldName: "Imię i nazwisko",
    fieldTitle: "Stanowisko",
    fieldCompany: "Firma",
    fieldEmail: "E-mail",
    fieldPhone: "Telefon",
    fieldWebsite: "Strona internetowa",
    fieldAddress: "Adres",
    downloadVcard: "Pobierz vCard (.vcf)",
    privacy: "Importuje się bez problemów do Apple Contacts, Google Contacts i Outlooka. Obsługiwane przez AI vision.",
  },
  uk: {
    dropLabel: "Фото візитки",
    readingCard: "Читаємо картку…",
    extractBtn: "Витягти контактні дані",
    fieldName: "Ім'я",
    fieldTitle: "Посада",
    fieldCompany: "Компанія",
    fieldEmail: "Ел. пошта",
    fieldPhone: "Телефон",
    fieldWebsite: "Сайт",
    fieldAddress: "Адреса",
    downloadVcard: "Завантажити vCard (.vcf)",
    privacy: "Імпортується в Apple Contacts, Google Contacts та Outlook. Працює на ШІ-зорі.",
  },
  cs: {
    dropLabel: "Fotografie vizitky",
    readingCard: "Čtení karty…",
    extractBtn: "Extrahovat kontaktní údaje",
    fieldName: "Jméno",
    fieldTitle: "Titul",
    fieldCompany: "Společnost",
    fieldEmail: "E-mail",
    fieldPhone: "Telefon",
    fieldWebsite: "Webová stránka",
    fieldAddress: "Adresa",
    downloadVcard: "Stáhnout vCard (.vcf)",
    privacy: "Importuje čistě do Apple Contacts, Google Contacts a Outlooku. Poháněno AI vizí.",
  },
};

function vcardEscape(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

function buildVcard(c: Card): string {
  const lines = ["BEGIN:VCARD", "VERSION:3.0"];
  if (c.name) lines.push(`FN:${vcardEscape(c.name)}`);
  if (c.title) lines.push(`TITLE:${vcardEscape(c.title)}`);
  if (c.company) lines.push(`ORG:${vcardEscape(c.company)}`);
  if (c.email) lines.push(`EMAIL;TYPE=WORK:${c.email.trim()}`);
  if (c.phone) lines.push(`TEL;TYPE=WORK,VOICE:${c.phone.trim()}`);
  if (c.website) lines.push(`URL:${c.website.trim()}`);
  if (c.address) lines.push(`ADR;TYPE=WORK:;;${vcardEscape(c.address)};;;;`);
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

export function BusinessCardScannerClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [card, setCard] = useState<Card | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (!file) return;
    setBusy(true); setError(null); setCard(null);
    try {
      setCard(await callVisionJson<Card>("business-card-scanner", "business-card", file));
    } catch (e) {
      setError((e as Error).message);
    } finally { setBusy(false); }
  }

  const downloadVcf = () => {
    if (!card) return;
    const blob = new Blob([buildVcard(card)], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `${(card.name ?? "contact").replace(/\s+/g, "-").toLowerCase()}.vcf`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  const row = (label: string, v: string | null) => (
    <tr className="border-b border-ink-100 last:border-0">
      <td className="bg-ink-50/50 px-3 py-2 font-medium text-ink-600 w-1/3">{label}</td>
      <td className="px-3 py-2 text-ink-900">{v ?? <span className="text-ink-400">—</span>}</td>
    </tr>
  );

  return (
    <div className="space-y-5">
      <MiniDrop
        label={s.dropLabel}
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setCard(null); }}
        current={file}
      />

      {file && (
        <Button onClick={run} disabled={busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />}
          {busy ? s.readingCard : s.extractBtn}
        </Button>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {card && (
        <>
          <div className="overflow-hidden rounded-lg border border-ink-100">
            <table className="w-full text-sm">
              <tbody>
                {row(s.fieldName, card.name)} {row(s.fieldTitle, card.title)} {row(s.fieldCompany, card.company)}
                {row(s.fieldEmail, card.email)} {row(s.fieldPhone, card.phone)} {row(s.fieldWebsite, card.website)} {row(s.fieldAddress, card.address)}
              </tbody>
            </table>
          </div>
          <Button onClick={downloadVcf} size="lg">
            <Download className="h-4 w-4" /> {s.downloadVcard}
          </Button>
        </>
      )}

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
