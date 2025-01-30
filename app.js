// Manejo de carga de CSV

document.addEventListener('DOMContentLoaded', () => {
    loadCSVData();
});

document.getElementById('csvFileInput').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const users = parseCSV(content);
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
                whatsapp: cols[3] || ''
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
            <td><button class="btn btn-primary" onclick="openWhatsapp('${user.whatsapp}')">Enviar Mensaje</button></td>
            <td><button class="btn btn-secondary" onclick='showTags(${JSON.stringify(user)})'>Etiquetar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function loadCSVData() {
    
    loadUsers(users);
}

// Abrir WhatsApp con mensaje predeterminado
function openWhatsapp(whatsapp) {
    const mensaje = 'Hola gracias por tu interes en Repensar. Somos los mejores formando diseñadores web, a continuacion te enviamos nuestro cronograma e informacion completa del curso'; // Puedes personalizar el mensaje.
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Mostrar Modal para etiquetar usuario
function showTags(user) {
    const templateModal = new bootstrap.Modal(document.getElementById('templateModal'));
    const templateList = document.getElementById('templateList');
    templateList.innerHTML = `
        <button class="btn btn-success" onclick="applyTag('Bienvenida', '${user.whatsapp}')">Bienvenida</button>
        <button class="btn btn-warning" onclick="applyTag('Seguimiento', '${user.whatsapp}')">Seguimiento</button>
        <button class="btn btn-danger" onclick="applyTag('Cierre', '${user.whatsapp}')">Cierre</button>
    `;
    templateModal.show();
}

// Aplicar una etiqueta a un usuario
function applyTag(tag, whatsapp) {
    alert(`Etiqueta '${tag}' aplicada al usuario con WhatsApp ${whatsapp}`);
}