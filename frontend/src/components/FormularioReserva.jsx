import { useState } from "react";
import { validarReserva } from "../utils/validaciones.js";

function FormularioReserva({ onReservar, deshabilitado = false }) {
  const [equipo, setEquipo] = useState("");
  const [celular, setCelular] = useState("");
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  async function enviar(evento) {
    evento.preventDefault();
    setMensaje("");

    const encontrados = validarReserva({ equipo, celular });
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) {
      return;
    }

    const exito = await onReservar({ equipo: equipo.trim(), celular: celular.trim() });
    if (exito) {
      setEquipo("");
      setCelular("");
      setMensaje("¡Turno reservado!");
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-4">
      {mensaje && (
        <p className="rounded-lg bg-[#e3f5eb] p-3 text-center font-semibold text-[#146c43]">{mensaje}</p>
      )}

      <div>
        <label className="flex flex-col gap-1 font-semibold">
          Nombre del equipo
          <input
            type="text"
            value={equipo}
            onChange={(evento) => setEquipo(evento.target.value)}
            className="rounded-lg border border-[#c7cfcb] px-3 py-2 font-normal focus:border-[#2fb36d] focus:outline-none"
          />
        </label>
        {errores.equipo && <p className="mt-1 text-sm text-red-600">{errores.equipo}</p>}
      </div>

      <div>
        <label className="flex flex-col gap-1 font-semibold">
          Celular
          <input
            type="tel"
            inputMode="numeric"
            value={celular}
            onChange={(evento) => setCelular(evento.target.value)}
            className="rounded-lg border border-[#c7cfcb] px-3 py-2 font-normal focus:border-[#2fb36d] focus:outline-none"
          />
        </label>
        {errores.celular && <p className="mt-1 text-sm text-red-600">{errores.celular}</p>}
      </div>

      <button
        type="submit"
        disabled={deshabilitado}
        className="cursor-pointer rounded-lg bg-[#2fb36d] p-3 font-semibold text-white transition-colors hover:bg-[#146c43] disabled:cursor-not-allowed disabled:bg-[#c7cfcb] disabled:text-[#5c6661]"
      >
        {deshabilitado ? "Ocupado" : "Reservar"}
      </button>
    </form>
  );
}

export default FormularioReserva;