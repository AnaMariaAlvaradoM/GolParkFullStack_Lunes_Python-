export function formatearPrecio(valor) {
    if (valor === null || valor === undefined || isNaN(valor)) {
        return "$0";
    }
    const numeroEntero = Math.round(valor).toString();
    const numeroConPuntos = numeroEntero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    return `$${numeroConPuntos}`;  // Formato con puntos como separador de miles
}