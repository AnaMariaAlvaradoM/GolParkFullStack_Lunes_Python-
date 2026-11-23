import { useEffect, useState } from "react";
import { listarReservas } from "../services/reservasService.js";
import ListaReservas from "../components/ListaReservas.jsx";

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listarReservas()
      .then((datos) => {
        setReservas(datos);
        setCargando(false);
      })
      .catch(() => {
        setError("No pudimos conectar con el servidor. Intenta más tarde.");
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div className="text-center py-12 text-gray-500 font-medium">
        <p>Cargando reservas...</p>
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
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Mis reservas</h2>
      <ListaReservas reservas={reservas} />
    </div>
  );
}
