import { Route, Routes } from "react-router";
import Layout from "./components/Layout.jsx";
import Inicio from "./pages/Inicio.jsx";
import Turnos from "./pages/Turnos.jsx";
import DetalleTurno from "./pages/DetalleTurno.jsx";
import MisReservas from "./pages/MisReservas.jsx";
import Login from "./pages/Login.jsx";
import NoEncontrada from "./pages/NoEncontrada.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route path="/turnos/:id" element={<DetalleTurno />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;