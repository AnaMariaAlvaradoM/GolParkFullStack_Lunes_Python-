import { useEffect, useState } from 'react';
import ListaReservas from '../components/ListaReservas';
import { listarReservas } from '../services/reservasService';
import { mensajeDeError } from '../utils/errores.js';

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    listarReservas()
      .then(setReservas)
      .catch((errorApi) => {
        setError(mensajeDeError(errorApi));
      })
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return <p className="animate-pulse font-semibold text-emerald-800">Cargando reservas...</p>;
  }
  if (error) {
    return <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 font-medium text-red-800">{error}</p>;
  }

  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="mb-6 shrink-0">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">Tu agenda deportiva</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Mis reservas</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Consulta aquí los partidos que reservaste.</p>
      </div>
      <ListaReservas reservas={reservas} />
    </section>
  );
}