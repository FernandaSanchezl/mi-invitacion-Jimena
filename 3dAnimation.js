import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

// Cámara
const camera = new THREE.PerspectiveCamera(
    20,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 13;

// Escena
const scene = new THREE.Scene();

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

// Variables para modelo y animación
let bee;
let mixer;

// Cargar modelo GLB
const loader = new GLTFLoader();
loader.load('/snoopy.glb',
    function (gltf) {
        bee = gltf.scene;
        scene.add(bee);

        // Animación del modelo
        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[0]).play();

        // Rotar para que esté de perfil (mirando a la derecha)
        bee.rotation.y = Math.PI / 2;

        // Movimiento de lado a lado con giro automático
        let direction = 1;
        function toggleDirection() {
            direction *= -1;
            gsap.to(bee.rotation, {
                y: direction === 1 ? Math.PI / 2 : -Math.PI / 2,
                duration: 0.5
            });
        }

        gsap.to(bee.position, {
            x: 2,
            duration: 4,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
            onRepeat: toggleDirection
        });
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado');
    },
    function (error) {
        console.error('Error al cargar modelo:', error);
    }
);

// Loop de render
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    renderer.render(scene, camera);
}
animate();

// Eventos de resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
