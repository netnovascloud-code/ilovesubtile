"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

type Line = { id: string; desc: string; qty: number; unitPrice: number };

const CURRENCIES = ["EUR", "USD", "GBP", "CHF", "CAD", "AUD"];

function fmt(value: number, cur: string): string {
  try {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: cur, maximumFractionDigits: 2 }).format(value);
  } catch {
    return value.toFixed(2) + " " + cur;
  }
}

const T: Record<string, Record<string, string>> = {
  en: {
    from: "From (you)",
    bill_to: "Bill to (customer)",
    invoice_no: "Invoice #",
    date: "Date",
    due: "Due",
    currency: "Currency",
    line_items: "Line items",
    description_placeholder: "Description",
    qty_placeholder: "Qty",
    unit_placeholder: "Unit",
    add_line: "Add line",
    notes_label: "Notes / payment terms",
    vat_rate: "VAT rate (%)",
    summary: "Summary",
    subtotal: "Subtotal",
    vat: "VAT",
    total: "Total",
    building_pdf: "Building PDF…",
    generate_pdf: "Generate PDF",
    download_invoice: "Download invoice",
    browser_note: "100% in your browser via pdf-lib — invoice data never leaves your device.",
    warn_chars: "Some characters aren't supported by the built-in PDF font and were simplified. Use Latin characters (or a EUR/USD/GBP-style currency) for best results.",
    warn_fail: "Could not generate the PDF. Please remove unusual characters and try again.",
    // PDF labels
    pdf_invoice: "INVOICE",
    pdf_from: "FROM",
    pdf_bill_to: "BILL TO",
    pdf_invoice_date: "INVOICE DATE",
    pdf_due_date: "DUE DATE",
    pdf_description: "DESCRIPTION",
    pdf_qty: "QTY",
    pdf_unit: "UNIT",
    pdf_amount: "AMOUNT",
    pdf_subtotal: "Subtotal",
    pdf_total: "TOTAL",
    pdf_notes: "NOTES",
    // default field values
    default_notes: "Payment due within 30 days. Thank you for your business.",
    default_line1: "Consulting services — November",
    default_line2: "Hosting & maintenance",
  },
  fr: {
    from: "De (vous)",
    bill_to: "Facturer à (client)",
    invoice_no: "Facture n°",
    date: "Date",
    due: "Échéance",
    currency: "Devise",
    line_items: "Lignes de facturation",
    description_placeholder: "Description",
    qty_placeholder: "Qté",
    unit_placeholder: "Unité",
    add_line: "Ajouter une ligne",
    notes_label: "Notes / conditions de paiement",
    vat_rate: "Taux de TVA (%)",
    summary: "Récapitulatif",
    subtotal: "Sous-total",
    vat: "TVA",
    total: "Total",
    building_pdf: "Génération du PDF…",
    generate_pdf: "Générer le PDF",
    download_invoice: "Télécharger la facture",
    browser_note: "100 % dans votre navigateur via pdf-lib — les données de la facture ne quittent jamais votre appareil.",
    warn_chars: "Certains caractères ne sont pas pris en charge par la police PDF intégrée et ont été simplifiés. Utilisez des caractères latins pour de meilleurs résultats.",
    warn_fail: "Impossible de générer le PDF. Supprimez les caractères inhabituels et réessayez.",
    pdf_invoice: "FACTURE",
    pdf_from: "DE",
    pdf_bill_to: "FACTURER À",
    pdf_invoice_date: "DATE DE FACTURE",
    pdf_due_date: "DATE D'ÉCHÉANCE",
    pdf_description: "DESCRIPTION",
    pdf_qty: "QTÉ",
    pdf_unit: "UNITÉ",
    pdf_amount: "MONTANT",
    pdf_subtotal: "Sous-total",
    pdf_total: "TOTAL",
    pdf_notes: "NOTES",
    default_notes: "Paiement dû dans les 30 jours. Merci pour votre confiance.",
    default_line1: "Services de conseil — Novembre",
    default_line2: "Hébergement et maintenance",
  },
  es: {
    from: "De (usted)",
    bill_to: "Facturar a (cliente)",
    invoice_no: "Factura n.°",
    date: "Fecha",
    due: "Vencimiento",
    currency: "Moneda",
    line_items: "Líneas de factura",
    description_placeholder: "Descripción",
    qty_placeholder: "Cant.",
    unit_placeholder: "Unidad",
    add_line: "Añadir línea",
    notes_label: "Notas / condiciones de pago",
    vat_rate: "Tasa de IVA (%)",
    summary: "Resumen",
    subtotal: "Subtotal",
    vat: "IVA",
    total: "Total",
    building_pdf: "Generando PDF…",
    generate_pdf: "Generar PDF",
    download_invoice: "Descargar factura",
    browser_note: "100 % en tu navegador con pdf-lib — los datos de la factura nunca salen de tu dispositivo.",
    warn_chars: "Algunos caracteres no son compatibles con la fuente PDF integrada y se simplificaron. Usa caracteres latinos para obtener mejores resultados.",
    warn_fail: "No se pudo generar el PDF. Elimina los caracteres inusuales e inténtalo de nuevo.",
    pdf_invoice: "FACTURA",
    pdf_from: "DE",
    pdf_bill_to: "FACTURAR A",
    pdf_invoice_date: "FECHA DE FACTURA",
    pdf_due_date: "FECHA DE VENCIMIENTO",
    pdf_description: "DESCRIPCIÓN",
    pdf_qty: "CANT.",
    pdf_unit: "UNIDAD",
    pdf_amount: "IMPORTE",
    pdf_subtotal: "Subtotal",
    pdf_total: "TOTAL",
    pdf_notes: "NOTAS",
    default_notes: "Pago con vencimiento en 30 días. Gracias por su negocio.",
    default_line1: "Servicios de consultoría — Noviembre",
    default_line2: "Alojamiento y mantenimiento",
  },
  pt: {
    from: "De (você)",
    bill_to: "Faturar para (cliente)",
    invoice_no: "Fatura n.°",
    date: "Data",
    due: "Vencimento",
    currency: "Moeda",
    line_items: "Itens da fatura",
    description_placeholder: "Descrição",
    qty_placeholder: "Qtd.",
    unit_placeholder: "Unidade",
    add_line: "Adicionar linha",
    notes_label: "Notas / condições de pagamento",
    vat_rate: "Taxa de IVA (%)",
    summary: "Resumo",
    subtotal: "Subtotal",
    vat: "IVA",
    total: "Total",
    building_pdf: "Gerando PDF…",
    generate_pdf: "Gerar PDF",
    download_invoice: "Baixar fatura",
    browser_note: "100% no seu navegador com pdf-lib — os dados da fatura nunca saem do seu dispositivo.",
    warn_chars: "Alguns caracteres não são suportados pela fonte PDF integrada e foram simplificados. Use caracteres latinos para melhores resultados.",
    warn_fail: "Não foi possível gerar o PDF. Remova caracteres incomuns e tente novamente.",
    pdf_invoice: "FATURA",
    pdf_from: "DE",
    pdf_bill_to: "FATURAR PARA",
    pdf_invoice_date: "DATA DA FATURA",
    pdf_due_date: "DATA DE VENCIMENTO",
    pdf_description: "DESCRIÇÃO",
    pdf_qty: "QTD.",
    pdf_unit: "UNIDADE",
    pdf_amount: "VALOR",
    pdf_subtotal: "Subtotal",
    pdf_total: "TOTAL",
    pdf_notes: "NOTAS",
    default_notes: "Pagamento com vencimento em 30 dias. Obrigado pelo seu negócio.",
    default_line1: "Serviços de consultoria — Novembro",
    default_line2: "Hospedagem e manutenção",
  },
  de: {
    from: "Von (Ihnen)",
    bill_to: "Rechnung an (Kunde)",
    invoice_no: "Rechnung Nr.",
    date: "Datum",
    due: "Fällig",
    currency: "Währung",
    line_items: "Positionen",
    description_placeholder: "Beschreibung",
    qty_placeholder: "Menge",
    unit_placeholder: "Einheit",
    add_line: "Position hinzufügen",
    notes_label: "Notizen / Zahlungsbedingungen",
    vat_rate: "MwSt.-Satz (%)",
    summary: "Zusammenfassung",
    subtotal: "Zwischensumme",
    vat: "MwSt.",
    total: "Gesamt",
    building_pdf: "PDF wird erstellt…",
    generate_pdf: "PDF generieren",
    download_invoice: "Rechnung herunterladen",
    browser_note: "100 % in Ihrem Browser mit pdf-lib — Rechnungsdaten verlassen nie Ihr Gerät.",
    warn_chars: "Einige Zeichen werden von der integrierten PDF-Schriftart nicht unterstützt und wurden vereinfacht. Verwenden Sie lateinische Zeichen für beste Ergebnisse.",
    warn_fail: "Das PDF konnte nicht erstellt werden. Entfernen Sie ungewöhnliche Zeichen und versuchen Sie es erneut.",
    pdf_invoice: "RECHNUNG",
    pdf_from: "VON",
    pdf_bill_to: "RECHNUNG AN",
    pdf_invoice_date: "RECHNUNGSDATUM",
    pdf_due_date: "FÄLLIGKEITSDATUM",
    pdf_description: "BESCHREIBUNG",
    pdf_qty: "MENGE",
    pdf_unit: "EINHEIT",
    pdf_amount: "BETRAG",
    pdf_subtotal: "Zwischensumme",
    pdf_total: "GESAMT",
    pdf_notes: "NOTIZEN",
    default_notes: "Zahlung fällig innerhalb von 30 Tagen. Vielen Dank für Ihr Vertrauen.",
    default_line1: "Beratungsleistungen — November",
    default_line2: "Hosting & Wartung",
  },
  it: {
    from: "Da (te)",
    bill_to: "Fatturare a (cliente)",
    invoice_no: "Fattura n.",
    date: "Data",
    due: "Scadenza",
    currency: "Valuta",
    line_items: "Voci della fattura",
    description_placeholder: "Descrizione",
    qty_placeholder: "Qtà",
    unit_placeholder: "Unità",
    add_line: "Aggiungi voce",
    notes_label: "Note / condizioni di pagamento",
    vat_rate: "Aliquota IVA (%)",
    summary: "Riepilogo",
    subtotal: "Imponibile",
    vat: "IVA",
    total: "Totale",
    building_pdf: "Generazione PDF…",
    generate_pdf: "Genera PDF",
    download_invoice: "Scarica fattura",
    browser_note: "100% nel tuo browser con pdf-lib — i dati della fattura non lasciano mai il tuo dispositivo.",
    warn_chars: "Alcuni caratteri non sono supportati dal font PDF integrato e sono stati semplificati. Usa caratteri latini per i migliori risultati.",
    warn_fail: "Impossibile generare il PDF. Rimuovi i caratteri insoliti e riprova.",
    pdf_invoice: "FATTURA",
    pdf_from: "DA",
    pdf_bill_to: "FATTURARE A",
    pdf_invoice_date: "DATA FATTURA",
    pdf_due_date: "DATA SCADENZA",
    pdf_description: "DESCRIZIONE",
    pdf_qty: "QTÀ",
    pdf_unit: "UNITÀ",
    pdf_amount: "IMPORTO",
    pdf_subtotal: "Imponibile",
    pdf_total: "TOTALE",
    pdf_notes: "NOTE",
    default_notes: "Pagamento entro 30 giorni. Grazie per la fiducia.",
    default_line1: "Servizi di consulenza — Novembre",
    default_line2: "Hosting e manutenzione",
  },
  nl: {
    from: "Van (u)",
    bill_to: "Factureren aan (klant)",
    invoice_no: "Factuur nr.",
    date: "Datum",
    due: "Vervaldatum",
    currency: "Valuta",
    line_items: "Factuurregels",
    description_placeholder: "Omschrijving",
    qty_placeholder: "Aant.",
    unit_placeholder: "Eenheid",
    add_line: "Regel toevoegen",
    notes_label: "Notities / betalingsvoorwaarden",
    vat_rate: "BTW-tarief (%)",
    summary: "Overzicht",
    subtotal: "Subtotaal",
    vat: "BTW",
    total: "Totaal",
    building_pdf: "PDF aanmaken…",
    generate_pdf: "PDF genereren",
    download_invoice: "Factuur downloaden",
    browser_note: "100% in uw browser met pdf-lib — factuurgegevens verlaten nooit uw apparaat.",
    warn_chars: "Sommige tekens worden niet ondersteund door het ingebouwde PDF-lettertype en zijn vereenvoudigd. Gebruik Latijnse tekens voor de beste resultaten.",
    warn_fail: "Kon de PDF niet genereren. Verwijder ongebruikelijke tekens en probeer opnieuw.",
    pdf_invoice: "FACTUUR",
    pdf_from: "VAN",
    pdf_bill_to: "FACTUREREN AAN",
    pdf_invoice_date: "FACTUURDATUM",
    pdf_due_date: "VERVALDATUM",
    pdf_description: "OMSCHRIJVING",
    pdf_qty: "AANT.",
    pdf_unit: "EENHEID",
    pdf_amount: "BEDRAG",
    pdf_subtotal: "Subtotaal",
    pdf_total: "TOTAAL",
    pdf_notes: "NOTITIES",
    default_notes: "Betaling binnen 30 dagen. Bedankt voor uw opdracht.",
    default_line1: "Advieswerk — november",
    default_line2: "Hosting & onderhoud",
  },
  ja: {
    from: "送信元（あなた）",
    bill_to: "請求先（顧客）",
    invoice_no: "請求書番号",
    date: "日付",
    due: "支払期限",
    currency: "通貨",
    line_items: "明細",
    description_placeholder: "説明",
    qty_placeholder: "数量",
    unit_placeholder: "単価",
    add_line: "明細を追加",
    notes_label: "メモ / 支払条件",
    vat_rate: "消費税率 (%)",
    summary: "サマリー",
    subtotal: "小計",
    vat: "消費税",
    total: "合計",
    building_pdf: "PDF作成中…",
    generate_pdf: "PDFを生成",
    download_invoice: "請求書をダウンロード",
    browser_note: "pdf-libを使用してブラウザ内で完結 — 請求書データがデバイスから外に出ることはありません。",
    warn_chars: "一部の文字は組み込みPDFフォントでサポートされておらず、簡略化されました。最良の結果を得るためにラテン文字をご使用ください。",
    warn_fail: "PDFを生成できませんでした。特殊文字を削除して再度お試しください。",
    pdf_invoice: "INVOICE",
    pdf_from: "FROM",
    pdf_bill_to: "BILL TO",
    pdf_invoice_date: "INVOICE DATE",
    pdf_due_date: "DUE DATE",
    pdf_description: "DESCRIPTION",
    pdf_qty: "QTY",
    pdf_unit: "UNIT",
    pdf_amount: "AMOUNT",
    pdf_subtotal: "Subtotal",
    pdf_total: "TOTAL",
    pdf_notes: "NOTES",
    default_notes: "支払期限：30日以内。ご利用ありがとうございます。",
    default_line1: "コンサルティングサービス — 11月",
    default_line2: "ホスティング & メンテナンス",
  },
  zh: {
    from: "发件方（您）",
    bill_to: "账单接收方（客户）",
    invoice_no: "发票编号",
    date: "日期",
    due: "到期日",
    currency: "货币",
    line_items: "明细项目",
    description_placeholder: "描述",
    qty_placeholder: "数量",
    unit_placeholder: "单价",
    add_line: "添加项目",
    notes_label: "备注 / 付款条款",
    vat_rate: "增值税率 (%)",
    summary: "汇总",
    subtotal: "小计",
    vat: "增值税",
    total: "总计",
    building_pdf: "生成PDF中…",
    generate_pdf: "生成PDF",
    download_invoice: "下载发票",
    browser_note: "完全在您的浏览器中通过pdf-lib处理 — 发票数据永不离开您的设备。",
    warn_chars: "某些字符不受内置PDF字体支持，已被简化。建议使用拉丁字符以获得最佳效果。",
    warn_fail: "无法生成PDF。请删除特殊字符后重试。",
    pdf_invoice: "INVOICE",
    pdf_from: "FROM",
    pdf_bill_to: "BILL TO",
    pdf_invoice_date: "INVOICE DATE",
    pdf_due_date: "DUE DATE",
    pdf_description: "DESCRIPTION",
    pdf_qty: "QTY",
    pdf_unit: "UNIT",
    pdf_amount: "AMOUNT",
    pdf_subtotal: "Subtotal",
    pdf_total: "TOTAL",
    pdf_notes: "NOTES",
    default_notes: "请于30天内付款。感谢您的业务。",
    default_line1: "咨询服务 — 11月",
    default_line2: "托管 & 维护",
  },
  ko: {
    from: "발신인 (귀하)",
    bill_to: "청구 대상 (고객)",
    invoice_no: "청구서 번호",
    date: "날짜",
    due: "납기일",
    currency: "통화",
    line_items: "항목 내역",
    description_placeholder: "설명",
    qty_placeholder: "수량",
    unit_placeholder: "단가",
    add_line: "항목 추가",
    notes_label: "메모 / 결제 조건",
    vat_rate: "부가세율 (%)",
    summary: "요약",
    subtotal: "소계",
    vat: "부가세",
    total: "합계",
    building_pdf: "PDF 생성 중…",
    generate_pdf: "PDF 생성",
    download_invoice: "청구서 다운로드",
    browser_note: "pdf-lib를 사용해 브라우저에서 완전히 처리 — 청구서 데이터가 기기를 벗어나지 않습니다.",
    warn_chars: "일부 문자는 내장 PDF 폰트에서 지원되지 않아 단순화되었습니다. 최상의 결과를 위해 라틴 문자를 사용하세요.",
    warn_fail: "PDF를 생성할 수 없습니다. 특수 문자를 제거하고 다시 시도하세요.",
    pdf_invoice: "INVOICE",
    pdf_from: "FROM",
    pdf_bill_to: "BILL TO",
    pdf_invoice_date: "INVOICE DATE",
    pdf_due_date: "DUE DATE",
    pdf_description: "DESCRIPTION",
    pdf_qty: "QTY",
    pdf_unit: "UNIT",
    pdf_amount: "AMOUNT",
    pdf_subtotal: "Subtotal",
    pdf_total: "TOTAL",
    pdf_notes: "NOTES",
    default_notes: "청구서 수령 후 30일 이내 결제 바랍니다. 감사합니다.",
    default_line1: "컨설팅 서비스 — 11월",
    default_line2: "호스팅 & 유지보수",
  },
  ar: {
    from: "من (أنت)",
    bill_to: "الفاتورة إلى (العميل)",
    invoice_no: "رقم الفاتورة",
    date: "التاريخ",
    due: "تاريخ الاستحقاق",
    currency: "العملة",
    line_items: "بنود الفاتورة",
    description_placeholder: "الوصف",
    qty_placeholder: "الكمية",
    unit_placeholder: "سعر الوحدة",
    add_line: "إضافة بند",
    notes_label: "ملاحظات / شروط الدفع",
    vat_rate: "نسبة ضريبة القيمة المضافة (%)",
    summary: "الملخص",
    subtotal: "المجموع الفرعي",
    vat: "ضريبة القيمة المضافة",
    total: "الإجمالي",
    building_pdf: "جارٍ إنشاء PDF…",
    generate_pdf: "إنشاء PDF",
    download_invoice: "تنزيل الفاتورة",
    browser_note: "100% في متصفحك عبر pdf-lib — بيانات الفاتورة لا تغادر جهازك أبدًا.",
    warn_chars: "بعض الأحرف غير مدعومة في خط PDF المدمج وتم تبسيطها. استخدم أحرفًا لاتينية للحصول على أفضل النتائج.",
    warn_fail: "تعذّر إنشاء PDF. يُرجى إزالة الأحرف غير المعتادة والمحاولة مجددًا.",
    pdf_invoice: "INVOICE",
    pdf_from: "FROM",
    pdf_bill_to: "BILL TO",
    pdf_invoice_date: "INVOICE DATE",
    pdf_due_date: "DUE DATE",
    pdf_description: "DESCRIPTION",
    pdf_qty: "QTY",
    pdf_unit: "UNIT",
    pdf_amount: "AMOUNT",
    pdf_subtotal: "Subtotal",
    pdf_total: "TOTAL",
    pdf_notes: "NOTES",
    default_notes: "الدفع مستحق خلال 30 يومًا. شكرًا على تعاملكم معنا.",
    default_line1: "خدمات استشارية — نوفمبر",
    default_line2: "الاستضافة والصيانة",
  },
  ru: {
    from: "От (вас)",
    bill_to: "Выставить счёт (клиент)",
    invoice_no: "Счёт №",
    date: "Дата",
    due: "Срок оплаты",
    currency: "Валюта",
    line_items: "Позиции счёта",
    description_placeholder: "Описание",
    qty_placeholder: "Кол-во",
    unit_placeholder: "Цена",
    add_line: "Добавить позицию",
    notes_label: "Примечания / условия оплаты",
    vat_rate: "Ставка НДС (%)",
    summary: "Итого",
    subtotal: "Сумма без НДС",
    vat: "НДС",
    total: "Итого",
    building_pdf: "Создание PDF…",
    generate_pdf: "Создать PDF",
    download_invoice: "Скачать счёт",
    browser_note: "100% в вашем браузере с pdf-lib — данные счёта никогда не покидают устройство.",
    warn_chars: "Некоторые символы не поддерживаются встроенным шрифтом PDF и были упрощены. Используйте латинские символы для лучших результатов.",
    warn_fail: "Не удалось создать PDF. Удалите необычные символы и попробуйте снова.",
    pdf_invoice: "СЧЁТ",
    pdf_from: "ОТ",
    pdf_bill_to: "КОМУ",
    pdf_invoice_date: "ДАТА СЧЁТА",
    pdf_due_date: "СРОК ОПЛАТЫ",
    pdf_description: "ОПИСАНИЕ",
    pdf_qty: "КОЛ-ВО",
    pdf_unit: "ЦЕНА",
    pdf_amount: "СУММА",
    pdf_subtotal: "Без НДС",
    pdf_total: "ИТОГО",
    pdf_notes: "ПРИМЕЧАНИЯ",
    default_notes: "Оплата в течение 30 дней. Спасибо за сотрудничество.",
    default_line1: "Консалтинговые услуги — ноябрь",
    default_line2: "Хостинг и обслуживание",
  },
  hi: {
    from: "प्रेषक (आप)",
    bill_to: "बिल प्राप्तकर्ता (ग्राहक)",
    invoice_no: "इनवॉइस #",
    date: "तारीख",
    due: "देय तिथि",
    currency: "मुद्रा",
    line_items: "लाइन आइटम",
    description_placeholder: "विवरण",
    qty_placeholder: "मात्रा",
    unit_placeholder: "इकाई मूल्य",
    add_line: "लाइन जोड़ें",
    notes_label: "नोट्स / भुगतान शर्तें",
    vat_rate: "GST दर (%)",
    summary: "सारांश",
    subtotal: "उप-कुल",
    vat: "GST",
    total: "कुल",
    building_pdf: "PDF बना रहा है…",
    generate_pdf: "PDF जनरेट करें",
    download_invoice: "इनवॉइस डाउनलोड करें",
    browser_note: "pdf-lib के ज़रिए पूरी तरह आपके ब्राउज़र में — इनवॉइस डेटा कभी आपके डिवाइस से बाहर नहीं जाता।",
    warn_chars: "कुछ वर्ण अंतर्निहित PDF फ़ॉन्ट द्वारा समर्थित नहीं हैं और सरल बना दिए गए। सर्वोत्तम परिणाम के लिए लैटिन वर्णों का उपयोग करें।",
    warn_fail: "PDF जनरेट नहीं हो सका। असामान्य वर्ण हटाएं और पुनः प्रयास करें।",
    pdf_invoice: "INVOICE",
    pdf_from: "FROM",
    pdf_bill_to: "BILL TO",
    pdf_invoice_date: "INVOICE DATE",
    pdf_due_date: "DUE DATE",
    pdf_description: "DESCRIPTION",
    pdf_qty: "QTY",
    pdf_unit: "UNIT",
    pdf_amount: "AMOUNT",
    pdf_subtotal: "Subtotal",
    pdf_total: "TOTAL",
    pdf_notes: "NOTES",
    default_notes: "30 दिनों के भीतर भुगतान करें। आपके व्यवसाय के लिए धन्यवाद।",
    default_line1: "परामर्श सेवाएं — नवंबर",
    default_line2: "होस्टिंग और रखरखाव",
  },
  tr: {
    from: "Gönderen (siz)",
    bill_to: "Fatura alıcısı (müşteri)",
    invoice_no: "Fatura No",
    date: "Tarih",
    due: "Vade",
    currency: "Para birimi",
    line_items: "Fatura kalemleri",
    description_placeholder: "Açıklama",
    qty_placeholder: "Miktar",
    unit_placeholder: "Birim fiyat",
    add_line: "Kalem ekle",
    notes_label: "Notlar / ödeme koşulları",
    vat_rate: "KDV oranı (%)",
    summary: "Özet",
    subtotal: "Ara toplam",
    vat: "KDV",
    total: "Toplam",
    building_pdf: "PDF oluşturuluyor…",
    generate_pdf: "PDF oluştur",
    download_invoice: "Faturayı indir",
    browser_note: "pdf-lib aracılığıyla tamamen tarayıcınızda işlenir — fatura verileri asla cihazınızı terk etmez.",
    warn_chars: "Bazı karakterler yerleşik PDF yazı tipi tarafından desteklenmemekte ve basitleştirilmiştir. En iyi sonuçlar için Latin karakterler kullanın.",
    warn_fail: "PDF oluşturulamadı. Olağandışı karakterleri kaldırın ve tekrar deneyin.",
    pdf_invoice: "FATURA",
    pdf_from: "GÖNDEREN",
    pdf_bill_to: "FATURA ALICISI",
    pdf_invoice_date: "FATURA TARİHİ",
    pdf_due_date: "VADE TARİHİ",
    pdf_description: "AÇIKLAMA",
    pdf_qty: "MİKTAR",
    pdf_unit: "BİRİM",
    pdf_amount: "TUTAR",
    pdf_subtotal: "Ara toplam",
    pdf_total: "TOPLAM",
    pdf_notes: "NOTLAR",
    default_notes: "Ödeme 30 gün içinde yapılmalıdır. İş birliğiniz için teşekkürler.",
    default_line1: "Danışmanlık hizmetleri — Kasım",
    default_line2: "Barındırma ve bakım",
  },
  id: {
    from: "Dari (Anda)",
    bill_to: "Tagihkan ke (pelanggan)",
    invoice_no: "No. Faktur",
    date: "Tanggal",
    due: "Jatuh tempo",
    currency: "Mata uang",
    line_items: "Item faktur",
    description_placeholder: "Deskripsi",
    qty_placeholder: "Jml.",
    unit_placeholder: "Harga satuan",
    add_line: "Tambah item",
    notes_label: "Catatan / syarat pembayaran",
    vat_rate: "Tarif PPN (%)",
    summary: "Ringkasan",
    subtotal: "Subtotal",
    vat: "PPN",
    total: "Total",
    building_pdf: "Membuat PDF…",
    generate_pdf: "Buat PDF",
    download_invoice: "Unduh faktur",
    browser_note: "100% di browser Anda melalui pdf-lib — data faktur tidak pernah meninggalkan perangkat Anda.",
    warn_chars: "Beberapa karakter tidak didukung oleh font PDF bawaan dan telah disederhanakan. Gunakan karakter Latin untuk hasil terbaik.",
    warn_fail: "Tidak dapat membuat PDF. Hapus karakter yang tidak biasa dan coba lagi.",
    pdf_invoice: "FAKTUR",
    pdf_from: "DARI",
    pdf_bill_to: "TAGIHKAN KE",
    pdf_invoice_date: "TANGGAL FAKTUR",
    pdf_due_date: "TANGGAL JATUH TEMPO",
    pdf_description: "DESKRIPSI",
    pdf_qty: "JML.",
    pdf_unit: "SATUAN",
    pdf_amount: "JUMLAH",
    pdf_subtotal: "Subtotal",
    pdf_total: "TOTAL",
    pdf_notes: "CATATAN",
    default_notes: "Pembayaran jatuh tempo dalam 30 hari. Terima kasih atas kepercayaan Anda.",
    default_line1: "Layanan konsultasi — November",
    default_line2: "Hosting & pemeliharaan",
  },
  vi: {
    from: "Từ (bạn)",
    bill_to: "Lập hóa đơn cho (khách hàng)",
    invoice_no: "Số hóa đơn",
    date: "Ngày",
    due: "Hạn thanh toán",
    currency: "Tiền tệ",
    line_items: "Các mục hóa đơn",
    description_placeholder: "Mô tả",
    qty_placeholder: "Số lượng",
    unit_placeholder: "Đơn giá",
    add_line: "Thêm dòng",
    notes_label: "Ghi chú / điều khoản thanh toán",
    vat_rate: "Thuế suất VAT (%)",
    summary: "Tổng hợp",
    subtotal: "Tạm tính",
    vat: "VAT",
    total: "Tổng cộng",
    building_pdf: "Đang tạo PDF…",
    generate_pdf: "Tạo PDF",
    download_invoice: "Tải hóa đơn",
    browser_note: "100% trong trình duyệt của bạn qua pdf-lib — dữ liệu hóa đơn không bao giờ rời khỏi thiết bị.",
    warn_chars: "Một số ký tự không được hỗ trợ bởi phông PDF tích hợp và đã được đơn giản hóa. Sử dụng ký tự Latin để có kết quả tốt nhất.",
    warn_fail: "Không thể tạo PDF. Vui lòng xóa các ký tự đặc biệt và thử lại.",
    pdf_invoice: "HÓA ĐƠN",
    pdf_from: "TỪ",
    pdf_bill_to: "LẬP HÓA ĐƠN CHO",
    pdf_invoice_date: "NGÀY HÓA ĐƠN",
    pdf_due_date: "HẠN THANH TOÁN",
    pdf_description: "MÔ TẢ",
    pdf_qty: "SL",
    pdf_unit: "ĐƠN GIÁ",
    pdf_amount: "THÀNH TIỀN",
    pdf_subtotal: "Tạm tính",
    pdf_total: "TỔNG CỘNG",
    pdf_notes: "GHI CHÚ",
    default_notes: "Thanh toán trong vòng 30 ngày. Cảm ơn bạn đã sử dụng dịch vụ.",
    default_line1: "Dịch vụ tư vấn — Tháng 11",
    default_line2: "Hosting & bảo trì",
  },
  sv: {
    from: "Från (dig)",
    bill_to: "Fakturera till (kund)",
    invoice_no: "Faktura nr",
    date: "Datum",
    due: "Förfallodatum",
    currency: "Valuta",
    line_items: "Fakturarader",
    description_placeholder: "Beskrivning",
    qty_placeholder: "Ant.",
    unit_placeholder: "Enhetspris",
    add_line: "Lägg till rad",
    notes_label: "Noteringar / betalningsvillkor",
    vat_rate: "Momssats (%)",
    summary: "Sammanfattning",
    subtotal: "Delsumma",
    vat: "Moms",
    total: "Totalt",
    building_pdf: "Skapar PDF…",
    generate_pdf: "Skapa PDF",
    download_invoice: "Ladda ner faktura",
    browser_note: "100% i din webbläsare med pdf-lib — fakturauppgifterna lämnar aldrig din enhet.",
    warn_chars: "Vissa tecken stöds inte av det inbyggda PDF-teckensnittet och har förenklats. Använd latinska tecken för bästa resultat.",
    warn_fail: "Kunde inte skapa PDF. Ta bort ovanliga tecken och försök igen.",
    pdf_invoice: "FAKTURA",
    pdf_from: "FRÅN",
    pdf_bill_to: "FAKTURERA TILL",
    pdf_invoice_date: "FAKTURADATUM",
    pdf_due_date: "FÖRFALLODATUM",
    pdf_description: "BESKRIVNING",
    pdf_qty: "ANT.",
    pdf_unit: "ENHET",
    pdf_amount: "BELOPP",
    pdf_subtotal: "Delsumma",
    pdf_total: "TOTALT",
    pdf_notes: "NOTERINGAR",
    default_notes: "Betalning förfaller inom 30 dagar. Tack för din affär.",
    default_line1: "Konsulttjänster — november",
    default_line2: "Hosting & underhåll",
  },
  pl: {
    from: "Od (ciebie)",
    bill_to: "Faktura dla (klienta)",
    invoice_no: "Nr faktury",
    date: "Data",
    due: "Termin płatności",
    currency: "Waluta",
    line_items: "Pozycje faktury",
    description_placeholder: "Opis",
    qty_placeholder: "Ilość",
    unit_placeholder: "Cena jedn.",
    add_line: "Dodaj pozycję",
    notes_label: "Uwagi / warunki płatności",
    vat_rate: "Stawka VAT (%)",
    summary: "Podsumowanie",
    subtotal: "Suma netto",
    vat: "VAT",
    total: "Razem",
    building_pdf: "Tworzenie PDF…",
    generate_pdf: "Generuj PDF",
    download_invoice: "Pobierz fakturę",
    browser_note: "100% w Twojej przeglądarce z pdf-lib — dane faktury nigdy nie opuszczają Twojego urządzenia.",
    warn_chars: "Niektóre znaki nie są obsługiwane przez wbudowaną czcionkę PDF i zostały uproszczone. Używaj znaków łacińskich, aby uzyskać najlepsze rezultaty.",
    warn_fail: "Nie można wygenerować PDF. Usuń nietypowe znaki i spróbuj ponownie.",
    pdf_invoice: "FAKTURA",
    pdf_from: "OD",
    pdf_bill_to: "FAKTURA DLA",
    pdf_invoice_date: "DATA FAKTURY",
    pdf_due_date: "TERMIN PŁATNOŚCI",
    pdf_description: "OPIS",
    pdf_qty: "ILOŚĆ",
    pdf_unit: "CENA JEDN.",
    pdf_amount: "KWOTA",
    pdf_subtotal: "Suma netto",
    pdf_total: "RAZEM",
    pdf_notes: "UWAGI",
    default_notes: "Płatność w terminie 30 dni. Dziękujemy za współpracę.",
    default_line1: "Usługi doradcze — listopad",
    default_line2: "Hosting i utrzymanie",
  },
  uk: {
    from: "Від (вас)",
    bill_to: "Виставити рахунок (клієнт)",
    invoice_no: "Рахунок №",
    date: "Дата",
    due: "Термін оплати",
    currency: "Валюта",
    line_items: "Позиції рахунку",
    description_placeholder: "Опис",
    qty_placeholder: "Кількість",
    unit_placeholder: "Ціна за одиницю",
    add_line: "Додати позицію",
    notes_label: "Примітки / умови оплати",
    vat_rate: "Ставка ПДВ (%)",
    summary: "Підсумок",
    subtotal: "Сума без ПДВ",
    vat: "ПДВ",
    total: "Разом",
    building_pdf: "Створення PDF…",
    generate_pdf: "Створити PDF",
    download_invoice: "Завантажити рахунок",
    browser_note: "100% у вашому браузері з pdf-lib — дані рахунку ніколи не залишають пристрій.",
    warn_chars: "Деякі символи не підтримуються вбудованим шрифтом PDF і були спрощені. Використовуйте латинські символи для кращих результатів.",
    warn_fail: "Не вдалося створити PDF. Видаліть незвичайні символи та спробуйте знову.",
    pdf_invoice: "РАХУНОК",
    pdf_from: "ВІД",
    pdf_bill_to: "КОМУ",
    pdf_invoice_date: "ДАТА РАХУНКУ",
    pdf_due_date: "ТЕРМІН ОПЛАТИ",
    pdf_description: "ОПИС",
    pdf_qty: "КІЛЬКІСТЬ",
    pdf_unit: "ЦІНА",
    pdf_amount: "СУМА",
    pdf_subtotal: "Без ПДВ",
    pdf_total: "РАЗОМ",
    pdf_notes: "ПРИМІТКИ",
    default_notes: "Оплата протягом 30 днів. Дякуємо за співпрацю.",
    default_line1: "Консалтингові послуги — листопад",
    default_line2: "Хостинг і обслуговування",
  },
  cs: {
    from: "Od (vás)",
    bill_to: "Fakturovat (zákazníkovi)",
    invoice_no: "Faktura č.",
    date: "Datum",
    due: "Splatnost",
    currency: "Měna",
    line_items: "Položky faktury",
    description_placeholder: "Popis",
    qty_placeholder: "Množství",
    unit_placeholder: "Jedn. cena",
    add_line: "Přidat položku",
    notes_label: "Poznámky / platební podmínky",
    vat_rate: "Sazba DPH (%)",
    summary: "Přehled",
    subtotal: "Mezisoučet",
    vat: "DPH",
    total: "Celkem",
    building_pdf: "Vytváření PDF…",
    generate_pdf: "Vytvořit PDF",
    download_invoice: "Stáhnout fakturu",
    browser_note: "100% ve vašem prohlížeči pomocí pdf-lib — data faktury nikdy neopustí vaše zařízení.",
    warn_chars: "Některé znaky nejsou podporovány vestavěným písmem PDF a byly zjednodušeny. Pro nejlepší výsledky používejte latinské znaky.",
    warn_fail: "PDF se nepodařilo vytvořit. Odstraňte neobvyklé znaky a zkuste to znovu.",
    pdf_invoice: "FAKTURA",
    pdf_from: "OD",
    pdf_bill_to: "FAKTUROVAT",
    pdf_invoice_date: "DATUM FAKTURY",
    pdf_due_date: "DATUM SPLATNOSTI",
    pdf_description: "POPIS",
    pdf_qty: "MNOŽSTVÍ",
    pdf_unit: "JEDN.",
    pdf_amount: "ČÁSTKA",
    pdf_subtotal: "Mezisoučet",
    pdf_total: "CELKEM",
    pdf_notes: "POZNÁMKY",
    default_notes: "Platba splatná do 30 dnů. Děkujeme za vaši důvěru.",
    default_line1: "Poradenské služby — listopad",
    default_line2: "Hosting a údržba",
  },
};

