import type { Locale } from "@/lib/i18n/locales";
export type CategoryI18n = { label: string; blurb: string };

/**
 * AUTO-GENERATED — do not edit by hand. Produced by scripts/fill-translations.mjs.
 * Machine translations served by Mistral Large via the Konver ai-process edge
 * function. Resolvers prefer hand-authored strings over this overlay.
 */
export const GENERATED_CATEGORY_TRANSLATIONS: Record<string, Partial<Record<Locale, CategoryI18n>>> = {
  "archives": {
    "zh": {
      "label": "压缩包",
      "blurb": "直接在浏览器中创建和解压ZIP压缩包。"
    }
  },
  "audio": {},
  "developer": {},
  "documents": {
    "pt": {
      "label": "Documentos",
      "blurb": "PDF, Word, Excel, PowerPoint, EPUB e mais."
    }
  },
  "images": {},
  "subtitles": {
    "zh": {
      "label": "字幕",
      "blurb": "生成、翻译、同步和转换字幕"
    }
  },
  "text-ai": {
    "ko": {
      "label": "텍스트 & AI",
      "blurb": "텍스트 번역, 재작성, 요약 및 수정하기"
    }
  },
  "utilities": {},
  "video": {
    "de": {
      "label": "Video",
      "blurb": "Videos konvertieren, komprimieren, schneiden und bearbeiten mit Konver."
    }
  }
};
