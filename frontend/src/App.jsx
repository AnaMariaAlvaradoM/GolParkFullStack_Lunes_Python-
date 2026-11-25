import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import ListaTurnos from "./components/ListaTurnos.jsx";
import { turnos } from "./data/turnos.js";

function App() {
  function reservar(id) {
    const turno = turnos.find((t) => t.id === id);
    if (turno.disponible === false) {
      console.log(`${turno.cancha} a las ${turno.hora} ya no está disponible.`);
      return;
    }
    turno.disponible = false;
    console.log(`Reservaste ${turno.cancha} a las ${turno.hora}.`);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Encabezado />
      <main className="p-6">
        <h2 className="mb-4 text-xl font-bold">Turnos de hoy</h2>
        <ListaTurnos turnos={turnos} onReservar={reservar} />
      </main>
      <PiePagina />
    </div>
  );
}

export default App;