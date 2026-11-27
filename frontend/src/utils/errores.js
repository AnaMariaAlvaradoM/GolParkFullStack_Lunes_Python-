export function mensajeDeError(error) {
    if (!error.response) {
        return "No pudimos conectar con el servidor. Intenta más tarde."
    }
    const estado = error.response.status;
    if (estado === 404) {
        return "Ese turno no existe.";
    }
    if (estado === 409) {
        return error.response.data.detail;
    }
    if (estado === 422) {
        return "Ocurrió un error inesperado. Intenta de nuevo.";
    }
    return "Ocurrió un error inesperado. Intenta de nuevo.";
}
