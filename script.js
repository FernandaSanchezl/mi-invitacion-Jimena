import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';



function actualizarContador() {
    const fechaObjetivo = new Date("May 4, 2025 14:00:00").getTime();
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia > 0) {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById("dias").textContent = dias;
        document.getElementById("horas").textContent = horas;
        document.getElementById("minutos").textContent = minutos;
        document.getElementById("segundos").textContent = segundos;
    } else {
        document.getElementById("contador").innerHTML = "¡La fiesta ha comenzado!";
    }
}

// Actualizar cada segundo
setInterval(actualizarContador, 1000);

// Llamar una vez al cargar la página
actualizarContador();
function getRandomColor() {
    const colors = ['#761274', '#892586', '#9c3998', '#ae4caa', '#c15fbc', 'rgba(117, 0, 130, 0.77)'];
    return colors[Math.floor(Math.random() * colors.length)];
}



function createConfetti() {
    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        document.body.appendChild(confetti);
        document.querySelectorAll('.confetti').forEach(confetti => {
            confetti.style.backgroundColor = getRandomColor();
        });
        let size = Math.random() * 10 + 5;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    }
}
createConfetti();
setTimeout(() => {
    let confettiElements = document.querySelectorAll(".confetti");
    confettiElements.forEach(el => el.parentNode.removeChild(el));
}, 10000);



  document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.getElementById("text");

    // Empieza la animación de la máquina de escribir al cargar la página
    setTimeout(() => {
      textElement.style.animationPlayState = "running";
    }, 1000); // Esto espera 1 segundo antes de iniciar

    // Si quieres que empiece cuando hagas scroll, usa esto:
    // const onScroll = () => {
    //   const rect = textElement.getBoundingClientRect();
    //   if (rect.top < window.innerHeight - 100) {
    //     textElement.style.animationPlayState = "running";
    //   }
    // };
    // window.addEventListener("scroll", onScroll);
  });



  document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in-text");

    const onScroll = () => {
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // Para que se ejecute al cargar la página
  });




  const emojis = ["🎈", "🎉", "🍰", "🎁", "🎂", "💌", "🌟", "🍬"];
  const cartas = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
  const juego = document.getElementById("juego");
  const mensaje = document.getElementById("mensaje");

  let seleccionadas = [];
  let bloqueado = false;

  cartas.forEach((icono, index) => {
    const div = document.createElement("div");
    div.classList.add("carta");
    div.dataset.icono = icono;
    div.dataset.index = index;
    div.textContent = "";
    juego.appendChild(div);
  });

  juego.addEventListener("click", (e) => {
    const carta = e.target;
    if (
      !carta.classList.contains("carta") ||
      carta.classList.contains("volteada") ||
      bloqueado
    ) return;

    carta.textContent = carta.dataset.icono;
    carta.classList.add("volteada");
    seleccionadas.push(carta);

    if (seleccionadas.length === 2) {
      bloqueado = true;
      const [a, b] = seleccionadas;
      if (a.dataset.icono === b.dataset.icono) {
        seleccionadas = [];
        bloqueado = false;
        // Revisar si todas las cartas están descubiertas
        if (document.querySelectorAll(".volteada").length === cartas.length) {
          mensaje.textContent = "¡Felicidades, encontraste todas las parejas!";
        }
      } else {
        setTimeout(() => {
          a.classList.remove("volteada");
          b.classList.remove("volteada");
          a.textContent = "";
          b.textContent = "";
          seleccionadas = [];
          bloqueado = false;
        }, 800);
      }
    }
  });