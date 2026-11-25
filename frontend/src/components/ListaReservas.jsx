function ListaReservas({ reservas }) {
  return (
    <section className="surface-card p-5 sm:p-7">
      <div className="mb-5 flex items-center justify-between border-b border-[#edf0ed] pb-4">
        <h2 className="font-display text-xl font-bold text-[#183b2a]">Mis reservas ({reservas.length})</h2>
        <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-[#edf6e9] text-lg text-[#198650]">⚽</span>
      </div>
      {reservas.length === 0 ? (
        <div className="rounded-2xl bg-[#f6f8f5] px-5 py-9 text-center">
          <span aria-hidden="true" className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-white text-xl shadow-sm">⚽</span>
          <p className="font-semibold text-[#34463a]">Aún no tienes reservas.</p>
          <p className="mt-1 text-sm text-[#7b887e]">Cuando reserves un turno, lo encontrarás aquí.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {reservas.map((reserva) => (
            <li key={reserva.id} className="flex items-center gap-4 rounded-2xl border border-[#e8eee8] bg-[#fbfcfb] p-4">
              <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e9f5e8] text-[#198650]">⚽</span>
              <span className="font-semibold text-[#34463a]">{reserva.cancha} · {reserva.hora} · {reserva.equipo}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ListaReservas;