import { Link } from "react-router";

function Inicio() {
  return (
    <section className="mx-auto max-w-xl py-10 text-center">
      <h2 className="mb-3 text-3xl font-bold">Reserva tu cancha en segundos</h2>
      <p className="mb-6 text-[#6b7570]">
        Mira los turnos de hoy y aparta tu cancha antes de que otro equipo lo haga.
      </p>
      <Link
        to="/turnos"
        className="rounded-lg bg-[#2fb36d] px-5 py-3 font-semibold text-white hover:bg-[#146c43]"
      >
        Ver los turnos
      </Link>
    </section>
  );
}

export default Inicio;