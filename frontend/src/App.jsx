import { useState } from "react";
import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import ListaTurnos from "./components/ListaTurnos.jsx";
import FormularioReserva from "./components/FormularioReserva.jsx";
import ListaReservas from "./components/ListaReservas.jsx";
import { turnos as turnosIniciales } from "./data/turnos.js";
import { formatearPrecio } from "./utils/formato.js";

function App() {
  const [turnos, setTurnos] = useState(turnosIniciales);
  const [reservas, setReservas] = useState([]);
  const [idElegido, setIdElegido] = useState(null);

  const turnoElegido = turnos.find((turno) => turno.id === idElegido);

  async function reservar({ equipo, celular }) {
    if (!turnoElegido || !turnoElegido.disponible) {
      return false;
    }

    setTurnos(
      turnos.map((turno) =>
        turno.id === turnoElegido.id ? { ...turno, disponible: false } : turno,
      ),
    );

    setReservas([
      ...reservas,
      {
        id: reservas.length + 1,
        turno_id: turnoElegido.id,
        equipo,
        celular,
        cancha: turnoElegido.cancha,
        hora: turnoElegido.hora,
      },
    ]);

    return true;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f1f5f2] text-[#1f2a24]">
      <Encabezado />
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-8 px-4 py-8 lg:grid-cols-[1fr_340px]">
        <div>
          <h2 className="mb-6 text-center text-2xl font-bold">Turnos de hoy</h2>
          <ListaTurnos turnos={turnos} onReservar={setIdElegido} />
        </div>

        <aside className="flex flex-col gap-6">
          <section className="rounded-xl bg-white p-5 shadow-md">
            <h2 className="mb-1 text-xl font-bold text-[#146c43]">Reserva tu turno</h2>
            {turnoElegido ? (
              <>
                <p className="mb-4 text-[#6b7570]">
                  {turnoElegido.cancha} · {turnoElegido.hora} · {formatearPrecio(turnoElegido.precio)}
                </p>
                <FormularioReserva
                  key={turnoElegido.id}
                  onReservar={reservar}
                  deshabilitado={!turnoElegido.disponible}
                />
              </>
            ) : (
              <p className="text-[#6b7570]">Elige un turno con el botón Reservar.</p>
            )}
          </section>

          <ListaReservas reservas={reservas} />
        </aside>
      </main>
      <PiePagina />
    </div>
  );
}

export default App;