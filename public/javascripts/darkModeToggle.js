document.getElementById('darkModeSwitch').addEventListener('click', () => {
    const icon = document.querySelector('.icon');
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        icon.classList.remove('icon-dark');
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        icon.classList.add('icon-dark');
    }
    const elements = document.querySelectorAll('#bgToggle');
    elements.forEach(element => {
        if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
            console.log('Dark mode');
            element.classList.remove('bg-light');
            element.classList.add('bg-dark');
        } else {
            console.log('Light mode');
            element.classList.remove('bg-dark');
            element.classList.add('bg-light');
        }
    });
});
