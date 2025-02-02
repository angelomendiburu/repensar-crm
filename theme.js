function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    saveThemeToLocalStorage(isDarkMode);
}

function applySavedTheme() {
    const isDarkMode = getThemeFromLocalStorage();
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

function saveThemeToLocalStorage(isDarkMode) {
    localStorage.setItem('darkMode', isDarkMode);
}

function getThemeFromLocalStorage() {
    return JSON.parse(localStorage.getItem('darkMode'));
}

