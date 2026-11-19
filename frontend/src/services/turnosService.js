import axios from "axios";

const URL_API = "http://localhost:8000";

export async function listarTurnos() {
  const respuesta = await axios.get(`${URL_API}/turnos`);
  return respuesta.data;
}

export async function obtenerTurno(id) {
  const respuesta = await axios.get(`${URL_API}/turnos/${id}`);
  return respuesta.data;
}