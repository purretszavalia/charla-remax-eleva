/** Grilla de números grandes con una etiqueta corta debajo. */
export default function StatsGrid({
  stats,
}: {
  stats: { valor: string; etiqueta: string }[];
}) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.etiqueta}
          className="rounded-xl border border-linea bg-tarjeta px-5 py-5"
        >
          <dt className="text-3xl font-bold tracking-tight text-acento md:text-4xl">
            {stat.valor}
          </dt>
          <dd className="mt-2 text-base leading-snug text-gris">
            {stat.etiqueta}
          </dd>
        </div>
      ))}
    </dl>
  );
}
