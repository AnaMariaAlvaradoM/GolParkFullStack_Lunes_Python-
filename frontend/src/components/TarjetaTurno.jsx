import { useNavigate } from "react-router";
import { formatearPrecio } from "../utils/formato";

function TarjetaTurno({ turno, onReservar }) {
  const navigate = useNavigate();
  const disponible = turno.disponible ?? turno.cupos > 0;

  return (
    <article className="w-56 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-bold">{turno.cancha}</h3>
      <p>Precio: {formatearPrecio(turno.precio)}</p>
      <p>Hora: {turno.hora}</p>
      <button
        type="button"
        disabled={!disponible}
        onClick={() => onReservar ? onReservar(turno.id) : navigate(`/turnos/${turno.id}`)}
        className="mt-3 w-full cursor-pointer rounded-md bg-orange-600 py-2 font-bold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {disponible ? "Reservar" : "Ocupado"}
      </button>
    </article>
  );
}

export default TarjetaTurno;