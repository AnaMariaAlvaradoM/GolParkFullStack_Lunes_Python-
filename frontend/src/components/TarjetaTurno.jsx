import { formatearPrecio } from "../utils/formato.js";

function TarjetaTurno({ turno, onReservar }) {
  return (
    <article
      className={`surface-card group flex w-full max-w-[340px] flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(26,47,34,0.12)] ${
        turno.disponible ? "" : "opacity-75"
      }`}
    >
      <div className="relative h-36 overflow-hidden bg-[#153622]">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#315d3b,#11281c)]" />
        <div aria-hidden="true" className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=70')", backgroundPosition: "center 55%", backgroundSize: "cover" }} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b1c13]/85 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
          <span className="font-display text-2xl font-bold">{turno.cancha}</span>
          <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${turno.disponible ? "bg-[#d9f99d] text-[#183b2a]" : "bg-white/20 text-white"}`}>
            {turno.disponible ? "Disponible" : "Ocupado"}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between border-b border-[#edf0ed] pb-4">
          <span className="text-sm text-[#7b887e]">Horario</span>
          <span className="font-semibold text-[#263b2d]">{turno.hora}</span>
        </div>
        <div className="flex items-center justify-between py-4">
          <span className="text-sm text-[#7b887e]">Precio del turno</span>
          <span className="font-display text-lg font-bold text-[#183b2a]">{formatearPrecio(turno.precio)}</span>
        </div>
        <button
          type="button"
          disabled={!turno.disponible}
          onClick={() => onReservar(turno.id)}
          className="mt-auto flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#198650] px-4 py-3 font-bold text-white transition hover:bg-[#126b3f] disabled:cursor-not-allowed disabled:bg-[#e8ece8] disabled:text-[#87928a]"
        >
          {turno.disponible ? "Reservar" : "Ocupado"}
          {turno.disponible && <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>}
        </button>
      </div>
    </article>
  );
}

export default TarjetaTurno;