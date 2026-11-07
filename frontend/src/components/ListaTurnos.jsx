import TarjetaTurno from './TarjetaTurno';

export default function ListaTurnos({ turnos, onReservar }) {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {turnos.map((turno) => (
        <TarjetaTurno key={turno.id} turno={turno} onReservar={onReservar} />
      ))}
    </section>
  );
}
