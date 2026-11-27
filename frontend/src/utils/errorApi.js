export function obtenerMensajeError(error) {
  if (!error.response) {
    return "No pudimos conectar con el servidor. Intenta más tarde.";
  }

  const { status, data } = error.response;

  if (status === 404) {
    return "Ese turno no existe.";
  }

  if (status === 409) {
    return data?.detail || "Ese turno ya está ocupado.";
  }

  if (typeof data?.detail === "string") {
    return data.detail;
  }

  if (Array.isArray(data?.detail) && data.detail.length > 0) {
    return data.detail[0]?.msg || "Datos inválidos.";
  }

  return "Ocurrió un error inesperado.";
}