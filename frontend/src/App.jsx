import { Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Turnos from './pages/Turnos';
import DetalleTurno from './pages/DetalleTurno';
import MisReservas from './pages/MisReservas';
import Login from './pages/Login';
import NoEncontrada from './pages/NoEncontrada';

export default function App() {
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