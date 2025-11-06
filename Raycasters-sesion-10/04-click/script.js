import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 8, 8),
    new THREE.MeshBasicMaterial({ color: '#ff6600', wireframe: true })
);

scene.add(object1);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//// Mouse.
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
    // Coordenadas del mouse "normalizadas".
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = -((event.clientY / sizes.height) * 2 - 1);
});


// Click event
window.addEventListener('click', () => {
    var yellow = false; 
    console.log(yellow);
    if (mouseOnTop == true) {
        if (yellow == false) {
        object1.material.color = new THREE.Color('#ffff00');
        console.log('Click sobre el mesh.');
        var yellow = true;
        console.log(yellow);
            gsap.to(object1.rotation, {
            y: object1.rotation.y + Math.PI * 4, // 720 degrees
            duration: 3});
        } if (yellow == true) {
        object1.material.color = new THREE.Color('#ff6600');
        console.log('Click sobre el mesh.');
        var yellow = false;
        console.log(yellow);
        }
    } 
});


// gsap.to(object1.rotation, {
//     y: object1.rotation.y + Math.PI * 4, // 720 degrees
//     duration: 3,
//     onComplete: () => {
//         // Reset the rotation to 0 after the animation
//         object1.rotation.y = 0;
//         console.log('Rotation reset');
//     }
// });


//// Raycaster.
const raycaster = new THREE.Raycaster();
let currentIntersect = null;
const objectsToTest = [object1];

/**
 * Animate
 */
const clock = new THREE.Clock();

var mouseOnTop = false;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Animate objects
    object1.position.y = Math.sin(elapsedTime * 2) * 0.1;

    // Proyecta un rayo infinito hacia la posición del mouse desde la cámara.
    raycaster.setFromCamera(mouse, camera);
    // Devuelve la información obtenida de los objetos que son atravesados por el rayo.
    const intersects = raycaster.intersectObjects(objectsToTest);

    if (intersects.length >=1) {

        if (mouseOnTop == false) {
            mouseOnTop = true;
            console.log('mouse crossed the object for the first time');
            gsap.to(object1.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3 });
        }
        if (!currentIntersect) {
            console.log('mouse is going through an object');
            currentIntersect = intersects[0];
        }
    } else {
        if (mouseOnTop == true){
            mouseOnTop = false;
            console.log('mouse left the object area');
            gsap.to(object1.scale, { x: 1, y: 1, z: 1, duration: 0.3 });

        }

        if (mouseOnTop == false){
            object1.material.color = new THREE.Color('#ffff00');

        }
    }

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();