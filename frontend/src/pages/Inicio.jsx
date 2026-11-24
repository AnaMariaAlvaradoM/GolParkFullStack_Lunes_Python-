import { Link } from 'react-router';

export default function Inicio() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-emerald-950 px-6 py-12 text-white shadow-2xl shadow-emerald-950/15 sm:px-10 sm:py-16 lg:px-14">
      <div className="absolute -right-20 -top-24 -z-10 size-80 rounded-full bg-lime-300/10 blur-3xl" />
      <div className="absolute -bottom-28 right-20 -z-10 size-72 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-lime-200">
            <span className="size-2 rounded-full bg-lime-300" />
            Fútbol 5 · Canchas sintéticas
          </p>
          <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Reserva tu cancha en segundos
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-emerald-100/80 sm:text-lg">
            Reúne a tu equipo, elige el horario y prepárate para jugar. Encontrar tu próximo turno nunca fue tan fácil.
          </p>
          <Link
            to="/turnos"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-lime-300 px-6 py-3.5 font-bold text-emerald-950 shadow-lg shadow-lime-950/20 transition hover:-translate-y-0.5 hover:bg-lime-200 focus:outline-none focus:ring-4 focus:ring-lime-200/40"
          >
            Ver turnos disponibles
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div aria-hidden="true" className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
          <span className="absolute left-[12%] top-[18%] rotate-[-12deg] text-7xl transition-transform duration-300 hover:rotate-0">⚽</span>
          <span className="absolute right-[12%] top-[24%] rotate-[10deg] text-6xl">🥅</span>
          <span className="absolute bottom-[18%] left-[27%] rotate-[-8deg] text-6xl">🏆</span>
          <span className="absolute bottom-[22%] right-[20%] rotate-[12deg] text-6xl">👟</span>
        </div>
      </div>
    </section>
  );
}