import { Link } from "react-router";

export default function Inicio() {
  return (
    <div className="text-center py-12 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
        Reserva tu cancha en segundos
      </h2>
      <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        Consulta la disponibilidad en tiempo real, asegura el horario de tu equipo y juega en las mejores canchas sintéticas de fútbol 5.
      </p>
      <Link
        to="/turnos"
        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg px-8 py-3 rounded-xl shadow-md transition"
      >
        Ver turnos de hoy
      </Link>
    </div>
  );
}
