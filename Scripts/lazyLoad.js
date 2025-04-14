// Script de Lazy load des sections du document

$(document).ready(function () {
    function isElementInViewport($el) {
        var elementTop = $el.offset().top;
        var elementBottom = elementTop + $el.outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    function checkLazyLoad() {
        $("section").each(function () {
            var $section = $(this);
            if (isElementInViewport($section)) {
                $section.addClass("lazy-loaded");
            }
        });
    }
    
    // Vérifier dès le chargement de la page
    checkLazyLoad();
    
    // Et vérifier à chaque scroll et redimensionnement
    $(window).on("scroll resize", function () {
        checkLazyLoad();
    });
});
