import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import FormularioReserva from "../components/FormularioReserva";
import { crearReserva } from "../services/reservasService";
import { obtenerTurno } from "../services/turnosService";
import { obtenerMensajeError } from "../utils/errorApi";
import { formatearPrecio } from "../utils/formato";

export default function DetalleTurno() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [turno, setTurno] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [errorReserva, setErrorReserva] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarTurno() {
      setCargando(true);
      setErrorCarga("");
      try {
        const data = await obtenerTurno(id);
        if (activo) {
          setTurno(data);
        }
      } catch (err) {
        if (activo) {
          setErrorCarga(obtenerMensajeError(err));
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarTurno();
    return () => {
      activo = false;
    };
  }, [id]);

  async function manejarReserva(datos) {
    setErrorReserva("");
    try {
      await crearReserva({ ...datos, turno_id: turno.id });
      navigate("/mis-reservas");
      return true;
    } catch (err) {
      setErrorReserva(obtenerMensajeError(err));
      return false;
    }
  }

  if (cargando) {
    return <p>Cargando turno...</p>;
  }

  if (!turno) {
    return (
      <main>
        <p role="alert">{errorCarga || "Ese turno no existe."}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>{turno.cancha}</h1>
      <p>Hora: {turno.hora}</p>
      <p>Precio: {formatearPrecio(turno.precio)}</p>
      {errorCarga && <p role="alert">{errorCarga}</p>}
      {errorReserva && <p role="alert">{errorReserva}</p>}
      <FormularioReserva
        deshabilitado={!turno.disponible}
        onSubmit={manejarReserva}
      />
    </main>
  );
}