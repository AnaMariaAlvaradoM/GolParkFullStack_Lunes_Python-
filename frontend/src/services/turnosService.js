import { cliente } from "../api/cliente.js";

const API = cliente;

export async function listarTurnos() {
  const respuesta = await API.get(`/turnos`);
  return respuesta.data;
}

export async function obtenerTurno(id) {
  const respuesta = await API.get(`/turnos/${id}`);
  return respuesta.data;
}