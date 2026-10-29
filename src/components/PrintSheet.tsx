import { slides } from "@/content/slides";
import SlideScaler from "./SlideScaler";
import SlideView from "./SlideView";

/**
 * Hoja de impresión: todas las slides, una por página (ver @media print
 * en globals.css). En pantalla está oculta; solo aparece al imprimir,
 * para "Guardar como PDF" desde el navegador.
 */
export default function PrintSheet() {
  return (
    <div className="print-sheet">
      {slides.map((s) => (
        <div key={s.id} className="print-slide">
          <SlideScaler mode="width">
            <SlideView slide={s} />
          </SlideScaler>
        </div>
      ))}
    </div>
  );
}
