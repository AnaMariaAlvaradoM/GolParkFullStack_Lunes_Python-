import { useState } from "react";

export default function FormularioReserva({ deshabilitado = false, onSubmit }) {
  const [equipo, setEquipo] = useState("");
  const [celular, setCelular] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (deshabilitado || enviando) return;

    setEnviando(true);
    try {
      const ok = await onSubmit({ equipo, celular });
      if (ok) {
        setEquipo("");
        setCelular("");
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
          onChange={(e) => setEquipo(e.target.value)}
          disabled={deshabilitado || enviando}
          required
        />
      </div>

      <div>
        <label htmlFor="celular">Celular</label>
        <input
          id="celular"
          name="celular"
          type="text"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          disabled={deshabilitado || enviando}
          required
        />
      </div>

      <button type="submit" disabled={deshabilitado || enviando}>
        {deshabilitado ? "Ocupado" : enviando ? "Reservando..." : "Reservar"}
      </button>
    </form>
  );
}