import { Link } from "react-router";

function Inicio() {
  return (
    <section className="mx-auto max-w-xl py-10 text-center">
      <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-green-900">
        Reserva tu cancha en segundos
      </h2>

      <p className="mb-6 text-slate-600">
        Consulta los horarios disponibles y reserva tu cancha para disfrutar el partido con tu equipo.
      </p>

      <Link
        to="/turnos"
        className="rounded-md bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700"
      >
        Ver los turnos
      </Link>
    </section>
  );
}

export default Inicio;