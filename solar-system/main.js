import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



//create canvas
const canvas = document.querySelector('canvas.canvas');

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

sizes.width = window.innerWidth;
sizes.height = window.innerHeight;

//create scene
const scene = new THREE.Scene();


//create mesh
const sunGeo = new THREE.SphereGeometry(1)
const sunMat = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const sunMesh = new THREE.Mesh(sunGeo, sunMat)
scene.add(sunMesh);

//add the rest of the planets
// Array de datos de los planetas
const planets = [
    { size: 0.5, color: 0x00ff00, distance: 2, speed: 0.01, angle: 0 }, // Planeta verde
    { size: 0.7, color: 0x0000ff, distance: 4, speed: 0.008, angle: 0 }, // Planeta azul
    { size: 0.4, color: 0xff0000, distance: 6, speed: 0.005, angle: 0 }  // Planeta rojo
];

// Crear los planetas y añadirlos a la escena
const planetMeshes = [];
for (let i = 0; i < planets.length; i++) {
    const planetGeo = new THREE.SphereGeometry(planets[i].size);
    const planetMat = new THREE.MeshStandardMaterial({ color: planets[i].color });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);

    // Posicionar el planeta inicialmente
    planetMesh.position.set(planets[i].distance, 0, 0);

    // Guardar el mesh en un array para animarlo después
    planetMeshes.push(planetMesh);

    // Añadir el planeta a la escena
    scene.add(planetMesh);
}



//create camara 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 7;

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Lights

//light inside the sun
const pointLight = new THREE.PointLight(0xffffff, 3)
pointLight.position.set(0, 0, 0)
scene.add(pointLight)

//dome light
const domeLight = new THREE.HemisphereLight(0x87ceeb, 0x222222, 0.6); // Sky color, ground color, intensity
scene.add(domeLight);

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);

// Add stars to the background
function addStars() {
    const starGeo = new THREE.SphereGeometry(0.05); // Small spheres for stars
    const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White color for stars

    for (let i = 0; i < 200; i++) { // Add 200 stars
        const star = new THREE.Mesh(starGeo, starMat);

        // Randomize the position of each star
        const [x, y, z] = [
            (Math.random() - 0.5) * 100, // Random position between -50 and 50
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100
        ];
        star.position.set(x, y, z);

        // Add the star to the scene
        scene.add(star);
    }
}

// Call the function to add stars
addStars();

// Animación
function animate() {
    // Actualizar controles
    controls.update();

    // Mover los planetas en órbitas circulares
    for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        const planetMesh = planetMeshes[i];

        // Incrementar el ángulo del planeta según su velocidad
        planet.angle += planet.speed;

        // Calcular la nueva posición usando Math.sin y Math.cos
        planetMesh.position.x = Math.cos(planet.angle) * planet.distance;
        planetMesh.position.z = Math.sin(planet.angle) * planet.distance;

        // Cambiar el color del planeta si su posición en X es menor a 0
        if (planetMesh.position.x < 0) {
            planetMesh.material.color.set(0xff00ff); // Cambiar a color magenta
        } else {
            planetMesh.material.color.set(planet.color); // Restaurar el color original
        }
    }

    // Renderizar la escena
    renderer.render(scene, camera);

    // Solicitar el siguiente cuadro de animación
    requestAnimationFrame(animate);
}

// Start the animation loop
animate();
