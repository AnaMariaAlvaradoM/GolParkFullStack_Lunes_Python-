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
    return <p className="text-center font-bold text-red-600">{error}</p>;
  }

  if (turnos === null) {
    return <p className="text-center text-[#6b7570]">Cargando turnos...</p>;
  }

  return (
    <section>
      <h2 className="mb-6 text-center text-2xl font-bold">Turnos de hoy</h2>
      <ListaTurnos turnos={turnos} onReservar={(id) => navigate(`/turnos/${id}`)} />
    </section>
  );
}

export default Turnos;