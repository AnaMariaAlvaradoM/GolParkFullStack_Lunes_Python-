import { useEffect, useState } from 'react';
import ListaReservas from '../components/ListaReservas';
import { listarReservas } from '../services/reservasService';
import { mensajeError } from '../utils/mensajeError';

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    listarReservas()
      .then(setReservas)
      .catch((errorApi) => {
        setError(mensajeError(errorApi, 'No se pudieron cargar las reservas.'));
      })
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p>Cargando reservas...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <>
      <h1>Mis reservas</h1>
      <ListaReservas reservas={reservas} />
    </>
  );
}