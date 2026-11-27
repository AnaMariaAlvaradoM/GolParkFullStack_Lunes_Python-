# Proyecto · Gestión de Turnos y Reservas

Aplicación web dividida en un backend con FastAPI y un frontend desarrollado con React y Vite. La arquitectura centraliza las peticiones HTTP en `src/api/cliente.js` y el manejo de errores en `src/utils/errores.js` para preparar la integración de autenticación en el Módulo 2.

---

## Ejecución del proyecto

### Backend (FastAPI)

1. Ubícate en la carpeta del backend (y activa tu entorno virtual si corresponde).
2. Inicia el servidor en modo desarrollo:

```bash
uvicorn main:app --reload
```

El servidor quedará disponible por defecto en `http://localhost:8000`.

### Frontend (React + Vite)

1. Ubícate en la carpeta `frontend` e instala las dependencias si aún no lo hiciste (`npm install`).
2. Crea el archivo `frontend/.env` tomando como referencia `frontend/.env.example`:

```env
VITE_API_URL=http://localhost:8000
```

3. Inicia el servidor de desarrollo del frontend:

```bash
npm run dev
```

4. Para ejecutar las pruebas automatizadas de la Fase 4:

```bash
npm test -- F4
```

---

## Endpoints de la API

| Recurso | Método | Ruta | Descripción |
|---|---|---|---|
| Turnos | `GET` | `/turnos` | Lista los turnos disponibles |
| Turnos | `GET` | `/turnos/{turno_id}` | Obtiene el detalle de un turno específico |
| Reservas | `GET` | `/reservas` | Lista las reservas registradas |
| Reservas | `POST` | `/reservas` | Crea una nueva reserva para un turno |
| Reservas | `DELETE` | `/reservas/{reserva_id}` | Cancela o elimina una reserva existente |