import type { BloqueChat } from "@/content/charla";

/**
 * Conversación tipo chat. El cliente aparece a la izquierda y el
 * asesor a la derecha. Estilo genérico, sin logos de ninguna app.
 */
export default function ChatMock({ bloque }: { bloque: BloqueChat }) {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-linea bg-tarjeta p-4 shadow-sm">
      <div className="flex flex-col gap-3">
        {bloque.mensajes.map((msg, i) => {
          const esAsesor = msg.de === "asesor";
          return (
            <div
              key={i}
              className={`flex ${esAsesor ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-base leading-relaxed ${
                  esAsesor
                    ? "rounded-br-sm bg-azul text-white"
                    : "rounded-bl-sm bg-fondo text-tinta"
                }`}
              >
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide opacity-70">
                  {esAsesor ? "Asesor" : "Cliente"}
                </span>
                {msg.texto}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
