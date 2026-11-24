import { formatearPrecio } from '../utils/formato';
import FondoCancha from './FondoCancha';
import IconoFutbol from './IconoFutbol';

function TarjetaTurno({ turno, onReservar }) {
  const handleClick = () => {
    if (turno.disponible && onReservar) {
      onReservar(turno.id);
    }
  };

  return (
    <article className="relative isolate flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-emerald-900/10 bg-gradient-to-br from-emerald-50/90 via-white/80 to-lime-50/85 p-6 shadow-sm shadow-emerald-950/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10">
      <FondoCancha />
      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p
              className={`text-xs font-bold uppercase tracking-[0.16em] ${
                turno.disponible ? 'text-emerald-700' : 'text-slate-500'
              }`}
            >
              {turno.disponible ? 'Turno disponible' : 'Turno ocupado'}
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">{turno.cancha}</h2>
          </div>
          <IconoFutbol className="shrink-0 text-3xl" />
        </div>
        <div className="space-y-3 rounded-xl border border-emerald-900/10 bg-white/25 p-4">
          <p className="text-sm font-medium text-slate-600">
            <span className="font-bold text-slate-900">Hora: {turno.hora}</span>
          </p>
          <p className="text-sm font-medium text-slate-600">
            <span className="text-lg font-extrabold text-emerald-800">Precio: {formatearPrecio(turno.precio)}</span>
          </p>
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={!turno.disponible}
        className={`relative z-10 mt-5 w-full rounded-xl px-4 py-3 font-bold transition focus:outline-none focus:ring-4 ${
          turno.disponible
            ? 'cursor-pointer bg-emerald-700 text-white shadow-md shadow-emerald-900/15 hover:bg-emerald-800 focus:ring-emerald-500/25'
            : 'cursor-not-allowed bg-slate-200 text-slate-500 focus:ring-slate-300/50'
        }`}
      >
        {turno.disponible ? 'Reservar' : 'Ocupado'}
      </button>
    </article>
  );
}

export default TarjetaTurno;