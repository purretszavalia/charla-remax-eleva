import type { Slide } from "@/content/slides";
import StageBar from "./StageBar";

/**
 * Dibuja UNA slide en el lienzo fijo de 1920×1080, según su `layout`.
 * Si la slide tiene `etapa`, arriba va la barra de etapas.
 * El escalado lo hace SlideScaler; el número de slide lo pone el Deck.
 */
export default function SlideView({ slide }: { slide: Slide }) {
  return (
    <div
      className="flex flex-col bg-fondo text-tinta"
      style={{ width: 1920, height: 1080 }}
    >
      {slide.etapa && (
        <div style={{ padding: "64px 140px 0" }}>
          <StageBar actual={slide.etapa} />
        </div>
      )}
      <div
        className="flex flex-1 flex-col justify-center"
        style={{ padding: "48px 140px 80px" }}
      >
        {contenido(slide)}
      </div>
    </div>
  );
}

/* Viñeta reutilizable para las listas. */
function Vineta() {
  return (
    <span
      aria-hidden
      className="mt-[20px] h-4 w-4 flex-none rounded-full bg-acento"
    />
  );
}

function Lista({ items, size = 42 }: { items: string[]; size?: number }) {
  return (
    <ul className="space-y-6">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-6">
          <Vineta />
          <span style={{ fontSize: size }} className="leading-snug">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function contenido(s: Slide) {
  switch (s.layout) {
    // ---------------------------------------------------------- portada
    case "portada":
      return (
        <div className="text-center">
          {s.antetitulo && (
            <p className="mb-10 text-[36px] font-semibold uppercase tracking-[0.22em] text-acento">
              {s.antetitulo}
            </p>
          )}
          <h1 className="mx-auto max-w-[1500px] text-[112px] font-bold leading-[1.04] tracking-tight">
            {s.titulo}
          </h1>
        </div>
      );

    // ---------------------------------------------------------- proceso (slide 2)
    case "proceso":
      return (
        <div>
          <h1 className="text-[64px] font-bold leading-tight tracking-tight">
            {s.pregunta}
          </h1>
          {s.intro && (
            <p className="mt-6 text-[40px] text-gris">{s.intro}</p>
          )}
          <div className="mt-16 flex items-stretch justify-between gap-5">
            {(s.etapasDetalle ?? []).map((e, i) => (
              <div key={e.nombre} className="flex flex-1 items-stretch gap-5">
                <div className="flex flex-1 flex-col items-center rounded-2xl border border-linea bg-tarjeta px-6 py-10 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-acento text-[32px] font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="mt-6 text-[44px] font-bold leading-tight text-tinta">
                    {e.nombre}
                  </p>
                  <p className="mt-3 text-[28px] leading-snug text-gris">
                    {e.detalle}
                  </p>
                </div>
                {i < (s.etapasDetalle?.length ?? 0) - 1 && (
                  <span className="self-center text-[48px] text-acento">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    // ---------------------------------------------------------- dos-columnas
    case "dos-columnas":
      return (
        <div>
          {s.titulo && (
            <h2 className="mb-10 max-w-[1500px] text-[62px] font-bold leading-tight tracking-tight">
              {s.titulo}
            </h2>
          )}
          <div className="grid grid-cols-2 gap-14">
            {[s.col1, s.col2].map((col, i) =>
              col ? (
                <div
                  key={i}
                  className="flex flex-col rounded-2xl border border-linea bg-tarjeta p-10"
                >
                  {col.titulo && (
                    <p className="mb-8 text-[42px] font-semibold text-acento">
                      {col.titulo}
                    </p>
                  )}
                  {col.items && <Lista items={col.items} size={36} />}
                  {col.etiqueta && (
                    <span className="mt-8 inline-block w-fit rounded-full bg-acento-suave px-6 py-3 text-[28px] font-semibold text-acento">
                      {col.etiqueta}
                    </span>
                  )}
                </div>
              ) : (
                <div key={i} />
              ),
            )}
          </div>
        </div>
      );

    // ---------------------------------------------------------- lista-conclusion
    case "lista-conclusion":
      return (
        <div>
          <h2 className="mb-14 text-[68px] font-bold leading-tight tracking-tight">
            {s.titulo}
          </h2>
          <div className="grid grid-cols-2 items-start gap-14">
            <Lista items={s.items ?? []} />
            {s.conclusion && (
              <div className="rounded-2xl border-2 border-acento/40 bg-acento-suave p-12">
                <p className="mb-8 text-[46px] font-bold text-acento">
                  {s.conclusion.titulo}
                </p>
                <Lista items={s.conclusion.items} size={38} />
              </div>
            )}
          </div>
        </div>
      );

    // ---------------------------------------------------------- dos-tarjetas
    case "dos-tarjetas":
      return (
        <div>
          {s.titulo && (
            <h2 className="mb-16 max-w-[1500px] text-[62px] font-bold leading-tight tracking-tight">
              {s.titulo}
            </h2>
          )}
          <div className="grid grid-cols-2 gap-14">
            {(s.tarjetas ?? []).map((t) => (
              <div
                key={t.numero}
                className="flex min-h-[320px] flex-col items-start justify-center rounded-3xl border border-linea bg-tarjeta px-14 py-12"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-acento text-[40px] font-bold text-white">
                  {t.numero}
                </span>
                <p className="mt-8 text-[56px] font-bold leading-tight text-tinta">
                  {t.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    // ---------------------------------------------------------- destacado-lista
    case "destacado-lista":
      return (
        <div>
          <p className="text-[84px] font-bold leading-[1.05] tracking-tight">
            {s.frase}
          </p>
          {s.intro && (
            <p className="mt-12 text-[42px] text-tinta">{s.intro}</p>
          )}
          <div className="mt-6">
            <Lista items={s.items ?? []} />
          </div>
          {s.pie && (
            <p className="mt-12 text-[44px] font-semibold leading-snug text-azul">
              {s.pie}
            </p>
          )}
        </div>
      );

    // ---------------------------------------------------------- perfil-mockup
    case "perfil-mockup":
      return (
        <div>
          <h2 className="mb-12 text-[60px] font-bold leading-tight tracking-tight">
            {s.titulo}
          </h2>
          <div
            className="grid items-start gap-14"
            style={{ gridTemplateColumns: "0.85fr 1.15fr" }}
          >
            {/* Lo básico */}
            <div className="rounded-2xl border border-linea bg-tarjeta p-10">
              {s.col1?.titulo && (
                <p className="mb-8 text-[40px] font-semibold text-acento">
                  {s.col1.titulo}
                </p>
              )}
              {s.col1?.items && <Lista items={s.col1.items} size={34} />}
            </div>

            {/* Mockup de perfil (genérico, sin logo) */}
            <div className="rounded-2xl border border-linea bg-tarjeta p-8">
              <ul className="space-y-4">
                {(s.mockup ?? []).map((m) => (
                  <li key={m.numero} className="flex items-start gap-5">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-acento text-[22px] font-bold text-white">
                      {m.numero}
                    </span>
                    <span className="text-[30px] leading-snug">
                      <span className="font-semibold text-tinta">
                        {m.titulo}:
                      </span>{" "}
                      <span className="text-gris">{m.detalle}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );

    // ---------------------------------------------------------- lista-tips
    case "lista-tips":
      return (
        <div>
          <h2 className="mb-12 text-[66px] font-bold leading-tight tracking-tight">
            {s.titulo}
          </h2>
          <Lista items={s.items ?? []} />
          {s.tips && (
            <div className="mt-14 rounded-2xl border border-linea bg-tarjeta px-10 py-8">
              <p className="mb-6 text-[30px] font-semibold uppercase tracking-wide text-gris">
                {s.tips.titulo}
              </p>
              <div className="flex flex-wrap gap-5">
                {s.tips.items.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-acento-suave px-8 py-4 text-[36px] font-semibold text-acento"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );

    // ---------------------------------------------------------- comparacion
    case "comparacion":
      return (
        <div>
          <h2 className="text-[54px] font-bold leading-tight tracking-tight">
            {s.titulo}
          </h2>
          {s.destacado && (
            <p className="mt-8 text-center text-[72px] font-bold tracking-tight text-acento">
              {s.destacado}
            </p>
          )}
          {s.comparacion && (
            <div className="mt-10 grid grid-cols-2 gap-12">
              {/* Camino largo */}
              <div className="rounded-2xl border border-linea bg-tarjeta p-10">
                <p className="mb-6 text-[28px] font-semibold uppercase tracking-wide text-gris">
                  {s.comparacion.largo.titulo}
                </p>
                <ol className="space-y-5">
                  {s.comparacion.largo.pasos.map((p, i) => (
                    <li key={i} className="flex items-center gap-5 text-gris">
                      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border-2 border-linea text-[24px] font-semibold">
                        {i + 1}
                      </span>
                      <span className="text-[34px]">{p}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* Camino corto */}
              <div className="rounded-2xl border-2 border-acento/40 bg-acento-suave p-10">
                <p className="mb-6 text-[28px] font-semibold uppercase tracking-wide text-acento">
                  {s.comparacion.corto.titulo}
                </p>
                <ol className="space-y-5">
                  {s.comparacion.corto.pasos.map((p, i) => (
                    <li key={i} className="flex items-center gap-5 text-tinta">
                      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-acento text-[24px] font-semibold text-white">
                        {i + 1}
                      </span>
                      <span className="text-[34px] font-medium">{p}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      );

    // ---------------------------------------------------------- chat
    case "chat":
      return (
        <div>
          <h2 className="text-[54px] font-bold leading-tight tracking-tight">
            {s.titulo}
          </h2>
          {s.subtitulo && (
            <p className="mt-4 max-w-[1500px] text-[34px] leading-snug text-gris">
              {s.subtitulo}
            </p>
          )}
          <div className="mx-auto mt-8 w-full max-w-[1100px] rounded-3xl border border-linea bg-tarjeta p-8">
            <div className="flex flex-col gap-5">
              {(s.chat ?? []).map((m, i) => {
                const esAsesor = m.de === "asesor";
                return (
                  <div
                    key={i}
                    className={`flex ${esAsesor ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-3xl px-7 py-5 text-[30px] leading-relaxed ${
                        esAsesor
                          ? "rounded-br-lg bg-azul text-white"
                          : "rounded-bl-lg bg-fondo text-tinta"
                      }`}
                    >
                      <span className="mb-1 block text-[18px] font-semibold uppercase tracking-wide opacity-70">
                        {esAsesor ? "Asesor" : "Cliente"}
                      </span>
                      {m.texto}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );

    // ---------------------------------------------------------- lista-dato
    case "lista-dato":
      return (
        <div>
          <h2 className="mb-12 max-w-[1400px] text-[60px] font-bold leading-tight tracking-tight">
            {s.titulo}
          </h2>
          <div
            className="grid items-center gap-14"
            style={{ gridTemplateColumns: "1.3fr 0.7fr" }}
          >
            <Lista items={s.items ?? []} size={36} />
            {s.dato && (
              <div className="rounded-3xl border-2 border-azul/30 bg-azul-suave p-12 text-center">
                <p className="text-[120px] font-bold leading-none text-azul">
                  {s.dato.valor}
                </p>
                <p className="mt-6 text-[32px] leading-snug text-tinta">
                  {s.dato.texto}
                </p>
                {s.dato.fuente && (
                  <p className="mt-6 text-[22px] text-gris">
                    Fuente: {s.dato.fuente}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}
