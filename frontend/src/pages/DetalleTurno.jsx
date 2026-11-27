
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
      } catch (error) {
        setError(mensajeDeError(error));
      }
    }

    cargar();
  }, [id]);

  async function confirmar(datos) {
    try {
      await crearReserva({
        ...datos,
        turno_id: turno.id,
      });

      navigate("/mis-reservas");
      return true;
    } catch (error) {
      setErrorReserva(mensajeDeError(error));
      return false;
    }
  }

  if (error) {
    return <p className="font-bold text-red-600">{error}</p>;
  }

  if (turno === null) {
    return <p className="text-slate-600">Cargando turno...</p>;
  }

  return (
    <section className="mx-auto max-w-6xl py-6">
      <Link
        to="/turnos"
        className="text-sm font-bold text-green-700 underline hover:text-green-900"
      >
        ← Todos los turnos
      </Link>

      <h2 className="mt-3 text-2xl font-bold">{turno.cancha}</h2>

      <p>Hora: {turno.hora}</p>
      <p>Precio: {formatearPrecio(turno.precio)}</p>

      {errorReserva && (
        <p className="my-3 font-bold text-red-600">{errorReserva}</p>
      )}

      <FormularioReserva
        key={turno.id}
        turno={turno}
        onReservar={confirmar}
        deshabilitado={!turno.disponible}
      />
    </section>
  );
}

export default DetalleTurno;
