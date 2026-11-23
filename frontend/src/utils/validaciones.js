export function validarReserva(datos) {
  const errores = {};
  const equipo = datos?.equipo ? String(datos.equipo).trim() : "";
  const celular = datos?.celular ? String(datos.celular).trim() : "";

  if (equipo.length < 3) {
    errores.equipo = "Escribe el nombre del equipo (mínimo 3 letras).";
  }

  if (!/^3\d{9}$/.test(celular)) {
    errores.celular = "Escribe un celular de 10 dígitos que empiece por 3.";
  }

  return errores;
}
