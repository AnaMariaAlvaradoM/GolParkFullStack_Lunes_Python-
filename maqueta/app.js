import { turnos } from "./datos.js";

let contador = 0;

function renderizar() {
  const contenedor = document.querySelector("#lista-turnos");
  if (!contenedor) return;

  const html = turnos.map((turno) => `
    <article class="tarjeta">
      <h3>${turno.cancha}</h3>
      <p>Hora: ${turno.hora}</p>
      <p>Precio: $${turno.precio.toLocaleString("es-CO")}</p>
      <button class="btn-reservar" data-id="${turno.id}" ${turno.disponible ? "" : "disabled"}>
        ${turno.disponible ? "Reservar" : "Ocupado"}
      </button>
    </article>
  `).join("");

  contenedor.innerHTML = html;

  const botones = contenedor.querySelectorAll(".btn-reservar");
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = Number(boton.dataset.id);
      const turno = turnos.find((t) => t.id === id);
      if (turno && turno.disponible) {
        turno.disponible = false;
        contador += 1;
        const spanContador = document.querySelector("#contador");
        if (spanContador) {
          spanContador.textContent = contador;
        }
        renderizar();
      }
    });
  });
}

renderizar();
