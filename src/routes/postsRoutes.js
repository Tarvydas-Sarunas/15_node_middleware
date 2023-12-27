const express = require('express');
const postsRoutes = express.Router();
const { reqTime } = require('/src/middleware.js');
const { dbQueryWithData } = require('../helper');
const { validatePost } = require('../middleware');

// get all posts   route level middleware
postsRoutes.get('/api/posts', reqTime, async (req, res) => {
  const sql = 'SELECT * FROM posts';
  const [rows, error] = await dbQueryWithData(sql, (argArr = []));
  console.log('error ===', error);
  res.json(rows);
});

postsRoutes.post('/api/posts', validatePost, async (req, res) => {
  const { title, author, date, body } = req.body;

  const sql = `INSERT INTO posts 
    (title, author, date, body) 
    VALUES (?, ?, ?, ?)`;
  const [rezObj, error] = await dbQueryWithData(sql, [
    title,
    author,
    date,
    body,
  ]);

  console.log('error ===', error);
  res.json(rezObj);
});

// is exportuoju rautus
module.exports = postsRoutes;
