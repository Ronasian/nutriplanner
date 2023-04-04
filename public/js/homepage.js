const loginBtn = document.querySelector('#login-btn');
const signUpBtn = document.querySelector('#signup-btn');

function redirectToLogin() {
    document.location.replace('/login');
}

function redirectToSignUp() {
    document.location.replace('/signup');
}

loginBtn.addEventListener('click', redirectToLogin);
signUpBtn.addEventListener('click', redirectToSignUp);