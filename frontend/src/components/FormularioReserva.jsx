import { useState } from "react";
import { validarReserva } from "../utils/validaciones";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="equipo">Nombre del equipo</label>
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
        />
        {errores.equipo && <p role="alert">{errores.equipo}</p>}
      </div>

      <div>
        <label htmlFor="celular">Celular</label>
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
        />
        {errores.celular && <p role="alert">{errores.celular}</p>}
      </div>

      <button type="submit" disabled={deshabilitado || enviando}>
        {deshabilitado ? "Ocupado" : enviando ? "Reservando..." : "Reservar"}
      </button>
      {confirmado && <p>¡Turno reservado!</p>}
    </form>
  );
}