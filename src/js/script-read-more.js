window.scrollTo(0, 0);
history.scrollRestoration = 'manual';

document.getElementById("year").innerHTML = new Date().getFullYear();

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x")
    navbar.classList.toggle('active')
};



// THREE.JS

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';




// CANVAS ETOILES
// Renderer 
const rendererStars = new THREE.WebGLRenderer({ antialias: true});
rendererStars.setSize(window.innerWidth, window.innerHeight);
rendererStars.setClearColor(0x000000); // fond noir opaque

rendererStars.domElement.id = 'canvas-stars';
document.body.appendChild(rendererStars.domElement);

// Scène
const sceneStars = new THREE.Scene();

// Caméra
const cameraStars = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
cameraStars.position.set(0, 0, 11);
cameraStars.lookAt(0, 0, 0);

// Fond espace
const geometry = new THREE.BufferGeometry(); // Objet vide
const positions = new Float32Array(10000 * 3); // Tableau n*3 nombres (x, y, z)

for (let i = 0; i < positions.length; i++) {
    positions[i] = (Math.random() - 0.5) * 200; // répartis entre -100 et 100
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)); // Tableau -> géométrie
const stars = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 }) // Affichage des points et couleur + taille
);
sceneStars.add(stars);



// ANIMATION SCROLL

let scrollPosY = 0;

// Animation

function animate() {
    requestAnimationFrame(animate);

    scrollPosY = (window.scrollY/document.body.clientHeight);
    
    stars.position.y = scrollPosY * 5;
    rendererStars.render(sceneStars, cameraStars);
};

animate();


// Redimenssionement page 

window.addEventListener("resize", () => {

    cameraStars.aspect = window.innerWidth / window.innerHeight;
    cameraStars.updateProjectionMatrix();

    rendererStars.setSize(window.innerWidth, window.innerHeight, false);

});
