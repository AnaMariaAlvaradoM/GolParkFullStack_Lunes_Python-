import { useState } from "react";
import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import ListaTurnos from "./components/ListaTurnos.jsx";
import FormularioReserva from "./components/FormularioReserva.jsx";
import ListaReservas from "./components/ListaReservas.jsx";
import { turnos } from "./data/turnos.js";


function App() {
  const [listaTurnos, setListaTurnos] = useState(turnos);
  const [idTurnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [reservas, setReservas] = useState([]);

  const TurnoSeleccionado = listaTurnos.find((turno) => turno.id === idTurnoSeleccionado);

  function confirmarReservar(datos) {
    if (!TurnoSeleccionado) {
      return false;
    }

    setListaTurnos(
        listaTurnos.map((turno) =>
          turno.id === idTurnoSeleccionado ? { ...turno, cupos: turno.cupos - 1 } : turno
        ),
    );
    setReservas([
      ...reservas,
      { id: reservas.length + 1, cancha: TurnoSeleccionado.cancha, hora: TurnoSeleccionado.hora, equipo: datos.equipo, celular: datos.celular },
    ]);
    setTurnoSeleccionado(null);
    return true;
  }
  
  return(
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Encabezado />
      <main className="p-6">
        <div>
          <h2 className="mb-4 text-xl font-bold">Turnos disponibles</h2>
          <ListaTurnos turnos={listaTurnos} onReservar={setTurnoSeleccionado} />
        </div>
        <aside className="flex flex-col gap-6">
            <FormularioReserva turno={TurnoSeleccionado} onConfirmar={confirmarReservar} bloqueado={!TurnoSeleccionado} />
        </aside>
        <ListaReservas reservas={reservas} />
      </main>
      <PiePagina />
    </div>
  );

}

export default App;