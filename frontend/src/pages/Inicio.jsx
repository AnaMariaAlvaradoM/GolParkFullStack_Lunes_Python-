import { Link } from "react-router";

export default function Inicio() {
  return (
    <main>
      <h1>Reserva tu cancha en segundos</h1>
      <Link to="/turnos">Ver turnos</Link>
    </main>
  );
}