import { type Locale } from "@/lib/i18n/locales";

/**
 * Messages shown when a video exceeds the caller's plan caps (weight or
 * duration). `{max}` is interpolated with the already-formatted limit (e.g.
 * "200 MB" or "3 min"). English is the base + fallback for untranslated locales.
 */
export type VideoLimitStrings = {
  tooHeavy: string; // {max} = formatted weight, e.g. "200 MB"
  tooLong: string;  // {max} = formatted duration, e.g. "3 min"
  upgrade: string;
};

const en: VideoLimitStrings = {
  tooHeavy: "This video is heavier than your plan allows (max {max}). Upgrade your plan or use a smaller file.",
  tooLong: "This video is longer than your plan allows (max {max}). Upgrade your plan or trim it first.",
  upgrade: "Upgrade plan",
};
const fr: VideoLimitStrings = {
  tooHeavy: "Cette vidéo est plus lourde que ne l'autorise votre offre (max {max}). Passez à l'offre supérieure ou utilisez un fichier plus léger.",
  tooLong: "Cette vidéo dépasse la durée autorisée par votre offre (max {max}). Passez à l'offre supérieure ou raccourcissez-la d'abord.",
  upgrade: "Changer d'offre",
};

const TABLE: Partial<Record<Locale, VideoLimitStrings>> = { en, fr };

export function getVideoLimits(locale: Locale): VideoLimitStrings {
  return TABLE[locale] ?? en;
}
