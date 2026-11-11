export function formatearPrecio(valor) {
  return `$${valor.toLocaleString("es-CO")}`;
}