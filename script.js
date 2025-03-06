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

let confettiInterval; 

        function createConfetti() {
            const confettiContainer = document.createDocumentFragment();
            const colors = ['#ff0', '#ff4500', '#32cd32', '#00ced1', '#ff1493', '#1e90ff'];
    
            for (let i = 0; i < 50; i++) { 
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                document.body.appendChild(confetti);
    
                const size = Math.random() * 12 + 8;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.top = `-10px`;
                confetti.style.animationDuration = `${Math.random() * 5 + 5}s`;
                confetti.style.animationDelay = `${Math.random()}s`;
    
                confettiContainer.appendChild(confetti);

                setTimeout(() => confetti.remove(), 6000);
            }
    
            document.body.appendChild(confettiContainer);
        }
    
        confettiInterval = setInterval(createConfetti, 1000);

        setTimeout(() => {
            clearInterval(confettiInterval); 
        }, 8000);
