import { useState } from "react";
import { validarReserva } from "../utils/validaciones.js";

export default function FormularioReserva({ onReservar, deshabilitado = false }) {
  const [equipo, setEquipo] = useState("");
  const [celular, setCelular] = useState("");
  const [errores, setErrores] = useState({});
  const [confirmado, setConfirmado] = useState(false);

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setConfirmado(false);

    const fallos = validarReserva({ equipo, celular });
    setErrores(fallos);

    if (Object.keys(fallos).length > 0) {
      return;
    }

    if (onReservar) {
      const exito = await onReservar({ equipo, celular });
      if (exito) {
        setEquipo("");
        setCelular("");
        setErrores({});
        setConfirmado(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700 flex flex-col gap-1">
          Nombre del equipo
          <input
            type="text"
            value={equipo}
            onChange={(e) => setEquipo(e.target.value)}
            disabled={deshabilitado}
            placeholder="Ej: Los Cracks"
            className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </label>
        {errores.equipo && (
          <p className="text-sm text-red-600 font-medium">{errores.equipo}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700 flex flex-col gap-1">
          Celular
          <input
            type="tel"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            disabled={deshabilitado}
            placeholder="Ej: 3001234567"
            className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </label>
        {errores.celular && (
          <p className="text-sm text-red-600 font-medium">{errores.celular}</p>
        )}
      </div>

      {confirmado && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg font-medium text-sm text-center">
          ¡Turno reservado!
        </div>
      )}

      {deshabilitado ? (
        <button
          type="submit"
          disabled
          className="w-full bg-gray-300 text-gray-500 font-semibold py-2.5 px-4 rounded-lg cursor-not-allowed"
        >
          Ocupado
        </button>
      ) : (
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg transition cursor-pointer"
        >
          Reservar
        </button>
      )}
    </form>
  );
}
