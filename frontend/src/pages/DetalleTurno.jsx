import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import FormularioReserva from '../components/FormularioReserva';
import { crearReserva } from '../services/reservasService';
import { obtenerTurno } from '../services/turnosService';
import { formatearPrecio } from '../utils/formato';
import { mensajeError } from '../utils/mensajeError';

export default function DetalleTurno() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [turno, setTurno] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setCargando(true);
    setError('');

    obtenerTurno(id)
      .then(setTurno)
      .catch((errorApi) => {
        setError(mensajeError(errorApi, 'No se pudo cargar el turno.'));
      })
      .finally(() => setCargando(false));
  }, [id]);

  async function reservar(datos) {
    setError('');

    try {
      await crearReserva({ ...datos, turno_id: turno.id });
      navigate('/mis-reservas');
      return true;
    } catch (errorApi) {
      setError(mensajeError(errorApi, 'No se pudo crear la reserva.'));
      return false;
    }
  }

  if (cargando) return <p>Cargando turno...</p>;
  if (error && !turno) return <p role="alert">{error}</p>;
  if (!turno) return null;

  return (
    <>
      <h1>{turno.cancha}</h1>
      <p>Hora: {turno.hora}</p>
      <p>Precio: {formatearPrecio(turno.precio)}</p>

      <FormularioReserva
        onReservar={reservar}
        deshabilitado={!turno.disponible}
        error={error}
      />
    </>
  );
}