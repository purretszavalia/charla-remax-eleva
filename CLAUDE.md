# CLAUDE.md — Charla RE/MAX Eleva (presentación)

Guía para trabajar en este proyecto. Mantener este archivo actualizado
cuando cambie algo estructural (carpetas, stack, flujo de deploy).

## Contexto del proyecto

Presentación (deck de slides) para una charla de **marketing y proceso de
ventas** dirigida a asesores inmobiliarios de **RE/MAX Eleva** (Córdoba,
Argentina). La mayoría no viene de marketing ni ventas. La charla simplifica
el proceso de venta: de "tengo una casa para vender" a "coordiné una reunión
con un comprador", como una cadena de **11 preguntas**, y el objetivo nunca
son los contactos sino las ventas.

La web tiene tres usos:

1. **Proyectar en vivo** (`/`): deck a pantalla completa, navegable con teclado
   o clicker.
2. **Ventana del presentador** (`/presentador`): notas + próxima slide + reloj,
   sincronizada con la proyección.
3. **Compartir después** (`/leer`): todas las slides con sus notas, para leer
   desde el celular. Es el link que se comparte con los asesores.

El presentador es **Pedro Urrets**. Pedro es principiante en desarrollo:
explicar en simple cada paso que requiera algo de su parte.

## Principio clave: una idea por slide

- Cada slide se lee en 5 segundos desde el fondo de una sala.
- Máximo ~6 ítems y ~40 palabras visibles por slide. Si no entra, se divide en
  dos slides. **NUNCA** achicar la tipografía para que entre.
- El texto completo de cada idea vive en las **notas** de la slide. Lo visible
  es una versión más corta de ese mismo texto.
- Se puede acortar y recortar, pero **no inventar** ideas ni datos nuevos. Si
  falta algo, poner `[A COMPLETAR: …]`.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**.
- Sitio **estático**, sin backend. Node y npm en `~/.local/node/bin` (no están
  en el PATH por defecto; anteponer `export PATH="$HOME/.local/node/bin:$PATH"`).
- Deploy en **Vercel** conectado al repo de **GitHub**
  (`purretszavalia/charla-remax-eleva`): cada `push` a `main` se publica solo.
  URL: https://charla-remax-eleva.vercel.app

## Estructura de carpetas

```
public/
  pedro.jpg          Foto de Pedro (slide "Quién soy")
src/
  app/
    layout.tsx       Tipografía (Inter), metadata, <html lang="es">
    globals.css      TOKENS de diseño + transición + estilos de impresión (PDF)
    page.tsx         La presentación en vivo (renderiza <Deck/>)
    presentador/
      page.tsx       Ventana del presentador (/presentador)
    leer/
      page.tsx       Modo lectura (/leer): todas las slides + notas
  content/
    charla.ts        >>> TODO EL CONTENIDO: el array de slides <<<
  components/
    Deck.tsx         Runtime en vivo: teclado, URL, overview, indicadores, sync
    SlideScaler.tsx  Escala el lienzo 1920×1080 (contain / width)
    SlideView.tsx    Dibuja una slide según su `layout`
    StatsGrid.tsx    Layout stats (números grandes)
    ComparacionPasos.tsx  Layout comparacion (dos caminos)
    ChatMock.tsx     Layout chat (conversación, sin logos)
    ProcesoIterativo.tsx  Layout proceso (3 pasos conectados)
```

## Dónde está el contenido (clave para iterar)

**Todo está en `src/content/charla.ts`: un array `slides`.** El número de slide
es su posición en el array (la 1ª es la slide 1). Para pedir un cambio:
"en la slide 23 cambiá X".

Cada slide tiene:
- `id` — identificador estable.
- `seccion` — lo que muestra el indicador arriba a la izquierda (ej. "Paso 7").
- `layout` — qué plantilla usa.
- `notas` — el texto completo, para el presentador (y el modo lectura).
- campos visibles según el layout (documentados con el tipo `Slide` arriba del
  archivo).

## Layouts disponibles

