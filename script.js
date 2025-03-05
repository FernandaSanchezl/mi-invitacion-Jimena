document.addEventListener("DOMContentLoaded", function () {
    const imagen = document.querySelector(".rotar-click");

    imagen.addEventListener("click", function () {
        imagen.style.transform = "rotate(360deg)";
        setTimeout(() => {
            imagen.style.transform = "rotate(0deg)";
        }, 500);
    });
});


// Función para actualizar el contador
function actualizarContador() {
    const fechaObjetivo = new Date("May 4, 2025 12:43:00").getTime();
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
