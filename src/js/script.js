window.scrollTo(0, 0);
history.scrollRestoration = 'manual';
document.body.style.overflow = "hidden";

document.getElementById("year").innerHTML = new Date().getFullYear();

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x")
    navbar.classList.toggle('active')
};

const wordsFrench = ["Étudiant ingénieur", "Développeur en herbe", "Fan de jeux-vidéo", "Passionné de ski"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector(".typing");

function typeEffect(words) {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        charIndex--;
    } else{
        charIndex++;
    }

    typingElement.textContent = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex == currentWord.length){
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex == 0){
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(() => typeEffect(words), isDeleting ? 50 : 100);
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






// CANVAS VAISSEAU
// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

renderer.domElement.id = 'canvas-ship';
document.body.appendChild(renderer.domElement);

// Scène
const scene = new THREE.Scene();

// Caméra
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(0, 0, 11);
camera.lookAt(0, 0, 0);






// Lumière 
const spotLight = new THREE.SpotLight(0xffffff, 13000, 0, Math.PI/12, 1, 2);
spotLight.position.set(40, 30, 10);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.00002;
scene.add(spotLight);   

// Modèle 
let meshVenator;
const loaderVenator = new GLTFLoader().setPath(import.meta.env.BASE_URL + 'models/venator-class-star-destroyer_light/');
loaderVenator.load('scene.gltf', 
    function(gltf) {
        meshVenator = gltf.scene;

        meshVenator.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
        meshVenator.scale.set(0.017, 0.017, 0.017);

        scene.add(meshVenator);

        funcLoader();
    }
);




// ANIMATION SCROLL

let scrollPosY = 0;
let scrollY = 0;
const about = document.getElementById("about");
const aboutMid = document.querySelector('.ship-canvas').getBoundingClientRect().bottom - (document.querySelector('.ship-canvas').getBoundingClientRect().bottom-document.querySelector('.ship-canvas').getBoundingClientRect().top)/2;

const startPosition = {x: -2, y: -1.6, z: -1};
const startRotation = {x: Math.PI/12, y: -Math.PI/5, z: -Math.PI/45};

const secondStartPosition = {x: 0, y: -14, z: 0};
const secondStartRotation = {x: 0, y: Math.PI/2, z: Math.PI/2};


const education = document.getElementById("education");
const educationTop = education.offsetTop;



// Animation
const shipCanvas = document.getElementById('canvas-ship');
let endPosition = null;
let endRotation = null;
let wasBottom = false;

function animate() {
    requestAnimationFrame(animate);

    scrollY = window.scrollY;
    scrollPosY = (window.scrollY/document.body.clientHeight);

    if (meshVenator && scrollY<=aboutMid) {
        shipCanvas.style.position = 'fixed';


        meshVenator.position.x = startPosition.x - scrollPosY * -10;
        meshVenator.position.y = startPosition.y - scrollPosY * -8; 
        meshVenator.position.z = startPosition.z - scrollPosY * 0;  

        meshVenator.rotation.x = startRotation.x + scrollPosY * Math.PI*2.3;
        meshVenator.rotation.y = startRotation.y + scrollPosY * Math.PI*1.4; 
        meshVenator.rotation.z = startRotation.z + scrollPosY * 0;

        endPosition = {x: meshVenator.position.x, y: meshVenator.position.y, z: meshVenator.position.z};
        endRotation = {x: meshVenator.rotation.x, y: meshVenator.rotation.y, z: meshVenator.rotation.z};
    }
    if (scrollY>aboutMid) {

        if (wasBottom) {

            meshVenator.rotation.x = endRotation.x;
            meshVenator.rotation.y = endRotation.y; 
            meshVenator.rotation.z = endRotation.z;

            wasBottom = false;
        } else {
            const delta = scrollY - aboutMid;

            meshVenator.position.y = endPosition.y -  delta * - 0.0111;  
            meshVenator.position.x = endPosition.x - delta * -0.05
        }
        
    }

    if (scrollY>educationTop) {
        
        wasBottom = true;
        const delta = scrollY - educationTop;

        meshVenator.position.x = secondStartPosition.x;
        meshVenator.position.y = secondStartPosition.y - delta*-0.03; 
        meshVenator.position.z = secondStartPosition.z;  

        meshVenator.rotation.x = secondStartRotation.x;
        meshVenator.rotation.y = secondStartRotation.y; 
        meshVenator.rotation.z = secondStartRotation.z;
    }

    stars.position.y = scrollPosY * 5;

    rendererStars.render(sceneStars, cameraStars);
    renderer.render(scene, camera);
};

animate();


// Redimenssionement page 

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight, false);

    cameraStars.aspect = window.innerWidth / window.innerHeight;
    cameraStars.updateProjectionMatrix();

    rendererStars.setSize(window.innerWidth, window.innerHeight, false);

});


// Loading screen

function funcLoader() {
    const loaderHTML = document.getElementById('loader');
    if (loaderHTML) {
        setTimeout(() => {
            loaderHTML.classList.add('hidden');
            document.body.style.overflow = "auto";

            setTimeout(() => loaderHTML.remove(), 1500);
            
            typeEffect(wordsFrench);
        }, 300);
    }
}

const dots = "...";
let charIndexDots = 0;
let isDeletingDots = false;
const typingElementDots = document.querySelector(".typing-dots");

function typeEffectDots() {
    if (isDeletingDots) {
        charIndexDots--;
    } else{
        charIndexDots++;
    }

    typingElementDots.textContent = dots.substring(0, charIndexDots);

    if (!isDeletingDots && charIndexDots == dots.length){
        setTimeout(() => isDeletingDots = true, 500);
    } else if (isDeletingDots && charIndexDots == 0){
        isDeletingDots = false;
    }

    setTimeout(() => typeEffectDots(), 150);
};

typeEffectDots();