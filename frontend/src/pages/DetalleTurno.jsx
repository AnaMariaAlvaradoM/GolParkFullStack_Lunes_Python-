import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import FormularioReserva from "../components/FormularioReserva.jsx";
import { obtenerTurno } from "../services/turnosService.js";
import { crearReserva } from "../services/reservasService.js";
import { formatearPrecio } from "../utils/formato.js";
import { mensajeDeError } from "../utils/errores.js";

function DetalleTurno() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [turno, setTurno] = useState(null);
  const [error, setError] = useState("");
  const [errorReserva, setErrorReserva] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await obtenerTurno(id);
        setTurno(datos);
      } catch (falla) {
        setError(mensajeDeError(falla));
      }
    }
    cargar();
  }, [id]);

  async function reservar(datos) {
    setErrorReserva("");
    try {
      await crearReserva({ ...datos, turno_id: turno.id });
      navigate("/mis-reservas");
      return true;
    } catch (falla) {
      setErrorReserva(mensajeDeError(falla));
      return false;
    }
  }

  if (error) {
    return <p className="text-center font-bold text-red-600">{error}</p>;
  }

  if (turno === null) {
    return <p className="text-center text-[#6b7570]">Cargando turno...</p>;
  }

  return (
    <section className="mx-auto max-w-md rounded-xl bg-white p-5 shadow-md">
      <Link to="/turnos" className="text-sm font-semibold text-[#146c43] underline">
        ← Todos los turnos
      </Link>
      <h2 className="mt-3 text-2xl font-bold text-[#146c43]">{turno.cancha}</h2>
      <p>Hora: {turno.hora}</p>
      <p className="mb-4">Precio: {formatearPrecio(turno.precio)}</p>
      {errorReserva && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 font-semibold text-red-600">{errorReserva}</p>
      )}
      <FormularioReserva onReservar={reservar} deshabilitado={!turno.disponible} />
    </section>
  );
}

export default DetalleTurno;