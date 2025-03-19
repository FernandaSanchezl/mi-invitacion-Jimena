import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    3,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 10;

const scene = new THREE.Scene();
let bee;
let mixer;
const loader = new GLTFLoader();
loader.load('/butterfly.glb',
    function (gltf) {
        bee = gltf.scene;
        scene.add(bee);

        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[0]).play();
        modelMove();
    },
    function (xhr) {},
    function (error) {}
);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('contenedor3D').appendChild(renderer.domElement);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);


const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.02);
};
reRender3D();

let arrPositionModel = [
    {
        id: "w",
        position: {x: 0, y: 2, z: 3},
        rotation: { x: Math.PI / 2, y: Math.PI / 40, z: 0 }
    },
    {
        id: "e",
        position: { x: 1, y: -1, z: -5 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
    },
    {
        id: "r",
        position: { x: -1, y: -1, z: -5 },
        rotation: { x: 0, y: 0.5, z: 0 },
    },
    {
        id: "t",
        position: { x: 0.8, y: -1, z: 0 },
        rotation: { x: 0.3, y: -0.5, z: 0 },
    },
];
const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(bee.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(bee.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        })
    }
}
window.addEventListener('scroll', () => {
    if (bee) {
        modelMove();
    }
})
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

document.addEventListener("DOMContentLoaded", function () {
    const imagen = document.querySelector(".rotar-click");

    imagen.addEventListener("click", function () {
        imagen.style.transform = "rotate(360deg)";
        setTimeout(() => {
            imagen.style.transform = "rotate(0deg)";
        }, 500);
    });
});


function actualizarContador() {
    const fechaObjetivo = new Date("Mayo 4, 2025 12:43:00").getTime();
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
            const colors = ['#ffa8ff', ' #de84dd', ' #bc60bc', ' #9b3c9a', '#7a1879 ', '#bc60bc'];
    
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

        