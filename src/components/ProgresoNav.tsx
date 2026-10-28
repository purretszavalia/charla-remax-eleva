"use client";

import { useEffect, useRef, useState } from "react";
import { charla } from "@/content/charla";

// Orden de las secciones, para la navegación con teclado.
const IDS = [
  "inicio",
  "mapa",
  ...charla.pasos.map((p) => `paso-${p.numero}`),
  "cierre",
];
const TOTAL = charla.pasos.length;

/**
 * Dos cosas en un solo componente:
 *  1) Navegación con teclado para presentar (flechas / espacio / RePág-AvPág).
 *  2) Indicador fijo y discreto "Paso X de 11" + barra de progreso.
 *     Se oculta en el hero, en el mapa y en el cierre.
 */
export default function ProgresoNav() {
  const [current, setCurrent] = useState("inicio");
  const currentRef = useRef("inicio");

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

  // El indicador se muestra solo en los pasos (no en hero / mapa / cierre).
  const match = current.match(/^paso-(\d+)$/);
  const visible = match !== null;
  const n = match ? Number(match[1]) : 0;

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
          style={{ width: `${(n / TOTAL) * 100}%` }}
        />
      </div>
      {/* Etiqueta "Paso X de 11" */}
      <div className="flex justify-end px-4 pt-2">
        <span className="rounded-full bg-tinta/85 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
          Paso {n} de {TOTAL}
        </span>
      </div>
    </div>
  );
}
