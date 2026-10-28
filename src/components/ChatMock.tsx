/**
 * Conversación tipo chat (cliente a la izquierda, asesor a la derecha).
 * Estilo genérico, sin logos. Pensado para el lienzo (1920×1080).
 */
export default function ChatMock({
  mensajes,
}: {
  mensajes: { de: "cliente" | "asesor"; texto: string }[];
}) {
  return (
    <div className="mx-auto w-full max-w-[1100px] rounded-3xl border border-linea bg-tarjeta p-10 shadow-sm">
      <div className="flex flex-col gap-6">
        {mensajes.map((msg, i) => {
          const esAsesor = msg.de === "asesor";
          return (
            <div
              key={i}
              className={`flex ${esAsesor ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[78%] rounded-3xl px-8 py-6 text-[32px] leading-relaxed ${
                  esAsesor
                    ? "rounded-br-lg bg-azul text-white"
                    : "rounded-bl-lg bg-fondo text-tinta"
                }`}
              >
                <span className="mb-2 block text-[20px] font-semibold uppercase tracking-wide opacity-70">
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
