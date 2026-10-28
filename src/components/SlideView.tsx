import type { Slide } from "@/content/charla";
import StatsGrid from "./StatsGrid";
import ComparacionPasos from "./ComparacionPasos";
import ChatMock from "./ChatMock";
import ProcesoIterativo from "./ProcesoIterativo";

/**
 * Dibuja UNA slide en el lienzo fijo de 1920×1080, según su `layout`.
 * No tiene estado ni indicadores: solo el contenido visible.
 * El escalado lo hace SlideScaler; los indicadores los pone el Deck.
 */
export default function SlideView({ slide }: { slide: Slide }) {
  return (
    <div
      className="flex flex-col justify-center bg-fondo text-tinta"
      style={{ width: 1920, height: 1080, padding: "100px 140px" }}
    >
      {contenido(slide)}
    </div>
  );
}

function contenido(s: Slide) {
  switch (s.layout) {
    // ---------------------------------------------------------- portada
    case "portada":
      return (
        <div className="text-center">
          {s.antetitulo && (
            <p className="mb-8 text-[32px] font-semibold uppercase tracking-[0.2em] text-acento">
              {s.antetitulo}
            </p>
          )}
          <h1 className="mx-auto max-w-[1500px] text-[104px] font-bold leading-[1.05] tracking-tight">
            {s.titulo}
          </h1>
          {s.bajada && (
            <p className="mt-12 text-[48px] font-medium text-azul">{s.bajada}</p>
          )}
        </div>
      );

    // ---------------------------------------------------------- divisor-paso
    case "divisor-paso":
      return (
        <div>
          <p className="text-[40px] font-semibold uppercase tracking-[0.18em] text-acento">
            Paso {s.numero}
          </p>
          <h2 className="mt-6 max-w-[1550px] text-[104px] font-bold leading-[1.04] tracking-tight">
            {s.pregunta}
          </h2>
          {s.respuesta && (
            <p className="mt-12 border-l-[10px] border-acento pl-10 text-[58px] font-semibold leading-snug text-azul">
              {s.respuesta}
            </p>
          )}
        </div>
      );

    // ---------------------------------------------------------- lista
    case "lista":
      return (
        <div>
          {s.titulo && (
            <h2 className="text-[68px] font-bold leading-tight tracking-tight">
              {s.titulo}
            </h2>
          )}
          <ul className="mt-12 space-y-7">
            {(s.items ?? []).map((item) => (
              <li key={item} className="flex items-start gap-6">
                <span
                  aria-hidden
                  className="mt-[22px] h-4 w-4 flex-none rounded-full bg-acento"
                />
                <span className="text-[42px] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
          {s.pie && (
            <p className="mt-12 text-[40px] italic leading-snug text-gris">
              {s.pie}
            </p>
          )}
          {s.remate && (
            <p className="mt-12 text-[52px] font-semibold leading-snug text-azul">
              {s.remate}
            </p>
          )}
        </div>
      );

    // ---------------------------------------------------------- dos-columnas
    case "dos-columnas":
      return (
        <div>
          {s.titulo && (
            <h2 className="mb-14 text-[60px] font-bold leading-tight tracking-tight">
              {s.titulo}
            </h2>
          )}
          <div className="grid grid-cols-2 gap-14">
            {[s.izquierda, s.derecha].map((col, i) =>
              col ? (
                <div
                  key={i}
                  className="rounded-2xl border border-linea bg-tarjeta p-12"
                >
                  {col.titulo && (
                    <p className="mb-6 text-[38px] font-semibold text-acento">
                      {col.titulo}
                    </p>
                  )}
                  {col.texto && (
                    <p className="text-[40px] leading-snug text-tinta">
                      {col.texto}
                    </p>
                  )}
                  {col.items && (
                    <ul className="space-y-4">
                      {col.items.map((it) => (
                        <li key={it} className="flex items-start gap-4">
                          <span
                            aria-hidden
                            className="mt-[18px] h-3 w-3 flex-none rounded-full bg-acento"
                          />
                          <span className="text-[34px] leading-snug text-tinta">
                            {it}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <div key={i} />
              ),
            )}
          </div>
        </div>
      );

    // ---------------------------------------------------------- tabla
    case "tabla":
      return (
        <div>
          {s.titulo && (
            <h2 className="mb-12 text-[60px] font-bold leading-tight tracking-tight">
              {s.titulo}
            </h2>
          )}
          <div className="overflow-hidden rounded-2xl border border-linea bg-tarjeta">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-linea bg-fondo">
                  {(s.columnas ?? []).map((col) => (
                    <th
                      key={col}
                      className="px-8 py-6 text-[26px] font-semibold uppercase tracking-wide text-gris"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(s.filas ?? []).map((fila, i) => (
                  <tr key={i} className="border-b border-linea last:border-0">
                    {fila.map((celda, j) => (
                      <td
                        key={j}
                        className={`px-8 py-7 align-top text-[34px] leading-snug ${
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
          </div>
        </div>
      );

    // ---------------------------------------------------------- stats
    case "stats":
      return (
        <div>
          {s.titulo && (
            <h2 className="mb-14 text-[60px] font-bold leading-tight tracking-tight">
              {s.titulo}
            </h2>
          )}
          <StatsGrid stats={s.stats ?? []} />
          {s.fuente && (
            <p className="mt-10 text-[26px] text-gris">Fuente: {s.fuente}</p>
          )}
        </div>
      );

    // ---------------------------------------------------------- comparacion
    case "comparacion":
      return (
        <div>
          {s.titulo && (
            <h2 className="mb-14 text-[60px] font-bold leading-tight tracking-tight">
              {s.titulo}
            </h2>
          )}
          {s.comparacion && (
            <ComparacionPasos
              largo={s.comparacion.largo}
              corto={s.comparacion.corto}
            />
          )}
        </div>
      );

    // ---------------------------------------------------------- chat
    case "chat":
      return (
        <div>
          {s.titulo && (
            <h2 className="mb-12 text-[60px] font-bold leading-tight tracking-tight">
              {s.titulo}
            </h2>
          )}
          <ChatMock mensajes={s.chat ?? []} />
        </div>
      );

    // ---------------------------------------------------------- destacado
    case "destacado":
      if (s.variante === "prompt") {
        return (
          <div className="rounded-3xl border-2 border-azul/40 bg-azul-suave px-16 py-14">
            {s.titulo && (
              <p className="mb-8 text-[30px] font-semibold uppercase tracking-wider text-azul">
                {s.titulo}
              </p>
            )}
            <p className="font-mono text-[46px] leading-relaxed text-tinta">
              {s.texto}
            </p>
          </div>
        );
      }
      return (
        <div className="text-center">
          <p className="mx-auto max-w-[1500px] text-[76px] font-bold leading-[1.1] tracking-tight">
            {s.texto}
          </p>
          {s.sub && (
            <p className="mt-10 text-[46px] font-medium text-gris">{s.sub}</p>
          )}
        </div>
      );

    // ---------------------------------------------------------- tarjetas
    case "tarjetas":
      return (
        <div>
          {s.titulo && (
            <h2 className="mb-14 text-[60px] font-bold leading-tight tracking-tight">
              {s.titulo}
            </h2>
          )}
          <div className="grid grid-cols-3 gap-10">
            {(s.tarjetas ?? []).map((t) => (
              <div
                key={t.titulo}
                className="flex min-h-[260px] flex-col justify-center rounded-2xl border border-linea bg-tarjeta px-10 py-10 text-center"
              >
                <p className="text-[48px] font-bold leading-tight text-tinta">
                  {t.titulo}
                </p>
                {t.texto && (
                  <p className="mt-4 text-[32px] text-gris">{t.texto}</p>
                )}
              </div>
            ))}
          </div>
          {s.pie && (
            <p className="mt-12 text-center text-[48px] font-semibold text-azul">
              {s.pie}
            </p>
          )}
        </div>
      );

    // ---------------------------------------------------------- grilla-preguntas
    case "grilla-preguntas":
      return (
        <div>
          {s.titulo && (
            <h2 className="text-[60px] font-bold leading-tight tracking-tight">
              {s.titulo}
            </h2>
          )}
          {s.bajada && (
            <p className="mt-4 text-[34px] text-gris">{s.bajada}</p>
          )}
          <ol className="mt-12 grid grid-cols-2 gap-x-14 gap-y-7">
            {(s.preguntas ?? []).map((p) => (
              <li key={p.numero} className="flex items-start gap-5">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-fondo text-[26px] font-bold text-acento ring-2 ring-linea">
                  {p.numero}
                </span>
                <span>
                  <span className="block text-[34px] font-semibold leading-snug text-tinta">
                    {p.pregunta}
                  </span>
                  {p.respuesta && (
                    <span className="block text-[30px] leading-snug text-azul">
                      {p.respuesta}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      );

    // ---------------------------------------------------------- proceso
    case "proceso":
      return (
        <div>
          {s.titulo && (
            <h2 className="mb-14 text-[68px] font-bold leading-tight tracking-tight">
              {s.titulo}
            </h2>
          )}
          <ProcesoIterativo pasos={s.pasos ?? []} />
        </div>
      );

    // ---------------------------------------------------------- foto-texto
    case "foto-texto":
      return (
        <div
          className="grid items-center gap-20"
          style={{ gridTemplateColumns: "420px 1fr" }}
        >
          {s.foto && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={s.foto}
              alt={s.nombre ?? ""}
              width={420}
              height={420}
              className="h-[420px] w-[420px] rounded-3xl object-cover"
            />
          )}
          <div>
            {s.titulo && (
              <p className="text-[34px] font-semibold uppercase tracking-widest text-acento">
                {s.titulo}
              </p>
            )}
            {s.nombre && (
              <p className="mt-4 text-[72px] font-bold leading-none tracking-tight">
                {s.nombre}
              </p>
            )}
            {s.rol && <p className="mt-3 text-[36px] text-gris">{s.rol}</p>}
            {s.bajada && (
              <p className="mt-10 text-[40px] leading-snug text-tinta">
                {s.bajada}
              </p>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}
