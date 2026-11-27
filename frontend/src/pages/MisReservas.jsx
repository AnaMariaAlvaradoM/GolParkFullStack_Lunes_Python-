import { useEffect, useState } from "react";
import ListaReservas from "../components/ListaReservas.jsx";
import { listarReservas } from "../services/reservasService.js";
import { mensajeDeError } from "../utils/errores.js";

function MisReservas() {
    const [reservas, setReservas] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function cargarReservas() {
            try {
                const datos = await listarReservas();
                setReservas(datos);
            } catch(falla) {
                setError(mensajeDeError(falla));
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