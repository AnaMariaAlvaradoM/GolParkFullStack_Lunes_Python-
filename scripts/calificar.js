// Adaptador de calificación de GolPark: corre las pruebas de cada fase y calcula la nota (0.0 a 5.0).
// Frontend y maqueta con Vitest; backend con pytest. La lista de fases sale de .github/calificacion.json
// Uso local:   npm test          → todas las fases
//              npm test -- F2    → solo la Fase 2
//              npm test -- F3    → las dos partes de la Fase 3 (API y rutas)
// En GitHub Actions además genera resultado.json y el resumen del run.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG = JSON.parse(fs.readFileSync(path.join(RAIZ, ".github", "calificacion.json"), "utf8"));
const TIEMPO_POR_ARCHIVO_MS = 60000;
const TIEMPO_POR_TEST_MS = 15000;
const MAX_FALLOS_EN_CONSOLA = 2;
const EN_GITHUB = process.env.GITHUB_ACTIONS === "true";
const VITEST = path.join(RAIZ, "node_modules", "vitest", "vitest.mjs");

function nombresDeTests(rutaTest) {
  const codigo = fs.readFileSync(path.join(RAIZ, rutaTest), "utf8");
  const js = [...codigo.matchAll(/^test\((["'`])(.+?)\1,/gm)].map((m) => m[2]);
  const py = [...codigo.matchAll(/^def (test_\w+)/gm)].map((m) => m[1]);
  return [...js, ...py];
}

function limpiar(texto) {
  return String(texto || "").replace(/\x1b\[[0-9;]*m/g, "").trim();
}

function primeraLinea(texto) {
  return limpiar(texto).split(/\r?\n/).find((l) => l.trim()) || "";
}

function traducirError(mensaje) {
  const completo = limpiar(mensaje);
  if (/Transform failed|PARSE_ERROR|SyntaxError/.test(completo)) {
    const lugar = completo.match(/((?:maqueta|frontend|backend)[\\/][\w./\\-]+\.(?:jsx?|py|html)):(\d+)/);
    const pista = (completo.match(/\[PARSE_ERROR\]\s*(.+)/) || [])[1];
    if (lugar) {
      return `Error de sintaxis en ${lugar[1].replace(/\\/g, "/")}, línea ${lugar[2]}${pista ? ` (${pista.trim()})` : ""}: revisa paréntesis, llaves, comillas y etiquetas.`;
    }
  }
  let texto = primeraLinea(mensaje);
  const dePytest = texto.match(/Failed: (.+?)"?$/);
  if (dePytest) texto = dePytest[1];
  const propio = texto.match(/^(?:AssertionError: )?(.+?): expected /);
  if (propio) return propio[1];
  if (/Falta el archivo|No encuentro|debería|Debería|debe tener|Tu backend no arranca/.test(texto)) {
    return texto.replace(/^(Error|AssertionError|Failed): /, "");
  }
  if (/Failed to (resolve|load)|Cannot find module|Does the file exist/.test(texto)) {
    const archivo = (texto.match(/["']([^"']+\.(?:jsx?|css))["']/) || [])[1];
    return `No encuentro ${archivo ? `"${archivo}"` : "un archivo que importas"}: revisa el nombre, la carpeta y la extensión.`;
  }
  if (/is not a function/.test(texto)) return "Llamas algo que no es una función: ¿le cambiaste el nombre o le falta el export?";
  if (/Element type is invalid/.test(texto)) return "Un componente no se pudo pintar: ¿le falta el export default?";
  if (/of (undefined|null)/.test(texto)) {
    const propiedad = (texto.match(/reading '([^']+)'/) || [])[1];
    return propiedad
      ? `Se intentó leer "${propiedad}" de algo que vale undefined o null: ¿llegan bien las props o los datos?`
      : "Algo vale undefined: ¿olvidaste un return o una prop?";
  }
  if (/cannot render a <Router> inside another <Router>/i.test(texto)) {
    return "Hay dos Routers: App.jsx no lleva BrowserRouter, ese va solo en main.jsx.";
  }
  if (/useNavigate|useParams|useLocation|<Link>|<NavLink>|Router/.test(texto) && /context|outside/i.test(texto)) {
    return "Usas React Router fuera de un Router: App.jsx no lleva BrowserRouter (va en main.jsx).";
  }
  if (/Timeout|timed out/i.test(texto)) return "Tiempo agotado: algo nunca terminó (¿un ciclo infinito o una promesa que no responde?).";
  return texto.length > 220 ? texto.slice(0, 220) + "…" : texto;
}

function avisoDeSintaxis(texto) {
  const limpio = limpiar(texto);
  if (!/SyntaxError|Transform failed|Parse error|Unexpected token|IndentationError/.test(limpio)) return "";
  const archivo = (limpio.match(/((?:maqueta|frontend|backend)[\\/][\w./\\-]+\.(?:jsx?|py|html))/) || [])[1];
  const donde = archivo ? `en ${archivo.replace(/\\/g, "/")}` : "en uno de tus archivos";
  return `Hay un error de sintaxis ${donde}: revisa paréntesis, llaves, comillas y etiquetas.`;
}

// ---------------- Vitest ----------------

function correrVitest(rutaTest, filtro, tiempo) {
  const salida = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "golpark-")), "vitest.json");
  const extra = filtro ? ["-t", `^${filtro.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`] : [];
  const proceso = spawnSync(
    process.execPath,
    [VITEST, "run", rutaTest, "--reporter=json", `--outputFile=${salida}`, "--pool=threads", "--no-file-parallelism", ...extra],
    { cwd: RAIZ, encoding: "utf8", timeout: tiempo, killSignal: "SIGKILL", env: { ...process.env, CI: "true", FORCE_COLOR: "0" } }
  );
  const agotado = Boolean(proceso.error && proceso.error.code === "ETIMEDOUT");
  let reporte = null;
  try { reporte = JSON.parse(fs.readFileSync(salida, "utf8")); } catch { reporte = null; }
  fs.rmSync(path.dirname(salida), { recursive: true, force: true });

  const pruebas = [];
  let avisoArchivo = "";
  for (const archivo of (reporte && reporte.testResults) || []) {
    for (const r of archivo.assertionResults || []) {
      pruebas.push({ nombre: r.title, paso: r.status === "passed", mensaje: (r.failureMessages || [])[0] || "" });
    }
    if (archivo.message) avisoArchivo = archivo.message;
  }
  return { pruebas, agotado, avisoArchivo, stderr: proceso.stderr || "" };
}

// ---------------- pytest ----------------

let pythonListo;
function buscarPython() {
  if (pythonListo !== undefined) return pythonListo;
  const candidatos = [process.env.PYTHON, "python3", "python", "py"].filter(Boolean);
  pythonListo = null;
  for (const comando of candidatos) {
    const prueba = spawnSync(comando, ["-c", "import fastapi, pytest, pytest_timeout, httpx"], { encoding: "utf8" });
    if (prueba.status === 0) { pythonListo = comando; break; }
  }
  return pythonListo;
}

function correrPytest(rutaTest, filtro, tiempo) {
  const python = buscarPython();
  if (!python) {
    return { pruebas: [], agotado: false, avisoArchivo: "No encontré Python con FastAPI y pytest: ejecuta pip install -r requirements-pruebas.txt", stderr: "" };
  }
  const carpeta = fs.mkdtempSync(path.join(os.tmpdir(), "golpark-"));
  const salida = path.join(carpeta, "pytest.xml");
  const extra = filtro ? ["-k", filtro] : [];
  const proceso = spawnSync(
    python,
    ["-m", "pytest", rutaTest, "-q", "-p", "no:cacheprovider", "--timeout=5", `--junitxml=${salida}`, ...extra],
    { cwd: RAIZ, encoding: "utf8", timeout: tiempo, killSignal: "SIGKILL", env: { ...process.env, PYTHONDONTWRITEBYTECODE: "1" } }
  );
  const agotado = Boolean(proceso.error && proceso.error.code === "ETIMEDOUT");
  let xml = "";
  try { xml = fs.readFileSync(salida, "utf8"); } catch { xml = ""; }
  fs.rmSync(carpeta, { recursive: true, force: true });

  const pruebas = [];
  for (const caso of xml.matchAll(/<testcase\b([^>]*?)(\/>|>([\s\S]*?)<\/testcase>)/g)) {
    const nombre = (caso[1].match(/\bname="([^"]+)"/) || [])[1];
    const cuerpo = caso[3] || "";
    const falla = cuerpo.match(/<(failure|error)\b[^>]*message="([^"]*)"/);
    const omitido = /<skipped\b/.test(cuerpo);
    if (nombre) {
      pruebas.push({ nombre, paso: !falla && !omitido, mensaje: falla ? desescapar(falla[2]) : omitido ? "Prueba omitida" : "" });
    }
  }
  const sintaxis = /SyntaxError|IndentationError/.test(proceso.stdout + proceso.stderr) ? proceso.stdout + proceso.stderr : "";
  return { pruebas, agotado, avisoArchivo: sintaxis, stderr: proceso.stderr || "" };
}

function desescapar(texto) {
  return texto.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#10;/g, "\n").replace(/&amp;/g, "&");
}

// ---------------- Calificación ----------------

function correrEjercicio(ejercicio) {
  const nombres = nombresDeTests(ejercicio.test);
  const total = nombres.length;
  const correr = ejercicio.runner === "pytest" ? correrPytest : correrVitest;
  let r = correr(ejercicio.test, null, TIEMPO_POR_ARCHIVO_MS);
  let aviso = "";

  if (r.agotado) {
    aviso = "Tiempo agotado: revisa si tienes un ciclo infinito o una petición que nunca responde.";
    const pruebas = [];
    for (const nombre of nombres) {
      const uno = correr(ejercicio.test, nombre, TIEMPO_POR_TEST_MS);
      const encontrado = uno.pruebas.find((p) => p.nombre === nombre);
      pruebas.push(uno.agotado || !encontrado ? { nombre, paso: false, mensaje: "Tiempo agotado" } : encontrado);
    }
    r = { ...r, pruebas };
  } else {
    aviso = avisoDeSintaxis(r.avisoArchivo || r.stderr);
    if (!aviso && r.avisoArchivo && r.pruebas.length === 0) aviso = traducirError(r.avisoArchivo);
  }

  const contadas = r.pruebas.filter((p) => nombres.includes(p.nombre));
  const pasados = Math.min(contadas.filter((p) => p.paso).length, total);
  const fallidos = nombres
    .filter((n) => !contadas.some((p) => p.nombre === n && p.paso))
    .map((n) => {
      const p = contadas.find((x) => x.nombre === n);
      return { nombre: n, mensaje: p ? traducirError(p.mensaje) : "" };
    });

  const mensajes = [...new Set(fallidos.map((f) => f.mensaje))];
  if (!aviso && pasados === 0 && fallidos.length > 1 && mensajes.length === 1 && mensajes[0]) {
    aviso = mensajes[0];
    for (const f of fallidos) f.mensaje = "";
  }

  return { id: ejercicio.id, titulo: ejercicio.titulo, pasados, total, fallidos, aviso };
}

function calcularNota(resultados) {
  const pasados = resultados.reduce((suma, r) => suma + r.pasados, 0);
  const total = resultados.reduce((suma, r) => suma + r.total, 0);
  const nota = total === 0 ? 0 : Math.round((pasados / total) * 50) / 10;
  return { pasados, total, nota };
}

function icono(r) {
  if (r.pasados === r.total) return "✅";
  return r.pasados > 0 ? "🟡" : "❌";
}

function imprimirEnConsola(resultados, resumen) {
  console.log(`\n${CONFIG.curso} · Resultados de tu proyecto\n`);
  for (const r of resultados) {
    console.log(`${icono(r)} ${r.id.padEnd(7)} ${r.titulo.padEnd(24)} ${r.pasados}/${r.total} pruebas`);
    if (r.aviso) console.log(`     ⚠️  ${r.aviso}`);
    const conMensaje = r.aviso ? r.fallidos.filter((f) => f.mensaje) : r.fallidos;
    for (const f of conMensaje.slice(0, MAX_FALLOS_EN_CONSOLA)) {
      console.log(`     ✗ ${f.nombre}`);
      if (f.mensaje) console.log(`       → ${f.mensaje}`);
    }
    const ocultos = r.fallidos.length - Math.min(conMensaje.length, MAX_FALLOS_EN_CONSOLA);
    if (ocultos > 0) console.log(`     … y ${ocultos} prueba(s) más por corregir`);
  }
  console.log(`\n📊 Pruebas aprobadas: ${resumen.pasados}/${resumen.total}`);
  console.log(`🎯 Nota: ${resumen.nota.toFixed(1)} / 5.0\n`);
}

function escribirResumenGithub(resultados, resumen) {
  const filas = resultados.map((r) => `| ${icono(r)} | ${r.titulo} | ${r.pasados}/${r.total} |`);
  const detalles = resultados
    .filter((r) => r.fallidos.length || r.aviso)
    .map((r) => {
      const items = r.fallidos.map((f) => `- ✗ ${f.nombre}${f.mensaje ? ` → ${f.mensaje}` : ""}`);
      if (r.aviso) items.unshift(`- ⚠️ ${r.aviso}`);
      return `**${r.titulo}**\n${items.join("\n")}`;
    });
  const markdown = [
    `## 🎯 Nota: ${resumen.nota.toFixed(1)} / 5.0`,
    `Pruebas aprobadas: **${resumen.pasados}/${resumen.total}**`,
    "",
    "| Estado | Fase | Pruebas |",
    "|---|---|---|",
    ...filas,
    "",
    detalles.length ? "### Qué falta por corregir\n\n" + detalles.join("\n\n") : "### ¡Todo perfecto! 🎉",
  ].join("\n");
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown + "\n");
  const paraArtefacto = resultados.map(({ id, pasados, total }) => ({ id, pasados, total }));
  fs.writeFileSync(path.join(RAIZ, "resultado.json"), JSON.stringify({ ejercicios: paraArtefacto }));
}

if (!fs.existsSync(VITEST)) {
  console.log("\n❌ Falta instalar las herramientas de las pruebas: ejecuta npm install en la raíz del repositorio.\n");
  process.exit(1);
}

const filtro = (process.argv[2] || "").toUpperCase();
const ejercicios = CONFIG.ejercicios.filter((e) => !filtro || e.id === filtro || e.id.startsWith(filtro + "-"));

if (ejercicios.length === 0) {
  const ids = CONFIG.ejercicios.map((e) => e.id).join(", ");
  console.log(`No encontré la fase "${process.argv[2]}". Las disponibles son: ${ids}`);
  process.exit(1);
}

const resultados = ejercicios.map(correrEjercicio);
const resumen = calcularNota(resultados);

imprimirEnConsola(resultados, resumen);
if (EN_GITHUB) escribirResumenGithub(resultados, resumen);

process.exitCode = resumen.pasados === resumen.total ? 0 : 1;
