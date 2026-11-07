import { formatearPrecio } from '../utils/formato';

export default function TarjetaTurno({ turno, onReservar }) {
  const disponible = Boolean(turno?.disponible);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <h3 className="text-xl font-bold text-slate-800">{turno.cancha}</h3>
      <p className="mt-3 text-slate-600">Hora: {turno.hora}</p>
      <p className="mt-1 text-slate-600">Precio: {formatearPrecio(turno.precio)}</p>

      <button
        type="button"
        className={[
          'mt-5 w-full rounded-xl px-4 py-2.5 font-semibold text-white transition',
          disponible
            ? 'bg-emerald-600 hover:bg-emerald-700'
            : 'cursor-not-allowed bg-slate-300 text-slate-600',
        ].join(' ')}
        disabled={!disponible}
        onClick={() => disponible && onReservar(turno.id)}
      >
        {disponible ? 'Reservar' : 'Ocupado'}
      </button>
    </article>
  );
}
