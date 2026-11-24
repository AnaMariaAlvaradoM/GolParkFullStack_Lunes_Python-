import axios from 'axios';

const URL_API = 'http://localhost:8000';

export async function crearReserva(datos) {
    const respuesta = await axios.post(`${URL_API}/reservas`, datos);
    return respuesta.data;
}

export async function listarReservas() {
    const respuesta = await axios.get(`${URL_API}/reservas`);
    return respuesta.data;
}
