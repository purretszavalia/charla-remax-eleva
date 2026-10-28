import type { BloqueRecap } from "@/content/charla";

/** Recuadro "Hasta acá": repasa en una lista corta lo que ya tenemos. */
export default function Recap({ bloque }: { bloque: BloqueRecap }) {
  return (
    <div className="rounded-xl border border-azul/30 bg-azul-suave px-6 py-5">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-azul">
        {bloque.titulo ?? "Hasta acá"}
      </p>
      <ul className="space-y-2">
        {bloque.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-lg text-tinta">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-azul" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
