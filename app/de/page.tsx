import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tools/ToolCard";
import { TOOLS } from "@/lib/tools-config";

export const metadata: Metadata = {
  title: "iLoveSubtitle — Kostenlose Untertitel-Tools online",
  description:
    "Kostenlose Untertitel-Tools: erzeugen, übersetzen, synchronisieren, umwandeln. Powered by Whisper. Sechzehn Tools für SRT, VTT und untertiteltes Video.",
  alternates: { canonical: "/de" },
};

export default function PageDe() {
  return (
    <>
      <section className="border-b border-ink-100 bg-white">
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              <Sparkles className="h-3.5 w-3.5" />
              Kostenlos · ohne Anmeldung
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink-900 md:text-6xl">
              Untertitel online umwandeln, erstellen und übersetzen
            </h1>
            <p className="mt-6 text-lg text-ink-500">
              Sechzehn fokussierte Tools für SRT, VTT und Video-Untertitel. Datei hochladen,
              Ergebnis herunterladen.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/subtitle-generator">
                <Button size="lg">
                  Mit dem Generator starten <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#tools">
                <Button size="lg" variant="outline">
                  Alle Tools ansehen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900">
            Alle Untertitel-Tools
          </h2>
          <p className="mt-3 text-ink-500">
            Tool wählen. Datei hochladen. Ergebnis herunterladen.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
