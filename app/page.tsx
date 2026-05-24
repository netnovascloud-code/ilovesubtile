import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Globe2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tools/ToolCard";
import { TOOLS } from "@/lib/tools-config";

const REASONS = [
  {
    icon: Zap,
    title: "Built for one thing",
    body: "Each tool does exactly one job. No bloated video editor, no learning curve.",
  },
  {
    icon: Sparkles,
    title: "Powered by Mistral",
    body: "Voxtral handles transcription, mistral-large does translation — accurate in 30+ languages.",
  },
  {
    icon: Globe2,
    title: "30+ languages",
    body: "Translate subtitles cue-by-cue with strict JSON output — timestamps stay intact.",
  },
  {
    icon: ShieldCheck,
    title: "Files auto-deleted",
    body: "We process and forget. Your media is gone within an hour.",
  },
];

export default function Home() {
  return (
    <>
      <section className="border-b border-ink-100 bg-white">
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              <Sparkles className="h-3.5 w-3.5" />
              Free · No sign-up required
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink-900 md:text-6xl">
              Convert, generate & translate subtitles online
            </h1>
            <p className="mt-6 text-lg text-ink-500">
              Sixteen focused tools for SRT, VTT and captioned video. Drop your file, get your
              result — no editor, no sign-up, no nonsense.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/subtitle-generator">
                <Button size="lg">
                  Start with the generator
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#tools">
                <Button size="lg" variant="outline">
                  See all tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="scroll-mt-20 bg-surface">
        <div className="container py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink-900">
              All subtitle tools
            </h2>
            <p className="mt-3 text-ink-500">
              Pick the tool you need. Drop your file. Get your result.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-100 bg-white">
        <div className="container py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900">
            Why CaptionFlow?
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r) => (
              <div key={r.title} className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
                <div className="grid h-10 w-10 place-items-center rounded bg-brand-50 text-brand-600">
                  <r.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-ink-900">{r.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-100 bg-surface">
        <div className="container py-20">
          <div className="rounded-lg border border-ink-100 bg-white p-10 shadow-card md:p-14">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-ink-900 md:text-3xl">
                  Need more? Go Pro for €12/month.
                </h2>
                <p className="mt-3 text-ink-500">
                  Unlimited runs, files up to 500&nbsp;MB, no ads, no watermark, every translation
                  language. Cancel anytime.
                </p>
                <div className="mt-6 flex gap-3">
                  <Link href="/pricing">
                    <Button>See pricing</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline">Create free account</Button>
                  </Link>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-ink-700">
                <li>✓ Unlimited tool runs</li>
                <li>✓ Files up to 500 MB</li>
                <li>✓ No ads, no watermark</li>
                <li>✓ All translation languages</li>
                <li>✓ Priority queue</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
