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
    <form onSubmit={enviar} noValidate className="flex flex-col gap-5">
      {mensaje && (
        <p role="status" className="rounded-xl border border-[#cce8d4] bg-[#edf8ef] p-3 text-center font-semibold text-[#146c43]">{mensaje}</p>
      )}

      <div>
        <label className="flex flex-col gap-1.5 font-semibold text-[#34463a]">
          Nombre del equipo
          <input
            type="text"
            value={equipo}
            onChange={(evento) => setEquipo(evento.target.value)}
            className="field-control mt-1 font-normal"
            placeholder="Ej. Los del barrio"
          />
        </label>
        {errores.equipo && <p className="mt-1.5 text-sm text-red-600">{errores.equipo}</p>}
      </div>

      <div>
        <label className="flex flex-col gap-1.5 font-semibold text-[#34463a]">
          Celular
          <input
            type="tel"
            inputMode="numeric"
            value={celular}
            onChange={(evento) => setCelular(evento.target.value)}
            className="field-control mt-1 font-normal"
            placeholder="Tu número de contacto"
          />
        </label>
        {errores.celular && <p className="mt-1.5 text-sm text-red-600">{errores.celular}</p>}
      </div>

      <button
        type="submit"
        disabled={deshabilitado}
        className="mt-1 cursor-pointer rounded-xl bg-[#198650] p-3.5 font-bold text-white shadow-[0_8px_20px_rgba(25,134,80,0.16)] transition hover:bg-[#126b3f] disabled:cursor-not-allowed disabled:bg-[#e8ece8] disabled:text-[#5c6661] disabled:shadow-none"
      >
        {deshabilitado ? "Ocupado" : "Reservar"}
      </button>
    </form>
  );
}

export default FormularioReserva;