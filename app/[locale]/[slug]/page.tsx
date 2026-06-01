import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOOLS, TOOLS_BY_SLUG, toClientSpec } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ServerJobClient } from "@/components/tools/clients/ServerJobClient";
import { SrtVttConvertClient } from "@/components/tools/clients/SrtVttConvertClient";
import { SyncClient } from "@/components/tools/clients/SyncClient";
import { SrtToTextClient } from "@/components/tools/clients/SrtToTextClient";
import { CleanClient } from "@/components/tools/clients/CleanClient";
import { EditorClient } from "@/components/tools/clients/EditorClient";
import { TranslateClient } from "@/components/tools/clients/TranslateClient";
import { BatchTranslateClient } from "@/components/tools/clients/BatchTranslateClient";
import { YouTubeChaptersClient } from "@/components/tools/clients/YouTubeChaptersClient";
import { AutoSyncClient } from "@/components/tools/clients/AutoSyncClient";
import { SubtitleGeneratorClient } from "@/components/tools/clients/SubtitleGeneratorClient";
import { AddSubtitlesToVideoClient } from "@/components/tools/clients/AddSubtitlesToVideoClient";
import { StyleSubtitlesClient } from "@/components/tools/clients/StyleSubtitlesClient";
import { ExtractSubtitlesClient } from "@/components/tools/clients/ExtractSubtitlesClient";
import { TikTokSubtitlesClient } from "@/components/tools/clients/TikTokSubtitlesClient";
import { TextToolClient } from "@/components/tools/clients/TextToolClient";
import { RegexClient } from "@/components/tools/clients/RegexClient";
import { ColorConverterClient } from "@/components/tools/clients/ColorConverterClient";
import { NumberBaseClient } from "@/components/tools/clients/NumberBaseClient";
import { HashClient } from "@/components/tools/clients/HashClient";
import { UnitConverterClient } from "@/components/tools/clients/UnitConverterClient";
import { PasswordGenClient } from "@/components/tools/clients/PasswordGenClient";
import { CaseConverterClient } from "@/components/tools/clients/CaseConverterClient";
import { LoremIpsumClient } from "@/components/tools/clients/LoremIpsumClient";
import { UuidGeneratorClient } from "@/components/tools/clients/UuidGeneratorClient";
import { UnixTimestampClient } from "@/components/tools/clients/UnixTimestampClient";
import { TextDiffClient } from "@/components/tools/clients/TextDiffClient";
import { VatCalculatorClient } from "@/components/tools/clients/VatCalculatorClient";
import { ImageToBase64Client } from "@/components/tools/clients/ImageToBase64Client";
import { FlipImageClient } from "@/components/tools/clients/FlipImageClient";
import { CurrencyConverterClient } from "@/components/tools/clients/CurrencyConverterClient";
import { WatermarkPdfClient } from "@/components/tools/clients/WatermarkPdfClient";
import { PdfPageNumbersClient } from "@/components/tools/clients/PdfPageNumbersClient";
import { ComparePdfClient } from "@/components/tools/clients/ComparePdfClient";
import { ImageToIcoClient } from "@/components/tools/clients/ImageToIcoClient";
import { WatermarkImageClient } from "@/components/tools/clients/WatermarkImageClient";
import { ExtractColorsClient } from "@/components/tools/clients/ExtractColorsClient";
import { PdfToExcelClient } from "@/components/tools/clients/PdfToExcelClient";
import { InvoiceGeneratorClient } from "@/components/tools/clients/InvoiceGeneratorClient";
import { QrCodeReaderClient } from "@/components/tools/clients/QrCodeReaderClient";
import { BarcodeGeneratorClient } from "@/components/tools/clients/BarcodeGeneratorClient";
import { BarcodeReaderClient } from "@/components/tools/clients/BarcodeReaderClient";
import { PdfMergeClient } from "@/components/tools/clients/PdfMergeClient";
import { PdfSplitClient } from "@/components/tools/clients/PdfSplitClient";
import { PdfRotateClient } from "@/components/tools/clients/PdfRotateClient";
import { ImagesToPdfClient } from "@/components/tools/clients/ImagesToPdfClient";
import { ZipCreateClient } from "@/components/tools/clients/ZipCreateClient";
import { ZipExtractClient } from "@/components/tools/clients/ZipExtractClient";
import { QrGeneratorClient } from "@/components/tools/clients/QrGeneratorClient";
import { PendingClient } from "@/components/tools/clients/PendingClient";
import { FfmpegToolClient } from "@/components/tools/clients/FfmpegToolClient";
import { RemoveBackgroundClient } from "@/components/tools/clients/RemoveBackgroundClient";
import { RemoveVideoBackgroundClient } from "@/components/tools/clients/RemoveVideoBackgroundClient";
import { PdfToTextClient } from "@/components/tools/clients/PdfToTextClient";
import { PdfToWordClient } from "@/components/tools/clients/PdfToWordClient";
import { MergeAudioClient } from "@/components/tools/clients/MergeAudioClient";
import { PdfToJpgClient } from "@/components/tools/clients/PdfToJpgClient";
import { WordToPdfClient } from "@/components/tools/clients/WordToPdfClient";
import { HtmlToPdfClient } from "@/components/tools/clients/HtmlToPdfClient";
import { ExcelToPdfClient } from "@/components/tools/clients/ExcelToPdfClient";
import { CompressPdfClient } from "@/components/tools/clients/CompressPdfClient";
import { WatermarkVideoClient } from "@/components/tools/clients/WatermarkVideoClient";
import { AudioToVideoClient } from "@/components/tools/clients/AudioToVideoClient";
import { AdjustImageClient } from "@/components/tools/clients/AdjustImageClient";
import { ExcelToJsonClient } from "@/components/tools/clients/ExcelToJsonClient";
import { MergeCsvClient } from "@/components/tools/clients/MergeCsvClient";
import { SqlJsonClient } from "@/components/tools/clients/SqlJsonClient";
import { CronBuilderClient } from "@/components/tools/clients/CronBuilderClient";
import { TimezoneConverterClient } from "@/components/tools/clients/TimezoneConverterClient";
import { AgeCalculatorClient } from "@/components/tools/clients/AgeCalculatorClient";
import { RomanNumeralClient } from "@/components/tools/clients/RomanNumeralClient";
import { ColorPaletteClient } from "@/components/tools/clients/ColorPaletteClient";
import { EmailSignatureClient } from "@/components/tools/clients/EmailSignatureClient";
import { SocialMediaCropClient } from "@/components/tools/clients/SocialMediaCropClient";
import { ExifViewerClient } from "@/components/tools/clients/ExifViewerClient";
import { MarkdownToWordClient } from "@/components/tools/clients/MarkdownToWordClient";
import { PdfRedactionClient } from "@/components/tools/clients/PdfRedactionClient";
import { ImageToTextClient } from "@/components/tools/clients/ImageToTextClient";
import { PdfOcrClient } from "@/components/tools/clients/PdfOcrClient";
import { HandwritingToTextClient } from "@/components/tools/clients/HandwritingToTextClient";
import { BusinessCardScannerClient } from "@/components/tools/clients/BusinessCardScannerClient";
import { ReceiptScannerClient } from "@/components/tools/clients/ReceiptScannerClient";
import { ScreenshotToCodeClient } from "@/components/tools/clients/ScreenshotToCodeClient";
import { ImageToTableClient } from "@/components/tools/clients/ImageToTableClient";
import { VoiceToTextClient } from "@/components/tools/clients/VoiceToTextClient";
import { CitationGeneratorClient } from "@/components/tools/clients/CitationGeneratorClient";
import { AiDetectorClient } from "@/components/tools/clients/AiDetectorClient";
import { SignPdfClient } from "@/components/tools/clients/SignPdfClient";
import { ChangeBackgroundClient } from "@/components/tools/clients/ChangeBackgroundClient";
import { ResumeBuilderClient } from "@/components/tools/clients/ResumeBuilderClient";
import { CoverLetterClient } from "@/components/tools/clients/CoverLetterClient";
import { ContractAnalyzerClient } from "@/components/tools/clients/ContractAnalyzerClient";
import { VideoThumbnailClient } from "@/components/tools/clients/VideoThumbnailClient";
import { FFMPEG_TOOLS } from "@/lib/ffmpeg-tools";
import { ImageToolClient } from "@/components/tools/clients/ImageToolClient";
import { AiTextClient } from "@/components/tools/clients/AiTextClient";
import { TEXT_TOOLS } from "@/lib/text-tools";
import { IMAGE_TOOLS } from "@/lib/image-tools";
import { AI_TEXT_TOOLS } from "@/lib/ai-text-tools";
import { buildToolMetadata } from "@/lib/seo";
import { NON_DEFAULT_LOCALES, isLocale, localePath } from "@/lib/i18n/locales";
import { resolveToolI18n } from "@/lib/i18n/resolve-tool-i18n";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of NON_DEFAULT_LOCALES) {
    for (const tool of TOOLS) {
      params.push({ locale, slug: tool.slug });
    }
  }
  return params;
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  if (!isLocale(params.locale) || params.locale === "en") return {};
  const tool = TOOLS_BY_SLUG[params.slug];
  if (!tool) return {};
  const i18n = resolveToolI18n(params.slug, params.locale);
  return buildToolMetadata(tool, params.locale, i18n ?? undefined);
}

