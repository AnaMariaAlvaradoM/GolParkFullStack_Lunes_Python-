
import { useEffect, useState } from "react";
import { listarReservas } from "../services/reservasService.js";
import ListaReservas from "../components/ListaReservas.jsx";
import { mensajeDeError } from "../utils/errores.js";

function MisReservas() {
  const [reservas, setReservas] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await listarReservas();
        setReservas(datos);
      } catch (error) {
        setError(mensajeDeError(error));
      }
    }

    cargar();
  }, []);

  if (error) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 p-4 font-semibold text-red-700">
        {error}
      </p>
    );
  }

  if (reservas === null) {
    return (
      <p className="rounded-lg bg-white p-4 text-slate-600 shadow-sm">
        Cargando reservas...
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-6xl py-6">
      <div className="mb-6 border-b border-green-200 pb-4">
        <h2 className="text-3xl font-extrabold text-green-900">
          Mis reservas
        </h2>

        <p className="mt-2 text-slate-600">
          Consulta los turnos que has reservado con tu equipo.
        </p>
      </div>

      <ListaReservas reservas={reservas} />
    </section>
  );
}

export default MisReservas;
