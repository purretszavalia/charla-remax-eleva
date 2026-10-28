"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { slides } from "@/content/charla";
import SlideScaler from "@/components/SlideScaler";
import SlideView from "@/components/SlideView";

const TOTAL = slides.length;

function mmss(seg: number) {
  const m = Math.floor(seg / 60)
    .toString()
    .padStart(2, "0");
  const s = (seg % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Presentador() {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const chanRef = useRef<BroadcastChannel | null>(null);
  const [seg, setSeg] = useState(0);

  const goto = useCallback((i: number, broadcast = true) => {
    const n = Math.max(0, Math.min(TOTAL - 1, i));
    indexRef.current = n;
    setIndex(n);
    if (broadcast) chanRef.current?.postMessage({ type: "goto", index: n });
  }, []);

  // Canal de sincronización con la ventana principal.
  useEffect(() => {
    const ch = new BroadcastChannel("charla-deck");
    chanRef.current = ch;
    ch.onmessage = (e) => {
      const d = e.data;
      if (d?.type === "goto" && typeof d.index === "number") {
        indexRef.current = d.index;
        setIndex(d.index);
      } else if (d?.type === "request") {
        ch.postMessage({ type: "goto", index: indexRef.current });
      }
    };
    // Pedir a la ventana principal en qué slide está.
    ch.postMessage({ type: "request" });
    return () => ch.close();
  }, []);

  // Cronómetro.
  useEffect(() => {
    const id = setInterval(() => setSeg((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Navegación con teclado también desde el presentador.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const k = e.key;
      if (["ArrowRight", "ArrowDown", "PageDown", " ", "Spacebar"].includes(k)) {
        e.preventDefault();
        goto(indexRef.current + 1);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(k)) {
        e.preventDefault();
        goto(indexRef.current - 1);
      } else if (k === "Home") {
        goto(0);
      } else if (k === "End") {
        goto(TOTAL - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goto]);

  const actual = slides[index];
  const proxima = slides[index + 1];

  return (
    <div className="flex h-screen flex-col gap-4 bg-[#0d0d0f] p-6 text-white">
      {/* Barra superior */}
      <header className="flex items-center justify-between">
        <p className="text-lg font-semibold">
          Presentador ·{" "}
          <span className="text-white/60">
            {actual.seccion} · {index + 1} / {TOTAL}
          </span>
        </p>
        <div className="flex items-center gap-4">
          <span className="font-mono text-3xl tabular-nums">{mmss(seg)}</span>
          <button
            type="button"
            onClick={() => setSeg(0)}
            className="rounded-full border border-white/30 px-4 py-1 text-sm text-white/80 hover:bg-white/10"
          >
            Reiniciar
          </button>
        </div>
      </header>

      {/* Cuerpo */}
      <div
        className="grid min-h-0 flex-1 gap-6"
        style={{ gridTemplateColumns: "1.25fr 1fr" }}
      >
        {/* Columna izquierda: slide actual + controles */}
        <div className="flex min-h-0 flex-col gap-4">
          <p className="text-sm uppercase tracking-widest text-white/50">
            Slide actual
          </p>
          <div className="overflow-hidden rounded-xl border border-white/15">
            <SlideScaler mode="width">
              <SlideView slide={actual} />
            </SlideScaler>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goto(index - 1)}
              className="rounded-full border border-white/30 px-6 py-2 text-lg text-white/80 hover:bg-white/10"
            >
              ◀ Anterior
            </button>
            <button
              type="button"
              onClick={() => goto(index + 1)}
              className="rounded-full bg-acento px-6 py-2 text-lg font-semibold text-white hover:opacity-90"
            >
              Siguiente ▶
            </button>
          </div>
        </div>

        {/* Columna derecha: próxima slide + notas */}
        <div className="flex min-h-0 flex-col gap-4">
          <p className="text-sm uppercase tracking-widest text-white/50">
            Próxima
          </p>
          {proxima ? (
            <div className="overflow-hidden rounded-xl border border-white/15 opacity-80">
              <SlideScaler mode="width">
                <SlideView slide={proxima} />
              </SlideScaler>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-white/20 p-6 text-white/40">
              (última slide)
            </div>
          )}

          <p className="mt-2 text-sm uppercase tracking-widest text-white/50">
            Notas
          </p>
          <div className="min-h-0 flex-1 overflow-auto rounded-xl bg-white/5 p-6 text-[26px] leading-relaxed text-white/90">
            {actual.notas ?? (
              <span className="text-white/40">(sin notas)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
