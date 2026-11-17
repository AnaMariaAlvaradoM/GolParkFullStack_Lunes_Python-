export function formatearPrecio(precio) {
  return `$${new Intl.NumberFormat('es-CO', {
    maximumFractionDigits: 0,
  }).format(precio)}`;
}