// Fase 3 · Rutas con React Router y consumo de la API con Axios
// La API de verdad no se usa aquí: responde un servidor falso con el mismo contrato (tests/web/ayudas.js)
import { expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { archivosDe, codigoSinComentarios, componente, funcion, servidorFalso } from "./ayudas.js";

const API = "http://localhost:8000";

async function abrir(ruta) {
  const App = await componente("frontend/src/App.jsx");
  render(<MemoryRouter initialEntries={[ruta]}><App /></MemoryRouter>);
}

async function verTexto(texto, mensaje) {
  await waitFor(() => expect(screen.queryByText(texto), mensaje).not.toBeNull(), { timeout: 2000 });
}

test("listarTurnos y obtenerTurno piden los turnos a la API", async () => {
  const servidor = servidorFalso();
  const ruta = "frontend/src/services/turnosService.js";
  const listarTurnos = await funcion(ruta, "listarTurnos");
  const obtenerTurno = await funcion(ruta, "obtenerTurno");
  const turnos = await listarTurnos();
  expect(servidor.peticiones[0], `listarTurnos() debería hacer GET ${API}/turnos`).toMatchObject({ metodo: "GET", url: `${API}/turnos` });
  expect(Array.isArray(turnos) && turnos.length, "listarTurnos() debería retornar el arreglo de turnos (respuesta.data)").toBe(6);
  const turno = await obtenerTurno(3);
  expect(servidor.peticiones[1], `obtenerTurno(3) debería hacer GET ${API}/turnos/3`).toMatchObject({ metodo: "GET", url: `${API}/turnos/3` });
  expect(turno && turno.hora, "obtenerTurno(3) debería retornar el turno (respuesta.data)").toBe("8:00 p. m.");
});

test("crearReserva y listarReservas hablan con /reservas", async () => {
  const servidor = servidorFalso();
  const ruta = "frontend/src/services/reservasService.js";
  const crearReserva = await funcion(ruta, "crearReserva");
  const listarReservas = await funcion(ruta, "listarReservas");
  const datos = { turno_id: 1, equipo: "Los Cracks", celular: "3001234567" };
  const reserva = await crearReserva(datos);
  expect(servidor.peticiones[0], `crearReserva(datos) debería hacer POST ${API}/reservas con los datos`).toMatchObject({ metodo: "POST", url: `${API}/reservas`, cuerpo: datos });
  expect(reserva && reserva.cancha, "crearReserva debería retornar la reserva creada (respuesta.data)").toBe("Cancha 1");
  const reservas = await listarReservas();
  expect(servidor.peticiones[1], `listarReservas() debería hacer GET ${API}/reservas`).toMatchObject({ metodo: "GET", url: `${API}/reservas` });
  expect(Array.isArray(reservas) && reservas.length, "listarReservas() debería retornar el arreglo de reservas").toBe(1);
});

test("la ruta / muestra la página de inicio", async () => {
  servidorFalso();
  await abrir("/");
  await verTexto("Reserva tu cancha en segundos", 'En "/" debería verse el título "Reserva tu cancha en segundos"');
});

test("la ruta /turnos muestra Cargando y luego los 6 turnos de la API", async () => {
  const servidor = servidorFalso();
  await abrir("/turnos");
  expect(screen.queryByText("Cargando turnos..."), 'Mientras llega la respuesta debería verse "Cargando turnos..."').not.toBeNull();
  await waitFor(() => expect(screen.queryAllByRole("article").length, "En /turnos deberían verse los 6 turnos que responde la API").toBe(6), { timeout: 2000 });
  expect(screen.queryByText("Turnos de hoy"), 'En /turnos debería verse el título "Turnos de hoy"').not.toBeNull();
  await new Promise((resolver) => setTimeout(resolver, 300));
  const pedidos = servidor.peticiones.filter((p) => p.url === `${API}/turnos`).length;
  expect(pedidos, "La página pide los turnos una y otra vez: al useEffect le falta el arreglo de dependencias []").toBeLessThanOrEqual(2);
});

test("si el backend está apagado, /turnos muestra el mensaje de conexión", async () => {
  servidorFalso({ apagado: true });
  await abrir("/turnos");
  await verTexto("No pudimos conectar con el servidor. Intenta más tarde.", 'Con el backend apagado debería verse "No pudimos conectar con el servidor. Intenta más tarde."');
});

test("tocar Reservar en un turno libre lleva a su detalle", async () => {
  servidorFalso();
  await abrir("/turnos");
  await waitFor(() => expect(screen.queryAllByRole("button", { name: "Reservar" }).length, "En /turnos deberían verse los botones Reservar").toBe(4), { timeout: 2000 });
  await userEvent.click(screen.getAllByRole("button", { name: "Reservar" })[1]);
  await waitFor(() => expect(screen.queryByLabelText("Nombre del equipo"), "Al tocar Reservar del turno 3 debería abrirse /turnos/3 con el formulario").not.toBeNull(), { timeout: 2000 });
  expect(screen.queryByText("Hora: 8:00 p. m."), 'El detalle del turno 3 debería mostrar "Hora: 8:00 p. m."').not.toBeNull();
});

test("el detalle muestra el turno con su precio", async () => {
  const servidor = servidorFalso();
  await abrir("/turnos/4");
  expect(screen.queryByText("Cargando turno..."), 'Mientras llega el turno debería verse "Cargando turno..."').not.toBeNull();
  await verTexto("Precio: $110.000", 'En /turnos/4 debería verse "Precio: $110.000"');
  expect(screen.queryByRole("heading", { name: "Cancha 2" }), "En /turnos/4 el título debería ser la cancha (Cancha 2)").not.toBeNull();
  await new Promise((resolver) => setTimeout(resolver, 300));
  const pedidos = servidor.peticiones.filter((p) => p.url === `${API}/turnos/4`).length;
  expect(pedidos, "El detalle pide el turno una y otra vez: al useEffect le falta el arreglo de dependencias [id]").toBeLessThanOrEqual(2);
});

test("un turno que no existe muestra Ese turno no existe.", async () => {
  servidorFalso();
  await abrir("/turnos/99");
  await verTexto("Ese turno no existe.", 'En /turnos/99 debería verse "Ese turno no existe."');
});

test("un turno ocupado muestra el formulario con el botón Ocupado", async () => {
  const servidor = servidorFalso();
  await abrir("/turnos/2");
  await waitFor(() => expect(screen.queryByLabelText("Nombre del equipo"), "En /turnos/2 debería verse el formulario de reserva").not.toBeNull(), { timeout: 2000 });
  expect(servidor.peticiones.some((p) => p.url === "http://localhost:8000/turnos/2"), "El detalle debería pedir el turno a la API con obtenerTurno(id)").toBe(true);
  const ocupado = screen.queryByRole("button", { name: "Ocupado" });
  expect(ocupado, 'En /turnos/2 (ocupado) el botón del formulario debería decir "Ocupado"').not.toBeNull();
  expect(ocupado.disabled, "El botón Ocupado debería estar deshabilitado").toBe(true);
});

test("reservar desde el detalle crea la reserva y lleva a Mis reservas", async () => {
  const servidor = servidorFalso();
  await abrir("/turnos/1");
  await waitFor(() => expect(screen.queryByLabelText("Nombre del equipo"), "En /turnos/1 debería verse el formulario").not.toBeNull(), { timeout: 2000 });
  await userEvent.type(screen.getByLabelText("Nombre del equipo"), "Los Cracks");
  await userEvent.type(screen.getByLabelText("Celular"), "3001234567");
  await userEvent.click(screen.getByRole("button", { name: "Reservar" }));
  await verTexto("Cancha 1 · 6:00 p. m. · Los Cracks", 'Después de reservar debería abrirse Mis reservas con "Cancha 1 · 6:00 p. m. · Los Cracks"');
  const post = servidor.peticiones.find((p) => p.metodo === "POST");
  expect(post && post.cuerpo, "La reserva debería enviarse con turno_id, equipo y celular").toEqual({ turno_id: 1, equipo: "Los Cracks", celular: "3001234567" });
  expect(screen.queryByRole("heading", { name: "Mis reservas" }), 'Debería verse el título "Mis reservas"').not.toBeNull();
});

test("si el turno se ocupó mientras tanto, se muestra el mensaje del servidor", async () => {
  servidorFalso({ conflicto: true });
  await abrir("/turnos/3");
  await waitFor(() => expect(screen.queryByLabelText("Nombre del equipo"), "En /turnos/3 debería verse el formulario").not.toBeNull(), { timeout: 2000 });
  await userEvent.type(screen.getByLabelText("Nombre del equipo"), "Los Cracks");
  await userEvent.type(screen.getByLabelText("Celular"), "3001234567");
  await userEvent.click(screen.getByRole("button", { name: "Reservar" }));
  await verTexto("Ese turno ya está ocupado.", 'Si la API responde 409 debería verse su mensaje: "Ese turno ya está ocupado."');
});

test("una ruta que no existe muestra Página no encontrada", async () => {
  servidorFalso();
  await abrir("/esta-ruta-no-existe");
  await verTexto("Página no encontrada", 'En una ruta que no existe debería verse "Página no encontrada"');
});

test("BrowserRouter va en main.jsx y ningún componente importa axios", () => {
  expect(codigoSinComentarios("frontend/src/main.jsx"), "main.jsx debería envolver <App /> con <BrowserRouter>").toMatch(/<BrowserRouter>/);
  expect(codigoSinComentarios("frontend/src/App.jsx"), "App.jsx no debería tener BrowserRouter: ya está en main.jsx").not.toMatch(/BrowserRouter/);
  const conAxios = [...archivosDe("frontend/src/pages", ".jsx"), ...archivosDe("frontend/src/components", ".jsx")]
    .filter((archivo) => /from\s+["']axios["']/.test(codigoSinComentarios(archivo)));
  expect(conAxios, "Las páginas y componentes no importan axios: las peticiones van en src/services/").toEqual([]);
});
