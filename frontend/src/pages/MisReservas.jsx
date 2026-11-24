import { useEffect, useState } from "react";
import ListaReservas from "../components/ListaReservas.jsx";
import { listarReservas } from "../services/reservasService.js";

function MisReservas() {
    const [reservas, setReservas] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function cargarReservas() {
            try {
                setReservas(await listarReservas());
            } catch {
                setError("No pudimos conectar con el servidor. Intenta más tarde.");
            }
        }

        cargarReservas();
    }, []);

    if (error) {
        return <p className="font-bold text-red-600">{error}</p>;
    }

    if (reservas === null) {
        return <p>Cargando reservas...</p>;
    }

    return <ListaReservas reservas={reservas} />;
}

export default MisReservas;