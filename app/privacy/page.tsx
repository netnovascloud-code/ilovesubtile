import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CaptionFlow handles your data.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <article className="container max-w-3xl py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink-900">Privacy Policy</h1>
      <p className="mt-3 text-sm text-ink-400">Last updated: {new Date().toISOString().slice(0, 10)}</p>

      <section className="prose prose-sm mt-8 max-w-none text-ink-700">
        <h2 className="mt-8 text-lg font-semibold text-ink-900">What we collect</h2>
        <p>
          Files you upload (video, audio, subtitles) are stored only as long as needed to deliver
          your result — typically less than one hour, then automatically deleted.
        </p>
        <p>
          We store your account email and a small amount of usage metadata (which tool, when, file
          size) to enforce quotas and improve the product.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-ink-900">What we don&apos;t do</h2>
        <p>
          We do not sell your data, share your content with advertisers, or train AI models on your
          uploads.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-ink-900">Third parties</h2>
        <p>
          Authentication and storage are provided by Supabase. Payments by Stripe. Transcription
          uses OpenAI Whisper. Translation uses DeepL. Emails are sent by Resend. Each of these
          services has their own privacy policy.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-ink-900">Your rights</h2>
        <p>
          You can request export or deletion of your account at any time. Write to{" "}
          <a className="text-brand-600 underline" href="mailto:privacy@captionflow.com">
            privacy@captionflow.com
          </a>
          .
        </p>
      </section>
    </article>
  );
}
