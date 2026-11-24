import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import FormularioReserva from '../components/FormularioReserva';
import { crearReserva } from '../services/reservasService';
import { obtenerTurno } from '../services/turnosService';
import { formatearPrecio } from '../utils/formato';
import { mensajeDeError } from '../utils/errores.js';

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
        setError(mensajeDeError(errorApi));
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
      setError(mensajeDeError(errorApi));
      return false;
    }
  }

  if (cargando) {
    return <p className="animate-pulse font-semibold text-emerald-800">Cargando turno...</p>;
  }
  if (error && !turno) {
    return <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 font-medium text-red-800">{error}</p>;
  }
  if (!turno) return null;

  return (
    <section className="mx-auto max-w-2xl">
      <div className="mb-8 rounded-2xl bg-emerald-950 p-6 text-white shadow-xl shadow-emerald-950/10 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-200">Confirma tu partido</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{turno.cancha}</h1>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50">Hora: {turno.hora}</span>
          <span className="rounded-full bg-lime-300 px-4 py-2 text-sm font-bold text-emerald-950">Precio: {formatearPrecio(turno.precio)}</span>
        </div>
      </div>

      <FormularioReserva
        onReservar={reservar}
        deshabilitado={!turno.disponible}
        error={error}
      />
    </section>
  );
}