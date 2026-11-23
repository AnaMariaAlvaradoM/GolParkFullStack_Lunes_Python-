// Muestra un número como precio en pesos colombianos: 120000 → "$120.000"
export function formatearPrecio(valor) {
  return `$${valor.toLocaleString("es-CO")}`;
}
