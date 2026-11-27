import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const listarTurnos = async () => {
  const respuesta = await axios.get(`${API_URL}/turnos`);
  return respuesta.data;
};

export const obtenerTurno = async (id) => {
  const respuesta = await axios.get(`${API_URL}/turnos/${id}`);
  return respuesta.data;
};