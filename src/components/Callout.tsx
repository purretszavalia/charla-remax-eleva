import type { BloqueCallout } from "@/content/charla";

// Estilos por variante. Cambiar acá cambia el look de todos los recuadros.
const estilos = {
  porQueImporta: {
    etiqueta: "Por qué importa",
    caja: "border-azul/30 bg-azul-suave",
    borde: "border-l-azul",
    color: "text-azul",
  },
  dato: {
    etiqueta: "Dato",
    caja: "border-linea bg-tarjeta",
    borde: "border-l-tinta",
    color: "text-tinta",
  },
  clave: {
    etiqueta: "Clave",
    caja: "border-acento/30 bg-acento-suave",
    borde: "border-l-acento",
    color: "text-acento",
  },
} as const;

export default function Callout({ bloque }: { bloque: BloqueCallout }) {
  const e = estilos[bloque.variante];

  return (
    <div
      className={`rounded-xl border border-l-4 ${e.caja} ${e.borde} px-6 py-5`}
    >
      <p
        className={`mb-2 text-xs font-semibold uppercase tracking-wider ${e.color}`}
      >
        {e.etiqueta}
      </p>
      {bloque.titulo && (
        <p className="mb-1 text-xl font-semibold text-tinta">{bloque.titulo}</p>
      )}
      <p className="text-lg leading-relaxed text-tinta md:text-xl">
        {bloque.texto}
      </p>
      {bloque.variante === "dato" && bloque.fuente && (
        <p className="mt-3 text-sm text-gris">Fuente: {bloque.fuente}</p>
      )}
    </div>
  );
}
