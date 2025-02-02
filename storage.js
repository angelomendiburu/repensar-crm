function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getUsersFromLocalStorage() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function getMessagesFromLocalStorage() {
    const messages = localStorage.getItem('messages');
    return messages ? JSON.parse(messages) : { welcome: '', followUp: '', closing: '' };
}

function saveMessagesToLocalStorage(messages) {
    localStorage.setItem('messages', JSON.stringify(messages));
}

function getPlantillasFromStorage() {
    return JSON.parse(localStorage.getItem('plantillas')) || [];
}

function savePlantillasToStorage(plantillas) {
    localStorage.setItem('plantillas', JSON.stringify(plantillas));
}

function getRegistrosFromStorage() {
    return JSON.parse(localStorage.getItem('registros')) || [];
}

function saveRegistrosToStorage(registros) {
    localStorage.setItem('registros', JSON.stringify(registros));
}

function saveThemeToLocalStorage(isDarkMode) {
    localStorage.setItem('darkMode', isDarkMode);
}

function getThemeFromLocalStorage() {
    return JSON.parse(localStorage.getItem('darkMode'));
}

// Export functions if using modules
// export { saveUsersToLocalStorage, getUsersFromLocalStorage, getMessagesFromLocalStorage, saveMessagesToLocalStorage, getPlantillasFromStorage, savePlantillasToStorage, getRegistrosFromStorage, saveRegistrosToStorage, saveThemeToLocalStorage, getThemeFromLocalStorage };