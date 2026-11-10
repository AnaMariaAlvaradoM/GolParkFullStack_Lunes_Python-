import TarjetaTurno from "./TarjetaTurno.jsx";

function ListaTurnos({ turnos, onReservar }) {
  return (
    <section className="flex flex-wrap gap-4">
      {turnos.map((turno) => (
        <TarjetaTurno key={turno.id} turno={turno} onReservar={onReservar} />
      ))}
    </section>
  );
}

export default ListaTurnos;