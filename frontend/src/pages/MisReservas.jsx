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
    return <p className="text-center font-bold text-red-600">{error}</p>;
  }

  if (reservas === null) {
    return <p className="text-center text-[#6b7570]">Cargando reservas...</p>;
  }

  return (
    <section className="mx-auto max-w-xl">
      <h2 className="mb-4 text-center text-2xl font-bold">Mis reservas</h2>
      <ListaReservas reservas={reservas} />
    </section>
  );
}

export default MisReservas;