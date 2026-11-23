import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { listarTurnos } from "../services/turnosService.js";
import ListaTurnos from "../components/ListaTurnos.jsx";

export default function Turnos() {
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    listarTurnos()
      .then((datos) => {
        setTurnos(datos);
        setCargando(false);
      })
      .catch(() => {
        setError("No pudimos conectar con el servidor. Intenta más tarde.");
        setCargando(false);
      });
  }, []);

  const handleReservar = (id) => {
    navigate(`/turnos/${id}`);
  };

  if (cargando) {
    return (
      <div className="text-center py-12 text-gray-500 font-medium">
        <p>Cargando turnos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center font-medium max-w-xl mx-auto my-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Turnos de hoy</h2>
      <ListaTurnos turnos={turnos} onReservar={handleReservar} />
    </div>
  );
}
