// JavaScript: ThreeJS
import * as THREE from 'three';
import { OrbitControls } from "jsm/controls/OrbitControls.js";


// screen size
const height = window.innerHeight;
const width  = window.innerWidth;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);

// DomElement
document.body.appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10);
camera.position.z = 2; // move camera back

// Scene
const scene = new THREE.Scene();

// Orbitcontrols
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Geometry
const geometry = new THREE.IcosahedronGeometry(1.0, 3);
const matrial  = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    flatShading: true // interact with light(s)
});
const mesh = new THREE.Mesh(geometry, matrial);
scene.add(mesh);

// Wire-Frame
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
const wireMesh = new THREE.Mesh( geometry, wireMat );
// wireMesh.scale.setScalar(1.001) // set scale of wire frame
mesh.add(wireMesh);

// Light
const hemLight = new THREE.HemisphereLight( 0x0099ff, 0xaa5500 );
scene.add(hemLight);

// Render
function animate(t = 0) {
    requestAnimationFrame( animate );
    mesh.rotation.y = t * 0.0001;
    // mesh.rotation.x = t * 0.0001;
    // mesh.rotation.z = t * 0.0001;
    renderer.render(scene, camera); // render scene with camera
    controls.update();  
};

animate() // Don't forget to call animate first time

function handleWindowResize() {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
window.addEventListener('resize', handleWindowResize);