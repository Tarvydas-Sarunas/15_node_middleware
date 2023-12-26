require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');
const { dbQueryWithData } = require('./helper');

const app = express();

const PORT = process.env.PORT || 5000;

// my own middleware
const logHello = (req, res, next) => {
  console.log('--- Hi there -- Im -- middleware!!! ---');
  // nextas leidzia kodui vykti toliau
  next();
};

const reqTime = (req, res, next) => {
  const now = new Date();
  const time = now.toTimeString();
  console.log('request:', time);
  // nextas leidzia kodui vykti toliau
  next();
};

// Middleware - app level
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(logHello);
// app.use(reqTime);

// routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// MAIN ROUTES

// get all posts   route level middleware
app.get('/api/posts', reqTime, async (req, res) => {
  const sql = 'SELECT * FROM posts';
  const [rows, error] = await dbQueryWithData(sql, (argArr = []));
  console.log('error ===', error);
  res.json(rows);
});

// connect
async function testConnection() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    await conn.query('SELECT * FROM posts LIMIT 1');
    console.log('Succesfuly connected to mysql ');
  } catch (error) {
    console.log('testConnection failed, did you start XAMPP mate???');
    console.log('error ===', error);
  } finally {
    if (conn) conn.end();
  }
}
// testConnection();

// app.listen(PORT);
app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
