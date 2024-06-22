document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const userList = document.getElementById('userList');
    const clearFormButton = document.getElementById('clearForm');
    const clearAllButton = document.getElementById('clearAll');
    const searchInput = document.getElementById('search');

    userForm.addEventListener('submit', addUser);
    clearFormButton.addEventListener('click', clearForm);
    clearAllButton.addEventListener('click', clearAllUsers);
    searchInput.addEventListener('input', searchUsers);

    loadUsers();

    function addUser(event) {
        event.preventDefault();
        
        const username = usernameInput.value;
        const email = emailInput.value;
        const date = new Date().toLocaleString();
        const user = { username, email, date };

        saveUser(user);
        appendUserToList(user);
        clearForm();
    }

    function saveUser(user) {
        const users = getUsersFromStorage();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    function getUsersFromStorage() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    function appendUserToList(user) {
        const li = document.createElement('li');
        li.textContent = `${user.date} - ${user.username} - ${user.email}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => deleteUser(user, li));
        
        li.appendChild(deleteButton);
        userList.appendChild(li);
    }

    function loadUsers() {
        const users = getUsersFromStorage();
        users.forEach(user => appendUserToList(user));
    }

    function clearForm() {
        usernameInput.value = '';
        emailInput.value = '';
    }

    function deleteUser(user, listItem) {
        let users = getUsersFromStorage();
        users = users.filter(u => u.date !== user.date);
        localStorage.setItem('users', JSON.stringify(users));
        userList.removeChild(listItem);
    }

    function clearAllUsers() {
        localStorage.removeItem('users');
        userList.innerHTML = '';
    }

    function searchUsers() {
        const query = searchInput.value.toLowerCase();
        const users = getUsersFromStorage();
        userList.innerHTML = '';

        users
            .filter(user => 
                user.username.toLowerCase().includes(query) || 
                user.email.toLowerCase().includes(query)
            )
            .forEach(user => appendUserToList(user));
    }
});
