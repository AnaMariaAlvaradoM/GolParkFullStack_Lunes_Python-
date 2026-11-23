import TarjetaTurno from "./TarjetaTurno.jsx";

export default function ListaTurnos({ turnos, onReservar }) {
  return (
    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {turnos.map((turno) => (
        <TarjetaTurno key={turno.id} turno={turno} onReservar={onReservar} />
      ))}
    </section>
  );
}
