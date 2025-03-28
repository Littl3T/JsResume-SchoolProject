const ctx = document.getElementById('skillsRadar').getContext('2d');
const mainColor = '#f43838'
const darkerColor = 'rgba(169, 30, 30, 0.3)'
const data = {
labels: ['Networking', 'Programming', 'Data Analysis', 'Databases', 'System Admin/Others'],
datasets: [{
    label: 'Skills',
    data: [8, 8.5, 9.5, 7.5, 6],
    backgroundColor: darkerColor,
    borderColor: mainColor,
    pointBackgroundColor: mainColor,
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#000',
    pointHoverBorderColor: mainColor,
    pointRadius: 5,
    pointHoverRadius: 10,
    pointStyle:'circle'
}]
};
const options = {
responsive: true,
maintainAspectRatio: false,
scales: {
    r: {
    beginAtZero: true,
    min: 0,
    max: 10,
    ticks: {
        stepSize: 1,
        backdropColor: 'transparent' 
    },
    grid: {
        color: '#444' 
    },
    angleLines: {
        color: '#444'
    },
    pointLabels: {
        font: {
          size: 16,         
          weight: 'bold',    
          family: 'Arial'    
        },
        color: '#fafafa' 
    }
    }
},
plugins: {
    legend: {
    display: false
    },
    tooltip: {
    enabled: true
    }
}
};

const skillsRadarChart = new Chart(ctx, {
type: 'radar',
data: data,
options: options
})