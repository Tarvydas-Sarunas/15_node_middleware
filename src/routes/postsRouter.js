const express = require('express');

const postsRouter = express.Router();
const { dbQueryWithData } = require('../helper');
const { reqTime, validatePost } = require('../middleware');

// get all posts   route level middleware
postsRouter.get('/api/posts', reqTime, async (req, res) => {
  const sql = 'SELECT * FROM posts ORDER BY post_id DESC';
  const [rows, error] = await dbQueryWithData(sql, (argArr = []));
  console.log('error ===', error);

  if (error) {
    res.status(500).json({
      error: 'something went wrong',
    });
  }
  res.json(rows);
});

postsRouter.post('/api/posts', validatePost, async (req, res) => {
  const {
    title, author, date, body,
  } = req.body;

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

  if (rezObj.affectedRows === 1) {
    res.status(201).json({ msg: 'post was created' });
    return;
  }
  res.json(rezObj);
});

postsRouter.put('/api/posts/:pId', validatePost, async (req, res) => {
  res.json('update post');
});

// is exportuoju rautus
module.exports = postsRouter;
