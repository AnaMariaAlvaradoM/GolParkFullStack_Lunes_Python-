// Fase 4 · Estructura profesional y preparación para el login
import { expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AxiosError } from "axios";
import { archivosDe, cargar, codigoSinComentarios, componente, funcion, leer, servidorFalso } from "./ayudas.js";

async function abrir(ruta) {
  const App = await componente("frontend/src/App.jsx");
  render(<MemoryRouter initialEntries={[ruta]}><App /></MemoryRouter>);
}

const cargarMensaje = () => funcion("frontend/src/utils/errores.js", "mensajeDeError");
const errorConEstado = (status, data = {}) => new AxiosError("error", "ERR_BAD_REQUEST", {}, {}, { status, data });

test("cliente.js crea un único cliente con axios.create y la URL de .env", async () => {
  const modulo = await cargar("frontend/src/api/cliente.js");
  expect(modulo.cliente && typeof modulo.cliente.get, "cliente.js debería exportar { cliente } creado con axios.create").toBe("function");
  expect(modulo.cliente.defaults.baseURL, "La baseURL del cliente debería salir de import.meta.env.VITE_API_URL").toBe("http://localhost:8000");
  const codigo = codigoSinComentarios("frontend/src/api/cliente.js");
  expect(codigo, "cliente.js debería usar axios.create").toMatch(/axios\.create\s*\(/);
  expect(codigo, "cliente.js debería leer la URL de import.meta.env.VITE_API_URL").toMatch(/import\.meta\.env\.VITE_API_URL/);
});

test("los servicios usan el cliente y no importan axios", () => {
  for (const archivo of ["frontend/src/services/turnosService.js", "frontend/src/services/reservasService.js"]) {
    const codigo = codigoSinComentarios(archivo);
    expect(codigo, `${archivo} no debería importar axios: usa el cliente de api/cliente.js`).not.toMatch(/from\s+["']axios["']/);
    expect(codigo, `${archivo} debería importar { cliente } desde api/cliente.js`).toMatch(/import\s*\{\s*cliente\s*\}\s*from\s*["'][^"']*api\/cliente(\.js)?["']/);
  }
});

test("mensajeDeError explica cuando el servidor no responde", async () => {
  const mensajeDeError = await cargarMensaje();
  const error = new AxiosError("Network Error", "ERR_NETWORK", {}, {});
  expect(mensajeDeError(error), "Sin respuesta del servidor debería retornar el mensaje de conexión").toBe("No pudimos conectar con el servidor. Intenta más tarde.");
});

test("mensajeDeError traduce el 404 y usa el detail del 409", async () => {
  const mensajeDeError = await cargarMensaje();
  expect(mensajeDeError(errorConEstado(404)), 'Con 404 debería retornar "Ese turno no existe."').toBe("Ese turno no existe.");
  expect(mensajeDeError(errorConEstado(409, { detail: "Ese turno ya está ocupado." })), "Con 409 debería retornar el detail que manda la API").toBe("Ese turno ya está ocupado.");
});

test("mensajeDeError tiene un mensaje para cualquier otro error", async () => {
  const mensajeDeError = await cargarMensaje();
  expect(mensajeDeError(errorConEstado(500)), 'Con 500 debería retornar "Ocurrió un error inesperado. Intenta de nuevo."').toBe("Ocurrió un error inesperado. Intenta de nuevo.");
  expect(mensajeDeError(errorConEstado(422)), 'Con 422 debería retornar "Ocurrió un error inesperado. Intenta de nuevo."').toBe("Ocurrió un error inesperado. Intenta de nuevo.");
});

test("las páginas usan mensajeDeError en lugar de escribir los mensajes a mano", () => {
  for (const pagina of ["Turnos", "DetalleTurno", "MisReservas"]) {
    expect(codigoSinComentarios(`frontend/src/pages/${pagina}.jsx`), `pages/${pagina}.jsx debería usar mensajeDeError de utils/errores.js`).toMatch(/mensajeDeError\s*\(/);
  }
  const conTexto = archivosDe("frontend/src/pages", ".jsx")
    .filter((archivo) => /No pudimos conectar/.test(codigoSinComentarios(archivo)));
  expect(conTexto, "Los mensajes de error van solo en utils/errores.js").toEqual([]);
});

test("el Layout muestra el encabezado y el pie en todas las páginas", async () => {
  servidorFalso();
  expect(codigoSinComentarios("frontend/src/components/Layout.jsx"), "Layout.jsx debería usar <Outlet />").toMatch(/<Outlet\s*\/>/);
  await abrir("/login");
  expect(screen.queryByRole("heading", { level: 1, name: "GolPark" }), "En /login debería verse el encabezado del Layout").not.toBeNull();
  expect(screen.queryByText("GolPark · Canchas sintéticas de fútbol 5"), "En /login debería verse el pie de página del Layout").not.toBeNull();
});

test("la navegación marca la sección activa", async () => {
  servidorFalso();
  await abrir("/mis-reservas");
  const activo = screen.queryByRole("link", { name: "Mis reservas" });
  expect(activo, 'El encabezado debería tener un enlace "Mis reservas"').not.toBeNull();
  await waitFor(() => expect(activo.getAttribute("aria-current"), "En /mis-reservas el enlace Mis reservas debería estar activo (usa NavLink)").toBe("page"));
  const inicio = screen.queryByRole("link", { name: "Inicio" });
  expect(inicio && inicio.getAttribute("aria-current"), 'En /mis-reservas el enlace "Inicio" no debería estar activo (usa end en el NavLink de "/")').toBeNull();
});

test("la ruta /login muestra el formulario de Correo y Contraseña", async () => {
  servidorFalso();
  await abrir("/login");
  expect(screen.queryByRole("heading", { name: "Ingresar" }), 'En /login debería verse el título "Ingresar"').not.toBeNull();
  expect(screen.queryByLabelText("Correo"), 'El formulario de /login debería tener el campo "Correo"').not.toBeNull();
  expect(screen.queryByLabelText("Contraseña"), 'El formulario de /login debería tener el campo "Contraseña"').not.toBeNull();
});

test(".env.example tiene VITE_API_URL y .gitignore deja .env por fuera", () => {
  expect(leer("frontend/.env.example"), "frontend/.env.example debería tener VITE_API_URL=http://localhost:8000").toMatch(/^VITE_API_URL=http:\/\/localhost:8000\s*$/m);
  expect(leer("frontend/.gitignore"), "frontend/.gitignore debería tener una línea con .env").toMatch(/^\.env\s*$/m);
});

test("PROYECTO.md explica cómo correr el proyecto y lista los endpoints", () => {
  const texto = leer("PROYECTO.md");
  expect(texto, "PROYECTO.md debería explicar cómo correr el backend (uvicorn)").toMatch(/uvicorn/);
  expect(texto, "PROYECTO.md debería explicar cómo correr el frontend (npm run dev)").toMatch(/npm run dev/);
  expect(texto, "PROYECTO.md debería listar el endpoint /turnos").toMatch(/\/turnos/);
  expect(texto, "PROYECTO.md debería listar el endpoint /reservas").toMatch(/\/reservas/);
});

test("no quedan console.log en el frontend", () => {
  const archivos = [...archivosDe("frontend/src", ".jsx"), ...archivosDe("frontend/src", ".js")];
  leer("frontend/src/App.jsx");
  leer("frontend/src/main.jsx");
  const conLog = archivos
    .filter((archivo) => /console\.log\s*\(/.test(codigoSinComentarios(archivo)));
  expect(conLog, "Borra los console.log de estos archivos").toEqual([]);
});
