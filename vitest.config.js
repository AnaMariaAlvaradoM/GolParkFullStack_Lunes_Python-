// Configuración de las pruebas automáticas. NO modifiques este archivo.
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const raiz = (paquete) => fileURLToPath(new URL(`./node_modules/${paquete}`, import.meta.url));

// Siempre se usan las librerías de la raíz del repo, aunque frontend/ tenga su propio node_modules
const paquetes = ["react-dom", "react-router", "react", "axios"];
const alias = paquetes.flatMap((p) => [
  { find: new RegExp(`^${p}$`), replacement: raiz(p) },
  { find: new RegExp(`^${p}/(.*)$`), replacement: `${raiz(p)}/$1` },
]);

export default defineConfig({
  plugins: [react()],
  resolve: { alias, dedupe: paquetes },
  test: {
    environment: "jsdom",
    include: ["tests/web/**/*.test.{js,jsx}"],
    setupFiles: ["tests/web/preparar.js"],
    testTimeout: 5000,
    css: false,
    env: { VITE_API_URL: "http://localhost:8000" },
    server: { deps: { inline: [/frontend/, /maqueta/] } },
  },
});
