import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import FormularioReserva from "../components/FormularioReserva.jsx";
import { crearReserva } from "../services/reservasService";
import { obtenerTurno } from "../services/turnosService";
import { formatearPrecio } from "../utils/formato.js";
import { mensajeDeError } from "../utils/errores.js";

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
        if (activo) setTurno(data);
      } catch (err) {
        if (activo) setErrorCarga(mensajeDeError(err));
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarTurno();
    return () => { activo = false; };
  }, [id]);

  async function manejarReserva(datos) {
    setErrorReserva("");
    try {
      await crearReserva({ ...datos, turno_id: turno.id });
      navigate("/mis-reservas");
      return true;
    } catch (err) {
      setErrorReserva(mensajeDeError(err));
      return false;
    }
  }

  if (cargando) {
    return (
      <div className="grid min-h-[420px] place-items-center">
        <div className="rounded-3xl border border-amber-300/40 bg-black/50 px-8 py-6 text-center">
          <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-4 border-emerald-800 border-t-amber-400" />
          <p className="mt-4 font-[family-name:Oswald,sans-serif] text-xl uppercase tracking-wider text-amber-200">
            Cargando turno...
          </p>
        </div>
      </div>
    );
  }

  if (!turno) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border-l-8 border-red-500 bg-red-950/80 px-6 py-8 text-center">
        <p className="font-[family-name:Oswald,sans-serif] text-sm uppercase tracking-[0.3em] text-red-300">Tarjeta roja</p>
        <p role="alert" className="mt-3 font-[family-name:Oswald,sans-serif] text-3xl uppercase text-white">
          {errorCarga || "Ese turno no existe."}
        </p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white text-emerald-950 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-96 overflow-hidden bg-emerald-900">
          <img
            src="https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=1200&q=85"
            alt="Cancha sintética de fútbol"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="font-[family-name:Oswald,sans-serif] text-xs uppercase tracking-[0.3em] text-amber-300">
              Ficha del partido
            </p>
            <h2 className="mt-1 font-[family-name:Oswald,sans-serif] text-5xl uppercase text-white">{turno.cancha}</h2>
          </div>
        </div>

        <div className="bg-[linear-gradient(180deg,#f7faf4_0%,#ffffff_40%)] p-6 sm:p-8 lg:p-10">
          <p className="font-[family-name:Oswald,sans-serif] text-xs uppercase tracking-[0.28em] text-emerald-700">
            Alineación de la reserva
          </p>
          <p className="mt-4 text-lg font-bold text-emerald-950">{`Hora: ${turno.hora}`}</p>
          <p className="mt-1 font-[family-name:Oswald,sans-serif] text-3xl tracking-wide text-emerald-700">
            {`Precio: ${formatearPrecio(turno.precio)}`}
          </p>
          {errorCarga && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 font-bold text-red-700">{errorCarga}</p>}
          {errorReserva && <p role="alert" className="mt-4 rounded-xl border-l-4 border-red-600 bg-red-50 px-4 py-3 font-bold text-red-700">{errorReserva}</p>}
          <div className="mt-7 border-t border-emerald-100 pt-7">
            <FormularioReserva deshabilitado={!turno.disponible} onSubmit={manejarReserva} />
          </div>
        </div>
      </div>
    </section>
  );
}
""