import FondoCancha from './FondoCancha';
import IconoFutbol from './IconoFutbol';

export default function ListaReservas({ reservas }) {
  if (reservas.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-emerald-900/20 bg-white/70 px-6 py-10 text-center font-medium text-slate-600">
        Aún no tienes reservas.
      </p>
    );
  }

  return (
    <ul className="grid min-h-0 flex-1 content-start items-start grid-cols-1 gap-4 overflow-y-auto overscroll-contain p-0 pb-2 pr-2 sm:grid-cols-2 xl:grid-cols-3">
      {reservas.map((reserva) => (
        <li key={reserva.id} className="list-none">
          <article className="relative isolate overflow-hidden rounded-2xl border border-emerald-900/10 bg-gradient-to-br from-emerald-50/90 via-white/80 to-lime-50/85 p-5 shadow-sm shadow-emerald-950/5">
            <FondoCancha />
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Reserva confirmada</p>
                  <h2 className="mt-2 text-xl font-extrabold text-slate-900">{reserva.cancha}</h2>
                </div>
                <IconoFutbol className="shrink-0 text-3xl" />
              </div>
              <p className="mt-4 border-t border-emerald-900/10 pt-4 text-sm text-slate-600">
                {reserva.cancha} · {reserva.hora} · {reserva.equipo}
              </p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}