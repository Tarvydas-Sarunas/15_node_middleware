'use strict';
console.log('add.js file was loaded');

const baseURL = 'http://localhost:3000/api';
// nusitaikyti i forma ir inputus
const els = {
  form: document.getElementById('add-post-form'),
  title: document.getElementById('title'),
  author: document.getElementById('author'),
  date: document.getElementById('date'),
  body: document.getElementById('body'),
};

// ant btn paspaudimo surenka inputus i objecta ir siuncia i back
els.form.addEventListener('submit', (e) => {
  e.preventDefault();

  // surinkti inputus i objekta
  const allInput = {
    title: els.title.value.trim(),
    author: els.author.value.trim(),
    date: els.date.value.trim(),
    body: els.body.value.trim(),
  };
  addNewPost(allInput);
});

// funkcija kuri siuncia surinktus objektus i back
function addNewPost(newPostObj) {
  fetch(`${baseURL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPostObj),
  })
    .then((resp) => {
      // kai sekme tai naviguojam i home page
      if (resp.status === 201) {
        // alert('post was created');
        window.location.href = 'index.html';
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

// jei sekmingai sukurtas postas, naviguoti i index.html
// window.location.href = '';

// backe yra validacija title ir autoriui
// A pranesti bendru pranesimu (sukurti/atslepti alert elementa)
// B atvaizduoti lauka kuriame yra klaida su klaidos klase (is-invalid class)
