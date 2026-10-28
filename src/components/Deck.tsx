"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { slides } from "@/content/charla";
import SlideScaler from "./SlideScaler";
import SlideView from "./SlideView";

const TOTAL = slides.length;

/**
 * Runtime de la presentación en vivo:
 *  - Navegación con teclado y clicker (flechas / espacio / RePág-AvPág / Inicio-Fin).
 *  - F: pantalla completa · O: vista general · P: ventana del presentador.
 *  - La URL refleja la slide actual (#12), así al recargar volvés a la misma.
 *  - Sincroniza con /presentador por BroadcastChannel (en ambos sentidos).
 */
export default function Deck() {
  const [index, setIndex] = useState(0);
  const [overview, setOverview] = useState(false);
  const indexRef = useRef(0);
  const chanRef = useRef<BroadcastChannel | null>(null);

  const goto = useCallback((i: number, broadcast = true) => {
    const n = Math.max(0, Math.min(TOTAL - 1, i));
    indexRef.current = n;
    setIndex(n);
    history.replaceState(null, "", `#${n + 1}`);
    if (broadcast) chanRef.current?.postMessage({ type: "goto", index: n });
  }, []);

  // Inicializar desde la URL (#12) + canal de sincronización con el presentador.
  useEffect(() => {
    const leerHash = () => {
      const h = parseInt(window.location.hash.replace("#", ""), 10);
      if (!isNaN(h) && h >= 1 && h <= TOTAL) {
        indexRef.current = h - 1;
        setIndex(h - 1);
      }
    };
    leerHash();

    const ch = new BroadcastChannel("charla-deck");
    chanRef.current = ch;
    ch.onmessage = (e) => {
      const d = e.data;
      if (d?.type === "goto" && typeof d.index === "number") {
        indexRef.current = d.index;
        setIndex(d.index);
        history.replaceState(null, "", `#${d.index + 1}`);
      } else if (d?.type === "request") {
        ch.postMessage({ type: "goto", index: indexRef.current });
      }
    };
    // Avisar nuestra slide actual a cualquier presentador ya abierto.
    ch.postMessage({ type: "goto", index: indexRef.current });

    const onHash = () => leerHash();
    window.addEventListener("hashchange", onHash);
    return () => {
      ch.close();
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  // Navegación con teclado / clicker.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      const k = e.key;
      if (["ArrowRight", "ArrowDown", "PageDown", " ", "Spacebar"].includes(k)) {
        e.preventDefault();
        goto(indexRef.current + 1);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(k)) {
        e.preventDefault();
        goto(indexRef.current - 1);
      } else if (k === "Home") {
        e.preventDefault();
        goto(0);
      } else if (k === "End") {
        e.preventDefault();
        goto(TOTAL - 1);
      } else if (k === "f" || k === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (k === "o" || k === "O") {
        e.preventDefault();
        setOverview((v) => !v);
      } else if (k === "p" || k === "P") {
        e.preventDefault();
        window.open("/presentador", "presentador", "width=1200,height=800");
      } else if (k === "Escape") {
        setOverview(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goto, toggleFullscreen]);

  const slide = slides[index];

  return (
    <div className="fixed inset-0 bg-banda">
      {/* Lienzo */}
      <SlideScaler mode="contain">
        <div key={index} className="slide-fade h-full w-full">
          <SlideView slide={slide} />
        </div>
      </SlideScaler>

      {/* Indicadores (pills oscuras: legibles sobre la slide clara y sobre la banda) */}
      <div className="pointer-events-none absolute left-6 top-5">
        <span className="rounded-md bg-black/55 px-2.5 py-1 text-[13px] font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
          {slide.seccion}
        </span>
      </div>
      <div className="pointer-events-none absolute bottom-5 right-6">
        <span className="rounded-md bg-black/55 px-2.5 py-1 text-[13px] font-semibold tracking-wide text-white/90 backdrop-blur-sm">
          {index + 1} / {TOTAL}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-black/15">
        <div
          className="h-full bg-acento transition-[width] duration-500 ease-out"
          style={{ width: `${((index + 1) / TOTAL) * 100}%` }}
        />
      </div>

      {/* Ayuda de teclas (discreta) */}
      <div className="pointer-events-none absolute right-6 top-5 hidden md:block">
        <span className="rounded-md bg-black/35 px-2.5 py-1 text-[12px] text-white/70 backdrop-blur-sm">
          ← → mover · F pantalla · O vista · P presentador
        </span>
      </div>

      {/* Vista general (overview) */}
      {overview && (
        <div className="absolute inset-0 overflow-auto bg-banda/95 p-10">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-lg font-semibold text-white">
              Vista general · {TOTAL} slides
            </p>
            <button
              type="button"
              onClick={() => setOverview(false)}
              className="rounded-full border border-white/30 px-4 py-1 text-sm text-white/80 hover:bg-white/10"
            >
              Cerrar (Esc)
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  goto(i);
                  setOverview(false);
                }}
                className={`group overflow-hidden rounded-lg border-2 text-left transition-colors ${
                  i === index
                    ? "border-acento"
                    : "border-white/15 hover:border-white/50"
                }`}
              >
                <SlideScaler mode="width">
                  <SlideView slide={s} />
                </SlideScaler>
                <div className="flex items-center justify-between bg-black/40 px-2 py-1 text-[11px] text-white/70">
                  <span className="truncate">{s.seccion}</span>
                  <span>{i + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
