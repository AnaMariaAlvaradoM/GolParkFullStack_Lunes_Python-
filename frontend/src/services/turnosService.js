import axios from "axios";

const API = "http://localhost:8000";

export async function listarTurnos() {
  const respuesta = await axios.get(`${API}/turnos`);
  return respuesta.data;
}

export async function obtenerTurno(id) {
  const respuesta = await axios.get(`${API}/turnos/${id}`);
  return respuesta.data;
}
