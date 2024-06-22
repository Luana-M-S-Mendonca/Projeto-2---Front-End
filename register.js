document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const date = new Date().toLocaleString();

        const user = { username: fullname, email, date };

        saveUser(user);
        window.location.href = 'index.html'; 
    });

    function saveUser(user) {
        const users = getUsersFromStorage();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    function getUsersFromStorage() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }
});
