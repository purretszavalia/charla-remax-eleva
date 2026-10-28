import { charla } from "@/content/charla";
import Section from "./Section";

export default function Hero() {
  const { antetitulo, titulo, bajada, texto, boton } = charla.hero;

  return (
    <Section id="inicio" contentClassName="text-center">
      {/* Espacio reservado para el logo (no usamos logos reales todavía). */}
      <div className="mb-8 flex justify-center">
        <span className="rounded-md border border-dashed border-linea px-3 py-1 text-xs font-medium uppercase tracking-widest text-gris">
          [LOGO]
        </span>
      </div>

      <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-acento">
        {antetitulo}
      </p>

      <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-tinta">
        {titulo}
      </h1>

      <p className="mt-6 text-2xl font-medium text-azul md:text-3xl">{bajada}</p>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gris md:text-xl">
        {texto}
      </p>

      <div className="mt-10">
        <a
          href={boton.href}
          className="inline-flex items-center gap-2 rounded-full bg-acento px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
        >
          {boton.label}
          <span aria-hidden>→</span>
        </a>
      </div>
    </Section>
  );
}
