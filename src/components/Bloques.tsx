import type { Bloque } from "@/content/charla";
import Callout from "./Callout";
import Tabla from "./Tabla";
import Checklist from "./Checklist";
import ComparacionPasos from "./ComparacionPasos";
import ChatMock from "./ChatMock";
import Recap from "./Recap";
import EnConstruccion from "./EnConstruccion";

/**
 * Recibe la lista de bloques de un paso y dibuja cada uno con el
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
