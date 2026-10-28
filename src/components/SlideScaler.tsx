"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Escala un lienzo fijo de 1920×1080 para que ocupe el espacio disponible
 * manteniendo la proporción 16:9. Nada de scroll dentro del lienzo.
 *
 * - mode="contain": entra entero en el contenedor (deja bandas si hace falta).
 *   Se usa en la presentación en vivo (pantalla completa).
 * - mode="width": ocupa todo el ancho y calcula el alto (16:9).
 *   Se usa en el modo lectura y en las miniaturas.
 */
export default function SlideScaler({
  children,
  mode = "contain",
  className = "",
}: {
  children: React.ReactNode;
  mode?: "contain" | "width";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const calc = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setScale(mode === "contain" ? Math.min(w / 1920, h / 1080) : w / 1920);
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mode]);

  const inner: React.CSSProperties =
    mode === "contain"
      ? {
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 1920,
          height: 1080,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
          opacity: scale > 0 ? 1 : 0,
        }
      : {
          position: "absolute",
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          opacity: scale > 0 ? 1 : 0,
        };

  return (
    <div
      ref={ref}
      className={`scaler-wrap relative overflow-hidden ${mode === "contain" ? "h-full w-full" : "w-full"} ${className}`}
      style={mode === "width" ? { aspectRatio: "16 / 9" } : undefined}
    >
      <div className="scaler-inner" style={inner}>
        {children}
      </div>
    </div>
  );
}
