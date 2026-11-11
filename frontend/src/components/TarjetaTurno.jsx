import { formatearPrecio } from '../utils/formato.js';

export default function TarjetaTurno({ turno, onReservar }) {
  const disponible = Boolean(turno?.disponible);

  return (
    <article className="w-70 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-800">{turno.cancha}</h3>

        <span
          className={[
            "inline-flex rounded-full px-3 py-1 text-sm font-semibold",
            disponible ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600",
          ].join(" ")}
        >
          {disponible ? "Libre" : "Ocupado"}
        </span>
      </div>

      <p className="mt-3 text-slate-600">Hora: {turno.hora}</p>
      <p className="mt-1 text-slate-600">Precio: {formatearPrecio(turno.precio)}</p>
      <br />           
      <button
        type="button"
        className={[
          "mt-0 w-full rounded-xl px-4 py-2.5 font-semibold text-white transition",
          disponible ? "bg-emerald-600 hover:bg-emerald-700" : "cursor-not-allowed bg-slate-300 text-slate-500",
        ].join(" ")}
        disabled={!disponible}
        onClick={() => disponible && onReservar(turno.id)}
      >
        {disponible ? "Reservar" : "Ocupado"}
      </button>
    </article>
  );
}
