/** Bloque "en construcción": borde punteado, para desarrollar después. */
export default function EnConstruccion({ titulo }: { titulo: string }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-linea px-6 py-6 text-center">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gris">
        En construcción
      </p>
      <p className="text-lg font-medium text-gris md:text-xl">{titulo}</p>
    </div>
  );
}
