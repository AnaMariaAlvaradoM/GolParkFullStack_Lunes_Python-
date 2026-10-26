# ⚽ GolPark · Proyecto calificable del Módulo 1

### Python Full Stack Developer · Dev Senior

---

## 1. ¿Qué es esto?

### El proyecto

Durante el Módulo 1 vas a construir el sistema de reservas de **GolPark**, un negocio de canchas sintéticas de fútbol 5. En clase hacemos lo mismo con PulsoFit (un gimnasio); aquí lo aplicas tú a otro negocio.

El proyecto crece en 5 fases, una por semana: maqueta en HTML, CSS y JS → React → formulario con estado → API con FastAPI y rutas → entrega profesional.

### La calificación es automática

Cada vez que haces `git push`, GitHub corre las pruebas de todas las fases sobre tu código y te deja la nota en tu Pull Request. Puedes subir la nota todas las veces que quieras hasta la fecha límite.

### ¿Qué es una prueba (test)?

- **Técnica:** un programa que ejecuta tu código con datos conocidos y compara el resultado con el esperado.
- **En la vida real:** como la revisión técnico-mecánica de un carro: no le importa cómo armaste el motor, revisa que frene, que prenda las luces y que no bote humo.

Algunas pruebas, además, revisan **cómo** está hecho tu código (por ejemplo, que uses `useState` o que ningún componente importe `axios`), porque eso es lo que pide la fase.

---

## 2. Las fases

Cada fase tiene su enunciado completo en la carpeta `fases/`, con el correo del cliente y **el contrato**: los nombres de archivos, textos y comportamientos exactos que revisan las pruebas.

| Fase | Tema | Enunciado | Carpeta | Fecha sugerida |
|---|---|---|---|---|
| F0 | Maqueta en HTML, CSS y JS | `fases/FASE-0.md` | `maqueta/` | dom 1 nov |
| F1 | Componentes en React con Vite y Tailwind | `fases/FASE-1.md` | `frontend/` | dom 8 nov |
| F2 | Formulario, validación y estado | `fases/FASE-2.md` | `frontend/` | dom 15 nov |
| F3 | API con FastAPI, rutas y Axios | `fases/FASE-3.md` | `backend/` y `frontend/` | dom 22 nov |
| F4 | Estructura profesional | `fases/FASE-4.md` | `frontend/` y `PROYECTO.md` | dom 29 nov |

**Fecha límite de todo el proyecto:** domingo 29 de noviembre de 2026 · 11:59 p. m.

La nota sale de **todas** las pruebas juntas (son 65). Las fechas de cada fase son para que no se te acumule el trabajo: si vas al día, tu nota sube cada semana.

---

## 3. Paso 1 · Fork

### Qué es

- **Técnica:** un fork es una copia de un repositorio en tu propia cuenta de GitHub. Lo que cambies en tu copia no afecta el original.
- **En la vida real:** como sacar fotocopia del cuaderno de la profe: escribes en tu fotocopia, no en su cuaderno.

### Cómo hacerlo

1. Entra al repositorio de la profe (el enlace está en la plataforma).
2. Arriba a la derecha, haz clic en **Fork**.
3. Deja el nombre como está y haz clic en **Create fork**.

### Cómo saber que quedó bien

Arriba a la izquierda debe decir **tu-usuario/GolParkFullStack** y, debajo, "forked from …".

---

## 4. Paso 2 · Clone

1. En **tu** fork, haz clic en el botón verde **Code** y copia la URL.
2. Abre Cursor (o VS Code) y la terminal: menú **Terminal → New Terminal**.
3. Ejecuta, con **tu** URL:

```bash
git clone https://github.com/TU-USUARIO/GolParkFullStack.git
cd GolParkFullStack
cursor .
```

Si usas VS Code, el último comando es `code .`.

### Instala las herramientas de las pruebas (una sola vez)

Necesitas **Node.js 24 LTS** y **Python** (el mismo que usaste en el curso de backend). Desde la raíz del repo:

```bash
npm install
pip install -r requirements-pruebas.txt
```

El primero instala las herramientas de las pruebas del frontend (Vitest). El segundo, FastAPI y pytest para las pruebas de la API. No tienen nada que ver con el `npm install` de tu carpeta `frontend/`: ese lo harás en la Fase 1.

---

## 5. Paso 3 · Resolver

### Dónde escribes

Solo en estas carpetas y archivos, que vas creando fase a fase: `maqueta/`, `frontend/`, `backend/` y `PROYECTO.md`. Todo lo demás es de la profe (ver la sección 10).

### Las tres reglas de oro

1. **Respeta los nombres del contrato.** Si la fase dice `TarjetaTurno.jsx`, no es `Tarjeta.jsx`. Si dice el texto "Ocupado", no es "OCUPADO".
2. **No borres los `export`.** Son la puerta por donde las pruebas usan tu código.
3. **Lee el enunciado completo de la fase antes de empezar.** Cada detalle del contrato tiene una prueba.

