# Fase 2 · Reservar de verdad

**Entrega:** domingo 15 de noviembre de 2026 · 11:59 p. m. · **Se califica con:** `npm test -- F2`

---

## Qué construyes

Diego quiere que la persona escriba el nombre del equipo y su celular antes de reservar, y que vea sus reservas. La pantalla debe actualizarse sola, con estado.

---

## El contrato (lo que revisan las pruebas)

### `src/utils/validaciones.js`

```javascript
export function validarReserva(datos) { … }
```

Recibe `{ equipo, celular }` y retorna un objeto con los errores (vacío `{}` si todo está bien):

| Regla | Si no se cumple, el error es |
|---|---|
| `equipo` tiene 3 letras o más, sin contar espacios al inicio o al final | `equipo: "Escribe el nombre del equipo (mínimo 3 letras)."` |
| `celular` tiene exactamente 10 dígitos y empieza por 3 | `celular: "Escribe un celular de 10 dígitos que empiece por 3."` |

### `src/components/FormularioReserva.jsx`

- Recibe `onReservar` y `deshabilitado` (por defecto `false`).
- Dos campos controlados con `useState`, cada uno dentro de su `<label>`: **Nombre del equipo** y **Celular**.
- Un botón **Reservar**. Si `deshabilitado` es `true`, el botón dice **Ocupado** y está deshabilitado.
- Al enviar: `evento.preventDefault()`, valida con `validarReserva` y muestra cada mensaje de error debajo de su campo.
- Si no hay errores, llama `await onReservar({ equipo, celular })`. Si responde `true`, limpia los campos y muestra **¡Turno reservado!**. Si responde `false`, no limpia nada.

### `src/components/ListaReservas.jsx`

- Recibe `reservas`.
- Si no hay ninguna, muestra **Aún no tienes reservas.**
- Si hay, pinta un `<li>` por reserva con el texto `Cancha 1 · 6:00 p. m. · Los Cracks` (cancha · hora · equipo).

Cada reserva tiene esta forma, la misma que devolverá la API en la Fase 3:

```javascript
{ id: 1, turno_id: 1, equipo: "Los Cracks", celular: "3001234567", cancha: "Cancha 1", hora: "6:00 p. m." }
```

### `App.jsx`

Guarda los turnos y las reservas en `useState`. Al tocar **Reservar** en una tarjeta, se elige ese turno y aparece el formulario. Al reservar, el turno pasa a ocupado (crea un arreglo nuevo con `map`), la reserva se agrega a la lista y la función retorna `true`.

---

Para tu nota: `npm test -- F2` desde la raíz del repo.
