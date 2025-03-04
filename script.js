document.addEventListener("DOMContentLoaded", function () {
    const imagen = document.querySelector(".rotar-click");

    imagen.addEventListener("click", function () {
        imagen.style.transform = "rotate(360deg)";
        setTimeout(() => {
            imagen.style.transform = "rotate(0deg)";
        }, 500);
    });
});


// Efecto de aparición de la invitación cuando se carga la página
window.onload = function () {
    const container = document.querySelector('.container');
    container.style.opacity = 0;
    container.style.transition = 'opacity 1s';
    setTimeout(() => {
        container.style.opacity = 1;
    }, 100);
};

// Confirmar asistencia (con WhatsApp)
document.querySelector('.boton').addEventListener('click', function () {
    alert('¡Nos vemos en la fiesta! 🎉');
});


document.addEventListener("DOMContentLoaded", function () {
    function actualizarContador() {
        const fechaCumple = new Date("May 4, 2025 15 :00:00").getTime();
        const ahora = new Date().getTime();
        const tiempoRestante = fechaCumple - ahora;

        if (tiempoRestante <= 0) {
            document.getElementById("contador").innerHTML = "🎉 ¡Hoy es el cumpleaños! 🎂🥳";
            return;
        }

        const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
        const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

        document.getElementById("dias").textContent = dias;
        document.getElementById("horas").textContent = horas;
        document.getElementById("minutos").textContent = minutos;
        document.getElementById("segundos").textContent = segundos;
    }

    actualizarContador(); // Llamar la primera vez
    setInterval(actualizarContador, 1000); // Actualizar cada segundo
});
