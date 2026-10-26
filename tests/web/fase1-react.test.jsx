// Fase 1 · El negocio en React con Vite y Tailwind (carpeta frontend/)
import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { archivosDe, codigoSinComentarios, componente, funcion, leer } from "./ayudas.js";

const turnoLibre = { id: 9, cancha: "Cancha 3", hora: "10:00 p. m.", precio: 99000, disponible: true };
const turnoOcupado = { id: 7, cancha: "Cancha 4", hora: "5:00 p. m.", precio: 80000, disponible: false };

const cargarTarjeta = () => componente("frontend/src/components/TarjetaTurno.jsx");

test("el proyecto se creó con Vite, React y Tailwind", () => {
  const paquete = JSON.parse(leer("frontend/package.json"));
  const deps = { ...paquete.dependencies, ...paquete.devDependencies };
  expect(deps.react, "frontend/package.json debería tener react: ¿creaste el proyecto con npm create vite?").toBeTruthy();
  expect(deps.vite, "frontend/package.json debería tener vite").toBeTruthy();
  expect(deps["@tailwindcss/vite"], "Falta instalar @tailwindcss/vite (npm install tailwindcss @tailwindcss/vite)").toBeTruthy();
  expect(leer("frontend/vite.config.js"), "vite.config.js debería tener tailwindcss() en plugins").toMatch(/tailwindcss\s*\(\s*\)/);
});

test("index.css solo importa Tailwind y no quedan otros archivos .css", () => {
  expect(leer("frontend/src/index.css").trim(), 'src/index.css debería tener solo: @import "tailwindcss";').toMatch(/^@import\s+["']tailwindcss["'];?$/);
  const otros = archivosDe("frontend/src", ".css").filter((f) => !f.endsWith("src/index.css"));
  expect(otros, "Los estilos van con clases de Tailwind: borra estos archivos .css").toEqual([]);
});

test("formatearPrecio muestra los precios en pesos", async () => {
  const formatearPrecio = await funcion("frontend/src/utils/formato.js", "formatearPrecio");
  expect(formatearPrecio(120000), 'formatearPrecio(120000) debería retornar "$120.000"').toBe("$120.000");
  expect(formatearPrecio(1500000), 'formatearPrecio(1500000) debería retornar "$1.500.000"').toBe("$1.500.000");
  expect(formatearPrecio(0), 'formatearPrecio(0) debería retornar "$0"').toBe("$0");
});

test("Encabezado muestra el nombre GolPark como título principal", async () => {
  const Encabezado = await componente("frontend/src/components/Encabezado.jsx");
  render(<MemoryRouter><Encabezado /></MemoryRouter>);
  expect(screen.queryByRole("heading", { level: 1, name: "GolPark" }), 'Encabezado debería tener un <h1> con el texto "GolPark"').not.toBeNull();
});

test("PiePagina muestra el texto del negocio", async () => {
  const PiePagina = await componente("frontend/src/components/PiePagina.jsx");
  render(<MemoryRouter><PiePagina /></MemoryRouter>);
  expect(screen.queryByText("GolPark · Canchas sintéticas de fútbol 5"), 'PiePagina debería mostrar "GolPark · Canchas sintéticas de fútbol 5"').not.toBeNull();
});

test("TarjetaTurno muestra la cancha, la hora y el precio que recibe por props", async () => {
  const TarjetaTurno = await cargarTarjeta();
  render(<MemoryRouter><TarjetaTurno turno={turnoLibre} onReservar={() => {}} /></MemoryRouter>);
  expect(screen.queryByText("Cancha 3"), 'La tarjeta debería mostrar la cancha que recibe en la prop turno ("Cancha 3")').not.toBeNull();
  expect(screen.queryByText("Hora: 10:00 p. m."), 'La tarjeta debería mostrar "Hora: 10:00 p. m."').not.toBeNull();
  expect(screen.queryByText("Precio: $99.000"), 'La tarjeta debería mostrar "Precio: $99.000" (usa formatearPrecio)').not.toBeNull();
});

test("TarjetaTurno de un turno libre llama a onReservar con el id del turno", async () => {
  const TarjetaTurno = await cargarTarjeta();
  const onReservar = vi.fn();
  render(<MemoryRouter><TarjetaTurno turno={turnoLibre} onReservar={onReservar} /></MemoryRouter>);
  const reservar = screen.queryByRole("button", { name: "Reservar" });
  expect(reservar, 'La tarjeta de un turno libre debería tener un botón "Reservar"').not.toBeNull();
  await userEvent.click(reservar);
  expect(onReservar, "Al tocar Reservar se debería llamar onReservar(turno.id), es decir onReservar(9)").toHaveBeenCalledWith(9);
});

test("TarjetaTurno de un turno ocupado dice Ocupado y no se puede tocar", async () => {
  const TarjetaTurno = await cargarTarjeta();
  const onReservar = vi.fn();
  render(<MemoryRouter><TarjetaTurno turno={turnoOcupado} onReservar={onReservar} /></MemoryRouter>);
  const ocupado = screen.queryByRole("button", { name: "Ocupado" });
  expect(ocupado, 'La tarjeta de un turno ocupado debería tener un botón "Ocupado"').not.toBeNull();
  expect(ocupado.disabled, "El botón Ocupado debería estar deshabilitado (disabled)").toBe(true);
  await userEvent.click(ocupado);
  expect(onReservar, "Un turno ocupado no debería llamar a onReservar").not.toHaveBeenCalled();
});

test("ListaTurnos pinta una tarjeta por turno y usa key", async () => {
  const ListaTurnos = await componente("frontend/src/components/ListaTurnos.jsx");
  const errores = vi.spyOn(console, "error").mockImplementation(() => {});
  render(<MemoryRouter><ListaTurnos turnos={[turnoLibre, turnoOcupado]} onReservar={() => {}} /></MemoryRouter>);
  const avisoDeKey = errores.mock.calls.some((llamada) => String(llamada[0]).includes("key"));
  errores.mockRestore();
  expect(screen.queryAllByRole("article").length, "ListaTurnos debería pintar un <article> por cada turno que recibe (2)").toBe(2);
  expect(avisoDeKey, 'React avisa que falta key: usa key={turno.id} en el map').toBe(false);
});

test("TarjetaTurno usa clases de Tailwind y recibe los datos solo por props", () => {
  const codigo = codigoSinComentarios("frontend/src/components/TarjetaTurno.jsx");
  expect(codigo, "TarjetaTurno debería usar className con clases de Tailwind").toMatch(/className=/);
  expect(codigo, "TarjetaTurno no debería importar los datos: los recibe por props").not.toMatch(/from\s+["'][^"']*data[^"']*["']/);
});
