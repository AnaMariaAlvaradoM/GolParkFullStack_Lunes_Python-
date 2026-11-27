import { formatearPrecio } from "../utils/formato.js";

export default function TarjetaTurno({ turno, onReservar }) {
  const disponible = Boolean(turno?.disponible);

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-white text-emerald-950 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
      <div className={`h-2 ${disponible ? "bg-lime-400" : "bg-slate-300"}`} />
      <div className="relative h-36 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=700&q=82"
          alt={`Cancha para el turno ${turno.cancha}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <span className="font-[family-name:Oswald,sans-serif] text-2xl uppercase tracking-wide text-white">
            {turno.cancha}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider ${
              disponible ? "bg-amber-400 text-emerald-950" : "bg-white/80 text-slate-600"
            }`}
          >
            {disponible ? "Libre" : "Ocupado"}
          </span>
        </div>
      </div>

      <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f4f7f2_100%)] px-4 py-4">
        <p className="text-sm font-semibold text-emerald-900">{`Hora: ${turno.hora}`}</p>
        <p className="mt-1 font-[family-name:Oswald,sans-serif] text-2xl tracking-wide text-emerald-700">
          {`Precio: ${formatearPrecio(turno.precio)}`}
        </p>
        <button
          type="button"
          className={`mt-4 w-full rounded-full px-3 py-2.5 font-[family-name:Oswald,sans-serif] text-lg uppercase tracking-wider ${
            disponible
              ? "bg-emerald-700 text-amber-300 hover:bg-emerald-800"
              : "cursor-not-allowed bg-slate-200 text-slate-400"
          }`}
          disabled={!disponible}
          onClick={() => disponible && onReservar(turno.id)}
        >
          {disponible ? "Reservar" : "Ocupado"}
        </button>
      </div>
    </article>
  );
}
