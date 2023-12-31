'use strict';
console.log('login.js file was loaded');

const form = document.getElementById('login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');

const url = 'http://localhost:3000/api/auth/login';

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // surenku inpututs i objekta

  const userConnection = {
    user_name: username.value.trim(),
    user_password: password.value.trim(),
  };

  // isiunciu post su
  authLogin(userConnection);
});

function authLogin(userObj) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObj),
  })
    .then((resp) => {
      // kai sekme tai naviguojam i home page
      if (resp.status === 200) {
        alert('Connection is Ok');
        // issaugau i session storage musu prisijungima
        console.log('issaugoti sesijos kintamaji');
        sessionStorage.setItem('loggedIn', userObj.user_name);

        // ir kai visaks ok mane nuveda i index.html
        window.location.href = 'index.html';
      } else if (resp.status === 400) {
        isInvalid();
      }
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      if (data.type === 'validation') {
        // handleErrors(data)
        alert(data.msg);
        return;
      }
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}

function isInvalid() {
  // Supprimer les messages d'erreur existants
  clearErrorMessages();

  const divEl = document.createElement('div');
  divEl.classList.add('invalid-feedback');
  divEl.textContent = 'Your login or password is wrong';
  username.classList.add('is-invalid');
  password.classList.add('is-invalid');
  password.after(divEl);
}

function clearErrorMessages() {
  // Supprimer les messages d'erreur existants
  const existingErrorMessages = document.querySelectorAll('.invalid-feedback');
  existingErrorMessages.forEach((element) => element.remove());
  // Supprimer la classe 'is-invalid' des champs de saisie
  username.classList.remove('is-invalid');
  password.classList.remove('is-invalid');
}
