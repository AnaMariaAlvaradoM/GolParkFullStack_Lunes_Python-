import { NavLink } from "react-router";

function claseEnlace({ isActive }) {
  return isActive
    ? "bg-[#d9f99d] text-[#173c2a] shadow-[0_6px_20px_rgba(217,249,157,0.2)]"
    : "text-white/70 hover:bg-white/10 hover:text-white";
}

function Encabezado() {
  return (
    <header className="relative z-10 border-b border-white/10 bg-[#10251b] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-4 sm:px-8 md:flex-row md:items-center md:justify-between">
        <NavLink to="/" end className="flex items-center gap-3 self-start no-underline">
          <span className="grid size-11 place-items-center rounded-2xl bg-[#d9f99d] text-[#183b2a] shadow-[0_8px_24px_rgba(217,249,157,0.16)]">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6">
              <path d="M12 2.8 20 7v10l-8 4.2L4 17V7l8-4.2Z" stroke="currentColor" strokeWidth="1.7" />
              <path d="m12 8.2 2.2 1.6-.8 2.6h-2.8l-.8-2.6L12 8.2Zm0-5.4 2.2 5.4m5.8-1.2-5.8 2.8m4.7 7.2-4.7-4.6M4 17l5.8-4.6M4 7l5.8 2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>
            <span className="font-display block text-xl font-bold tracking-tight text-white">GolPark<span className="text-[#b8ed6f]">.</span></span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Fútbol · Comunidad · Juego</span>
          </span>
        </NavLink>
        <nav aria-label="Navegación principal" className="flex flex-wrap items-center gap-1 text-sm font-semibold">
          <NavLink to="/" end className={({ isActive }) => `rounded-full px-4 py-2.5 transition ${claseEnlace({ isActive })}`}>Inicio</NavLink>
          <NavLink to="/turnos" className={({ isActive }) => `rounded-full px-4 py-2.5 transition ${claseEnlace({ isActive })}`}>Turnos</NavLink>
          <NavLink to="/mis-reservas" className={({ isActive }) => `rounded-full px-4 py-2.5 transition ${claseEnlace({ isActive })}`}>Mis reservas</NavLink>
          <NavLink to="/login" className={({ isActive }) => `ml-1 rounded-full border border-white/20 px-4 py-2.5 transition ${claseEnlace({ isActive })}`}>Ingresar <span aria-hidden="true">↗</span></NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Encabezado;