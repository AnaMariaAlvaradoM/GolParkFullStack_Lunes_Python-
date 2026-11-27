import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ListaTurnos from "../components/ListaTurnos";
import { listarTurnos } from "../services/turnosService";
import { obtenerMensajeError } from "../utils/errorApi";

export default function Turnos() {
  const navigate = useNavigate();
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargar() {
      setCargando(true);
      setError("");
      try {
        const data = await listarTurnos();
        if (activo) {
          setTurnos(data);
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

    cargar();
    return () => {
      activo = false;
    };
  }, []);

  if (cargando) {
    return <p className="text-slate-600">Cargando turnos...</p>;
  }

  return (
    <main>
      <h1 className="mb-4 text-xl font-bold">Turnos de hoy</h1>
      {error && <p role="alert">{error}</p>}
      <ListaTurnos
        turnos={turnos}
        onReservar={(id) => navigate(`/turnos/${id}`)}
      />
    </main>
  );
}