import { formatearPrecio } from "../utils/formato.js";

export default function TarjetaTurno({ turno, onReservar }) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900">{turno.cancha}</h3>
        <p className="text-gray-600 font-medium">Hora: {turno.hora}</p>
        <p className="text-emerald-700 font-semibold text-lg">
          Precio: {formatearPrecio(turno.precio)}
        </p>
      </div>

      <div className="mt-6">
        {turno.disponible ? (
          <button
            type="button"
            onClick={() => onReservar(turno.id)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg transition cursor-pointer"
          >
            Reservar
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="w-full bg-gray-300 text-gray-500 font-semibold py-2.5 px-4 rounded-lg cursor-not-allowed"
          >
            Ocupado
          </button>
        )}
      </div>
    </article>
  );
}
