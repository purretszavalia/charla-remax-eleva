# CLAUDE.md — Charla RE/MAX Eleva (presentación)

Guía para trabajar en este proyecto. Mantener este archivo actualizado
cuando cambie algo estructural (carpetas, stack, flujo de deploy).

## Contexto del proyecto

Presentación de slides para una charla dirigida a asesores inmobiliarios de
**RE/MAX Eleva** (Córdoba, Argentina): **"Simplificando el Marketing y Proceso
de ventas"**. La mayoría de los asesores no viene de marketing ni ventas y está
abrumada por la cantidad de información. La charla simplifica el proceso de
vender una casa en cuatro etapas claras: **Mostrar · Contactar · Acompañar ·
Cerrar**.

El presentador es **experto en marketing, no en venta inmobiliaria**: nunca
escribir texto que lo presente como experto en vender casas.

Pedro es principiante en desarrollo: explicar en simple cada paso que requiera
algo de su parte (cuentas, logins, comandos).

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**.
- Sitio **estático**, sin backend. Node y npm en `~/.local/node/bin` (no están
  en el PATH por defecto; anteponer `export PATH="$HOME/.local/node/bin:$PATH"`).
- Deploy en **Vercel** conectado al repo de **GitHub**
  (`purretszavalia/charla-remax-eleva`): cada `push` a `main` se publica solo.
  URL: https://charla-remax-eleva.vercel.app

## Estructura de archivos

```
public/
  pedro.jpg          (foto de Pedro; disponible por si se usa más adelante)
src/
  app/
    layout.tsx       Tipografía (Inter), metadata, <html lang="es">
    globals.css      TOKENS de diseño + transición + estilos de impresión (PDF)
    page.tsx         Renderiza <Deck/> (en vivo) y <PrintSheet/> (para PDF)
  content/
    slides.ts        >>> TODO EL CONTENIDO: el array de slides <<<
  components/
    Deck.tsx         Runtime en vivo: teclado, URL (#5), número, pantalla completa
    SlideScaler.tsx  Escala el lienzo 1920×1080 (contain / width)
    SlideView.tsx    Dibuja una slide según su `layout` (+ barra de etapas)
    StageBar.tsx     La barra de etapas (Mostrar · Contactar · Acompañar · Cerrar)
    PrintSheet.tsx   Todas las slides, una por página, solo al imprimir (PDF)
```

## Dónde está el contenido (clave para iterar)

**Todo está en `src/content/slides.ts`: un array `slides`.** El número de slide
es su posición en el array (la 1ª es la slide 1). Para pedir un cambio:
"en la slide 7 cambiá X".

Cada slide tiene:
- `id` — identificador estable.
- `etapa` — para la barra de arriba (`Mostrar`/`Contactar`/`Acompañar`/`Cerrar`).
  Las slides 1 y 2 **no** llevan etapa (no muestran barra).
- `layout` — qué plantilla usa.
- `notas` — texto para el presentador (por ahora no se muestra en pantalla).
- campos visibles según el layout (documentados con el tipo `Slide` arriba del
  archivo).

## Layouts disponibles

`portada` · `proceso` (las 4 etapas) · `dos-columnas` · `lista-conclusion` ·
`dos-tarjetas` · `destacado-lista` · `perfil-mockup` · `lista-tips` ·
`comparacion` · `chat` · `lista-dato`.

## Barra de etapas (hilo conductor)

- En las slides **3 a 13**, arriba, una barra fina con las 4 etapas. La etapa
  actual va en **acento**; las demás, en gris. Se define con el campo `etapa`
  de cada slide (orden en `ETAPAS`, dentro de `slides.ts`).
- En la slide **2**, las 4 etapas son el contenido principal (layout `proceso`).
- En la slide **1** no hay barra.
- Asignación actual: slides 3–9 → Mostrar · 10 → Contactar · 11–12 → Acompañar ·
  13 → Cerrar.

## Navegación (en vivo)

- Siguiente: `→` `espacio` `AvPág`. Anterior: `←` `RePág`.
- `Inicio` / `Fin`: primera / última. `F`: pantalla completa.
- Compatible con clickers inalámbricos (mandan AvPág/RePág).
- La URL refleja la slide (`#5`): al recargar, volvés a la misma.
- Número de slide discreto abajo a la derecha ("5 / 13").

## Exportar a PDF

- Imprimir la página desde el navegador (Chrome → "Guardar como PDF"): sale una
  slide por página, horizontal, sin controles (ver `@media print` en
  `globals.css`; la hoja la arma `PrintSheet.tsx`).

## Reglas de diseño

- **Tokens centralizados** en `src/app/globals.css` (`:root` + `@theme`).
  Clases: `text-tinta`, `text-gris`, `text-acento`, `text-azul`, `bg-fondo`,
  `bg-tarjeta`, `bg-banda` (fondo de proyección), `border-linea`.
- **Paleta PROVISIONAL** (a ajustar a RE/MAX): fondo `#FAFAF7`, texto `#141414`,
  gris `#5C5C5C`, acento rojo `#D7263D`, azul `#1B3A6B`, banda `#0D0D0F`.
- **Lienzo fijo 1920×1080** que se escala (SlideScaler). Tipografía en el lienzo:
  títulos ~60–72px, frases destacadas ~84–112px, cuerpo mínimo ~34–42px.
- **Tipografía:** Inter (Google Fonts, vía `next/font`).
- Editorial, limpio, mucho espacio en blanco. Solo modo claro.
- Máximo ~6 ítems y ~45 palabras visibles por slide. Si algo no entra, avisar en
  vez de achicar la letra.
- Transición entre slides: fade corto, respetando `prefers-reduced-motion`.
- **Sin logos.** Los mockups son genéricos. **Única excepción:** los íconos de
  redes de la **slide 3** (Instagram, Facebook, TikTok, Email, WhatsApp), que
  salen de una librería (`react-icons`), todos del mismo tamaño y en gris (sin
  los colores de cada marca). **El logo de RE/MAX nunca se usa.**

## Reglas de tono (texto visible)

- Español rioplatense con **voseo**, directo, sin tono corporativo.
- Comillas tipográficas `“ ”` y apóstrofo `’`.
- **El presentador es experto en MARKETING, no en venta inmobiliaria.**
- **No inventar contenido** ni datos. Si falta algo, `[A COMPLETAR: …]` y avisar.

## Flujo de deploy

- **Local:** `npm run dev` → http://localhost:3000.
- **Build de prueba:** `npm run build`.
- **Publicar:** `git add -A && git commit -m "mensaje" && git push` (Vercel
  publica solo el push a `main`).
- Recordar: `export PATH="$HOME/.local/node/bin:$PATH"` en una terminal nueva.

## Reglas de trabajo

- Después de cada cambio: verificar que compile (`npm run build`), hacer commit
  con mensaje descriptivo en español y `push` a `main`.
- Separar contenido de diseño: contenido en `slides.ts`, estilo en los
  componentes y los tokens.
