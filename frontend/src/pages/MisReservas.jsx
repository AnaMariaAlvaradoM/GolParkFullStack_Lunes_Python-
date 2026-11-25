import { useEffect, useState } from "react";
import ListaReservas from "../components/ListaReservas.jsx";
import { listarReservas } from "../services/reservasService.js";
import { mensajeDeError } from "../utils/errores.js";

function MisReservas() {
  const [reservas, setReservas] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await listarReservas();
        setReservas(datos);
      } catch (falla) {
        setError(mensajeDeError(falla));
      }
    }
    cargar();
  }, []);

  if (error) {
    return <p role="alert" className="surface-card mx-auto max-w-2xl p-6 text-center font-semibold text-red-700">{error}</p>;
  }

  if (reservas === null) {
    return <p className="surface-card mx-auto max-w-2xl animate-pulse p-6 text-center text-[#6b7570]">Cargando reservas...</p>;
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-7">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#198650]">Tu actividad</p>
        <h2 className="font-display text-4xl font-bold tracking-tight text-[#183b2a]">Mis reservas</h2>
        <p className="mt-2 text-[#77847a]">Aquí tienes los próximos partidos de tu equipo.</p>
      </div>
      <ListaReservas reservas={reservas} />
    </section>
  );
}

export default MisReservas;