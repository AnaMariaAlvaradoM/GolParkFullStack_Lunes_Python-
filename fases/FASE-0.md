# Fase 0 · La primera página de GolPark

**Entrega:** domingo 1 de noviembre de 2026 · 11:59 p. m. · **Se califica con:** `npm test -- F0`

---

## El cliente

> **De:** Diego Rojas · diego@golpark.co
> **Asunto:** Dos equipos llegaron al mismo turno
>
> Hola:
>
> Tengo dos canchas sintéticas de fútbol 5. Los turnos se separan por WhatsApp y el sábado pasó lo peor: dos equipos llegaron a la Cancha 1 a las 7:00 p. m. y uno se fue molesto.
>
> Necesito una página donde la gente vea los turnos de hoy, con la cancha, la hora y el precio, y pueda separar uno libre. Si un turno ya está ocupado, que no se pueda reservar.
>
> Estos son los turnos de hoy:
>
> | Turno | Cancha | Hora | Precio | Estado |
> |---|---|---|---|---|
> | 1 | Cancha 1 | 6:00 p. m. | $120.000 | libre |
> | 2 | Cancha 1 | 7:00 p. m. | $150.000 | ocupado |
> | 3 | Cancha 1 | 8:00 p. m. | $150.000 | libre |
> | 4 | Cancha 2 | 6:00 p. m. | $110.000 | libre |
> | 5 | Cancha 2 | 7:00 p. m. | $140.000 | ocupado |
> | 6 | Cancha 2 | 9:00 p. m. | $140.000 | libre |
>
> Para reservar, más adelante, necesito el nombre del equipo y un celular.
>
> Diego

---

## Qué construyes

La misma página que hicimos en clase con PulsoFit, ahora para GolPark, en la carpeta `maqueta/` en la raíz de tu repositorio.

| Archivo | Qué lleva |
|---|---|
| `maqueta/index.html` | La estructura |
| `maqueta/estilos.css` | La presentación (libre, a tu gusto) |
| `maqueta/datos.js` | Los 6 turnos |
| `maqueta/app.js` | Pintar los turnos y reservar |

---

## El contrato (lo que revisan las pruebas)

### `datos.js`

Exporta un arreglo llamado `turnos` con los 6 turnos del correo, en ese orden y con estos campos exactos:

```javascript
export const turnos = [
  { id: 1, cancha: "Cancha 1", hora: "6:00 p. m.", precio: 120000, disponible: true },
  // … los otros 5 turnos del correo
];
```

`precio` es un número (sin puntos ni signo `$`) y `disponible` es `true` (libre) o `false` (ocupado).

### `index.html`

- Tiene `<section id="lista-turnos"></section>` vacía: las tarjetas las pinta `app.js`.
- Tiene `<span id="contador">0</span>` para contar las reservas.
- Carga el código con `<script type="module" src="app.js"></script>`.
- No tiene ningún `<article>` escrito a mano.

### `app.js`

- Importa los turnos: `import { turnos } from "./datos.js";`.
- Por cada turno pinta un `<article>` dentro de `#lista-turnos`, usando `map` y `join("")`.
- Cada tarjeta muestra la cancha, `Hora: 6:00 p. m.` y `Precio: $120.000` (el precio con `toLocaleString("es-CO")`).
- Cada tarjeta tiene un botón `<button class="btn-reservar" data-id="1">`:
  - si el turno está libre, dice **Reservar**;
  - si está ocupado, dice **Ocupado** y tiene el atributo `disabled`.
- Al tocar **Reservar**, ese turno pasa a ocupado, el contador sube 1 y la lista se vuelve a pintar.

---

## Cómo probarla

Desde la carpeta `maqueta/`:

```bash
python -m http.server 5500
```

Abre `http://localhost:5500`. Para ver tu nota de esta fase, desde la raíz del repo: `npm test -- F0`.
