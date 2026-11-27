import { useState } from "react";
import { validarReserva } from "../utils/validaciones";

const campoClase =
  "mt-2 w-full rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-3.5 text-emerald-950 outline-none placeholder:text-emerald-800/40 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100";

export default function FormularioReserva({ deshabilitado = false, onReservar, onSubmit }) {
  const [equipo, setEquipo] = useState("");
  const [celular, setCelular] = useState("");
  const [errores, setErrores] = useState({});
  const [confirmado, setConfirmado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(evento) {
    evento.preventDefault();
    setConfirmado(false);
    if (deshabilitado || enviando) return;

    const nuevosErrores = validarReserva({ equipo, celular });
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    setEnviando(true);
    try {
      const reservar = onReservar || onSubmit;
      if (!reservar) return;
      const ok = await reservar({ equipo, celular });
      if (ok) {
        setEquipo("");
        setCelular("");
        setErrores({});
        setConfirmado(true);
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="equipo" className="block font-[family-name:Oswald,sans-serif] text-sm uppercase tracking-[0.16em] text-emerald-900">
          Nombre del equipo
        </label>
        <input
          id="equipo"
          name="equipo"
          type="text"
          value={equipo}
          onChange={(e) => {
            setEquipo(e.target.value);
            setConfirmado(false);
          }}
          disabled={deshabilitado || enviando}
          placeholder="Ej. Los Cracks"
          className={campoClase}
        />
        {errores.equipo && (
          <p role="alert" className="mt-2 text-sm font-bold text-red-600">
            {errores.equipo}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="celular" className="block font-[family-name:Oswald,sans-serif] text-sm uppercase tracking-[0.16em] text-emerald-900">
          Celular
        </label>
        <input
          id="celular"
          name="celular"
          type="text"
          value={celular}
          onChange={(e) => {
            setCelular(e.target.value);
            setConfirmado(false);
          }}
          disabled={deshabilitado || enviando}
          placeholder="3001234567"
          className={campoClase}
        />
        {errores.celular && (
          <p role="alert" className="mt-2 text-sm font-bold text-red-600">
            {errores.celular}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={deshabilitado || enviando}
        className="w-full rounded-full bg-emerald-700 px-5 py-3.5 font-[family-name:Oswald,sans-serif] text-lg uppercase tracking-wider text-amber-300 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
      >
        {deshabilitado ? "Ocupado" : enviando ? "Reservando..." : "Reservar"}
      </button>
      {confirmado && (
        <p className="rounded-2xl border border-lime-300 bg-lime-100 px-4 py-3 text-center font-black text-emerald-800">
          ¡Turno reservado!
        </p>
      )}
    </form>
  );
}
