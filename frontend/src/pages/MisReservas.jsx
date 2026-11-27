import { useEffect, useState } from "react";
import ListaReservas from "../components/ListaReservas";
import { listarReservas } from "../services/reservasService";
import { obtenerMensajeError } from "../utils/errorApi";

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarReservas() {
      setCargando(true);
      setError("");
      try {
        const data = await listarReservas();
        if (activo) {
          setReservas(data);
        }
      } catch (err) {
        if (activo) {
          setError(obtenerMensajeError(err));
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarReservas();
    return () => {
      activo = false;
    };
  }, []);

  if (cargando) {
    return <p>Cargando reservas...</p>;
  }

  return (
    <main>
      <h1>Mis reservas</h1>
      {error && <p role="alert">{error}</p>}
      <ListaReservas reservas={reservas} />
    </main>
  );
}