import TarjetaTurno from './TarjetaTurno';

function ListaTurnos({ turnos, onReservar }) {
  if (turnos.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-emerald-900/20 bg-white/70 px-6 py-10 text-center font-medium text-slate-600">
        No hay turnos para mostrar.
      </p>
    );
  }

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-5 overflow-y-auto overscroll-contain pb-2 pr-2 sm:grid-cols-2 xl:grid-cols-3">
      {turnos.map((turno) => (
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