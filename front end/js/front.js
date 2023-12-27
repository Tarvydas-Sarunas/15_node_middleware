'use strict';
console.log('front.js file was loaded');

const baseUrl = 'http://localhost:3000/api';
const postsUrl = `${baseUrl}/posts`;

const els = {
  postContainer: document.getElementById('post-container'),
};
//
(async () => {
  // iffe body

  const postsArr = await getPosts(postsUrl);
  console.log('postsArr ===', postsArr);

  const firstPostHtml = makeSinglePostHtmlEl(postsArr[0]);
  console.log(firstPostHtml);

  // first post to container
  els.postContainer.append(firstPostHtml);

  // sukurti functija render(arr)
  function render(arr) {
    els.postContainer.innerHTML = '';
    arr.forEach((arrObj) => {
      const newCard = makeSinglePostHtmlEl(arrObj);
      els.postContainer.append(newCard);
    });
  }
  render(postsArr);

  // kietesnis budas sukurti render butu su map
  function render2(arr) {
    els.postContainer.innerHTML = '';
    const elArr = arr.map((pObj) => makeSinglePostHtmlEl(pObj));
    els.postContainer.append(...elArr);
  }

  // isivalyti konteineri pries generuojant
  // is arr masyvo pagamina postu html elementus ir sudeda juos i postsContainer

  function getPosts(url) {
    return fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.warn('ivyko klaida', error));
  }

  // posts to html
  // makeSinglePost
  function makeSinglePostHtmlEl(pObj) {
    const formatedDate = new Date(pObj.date).toLocaleDateString('fr-FR');
    const columnEl = document.createElement('div');
    columnEl.className = 'col-lg-4 col-sm-6';
    columnEl.innerHTML = `
    <div class="card">
      <div class="card-header">Post id: 
        ${pObj.post_id}
      </div>
      <div class="card-body">
        <h5 class="card-title">${pObj.title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${pObj.author}</h6>
        <p class="card-text">${pObj.body.slice(0, 100)}${
      pObj.body.length > 100 ? '...' : ''
    } </p>
        <a href="#" class="btn btn-info text-white">Read more</a>
      </div>
      <div class="card-footer text-body-secondary">Post date: 
      ${formatedDate}
      </div>
    </div>
    `;
    return columnEl;
  }
})();
