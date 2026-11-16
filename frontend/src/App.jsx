import { useState } from "react";
import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import ListaTurnos from "./components/ListaTurnos.jsx";
import { turnos } from "./data/turnos.js";

function App() {
  function reservar(id) {
    const turno = turnos.find((c) => c.id === id);
    if (turno.disponible === false) {
      console.log(`${turno.hora} esta ocupado`)
      return;
    }
    turno.disponible = false;
    console.log(`Reservaste ${turno.cancha} a las ${turno.hora}.`);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Encabezado />
      <main className="grid gap-6 p-6 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="mb-4 text-xl font-bold">Clases de hoy</h2>
          <ListaTurnos turnos={turnos} onReservar={reservar} />
        </div>
      </main>
      <PiePagina />
    </div>
  );
}

export default App;