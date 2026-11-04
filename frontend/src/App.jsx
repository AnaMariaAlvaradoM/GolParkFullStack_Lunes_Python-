// frontend/src/App.jsx
import Encabezado from './components/Encabezado';
import ListaTurnos from './components/ListaTurnos';
import PiePagina from './components/PiePagina';
import { turnosIniciales } from './data/turnos';

function App() {
  const handleReservar = (id) => {
    console.log(`Se tocó el turno con id: ${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Encabezado />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Turnos Disponibles
        </h2>
        <ListaTurnos turnos={turnosIniciales} onReservar={handleReservar} />
      </main>

      <PiePagina />
    </div>
  );
}

export default App;