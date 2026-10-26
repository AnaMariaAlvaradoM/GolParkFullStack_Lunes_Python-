// Fase 0 · Maqueta en HTML, CSS y JavaScript (carpeta maqueta/)
import { expect, test, vi } from "vitest";
import { cargar, codigoSinComentarios, leer } from "./ayudas.js";

async function montarMaqueta() {
  const html = leer("maqueta/index.html");
  const cuerpo = (html.match(/<body[^>]*>([\s\S]*)<\/body>/i) || [])[1] || "";
  document.body.innerHTML = cuerpo.replace(/<script[\s\S]*?<\/script>/gi, "");
  vi.resetModules();
  await cargar("maqueta/app.js");
}

function boton(id) {
  return document.querySelector(`#lista-turnos .btn-reservar[data-id="${id}"]`);
}

test("datos.js exporta los 6 turnos del correo de GolPark", async () => {
  vi.resetModules();
  const { turnos } = await cargar("maqueta/datos.js");
  expect(Array.isArray(turnos), "datos.js debería exportar un arreglo llamado turnos").toBe(true);
  expect(turnos.length, "datos.js debería tener los 6 turnos del correo").toBe(6);
  expect(turnos[0], "el primer turno debería ser Cancha 1 a las 6:00 p. m.").toEqual({
    id: 1, cancha: "Cancha 1", hora: "6:00 p. m.", precio: 120000, disponible: true,
  });
  expect(turnos[1].disponible, "el turno 2 (Cancha 1, 7:00 p. m.) debería estar ocupado").toBe(false);
});

test("index.html no trae tarjetas escritas a mano y carga app.js como módulo", () => {
  const html = leer("maqueta/index.html");
  expect(html, 'index.html debería tener <section id="lista-turnos">').toMatch(/id=["']lista-turnos["']/);
  expect(html, 'index.html debería tener <span id="contador">').toMatch(/id=["']contador["']/);
  expect(html, "index.html no debería traer <article> escritos a mano: los pinta app.js").not.toMatch(/<article/i);
  expect(html, 'index.html debería cargar app.js con type="module"').toMatch(/<script[^>]*type=["']module["'][^>]*src=["']\.?\/?app\.js["']|<script[^>]*src=["']\.?\/?app\.js["'][^>]*type=["']module["']/);
});

test("app.js pinta una tarjeta por cada turno", async () => {
  await montarMaqueta();
  const tarjetas = document.querySelectorAll("#lista-turnos article");
  expect(tarjetas.length, "Debería haber 6 <article> dentro de #lista-turnos").toBe(6);
  const sueltos = [...document.querySelector("#lista-turnos").childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim());
  expect(sueltos.length, 'Aparecen comas sueltas entre las tarjetas: ¿olvidaste .join("") después del map?').toBe(0);
  expect(tarjetas[0].textContent, 'La primera tarjeta debería mostrar "Cancha 1"').toContain("Cancha 1");
  expect(tarjetas[0].textContent, 'La primera tarjeta debería mostrar "6:00 p. m."').toContain("6:00 p. m.");
});

test("cada tarjeta muestra el precio con formato de pesos", async () => {
  await montarMaqueta();
  const tarjetas = document.querySelectorAll("#lista-turnos article");
  expect(tarjetas.length, "Debería haber 6 <article> dentro de #lista-turnos").toBe(6);
  expect(tarjetas[0].textContent, 'La primera tarjeta debería mostrar "$120.000" (usa toLocaleString("es-CO"))').toContain("$120.000");
});

test("un turno libre dice Reservar y uno ocupado dice Ocupado y está deshabilitado", async () => {
  await montarMaqueta();
  expect(boton(1), 'No encuentro el botón del turno 1: debe tener class="btn-reservar" y data-id="1"').not.toBeNull();
  expect(boton(1).textContent.trim(), 'El botón del turno 1 (libre) debería decir "Reservar"').toBe("Reservar");
  expect(boton(1).disabled, "El botón del turno 1 (libre) no debería estar deshabilitado").toBe(false);
  expect(boton(2), 'No encuentro el botón del turno 2: debe tener data-id="2"').not.toBeNull();
  expect(boton(2).textContent.trim(), 'El botón del turno 2 (ocupado) debería decir "Ocupado"').toBe("Ocupado");
  expect(boton(2).disabled, "El botón del turno 2 (ocupado) debería estar deshabilitado").toBe(true);
});

test("al reservar un turno libre queda ocupado y el contador sube", async () => {
  await montarMaqueta();
  expect(boton(1), 'No encuentro el botón del turno 1 (class="btn-reservar", data-id="1")').not.toBeNull();
  boton(1).click();
  expect(boton(1).textContent.trim(), 'Después de reservar, el turno 1 debería decir "Ocupado"').toBe("Ocupado");
  expect(boton(1).disabled, "Después de reservar, el botón del turno 1 debería quedar deshabilitado").toBe(true);
  expect(document.querySelector("#contador").textContent.trim(), "El contador debería pasar de 0 a 1").toBe("1");
});

test("reservar dos turnos distintos suma 2 y un turno ya ocupado no suma", async () => {
  await montarMaqueta();
  expect(boton(3), 'No encuentro el botón del turno 3 (data-id="3")').not.toBeNull();
  boton(3).click();
  boton(4).click();
  boton(3).click();
  expect(document.querySelector("#contador").textContent.trim(), "Después de reservar los turnos 3 y 4, el contador debería decir 2").toBe("2");
});

test("app.js toma los turnos de datos.js y los pinta con map", () => {
  const codigo = codigoSinComentarios("maqueta/app.js");
  expect(codigo, 'app.js debería importar turnos desde "./datos.js"').toMatch(/import\s*\{\s*turnos\s*\}\s*from\s*["']\.\/datos\.js["']/);
  expect(codigo, "app.js debería usar .map( para construir las tarjetas").toMatch(/\.map\s*\(/);
  expect(codigo, 'app.js no debería escribir los datos a mano (encontré "Cancha 1")').not.toMatch(/Cancha 1/);
});
