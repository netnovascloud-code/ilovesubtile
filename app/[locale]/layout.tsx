import { notFound } from "next/navigation";
import { NON_DEFAULT_LOCALES, isLocale, isRtl } from "@/lib/i18n/locales";

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  if (!isLocale(params.locale) || params.locale === "en") {
    notFound();
  }
  const rtl = isRtl(params.locale);
  return <div dir={rtl ? "rtl" : undefined}>{children}</div>;
}
