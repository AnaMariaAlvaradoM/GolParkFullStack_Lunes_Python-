import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { obtenerTurno } from "../services/turnosService.js";
import { crearReserva } from "../services/reservasService.js";
import { formatearPrecio } from "../utils/formato.js";
import FormularioReserva from "../components/FormularioReserva.jsx";

export default function DetalleTurno() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [turno, setTurno] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [errorReserva, setErrorReserva] = useState(null);

  useEffect(() => {
    obtenerTurno(id)
      .then((datos) => {
        setTurno(datos);
        setCargando(false);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setErrorCarga("Ese turno no existe.");
        } else {
          setErrorCarga("No pudimos conectar con el servidor. Intenta más tarde.");
        }
        setCargando(false);
      });
  }, [id]);

  const handleReservar = async (datos) => {
    setErrorReserva(null);
    try {
      await crearReserva({
        ...datos,
        turno_id: turno.id,
      });
      navigate("/mis-reservas");
      return true;
    } catch (err) {
      if (err.response?.status === 409) {
        setErrorReserva(err.response.data?.detail || "Ese turno ya está ocupado.");
      } else if (err.code === "ERR_NETWORK" || !err.response) {
        setErrorReserva("No pudimos conectar con el servidor. Intenta más tarde.");
      } else if (err.response?.status === 404) {
        setErrorReserva("Ese turno no existe.");
      } else {
        setErrorReserva(err.response?.data?.detail || "Ocurrió un error inesperado. Intenta de nuevo.");
      }
      return false;
    }
  };

  if (cargando) {
    return (
      <div className="text-center py-12 text-gray-500 font-medium">
        <p>Cargando turno...</p>
      </div>
    );
  }

  if (errorCarga) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl text-center font-medium max-w-xl mx-auto my-8">
        <p>{errorCarga}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">{turno.cancha}</h2>
        <p className="text-gray-600 font-medium">Hora: {turno.hora}</p>
        <p className="text-emerald-700 font-semibold text-xl">
          Precio: {formatearPrecio(turno.precio)}
        </p>
      </div>

      {errorReserva && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center font-medium">
          <p>{errorReserva}</p>
        </div>
      )}

      <FormularioReserva
        deshabilitado={!turno.disponible}
        onReservar={handleReservar}
      />
    </div>
  );
}
