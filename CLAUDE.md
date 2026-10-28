# CLAUDE.md — Charla RE/MAX Eleva

Guía para trabajar en este proyecto. Mantener este archivo actualizado
cuando cambie algo estructural (carpetas, stack, flujo de deploy).

## Contexto del proyecto

One pager largo para una charla de **marketing y proceso de ventas** dirigida
a asesores inmobiliarios de **RE/MAX Eleva** (Córdoba, Argentina). La mayoría
no viene de marketing ni ventas y se siente abrumada por tanta herramienta y
capacitación. La charla simplifica el proceso: de "tengo una casa para vender"
a "coordiné una reunión con un comprador", como una cadena de **11 preguntas**,
cada una lleva a la siguiente, y el objetivo nunca son los contactos sino las
ventas.

La web sirve para dos cosas:

1. Proyectarla durante la charla (por eso la navegación con teclado y los
   títulos grandes, legibles desde el fondo de una sala).
2. Compartir el link después, para que los asesores la consulten desde el
   celular (por eso es responsive).

El presentador es **Pedro Urrets**. Pedro es principiante en desarrollo:
explicar en simple cada paso que requiera algo de su parte (cuentas, logins,
comandos) y por qué se hace.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**.
- Sitio **estático**, sin backend ni base de datos.
- Node y npm están en `~/.local/node/bin` (no están en el PATH por defecto;
  anteponer `export PATH="$HOME/.local/node/bin:$PATH"` en la terminal).
- Deploy en **Vercel** conectado al repo de **GitHub**
  (`purretszavalia/charla-remax-eleva`): cada `push` a `main` se publica solo.
  URL: https://charla-remax-eleva.vercel.app

## Estructura de carpetas

```
public/
  pedro.jpg          Foto de Pedro, usada en "Quién soy"
src/
  app/
    layout.tsx       Tipografía (Inter), metadata, <html lang="es">
    page.tsx         Arma la página en orden (ver "Navegación" abajo)
    globals.css      TOKENS de diseño (colores, fuente) + animaciones
  content/
    charla.ts        >>> TODO EL TEXTO VISIBLE VIVE ACÁ <<<
  lib/
    secciones.ts     Orden de las secciones + qué muestra el indicador
  components/
    Section.tsx      Contenedor de sección (min-h-screen, centrado, ancla)
    Reveal.tsx       Animación de aparición al entrar en pantalla
    ProgresoNav.tsx  Navegación con teclado + indicador fijo
    Hero.tsx         Portada (#inicio)
    QuienSoy.tsx     Quién soy (#quien-soy), con StatsGrid
    Mapa.tsx         Mapa de las 11 preguntas + ProcesoIterativo (#mapa)
    Paso.tsx         Un paso (#paso-1 ... #paso-11)
    Complementaria.tsx  Secciones extra (#videos, #tercerizar, #consistencia)
    Cierre.tsx       Cierre: las 11 preguntas con su respuesta (#cierre)
    Bloques.tsx      Dibuja los "bloques" de detalle de cada sección
    StatsGrid.tsx    Grilla de números grandes con etiqueta
    ProcesoIterativo.tsx  3 pasos horizontales numerados y conectados
    Callout.tsx      Recuadros: porQueImporta / dato / clave
    BloquePrompt.tsx Caja de texto copiable (botón "Copiar")
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
- `charla.quienSoy` → sección "Quién soy": bio, foto, `stats`, callout.
- `charla.mapa` → título, bajada y `proceso` (los 3 pasos del mini flujo). Las
  11 preguntas del mapa se generan automáticamente desde `charla.pasos`.
- `charla.pasos` → los 11 pasos. Cada uno: `numero`, `pregunta` (el título),
  `respuesta` (la frase corta destacada) y `bloques` (el detalle, en orden).
- `charla.complementarias` → `videos`, `tercerizar`, `consistencia` (cada una
  con `antetitulo`, `titulo`, `respuesta?` y `bloques`).
- `charla.cierre` → título, bajada, `resumen` (las 11 preguntas con su
  respuesta corta) y el bloque `enConstruccion`.

Los **bloques** son piezas de contenido con un `tipo`: `parrafo`, `subtitulo`,
`lista`, `listaDef`, `callout`, `tabla`, `checklist`, `checklistDetalle`,
`prompt`, `tarjetas`, `subseccion`, `comparacion`, `chat`, `recap`,
`enConstruccion`, `destacado`. Están documentados con tipos al principio de
`charla.ts`.

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
- **El presentador es experto en MARKETING, no en venta inmobiliaria.** Nunca
  escribas texto que lo presente como experto en vender casas. Su autoridad
  viene de armar procesos de marketing y ventas (ej.: Humand), no de la venta
  de propiedades.
- **No inventar contenido.** Si falta algo para que un componente funcione,
  poner un placeholder visible `[A COMPLETAR: …]` y avisar.

## Navegación y estructura de la página

Orden de las secciones (definido en `src/lib/secciones.ts`):

1. `#inicio` (hero)
2. `#quien-soy`
3. `#mapa`
4. `#paso-1` … `#paso-7`
5. `#videos` (complementaria del paso 7)
6. `#tercerizar` (complementaria del paso 7)
7. `#paso-8` … `#paso-11` (el paso 9 incluye la subsección 9b: catálogo)
8. `#consistencia` (complementaria transversal)
9. `#cierre`

Cada sección ocupa como mínimo el alto de la pantalla.

- Navegación con teclado (para presentar): flecha derecha/abajo, espacio y
  AvPág = siguiente; flecha izquierda/arriba y RePág = anterior. Scroll suave.
  No interfiere si el foco está en un campo, botón o enlace.
- Indicador fijo arriba (barra de progreso + etiqueta):
  - En los pasos: "Paso X de 11".
  - En `#videos` y `#tercerizar`: "Paso 7 · Extra".
  - En `#consistencia`: "Extra".
  - Oculto en `#inicio`, `#quien-soy`, `#mapa` y `#cierre`.

## Flujo de deploy

- **Local:** `npm run dev` y abrir http://localhost:3000.
- **Build de prueba:** `npm run build` (verifica que compile).
- **Publicar:** `git add -A && git commit -m "mensaje" && git push`. Vercel
  detecta el push a `main` y publica solo (auto-deploy verificado).
- Recordar: `export PATH="$HOME/.local/node/bin:$PATH"` antes de usar
  `npm`/`node` en una terminal nueva.

## Reglas de trabajo

- Después de cada cambio: verificar que compile (`npm run build`), hacer
  commit con mensaje descriptivo en español y `push` a `main`.
- Separar siempre contenido de diseño: texto en `charla.ts`, estilo en los
  componentes y los tokens.
