import type { BloqueTabla } from "@/content/charla";

/** Tabla simple y legible. En celular, cada fila se apila como tarjeta. */
export default function Tabla({ bloque }: { bloque: BloqueTabla }) {
  return (
    <div className="overflow-hidden rounded-xl border border-linea bg-tarjeta">
      {/* Vista de tabla (desde tablet para arriba) */}
      <table className="hidden w-full border-collapse text-left md:table">
        <thead>
          <tr className="border-b border-linea bg-fondo">
            {bloque.columnas.map((col) => (
              <th
                key={col}
                className="px-5 py-4 text-sm font-semibold uppercase tracking-wide text-gris"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bloque.filas.map((fila, i) => (
            <tr key={i} className="border-b border-linea last:border-0">
              {fila.map((celda, j) => (
                <td
                  key={j}
                  className={`px-5 py-4 align-top text-lg ${
                    j === 0 ? "font-semibold text-tinta" : "text-tinta"
                  }`}
                >
                  {celda}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vista apilada (celular) */}
      <div className="divide-y divide-linea md:hidden">
        {bloque.filas.map((fila, i) => (
          <div key={i} className="p-5">
            {fila.map((celda, j) => (
              <div key={j} className="mb-2 last:mb-0">
                <span className="block text-xs font-semibold uppercase tracking-wide text-gris">
                  {bloque.columnas[j]}
                </span>
                <span
                  className={`text-lg ${j === 0 ? "font-semibold text-tinta" : "text-tinta"}`}
                >
                  {celda}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
