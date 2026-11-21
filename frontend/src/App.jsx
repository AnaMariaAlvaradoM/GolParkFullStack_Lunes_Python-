import { useState } from "react";
import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import ListaTurnos from "./components/ListaTurnos.jsx";
import FormularioReserva from "./components/FormularioReserva.jsx";
import MisReservas from "./components/ListaReservas.jsx";
import { turnos } from "./data/turnos.js";

function App() {
  const [reservas, setReservas] = useState([])
  const [idElegida, setIdElegida] = useState(null)
  const [listaTurnos, setListaTurnos] = useState(turnos)

  const turnoElegido = listaTurnos.find((turno) => turno.id === idElegida)

  function confirmarReserva(datos) {
    setListaTurnos(
      listaTurnos.map((turno) =>
        turno.id === idElegida ? { ...turno, disponible: turno.disponible = false} : turno,
      ),
    );
    setReservas([
      ...reservas,
      { id: reservas.length + 1, turno: turnoElegido.cancha, hora: turnoElegido.hora, ...datos},
    ]);
    setIdElegida(null);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Encabezado />
      <main className="grid gap-6 p-6 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="mb-4 text-xl font-bold">Clases de hoy</h2>
          <ListaTurnos turnos={listaTurnos} onReservar={setIdElegida} />
        </div>
        <aside className="flex flex-col gap-6">
          <FormularioReserva turno={turnoElegido} onReservar={confirmarReserva} />
          <MisReservas reservas={reservas} />
        </aside>
      </main>
      <PiePagina />
    </div>
  );
}

export default App;