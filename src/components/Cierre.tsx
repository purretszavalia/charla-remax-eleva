import { charla } from "@/content/charla";
import Section from "./Section";
import EnConstruccion from "./EnConstruccion";

export default function Cierre() {
  const { titulo, enConstruccion } = charla.cierre;

  return (
    <Section id="cierre" contentClassName="max-w-4xl">
      <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight tracking-tight text-tinta">
        {titulo}
      </h2>

      {/* Recorrido de las 11 preguntas, como un flujo */}
      <ol className="mt-10 space-y-2">
        {charla.pasos.map((paso, i) => (
          <li key={paso.numero}>
            <a
              href={`#paso-${paso.numero}`}
              className="group flex items-center gap-4 rounded-lg px-3 py-2 transition-colors hover:bg-tarjeta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
            >
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-linea text-sm font-bold text-acento transition-colors group-hover:border-acento">
                {paso.numero}
              </span>
              <span className="text-base font-medium text-tinta md:text-lg">
                {paso.pregunta}
              </span>
              {i < charla.pasos.length - 1 && (
                <span aria-hidden className="ml-auto text-gris">
                  ↓
                </span>
              )}
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
