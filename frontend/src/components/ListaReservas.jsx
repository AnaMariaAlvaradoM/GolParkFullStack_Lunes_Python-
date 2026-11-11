function ListaReservas({ reservas }) {
    return (
      <section className="rounded-xl bg-white p-5 shadow-md">
        <h2 className="mb-3 text-xl font-bold text-[#146c43]">Mis reservas ({reservas.length})</h2>
        {reservas.length === 0 ? (
          <p className="text-[#6b7570]">Aún no tienes reservas.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {reservas.map((reserva) => (
              <li key={reserva.id} className="rounded-lg border-l-4 border-[#2fb36d] bg-[#f1f5f2] px-3 py-2">
                {reserva.cancha} · {reserva.hora} · {reserva.equipo}
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
  
  export default ListaReservas;