`portada` · `divisor-paso` (número + pregunta + respuesta) · `lista` ·
`dos-columnas` · `tabla` · `stats` · `comparacion` · `chat` · `destacado`
(una frase; `variante: "prompt"` para un bloque de texto) · `tarjetas` (3
tarjetas) · `grilla-preguntas` · `proceso` · `foto-texto`.

## Navegación (en vivo, `/`)

- Siguiente: `→` `↓` `espacio` `AvPág`. Anterior: `←` `↑` `RePág`.
- `Inicio` / `Fin`: primera / última slide.
- `F`: pantalla completa. `O`: vista general (grilla de miniaturas). `P`: abrir
  la ventana del presentador. `Esc`: cerrar la vista general.
- Compatible con clickers inalámbricos (mandan AvPág/RePág o flechas).
- La URL refleja la slide (`#12`): al recargar, volvés a la misma.
- Indicador: sección arriba a la izquierda, número abajo a la derecha, barra de
  progreso fina abajo.

## Ventana del presentador (`/presentador`)

- Muestra la slide actual, la próxima, las notas en grande y un cronómetro con
  botón de reinicio.
- Sincronizada con la proyección en ambos sentidos vía `BroadcastChannel`
  (canal `"charla-deck"`): avanzás en cualquiera de las dos y avanzan las dos.
- Uso con proyector: abrir `/` en el proyector (pantalla completa con `F`) y
  `/presentador` en la notebook (o apretar `P` desde la proyección).

## Modo lectura (`/leer`) y PDF

- `/leer` apila todas las slides con sus notas debajo, responsive.
- **Exportar a PDF:** desde `/leer`, imprimir con el navegador (Chrome) y
  "Guardar como PDF": sale una slide por página, horizontal, sin notas ni cromo
  (ver `@media print` en `globals.css`).

## Reglas de diseño

- **Tokens centralizados** en `src/app/globals.css` (`:root` + `@theme`).
  Clases: `text-tinta`, `text-gris`, `text-acento`, `text-azul`, `bg-fondo`,
  `bg-tarjeta`, `bg-banda` (fondo de proyección), `border-linea`.
- **Paleta PROVISIONAL** (a ajustar a RE/MAX): fondo `#FAFAF7`, texto `#141414`,
  gris `#5C5C5C`, acento rojo `#D7263D`, azul `#1B3A6B`, banda `#0D0D0F`.
- **Lienzo fijo 1920×1080** que se escala (SlideScaler). Tipografía en el lienzo:
  preguntas de divisor ~104px, títulos de slide ~60–68px, cuerpo mínimo ~34–42px.
- **Tipografía:** Inter (Google Fonts, vía `next/font`).
- Mucho espacio en blanco, alineación consistente. Solo modo claro.
- Transición entre slides: fade corto, respetando `prefers-reduced-motion`.
- **No usar logos** (RE/MAX, WhatsApp, Instagram). Si hace falta, dejar `[LOGO]`.

## Reglas de tono (texto visible)

- Español rioplatense con **voseo**, directo, sin tono corporativo.
- Comillas tipográficas `“ ”` y apóstrofo `’`.
- **El presentador es experto en MARKETING, no en venta inmobiliaria.** Nunca
  escribir texto que lo presente como experto en vender casas.
- **No inventar contenido.** Si falta algo, `[A COMPLETAR: …]` y avisar.

## Flujo de deploy

- **Local:** `npm run dev` → http://localhost:3000.
- **Build de prueba:** `npm run build`.
- **Publicar:** `git add -A && git commit -m "mensaje" && git push` (Vercel
  publica solo el push a `main`).
- Recordar: `export PATH="$HOME/.local/node/bin:$PATH"` en una terminal nueva.

## Reglas de trabajo

- Después de cada cambio: verificar que compile (`npm run build`), hacer commit
  con mensaje descriptivo en español y `push` a `main`.
- Separar contenido de diseño: contenido en `charla.ts`, estilo en los
  componentes y los tokens.
