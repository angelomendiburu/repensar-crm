function showMessageOptions(whatsapp) {
    const templateModal = new bootstrap.Modal(document.getElementById('templateModal'));
    const templateList = document.getElementById('templateList');
    const messages = getMessagesFromLocalStorage();

    templateList.innerHTML = `
        <button class="btn btn-success" onclick="sendMessage('${whatsapp}', '${messages.welcome}', 'Bienvenida')">Bienvenida</button>
        <button class="btn btn-warning" style="background-color: var(--color-accent);" onclick="sendMessage('${whatsapp}', '${messages.followUp}', 'Seguimiento')">Seguimiento</button>
        <button class="btn btn-danger" onclick="sendMessage('${whatsapp}', '${messages.closing}', 'Cierre')">Cierre</button>
    `;

    templateModal.show();
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
        users[userIndex].estado = tag;
        saveUsersToLocalStorage(users);
        updateUserRow(users[userIndex]);
        updateDashboard();
        loadStatsChart(); // Actualizar el gráfico después de aplicar la etiqueta
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

function sendMessage(whatsapp, message, templateName) {
    const url = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Generate a new record
    const users = getUsersFromLocalStorage();
    const user = users.find(u => u.whatsapp === whatsapp);
    if (user) {
        let registros = getRegistrosFromStorage();
        if (!Array.isArray(registros)) {
            registros = [];
        }
        const newRecord = {
            id: generateRandomIdentifier("req"),
            nombre: `${user.nombre} ${user.apellido}`, // Use full name
            nombrePlantilla: templateName,
            mensaje: message, // Use the correct message
            curso: user.curso || "No especificado",
            estado: "Inicio"
        };
        registros.push(newRecord);
        saveRegistrosToStorage(registros);
        renderizarRegistros(); // Update records in real-time
    }
}

// Export functions if using modules
// export { showMessageOptions, showTags, applyTag, updateUserRow, sendMessage };