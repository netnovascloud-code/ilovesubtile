import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tools/ToolCard";
import { TOOLS } from "@/lib/tools-config";

export const metadata: Metadata = {
  title: "CaptionFlow — Herramientas gratuitas de subtítulos en línea",
  description:
    "Herramientas gratuitas de subtítulos: generar, traducir, sincronizar, convertir. Impulsado por Mistral AI. Dieciséis herramientas para SRT, VTT y vídeo con subtítulos.",
  alternates: { canonical: "/es" },
};

export default function PageEs() {
  return (
    <>
      <section className="border-b border-ink-100 bg-white">
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              <Sparkles className="h-3.5 w-3.5" />
              Gratis · sin registro
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink-900 md:text-6xl">
              Convierte, genera y traduce subtítulos en línea
            </h1>
            <p className="mt-6 text-lg text-ink-500">
              Dieciséis herramientas centradas en SRT, VTT y vídeo con subtítulos. Suelta tu
              archivo y descarga el resultado.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/subtitle-generator">
                <Button size="lg">
                  Empezar con el generador <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#tools">
                <Button size="lg" variant="outline">
                  Ver todas las herramientas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900">
            Todas las herramientas de subtítulos
          </h2>
          <p className="mt-3 text-ink-500">
            Elige la herramienta. Suelta tu archivo. Descarga el resultado.
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