### Un ejemplo de la forma (no resuelve nada)

Si un contrato dijera "`Saludo.jsx` muestra un `<h2>` con el texto Hola", la forma sería:

```jsx
export default function Saludo() {
  return <h2>Hola</h2>;
}
```

---

## 6. Paso 4 · Probar tu nota en tu computador

### Todas las fases

```bash
npm test
```

### Solo una fase

```bash
npm test -- F2
```

`npm test -- F3` corre las dos partes de la Fase 3 (`F3-API` y `F3-WEB`).

### Cómo leer el resultado

- ✅ todas las pruebas de esa fase pasan;
- 🟡 pasan algunas: debajo aparece cuál falla y por qué;
- ❌ no pasa ninguna.

Al final ves cuántas pruebas pasaste y tu nota de 0.0 a 5.0. Es la misma que te pondrá GitHub.

---

## 7. Paso 5 · Subir tus cambios

```bash
git add .
git commit -m "Fase 1: componentes en React"
git push
```

- `git add .` mete tus cambios en la caja.
- `git commit -m "…"` cierra la caja y le pone una etiqueta que dice qué hiciste.
- `git push` envía la caja a tu fork en GitHub.

Haz al menos un commit por fase, con un mensaje que diga qué hiciste.

---

## 8. Paso 6 · Pull Request (solo UNO en todo el módulo)

### Qué es

- **Técnica:** un Pull Request (PR) es una solicitud para que la profe revise los cambios de tu fork.
- **En la vida real:** como radicar un documento en una oficina: lo radicas una vez y, si traes correcciones, se agregan al mismo radicado.

### Cómo abrirlo

1. En **tu** fork, haz clic en **Contribute → Open pull request**.
2. Revisa que diga: base repository **de la profe**, base **main** ← tu fork, **main**.
3. **Título: tu nombre completo.**
4. Haz clic en **Create pull request**.

Ábrelo en la Fase 0 y déjalo abierto todo el módulo. Cada `git push` lo actualiza solo: **no abras otro**.

---

## 9. Paso 7 · Ver tu nota

En tu Pull Request, a los pocos minutos, aparece:

- un comentario con tu nota y una tabla por fase (✅ 🟡 ❌);
- una etiqueta **Nota X.X**, que ve la profe en la lista de PRs;
- el enlace **🔎 Ver qué falta por corregir**, con el detalle de cada prueba.

Para subir la nota, corrige, prueba con `npm test` y haz `git push`. El comentario se actualiza solo.

### Ojo con la fecha límite

Después del domingo 29 de noviembre a las 11:59 p. m., los `push` ya no cambian la nota. Si tu primera entrega llega después de esa hora, el PR queda con la etiqueta **⏰ Fuera de plazo**.

---

## 10. Archivos que NO debes modificar

`README.md`, `fases/`, `tests/`, `scripts/`, `.github/`, `package.json`, `package-lock.json`, `vitest.config.js` y `requirements-pruebas.txt`.

Si los modificas, tu PR queda con la etiqueta **⚠️ Revisar** y la profe lo revisa a mano. Igual, tu nota se calcula siempre con las pruebas originales: cambiarlas no sube la nota.

---

## 11. Errores frecuentes

### `npm` o `node` no se reconoce como un comando

No tienes Node.js instalado. Descarga la versión **LTS** de nodejs.org, instálala y vuelve a abrir la terminal.

### "Falta instalar las herramientas de las pruebas"

No corriste `npm install` en la **raíz** del repo. Hazlo una vez.

### "No encontré Python con FastAPI y pytest"

Corre `pip install -r requirements-pruebas.txt` en la raíz del repo, con el mismo Python que usas en la terminal.

### "Falta el archivo …"

El archivo no existe o tiene otro nombre o carpeta. Compara letra por letra con el contrato de la fase.

### "… debe tener un export default con el componente"

Escribiste `function TarjetaTurno` sin `export default` adelante.

### "Se intentó leer … de algo que vale undefined"

Algo que esperabas no llegó: una prop con otro nombre, un `return` que falta o datos que aún no cargan.

### "Error de sintaxis en … línea …"

Hay un paréntesis, una llave, una comilla o una etiqueta sin cerrar en ese archivo y esa línea.

### "Tiempo agotado"

Algo nunca termina: un ciclo infinito o una petición que no responde.

### "Tu código debería…" o "… no debería…"

Es una prueba de estructura: el resultado puede estar bien, pero la fase pide hacerlo de una forma específica. El mensaje dice cuál.

### "Please tell me who you are"

Git no sabe quién eres. Configúralo una vez:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"
```

### Error 403 al hacer `git push`

Clonaste el repositorio de la profe en lugar de tu fork. Vuelve al Paso 2 con la URL de **tu** fork.

---

© 2026 Ana Alvarado · Educadora Tech & Desarrolladora Full Stack · Todos los derechos reservados · linkedin.com/in/ana-alvarado-instructora-full-stack
