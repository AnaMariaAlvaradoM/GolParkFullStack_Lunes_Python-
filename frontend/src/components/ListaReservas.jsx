export default function ListaReservas({ reservas = [] }) {
  if (reservas.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-amber-300/40 bg-black/35 px-6 py-14 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-amber-300 font-[family-name:Oswald,sans-serif] text-2xl text-amber-300">
          0
        </span>
        <p className="mt-4 font-[family-name:Oswald,sans-serif] text-2xl uppercase tracking-wide text-white">
          Aún no tienes reservas.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {reservas.map((reserva, indice) => (
        <li key={reserva.id} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white p-5 text-emerald-950 shadow-lg">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-800 font-[family-name:Oswald,sans-serif] text-2xl text-amber-300">
            {String(indice + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-[family-name:Oswald,sans-serif] text-xs uppercase tracking-[0.22em] text-emerald-700">
              En cancha
            </p>
            <p className="mt-1 text-lg font-bold">
              {reserva.cancha} · {reserva.hora} · {reserva.equipo}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
