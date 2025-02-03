document.addEventListener('DOMContentLoaded', () => {
    loadCSVData();
    setupEventListeners();
    applySavedTheme();
    setupNavigation();
});

function setupEventListeners() {
    document.getElementById('csvFileInput').addEventListener('change', handleFileSelect, false);
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
}

// Funciones de inicialización
function loadCSVData() {
    const users = getUsersFromLocalStorage();
    if (users) {
        loadUsers(users);
    }
}

function handleFileSelect(event) {
    try {
        const file = event.target.files[0];
        if (!file || !file.name.endsWith('.csv')) {
            alert('Por favor, selecciona un archivo CSV válido.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const users = parseCSV(e.target.result);
                saveUsersToLocalStorage(users);
                loadUsers(users);
                event.target.value = ''; // Resetear input
            } catch (error) {
                alert('Error al procesar el archivo CSV.');
            }
        };
        reader.readAsText(file);
    } catch (error) {
        console.error('Error al leer el archivo:', error);
    }
}

function parseCSV(csvText) {
    const rows = csvText.split('\n').filter(row => row.trim() !== '');
    if (rows.length < 2) {
        alert('El archivo CSV debe contener al menos una fila de datos.');
        return [];
    }

    const headers = rows[0].split(',').map(header => header.trim());
    const users = [];

    rows.slice(1).forEach(row => {
        const cols = row.split(',').map(col => col.trim());
        if (cols.length >= headers.length) {
            let userObj = {};
            headers.forEach((header, index) => {
                userObj[header] = cols[index] || ''; // Asigna valores a las claves
            });
            userObj.estado = 'inicio'; // Agregar estado por defecto
            users.push(userObj);
        }
    });

    return users;
}

function loadUsers(users) {
    const table = document.querySelector('#usersTable');
    const tableBody = document.querySelector('#usersTable tbody');
    if (!table || !tableBody) return;

    tableBody.innerHTML = '';

    // Generar encabezados dinámicamente
    const headers = Object.keys(users[0] || {});
    table.querySelector('thead').innerHTML = `<tr>${headers.map(header => `<th>${header}</th>`).join('')}<th>Acciones</th></tr>`;

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = headers.map(header => `<td>${user[header]}</td>`).join('') + `
            <td>
                <button class="btn btn-primary enviar-mensaje" data-whatsapp="${user.whatsapp || ''}">Enviar Mensaje</button>
                <button class="btn btn-secondary etiquetar" data-whatsapp="${user.whatsapp || ''}">Etiquetar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Delegación de eventos para botones generados dinámicamente
document.querySelector('#usersTable tbody').addEventListener('click', function(event) {
    if (event.target.classList.contains('enviar-mensaje')) {
        const whatsapp = event.target.dataset.whatsapp;
        if (whatsapp) showMessageOptions(whatsapp);
    }
    if (event.target.classList.contains('etiquetar')) {
        const whatsapp = event.target.dataset.whatsapp;
        if (whatsapp) showTags(whatsapp);
    }
});

function deleteCSVData() {
    if (confirm('¿Estás seguro de que deseas eliminar todos los datos del CSV?')) {
        localStorage.removeItem('users');
        const tableBody = document.querySelector('#usersTable tbody');
        tableBody.innerHTML = '';
        alert('Datos eliminados correctamente');
    }
}

function saveMessages() {
    const welcomeMessage = document.getElementById('welcomeMessage').value;
    const followUpMessage = document.getElementById('followUpMessage').value;
    const closingMessage = document.getElementById('closingMessage').value;
    const messages = {
        welcome: welcomeMessage,
        followUp: followUpMessage,
        closing: closingMessage
    };
    saveMessagesToLocalStorage(messages);
    alert('Mensajes guardados correctamente');
}

function loadMessages() {
    const messages = getMessagesFromLocalStorage();
    if (messages) {
        document.getElementById('welcomeMessage').value = messages.welcome;
        document.getElementById('followUpMessage').value = messages.followUp;
        document.getElementById('closingMessage').value = messages.closing;
    }
}

function updateDashboard() {
    const users = getUsersFromLocalStorage() || [];
    const registros = getRegistrosFromStorage() || [];

    if (document.getElementById('totalUsuarios')) {
        document.getElementById('totalUsuarios').textContent = users.length;
    }
    if (document.getElementById('totalMensajes')) {
        document.getElementById('totalMensajes').textContent = registros.length;
    }
    if (document.getElementById('usuariosActivos')) {
        const activos = users.filter(user => user.estado === 'esperando-respuesta').length;
        document.getElementById('usuariosActivos').textContent = activos;
    }
}

function guardarNuevaPlantilla() {
    const nombre = document.getElementById('nombrePlantilla').value;
    const mensaje = document.getElementById('mensajePlantilla').value;
    if (nombre && mensaje) {
        const plantillas = getPlantillasFromStorage();
        plantillas.push({ nombre, mensaje });
        savePlantillasToStorage(plantillas);
        loadPlantillas();
        const nuevaPlantillaModal = new bootstrap.Modal(document.getElementById('nuevaPlantillaModal'));
        nuevaPlantillaModal.hide();
    }
}

function loadPlantillas() {
    const plantillas = getPlantillasFromStorage();
    const tableBody = document.getElementById('plantillasTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    plantillas.forEach(plantilla => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${plantilla.nombre}</td>
            <td>${plantilla.mensaje}</td>
            <td>
                <button class="btn btn-warning btn-sm editar-plantilla" data-nombre="${plantilla.nombre}">Editar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Delegación de eventos para edición de plantillas
document.getElementById('plantillasTableBody').addEventListener('click', function(event) {
    if (event.target.classList.contains('editar-plantilla')) {
        const nombre = event.target.dataset.nombre;
        cargarDatosEditarPlantilla(nombre);
    }
});
