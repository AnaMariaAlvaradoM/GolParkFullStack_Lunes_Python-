import {useEffect, useState} from "react";
import { Link, useNavigate,useParams } from "react-router";
import FormularioReserva from "../components/FormularioReserva.jsx";
import { crearReserva } from "../services/reservasService.js";
import { obtenerTurno } from "../services/turnosService.js";
import { formatearPrecio } from "../utils/formato.js";
import { mensajeDeError } from "../utils/errores.js";

function DetalleTurno() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [turno, setTurno] = useState(null);
    const [error, setError] = useState("");
    const [errorReserva, setErrorReserva] = useState("");

    useEffect(() => {
        async function cargarTurnos() {
            try {
                const datos = await obtenerTurno(id);
                setTurno(datos);
            } catch (falla){
                setError(mensajeDeError(falla));
            }
        }
        cargarTurnos();
    }, [id]);

    async function confirmarReserva(datosReserva) {
        try {
            await crearReserva({turno_id: turno.id, ...datosReserva});
            navigate("/mis-reservas");
        } catch (falla) {
                setErrorReserva(mensajeDeError(falla));
            } 
        }

        if (error) {
        return <p className="font-bold text-red-600">{error}</p>;
        }

        if (turno === null) {
            return <p className="text-slate-600">Cargando turno...</p>;
        }

    return (
        <section className="max-w-xl">
            <Link to="/turnos" className="text-sm font-bold text-orange-700 underline">
                ← Todos los turnos
            </Link>
            <h2 className="mt-3 text-2xl font-bold">{turno.cancha}</h2>
            <p>Precio: {formatearPrecio(turno.precio)}</p>
            <p className="mb-6">Hora: {turno.hora}</p>
            {errorReserva ? (
                <p className="font-bold text-red-600">{errorReserva}</p>
            ) : (
                <FormularioReserva turno={turno} onConfirmar={confirmarReserva} />
            )}
        </section>
  );

}

export default DetalleTurno;