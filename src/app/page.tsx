import { charla } from "@/content/charla";
import ProgresoNav from "@/components/ProgresoNav";
import Hero from "@/components/Hero";
import Mapa from "@/components/Mapa";
import Paso from "@/components/Paso";
import Cierre from "@/components/Cierre";

export default function Home() {
  return (
    <>
      {/* Indicador de progreso + navegación con teclado */}
      <ProgresoNav />

      <main>
        <Hero />
        <Mapa />
        {charla.pasos.map((paso) => (
          <Paso key={paso.numero} paso={paso} />
        ))}
        <Cierre />
      </main>
    </>
  );
}
