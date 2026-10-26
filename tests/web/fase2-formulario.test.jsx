// Fase 2 · Formulario controlado, validación y Mis reservas
import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { codigoSinComentarios, componente, funcion } from "./ayudas.js";

const ERROR_EQUIPO = "Escribe el nombre del equipo (mínimo 3 letras).";
const ERROR_CELULAR = "Escribe un celular de 10 dígitos que empiece por 3.";

const cargarValidar = () => funcion("frontend/src/utils/validaciones.js", "validarReserva");
const cargarFormulario = () => componente("frontend/src/components/FormularioReserva.jsx");

function campo(nombre) {
  const input = screen.queryByLabelText(nombre);
  expect(input, `No encuentro el campo "${nombre}": usa un <label> con ese texto que envuelva el <input>`).not.toBeNull();
  return input;
}

test("validarReserva retorna un objeto vacío cuando los datos están bien", async () => {
  const validarReserva = await cargarValidar();
  expect(validarReserva({ equipo: "Los Cracks", celular: "3001234567" }), "validarReserva con datos correctos debería retornar {}").toEqual({});
  expect(validarReserva({ equipo: "Gol", celular: "3109876543" }), 'Un equipo de 3 letras ("Gol") es válido: debería retornar {}').toEqual({});
});

test("validarReserva rechaza un nombre de equipo de menos de 3 letras", async () => {
  const validarReserva = await cargarValidar();
  expect(validarReserva({ equipo: "Lo", celular: "3001234567" }), "Con equipo \"Lo\" debería retornar el error de equipo").toEqual({ equipo: ERROR_EQUIPO });
  expect(validarReserva({ equipo: "   ab   ", celular: "3001234567" }), "Los espacios no cuentan como letras (usa trim)").toEqual({ equipo: ERROR_EQUIPO });
});

test("validarReserva rechaza un celular que no tenga 10 dígitos o no empiece por 3", async () => {
  const validarReserva = await cargarValidar();
  for (const celular of ["300123456", "30012345678", "2001234567", "300-123-45"]) {
    expect(validarReserva({ equipo: "Los Cracks", celular }), `Con celular "${celular}" debería retornar el error de celular`).toEqual({ celular: ERROR_CELULAR });
  }
});

test("validarReserva retorna los dos errores a la vez", async () => {
  const validarReserva = await cargarValidar();
  expect(validarReserva({ equipo: "", celular: "" }), "Con todo vacío debería retornar los dos errores").toEqual({ equipo: ERROR_EQUIPO, celular: ERROR_CELULAR });
});

test("FormularioReserva tiene los campos controlados de equipo y celular", async () => {
  const FormularioReserva = await cargarFormulario();
  render(<MemoryRouter><FormularioReserva onReservar={vi.fn()} /></MemoryRouter>);
  await userEvent.type(campo("Nombre del equipo"), "Los Cracks");
  await userEvent.type(campo("Celular"), "3001234567");
  expect(campo("Nombre del equipo").value, "El campo de equipo debería mostrar lo que se escribe (value + onChange)").toBe("Los Cracks");
  expect(campo("Celular").value, "El campo de celular debería mostrar lo que se escribe (value + onChange)").toBe("3001234567");
});

test("FormularioReserva muestra los errores y no reserva si los datos están mal", async () => {
  const FormularioReserva = await cargarFormulario();
  const onReservar = vi.fn();
  render(<MemoryRouter><FormularioReserva onReservar={onReservar} /></MemoryRouter>);
  const reservar = screen.queryByRole("button", { name: "Reservar" });
  expect(reservar, 'El formulario debería tener un botón "Reservar"').not.toBeNull();
  let prevenido = null;
  const revisarEnvio = (evento) => { prevenido = evento.defaultPrevented; };
  document.addEventListener("submit", revisarEnvio);
  await userEvent.click(reservar);
  document.removeEventListener("submit", revisarEnvio);
  expect(prevenido, "Al enviar, el formulario recarga la página: usa evento.preventDefault() en el onSubmit").toBe(true);
  expect(screen.queryByText(ERROR_EQUIPO), `Debería verse el mensaje: ${ERROR_EQUIPO}`).not.toBeNull();
  expect(screen.queryByText(ERROR_CELULAR), `Debería verse el mensaje: ${ERROR_CELULAR}`).not.toBeNull();
  expect(onReservar, "Con datos inválidos no se debería llamar a onReservar").not.toHaveBeenCalled();
});

