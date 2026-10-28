import { charla } from "@/content/charla";
import Section from "./Section";
import StatsGrid from "./StatsGrid";
import Callout from "./Callout";

export default function QuienSoy() {
  const q = charla.quienSoy;

  return (
    <Section id="quien-soy" contentClassName="max-w-4xl">
      <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight tracking-tight text-tinta">
        {q.titulo}
      </h2>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gris md:text-xl">
        {q.bajada}
      </p>

      {/* Foto + nombre */}
      <div className="mt-8 flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={q.foto}
          alt={q.nombre}
          width={96}
          height={96}
          className="h-24 w-24 flex-none rounded-full object-cover"
        />
        <div>
          <p className="text-xl font-semibold text-tinta">{q.nombre}</p>
          <p className="text-base text-gris">{q.rol}</p>
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-lg leading-relaxed text-tinta md:text-xl">
        {q.textoHumand}
      </p>

      <div className="mt-8">
        <StatsGrid stats={q.stats} />
      </div>

      <p className="mt-8 max-w-3xl text-lg leading-relaxed text-tinta md:text-xl">
        {q.textoAntes}
      </p>

      <div className="mt-8">
        <Callout
          bloque={{
            tipo: "callout",
            variante: "clave",
            titulo: q.callout.titulo,
            texto: q.callout.texto,
          }}
        />
      </div>
    </Section>
  );
}
