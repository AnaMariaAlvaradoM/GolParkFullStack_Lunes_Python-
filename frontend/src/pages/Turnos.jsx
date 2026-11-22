import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ListaTurnos from "../components/ListaTurnos.jsx";
import { listarTurnos } from "../services/turnosService.js";

function Turnos() {
  const [turnos, setTurnos] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await listarTurnos();
        setTurnos(datos);
      } catch {
        setError("No pudimos conectar con el servidor. Intenta más tarde.");
      }
    }

    cargar();
  }, []);

  if (error) {
    return <p className="font-bold text-red-600">{error}</p>;
  }

  if (turnos === null) {
    return <p className="text-slate-600">Cargando turnos...</p>;
  }

  return (
    <section className="mx-auto max-w-6xl py-6">
  <h2 className="mb-6 text-3xl font-extrabold text-green-900">
    Turnos de hoy
  </h2>

  <ListaTurnos
    turnos={turnos}
    onReservar={(id) => navigate(`/turnos/${id}`)}
  />
</section>
  );
}

export default Turnos;