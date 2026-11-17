import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ListaTurnos from '../components/ListaTurnos';
import { listarTurnos } from '../services/turnosService';
import { mensajeError } from '../utils/mensajeError';

export default function Turnos() {
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    listarTurnos()
      .then(setTurnos)
      .catch((errorApi) => {
        setError(mensajeError(errorApi, 'No se pudieron cargar los turnos.'));
      })
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p>Cargando turnos...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <>
      <h1>Turnos de hoy</h1>
      <ListaTurnos
        turnos={turnos}
        onReservar={(id) => navigate(`/turnos/${id}`)}
      />
    </>
  );
}