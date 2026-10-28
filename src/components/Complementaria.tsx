import type { Complementaria as ComplementariaType } from "@/content/charla";
import Section from "./Section";
import Bloques from "./Bloques";

/** Sección complementaria (temas extra que acompañan a un paso). */
export default function Complementaria({
  seccion,
}: {
  seccion: ComplementariaType;
}) {
  return (
    <Section id={seccion.id}>
      <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-acento">
        {seccion.antetitulo}
      </p>

      <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-tinta">
        {seccion.titulo}
      </h2>

      {seccion.respuesta && (
        <p className="mt-6 border-l-4 border-acento pl-5 text-2xl font-semibold leading-snug text-azul md:text-[1.75rem]">
          {seccion.respuesta}
        </p>
      )}

      <Bloques bloques={seccion.bloques} />
    </Section>
  );
}
