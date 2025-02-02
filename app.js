document.addEventListener('DOMContentLoaded', () => {
    loadCSVData();
    document.getElementById('csvFileInput').addEventListener('change', handleFileSelect, false);
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    applySavedTheme();
    setupNavigation();
});

// Funciones de inicialización
function loadCSVData() {
    const users = getUsersFromLocalStorage();
    if (users) {
        loadUsers(users);
    }
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const users = parseCSV(content);
            saveUsersToLocalStorage(users);
            loadUsers(users);
            event.target.value = ''; // Reset the file input value
        };
        reader.readAsText(file);
    } else {
        alert('Por favor, selecciona un archivo CSV');
    }
}

function parseCSV(csvText) {
    const rows = csvText.split('\n').filter(row => row.trim() !== '');
    const users = [];
    rows.forEach(row => {
        const cols = row.split(',').map(col => col.trim());
        if (cols.length === 4) {
            users.push({
                nombre: cols[0],
                apellido: cols[1],
                correo: cols[2] || '',
                whatsapp: cols[3] || '',
                estado: 'inicio'
            });
        }
    });
    return users;
}

function loadUsers(users) {
    const tableBody = document.querySelector('#usersTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.nombre}</td>
            <td>${user.apellido}</td>
            <td>${user.correo}</td>
            <td>${user.whatsapp}</td>
            <td><span class="estado ${user.estado.replace(' ', '-')}"></span></td>
            <td><button class="btn btn-primary" onclick="showMessageOptions('${user.whatsapp}')">Enviar Mensaje</button></td>
            <td><button class="btn btn-secondary" onclick='showTags("${user.whatsapp}")'>Etiquetar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

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
                <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editarPlantillaModal" onclick="cargarDatosEditarPlantilla('${plantilla.nombre}')">Editar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}