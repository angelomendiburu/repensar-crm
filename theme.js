document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
});

function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    saveThemeToLocalStorage(isDarkMode);
    applyThemeToIframe(isDarkMode);
}

function applySavedTheme() {
    const isDarkMode = getThemeFromLocalStorage();
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        applyThemeToIframe(true);
    }
}

function saveThemeToLocalStorage(isDarkMode) {
    localStorage.setItem('darkMode', isDarkMode);
}

function getThemeFromLocalStorage() {
    return JSON.parse(localStorage.getItem('darkMode'));
}

function applyThemeToIframe(isDarkMode) {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        iframe.contentWindow.postMessage({ darkMode: isDarkMode }, '*');
    }
}

window.addEventListener('message', (event) => {
    if (event.data.darkMode !== undefined) {
        if (event.data.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
});

// Export functions if using modules
// export { toggleDarkMode, applySavedTheme };