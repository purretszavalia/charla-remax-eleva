import type { Metadata } from "next";
import { slides } from "@/content/charla";
import SlideScaler from "@/components/SlideScaler";
import SlideView from "@/components/SlideView";

export const metadata: Metadata = {
  title: "Charla RE/MAX Eleva — Para leer",
  description:
    "La charla completa, slide por slide, con las notas de cada una. Marketing y proceso de ventas, de lo complejo a lo simple.",
};

export default function Leer() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="no-print mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-acento">
          Charla para asesores · RE/MAX Eleva
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta">
          Marketing y proceso de ventas: de lo complejo a lo simple
        </h1>
        <p className="mt-4 text-lg text-gris">
          La charla completa, slide por slide, con las notas de cada una.
        </p>
      </header>

      <div className="space-y-12">
        {slides.map((s, i) => (
          <section key={s.id} className="leer-slide">
            <div className="overflow-hidden rounded-xl border border-linea shadow-sm">
              <SlideScaler mode="width">
                <SlideView slide={s} />
              </SlideScaler>
            </div>
            {s.notas && (
              <div className="notas-print mt-4 rounded-xl bg-tarjeta px-5 py-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gris">
                  {i + 1} · {s.seccion}
                </p>
                <p className="text-base leading-relaxed text-tinta">
                  {s.notas}
                </p>
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
