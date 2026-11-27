function ListaReservas({ reservas }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="mb-2 text-xl font-bold">Mis reservas ({reservas.length})</h2>
      {reservas.length === 0 ? (
        <p className="text-slate-600">Aún no tienes reservas.</p>
      ) : (
        <ul className="list-disc pl-5">
          {reservas.map((reserva) => (
            <li key={reserva.id}>
              {reserva.cancha} · {reserva.hora} · {reserva.equipo}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ListaReservas;