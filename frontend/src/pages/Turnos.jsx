import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ListaTurnos from "../components/ListaTurnos.jsx";
import { listarTurnos } from "../services/turnosService.js";
import { mensajeDeError } from "../utils/errores.js";

function Turnos() {
  const navigate = useNavigate();
  const [turnos, setTurnos] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await listarTurnos();
        setTurnos(datos);
      } catch (falla) {
        setError(mensajeDeError(falla));
      }
    }
    cargar();
  }, []);

  if (error) {
    return <p role="alert" className="surface-card mx-auto max-w-2xl p-6 text-center font-semibold text-red-700">{error}</p>;
  }

  if (turnos === null) {
    return <p className="surface-card mx-auto max-w-2xl animate-pulse p-6 text-center text-[#6b7570]">Cargando turnos...</p>;
  }

  return (
    <section>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#198650]">Elige tu próximo partido</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#183b2a]">Turnos de hoy</h2>
          <p className="mt-2 text-[#77847a]">Encuentra un horario y reúne a tu equipo.</p>
        </div>
        <span className="inline-flex items-center gap-2 self-start rounded-full border border-[#dfe8df] bg-white px-4 py-2 text-sm font-semibold text-[#526257] sm:self-auto">
          <span className="size-2 rounded-full bg-[#24a15e]" /> Horarios actualizados
        </span>
      </div>
      <ListaTurnos turnos={turnos} onReservar={(id) => navigate(`/turnos/${id}`)} />
    </section>
  );
}

export default Turnos;