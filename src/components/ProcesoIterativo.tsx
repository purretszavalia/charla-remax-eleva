/**
 * Tres pasos horizontales numerados y conectados (se apilan en mobile).
 * Pensado para el lienzo de la presentación (1920×1080).
 */
export default function ProcesoIterativo({
  pasos,
}: {
  pasos: { titulo: string }[];
}) {
  return (
    <ol className="grid gap-8 md:grid-cols-3">
      {pasos.map((paso, i) => (
        <li
          key={i}
          className="relative flex flex-col items-start gap-6 rounded-2xl border border-linea bg-tarjeta p-10"
        >
          <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-acento text-[32px] font-bold text-white">
            {i + 1}
          </span>
          <p className="text-[34px] font-medium leading-snug text-tinta">
            {paso.titulo}
          </p>
        </li>
      ))}
    </ol>
  );
}
