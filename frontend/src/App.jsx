import { Route, Routes } from "react-router";
import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import Inicio from "./pages/Inicio.jsx";
import Turnos from "./pages/Turnos.jsx";
import DetalleTurno from "./pages/DetalleTurno.jsx";
import MisReservas from "./pages/MisReservas.jsx";
import NoEncontrada from "./pages/NoEncontrada.jsx";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f1f5f2] text-[#1f2a24]">
      <Encabezado />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
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

export default App;