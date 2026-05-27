import type { Metadata } from "next";
import { HumanizerClient } from "@/components/tools/clients/HumanizerClient";

export const metadata: Metadata = {
  title: "AI Humanizer — Make AI Text Sound Human",
  description: "Rewrite AI-generated text so it reads naturally and human-written. Varies sentence length, vocabulary and structure. Free, private — your text is never stored.",
  alternates: { canonical: "/ai-humanizer" },
};

export default function Page() {
  return (
    <section className="bg-surface">
      <div className="container py-10 md:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">AI Text Humanizer</h1>
          <p className="mt-3 text-ink-500">Rewrite AI-generated text you own so it reads as natural, human prose — varied rhythm, vocabulary and structure.</p>
        </div>
        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-ink-100 bg-white p-5 shadow-card md:p-7">
          <HumanizerClient />
        </div>
      </div>
    </section>
  );
}
