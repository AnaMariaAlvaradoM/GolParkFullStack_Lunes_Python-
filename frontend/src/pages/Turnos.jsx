import { useEffect, useState } from "react";
import ListaTurnos from "../components/ListaTurnos.jsx";
import { listarTurnos } from "../services/turnosService.js";

function Turnos() {
    const [turnos, setTurnos] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function cargarTurnos() {
            try {
                const datos = await listarTurnos();
                setTurnos(datos);
            } catch {
                setError("No pudimos conectar con el servidor. Intenta más tarde.");
            }
        }
        cargarTurnos();
    }, []);

    if (error) {
        return <p className="font-bold text-red-600">{error}</p>;
    }

    if (turnos === null) {
        return <p className="mb-4 text-xl font-bold">Cargando turnos...</p>;
    }
    return (
        <div>
            <h2 className="mb-4 text-xl font-bold">Turnos de hoy</h2>
            <ListaTurnos turnos={turnos} />
        </div>
    );
}

export default Turnos;