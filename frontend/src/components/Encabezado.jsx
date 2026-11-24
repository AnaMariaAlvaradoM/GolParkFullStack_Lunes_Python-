import { NavLink } from 'react-router';
import LogoGolPark from './LogoGolPark';

function clasesDelEnlace({ isActive }) {
  return `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-lime-300 text-emerald-950'
      : 'text-emerald-50 hover:bg-white/10 hover:text-lime-200'
  }`;
}

export default function Encabezado() {
  return (
    <header className="shrink-0 border-b border-lime-300/20 bg-emerald-950 text-white shadow-lg">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <h1 className="group flex items-center gap-3 text-2xl font-black tracking-tight">
          <LogoGolPark />
          GolPark
        </h1>
        <nav className="flex flex-wrap gap-2" aria-label="Navegación principal">
          <NavLink to="/" end className={clasesDelEnlace}>
            Inicio
          </NavLink>
          <NavLink to="/turnos" className={clasesDelEnlace}>
            Turnos
          </NavLink>
          <NavLink to="/login" className={clasesDelEnlace}>
            Ingresar
          </NavLink>
          <NavLink to="/mis-reservas" className={clasesDelEnlace}>
            Mis reservas
          </NavLink>
        </nav>
      </div>
    </header>
  );
}