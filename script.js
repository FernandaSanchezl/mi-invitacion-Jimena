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
    const elements = document.querySelectorAll(".fade-in");

    const showOnScroll = () => {
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 1000) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", showOnScroll);
    showOnScroll(); // también verifica al cargar
  });
