import axios from 'axios';

const API = 'http://localhost:8000';

export async function crearReserva(reserva) {
  const respuesta = await axios.post(`${API}/reservas`, reserva);
  return respuesta.data;
}

export async function listarReservas() {
  const respuesta = await axios.get(`${API}/reservas`);
  return respuesta.data;
}