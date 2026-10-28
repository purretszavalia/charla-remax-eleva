import type { BloqueChecklist } from "@/content/charla";

/** Lista de ítems con tilde. */
export default function Checklist({ bloque }: { bloque: BloqueChecklist }) {
  return (
    <div>
      {bloque.titulo && (
        <p className="mb-3 text-xl font-semibold text-tinta">{bloque.titulo}</p>
      )}
      <ul className="grid gap-3 sm:grid-cols-2">
        {bloque.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-acento-suave text-sm font-bold text-acento"
            >
              ✓
            </span>
            <span className="text-lg text-tinta md:text-xl">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
