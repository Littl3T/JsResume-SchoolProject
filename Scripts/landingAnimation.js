const typingTitleTxt = 'Power Platform Developer & Cybersecurity Enthusiast';
const typingTitle = document.getElementById("typingTitle");
let i = 0;
const speed = 22; // Vitesse de la saisie (en millisecondes) entre chaque lettre

function typeWriter() {
    if (i < typingTitleTxt.length) {
        typingTitle.innerHTML += typingTitleTxt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}
$(document).ready(function () {
    // Démarrer l'animation de la saisie
    typeWriter();
});