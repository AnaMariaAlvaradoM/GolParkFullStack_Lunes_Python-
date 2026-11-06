import { turnos } from "./datos.js";

const listaTurnos = document.querySelector("#lista-turnos");
const contador = document.querySelector("#contador");
let reservasHechas = 0;

function actualizarContador() {
  contador.textContent = String(reservasHechas);
}

function pintarTurnos() {
  listaTurnos.innerHTML = turnos
    .map((turno) => {
      const botonTexto = turno.disponible ? "Reservar" : "Ocupado";
      const botonDisabled = turno.disponible ? "" : "disabled";
      const precioFormateado = turno.precio.toLocaleString("es-CO");

      return `
        <article class="tarjeta ${turno.disponible ? "libre" : "ocupada"}">
          <div class="tarjeta-header">
            <h2>${turno.cancha}</h2>
            <span class="estado ${turno.disponible ? "estado-libre" : "estado-ocupado"}">${turno.disponible ? "Libre" : "Ocupado"}</span>
          </div>
          <p>Hora: ${turno.hora}</p>
          <p>Precio: $${precioFormateado}</p>
          <button class="btn-reservar" data-id="${turno.id}" ${botonDisabled}>${botonTexto}</button>
        </article>
      `;
    })
    .join("");

  listaTurnos.querySelectorAll(".btn-reservar").forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = Number(boton.dataset.id);
      const turno = turnos.find((item) => item.id === id);

      if (!turno || !turno.disponible) {
        return;
      }

      turno.disponible = false;
      reservasHechas += 1;
      actualizarContador();
      pintarTurnos();
    });
  });
}

actualizarContador();
pintarTurnos();
