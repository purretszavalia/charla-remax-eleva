import { ETAPAS, type Etapa } from "@/content/slides";

/**
 * Barra fina con las 4 etapas (hilo conductor), arriba de las slides 3 a 12.
 * La etapa actual va en color de acento; las demás, en gris.
 */
export default function StageBar({ actual }: { actual: Etapa }) {
  return (
    <div className="flex items-center gap-5 border-b border-linea pb-6">
      {ETAPAS.map((e, i) => {
        const on = e === actual;
        return (
          <div key={e} className="flex items-center gap-5">
            <span
              className={`text-[30px] font-semibold tracking-tight ${
                on ? "text-acento" : "text-gris/50"
              }`}
            >
              {e}
            </span>
            {i < ETAPAS.length - 1 && (
              <span className="text-[26px] text-linea">·</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
