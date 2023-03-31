const loginBtn = document.querySelector('#login-btn');

function redirectToLogin() {
    document.location.replace('/login');
}

loginBtn.addEventListener('click', redirectToLogin);