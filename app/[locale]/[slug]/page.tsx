import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOOLS, TOOLS_BY_SLUG, toClientSpec, CATEGORY_BY_ID, CATEGORIES, type ToolCategory } from "@/lib/tools-config";
import { CategoryPage, categoryMetadata } from "@/components/tools/CategoryPage";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import dynamic from "next/dynamic";
const ServerJobClient = dynamic(() => import("@/components/tools/clients/ServerJobClient").then((m) => ({ default: m.ServerJobClient })));
const SrtVttConvertClient = dynamic(() => import("@/components/tools/clients/SrtVttConvertClient").then((m) => ({ default: m.SrtVttConvertClient })));
const SyncClient = dynamic(() => import("@/components/tools/clients/SyncClient").then((m) => ({ default: m.SyncClient })));
const SrtToTextClient = dynamic(() => import("@/components/tools/clients/SrtToTextClient").then((m) => ({ default: m.SrtToTextClient })));
const CleanClient = dynamic(() => import("@/components/tools/clients/CleanClient").then((m) => ({ default: m.CleanClient })));
const EditorClient = dynamic(() => import("@/components/tools/clients/EditorClient").then((m) => ({ default: m.EditorClient })));
const TranslateClient = dynamic(() => import("@/components/tools/clients/TranslateClient").then((m) => ({ default: m.TranslateClient })));
const BatchTranslateClient = dynamic(() => import("@/components/tools/clients/BatchTranslateClient").then((m) => ({ default: m.BatchTranslateClient })));
const YouTubeChaptersClient = dynamic(() => import("@/components/tools/clients/YouTubeChaptersClient").then((m) => ({ default: m.YouTubeChaptersClient })));
const AutoSyncClient = dynamic(() => import("@/components/tools/clients/AutoSyncClient").then((m) => ({ default: m.AutoSyncClient })));
const SubtitleGeneratorClient = dynamic(() => import("@/components/tools/clients/SubtitleGeneratorClient").then((m) => ({ default: m.SubtitleGeneratorClient })));
const AddSubtitlesToVideoClient = dynamic(() => import("@/components/tools/clients/AddSubtitlesToVideoClient").then((m) => ({ default: m.AddSubtitlesToVideoClient })));
const StyleSubtitlesClient = dynamic(() => import("@/components/tools/clients/StyleSubtitlesClient").then((m) => ({ default: m.StyleSubtitlesClient })));
const ExtractSubtitlesClient = dynamic(() => import("@/components/tools/clients/ExtractSubtitlesClient").then((m) => ({ default: m.ExtractSubtitlesClient })));
const TikTokSubtitlesClient = dynamic(() => import("@/components/tools/clients/TikTokSubtitlesClient").then((m) => ({ default: m.TikTokSubtitlesClient })));
const TextToolClient = dynamic(() => import("@/components/tools/clients/TextToolClient").then((m) => ({ default: m.TextToolClient })));
const RegexClient = dynamic(() => import("@/components/tools/clients/RegexClient").then((m) => ({ default: m.RegexClient })));
const ColorConverterClient = dynamic(() => import("@/components/tools/clients/ColorConverterClient").then((m) => ({ default: m.ColorConverterClient })));
const NumberBaseClient = dynamic(() => import("@/components/tools/clients/NumberBaseClient").then((m) => ({ default: m.NumberBaseClient })));
const HashClient = dynamic(() => import("@/components/tools/clients/HashClient").then((m) => ({ default: m.HashClient })));
const UnitConverterClient = dynamic(() => import("@/components/tools/clients/UnitConverterClient").then((m) => ({ default: m.UnitConverterClient })));
const PasswordGenClient = dynamic(() => import("@/components/tools/clients/PasswordGenClient").then((m) => ({ default: m.PasswordGenClient })));
const CaseConverterClient = dynamic(() => import("@/components/tools/clients/CaseConverterClient").then((m) => ({ default: m.CaseConverterClient })));
const LoremIpsumClient = dynamic(() => import("@/components/tools/clients/LoremIpsumClient").then((m) => ({ default: m.LoremIpsumClient })));
const UuidGeneratorClient = dynamic(() => import("@/components/tools/clients/UuidGeneratorClient").then((m) => ({ default: m.UuidGeneratorClient })));
const UnixTimestampClient = dynamic(() => import("@/components/tools/clients/UnixTimestampClient").then((m) => ({ default: m.UnixTimestampClient })));
const TextDiffClient = dynamic(() => import("@/components/tools/clients/TextDiffClient").then((m) => ({ default: m.TextDiffClient })));
const VatCalculatorClient = dynamic(() => import("@/components/tools/clients/VatCalculatorClient").then((m) => ({ default: m.VatCalculatorClient })));
const PercentageCalculatorClient = dynamic(() => import("@/components/tools/clients/PercentageCalculatorClient").then((m) => ({ default: m.PercentageCalculatorClient })));
const LoanCalculatorClient = dynamic(() => import("@/components/tools/clients/LoanCalculatorClient").then((m) => ({ default: m.LoanCalculatorClient })));
const TipCalculatorClient = dynamic(() => import("@/components/tools/clients/TipCalculatorClient").then((m) => ({ default: m.TipCalculatorClient })));
const BmiCalculatorClient = dynamic(() => import("@/components/tools/clients/BmiCalculatorClient").then((m) => ({ default: m.BmiCalculatorClient })));
const EnhanceImageClient = dynamic(() => import("@/components/tools/clients/EnhanceImageClient").then((m) => ({ default: m.EnhanceImageClient })));
const MemeGeneratorClient = dynamic(() => import("@/components/tools/clients/MemeGeneratorClient").then((m) => ({ default: m.MemeGeneratorClient })));
const PhotoEditorClient = dynamic(() => import("@/components/tools/clients/PhotoEditorClient").then((m) => ({ default: m.PhotoEditorClient })));
const HtmlToImageClient = dynamic(() => import("@/components/tools/clients/HtmlToImageClient").then((m) => ({ default: m.HtmlToImageClient })));
const BlurFaceClient = dynamic(() => import("@/components/tools/clients/BlurFaceClient").then((m) => ({ default: m.BlurFaceClient })));
const HeicConvertClient = dynamic(() => import("@/components/tools/clients/HeicConvertClient").then((m) => ({ default: m.HeicConvertClient })));
const OrganizePdfClient = dynamic(() => import("@/components/tools/clients/OrganizePdfClient").then((m) => ({ default: m.OrganizePdfClient })));
const ExtractPdfPagesClient = dynamic(() => import("@/components/tools/clients/ExtractPdfPagesClient").then((m) => ({ default: m.ExtractPdfPagesClient })));
const EditPdfMetadataClient = dynamic(() => import("@/components/tools/clients/EditPdfMetadataClient").then((m) => ({ default: m.EditPdfMetadataClient })));
const ImagesToGifClient = dynamic(() => import("@/components/tools/clients/ImagesToGifClient").then((m) => ({ default: m.ImagesToGifClient })));
const ImageCollageClient = dynamic(() => import("@/components/tools/clients/ImageCollageClient").then((m) => ({ default: m.ImageCollageClient })));
const PasswordCheckerClient = dynamic(() => import("@/components/tools/clients/PasswordCheckerClient").then((m) => ({ default: m.PasswordCheckerClient })));
const SslCheckerClient = dynamic(() => import("@/components/tools/clients/SslCheckerClient").then((m) => ({ default: m.SslCheckerClient })));
const EmailCheckerClient = dynamic(() => import("@/components/tools/clients/EmailCheckerClient").then((m) => ({ default: m.EmailCheckerClient })));
const PhishingDetectorClient = dynamic(() => import("@/components/tools/clients/PhishingDetectorClient").then((m) => ({ default: m.PhishingDetectorClient })));
const UrlScannerClient = dynamic(() => import("@/components/tools/clients/UrlScannerClient").then((m) => ({ default: m.UrlScannerClient })));
const ImageToBase64Client = dynamic(() => import("@/components/tools/clients/ImageToBase64Client").then((m) => ({ default: m.ImageToBase64Client })));
const FlipImageClient = dynamic(() => import("@/components/tools/clients/FlipImageClient").then((m) => ({ default: m.FlipImageClient })));
const CurrencyConverterClient = dynamic(() => import("@/components/tools/clients/CurrencyConverterClient").then((m) => ({ default: m.CurrencyConverterClient })));
const WatermarkPdfClient = dynamic(() => import("@/components/tools/clients/WatermarkPdfClient").then((m) => ({ default: m.WatermarkPdfClient })));
const PdfPageNumbersClient = dynamic(() => import("@/components/tools/clients/PdfPageNumbersClient").then((m) => ({ default: m.PdfPageNumbersClient })));
const ComparePdfClient = dynamic(() => import("@/components/tools/clients/ComparePdfClient").then((m) => ({ default: m.ComparePdfClient })));
const ImageToIcoClient = dynamic(() => import("@/components/tools/clients/ImageToIcoClient").then((m) => ({ default: m.ImageToIcoClient })));
const WatermarkImageClient = dynamic(() => import("@/components/tools/clients/WatermarkImageClient").then((m) => ({ default: m.WatermarkImageClient })));
const ExtractColorsClient = dynamic(() => import("@/components/tools/clients/ExtractColorsClient").then((m) => ({ default: m.ExtractColorsClient })));
const InvoiceGeneratorClient = dynamic(() => import("@/components/tools/clients/InvoiceGeneratorClient").then((m) => ({ default: m.InvoiceGeneratorClient })));
const QrCodeReaderClient = dynamic(() => import("@/components/tools/clients/QrCodeReaderClient").then((m) => ({ default: m.QrCodeReaderClient })));
const BarcodeGeneratorClient = dynamic(() => import("@/components/tools/clients/BarcodeGeneratorClient").then((m) => ({ default: m.BarcodeGeneratorClient })));
const BarcodeReaderClient = dynamic(() => import("@/components/tools/clients/BarcodeReaderClient").then((m) => ({ default: m.BarcodeReaderClient })));
const PdfMergeClient = dynamic(() => import("@/components/tools/clients/PdfMergeClient").then((m) => ({ default: m.PdfMergeClient })));
const PdfSplitClient = dynamic(() => import("@/components/tools/clients/PdfSplitClient").then((m) => ({ default: m.PdfSplitClient })));
const PdfRotateClient = dynamic(() => import("@/components/tools/clients/PdfRotateClient").then((m) => ({ default: m.PdfRotateClient })));
const ImagesToPdfClient = dynamic(() => import("@/components/tools/clients/ImagesToPdfClient").then((m) => ({ default: m.ImagesToPdfClient })));
const ZipCreateClient = dynamic(() => import("@/components/tools/clients/ZipCreateClient").then((m) => ({ default: m.ZipCreateClient })));
const ZipExtractClient = dynamic(() => import("@/components/tools/clients/ZipExtractClient").then((m) => ({ default: m.ZipExtractClient })));
const QrGeneratorClient = dynamic(() => import("@/components/tools/clients/QrGeneratorClient").then((m) => ({ default: m.QrGeneratorClient })));
const ServerLinkClient = dynamic(() => import("@/components/tools/clients/ServerLinkClient").then((m) => ({ default: m.ServerLinkClient })));
const UtmBuilderClient = dynamic(() => import("@/components/tools/clients/UtmBuilderClient").then((m) => ({ default: m.UtmBuilderClient })));
const LinkBuilderClient = dynamic(() => import("@/components/tools/clients/LinkBuilderClient").then((m) => ({ default: m.LinkBuilderClient })));
const PendingClient = dynamic(() => import("@/components/tools/clients/PendingClient").then((m) => ({ default: m.PendingClient })));
const FfmpegToolClient = dynamic(() => import("@/components/tools/clients/FfmpegToolClient").then((m) => ({ default: m.FfmpegToolClient })));
const RemoveBackgroundClient = dynamic(() => import("@/components/tools/clients/RemoveBackgroundClient").then((m) => ({ default: m.RemoveBackgroundClient })));
const RemoveVideoBackgroundClient = dynamic(() => import("@/components/tools/clients/RemoveVideoBackgroundClient").then((m) => ({ default: m.RemoveVideoBackgroundClient })));
const PdfToTextClient = dynamic(() => import("@/components/tools/clients/PdfToTextClient").then((m) => ({ default: m.PdfToTextClient })));
const MergeAudioClient = dynamic(() => import("@/components/tools/clients/MergeAudioClient").then((m) => ({ default: m.MergeAudioClient })));
const PdfToJpgClient = dynamic(() => import("@/components/tools/clients/PdfToJpgClient").then((m) => ({ default: m.PdfToJpgClient })));
const WatermarkVideoClient = dynamic(() => import("@/components/tools/clients/WatermarkVideoClient").then((m) => ({ default: m.WatermarkVideoClient })));
const AudioToVideoClient = dynamic(() => import("@/components/tools/clients/AudioToVideoClient").then((m) => ({ default: m.AudioToVideoClient })));
const AdjustImageClient = dynamic(() => import("@/components/tools/clients/AdjustImageClient").then((m) => ({ default: m.AdjustImageClient })));
const ExcelToJsonClient = dynamic(() => import("@/components/tools/clients/ExcelToJsonClient").then((m) => ({ default: m.ExcelToJsonClient })));
const MergeCsvClient = dynamic(() => import("@/components/tools/clients/MergeCsvClient").then((m) => ({ default: m.MergeCsvClient })));
const SqlJsonClient = dynamic(() => import("@/components/tools/clients/SqlJsonClient").then((m) => ({ default: m.SqlJsonClient })));
const CronBuilderClient = dynamic(() => import("@/components/tools/clients/CronBuilderClient").then((m) => ({ default: m.CronBuilderClient })));
const TimezoneConverterClient = dynamic(() => import("@/components/tools/clients/TimezoneConverterClient").then((m) => ({ default: m.TimezoneConverterClient })));
const AgeCalculatorClient = dynamic(() => import("@/components/tools/clients/AgeCalculatorClient").then((m) => ({ default: m.AgeCalculatorClient })));
const RomanNumeralClient = dynamic(() => import("@/components/tools/clients/RomanNumeralClient").then((m) => ({ default: m.RomanNumeralClient })));
const ColorPaletteClient = dynamic(() => import("@/components/tools/clients/ColorPaletteClient").then((m) => ({ default: m.ColorPaletteClient })));
const EmailSignatureClient = dynamic(() => import("@/components/tools/clients/EmailSignatureClient").then((m) => ({ default: m.EmailSignatureClient })));
const SocialMediaCropClient = dynamic(() => import("@/components/tools/clients/SocialMediaCropClient").then((m) => ({ default: m.SocialMediaCropClient })));
const ExifViewerClient = dynamic(() => import("@/components/tools/clients/ExifViewerClient").then((m) => ({ default: m.ExifViewerClient })));
const MarkdownToWordClient = dynamic(() => import("@/components/tools/clients/MarkdownToWordClient").then((m) => ({ default: m.MarkdownToWordClient })));
const PdfRedactionClient = dynamic(() => import("@/components/tools/clients/PdfRedactionClient").then((m) => ({ default: m.PdfRedactionClient })));
const ImageToTextClient = dynamic(() => import("@/components/tools/clients/ImageToTextClient").then((m) => ({ default: m.ImageToTextClient })));
const PdfOcrClient = dynamic(() => import("@/components/tools/clients/PdfOcrClient").then((m) => ({ default: m.PdfOcrClient })));
const HandwritingToTextClient = dynamic(() => import("@/components/tools/clients/HandwritingToTextClient").then((m) => ({ default: m.HandwritingToTextClient })));
const BusinessCardScannerClient = dynamic(() => import("@/components/tools/clients/BusinessCardScannerClient").then((m) => ({ default: m.BusinessCardScannerClient })));
const ReceiptScannerClient = dynamic(() => import("@/components/tools/clients/ReceiptScannerClient").then((m) => ({ default: m.ReceiptScannerClient })));
const ScreenshotToCodeClient = dynamic(() => import("@/components/tools/clients/ScreenshotToCodeClient").then((m) => ({ default: m.ScreenshotToCodeClient })));
const ImageToTableClient = dynamic(() => import("@/components/tools/clients/ImageToTableClient").then((m) => ({ default: m.ImageToTableClient })));
const VoiceToTextClient = dynamic(() => import("@/components/tools/clients/VoiceToTextClient").then((m) => ({ default: m.VoiceToTextClient })));
const CitationGeneratorClient = dynamic(() => import("@/components/tools/clients/CitationGeneratorClient").then((m) => ({ default: m.CitationGeneratorClient })));
const AiDetectorClient = dynamic(() => import("@/components/tools/clients/AiDetectorClient").then((m) => ({ default: m.AiDetectorClient })));
const SignPdfClient = dynamic(() => import("@/components/tools/clients/SignPdfClient").then((m) => ({ default: m.SignPdfClient })));
const FillPdfFormClient = dynamic(() => import("@/components/tools/clients/FillPdfFormClient").then((m) => ({ default: m.FillPdfFormClient })));
const TranslateDocumentClient = dynamic(() => import("@/components/tools/clients/TranslateDocumentClient").then((m) => ({ default: m.TranslateDocumentClient })));
const ChangeBackgroundClient = dynamic(() => import("@/components/tools/clients/ChangeBackgroundClient").then((m) => ({ default: m.ChangeBackgroundClient })));
const ResumeBuilderClient = dynamic(() => import("@/components/tools/clients/ResumeBuilderClient").then((m) => ({ default: m.ResumeBuilderClient })));
const CoverLetterClient = dynamic(() => import("@/components/tools/clients/CoverLetterClient").then((m) => ({ default: m.CoverLetterClient })));
const ContractAnalyzerClient = dynamic(() => import("@/components/tools/clients/ContractAnalyzerClient").then((m) => ({ default: m.ContractAnalyzerClient })));
const VideoThumbnailClient = dynamic(() => import("@/components/tools/clients/VideoThumbnailClient").then((m) => ({ default: m.VideoThumbnailClient })));
const SshKeyGeneratorClient = dynamic(() => import("@/components/tools/clients/SshKeyGeneratorClient").then((m) => ({ default: m.SshKeyGeneratorClient })));
const TextEncryptorClient = dynamic(() => import("@/components/tools/clients/TextEncryptorClient").then((m) => ({ default: m.TextEncryptorClient })));
const FileEncryptorClient = dynamic(() => import("@/components/tools/clients/FileEncryptorClient").then((m) => ({ default: m.FileEncryptorClient })));
import { FFMPEG_TOOLS } from "@/lib/ffmpeg-tools";
const ImageToolClient = dynamic(() => import("@/components/tools/clients/ImageToolClient").then((m) => ({ default: m.ImageToolClient })));
const AiTextClient = dynamic(() => import("@/components/tools/clients/AiTextClient").then((m) => ({ default: m.AiTextClient })));
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
    // Localized category hubs (/<locale>/documents, …) share this route.
    for (const c of CATEGORIES) {
      params.push({ locale, slug: c.id });
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
  if (tool) {
    const i18n = resolveToolI18n(params.slug, params.locale);
    return buildToolMetadata(tool, params.locale, i18n ?? undefined);
  }
  // Category hub?
  if (params.slug in CATEGORY_BY_ID) {
    return categoryMetadata(params.slug as ToolCategory, params.locale);
  }
  return {};
}

