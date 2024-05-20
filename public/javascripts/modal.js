// define modal functionality
function openModal() {
    const modal = document.getElementById('messageModal');

    modal.showModal();
}

function closeModal() {
    const modal = document.getElementById('messageModal');

    modal.close();
}

function displayErrors(errors) {
    const errorList = document.getElementById('errorList');
    const errorContainer = document.getElementById('errorContainer');

    // clear previous error messages
    errorList.innerHTML = '';

    // populate new error messages
    errors.forEach(error => {
        const li = document.createElement('li');
        li.textContent = error.msg;
        errorList.appendChild(li);
    });
    errorContainer.style.display = 'block';
}

function hideErrors() {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.style.display = 'none';
}
