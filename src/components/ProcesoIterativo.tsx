/**
 * Tres pasos horizontales numerados y conectados (se apilan en mobile).
 * Representa el ciclo: entender → anotar → mejorar.
 */
export default function ProcesoIterativo({
  pasos,
}: {
  pasos: { titulo: string }[];
}) {
  return (
    <ol className="grid gap-4 md:grid-cols-3 md:gap-0">
      {pasos.map((paso, i) => (
        <li key={i} className="relative flex items-start gap-4 md:flex-col md:gap-3 md:px-5">
          {/* Línea conectora (solo desktop, entre tarjetas) */}
          {i < pasos.length - 1 && (
            <span
              aria-hidden
              className="absolute left-4 top-9 hidden h-[2px] w-full bg-linea md:block"
            />
          )}
          <span className="relative z-10 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-acento text-base font-bold text-white">
            {i + 1}
          </span>
          <p className="pt-1 text-lg font-medium text-tinta md:pt-0">
            {paso.titulo}
          </p>
        </li>
      ))}
    </ol>
  );
}
