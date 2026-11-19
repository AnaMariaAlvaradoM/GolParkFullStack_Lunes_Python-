import { Link } from "react-router";

function Encabezado() {
  return (
    <header className="bg-[#146c43] px-4 py-6 text-center text-white">
      <h1 className="mb-1 text-4xl font-bold">GolPark</h1>
      <p className="mb-4">Canchas sintéticas de fútbol 5 · Turnos de hoy</p>
      <nav className="flex justify-center gap-6 text-sm font-semibold">
        <Link to="/" className="hover:text-[#b6f0cf]">Inicio</Link>
        <Link to="/turnos" className="hover:text-[#b6f0cf]">Turnos</Link>
        <Link to="/mis-reservas" className="hover:text-[#b6f0cf]">Mis reservas</Link>
      </nav>
    </header>
  );
}

export default Encabezado;