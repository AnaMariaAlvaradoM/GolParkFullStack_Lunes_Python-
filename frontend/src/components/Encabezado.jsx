import { NavLink } from "react-router";

export default function Encabezado() {
  return (
    <header className="bg-emerald-700 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">GolPark</h1>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-white underline underline-offset-4 font-semibold"
                : "text-emerald-100 hover:text-white transition"
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/turnos"
            className={({ isActive }) =>
              isActive
                ? "text-white underline underline-offset-4 font-semibold"
                : "text-emerald-100 hover:text-white transition"
            }
          >
            Turnos
          </NavLink>
          <NavLink
            to="/mis-reservas"
            className={({ isActive }) =>
              isActive
                ? "text-white underline underline-offset-4 font-semibold"
                : "text-emerald-100 hover:text-white transition"
            }
          >
            Mis reservas
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
