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
}

typeEffect(wordsFrench)
