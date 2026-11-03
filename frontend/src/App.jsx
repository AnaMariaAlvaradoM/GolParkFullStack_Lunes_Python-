import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import ListaTurnos from "./components/ListaTurnos.jsx";
import { turnos } from "./data/turnos.js";

function App() {
  function reservar(id) {
    const turno = turnos.find((t) => t.id === id);

    if (turno.cupos === 0) {
      return;
    }
    console.log(`Reservaste ${turno.cancha} a las ${turno.hora}`);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Encabezado />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-green-900">
              Turnos de hoy
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Elige el horario que mejor se adapte a tu equipo.
            </p>
          </div>
        </div>
        
        <ListaTurnos turnos={turnos} onReservar={reservar} />
      </main>

      <PiePagina />
    </div>
  );
}

export default App;