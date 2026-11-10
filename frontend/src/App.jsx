import { useState } from "react";
import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import ListaTurnos from "./components/ListaTurnos.jsx";
import { turnos } from "./data/turnos.js";


function App() {
  const [turnosDisponibles, setTurnosDisponibles] = useState(turnos);

  function reservar(id) {
    const turno = turnosDisponibles.find((t) => t.id === id);
    if (!turno) {
      console.error(`No se encontró el turno con id ${id}.`);
      return;
    }
    if (turno.cupos === 0) {
      console.log(`${turno.nombre} ya no tiene cupos.`);
      return;
    }

    setTurnosDisponibles((turnosActuales) =>
      turnosActuales.map((t) =>
        t.id === id ? { ...t, cupos: t.cupos - 1 } : t,
      ),
    );
    console.log(`Reservaste ${turno.nombre}. Quedan ${turno.cupos - 1} cupos.`);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Encabezado />
      <main className="p-6">
        <h2 className="mb-4 text-xl font-bold">Turnos disponibles</h2>
        <ListaTurnos turnos={turnosDisponibles} onReservar={reservar} />
      </main>
      <PiePagina />
    </div>
  );
}

export default App;