// Ayudas para las pruebas. NO modifiques este archivo.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { AxiosError } from "axios";

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

export function existe(ruta) {
  return fs.existsSync(path.join(RAIZ, ruta));
}

export function leer(ruta) {
  if (!existe(ruta)) throw new Error(`Falta el archivo ${ruta}`);
  return fs.readFileSync(path.join(RAIZ, ruta), "utf8");
}

export function codigoSinComentarios(ruta) {
  return leer(ruta)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

export function archivosDe(carpeta, extension) {
  const base = path.join(RAIZ, carpeta);
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base, { recursive: true })
    .filter((f) => f.endsWith(extension))
    .map((f) => path.join(carpeta, f).replace(/\\/g, "/"));
}

// Carga un archivo del estudiante. Si no existe, la prueba falla con un mensaje claro
// y las demás pruebas de la fase se califican normalmente.
export async function cargar(ruta) {
  if (!existe(ruta)) throw new Error(`Falta el archivo ${ruta}`);
  return import(/* @vite-ignore */ `../../${ruta}`);
}

export async function componente(ruta) {
  const modulo = await cargar(ruta);
  if (typeof modulo.default !== "function") {
    throw new Error(`${ruta} debe tener un export default con el componente`);
  }
  return modulo.default;
}

export async function funcion(ruta, nombre) {
  const modulo = await cargar(ruta);
  if (typeof modulo[nombre] !== "function") {
    throw new Error(`No encuentro la función ${nombre} en ${ruta}: ¿le cambiaste el nombre o le falta el export?`);
  }
  return modulo[nombre];
}

// ------------------------------------------------------------
// Servidor falso de GolPark (responde como la API de la Fase 3)
// ------------------------------------------------------------
const TURNOS = [
  { id: 1, cancha: "Cancha 1", hora: "6:00 p. m.", precio: 120000, disponible: true },
  { id: 2, cancha: "Cancha 1", hora: "7:00 p. m.", precio: 150000, disponible: false },
  { id: 3, cancha: "Cancha 1", hora: "8:00 p. m.", precio: 150000, disponible: true },
  { id: 4, cancha: "Cancha 2", hora: "6:00 p. m.", precio: 110000, disponible: true },
  { id: 5, cancha: "Cancha 2", hora: "7:00 p. m.", precio: 140000, disponible: false },
  { id: 6, cancha: "Cancha 2", hora: "9:00 p. m.", precio: 140000, disponible: true },
];

let servidor;

export function servidorFalso(opciones = {}) {
  servidor = {
    apagado: Boolean(opciones.apagado),
    conflicto: Boolean(opciones.conflicto),
    turnos: structuredClone(TURNOS),
    reservas: [],
    peticiones: [],
  };
  return servidor;
}

servidorFalso();

function urlCompleta(config) {
  const url = config.url || "";
  if (/^https?:\/\//.test(url) || !config.baseURL) return url;
  return config.baseURL.replace(/\/+$/, "") + "/" + url.replace(/^\/+/, "");
}

function responder(config, status, data) {
  const respuesta = { data: structuredClone(data), status, statusText: String(status), headers: {}, config, request: {} };
  if (status >= 400) {
    throw new AxiosError(`Request failed with status code ${status}`, "ERR_BAD_REQUEST", config, {}, respuesta);
  }
  return respuesta;
}

export async function manejarPeticion(config) {
  await new Promise((resolver) => setTimeout(resolver, 10));
  const metodo = (config.method || "get").toUpperCase();
  const url = urlCompleta(config);
  const cuerpo = typeof config.data === "string" ? JSON.parse(config.data) : config.data;
  servidor.peticiones.push({ metodo, url, cuerpo });

  if (servidor.apagado) throw new AxiosError("Network Error", "ERR_NETWORK", config, {});

  const BASE = "http://localhost:8000";
  if (!url.startsWith(BASE)) return responder(config, 404, { detail: "Not Found" });
  const ruta = url.slice(BASE.length).split("?")[0].replace(/\/+$/, "");

  if (metodo === "GET" && ruta === "/turnos") return responder(config, 200, servidor.turnos);

  const unTurno = ruta.match(/^\/turnos\/(\w+)$/);
  if (metodo === "GET" && unTurno) {
    const turno = servidor.turnos.find((t) => String(t.id) === unTurno[1]);
    return turno ? responder(config, 200, turno) : responder(config, 404, { detail: "Ese turno no existe." });
  }

  if (metodo === "GET" && ruta === "/reservas") return responder(config, 200, servidor.reservas);

  if (metodo === "POST" && ruta === "/reservas") {
    const turno = servidor.turnos.find((t) => t.id === Number(cuerpo && cuerpo.turno_id));
    if (!turno) return responder(config, 404, { detail: "Ese turno no existe." });
    if (servidor.conflicto || !turno.disponible) {
      return responder(config, 409, { detail: "Ese turno ya está ocupado." });
    }
    turno.disponible = false;
    const reserva = {
      id: servidor.reservas.length + 1,
      turno_id: turno.id,
      equipo: cuerpo.equipo,
      celular: cuerpo.celular,
      cancha: turno.cancha,
      hora: turno.hora,
    };
    servidor.reservas.push(reserva);
    return responder(config, 201, reserva);
  }

  return responder(config, 404, { detail: "Not Found" });
}
