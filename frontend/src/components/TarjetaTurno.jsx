import { formatearPrecio } from "../utils/formato.js";

export default function TarjetaTurno({ turno, onReservar }) {
  const libre = turno.disponible;

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-700 bg-slate-800 p-5 shadow-lg shadow-black/30">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl font-bold text-white">{turno.cancha}</h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            libre ? "bg-lime-400/15 text-lime-300" : "bg-red-500/15 text-red-300"
          }`}
        >
          {libre ? "Libre" : "Ocupado"}
        </span>
      </div>

      <p className="text-slate-300">Hora: {turno.hora}</p>
      <p className="text-lg font-semibold text-slate-100">Precio: {formatearPrecio(turno.precio)}</p>

      <button
        type="button"
        onClick={() => onReservar(turno.id)}
        disabled={!libre}
        className="mt-auto rounded-lg bg-lime-400 px-4 py-2 font-bold text-slate-900 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
      >
        {libre ? "Reservar" : "Ocupado"}
      </button>
    </article>
  );
}
