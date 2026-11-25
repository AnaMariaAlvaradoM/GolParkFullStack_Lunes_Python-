import { cliente } from "../api/cliente.js";

export async function crearReserva(reserva) {
  const respuesta = await cliente.post("/reservas", reserva);
  return respuesta.data;
}

export async function listarReservas() {
  const respuesta = await cliente.get("/reservas");
  return respuesta.data;
}