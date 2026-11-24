import { turnos } from "../data/turnos.js";
import TarjetaTurno from "./TarjetaTurno.jsx";
 

function ListaTurnos({ turno, onReservar }) {
  return (
    <section className="flex flex-wrap gap-4">
      {turnos.map((turno) => (
        <TarjetaTurno
          key={turnos.id}
          turno={turno}
          onReservar={onReservar}
        />
      ))}
    </section>
  );
}

export default ListaTurnos;