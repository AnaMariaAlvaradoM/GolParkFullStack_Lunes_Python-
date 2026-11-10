import { formatearPrecio } from "../utils/formato.js";

function TarjetaTurno({ turno, onReservar }) {
  return (
    <article
      className={`flex w-64 flex-col gap-2 rounded-xl border-t-[6px] bg-white p-5 shadow-md ${
        turno.disponible ? "border-[#2fb36d]" : "border-[#9aa5a0] opacity-75"
      }`}
    >
      <h3
        className={`text-xl font-bold ${
          turno.disponible ? "text-[#146c43]" : "text-[#6b7570]"
        }`}
      >
        {turno.cancha}
      </h3>
      <p>Hora: {turno.hora}</p>
      <p>Precio: {formatearPrecio(turno.precio)}</p>
      <button
        type="button"
        disabled={!turno.disponible}
        onClick={() => onReservar(turno.id)}
        className="mt-2 cursor-pointer rounded-lg bg-[#2fb36d] p-3 font-semibold text-white transition-colors hover:bg-[#146c43] disabled:cursor-not-allowed disabled:bg-[#c7cfcb] disabled:text-[#5c6661]"
      >
        {turno.disponible ? "Reservar" : "Ocupado"}
      </button>
    </article>
  );
}

export default TarjetaTurno;