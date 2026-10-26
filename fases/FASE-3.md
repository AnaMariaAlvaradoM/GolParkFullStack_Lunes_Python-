# Fase 3 · La API de GolPark y las pantallas

**Entrega:** domingo 22 de noviembre de 2026 · 11:59 p. m. · **Se califica con:** `npm test -- F3`

---

## Qué construyes

Los turnos dejan de vivir en el navegador: ahora los guarda una API en FastAPI, la única fuente de verdad para todos. El frontend tiene varias pantallas con React Router y le pide los datos a la API con Axios.

---

## Parte 1 · Backend (carpeta `backend/`)

### Archivos obligatorios

- `backend/main.py` crea `app = FastAPI()`.
- `backend/datos.py` tiene dos listas: `turnos` (los 6 turnos del correo) y `reservas` (vacía).
- `backend/requirements.txt` con `fastapi[standard]`.

Puedes organizar el resto como quieras; se sugiere `modelos.py` y la carpeta `routers/`.

### Endpoints

| Método | Ruta | Respuesta | Errores |
|---|---|---|---|
| GET | `/turnos` | 200 · los 6 turnos | |
| GET | `/turnos/{turno_id}` | 200 · el turno | 404 · `detail: "Ese turno no existe."` |
| POST | `/reservas` | 201 · la reserva creada | 404 · el turno no existe · 409 · `detail: "Ese turno ya está ocupado."` · 422 · datos inválidos |
| GET | `/reservas` | 200 · las reservas | |

- El cuerpo de `POST /reservas` es `{ "turno_id": 1, "equipo": "Los Cracks", "celular": "3001234567" }`.
- Valida con Pydantic: `equipo` con `Field(min_length=3)` y `celular` con `Field(pattern=r"^3\d{9}$")`.
- La reserva creada tiene `id`, `turno_id`, `equipo`, `celular`, `cancha` y `hora`, y el turno queda con `disponible: false`.
- CORS permite **solo** `http://localhost:5173`.

Para correrla, desde `backend/`: `uvicorn main:app --reload` (queda en `http://localhost:8000`).

---

## Parte 2 · Frontend

Desde `frontend/`: `npm install react-router axios`. Borra la carpeta `src/data/`: ahora todo viene de la API.

### Servicios (`src/services/`)

| Archivo | Funciones | Petición |
|---|---|---|
| `turnosService.js` | `listarTurnos()` · `obtenerTurno(id)` | GET `http://localhost:8000/turnos` · GET `…/turnos/{id}` |
| `reservasService.js` | `crearReserva(reserva)` · `listarReservas()` | POST `…/reservas` · GET `…/reservas` |

Cada función retorna `respuesta.data`. Ningún componente ni página importa `axios`: solo los servicios.

### Rutas

`main.jsx` envuelve `<App />` con `<BrowserRouter>`. `App.jsx` solo tiene las rutas (sin BrowserRouter).

| Ruta | Página (`src/pages/`) | Qué muestra |
|---|---|---|
| `/` | `Inicio.jsx` | Título **Reserva tu cancha en segundos** |
| `/turnos` | `Turnos.jsx` | **Cargando turnos...** y luego el título **Turnos de hoy** con la lista. Al tocar Reservar, va a `/turnos/{id}` |
| `/turnos/:id` | `DetalleTurno.jsx` | **Cargando turno...** y luego un título con la cancha, `Hora: …`, `Precio: …` y el `FormularioReserva` (con `deshabilitado` si el turno está ocupado) |
| `/mis-reservas` | `MisReservas.jsx` | **Cargando reservas...** y luego el título **Mis reservas** con `ListaReservas` |
| `*` | `NoEncontrada.jsx` | Título **Página no encontrada** |

- Cada página pide sus datos en un `useEffect` con su arreglo de dependencias (`[]` o `[id]`).
- Al reservar en el detalle: `crearReserva({ ...datos, turno_id: turno.id })`, luego `navigate("/mis-reservas")` y retorna `true`. Si falla, muestra el error y retorna `false`.

### Mensajes de error

| Situación | Mensaje |
|---|---|
| El backend no responde | **No pudimos conectar con el servidor. Intenta más tarde.** |
| 404 | **Ese turno no existe.** |
| 409 | El `detail` que manda la API |

---

Para tu nota: `npm test -- F3` (corre las dos partes: `F3-API` y `F3-WEB`).
