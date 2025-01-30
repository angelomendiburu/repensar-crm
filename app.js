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
    const users = [
        { nombre: 'Ana', apellido: 'Rodríguez', correo: 'ana.rodriguez@ejemplo.com', whatsapp: '51935412787' },
        { nombre: 'Carlos', apellido: 'Mendoza', correo: 'carlos.mendoza@ejemplo.com', whatsapp: '51912345678' },
        { nombre: 'María', apellido: 'González', correo: 'maria.gonzalez@ejemplo.com', whatsapp: '51923456789' },
        { nombre: 'Juan', apellido: 'Pérez', correo: 'juan.perez@ejemplo.com', whatsapp: '51934567890' },
        { nombre: 'Laura', apellido: 'Sánchez', correo: 'laura.sanchez@ejemplo.com', whatsapp: '51945678901' },
        { nombre: 'Diego', apellido: 'Torres', correo: 'diego.torres@ejemplo.com', whatsapp: '51956789012' },
        { nombre: 'Carmen', apellido: 'López', correo: 'carmen.lopez@ejemplo.com', whatsapp: '51967890123' },
        { nombre: 'Luis', apellido: 'Martínez', correo: 'luis.martinez@ejemplo.com', whatsapp: '51978901234' },
        { nombre: 'Paula', apellido: 'Díaz', correo: 'paula.diaz@ejemplo.com', whatsapp: '51989012345' },
        { nombre: 'Roberto', apellido: 'Castro', correo: 'roberto.castro@ejemplo.com', whatsapp: '51990123456' },
        { nombre: 'Sofia', apellido: 'Vargas', correo: 'sofia.vargas@ejemplo.com', whatsapp: '51901234567' },
        { nombre: 'Miguel', apellido: 'Herrera', correo: 'miguel.herrera@ejemplo.com', whatsapp: '51912345678' },
        { nombre: 'Patricia', apellido: 'Flores', correo: 'patricia.flores@ejemplo.com', whatsapp: '51923456789' },
        { nombre: 'Fernando', apellido: 'Ruiz', correo: 'fernando.ruiz@ejemplo.com', whatsapp: '51934567890' },
        { nombre: 'Isabel', apellido: 'Silva', correo: 'isabel.silva@ejemplo.com', whatsapp: '51945678901' },
        { nombre: 'Ricardo', apellido: 'Morales', correo: 'ricardo.morales@ejemplo.com', whatsapp: '51956789012' },
        { nombre: 'Valeria', apellido: 'Ortiz', correo: 'valeria.ortiz@ejemplo.com', whatsapp: '51967890123' },
        { nombre: 'Andrés', apellido: 'Navarro', correo: 'andres.navarro@ejemplo.com', whatsapp: '51978901234' },
        { nombre: 'Lucía', apellido: 'Rojas', correo: 'lucia.rojas@ejemplo.com', whatsapp: '51989012345' },
        { nombre: 'Gabriel', apellido: 'Romero', correo: 'gabriel.romero@ejemplo.com', whatsapp: '51990123456' },
        { nombre: 'Elena', apellido: 'Jiménez', correo: 'elena.jimenez@ejemplo.com', whatsapp: '51901234567' },
        { nombre: 'Daniel', apellido: 'Paredes', correo: 'daniel.paredes@ejemplo.com', whatsapp: '51912345678' },
        { nombre: 'Mónica', apellido: 'Cruz', correo: 'monica.cruz@ejemplo.com', whatsapp: '51923456789' },
        { nombre: 'Jorge', apellido: 'Reyes', correo: 'jorge.reyes@ejemplo.com', whatsapp: '51934567890' },
        { nombre: 'Claudia', apellido: 'Moreno', correo: 'claudia.moreno@ejemplo.com', whatsapp: '51945678901' }
    ];
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
