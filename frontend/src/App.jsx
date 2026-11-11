
import { useState } from "react";
import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import ListaTurnos from "./components/ListaTurnos.jsx";
import FormularioReserva from "./components/FormularioReserva.jsx";
import ListaReservas from "./components/ListaReservas.jsx";
import { turnos } from "./data/turnos.js";

function App() {
  const [turnosActuales, setTurnos] = useState(turnos);
  const [idTurnoElegido, setIdTurnoElegido] = useState(null);
  const [reservas, setReservas] = useState([]);

  const turnoElegido = turnosActuales.find(
    (turno) => turno.id === idTurnoElegido
  );

  function confirmarReserva(datos) {
    if (!turnoElegido || !turnoElegido.disponible) {
      return false;
    }

    setTurnos(
      turnosActuales.map((turno) =>
        turno.id === idTurnoElegido
          ? { ...turno, disponible: false }
          : turno
      )
    );

    setReservas([
      ...reservas,
      {
        id: reservas.length + 1,
        turno_id: turnoElegido.id,
        cancha: turnoElegido.cancha,
        hora: turnoElegido.hora,
        ...datos,
      },
    ]);

    return true;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Encabezado totalReservas={reservas.length} />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-7">
          <h2 className="text-2xl font-extrabold text-green-900">
            Turnos de hoy
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Elige el horario que mejor se adapte a tu equipo.
          </p>
        </div>

        <ListaTurnos
          turnos={turnosActuales}
          onReservar={setIdTurnoElegido}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <FormularioReserva
            key={idTurnoElegido}
            turno={turnoElegido}
            onReservar={confirmarReserva}
            deshabilitado={turnoElegido ? !turnoElegido.disponible : false}
          />

          <ListaReservas reservas={reservas} />
        </div>
      </main>

      <PiePagina />
    </div>
  );
}

export default App;
