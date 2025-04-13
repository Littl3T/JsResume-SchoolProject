// Script de création d'un graphique de mouvement de souris pour la bannière dynamique du CV avec ChartJS

Chart.defaults.animation = false;
let aggregator = 0;
let lastX = null;
let lastY = null;
$(document).ready(function() {
  const ctx = document.getElementById('bgChart').getContext('2d');
  const lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [...Array(60).keys()],
      datasets: [{
        label: 'Mouse Movement',
        data: Array(60).fill(0),
        borderColor: 'rgba(60, 0, 0, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  setInterval(() => {
    const dataset = lineChart.data.datasets[0].data;
    dataset.shift();
    dataset.push(aggregator);
    aggregator = 0;
    lineChart.update({ duration: 0 });
  }, 33);
});