import { Route, Routes } from "react-router";
import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import Inicio from "./pages/Inicio.jsx";
import Turnos from "./pages/Turnos.jsx";
import DetallesTurnos from "./pages/DetallesTurnos.jsx";
import MisReservas from "./pages/MisReservas.jsx";
import NoEncontrada from "./pages/NoEncontrada.jsx";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Encabezado />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/turnos/:id" element={<DetallesTurnos/>} />
          <Route path="/mis-reservas" element={<MisReservas/>} />
          <Route path="*" element={<NoEncontrada/>} />
        </Routes>
      </main>
      <PiePagina />
    </div>
  );
}

export default App;