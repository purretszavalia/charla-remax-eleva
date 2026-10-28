import type { Camino } from "@/content/charla";

/**
 * Dos caminos lado a lado: el largo (gris) y el corto (acento).
 * Pensado para el lienzo de la presentación (1920×1080).
 */
export default function ComparacionPasos({
  largo,
  corto,
}: {
  largo: Camino;
  corto: Camino;
}) {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Camino largo */}
      <div className="rounded-2xl border border-linea bg-tarjeta p-10">
        <p className="mb-6 text-[26px] font-semibold uppercase tracking-wide text-gris">
          {largo.titulo}
        </p>
        <ol className="space-y-5">
          {largo.pasos.map((paso, i) => (
            <li key={i} className="flex items-center gap-5 text-gris">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border-2 border-linea text-[24px] font-semibold">
                {i + 1}
              </span>
              <span className="text-[34px]">{paso}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Camino corto */}
      <div className="rounded-2xl border-2 border-acento/40 bg-acento-suave p-10">
        <p className="mb-6 text-[26px] font-semibold uppercase tracking-wide text-acento">
          {corto.titulo}
        </p>
        <ol className="space-y-5">
          {corto.pasos.map((paso, i) => (
            <li key={i} className="flex items-center gap-5 text-tinta">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-acento text-[24px] font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-[34px] font-medium">{paso}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
