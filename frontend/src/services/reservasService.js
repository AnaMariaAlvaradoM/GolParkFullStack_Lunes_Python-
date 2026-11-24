import { cliente } from "../api/cliente.js";

const API = cliente;

export async function crearReserva(reserva) {
  const respuesta = await API.post(`/reservas`, reserva);
  return respuesta.data;
}

export async function listarReservas() {
  const respuesta = await API.get(`/reservas`);
  return respuesta.data;
}