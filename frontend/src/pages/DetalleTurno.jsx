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
    return <p role="alert" className="surface-card mx-auto max-w-2xl p-6 text-center font-semibold text-red-700">{error}</p>;
  }

  if (turno === null) {
    return <p className="surface-card mx-auto max-w-2xl animate-pulse p-6 text-center text-[#6b7570]">Cargando turno...</p>;
  }

  return (
    <section className="surface-card mx-auto max-w-3xl overflow-hidden">
      <div className="relative h-48 overflow-hidden bg-[#153622] sm:h-60">
        <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80')" }} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b1c13] to-transparent" />
        <Link to="/turnos" className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
          ← Todos los turnos
        </Link>
        <h2 className="font-display absolute bottom-5 left-6 text-3xl font-bold text-white sm:left-8 sm:text-4xl">{turno.cancha}</h2>
      </div>
      <div className="grid gap-8 p-6 sm:grid-cols-[0.85fr_1.15fr] sm:p-8">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#198650]">Detalles del turno</p>
          <div className="mb-3 rounded-2xl bg-[#f6f8f5] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#7b887e]">Horario</p>
            <p className="mt-1 text-lg font-bold text-[#263b2d]">Hora: {turno.hora}</p>
          </div>
          <div className="rounded-2xl bg-[#f6f8f5] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#7b887e]">Precio</p>
            <p className="mt-1 font-display text-2xl font-bold text-[#183b2a]">Precio: {formatearPrecio(turno.precio)}</p>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#198650]">Asegura tu partido</p>
      {errorReserva && (
        <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 font-semibold text-red-600">{errorReserva}</p>
      )}
      <FormularioReserva onReservar={reservar} deshabilitado={!turno.disponible} />
        </div>
      </div>
    </section>
  );
}

export default DetalleTurno;