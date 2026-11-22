
import { Link, NavLink, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { listarReservas } from "../services/reservasService.js";

function Encabezado() {
  const [totalReservas, setTotalReservas] = useState(0);
  const location = useLocation();

  useEffect(() => {
    async function cargarReservas() {
      try {
        const datos = await listarReservas();
        setTotalReservas(datos.length);
      } catch {
        setTotalReservas(0);
      }
    }

    cargarReservas();
  }, [location.pathname]);

  return (
    <header className="bg-green-950 px-6 py-5 text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-extrabold tracking-wide">
            <Link to="/" className="transition-colors hover:text-green-300">
              GolPark
            </Link>
          </h1>

          <p className="mt-1 text-sm text-green-200">
            Reserva tu cancha y disfruta el partido.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 transition-colors ${
                isActive
                  ? "bg-green-800 text-white"
                  : "hover:bg-green-800"
              }`
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/turnos"
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 transition-colors ${
                isActive
                  ? "bg-green-800 text-white"
                  : "hover:bg-green-800"
              }`
            }
          >
            Turnos
          </NavLink>

          <NavLink
            to="/mis-reservas"
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 transition-colors ${
                isActive
                  ? "bg-green-800 text-white"
                  : "hover:bg-green-800"
              }`
            }
          >
            Mis reservas ({totalReservas})
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Encabezado;
