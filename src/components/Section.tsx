import Reveal from "./Reveal";

/**
 * Contenedor de sección. Cada sección ocupa al menos el alto de la
 * pantalla, centra su contenido verticalmente, tiene un ancla (id)
 * y aparece con una animación suave al entrar.
 */
export default function Section({
  id,
  children,
  className = "",
  contentClassName = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <section
      id={id}
      className={`flex min-h-screen scroll-mt-0 flex-col justify-center px-6 py-20 md:px-10 ${className}`}
    >
      <Reveal className={`mx-auto w-full max-w-3xl ${contentClassName}`}>
        {children}
      </Reveal>
    </section>
  );
}
