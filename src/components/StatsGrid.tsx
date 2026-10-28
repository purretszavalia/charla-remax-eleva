/**
 * Grilla de números grandes con etiqueta corta debajo.
 * Pensada para el lienzo de la presentación (1920×1080).
 */
export default function StatsGrid({
  stats,
}: {
  stats: { valor: string; etiqueta: string }[];
}) {
  const cols = stats.length <= 2 ? stats.length : stats.length === 4 ? 2 : 3;

  return (
    <dl
      className="grid gap-8"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {stats.map((stat) => (
        <div
          key={stat.etiqueta}
          className="rounded-2xl border border-linea bg-tarjeta px-10 py-10"
        >
          <dt className="text-[88px] font-bold leading-none tracking-tight text-acento">
            {stat.valor}
          </dt>
          <dd className="mt-5 text-[30px] leading-snug text-gris">
            {stat.etiqueta}
          </dd>
        </div>
      ))}
    </dl>
  );
}
