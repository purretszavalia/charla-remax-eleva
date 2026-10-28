import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No generar el archivo AGENTS.md automáticamente.
  agentRules: false,
  // Tailwind CSS v4 se procesa con el loader de Turbopack.
  // (No tocar: sin esto, los colores y utilidades de Tailwind no se generan.)
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
