import { cliente } from "../api/cliente.js";

export async function crearReserva(datos) {
    const respuesta = await cliente.post(`/reservas`, datos);
    return respuesta.data;
}

export async function listarReservas() {
    const respuesta = await cliente.get(`/reservas`);
    return respuesta.data;
}
