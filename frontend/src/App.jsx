import { Route, Routes } from 'react-router';
import Encabezado from './components/Encabezado';
import PiePagina from './components/PiePagina';
import Inicio from './pages/Inicio';
import Turnos from './pages/Turnos';
import DetalleTurno from './pages/DetalleTurno';
import MisReservas from './pages/MisReservas';
import NoEncontrada from './pages/NoEncontrada';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Encabezado />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/turnos/:id" element={<DetalleTurno />} />
          <Route path="/mis-reservas" element={<MisReservas />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>

      <PiePagina />
    </div>
  );
}