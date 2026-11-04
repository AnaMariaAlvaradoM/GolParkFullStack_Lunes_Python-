import { formatearPrecio } from '../utils/formato';

export function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(precio);
}

function TarjetaTurno({ turno, onReservar }) {
  const handleClick = () => {
    if (turno.disponible && onReservar) {
      onReservar(turno.id);
    }
  };

  return (
    <article className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{turno.cancha}</h3>
        <p className="text-gray-600 mb-1">Hora: {turno.hora}</p>
        <p className="text-gray-600 mb-4">Precio: {formatearPrecio(turno.precio)}</p>
      </div>

      <button
        onClick={handleClick}
        disabled={!turno.disponible}
        className={`w-full py-2 px-4 rounded font-medium transition-colors ${
          turno.disponible
            ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {turno.disponible ? 'Reservar' : 'Ocupado'}
      </button>
    </article>
  );
}

export default TarjetaTurno;