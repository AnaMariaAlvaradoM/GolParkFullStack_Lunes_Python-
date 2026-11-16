import Encabezado from "./components/Encabezado.jsx";
import ListaTurnos from "./components/ListaTurnos.jsx";
import PiePagina from "./components/PiePagina.jsx";
import { turnos } from "./data/turnos.js";

export default function App() {
  function manejarReserva(id) {
    console.log(`Se tocó el turno ${id}`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-slate-100">
      <Encabezado />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-white">Turnos de hoy</h2>
        <ListaTurnos turnos={turnos} onReservar={manejarReserva} />
      </main>
      <PiePagina />
    </div>
  );
}
