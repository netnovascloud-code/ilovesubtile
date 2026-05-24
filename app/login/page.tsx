import type { Metadata } from "next";
import Link from "next/link";
import { EmailAuthForm } from "@/components/auth/EmailAuthForm";
import { GoogleButton } from "@/components/auth/GoogleButton";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to CaptionFlow to manage your jobs and subscription.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="container max-w-md py-16">
      <div className="rounded-lg border border-ink-100 bg-white p-8 shadow-card">
        <h1 className="text-2xl font-semibold text-ink-900">Welcome back</h1>
        <p className="mt-1 text-sm text-ink-500">Log in to your CaptionFlow account.</p>

        <div className="mt-6">
          <GoogleButton />
          <div className="my-6 flex items-center gap-3 text-xs text-ink-400">
            <div className="h-px flex-1 bg-ink-100" />
            <span>or with email</span>
            <div className="h-px flex-1 bg-ink-100" />
          </div>
          <EmailAuthForm mode="login" />
        </div>

        <p className="mt-6 text-center text-sm text-ink-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-brand-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
