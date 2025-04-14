// Script de création d'un graphique dynamique pour la bannière avec ChartJS
Chart.defaults.animation = false;
let aggregator = 0;
let lastX = null;
let lastY = null;
let isTouchOrSmallScreen = (('ontouchstart' in window) || (window.innerWidth <= 768));
let startTime = Date.now();
// strengthGraph est l'intensité de la coubre random pour modbile et currentValue va changer mais ici valeur initale
const strengthGraph = 20;
let currentValue = 0;

$(document).ready(function() {
  // Création du graphique de base
    const ctx = document.getElementById('bgChart').getContext('2d');
    const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...Array(60).keys()],
            datasets: [{
                label: 'Mouse Movement',
                data: Array(60).fill(0),
                borderColor: 'rgba(60, 0, 0, 1)',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                fill: true,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            scales: {
                x: { display: false },
                y: {
                    display: false,
                    min: 0,
                    max: 500
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
    
    // Mise à jour de la variable lors du redimensionnement de la fenêtre.
    $(window).on('resize', function() {
        isTouchOrSmallScreen = (('ontouchstart' in window) || (window.innerWidth <= 768));
    });
    
    // Sur desktop (non tactile et écran suffisamment large), capturer le mouvement de la souris
    if (!isTouchOrSmallScreen) {
        $(document).on('mousemove', function(e) {
            if (lastX === null || lastY === null) {
                lastX = e.pageX;
                lastY = e.pageY;
                return;
            }
            const dx = e.pageX - lastX;
            const dy = e.pageY - lastY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            aggregator += dist;
            lastX = e.pageX;
            lastY = e.pageY;
        });
    }
    
    // Mise à jour du graphique toutes les 33ms (~30 FPS)
    setInterval(() => {
        const dataset = lineChart.data.datasets[0].data;
        dataset.shift();
        if (isTouchOrSmallScreen) {
          // Sur mobile poitns aléatoires du graphiqque avec un offset random
          // L'offset est la différence entre deux random (0 à 1) soustrés et multiplié par le niveau d'intensité
          // L'offset est ajouté à la valeur d'avant et push sur le graphique
            const randomOffset = (Math.random()-Math.random()) * strengthGraph;
            currentValue += randomOffset;

            if (currentValue < 0) {
                currentValue = 0;
            }
            if (currentValue > 300) {
                currentValue = 300;
            }
            dataset.push(currentValue);
        } else {
            dataset.push(aggregator);
            aggregator = 0;
        }
        lineChart.update({ duration: 0 });
    }, 33);
});
