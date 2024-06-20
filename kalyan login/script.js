document.addEventListener('DOMContentLoaded', () => {
    const showRegisterLink = document.getElementById('showRegisterLink');
    const showLoginLink = document.getElementById('showLoginLink');
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const loginSuccessMessage = document.getElementById('loginSuccessMessage');
    const loginErrorMessage = document.getElementById('loginErrorMessage');
    const registerSuccessMessage = document.getElementById('registerSuccessMessage');
    const registerErrorMessage = document.getElementById('registerErrorMessage');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Show register form and hide login form
    showRegisterLink.addEventListener('click', () => {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
        resetMessages();
    });

    // Show login form and hide register form
    showLoginLink.addEventListener('click', () => {
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
        resetMessages();
    });

    // Login form submission
    loginForm.addEventListener('submit', loginUser);

    function loginUser(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            loginSuccessMessage.style.display = 'block';
            setTimeout(() => {
                loginSuccessMessage.style.display = 'none';
                loginContainer.style.display = 'none';
                document.getElementById('welcomeContainer').style.display = 'block';
            }, 1000);
        } else {
            loginErrorMessage.style.display = 'block';
        }
    }

    // Register form submission
    registerForm.addEventListener('submit', registerUser);

    function registerUser(event) {
        event.preventDefault();
        const regUsername = document.getElementById('regUsername').value;
        const regEmail = document.getElementById('regEmail').value;
        const regPassword = document.getElementById('regPassword').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === regUsername);

        if (userExists) {
            registerErrorMessage.style.display = 'block';
        } else {
            users.push({ username: regUsername, email: regEmail, password: regPassword });
            localStorage.setItem('users', JSON.stringify(users));
            registerSuccessMessage.style.display = 'block';
            setTimeout(() => {
                registerContainer.style.display = 'none';
                loginContainer.style.display = 'block';
                registerSuccessMessage.style.display = 'none';
            }, 3000);
        }
    }

    // Helper function to reset error/success messages
    function resetMessages() {
        loginSuccessMessage.style.display = 'none';
        registerSuccessMessage.style.display = 'none';
        loginErrorMessage.style.display = 'none';
        registerErrorMessage.style.display = 'none';
    }
});

function logout() {
    document.getElementById('welcomeContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
}
