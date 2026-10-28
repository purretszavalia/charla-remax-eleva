"use client";

import { useState } from "react";

/** Caja de texto para copiar (por ejemplo, un prompt), con botón "Copiar". */
export default function BloquePrompt({
  titulo,
  texto,
}: {
  titulo: string;
  texto: string;
}) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Si el navegador bloquea el portapapeles, no hacemos nada.
    }
  }

  return (
    <div className="rounded-xl border border-azul/30 bg-azul-suave px-6 py-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-azul">
          {titulo}
        </p>
        <button
          type="button"
          onClick={copiar}
          className="flex-none rounded-full border border-azul/40 px-3 py-1 text-xs font-semibold text-azul transition-colors hover:bg-azul hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul"
        >
          {copiado ? "¡Copiado!" : "Copiar"}
        </button>
      </div>
      <p className="font-mono text-base leading-relaxed text-tinta">“{texto}”</p>
    </div>
  );
}
