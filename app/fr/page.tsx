import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tools/ToolCard";
import { TOOLS } from "@/lib/tools-config";

export const metadata: Metadata = {
  title: "iLoveSubtitle — Outils gratuits de sous-titrage en ligne",
  description:
    "Outils de sous-titrage gratuits : générer, traduire, synchroniser, convertir. Propulsé par Whisper. Seize outils pour SRT, VTT et vidéos sous-titrées.",
  alternates: { canonical: "/fr" },
};

export default function PageFr() {
  return (
    <>
      <section className="border-b border-ink-100 bg-white">
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              <Sparkles className="h-3.5 w-3.5" />
              Gratuit · sans inscription
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink-900 md:text-6xl">
              Convertir, générer et traduire vos sous-titres en ligne
            </h1>
            <p className="mt-6 text-lg text-ink-500">
              Seize outils dédiés aux SRT, VTT et sous-titres vidéo. Déposez votre fichier,
              récupérez le résultat — sans éditeur compliqué, sans inscription.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/subtitle-generator">
                <Button size="lg">
                  Démarrer avec le générateur <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#tools">
                <Button size="lg" variant="outline">
                  Voir tous les outils
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900">
            Tous les outils de sous-titrage
          </h2>
          <p className="mt-3 text-ink-500">
            Choisissez votre outil. Déposez votre fichier. Récupérez le résultat.
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
