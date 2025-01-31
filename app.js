document.addEventListener('DOMContentLoaded', () => {
    loadCSVData();
    loadMessages();
    document.getElementById('csvFileInput').addEventListener('change', handleFileSelect, false);
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    applySavedTheme();
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const users = parseCSV(content);
            saveUsersToLocalStorage(users);
            loadUsers(users);
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
                estado: 'inicio' // Estado inicial
            });
        }
    });
    return users;
}

function loadUsers(users) {
    const tableBody = document.querySelector('#usersTable tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla

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

function loadCSVData() {
    const users = getUsersFromLocalStorage();
    if (users) {
        loadUsers(users);
    }
}

function deleteCSVData() {
    if (confirm('¿Estás seguro de que deseas eliminar todos los datos del CSV?')) {
        localStorage.removeItem('users');
        const tableBody = document.querySelector('#usersTable tbody');
        tableBody.innerHTML = '';
        alert('Datos eliminados correctamente');
    }
}

function showMessageOptions(whatsapp) {
    const templateModal = new bootstrap.Modal(document.getElementById('templateModal'));
    const templateList = document.getElementById('templateList');
    const messages = getMessagesFromLocalStorage();
    templateList.innerHTML = `
        <button class="btn btn-success" onclick="sendMessage('${whatsapp}', '${messages.welcome}')">Bienvenida</button>
        <button class="btn btn-warning" style="background-color: var(--color-accent);" onclick="sendMessage('${whatsapp}', '${messages.followUp}')">Seguimiento</button>
        <button class="btn btn-danger" onclick="sendMessage('${whatsapp}', '${messages.closing}')">Cierre</button>
    `;
    templateModal.show();
}

function sendMessage(whatsapp, message) {
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function showTags(whatsapp) {
    const templateModal = new bootstrap.Modal(document.getElementById('templateModal'));
    const templateList = document.getElementById('templateList');
    templateList.innerHTML = `
        <button class="btn btn-success" onclick="applyTag('inicio', '${whatsapp}')">Inicio</button>
        <button class="btn btn-warning" style="background-color: var(--color-accent);" onclick="applyTag('esperando-respuesta', '${whatsapp}')">Esperando Respuesta</button>
        <button class="btn btn-danger" onclick="applyTag('finalizado', '${whatsapp}')">Finalizado</button>
    `;
    templateModal.show();
}

function applyTag(tag, whatsapp) {
    const users = getUsersFromLocalStorage();
    const userIndex = users.findIndex(u => u.whatsapp === whatsapp);
    if (userIndex !== -1) {
        users[userIndex].estado = tag; // Actualiza el estado del usuario
        saveUsersToLocalStorage(users);
        updateUserRow(users[userIndex]); // Actualiza la fila del usuario en la tabla
    }
}

function updateUserRow(user) {
    const rows = document.querySelectorAll('#usersTable tbody tr');
    rows.forEach(row => {
        const whatsappCell = row.cells[3];
        if (whatsappCell.textContent === user.whatsapp) {
            const estadoCell = row.cells[4].querySelector('.estado');
            estadoCell.className = `estado ${user.estado.replace(' ', '-')}`;
        }
    });
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
    localStorage.setItem('messages', JSON.stringify(messages));
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

function getMessagesFromLocalStorage() {
    const messages = localStorage.getItem('messages');
    return messages ? JSON.parse(messages) : { welcome: '', followUp: '', closing: '' };
}

function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getUsersFromLocalStorage() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : null;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

function applySavedTheme() {
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}