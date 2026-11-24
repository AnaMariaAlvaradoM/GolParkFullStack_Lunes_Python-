import { useState } from 'react';
import { validarReserva } from '../utils/validaciones';

export default function FormularioReserva({
  onReservar,
  deshabilitado = false,
  error = '',
}) {
  const [equipo, setEquipo] = useState('');
  const [celular, setCelular] = useState('');
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  async function handleSubmit(evento) {
    evento.preventDefault();

    if (deshabilitado) return;

    const nuevosErrores = validarReserva({ equipo, celular });
    setErrores(nuevosErrores);
    setMensaje('');

    if (Object.keys(nuevosErrores).length > 0) return;

    const reservado = await onReservar({
      equipo: equipo.trim(),
      celular,
    });

    if (reservado) {
      setEquipo('');
      setCelular('');
      setErrores({});
      setMensaje('¡Turno reservado!');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid max-w-xl gap-5 rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-lg shadow-emerald-950/5 sm:p-8"
    >
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Nombre del equipo
        <input
          className="rounded-xl border border-slate-300 bg-stone-50 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
          value={equipo}
          onChange={(evento) => setEquipo(evento.target.value)}
        />
        {errores.equipo && <p className="text-sm font-medium text-red-700">{errores.equipo}</p>}
      </label>

      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Celular
        <input
          type="tel"
          className="rounded-xl border border-slate-300 bg-stone-50 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
          value={celular}
          onChange={(evento) => setCelular(evento.target.value)}
        />
        {errores.celular && <p className="text-sm font-medium text-red-700">{errores.celular}</p>}
      </label>

      <button
        type="submit"
        disabled={deshabilitado}
        className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white shadow-md shadow-emerald-900/15 transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/25 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
      >
        {deshabilitado ? 'Ocupado' : 'Reservar'}
      </button>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {error}
        </p>
      )}
      {mensaje && (
        <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {mensaje}
        </p>
      )}
    </form>
  );
}