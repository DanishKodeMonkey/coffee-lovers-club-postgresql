// Function to toggle dark mode
function toggleDarkMode() {
    const icon = document.querySelector('.icon');
    const isDarkMode =
        document.documentElement.getAttribute('data-bs-theme') === 'dark';

    if (isDarkMode) {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        icon.classList.remove('icon-dark');
        localStorage.setItem('darkMode', 'light');
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        icon.classList.add('icon-dark');
        localStorage.setItem('darkMode', 'dark');
    }

    toggleBackgroundColors();
}

// Function to toggle background colors based on dark mode
function toggleBackgroundColors() {
    const elements = document.querySelectorAll('#bgToggle');
    const isDarkMode =
        document.documentElement.getAttribute('data-bs-theme') === 'dark';

    elements.forEach(element => {
        if (isDarkMode) {
            element.classList.remove('bg-light');
            element.classList.add('bg-dark');
        } else {
            element.classList.remove('bg-dark');
            element.classList.add('bg-light');
        }
    });
}

// Function to apply dark mode preference when the page loads
function applyDarkModePreference() {
    const darkModePreference = localStorage.getItem('darkMode');

    if (darkModePreference === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        toggleBackgroundColors();
        const icon = document.querySelector('.icon');
        icon.classList.add('icon-dark');
    }
}

// Apply dark mode preference when the page loads
window.addEventListener('load', applyDarkModePreference);

// Event listener for the dark mode toggle button
document
    .getElementById('darkModeSwitch')
    .addEventListener('click', toggleDarkMode);
