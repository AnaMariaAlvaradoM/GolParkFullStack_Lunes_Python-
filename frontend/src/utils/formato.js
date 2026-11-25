export function formatearPrecio(precio) {
  return `$${precio.toLocaleString("es-CO")}`;
}