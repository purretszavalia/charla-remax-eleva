// ============================================================
// ORDEN DE LAS SECCIONES + INDICADOR DE PROGRESO
// Este es el único lugar donde se define:
//   1) en qué orden aparecen las secciones (para la navegación con teclado),
//   2) qué muestra el indicador fijo en cada una.
// Si agregás o reordenás secciones, tocá solo esta lista.
// ============================================================

/** Lo que muestra el indicador fijo. null = no se muestra (oculto). */
export type Indicador = { label: string; progreso: number } | null;

export type Seccion = { id: string; indicador: Indicador };

const TOTAL_PASOS = 11;

const paso = (n: number): Seccion => ({
  id: `paso-${n}`,
  indicador: { label: `Paso ${n} de ${TOTAL_PASOS}`, progreso: n / TOTAL_PASOS },
});

export const SECCIONES: Seccion[] = [
  { id: "inicio", indicador: null },
  { id: "quien-soy", indicador: null },
  { id: "mapa", indicador: null },
  paso(1),
  paso(2),
  paso(3),
  paso(4),
  paso(5),
  paso(6),
  paso(7),
  { id: "videos", indicador: { label: "Paso 7 · Extra", progreso: 7 / TOTAL_PASOS } },
  { id: "tercerizar", indicador: { label: "Paso 7 · Extra", progreso: 7 / TOTAL_PASOS } },
  paso(8),
  paso(9),
  paso(10),
  paso(11),
  { id: "consistencia", indicador: { label: "Extra", progreso: 1 } },
  { id: "cierre", indicador: null },
];

export const IDS = SECCIONES.map((s) => s.id);
