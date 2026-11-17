export function mensajeError(error, fallback) {
  const detalle = error?.response?.data?.detail;

  if (typeof detalle === 'string') {
    return detalle;
  }

  if (!error?.response) {
    return 'No pudimos conectar con el servidor. Intenta más tarde.';
  }

  return fallback;
}