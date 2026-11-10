import { turnos } from "./datos.js";

const lista = document.querySelector("#lista-turnos");
const contador = document.querySelector("#contador");
let misReservas = 0;

function renderizar() {
  lista.innerHTML = turnos
    .map(
      (turno) => `
        <article class="tarjeta">
          <h3>${turno.nombre}</h3>
          <p>Costo: ${turno.precio}</p>
          <p>Hora: ${turno.hora}</p>
          <p>Cupos: ${turno.cupos}</p>
          <button class="btn-reservar" data-id="${turno.id}" ${turno.cupos === 0 ? "disabled" : ""}>
            ${turno.cupos === 0 ? "Ocupado" : "Libre"}
          </button>
        </article>
      `
    )
    .join("");

  contador.textContent = misReservas;

  document.querySelectorAll(".btn-reservar").forEach((boton) => {
    boton.addEventListener("click", () => reservar(Number(boton.dataset.id)));
  });
}

function reservar(id) {
  const turno = turnos.find((t) => t.id === id);
  if (turno.cupos === 0) return;
  turno.cupos -= 1;
  misReservas += 1;
  renderizar();
}

renderizar();