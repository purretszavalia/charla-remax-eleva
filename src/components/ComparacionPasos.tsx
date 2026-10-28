import type { BloqueComparacion } from "@/content/charla";

/**
 * Dos caminos lado a lado: a la izquierda el largo (en gris),
 * a la derecha el corto (en color de acento).
 */
export default function ComparacionPasos({
  bloque,
}: {
  bloque: BloqueComparacion;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:items-stretch">
      {/* Camino largo */}
      <div className="rounded-xl border border-linea bg-tarjeta p-6">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gris">
          {bloque.largo.titulo}
        </p>
        <ol className="space-y-3">
          {bloque.largo.pasos.map((paso, i) => (
            <li key={i} className="flex items-start gap-3 text-gris">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-linea text-sm font-semibold">
                {i + 1}
              </span>
              <span className="text-lg">{paso}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Camino corto */}
      <div className="rounded-xl border border-acento/30 bg-acento-suave p-6">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-acento">
          {bloque.corto.titulo}
        </p>
        <ol className="space-y-3">
          {bloque.corto.pasos.map((paso, i) => (
            <li key={i} className="flex items-start gap-3 text-tinta">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-acento text-sm font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-lg font-medium">{paso}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