test("FormularioReserva envía los datos, limpia los campos y confirma la reserva", async () => {
  const FormularioReserva = await cargarFormulario();
  const onReservar = vi.fn().mockResolvedValue(true);
  render(<MemoryRouter><FormularioReserva onReservar={onReservar} /></MemoryRouter>);
  await userEvent.type(campo("Nombre del equipo"), "Los Cracks");
  await userEvent.type(campo("Celular"), "3001234567");
  await userEvent.click(screen.getByRole("button", { name: "Reservar" }));
  expect(onReservar, 'Debería llamar onReservar({ equipo: "Los Cracks", celular: "3001234567" })').toHaveBeenCalledWith({ equipo: "Los Cracks", celular: "3001234567" });
  expect(await screen.findByText("¡Turno reservado!"), 'Debería verse "¡Turno reservado!"').not.toBeNull();
  expect(campo("Nombre del equipo").value, "Después de reservar, el campo de equipo debería quedar vacío").toBe("");
  expect(campo("Celular").value, "Después de reservar, el campo de celular debería quedar vacío").toBe("");
});

test("FormularioReserva no limpia ni confirma si onReservar responde false", async () => {
  const FormularioReserva = await cargarFormulario();
  const onReservar = vi.fn().mockResolvedValue(false);
  render(<MemoryRouter><FormularioReserva onReservar={onReservar} /></MemoryRouter>);
  await userEvent.type(campo("Nombre del equipo"), "Los Cracks");
  await userEvent.type(campo("Celular"), "3001234567");
  await userEvent.click(screen.getByRole("button", { name: "Reservar" }));
  expect(onReservar, "Con datos válidos se debería llamar a onReservar").toHaveBeenCalled();
  expect(screen.queryByText("¡Turno reservado!"), 'Si onReservar responde false no debería verse "¡Turno reservado!"').toBeNull();
  expect(campo("Nombre del equipo").value, "Si la reserva falla, los datos escritos deberían quedarse").toBe("Los Cracks");
});

test("FormularioReserva deshabilitado muestra Ocupado", async () => {
  const FormularioReserva = await cargarFormulario();
  render(<MemoryRouter><FormularioReserva onReservar={vi.fn()} deshabilitado={true} /></MemoryRouter>);
  const ocupado = screen.queryByRole("button", { name: "Ocupado" });
  expect(ocupado, 'Con deshabilitado={true} el botón debería decir "Ocupado"').not.toBeNull();
  expect(ocupado.disabled, "Con deshabilitado={true} el botón debería estar deshabilitado").toBe(true);
});

test("ListaReservas muestra un mensaje si no hay reservas y una línea por reserva", async () => {
  const ListaReservas = await componente("frontend/src/components/ListaReservas.jsx");
  const { unmount } = render(<MemoryRouter><ListaReservas reservas={[]} /></MemoryRouter>);
  expect(screen.queryByText("Aún no tienes reservas."), 'Sin reservas debería verse "Aún no tienes reservas."').not.toBeNull();
  unmount();
  const reservas = [
    { id: 1, turno_id: 1, equipo: "Los Cracks", celular: "3001234567", cancha: "Cancha 1", hora: "6:00 p. m." },
    { id: 2, turno_id: 4, equipo: "Real Barrio", celular: "3109876543", cancha: "Cancha 2", hora: "6:00 p. m." },
  ];
  render(<MemoryRouter><ListaReservas reservas={reservas} /></MemoryRouter>);
  expect(screen.queryAllByRole("listitem").length, "Debería haber un <li> por cada reserva (2)").toBe(2);
  expect(screen.queryByText("Cancha 2 · 6:00 p. m. · Real Barrio"), 'Cada <li> debería decir "cancha · hora · equipo"').not.toBeNull();
});

test("FormularioReserva usa useState y la función validarReserva", () => {
  const codigo = codigoSinComentarios("frontend/src/components/FormularioReserva.jsx");
  expect(codigo, "FormularioReserva debería usar useState").toMatch(/useState\s*\(/);
  expect(codigo, "FormularioReserva debería importar validarReserva desde utils/validaciones.js").toMatch(/import\s*\{[^}]*validarReserva[^}]*\}\s*from\s*["'][^"']*utils\/validaciones(\.js)?["']/);
});
