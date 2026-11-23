import { Route, Routes } from "react-router";
import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import Inicio from "./pages/Inicio.jsx";
import Turnos from "./pages/Turnos.jsx";
import DetalleTurno from "./pages/DetalleTurno.jsx";
import MisReservas from "./pages/MisReservas.jsx";
import NoEncontrada from "./pages/NoEncontrada.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Encabezado />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
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
