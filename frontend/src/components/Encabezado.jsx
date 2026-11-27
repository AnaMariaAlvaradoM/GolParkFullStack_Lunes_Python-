import { NavLink } from "react-router";

function turnoEnlace({ isActive }) {
  return isActive ? "font-bold text-orange-300" : "hover:text-orange-300";
}

function Encabezado() {
  return (
    <header className="flex items-center justify-between bg-slate-900 px-6 py-4 text-white">
      <h1 className="text-2xl font-bold">GolPark</h1>
      <nav className="flex gap-4 text-sm">
        <NavLink to="/" end className={turnoEnlace}>Inicio</NavLink>
        <NavLink to="/turnos" className={turnoEnlace}>Turnos</NavLink>
        <NavLink to="/mis-reservas" className={turnoEnlace}>Mis reservas</NavLink>
        <NavLink to="/login" className={turnoEnlace}>Ingresar</NavLink>
      </nav>
    </header>
  );
}

export default Encabezado;