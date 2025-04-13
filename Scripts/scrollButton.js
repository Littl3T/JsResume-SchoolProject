// Script de scroll vers le bas pour le bouton d'appel à l'action "Read my Resume" de la bannière

$(document).ready(function() {
$('.btn-cta').on('click', function(e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $('#mainContainer').offset().top
    }, 600);
});
});