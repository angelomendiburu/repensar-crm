let chartInstance;

function loadStatsChart() {
    const ctx = document.getElementById('statsChart').getContext('2d');
    const users = getUsersFromLocalStorage();
    const registros = getRegistrosFromStorage();

    const esperandoRespuesta = users.filter(user => user.estado === 'esperando-respuesta').length;
    const mensajesIniciados = users.filter(user => user.estado === 'inicio').length;
    const mensajesFinalizados = users.filter(user => user.estado === 'finalizado').length;

    const data = {
        labels: ['Esperando Respuesta', 'Mensajes Iniciados', 'Mensajes Finalizados'],
        datasets: [{
            label: 'Estadísticas de Mensajes',
            data: [esperandoRespuesta, mensajesIniciados, mensajesFinalizados],
            backgroundColor: [
                'rgba(255, 165, 0, 0.2)', // Naranja
                'rgba(0, 161, 157, 0.2)', // Azul verdoso
                'rgba(255, 0, 0, 0.2)'    // Rojo
            ],
            borderColor: [
                'rgba(255, 165, 0, 1)',
                'rgba(0, 161, 157, 1)',
                'rgba(255, 0, 0, 1)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'polarArea',
        data: data,
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    grid: {
                        color: function(context) {
                            if (context.tick.value >= 2 && context.tick.value <= 20) {
                                return 'rgba(255, 255, 255, 0.2)'; // Color más claro para modo noche
                            }
                            return 'rgba(0, 0, 0, 0.1)'; // Color por defecto
                        }
                    }
                }
            }
        }
    };

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, config);
}

// Export the function if using modules
// export { loadStatsChart };
