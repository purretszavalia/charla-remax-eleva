import { charla } from "@/content/charla";
import ProgresoNav from "@/components/ProgresoNav";
import Hero from "@/components/Hero";
import QuienSoy from "@/components/QuienSoy";
import Mapa from "@/components/Mapa";
import Paso from "@/components/Paso";
import Complementaria from "@/components/Complementaria";
import Cierre from "@/components/Cierre";

export default function Home() {
  const c = charla.complementarias;
  const pasos = charla.pasos;

  return (
    <>
      {/* Indicador de progreso + navegación con teclado */}
      <ProgresoNav />

      <main>
        <Hero />
        <QuienSoy />
        <Mapa />

        {/* Pasos 1 a 7 */}
        {pasos.slice(0, 7).map((paso) => (
          <Paso key={paso.numero} paso={paso} />
        ))}

        {/* Complementarias del paso 7 */}
        <Complementaria seccion={c.videos} />
        <Complementaria seccion={c.tercerizar} />

        {/* Pasos 8 a 11 */}
        {pasos.slice(7).map((paso) => (
          <Paso key={paso.numero} paso={paso} />
        ))}

        {/* Complementaria transversal */}
        <Complementaria seccion={c.consistencia} />

        <Cierre />
      </main>
    </>
  );
}
