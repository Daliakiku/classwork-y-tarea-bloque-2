/* 05. Errores 3D. */
console.log('05. Errores 3D.');

// --- IMPORTAR THREE.JS ---
//import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// --- ESCENA, CÁMARA Y RENDERER ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
);


window.addEventListener('resize', () => 
    {
        // Update sizes to new window dimensions
        sizes.width = window.innerWidth; 
        sizes.height = window.innerHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix(); // must be called after any change to the camera's properties

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)

        // Optional: set pixel ratio for better quality on high-DPI screens
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    });

const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

camera.position.z = 10;

// --- LUCES ---
const ambientLight = new THREE.AmbientLight(0x0000ff, 0.1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff0000, 1);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);


// --- OBJETOS ---
const cubeGeo = new THREE.BoxGeometry();
const cubeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(cubeGeo, cubeMat);
scene.add(cube);
cube.position.z = -3;

const sphereGeo = new THREE.SphereGeometry(1.5, 32, 32);
const sphereMat = new THREE.MeshStandardMaterial({ colour: 0xffffff });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphere);

// --- INTERACCIÓN CON MOUSE ---
let mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
});


// --- ANIMACIÓN ---

let rotationSpeed = 0.02;

function animate() {
    requestAnimationFrame(animate);

    // Rotaciones
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    sphere.rotation.y += rotationSpeed;

    // Movimiento de la esfera según mouse
    sphere.position.x = mouse.x * 5;
    sphere.position.y = mouse.y * 5;

    renderer.render(scene, camera);
}

animate();