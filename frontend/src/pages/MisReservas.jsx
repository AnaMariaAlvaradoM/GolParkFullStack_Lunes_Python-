import { useEffect, useState } from "react";
import ListaReservas from "../components/ListaReservas";
import { listarReservas } from "../services/reservasService";
import { mensajeDeError } from "../utils/errores.js";

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
        if (activo) setReservas(data);
      } catch (err) {
        if (activo) setError(mensajeDeError(err));
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarReservas();
    return () => { activo = false; };
  }, []);

  if (cargando) {
    return (
      <div className="grid min-h-[420px] place-items-center">
        <p className="rounded-3xl border border-amber-300/40 bg-black/50 px-8 py-6 font-[family-name:Oswald,sans-serif] text-xl uppercase tracking-wider text-amber-200">
          Cargando reservas...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 overflow-hidden rounded-3xl border border-amber-300/30 bg-emerald-950/80">
        <div className="flex items-center justify-between bg-amber-400 px-6 py-2 font-[family-name:Oswald,sans-serif] text-sm uppercase tracking-[0.28em] text-emerald-950">
          <span>Plantilla</span>
          <span>GolPark</span>
        </div>
        <div className="px-6 py-6">
          <p className="font-[family-name:Oswald,sans-serif] text-xs uppercase tracking-[0.32em] text-lime-300">
            Vestuario
          </p>
          <h2 className="mt-1 font-[family-name:Oswald,sans-serif] text-5xl uppercase tracking-wide text-white">
            Mis reservas
          </h2>
        </div>
      </div>
      {error && (
        <p role="alert" className="mb-5 rounded-2xl border-l-8 border-red-500 bg-red-950/70 px-5 py-4 font-bold text-red-100">
          {error}
        </p>
      )}
      <ListaReservas reservas={reservas} />
    </div>
  );
}
