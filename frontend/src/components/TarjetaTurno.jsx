import { formatearPrecio } from "../utils/formato.js";

function TarjetaTurno({ turno, onReservar }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <h3 className="text-lg font-extrabold text-green-900">
        {turno.cancha}
      </h3>
      
      <p>Hora: {turno.hora}</p>
      <p>Precio: {formatearPrecio(turno.precio)}</p>

      <button
        type="button"
        disabled={!turno.disponible}
        onClick={() => onReservar(turno.id)}
        className="mt-5 w-full rounded-lg bg-green-600 py-3 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {turno.disponible ? "Reservar" : "Ocupado"}
      </button>

    </article>
  );
}

export default TarjetaTurno;