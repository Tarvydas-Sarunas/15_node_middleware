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
    title: els.title.value,
    author: els.author.value,
    date: els.date.value,
    body: els.body.value,
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
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}

// jei sekmingai sukurtas postas, naviguoti i index.html
// window.location.href = '';

// backe yra validacija title ir autoriui
// A pranesti bendru pranesimu (sukurti/atslepti alert elementa)
// B atvaizduoti lauka kuriame yra klaida su klaidos klase (is-invalid class)
