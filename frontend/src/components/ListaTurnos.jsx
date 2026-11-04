import TarjetaTurno from './TarjetaTurno';

function ListaTurnos({ turnos, onReservar }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {turnos && turnos.map((turno) => (
        <TarjetaTurno
          key={turno.id}
          turno={turno}
          onReservar={onReservar}
        />
      ))}
    </div>
  );
}

export default ListaTurnos;