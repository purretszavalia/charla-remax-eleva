# Charla RE/MAX Eleva — "Vender una casa, de lo complejo a lo simple"

One pager de la charla, hecho en Next.js. Pensado para proyectar durante la
charla y para compartir el link después.

**En vivo:** https://charla-remax-eleva.vercel.app

## Correr en tu compu

Node y npm están en `~/.local/node/bin`. En una terminal nueva, primero:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
```

Después, parado en esta carpeta:

```bash
npm run dev
```

Y abrí http://localhost:3000 en el navegador. Mientras `dev` está corriendo,
cada cambio que guardes se ve al toque.

## Publicar

```bash
git add -A
git commit -m "describí el cambio"
git push
```

Vercel publica solo cada vez que hacés `push` a `main`.

## ¿Dónde cambio el texto?

Todo el texto visible está en **`src/content/charla.ts`**. Ver `CLAUDE.md`
para el detalle de la estructura, el diseño y el flujo de trabajo.
