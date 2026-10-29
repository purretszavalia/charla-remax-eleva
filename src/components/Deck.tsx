"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { slides } from "@/content/slides";
import SlideScaler from "./SlideScaler";
import SlideView from "./SlideView";

const TOTAL = slides.length;

/**
 * Presentación en vivo:
 *  - Siguiente: → / espacio / AvPág. Anterior: ← / RePág.
 *  - Inicio / Fin: primera / última. F: pantalla completa.
 *  - Compatible con clickers (mandan AvPág/RePág).
 *  - La URL refleja la slide (#5): al recargar, volvés a la misma.
 */
export default function Deck() {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  const goto = useCallback((i: number) => {
    const n = Math.max(0, Math.min(TOTAL - 1, i));
    indexRef.current = n;
    setIndex(n);
    history.replaceState(null, "", `#${n + 1}`);
  }, []);

  // Inicializar desde la URL (#5) y escuchar cambios de hash.
  useEffect(() => {
    const leerHash = () => {
      const h = parseInt(window.location.hash.replace("#", ""), 10);
      if (!isNaN(h) && h >= 1 && h <= TOTAL) {
        indexRef.current = h - 1;
        setIndex(h - 1);
      }
    };
    leerHash();
    window.addEventListener("hashchange", leerHash);
    return () => window.removeEventListener("hashchange", leerHash);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }, []);

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
      if (["ArrowRight", "PageDown", " ", "Spacebar"].includes(k)) {
        e.preventDefault();
        goto(indexRef.current + 1);
      } else if (["ArrowLeft", "PageUp"].includes(k)) {
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
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goto, toggleFullscreen]);

  return (
    <div className="deck-live fixed inset-0 bg-banda">
      <SlideScaler mode="contain">
        <div key={index} className="slide-fade h-full w-full">
          <SlideView slide={slides[index]} />
        </div>
      </SlideScaler>

      {/* Número de slide, discreto abajo a la derecha */}
      <div className="pointer-events-none absolute bottom-5 right-6">
        <span className="rounded-md bg-black/55 px-2.5 py-1 text-[13px] font-semibold tracking-wide text-white/90 backdrop-blur-sm">
          {index + 1} / {TOTAL}
        </span>
      </div>
    </div>
  );
}
