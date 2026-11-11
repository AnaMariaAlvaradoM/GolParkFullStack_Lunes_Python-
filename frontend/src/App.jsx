import { useState } from "react";
import Encabezado from './components/Encabezado';
import PiePagina from './components/PiePagina';
import ListaTurnos from './components/ListaTurnos';
import FormularioReserva from "./components/FormularioReserva";
import ListaReservas from "./components/ListaReservas";
import { turnos } from './data/turnos';

function App() {
  const [listaTurnos, setListaTurnos] = useState(turnos);
  const [idElegida, setIdElegida] = useState(null);
  const [reservas, setReservas] = useState([]);

  const turnoElegido = listaTurnos.find((turno) => turno.id === idElegida);

  function onReservar(datos) {
    if (!turnoElegido) return;

    setListaTurnos((turnosActuales) =>
      turnosActuales.map((turno) =>
        turno.id === turnoElegido.id ? { ...turno, disponible: false } : turno
      )
    );

    setReservas((reservasActuales) => [
      ...reservasActuales,
      {
        id: Date.now(),
        cancha: turnoElegido.cancha,
        hora: turnoElegido.hora,
        precio: turnoElegido.precio,
        ...datos,
      },
    ]);

    setIdElegida(null);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Encabezado />
      <main className="grid gap-6 p-6 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="mb-4 text-xl font-bold">Turnos de las Canchas para hoy</h2>
          <ListaTurnos turnos={listaTurnos} onReservar={setIdElegida} />
        </div>
        <aside className="flex flex-col gap-6">
          <FormularioReserva turno={turnoElegido} onReservar={onReservar} deshabilitado={!turnoElegido || !turnoElegido.disponible}/>
          <ListaReservas reservas={reservas} />
        </aside>
      </main>
      <PiePagina />
    </div>
  );
}

export default App;