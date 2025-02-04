document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
});

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('data-section');
            sections.forEach(sec => {
                if (sec) {
                    sec.classList.add('d-none');
                }
            });
            const targetSection = document.getElementById(section);
            if (targetSection) {
                targetSection.classList.remove('d-none');
            }

            if (section === 'estadisticas') {
                loadStatsChart();
            } else if (section === 'plantillas') {
                loadPlantillas();
            }
        });
    });
}

// Lógica para editar una plantilla
window.cargarDatosEditarPlantilla = function(nombre) {
    const plantillas = getPlantillasFromStorage();
    const plantilla = plantillas.find(p => p.nombre === nombre);
    if (plantilla) {
        document.getElementById("nombrePlantillaEditar").value = plantilla.nombre;
        document.getElementById("mensajePlantillaEditar").value = plantilla.mensaje;
        document.getElementById("guardarCambiosEditarPlantilla").onclick = function() {
            plantilla.nombre = document.getElementById("nombrePlantillaEditar").value;
            plantilla.mensaje = document.getElementById("mensajePlantillaEditar").value;
            savePlantillasToStorage(plantillas);
            loadPlantillas();
            loadStatsChart(); // Call loadStatsChart when data is updated
        };
    }
};

// Import the function if using modules
// import { loadStatsChart } from './chart.js';

// Ensure loadStatsChart is available globally
window.loadStatsChart = loadStatsChart;