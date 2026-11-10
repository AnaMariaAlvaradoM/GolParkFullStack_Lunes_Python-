import TarjetaTurno from "./TarjetaTurno.jsx";

function ListaTurnos({ turnos, onReservar }) {
  return (
    <section className="mx-auto flex max-w-5xl flex-wrap justify-center gap-5">
      {turnos.map((turno) => (
        <TarjetaTurno key={turno.id} turno={turno} onReservar={onReservar} />
      ))}
    </section>
  );
}

export default ListaTurnos;