import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import ListaTurnos from "./components/ListaTurnos.jsx";
import { turnos } from "./data/turnos.js";

function App() {
  function reservar(id) {
    const turno = turnos.find((t) => t.id === id);
    console.log(`Tocaste el turno ${turno.id}: ${turno.cancha} a las ${turno.hora}.`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f1f5f2] text-[#1f2a24]">
      <Encabezado />
      <main className="flex-1 px-4 py-8">
        <h2 className="mb-6 text-center text-2xl font-bold">Turnos de hoy</h2>
        <ListaTurnos turnos={turnos} onReservar={reservar} />
      </main>
      <PiePagina />
    </div>
  );
}

export default App;