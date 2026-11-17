import { useState } from 'react';
import { validarReserva } from '../utils/validaciones';

export default function FormularioReserva({
  onReservar,
  deshabilitado = false,
}) {
  const [equipo, setEquipo] = useState('');
  const [celular, setCelular] = useState('');
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  async function handleSubmit(evento) {
    evento.preventDefault();

    if (deshabilitado) return;

    const nuevosErrores = validarReserva({ equipo, celular });
    setErrores(nuevosErrores);
    setMensaje('');

    if (Object.keys(nuevosErrores).length > 0) return;

    const reservado = await onReservar({
      equipo: equipo.trim(),
      celular,
    });

    if (reservado) {
      setEquipo('');
      setCelular('');
      setErrores({});
      setMensaje('¡Turno reservado!');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del equipo
        <input
          value={equipo}
          onChange={(evento) => setEquipo(evento.target.value)}
        />
        {errores.equipo && <p>{errores.equipo}</p>}
      </label>

      <label>
        Celular
        <input
          type="tel"
          value={celular}
          onChange={(evento) => setCelular(evento.target.value)}
        />
        {errores.celular && <p>{errores.celular}</p>}
      </label>

      <button type="submit" disabled={deshabilitado}>
        {deshabilitado ? 'Ocupado' : 'Reservar'}
      </button>

      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}