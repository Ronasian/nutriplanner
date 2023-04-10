const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const passwordConfirm = document.querySelector('#confirm-password-signup').value.trim()
  
    if (passwordConfirm == password) {
      if (name && email && password) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to sign up.');
        }
      }
    }
    else {console.log("Password mismatch")}
    
  };

let signupForm = document.querySelector('.signup-form');
if (signupForm) {signupForm.addEventListener('submit', signupFormHandler);}