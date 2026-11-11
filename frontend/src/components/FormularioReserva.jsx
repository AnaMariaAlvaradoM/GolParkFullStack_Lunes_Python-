import { useState } from "react";
import { validarReserva } from "../utils/validaciones.js";
import { formatearPrecio } from "../utils/formato.js";

function FormularioReserva({ turno, onReservar, deshabilitado = false }) {
  const [equipo, setEquipo] = useState("");
  const [celular, setCelular] = useState("");
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  async function enviar(evento) {
    evento.preventDefault();
    const encontrados = validarReserva({ equipo, celular });
    setErrores(encontrados);

    if (Object.keys(encontrados).length > 0) {
      return;
    }

    const confirmado = await onReservar({
      equipo: equipo.trim(),
      celular: celular.trim(),
    });
   

    if (confirmado === false) {
      return;
    }

    setMensaje("¡Turno reservado!");
    setEquipo("");
    setCelular("");
  }

  return (
    <form onSubmit={enviar} noValidate className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="mb-2 text-xl font-bold">Reserva tu cupo</h2>

      {mensaje && <p className="mb-2 font-bold text-green-700">{mensaje}</p>}

      <p className="mb-4 text-lg text-blue-600 font-bold">
        {turno
          ? `${turno.cancha} . ${turno.hora.replace("p.m", "pm").replace("a.m", "am")} . ${formatearPrecio(turno.precio)}`
          : "Elige una clase con el botón Reservar."}
      </p>

      <label htmlFor="equipo" className="mb-1 block font-bold">
        Nombre del equipo
      </label>
      <input
        id="equipo"
        value={equipo}
        onChange={(evento) => setEquipo(evento.target.value)}
        className="w-full rounded-md border border-slate-300 px-3 py-2"
        placeholder="Escribe aqui nombre de tu equipo."
      />
      {errores.equipo && <p className="mt-1 text-sm text-red-600">{errores.equipo}</p>}

      <label htmlFor="celular" className="mt-4 mb-1 block font-bold">
        Celular
      </label>
      <input
        id="celular"
        type="tel"
        value={celular}
        onChange={(evento) => setCelular(evento.target.value)}
        className="w-full rounded-md border border-slate-300 px-3 py-2"
        placeholder="Escribe tu numero de celular"
      />
      {errores.celular && <p className="mt-1 text-sm text-red-600">{errores.celular}</p>}

      <button
        type="submit"
        disabled={deshabilitado}
        className="mt-4 w-full cursor-pointer rounded-md bg-orange-600 py-2 font-bold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {deshabilitado ? "Ocupado" : "Reservar"}
      </button>
    </form>
  );
}

export default FormularioReserva;