export default function LocalisedToolPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale) || params.locale === "en") notFound();
  const tool = TOOLS_BY_SLUG[params.slug];
  if (!tool) notFound();
  const locale = params.locale;
  const i18n = resolveToolI18n(params.slug, locale);
  const override = i18n ? { name: i18n.name, h1: i18n.h1, metaDescription: i18n.metaDescription } : undefined;

  // Cross-links point to localised URLs.
  const lp = (slug: string) => localePath(locale, slug);
  const crossLinksBySlug: Record<string, { href: string; label: string }[]> = {
    "subtitle-generator": [
      { href: lp("translate-subtitles"), label: "→ translate" },
      { href: lp("add-subtitles-to-video"), label: "→ burn-in" },
      { href: lp("subtitle-editor"), label: "→ editor" },
    ],
    "add-subtitles-to-video": [
      { href: lp("style-subtitles"), label: "→ restyle" },
      { href: lp("subtitle-generator"), label: "→ generate first" },
    ],
    "translate-subtitles": [
      { href: lp("sync-subtitles"), label: "→ fix timing" },
      { href: lp("add-subtitles-to-video"), label: "→ burn-in" },
      { href: lp("batch-translate"), label: "→ batch (Pro)" },
    ],
    "extract-subtitles": [
      { href: lp("translate-subtitles"), label: "→ translate" },
      { href: lp("clean-subtitles"), label: "→ clean" },
    ],
    "tiktok-subtitles": [
      { href: lp("style-subtitles"), label: "→ restyle" },
      { href: lp("subtitle-generator"), label: "→ standard generator" },
    ],
    "youtube-chapters": [
      { href: lp("srt-to-text"), label: "→ full transcript" },
      { href: lp("translate-subtitles"), label: "→ translate" },
    ],
    "batch-translate": [
      { href: lp("translate-subtitles"), label: "→ single language" },
      { href: localePath(locale, "pricing"), label: "→ Pro pricing" },
    ],
    "style-subtitles": [{ href: lp("add-subtitles-to-video"), label: "→ burn-in" }],
    "auto-sync": [
      { href: lp("sync-subtitles"), label: "→ manual offset" },
      { href: lp("subtitle-editor"), label: "→ editor" },
    ],
    "srt-to-vtt": [
      { href: lp("translate-subtitles"), label: "→ translate" },
      { href: lp("sync-subtitles"), label: "→ fix timing" },
      { href: lp("subtitle-editor"), label: "→ editor" },
    ],
    "vtt-to-srt": [
      { href: lp("translate-subtitles"), label: "→ translate" },
      { href: lp("sync-subtitles"), label: "→ fix timing" },
      { href: lp("subtitle-editor"), label: "→ editor" },
    ],
  };

  const crossLinks = crossLinksBySlug[tool.slug] ?? [];
  const spec = toClientSpec(tool);

  let body: React.ReactNode;
  if (tool.pending) {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <PendingClient category={tool.category} accept={tool.accept.map((e) => "." + e).join(",")} />
      </ToolPageShell>
    );
  }
  if (tool.slug === "audio-to-video") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <AudioToVideoClient />
      </ToolPageShell>
    );
  }
  if (FFMPEG_TOOLS[tool.slug]) {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <FfmpegToolClient slug={tool.slug} category={tool.category} />
      </ToolPageShell>
    );
  }
  if (tool.slug === "remove-background") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <RemoveBackgroundClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "remove-video-background") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <RemoveVideoBackgroundClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "pdf-to-text") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <PdfToTextClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "pdf-to-jpg") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <PdfToJpgClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "pdf-to-word") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <PdfToWordClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "merge-audio") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <MergeAudioClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "word-to-pdf") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <WordToPdfClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "html-to-pdf") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <HtmlToPdfClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "add-watermark") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <WatermarkVideoClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "excel-to-pdf") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <ExcelToPdfClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "compress-pdf") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <CompressPdfClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "watermark-pdf") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <WatermarkPdfClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "pdf-page-numbers") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <PdfPageNumbersClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "compare-pdf") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <ComparePdfClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "pdf-to-excel") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <PdfToExcelClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "image-to-ico") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <ImageToIcoClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "watermark-image") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <WatermarkImageClient />
      </ToolPageShell>
    );
  }
  if (tool.slug === "extract-colors") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <ExtractColorsClient />
      </ToolPageShell>
    );
  }
  if (TEXT_TOOLS[tool.slug] || IMAGE_TOOLS[tool.slug] || AI_TEXT_TOOLS[tool.slug]) {
    body = TEXT_TOOLS[tool.slug]
      ? <TextToolClient slug={tool.slug} />
      : IMAGE_TOOLS[tool.slug]
      ? <ImageToolClient slug={tool.slug} />
      : <AiTextClient slug={tool.slug} />;
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        {body}
      </ToolPageShell>
    );
  }
  switch (tool.slug) {
    case "srt-to-vtt":
      body = <SrtVttConvertClient mode="srt-to-vtt" />;
      break;
    case "vtt-to-srt":
      body = <SrtVttConvertClient mode="vtt-to-srt" />;
      break;
    case "sync-subtitles":
      body = <SyncClient />;
      break;
    case "srt-to-text":
      body = <SrtToTextClient />;
      break;
    case "clean-subtitles":
      body = <CleanClient />;
      break;
    case "subtitle-editor":
      body = <EditorClient />;
      break;
    case "translate-subtitles":
      body = <TranslateClient crossLinks={crossLinks} />;
      break;
    case "batch-translate":
      body = <BatchTranslateClient />;
      break;
    case "youtube-chapters":
      body = <YouTubeChaptersClient />;
      break;
    case "auto-sync":
      body = <AutoSyncClient />;
      break;
    case "subtitle-generator":
      body = <SubtitleGeneratorClient crossLinks={crossLinks} />;
      break;
    case "add-subtitles-to-video":
      body = <AddSubtitlesToVideoClient crossLinks={crossLinks} />;
      break;
    case "style-subtitles":
      body = <StyleSubtitlesClient />;
      break;
    case "extract-subtitles":
      body = <ExtractSubtitlesClient />;
      break;
    case "tiktok-subtitles":
      body = <TikTokSubtitlesClient />;
      break;
    case "regex-tester":
      body = <RegexClient />;
      break;
    case "color-converter":
      body = <ColorConverterClient />;
      break;
    case "number-base-converter":
      body = <NumberBaseClient />;
      break;
    case "hash-generator":
      body = <HashClient />;
      break;
    case "unit-converter":
      body = <UnitConverterClient />;
      break;
    case "case-converter":
      body = <CaseConverterClient />;
      break;
    case "lorem-ipsum":
      body = <LoremIpsumClient />;
      break;
    case "uuid-generator":
      body = <UuidGeneratorClient />;
      break;
    case "unix-timestamp":
      body = <UnixTimestampClient />;
      break;
    case "text-diff":
      body = <TextDiffClient />;
      break;
    case "vat-calculator":
      body = <VatCalculatorClient />;
      break;
    case "timezone-converter":
      body = <TimezoneConverterClient />;
      break;
    case "age-calculator":
      body = <AgeCalculatorClient />;
      break;
    case "roman-numeral-converter":
      body = <RomanNumeralClient />;
      break;
    case "color-palette-generator":
      body = <ColorPaletteClient />;
      break;
    case "email-signature-generator":
      body = <EmailSignatureClient />;
      break;
    case "social-media-crop":
      body = <SocialMediaCropClient />;
      break;
    case "exif-viewer":
      body = <ExifViewerClient />;
      break;
    case "markdown-to-word":
      body = <MarkdownToWordClient />;
      break;
    case "pdf-redaction":
      body = <PdfRedactionClient />;
      break;
    case "image-to-text":
      body = <ImageToTextClient />;
      break;
    case "pdf-ocr":
      body = <PdfOcrClient />;
      break;
    case "handwriting-to-text":
      body = <HandwritingToTextClient />;
      break;
    case "business-card-scanner":
      body = <BusinessCardScannerClient />;
      break;
    case "receipt-scanner":
      body = <ReceiptScannerClient />;
      break;
    case "screenshot-to-code":
      body = <ScreenshotToCodeClient />;
      break;
    case "image-to-table":
      body = <ImageToTableClient />;
      break;
    case "voice-to-text":
      body = <VoiceToTextClient maxMb={tool.freeMaxMb} />;
      break;
    case "citation-generator":
      body = <CitationGeneratorClient />;
      break;
    case "ai-detector":
      body = <AiDetectorClient />;
      break;
    case "sign-pdf":
      body = <SignPdfClient />;
      break;
    case "change-background":
      body = <ChangeBackgroundClient />;
      break;
    case "resume-builder":
      body = <ResumeBuilderClient />;
      break;
    case "cover-letter":
      body = <CoverLetterClient />;
      break;
    case "contract-analyzer":
      body = <ContractAnalyzerClient />;
      break;
    case "video-thumbnail":
      body = <VideoThumbnailClient />;
      break;
    case "image-to-base64":
      body = <ImageToBase64Client />;
      break;
    case "flip-image":
      body = <FlipImageClient />;
      break;
    case "currency-converter":
      body = <CurrencyConverterClient />;
      break;
    case "invoice-generator":
      body = <InvoiceGeneratorClient />;
      break;
    case "adjust-image":
      body = <AdjustImageClient />;
      break;
    case "excel-to-json":
      body = <ExcelToJsonClient />;
      break;
    case "merge-csv":
      body = <MergeCsvClient />;
      break;
    case "sql-to-json":
      body = <SqlJsonClient />;
      break;
    case "json-to-sql":
      body = <SqlJsonClient defaultDir="json_to_sql" />;
      break;
    case "cron-builder":
      body = <CronBuilderClient />;
      break;
    case "qr-code-reader":
      body = <QrCodeReaderClient />;
      break;
    case "barcode-generator":
      body = <BarcodeGeneratorClient />;
      break;
    case "barcode-reader":
      body = <BarcodeReaderClient />;
      break;
    case "password-generator":
      body = <PasswordGenClient />;
      break;
    case "merge-pdf":
      body = <PdfMergeClient />;
      break;
    case "split-pdf":
      body = <PdfSplitClient />;
      break;
    case "rotate-pdf":
      body = <PdfRotateClient />;
      break;
    case "images-to-pdf":
      body = <ImagesToPdfClient />;
      break;
    case "create-zip":
      body = <ZipCreateClient />;
      break;
    case "extract-zip":
      body = <ZipExtractClient />;
      break;
    case "qr-generator":
      body = <QrGeneratorClient />;
      break;
    case "api":
      // The /api page has its own bespoke layout; redirect logic isn't worth it
      // for the localised version — just show the standard server-job placeholder.
      body = <ServerJobClient tool={spec} crossLinks={crossLinks} />;
      break;
    default:
      body = <ServerJobClient tool={spec} crossLinks={crossLinks} />;
  }

  return (
    <ToolPageShell tool={tool} locale={locale} override={override}>
      {body}
    </ToolPageShell>
  );
}
