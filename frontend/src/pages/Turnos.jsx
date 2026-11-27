import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ListaTurnos from "../components/ListaTurnos";
import { listarTurnos } from "../services/turnosService";
import { mensajeDeError } from "../utils/errores.js";

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
        if (activo) setTurnos(data);
      } catch (err) {
        if (activo) setError(mensajeDeError(err));
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargar();
    return () => { activo = false; };
  }, []);

  if (cargando) {
    return (
      <div className="grid min-h-[420px] place-items-center">
        <div className="rounded-3xl border border-amber-300/40 bg-black/50 px-8 py-6 text-center">
          <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-4 border-emerald-800 border-t-amber-400" />
          <p className="mt-4 font-[family-name:Oswald,sans-serif] text-xl uppercase tracking-wider text-amber-200">
            Cargando turnos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 overflow-hidden rounded-3xl border border-white/10 bg-black/45">
        <div className="h-2 bg-[repeating-linear-gradient(90deg,#fbbf24_0_18px,#052e16_18px_36px)]" />
        <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-[family-name:Oswald,sans-serif] text-xs uppercase tracking-[0.32em] text-amber-300">
              Programación
            </p>
            <h2 className="font-[family-name:Oswald,sans-serif] text-4xl uppercase tracking-wide text-white sm:text-5xl">
              Turnos de hoy
            </h2>
          </div>
          <p className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-bold text-lime-200">
            {turnos.filter((turno) => turno.disponible).length} horarios libres
          </p>
        </div>
      </div>

      {error && (
        <p role="alert" className="mb-5 rounded-2xl border-l-8 border-red-500 bg-red-950/70 px-5 py-4 font-bold text-red-100">
          {error}
        </p>
      )}
      <ListaTurnos
        turnos={turnos}
        onReservar={(id) => navigate(`/turnos/${id}`)}
      />
    </div>
  );
}
