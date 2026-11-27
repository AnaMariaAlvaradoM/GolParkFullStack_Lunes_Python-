export default function ListaReservas({ reservas = [] }) {
  if (reservas.length === 0) {
    return <p>No tienes reservas todavía.</p>;
  }

  return (
    <ul>
      {reservas.map((reserva) => (
        <li key={reserva.id}>
          {reserva.cancha} · {reserva.hora} · {reserva.equipo}
        </li>
      ))}
    </ul>
  );
}