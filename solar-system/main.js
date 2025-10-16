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
const sunMat = new THREE.MeshNormalMaterial({ color: 0xffff00 })
const sunMesh = new THREE.Mesh(sunGeo, sunMat)
scene.add(sunMesh);

//create camara 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 3;

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera)
