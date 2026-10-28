import type { Bloque } from "@/content/charla";
import Callout from "./Callout";
import Tabla from "./Tabla";
import Checklist from "./Checklist";
import ComparacionPasos from "./ComparacionPasos";
import ChatMock from "./ChatMock";
import Recap from "./Recap";
import EnConstruccion from "./EnConstruccion";
import BloquePrompt from "./BloquePrompt";

/**
 * Recibe la lista de bloques de una sección y dibuja cada uno con el
 * componente que le corresponde, en orden. Para sumar un tipo de
 * bloque nuevo: agregalo en src/content/charla.ts y manejalo acá.
 */
export default function Bloques({ bloques }: { bloques: Bloque[] }) {
  return (
    <div className="mt-8 space-y-6">
      {bloques.map((bloque, i) => {
        switch (bloque.tipo) {
          case "parrafo":
            return (
              <p
                key={i}
                className="text-lg leading-relaxed text-tinta md:text-xl"
              >
                {bloque.texto}
              </p>
            );

          case "subtitulo":
            return (
              <h3
                key={i}
                className="pt-2 text-sm font-semibold uppercase tracking-wider text-acento"
              >
                {bloque.texto}
              </h3>
            );

          case "lista":
            return (
              <div key={i}>
                {bloque.titulo && (
                  <p className="mb-3 text-xl font-semibold text-tinta">
                    {bloque.titulo}
                  </p>
                )}
                <ul className="space-y-2">
                  {bloque.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-lg text-tinta md:text-xl"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-acento"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );

          case "listaDef":
            return (
              <div key={i}>
                {bloque.titulo && (
                  <p className="mb-3 text-xl font-semibold text-tinta">
                    {bloque.titulo}
                  </p>
                )}
                <ul className="space-y-3">
                  {bloque.items.map((item) => (
                    <li
                      key={item.termino}
                      className="text-lg leading-relaxed text-tinta md:text-xl"
                    >
                      <span className="font-semibold">{item.termino}:</span>{" "}
                      <span className="text-gris">{item.detalle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );

          case "checklistDetalle":
            return (
              <div key={i}>
                {bloque.titulo && (
                  <p className="mb-3 text-xl font-semibold text-tinta">
                    {bloque.titulo}
                  </p>
                )}
                <ul className="space-y-3">
                  {bloque.items.map((item) => (
                    <li key={item.titulo} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-acento-suave text-sm font-bold text-acento"
                      >
                        ✓
                      </span>
                      <span className="text-lg leading-relaxed text-tinta md:text-xl">
                        <span className="font-semibold">{item.titulo}:</span>{" "}
                        <span className="text-gris">{item.detalle}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );

          case "prompt":
            return (
              <BloquePrompt key={i} titulo={bloque.titulo} texto={bloque.texto} />
            );

          case "tarjetas":
            return (
              <div key={i}>
                <div className="grid gap-4 sm:grid-cols-3">
                  {bloque.items.map((item) => (
                    <div
                      key={item.titulo}
                      className="rounded-xl border border-linea bg-tarjeta px-5 py-5"
                    >
                      <p className="text-lg font-semibold text-tinta">
                        {item.titulo}
                      </p>
                      {item.texto && (
                        <p className="mt-1 text-base text-gris">{item.texto}</p>
                      )}
                    </div>
                  ))}
                </div>
                {bloque.pie && (
                  <p className="mt-4 text-lg font-medium text-azul">
                    {bloque.pie}
                  </p>
                )}
              </div>
            );

          case "subseccion":
            return (
              <div
                key={i}
                className="rounded-xl border border-azul/30 bg-azul-suave px-6 py-5"
              >
                <p className="mb-2 flex items-center gap-2">
                  {bloque.etiqueta && (
                    <span className="rounded-md bg-azul px-2 py-0.5 text-xs font-bold text-white">
                      {bloque.etiqueta}
                    </span>
                  )}
                  <span className="text-xl font-semibold text-tinta">
                    {bloque.titulo}
                  </span>
                </p>
                <p className="text-lg leading-relaxed text-tinta md:text-xl">
                  {bloque.texto}
                </p>
              </div>
            );

          case "callout":
            return <Callout key={i} bloque={bloque} />;

          case "tabla":
            return <Tabla key={i} bloque={bloque} />;

          case "checklist":
            return <Checklist key={i} bloque={bloque} />;

          case "comparacion":
            return <ComparacionPasos key={i} bloque={bloque} />;

          case "chat":
            return <ChatMock key={i} bloque={bloque} />;

          case "recap":
            return <Recap key={i} bloque={bloque} />;

          case "enConstruccion":
            return <EnConstruccion key={i} titulo={bloque.titulo} />;

          case "destacado":
            return (
              <p
                key={i}
                className="text-2xl font-semibold leading-snug text-azul md:text-3xl"
              >
                {bloque.texto}
              </p>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
