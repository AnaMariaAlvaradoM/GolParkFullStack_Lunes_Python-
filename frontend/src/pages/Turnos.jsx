import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ListaTurnos from '../components/ListaTurnos';
import { listarTurnos } from '../services/turnosService';
import { mensajeDeError } from '../utils/errores.js';

export default function Turnos() {
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    listarTurnos()
      .then(setTurnos)
      .catch((errorApi) => {
        setError(mensajeDeError(errorApi));
      })
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return <p className="animate-pulse font-semibold text-emerald-800">Cargando turnos...</p>;
  }
  if (error) {
    return <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 font-medium text-red-800">{error}</p>;
  }

  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="mb-6 shrink-0">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">Encuentra tu próximo partido</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Turnos de hoy</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Elige una cancha y un horario para reservar con tu equipo.</p>
      </div>
      <ListaTurnos
        turnos={turnos}
        onReservar={(id) => navigate(`/turnos/${id}`)}
      />
    </section>
  );
}