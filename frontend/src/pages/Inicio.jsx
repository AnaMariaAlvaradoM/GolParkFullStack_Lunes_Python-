import { Link } from "react-router";

function Inicio() {
  return (
    <section className="animate-rise-in">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#10251b] text-white shadow-[0_28px_80px_rgba(16,37,27,0.2)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=2000&q=85')" }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b1c13] via-[#10251b]/90 to-[#10251b]/35" />
        <div aria-hidden="true" className="absolute -right-20 -top-32 -z-10 size-96 rounded-full border border-white/10" />
        <div aria-hidden="true" className="absolute -right-4 -top-16 -z-10 size-64 rounded-full border border-white/10" />
        <div className="grid min-h-[510px] items-center gap-10 px-7 py-12 sm:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-16">
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d9f99d] backdrop-blur">
              <span className="size-2 rounded-full bg-[#b8ed6f] shadow-[0_0_14px_#b8ed6f]" />
              Tu próximo partido empieza aquí
            </p>
            <h2 className="font-display mb-5 text-5xl font-bold leading-[1.04] tracking-[-0.05em] sm:text-6xl lg:text-7xl">Reserva tu cancha en segundos<span className="text-[#b8ed6f]">.</span></h2>
            <p className="mb-8 max-w-lg text-base leading-7 text-white/70 sm:text-lg">
              Mira los turnos de hoy y aparta tu cancha antes de que otro equipo lo haga. La cancha te espera.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/turnos" className="group inline-flex items-center gap-3 rounded-full bg-[#d9f99d] px-6 py-3.5 font-bold text-[#183b2a] shadow-[0_12px_30px_rgba(184,237,111,0.2)] transition hover:-translate-y-0.5 hover:bg-white">
                Ver los turnos <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <span className="text-sm text-white/55"><span className="mr-2 text-[#b8ed6f]">✦</span>Reserva rápida, juego asegurado</span>
            </div>
          </div>
          <div className="hidden justify-self-end lg:block">
            <div className="w-64 rounded-3xl border border-white/15 bg-[#10251b]/55 p-5 shadow-2xl backdrop-blur-xl">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">La experiencia</span>
                <span className="grid size-9 place-items-center rounded-xl bg-[#d9f99d] text-lg text-[#183b2a]">✦</span>
              </div>
              <p className="font-display text-4xl font-bold tracking-tight">100<span className="text-[#b8ed6f]">%</span></p>
              <p className="mt-1 text-sm text-white/60">Pasión por el fútbol</p>
              <div className="my-5 h-px bg-white/15" />
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <span className="grid size-8 place-items-center rounded-full border-2 border-[#183426] bg-[#f2b989] text-xs">⚽</span>
                  <span className="grid size-8 place-items-center rounded-full border-2 border-[#183426] bg-[#acd5b7] text-xs">⚽</span>
                  <span className="grid size-8 place-items-center rounded-full border-2 border-[#183426] bg-[#f5d485] text-xs">⚽</span>
                </div>
                <span className="text-xs leading-4 text-white/65">Un lugar para<br />tu equipo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { icon: "◷", title: "Turnos flexibles", detail: "Encuentra el horario ideal" },
          { icon: "⌖", title: "Canchas de calidad", detail: "Espacios listos para jugar" },
          { icon: "⚡", title: "Reserva en minutos", detail: "Tu equipo, un solo clic" },
        ].map((item) => (
          <article key={item.title} className="surface-card flex items-center gap-4 px-5 py-4 transition hover:-translate-y-1 hover:shadow-lg">
            <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#edf6e9] text-xl text-[#198650]">{item.icon}</span>
            <span><span className="block font-bold text-[#1c3023]">{item.title}</span><span className="mt-0.5 block text-sm text-[#7b887e]">{item.detail}</span></span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Inicio;