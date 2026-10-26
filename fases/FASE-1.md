# Fase 1 · GolPark en React

**Entrega:** domingo 8 de noviembre de 2026 · 11:59 p. m. · **Se califica con:** `npm test -- F1`

---

## Qué construyes

La misma vista de la Fase 0, ahora en React con Vite y Tailwind, dividida en componentes. La carpeta `maqueta/` se queda como está.

### Crea el proyecto

Desde la **raíz de tu repositorio**:

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install tailwindcss @tailwindcss/vite
```

Configura Tailwind como en clase: `tailwindcss()` en los `plugins` de `vite.config.js` y `src/index.css` con una sola línea, `@import "tailwindcss";`. Borra `src/App.css`.

---

## El contrato (lo que revisan las pruebas)

Todos los componentes van en `frontend/src/components/` y se exportan con `export default`.

### `src/utils/formato.js`

```javascript
export function formatearPrecio(valor) { … }
```

`formatearPrecio(120000)` → `"$120.000"` · `formatearPrecio(1500000)` → `"$1.500.000"` · `formatearPrecio(0)` → `"$0"`.

### `Encabezado.jsx`

Tiene un `<h1>` con el texto **GolPark**.

### `PiePagina.jsx`

Muestra el texto **GolPark · Canchas sintéticas de fútbol 5**.

### `TarjetaTurno.jsx`

- Recibe dos props: `turno` y `onReservar`. No importa los datos: todo llega por props.
- Es un `<article>` con un `<h3>` con la cancha, un párrafo `Hora: 6:00 p. m.` y otro `Precio: $120.000` (con `formatearPrecio`).
- Tiene un botón: **Reservar** si el turno está libre; **Ocupado** y `disabled` si no.
- Al tocar **Reservar** llama a `onReservar(turno.id)`.
- Usa clases de Tailwind (`className`).

### `ListaTurnos.jsx`

Recibe `turnos` y `onReservar`, y pinta una `TarjetaTurno` por turno con `key={turno.id}`.

### `src/data/turnos.js` y `App.jsx`

Los 6 turnos del correo van en `src/data/turnos.js` (en la Fase 3 los reemplaza la API). `App.jsx` muestra el encabezado, la lista y el pie de página. Por ahora, `onReservar` puede mostrar en la consola qué turno se tocó.

---

## Cómo probarla

Desde `frontend/`: `npm run dev` y abre `http://localhost:5173`. Para tu nota: `npm test -- F1` desde la raíz del repo.