export default function LocalisedToolPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale) || params.locale === "en") notFound();
  const tool = TOOLS_BY_SLUG[params.slug];
  // Category hub: same route, render the localized CategoryPage.
  if (!tool) {
    if (params.slug in CATEGORY_BY_ID) {
      return <CategoryPage category={params.slug as ToolCategory} locale={params.locale} />;
    }
    notFound();
  }
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
  if (tool.slug === "merge-audio") {
    return (
      <ToolPageShell tool={tool} locale={locale} override={override}>
        <MergeAudioClient />
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
    case "percentage-calculator":
      body = <PercentageCalculatorClient />;
      break;
    case "loan-calculator":
      body = <LoanCalculatorClient />;
      break;
    case "tip-calculator":
      body = <TipCalculatorClient />;
      break;
    case "bmi-calculator":
      body = <BmiCalculatorClient />;
      break;
    case "enhance-image":
      body = <EnhanceImageClient />;
      break;
    case "meme-generator":
      body = <MemeGeneratorClient />;
      break;
    case "photo-editor":
      body = <PhotoEditorClient />;
      break;
    case "html-to-image":
      body = <HtmlToImageClient />;
      break;
    case "blur-face":
      body = <BlurFaceClient />;
      break;
    case "heic-to-jpg":
      body = <HeicConvertClient target="jpeg" />;
      break;
    case "heic-to-png":
      body = <HeicConvertClient target="png" />;
      break;
    case "organize-pdf":
      body = <OrganizePdfClient />;
      break;
    case "extract-pdf-pages":
      body = <ExtractPdfPagesClient />;
      break;
    case "edit-pdf-metadata":
      body = <EditPdfMetadataClient />;
      break;
    case "images-to-gif":
      body = <ImagesToGifClient />;
      break;
    case "image-collage":
      body = <ImageCollageClient />;
      break;
    case "password-checker":
      body = <PasswordCheckerClient />;
      break;
    case "ssl-checker":
      body = <SslCheckerClient />;
      break;
    case "email-checker":
      body = <EmailCheckerClient />;
      break;
    case "phishing-detector":
      body = <PhishingDetectorClient />;
      break;
    case "url-scanner":
      body = <UrlScannerClient />;
      break;
    case "ssh-key-generator":
      body = <SshKeyGeneratorClient />;
      break;
    case "text-encryptor":
      body = <TextEncryptorClient />;
      break;
    case "file-encryptor":
      body = <FileEncryptorClient />;
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
    case "fill-pdf-form":
      body = <FillPdfFormClient />;
      break;
    case "translate-document-with-layout":
      body = <TranslateDocumentClient />;
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
    case "url-shortener":
      body = <ServerLinkClient kind="short" />;
      break;
    case "deep-link":
      body = <ServerLinkClient kind="deep" />;
      break;
    case "magic-link":
      body = <ServerLinkClient kind="magic" />;
      break;
    case "utm-builder":
      body = <UtmBuilderClient />;
      break;
    case "link-builder":
      body = <LinkBuilderClient />;
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
