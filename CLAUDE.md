# CLAUDE.md — Charla RE/MAX Eleva

Guía para trabajar en este proyecto. Mantener este archivo actualizado
cuando cambie algo estructural (carpetas, stack, flujo de deploy).

## Contexto del proyecto

One pager largo para una charla de marketing dirigida a asesores
inmobiliarios de **RE/MAX Eleva** (Córdoba, Argentina). La mayoría no viene
de marketing ni ventas y se siente abrumada por tanta herramienta y
capacitación. La charla simplifica el proceso de venta: de "tengo una casa
para vender" a "coordiné una reunión con un comprador", como una cadena de
**11 preguntas**, cada una lleva a la siguiente.

La web sirve para dos cosas:

1. Proyectarla durante la charla (por eso la navegación con teclado y los
   títulos grandes, legibles desde el fondo de una sala).
2. Compartir el link después, para que los asesores la consulten desde el
   celular (por eso es responsive).

Pedro es principiante en desarrollo: explicar en simple cada paso que
requiera algo de su parte (cuentas, logins, comandos) y por qué se hace.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**.
- Sitio **estático**, sin backend ni base de datos.
- Node y npm están en `~/.local/node/bin` (no están en el PATH por defecto;
  anteponer `export PATH="$HOME/.local/node/bin:$PATH"` en la terminal).
- Deploy en **Vercel** conectado a un repo de **GitHub**: cada `push` a
  `main` se publica solo.

## Estructura de carpetas

```
src/
  app/
    layout.tsx       Tipografía (Inter), metadata, <html lang="es">
    page.tsx         Arma la página: Hero → Mapa → 11 Pasos → Cierre
    globals.css      TOKENS de diseño (colores, fuente) + animaciones
  content/
    charla.ts        >>> TODO EL TEXTO VISIBLE VIVE ACÁ <<<
  components/
    Section.tsx      Contenedor de sección (min-h-screen, centrado, ancla)
    Reveal.tsx       Animación de aparición al entrar en pantalla
    ProgresoNav.tsx  Navegación con teclado + indicador "Paso X de 11"
    Hero.tsx         Portada (#inicio)
    Mapa.tsx         El mapa de las 11 preguntas (#mapa)
    Paso.tsx         Un paso (#paso-1 ... #paso-11)
    Cierre.tsx       Cierre con el recorrido completo (#cierre)
    Bloques.tsx      Dibuja los "bloques" de detalle de cada paso
    Callout.tsx      Recuadros: porQueImporta / dato / clave
    Tabla.tsx        Tabla simple (se apila en celular)
    Checklist.tsx    Lista con tildes
    ComparacionPasos.tsx  Dos caminos lado a lado (largo vs corto)
    ChatMock.tsx     Conversación tipo chat (sin logos)
    Recap.tsx        Recuadro "Hasta acá"
    EnConstruccion.tsx    Bloque punteado para secciones a desarrollar
```

## Dónde está el contenido (clave para iterar)

**Todo el texto visible está en `src/content/charla.ts`.** Los componentes
solo leen ese archivo. Para cambiar un texto, se edita ahí y no hace falta
tocar ningún componente.

- `charla.hero` → la portada.
- `charla.mapa` → título y bajada del mapa. Las 11 preguntas se generan
  automáticamente desde `charla.pasos` (no se repiten).
- `charla.pasos` → los 11 pasos. Cada uno: `numero`, `pregunta` (el título),
  `respuesta` (la frase corta destacada) y `bloques` (el detalle, en orden).
- `charla.cierre` → el cierre.

Los **bloques** son piezas de contenido con un `tipo`: `parrafo`,
`subtitulo`, `lista`, `listaDef`, `callout`, `tabla`, `checklist`,
`comparacion`, `chat`, `recap`, `enConstruccion`, `destacado`. Están
documentados con ejemplos al principio de `charla.ts`.

## Reglas de diseño

- **Tokens centralizados** en `src/app/globals.css` (bloque `:root` y
  `@theme`). Cambiar la paleta entera se hace ahí. Clases disponibles:
  `text-tinta`, `text-gris`, `text-acento`, `text-azul`, `bg-fondo`,
  `bg-tarjeta`, `bg-acento-suave`, `bg-azul-suave`, `border-linea`.
- **Paleta PROVISIONAL** (probablemente se ajuste a la identidad de RE/MAX):
  fondo `#FAFAF7`, texto `#141414`, gris `#5C5C5C`, acento rojo `#D7263D`,
  azul profundo `#1B3A6B`.
- **Tipografía:** Inter (Google Fonts, vía `next/font`). Las **preguntas**
  de cada paso son el elemento protagonista (mínimo ~56px en desktop, con
  `clamp`). Cuerpo 18–20px.
- **Solo modo claro** por ahora.
- **Responsive:** en celular todo apilado y cómodo de leer.
- **Animaciones sutiles** al entrar a cada sección, respetando
  `prefers-reduced-motion`.
- **No usar logos** (RE/MAX, WhatsApp, Instagram, etc.). Si hace falta, dejar
  un espacio `[LOGO]`.
- Contraste mínimo AA.

## Reglas de tono (texto visible)

- Español rioplatense con **voseo**, directo, sin tono corporativo.
- Comillas tipográficas `“ ”` y apóstrofo `’`.
- **No inventar contenido.** Si falta algo para que un componente funcione,
  poner un placeholder visible `[A COMPLETAR: …]` y avisar.

## Navegación y estructura de la página

- Secciones en orden: `#inicio`, `#mapa`, `#paso-1` … `#paso-11`, `#cierre`.
  Cada una ocupa como mínimo el alto de la pantalla.
- Navegación con teclado (para presentar): flecha derecha/abajo, espacio y
  AvPág = siguiente; flecha izquierda/arriba y RePág = anterior. Scroll suave.
  No interfiere si el foco está en un campo, botón o enlace.
- Indicador "Paso X de 11" + barra de progreso, fijo arriba. Oculto en el
  hero, el mapa y el cierre.

## Flujo de deploy

- **Local:** `npm run dev` y abrir http://localhost:3000.
- **Build de prueba:** `npm run build` (verifica que compile).
- **Publicar:** `git add -A && git commit -m "mensaje" && git push`. Vercel
  detecta el push a `main` y publica solo.
- Recordar: `export PATH="$HOME/.local/node/bin:$PATH"` antes de usar
  `npm`/`node` en una terminal nueva.

## Reglas de trabajo

- Después de cada cambio: verificar que compile (`npm run build`), hacer
  commit con mensaje descriptivo en español y `push` a `main`.
- Separar siempre contenido de diseño: texto en `charla.ts`, estilo en los
  componentes y los tokens.
