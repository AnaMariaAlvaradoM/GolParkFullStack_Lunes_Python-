import { NavLink } from "react-router";

function claseEnlace({ isActive }) {
  return isActive
    ? "rounded-full bg-white px-4 py-1 text-[#146c43]"
    : "rounded-full px-4 py-1 hover:text-[#b6f0cf]";
}

function Encabezado() {
  return (
    <header className="bg-[#146c43] px-4 py-6 text-center text-white">
      <h1 className="mb-1 text-4xl font-bold">GolPark</h1>
      <p className="mb-4">Canchas sintéticas de fútbol 5 · Turnos de hoy</p>
      <nav className="flex flex-wrap justify-center gap-2 text-sm font-semibold">
        <NavLink to="/" end className={claseEnlace}>Inicio</NavLink>
        <NavLink to="/turnos" className={claseEnlace}>Turnos</NavLink>
        <NavLink to="/mis-reservas" className={claseEnlace}>Mis reservas</NavLink>
        <NavLink to="/login" className={claseEnlace}>Ingresar</NavLink>
      </nav>
    </header>
  );
}

export default Encabezado;