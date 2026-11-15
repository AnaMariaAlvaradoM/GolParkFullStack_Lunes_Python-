import { formatearPrecio } from '../utils/formato';

function TarjetaTurno({ turno, onReservar }) {
  return (
    <article className="w-56 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-bold">{turno.nombre}</h3>
      <p>Precio: {formatearPrecio(turno.precio)}</p>
      <p>Hora: {turno.hora}</p>
      <p>Cupos: {turno.cupos}</p>
      <button
        type="button"
        disabled={turno.cupos === 0}
        onClick={() => onReservar(turno.id)}
        className="mt-3 w-full cursor-pointer rounded-md bg-orange-600 py-2 font-bold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {turno.cupos === 0 ? "Ocupado" : "Libre"}
      </button>
    </article>
  );
}

export default TarjetaTurno;