export function InvoiceGeneratorClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [seller, setSeller] = useState("Your company\n123 Main Street\n75001 Paris\nFR12345678901");
  const [buyer, setBuyer] = useState("Customer Ltd.\n456 High Road\n10001 New York");
  const [invoiceNo, setInvoiceNo] = useState("INV-2025-001");
  // Seed empty so SSR and the first client render agree; fill the real dates after
  // mount (new Date() is runtime-dependent and would otherwise hydration-mismatch).
  const [date, setDate] = useState("");
  const [due, setDue] = useState("");
  useEffect(() => {
    const today = new Date();
    setDate(today.toISOString().slice(0, 10));
    const dueDate = new Date(); dueDate.setDate(dueDate.getDate() + 30);
    setDue(dueDate.toISOString().slice(0, 10));
  }, []);
  const [currency, setCurrency] = useState("EUR");
  const [taxRate, setTaxRate] = useState(20);
  const [notes, setNotes] = useState(s.default_notes);
  const [lines, setLines] = useState<Line[]>([
    { id: crypto.randomUUID(), desc: s.default_line1, qty: 10, unitPrice: 90 },
    { id: crypto.randomUUID(), desc: s.default_line2, qty: 1, unitPrice: 120 },
  ]);
  const [busy, setBusy] = useState(false);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [warn, setWarn] = useState<string | null>(null);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  const totals = useMemo(() => {
    const subtotal = lines.reduce((acc, l) => acc + (l.qty || 0) * (l.unitPrice || 0), 0);
    const tax = subtotal * (taxRate / 100);
    return { subtotal, tax, total: subtotal + tax };
  }, [lines, taxRate]);

  function update(i: number, patch: Partial<Line>) {
    setLines((prev) => prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }
  function add() { setLines((prev) => [...prev, { id: crypto.randomUUID(), desc: "", qty: 1, unitPrice: 0 }]); }
  function del(id: string) { setLines((prev) => prev.filter((l) => l.id !== id)); }

  // pdf-lib's StandardFont (Helvetica) is WinAnsi-only and THROWS on any glyph
  // outside CP1252 (CJK, ł, İ, the ₹/₩ currency symbols, emoji…). Fallback used
  // only when a raw render fails: decompose accents, drop the rest, so we still
  // produce a PDF instead of crashing with no feedback.
  function toWinAnsi(str: string): string {
    return str.normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^\x00-\xFF]/g, "?");
  }

  async function render(strip: boolean) {
    const W = strip ? toWinAnsi : (str: string) => str;
    const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
    const doc = await PDFDocument.create();
    const page = doc.addPage([595, 842]); // A4
    const helv = await doc.embedFont(StandardFonts.Helvetica);
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);
    const ink = rgb(0.1, 0.12, 0.16);
    const muted = rgb(0.45, 0.5, 0.58);

    page.drawText(W(s.pdf_invoice), { x: 40, y: 790, size: 26, font: bold, color: ink });
    page.drawText(W(invoiceNo), { x: 40, y: 768, size: 11, font: helv, color: muted });

    // From / To
    const fromY = 720;
    page.drawText(W(s.pdf_from), { x: 40, y: fromY, size: 9, font: bold, color: muted });
    page.drawText(W(s.pdf_bill_to), { x: 320, y: fromY, size: 9, font: bold, color: muted });
    seller.split("\n").forEach((l, i) => page.drawText(W(l), { x: 40, y: fromY - 16 - i * 13, size: 10, font: helv, color: ink }));
    buyer.split("\n").forEach((l, i) => page.drawText(W(l), { x: 320, y: fromY - 16 - i * 13, size: 10, font: helv, color: ink }));

    // Meta
    const metaY = 620;
    page.drawText(W(s.pdf_invoice_date), { x: 40, y: metaY, size: 9, font: bold, color: muted });
    page.drawText(W(date), { x: 40, y: metaY - 14, size: 11, font: helv, color: ink });
    page.drawText(W(s.pdf_due_date), { x: 200, y: metaY, size: 9, font: bold, color: muted });
    page.drawText(W(due), { x: 200, y: metaY - 14, size: 11, font: helv, color: ink });

    // Table header
    const tableY = 560;
    page.drawRectangle({ x: 40, y: tableY - 6, width: 515, height: 22, color: rgb(0.94, 0.96, 0.99) });
    page.drawText(W(s.pdf_description), { x: 48, y: tableY, size: 9, font: bold, color: muted });
    page.drawText(W(s.pdf_qty), { x: 360, y: tableY, size: 9, font: bold, color: muted });
    page.drawText(W(s.pdf_unit), { x: 410, y: tableY, size: 9, font: bold, color: muted });
    page.drawText(W(s.pdf_amount), { x: 490, y: tableY, size: 9, font: bold, color: muted });

    let y = tableY - 28;
    for (const l of lines) {
      const amt = (l.qty || 0) * (l.unitPrice || 0);
      page.drawText(W(l.desc.slice(0, 60)), { x: 48, y, size: 10, font: helv, color: ink });
      page.drawText(String(l.qty || 0), { x: 360, y, size: 10, font: helv, color: ink });
      page.drawText(W(fmt(l.unitPrice || 0, currency)), { x: 410, y, size: 10, font: helv, color: ink });
      page.drawText(W(fmt(amt, currency)), { x: 490, y, size: 10, font: helv, color: ink });
      y -= 18;
    }

    // Totals box
    const totalsY = y - 12;
    page.drawLine({ start: { x: 350, y: totalsY + 12 }, end: { x: 555, y: totalsY + 12 }, color: rgb(0.85, 0.87, 0.9), thickness: 0.5 });
    page.drawText(W(s.pdf_subtotal), { x: 360, y: totalsY - 4, size: 10, font: helv, color: muted });
    page.drawText(W(fmt(totals.subtotal, currency)), { x: 490, y: totalsY - 4, size: 10, font: helv, color: ink });
    page.drawText(W(`${s.vat} (${taxRate}%)`), { x: 360, y: totalsY - 22, size: 10, font: helv, color: muted });
    page.drawText(W(fmt(totals.tax, currency)), { x: 490, y: totalsY - 22, size: 10, font: helv, color: ink });
    page.drawRectangle({ x: 350, y: totalsY - 50, width: 205, height: 22, color: rgb(0.1, 0.12, 0.16) });
    page.drawText(W(s.pdf_total), { x: 360, y: totalsY - 44, size: 11, font: bold, color: rgb(1, 1, 1) });
    page.drawText(W(fmt(totals.total, currency)), { x: 490, y: totalsY - 44, size: 11, font: bold, color: rgb(1, 1, 1) });

    // Notes
    if (notes.trim()) {
      page.drawText(W(s.pdf_notes), { x: 40, y: totalsY - 80, size: 9, font: bold, color: muted });
      notes.split("\n").forEach((l, i) => page.drawText(W(l), { x: 40, y: totalsY - 96 - i * 13, size: 10, font: helv, color: ink }));
    }

    const bytes = await doc.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    if (cleanup.current) URL.revokeObjectURL(cleanup.current);
    const url = URL.createObjectURL(blob);
    cleanup.current = url;
    setOutUrl(url);
  }

  async function build() {
    setBusy(true); setWarn(null);
    try {
      try {
        await render(false);
      } catch {
        // A glyph wasn't WinAnsi-encodable — retry with the sanitised text so
        // the user still gets a PDF, and tell them what happened.
        await render(true);
        setWarn(s.warn_chars);
      }
    } catch {
      setWarn(s.warn_fail);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col text-xs font-medium text-ink-600">{s.from}
            <textarea value={seller} onChange={(e) => setSeller(e.target.value)} className="mt-1 h-24 rounded-md border border-ink-200 p-2 text-sm" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">{s.bill_to}
            <textarea value={buyer} onChange={(e) => setBuyer(e.target.value)} className="mt-1 h-24 rounded-md border border-ink-200 p-2 text-sm" />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          <label className="flex flex-col text-xs font-medium text-ink-600">{s.invoice_no}
            <input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">{s.date}
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">{s.due}
            <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">{s.currency}
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm">
              {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        </div>

        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-400">{s.line_items}</p>
          <ul className="space-y-2">
            {lines.map((l, i) => (
              <li key={l.id} className="grid grid-cols-12 items-center gap-2 text-sm">
                <input value={l.desc} onChange={(e) => update(i, { desc: e.target.value })} placeholder={s.description_placeholder} className="col-span-6 rounded-md border border-ink-200 px-2 py-1.5" />
                <input type="number" min={0} value={l.qty} onChange={(e) => update(i, { qty: Number(e.target.value) || 0 })} placeholder={s.qty_placeholder} className="col-span-2 rounded-md border border-ink-200 px-2 py-1.5 text-right" />
                <input type="number" min={0} step="0.01" value={l.unitPrice} onChange={(e) => update(i, { unitPrice: Number(e.target.value) || 0 })} placeholder={s.unit_placeholder} className="col-span-3 rounded-md border border-ink-200 px-2 py-1.5 text-right" />
                <button onClick={() => del(l.id)} aria-label="Delete" className="col-span-1 rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-red-600"><Trash2 className="mx-auto h-3.5 w-3.5" /></button>
              </li>
            ))}
          </ul>
          <Button size="sm" variant="outline" className="mt-3" onClick={add}><Plus className="h-3.5 w-3.5" /> {s.add_line}</Button>
        </div>

        <label className="flex flex-col text-xs font-medium text-ink-600">{s.notes_label}
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 h-20 rounded-md border border-ink-200 p-2 text-sm" />
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-ink-600">{s.vat_rate}
          <input type="number" min={0} max={100} step="0.1" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value) || 0)} className="w-24 rounded-md border border-ink-200 px-2 py-1.5 text-sm" />
        </label>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-4">
        <div className="rounded-lg border border-ink-100 bg-white p-5">
          <p className="text-xs uppercase tracking-wide text-ink-400">{s.summary}</p>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between"><dt className="text-ink-500">{s.subtotal}</dt><dd className="font-mono text-ink-900">{fmt(totals.subtotal, currency)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-500">{s.vat} ({taxRate}%)</dt><dd className="font-mono text-amber-700">{fmt(totals.tax, currency)}</dd></div>
            <div className="mt-2 flex justify-between border-t border-ink-100 pt-2 text-base font-semibold"><dt>{s.total}</dt><dd className="font-mono">{fmt(totals.total, currency)}</dd></div>
          </dl>
          <Button size="lg" className="mt-5 w-full" onClick={build} disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {busy ? s.building_pdf : s.generate_pdf}
          </Button>
          {warn && <p className="mt-2 text-xs text-amber-700">{warn}</p>}
          {outUrl && (
            <a href={outUrl} download={`${invoiceNo || "invoice"}.pdf`} className="mt-2 block">
              <Button size="sm" variant="outline" className="w-full"><Download className="h-3.5 w-3.5" /> {s.download_invoice}</Button>
            </a>
          )}
        </div>
        <p className="text-xs text-ink-400">{s.browser_note}</p>
      </aside>
    </div>
  );
}
