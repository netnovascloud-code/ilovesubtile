import type { Metadata } from "next";
import Link from "next/link";
import { EmailAuthForm } from "@/components/auth/EmailAuthForm";
import { GoogleButton } from "@/components/auth/GoogleButton";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Sign up for CaptionFlow — free tier with a few daily runs.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <div className="container max-w-md py-16">
      <div className="rounded-lg border border-ink-100 bg-white p-8 shadow-card">
        <h1 className="text-2xl font-semibold text-ink-900">Create your account</h1>
        <p className="mt-1 text-sm text-ink-500">5 free runs per day. No credit card required.</p>

        <div className="mt-6">
          <GoogleButton />
          <div className="my-6 flex items-center gap-3 text-xs text-ink-400">
            <div className="h-px flex-1 bg-ink-100" />
            <span>or with email</span>
            <div className="h-px flex-1 bg-ink-100" />
          </div>
          <EmailAuthForm mode="register" />
        </div>

        <p className="mt-6 text-center text-sm text-ink-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-brand-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
