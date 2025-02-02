function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mainContainer = document.querySelector('.container.mt-5');
    const usuariosContent = mainContainer.innerHTML;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('data-section');
            mainContainer.innerHTML = '';

            switch (section) {
                case 'usuarios':
                    mainContainer.innerHTML = usuariosContent;
                    loadCSVData();
                    break;
                case 'plantillas':
                    mainContainer.innerHTML = `
                        <h1 class="text-center mb-4">Gestión de Plantillas</h1>
                        <div class="card mb-4">
                            <div class="card-body">
                                <h3>Editar Mensajes Predeterminados</h3>
                                <form id="messageForm">
                                    <div class="mb-3">
                                        <label for="welcomeMessage" class="form-label">Mensaje de Bienvenida</label>
                                        <textarea id="welcomeMessage" class="form-control" rows="2" placeholder="💬 ¡Hola! 😊 Gracias por tu interés..."></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="followUpMessage" class="form-label">Mensaje de Seguimiento</label>
                                        <textarea id="followUpMessage" class="form-control" rows="2" placeholder="💬 Queremos asegurarnos..."></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="closingMessage" class="form-label">Mensaje de Cierre</label>
                                        <textarea id="closingMessage" class="form-control" rows="2" placeholder="💬 ¡Muchas gracias por tu compra!..."></textarea>
                                    </div>
                                    <button type="button" class="btn btn-primary" onclick="saveMessages()">Guardar Mensajes</button>
                                </form>
                            </div>
                        </div>
                    `;
                    loadMessages();
                    break;
                case 'registros':
                    mainContainer.innerHTML = `
                        <h1 class="text-center mb-4">Registro de Mensajes</h1>
                        <div class="card">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Usuario</th>
                                                <th>Mensaje</th>
                                                <th>Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody id="registrosTableBody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    `;
                    loadRegistros();
                    break;
                case 'dashboard':
                    mainContainer.innerHTML = `
                        <h1 class="text-center mb-4">Dashboard</h1>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Total Usuarios</h5>
                                        <p class="card-text h2" id="totalUsuarios">0</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Mensajes Enviados</h5>
                                        <p class="card-text h2" id="totalMensajes">0</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Usuarios Activos</h5>
                                        <p class="card-text h2" id="usuariosActivos">0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    updateDashboard();
                    break;
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
        };
    }
};
