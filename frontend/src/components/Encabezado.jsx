import { NavLink } from "react-router";

function claseEnlace({ isActive }) {
  return `rounded-full px-4 py-2 text-sm font-[family-name:Oswald,sans-serif] uppercase tracking-[0.14em] ${
    isActive
      ? "bg-amber-400 text-emerald-950 shadow-lg shadow-amber-500/30"
      : "text-emerald-50 hover:bg-white/10 hover:text-amber-300"
  }`;
}

function Encabezado() {
  return (
    <header className="border-b-4 border-amber-400 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <NavLink to="/" end className="flex items-center gap-3" aria-label="Ir al inicio de GolPark">
          <span className="relative grid h-12 w-12 place-items-center rounded-full bg-white shadow-inner">
            <span className="absolute h-9 w-9 rounded-full border-2 border-emerald-800" />
            <span className="absolute h-9 w-1.5 rotate-12 bg-emerald-800" />
            <span className="relative text-[11px] font-black text-emerald-950">GP</span>
          </span>
          <span>
            <h1 className="font-[family-name:Oswald,sans-serif] text-3xl uppercase leading-none tracking-[0.08em] text-white">
              GolPark
            </h1>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.28em] text-amber-300">
              Fútbol 5
            </span>
          </span>
        </NavLink>

        <nav className="flex flex-wrap items-center gap-1" aria-label="Navegación principal">
          <NavLink to="/" end className={claseEnlace}>Inicio</NavLink>
          <NavLink to="/turnos" className={claseEnlace}>Turnos</NavLink>
          <NavLink to="/mis-reservas" className={claseEnlace}>Mis reservas</NavLink>
          <NavLink to="/login" className={claseEnlace}>Ingresar</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Encabezado;
