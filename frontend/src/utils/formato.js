export function formatearPrecio(valor) {
    const numero = Number(valor);
  
    if (Number.isNaN(numero) || numero < 0) {
      return "$0";
    }
  
    return `$${numero.toLocaleString("es-CO", {
      maximumFractionDigits: 0,
    })}`;
  }
  