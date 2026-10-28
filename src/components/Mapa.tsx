import { charla } from "@/content/charla";
import Section from "./Section";
import ProcesoIterativo from "./ProcesoIterativo";

export default function Mapa() {
  const { titulo, bajada, proceso } = charla.mapa;

  return (
    <Section id="mapa" contentClassName="max-w-4xl">
      <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight tracking-tight text-tinta">
        {titulo}
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gris md:text-xl">
        {bajada}
      </p>

      {/* Mini proceso iterativo (3 pasos) */}
      <div className="mt-8 rounded-2xl border border-linea bg-tarjeta px-6 py-6">
        <ProcesoIterativo pasos={proceso} />
      </div>

      {/* Las 11 preguntas (solo preguntas, clickeables) */}
      <ol className="mt-10 grid gap-3 sm:grid-cols-2">
        {charla.pasos.map((paso) => (
          <li key={paso.numero}>
            <a
              href={`#paso-${paso.numero}`}
              className="group flex h-full items-start gap-4 rounded-xl border border-linea bg-tarjeta px-5 py-4 transition-colors hover:border-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
            >
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-fondo text-base font-bold text-acento transition-colors group-hover:bg-acento group-hover:text-white">
                {paso.numero}
              </span>
              <span className="pt-1 text-lg font-medium text-tinta">
                {paso.pregunta}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </Section>
  );
}
