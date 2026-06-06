import type { Metadata } from "next";
import Link from "next/link";
import { EmailAuthForm } from "@/components/auth/EmailAuthForm";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { getChrome } from "@/lib/i18n/chrome";
import { isLocale, type Locale, DEFAULT_LOCALE, isRtl } from "@/lib/i18n/locales";
import { safeInternalPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Sign up for Konvertools — free tier with a few daily runs.",
  robots: { index: false, follow: false },
};

export default async function RegisterPage(
  props: {
    searchParams?: Promise<{ lang?: string; redirect?: string; plan?: string; interval?: string; pack?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const langParam = searchParams?.lang ?? "";
  const locale: Locale = isLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const t = getChrome(locale).auth;
  const rtl = isRtl(locale);

  // Post-signup destination. An explicit ?redirect wins; otherwise, if the
  // visitor arrived here from a pricing CTA (?plan / ?pack), send them straight
  // to checkout once the account exists. Falls back to the dashboard.
  let redirect = safeInternalPath(searchParams?.redirect);
  if (!searchParams?.redirect) {
    if (searchParams?.pack) {
      redirect = `/billing/checkout?pack=${encodeURIComponent(searchParams.pack)}`;
    } else if (searchParams?.plan) {
      const interval = searchParams.interval === "annual" ? "annual" : "monthly";
      redirect = `/billing/checkout?plan=${encodeURIComponent(searchParams.plan)}&interval=${interval}`;
    }
  }
  const loginHref = `/login?${new URLSearchParams({
    ...(locale !== DEFAULT_LOCALE ? { lang: locale } : {}),
    ...(redirect !== "/dashboard" ? { redirect } : {}),
  }).toString()}`;

  return (
    <div dir={rtl ? "rtl" : undefined} className="container max-w-md py-16">
      <div className="rounded-lg border border-ink-100 bg-white p-8 shadow-card">
        <h1 className="text-2xl font-semibold text-ink-900">{t.registerTitle}</h1>
        <p className="mt-1 text-sm text-ink-500">{t.registerLead}</p>

        <div className="mt-6">
          <GoogleButton redirect={redirect} />
          {/* OAuth click-through consent: clicking the Google button takes the
              user off-site immediately, so we can't gate it on a local
              checkbox. The standard SaaS pattern (GitHub, Notion, Linear) is
              an explicit in-text notice immediately above the OAuth button. */}
          <p className="mt-2 text-center text-xs text-ink-400">
            By continuing with Google you accept the{" "}
            <Link href="/terms" target="_blank" className="text-brand-600 underline">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy" target="_blank" className="text-brand-600 underline">Privacy Policy</Link>.
          </p>
          <div className="my-6 flex items-center gap-3 text-xs text-ink-400">
            <div className="h-px flex-1 bg-ink-100" />
            <span>{t.orWithEmail}</span>
            <div className="h-px flex-1 bg-ink-100" />
          </div>
          <EmailAuthForm
            mode="register"
            redirect={redirect}
            labels={{
              email: t.email, password: t.password, loginCta: t.loginCta,
              registerCta: t.registerCta, loading: t.loading, checkInbox: t.checkInbox,
            }}
          />
        </div>

        <p className="mt-6 text-center text-sm text-ink-500">
          {t.hasAccount}{" "}
          <Link
            href={loginHref}
            className="font-medium text-brand-600 hover:underline"
          >
            {t.logIn}
          </Link>
        </p>
      </div>
    </div>
  );
}
