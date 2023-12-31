const express = require('express');

const authRouter = express.Router();

const { dbQueryWithData } = require('../helper');

// login route
// POST - username ir password - send 200 response if user foun
// 400 respons if user not found
authRouter.post('/api/auth/login', async (req, res) => {
  // issitraukiam atsiustus duomenis
  const { user_name, user_password } = req.body;

  // paieskoti vartotojo duomenu bazeje pagal user_name
  const sql = 'SELECT * FROM `users` WHERE user_name = ?;';
  const [rows, error] = await dbQueryWithData(sql, [user_name]);

  console.log('error ===', error);

  // patikriname ar radom user_name
  // neradom
  if (rows.length === 0) {
    res.status(400).json({
      msg: 'username or password wrong (dev)',
    });
    return;
  }
  // radom
  // tada tikrinu ar sutampa slaptazodis
  if (rows.length === 1) {
    // jei slap nesutampa
    if (user_password !== rows[0].user_password) {
      res.status(400).json({
        msg: 'username or password wrong (dev pass no match)',
      });
      return;
    }
    // jei slaptazodis sutampa
    // pass match
    res.json({
      msg: 'loging success',
    });
  }
});

// POST - /api/auth/register - username ir password sukuria nauja vartotoja
authRouter.post('/api/auth/register', async (req, res) => {
  const sql = `INSERT INTO users (user_name, user_password)
  VALUES (?, ?)`;
  const { user_name, user_password } = req.body;
  const [rows, error] = await dbQueryWithData(sql, [user_name, user_password]);

  // error
  console.log('error ===', error);
  if (error.code === 'ER_DUP_ENTRY') {
    res.status(400).json({
      error: 'username already exists',
    });
    return;
  }
  if (rows.affectedRows === 1) {
    res.status(201).json('user created');
    return;
  }
  restart.status(500).json({
    msg: 'no rows affected',
    rows,
  });
});

module.exports = authRouter;
