import { charla } from "@/content/charla";
import Section from "./Section";
import EnConstruccion from "./EnConstruccion";

export default function Cierre() {
  const { titulo, bajada, resumen, enConstruccion } = charla.cierre;

  return (
    <Section id="cierre" contentClassName="max-w-4xl">
      <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight tracking-tight text-tinta">
        {titulo}
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gris md:text-xl">
        {bajada}
      </p>

      {/* Las 11 preguntas con su respuesta corta, como recorrido */}
      <ol className="mt-10 space-y-2">
        {resumen.map((item) => (
          <li key={item.numero}>
            <a
              href={`#paso-${item.numero}`}
              className="group flex items-start gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-tarjeta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
            >
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-linea text-sm font-bold text-acento transition-colors group-hover:border-acento">
                {item.numero}
              </span>
              <span>
                <span className="block text-base font-semibold text-tinta md:text-lg">
                  {item.pregunta}
                </span>
                <span className="block text-base text-azul">
                  {item.respuesta}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <EnConstruccion titulo={enConstruccion.titulo} />
      </div>
    </Section>
  );
}
