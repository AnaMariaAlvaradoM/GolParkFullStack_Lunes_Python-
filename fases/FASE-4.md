# Fase 4 · Entrega profesional

**Entrega:** domingo 29 de noviembre de 2026 · 11:59 p. m. · **Se califica con:** `npm test -- F4`

---

## Qué construyes

En el Módulo 2 llega el inicio de sesión, y cada petición tendrá que llevar un token. Deja el proyecto ordenado para que ese cambio toque un solo archivo.

---

## El contrato (lo que revisan las pruebas)

### Un solo cliente HTTP · `src/api/cliente.js`

```javascript
export const cliente = axios.create({ baseURL: import.meta.env.VITE_API_URL });
```

- `frontend/.env` con `VITE_API_URL=http://localhost:8000` (no se sube a GitHub).
- `frontend/.env.example` con la misma línea (sí se sube).
- `frontend/.gitignore` con una línea `.env`.
- Los dos servicios importan `{ cliente }` desde `../api/cliente.js` y **no** importan `axios`.

### Errores en un solo lugar · `src/utils/errores.js`

```javascript
export function mensajeDeError(error) { … }
```

| Error | Retorna |
|---|---|
| Sin `error.response` (backend apagado) | `"No pudimos conectar con el servidor. Intenta más tarde."` |
| 404 | `"Ese turno no existe."` |
| 409 | `error.response.data.detail` |
| Cualquier otro | `"Ocurrió un error inesperado. Intenta de nuevo."` |

Las páginas `Turnos`, `DetalleTurno` y `MisReservas` usan `mensajeDeError` y no escriben esos textos a mano.

### Layout y navegación

- `src/components/Layout.jsx` muestra `Encabezado`, `<Outlet />` y `PiePagina`. Todas las rutas van dentro de `<Route element={<Layout />}>`.
- El encabezado tiene cuatro `NavLink`: **Inicio** (`/`, con `end`), **Turnos** (`/turnos`), **Mis reservas** (`/mis-reservas`) e **Ingresar** (`/login`).

### Página de login · `src/pages/Login.jsx`

Ruta `/login` con el título **Ingresar** y un formulario con dos campos dentro de su `<label>`: **Correo** y **Contraseña**. Aún no se conecta a nada: eso es el Módulo 2.

### `PROYECTO.md` (en la raíz del repo)

Explica cómo correr el backend (`uvicorn main:app --reload`) y el frontend (`npm run dev`), y tiene la tabla de endpoints (`/turnos` y `/reservas`).

### Código limpio

No quedan `console.log` en `frontend/src`.

---

Para tu nota: `npm test -- F4`. Y antes de entregar, `npm test` completo: esa es tu nota del módulo.
