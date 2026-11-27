export function validarReserva({ equipo, celular }) {
  const errores = {};

  if (equipo.trim().length < 3) {
    errores.equipo = "Escribe el nombre del equipo (mínimo 3 letras).";
  }

  if (!/^3\d{9}$/.test(celular.trim())) {
    errores.celular = "Escribe un celular de 10 dígitos que empiece por 3.";
  }
  
  return errores;
}