// JavaScript: 3D: ThreeJS
import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js'

// Dimension
const height = window.innerHeight;
const width  = window.innerWidth;

// camera
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 2;

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( width, height );

// Add to body
document.body.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();

// orbitcontrols
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.03;
// loader
const loader = new THREE.TextureLoader();
// Geometry
const geometry = new THREE.IcosahedronGeometry(1.0, 12);

const material = new THREE.MeshStandardMaterial({
    map: loader.load("./asserts/earth_planet.jpg"),
});
// night Light
const nightMaterial = new THREE.MeshBasicMaterial({
    map : loader.load("./asserts/earth_night.jpg"),
    blending: THREE.AdditiveBlending,
    // transparent: true,
    // opacity: 0.6,
});
// cloud
const cloudMatrial = new THREE.MeshStandardMaterial({
    map: loader.load("./asserts/earth_cloud.jpg"),
    blending: THREE.AdditiveBlending,
    // transparent: true,
    // opacity: 0.4,
})
// group
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI/180; // to give 23.4 degree tilt to its axis
scene.add(earthGroup);

// Mesh
const earthmesh = new THREE.Mesh( geometry, material );
const lightMesh = new THREE.Mesh( geometry, nightMaterial );
const cloudMesh = new THREE.Mesh( geometry, cloudMatrial );
// cloudMesh.scale.setScalar(1.02);
earthGroup.add(earthmesh);
earthGroup.add(lightMesh);
earthGroup.add(cloudMesh);

// Hemisphere light
const dirLight = new THREE.DirectionalLight( 0xffffff );
dirLight.position.set(-2, 0.5, 1.5)
scene.add(dirLight);

// Render with Animation
function animate( t = 0 ){
    requestAnimationFrame( animate );
    earthGroup.rotation.y = t * 0.00001;
    renderer.render( scene, camera)
    controls.update();
};
animate();

function handleWindowResize() {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
window.addEventListener('resize', handleWindowResize);