import TarjetaTurno from "./TarjetaTurno.jsx";

function ListaTurnos({ turnos, onReservar }) {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {turnos.map((turno) => (
        <TarjetaTurno key={turno.id} turno={turno} onReservar={onReservar} />
      ))}
    </section>
  );
}

export default ListaTurnos;