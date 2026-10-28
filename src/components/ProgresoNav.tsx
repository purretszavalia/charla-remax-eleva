"use client";

import { useEffect, useRef, useState } from "react";
import { SECCIONES, IDS } from "@/lib/secciones";

/**
 * Dos cosas en un solo componente:
 *  1) Navegación con teclado para presentar (flechas / espacio / RePág-AvPág).
 *  2) Indicador fijo y discreto arriba, según la sección actual.
 *
 * El orden de las secciones y qué muestra el indicador en cada una
 * se definen en src/lib/secciones.ts.
 */
export default function ProgresoNav() {
  const [current, setCurrent] = useState(IDS[0]);
  const currentRef = useRef(IDS[0]);

  // --- Detectar qué sección se está viendo ---
  useEffect(() => {
    const sections = IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0),
        );
        let best = currentRef.current;
        let bestRatio = -1;
        IDS.forEach((id) => {
          const r = ratios.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        });
        currentRef.current = best;
        setCurrent(best);
      },
      { threshold: [0.25, 0.5, 0.75] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // --- Navegación con teclado ---
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // No interferir si el foco está en un campo o en un botón/enlace.
      const t = e.target as HTMLElement | null;
      if (t) {
        const tag = t.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          tag === "BUTTON" ||
          tag === "A" ||
          t.isContentEditable
        ) {
          return;
        }
      }

      const siguiente = ["ArrowRight", "ArrowDown", "PageDown", " ", "Spacebar"];
      const anterior = ["ArrowLeft", "ArrowUp", "PageUp"];

      let dir = 0;
      if (siguiente.includes(e.key)) dir = 1;
      else if (anterior.includes(e.key)) dir = -1;
      else return;

      e.preventDefault();
      const idx = IDS.indexOf(currentRef.current);
      const target = Math.min(IDS.length - 1, Math.max(0, idx + dir));
      const el = document.getElementById(IDS[target]);
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      el?.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // El indicador se muestra según la sección actual (ver secciones.ts).
  const indicador =
    SECCIONES.find((s) => s.id === current)?.indicador ?? null;
  const visible = indicador !== null;

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!visible}
    >
      {/* Barra de progreso */}
      <div className="h-1 w-full bg-linea">
        <div
          className="h-full bg-acento transition-[width] duration-500 ease-out"
          style={{ width: `${(indicador?.progreso ?? 0) * 100}%` }}
        />
      </div>
      {/* Etiqueta */}
      <div className="flex justify-end px-4 pt-2">
        <span className="rounded-full bg-tinta/85 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
          {indicador?.label ?? ""}
        </span>
      </div>
    </div>
  );
}
