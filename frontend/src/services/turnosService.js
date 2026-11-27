import { cliente } from "../api/cliente.js";

export async function listarTurnos() {
    const respuesta = await cliente.get("/turnos");
    return respuesta.data;
}

export async function obtenerTurno(id) {
    const respuesta = await cliente.get(`/turnos/${id}`);
    return respuesta.data;
}