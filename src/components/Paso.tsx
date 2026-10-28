import type { Paso as PasoType } from "@/content/charla";
import { charla } from "@/content/charla";
import Section from "./Section";
import Bloques from "./Bloques";

export default function Paso({ paso }: { paso: PasoType }) {
  const total = charla.pasos.length;

  return (
    <Section id={`paso-${paso.numero}`}>
      {/* Número grande del paso */}
      <p className="mb-4 flex items-baseline gap-3">
        <span className="text-6xl font-bold leading-none text-acento md:text-7xl">
          {paso.numero}
        </span>
        <span className="text-sm font-semibold uppercase tracking-widest text-gris">
          Paso {paso.numero} de {total}
        </span>
      </p>

      {/* La pregunta: el elemento protagonista, legible desde lejos */}
      <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.08] tracking-tight text-tinta">
        {paso.pregunta}
      </h2>

      {/* La respuesta corta, destacada */}
      <p className="mt-6 border-l-4 border-acento pl-5 text-2xl font-semibold leading-snug text-azul md:text-[1.75rem]">
        {paso.respuesta}
      </p>

      {/* El detalle */}
      <Bloques bloques={paso.bloques} />
    </Section>
  );
}
