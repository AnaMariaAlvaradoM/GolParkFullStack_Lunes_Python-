import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const crearReserva = async (reserva) => {
  const respuesta = await axios.post(`${API_URL}/reservas`, reserva);
  return respuesta.data;
};

export const listarReservas = async () => {
  const respuesta = await axios.get(`${API_URL}/reservas`);
  return respuesta.data;
};