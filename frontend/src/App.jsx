import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import ListaTurnos from "./components/ListaTurnos.jsx";
import { turnos } from "./data/turnos.js";


function App() {
  function reservar(id){
    console.log("Turno reservado:", id)
  }
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Encabezado />
      <main className="p-6">
        <h2 className="mb-4 text-xl font-bold">canchas</h2>
        <ListaTurnos turnos={turnos} onReservar={reservar}/>
      </main>
      <PiePagina />
    </div>
  );
}

export default App;