
export function mensajeDeError(error) {
  if (!error.response) {
    return "No pudimos conectar con el servidor. Intenta más tarde.";
  }

  if (error.response.status === 404) {
    return "Ese turno no existe.";
  }

  if (error.response.status === 409) {
    return error.response.data.detail;
  }

  return "Ocurrió un error inesperado. Intenta de nuevo.";
}
