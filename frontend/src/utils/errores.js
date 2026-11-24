export function mensajeDeError(error) {
  if (!error.response) {
    return "No pudimos conectar con el servidor. Intenta más tarde.";
  }

  const { status, data } = error.response;

  if (status === 404) {
    return "Ese turno no existe.";
  }

  if (status === 409) {
    return data?.detail || "Ocurrió un error inesperado. Intenta de nuevo.";
  }

  return "Ocurrió un error inesperado. Intenta de nuevo.";
}