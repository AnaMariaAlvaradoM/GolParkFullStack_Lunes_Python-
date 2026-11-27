import { Link } from "react-router";

export default function Inicio() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/15 bg-black/40 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
      <div className="grid md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative flex flex-col justify-center px-7 py-10 sm:px-12 lg:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(250,204,21,0.16),transparent_28%),linear-gradient(160deg,#145c32_0%,#062214_70%)]" />
          <div className="relative">
            <p className="font-[family-name:Oswald,sans-serif] text-sm uppercase tracking-[0.35em] text-amber-300">
              Jornada de hoy
            </p>
            <h2 className="mt-3 max-w-xl font-[family-name:Oswald,sans-serif] text-4xl uppercase leading-[0.95] tracking-wide text-white sm:text-5xl lg:text-6xl">
              Reserva tu cancha en segundos
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-emerald-50/85">
              Elige horario, arma tu equipo y sal al verde sin filas ni llamadas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/turnos"
                className="rounded-full bg-amber-400 px-6 py-3 font-[family-name:Oswald,sans-serif] text-lg uppercase tracking-wider text-emerald-950 shadow-lg shadow-amber-500/30 hover:bg-amber-300"
              >
                Ver turnos
              </Link>
              <Link
                to="/mis-reservas"
                className="rounded-full border border-white/30 px-6 py-3 font-[family-name:Oswald,sans-serif] text-lg uppercase tracking-wider text-white hover:border-amber-300 hover:text-amber-300"
              >
                Mis reservas
              </Link>
            </div>
          </div>
        </div>

        <div className="relative min-h-[320px] md:min-h-full">
          <img
            src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=85"
            alt="Cancha sintética de fútbol"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-emerald-950/55 p-5 backdrop-blur-md">
            <p className="font-[family-name:Oswald,sans-serif] text-xs uppercase tracking-[0.28em] text-amber-300">
              Cancha premium
            </p>
            <p className="mt-1 font-[family-name:Oswald,sans-serif] text-3xl uppercase text-white">
              Listos para el pitazo inicial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
