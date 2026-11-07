import Encabezado from './components/Encabezado';
import ListaTurnos from './components/ListaTurnos';
import PiePagina from './components/PiePagina';
import { turnos } from './data/turnos';

function App() {
  const manejarReserva = (id) => {
    console.log(`Turno reservado: ${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Encabezado />
        <main className="mt-8">
          <ListaTurnos turnos={turnos} onReservar={manejarReserva} />
        </main>
        <PiePagina />
      </div>
    </div>
  );
}

export default App;
