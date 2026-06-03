import type { Metadata } from "next";
import Link from "next/link";
import { EmailAuthForm } from "@/components/auth/EmailAuthForm";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { getChrome } from "@/lib/i18n/chrome";
import { isLocale, type Locale, DEFAULT_LOCALE, isRtl } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to Konvertools to manage your jobs and subscription.",
  robots: { index: false, follow: false },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const langParam = searchParams?.lang ?? "";
  const locale: Locale = isLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const t = getChrome(locale).auth;
  const rtl = isRtl(locale);

  return (
    <div dir={rtl ? "rtl" : undefined} className="container max-w-md py-16">
      <div className="rounded-lg border border-ink-100 bg-white p-8 shadow-card">
        <h1 className="text-2xl font-semibold text-ink-900">{t.loginTitle}</h1>
        <p className="mt-1 text-sm text-ink-500">{t.loginLead}</p>

        <div className="mt-6">
          <GoogleButton />
          <div className="my-6 flex items-center gap-3 text-xs text-ink-400">
            <div className="h-px flex-1 bg-ink-100" />
            <span>{t.orWithEmail}</span>
            <div className="h-px flex-1 bg-ink-100" />
          </div>
          <EmailAuthForm
            mode="login"
            labels={{
              email: t.email, password: t.password, loginCta: t.loginCta,
              registerCta: t.registerCta, loading: t.loading, checkInbox: t.checkInbox,
            }}
          />
        </div>

        <p className="mt-6 text-center text-sm text-ink-500">
          {t.noAccount}{" "}
          <Link
            href={`/register${locale !== DEFAULT_LOCALE ? `?lang=${locale}` : ""}`}
            className="font-medium text-brand-600 hover:underline"
          >
            {t.createOne}
          </Link>
        </p>
      </div>
    </div>
  );
}
