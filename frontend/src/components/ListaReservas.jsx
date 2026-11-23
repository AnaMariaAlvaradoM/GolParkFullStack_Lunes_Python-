export default function ListaReservas({ reservas = [] }) {
  if (!reservas || reservas.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 text-center text-gray-500">
        <p>Aún no tienes reservas.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {reservas.map((reserva) => (
        <li
          key={reserva.id || `${reserva.turno_id}-${reserva.equipo}`}
          className="p-4 hover:bg-gray-50 transition flex items-center justify-between text-gray-800 font-medium"
        >
          <span>{`${reserva.cancha} · ${reserva.hora} · ${reserva.equipo}`}</span>
        </li>
      ))}
    </ul>
  );
}
